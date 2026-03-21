import { beforeEach, describe, expect, it, vi } from 'vitest';

// Factory must not reference outer variables — use vi.mocked() in tests.
vi.mock('@mfe-demo/nav-registry', () => ({
  registerNavItem: vi.fn(),
}));

import { registerNavItem } from '@mfe-demo/nav-registry';
import { registerRoutes } from '../register';

describe('mfe-dashboard register', () => {
  beforeEach(() => {
    vi.mocked(registerNavItem).mockClear();
  });

  it('calls registerNavItem exactly once', () => {
    registerRoutes();
    expect(vi.mocked(registerNavItem)).toHaveBeenCalledOnce();
  });

  it('registers with path /dashboard', () => {
    registerRoutes();
    expect(vi.mocked(registerNavItem)).toHaveBeenCalledWith(
      expect.objectContaining({ path: '/dashboard' }),
    );
  });

  it('registers with label Dashboard', () => {
    registerRoutes();
    expect(vi.mocked(registerNavItem)).toHaveBeenCalledWith(
      expect.objectContaining({ label: 'Dashboard' }),
    );
  });

  it('registers with order 1', () => {
    registerRoutes();
    expect(vi.mocked(registerNavItem)).toHaveBeenCalledWith(
      expect.objectContaining({ order: 1 }),
    );
  });

  it('registers the complete nav item', () => {
    registerRoutes();
    expect(vi.mocked(registerNavItem)).toHaveBeenCalledWith({
      path: '/dashboard',
      label: 'Dashboard',
      order: 1,
    });
  });
});
