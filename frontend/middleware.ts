import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const isAuthenticated = !!token;

  const pathname = request.nextUrl.pathname;

  const isPublicPath =
    pathname === '/' ||
    pathname.startsWith('/login') ||
    pathname.startsWith('/register');

  if (!isAuthenticated && !isPublicPath) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isAuthenticated && isPublicPath) {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/login',
    '/register',
    '/home',
    '/jobs/:path*',
    '/network/:path*',
    '/notifications/:path*',
    '/profile/:path*',
    '/messaging/:path*',
  ],
};