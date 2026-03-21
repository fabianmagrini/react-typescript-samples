import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';

// ---------------------------------------------------------------------------
// nav-registry mock — Navigation needs a populated registry to render links.
// Factory must not reference outer variables.
// ---------------------------------------------------------------------------
vi.mock('@mfe-demo/nav-registry', () => ({
  getNavItems: vi.fn(() => [
    { path: '/dashboard', label: 'Dashboard', order: 1 },
    { path: '/profile', label: 'Profile', order: 2 },
  ]),
  subscribe: vi.fn(() => vi.fn()),
}));

// mfe_dashboard/* and mfe_profile/* are aliased in vitest.config.ts to stub
// components in src/__mocks__/. No vi.mock() needed here — the stubs already
// have data-testid attributes for assertions.

import App from '../App';

describe('App', () => {
  beforeEach(() => {
    window.history.pushState({}, '', '/');
  });

  // -------------------------------------------------------------------------
  // Navigation presence
  // -------------------------------------------------------------------------

  it('renders the Navigation brand synchronously', () => {
    render(<App />);
    // Brand must be present immediately — it is outside the Suspense boundary
    expect(screen.getByText('MFE Demo')).toBeInTheDocument();
  });

  it('renders nav links', () => {
    render(<App />);
    expect(screen.getByRole('link', { name: 'Dashboard' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Profile' })).toBeInTheDocument();
  });

  // -------------------------------------------------------------------------
  // Routing
  // -------------------------------------------------------------------------

  it('redirects / to /dashboard', async () => {
    window.history.pushState({}, '', '/');
    render(<App />);
    await waitFor(() => {
      expect(window.location.pathname).toBe('/dashboard');
    });
  });

  it('renders the Dashboard component at /dashboard', async () => {
    window.history.pushState({}, '', '/dashboard');
    render(<App />);
    await waitFor(() => {
      expect(screen.getByTestId('mock-dashboard')).toBeInTheDocument();
    });
  });

  it('renders the Profile component at /profile', async () => {
    window.history.pushState({}, '', '/profile');
    render(<App />);
    await waitFor(() => {
      expect(screen.getByTestId('mock-profile')).toBeInTheDocument();
    });
  });

  it('Navigation is present while remote content is loading', async () => {
    window.history.pushState({}, '', '/dashboard');
    render(<App />);
    // Navigation brand is present immediately, before any async chunk resolves
    expect(screen.getByText('MFE Demo')).toBeInTheDocument();
    // Remote content eventually appears
    await waitFor(() => {
      expect(screen.getByTestId('mock-dashboard')).toBeInTheDocument();
    });
  });
});
