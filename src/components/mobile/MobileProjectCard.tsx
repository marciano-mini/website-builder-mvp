'use client'

import { useRef } from 'react'

interface Project {
  id: string
  name: string
  slug: string
  status: string
  templateName: string
  templateCategory: string
  pageCount: number
  updatedAt: string
}

interface MobileProjectCardProps {
  project: Project
  onTap: (projectId: string) => void
  onPublish?: (projectId: string) => void
  onUnpublish?: (projectId: string) => void
  onDelete?: (projectId: string) => void
}

export default function MobileProjectCard({
  project,
  onTap,
  onPublish,
  onUnpublish,
  onDelete
}: MobileProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  const getCategoryEmoji = (category: string): string => {
    const emojis: Record<string, string> = {
      horeca: '🍽️',
      webshop: '🛒',
      bouw: '🏗️',
      beauty: '💇‍♀️',
      fitness: '🏋️',
      zakelijk: '👔',
      diensten: '🔧',
      specialisten: '🩺'
    }
    return emojis[category] || '📄'
  }

  const isPublished = project.status === 'published'

  return (
    <div className="relative touch-action-pan-x mb-3" ref={cardRef}>
      {/* Swipe Actions Background */}
      <div className="swipe-actions absolute inset-0 right-0 z-0 flex overflow-hidden rounded-2xl">
        {isPublished && onUnpublish && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              onUnpublish?.(project.id)
            }}
            className="flex-1 bg-orange-500 text-white text-sm font-medium touch-target"
          >
           📴
          </button>
        )}
        {!isPublished && onPublish && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              onPublish?.(project.id)
            }}
            className="flex-1 bg-green-500 text-white text-sm font-medium touch-target"
          >
            📢
          </button>
        )}
        {onDelete && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              onDelete?.(project.id)
            }}
            className="w-20 bg-red-500 text-white touch-target"
          >
            🗑️
          </button>
        )}
      </div>

      {/* Card */}
      <div
        onClick={() => onTap(project.id)}
        className="relative bg-white border border-gray-200 rounded-2xl p-4 z-10 active:scale-[0.98] transition-transform cursor-pointer"
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">
                {getCategoryEmoji(project.templateCategory)}
              </span>
              <h3 className="font-semibold text-base">{project.name}</h3>
            </div>
            <p className="text-xs text-gray-500">
              {project.templateName}
            </p>
          </div>

          {/* Status */}
          <div className={`px-2.5 py-1 rounded-full text-[10px] font-semibold ${
            isPublished
              ? 'bg-green-100 text-green-700'
              : 'bg-yellow-100 text-yellow-700'
          }`}>
            {isPublished ? 'Live' : 'Concept'}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-gray-100">
          <div className="text-center">
            <div className="text-[10px] text-gray-500">Pagina's</div>
            <div className="font-semibold text-sm">{project.pageCount}</div>
          </div>
          <div className="text-center">
            <div className="text-[10px] text-gray-500">Status</div>
            <div className="font-semibold text-sm">
              {isPublished ? '✓' : '…'}
            </div>
          </div>
          <div className="text-center">
            <div className="text-[10px] text-gray-500">Tijd</div>
            <div className="font-semibold text-xs text-gray-600">
              {new Date(project.updatedAt).toLocaleDateString('nl-NL')}
            </div>
          </div>
        </div>

        {/* URL Preview */}
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="text-xs text-gray-500 font-mono bg-gray-50 px-3 py-2 rounded-lg">
            /{project.slug}
          </div>
        </div>
      </div>
    </div>
  )
}