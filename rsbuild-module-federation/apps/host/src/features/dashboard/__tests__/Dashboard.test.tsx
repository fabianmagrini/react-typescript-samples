import { describe, it, expect, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import { render, mockDashboardStats } from '@/test/test-utils';
import Dashboard from '../pages/Dashboard';
import * as queries from '@/api/queries';

// Mock the API queries
vi.mock('@/api/queries', () => ({
  useDashboardStats: vi.fn(),
}));

const mockUseDashboardStats = vi.mocked(queries.useDashboardStats);

describe('Dashboard', () => {
  it('should render loading state', () => {
    mockUseDashboardStats.mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    } as any);

    render(<Dashboard />);

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Welcome to your micro-frontend dashboard')).toBeInTheDocument();
    
    // Check for loading skeleton
    const skeletons = screen.getAllByRole('generic');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('should render error state', () => {
    mockUseDashboardStats.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error('Failed to fetch'),
    } as any);

    render(<Dashboard />);

    expect(screen.getByText('Error Loading Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Unable to load dashboard statistics. Please try again later.')).toBeInTheDocument();
  });

  it('should render dashboard with stats', async () => {
    mockUseDashboardStats.mockReturnValue({
      data: mockDashboardStats,
      isLoading: false,
      error: null,
    } as any);

    render(<Dashboard />);

    // Check header
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Welcome to your micro-frontend dashboard')).toBeInTheDocument();

    // Check stats cards
    await waitFor(() => {
      expect(screen.getByText('Total Users')).toBeInTheDocument();
      expect(screen.getByText('100')).toBeInTheDocument();
      
      expect(screen.getByText('Total Orders')).toBeInTheDocument();
      expect(screen.getByText('50')).toBeInTheDocument();
      
      expect(screen.getByText('Revenue')).toBeInTheDocument();
      expect(screen.getByText('$10,000')).toBeInTheDocument();
      
      expect(screen.getByText('Growth')).toBeInTheDocument();
      expect(screen.getByText('5.5%')).toBeInTheDocument();
    });

    // Check sections
    expect(screen.getByText('Recent Activity')).toBeInTheDocument();
    expect(screen.getByText('Quick Actions')).toBeInTheDocument();
  });

  it('should display recent activity items', async () => {
    mockUseDashboardStats.mockReturnValue({
      data: mockDashboardStats,
      isLoading: false,
      error: null,
    } as any);

    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText('New user registered')).toBeInTheDocument();
      expect(screen.getByText('Order completed')).toBeInTheDocument();
      expect(screen.getByText('Payment processed')).toBeInTheDocument();
    });
  });

  it('should display quick action buttons', async () => {
    mockUseDashboardStats.mockReturnValue({
      data: mockDashboardStats,
      isLoading: false,
      error: null,
    } as any);

    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Add User' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'View Reports' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Export Data' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Settings' })).toBeInTheDocument();
    });
  });

  it('should handle undefined stats gracefully', () => {
    mockUseDashboardStats.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: null,
    } as any);

    render(<Dashboard />);

    // Should show default values
    expect(screen.getByText('0')).toBeInTheDocument(); // Default for undefined stats
  });
});