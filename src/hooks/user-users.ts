import { useState, useEffect, useCallback } from "react";
import { collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { IUser } from "@/types/users";

export function useUsers() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const usersCollection = collection(db, "users");
      const snapshot = await getDocs(usersCollection);
      const usersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as IUser[];
      setUsers(usersData);
    } catch (err: any) {
      setError(err.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  }, []);

  const addUser = useCallback(async (user: Omit<IUser, "id">) => {
    setLoading(true);
    setError(null);
    try {
      const existingUser = users.find(u => u.email === user.email);
      if (existingUser) {
        throw new Error("User already exists");
      }

      const usersCollection = collection(db, "users");
      const docRef = await addDoc(usersCollection, user);
      setUsers(prev => [
        ...prev,
        { id: docRef.id, ...user } as IUser,
      ]);
    } catch (err: any) {
      setError(err.message || "Failed to add user");
    } finally {
      setLoading(false);
    }
  }, [users]);

  const updateUser = useCallback(async (id: string, updatedData: Partial<IUser>) => {
    setLoading(true);
    setError(null);
    try {
      const userDoc = doc(db, "users", id);
      await updateDoc(userDoc, updatedData);
      setUsers(prev => prev.map(user => (user.id === id ? { ...user, ...updatedData } : user)));
    } catch (err: any) {
      setError(err.message || "Failed to update user");
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteUser = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const userDoc = doc(db, "users", id);
      await deleteDoc(userDoc);
      setUsers(prev => prev.filter(user => user.id !== id));
    } catch (err: any) {
      setError(err.message || "Failed to delete user");
    } finally {
      setLoading(false);
    }
  }, []);

  const getUserById = useCallback(async (id: string): Promise<IUser | null> => {
    setLoading(true);
    setError(null);
    try {
      const userDoc = doc(db, "users", id);
      const snapshot = await getDoc(userDoc);
      if (snapshot.exists()) {
        return { id: snapshot.id, ...snapshot.data() } as IUser;
      } else {
        return null;
      }
    } catch (err: any) {
      setError(err.message || "Failed to fetch user");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return {
    users,
    loading,
    error,
    fetchUsers,
    addUser,
    updateUser,
    deleteUser,
    getUserById,
  };
}
