import { InvoiceData } from '@/types/invoice';
import create from 'zustand';

interface InvoiceState {
  invoiceData: InvoiceData;
  setInvoiceData: (newData: Partial<InvoiceData>) => void;
  getInvoiceData: () => InvoiceData;
  updatePaymentDetails: (netPayment: number, totalVAT: number, totalValueVat: number) => void;
  resetInvoiceData: () => void; 
}

const formatDate = (date: Date): string => date.toISOString().split("T")[0];

const useInvoiceStore = create<InvoiceState>((set, get) => ({
  invoiceData: {
    id: '',
    user: {
      id: ''
    },
    company: {
      name: "Spencer's Indonesia (Kemitraan)",
      address: 'UMC Land Building, Surabaya Jawa Timur, Indonesia. (123455)',
      phone: '+628212345678',
    },
    invoice: {
      name: '',
      number: "",
      date: formatDate(new Date()),
      dueDate: formatDate(new Date(new Date().setDate(new Date().getDate() + 1))),
      terms: "",
    },
    billing: {
      billTo: "",
      billToAddress: "",
      paymentNotes: "",
    },
    cart: [], 
    payment: {
      paymentLinkActive: false,
      bankAccount: "",
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
  updatePaymentDetails: (netPayment: number, totalVAT: number, totalValueVat: number) => {
    const invoiceData = get().invoiceData;
    const taxableAmount = invoiceData?.payment?.grandTotal ?? 0;
    const totalAmount = netPayment;
    const vat = totalVAT;
    const grandTotal = taxableAmount + totalAmount + vat; 

    set({
      invoiceData: {
        ...invoiceData,
        payment: {
          ...invoiceData.payment,
          netPayment,
          vat,
          totalValueVat,
          taxableAmount,
          totalAmount,
          grandTotal,
        },
      },
    });
  },
  resetInvoiceData: () => set(() => ({
    invoiceData: {
      id: '',
      user: {
        id: ''
      },
      company: {
        name: "Spencer's Indonesia (Kemitraan)",
        address: 'UMC Land Building, Surabaya Jawa Timur, Indonesia. (123455)',
        phone: '+628212345678',
      },
      invoice: {
        name: '',
        number: "",
        date: formatDate(new Date()),
        dueDate: formatDate(new Date(new Date().setDate(new Date().getDate() + 1))),
        terms: "",
      },
      billing: {
        billTo: "",
        billToAddress: "",
        paymentNotes: "",
      },
      cart: [], 
      payment: {
        paymentLinkActive: false,
        bankAccount: "",
        transactionFee: 10000,
        grandTotal: 0,
        taxableAmount: 0,
        vat: 0,
        totalValueVat: 0,
        netPayment: 0,
        totalAmount: 0,
      },
    },
  })),
}));

export default useInvoiceStore;