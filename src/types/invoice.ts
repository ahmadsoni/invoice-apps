export interface DataPriceInvoiceInterface {
  dataName: string;
  data: string | number;
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