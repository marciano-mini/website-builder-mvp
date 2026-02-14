'use client'

import { useState } from 'react'
import { industryTemplates, industryCategories } from '@/lib/templates/industry-templates'
import MobileTemplateSelector from './MobileTemplateSelector'

interface MobileNewProjectFlowProps {
  onSubmit: (project: { name: string; description: string; templateId: string }) => Promise<void>
  onCancel: () => void
}

export default function MobileNewProjectFlow({ onSubmit, onCancel }: MobileNewProjectFlowProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [templateId, setTemplateId] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const templates = industryTemplates
  const selectedTemplate = templates.find(t => t.id === templateId)

  // Step 1: Template (already covered by MobileTemplateSelector)
  // Step 2: Name
  const handleNameSubmit = () => {
    if (name.trim().length > 0) {
      setStep(3)
    } else {
      alert('Vul een naam in')
    }
  }

  // Step 3: Description (optional) → Submit
  const handleFinalSubmit = async () => {
    setIsSubmitting(true)
    try {
      await onSubmit({
        name: name.trim(),
        description: description.trim(),
        templateId
      })
    } catch (error) {
      setIsSubmitting(false)
      alert('Er ging iets mis. Probeer het opnieuw.')
    }
  }

  // Progress bar
  const getProgress = () => {
    switch (step) {
      case 1: return 33
      case 2: return 66
      case 3: return 100
      default: return 33
    }
  }

  const getStepTitle = () => {
    switch (step) {
      case 1: return 'Kies Template'
      case 2: return 'Naam van je site'
      case 3: return 'Bijna klaar!'
    }
  }

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col safe-pb">
      {/* Header */}
      <div className="pt-4 pb-2 px-4 bg-white border-b border-gray-100">
        {/* Back Button */}
        <button
          onClick={step > 1 && !isSubmitting ? () => setStep((step - 1) as 1 | 2 | 3) : onCancel}
          className="w-12 h-12 flex items-center justify-center -ml-4 touch-target"
        >
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <h1 className="text-xl font-bold mt-[-40px] pl-8">
          {getStepTitle()}
        </h1>

        {/* Progress Bar */}
        <div className="mt-3 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 rounded-full transition-all duration-300"
            style={{ width: `${getProgress()}%` }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {step === 1 && (
          <MobileTemplateSelector onSelect={(id) => {
            setTemplateId(id)
            setStep(2)
          }} />
        )}

        {step === 2 && (
          <div className="p-6">
            {/* Selected Template Preview */}
            <div className="bg-gray-50 rounded-2xl p-4 mb-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">
                  {getCategoryEmoji(selectedTemplate?.category || '')}
                </span>
                <div>
                  <h3 className="font-semibold">{selectedTemplate?.nameNL}</h3>
                  <p className="text-sm text-gray-500">
                    {industryCategories.find(c => c.id === selectedTemplate?.category)?.nameNL}
                  </p>
                </div>
              </div>
            </div>

            {/* Name Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Naam van je website
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="bijvoorbeeld: De Gezellige Eetkamer"
                autoFocus
                className="w-full px-4 py-4 text-lg border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 active:scale-98 transition-transform"
              />
              <p className="text-xs text-gray-500">
                URL: <span className="font-mono">jouw-domein.nl/{name.toLowerCase().replace(/\s+/g, '-')}</span>
              </p>
            </div>

            {/* Continue Button */}
            <button
              onClick={handleNameSubmit}
              className="w-full mt-8 px-6 py-4 bg-blue-600 text-white rounded-2xl font-semibold text-lg active:scale-98 transition-transform"
            >
              Doorgaan
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="p-6">
            {/* Success Preview */}
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-6 mb-6 text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-lg">
                <span className="text-4xl">✨</span>
              </div>
              <h3 className="text-xl font-bold mb-2">
                {name}
              </h3>
              <p className="text-gray-600">
                {selectedTemplate?.nameNL}
              </p>
            </div>

            {/* Description Input (Optional) */}
            <div className="space-y-2 mb-6">
              <label className="text-sm font-medium text-gray-700">
                Beschrijving <span className="text-gray-400 font-normal">(optioneel)</span>
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Vertel kort wat je website overgaat..."
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={handleFinalSubmit}
              disabled={isSubmitting}
              className="w-full px-6 py-4 bg-green-600 text-white rounded-2xl font-semibold text-lg active:scale-98 transition-transform disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Maken...
                </>
              ) : (
                '🚀 Maak Website'
              )}
            </button>
          </div>
        )}
      </div>
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