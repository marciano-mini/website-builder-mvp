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

    // Publish project
    const published = await prisma.project.update({
      where: { id: params.id },
      data: { status: 'published' }
    })

    return NextResponse.json({
      success: true,
      project: {
        id: published.id,
        name: published.name,
        slug: published.slug,
        status: published.status,
        publishedUrl: `https://${process.env.NEXTAUTH_URL || 'localhost:3000'}/${published.slug}`
      }
    })
  } catch (error: any) {
    console.error('Error publishing project:', error)
    return NextResponse.json(
      { error: 'Failed to publish project', details: error.message },
      { status: 500 }
    )
  }
}