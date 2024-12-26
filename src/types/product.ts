export interface ProductVariant {
  id?: string;
  size?: string;
  flavor?: string;
  price?: number
  image?: string;
}

export interface Product {
  id: string
  name: string
  basePrice: number
  image: string
  category: string[]
  description: string
  variants?: ProductVariant[]
  thumbnails?: string[]
}
export interface AddToCart {
  product: Product;
  selectedVariant?: ProductVariant;
}

export interface DeleteToCart {
  productId: string;
  variantId: string | null;
}

export interface UpdateQuantity {
  productId: string;
  variantId: string | null;
  newQuantity: number;
}
export interface CartItem {
  productId: string;
  basePrice: number;
  selectedVariant?: ProductVariant | null
  quantity: number;
}



export interface ProductCatalogProps {
  searchQuery: string
  selectedCategories: string[]
  currentPage: number
  itemsPerPage: number
  cart: CartItem[];
  paginatedProducts: any[]
  totalPages: number
  allCategories: string[]
  onSearchChange: (query: string) => void
  onCategoryChange: (categories: string[]) => void
  onPageChange: (page: number) => void
  onItemsPerPageChange: (itemsPerPage: number) => void
  onAddToCart: ({product, selectedVariant}:AddToCart) => void
  onUpdateQuantity: ({productId, variantId, newQuantity}: UpdateQuantity) => void;
}

export interface ProductProps {
  catalog: ProductCatalogProps;
}