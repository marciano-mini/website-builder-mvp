import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { generateSlug } from '@/lib/slug'
import { getTemplatePages } from '@/lib/templates/utils'

export async function POST(request: Request) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { name, description, templateId } = body

    // Validate required fields
    if (!name) {
      return NextResponse.json({ error: 'Project name is required' }, { status: 400 })
    }

    if (!templateId) {
      return NextResponse.json({ error: 'Template is required' }, { status: 400 })
    }

    // Get user
    const user = await prisma.user.findUnique({
      where: { id: session.user.id }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Verify template exists
    const template = await prisma.template.findUnique({
      where: { id: templateId }
    })

    if (!template) {
      return NextResponse.json({ error: 'Template not found' }, { status: 404 })
    }

    // Generate unique slug
    const slug = await generateSlug(name)

    // Create project with pages
    const project = await prisma.project.create({
      data: {
        name,
        slug,
        description,
        status: 'draft',
        templateId,
        userId: user.id,
        // Auto-create pages from template
        pages: {
          create: getTemplatePages(templateId)
        }
      },
      include: {
        pages: {
          orderBy: { order: 'asc' }
        }
      }
    })

    return NextResponse.json({
      success: true,
      project: {
        id: project.id,
        name: project.name,
        slug: project.slug,
        status: project.status,
        templateId: project.templateId,
        pages: project.pages
      }
    })
  } catch (error: any) {
    console.error('Error creating project:', error)
    return NextResponse.json(
      { error: 'Failed to create project', details: error.message },
      { status: 500 }
    )
  }
}

export async function GET(request: Request) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get all projects for user
    const projects = await prisma.project.findMany({
      where: { userId: session.user.id },
      include: {
        template: true,
        _count: {
          select: { pages: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({
      success: true,
      projects: projects.map(p => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        status: p.status,
        templateId: p.templateId,
        templateName: p.template?.name,
        templateCategory: p.template?.category,
        pageCount: p._count.pages,
        createdAt: p.createdAt,
        updatedAt: p.updatedAt
      }))
    })
  } catch (error: any) {
    console.error('Error fetching projects:', error)
    return NextResponse.json(
      { error: 'Failed to fetch projects', details: error.message },
      { status: 500 }
    )
  }
}