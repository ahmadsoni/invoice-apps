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

const EXPIRATION_TIME = 1000 * 60 * 60 * 24;

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
          if (item) {
            const parsedItem = JSON.parse(item);
            const now = Date.now();
            if (parsedItem.timestamp && now - parsedItem.timestamp > EXPIRATION_TIME) {
              localStorage.removeItem(key);
              return null;
            }
            return JSON.stringify(parsedItem.data);
          }
          return null;
        },
        setItem: (key, value) => {
          const dataToStore = {
            data: JSON.parse(value),
            timestamp: Date.now(),
          };
          localStorage.setItem(key, JSON.stringify(dataToStore));
        },
        removeItem: (key) => localStorage.removeItem(key),
      })),
      partialize: (state) => ({ userName: state.userName }),
    }
  )
);
