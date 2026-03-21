# @mfe-demo/nav-registry

Shared singleton navigation registry used across all microfrontends. Implements a minimal pub/sub pattern so that MFEs can register their nav items and the shell's `<Navigation>` component re-renders reactively.

## How It Works

All apps declare this package as `singleton: true` in their Module Federation `shared` config. At runtime, only **one instance** of the registry exists in memory — the one loaded by the shell (which also sets `eager: true`). When MFEs import from `@mfe-demo/nav-registry`, they receive a reference to that same instance.

This means `registerNavItem` called inside `mfe-dashboard` modifies the same array that `getNavItems` reads inside the shell's `<Navigation>`.

## API

### `registerNavItem(item: NavItem): void`

Registers a navigation item. Safe to call multiple times for the same path — it deduplicates by `path`. After registration, items are sorted by `order` and all subscribers are notified.

```ts
registerNavItem({ path: '/dashboard', label: 'Dashboard', order: 1 });
```

### `getNavItems(): NavItem[]`

Returns a shallow copy of all registered navigation items, sorted by `order`.

```ts
const items = getNavItems();
// [{ path: '/dashboard', label: 'Dashboard', order: 1 }, ...]
```

### `subscribe(listener: () => void): () => void`

Subscribes to changes in the nav item list. Returns an unsubscribe function. Call the unsubscribe function on component unmount to prevent memory leaks.

```ts
const unsubscribe = subscribe(() => {
  setItems(getNavItems());
});

// later, on cleanup:
unsubscribe();
```

## Types

```ts
type NavItem = {
  path: string;   // Route path, e.g. '/dashboard'
  label: string;  // Display label in the nav bar
  order: number;  // Sort order (lower = further left)
};
```

## Usage in a MFE register module

```ts
// mfe-*/src/register.ts
import { registerNavItem } from '@mfe-demo/nav-registry';

export function registerRoutes(): void {
  registerNavItem({ path: '/my-page', label: 'My Page', order: 3 });
}
```

## Usage in the shell Navigation component

```tsx
// shell/src/Navigation.tsx
import { useState, useEffect } from 'react';
import { getNavItems, subscribe, type NavItem } from '@mfe-demo/nav-registry';

export default function Navigation() {
  const [items, setItems] = useState<NavItem[]>(getNavItems);

  useEffect(() => {
    return subscribe(() => setItems(getNavItems()));
  }, []);

  return (/* ... */);
}
```

## Module Federation config

### Shell (host) — eager: true

```ts
shared: {
  '@mfe-demo/nav-registry': { singleton: true, eager: true },
}
```

`eager: true` bundles the registry into the shell's initial chunk, making it available synchronously before any remote is contacted.

### MFE remotes — no eager

```ts
shared: {
  '@mfe-demo/nav-registry': { singleton: true },
}
```

MFEs defer to the shell's instance. They do not need `eager: true` because the shell has already loaded it.
