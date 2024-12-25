import { InvoiceData } from '@/types/invoice';
import create from 'zustand';

interface InvoiceState {
  invoiceData: InvoiceData;
  setInvoiceData: (newData: Partial<InvoiceData>) => void;
  getInvoiceData: () => InvoiceData;
}

const formatDate = (date: Date): string => date.toISOString().split("T")[0];

const useInvoiceStore = create<InvoiceState>((set, get) => ({
  invoiceData: {
    id: '1',
    company: {
      name: "Spencer's Indonesia (Kemitraan)",
      address: 'UMC Land Building, Surabaya Jawa Timur, Indonesia. (123455)',
      phone: '+628212345678',
    },
    invoice: {
      number: "0002",
      date: formatDate(new Date()),
      dueDate: formatDate(new Date(new Date().setDate(new Date().getDate() + 1))),
      terms: "Net 30",
    },
    billing: {
      billTo: "Customer",
      billToAddress: "123 Street Name, City",
      paymentNotes: "Payment due within 30 days",
    },
    cart: [], 
    payment: {
      paymentLinkActive: false,
      bankAccount: "123-456-789",
      transactionFee: 10000,
      grandTotal: 0,
      taxableAmount: 0,
      vat: 0,
      totalValueVat: 0,
      netPayment: 0,
      totalAmount: 0,
    },
  },
  setInvoiceData: (newData) => set((state) => ({
    invoiceData: { ...state.invoiceData, ...newData },
  })),
  getInvoiceData: () => get().invoiceData,
}));

export default useInvoiceStore;