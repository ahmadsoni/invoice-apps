import { create } from 'zustand';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string[];
}

export interface InvoiceTemplate {
  id: string;
  name: string;
  isDefault: boolean;
  header: {
    companyName: string;
    address: string;
    phone: string;
  };
  footer: {
    paymentNotes: string;
    bankAccount: string;
    terms: string;
  };
}

export interface InvoiceDocument {
  id: string;
  name: string;
  date: string;
  dueDate: string;
  invoiceNumber: string;
  billTo: string;
  billToAddress: string;
  items: Array<{
    product: Product;
    quantity: number;
    total: number;
  }>;
  subtotal: number;
  tax: number;
  total: number;
}

interface InvoiceStore {
  products: Product[];
  templates: InvoiceTemplate[];
  documents: InvoiceDocument[];
  getDefaultTemplate: () => InvoiceTemplate | undefined;
  addDocument: (document: InvoiceDocument) => void;
}

export const useInvoiceStore = create<InvoiceStore>((set, get) => ({
  products: [
    {
      id: '1',
      name: 'Almond Milk',
      price: 65000,
      image: 'https://images.unsplash.com/photo-1600788886242-5c96aabe3757',
      description: 'Fresh Almond Milk with no Sugar',
      category: ['Minuman'],
    },
    {
      id: '2',
      name: 'Chia Jam',
      price: 68000,
      image: 'https://images.unsplash.com/photo-1590503803905-25d0a3704b12',
      description: 'Delicious Taste',
      category: ['Makanan', 'Selai'],
    },
    {
      id: '3',
      name: 'Signature Christmas Wishes',
      price: 598000,
      image: 'https://images.unsplash.com/photo-1607344645866-009c320b63e0',
      description: 'Special Gift Set',
      category: ['Makanan', 'Paket'],
    },
    {
      id: '4',
      name: 'Christmas Joy Hampers',
      price: 598000,
      image: 'https://images.unsplash.com/photo-1607344645866-009c320b63e0',
      description: 'Holiday Gift Set',
      category: ['Makanan', 'Paket'],
    },
    {
      id: '5',
      name: 'All Varian Healthy DESSERT CUP',
      price: 360000,
      image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814',
      description: 'Healthy Dessert Variety Pack',
      category: ['Makanan', 'Dessert'],
    },
  ],
  templates: [
    {
      id: '1',
      name: 'Default Template',
      isDefault: true,
      header: {
        companyName: "Spencer's Indonesia (Kemitraan)",
        address: 'UMC Land Building, Surabaya Jawa Timur, Indonesia. (123455)',
        phone: '+628212345678',
      },
      footer: {
        paymentNotes: 'Notes as "Payment Address"',
        bankAccount: 'Add Notes "Bank XYZ, Account: 1234"',
        terms: 'Terms & Conditions',
      },
    },
  ],
  documents: [],
  getDefaultTemplate: () => {
    return get().templates.find((template) => template.isDefault);
  },
  addDocument: (document) => {
    set((state) => ({
      documents: [...state.documents, document],
    }));
  },
}));