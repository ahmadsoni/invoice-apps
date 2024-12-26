import { IUser } from '@/types/users';
import { users } from '@/data/users';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const uploadUsersToFirestore = async (users: IUser[]) => {
  try {
    for (const customer of users) {
      const docRef = await addDoc(collection(db, 'users'), customer);
      console.log("Customer document written with ID: ", docRef.id);
    }
    console.log("All users have been successfully uploaded to Firestore.");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

uploadUsersToFirestore(users);
