import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@mfe-demo/nav-registry', () => ({
  registerNavItem: vi.fn(),
}));

import { registerNavItem } from '@mfe-demo/nav-registry';
import { registerRoutes } from '../register';

describe('mfe-profile register', () => {
  beforeEach(() => {
    vi.mocked(registerNavItem).mockClear();
  });

  it('calls registerNavItem exactly once', () => {
    registerRoutes();
    expect(vi.mocked(registerNavItem)).toHaveBeenCalledOnce();
  });

  it('registers with path /profile', () => {
    registerRoutes();
    expect(vi.mocked(registerNavItem)).toHaveBeenCalledWith(
      expect.objectContaining({ path: '/profile' }),
    );
  });

  it('registers with label Profile', () => {
    registerRoutes();
    expect(vi.mocked(registerNavItem)).toHaveBeenCalledWith(
      expect.objectContaining({ label: 'Profile' }),
    );
  });

  it('registers with order 2 (after Dashboard which is order 1)', () => {
    registerRoutes();
    expect(vi.mocked(registerNavItem)).toHaveBeenCalledWith(expect.objectContaining({ order: 2 }));
  });

  it('registers the complete nav item', () => {
    registerRoutes();
    expect(vi.mocked(registerNavItem)).toHaveBeenCalledWith({
      path: '/profile',
      label: 'Profile',
      order: 2,
    });
  });
});
