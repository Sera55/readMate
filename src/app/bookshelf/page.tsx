import { prisma } from "@/lib/db"; // Prisma dosya yolun farklıysa (örn: "@/lib/prisma") burayı güncelle
import Link from "next/link";

export default async function BookshelfPage() {
  // 1. Veritabanındaki tüm kitapları çekiyoruz
  const books = await prisma.book.findMany({
    orderBy: { createdAt: 'desc' } // En yeni eklenenler üstte gözüksün
  });

  return (
    <div className="min-h-screen bg-[#fdfcf7] p-8 md:p-16">
      {/* Başlık Bölümü */}
      <div className="flex justify-between items-baseline mb-12 border-b border-stone-200 pb-6">
        <h1 className="text-5xl font-serif italic text-[#4a3728]">Bookshelf</h1>
        <p className="text-stone-400 font-medium">{books.length} books found</p>
      </div>

      {/* Kitap Izgarası (Grid) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {books.map((book) => (
          <div key={book.id} className="group flex flex-col bg-white p-6 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-300">
            {/* Kitap Kapağı Alanı */}
            <div className="aspect-[3/4] bg-stone-50 rounded-[2rem] mb-6 flex items-center justify-center border border-dashed border-stone-200 group-hover:border-stone-400 transition-colors">
               <span className="text-stone-300">📖</span> 
            </div>

            {/* Kitap Bilgileri */}
            <div className="px-2">
              <h2 className="text-2xl font-bold text-[#4a3728] leading-tight mb-1">
                {book.title}
              </h2>
              <p className="text-stone-400 italic mb-6">{book.author}</p>

              {/* Detay Butonu - Daha önce oluşturduğumuz [id] sayfasına gider */}
              <Link href={`/books/${book.id}`}>
                <button className="w-full py-3 rounded-2xl border-2 border-[#4a3728] text-[#4a3728] font-bold uppercase tracking-widest text-xs hover:bg-[#4a3728] hover:text-white transition-colors duration-300">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Kitap yoksa gösterilecek mesaj */}
      {books.length === 0 && (
        <div className="text-center py-20">
          <p className="text-stone-400 text-xl italic">Henüz kitap eklenmemiş.</p>
        </div>
      )}
    </div>
  );
}