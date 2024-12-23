import { useEffect } from 'react'
import { auth } from '@/lib/firebase'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile } from 'firebase/auth'
import { useAuthStore } from '@/store/authStore'

export function useAuth() {
  const { user, setUser, setUserName, logout } = useAuthStore()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser)
        setUserName(firebaseUser.displayName)
      } else {
        setUser(null)
        setUserName(null)
      }
    })
    return unsubscribe
  }, [setUser, setUserName])

  const signIn = async (email: string, password: string) => {
    const result = await signInWithEmailAndPassword(auth, email, password)
    setUser(result.user)
    setUserName(result.user.displayName)
  }

  const signUp = async (email: string, password: string, name: string) => {
    const result = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(result.user, { displayName: name })
    setUser(result.user)
    setUserName(name)
  }

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth, provider)
    setUser(result.user)
    setUserName(result.user.displayName)
  }

  return { user, signIn, signUp, signOut: logout, signInWithGoogle }
}

