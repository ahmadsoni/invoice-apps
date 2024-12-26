import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductCatalog } from "@/components/product/product-catalog";
import { InvoiceTable } from "@/components/invoice/InvoiceTable";
import { AddToCart, CartItem, DeleteToCart, UpdateQuantity } from "@/types/product";
import { Card } from "@/components/ui/card";
import { useEffect, useMemo, useState } from "react";
import useInvoiceStore from "@/store/invoiceStore";
import { useProducts } from "@/hooks/use-products";


const ITEMS_PER_PAGE = 5;

interface ProductSectionProps {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
}
export function ProductSection({ cart, setCart }: ProductSectionProps) {
  const { products, loading, error } = useProducts();
  const [activeTab, setActiveTab] = useState<string>("catalog");
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE);
  const { invoiceData, setInvoiceData } = useInvoiceStore((state) => ({
    invoiceData: state.getInvoiceData(),
    setInvoiceData: state.setInvoiceData,
  }));
  
  
  const allCategories = useMemo(() => 
    Array.from(new Set(products.flatMap(product => product.category))),
    [products]
  );

  const filteredProducts = useMemo(() => 
    products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategories.length === 0 || 
        product.category.some(cat => selectedCategories.includes(cat));
      return matchesSearch && matchesCategory;
    }), 
    [products, searchQuery, selectedCategories]
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleAddToCart = ({ product, selectedVariant }: AddToCart) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(item => 
        item.productId === product.id && 
        ((!item.selectedVariant && !selectedVariant) || 
         (item.selectedVariant?.id === selectedVariant?.id))
      );
      if (existingItemIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += 1;
        return updatedCart;
      } else {
        const newItem: CartItem = {
          productId: product.id,
          basePrice: selectedVariant?.price ?? product.basePrice,
          selectedVariant: selectedVariant ?? null,
          quantity: 1
        };
        return [...prevCart, newItem];
      }
    });
  };

  const handleUpdateQuantity = ({ productId, variantId, newQuantity }: UpdateQuantity) => {
    setCart(prevCart => {
      const updatedCart = prevCart.map(item => {
        if (item.productId === productId) {
          if ((!item.selectedVariant && !variantId) || 
              (item.selectedVariant?.id === variantId)) {
            return { ...item, quantity: Math.max(0, newQuantity) };
          }
        }
        return item;
      });
      return updatedCart.filter(item => item.quantity > 0);
    });
  };

  const handleRemoveItem = ({ productId, variantId }: DeleteToCart) => {
    setCart(prevCart => prevCart.filter(item => 
      !(item.productId === productId && 
        ((!item.selectedVariant && !variantId) || 
         (item.selectedVariant?.id === variantId)))
    ));
  };

  const total = useMemo(() => {
    return cart.reduce((sum, item) => sum + (item.basePrice * item.quantity), 0);
  }, [cart]);
  
  useEffect(() => {
    setInvoiceData({
      payment: {
        grandTotal: total,
      }
    });
  }, [total, setInvoiceData]);

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>Error loading products: {error}</p>;
  }

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
