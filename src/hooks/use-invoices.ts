import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, getDoc, query, where } from 'firebase/firestore';
import { InvoiceData } from '@/types/invoice';
import { toast } from 'react-toastify';

const INVOICE_COLLECTION = 'invoices';

export function useInvoices() {
  const [invoices, setInvoices] = useState<InvoiceData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchInvoices = async () => {
    setLoading(true);
    setError(null);
    try {
      const snapshot = await getDocs(collection(db, INVOICE_COLLECTION));
      const invoicesList: InvoiceData[] = snapshot.docs.map((doc) => {
        const { id: _id, ...data } = doc.data() as InvoiceData;
        return {
          id: doc.id,
          ...data,
        };
      });
      setInvoices(invoicesList);
    } catch (err) {
      setError('Failed to fetch invoices.');
    } finally {
      setLoading(false);
    }
  };

  const addInvoice = async (newInvoice: InvoiceData) => {
    try {
      const docRef = await addDoc(collection(db, INVOICE_COLLECTION), newInvoice);
      setInvoices((prev) => [...prev, { ...newInvoice, id: docRef.id }]);
      toast.success('Invoice successfully added!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (err) {
      setError('Failed to add invoice.');
      toast.error('Failed to add invoice.', {
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

  const updateInvoice = async (id: string, updatedFields: Partial<InvoiceData>) => {
    try {
      const invoiceRef = doc(db, INVOICE_COLLECTION, id);
      await updateDoc(invoiceRef, updatedFields);
      setInvoices((prev) =>
        prev.map((invoice) => (invoice.id === id ? { ...invoice, ...updatedFields } : invoice))
      );
      toast.success('Invoice successfully updated!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (err) {
      setError('Failed to update invoice.');
      toast.error('Failed to update invoice.', {
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

  const deleteInvoice = async (id: string) => {
    try {
      const invoiceRef = doc(db, INVOICE_COLLECTION, id);
      await deleteDoc(invoiceRef);
      setInvoices((prev) => prev.filter((invoice) => invoice.id !== id));
      toast.success('Invoice successfully deleted!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (err) {
      setError('Failed to delete invoice.');
      toast.error('Failed to delete invoice.', {
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

  const getInvoiceById = async (id: string): Promise<InvoiceData | null> => {
    try {
      const invoiceRef = doc(db, INVOICE_COLLECTION, id);
      const invoiceSnap = await getDoc(invoiceRef);
      if (invoiceSnap.exists()) {
        const { id: _id, ...data } = invoiceSnap.data() as InvoiceData;
        return { id: invoiceSnap.id, ...data };
      }
      return null;
    } catch (err) {
      setError('Failed to fetch invoice.');
      toast.error('Failed to fetch invoice.', {
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

  const getInvoiceByUserId = async (userId: string): Promise<InvoiceData[]> => {
    setLoading(true);
    setError(null);
    try {
      const invoiceQuery = query(collection(db, INVOICE_COLLECTION), where('user.id', '==', userId));
      const snapshot = await getDocs(invoiceQuery);
      const invoicesList: InvoiceData[] = snapshot.docs.map((doc) => {
        const { id: _id, ...data } = doc.data() as InvoiceData;
        return {
          id: doc.id,
          ...data,
        };
      });
      return invoicesList;
    } catch (err) {
      setError('Failed to fetch invoices by user.');
      toast.error('Failed to fetch invoices by user.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return [];
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  return {
    invoices,
    loading,
    error,
    fetchInvoices,
    addInvoice,
    updateInvoice,
    deleteInvoice,
    getInvoiceById,
    getInvoiceByUserId,
  };
}
