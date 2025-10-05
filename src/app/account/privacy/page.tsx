export default function PrivacyPage() {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h1 className="text-2xl font-bold mb-4">Những Thiết Lập Riêng Tư</h1>
      <div className="space-y-3">
        <label className="flex items-center gap-3">
          <input type="checkbox" className="h-4 w-4" />
          <span>Ẩn tên thật của tôi khỏi đánh giá</span>
        </label>
        <label className="flex items-center gap-3">
          <input type="checkbox" className="h-4 w-4" />
          <span>Không nhận đề xuất cá nhân hóa</span>
        </label>
      </div>
    </div>
  );
}


