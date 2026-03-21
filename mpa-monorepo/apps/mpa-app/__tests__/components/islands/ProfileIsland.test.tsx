import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProfileIsland from '@/components/islands/ProfileIsland'

const mockUser = { id: 'user_1', name: 'Jane Doe', email: 'jane@example.com' }

describe('ProfileIsland', () => {
  describe('initial render', () => {
    it('renders the section heading', () => {
      render(<ProfileIsland initialUser={mockUser} />)
      expect(screen.getByText('Personal Information')).toBeInTheDocument()
    })

    it('displays user name', () => {
      render(<ProfileIsland initialUser={mockUser} />)
      expect(screen.getByDisplayValue('Jane Doe')).toBeInTheDocument()
    })

    it('displays user email', () => {
      render(<ProfileIsland initialUser={mockUser} />)
      expect(screen.getByDisplayValue('jane@example.com')).toBeInTheDocument()
    })

    it('displays user id', () => {
      render(<ProfileIsland initialUser={mockUser} />)
      expect(screen.getByDisplayValue('user_1')).toBeInTheDocument()
    })

    it('fields are disabled in view mode', () => {
      render(<ProfileIsland initialUser={mockUser} />)
      expect(screen.getByDisplayValue('Jane Doe')).toBeDisabled()
      expect(screen.getByDisplayValue('jane@example.com')).toBeDisabled()
    })

    it('user id field is always disabled', () => {
      render(<ProfileIsland initialUser={mockUser} />)
      expect(screen.getByDisplayValue('user_1')).toBeDisabled()
    })

    it('shows Edit button in view mode', () => {
      render(<ProfileIsland initialUser={mockUser} />)
      expect(screen.getByRole('button', { name: 'Edit' })).toBeInTheDocument()
    })

    it('does not show save/cancel buttons initially', () => {
      render(<ProfileIsland initialUser={mockUser} />)
      expect(screen.queryByRole('button', { name: 'Save changes' })).not.toBeInTheDocument()
      expect(screen.queryByRole('button', { name: 'Cancel' })).not.toBeInTheDocument()
    })

    it('does not show success message initially', () => {
      render(<ProfileIsland initialUser={mockUser} />)
      expect(screen.queryByText('Changes saved (stub)')).not.toBeInTheDocument()
    })
  })

  describe('edit mode', () => {
    it('enables fields after clicking Edit', async () => {
      render(<ProfileIsland initialUser={mockUser} />)
      await userEvent.click(screen.getByRole('button', { name: 'Edit' }))
      expect(screen.getByDisplayValue('Jane Doe')).not.toBeDisabled()
      expect(screen.getByDisplayValue('jane@example.com')).not.toBeDisabled()
    })

    it('hides Edit button in edit mode', async () => {
      render(<ProfileIsland initialUser={mockUser} />)
      await userEvent.click(screen.getByRole('button', { name: 'Edit' }))
      expect(screen.queryByRole('button', { name: 'Edit' })).not.toBeInTheDocument()
    })

    it('shows Save and Cancel buttons in edit mode', async () => {
      render(<ProfileIsland initialUser={mockUser} />)
      await userEvent.click(screen.getByRole('button', { name: 'Edit' }))
      expect(screen.getByRole('button', { name: 'Save changes' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument()
    })

    it('allows editing the name field', async () => {
      render(<ProfileIsland initialUser={mockUser} />)
      await userEvent.click(screen.getByRole('button', { name: 'Edit' }))
      const nameInput = screen.getByDisplayValue('Jane Doe')
      await userEvent.clear(nameInput)
      await userEvent.type(nameInput, 'John Smith')
      expect(screen.getByDisplayValue('John Smith')).toBeInTheDocument()
    })

    it('allows editing the email field', async () => {
      render(<ProfileIsland initialUser={mockUser} />)
      await userEvent.click(screen.getByRole('button', { name: 'Edit' }))
      const emailInput = screen.getByDisplayValue('jane@example.com')
      await userEvent.clear(emailInput)
      await userEvent.type(emailInput, 'john@example.com')
      expect(screen.getByDisplayValue('john@example.com')).toBeInTheDocument()
    })
  })

  describe('saving', () => {
    it('shows success message after saving', async () => {
      render(<ProfileIsland initialUser={mockUser} />)
      await userEvent.click(screen.getByRole('button', { name: 'Edit' }))
      await userEvent.click(screen.getByRole('button', { name: 'Save changes' }))
      expect(screen.getByText('Changes saved (stub)')).toBeInTheDocument()
    })

    it('returns to view mode after saving', async () => {
      render(<ProfileIsland initialUser={mockUser} />)
      await userEvent.click(screen.getByRole('button', { name: 'Edit' }))
      await userEvent.click(screen.getByRole('button', { name: 'Save changes' }))
      expect(screen.getByRole('button', { name: 'Edit' })).toBeInTheDocument()
      expect(screen.queryByRole('button', { name: 'Save changes' })).not.toBeInTheDocument()
    })

    it('disables fields after saving', async () => {
      render(<ProfileIsland initialUser={mockUser} />)
      await userEvent.click(screen.getByRole('button', { name: 'Edit' }))
      await userEvent.click(screen.getByRole('button', { name: 'Save changes' }))
      expect(screen.getByDisplayValue('Jane Doe')).toBeDisabled()
    })

    it('persists updated name after saving', async () => {
      render(<ProfileIsland initialUser={mockUser} />)
      await userEvent.click(screen.getByRole('button', { name: 'Edit' }))
      const nameInput = screen.getByDisplayValue('Jane Doe')
      await userEvent.clear(nameInput)
      await userEvent.type(nameInput, 'John Smith')
      await userEvent.click(screen.getByRole('button', { name: 'Save changes' }))
      expect(screen.getByDisplayValue('John Smith')).toBeInTheDocument()
    })

    it('clears success message when entering edit mode again', async () => {
      render(<ProfileIsland initialUser={mockUser} />)
      await userEvent.click(screen.getByRole('button', { name: 'Edit' }))
      await userEvent.click(screen.getByRole('button', { name: 'Save changes' }))
      await userEvent.click(screen.getByRole('button', { name: 'Edit' }))
      expect(screen.queryByText('Changes saved (stub)')).not.toBeInTheDocument()
    })
  })

  describe('cancelling', () => {
    it('returns to view mode on cancel', async () => {
      render(<ProfileIsland initialUser={mockUser} />)
      await userEvent.click(screen.getByRole('button', { name: 'Edit' }))
      await userEvent.click(screen.getByRole('button', { name: 'Cancel' }))
      expect(screen.getByRole('button', { name: 'Edit' })).toBeInTheDocument()
    })

    it('resets name to original value on cancel', async () => {
      render(<ProfileIsland initialUser={mockUser} />)
      await userEvent.click(screen.getByRole('button', { name: 'Edit' }))
      const nameInput = screen.getByDisplayValue('Jane Doe')
      await userEvent.clear(nameInput)
      await userEvent.type(nameInput, 'John Smith')
      await userEvent.click(screen.getByRole('button', { name: 'Cancel' }))
      expect(screen.getByDisplayValue('Jane Doe')).toBeInTheDocument()
      expect(screen.queryByDisplayValue('John Smith')).not.toBeInTheDocument()
    })

    it('resets email to original value on cancel', async () => {
      render(<ProfileIsland initialUser={mockUser} />)
      await userEvent.click(screen.getByRole('button', { name: 'Edit' }))
      const emailInput = screen.getByDisplayValue('jane@example.com')
      await userEvent.clear(emailInput)
      await userEvent.type(emailInput, 'changed@example.com')
      await userEvent.click(screen.getByRole('button', { name: 'Cancel' }))
      expect(screen.getByDisplayValue('jane@example.com')).toBeInTheDocument()
    })

    it('disables fields after cancelling', async () => {
      render(<ProfileIsland initialUser={mockUser} />)
      await userEvent.click(screen.getByRole('button', { name: 'Edit' }))
      await userEvent.click(screen.getByRole('button', { name: 'Cancel' }))
      expect(screen.getByDisplayValue('Jane Doe')).toBeDisabled()
    })
  })
})
