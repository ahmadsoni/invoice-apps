import { Search, Filter, Info } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ProductCard } from './product-card'
import { Pagination } from '../pagination/pagination'
import { ProductCatalogProps } from '../../types/product'

export function ProductCatalog({
  searchQuery,
  selectedCategories,
  currentPage,
  itemsPerPage,
  cart,
  paginatedProducts,
  totalPages,
  allCategories,
  onSearchChange,
  onCategoryChange,
  onPageChange,
  onItemsPerPageChange,
  onAddToCart,
  onUpdateQuantity,
}: ProductCatalogProps) {
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          Product Catalog
          <Info className="h-5 w-5 text-muted-foreground" aria-label="Product catalog information" />
        </h2>
        <div className="flex gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="default">
                Filter
                <Filter className="w-4 h-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Filter by Category</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {allCategories.map(category => (
                <DropdownMenuCheckboxItem
                  key={category}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={(checked) => {
                    onCategoryChange(
                      checked
                        ? [...selectedCategories, category]
                        : selectedCategories.filter(c => c !== category)
                    )
                  }}
                >
                  {category}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" aria-hidden="true" />
            <Input
              placeholder="Search Product"
              className="pl-10 w-[200px]"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              aria-label="Search products"
            />
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        {paginatedProducts.map(product => (
         <ProductCard
            key={product.id}
            product={product}
            cartItems={cart}
            onAddToCart={() => onAddToCart(product.id)}
            onUpdateQuantity={(productId: string, newQuantity: number) => onUpdateQuantity(productId, newQuantity)}
          />
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Data View:</span>
          <Select
            value={itemsPerPage.toString()}
            onValueChange={(value) => {
              onItemsPerPageChange(Number(value));
              onPageChange(1);
            }}
          >
            <SelectTrigger className="w-[70px]">
              <SelectValue placeholder="5" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-sm text-muted-foreground">
            Result {(currentPage - 1) * itemsPerPage + 1} of {paginatedProducts.length} Data
          </span>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  )
}

