import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Info } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";


function TransactionDetail({
  title,
  description,
  additionalInfo,
  amount,
  amountDescription,
  isHighlighted = false,
}: {
  title: string;
  description: string;
  additionalInfo: string;
  amount: string;
  amountDescription: string;
  isHighlighted?: boolean;
}) {
  return (
    <div className="rounded-lg border p-4 flex justify-between">
      <div className="flex flex-col items-start mb-1">
        <div className="flex items-center gap-2">
          <span>{title}</span>
          <Info className="h-4 w-4 text-muted-foreground" />
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
        <p className="text-xs text-slate-400 font-semibold mt-1">
          {additionalInfo}
        </p>
      </div>
      <div className="flex items-end flex-col">
        <p>{amountDescription}</p>
        <p
          className={`font-bold text-lg ${
            isHighlighted ? "text-blue-600" : ""
          }`}
        >
          {amount}
        </p>
      </div>
    </div>
  );
}

export function InvoiceNotes() {
  const [paymentLink, setPaymentLink] = useState(true);

  return (
    <Card className="p-6">
      <div className="space-y-6">
        {/* Payment Link Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold">Payment Link</h3>
            <Switch
              id="copy-link-mode"
              checked={paymentLink}
              onClick={() => setPaymentLink(!paymentLink)}
            />
          </div>
          {paymentLink && (
            <div className="flex gap-4">
              <Input
                value="The payment link will appear after you create the invoice document"
                readOnly
                className="bg-muted/50 border-black font-semibold"
              />
            </div>
          )}
        </div>

        {/* Transaction Details */}
        <div className="space-y-4">
          <TransactionDetail
            title="Transaction Fee: Charge Customer"
            description="The full amount the customer will pay, including the transaction fee"
            additionalInfo="Rp 493.950 + Rp 10.000"
            amount="Rp 503.950"
            amountDescription="Amount Transferred to You"
            isHighlighted
          />
          <TransactionDetail
            title="Settlement: Auto Transfer to Bank"
            description="This is your net earnings after the auto transfer fee is deducted"
            additionalInfo="Rp 503.950 - Rp 10.000"
            amount="Rp 493.950"
            amountDescription="Amount Transferred to You"
          />
        </div>
      </div>
    </Card>
  );
}
