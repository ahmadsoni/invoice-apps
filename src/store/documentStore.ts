import { InvoiceStore } from '@/types/document';
import create from 'zustand';


export const useDocumentStore = create<InvoiceStore>((set) => ({
  documents: [],

  setDocuments: (documents) => set({ documents }),

  addDocument: (document) => set((state) => ({
    documents: [...state.documents, document],
  })),

  updateDocument: (id, updatedDocument) => set((state) => ({
    documents: state.documents.map((doc) =>
      doc.id === id ? { ...doc, ...updatedDocument } : doc
    ),
  })),

  deleteDocument: (id) => set((state) => ({
    documents: state.documents.filter((doc) => doc.id !== id),
  })),
}));
