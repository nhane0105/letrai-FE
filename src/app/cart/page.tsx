import Header from '@/components/Header';

export default function CartPage() {
  // Demo state (mock). Tích hợp store sau nếu cần
  const selectedCount = 0;
  const totalItems = 0;
  const totalPrice = 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Giỏ hàng</h1>

        {/* Table header row */}
        <div className="bg-white rounded-xl shadow mb-4">
          <div className="flex items-center px-6 py-4 text-gray-600">
            <label className="inline-flex items-center mr-6">
              <input type="checkbox" className="h-4 w-4" />
              <span className="ml-2">Sản Phẩm</span>
            </label>
            <div className="ml-auto grid grid-cols-4 gap-10 text-center w-[520px] max-w-full">
              <span>Đơn Giá</span>
              <span>Số Lượng</span>
              <span>Số Tiền</span>
              <span>Thao Tác</span>
            </div>
          </div>
        </div>

        {/* Cart list placeholder */}
        <div className="bg-white rounded-xl shadow p-6 mb-24">
          <p className="text-gray-600">Hiện chưa có sản phẩm trong giỏ hàng.</p>
        </div>
      </div>

      {/* Bottom action bar (no voucher / no Shopee Xu) */}
      <div className="fixed bottom-0 left-0 right-0 border-t bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 py-4">
            {/* Left actions */}
            <div className="flex items-center gap-4 text-sm">
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="h-4 w-4" />
                <span>Chọn Tất Cả ({totalItems})</span>
              </label>
              <button className="text-gray-700 hover:text-red-600">Xóa</button>
              <button className="text-gray-700 hover:text-gray-900">Bỏ sản phẩm không hoạt động</button>
              <button className="text-orange-600 hover:text-orange-700">Lưu vào mục Đã thích</button>
            </div>

            {/* Right total + CTA */}
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm text-gray-600">
                  Tổng cộng ({selectedCount} Sản phẩm):
                </div>
                <div className="text-2xl font-bold text-orange-600">{totalPrice}đ</div>
              </div>
              <a href="/checkout" className="bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg px-6 py-3">
                Mua Hàng
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


