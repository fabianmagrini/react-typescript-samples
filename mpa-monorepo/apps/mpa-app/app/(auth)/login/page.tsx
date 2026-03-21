import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { SESSION_COOKIE } from '@/lib/auth'

async function login(formData: FormData) {
  'use server'
  const username = formData.get('username')
  const password = formData.get('password')

  // Stub: accept any non-empty credentials
  if (!username || !password) return

  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, 'authenticated', {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24, // 1 day
  })

  redirect('/dashboard')
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Sign in</h1>
        <form action={login} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Sign in
          </button>
        </form>
        <p className="mt-4 text-xs text-gray-400 text-center">Stub auth — any credentials work</p>
      </div>
    </div>
  )
}

