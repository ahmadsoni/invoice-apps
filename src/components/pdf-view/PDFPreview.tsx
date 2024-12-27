import React, { useState, useEffect } from 'react';
import { InvoiceData } from '@/types/invoice';
import { PDFView } from './PDFView';
import { pdf } from '@react-pdf/renderer';
import { Spinner } from '../ui/spinner';
import { Download } from 'lucide-react';

interface PDFPreviewProps {
  data: InvoiceData | null;
}

export const PDFPreview: React.FC<PDFPreviewProps> = ({ data }) => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (data) {
      const generatePdf = async () => {
        try {
          setIsLoading(true);
          setError(null);
          
          // Generate PDF
          const pdfDoc = <PDFView data={data} />;
          const blob = await pdf(pdfDoc).toBlob();
          setPdfBlob(blob);
          
          // Convert blob to base64 URL
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64data = reader.result as string;
            setPdfUrl(base64data);
            setIsLoading(false);
          };
          reader.onerror = () => {
            setError('Failed to generate PDF preview');
            setIsLoading(false);
          };
          reader.readAsDataURL(blob);
          
        } catch (err) {
          console.error('Error generating PDF:', err);
          setError('Failed to generate PDF. Please try again.');
          setIsLoading(false);
        }
      };
      generatePdf();
    }
  }, [data]);

  const handleDownload = () => {
    if (pdfBlob) {
      const url = window.URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `invoice-${Date.now()}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    }
  };

  if (!data) {
    return <div className="text-center text-gray-600">No invoice data available</div>;
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4">
        <Spinner size="lg" />
        <p className="text-gray-600">Generating PDF preview...</p>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-600">{error}</div>;
  }

  return (
    <div className="pdf-preview flex flex-col w-full">
      <div className="flex justify-end mb-4">
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          <Download size={20} />
          Download PDF
        </button>
      </div>
      {pdfUrl && (
        <iframe
          src={pdfUrl}
          className="w-full h-[600px] border-0"
          title="PDF Preview"
        />
      )}
    </div>
  );
};