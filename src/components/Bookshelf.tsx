"use client";

import React from 'react';

interface Book {
  id: string;
  title: string;
  author: string;
  description: string | null;
  owner: { name: string | null };
}

export default function Bookshelf({ books, onSelectBook }: { books: Book[], onSelectBook: (book: Book) => void }) {
  if (books.length === 0) {
    return (
      <div className="text-center py-20 bg-white/30 rounded-xl border border-dashed border-cozy-sand">
        <p className="text-cozy-charcoal/50 italic">Your digital bookshelf is empty. Start adding books!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
      {books.map((book) => (
        <div key={book.id} className="bg-white p-6 rounded-lg shadow-sm border border-cozy-sand hover:shadow-md transition-shadow group">
          <div className="h-48 bg-cozy-sand/30 flex items-center justify-center mb-4 rounded italic text-cozy-charcoal/30 group-hover:bg-cozy-sand/50 transition-colors">
            [Book Cover Placeholder]
          </div>
          <h3 className="text-xl font-bold text-cozy-saddle mb-1 truncate">{book.title}</h3>
          <p className="text-cozy-charcoal/80 italic mb-2">by {book.author}</p>
          <p className="text-sm text-cozy-charcoal/60 line-clamp-2 mb-4">{book.description || "No description provided."}</p>
          <div className="flex justify-between items-center text-xs border-t border-cozy-sand pt-4">
            <span>Owner: <span className="font-semibold">{book.owner?.name || "Anonymous"}</span></span>
            <button 
              onClick={() => onSelectBook(book)}
              className="bg-cozy-moss text-white px-3 py-1 rounded-full hover:bg-cozy-moss/90 transition-colors shadow-sm"
            >
              Borrow/Swap
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
