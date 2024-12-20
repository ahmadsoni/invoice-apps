export interface ProductVariant {
  size?: 'Standard' | 'Large'
  flavor?: 'Original' | 'Choco' | 'Peach' | 'Blueberry' | 'Strawberry'
  price: number
}

export interface Product {
  id: string
  name: string
  basePrice: number
  image: string
  category: string[]
  description: string
  variants: ProductVariant[]
  thumbnails?: string[]
}

export interface CartItem {
  product: Product
  selectedVariant: ProductVariant
  quantity: number
}

