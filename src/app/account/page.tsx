import { getUser } from '@/lib/auth';

export default function AccountPage() {
  const user = typeof window !== 'undefined' ? getUser() : null;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Thông báo</h2>
        <p className="text-gray-600 text-sm">Chưa có thông báo.</p>
      </div> */}
      <div className="bg-white rounded-xl shadow p-6">
        <h1 className="text-2xl font-bold mb-4">Hồ sơ của tôi</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">Tên hiển thị</label>
            <input defaultValue={user?.name || ''} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input defaultValue={user?.email || ''} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
          </div>
          <button className="mt-2 bg-green-600 text-white px-4 py-2 rounded-lg w-max">Lưu</button>
        </div>
      </div>
    </div>
  );
}


