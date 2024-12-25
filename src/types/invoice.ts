import { CartItem } from '@/types/product';
export interface DataPriceInvoiceInterface {
  dataName: string;
  data: string | number;
}

export interface InvoiceData {
  id?: string;
  company?: {
    name?: string;
    address?: string;
    phone?: string;
  };
  invoice?: {
    number?: string;
    date?: string;
    dueDate?: string;
    terms?: string;
  };
  billing?: {
    billTo?: string;
    billToAddress?: string;
    paymentNotes?: string;
  };
  cart?: CartItem[];
  payment?: {
    paymentLinkActive?: boolean;
    bankAccount?: string;
    transactionFee?: number;
    grandTotal?: number;
    taxableAmount?: number;
    vat?: number;
    totalValueVat?: number;
    netPayment?: number;
    totalAmount?: number;
  };
}

export interface DataProductInvoiceInterface {
  data: string | number;
  type: 'header' | 'data';
  dataType: 'string' | 'number' | 'price' | 'discount';
}

export interface InvoicePdfInterface {
  id: string;
  invoiceId: string;
  invoiceLogoUrl: string;
  companyName: string;
  companyAddress: string;
  companyPhone: string;
  indexHide: number[];
  invoiceUsepayment: boolean;
  invoiceFooterPrice1: DataPriceInvoiceInterface[];
  invoiceFooterPrice2: DataPriceInvoiceInterface[];
  dataTotalFooterPrice: DataPriceInvoiceInterface;
}