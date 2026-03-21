import { describe, it, expect, vi, beforeEach } from 'vitest'
import { cookies } from 'next/headers'
import { getSession, STUB_USER, SESSION_COOKIE } from '@/lib/auth'

const mockCookies = vi.mocked(cookies)

describe('auth', () => {
  describe('getSession', () => {
    beforeEach(() => {
      vi.clearAllMocks()
    })

    it('returns null when no session cookie is present', async () => {
      mockCookies.mockResolvedValue({
        get: vi.fn().mockReturnValue(undefined),
      } as any)

      const session = await getSession()
      expect(session).toBeNull()
    })

    it('returns null when session cookie has no value', async () => {
      mockCookies.mockResolvedValue({
        get: vi.fn().mockReturnValue({ name: SESSION_COOKIE, value: '' }),
      } as any)

      const session = await getSession()
      expect(session).toBeNull()
    })

    it('returns STUB_USER when session cookie is present', async () => {
      mockCookies.mockResolvedValue({
        get: vi.fn().mockReturnValue({ name: SESSION_COOKIE, value: 'authenticated' }),
      } as any)

      const session = await getSession()
      expect(session).toEqual(STUB_USER)
    })

    it('reads the correct cookie name', async () => {
      const getCookieMock = vi.fn().mockReturnValue(undefined)
      mockCookies.mockResolvedValue({ get: getCookieMock } as any)

      await getSession()
      expect(getCookieMock).toHaveBeenCalledWith(SESSION_COOKIE)
    })

    it('STUB_USER has required fields', () => {
      expect(STUB_USER).toMatchObject({
        id: expect.any(String),
        name: expect.any(String),
        email: expect.any(String),
      })
    })
  })
})
