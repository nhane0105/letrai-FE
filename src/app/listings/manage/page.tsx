'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Listing, ListingStatus, getListings, removeListing, updateListing, createListing } from '@/lib/listings';
import { useEffect, useMemo, useState } from 'react';

const TABS: { key: ListingStatus | 'all'; label: string }[] = [
  { key: 'all', label: 'Tất cả' },
  { key: 'active', label: 'Đang hiển thị' },
  { key: 'review', label: 'Chờ duyệt' },
  { key: 'delivery', label: 'Giao & nhận hàng' },
  { key: 'draft', label: 'Bản nháp' },
  { key: 'sold', label: 'Đã bán' },
  { key: 'issue', label: 'Bị huỷ/Trả hàng' },
  { key: 'paused', label: 'Tạm dừng' },
  { key: 'hidden', label: 'Ẩn' },
];

export default function ManageListingsPage() {
  const [active, setActive] = useState<'all' | ListingStatus>('all');
  const [listings, setListings] = useState<Listing[]>([]);
  const [showDeliveryModal, setShowDeliveryModal] = useState(false);
  const [deliveryTarget, setDeliveryTarget] = useState<Listing | null>(null);
  const [deliveryFiles, setDeliveryFiles] = useState<File[]>([]);

  useEffect(() => {
    const current = getListings();
    if (current.length === 0) {
      // Seed demo orders/listings so trang quản lý có dữ liệu mẫu
      createListing({
        title: 'Lều cắm trại 4 người Eureka',
        description: 'Lều chống mưa, chống gió, phù hợp gia đình',
        price: 60000,
        category: 'Lều',
        location: 'TP.HCM',
        images: ['/placeholder-1.png', '/placeholder-2.png'],
        status: 'review',
      });
      createListing({
        title: 'Thuyền SUP bơm hơi',
        description: 'SUP ổn định, dễ chèo, kèm mái chèo',
        price: 200000,
        category: 'Thuyền',
        location: 'TP.HCM',
        images: ['/placeholder-1.png'],
        status: 'active',
      });
    }
    setListings(getListings());
  }, []);

  const filtered = useMemo(
    () => (active === 'all' ? listings : listings.filter((l) => l.status === active)),
    [active, listings]
  );

  function setStatus(id: string, status: ListingStatus, deliveryProofs?: string[]) {
    updateListing(id, { status, deliveryProofs });
    setListings(getListings());
  }

  function openDeliveryModal(listing: Listing) {
    setDeliveryTarget(listing);
    setDeliveryFiles([]);
    setShowDeliveryModal(true);
  }

  function confirmDelivery() {
    if (!deliveryTarget) return;
    if (deliveryFiles.length === 0) {
      alert('Vui lòng thêm ít nhất 1 ảnh hoặc video.');
      return;
    }
    const proofs = deliveryFiles.map((f) => URL.createObjectURL(f));
    setStatus(deliveryTarget.id, 'delivery', proofs);
    setShowDeliveryModal(false);
    setDeliveryTarget(null);
  }

  function deleteListing(id: string) {
    removeListing(id);
    setListings(getListings());
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Quản lý đơn</h1>
          <a href="/listings/new" className="bg-orange-600 text-white px-4 py-2 rounded-lg">Đăng tin</a>
        </div>

        <div className="flex gap-4 overflow-x-auto">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setActive(t.key as any)}
              className={`whitespace-nowrap px-4 py-2 rounded-t-lg border-b-2 ${
                active === t.key ? 'border-orange-600 text-orange-600' : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="mt-4 space-y-4">
          {filtered.length === 0 ? (
            <div className="bg-white rounded-xl shadow p-6 text-gray-600">Chưa có tin nào.</div>
          ) : (
            filtered.map((l) => (
              <div key={l.id} className="bg-white rounded-xl shadow p-4 flex flex-col md:flex-row md:items-center gap-4">
                <div className="w-20 h-20 bg-gray-100 rounded" />
                <div className="flex-1">
                  <div className="font-medium">{l.title}</div>
                  <div className="text-sm text-gray-500">{l.category}</div>
                </div>
                <div className="text-right">
                  <div className="text-orange-600 font-bold">{l.price.toLocaleString('vi-VN')}đ</div>
                  <div className="text-xs text-gray-500">
                    {l.status === 'active' && 'Đang hiển thị'}
                    {l.status === 'review' && 'Chờ duyệt'}
                    {l.status === 'delivery' && 'Giao & nhận hàng'}
                    {l.status === 'draft' && 'Bản nháp'}
                    {l.status === 'sold' && 'Đã bán'}
                    {l.status === 'issue' && 'Bị huỷ/Trả hàng'}
                    {l.status === 'paused' && 'Tạm dừng'}
                    {l.status === 'hidden' && 'Ẩn'}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 justify-end md:justify-start">
                  <a href={`/listings/edit/${l.id}`} className="px-3 py-2 rounded-lg bg-green-500 text-white">Sửa tin</a>
                  {l.status !== 'hidden' && (
                    <button onClick={() => setStatus(l.id, 'hidden')} className="px-3 py-2 border rounded-lg">Khóa</button>
                  )}
                  {l.status !== 'review' && (
                    <button onClick={() => setStatus(l.id, 'review')} className="px-3 py-2 border rounded-lg">Chờ duyệt</button>
                  )}
                  {l.status !== 'delivery' && (
                    <button onClick={() => openDeliveryModal(l)} className="px-3 py-2 border rounded-lg">Giao hàng</button>
                  )}
                  {l.status !== 'issue' && (
                    <button onClick={() => setStatus(l.id, 'issue')} className="px-3 py-2 border rounded-lg">Đánh dấu lỗi</button>
                  )}
                  {l.status !== 'active' && (
                    <button onClick={() => setStatus(l.id, 'active')} className="px-3 py-2 border rounded-lg">Hiển thị</button>
                  )}
                  {l.status !== 'paused' && (
                    <button onClick={() => setStatus(l.id, 'paused')} className="px-3 py-2 border rounded-lg">Tạm dừng</button>
                  )}
                  {l.status !== 'sold' && (
                    <button onClick={() => setStatus(l.id, 'sold')} className="px-3 py-2 border rounded-lg">Đánh dấu đã bán</button>
                  )}
                  <button onClick={() => deleteListing(l.id)} className="px-3 py-2 border rounded-lg">Xóa</button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
      {/* Delivery modal */}
      {showDeliveryModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-lg p-6 mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Xác nhận giao hàng</h3>
              <button onClick={() => setShowDeliveryModal(false)} className="text-gray-500 hover:text-gray-700">✕</button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Thêm ảnh hoặc video</label>
                <input
                  type="file"
                  accept="image/*,video/*"
                  multiple
                  onChange={(e)=> setDeliveryFiles(Array.from(e.target.files ?? []))}
                  className="w-full border rounded px-3 py-2"
                />
                <p className="text-xs text-gray-500 mt-1">Bắt buộc tối thiểu 1 tệp.</p>
              </div>
              {deliveryFiles.length > 0 && (
                <div className="grid grid-cols-3 gap-2">
                  {deliveryFiles.map((f,i)=> (
                    <div key={i} className="aspect-video bg-gray-100 rounded flex items-center justify-center text-xs text-gray-500">
                      {f.type.startsWith('image') ? 'Ảnh' : 'Video'}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="flex justify-end space-x-2 mt-6">
              <button onClick={()=> setShowDeliveryModal(false)} className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300">Hủy</button>
              <button onClick={confirmDelivery} className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700">Xác nhận</button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}



