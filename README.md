Claude




















Readme · MD
ReadMate
ReadMate is a full-stack book swap web application where users can list books and request exchanges with other users.

Status: In progress. Features and structure may change.

Tech Stack
Framework: Next.js, React, TypeScript
Styling: Tailwind CSS
Database: SQLite with Prisma ORM
Maps: Leaflet / React Leaflet
Data Model
The Prisma schema covers:

User – profile, bio, location coordinates, and social credits
Book – title, author, description, owner, availability status, and location
Exchange – requester, provider, book, exchange type, status, and an optional meeting point
MeetingPoint – name, address, and coordinates
Topic and Badge – user interests and achievements
API Routes
POST /api/auth/mock – mock sign-in for development
GET /api/users/profile and PUT /api/users/profile – read and update user profiles
POST /api/books – add a book
POST /api/exchanges – create an exchange request
PATCH /api/exchanges – update an exchange request's status
Getting Started
Prerequisites
Node.js 20 or later
npm
Installation
bash
git clone https://github.com/Sera55/readMate.git
cd readMate
npm install
Environment
Create a .env file in the project root:

DATABASE_URL="file:./dev.db"
Database
bash
npx prisma migrate dev
Run the development server
bash
npm run dev
Open http://localhost:3000 in your browser.

Author
Serxwebun Rasul LinkedIn · GitHub


Claude finished the response
