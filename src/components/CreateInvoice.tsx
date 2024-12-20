import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useInvoiceStore } from "@/store/invoiceStore";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "./layout/Breadcrumb";
import { InvoiceHeader } from "./invoice/InvoiceHeader";
import { Product } from "./invoice/ProductCatalog";
import { InvoiceNotes } from "./invoice/InvoiceNotes";
import HeaderProduct from "./invoice/HeaderProduct";
import InvoiceFooter from "./invoice/InvoiceFooter";
import { IconPlus } from "@tabler/icons-react";


export function CreateInvoice() {
  const navigate = useNavigate();
  const {getDefaultTemplate } = useInvoiceStore();
  const defaultTemplate = getDefaultTemplate();
  const [selectedProducts, setSelectedProducts] = useState<
    Array<{ product: any; quantity: number }>
  >([]);

  const [invoiceData, setInvoiceData] = useState({
    name: "Spencer's Order Invoice",
    invoiceNumber: "0001",
    date: new Date().toISOString().split("T")[0],
    dueDate: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split("T")[0],
    billTo: "",
    billToAddress: "",
    paymentNotes: "",
    bankAccount: "",
    terms: "",
  });

  // const handleQuantityChange = (productId: string, quantity: number) => {
  //   setSelectedProducts((prev) =>
  //     prev.map((item) =>
  //       item.product.id === productId
  //         ? { ...item, quantity: Math.max(0, quantity) }
  //         : item
  //     )
  //   );
  // };

  // const handleRemoveItem = (productId: string) => {
  //   setSelectedProducts((prev) =>
  //     prev.filter((item) => item.product.id !== productId)
  //   );
  // };

  // const addProductToInvoice = (product: any) => {
  //   if (!selectedProducts.some((item) => item.product.id === product.id)) {
  //     setSelectedProducts([...selectedProducts, { product, quantity: 1 }]);
  //   }
  // };

  if (!defaultTemplate) {
    return <div>No default template found</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-6 px-4">
        <Breadcrumb />
        <HeaderProduct />
        <div className="flex flex-col w-full gap-6">
          <div className="space-y-6">
            <InvoiceHeader
              companyName={defaultTemplate.header.companyName}
              address={defaultTemplate.header.address}
              phone={defaultTemplate.header.phone}
              invoiceNumber={invoiceData.invoiceNumber}
              date={invoiceData.date}
              dueDate={invoiceData.dueDate}
              onInvoiceNumberChange={(value) =>
                setInvoiceData({ ...invoiceData, invoiceNumber: value })
              }
              onDateChange={(value) =>
                setInvoiceData({ ...invoiceData, date: value })
              }
              onDueDateChange={(value) =>
                setInvoiceData({ ...invoiceData, dueDate: value })
              }
            />
            <Product />
            <InvoiceFooter
              paymentNotes={invoiceData.paymentNotes}
              bankAccount={invoiceData.bankAccount}
              terms={invoiceData.terms}
              onPaymentNotesChange={(value) =>
                setInvoiceData({ ...invoiceData, paymentNotes: value })
              }
              onBankAccountChange={(value) =>
                setInvoiceData({ ...invoiceData, bankAccount: value })
              }
              onTermsChange={(value) =>
                setInvoiceData({ ...invoiceData, terms: value })
              }
            />
            <InvoiceNotes />

            <div className="flex justify-between">
              <button className="text-destructive bg-transparent" onClick={() => navigate("/")}>
                Cancel
              </button>
              <Button size="lg" className="flex gap-2">
                Create Invoice Document
                <span>
                  <IconPlus className="w-5 h-5" />
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}