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

    // Unpublish project
    const unpublished = await prisma.project.update({
      where: { id: params.id },
      data: { status: 'draft' }
    })

    return NextResponse.json({
      success: true,
      project: {
        id: unpublished.id,
        name: unpublished.name,
        slug: unpublished.slug,
        status: unpublished.status
      }
    })
  } catch (error: any) {
    console.error('Error unpublishing project:', error)
    return NextResponse.json(
      { error: 'Failed to unpublish project', details: error.message },
      { status: 500 }
    )
  }
}