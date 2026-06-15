import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'GOVA Academy — Asia\'s Leading Virtual Assistance Training',
  description: 'Transform your career with GOVA Academy. Comprehensive VA training, HR outsourcing, and talent acquisition services across Asia. 30-60-90 Day methodology.',
  keywords: 'virtual assistant training, HR outsourcing, GOVA Academy, VA courses, Philippines, Asia',
  openGraph: {
    title: 'GOVA Academy',
    description: 'Asia\'s Leading HR & Virtual Assistant Training Academy',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
