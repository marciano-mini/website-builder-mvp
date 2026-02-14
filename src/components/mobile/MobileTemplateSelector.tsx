'use client'

import { useState, useRef } from 'react'
import { industryTemplates, industryCategories } from '@/lib/templates/industry-templates'

interface MobileTemplateSelectorProps {
  onSelect: (templateId: string) => void
}

export default function MobileTemplateSelector({ onSelect }: MobileTemplateSelectorProps) {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const scrollRef = useRef<HTMLDivElement>(null)

  // Filter templates
  const filteredTemplates = selectedCategory === 'all'
    ? industryTemplates
    : industryTemplates.filter(t => t.category === selectedCategory)

  // Scroll to active category
  const scrollToCategory = (categoryId: string) => {
    const index = industryCategories.findIndex(c => c.id === categoryId)
    const element = scrollRef.current?.children[index]
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
    }
  }

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId)
    scrollToCategory(categoryId)
  }

  return (
    <div className="pb-24">
      {/* Horizontal Category Pills */}
      <div className="sticky top-0 bg-white z-10 border-b border-gray-100">
        <div
          ref={scrollRef}
          className="flex gap-2 px-4 py-3 overflow-x-auto scrollbar-hide snap-x"
        >
          <button
            onClick={() => handleCategoryChange('all')}
            className={`flex-shrink-0 px-4 py-2.5 rounded-full text-sm font-medium snap-center transition-all ${
              selectedCategory === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
            }`}
          >
            Alle
          </button>
          {industryCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`flex-shrink-0 px-4 py-2.5 rounded-full text-sm font-medium snap-center transition-all ${
                selectedCategory === cat.id ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
              }`}
            >
              {cat.nameNL}
            </button>
          ))}
        </div>
      </div>

      {/* Templates Grid */}
      <div className="p-4 grid grid-cols-2 gap-3">
        {filteredTemplates.map((template) => (
          <button
            key={template.id}
            onClick={() => onSelect(template.id)}
            className="bg-white rounded-2xl border border-gray-200 overflow-hidden active:scale-95 transition-transform"
          >
            {/* Template Preview Placeholder */}
            <div className="aspect-[4/3] bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
              <div className="text-center">
                <span className="text-4xl mb-2 block">
                  {getCategoryEmoji(template.category)}
                </span>
                <span className="text-xs text-gray-400">
                  {template.structure.pages?.length || 4}p
                </span>
              </div>
            </div>

            {/* Template Info */}
            <div className="p-3">
              <h3 className="font-semibold text-sm mb-1 line-clamp-2">
                {template.nameNL}
              </h3>
              <p className="text-[11px] text-gray-500 line-clamp-1">
                {template.descriptionNL}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Swipe Hints */}
      {filteredTemplates.length > 4 && (
        <div className="text-center mt-4">
          <div className="inline-flex items-center gap-2 text-gray-400 text-sm">
            <svg className="w-5 h-5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
            <span>Swipe om meer te zien</span>
          </div>
        </div>
      )}
    </div>
  )
}

function getCategoryEmoji(category: string): string {
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