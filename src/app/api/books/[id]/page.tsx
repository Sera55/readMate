import { prisma } from "@/lib/db"; // Prisma dosyanın yoluna göre burayı düzenle
import { notFound } from "next/navigation";

export default async function BookDetailPage({ params }: { params: { id: string } }) {
  // URL'den gelen ID'yi alıyoruz
  const { id } = params;

  // Veritabanından bu ID'ye sahip kitabı çekiyoruz
  const book = await prisma.book.findUnique({
    where: { id: id },
  });

  // Kitap bulunamazsa 404 sayfasına gönder
  if (!book) {
    notFound();
  }

  return (
    <main className="p-10 bg-stone-50 min-h-screen">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow-sm">
        <h1 className="text-3xl font-bold text-[#4a3728]">{book.title}</h1>
        <p className="text-lg text-stone-500">{book.author}</p>
        <hr className="my-6 border-stone-100" />
        <p className="text-[#4a3728] leading-relaxed">
          {book.description || "Bu kitabın henüz bir açıklaması bulunmuyor."}
        </p>
        {/* Diğer detayları buraya ekleyebilirsin */}
      </div>
    </main>
  );
}