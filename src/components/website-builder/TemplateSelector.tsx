'use client'

import { useState, useEffect } from 'react'
import { industryTemplates, industryCategories } from '@/lib/templates/industry-templates'

interface TemplateSelectorProps {
  onSelect: (templateId: string) => void
}

export default function TemplateSelector({ onSelect }: TemplateSelectorProps) {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [templates, setTemplates] = useState(industryTemplates)

  useEffect(() => {
    if (selectedCategory === 'all') {
      setTemplates(industryTemplates)
    } else {
      setTemplates(
        industryTemplates.filter(t => t.category === selectedCategory)
      )
    }
  }, [selectedCategory])

  return (
    <div className="w-full">
      {/* Category Filter */}
      <div className="mb-8 overflow-x-auto">
        <div className="flex gap-2 min-w-max">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedCategory === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            Alle Templates
          </button>
          {industryCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {cat.nameNL}
            </button>
          ))}
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => onSelect(template.id)}
            className="text-left p-6 bg-white border border-gray-200 rounded-xl hover:border-blue-500 hover:shadow-lg transition-all"
          >
            {/* Template Preview (placeholder card) */}
            <div className="w-full h-40 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-4 flex items-center justify-center text-gray-400">
              <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
              </svg>
            </div>

            {/* Template Info */}
            <div>
              <h3 className="font-semibold text-lg mb-2">{template.nameNL}</h3>
              <p className="text-sm text-gray-600 mb-3">{template.descriptionNL}</p>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
                  {industryCategories.find(c => c.id === template.category)?.nameNL}
                </span>
                <span className="text-xs text-gray-500">
                  {template.structure.pages?.length || 4} pagina's
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* No Results */}
      {templates.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p>Geen templates gevonden in deze categorie.</p>
        </div>
      )}
    </div>
  )
}