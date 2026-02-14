import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'

interface RouteParams {
  params: { id: string; pageId: string }
}

export async function PUT(request: Request, context: { params: Promise<{ id: string; pageId: string }> }) {
  try {
    const params = await context.params
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { title, slug, content, isPublished } = body

    // Verify page belongs to user's project
    const page = await prisma.page.findFirst({
      where: {
        id: params.pageId,
        projectId: params.id
      },
      include: {
        project: {
          select: { userId: true }
        }
      }
    })

    if (!page || page.project.userId !== session.user.id) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 })
    }

    // Check if slug is taken (if changing slug)
    if (slug && slug !== page.slug) {
      const existing = await prisma.page.findFirst({
        where: {
          projectId: params.id,
          slug,
          id: { not: params.pageId }
        }
      })

      if (existing) {
        return NextResponse.json(
          { error: 'Page with this slug already exists' },
          { status: 400 }
        )
      }
    }

    // Update page
    const updatedPage = await prisma.page.update({
      where: { id: params.pageId },
      data: {
        title: title || page.title,
        slug: slug || page.slug,
        content: content ? JSON.stringify(content) : page.content,
        isPublished: isPublished !== undefined ? isPublished : page.isPublished
      }
    })

    return NextResponse.json({
      success: true,
      page: {
        id: updatedPage.id,
        title: updatedPage.title,
        slug: updatedPage.slug,
        type: updatedPage.type,
        content: updatedPage.content ? JSON.parse(updatedPage.content) : {},
        order: updatedPage.order,
        isPublished: updatedPage.isPublished
      }
    })
  } catch (error: any) {
    console.error('Error updating page:', error)
    return NextResponse.json(
      { error: 'Failed to update page', details: error.message },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string; pageId: string }> }) {
  try {
    const params = await context.params
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Verify page belongs to user's project
    const page = await prisma.page.findFirst({
      where: {
        id: params.pageId,
        projectId: params.id
      },
      include: {
        project: {
          select: { userId: true }
        }
      }
    })

    if (!page || page.project.userId !== session.user.id) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 })
    }

    // Delete page
    await prisma.page.delete({
      where: { id: params.pageId }
    })

    return NextResponse.json({
      success: true,
      message: 'Page deleted successfully'
    })
  } catch (error: any) {
    console.error('Error deleting page:', error)
    return NextResponse.json(
      { error: 'Failed to delete page', details: error.message },
      { status: 500 }
    )
  }
}