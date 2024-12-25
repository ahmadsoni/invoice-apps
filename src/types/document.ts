export interface Document {
  id: string;
  name: string;
  invoiceNumber: string;
  date: string;
  dueDate: string;
  total: number;
}

export interface InvoiceStore {
  documents: Document[];
  setDocuments: (documents: Document[]) => void;
  addDocument: (document: Document) => void;
  updateDocument: (id: string, updatedDocument: Partial<Document>) => void;
  deleteDocument: (id: string) => void;
}
