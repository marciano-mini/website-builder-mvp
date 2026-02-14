'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { auth } from '@/lib/auth'
import MobileDashboard from '@/components/mobile/MobileDashboard'
import MobileNav from '@/components/mobile/MobileNav'

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

export default function MobileDashboardPage() {
  const router = useRouter()
  const [session, setSession] = useState<any>(null)
  const [projects, setProjects] = useState<Project[]>([])
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
    setLoading(true)
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

  const handlePublish = async (projectId: string) => {
    const res = await fetch(`/api/projects/${projectId}/publish`, { method: 'POST' })
    const data = await res.json()

    if (!data.success) {
      throw new Error(data.error || 'Publiceren mislukt')
    }
    await fetchProjects()
  }

  const handleUnpublish = async (projectId: string) => {
    const res = await fetch(`/api/projects/${projectId}/unpublish`, { method: 'POST' })
    const data = await res.json()

    if (!data.success) {
      throw new Error(data.error || 'De-publiceren mislukt')
    }
    await fetchProjects()
  }

  const handleDelete = async (projectId: string) => {
    const res = await fetch(`/api/projects/${projectId}`, { method: 'DELETE' })
    const data = await res.json()

    if (!data.success) {
      throw new Error(data.error || 'Verwijderen mislukt')
    }
    await fetchProjects()
  }

  const handleCreateProject = async (project: { name: string; description: string; templateId: string }) => {
    const res = await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(project)
    })

    const data = await res.json()

    if (data.success) {
      await fetchProjects()
      router.push(`/projects/${data.project.id}`)
    } else {
      throw new Error(data.error || 'Project aanmaken mislukt')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {error && (
        <div className="fixed top-0 left-0 right-0 z-50 p-4 bg-red-50 text-red-700">
          {error}
        </div>
      )}

      <MobileDashboard
        loading={loading}
        projects={projects}
        onRefresh={fetchProjects}
        onProjectTap={(id) => router.push(`/projects/${id}`)}
        onCreateProject={handleCreateProject}
        onPublish={handlePublish}
        onUnpublish={handleUnpublish}
        onDelete={handleDelete}
      />

      <MobileNav />
    </div>
  )
}