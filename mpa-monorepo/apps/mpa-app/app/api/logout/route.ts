import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { SESSION_COOKIE } from '@/lib/auth'

export function GET(request: NextRequest) {
  const response = NextResponse.redirect(new URL('/login', request.url))
  response.cookies.set(SESSION_COOKIE, '', { maxAge: 0, path: '/', httpOnly: true })
  return response
}
