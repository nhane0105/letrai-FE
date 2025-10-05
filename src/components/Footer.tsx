import { Phone, MapPin, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Company Info */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Details */}
          <div>
            <h3 className="text-xl font-bold mb-4">CÔNG TY N&T</h3>
            <div className="space-y-2 text-sm">
              <p><span className="font-medium">MST:</span> 0000000</p>
              <p><span className="font-medium">Ngày cấp:</span> 22/9/2025 </p>
            </div>
          </div>

          {/* Store Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Cửa Hàng</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-0.5 text-green-400" />
                <span>HiCamping - Cho Thuê Lều Cắm Trại - Thiết Bị Dã Ngoại</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-0.5 text-green-400" />
                <span>Nguyễn Trãi, Tp. HCM</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-green-400" />
                <span>Từ 9h am – 9h pm, Kể Cả Ngày Lễ Và CN</span>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Liên Hệ</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-green-400" />
                <a href="tel:0394757440" className="hover:text-green-400 transition-colors">
                  0394.757.440
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-green-400" />
                <a href="tel:0906414150" className="hover:text-green-400 transition-colors">
                  0906.414.150
                </a>
              </div>
            </div>
          </div>

          {/* Policies */}
          <div>
            <h4 className="text-lg font-semibold mb-4">ĐIỀU KHOẢN</h4>
            <div className="space-y-2 text-sm">
              <a href="#" className="block hover:text-green-400 transition-colors">Blog</a>
              <a href="#" className="block hover:text-green-400 transition-colors">Chính sách bảo mật</a>
              <a href="#" className="block hover:text-green-400 transition-colors">Chính Sách Bảo Hành/ đổi trả</a>
              <a href="#" className="block hover:text-green-400 transition-colors">Hướng dẫn mua hàng</a>
              <a href="#" className="block hover:text-green-400 transition-colors">Chính sách chung</a>
              <a href="#" className="block hover:text-green-400 transition-colors">Chính sách giao nhận</a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              © Copyright 2025, N&Tcamping.VN
            </p>
            <div className="flex items-center space-x-2 mt-4 md:mt-0">
              <Phone className="h-4 w-4 text-green-400" />
              <span className="text-sm">0394757440</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
