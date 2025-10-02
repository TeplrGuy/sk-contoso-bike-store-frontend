#!/usr/bin/env pwsh
<#
.SYNOPSIS
Generate GitHub Issues from tasks.md

.DESCRIPTION
This script parses specs/001-i-am-building/tasks.md and generates
GitHub CLI commands to create issues for each task.

.EXAMPLE
./scripts/generate-issues.ps1
# Or execute directly:
./scripts/generate-issues.ps1 | Invoke-Expression

.NOTES
Requires GitHub CLI (gh) to be installed for creating issues
#>

param(
    [int]$MaxTasks = 20
)

$TasksFile = Join-Path $PSScriptRoot '..' 'specs' '001-i-am-building' 'tasks.md'

function Parse-Tasks {
    param([string]$Content)
    
    $tasks = @()
    $lines = $Content -split "`n"
    $currentTask = $null
    $inTaskDescription = $false
    $descriptionLines = @()
    
    foreach ($line in $lines) {
        # Match task ID line (e.g., "T001   Setup repo skeleton and dev dependencies")
        if ($line -match '^(T\d{3})\s+(\[P\]\s+)?(.+)$') {
            # Save previous task if exists
            if ($currentTask) {
                $currentTask.Description = ($descriptionLines -join "`n").Trim()
                $tasks += $currentTask
            }
            
            # Start new task
            $currentTask = @{
                Id = $Matches[1]
                Title = $Matches[3].Trim()
                Parallel = [bool]$Matches[2]
                Description = ''
                AcceptanceCriteria = @()
            }
            $inTaskDescription = $true
            $descriptionLines = @()
        }
        elseif ($currentTask -and $inTaskDescription) {
            # End of current task description
            if ($line -match '^T\d{3}' -or $line -match '^---' -or $line -match '^Phase [A-E]') {
                $inTaskDescription = $false
            }
            else {
                # Extract acceptance criteria
                if ($line -match '- Acceptance:') {
                    $acceptance = $line -replace '.*- Acceptance:', ''
                    $acceptance = $acceptance.Trim()
                    if ($acceptance) {
                        $currentTask.AcceptanceCriteria += $acceptance
                    }
                }
                elseif ($line.Trim() -match '^- ' -and $line -match ':') {
                    $descriptionLines += $line
                }
                elseif ($line.Trim() -and $line -notmatch '^-{3,}') {
                    $descriptionLines += $line
                }
            }
        }
    }
    
    # Don't forget the last task
    if ($currentTask) {
        $currentTask.Description = ($descriptionLines -join "`n").Trim()
        $tasks += $currentTask
    }
    
    return $tasks
}

function Get-TaskLabels {
    param($Task)
    
    $labels = @('type:task')
    $taskNum = [int]$Task.Id.Substring(1)
    
    # Priority based on task phase
    if ($taskNum -le 3) {
        $labels += 'priority:p0'  # Setup tasks
    }
    elseif ($taskNum -le 7) {
        $labels += 'priority:p1'  # Test tasks
    }
    else {
        $labels += 'priority:p2'  # Implementation tasks
    }
    
    # Scope based on task content
    $titleLower = $Task.Title.ToLower()
    if ($titleLower -match 'test') {
        $labels += 'scope:testing'
    }
    elseif ($titleLower -match 'setup|config') {
        $labels += 'scope:setup'
    }
    elseif ($titleLower -match 'ui|page|component') {
        $labels += 'scope:ui'
    }
    elseif ($titleLower -match 'model|service') {
        $labels += 'scope:backend'
    }
    elseif ($titleLower -match 'doc') {
        $labels += 'scope:docs'
    }
    elseif ($titleLower -match 'ci') {
        $labels += 'scope:ci'
    }
    
    # Size estimation
    if ($taskNum -le 3 -or ($titleLower -match 'add' -and $Task.Title.Length -lt 50)) {
        $labels += 'size:S'
    }
    elseif ($titleLower -match 'implement') {
        $labels += 'size:L'
    }
    else {
        $labels += 'size:M'
    }
    
    return $labels
}

function New-IssueBody {
    param($Task)
    
    $body = "### Task Description`n$($Task.Description)`n`n"
    
    $body += "### Acceptance Criteria`n"
    if ($Task.AcceptanceCriteria.Count -gt 0) {
        foreach ($criteria in $Task.AcceptanceCriteria) {
            $body += "- [ ] $criteria`n"
        }
    }
    else {
        $body += "- [ ] Task completed as specified in tasks.md`n"
    }
    $body += "`n"
    
    $body += "### References`n"
    $body += "- [specs/001-i-am-building/tasks.md](../blob/main/specs/001-i-am-building/tasks.md)`n`n"
    
    $body += "### Parallelizable`n"
    if ($Task.Parallel) {
        $body += "✅ YES - This task can run in parallel with other [P] tasks`n"
    }
    else {
        $body += "❌ NO - This task has dependencies`n"
    }
    
    return $body
}

function New-GHCommand {
    param($Task, $Labels)
    
    $title = "$($Task.Id): $($Task.Title)"
    $body = New-IssueBody -Task $Task
    $assignees = 'TeplrGuy,kwkraus'
    $labelStr = $Labels -join ','
    
    # Escape for PowerShell
    $escapedBody = $body -replace '"', '\"' -replace '`', '\`'
    
    return "gh issue create --title `"$title`" --body `"$escapedBody`" --label `"$labelStr`" --assignee `"$assignees`""
}

# Main
try {
    if (-not (Test-Path $TasksFile)) {
        Write-Error "Error: $TasksFile not found"
        exit 1
    }
    
    $content = Get-Content $TasksFile -Raw
    $tasks = Parse-Tasks -Content $content
    
    Write-Host "# Found $($tasks.Count) tasks in tasks.md"
    Write-Host "# Generating GitHub CLI commands for the first $([Math]::Min($tasks.Count, $MaxTasks)) tasks`n"
    Write-Host "# Run these commands to create issues:`n"
    
    $tasksToGenerate = $tasks | Select-Object -First $MaxTasks
    
    foreach ($task in $tasksToGenerate) {
        $labels = Get-TaskLabels -Task $task
        $command = New-GHCommand -Task $task -Labels $labels
        Write-Host $command
        Write-Host ""
    }
    
    if ($tasks.Count -gt $MaxTasks) {
        Write-Host "# Note: $($tasks.Count - $MaxTasks) additional tasks not included (max $MaxTasks)"
    }
    
    Write-Host "`n# Total: $($tasksToGenerate.Count) issue creation commands generated"
}
catch {
    Write-Error "Error: $($_.Exception.Message)"
    exit 1
}
