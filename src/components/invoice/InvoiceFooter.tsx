import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Info, Trash2 } from 'lucide-react';
import { Card } from "../ui/card";
import { IconCirclePlusFilled, IconDiscountFilled, IconReceiptTax } from "@tabler/icons-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { formatToRupiah } from "@/lib/formater";
import useInvoiceStore from "@/store/invoiceStore";


interface DynamicField {
  id: number;
  type: "promo" | "vat";
  value: number;
}

export default function InvoiceFooter() {
  const { invoiceData, setInvoiceData } = useInvoiceStore((state) => ({
    invoiceData: state.getInvoiceData(),
    setInvoiceData: state.setInvoiceData,
  }));
   const [promoFields, setPromoFields] = useState<DynamicField[]>([]);
  const [vatFields, setVatFields] = useState<DynamicField[]>([]);
  const [error, setError] = useState<string | null>(null);
  const handleAddPromoField = () => {
    setPromoFields((prevFields) => [
      ...prevFields,
      { id: Date.now(), type: "promo", value: 0 },
    ]);
    setError(null);
  };

  const handleAddVatField = () => {
    setVatFields((prevFields) => [
      ...prevFields,
      { id: Date.now(), type: "vat", value: 0 },
    ]);
    setError(null);
  };

  const handleFieldChange = (id: number, value: string, type: "promo" | "vat") => {
    const numericValue = parseFloat(value.replace(/\D/g, "")) ?? 0;
    
    if (type === "promo") {
      const newPromoFields = promoFields.map((field) =>
        field.id === id ? { ...field, value: numericValue } : field
      );
      const totalDiscount = newPromoFields.reduce((sum, field) => sum + field.value, 0);
      if (totalDiscount > (invoiceData?.payment?.grandTotal ?? 0)) {
        setError("Total discount cannot exceed grand total amount");
        return;
      }
      
      setPromoFields(newPromoFields);
      setError(null);
    } else if (type === "vat") {
      if (numericValue > 100) {
        setError("VAT percentage cannot exceed 100%");
        return;
      }
      
      setVatFields((prevFields) =>
        prevFields.map((field) =>
          field.id === id ? { ...field, value: numericValue } : field
        )
      );
      setError(null);
    }
  };

  const handleRemoveField = (id: number, type: "promo" | "vat") => {
    if (type === "promo") {
      setPromoFields((prevFields) =>
        prevFields.filter((field) => field.id !== id)
      );
    } else if (type === "vat") {
      setVatFields((prevFields) =>
        prevFields.filter((field) => field.id !== id)
      );
    }
    setError(null);
  };
  const calculateTotalDiscount = () => {
      return promoFields.reduce((sum, field) => sum + field.value, 0);
    };
  const calculateNetPayment = () => {
    const totalDiscount = calculateTotalDiscount();
    let afterDiscount = (invoiceData?.payment?.grandTotal ?? 0) - totalDiscount;
    const totalVatAmount = vatFields.reduce((sum, field) => {
      const vatAmount = (afterDiscount * field.value) / 100;
      return sum + vatAmount;
    }, 0);
    return afterDiscount - totalVatAmount;
  };

  

  const calculateTotalVat = () => {
    const afterDiscount = (invoiceData?.payment?.grandTotal ?? 0) - calculateTotalDiscount();
    return vatFields.reduce((sum, field) => {
      const vatAmount = (afterDiscount * field.value) / 100;
      return sum + vatAmount;
    }, 0);
  };

  const calculateAverageVat = () => {
    if (vatFields.length === 0) return 0;
    const totalVatPercentage = vatFields.reduce((sum, field) => sum + field.value, 0);
    return totalVatPercentage / vatFields.length;
  };


  const totalVAT = calculateAverageVat();
  const totalDiscount = calculateTotalDiscount();
  const totalValueVat = calculateTotalVat();
  const netPayment = calculateNetPayment() - totalDiscount;
  const isNegative = netPayment < 0;

  const handleBankAccountChange = (value: string) => {
    setInvoiceData({
      payment: {
        bankAccount: value
      }
    })
  }

  const handleTermsChange = (value:string) => {
    setInvoiceData({
      invoice: {
        terms: value
      }
    })
  }
  
  useEffect(() => {
    setInvoiceData({
      payment: {
        netPayment: netPayment,
        vat: totalVAT,
        totalValueVat: totalValueVat,
        taxableAmount: invoiceData?.payment?.grandTotal ?? 0,
        totalAmount: netPayment,
        grandTotal: invoiceData?.payment?.grandTotal,
      }
    })
    console.log(invoiceData.payment)
  }, [netPayment, totalVAT, invoiceData?.payment?.grandTotal, totalValueVat]);
  
  return (
    <Card className="p-6 space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div className="flex flex-row items-center gap-2">
        <h3 className="text-lg font-semibold">Invoice Footer</h3>
        <Info className="h-5 w-5 text-muted-foreground" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          {/* Notes */}
          <div className="flex flex-col gap-2">
            <Button
              variant={"outline"}
              className="w-52 text-start flex justify-start mt-1 hover:cursor-default"
            >
              Notes e.g "Payment Address"
            </Button>
            <Input
              placeholder="Add Notes 'Bank XYZ, Account: 1234'"
              className="mb-4"
              value={invoiceData?.payment?.bankAccount}
              onChange={(e) => handleBankAccountChange(e.target.value)}
            />
          </div>
          {/* Terms & Conditions */}
          <div className="flex flex-col gap-2">
            <Button
              variant={"outline"}
              className="w-36 text-start flex justify-start mt-1 hover:cursor-default"
            >
              Terms & Conditions
            </Button>
            <Textarea
              placeholder="Add terms and conditions"
              className="h-20"
              value={invoiceData?.invoice?.terms}
              onChange={(e) => handleTermsChange(e.target.value)}
            />
          </div>
        </div>
        <div className="space-y-4 flex flex-col items-end">
          <div className="space-y-4">
            {/* Grand Total */}
            <div className="flex items-center gap-2">
              <Button
                variant={"outline"}
                className="w-32 text-start flex justify-start mt-1 hover:cursor-default"
              >
                Grand Total
              </Button>
              <span className="flex items-center gap-2">
                {formatToRupiah(invoiceData?.payment?.grandTotal ?? 0)}
              </span>
            </div>

            {/* Promo Fields */}
            <div className="space-y-4">
              {promoFields.map((field) => (
                <div key={field.id} className="flex items-center gap-2">
                  <Button
                    variant={"outline"}
                    className="w-32 text-start flex justify-start mt-1 hover:cursor-default"
                  >
                    Promo Discount
                  </Button>
                  <div className="relative flex items-center gap-2">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500">
                      -
                    </span>
                    <Input
                      value={field.value.toString()}
                      onChange={(e) =>
                        handleFieldChange(field.id, e.target.value, "promo")
                      }
                      className="pl-12 text-right w-40 text-red-500"
                    />
                    <Button size="icon" className="hover:cursor-default" variant="destructive">
                      <IconDiscountFilled className="h-5 w-5" />
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => handleRemoveField(field.id, "promo")}
                    >
                      <Trash2 className="h-5 w-5 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
              <div className="flex justify-start mt-4">
                <Button
                  variant="outline"
                  onClick={handleAddPromoField}
                  className="gap-2"
                >
                  <IconCirclePlusFilled className="text-blue-600" />
                  <span className="text-blue-600 font-semibold">
                    Add Promo Discount
                  </span>
                </Button>
              </div>
            </div>

            {/* Total Discount */}
            {promoFields.length > 0 && (
              <div className="flex items-center gap-2">
                <Button
                  variant={"outline"}
                  className="w-32 text-start flex justify-start mt-1 hover:cursor-default"
                >
                  Total Discount
                </Button>
                <span className="flex items-center gap-2 text-red-500">
                  -{formatToRupiah(totalDiscount)}
                </span>
              </div>
            )}

            {/* VAT Fields */}
            <div className="space-y-4 mt-8">
              {vatFields.map((field) => (
                <div key={field.id} className="flex items-center gap-2">
                  <Button
                    variant={"outline"}
                    className="w-32 text-start flex justify-start mt-1 hover:cursor-default"
                  >
                    VAT
                  </Button>
                  <div className="relative flex items-center gap-2">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-destructive">
                      %
                    </span>
                    <Input
                      value={field.value.toString()}
                      onChange={(e) =>
                        handleFieldChange(field.id, e.target.value, "vat")
                      }
                      className="pl-8 text-right w-40 text-destructive"
                    />
                    <Button size="icon" className="hover:cursor-default" variant="destructive">
                      <IconReceiptTax className="h-5 w-5" />
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => handleRemoveField(field.id, "vat")}
                    >
                      <Trash2 className="h-5 w-5 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
              <div className="flex justify-start mt-4">
                <Button
                  variant="outline"
                  onClick={handleAddVatField}
                  className="gap-2"
                >
                  <IconCirclePlusFilled className="text-blue-600" />
                  <span className="text-blue-600 font-semibold">
                    Add VAT
                  </span>
                </Button>
              </div>
            </div>

            {/* Total VAT Amount */}
            {vatFields.length > 0 && (
              <div className="flex items-center gap-2">
                <Button
                  variant={"outline"}
                  className="w-32 text-start flex justify-start mt-1 hover:cursor-default"
                >
                  Total VAT
                </Button>
                <span className="flex items-center gap-2 text-red-500">
                  -{formatToRupiah(totalValueVat)}
                </span>
              </div>
            )}

            <hr className=""/>
            <div className="flex items-center pt-4 gap-2">
              <Button
                variant={"outline"}
                className="w-32 text-start flex justify-start mt-1 hover:cursor-default"
              >
                Net Payment
              </Button>
              <span
                className={`flex items-center gap-2 ${
                  isNegative ? "text-red-500" : "text-green-500"
                }`}
              >
                {isNegative ? "-" : ""} {formatToRupiah(netPayment)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

