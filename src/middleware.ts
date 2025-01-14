import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { useAuthStore } from '@/store/authStore';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const isLogin = useAuthStore((state) => state.isLogin);
  if (!isLogin) return NextResponse.redirect(new URL('/login', request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/post'],
};
