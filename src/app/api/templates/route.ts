import { NextResponse } from 'next/server'
import { industryTemplates, industryCategories } from '@/lib/templates/industry-templates'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')

  // Return categories if requested
  if (searchParams.get('categories') === 'true') {
    return NextResponse.json({ categories: industryCategories })
  }

  // Filter by category if provided
  if (category && category !== 'all') {
    const filtered = industryTemplates.filter(t => t.category === category)
    return NextResponse.json({ templates: filtered })
  }

  // Return all templates
  return NextResponse.json({ templates: industryTemplates })
}