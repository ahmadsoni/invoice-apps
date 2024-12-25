import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductCatalog } from "@/components/product/product-catalog";
import { InvoiceTable } from "@/components/invoice/InvoiceTable";
import { CartItem } from "@/types/product";
import { products } from "@/data/products";
import { Card } from "../ui/card";
import { useEffect, useMemo, useState } from "react";
import useInvoiceStore from "@/store/invoiceStore";

const ITEMS_PER_PAGE = 5;
const allCategories = Array.from(
  new Set(products.flatMap(product => product.category))
);

export function Product() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeTab, setActiveTab] = useState<string>("catalog");
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE);
  const { invoiceData, setInvoiceData } = useInvoiceStore((state) => ({
    invoiceData: state.getInvoiceData(),
    setInvoiceData: state.setInvoiceData,
  }));
  console.log("cart", cart);
  const handleAddToCart = (item: CartItem) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(cartItem => cartItem.productId === item.productId);
      if (existingItemIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += 1;
        return updatedCart;
      } else {
        const product = products.find(p => p.id === item.productId);
        if (product) {
          return [
            ...prevCart,
            { productId: item.productId, basePrice: product.basePrice, quantity: 1 }
          ];
        }
        return prevCart;
      }
    });
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

  const handleUpdateQuantity = (
    productId: string,
    newQuantity: number
  ) => {
    setCart(prevCart => {
      const updatedCart = prevCart.map(item => 
        item.productId === productId
          ? { ...item, quantity: newQuantity }
          : item
      );
      return updatedCart;
    });
  };

  const handleRemoveItem = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.productId !== productId));
  };

  const total = useMemo(() => {
    return cart.reduce((sum, { productId, quantity }) => {
      const product = products.find(p => p.id === productId);
      if (product) {
        return sum + (product.basePrice * quantity);
      }
      return sum;
    }, 0);
  }, [cart]);
  
  useEffect(() => {
    setInvoiceData({
      payment: {
        grandTotal: total,
      }
    });
  }, [total, setInvoiceData]);

  return (
    <Card className="h-full">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 ">
          <TabsTrigger value="invoice">Invoice Table</TabsTrigger>
          <TabsTrigger value="catalog">Catalog</TabsTrigger>
        </TabsList>
        <TabsContent value="invoice">
          <InvoiceTable 
            items={cart}
            products={products}
            onQuantityChange={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onShowCatalog={() => setActiveTab('catalog')}
            grandTotal={invoiceData?.payment?.grandTotal ?? 0}
          />
        </TabsContent>
        <TabsContent value="catalog">
          <ProductCatalog 
            searchQuery={searchQuery}
            selectedCategories={selectedCategories}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            cart={cart}
            paginatedProducts={paginatedProducts}
            totalPages={totalPages}
            allCategories={allCategories}
            onSearchChange={setSearchQuery}
            onCategoryChange={setSelectedCategories}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={setItemsPerPage}
            onAddToCart={handleAddToCart}
            onUpdateQuantity={handleUpdateQuantity}
          />
        </TabsContent>
      </Tabs>
    </Card>
  );
}
