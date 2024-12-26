import { InvoiceData } from '@/types/invoice';
import { dummyInvoices } from '@/data/invoices';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const addInvoicesToFirestore = async (invoices: InvoiceData[]) => {
  try {
    for (const invoice of invoices) {
      const docRef = await addDoc(collection(db, 'invoices'), invoice);
      console.log("Invoice document written with ID: ", docRef.id);
    }
    console.log("All invoices have been successfully uploaded to Firestore.");
  } catch (e) {
    console.error("Error adding invoice: ", e);
  }
};

addInvoicesToFirestore(dummyInvoices);
