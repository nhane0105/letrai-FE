import { NextRequest, NextResponse } from 'next/server';

// Mock admin data - trong thực tế sẽ lấy từ database
const ADMIN_CREDENTIALS = {
  email: 'admin@leutrai.com',
  password: 'admin123',
  name: 'Admin User',
  id: 'admin_001'
};

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Kiểm tra thông tin đăng nhập
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      // Tạo JWT token (trong thực tế nên sử dụng thư viện như jsonwebtoken)
      const token = Buffer.from(JSON.stringify({
        id: ADMIN_CREDENTIALS.id,
        email: ADMIN_CREDENTIALS.email,
        name: ADMIN_CREDENTIALS.name,
        role: 'admin',
        exp: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
      })).toString('base64');

      const response = NextResponse.json({
        success: true,
        user: {
          id: ADMIN_CREDENTIALS.id,
          name: ADMIN_CREDENTIALS.name,
          email: ADMIN_CREDENTIALS.email,
          role: 'admin'
        }
      });

      // Set cookie
      response.cookies.set('admin_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 // 24 hours
      });

      return response;
    }

    return NextResponse.json(
      { success: false, message: 'Email hoặc mật khẩu không đúng' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Lỗi server' },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete('admin_token');
  return response;
}
