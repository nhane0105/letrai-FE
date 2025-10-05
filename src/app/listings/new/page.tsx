'use client';

import { useRouter } from 'next/navigation';
import { createListing } from '@/lib/listings';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useState } from 'react';

export default function NewListingPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold mb-6">Đăng tin</h1>
        <form
          className="bg-white rounded-xl shadow p-6 grid grid-cols-1 md:grid-cols-2 gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            const data = new FormData(e.currentTarget as HTMLFormElement);
            const title = String(data.get('title') || '').trim();
            const price = Number(data.get('price')) || 0;
            const category = String(data.get('category') || '').trim();
            const description = String(data.get('description') || '').trim();
            if (!title || !price || !category) {
              setError('Vui lòng nhập đầy đủ Tiêu đề, Giá và Danh mục.');
              return;
            }
            createListing({ title, price, category, description, images: [], location: '' });
            router.push('/listings/manage');
          }}
        >
          {error && <div className="md:col-span-2 text-red-600">{error}</div>}
          <div>
            <label className="block text-sm mb-1">Tiêu đề</label>
            <input name="title" className="w-full border rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm mb-1">Giá</label>
            <input name="price" type="number" min={0} className="w-full border rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm mb-1">Danh mục</label>
            <select name="category" className="w-full border rounded-lg px-3 py-2">
              <option value="">-- Chọn danh mục --</option>
              <option>Đồ điện tử</option>
              <option>Đồ gia dụng</option>
              <option>Thể thao</option>
              <option>Khác</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm mb-1">Mô tả</label>
            <textarea name="description" rows={5} className="w-full border rounded-lg px-3 py-2" />
          </div>
          <div className="md:col-span-2">
            <button type="submit" className="bg-orange-600 text-white px-6 py-3 rounded-lg">Đăng tin</button>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
}


