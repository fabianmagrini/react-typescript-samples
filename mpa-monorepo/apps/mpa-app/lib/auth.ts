import { cookies } from 'next/headers'

export const SESSION_COOKIE = 'mpa_session'
export const STUB_USER = { id: 'user_1', name: 'Jane Doe', email: 'jane@example.com' }

export async function getSession() {
  const cookieStore = await cookies()
  const session = cookieStore.get(SESSION_COOKIE)
  if (!session?.value) return null
  return STUB_USER
}
