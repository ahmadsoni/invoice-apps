import { InvoiceData } from '@/types/invoice';

export const dummyInvoices: InvoiceData[] = [
  {
    id: '1',
    user: {
      id:'XQcQcY91zVeL8o9xAi6DoRBlqtx2'
    },
    company: {
      name: "Spencer's Indonesia (Kemitraan)",
      address: 'UMC Land Building, Surabaya Jawa Timur, Indonesia. (123455)',
      phone: '+628212345678',
    },
    invoice: {
      name: 'Data Pembelian Barang 1',
      number: 'INV-20240001',
      date: "2024-01-01",
      dueDate: "2024-01-31",
      terms: "Net 30",
    },
    billing: {
      billTo: "Customer Name",
      billToAddress: "123 Street Name, City",
      paymentNotes: "Payment due within 30 days",
    },
    cart: [
      {
        productId: "1",
        basePrice: 65000,
        quantity: 2,
        selectedVariant:{
          id: '1',
          size: "Standard",
          flavor: "Original",
          price: 65000,
          image: '/src/assets/catalog/almond-milk.svg?height=50&width=50',
        },
      },
    ],
    payment: {
      paymentLinkActive: false,
      bankAccount: "123-456-789",
      transactionFee: 10000,
      grandTotal: 198000,
      taxableAmount: 198000,
      vat: 39600,
      totalValueVat: 39600,
      netPayment: 237600,
      totalAmount: 237600,
    },
  },
  {
    id: '2',
    user: {
      id:'XQcQcY91zVeL8o9xAi6DoRBlqtx2'
    },
    company: {
      name: "PT. Teknologi Digital",
      address: 'Jl. Raya No. 50, Jakarta, Indonesia',
      phone: '+622112345678',
    },
    invoice: {
      name: 'Data Pembelian Barang 2',
      number: 'INV-20240002',
      date: "2024-01-05",
      dueDate: "2024-02-05",
      terms: "Net 30",
    },
    billing: {
      billTo: "Client XYZ",
      billToAddress: "456 Another Street, Jakarta",
      paymentNotes: "Payment due within 30 days from issue date",
    },
    cart: [
     {
        productId: "1",
        basePrice: 65000,
        quantity: 2,
      },
    ],
    payment: {
      paymentLinkActive: true,
      bankAccount: "987-654-321",
      transactionFee: 20000,
      grandTotal: 1196000,
      taxableAmount: 1196000,
      vat: 239200,
      totalValueVat: 239200,
      netPayment: 1435200,
      totalAmount: 1435200,
    },
  },
];
