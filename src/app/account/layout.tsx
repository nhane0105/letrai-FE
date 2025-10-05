import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const nav = [
    { href: '/account/notifications', label: 'Thông Báo' },
    { type: 'section', label: 'Tài Khoản Của Tôi' },
    { href: '/account', label: 'Hồ Sơ' },
    { href: '/orders', label: 'Đơn Mua' },
    { href: '/account/bank', label: 'Ngân Hàng' },
    { href: '/account/address', label: 'Địa Chỉ' },
    { href: '/account/password', label: 'Đổi Mật Khẩu' },
    { href: '/account/notification-settings', label: 'Cài Đặt Thông Báo' },
    { href: '/account/privacy', label: 'Những Thiết Lập Riêng Tư' },
    { href: '/account/personal', label: 'Thông Tin Cá Nhân' },

  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <aside className="bg-white rounded-xl shadow p-4 h-max">
          <ul className="space-y-2 text-sm">
            {nav.map((item, idx) =>
              'type' in item ? (
                <li key={idx} className="mt-2 pt-2 border-t text-gray-500 font-semibold">
                  {item.label}
                </li>
              ) : (
                <li key={idx}>
                  <Link href={item.href} className="block px-2 py-2 rounded hover:bg-gray-50">
                    {item.label}
                  </Link>
                </li>
              )
            )}
          </ul>
        </aside>
        <section className="lg:col-span-2">{children}</section>
      </main>
      <Footer />
    </div>
  );
}


