async function test() {
  const baseUrl = 'http://localhost:3000';
  
  console.log('Setting up for gamification test...');
  const providerRes = await fetch(`${baseUrl}/api/auth/mock`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'provider@example.com', name: 'Provider' })
  });
  const provider = await providerRes.json();

  const requesterRes = await fetch(`${baseUrl}/api/auth/mock`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'requester@example.com', name: 'Requester' })
  });
  const requester = await requesterRes.json();

  console.log('Creating 5 books for provider...');
  const bookIds = [];
  for (let i = 1; i <= 5; i++) {
    const res = await fetch(`${baseUrl}/api/books`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: `Book ${i}`, author: 'Author', ownerId: provider.id, lat: 40, lng: -74 })
    });
    const book = await res.json();
    bookIds.push(book.id);
  }

  console.log('Completing 5 GIFT exchanges...');
  for (const bookId of bookIds) {
    const exRes = await fetch(`${baseUrl}/api/exchanges`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ requesterId: requester.id, bookId, type: 'GIFT' })
    });
    const exData = await exRes.json();
    
    await fetch(`${baseUrl}/api/exchanges`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ exchangeId: exData.exchange.id, status: 'COMPLETED' })
    });
  }

  console.log('Checking if Provider got "Top Contributor" badge...');
  const profileRes = await fetch(`${baseUrl}/api/users/profile?userId=${provider.id}`);
  const profile = await profileRes.json();
  const badges = profile.badges.map((b: any) => b.name);
  console.log('Provider badges:', badges);
  if (badges.includes('Top Contributor')) {
    console.log('✅ Badge awarded successfully!');
  } else {
    console.error('❌ Badge not awarded.');
  }
}

test().catch(console.error);
