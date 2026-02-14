import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'
import Link from 'next/link'

interface PageProps {
  params: Promise<{ site: string; catchall?: string[] }>
}

export default async function PublicPage({ params }: PageProps) {
  const { site, catchall } = await params
  // Extract page path from catchall (contact, menu, etc.)
  const pagePath = catchall?.join('/') || 'home'

  // Get project and its published pages
  const project = await prisma.project.findUnique({
    where: { slug: site },
    include: {
      template: true,
      pages: {
        where: { isPublished: true },
        orderBy: { order: 'asc' }
      }
    }
  })

  if (!project || project.status !== 'published') {
    notFound()
  }

  // Find the matching page
  const page = project.pages.find(p => {
    if (pagePath === 'home') {
      return p.type === 'home'
    }
    return p.slug === pagePath
  })

  if (!page && pagePath !== 'home') {
    notFound()
  }

  const content = page?.content ? JSON.parse(page.content) : {}
  const templateConfig = project.template?.structure ? JSON.parse(project.template.structure) : {}

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow sticky top-0 z-50">
        <nav className="container mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">{project.name}</h1>
          <div className="flex gap-6">
            {project.pages.filter(p => !p.slug.includes('home')).map((p) => (
              <Link
                key={p.id}
                href={`/${site}${p.slug ? `/${p.slug}` : ''}`}
                className="hover:text-blue-600 transition-colors"
              >
                {p.title}
              </Link>
            ))}
          </div>
        </nav>
      </header>

      {/* Page Content */}
      <main
        dangerouslySetInnerHTML={{
          __html: renderPageContent(page?.type || 'home', content, project.name)
        }}
      />

      {/* Footer */}
      <footer className="border-t py-8 text-center text-sm text-gray-600">
        <p>© 2024 {project.name}. Alle rechten voorbehouden.</p>
        <Link href="/" className="text-blue-600 hover:underline">
          Maak ook je website
        </Link>
      </footer>
    </div>
  )
}

function renderPageContent(pageType: string, content: any, projectName: string): string {
  // Get default content or use provided
  const hero = content.hero || `Welkom bij ${projectName}`
  const tagline = content.description || content.tagline || 'Uw professionele website'
  const cta = content.cta || 'Neem contact op'

  // Render different page types
  switch (pageType) {
    case 'home':
      return `
        <section class="py-20 bg-gray-50">
          <div class="container mx-auto px-4 text-center">
            <h2 class="text-5xl font-bold mb-6">${hero}</h2>
            <p class="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              ${tagline}
            </p>
            <a href="#contact" class="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors">
              ${cta}
            </a>
          </div>
        </section>
      `

    case 'menu':
      return `
        <section class="py-20">
          <div class="container mx-auto px-4">
            <h2 class="text-4xl font-bold text-center mb-12">${content.title || 'Ons Menu'}</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              ${content.categories?.map((cat: string) => `
                <div class="bg-white shadow-lg rounded-xl p-6">
                  <h3 class="font-bold text-lg mb-4 text-gray-800">${cat}</h3>
                  <p class="text-gray-600">Bekijk onze selectie van ${cat.toLowerCase()}</p>
                </div>
              `).join('') || ''}
            </div>
          </div>
        </section>
      `

    case 'about':
      return `
        <section class="py-20 bg-gray-50">
          <div class="container mx-auto px-4 max-w-3xl">
            <h2 class="text-4xl font-bold text-center mb-12">Over ons</h2>
            <p class="text-xl text-gray-600 leading-relaxed text-center">
              ${hero}
            </p>
            <p class="text-lg text-gray-600 leading-relaxed mt-6">
              ${tagline}
            </p>
          </div>
        </section>
      `

    case 'contact':
      return `
        <section class="py-20">
          <div class="container mx-auto px-4 max-w-2xl">
            <h2 class="text-4xl font-bold text-center mb-12">Contact</h2>
            <form class="bg-white shadow-lg rounded-xl p-8">
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 mb-2">Naam</label>
                <input type="text" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Je naam" />
              </div>
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input type="email" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="je@email.nl" />
              </div>
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 mb-2">Bericht</label>
                <textarea rows={4} class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Je bericht..."></textarea>
              </div>
              <button type="submit" class="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors">
                Verstuur
              </button>
            </form>
          </div>
        </section>
      `

    case 'services':
    case 'pricing':
    case 'gallery':
      return `
        <section class="py-20 bg-gray-50">
          <div class="container mx-auto px-4">
            <h2 class="text-4xl font-bold text-center mb-12">${content.title || 'Diensten'}</h2>
            <div class="text-center max-w-3xl mx-auto">
              <p class="text-xl text-gray-600">
                ${hero}
              </p>
              <p class="text-lg text-gray-600 mt-4">
                ${tagline}
              </p>
              <a href="#contact" class="inline-block mt-8 px-8 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors">
                ${cta}
              </a>
            </div>
          </div>
        </section>
      `

    default:
      return `
        <section class="py-20">
          <div class="container mx-auto px-4 text-center">
            <h2 class="text-4xl font-bold mb-6">${hero}</h2>
            <p class="text-xl text-gray-600">
              ${tagline}
            </p>
          </div>
        </section>
      `
  }
}