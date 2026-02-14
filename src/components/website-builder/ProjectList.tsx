'use client'

import { useState } from 'react'
import Link from 'next/link'

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

interface ProjectListProps {
  projects: Project[]
  onCreateClick: () => void
  onEditClick: (projectId: string) => void
  onPublishClick: (projectId: string) => Promise<void>
  onUnpublishClick: (projectId: string) => Promise<void>
  onDeleteClick: (projectId: string) => Promise<void>
}

export default function ProjectList({
  projects,
  onCreateClick,
  onEditClick,
  onPublishClick,
  onUnpublishClick,
  onDeleteClick
}: ProjectListProps) {
  const [actionInProgress, setActionInProgress] = useState<string | null>(null)

  const handleAction = async (projectId: string, action: () => Promise<void>) => {
    setActionInProgress(projectId)
    try {
      await action()
    } catch (error) {
      console.error('Action failed:', error)
    } finally {
      setActionInProgress(null)
    }
  }

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      horeca: '🍽️',
      webshop: '🛒',
      bouw: '🏗️',
      beauty: '💇‍♀️',
      fitness: '🏋️',
      zakelijk: '👔',
      diensten: '🔧',
      specialisten: '🩺'
    }
    return icons[category] || '📄'
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Mijn Websites</h1>
          <p className="text-gray-600 mt-1">Beheer je gepubliceerde websites</p>
        </div>
        <button
          onClick={onCreateClick}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Nieuwe Website
        </button>
      </div>

      {/* Projects Grid */}
      {projects.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-2xl">
          <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="text-xl font-semibold mb-2">Nog geen websites</h3>
          <p className="text-gray-600 mb-6">Maak je eerste website in 2 minuten</p>
          <button
            onClick={onCreateClick}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Maak eerste website
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Card Header */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-2xl">
                    {getCategoryIcon(project.templateCategory)}
                  </span>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    project.status === 'published' && !actionInProgress
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {project.status === 'published' && !actionInProgress ? 'Gepubliceerd' : 'Concept'}
                  </span>
                </div>

                <h3 className="font-semibold text-lg mb-1">{project.name}</h3>
                <p className="text-xs text-gray-500 mb-4">
                  {project.templateName} • {project.pageCount} pagina's
                </p>

                {/* URL */}
                <div className="text-sm text-gray-600 mb-2">
                  <a
                    href={`/${project.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline break-all"
                  >
                    /{project.slug}
                  </a>
                </div>

                <p className="text-xs text-gray-400">
                  Gepubliceerd {new Date(project.updatedAt).toLocaleDateString('nl-NL')}
                </p>
              </div>

              {/* Card Actions */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center gap-2">
                {actionInProgress === project.id ? (
                  <div className="flex-1 flex items-center justify-center text-gray-400">
                    <svg className="animate-spin w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Bezig...
                  </div>
                ) : (
                  <>
                    <button
                      onClick={() => onEditClick(project.id)}
                      className="flex-1 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Bewerken
                    </button>

                    {project.status === 'published' ? (
                      <button
                        onClick={() => handleAction(project.id, () => onUnpublishClick(project.id))}
                        className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        De-publiceren
                      </button>
                    ) : (
                      <button
                        onClick={() => handleAction(project.id, () => onPublishClick(project.id))}
                        className="px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Publiceren
                      </button>
                    )}

                    <button
                      onClick={() => handleAction(project.id, () => onDeleteClick(project.id))}
                      className="px-4 py-2 text-sm border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Stats */}
      {projects.length > 0 && (
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 rounded-xl p-6">
            <div className="text-3xl font-bold text-blue-600">{projects.length}</div>
            <div className="text-blue-800">Totaal websites</div>
          </div>
          <div className="bg-green-50 rounded-xl p-6">
            <div className="text-3xl font-bold text-green-600">
              {projects.filter(p => p.status === 'published').length}
            </div>
            <div className="text-green-800">Gepubliceerd</div>
          </div>
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="text-3xl font-bold text-gray-600">
              {projects.reduce((sum, p) => sum + p.pageCount, 0)}
            </div>
            <div className="text-gray-800">Pagina's</div>
          </div>
        </div>
      )}
    </div>
  )
}