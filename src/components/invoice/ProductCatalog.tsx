import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProductCatalog } from "@/components/product/product-catalog"
import { InvoiceTable } from "@/components/invoice/InvoiceTable"
import { CartItem } from "@/types/product"
import { products } from "@/data/products";
import { Card } from "../ui/card";
import { useState } from "react";


export function Product() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [activeTab, setActiveTab] = useState<string>('catalog')

  const handleAddToCart = (item: CartItem) => {
    setCart(prev => {
      const existingItem = prev.find(
        i => i.product.id === item.product.id && 
        i.selectedVariant.size === item.selectedVariant.size && 
        i.selectedVariant.flavor === item.selectedVariant.flavor
      )

      if (existingItem) {
        return prev.map(i => 
          i === existingItem 
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        )
      }

      return [...prev, item]
    })
  }

  const handleUpdateQuantity = (productId: string, variantSize: string | undefined, variantFlavor: string | undefined, newQuantity: number) => {
    setCart(prev => {
      const existingItemIndex = prev.findIndex(
        item => item.product.id === productId && 
                item.selectedVariant.size === variantSize &&
                item.selectedVariant.flavor === variantFlavor
      )

      if (existingItemIndex !== -1) {
        if (newQuantity <= 0) {
          return prev.filter((_, index) => index !== existingItemIndex)
        } else {
          return prev.map((item, index) => 
            index === existingItemIndex ? { ...item, quantity: newQuantity } : item
          )
        }
      } else if (newQuantity > 0) {
        const product = products.find(p => p.id === productId)
        if (product) {
          const variant = product.variants.find(v => v.size === variantSize && v.flavor === variantFlavor)
          if (variant) {
            return [...prev, { product, selectedVariant: variant, quantity: newQuantity }]
          }
        }
      }
      return prev
    })
  }

  const handleRemoveItem = (productId: string, variantSize: string | undefined, variantFlavor: string | undefined) => {
    setCart(prev => prev.filter(item => 
      item.product.id !== productId || 
      item.selectedVariant.size !== variantSize ||
      item.selectedVariant.flavor !== variantFlavor
    ))
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
          onQuantityChange={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onShowCatalog={() => setActiveTab('catalog')}
        />
      </TabsContent>
      <TabsContent value="catalog">
        <ProductCatalog 
          cart={cart}
          onAddToCart={handleAddToCart}
          onUpdateQuantity={handleUpdateQuantity}
        />
      </TabsContent>
    </Tabs>
    </Card>
  );
}