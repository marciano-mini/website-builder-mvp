import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'

interface SiteLayoutProps {
  children: React.ReactNode
  params: Promise<{ site: string }>
}

export default async function SiteLayout({ children, params }: SiteLayoutProps) {
  const { site } = await params
  // Verify this site exists and is published
  const project = await prisma.project.findUnique({
    where: { slug: site },
    include: { template: true }
  })

  if (!project || project.status !== 'published') {
    notFound()
  }

  return (
    <html lang={project.template?.id ? 'nl' : 'nl'}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}