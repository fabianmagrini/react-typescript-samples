import { registerNavItem } from '@mfe-demo/nav-registry';

export function registerRoutes(): void {
  registerNavItem({ path: '/profile', label: 'Profile', order: 2 });
}
