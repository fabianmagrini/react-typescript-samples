import { registerNavItem } from '@mfe-demo/nav-registry';

export function registerRoutes(): void {
  registerNavItem({ path: '/dashboard', label: 'Dashboard', order: 1 });
}
