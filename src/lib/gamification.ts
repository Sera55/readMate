import { prisma } from './prisma';

export async function awardBadges(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      receivedExchanges: true, // as provider
      sentExchanges: true, // as requester
      badges: true
    }
  });

  if (!user) return [];

  const currentBadgeNames = user.badges.map(b => b.name);
  const newBadges = [];

  // 1. Top Contributor: Gifted 5+ books
  const giftCount = user.receivedExchanges.filter(e => e.type === 'GIFT' && e.status === 'COMPLETED').length;
  if (giftCount >= 5 && !currentBadgeNames.includes('Top Contributor')) {
    newBadges.push({ name: 'Top Contributor', icon: '🌟' });
  }

  // 2. Great Conversationalist: Completed 3+ swaps
  const swapCount = (user.receivedExchanges.filter(e => e.type === 'SWAP' && e.status === 'COMPLETED').length) +
                    (user.sentExchanges.filter(e => e.type === 'SWAP' && e.status === 'COMPLETED').length);
  if (swapCount >= 3 && !currentBadgeNames.includes('Great Conversationalist')) {
    newBadges.push({ name: 'Great Conversationalist', icon: '💬' });
  }

  // 3. Community Pillar: 10+ total interactions
  const totalInteractions = user.receivedExchanges.filter(e => e.status === 'COMPLETED').length +
                             user.sentExchanges.filter(e => e.status === 'COMPLETED').length;
  if (totalInteractions >= 10 && !currentBadgeNames.includes('Community Pillar')) {
    newBadges.push({ name: 'Community Pillar', icon: '🏛️' });
  }

  const awardedBadges = [];
  if (newBadges.length > 0) {
    for (const badgeData of newBadges) {
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          badges: {
            connectOrCreate: {
              where: { name: badgeData.name },
              create: badgeData
            }
          }
        },
        include: { badges: true }
      });
      awardedBadges.push(badgeData);
    }
  }

  return awardedBadges;
}
