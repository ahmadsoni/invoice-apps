import { useRef } from 'react'
import { useAuthStore } from '@/store/authStore'

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const initialized = useRef(false)
  if (!initialized.current) {
    useAuthStore.getState().setUser(null)
    initialized.current = true
  }
  return <>{children}</>
}
