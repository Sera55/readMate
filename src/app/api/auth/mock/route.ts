import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, lat, lng, topics } = body;

    let user = await prisma.user.findFirst({
      where: { email },
      include: { topics: true }
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          name: name || 'Mock User',
          email,
          latitude: lat || 40.7128,
          longitude: lng || -74.0060,
          socialCredits: 10,
          topics: {
            connectOrCreate: topics?.map((topicName: string) => ({
              where: { name: topicName },
              create: { name: topicName }
            })) || []
          }
        },
        include: { topics: true }
      });
    }

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
