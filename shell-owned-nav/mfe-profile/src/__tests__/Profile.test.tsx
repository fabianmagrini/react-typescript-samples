import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Profile from '../Profile';

describe('Profile', () => {
  // -------------------------------------------------------------------------
  // Header
  // -------------------------------------------------------------------------

  it('renders the page heading', () => {
    render(<Profile />);
    expect(screen.getByRole('heading', { name: 'Profile' })).toBeInTheDocument();
  });

  it('renders the subtitle', () => {
    render(<Profile />);
    expect(screen.getByText(/manage your personal information/i)).toBeInTheDocument();
  });

  // -------------------------------------------------------------------------
  // Avatar
  // -------------------------------------------------------------------------

  it('renders an avatar showing the first letter of the default name', () => {
    render(<Profile />);
    // Default name is "Jane Doe" → avatar shows "J"
    expect(screen.getByText('J')).toBeInTheDocument();
  });

  it('renders the full name in the avatar section', () => {
    render(<Profile />);
    // The name appears in the avatar header area (not just the form input)
    const nameElements = screen.getAllByText('Jane Doe');
    expect(nameElements.length).toBeGreaterThanOrEqual(1);
  });

  it('renders the role in the avatar section', () => {
    render(<Profile />);
    const roleElements = screen.getAllByText('Product Manager');
    expect(roleElements.length).toBeGreaterThanOrEqual(1);
  });

  // -------------------------------------------------------------------------
  // Form fields — default values
  // -------------------------------------------------------------------------

  it('renders name input with default value', () => {
    render(<Profile />);
    expect(screen.getByDisplayValue('Jane Doe')).toBeInTheDocument();
  });

  it('renders email input with default value', () => {
    render(<Profile />);
    expect(screen.getByDisplayValue('jane.doe@example.com')).toBeInTheDocument();
  });

  it('renders role input with default value', () => {
    render(<Profile />);
    expect(screen.getByDisplayValue('Product Manager')).toBeInTheDocument();
  });

  it('renders bio textarea with default value', () => {
    render(<Profile />);
    expect(
      screen.getByDisplayValue('Building great products one sprint at a time.'),
    ).toBeInTheDocument();
  });

  it('renders labels for all form fields', () => {
    render(<Profile />);
    expect(screen.getByText('name')).toBeInTheDocument();
    expect(screen.getByText('email')).toBeInTheDocument();
    expect(screen.getByText('role')).toBeInTheDocument();
    expect(screen.getByText('Bio')).toBeInTheDocument();
  });

  it('renders the Save changes button', () => {
    render(<Profile />);
    expect(screen.getByRole('button', { name: /save changes/i })).toBeInTheDocument();
  });

  // -------------------------------------------------------------------------
  // Form interactions
  // -------------------------------------------------------------------------

  it('updates the name field when the user types', () => {
    render(<Profile />);
    const input = screen.getByDisplayValue('Jane Doe');
    fireEvent.change(input, { target: { name: 'name', value: 'John Smith' } });
    expect(screen.getByDisplayValue('John Smith')).toBeInTheDocument();
  });

  it('updates the email field when the user types', () => {
    render(<Profile />);
    const input = screen.getByDisplayValue('jane.doe@example.com');
    fireEvent.change(input, {
      target: { name: 'email', value: 'john@example.com' },
    });
    expect(screen.getByDisplayValue('john@example.com')).toBeInTheDocument();
  });

  it('updates the role field when the user types', () => {
    render(<Profile />);
    const input = screen.getByDisplayValue('Product Manager');
    fireEvent.change(input, { target: { name: 'role', value: 'Engineer' } });
    expect(screen.getByDisplayValue('Engineer')).toBeInTheDocument();
  });

  it('updates the bio textarea when the user types', () => {
    render(<Profile />);
    const textarea = screen.getByDisplayValue('Building great products one sprint at a time.');
    fireEvent.change(textarea, {
      target: { name: 'bio', value: 'New bio text.' },
    });
    expect(screen.getByDisplayValue('New bio text.')).toBeInTheDocument();
  });

  // -------------------------------------------------------------------------
  // Avatar reactivity
  // -------------------------------------------------------------------------

  it('updates the avatar letter when the name changes', () => {
    render(<Profile />);
    const input = screen.getByDisplayValue('Jane Doe');
    fireEvent.change(input, { target: { name: 'name', value: 'Oliver' } });
    expect(screen.getByText('O')).toBeInTheDocument();
  });

  // -------------------------------------------------------------------------
  // Save feedback
  // -------------------------------------------------------------------------

  it('does not show Saved! before the form is submitted', () => {
    render(<Profile />);
    expect(screen.queryByText('Saved!')).not.toBeInTheDocument();
  });

  it('shows Saved! after the form is submitted', () => {
    render(<Profile />);
    fireEvent.submit(
      screen.getByRole('button', { name: /save changes/i }).closest('form') as HTMLFormElement,
    );
    expect(screen.getByText('Saved!')).toBeInTheDocument();
  });

  it('hides Saved! when the user edits a field after saving', () => {
    render(<Profile />);
    // Save first
    fireEvent.submit(
      screen.getByRole('button', { name: /save changes/i }).closest('form') as HTMLFormElement,
    );
    expect(screen.getByText('Saved!')).toBeInTheDocument();

    // Then edit — should clear the saved state
    const input = screen.getByDisplayValue('Jane Doe');
    fireEvent.change(input, { target: { name: 'name', value: 'Jane Edited' } });
    expect(screen.queryByText('Saved!')).not.toBeInTheDocument();
  });

  it('shows Saved! again after saving a second time', () => {
    render(<Profile />);
    const form = screen
      .getByRole('button', { name: /save changes/i })
      .closest('form') as HTMLFormElement;

    fireEvent.submit(form);
    const input = screen.getByDisplayValue('Jane Doe');
    fireEvent.change(input, { target: { name: 'name', value: 'Jane V2' } });
    fireEvent.submit(form);

    expect(screen.getByText('Saved!')).toBeInTheDocument();
  });

  // -------------------------------------------------------------------------
  // Remote identifier badge
  // -------------------------------------------------------------------------

  it('renders the remote identifier badge', () => {
    render(<Profile />);
    expect(screen.getByText(/mfe-profile/)).toBeInTheDocument();
  });

  it('remote identifier mentions the port', () => {
    render(<Profile />);
    expect(screen.getByText(/3002/)).toBeInTheDocument();
  });
});
