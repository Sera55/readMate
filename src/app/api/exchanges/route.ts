import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { awardBadges } from '@/lib/gamification';

export async function POST(request: Request) {
  try {
    const { requesterId, bookId, type } = await request.json();

    const book = await prisma.book.findUnique({
      where: { id: bookId },
      include: { owner: { include: { topics: true } } }
    });

    if (!book || book.status !== 'AVAILABLE') {
      return NextResponse.json({ error: 'Book not available' }, { status: 400 });
    }

    const requester = await prisma.user.findUnique({
      where: { id: requesterId },
      include: { topics: true }
    });

    if (!requester) {
      return NextResponse.json({ error: 'Requester not found' }, { status: 404 });
    }

    const exchange = await prisma.exchange.create({
      data: {
        requesterId,
        providerId: book.ownerId,
        bookId,
        type,
        status: 'PENDING'
      }
    });

    // Find matching topics
    const requesterTopicNames = requester.topics.map(t => t.name);
    const providerTopicNames = book.owner.topics.map(t => t.name);
    const matchingTopics = requesterTopicNames.filter(t => providerTopicNames.includes(t));

    return NextResponse.json({
      exchange,
      discussionPrompt: `Would you like to grab a coffee and discuss "${book.title}"?`,
      matchingTopics
    });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const { exchangeId, status } = await request.json();

    const exchange = await prisma.exchange.update({
      where: { id: exchangeId },
      data: { status },
      include: { book: true, provider: true }
    });

    if (status === 'COMPLETED') {
      // Update book status
      await prisma.book.update({
        where: { id: exchange.bookId },
        data: { status: exchange.type === 'GIFT' ? 'GIFTED' : 'SWAPPED' }
      });

      // Update social credits if it's a gift
      if (exchange.type === 'GIFT') {
        await prisma.user.update({
          where: { id: exchange.providerId },
          data: { socialCredits: { increment: 5 } }
        });
      }

      // Check for badges
      await awardBadges(exchange.providerId);
      await awardBadges(exchange.requesterId);
    }

    return NextResponse.json(exchange);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
