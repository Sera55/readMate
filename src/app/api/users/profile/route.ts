import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        topics: true,
        badges: true,
        books: true
      }
    });

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { userId, topics, bio, name } = await request.json();

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        bio,
        topics: {
          set: [], 
          connectOrCreate: topics.map((name: string) => ({
            where: { name },
            create: { name }
          }))
        }
      },
      include: { topics: true }
    });

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
