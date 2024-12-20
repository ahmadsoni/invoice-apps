import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Button } from "../ui/button";

interface InvoiceHeaderProps {
  companyName: string;
  address: string;
  phone: string;
  invoiceNumber: string;
  date: string;
  dueDate: string;
  onInvoiceNumberChange?: (value: string) => void;
  onDateChange?: (value: string) => void;
  onDueDateChange?: (value: string) => void;
}

export function InvoiceHeader({
  companyName,
  address,
  phone,
  invoiceNumber,
  date,
  dueDate,
  onInvoiceNumberChange,
  onDateChange,
  onDueDateChange,
}: InvoiceHeaderProps) {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-row gap-6">
            <div className="w-24 h-24 rounded-full overflow-hidden">
              <img
                src="/src/assets/logo-company.png"
                alt="Company Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 space-y-3">
              <Input
                value={companyName}
                className="bg-muted/50 hover:cursor-default"
                readOnly
              />
              <Input
                value={address}
                className="bg-muted/50 hover:cursor-default"
                readOnly
              />
              <Input
                value={phone}
                className="bg-muted/50 hover:cursor-default"
                readOnly
              />
            </div>
          </div>
          <div className="grid grid-cols-1">
            <div className="grid grid-cols-2 gap-2 justify-center items-center">
              <Label className="text-sm font-medium">Invoice ID</Label>
              <Input
                value={invoiceNumber}
                onChange={(e) => onInvoiceNumberChange?.(e.target.value)}
                className="mt-1.5"
                readOnly={!onInvoiceNumberChange}
              />
            </div>
            <div className="grid grid-cols-2 gap-2 justify-center items-center">
              <Button
                variant="outline"
                className="text-start flex justify-start mt-1 hover:cursor-default"
              >
                Date
              </Button>
              <Input
                type="date"
                value={date}
                onChange={(e) => onDateChange?.(e.target.value)}
                className="mt-1.5 bg-muted/50"
                readOnly
              />
            </div>
            <div className="flex flex-row gap-2 justify-center items-center">
              <Button
                variant="outline"
                className="text-start flex justify-start mt-1 hover:cursor-default"
              >
                Due Date
              </Button>
              <Input
                type="date"
                value={dueDate}
                onChange={(e) => onDueDateChange?.(e.target.value)}
                className="mt-1.5 bg-muted/50"
                readOnly
              />
            </div>
          </div>
        </div>
        <hr className="border-1 my-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-row gap-2 justify-center items-center">
            <Button variant={'outline'} className="text-start flex justify-start mt-1 hover:cursor-default w-1/3">Bill to</Button>
            <Input
              placeholder="Invoice recipient name"
              className="mt-1.5"
            />
          </div>
          <div className="flex flex-row gap-2 justify-center items-center">
            <Button variant={'outline'} className="text-start flex justify-start mt-1 hover:cursor-default w-1/3">Ship to</Button>
            <Input
              placeholder="Invoice recipient address"
              className="mt-1.5"
            />
          </div>
        </div>
      </div>
    </Card>
  );
}

