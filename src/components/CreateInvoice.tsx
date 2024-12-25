import {  useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "./layout/Breadcrumb";
import { InvoiceHeader } from "./invoice/InvoiceHeader";
import { InvoiceNotes } from "./invoice/InvoiceNotes";
import HeaderProduct from "./invoice/HeaderProduct";
import InvoiceFooter from "./invoice/InvoiceFooter";
import { IconPlus } from "@tabler/icons-react";
import { Product } from "./invoice/ProductCatalog";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import useInvoiceStore from "@/store/invoiceStore";



export function CreateInvoice() {
  const navigate = useNavigate();
  const [openPreview, setOpenPreview] = useState(false);
   const { invoiceData } = useInvoiceStore((state) => ({
    invoiceData: state.getInvoiceData(),
  }));
  function onOpenDialog () {
    setOpenPreview(!openPreview);
  }
  return (
    <>
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-6 px-4">
        <Breadcrumb />
        <HeaderProduct
          onOpenPreviewChange={setOpenPreview}
        />
        <div className="flex flex-col w-full gap-6">
          <div className="space-y-6">
            <InvoiceHeader />
            <Product />
            <InvoiceFooter />
            <InvoiceNotes />
            <div className="flex justify-between">
              <button className="text-destructive bg-transparent" onClick={() => navigate("/")}>
                Cancel
              </button>
              <Button size="lg" className="flex gap-2" onClick={() => {
                console.log('hasil', invoiceData)
              }}>
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
    <Dialog open={openPreview} onOpenChange={onOpenDialog}>
      <DialogContent className="w-full max-w-5xl">
        <DialogHeader>
          <DialogTitle className="font-bold text-2xl mb-3">Invoice Preview</DialogTitle>
          <DialogDescription>
            {/* <MyDocument /> */}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
</>
  );
}

