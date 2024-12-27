import { InvoiceData } from "@/types/invoice";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { PDFView } from "./PDFView";


export const PDFInvoice = ({ data }: { data: InvoiceData }) => {
  return (
    <div>
      <PDFDownloadLink
        document={<PDFView data={data} />}
        fileName={`invoice-${data.id || 'unknown'}.pdf`}
      >
      Download
      </PDFDownloadLink>
    </div>
  );
};

