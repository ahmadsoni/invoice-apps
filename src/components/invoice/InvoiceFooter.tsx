import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Info, Trash2 } from "lucide-react";
import { Card } from "../ui/card";
import { IconCirclePlusFilled, IconDiscountFilled, IconReceiptTax } from "@tabler/icons-react";

interface InvoiceFooterProps {
  paymentNotes: string;
  bankAccount: string;
  terms: string;
  onPaymentNotesChange: (value: string) => void;
  onBankAccountChange: (value: string) => void;
  onTermsChange: (value: string) => void;
}

interface DynamicField {
  id: number;
  type: "promo" | "vat";
  value: number;
}

export default function InvoiceFooter({
  paymentNotes,
  bankAccount,
  terms,
  onPaymentNotesChange,
  onBankAccountChange,
  onTermsChange,
}: InvoiceFooterProps) {
  const [grandTotal, setGrandTotal] = useState(555000);
  const [promoFields, setPromoFields] = useState<DynamicField[]>([]);
  const [vatFields, setVatFields] = useState<DynamicField[]>([]);

  const formatRupiah = (value: number): string => {
    const data = new Intl.NumberFormat("id-ID").format(Math.abs(value));
    return data === "NaN" ? "0" : data;
  };

  const handleAddPromoField = () => {
    setPromoFields((prevFields) => [
      ...prevFields,
      { id: Date.now(), type: "promo", value: 0 },
    ]);
  };

  const handleAddVatField = () => {
    setVatFields((prevFields) => [
      ...prevFields,
      { id: Date.now(), type: "vat", value: 0 },
    ]);
  };

  const handleFieldChange = (id: number, value: string, type: "promo" | "vat") => {
    const numericValue = parseFloat(value.replace(/\D/g, "")) || 0;
    if (type === "promo") {
      setPromoFields((prevFields) =>
        prevFields.map((field) =>
          field.id === id ? { ...field, value: numericValue } : field
        )
      );
    } else if (type === "vat") {
      setVatFields((prevFields) =>
        prevFields.map((field) =>
          field.id === id ? { ...field, value: numericValue } : field
        )
      );
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
  };

  const calculateNetPayment = () => {
    let taxableAmount = grandTotal;

    promoFields.forEach((field) => {
      taxableAmount -= field.value;
    });

    vatFields.forEach((field) => {
      taxableAmount += (taxableAmount * field.value) / 100;
    });

    return taxableAmount;
  };

  const netPayment = calculateNetPayment();
  const isNegative = netPayment < 0;

  return (
    <Card className="p-6 space-y-6">
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
              value={bankAccount}
              onChange={(e) => onBankAccountChange(e.target.value)}
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
              value={terms}
              onChange={(e) => onTermsChange(e.target.value)}
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
                Rp. {formatRupiah(grandTotal)}
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
                      -Rp.
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
                {isNegative ? '-' : ''} Rp. {formatRupiah(netPayment)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
