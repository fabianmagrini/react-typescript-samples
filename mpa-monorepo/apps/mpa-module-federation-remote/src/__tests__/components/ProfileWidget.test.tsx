import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProfileWidget from '../../components/ProfileWidget'

describe('ProfileWidget', () => {
  describe('initial render', () => {
    it('renders the user avatar initial', () => {
      render(<ProfileWidget />)
      expect(screen.getByText('J')).toBeInTheDocument()
    })

    it('renders the user display name', () => {
      render(<ProfileWidget />)
      expect(screen.getByDisplayValue('Jane Smith')).toBeInTheDocument()
    })

    it('renders the user email', () => {
      render(<ProfileWidget />)
      expect(screen.getByDisplayValue('jane.smith@example.com')).toBeInTheDocument()
    })

    it('renders the user role', () => {
      render(<ProfileWidget />)
      expect(screen.getByText('Product Manager')).toBeInTheDocument()
    })

    it('renders the timezone info', () => {
      render(<ProfileWidget />)
      expect(screen.getByText(/UTC\+10/)).toBeInTheDocument()
    })

    it('renders the joined date', () => {
      render(<ProfileWidget />)
      expect(screen.getByText(/January 2023/)).toBeInTheDocument()
    })

    it('renders the Save changes button', () => {
      render(<ProfileWidget />)
      expect(screen.getByRole('button', { name: 'Save changes' })).toBeInTheDocument()
    })

    it('does not show the saved confirmation initially', () => {
      render(<ProfileWidget />)
      expect(screen.queryByRole('button', { name: 'Saved!' })).not.toBeInTheDocument()
    })

    it('renders the name input field', () => {
      render(<ProfileWidget />)
      expect(screen.getByLabelText('Display name')).toBeInTheDocument()
    })

    it('renders the email input field', () => {
      render(<ProfileWidget />)
      expect(screen.getByLabelText('Email')).toBeInTheDocument()
    })
  })

  describe('form interaction', () => {
    it('allows editing the name field', async () => {
      render(<ProfileWidget />)
      const nameInput = screen.getByLabelText('Display name')
      await userEvent.clear(nameInput)
      await userEvent.type(nameInput, 'John Doe')
      expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument()
    })

    it('allows editing the email field', async () => {
      render(<ProfileWidget />)
      const emailInput = screen.getByLabelText('Email')
      await userEvent.clear(emailInput)
      await userEvent.type(emailInput, 'john.doe@example.com')
      expect(screen.getByDisplayValue('john.doe@example.com')).toBeInTheDocument()
    })

    it('name field accepts partial input', async () => {
      render(<ProfileWidget />)
      const nameInput = screen.getByLabelText('Display name')
      await userEvent.clear(nameInput)
      await userEvent.type(nameInput, 'A')
      expect(screen.getByDisplayValue('A')).toBeInTheDocument()
    })

    it('avatar initial updates when name changes', async () => {
      render(<ProfileWidget />)
      const nameInput = screen.getByLabelText('Display name')
      await userEvent.clear(nameInput)
      await userEvent.type(nameInput, 'Bob')
      expect(screen.getByText('B')).toBeInTheDocument()
    })
  })

  describe('saving', () => {
    it('shows "Saved!" after submitting the form', async () => {
      render(<ProfileWidget />)
      await userEvent.click(screen.getByRole('button', { name: 'Save changes' }))
      expect(screen.getByRole('button', { name: 'Saved!' })).toBeInTheDocument()
    })

    it('retains the updated name after saving', async () => {
      render(<ProfileWidget />)
      const nameInput = screen.getByLabelText('Display name')
      await userEvent.clear(nameInput)
      await userEvent.type(nameInput, 'Updated Name')
      await userEvent.click(screen.getByRole('button', { name: 'Save changes' }))
      expect(screen.getByDisplayValue('Updated Name')).toBeInTheDocument()
    })

    it('retains the updated email after saving', async () => {
      render(<ProfileWidget />)
      const emailInput = screen.getByLabelText('Email')
      await userEvent.clear(emailInput)
      await userEvent.type(emailInput, 'updated@example.com')
      await userEvent.click(screen.getByRole('button', { name: 'Save changes' }))
      expect(screen.getByDisplayValue('updated@example.com')).toBeInTheDocument()
    })

    describe('timer behaviour', () => {
      afterEach(() => { vi.restoreAllMocks() })

      // vi.useFakeTimers() disrupts userEvent's internal async scheduling
      // under React 19 + jsdom. Instead, spy on setTimeout directly so
      // userEvent runs on real timers while we control the component's
      // own 2 000 ms reset callback.
      function spyOnComponentTimer() {
        let savedCallback: (() => void) | undefined
        const real = globalThis.setTimeout.bind(globalThis)
        vi.spyOn(globalThis, 'setTimeout').mockImplementation((fn: any, delay?: any, ...args: any[]) => {
          if (delay === 2000) {
            savedCallback = fn
            return 0 as unknown as ReturnType<typeof setTimeout>
          }
          return real(fn, delay, ...args)
        })
        return { fire: () => act(() => savedCallback?.()) }
      }

      it('button text reverts to "Save changes" after the timeout', async () => {
        const timer = spyOnComponentTimer()
        render(<ProfileWidget />)
        await userEvent.click(screen.getByRole('button', { name: 'Save changes' }))
        expect(screen.getByRole('button', { name: 'Saved!' })).toBeInTheDocument()
        timer.fire()
        expect(screen.getByRole('button', { name: 'Save changes' })).toBeInTheDocument()
      })

      it('can save again after the confirmation resets', async () => {
        const timer = spyOnComponentTimer()
        render(<ProfileWidget />)
        await userEvent.click(screen.getByRole('button', { name: 'Save changes' }))
        expect(screen.getByRole('button', { name: 'Saved!' })).toBeInTheDocument()
        timer.fire()
        expect(screen.getByRole('button', { name: 'Save changes' })).toBeInTheDocument()
        await userEvent.click(screen.getByRole('button', { name: 'Save changes' }))
        expect(screen.getByRole('button', { name: 'Saved!' })).toBeInTheDocument()
      })
    })
  })
})
