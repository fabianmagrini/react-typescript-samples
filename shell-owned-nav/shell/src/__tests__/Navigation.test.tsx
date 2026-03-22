import { act, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// ---------------------------------------------------------------------------
// Mock nav-registry BEFORE importing anything that uses it.
// The factory must not reference outer variables — use vi.mocked() in tests.
// ---------------------------------------------------------------------------
vi.mock('@mfe-demo/nav-registry', () => ({
  getNavItems: vi.fn(() => []),
  subscribe: vi.fn(() => vi.fn()),
}));

import { getNavItems, subscribe } from '@mfe-demo/nav-registry';
import Navigation from '../Navigation';

function renderNav(initialPath = '/') {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Navigation />
    </MemoryRouter>,
  );
}

describe('Navigation', () => {
  let capturedListener: (() => void) | undefined;
  let unsubscribeMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    capturedListener = undefined;
    unsubscribeMock = vi.fn();

    vi.mocked(getNavItems).mockReturnValue([]);
    vi.mocked(subscribe).mockImplementation((listener) => {
      capturedListener = listener;
      return unsubscribeMock;
    });
  });

  // -------------------------------------------------------------------------
  // Static rendering
  // -------------------------------------------------------------------------

  it('renders the brand name', () => {
    renderNav();
    expect(screen.getByText('MFE Demo')).toBeInTheDocument();
  });

  it('renders no links when the registry is empty', () => {
    renderNav();
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('renders a link for each registered nav item', () => {
    vi.mocked(getNavItems).mockReturnValue([
      { path: '/dashboard', label: 'Dashboard', order: 1 },
      { path: '/profile', label: 'Profile', order: 2 },
    ]);
    renderNav();

    expect(screen.getByRole('link', { name: 'Dashboard' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Profile' })).toBeInTheDocument();
  });

  it('renders links with correct href attributes', () => {
    vi.mocked(getNavItems).mockReturnValue([{ path: '/dashboard', label: 'Dashboard', order: 1 }]);
    renderNav();

    expect(screen.getByRole('link', { name: 'Dashboard' })).toHaveAttribute('href', '/dashboard');
  });

  it('renders items in registry order', () => {
    vi.mocked(getNavItems).mockReturnValue([
      { path: '/dashboard', label: 'Dashboard', order: 1 },
      { path: '/profile', label: 'Profile', order: 2 },
    ]);
    renderNav();

    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveTextContent('Dashboard');
    expect(links[1]).toHaveTextContent('Profile');
  });

  // -------------------------------------------------------------------------
  // Active link styling
  // -------------------------------------------------------------------------

  it('applies the active class to the link matching the current route', () => {
    vi.mocked(getNavItems).mockReturnValue([
      { path: '/dashboard', label: 'Dashboard', order: 1 },
      { path: '/profile', label: 'Profile', order: 2 },
    ]);
    renderNav('/dashboard');

    expect(screen.getByRole('link', { name: 'Dashboard' })).toHaveClass('active');
    expect(screen.getByRole('link', { name: 'Profile' })).not.toHaveClass('active');
  });

  it('does not apply the active class to non-current routes', () => {
    vi.mocked(getNavItems).mockReturnValue([
      { path: '/dashboard', label: 'Dashboard', order: 1 },
      { path: '/profile', label: 'Profile', order: 2 },
    ]);
    renderNav('/profile');

    expect(screen.getByRole('link', { name: 'Profile' })).toHaveClass('active');
    expect(screen.getByRole('link', { name: 'Dashboard' })).not.toHaveClass('active');
  });

  // -------------------------------------------------------------------------
  // Reactive updates via subscribe
  // -------------------------------------------------------------------------

  it('subscribes to registry changes on mount', () => {
    renderNav();
    expect(subscribe).toHaveBeenCalledOnce();
  });

  it('re-renders with new items when the registry notifies', () => {
    renderNav();
    expect(screen.queryByRole('link')).not.toBeInTheDocument();

    vi.mocked(getNavItems).mockReturnValue([{ path: '/dashboard', label: 'Dashboard', order: 1 }]);
    act(() => {
      capturedListener?.();
    });

    expect(screen.getByRole('link', { name: 'Dashboard' })).toBeInTheDocument();
  });

  it('reflects multiple successive registry updates', () => {
    renderNav();

    vi.mocked(getNavItems).mockReturnValue([{ path: '/dashboard', label: 'Dashboard', order: 1 }]);
    act(() => {
      capturedListener?.();
    });

    vi.mocked(getNavItems).mockReturnValue([
      { path: '/dashboard', label: 'Dashboard', order: 1 },
      { path: '/profile', label: 'Profile', order: 2 },
    ]);
    act(() => {
      capturedListener?.();
    });

    expect(screen.getAllByRole('link')).toHaveLength(2);
  });

  // -------------------------------------------------------------------------
  // Cleanup
  // -------------------------------------------------------------------------

  it('calls the unsubscribe function on unmount', () => {
    const { unmount } = renderNav();
    unmount();
    expect(unsubscribeMock).toHaveBeenCalledOnce();
  });

  it('does not call unsubscribe before unmount', () => {
    renderNav();
    expect(unsubscribeMock).not.toHaveBeenCalled();
  });
});
