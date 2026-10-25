import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const lat = parseFloat(searchParams.get('lat') || '0');
    const lng = parseFloat(searchParams.get('lng') || '0');
    const radius = parseFloat(searchParams.get('radius') || '5'); // km

    // ~111km per degree of latitude
    const latDelta = radius / 111;
    const lngDelta = radius / (111 * Math.cos(lat * Math.PI / 180));

    const books = await prisma.book.findMany({
      where: {
        status: 'AVAILABLE',
        latitude: {
          gte: lat - latDelta,
          lte: lat + latDelta
        },
        longitude: {
          gte: lng - lngDelta,
          lte: lng + lngDelta
        }
      },
      include: { owner: true }
    });

    return NextResponse.json(books);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
