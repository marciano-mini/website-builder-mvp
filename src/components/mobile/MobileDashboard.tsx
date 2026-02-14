'use client'

import { useEffect, useState } from 'react'
import MobileProjectCard from './MobileProjectCard'
import MobileNewProjectFlow from './MobileNewProjectFlow'

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

interface MobileDashboardProps {
  loading?: boolean
  projects: Project[]
  onRefresh: () => void
  onProjectTap: (projectId: string) => void
  onCreateProject: (project: { name: string; description: string; templateId: string }) => Promise<void>
  onPublish?: (projectId: string) => Promise<void>
  onUnpublish?: (projectId: string) => Promise<void>
  onDelete?: (projectId: string) => Promise<void>
}

export default function MobileDashboard({
  loading,
  projects,
  onRefresh,
  onProjectTap,
  onCreateProject,
  onPublish,
  onUnpublish,
  onDelete
}: MobileDashboardProps) {
  const [showNewProject, setShowNewProject] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await onRefresh()
    setTimeout(() => setIsRefreshing(false), 500)
  }

  const handlePublish = async (projectId: string) => {
    await onPublish?.(projectId)
  }

  const handleUnpublish = async (projectId: string) => {
    await onUnpublish?.(projectId)
  }

  const handleDelete = async (projectId: string) => {
    if (confirm('Website verwijderen? Dit kan niet ongedaan gemaakt worden.')) {
      await onDelete?.(projectId)
    }
  }

  const publishedCount = projects.filter(p => p.status === 'published').length
  const draftCount = projects.length - publishedCount

  if (showNewProject) {
    return (
      <MobileNewProjectFlow
        onSubmit={async (project) => {
          await onCreateProject(project)
          setShowNewProject(false)
        }}
        onCancel={() => setShowNewProject(false)}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="pt-4 pb-2 px-4 bg-white sticky top-0 z-30">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold">Mijn Websites</h1>
          <button
            onClick={handleRefresh}
            disabled={loading || isRefreshing}
            className="w-10 h-10 flex items-center justify-center rounded-full active:bg-gray-100 touch-target"
          >
            <svg
              className={`w-5 h-5 text-gray-600 ${isRefreshing ? 'animate-spin' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.051M20.949 9H21v5h-.051M4 20v-5h.001M20.95 14H21v.001M9 21.05A9.001 9.001 0 0012 20.949c2.853 0 5.521-1.316 7.218-3.563M15 12a3 3 0 11-6 0 3 3 0 016 0zm0 0v7m9-7a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>

        {/* Stats Pills */}
        <div className="flex gap-2">
          <div className="px-4 py-2 bg-gray-100 rounded-xl">
            <div className="text-xs text-gray-500">Alle</div>
            <div className="font-bold text-lg">{projects.length}</div>
          </div>
          <div className="px-4 py-2 bg-green-50 rounded-xl">
            <div className="text-xs text-gray-600">Live</div>
            <div className="font-bold text-lg text-green-600">{publishedCount}</div>
          </div>
          <div className="px-4 py-2 bg-yellow-50 rounded-xl">
            <div className="text-xs text-gray-600">Concept</div>
            <div className="font-bold text-lg text-yellow-600">{draftCount}</div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-2xl p-4">
                <div className="flex space-x-3">
                  <div className="w-12 h-12 rounded-full bg-gray-200 skeleton" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded skeleton" />
                    <div className="h-3 bg-gray-100 rounded skeleton w-2/3" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🏗️</div>
            <h3 className="text-xl font-bold mb-2">Nog geen websites</h3>
            <p className="text-gray-600 mb-6">
              Maak je eerste website in 2 minuten
            </p>
          </div>
        ) : (
          <div>
            {projects.map((project) => (
              <MobileProjectCard
                key={project.id}
                project={project}
                onTap={onProjectTap}
                onPublish={onPublish}
                onUnpublish={onUnpublish}
                onDelete={onDelete}
              />
            ))}
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      {projects.length >= 0 && (
        <button
          onClick={() => setShowNewProject(true)}
          className="fab fixed bottom-24 right-4 w-14 h-14 bg-blue-600 rounded-full shadow-lg flex items-center justify-center text-white active:scale-95 transition-transform z-40"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      )}
    </div>
  )
}