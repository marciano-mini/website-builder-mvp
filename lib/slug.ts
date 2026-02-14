import { prisma } from '@/lib/db'

/**
 * Generate a unique URL slug from a project name
 * Examples:
 *   "Mijn Restaurant" → "mijn-restaurant"
 *   "De Top Kapper" → "de-top-kapper"
 *   "Best Bouw" → "best-bouw" (or "best-bouw-2" if exists)
 */
export async function generateSlug(input: string): Promise<string> {
  // Convert to lowercase and replace special chars with hyphens
  let slug = input
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9\s-]/g, '') // Keep only letters, numbers, spaces, hyphens
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Remove duplicate hyphens

  // Check if slug already exists
  const existing = await prisma.project.findUnique({
    where: { slug }
  })

  // If slug is unique, return it
  if (!existing) {
    return slug
  }

  // If slug exists, add number suffix
  let counter = 2
  let newSlug = `${slug}-${counter}`

  while (await prisma.project.findUnique({ where: { slug: newSlug } })) {
    counter++
    newSlug = `${slug}-${counter}`
  }

  return newSlug
}

/**
 * Validate if a slug is valid
 */
export function isValidSlug(slug: string): boolean {
  const slugRegex = /^[a-z0-9]([a-z0-9-]*[a-z0-9])?$/
  return slugRegex.test(slug)
}