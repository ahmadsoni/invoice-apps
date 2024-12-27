import { styles } from "@/assets/styles/pdfStyles";
import { formatCurrency } from "@/lib/formater";
import { InvoiceData } from "@/types/invoice";
import { View, Text } from "@react-pdf/renderer";


export const PDFFooter = ({ data }: { data: InvoiceData }) => (
  <View style={styles.invoiceFooter}>
    {data.payment?.paymentLinkActive && (
      <View style={[styles.invoiceFooterLeft, { width: `49.4vw` }]}>
        <Text style={styles.netPaymentText2}>Payment Link:</Text>
        <Text style={styles.netPaymentText2}>{data.payment.bankAccount}</Text>
      </View>
    )}
    <View style={[styles.invoiceFooterRight, { width: data.payment?.paymentLinkActive ? `49.4vw` : `98.8vw` }]}>
      <FooterRow label="Subtotal" value={formatCurrency(data.payment?.grandTotal ?? 0)} />
      <FooterRow label="Tax" value={formatCurrency(data.payment?.totalValueVat ?? 0)} />
      <FooterRow label="Total" value={formatCurrency(data.payment?.totalAmount ?? 0)} isBold />
    </View>
  </View>
);

const FooterRow = ({ label, value, isBold = false }: { label: string; value: string; isBold?: boolean }) => (
  <View style={styles.netPayment}>
    <Text style={styles.netPaymentText1}>{label}</Text>
    <Text style={styles.netPaymentText2}>:</Text>
    <Text style={isBold ? styles.netPaymentText3 : styles.netPaymentText2}>{value}</Text>
  </View>
);

