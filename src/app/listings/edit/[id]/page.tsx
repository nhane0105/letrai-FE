'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Listing, getListings, updateListing } from '@/lib/listings';

export default function EditListingPage() {
  const params = useParams();
  const router = useRouter();
  const [listing, setListing] = useState<Listing | null>(null);

  useEffect(() => {
    const id = String(params?.id || '');
    const found = getListings().find((l) => l.id === id) || null;
    setListing(found);
  }, [params]);

  if (!listing) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-10">Không tìm thấy tin.</main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold mb-6">Sửa tin</h1>
        <form
          className="bg-white rounded-xl shadow p-6 grid grid-cols-1 md:grid-cols-2 gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            const data = new FormData(e.currentTarget as HTMLFormElement);
            updateListing(listing.id, {
              title: String(data.get('title') || ''),
              price: Number(data.get('price') || 0),
              category: String(data.get('category') || ''),
              description: String(data.get('description') || ''),
            });
            router.push('/listings/manage');
          }}
        >
          <div>
            <label className="block text-sm mb-1">Tiêu đề</label>
            <input name="title" defaultValue={listing.title} className="w-full border rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm mb-1">Giá</label>
            <input name="price" type="number" min={0} defaultValue={listing.price} className="w-full border rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm mb-1">Danh mục</label>
            <input name="category" defaultValue={listing.category} className="w-full border rounded-lg px-3 py-2" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm mb-1">Mô tả</label>
            <textarea name="description" defaultValue={listing.description} rows={5} className="w-full border rounded-lg px-3 py-2" />
          </div>
          <div className="md:col-span-2">
            <button type="submit" className="bg-green-600 text-white px-6 py-3 rounded-lg">Lưu</button>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
}


