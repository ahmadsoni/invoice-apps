import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Minus, Trash2 } from 'lucide-react';
import { CartItem } from "@/types/product";
import { formatToRupiah } from "@/lib/formater";

type InvoiceTableProps = {
  items: CartItem[];
  onQuantityChange: (productId: string, variantSize: string | undefined, variantFlavor: string | undefined, newQuantity: number) => void;
  onRemoveItem: (productId: string, variantSize: string | undefined, variantFlavor: string | undefined) => void;
  onShowCatalog: () => void;
  grandTotal: number;
};


export function InvoiceTable({
  items,
  onQuantityChange,
  onRemoveItem,
  onShowCatalog,
  grandTotal
}: InvoiceTableProps) {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Invoice Table</h3>
        <Button variant="outline" size="sm" onClick={onShowCatalog}>
          Catalog
        </Button>
      </div>
      
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-[50%]">Product</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead className="text-right">Sub Total</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={`${item.product.id}-${item.selectedVariant.size}-${item.selectedVariant.flavor}`}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div>
                      <div className="font-medium">{item.product.name}</div>
                      <div className="text-sm text-muted-foreground">
                        Rp {formatToRupiah(item.selectedVariant.price)}
                      </div>
                      {item.selectedVariant.size && (
                        <div className="text-sm text-muted-foreground">
                          Size: {item.selectedVariant.size}
                        </div>
                      )}
                      {item.selectedVariant.flavor && (
                        <div className="text-sm text-muted-foreground">
                          Flavor: {item.selectedVariant.flavor}
                        </div>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() =>
                        onQuantityChange(item.product.id, item.selectedVariant.size, item.selectedVariant.flavor, Math.max(0, item.quantity - 1))
                      }
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => onQuantityChange(item.product.id, item.selectedVariant.size, item.selectedVariant.flavor, item.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
                <TableCell className="text-right font-medium">
                  Rp {formatToRupiah(item.selectedVariant.price * item.quantity)}
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => onRemoveItem(item.product.id, item.selectedVariant.size, item.selectedVariant.flavor)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex justify-between text-base font-bold pt-2 border-t">
          <span>Total</span>
          <span>Rp {formatToRupiah(grandTotal)}</span>
        </div>
      </div>
    </Card>
  );
}

