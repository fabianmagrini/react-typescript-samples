import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Stamp the current pathname onto a request header so server components
// (specifically the main layout) can read it without making the page dynamic.
export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  response.headers.set('x-pathname', request.nextUrl.pathname)
  return response
}

export const config = {
  // Run on all routes except Next.js internals and static files.
  matcher: ['/((?!_next|favicon.ico).*)'],
}
