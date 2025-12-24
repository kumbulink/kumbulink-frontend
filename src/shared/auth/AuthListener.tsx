import { useEffect } from 'react'
import { useUserStore } from '@/shared/model'

export default function AuthListener() {
  useEffect(() => {
    const handler = () => {
      useUserStore.getState().logoutLocal()
    }

    window.addEventListener('auth:logout', handler)

    return () => {
      window.removeEventListener('auth:logout', handler)
    }
  }, [])

  return null
}
