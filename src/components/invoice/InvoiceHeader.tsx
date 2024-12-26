import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Button } from "../ui/button";
import useInvoiceStore from "@/store/invoiceStore";
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from 'react';

export function InvoiceHeader() {
  const { invoiceData, setInvoiceData } = useInvoiceStore((state) => ({
    invoiceData: state.getInvoiceData(),
    setInvoiceData: state.setInvoiceData,
  }));

  useEffect(() => {
    if (!invoiceData?.invoice?.number || invoiceData.invoice.number.trim() === '') {
      const newInvoiceId = `INV-${uuidv4().split('-')[0]}`;
      setInvoiceData({
        invoice: {
          ...invoiceData?.invoice,
          number: newInvoiceId,
        },
      });
    }
  }, []); 

  const handleDateChange = (value: string) => {
    setInvoiceData({
      invoice: {
        ...invoiceData?.invoice,
        date: value
      }
    });
  };

  const handleDueDateChange = (value: string) => {
    setInvoiceData({
      invoice: {
        ...invoiceData?.invoice,
        dueDate: value
      }
    });
  };

  const handleBillingTo = (value: string) => {
    setInvoiceData({
      billing: {
        ...invoiceData?.billing,
        billTo: value
      }
    });
  };

  const handleBillToAddress = (value: string) => {
    setInvoiceData({
      billing: {
        ...invoiceData?.billing,
        billToAddress: value
      }
    });
  };

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
                value={invoiceData?.company?.name ?? ''}
                className="bg-muted/50 hover:cursor-default"
                readOnly
              />
              <Input
                value={invoiceData?.company?.address ?? ''}
                className="bg-muted/50 hover:cursor-default"
                readOnly
              />
              <Input
                value={invoiceData?.company?.phone ?? ''}
                className="bg-muted/50 hover:cursor-default"
                readOnly
              />
            </div>
          </div>
          <div className="grid grid-cols-1">
            <div className="grid grid-cols-2 gap-2 justify-center items-center">
              <Label className="text-sm font-medium">Invoice ID</Label>
              <Input
                value={invoiceData?.invoice?.number ?? ''}
                className="bg-muted/50 hover:cursor-default"
                readOnly
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
                value={invoiceData?.invoice?.date ?? ''}
                onChange={(e) => handleDateChange(e.target.value)}
                className="mt-1.5"
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
                value={invoiceData?.invoice?.dueDate ?? ''}
                onChange={(e) => handleDueDateChange(e.target.value)}
                className="mt-1.5"
              />
            </div>
          </div>
        </div>
        <hr className="border-1 my-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-row gap-2 justify-center items-center">
            <Button variant="outline" className="text-start flex justify-start mt-1 hover:cursor-default w-1/3">
              Bill to
            </Button>
            <Input
              placeholder="Invoice recipient name"
              className="mt-1.5"
              value={invoiceData?.billing?.billTo ?? ''}
              onChange={(e) => handleBillingTo(e.target.value)}
            />
          </div>
          <div className="flex flex-row gap-2 justify-center items-center">
            <Button variant="outline" className="text-start flex justify-start mt-1 hover:cursor-default w-1/3">
              Ship to
            </Button>
            <Input
              placeholder="Invoice recipient address"
              className="mt-1.5"
              value={invoiceData?.billing?.billToAddress ?? ''}
              onChange={(e) => handleBillToAddress(e.target.value)}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}