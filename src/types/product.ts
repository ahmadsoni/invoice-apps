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
  quantity: number;
  variantSize?: string;
  variantFlavor?: string;
}

export interface InvoiceTableProps {
  onGrandTotalChange: (grandTotal: number) => void;
}

export interface ProductCatalogProps {
  searchQuery: string
  selectedCategories: string[]
  currentPage: number
  itemsPerPage: number
  cart: CartItem[]
  paginatedProducts: any[]
  totalPages: number
  allCategories: string[]
  onSearchChange: (query: string) => void
  onCategoryChange: (categories: string[]) => void
  onPageChange: (page: number) => void
  onItemsPerPageChange: (itemsPerPage: number) => void
  onAddToCart: (item: CartItem) => void
  onUpdateQuantity: (productId: string, variantSize: string | undefined, variantFlavor: string | undefined, newQuantity: number) => void;
}

export interface ProductProps {
  catalog: ProductCatalogProps;
  invoice: InvoiceTableProps;
}