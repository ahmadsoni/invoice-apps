import { useEffect } from 'react';
import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile, User } from 'firebase/auth';
import { useAuthStore } from '@/store/authStore';
import { useUsers } from '@/hooks/user-users';
import { IUser } from "@/types/users";

export function useAuth() {
  const { user, setUser, setUserName, logout } = useAuthStore();
  const { addUser, users } = useUsers();  

  const mapUserToIUser = (firebaseUser: User): IUser => ({
    id: firebaseUser.uid,
    name: firebaseUser.displayName || '',
    email: firebaseUser.email || '',
    phone: '',
    address: '',
    createdAt: new Date().toISOString(),
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        setUserName(firebaseUser.displayName);
      } else {
        setUser(null);
        setUserName(null);
      }
    });
    return unsubscribe;
  }, [setUser, setUserName]);

  const signIn = async (email: string, password: string) => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    setUser(result.user);
    setUserName(result.user.displayName);
  };

  const signUp = async (email: string, password: string, name: string) => {
    const existingUser = users.find(user => user.email === email);
    if (!existingUser) {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(result.user, { displayName: name });
      setUser(result.user);
      setUserName(name);
      const userToAdd = mapUserToIUser(result.user); 
      await addUser(userToAdd);
    } else {
      try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        setUser(result.user);
        setUserName(result.user.displayName);
      } catch (error) {
        throw new Error('User exists but credentials are invalid');
      }
    }
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const firebaseUser = result.user;
    const existingUser = users.find(user => user.email === firebaseUser.email);

    if (existingUser) {
      setUser(result.user);
      setUserName(existingUser.name);
    } else {
      const userToAdd = mapUserToIUser(firebaseUser);
      await addUser(userToAdd);
      setUser(firebaseUser);
      setUserName(firebaseUser.displayName || ''); 
    }
  };

  return { user, signIn, signUp, signOut: logout, signInWithGoogle };
}