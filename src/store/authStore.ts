import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { User } from 'firebase/auth';
import { auth } from '@/lib/firebase';

interface AuthState {
  user: User | null;
  userName: string | null;
  setUser: (user: User | null) => void;
  setUserName: (name: string | null) => void;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      userName: null,
      setUser: (user) => set({ user }),
      setUserName: (name) => set({ userName: name }),
      logout: async () => {
        await auth.signOut();
        set({ user: null, userName: null });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => ({
        getItem: (key) => {
          const item = localStorage.getItem(key);
          return item ? JSON.parse(item) : null;
        },
        setItem: (key, value) => {
          localStorage.setItem(key, value);
        },
        removeItem: (key) => {
          localStorage.removeItem(key);
        },
      })),
      partialize: (state) => ({ user: state.user, userName: state.userName }),
    }
  )
);
