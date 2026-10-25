async function test() {
  const baseUrl = 'http://localhost:3000';
  
  console.log('Setting up Alice and Bob...');
  const aliceRes = await fetch(`${baseUrl}/api/auth/mock`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'alice@example.com', name: 'Alice', topics: ['Philosophy', 'History'] })
  });
  const alice = await aliceRes.json();
  if (alice.error) console.error('Alice Error:', alice.error);

  const bobRes = await fetch(`${baseUrl}/api/auth/mock`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'bob@example.com', name: 'Bob', topics: ['Philosophy', 'Sci-Fi'] })
  });
  const bob = await bobRes.json();
  if (bob.error) console.error('Bob Error:', bob.error);

  console.log('Alice updating topics...');
  await fetch(`${baseUrl}/api/users/profile`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId: alice.id, topics: ['Philosophy', 'History'], name: 'Alice', bio: 'I love books.' })
  });

  console.log('Bob adding a book...');
  const bookRes = await fetch(`${baseUrl}/api/books`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: 'Plato - The Republic',
      author: 'Plato',
      ownerId: bob.id,
      lat: 40.7128,
      lng: -74.0060
    })
  });
  const book = await bookRes.json();
  if (book.error) console.error('Book Error:', book.error);

  console.log('Alice initiating a GIFT exchange...');
  const exchangeRes = await fetch(`${baseUrl}/api/exchanges`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ requesterId: alice.id, bookId: book.id, type: 'GIFT' })
  });
  const exchangeData = await exchangeRes.json();
  if (exchangeData.error) {
    console.error('Exchange Error:', exchangeData.error);
    return;
  }
  console.log('Exchange created:', exchangeData.exchange.id);
  console.log('Discussion prompt:', exchangeData.discussionPrompt);
  console.log('Matching topics:', exchangeData.matchingTopics);

  console.log('Completing exchange...');
  const completeRes = await fetch(`${baseUrl}/api/exchanges`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ exchangeId: exchangeData.exchange.id, status: 'COMPLETED' })
  });
  const completedExchange = await completeRes.json();
  console.log('Exchange status:', completedExchange.status);

  console.log('Checking Bob\'s social credits...');
  const bobProfileRes = await fetch(`${baseUrl}/api/users/profile?userId=${bob.id}`);
  const bobProfile = await bobProfileRes.json();
  console.log('Bob social credits:', bobProfile.socialCredits);
}

test().catch(console.error);
