export default function PasswordPage() {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h1 className="text-2xl font-bold mb-4">Đổi Mật Khẩu</h1>
      <div className="grid gap-4 max-w-md">
        <input type="password" placeholder="Mật khẩu hiện tại" className="border rounded-lg px-3 py-2" />
        <input type="password" placeholder="Mật khẩu mới" className="border rounded-lg px-3 py-2" />
        <input type="password" placeholder="Nhập lại mật khẩu mới" className="border rounded-lg px-3 py-2" />
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg w-max">Cập nhật</button>
      </div>
    </div>
  );
}


