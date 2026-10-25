"use client";

import dynamic from 'next/dynamic';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

// Haritayı güvenli şekilde yüklüyoruz
const MapUI = dynamic(() => import('@/components/MapUI'), { 
  ssr: false,
  loading: () => <div className="h-[500px] w-full bg-stone-100 animate-pulse rounded-[2.5rem]" />
});

export default function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    fetch('/api/books').then(res => res.json()).then(data => {
      setBooks(data);
      setLoading(false);
    });
  }, []);

  // Filtreleme mantığı: Hem arama hem kategoriye göre
  const filteredBooks = books.filter((book: any) => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-screen bg-[#fdfcf7] pb-20">
      {/* Hero Section */}
      <section className="pt-20 pb-12 text-center px-4">
        <h1 className="text-5xl md:text-7xl font-serif text-[#4a3728] mb-8 italic tracking-tight">
          Where books travel for wisdom, not wealth.
        </h1>
        <div className="flex justify-center gap-4 mb-16">
          <Link href="/add-book" className="bg-[#4a3728] text-white px-10 py-4 rounded-full font-bold shadow-lg hover:bg-black transition-all">
            List a Book
          </Link>
          <button className="bg-white border border-stone-200 text-[#4a3728] px-10 py-4 rounded-full font-bold shadow-sm hover:bg-stone-50 transition-all">
            How it Works
          </button>
        </div>
        
        {/* Map Container */}
        <div className="max-w-6xl mx-auto px-6 mb-16">
          <div className="bg-white p-4 rounded-[3rem] shadow-xl border border-stone-100">
             <MapUI />
          </div>
        </div>
      </section>

      {/* Search & Filter Section */}
      <section className="max-w-6xl mx-auto px-6 mb-16">
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between bg-white p-8 rounded-[3rem] shadow-sm border border-stone-100">
          
          {/* Search Input */}
          <div className="relative w-full md:w-1/2">
            <input 
              type="text"
              placeholder="Search by title or author..."
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-stone-50 border-none focus:ring-2 focus:ring-[#4a3728] text-[#4a3728] placeholder-stone-400"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">🔍</span>
          </div>

          {/* Categories with extra spacing (pb-6) to separate from scrollbar */}
          <div className="flex gap-3 overflow-x-auto w-full md:w-auto pb-6 pt-2 scrollbar-thin scrollbar-thumb-stone-200">
            {[
              "All", "Novel", "Poetry", "Fiction", "History", 
              "Sci-Fi", "Philosophy", "Biography", "Education", "Classics"
            ].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-3 rounded-full text-sm font-bold transition-all whitespace-nowrap shadow-sm border ${
                  selectedCategory === cat 
                  ? "bg-[#4a3728] text-white border-[#4a3728] shadow-md scale-105" 
                  : "bg-stone-100 text-stone-500 border-transparent hover:bg-stone-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="max-w-6xl mx-auto px-6 mb-24">
        <h2 className="text-3xl font-serif text-[#4a3728] italic text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div>
            <div className="w-16 h-16 bg-[#4a3728] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">1</div>
            <h3 className="font-bold text-[#4a3728] mb-2 text-xl">List Your Books</h3>
            <p className="text-stone-500 text-sm leading-relaxed px-4">Add books you've read and are ready to share with the community.</p>
          </div>
          <div>
            <div className="w-16 h-16 bg-[#4a3728] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">2</div>
            <h3 className="font-bold text-[#4a3728] mb-2 text-xl">Discover on Map</h3>
            <p className="text-stone-500 text-sm leading-relaxed px-4">Find books shared by readers around you through our interactive map.</p>
          </div>
          <div>
            <div className="w-16 h-16 bg-[#4a3728] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">3</div>
            <h3 className="font-bold text-[#4a3728] mb-2 text-xl">Trade for Free</h3>
            <p className="text-stone-500 text-sm leading-relaxed px-4">Send a request for the books you love and exchange safely.</p>
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-end mb-10">
          <h2 className="text-4xl font-serif text-[#4a3728] italic">New Arrivals</h2>
          <p className="text-stone-400 text-sm font-medium">{filteredBooks.length} books found</p>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1,2,3,4].map(i => <div key={i} className="h-80 bg-stone-100 animate-pulse rounded-[2.5rem]"></div>)}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredBooks.map((book: any) => (
              <div key={book.id} className="group bg-white p-6 rounded-[2.5rem] shadow-sm border border-stone-50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                <div className="aspect-[3/4] bg-stone-50 rounded-[2rem] mb-6 flex flex-col items-center justify-center border border-dashed border-stone-200 group-hover:bg-white transition-colors">
                  <div className="text-4xl opacity-20">📖</div>
                </div>
                <h3 className="font-bold text-[#4a3728] truncate mb-1 text-xl">{book.title}</h3>
                <p className="text-stone-400 text-sm italic mb-6">{book.author}</p>
                <button className="w-full py-4 text-xs font-black border-2 border-[#4a3728] text-[#4a3728] rounded-2xl group-hover:bg-[#4a3728] group-hover:text-white transition-all tracking-widest uppercase">
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredBooks.length === 0 && (
          <div className="text-center py-24 bg-white rounded-[3rem] border border-dashed border-stone-200">
            <p className="text-stone-400 italic text-lg">No books found matching your criteria.</p>
          </div>
        )}
      </section>
    </main>
  );}