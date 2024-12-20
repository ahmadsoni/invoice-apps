import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useInvoiceStore } from "@/store/invoiceStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText } from "lucide-react";

export function DocumentList() {
  const navigate = useNavigate();
  const documents = useInvoiceStore((state: any) => state.documents);

  return (
    <div className="flex flex-col h-screen w-full px-8 py-8">
      <div className="flex w-full justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Document List</h1>
        <Button onClick={() => navigate("/create-invoice")}>
          Create Document
        </Button>
      </div>

      <ScrollArea className="flex-1 rounded-md border">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {documents.map((document: any) => (
            <Card key={document.id}>
              <CardHeader className="flex flex-row items-center gap-4">
                <FileText className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle className="text-xl">{document.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Invoice #{document.invoiceNumber}
                  </p>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p>Date: {document.date}</p>
                  <p>Due Date: {document.dueDate}</p>
                  <p>Total: Rp {document.total.toLocaleString()}</p>
                </div>
              </CardContent>
            </Card>
          ))}
          {documents.length === 0 && (
            <div className="col-span-full text-center py-8 text-muted-foreground">
              No documents found. Create your first invoice!
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
