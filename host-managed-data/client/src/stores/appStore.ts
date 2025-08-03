import { create } from 'zustand'

interface AppState {
  selectedUserId: number | null
  selectedPostId: number | null
  theme: 'light' | 'dark'
}

interface AppActions {
  setSelectedUserId: (userId: number | null) => void
  setSelectedPostId: (postId: number | null) => void
  toggleTheme: () => void
  reset: () => void
}

type AppStore = AppState & AppActions

const initialState: AppState = {
  selectedUserId: null,
  selectedPostId: null,
  theme: 'light',
}

export const useAppStore = create<AppStore>((set) => ({
  ...initialState,
  
  setSelectedUserId: (userId) =>
    set((state) => ({
      selectedUserId: userId,
      selectedPostId: userId !== state.selectedUserId ? null : state.selectedPostId,
    })),
  
  setSelectedPostId: (postId) =>
    set({ selectedPostId: postId }),
  
  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === 'light' ? 'dark' : 'light',
    })),
  
  reset: () => set(initialState),
}))