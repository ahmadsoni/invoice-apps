import { useState } from 'react'
import { Minus, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Product, CartItem } from '../../types/product'
import { VariantSelector } from './product-variant-selector'

interface ProductCardProps {
  product: Product
  cartItem?: CartItem
  onAddToCart: (item: CartItem) => void
  onUpdateQuantity: (productId: string, variantSize: string | undefined, variantFlavor: string | undefined, newQuantity: number) => void
  cart: CartItem[]
}

export function ProductCard({ product, cartItem, onAddToCart, onUpdateQuantity, cart }: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    cartItem?.selectedVariant.size || product.variants[0]?.size
  )
  const [selectedFlavor, setSelectedFlavor] = useState<string | undefined>(
    cartItem?.selectedVariant.flavor || product.variants[0]?.flavor
  )

  const selectedVariant = product.variants.find(
    v => v.size === selectedSize && v.flavor === selectedFlavor
  ) || product.variants[0]

  const handleAddToCart = () => {
    onAddToCart({
      product,
      selectedVariant,
      quantity: 1
    })
  }

  const formatPrice = (price: number) => {
    return `Rp ${price.toLocaleString('id-ID')}`
  }

  const getSubtotal = () => {
    const quantity = cart.find(item => 
      item.product.id === product.id && 
      item.selectedVariant.size === selectedSize &&
      item.selectedVariant.flavor === selectedFlavor
    )?.quantity || 0
    return quantity * selectedVariant.price
  }

  const sizeOptions = Array.from(new Set(product.variants.map(v => v.size)))
    .filter((size): size is NonNullable<typeof product.variants[0]['size']> => !!size)
    .map(size => ({
        label: size,
        value: size,
        icon: size === 'Standard' ? '/icons/standard.svg' : '/icons/large.svg'
    }))


  const flavorOptions = Array.from(new Set(product.variants.map(v => v.flavor)))
    .filter((flavor): flavor is NonNullable<typeof product.variants[0]['flavor']> => !!flavor)
    .map(flavor => ({
      label: flavor,
      value: flavor,
      icon: `/icons/${flavor.toLowerCase()}.svg`
    }))

  return (
    <div className="flex gap-6 p-4 border rounded-lg">
      <div className="flex gap-4">
        <div className="relative w-[120px] h-[120px]">
          <img
            src={product.image}
            alt={product.name}
            className="object-cover rounded-lg"
          />
        </div>
        {product.thumbnails && (
          <div className="flex flex-col gap-2">
            {product.thumbnails.map((thumb, idx) => (
              <div key={idx} className="relative w-[30px] h-[30px]">
                <img
                  src={thumb}
                  alt={`${product.name} thumbnail ${idx + 1}`}
                  className="object-cover rounded-sm"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex-1">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-lg">{formatPrice(product.basePrice)}</p>
        <div className="flex gap-2 text-sm text-muted-foreground">
          {product.category.map((cat, idx) => (
            <span key={idx}>
              {idx + 1}. {cat}
            </span>
          ))}
        </div>
        <p className="text-sm text-muted-foreground mt-1">{product.description}</p>

        {sizeOptions.length > 0 && (
          <div className="mt-4">
            <VariantSelector
              label="Product Size"
              options={sizeOptions}
              value={selectedSize}
              onChange={(newSize) => {
                setSelectedSize(newSize)
                const newVariant = product.variants.find(v => v.size === newSize && v.flavor === selectedFlavor)
                if (newVariant) {
                  const currentQuantity = cart.find(item => 
                    item.product.id === product.id && 
                    item.selectedVariant.size === selectedSize &&
                    item.selectedVariant.flavor === selectedFlavor
                  )?.quantity || 0
                  onUpdateQuantity(product.id, newSize, selectedFlavor, currentQuantity)
                }
              }}
            />
          </div>
        )}

        {flavorOptions.length > 0 && (
          <div className="mt-4">
            <VariantSelector
              label="Rasa"
              options={flavorOptions}
              value={selectedFlavor}
              onChange={(newFlavor) => {
                setSelectedFlavor(newFlavor)
                const newVariant = product.variants.find(v => v.size === selectedSize && v.flavor === newFlavor)
                if (newVariant) {
                  const currentQuantity = cart.find(item => 
                    item.product.id === product.id && 
                    item.selectedVariant.size === selectedSize &&
                    item.selectedVariant.flavor === selectedFlavor
                  )?.quantity || 0
                  onUpdateQuantity(product.id, selectedSize, newFlavor, currentQuantity)
                }
              }}
            />
          </div>
        )}
      </div>

      <div className="flex flex-col items-end gap-4">
        <p className="text-lg font-semibold">
          Sub total: {formatPrice(getSubtotal())}
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              const currentItem = cart.find(item => 
                item.product.id === product.id && 
                item.selectedVariant.size === selectedSize &&
                item.selectedVariant.flavor === selectedFlavor
              )
              if (currentItem && currentItem.quantity > 0) {
                onUpdateQuantity(
                  product.id,
                  selectedSize,
                  selectedFlavor,
                  currentItem.quantity - 1
                )
              }
            }}
            disabled={!cart.find(item => 
              item.product.id === product.id && 
              item.selectedVariant.size === selectedSize &&
              item.selectedVariant.flavor === selectedFlavor
            )?.quantity}
          >
            <Minus className="w-4 h-4" />
          </Button>
          <span className="w-12 text-center">
            {cart.find(item => 
              item.product.id === product.id && 
              item.selectedVariant.size === selectedSize &&
              item.selectedVariant.flavor === selectedFlavor
            )?.quantity || 0}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              const currentItem = cart.find(item => 
                item.product.id === product.id && 
                item.selectedVariant.size === selectedSize &&
                item.selectedVariant.flavor === selectedFlavor
              )
              if (currentItem) {
                onUpdateQuantity(
                  product.id,
                  selectedSize,
                  selectedFlavor,
                  currentItem.quantity + 1
                )
              } else {
                handleAddToCart()
              }
            }}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

