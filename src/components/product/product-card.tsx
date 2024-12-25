import { useState } from 'react';
import { MinusCircle, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product, CartItem } from '../../types/product';
import { IconDiscountFilled } from '@tabler/icons-react';
import { formatToRupiah } from '@/lib/formater';
import { ScrollArea } from '../ui/scroll-area';

interface ProductCardProps {
  product: Product;
  cartItems: CartItem[];
  onAddToCart: (item: CartItem) => void;
  onUpdateQuantity: ( 
    productId: string,
    newQuantity: number
    ) => void;
}

interface VariantSelectorContainerProps {
  children: React.ReactNode
}

function VariantSelectorContainer({ children }: VariantSelectorContainerProps) {
  return (
    <ScrollArea className="h-[200px] w-[400px] rounded-md border p-4">
      <div className="space-y-4">
        {children}
      </div>
    </ScrollArea>
  )
}

function VariantSelector({
  label,
  options,
  selectedOption,
  onSelect,
  images,
}: {
  label: string;
  options: string[];
  selectedOption: string | undefined;
  onSelect: (option: string) => void;
  images?: string[];
}) {
  return (
    <div className="space-y-1">
      <p className="text-sm text-gray-600">{label}</p>
      <div className="flex gap-2">
        {options.map((option, index) => (
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
            {images && images[index] && (
              <img
                src={images[index]}
                alt={option}
                className="w-6 h-6 object-cover rounded"
              />
            )}
            <span>{option}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function QuantityControls({
  quantity,
  onDecrease,
  onIncrease,
}: {
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

export function ProductCard({
  product,
  cartItems,
  onAddToCart,
  onUpdateQuantity,
}: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product?.variants?.[0]?.size
  );

  const [selectedFlavor, setSelectedFlavor] = useState<string | undefined>(
    product?.variants?.[0]?.flavor
  );

  const selectedVariant =
    product?.variants?.find(
      (v) => v.size === selectedSize && v.flavor === selectedFlavor
    ) || product?.variants?.[0] || { size: undefined, flavor: undefined, price: 0 };

  const handleAddToCart = () => {
    if (!selectedVariant) {
      alert("Pilih varian terlebih dahulu.");
      return;
    }
    onAddToCart({
      productId: product.id,
      basePrice: product.basePrice,
      selectedVariant,
      quantity: 1,
    });
  };

  const getSubtotal = () => {
    const cartItem = cartItems?.find(item => 
      item.productId === product.id && 
      item.selectedVariant?.size === selectedSize && 
      item.selectedVariant?.flavor === selectedFlavor
    );
    const quantity = cartItem?.quantity || 0;

    return (
      ((selectedVariant?.price === 0 || selectedVariant?.price == null)
        ? product.basePrice
        : selectedVariant?.price) * quantity
    );
  };

  const sizeOptions = Array.from(
    new Set(product.variants?.map((variant) => variant.size))
  ).filter((size): size is string => Boolean(size));

  const sizeImages = sizeOptions
    .map((size) => product.variants?.find((variant) => variant.size === size)?.image)
    .filter((image): image is string => Boolean(image));

  const flavorOptions = Array.from(
    new Set(product.variants?.map((variant) => variant.flavor))
  ).filter((flavor): flavor is string => Boolean(flavor));

  const flavorImages = flavorOptions
    .map((flavor) => product.variants?.find((variant) => variant.flavor === flavor)?.image)
    .filter((image): image is string => Boolean(image));

  const cartItem = cartItems?.find(item => 
    item.productId === product.id && 
    item.selectedVariant?.size === selectedSize && 
    item.selectedVariant?.flavor === selectedFlavor
  );

  return (
    <div className="flex flex-col sm:flex-row justify-between p-4 gap-4 border rounded-lg bg-white">
      {/* Left Section - Product Image */}
      <div className="flex flex-row gap-4 w-full sm:w-auto">
        <div className="w-full sm:w-[120px] h-[120px] mb-4 sm:mb-0">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="w-full sm:w-72">
          <h3 className="text-lg font-medium">{product.name}</h3>
          <p className="text-gray-900 font-bold">{formatToRupiah(product.basePrice)}</p>
          <p className="text-sm text-gray-600 mt-1">{product.description}</p>
        </div>
      </div>

      {/* Middle Section - Variant Selectors */}
      {sizeOptions.length > 0 || flavorOptions.length > 0 ? (
        <VariantSelectorContainer>
          <div className="space-y-4">
            {sizeOptions.length > 0 && (
              <VariantSelector
                label="Ukuran Produk"
                images={sizeImages}
                options={sizeOptions}
                selectedOption={selectedSize}
                onSelect={setSelectedSize}
              />
            )}
            {flavorOptions.length > 0 && (
              <VariantSelector
                label="Rasa"
                options={flavorOptions}
                images={flavorImages}
                selectedOption={selectedFlavor}
                onSelect={setSelectedFlavor}
              />
            )}
          </div>
        </VariantSelectorContainer>
      ) : (
        <div></div>
      )}

      {/* Right Section - Quantity Controls */}
      <div className="flex flex-col items-end gap-4 justify-between mt-4 sm:mt-0">
        <div>
          <p className="text-sm text-gray-500">Subtotal:</p>
          <p className="text-xl font-bold text-blue-600">{formatToRupiah(getSubtotal())}</p>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <Button variant={'destructive'} className="hover:cursor-default h-10">
            <IconDiscountFilled className="text-white" />
          </Button>
          <QuantityControls
            quantity={cartItem?.quantity || 0}
            onDecrease={() => {
              if (cartItem && cartItem.quantity > 0) {
                onUpdateQuantity(product.id, cartItem.quantity - 1);
              }
            }}
            onIncrease={() => {
              if (cartItem) {
                onUpdateQuantity(product.id, cartItem.quantity + 1);
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

