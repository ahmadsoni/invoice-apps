import { Product } from '@/types/product';
import { products } from '@/data/products';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const addProductsToFirestore = async (products: Product[]) => {
  try {
    for (const product of products) {
      const docRef = await addDoc(collection(db, 'products'), product);
      console.log("Product document written with ID: ", docRef.id);
    }
    console.log("All products have been successfully uploaded to Firestore.");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

addProductsToFirestore(products);
