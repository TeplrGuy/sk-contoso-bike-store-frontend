import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Contoso Bicycles',
  description: 'Your one-stop shop for quality bicycles',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
