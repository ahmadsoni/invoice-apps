import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useInvoiceStore } from "@/store/invoiceStore";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "./layout/Breadcrumb";
import { InvoiceHeader } from "./invoice/InvoiceHeader";
import { InvoiceNotes } from "./invoice/InvoiceNotes";
import HeaderProduct from "./invoice/HeaderProduct";
import InvoiceFooter from "./invoice/InvoiceFooter";
import { IconPlus } from "@tabler/icons-react";
import { products } from '@/data/products';
import { CartItem } from '@/types/product';
import { Product } from "./invoice/ProductCatalog";

const ITEMS_PER_PAGE = 5;
const allCategories = Array.from(
  new Set(products.flatMap(product => product.category))
);

export function CreateInvoice() {
  const navigate = useNavigate();
  const { getDefaultTemplate } = useInvoiceStore();
  const defaultTemplate = getDefaultTemplate();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE);
  const [cart, setCart] = useState<CartItem[]>([]);

  const [invoiceData, setInvoiceData] = useState({
    name: "Spencer's Order Invoice",
    invoiceNumber: "0001",
    date: new Date().toISOString().split("T")[0],
    dueDate: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split("T")[0],
    billTo: "",
    billToAddress: "",
    paymentNotes: "",
    cart: cart,
    paymentLinkActive: false,
    bankAccount: "",
    terms: "",
    grandTotal: 0,
    taxableAmount: 0,
    vat: 0,
    totalValueVat: 0,
    netPayment: 0,
    transactionFee: 10000,
    totalAmount: 0,
  });

  // Product catalog methods
  const handleAddToCart = (item: CartItem) => {
    setCart(prevCart => [...prevCart, item]);
  };

  const handleUpdateQuantity = (
    productId: string,
    variantSize: string | undefined,
    variantFlavor: string | undefined,
    newQuantity: number
  ) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.product.id === productId &&
        item.variantSize === variantSize &&
        item.variantFlavor === variantFlavor
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || 
      product.category.some(cat => selectedCategories.includes(cat));
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
            <Product 
              catalog={{ 
                  searchQuery:searchQuery,
                  selectedCategories:selectedCategories,
                  currentPage:currentPage,
                  itemsPerPage:itemsPerPage,
                  cart:cart,
                  paginatedProducts:paginatedProducts,
                  totalPages:totalPages,
                  allCategories:allCategories,
                  onSearchChange:setSearchQuery,
                  onCategoryChange:setSelectedCategories,
                  onPageChange:setCurrentPage,
                  onItemsPerPageChange:setItemsPerPage,
                  onAddToCart:handleAddToCart,
                  onUpdateQuantity:handleUpdateQuantity
               }}
               invoice={{ 
                  onGrandTotalChange: (value) =>
                setInvoiceData({ ...invoiceData, grandTotal: value })
              ,
                grandTotal: invoiceData.grandTotal
              }}
            />
            <InvoiceFooter
              bankAccount={invoiceData.bankAccount}
              terms={invoiceData.terms}
              onBankAccountChange={(value) =>
                setInvoiceData({ ...invoiceData, bankAccount: value })
              }
              onTermsChange={(value) =>
                setInvoiceData({ ...invoiceData, terms: value })
              }
              onAmountPaymentChange={(value) =>
                setInvoiceData({ ...invoiceData, netPayment: value })}
              grandTotal={invoiceData.grandTotal}
              onVatChange={(value) => 
                setInvoiceData({...invoiceData, vat: value})}
              onNetPaymentChange={(value) => 
                setInvoiceData({...invoiceData, netPayment: value})}
              onTaxableAmountChange={(value) => 
                setInvoiceData({...invoiceData, taxableAmount: value})}
              onTotalValueVatChange={(value) => 
                setInvoiceData({...invoiceData, totalValueVat: value})}
            />
            <InvoiceNotes 
              onPaymentLinkActiveChange={(value) =>
                setInvoiceData({...invoiceData, paymentLinkActive: value})}
              onTotalAmountChange={(value) => 
                setInvoiceData({...invoiceData, totalAmount: value})}
              paymentLinkActive={invoiceData.paymentLinkActive}
              netPayment={invoiceData.netPayment}
              transactionFee={invoiceData.transactionFee}
            />
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

