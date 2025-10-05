'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getUser, clearUser } from '@/lib/auth';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const u = getUser();
    setUserName(u?.name ?? null);
  }, []);

  const navigationItems = [
    { label: 'THUÊ LỀU', submenu: ['Lều 2 Người', 'Lều 4 Người', 'Lều 6 Người', 'Lều 8 Người', 'Lều 12 Người', 'Lều Mông Cổ'] },
    { label: 'THUÊ COMBO', submenu: ['Combo 2 Người', 'Combo 4 Người', 'Combo 6 Người', 'Combo 10 Người'] },
    { label: 'THUÊ THUYỀN', submenu: ['Thuyền SUP', 'Thuyền Hơi'] },
    { label: 'PHỤ KIỆN', submenu: ['Phụ Kiện Dã Ngoại', 'Bàn Ghế Dã Ngoại', 'Đèn Dã Ngoại', 'Phụ Kiện BBQ'] },
    { label: 'CAMERA', submenu: ['Camera Hành Trình', 'Bộ Đàm', 'Loa Kéo'] },
    { label: 'BÁN LỀU', submenu: ['Lều Cắm Trại Mới 100%', 'Lều Đã Qua Sử Dụng'] },
    { label: 'Blog' }
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      {/* Top Banner */}
      <div className="bg-green-600 text-white text-center py-2 text-sm">
        <p>BẢNG GIÁ CHO THUÊ | XEM THÊM THỂ THAO DƯỚI NƯỚC | CHO THUÊ VÁN CHÈO SUP - THUYỀN HƠI</p>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4">
        {/* Logo and Search */}
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-2xl font-bold text-green-600 hover:text-green-700 transition-colors">
              N&Tcamping.VN
            </Link>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Nhập sản phẩm cần tìm ?"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Cart and Login */}
          <div className="flex items-center space-x-4">
            <a href="/cart" className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors">
              <ShoppingCart className="h-6 w-6" />
              <span className="text-sm">Giỏ hàng.</span>
            </a>
            {userName ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50">
                  <div className="w-6 h-6 rounded-full bg-purple-500 text-white flex items-center justify-center text-xs">{userName[0]}</div>
                  <span className="text-sm font-medium">{userName}</span>
                </button>
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                  <a href="/listings/new" className="block px-4 py-2 hover:bg-gray-50">Đăng tin</a>
                  <a href="/listings/manage" className="block px-4 py-2 hover:bg-gray-50">Quản lý đơn</a>
                  <Link href="/account" className="block px-4 py-2 hover:bg-gray-50">Tài Khoản Của Tôi</Link>
                  <Link href="/orders" className="block px-4 py-2 hover:bg-gray-50">Đơn Mua</Link>
                  <Link href="/admin" className="block px-4 py-2 hover:bg-gray-50 text-red-600 font-medium">Admin Panel</Link>
                  <button onClick={() => { clearUser(); location.href = '/'; }} className="w-full text-left px-4 py-2 hover:bg-gray-50">Đăng Xuất</button>
                </div>
              </div>
            ) : (
              <a href="/auth" className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                <User className="h-4 w-4" />
                <span>Login</span>
              </a>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="border-t border-gray-200">
          <div className="flex items-center justify-between">
            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-8 py-4">
              {navigationItems.map((item, index) => (
                <div key={index} className="relative group">
                  <button className="flex items-center space-x-1 text-gray-700 hover:text-green-600 transition-colors font-medium">
                    <span>{item.label}</span>
                    {item.submenu && (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </button>
                  
                  {/* Dropdown Menu */}
                  {item.submenu && (
                    <div className="absolute top-full left-0 w-48 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <div className="py-2">
                        {item.submenu.map((subItem, subIndex) => (
                          <a
                            key={subIndex}
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors"
                          >
                            {subItem}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden border-t border-gray-200 py-4">
              {navigationItems.map((item, index) => (
                <div key={index} className="py-2">
                  <button className="flex items-center justify-between w-full text-left text-gray-700 hover:text-green-600 transition-colors font-medium">
                    <span>{item.label}</span>
                    {item.submenu && (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </button>
                  {item.submenu && (
                    <div className="ml-4 mt-2 space-y-1">
                      {item.submenu.map((subItem, subIndex) => (
                        <a
                          key={subIndex}
                          href="#"
                          className="block py-1 text-sm text-gray-600 hover:text-green-600 transition-colors"
                        >
                          {subItem}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
