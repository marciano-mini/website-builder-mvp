import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'

interface RouteParams {
  params: { id: string }
}

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  const params = await context.params
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { title, slug, type, content } = body

    // Validate fields
    if (!title || !type) {
      return NextResponse.json(
        { error: 'Title and type are required' },
        { status: 400 }
      )
    }

    // Verify project ownership
    const project = await prisma.project.findFirst({
      where: {
        id: params.id,
        userId: session.user.id
      }
    })

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    // Check if slug already exists in this project
    if (slug) {
      const existingPage = await prisma.page.findFirst({
        where: {
          projectId: params.id,
          slug
        }
      })

      if (existingPage) {
        return NextResponse.json(
          { error: 'Page with this slug already exists' },
          { status: 400 }
        )
      }
    }

    // Get next order
    const maxOrder = await prisma.page.findFirst({
      where: { projectId: params.id },
      select: { order: true },
      orderBy: { order: 'desc' }
    })

    const order = (maxOrder?.order ?? 0) + 1

    // Create page
    const page = await prisma.page.create({
      data: {
        projectId: params.id,
        title,
        slug: slug || title.toLowerCase().replace(/\s+/g, '-'),
        type,
        content: content ? JSON.stringify(content) : '{}',
        order,
        isPublished: false
      }
    })

    return NextResponse.json({
      success: true,
      page: {
        id: page.id,
        title: page.title,
        slug: page.slug,
        type: page.type,
        content: page.content,
        order: page.order,
        isPublished: page.isPublished
      }
    })
  } catch (error: any) {
    console.error('Error creating page:', error)
    return NextResponse.json(
      { error: 'Failed to create page', details: error.message },
      { status: 500 }
    )
  }
}

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  const params = await context.params
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Verify project ownership
    const project = await prisma.project.findFirst({
      where: {
        id: params.id,
        userId: session.user.id
      }
    })

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    // Get all pages
    const pages = await prisma.page.findMany({
      where: { projectId: params.id },
      orderBy: { order: 'asc' }
    })

    return NextResponse.json({
      success: true,
      pages: pages.map(p => ({
        id: p.id,
        title: p.title,
        slug: p.slug,
        type: p.type,
        content: p.content ? JSON.parse(p.content) : {},
        order: p.order,
        isPublished: p.isPublished
      }))
    })
  } catch (error: any) {
    console.error('Error fetching pages:', error)
    return NextResponse.json(
      { error: 'Failed to fetch pages', details: error.message },
      { status: 500 }
    )
  }
}