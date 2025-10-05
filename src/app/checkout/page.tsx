import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Chi tiết đặt hàng</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Customer info */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Thông tin khách hàng</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1">Họ và tên</label>
                <input className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
              </div>
              <div>
                <label className="block text-sm mb-1">Số điện thoại</label>
                <input className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm mb-1">Địa chỉ</label>
                <input className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm mb-1">Ghi chú</label>
                <textarea className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" rows={4} />
              </div>
            </div>
          </div>

          {/* Order summary */}
          <div className="bg-white rounded-xl shadow p-6 h-fit">
            <h2 className="text-xl font-semibold mb-4">Tóm tắt đơn hàng</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Tạm tính</span>
                <span>0đ</span>
              </div>
              <div className="border-t pt-3 flex justify-between font-semibold text-lg">
                <span>Tổng cộng</span>
                <span className="text-orange-600">0đ</span>
              </div>
            </div>

            <a href="#" className="mt-6 block text-center bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg px-6 py-3">Xác nhận đặt hàng</a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}


