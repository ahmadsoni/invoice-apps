import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, getDoc } from 'firebase/firestore';
import { Product } from '@/types/product';
import { toast } from 'react-toastify';

const PRODUCT_COLLECTION = 'products';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const snapshot = await getDocs(collection(db, PRODUCT_COLLECTION));
      const productsList: Product[] = snapshot.docs.map((doc) => {
        const { id: _id, ...data } = doc.data() as Product;
        return {
          id: doc.id,
          ...data,
        };
      });
      setProducts(productsList);
    } catch (err) {
      setError('Failed to fetch products.');
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (newProduct: Product) => {
    try {
      const docRef = await addDoc(collection(db, PRODUCT_COLLECTION), newProduct);
      setProducts((prev) => [...prev, { ...newProduct, id: docRef.id }]);
      toast.success('Product successfully added!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (err) {
      setError('Failed to add product.');
      toast.error('Failed to add product.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const updateProduct = async (id: string, updatedFields: Partial<Product>) => {
    try {
      const productRef = doc(db, PRODUCT_COLLECTION, id);
      await updateDoc(productRef, updatedFields);
      setProducts((prev) =>
        prev.map((product) => (product.id === id ? { ...product, ...updatedFields } : product))
      );
      toast.success('Product successfully updated!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (err) {
      setError('Failed to update product.');
      toast.error('Failed to update product.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      const productRef = doc(db, PRODUCT_COLLECTION, id);
      await deleteDoc(productRef);
      setProducts((prev) => prev.filter((product) => product.id !== id));
      toast.success('Product successfully deleted!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (err) {
      setError('Failed to delete product.');
      toast.error('Failed to delete product.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const getProductById = async (id: string): Promise<Product | null> => {
    try {
      const productRef = doc(db, PRODUCT_COLLECTION, id);
      const productSnap = await getDoc(productRef);
      if (productSnap.exists()) {
        const { id: _id, ...data } = productSnap.data() as Product;
        return { id: productSnap.id, ...data };
      }
      return null;
    } catch (err) {
      setError('Failed to fetch product.');
      toast.error('Failed to fetch product.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return null;
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error,
    fetchProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductById,
  };
}
