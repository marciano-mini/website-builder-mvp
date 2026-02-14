'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { auth } from '@/lib/auth'
import PageEditor from '@/components/website-builder/PageEditor'

export default function ProjectEditorPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [session, setSession] = useState<any>(null)
  const [project, setProject] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

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
    setError('')
    setLoading(true)
    try {
      const res = await fetch(`/api/projects/${params.id}`)
      const data = await res.json()

      if (data.success) {
        setProject(data.project)
      } else {
        setError(data.error || 'Project niet gevonden')
      }
    } catch (err: any) {
      setError(err.message || 'Er is iets misgegaan')
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

    // Refresh project data
    await fetchProject()
  }

  const handlePublishToggle = async (pageId: string) => {
    // Find current page
    const page = project.pages.find((p: any) => p.id === pageId)
    if (!page) return

    try {
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-400">Laden...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600">{error}</div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Project niet gevonden</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push('/dashboard')}
            className="text-blue-600 hover:text-blue-700 flex items-center gap-2 mb-4"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Terug naar dashboard
          </button>
          <h1 className="text-3xl font-bold">{project.name}</h1>
          <p className="text-gray-600 mt-1">/ {project.slug}</p>
        </div>

        {/* Project Status */}
        <div className="mb-8 p-4 bg-white border rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-700">
                Status: <span className={`font-bold ${project.status === 'published' ? 'text-green-600' : 'text-yellow-600'}`}>
                  {project.status === 'published' ? 'Gepubliceerd' : 'Concept'}
                </span>
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {project.pages.length} pagina's
              </p>
            </div>
            <a
              href={`/${project.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Preview
            </a>
          </div>
        </div>

        {/* Pages */}
        <div className="space-y-6">
          {project.pages.map((page: any) => (
            <PageEditor
              key={page.id}
              page={page}
              onSave={handleSavePage}
              onPublishToggle={handlePublishToggle}
            />
          ))}
        </div>
      </div>
    </div>
  )
}