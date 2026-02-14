'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { auth } from '@/lib/auth'
import ProjectList from '@/components/website-builder/ProjectList'
import NewProjectForm from '@/components/website-builder/NewProjectForm'

interface Project {
  id: string
  name: string
  slug: string
  status: string
  templateName: string
  templateCategory: string
  pageCount: number
  createdAt: string
  updatedAt: string
}

export default function DashboardPage() {
  const router = useRouter()
  const [session, setSession] = useState<any>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [showNewProject, setShowNewProject] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    checkAuth()
    fetchProjects()
  }, [])

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

  const fetchProjects = async () => {
    setError('')
    try {
      const res = await fetch('/api/projects')
      const data = await res.json()

      if (data.success) {
        setProjects(data.projects)
      } else {
        setError(data.error || 'Kon projecten niet laden')
      }
    } catch (err: any) {
      setError(err.message || 'Er is iets misgegaan')
    } finally {
      setLoading(false)
    }
  }

  const handleCreateProject = async (project: { name: string; description: string; templateId: string }) => {
    const res = await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(project)
    })

    const data = await res.json()

    if (data.success) {
      setShowNewProject(false)
      fetchProjects()
      router.push(`/projects/${data.project.id}`)
    } else {
      throw new Error(data.error || 'Project aanmaken mislukt')
    }
  }

  const handlePublish = async (projectId: string) => {
    const res = await fetch(`/api/projects/${projectId}/publish`, { method: 'POST' })
    const data = await res.json()

    if (data.success) {
      fetchProjects()
    } else {
      throw new Error(data.error || 'Publiceren mislukt')
    }
  }

  const handleUnpublish = async (projectId: string) => {
    const res = await fetch(`/api/projects/${projectId}/unpublish`, { method: 'POST' })
    const data = await res.json()

    if (data.success) {
      fetchProjects()
    } else {
      throw new Error(data.error || 'De-publiceren mislukt')
    }
  }

  const handleDelete = async (projectId: string) => {
    if (!confirm('Weet je zeker dat je dit project wilt verwijderen?')) {
      return
    }

    try {
      const res = await fetch(`/api/projects/${projectId}`, { method: 'DELETE' })
      const data = await res.json()

      if (data.success) {
        fetchProjects()
      } else {
        throw new Error(data.error || 'Verwijderen mislukt')
      }
    } catch (err: any) {
      alert(err.message)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-400">Laden...</div>
      </div>
    )
  }

  if (showNewProject) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <button
          onClick={() => setShowNewProject(false)}
          className="mb-6 text-blue-600 hover:text-blue-700 flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Terug naar dashboard
        </button>
        <NewProjectForm
          onSubmit={handleCreateProject}
          onCancel={() => setShowNewProject(false)}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {error && (
          <div className="p-4 bg-red-50 text-red-700 rounded-lg mb-6">{error}</div>
        )}

        <ProjectList
          projects={projects}
          onCreateClick={() => setShowNewProject(true)}
          onEditClick={(id) => router.push(`/projects/${id}`)}
          onPublishClick={handlePublish}
          onUnpublishClick={handleUnpublish}
          onDeleteClick={handleDelete}
        />
      </div>
    </div>
  )
}