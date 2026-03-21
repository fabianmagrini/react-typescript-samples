import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { SESSION_COOKIE } from '@/lib/auth'

export function middleware(request: NextRequest) {
  const session = request.cookies.get(SESSION_COOKIE)
  const { pathname } = request.nextUrl

  if (!session?.value && pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (session?.value && pathname === '/login') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // Forward pathname to Server Components via request header
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-pathname', pathname)
  return NextResponse.next({ request: { headers: requestHeaders } })
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
