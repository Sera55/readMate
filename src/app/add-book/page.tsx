"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// Haritayı konum seçmek için dynamic yüklüyoruz
const MapSelector = dynamic(() => import('@/components/MapUI'), { ssr: false });

export default function AddBook() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState({ lat: 41.0082, lng: 28.9784 }); // Varsayılan: İstanbul

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const bookData = {
      title: formData.get('title'),
      author: formData.get('author'),
      category: formData.get('category'),
      condition: formData.get('condition'),
      description: formData.get('description'),
      latitude: location.lat,
      longitude: location.lng,
    };

    try {
      const response = await fetch('/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookData),
      });

      if (response.ok) {
        router.push('/');
        router.refresh();
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#fdfcf7] py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center text-[#4a3728] font-bold mb-8 hover:opacity-70 transition-all">
          <span className="mr-2">←</span> Back to Library
        </Link>

        <div className="bg-white rounded-[3.5rem] p-8 md:p-12 shadow-2xl border border-stone-100">
          <div className="mb-10">
            <h1 className="text-4xl font-serif text-[#4a3728] italic mb-2">List a New Book</h1>
            <p className="text-stone-400">Please provide accurate details to find the best match for a trade.</p>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Side: Form Fields */}
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[#4a3728] mb-3 ml-1">Book Title</label>
                <input name="title" required placeholder="e.g. 1984" className="w-full px-6 py-4 rounded-2xl bg-stone-50 border-2 border-transparent focus:border-[#4a3728] focus:bg-white transition-all outline-none" />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[#4a3728] mb-3 ml-1">Author</label>
                <input name="author" required placeholder="e.g. George Orwell" className="w-full px-6 py-4 rounded-2xl bg-stone-50 border-2 border-transparent focus:border-[#4a3728] focus:bg-white transition-all outline-none" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[#4a3728] mb-3 ml-1">Category</label>
                  <select name="category" className="w-full px-6 py-4 rounded-2xl bg-stone-50 border-none focus:ring-2 focus:ring-[#4a3728] appearance-none">
                    <option value="Novel">Novel</option>
                    <option value="Poetry">Poetry</option>
                    <option value="Philosophy">Philosophy</option>
                    <option value="Sci-Fi">Sci-Fi</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[#4a3728] mb-3 ml-1">Condition</label>
                  <select name="condition" className="w-full px-6 py-4 rounded-2xl bg-stone-50 border-none focus:ring-2 focus:ring-[#4a3728] appearance-none">
                    <option value="New">New</option>
                    <option value="Good">Good</option>
                    <option value="Fair">Fair</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[#4a3728] mb-3 ml-1">Short Description</label>
                <textarea name="description" rows={4} placeholder="Tell us why this book is special..." className="w-full px-6 py-4 rounded-2xl bg-stone-50 border-none focus:ring-2 focus:ring-[#4a3728] transition-all resize-none"></textarea>
              </div>
            </div>

            {/* Right Side: Map & Submit */}
            <div className="flex flex-col h-full">
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[#4a3728] mb-3 ml-1">Pick Exchange Location</label>
              <div className="flex-grow min-h-[300px] bg-stone-50 rounded-[2.5rem] overflow-hidden border-4 border-stone-50 relative mb-8">
                {/* Buraya MapSelector gelecek, kullanıcı tıkladığı yerin lat/lng bilgisini setLocation ile güncelleyecek */}
                <div className="absolute inset-0 flex items-center justify-center italic text-stone-300 text-sm p-8 text-center">
                  Map integration for location picking...
                </div>
              </div>

              <button type="submit" disabled={loading} className="w-full bg-[#4a3728] text-white py-6 rounded-[1.5rem] font-bold shadow-xl hover:bg-black transition-all disabled:opacity-50 text-lg uppercase tracking-widest">
                {loading ? "Publishing..." : "Publish Book"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}