import { create } from 'zustand'
import { devtools, persist, createJSONStorage } from 'zustand/middleware'

interface User {
  token: string
  email: string
  nicename: string
  displayName: string
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
          localStorage.removeItem('jwt_token')
          set({ user: null })
          window.location.href = '/Kumbulink/'
        }
      }),
      {
        name: 'user-storage',
        storage: createJSONStorage(() => localStorage)
      }
    )
  )
)
