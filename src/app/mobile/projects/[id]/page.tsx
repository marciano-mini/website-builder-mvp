'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { auth } from '@/lib/auth'
import MobilePageEditor from '@/components/mobile/MobilePageEditor'
import MobileNav from '@/components/mobile/MobileNav'

export default function MobileProjectEditorPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [session, setSession] = useState<any>(null)
  const [project, setProject] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth()
    fetchProject()
  }, [params.id])

  const checkAuth = async () => {
    try {
      const session = await auth()
      if (!session) {
        router.push('/login')
        return
      }
      setSession(session)
    } catch (err) {
      router.push('/login')
    }
  }

  const fetchProject = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/projects/${params.id}`)
      const data = await res.json()

      if (data.success) {
        setProject(data.project)
      } else {
        alert(data.error || 'Project niet gevonden')
      }
    } catch (err: any) {
      alert(err.message || 'Er is iets misgegaan')
    } finally {
      setLoading(false)
    }
  }

  const handleSavePage = async (pageId: string, updates: any) => {
    const res = await fetch(`/api/projects/${params.id}/pages/${pageId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    })

    const data = await res.json()

    if (!data.success) {
      throw new Error(data.error || 'Opslaan mislukt')
    }

    // Refresh project data silently
    await fetchProject()
  }

  const handlePublishToggle = async (pageId: string) => {
    try {
      // Get current page
      const page = project.pages.find((p: any) => p.id === pageId)
      if (!page) return

      const res = await fetch(`/api/projects/${params.id}/pages/${pageId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isPublished: !page.isPublished })
      })

      const data = await res.json()

      if (data.success) {
        await fetchProject()
      } else {
        throw new Error(data.error || 'Status bijwerken mislukt')
      }
    } catch (err: any) {
      throw new Error(err.message)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-400 text-sm">Laden...</div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-6xl mb-4">🤷</div>
          <p className="text-gray-600">Project niet gevonden</p>
          <button
            onClick={() => router.back()}
            className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium"
          >
            Terug
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="pt-4 pb-2 px-4 bg-white sticky top-0 z-30 border-b border-gray-100">
        <div className="flex items-center gap-3 mb-2">
          <button
            onClick={() => router.push('/mobile')}
            className="w-10 h-10 flex items-center justify-center -ml-4 touch-target active:bg-gray-100 rounded-full"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-bold truncate">{project.name}</h1>
            <p className="text-xs text-gray-500">/ {project.slug}</p>
          </div>

          <a
            href={`/${project.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium touch-target active:scale-95 transition-transform"
          >
            Preview
          </a>
        </div>

        {/* Project Stats */}
        <div className="flex gap-2 mt-3">
          <div className="flex-1 px-4 py-2 bg-gray-100 rounded-xl text-center">
            <div className="text-xs text-gray-500">Pagina's</div>
            <div className="font-bold text-lg">{project.pages.length}</div>
          </div>
          <div className={`flex-1 px-4 py-2 rounded-xl text-center ${
            project.status === 'published' ? 'bg-green-50' : 'bg-yellow-50'
          }`}>
            <div className="text-xs text-gray-600">Status</div>
            <div className={`font-bold text-lg ${
              project.status === 'published' ? 'text-green-600' : 'text-yellow-600'
            }`}>
              {project.status === 'published' ? '✓ Live' : '… Concept'}
            </div>
          </div>
        </div>
      </div>

      {/* Page Editors */}
      <div className="p-4 space-y-4">
        <div className="mb-4">
          <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
            Pagina's ({project.pages.length})
          </h2>
        </div>

        {project.pages.map((page: any) => (
          <MobilePageEditor
            key={page.id}
            page={page}
            onSave={handleSavePage}
            onPublishToggle={handlePublishToggle}
          />
        ))}
      </div>

      {/* Sticky Footer with Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 z-40">
        <div className="flex gap-3">
          <button
            onClick={() => router.push(`/projects/${project.id}/publish`)}
            className="flex-1 px-6 py-3 bg-green-600 text-white rounded-xl font-semibold text-lg active:scale-98 transition-transform touch-target"
          >
            🚀 {project.status === 'published' ? 'Update' : 'Publiceer'}
          </button>
        </div>

        {/* Extra padding for mobile nav */}
        <div className="h-16" />
      </div>

      <MobileNav />
    </div>
  )
}