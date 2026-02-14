'use client'

import { useState } from 'react'
import TemplateSelector from './TemplateSelector'

interface NewProjectFormProps {
  onSubmit: (project: { name: string; description: string; templateId: string }) => void
  onCancel?: () => void
}

export default function NewProjectForm({ onSubmit, onCancel }: NewProjectFormProps) {
  const [step, setStep] = useState<'template' | 'details'>('template')
  const [templateId, setTemplateId] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSelectTemplate = (id: string) => {
    setTemplateId(id)
    setStep('details')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!name.trim()) {
      setError('Projectnaam is verplicht')
      return
    }

    setIsSubmitting(true)

    try {
      await onSubmit({
        name: name.trim(),
        description: description.trim(),
        templateId
      })
    } catch (err: any) {
      setError(err.message || 'Er is iets misgegaan')
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-8">
      {/* Progress Indicator */}
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center gap-4">
          <div className={`flex items-center gap-2 ${step === 'template' ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step === 'template' ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}>
              1
            </div>
            <span className="font-medium">Kies Template</span>
          </div>
          <div className="w-12 h-0.5 bg-gray-200"></div>
          <div className={`flex items-center gap-2 ${step === 'details' ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step === 'details' ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}>
              2
            </div>
            <span className="font-medium">Vul Details</span>
          </div>
        </div>
      </div>

      {/* Step 1: Template Selection */}
      {step === 'template' && (
        <div>
          <h2 className="text-2xl font-bold mb-2">Kies een template</h2>
          <p className="text-gray-600 mb-6">
            Selecteer een professionele template voor jouw type bedrijf
          </p>
          <TemplateSelector onSelect={handleSelectTemplate} />
        </div>
      )}

      {/* Step 2: Project Details */}
      {step === 'details' && (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Back Button */}
          <button
            type="button"
            onClick={() => setStep('template')}
            className="text-blue-600 hover:text-blue-700 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Terug naar template selectie
          </button>

          <div>
            <h2 className="text-2xl font-bold mb-2">Vertel ons over jouw website</h2>
            <p className="text-gray-600 mb-6">
              Vul een paar details in en wij maken je website in enkele seconden
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-50 text-red-700 rounded-lg">{error}</div>
          )}

          {/* Name Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Naam van je website *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="bijvoorbeeld: De Gezellige Eetkamer"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={isSubmitting}
            />
            <p className="mt-1 text-xs text-gray-500">
              Dit wordt ook de URL: <span className="font-medium">jouw-domein.nl/{name.toLowerCase().replace(/\s+/g, '-')}</span>
            </p>
          </div>

          {/* Description Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Beschrijving (optioneel)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Vertel kort wat je website overgaat..."
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={isSubmitting}
            />
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-3">
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                disabled={isSubmitting}
              >
                Annuleren
              </button>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Bezig met maken...
                </>
              ) : (
                'Maak Website'
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  )
}