async function test() {
  const baseUrl = 'http://localhost:3001';
  
  console.log('Testing Auth Mock...');
  const authRes = await fetch(`${baseUrl}/api/auth/mock`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'alice@example.com',
      name: 'Alice',
      lat: 40.7128,
      lng: -74.0060
    })
  });
  const alice = await authRes.json();
  console.log('Alice created:', alice.id);

  console.log('Testing Book Creation...');
  const bookRes = await fetch(`${baseUrl}/api/books`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      ownerId: alice.id,
      lat: 40.7128,
      lng: -74.0060
    })
  });
  const book = await bookRes.json();
  console.log('Book created:', book.id);

  console.log('Testing Proximity Search (Nearby)...');
  const proxResNear = await fetch(`${baseUrl}/api/books/proximity?lat=40.7128&lng=-74.0060&radius=5`);
  const nearBooks = await proxResNear.json();
  console.log('Nearby books count:', nearBooks.length);

  console.log('Testing Proximity Search (Far away)...');
  const proxResFar = await fetch(`${baseUrl}/api/books/proximity?lat=34.0522&lng=-118.2437&radius=5`);
  const farBooks = await proxResFar.json();
  console.log('Far away books count:', farBooks.length);
}

test().catch(console.error);
