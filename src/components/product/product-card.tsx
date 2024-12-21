import { useState } from 'react';
import { MinusCircle, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product, CartItem } from '../../types/product';
import { IconDiscountFilled } from '@tabler/icons-react';

interface ProductCardProps {
  product: Product;
  cartItem?: CartItem;
  onAddToCart: (item: CartItem) => void;
  onUpdateQuantity: (
    productId: string,
    variantSize: string | undefined,
    variantFlavor: string | undefined,
    newQuantity: number
  ) => void;
  cart: CartItem[];
}

function VariantSelector({
  label,
  options,
  selectedOption,
  onSelect,
}: {
  label: string;
  options: string[];
  selectedOption: string | undefined;
  onSelect: (option: string) => void;
}) {
  return (
    <div className="space-y-1">
      <p className="text-sm text-gray-600">{label}</p>
      <div className="flex gap-2">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onSelect(option)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded border transition ${
      selectedOption === option
                ? 'bg-blue-50 border-blue-200'
                : 'border-gray-200 hover:bg-gray-50'
            }`}
            aria-pressed={selectedOption === option}
          >
            <span>{option}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function QuantityControls({
  productId,
  size,
  flavor,
  quantity,
  onDecrease,
  onIncrease,
}: {
  productId: string;
  size: string | undefined;
  flavor: string | undefined;
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
}) {
  return (
    <div className="flex items-center border-2 border-purple-400 rounded-lg px-4 py-1 w-64 justify-between">
      <Button
        variant="default"
        size="icon"
        className="h-8 w-8 bg-indigo-600"
        onClick={onDecrease}
        disabled={quantity <= 0}
        aria-label="Kurangi jumlah"
      >
        <MinusCircle className="w-6 h-6 text-white" />
      </Button>
      <span className="w-8 text-center" aria-live="polite">
        {quantity}
      </span>
      <Button
        variant="default"
        size="icon"
        className="h-8 w-8 bg-indigo-600"
        onClick={onIncrease}
        aria-label="Tambah jumlah"
      >
        <PlusCircle className="w-4 h-4" />
      </Button>
    </div>
  );
}

export function ProductCard({ product, cartItem, onAddToCart, onUpdateQuantity, cart }: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    cartItem?.selectedVariant.size || product.variants[0]?.size
  );
  const [selectedFlavor, setSelectedFlavor] = useState<string | undefined>(
    cartItem?.selectedVariant.flavor || product.variants[0]?.flavor
  );

  const selectedVariant =
    product.variants.find(
      (v) => v.size === selectedSize && v.flavor === selectedFlavor
    ) || product.variants[0];

  const handleAddToCart = () => {
    onAddToCart({
      product,
      selectedVariant,
      quantity: 1,
    });
  };

  const formatPrice = (price: number) => `Rp ${price.toLocaleString('id-ID')}`;

  const getSubtotal = () => {
    const quantity =
      cart.find(
        (item) =>
          item.product.id === product.id &&
          item.selectedVariant.size === selectedSize &&
          item.selectedVariant.flavor === selectedFlavor
      )?.quantity || 0;
    return quantity * selectedVariant.price;
  };

  return (
    <div className="flex flex-row justify-between p-4 gap-4 border rounded-lg bg-white">
      {/* Left Section - Product Image */}
      <div className="flex flex-row gap-4">
        <div className="w-[120px] h-[120px]">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className='w-72'>
          <h3 className="text-lg font-medium">{product.name}</h3>
          <p className="text-gray-900 font-bold">{formatPrice(product.basePrice)}</p>
          <p className="text-sm text-gray-600 mt-1">{product.description}</p>
        </div>
      </div>

      {/* Middle Section - Variant Selectors */}
      <div className="space-y-4">
        <VariantSelector
          label="Ukuran Produk"
          options={['Standard', 'Large']}
          selectedOption={selectedSize}
          onSelect={setSelectedSize}
        />
        <VariantSelector
          label="Rasa"
          options={['Original', 'Choco']}
          selectedOption={selectedFlavor}
          onSelect={setSelectedFlavor}
        />
      </div>

      {/* Right Section - Quantity Controls */}
      <div className="flex flex-col items-end gap-4 justify-between">
        <div>
          <p className="text-sm text-gray-500">Subtotal:</p>
          <p className="text-xl font-bold text-blue-600">{formatPrice(getSubtotal())}</p>
        </div>
        <div className='flex flex-row gap-2 items-center justify-end'>
          <Button variant={'destructive'} className='hover:cursor-default'>
              <IconDiscountFilled className='text-white'/>
          </Button>
          <QuantityControls
            productId={product.id}
            size={selectedSize}
            flavor={selectedFlavor}
            quantity={
              cart.find(
                (item) =>
                  item.product.id === product.id &&
                  item.selectedVariant.size === selectedSize &&
                  item.selectedVariant.flavor === selectedFlavor
              )?.quantity || 0
            }
            onDecrease={() => {
              const currentItem = cart.find(
                (item) =>
                  item.product.id === product.id &&
                  item.selectedVariant.size === selectedSize &&
                  item.selectedVariant.flavor === selectedFlavor
              );
              if (currentItem && currentItem.quantity > 0) {
                onUpdateQuantity(
                  product.id,
                  selectedSize,
                  selectedFlavor,
                  currentItem.quantity - 1
                );
              }
            }}
            onIncrease={() => {
              const currentItem = cart.find(
                (item) =>
                  item.product.id === product.id &&
                  item.selectedVariant.size === selectedSize &&
                  item.selectedVariant.flavor === selectedFlavor
              );
              if (currentItem) {
                onUpdateQuantity(
                  product.id,
                  selectedSize,
                  selectedFlavor,
                  currentItem.quantity + 1
                );
              } else {
                handleAddToCart();
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
