import { styles } from "@/assets/styles/pdfStyles";
import { InvoiceData } from "@/types/invoice";
import { Document, Font, Page, View } from "@react-pdf/renderer";
import { PDFHeader } from "./PDFViewHeader";
import { PDFBody } from "./PDFViewBody";
import { PDFFooter } from "./PDFViewFooter";
import InterRegular from '@/assets/font/Inter-Regular.ttf';
import InterMedium from '@/assets/font/Inter-Medium.ttf';
import InterBold from '@/assets/font/Inter-Bold.ttf';

Font.register({
  family: 'Inter',
  fonts: [
    { src: InterRegular, fontWeight: 'normal' },
    { src: InterMedium, fontWeight: 'medium' },
    { src: InterBold, fontWeight: 'bold' },
  ],
});



export const PDFView = ({ data }: { data: InvoiceData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <PDFHeader data={data} />
      <View style={styles.headerLine}></View>
      <PDFBody data={data} />
      <PDFFooter data={data} />
    </Page>
  </Document>
);

