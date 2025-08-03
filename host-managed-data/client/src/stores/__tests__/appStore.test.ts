import { renderHook, act } from '@testing-library/react'
import { useAppStore } from '../appStore'

test('initial state', () => {
  const { result } = renderHook(() => useAppStore())
  
  expect(result.current.selectedUserId).toBeNull()
  expect(result.current.selectedPostId).toBeNull()
  expect(result.current.theme).toBe('light')
})

test('setSelectedUserId updates user and clears post when user changes', () => {
  const { result } = renderHook(() => useAppStore())
  
  act(() => {
    result.current.setSelectedUserId(1)
  })
  
  expect(result.current.selectedUserId).toBe(1)
  expect(result.current.selectedPostId).toBeNull()
  
  // Set a post
  act(() => {
    result.current.setSelectedPostId(5)
  })
  
  expect(result.current.selectedPostId).toBe(5)
  
  // Change user should clear post
  act(() => {
    result.current.setSelectedUserId(2)
  })
  
  expect(result.current.selectedUserId).toBe(2)
  expect(result.current.selectedPostId).toBeNull()
})

test('setSelectedUserId keeps post when same user selected', () => {
  const { result } = renderHook(() => useAppStore())
  
  act(() => {
    result.current.setSelectedUserId(1)
    result.current.setSelectedPostId(5)
  })
  
  expect(result.current.selectedUserId).toBe(1)
  expect(result.current.selectedPostId).toBe(5)
  
  // Select same user should keep post
  act(() => {
    result.current.setSelectedUserId(1)
  })
  
  expect(result.current.selectedUserId).toBe(1)
  expect(result.current.selectedPostId).toBe(5)
})

test('setSelectedPostId updates post', () => {
  const { result } = renderHook(() => useAppStore())
  
  act(() => {
    result.current.setSelectedPostId(10)
  })
  
  expect(result.current.selectedPostId).toBe(10)
})

test('toggleTheme switches between light and dark', () => {
  const { result } = renderHook(() => useAppStore())
  
  expect(result.current.theme).toBe('light')
  
  act(() => {
    result.current.toggleTheme()
  })
  
  expect(result.current.theme).toBe('dark')
  
  act(() => {
    result.current.toggleTheme()
  })
  
  expect(result.current.theme).toBe('light')
})

test('reset clears all state', () => {
  const { result } = renderHook(() => useAppStore())
  
  act(() => {
    result.current.setSelectedUserId(1)
    result.current.setSelectedPostId(5)
    result.current.toggleTheme()
  })
  
  expect(result.current.selectedUserId).toBe(1)
  expect(result.current.selectedPostId).toBe(5)
  expect(result.current.theme).toBe('dark')
  
  act(() => {
    result.current.reset()
  })
  
  expect(result.current.selectedUserId).toBeNull()
  expect(result.current.selectedPostId).toBeNull()
  expect(result.current.theme).toBe('light')
})