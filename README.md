# N&T Camping Frontend (Next.js)

A Next.js + Tailwind CSS frontend that clones the look-and-feel of leutrai.vn and adds extra flows: authentication mock, cart/checkout, account center, orders, and simple listing management (Đăng tin/Quản lý tin) using localStorage.

## Tech stack
- Next.js (App Router, TypeScript)
- Tailwind CSS
- lucide-react (icons)

## Prerequisites
- Node.js 18+ (recommend 20+)
- npm (bundled with Node)

## Getting started

1) Install dependencies
```bash
npm install
```

2) Run the dev server
```bash
npm run dev
```
The app starts on http://localhost:3000

3) Production build (optional)
```bash
npm run build
npm run start
```

## Project structure (key paths)
- `src/app/page.tsx`: Trang chủ
- `src/components/Header.tsx`, `src/components/Footer.tsx`
- `src/app/cart/page.tsx`: Giỏ hàng
- `src/app/checkout/page.tsx`: Chi tiết đặt hàng
- `src/app/auth/page.tsx`: Đăng nhập/Đăng ký (mock – lưu localStorage)
- `src/app/account/*`: Khu vực tài khoản + sidebar
- `src/app/orders/page.tsx`: Đơn mua (mock dữ liệu, lọc tab, tìm kiếm)
- `src/lib/auth.ts`: Lưu/đọc user từ localStorage
- `src/lib/listings.ts`: Store tin đăng (CRUD + trạng thái) bằng localStorage
- `src/app/listings/new/page.tsx`: Đăng tin
- `src/app/listings/manage/page.tsx`: Quản lý tin/đơn (tab trạng thái, hành động)
- `src/app/listings/edit/[id]/page.tsx`: Sửa tin

## Mock data and limitations
- Đăng nhập/đăng ký chỉ lưu thông tin cơ bản vào `localStorage` (không có backend).
- Tin đăng/đơn hàng cũng là mock trong `localStorage` để demo UI/flow.
- Bạn có thể thay thế các store trong `src/lib` bằng API thật khi có backend.

## Common tasks
- Đổi tiêu đề/brand: sửa trong `src/components/Header.tsx`.
- Thêm mục menu/đường dẫn: cập nhật `Header.tsx` và tạo trang trong `src/app`.
- Thay màu sắc: Tailwind utility hoặc `src/app/globals.css`.

## Troubleshooting
- Lỗi PowerShell khi dùng `&&`: chạy lệnh tách dòng.
  - Ví dụ trên Windows:
    ```powershell
    cd leutrai-clone
    npm run dev
    ```
- Không hiện icon lucide: đảm bảo đã `npm install lucide-react`.
- Hydration warning ở Header: luôn dùng `next/link` cho điều hướng nội bộ.

## License
For educational/demo use only.
