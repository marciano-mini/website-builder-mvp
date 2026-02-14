'use client'

import { useState } from 'react'

interface Page {
  id: string
  title: string
  slug: string
  type: string
  content: any
  order: number
  isPublished: boolean
}

interface PageEditorProps {
  page: Page
  onSave: (pageId: string, updates: { title: string; content: any }) => Promise<void>
  onPublishToggle?: (pageId: string) => Promise<void>
  onDelete?: (pageId: string) => Promise<void>
}

export default function PageEditor({ page, onSave, onPublishToggle, onDelete }: PageEditorProps) {
  const [content, setContent] = useState(page.content || {})
  const [title, setTitle] = useState(page.title)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSave = async () => {
    setError('')
    setSuccess(false)
    setIsSaving(true)

    try {
      await onSave(page.id, { title, content })
      setSuccess(true)

      setTimeout(() => setSuccess(false), 2000)
    } catch (err: any) {
      setError(err.message || 'Opslaan mislukt')
    } finally {
      setIsSaving(false)
    }
  }

  const renderContentFields = () => {
    // Render fields based on content structure
    return Object.keys(content).map((key) => (
      <div key={key} className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
          {key}
        </label>
        {typeof content[key] === 'string' && content[key].length > 100 ? (
          <textarea
            value={content[key]}
            onChange={(e) => setContent({ ...content, [key]: e.target.value })}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        ) : (
          <input
            type="text"
            value={content[key]}
            onChange={(e) => setContent({ ...content, [key]: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        )}
      </div>
    ))
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold">{page.title}</h3>
          <p className="text-sm text-gray-500">{page.type} pagina</p>
        </div>
        <div className="flex items-center gap-2">
          {onPublishToggle && (
            <button
              onClick={() => onPublishToggle(page.id)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                page.isPublished
                  ? 'bg-green-100 text-green-700 hover:bg-green-200'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {page.isPublished ? 'Gepubliceerd' : 'Concept'}
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(page.id)}
              className="p-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Content Fields */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Paginatitel
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {renderContentFields()}

      {/* Status Messages */}
      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-lg mb-4">{error}</div>
      )}
      {success && (
        <div className="p-4 bg-green-50 text-green-700 rounded-lg mb-4">
          Opgeslagen!
        </div>
      )}

      {/* Save Button */}
      <button
        onClick={handleSave}
        disabled={isSaving}
        className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {isSaving ? (
          <>
            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Opslaan...
          </>
        ) : (
          'Opslaan'
        )}
      </button>
    </div>
  )
}