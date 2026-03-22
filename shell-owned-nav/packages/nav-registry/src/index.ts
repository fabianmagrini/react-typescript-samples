export type NavItem = {
  path: string;
  label: string;
  order: number;
};

const items: NavItem[] = [];
let listeners: Array<() => void> = [];

export function registerNavItem(item: NavItem): void {
  if (!items.find((i) => i.path === item.path)) {
    items.push(item);
    items.sort((a, b) => a.order - b.order);
    for (const l of listeners) l();
  }
}

export function getNavItems(): NavItem[] {
  return [...items];
}

export function subscribe(listener: () => void): () => void {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}
