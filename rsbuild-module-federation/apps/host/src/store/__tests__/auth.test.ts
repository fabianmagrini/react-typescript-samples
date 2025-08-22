import { describe, it, expect, beforeEach } from 'vitest';
import { useAuthStore } from '../auth';
import { mockUser } from '@/test/test-utils';

describe('Auth Store', () => {
  beforeEach(() => {
    // Reset store state before each test
    useAuthStore.setState({
      user: null,
      isAuthenticated: false,
      token: null,
    });
  });

  it('should have initial state', () => {
    const { user, isAuthenticated, token } = useAuthStore.getState();
    
    expect(user).toBeNull();
    expect(isAuthenticated).toBe(false);
    expect(token).toBeNull();
  });

  it('should login user successfully', () => {
    const { login } = useAuthStore.getState();
    const testToken = 'test-token-123';
    
    login(mockUser, testToken);
    
    const { user, isAuthenticated, token } = useAuthStore.getState();
    expect(user).toEqual(mockUser);
    expect(isAuthenticated).toBe(true);
    expect(token).toBe(testToken);
  });

  it('should logout user successfully', () => {
    const { login, logout } = useAuthStore.getState();
    
    // First login
    login(mockUser, 'test-token');
    expect(useAuthStore.getState().isAuthenticated).toBe(true);
    
    // Then logout
    logout();
    
    const { user, isAuthenticated, token } = useAuthStore.getState();
    expect(user).toBeNull();
    expect(isAuthenticated).toBe(false);
    expect(token).toBeNull();
  });

  it('should update user information', () => {
    const { login, updateUser } = useAuthStore.getState();
    
    // First login
    login(mockUser, 'test-token');
    
    // Update user
    const updates = { name: 'Updated Name', email: 'updated@example.com' };
    updateUser(updates);
    
    const { user } = useAuthStore.getState();
    expect(user?.name).toBe('Updated Name');
    expect(user?.email).toBe('updated@example.com');
    expect(user?.id).toBe(mockUser.id); // Should preserve other fields
  });

  it('should not update user if no user is logged in', () => {
    const { updateUser } = useAuthStore.getState();
    
    // Try to update without being logged in
    updateUser({ name: 'Should Not Update' });
    
    const { user } = useAuthStore.getState();
    expect(user).toBeNull();
  });
});