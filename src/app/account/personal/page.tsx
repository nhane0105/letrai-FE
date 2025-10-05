export default function PersonalInfoPage() {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h1 className="text-2xl font-bold mb-4">Thông Tin Cá Nhân</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input placeholder="Họ và tên" className="border rounded-lg px-3 py-2" />
        <input placeholder="Email" className="border rounded-lg px-3 py-2" />
        <input placeholder="Số điện thoại" className="border rounded-lg px-3 py-2" />
        <input placeholder="Ngày sinh" className="border rounded-lg px-3 py-2" />
      </div>
      <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg">Lưu</button>
    </div>
  );
}


