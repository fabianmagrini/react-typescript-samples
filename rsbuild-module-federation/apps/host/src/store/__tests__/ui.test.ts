import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useUIStore } from '../ui';

describe('UI Store', () => {
  beforeEach(() => {
    // Reset store state before each test
    useUIStore.setState({
      sidebarOpen: true,
      theme: 'light',
      notifications: [],
    });
    
    // Clear all timers
    vi.clearAllTimers();
    vi.useFakeTimers();
  });

  it('should have initial state', () => {
    const { sidebarOpen, theme, notifications } = useUIStore.getState();
    
    expect(sidebarOpen).toBe(true);
    expect(theme).toBe('light');
    expect(notifications).toEqual([]);
  });

  it('should toggle sidebar', () => {
    const { toggleSidebar } = useUIStore.getState();
    
    expect(useUIStore.getState().sidebarOpen).toBe(true);
    
    toggleSidebar();
    expect(useUIStore.getState().sidebarOpen).toBe(false);
    
    toggleSidebar();
    expect(useUIStore.getState().sidebarOpen).toBe(true);
  });

  it('should set sidebar open state', () => {
    const { setSidebarOpen } = useUIStore.getState();
    
    setSidebarOpen(false);
    expect(useUIStore.getState().sidebarOpen).toBe(false);
    
    setSidebarOpen(true);
    expect(useUIStore.getState().sidebarOpen).toBe(true);
  });

  it('should set theme', () => {
    const { setTheme } = useUIStore.getState();
    
    setTheme('dark');
    expect(useUIStore.getState().theme).toBe('dark');
    
    setTheme('light');
    expect(useUIStore.getState().theme).toBe('light');
  });

  it('should add notification', () => {
    const { addNotification } = useUIStore.getState();
    
    const notification = {
      type: 'success' as const,
      message: 'Test notification',
    };
    
    addNotification(notification);
    
    const { notifications } = useUIStore.getState();
    expect(notifications).toHaveLength(1);
    expect(notifications[0]).toMatchObject(notification);
    expect(notifications[0]).toHaveProperty('id');
    expect(notifications[0]).toHaveProperty('timestamp');
  });

  it('should remove notification', () => {
    const { addNotification, removeNotification } = useUIStore.getState();
    
    // Add notification
    addNotification({ type: 'info', message: 'Test' });
    
    const { notifications } = useUIStore.getState();
    const notificationId = notifications[0].id;
    
    // Remove notification
    removeNotification(notificationId);
    
    expect(useUIStore.getState().notifications).toHaveLength(0);
  });

  it('should clear all notifications', () => {
    const { addNotification, clearNotifications } = useUIStore.getState();
    
    // Add multiple notifications
    addNotification({ type: 'success', message: 'Test 1' });
    addNotification({ type: 'error', message: 'Test 2' });
    
    expect(useUIStore.getState().notifications).toHaveLength(2);
    
    // Clear all
    clearNotifications();
    
    expect(useUIStore.getState().notifications).toHaveLength(0);
  });

  it('should auto-remove notification after 5 seconds', () => {
    const { addNotification } = useUIStore.getState();
    
    addNotification({ type: 'success', message: 'Auto-remove test' });
    
    expect(useUIStore.getState().notifications).toHaveLength(1);
    
    // Fast forward time by 5 seconds
    vi.advanceTimersByTime(5000);
    
    expect(useUIStore.getState().notifications).toHaveLength(0);
  });
});