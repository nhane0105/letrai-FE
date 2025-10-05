"use client";

import { useMemo, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

type OrderStatus = 'all' | 'to_confirm' | 'shipping' | 'to_receive' | 'completed' | 'cancelled' | 'return';

const TABS: { key: OrderStatus; label: string }[] = [
  { key: 'all', label: 'Tất cả' },
  { key: 'to_confirm', label: 'Chờ xác nhận' },
  { key: 'shipping', label: 'Vận chuyển' },
  { key: 'to_receive', label: 'Chờ giao hàng' },
  { key: 'completed', label: 'Hoàn thành' },
  { key: 'cancelled', label: 'Đã hủy' },
  { key: 'return', label: 'Trả hàng/Hoàn tiền' },
];

type Order = {
  id: string;
  shop: string;
  title: string;
  variant: string;
  quantity: number;
  price: number;
  status: OrderStatus;
};

const MOCK_ORDERS: Order[] = [
  {
    id: 'OD001',
    shop: 'N&T Camping',
    title: 'Hộp đựng quần áo chia ngăn Living C',
    variant: '0 ngăn - CO-XÁM',
    quantity: 3,
    price: 35000,
    status: 'completed',
  },
  {
    id: 'OD002',
    shop: 'N&T Camping',
    title: 'Lều cắm trại 4 người Eureka',
    variant: 'Màu Xanh',
    quantity: 1,
    price: 60000,
    status: 'to_confirm',
  },
];

export default function OrdersPage() {
  const [active, setActive] = useState<OrderStatus>('all');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    return MOCK_ORDERS.filter((o) =>
      (active === 'all' ? true : o.status === active) &&
      (o.title.toLowerCase().includes(query.toLowerCase()) ||
        o.id.toLowerCase().includes(query.toLowerCase()))
    );
  }, [active, query]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold mb-4">Đơn mua</h1>

        {/* Tabs */}
        <div className="flex gap-4 overflow-x-auto">
          {TABS.map((t) => (
            <button
              key={t.key}
              className={`whitespace-nowrap px-4 py-2 rounded-t-lg border-b-2 ${
                active === t.key ? 'border-orange-600 text-orange-600' : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setActive(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="bg-white rounded-b-xl shadow p-4 border-t">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm đơn hàng theo shop, ID đơn hàng hoặc tên sản phẩm"
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        {/* Orders list */}
        <div className="mt-4 space-y-4">
          {filtered.length === 0 ? (
            <div className="bg-white rounded-xl shadow p-6 text-gray-600">Không có đơn phù hợp.</div>
          ) : (
            filtered.map((o) => (
              <div key={o.id} className="bg-white rounded-xl shadow">
                <div className="flex items-center justify-between px-6 py-4 border-b text-sm">
                  <div className="font-medium">{o.shop}</div>
                  <div className="text-green-600 font-semibold">
                    {o.status === 'completed' ? 'HOÀN THÀNH' : o.status === 'to_confirm' ? 'CHỜ XÁC NHẬN' : ''}
                  </div>
                </div>
                <div className="px-6 py-4 flex flex-col md:flex-row md:items-center gap-4">
                  <div className="w-16 h-16 bg-gray-100 rounded" />
                  <div className="flex-1">
                    <div className="font-medium line-clamp-1">{o.title}</div>
                    <div className="text-sm text-gray-500">Phân loại hàng: {o.variant}</div>
                    <div className="text-sm">x{o.quantity}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Thành tiền:</div>
                    <div className="text-xl text-orange-600 font-bold">{(o.price * o.quantity).toLocaleString('vi-VN')}đ</div>
                  </div>
                </div>
                <div className="px-6 py-3 flex flex-wrap gap-3 justify-end border-t bg-gray-50">
                  {o.status === 'completed' ? (
                    <>
                      <button className="px-4 py-2 rounded-lg border hover:bg-white">Đánh Giá</button>
                      <button className="px-4 py-2 rounded-lg border hover:bg-white">Yêu Cầu Trả Hàng/Hoàn Tiền</button>
                      <button className="px-4 py-2 rounded-lg border hover:bg-white">Thuê lại</button>
                    </>
                  ) : o.status === 'to_confirm' ? (
                    <>
                      <button className="px-4 py-2 rounded-lg border hover:bg-white">Hủy đơn</button>
                      <button className="px-4 py-2 rounded-lg bg-orange-600 text-white">Liên hệ Shop</button>
                    </>
                  ) : null}
                </div>
              </div>
            ))
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}


