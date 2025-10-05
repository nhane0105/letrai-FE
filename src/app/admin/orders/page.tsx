'use client';

import { useMemo, useState } from 'react';

type OrderStatus = 'awaiting_approval' | 'pending' | 'shipping' | 'completed' | 'cancelled';

interface Media {
  type: 'image' | 'video';
  src: string;
}

interface OrderItem {
  name: string;
  qty: number;
  price: number;
}

interface Order {
  id: string;
  customerName: string;
  product: string;
  date: string;
  amount: number;
  status: OrderStatus;
  description?: string;
  items: OrderItem[];
  media: Media[]; // images/videos attached to the order/complaint
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'AL-1001',
      customerName: 'Nguyễn Văn A',
      product: 'Lều 2',
      date: '27/06/2025',
      amount: 89000,
      status: 'completed',
      description: 'Đơn hàng hoàn tất, khách đánh giá tốt',
      items: [
        { name: 'Lều 2 người', qty: 1, price: 89000 },
      ],
      media: [
        { type: 'image', src: '/placeholder-1.png' },
        { type: 'image', src: '/placeholder-2.png' },
        { type: 'video', src: 'https://www.w3schools.com/html/mov_bbb.mp4' },
      ],
    },
  ]);

  const [search, setSearch] = useState('');
  const [showDetail, setShowDetail] = useState(false);
  const [selected, setSelected] = useState<Order | null>(null);
  const [showUpdate, setShowUpdate] = useState(false);
  const [updateData, setUpdateData] = useState<{ status: OrderStatus; description: string }>({
    status: 'completed',
    description: '',
  });

  const filtered = useMemo(
    () =>
      orders.filter(
        (o) =>
          o.id.toLowerCase().includes(search.toLowerCase()) ||
          o.customerName.toLowerCase().includes(search.toLowerCase()) ||
          o.product.toLowerCase().includes(search.toLowerCase())
      ),
    [orders, search]
  );

  const openDetail = (o: Order) => {
    setSelected(o);
    setShowDetail(true);
  };

  const openUpdate = (o: Order) => {
    setSelected(o);
    setUpdateData({ status: o.status, description: o.description ?? '' });
    setShowUpdate(true);
  };

  const applyUpdate = () => {
    if (!selected) return;
    setOrders((prev) =>
      prev.map((o) => (o.id === selected.id ? { ...o, status: updateData.status, description: updateData.description } : o))
    );
    setShowUpdate(false);
    setSelected(null);
  };

  const deleteOrder = (id: string) => {
    if (confirm('Xóa đơn hàng này?')) setOrders((prev) => prev.filter((o) => o.id !== id));
  };

  const badgeClass = (status: OrderStatus) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'processing':
        return 'bg-blue-100 text-blue-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-red-100 text-red-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Giao diện admin/ Đơn hàng</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Orders</h2>
          <div className="flex items-center space-x-3">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">Xuất báo cáo</button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-gray-600">
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Product</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((o) => (
                <tr key={o.id} className="border-t">
                  <td className="py-3 px-4">{o.id}</td>
                  <td className="py-3 px-4">{o.customerName}</td>
                  <td className="py-3 px-4">{o.product}</td>
                  <td className="py-3 px-4">{o.date}</td>
                  <td className="py-3 px-4">{o.amount.toLocaleString()} VND</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${badgeClass(o.status)}`}>{o.status}</span>
                  </td>
                  <td className="py-3 px-4 text-right space-x-2">
                    <button onClick={() => openDetail(o)} className="text-blue-600 hover:underline">View</button>
                    <button onClick={() => openUpdate(o)} className="text-green-600 hover:underline">Edit</button>
                    <button onClick={() => deleteOrder(o.id)} className="text-red-600 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal with media */}
      {showDetail && selected && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-4xl p-6 mx-4">
            <div className="flex items-start md:items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Chi tiết đơn hàng</h3>
              <button onClick={() => setShowDetail(false)} className="text-gray-500 hover:text-gray-700">✕</button>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Media gallery */}
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  {selected.media.map((m, idx) => (
                    <div key={idx} className="aspect-video bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                      {m.type === 'image' ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={m.src} alt="media" className="w-full h-full object-cover" />
                      ) : (
                        <video src={m.src} controls className="w-full h-full" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Order info */}
              <div className="space-y-2 text-sm">
                <div><strong>Mã đơn:</strong> {selected.id}</div>
                <div><strong>Khách hàng:</strong> {selected.customerName}</div>
                <div><strong>Sản phẩm:</strong> {selected.product}</div>
                <div><strong>Ngày:</strong> {selected.date}</div>
                <div><strong>Tổng tiền:</strong> {selected.amount.toLocaleString()} VND</div>
                <div><strong>Trạng thái:</strong> {selected.status}</div>
                <div><strong>Mô tả:</strong> {selected.description || '—'}</div>

                <div className="mt-4">
                  <h4 className="font-semibold mb-2">Chi tiết sản phẩm</h4>
                  <ul className="list-disc ml-5 space-y-1">
                    {selected.items.map((it, i) => (
                      <li key={i}>{it.name} × {it.qty} — {(it.price * it.qty).toLocaleString()} VND</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="text-right mt-6">
              <button onClick={() => setShowDetail(false)} className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300">Đóng</button>
            </div>
          </div>
        </div>
      )}

      {/* Update Modal */}
      {showUpdate && selected && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-md p-6 mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Cập nhật đơn hàng</h3>
              <button onClick={() => setShowUpdate(false)} className="text-gray-500 hover:text-gray-700">✕</button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                  value={updateData.status}
                  onChange={(e) => setUpdateData({ ...updateData, status: e.target.value as OrderStatus })}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  value={updateData.description}
                  onChange={(e) => setUpdateData({ ...updateData, description: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                  rows={3}
                  placeholder="Enter Description"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-6">
              <button onClick={() => setShowUpdate(false)} className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300">Cancel</button>
              <button onClick={applyUpdate} className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700">Save Order</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
