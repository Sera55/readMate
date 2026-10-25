import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The No-Money Book Exchange",
  description: "A community-focused, strictly non-monetary book exchange.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-cozy-parchment font-serif text-cozy-charcoal">
        <header className="border-b border-cozy-sand p-4 bg-white/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold text-cozy-saddle">BookExchange</h1>
            <nav className="space-x-4 flex">
              <a href="/" className="hover:text-cozy-moss transition-colors">Home</a>
              <a href="/books" className="hover:text-cozy-moss transition-colors">Bookshelf</a>
              <a href="/profile" className="hover:text-cozy-moss transition-colors">Profile</a>
            </nav>
          </div>
        </header>
        <main className="max-w-6xl mx-auto p-4">
          {children}
        </main>
      </body>
    </html>
  );
}
