import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Info } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { formatToRupiah } from "@/lib/formater";
import useInvoiceStore from "@/store/invoiceStore";



function TransactionDetail({
  title,
  description,
  operator,
  additionalInfoNumberOne,
  additionalInfoNumberTwo,
  amount,
  amountDescription,
  isHighlighted = false,
}: {
  title: string;
  description: string;
  operator: string;
  additionalInfoNumberOne: number;
  additionalInfoNumberTwo: number;
  amount: number;
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
          {additionalInfoNumberOne} {operator} {additionalInfoNumberTwo}
        </p>
      </div>
      <div className="flex items-end flex-col">
        <p>{amountDescription}</p>
        <p
          className={`font-bold text-lg ${
            isHighlighted ? "text-blue-600" : ""
          }`}
        >
          {formatToRupiah(amount)}
        </p>
      </div>
    </div>
  );
}

export function InvoiceNotes() {
   const { invoiceData, setInvoiceData } = useInvoiceStore((state) => ({
    invoiceData: state.getInvoiceData(),
    setInvoiceData: state.setInvoiceData,
  }));
  
  const customerCharge =
  invoiceData?.payment?.netPayment === undefined || invoiceData?.payment?.transactionFee === undefined
    ? 0
    : (invoiceData?.payment?.netPayment ?? 0) - (invoiceData.payment.transactionFee ?? 0);

const amountTransfer =
  customerCharge === 0 || invoiceData?.payment?.transactionFee === undefined
    ? 0
    : customerCharge + (invoiceData.payment.transactionFee ?? 0);



    const handleCopyLinkModeChange = (value: boolean) => {
       setInvoiceData({
        payment: {
          paymentLinkActive: value
        }
      })
    }
  return (
    <Card className="p-6">
      <div className="space-y-6">
        {/* Payment Link Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold">Payment Link</h3>
            <Switch
              id="copy-link-mode"
              checked={invoiceData?.payment?.paymentLinkActive}
              onClick={() => handleCopyLinkModeChange(!invoiceData?.payment?.paymentLinkActive)}
            />
          </div>
          {invoiceData?.payment?.paymentLinkActive && (
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
            additionalInfoNumberOne={invoiceData?.payment?.netPayment ?? 0}
            additionalInfoNumberTwo={invoiceData?.payment?.transactionFee ?? 0}
            operator="-"
            amount={customerCharge}
            amountDescription="Amount Transferred to You"
            isHighlighted
          />
          <TransactionDetail
            title="Settlement: Auto Transfer to Bank"
            description="This is your net earnings after the auto transfer fee is deducted"
            additionalInfoNumberOne={customerCharge}
            additionalInfoNumberTwo={invoiceData?.payment?.transactionFee ?? 0}
            operator="+"
            amount={amountTransfer}
            amountDescription="Amount Transferred to You"
          />
        </div>
      </div>
    </Card>
  );
}
