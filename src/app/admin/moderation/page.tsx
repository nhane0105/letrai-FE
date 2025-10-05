'use client';

import { useState } from 'react';

interface PostReview {
  id: number;
  productName: string;
  price: number;
  category: string;
  title: string;
  description: string;
  media: { type: 'image' | 'video'; src: string }[];
  createdAt: string;
}

export default function AdminModerationPage() {
  const [posts, setPosts] = useState<PostReview[]>([
    {
      id: 1,
      productName: 'Lều 4 người',
      price: 150000,
      category: 'Lều',
      title: 'Cho thuê lều 4 người giá tốt',
      description: 'Lều chất lượng, chống thấm tốt, phù hợp gia đình',
      media: [
        { type: 'image', src: '/placeholder-1.png' },
        { type: 'image', src: '/placeholder-2.png' },
        { type: 'video', src: 'https://www.w3schools.com/html/mov_bbb.mp4' },
      ],
      createdAt: '2025-06-27',
    },
  ]);

  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<PostReview | null>(null);

  const filtered = posts.filter(
    (p) => p.productName.toLowerCase().includes(search.toLowerCase()) || p.title.toLowerCase().includes(search.toLowerCase())
  );

  const approve = (id: number) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
    setSelected(null);
  };
  const reject = (id: number) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
    setSelected(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Giao diện admin/ Duyệt bài đăng</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-red-600">Notification</h2>
          <div className="flex-1 max-w-md ml-4">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>

        <div className="space-y-4">
          {filtered.map((post) => (
            <div key={post.id} className="border-b pb-4">
              <div className="flex items-start space-x-4">
                <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500 text-sm">IMG</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-red-600 mb-1">{post.title}</h3>
                  <div className="text-sm text-gray-700 space-y-1">
                    <p><strong>Tên sản phẩm:</strong> {post.productName}</p>
                    <p><strong>Giá:</strong> {post.price.toLocaleString()} VND</p>
                    <p><strong>Danh mục:</strong> {post.category}</p>
                    <p><strong>Ngày tạo:</strong> {post.createdAt}</p>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <button
                    onClick={() => setSelected(post)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
                  >
                    Xem chi tiết
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center text-gray-500 py-8">Không có bài chờ duyệt</div>
          )}
        </div>
      </div>

      {/* Detail modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-4xl p-6 mx-4">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-semibold">Thông tin sản phẩm</h3>
              <button onClick={() => setSelected(null)} className="text-gray-500 hover:text-gray-700">✕</button>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Media */}
              <div className="grid grid-cols-2 gap-3">
                {selected.media.map((m, i) => (
                  <div key={i} className="aspect-video bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                    {m.type === 'image' ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={m.src} alt="media" className="w-full h-full object-cover" />
                    ) : (
                      <video src={m.src} controls className="w-full h-full" />
                    )}
                  </div>
                ))}
              </div>

              {/* Info */}
              <div className="text-sm space-y-2">
                <div><strong>Tên sản phẩm:</strong> {selected.productName}</div>
                <div><strong>Giá:</strong> {selected.price.toLocaleString()} VND</div>
                <div><strong>Danh mục:</strong> {selected.category}</div>
                <div><strong>Tiêu đề:</strong> {selected.title}</div>
                <div>
                  <strong>Mô tả:</strong>
                  <p className="mt-1 text-gray-700">{selected.description}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-6">
              <div className="space-x-3">
                <button onClick={() => approve(selected.id)} className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">Duyệt</button>
                <button onClick={() => reject(selected.id)} className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700">Từ chối</button>
              </div>
              <button onClick={() => setSelected(null)} className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300">Đóng</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


