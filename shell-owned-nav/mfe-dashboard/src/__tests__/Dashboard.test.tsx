import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Dashboard from '../Dashboard';

describe('Dashboard', () => {
  // -------------------------------------------------------------------------
  // Header
  // -------------------------------------------------------------------------

  it('renders the page heading', () => {
    render(<Dashboard />);
    expect(screen.getByRole('heading', { name: 'Dashboard' })).toBeInTheDocument();
  });

  it('renders the subtitle', () => {
    render(<Dashboard />);
    expect(
      screen.getByText(/welcome back/i),
    ).toBeInTheDocument();
  });

  // -------------------------------------------------------------------------
  // Stat cards
  // -------------------------------------------------------------------------

  it('renders all three stat card labels', () => {
    render(<Dashboard />);
    expect(screen.getByText('Total Users')).toBeInTheDocument();
    expect(screen.getByText('Revenue')).toBeInTheDocument();
    expect(screen.getByText('Active Sessions')).toBeInTheDocument();
  });

  it('renders the correct value for Total Users', () => {
    render(<Dashboard />);
    expect(screen.getByText('12,483')).toBeInTheDocument();
  });

  it('renders the correct value for Revenue', () => {
    render(<Dashboard />);
    expect(screen.getByText('$48,295')).toBeInTheDocument();
  });

  it('renders the correct value for Active Sessions', () => {
    render(<Dashboard />);
    expect(screen.getByText('1,024')).toBeInTheDocument();
  });

  it('renders positive trend changes', () => {
    render(<Dashboard />);
    expect(screen.getByText('+12% vs last month')).toBeInTheDocument();
    expect(screen.getByText('+8.1% vs last month')).toBeInTheDocument();
  });

  it('renders negative trend changes', () => {
    render(<Dashboard />);
    expect(screen.getByText('-3% vs last month')).toBeInTheDocument();
  });

  it('applies green colour class to positive trends', () => {
    render(<Dashboard />);
    const positive = screen.getByText('+12% vs last month');
    expect(positive).toHaveClass('text-emerald-600');
  });

  it('applies red colour class to negative trends', () => {
    render(<Dashboard />);
    const negative = screen.getByText('-3% vs last month');
    expect(negative).toHaveClass('text-red-500');
  });

  // -------------------------------------------------------------------------
  // Recent Activity section
  // -------------------------------------------------------------------------

  it('renders the Recent Activity heading', () => {
    render(<Dashboard />);
    expect(
      screen.getByRole('heading', { name: 'Recent Activity' }),
    ).toBeInTheDocument();
  });

  it('renders all four activity entries', () => {
    render(<Dashboard />);
    expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
    expect(screen.getByText('Bob Smith')).toBeInTheDocument();
    expect(screen.getByText('Carol White')).toBeInTheDocument();
    expect(screen.getByText('David Brown')).toBeInTheDocument();
  });

  it('renders the action for each activity entry', () => {
    render(<Dashboard />);
    expect(screen.getByText('Signed up')).toBeInTheDocument();
    expect(screen.getByText('Upgraded plan')).toBeInTheDocument();
    expect(screen.getByText('Submitted report')).toBeInTheDocument();
    expect(screen.getByText('Invited team member')).toBeInTheDocument();
  });

  it('renders relative timestamps for activity entries', () => {
    render(<Dashboard />);
    expect(screen.getByText('2 min ago')).toBeInTheDocument();
    expect(screen.getByText('14 min ago')).toBeInTheDocument();
    expect(screen.getByText('1 hr ago')).toBeInTheDocument();
    expect(screen.getByText('3 hr ago')).toBeInTheDocument();
  });

  it('renders each activity entry as a list item', () => {
    render(<Dashboard />);
    const list = screen.getByRole('list');
    const items = within(list).getAllByRole('listitem');
    expect(items).toHaveLength(4);
  });

  // -------------------------------------------------------------------------
  // Remote identifier badge
  // -------------------------------------------------------------------------

  it('renders the remote identifier badge', () => {
    render(<Dashboard />);
    expect(screen.getByText(/mfe-dashboard/)).toBeInTheDocument();
  });

  it('remote identifier mentions the port', () => {
    render(<Dashboard />);
    expect(screen.getByText(/3001/)).toBeInTheDocument();
  });
});
