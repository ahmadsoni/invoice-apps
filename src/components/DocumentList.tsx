import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, User, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useDocumentStore } from "@/store/documentStore";


export function DocumentList() {
  const navigate = useNavigate();
  const { documents, deleteDocument } = useDocumentStore();
  const { user, userName, logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const handleDelete = (id: string) => {
    deleteDocument(id);
  };

  return (
    <div className="flex flex-col h-screen w-full">
      <nav className="flex justify-between items-center p-4 bg-background border-b">
        <h1 className="text-2xl font-bold">Invoice App</h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="relative h-10 w-10 rounded-full bg-primary text-black">
              <Avatar className="h-10 w-10">
                <AvatarFallback>{userName?.[0] || user?.email?.[0]}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuItem className="flex items-center">
              <User className="mr-2 h-4 w-4" />
              <span>{userName || user?.email}</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout} className="flex items-center text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
      <div className="flex flex-col flex-1 px-8 py-8">
        <div className="flex w-full justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Document List</h2>
          <Button onClick={() => navigate("/create-invoice")}>
            Create Document
          </Button>
        </div>
        <ScrollArea className="flex-1 rounded-md border">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {documents.map((document) => (
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
                <div className="p-4 flex justify-between">
                  <Button variant="outline" onClick={() => handleDelete(document.id)}>
                    Delete
                  </Button>
                </div>
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
    </div>
  );
}
