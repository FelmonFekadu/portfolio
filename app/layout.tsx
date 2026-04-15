import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Felmon Fekadu | Engineering Portfolio',
  description:
    'Shipped full-stack products, real-time systems, and maintainer-reviewed open-source contributions.',
  keywords: [
    'Software Engineer',
    'AI Product Engineer',
    'TypeScript',
    'Next.js',
    'React',
    'Node.js',
    'PostgreSQL',
    'Open Source',
    'Engineering Portfolio',
    'Felmon Fekadu',
  ],
  authors: [{ name: 'Felmon Fekadu' }],
  openGraph: {
    title: 'Felmon Fekadu | Engineering Portfolio',
    description:
      'Shipped full-stack products, real-time systems, and maintainer-reviewed open-source contributions.',
    type: 'website',
    url: 'https://felmon.tech',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Felmon Fekadu | Engineering Portfolio',
    description:
      'Shipped full-stack products, real-time systems, and maintainer-reviewed open-source contributions.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">{children}</body>
    </html>
  )
}
