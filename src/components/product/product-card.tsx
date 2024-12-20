import { useState } from 'react'
import { MinusCircle, PlusCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Product, CartItem } from '../../types/product'

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

  return (
    <div className="flex p-4 gap-4 border rounded-lg bg-white">
      {/* Left Section - Product Image */}
      <div className="w-[120px] space-y-2">
        <div className="w-[120px] h-[120px]">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="flex gap-1">
          {product.thumbnails?.map((thumb, idx) => (
            <div key={idx} className="w-6 h-6 border border-gray-200 rounded">
              <img 
                src={thumb}
                alt={`Thumbnail ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Middle Section - Product Details */}
      <div className="flex-1">
        <div className="flex justify-between">
          <div>
            <h3 className="text-lg font-medium">{product.name}</h3>
            <p className="text-gray-900 font-bold text-">{formatPrice(product.basePrice)}</p>
            <div className="flex gap-2 text-sm text-gray-500 mt-1">
              {product.category.map((cat, idx) => (
                <span key={idx}>{idx + 1}. {cat}</span>
              ))}
            </div>
            <p className="text-sm text-gray-600 mt-1">{product.description}</p>
          </div>
          <div className="text-end">
            <p className="text-sm text-gray-500">Sub total:</p>
            <p className="text-lg font-bold text-blue-600">
              {formatPrice(getSubtotal())}
            </p>
          </div>
        </div>

        {/* Variant Selectors */}
        <div className="mt-6 space-y-4">
          {/* Size Selector */}
          <div className="space-y-1">
            <p className="text-sm text-gray-600">Product Size: -</p>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedSize('Standard')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded border ${
                  selectedSize === 'Standard' 
                    ? 'bg-blue-50 border-blue-200' 
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <img src="/icons/standard.svg" alt="" className="w-4 h-4" />
                <span>Standard</span>
              </button>
              <button
                onClick={() => setSelectedSize('Large')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded border ${
                  selectedSize === 'Large' 
                    ? 'bg-blue-50 border-blue-200' 
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <img src="/icons/large.svg" alt="" className="w-4 h-4" />
                <span>Large</span>
              </button>
            </div>
          </div>

          {/* Flavor Selector */}
          <div className="space-y-1">
            <p className="text-sm text-gray-600">Rasa: -</p>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedFlavor('Original')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded border ${
                  selectedFlavor === 'Original' 
                    ? 'bg-blue-50 border-blue-200' 
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <img src="/icons/original.svg" alt="" className="w-4 h-4" />
                <span>Original</span>
              </button>
              <button
                onClick={() => setSelectedFlavor('Choco')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded border ${
                  selectedFlavor === 'Choco' 
                    ? 'bg-blue-50 border-blue-200' 
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <img src="/icons/choco.svg" alt="" className="w-4 h-4" />
                <span>Choco</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Quantity Controls */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
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
          <MinusCircle className="w-4 h-4" />
        </Button>
        <span className="w-8 text-center">
          {cart.find(item => 
            item.product.id === product.id && 
            item.selectedVariant.size === selectedSize &&
            item.selectedVariant.flavor === selectedFlavor
          )?.quantity || 0}
        </span>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
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
          <PlusCircle className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}