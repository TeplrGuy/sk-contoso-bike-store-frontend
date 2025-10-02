#!/usr/bin/env node

/**
 * Generate GitHub Issues from tasks.md
 * 
 * This script parses specs/001-i-am-building/tasks.md and generates
 * GitHub CLI commands to create issues for each task.
 * 
 * Usage:
 *   node scripts/generate-issues.js
 *   # Or with GitHub CLI:
 *   node scripts/generate-issues.js | bash
 */

const fs = require('fs');
const path = require('path');

const TASKS_FILE = path.join(__dirname, '..', 'specs', '001-i-am-building', 'tasks.md');
const MAX_TASKS = 20;

// Parse tasks.md to extract task information
function parseTasks(content) {
  const tasks = [];
  const lines = content.split('\n');
  let currentTask = null;
  let inTaskDescription = false;
  let descriptionLines = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Match task ID line (e.g., "T001   Setup repo skeleton and dev dependencies")
    const taskMatch = line.match(/^(T\d{3})\s+(\[P\]\s+)?(.+)$/);
    
    if (taskMatch) {
      // Save previous task if exists
      if (currentTask) {
        currentTask.description = descriptionLines.join('\n').trim();
        tasks.push(currentTask);
      }
      
      // Start new task
      const [, taskId, parallel, title] = taskMatch;
      currentTask = {
        id: taskId,
        title: title.trim(),
        parallel: !!parallel,
        description: '',
        acceptanceCriteria: []
      };
      inTaskDescription = true;
      descriptionLines = [];
    } else if (currentTask && inTaskDescription) {
      // Collect description lines
      if (line.match(/^T\d{3}/) || line.match(/^---/) || line.match(/^Phase [A-E]/)) {
        // End of current task description
        inTaskDescription = false;
      } else {
        // Extract acceptance criteria
        if (line.includes('- Acceptance:')) {
          const acceptance = line.replace(/.*- Acceptance:/, '').trim();
          if (acceptance) {
            currentTask.acceptanceCriteria.push(acceptance);
          }
        } else if (line.trim().startsWith('- ') && line.includes(':')) {
          descriptionLines.push(line);
        } else if (line.trim() && !line.match(/^-{3,}/)) {
          descriptionLines.push(line);
        }
      }
    }
  }
  
  // Don't forget the last task
  if (currentTask) {
    currentTask.description = descriptionLines.join('\n').trim();
    tasks.push(currentTask);
  }
  
  return tasks;
}

// Determine labels based on task ID and content
function determineLabels(task) {
  const labels = ['type:task'];
  
  // Priority based on task phase
  const taskNum = parseInt(task.id.substring(1));
  if (taskNum <= 3) {
    labels.push('priority:p0'); // Setup tasks
  } else if (taskNum <= 7) {
    labels.push('priority:p1'); // Test tasks
  } else {
    labels.push('priority:p2'); // Implementation tasks
  }
  
  // Scope based on task content
  if (task.title.toLowerCase().includes('test')) {
    labels.push('scope:testing');
  } else if (task.title.toLowerCase().includes('setup') || task.title.toLowerCase().includes('config')) {
    labels.push('scope:setup');
  } else if (task.title.toLowerCase().includes('ui') || task.title.toLowerCase().includes('page') || task.title.toLowerCase().includes('component')) {
    labels.push('scope:ui');
  } else if (task.title.toLowerCase().includes('model') || task.title.toLowerCase().includes('service')) {
    labels.push('scope:backend');
  } else if (task.title.toLowerCase().includes('doc')) {
    labels.push('scope:docs');
  } else if (task.title.toLowerCase().includes('ci')) {
    labels.push('scope:ci');
  }
  
  // Size estimation
  if (taskNum <= 3 || task.title.toLowerCase().includes('add') && task.title.length < 50) {
    labels.push('size:S');
  } else if (task.title.toLowerCase().includes('implement')) {
    labels.push('size:L');
  } else {
    labels.push('size:M');
  }
  
  return labels;
}

// Generate issue body
function generateIssueBody(task) {
  let body = `### Task Description\n${task.description}\n\n`;
  
  body += `### Acceptance Criteria\n`;
  if (task.acceptanceCriteria.length > 0) {
    task.acceptanceCriteria.forEach(criteria => {
      body += `- [ ] ${criteria}\n`;
    });
  } else {
    body += `- [ ] Task completed as specified in tasks.md\n`;
  }
  body += `\n`;
  
  body += `### References\n`;
  body += `- [specs/001-i-am-building/tasks.md](../blob/main/specs/001-i-am-building/tasks.md)\n\n`;
  
  body += `### Parallelizable\n`;
  body += task.parallel ? `✅ YES - This task can run in parallel with other [P] tasks\n` : `❌ NO - This task has dependencies\n`;
  
  return body;
}

// Generate GitHub CLI command to create issue
function generateGHCommand(task, labels) {
  const title = `${task.id}: ${task.title}`;
  const body = generateIssueBody(task);
  const assignees = 'TeplrGuy,kwkraus';
  const labelStr = labels.join(',');
  
  // Escape body for command line
  const escapedBody = body.replace(/"/g, '\\"').replace(/`/g, '\\`');
  
  return `gh issue create --title "${title}" --body "${escapedBody}" --label "${labelStr}" --assignee "${assignees}"`;
}

// Main function
function main() {
  try {
    // Read tasks.md
    if (!fs.existsSync(TASKS_FILE)) {
      console.error(`Error: ${TASKS_FILE} not found`);
      process.exit(1);
    }
    
    const content = fs.readFileSync(TASKS_FILE, 'utf-8');
    const tasks = parseTasks(content);
    
    console.log(`# Found ${tasks.length} tasks in tasks.md`);
    console.log(`# Generating GitHub CLI commands for the first ${Math.min(tasks.length, MAX_TASKS)} tasks\n`);
    console.log(`# Run these commands to create issues:\n`);
    
    // Generate commands for up to MAX_TASKS
    const tasksToGenerate = tasks.slice(0, MAX_TASKS);
    
    for (const task of tasksToGenerate) {
      const labels = determineLabels(task);
      const command = generateGHCommand(task, labels);
      console.log(command);
      console.log('');
    }
    
    if (tasks.length > MAX_TASKS) {
      console.log(`# Note: ${tasks.length - MAX_TASKS} additional tasks not included (max ${MAX_TASKS})`);
    }
    
    console.log(`\n# Total: ${tasksToGenerate.length} issue creation commands generated`);
    
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();
