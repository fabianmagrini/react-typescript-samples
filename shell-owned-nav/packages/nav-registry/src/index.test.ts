import { beforeEach, describe, expect, it, vi } from 'vitest';

// nav-registry has module-level mutable state. vi.resetModules() gives each
// test a fresh module instance with empty arrays — the cleanest isolation
// strategy without modifying production code.
type Registry = typeof import('./index');

describe('nav-registry', () => {
  let registry: Registry;

  beforeEach(async () => {
    vi.resetModules();
    registry = await import('./index');
  });

  // ---------------------------------------------------------------------------
  // registerNavItem
  // ---------------------------------------------------------------------------

  describe('registerNavItem', () => {
    it('adds an item so getNavItems returns it', () => {
      registry.registerNavItem({ path: '/foo', label: 'Foo', order: 1 });
      expect(registry.getNavItems()).toEqual([
        { path: '/foo', label: 'Foo', order: 1 },
      ]);
    });

    it('deduplicates: a second call with the same path is ignored', () => {
      registry.registerNavItem({ path: '/foo', label: 'Foo', order: 1 });
      registry.registerNavItem({ path: '/foo', label: 'Foo Updated', order: 99 });
      expect(registry.getNavItems()).toHaveLength(1);
      expect(registry.getNavItems()[0].label).toBe('Foo');
    });

    it('sorts items ascending by order', () => {
      registry.registerNavItem({ path: '/c', label: 'C', order: 3 });
      registry.registerNavItem({ path: '/a', label: 'A', order: 1 });
      registry.registerNavItem({ path: '/b', label: 'B', order: 2 });

      const items = registry.getNavItems();
      expect(items.map((i) => i.label)).toEqual(['A', 'B', 'C']);
    });

    it('supports items with the same order (stable relative to insertion)', () => {
      registry.registerNavItem({ path: '/x', label: 'X', order: 1 });
      registry.registerNavItem({ path: '/y', label: 'Y', order: 1 });
      // Both are registered — exact order is unspecified but both must exist
      expect(registry.getNavItems()).toHaveLength(2);
    });

    it('notifies subscribers when a new item is added', () => {
      const listener = vi.fn();
      registry.subscribe(listener);

      registry.registerNavItem({ path: '/foo', label: 'Foo', order: 1 });

      expect(listener).toHaveBeenCalledOnce();
    });

    it('notifies all active subscribers', () => {
      const a = vi.fn();
      const b = vi.fn();
      registry.subscribe(a);
      registry.subscribe(b);

      registry.registerNavItem({ path: '/foo', label: 'Foo', order: 1 });

      expect(a).toHaveBeenCalledOnce();
      expect(b).toHaveBeenCalledOnce();
    });

    it('does NOT notify subscribers for a duplicate registration', () => {
      const listener = vi.fn();
      registry.subscribe(listener);

      registry.registerNavItem({ path: '/foo', label: 'Foo', order: 1 });
      registry.registerNavItem({ path: '/foo', label: 'Foo', order: 1 }); // duplicate

      expect(listener).toHaveBeenCalledOnce(); // only once, not twice
    });
  });

  // ---------------------------------------------------------------------------
  // getNavItems
  // ---------------------------------------------------------------------------

  describe('getNavItems', () => {
    it('returns an empty array when nothing has been registered', () => {
      expect(registry.getNavItems()).toEqual([]);
    });

    it('returns all registered items', () => {
      registry.registerNavItem({ path: '/a', label: 'A', order: 1 });
      registry.registerNavItem({ path: '/b', label: 'B', order: 2 });

      expect(registry.getNavItems()).toHaveLength(2);
    });

    it('returns a shallow copy — mutating the result does not affect the registry', () => {
      registry.registerNavItem({ path: '/a', label: 'A', order: 1 });

      const result = registry.getNavItems();
      result.push({ path: '/injected', label: 'Injected', order: 99 });

      expect(registry.getNavItems()).toHaveLength(1);
    });
  });

  // ---------------------------------------------------------------------------
  // subscribe / unsubscribe
  // ---------------------------------------------------------------------------

  describe('subscribe', () => {
    it('returns an unsubscribe function', () => {
      const unsubscribe = registry.subscribe(vi.fn());
      expect(typeof unsubscribe).toBe('function');
    });

    it('listener is called each time a new item is registered', () => {
      const listener = vi.fn();
      registry.subscribe(listener);

      registry.registerNavItem({ path: '/a', label: 'A', order: 1 });
      registry.registerNavItem({ path: '/b', label: 'B', order: 2 });

      expect(listener).toHaveBeenCalledTimes(2);
    });

    it('unsubscribed listener is no longer called', () => {
      const listener = vi.fn();
      const unsubscribe = registry.subscribe(listener);

      registry.registerNavItem({ path: '/a', label: 'A', order: 1 });
      unsubscribe();
      registry.registerNavItem({ path: '/b', label: 'B', order: 2 });

      expect(listener).toHaveBeenCalledOnce(); // called once before unsubscribe
    });

    it('unsubscribing one listener does not affect other listeners', () => {
      const keep = vi.fn();
      const remove = vi.fn();

      const unsubscribe = registry.subscribe(remove);
      registry.subscribe(keep);

      unsubscribe();
      registry.registerNavItem({ path: '/a', label: 'A', order: 1 });

      expect(keep).toHaveBeenCalledOnce();
      expect(remove).not.toHaveBeenCalled();
    });

    it('calling unsubscribe multiple times is safe (idempotent)', () => {
      const listener = vi.fn();
      const unsubscribe = registry.subscribe(listener);

      unsubscribe();
      expect(() => unsubscribe()).not.toThrow();

      registry.registerNavItem({ path: '/a', label: 'A', order: 1 });
      expect(listener).not.toHaveBeenCalled();
    });

    it('multiple independent subscriptions can be active simultaneously', () => {
      const listeners = [vi.fn(), vi.fn(), vi.fn()];
      listeners.forEach((l) => registry.subscribe(l));

      registry.registerNavItem({ path: '/a', label: 'A', order: 1 });

      listeners.forEach((l) => expect(l).toHaveBeenCalledOnce());
    });
  });
});
