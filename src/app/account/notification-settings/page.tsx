export default function NotificationSettingsPage() {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h1 className="text-2xl font-bold mb-4">Cài Đặt Thông Báo</h1>
      <div className="space-y-3">
        {['Email', 'SMS', 'Thông báo trình duyệt'].map((label) => (
          <label key={label} className="flex items-center gap-3">
            <input type="checkbox" className="h-4 w-4" />
            <span>{label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}


