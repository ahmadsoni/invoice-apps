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
import { Plus, Minus, Trash2 } from "lucide-react";
import { formatToRupiah } from "@/lib/formater";
import { Product } from "@/types/product";

type InvoiceTableProps = {
  items: Array<{ productId: string; quantity: number }>;
  onQuantityChange: (productId: string, newQuantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onShowCatalog: () => void;
  grandTotal: number;
  products: Product[];
};

export function InvoiceTable({
  items,
  onQuantityChange,
  onRemoveItem,
  onShowCatalog,
  grandTotal,
  products,
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
            {items.map((item) => {
              const product = products.find((p) => p.id === item.productId);
              if (!product) return null;

              const price = product.basePrice;
              const subTotal = price * item.quantity;

              return (
                <TableRow key={item.productId}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {formatToRupiah(price)}
                        </div>
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
                          onQuantityChange(item.productId, Math.max(0, item.quantity - 1))
                        }
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          onQuantityChange(item.productId, item.quantity + 1)
                        }
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {formatToRupiah(subTotal)}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => onRemoveItem(item.productId)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex justify-between text-base font-bold pt-2 border-t">
          <span>Total</span>
          <span>{formatToRupiah(grandTotal)}</span>
        </div>
      </div>
    </Card>
  );
}
