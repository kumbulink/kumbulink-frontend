import { create } from 'zustand'
import { devtools, persist, createJSONStorage } from 'zustand/middleware'

interface User {
  id: number
  email: string
  nicename: string
  displayName: string
  documentId: string
  documentType: string
}

interface UserStore {
  user: User | null
  setUser: (user: User) => void
  logout: () => void
}

export const useUserStore = create<UserStore>()(
  devtools(
    persist(
      set => ({
        user: null,
        setUser: user => set({ user }),
        logout: () => {
          set({ user: null })
          window.location.href = '/'
        }
      }),
      {
        name: 'user-storage',
        storage: createJSONStorage(() => localStorage),
        partialize: state => ({ user: state.user })
      }
    )
  )
)
