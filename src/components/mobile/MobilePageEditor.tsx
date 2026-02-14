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

interface MobilePageEditorProps {
  page: Page
  onSave: (pageId: string, updates: { title: string; content: any }) => Promise<void>
  onPublishToggle?: (pageId: string) => Promise<void>
}

export default function MobilePageEditor({ page, onSave, onPublishToggle }: MobilePageEditorProps) {
  const [content, setContent] = useState(page.content || {})
  const [title, setTitle] = useState(page.title)
  const [isSaving, setIsSaving] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [autoSaved, setAutoSaved] = useState(false)

  const handleFieldChange = (key: string, value: string) => {
    setContent({ ...content, [key]: value })
    setAutoSaved(true)
    setTimeout(() => setAutoSaved(false), 2000)
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await onSave(page.id, { title, content })
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 2000)
    } catch (err: any) {
      alert(err.message || 'Opslaan mislukt')
    } finally {
      setIsSaving(false)
    }
  }

  // Auto-save on blur
  const handleBlur = () => {
    handleSave()
  }

  // Render different field types
  const renderField = (key: string, value: any) => {
    const isLong = typeof value === 'string' && value.length > 50

    if (isLong) {
      return (
        <textarea
          value={value}
          onChange={(e) => handleFieldChange(key, e.target.value)}
          onBlur={handleBlur}
          rows={4}
          placeholder={key}
          className="w-full px-4 py-3 text-base border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 active:scale-[0.99] transition-all"
        />
      )
    }

    return (
      <input
        type="text"
        value={value}
        onChange={(e) => handleFieldChange(key, e.target.value)}
        onBlur={handleBlur}
        placeholder={key}
        className="w-full px-4 py-3 text-base border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 active:scale-[0.99] transition-all"
      />
    )
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden mb-4">
      {/* Header with Status Toggle */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={handleBlur}
              className="text-xl font-bold bg-transparent border-none p-0 focus:ring-0 w-full"
              placeholder="Paginatitel"
            />
            <div className="flex items-center gap-2 mt-1">
              {onPublishToggle && (
                <button
                  onClick={() => onPublishToggle(page.id)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold touch-target ${
                    page.isPublished
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {page.isPublished ? '✓ Gepubliceerd' : '○ Concept'}
                </button>
              )}
              <span className="text-xs text-gray-400">{page.type}</span>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl font-medium text-sm active:scale-97 transition-all disabled:opacity-50 touch-target"
          >
            {isSaving ? 'Opslaan...' : 'Opslaan'}
          </button>

          {autoSaved && (
            <div className="flex items-center gap-1 text-xs text-green-600">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Auto-opgeslagen
            </div>
          )}

          {showSuccess && (
            <div className="flex items-center gap-1 text-xs text-green-600">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Opgeslagen!
            </div>
          )}
        </div>
      </div>

      {/* Content Fields */}
      <div className="p-4 space-y-4">
        {Object.keys(content).map((key) => (
          <div key={key}>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-sm text-gray-600 uppercase tracking-wider">
              {key}
            </label>
            {renderField(key, content[key])}
          </div>
        ))}
      </div>
    </div>
  )
}