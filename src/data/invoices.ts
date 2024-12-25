import { InvoiceData } from '@/types/invoice';

export const dummyInvoices: InvoiceData[] = [
  {
    id: '1',
    company: {
      name: "Spencer's Indonesia (Kemitraan)",
      address: 'UMC Land Building, Surabaya Jawa Timur, Indonesia. (123455)',
      phone: '+628212345678',
    },
    invoice: {
      number: "0002",
      date: "2024-12-25",
      dueDate: "2024-12-30",
      terms: "Net 30",
    },
    billing: {
      billTo: "PT. ABC",
      billToAddress: "Jl. Mangga 123, Jakarta",
      paymentNotes: "Payment due within 30 days",
    },
    cart: [],
    payment: {
      paymentLinkActive: true,
      bankAccount: "123-456-789",
      transactionFee: 5000,
      grandTotal: 198000,
      taxableAmount: 180000,
      vat: 18000,
      totalValueVat: 18000,
      netPayment: 198000,
      totalAmount: 198000,
    },
  },
  {
    id: '2',
    company: {
      name: "Healthy Foods Co.",
      address: 'Jl. Durian 456, Bandung',
      phone: '+628987654321',
    },
    invoice: {
      number: "0003",
      date: "2024-12-20",
      dueDate: "2024-12-28",
      terms: "Net 10",
    },
    billing: {
      billTo: "PT. DEF",
      billToAddress: "Jl. Anggur 789, Surabaya",
      paymentNotes: "Please make payment by due date",
    },
    cart: [],
    payment: {
      paymentLinkActive: false,
      bankAccount: "987-654-321",
      transactionFee: 10000,
      grandTotal: 470000,
      taxableAmount: 450000,
      vat: 20000,
      totalValueVat: 20000,
      netPayment: 470000,
      totalAmount: 470000,
    },
  },
  {
    id: '3',
    company: {
      name: "Organic Goods Ltd.",
      address: 'Jl. Apel 789, Malang',
      phone: '+628123456789',
    },
    invoice: {
      number: "0004",
      date: "2024-12-18",
      dueDate: "2025-01-01",
      terms: "Net 15",
    },
    billing: {
      billTo: "PT. GHI",
      billToAddress: "Jl. Melon 321, Yogyakarta",
      paymentNotes: "Late payment may incur a penalty fee",
    },
    cart: [],
    payment: {
      paymentLinkActive: true,
      bankAccount: "321-654-987",
      transactionFee: 7500,
      grandTotal: 265500,
      taxableAmount: 250000,
      vat: 15500,
      totalValueVat: 15500,
      netPayment: 265500,
      totalAmount: 265500,
    },
  },
];
