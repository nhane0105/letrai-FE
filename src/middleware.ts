import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if the request is for admin routes
  if (pathname.startsWith('/admin')) {
    // Skip middleware for admin login page
    if (pathname === '/admin/login') {
      return NextResponse.next();
    }
    
    // Check for admin token in cookies
    const adminToken = request.cookies.get('admin_token');
    
    if (!adminToken) {
      // Redirect to admin login if no token
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
    
    // Verify token (in a real app, you'd verify the JWT signature)
    try {
      const tokenData = JSON.parse(Buffer.from(adminToken.value, 'base64').toString());
      
      // Check if token is expired
      if (tokenData.exp && Date.now() > tokenData.exp) {
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }
      
      // Token is valid, continue
      return NextResponse.next();
    } catch (error) {
      // Invalid token, redirect to login
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    // '/admin/:path*',
  ],
};
