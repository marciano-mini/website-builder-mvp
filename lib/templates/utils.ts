import { industryTemplates } from './industry-templates'
import { Page } from '@prisma/client'

/**
 * Extract pages from template structure
 */
export function getTemplatePages(templateId: string) {
  const template = industryTemplates.find(t => t.id === templateId)

  if (!template || !template.structure.pages) {
    return []
  }

  return template.structure.pages.map(pageType => {
    const content: any = template.structure.defaultContent?.[pageType as keyof typeof template.structure.defaultContent] || {}
    return {
      type: pageType,
      title: getPageTitle(pageType),
      slug: getPageSlug(pageType),
      content: JSON.stringify(content),
      isPublished: pageType === 'home', // Always publish home page
      order: getPageOrder(pageType)
    }
  })
}

/**
 * Get Dutch title for page type
 */
function getPageTitle(pageType: string): string {
  const titles: Record<string, string> = {
    home: 'Home',
    menu: 'Menu',
    about: 'Over ons',
    contact: 'Contact',
    services: 'Diensten',
    portfolio: 'Portfolio',
    shop: 'Winkel',
    products: 'Producten',
    pricing: 'Prijzen',
    classes: 'Lessen',
    instructors: 'Instructeurs',
    'practice-areas': 'Rechtsgebieden',
    properties: 'Woningen',
    treatments: 'Behandelingen'
  }

  return titles[pageType] || pageType
}

/**
 * Get URL slug for page type
 */
function getPageSlug(pageType: string): string {
  if (pageType === 'home') return ''

  const slugs: Record<string, string> = {
    menu: 'menu',
    about: 'over-ons',
    contact: 'contact',
    services: 'diensten',
    portfolio: 'portfolio',
    shop: 'winkel',
    products: 'producten',
    pricing: 'prijzen',
    classes: 'lessen',
    instructors: 'instructeurs',
    'practice-areas': 'rechtsgebieden',
    properties: 'woningen',
    treatments: 'behandelingen'
  }

  return slugs[pageType] || pageType.replace(/_/g, '-')
}

/**
 * Get display order for page
 */
function getPageOrder(pageType: string): number {
  const order: Record<string, number> = {
    home: 0,
    about: 1,
    menu: 2,
    services: 3,
    products: 4,
    portfolio: 5,
    pricing: 6,
    contact: 10 // Always last
  }

  return order[pageType] || 99
}

/**
 * Merge project data into template content
 */
export function mergeContentWithProject(templateContent: any, projectName: string, description?: string) {
  const merged = {
    ...templateContent,
    projectName
  }

  // Replace [Restaurant Naam] with actual name
  if (merged.hero) {
    merged.hero = merged.hero.replace(/\[.*?\]/, projectName)
  }

  // Add description if provided
  if (description && !merged.description) {
    merged.description = description
  }

  return merged
}

/**
 * Validate page content structure
 */
export function validatePageContent(content: any): boolean {
  if (!content || typeof content !== 'object') {
    return false
  }

  // Required fields: hero
  if (!content.hero) {
    return false
  }

  // Optional fields: description, cta, tagline
  return true
}