import {  useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "./layout/Breadcrumb";
import { InvoiceHeader } from "./invoice/InvoiceHeader";
import { InvoiceNotes } from "./invoice/InvoiceNotes";
import HeaderProduct from "./invoice/HeaderProduct";
import InvoiceFooter from "./invoice/InvoiceFooter";
import { IconPlus, IconWhirl } from "@tabler/icons-react";
import { ProductSection } from "./invoice/ProductSection";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import useInvoiceStore from "@/store/invoiceStore";
import { CartItem } from "@/types/product";
import { useAuthStore } from "@/store/authStore";
import { useInvoices } from "@/hooks/use-invoices";
import { db } from "@/lib/firebase";
import { collection, doc } from "firebase/firestore";



export function CreateInvoice() {
  const navigate = useNavigate();
   const { user } = useAuthStore();
   const invoiceRef =  doc(collection(db, "invoices"));
   const newInvoiceKey = invoiceRef.id;
   const [userUUID, setUserUUID] = useState('');
   const [invoiceKey, setInvoiceKey] = useState('')
   const {addInvoice} = useInvoices();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [openPreview, setOpenPreview] = useState(false);
  const[isLoading, setIsloading] = useState(false);
  const { invoiceData, setInvoiceData, resetInvoiceData } = useInvoiceStore((state) => ({
    setInvoiceData: state.setInvoiceData,
    invoiceData: state.getInvoiceData(),
    resetInvoiceData: state.resetInvoiceData,
  }));
  useEffect(() => {
    setUserUUID(user!.uid || '');
    setInvoiceKey(newInvoiceKey);
  }, [user?.uid, newInvoiceKey])
  function onOpenDialog () {
    setOpenPreview(!openPreview);
  }

  const handleCreateInvoice = async () => {
    setIsloading(true);
    if (!invoiceKey || !userUUID) {
      console.error("Invoice Key or User UUID is not available yet.");
      return; 
    }

    try {
      console.log("userUUID", userUUID, "invoiceKey", invoiceKey);

      const newInvoiceData = {
        ...invoiceData,
        id: invoiceKey,
        user: {
          id: userUUID
        },
        cart: cart
      };

      setInvoiceData(newInvoiceData);
      await addInvoice(newInvoiceData);
      resetInvoiceData();
      setIsloading(false);
      navigate('/');
    } catch (error) {
      setIsloading(false);
      console.error('Gagal membuat invoice:', error);
    }
  };

  const handleCancle = () => {
    resetInvoiceData();
    navigate('/');
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
            <ProductSection 
              cart={cart}
              setCart={setCart}
            />
            <InvoiceFooter />
            <InvoiceNotes />
            <div className="flex justify-between">
              <button className="text-destructive bg-transparent" onClick={handleCancle}>
                Cancel
              </button>
              <Button
                size="lg"
                className="flex gap-2 items-center justify-center"
                onClick={handleCreateInvoice}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <IconWhirl className="animate-spin w-5 h-5" />
                    Loading...
                  </>
                ) : (
                  <>
                    Create Invoice Document
                    <IconPlus className="w-5 h-5" />
                  </>
                )}
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

