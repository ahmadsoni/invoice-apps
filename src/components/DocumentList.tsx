import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, User, LogOut, Edit, Trash2, Calendar, Phone, MapPin, Clock } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useState, useEffect } from "react";
import { useInvoices } from "@/hooks/use-invoices";
import { Badge } from "@/components/ui/badge";
import useEditorModeStore from "@/store/editorModeStore";
import useInvoiceStore from "@/store/invoiceStore";
import { toast } from "react-toastify";

export function DocumentList() {
  const navigate = useNavigate();
  const { setInvoiceData, resetInvoiceData } = useInvoiceStore((state) => ({
     setInvoiceData: state.setInvoiceData,
     resetInvoiceData: state.resetInvoiceData,
    }));
  const { user, userName, logout } = useAuthStore();
  const { invoices, error, getInvoiceByUserId, deleteInvoice, getInvoiceById} = useInvoices();
  const [filteredInvoices, setFilteredInvoices] = useState(invoices);
  const [initialLoading, setInitialLoading] = useState(true);
  const { setMode, resetMode } = useEditorModeStore();
  useEffect(() => {
    const fetchInvoices = async () => {
      if (user?.uid) {
        try {
          const fetchedInvoices = await getInvoiceByUserId(user.uid);
          setFilteredInvoices(fetchedInvoices);
        } catch (error) {
          console.error("Error fetching invoices:", error);
        } finally {
          setInitialLoading(false);
        }
      }
    };

    fetchInvoices();
  }, [user?.uid, getInvoiceByUserId]);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const handleDelete = async (id: string) => {
    await deleteInvoice(id);
  };
  useEffect(() => {
    resetInvoiceData();
  }, [])
  const handleEditInvoice = async (id: string) => {
    try {
      setMode("update", id);
      const updateInvoiceData = await getInvoiceById(id); 
      if (!updateInvoiceData) {
        throw new Error("Invoice data not found or invalid.");
      }
      setInvoiceData(updateInvoiceData);
      navigate("/create-invoice");
    } catch (error) {
      console.error("Failed to edit invoice:", error);
      toast.error("An unexpected error occurred while editing the invoice.", {
        position: "top-right",
        autoClose: 5000, 
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  
  const handleCreateInvoice = () => {
    resetMode();
    navigate("/create-invoice")
  }
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return ''; 
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (dueDate: string | undefined, date: string | undefined) => {
      if (!dueDate || !date) return 'bg-gray-500'; 
      const due = new Date(dueDate);
      const dateIn = new Date(date);
      const today = new Date(); 
      if (due < today) {
        return 'bg-red-500'; 
      } 
      else if (due < dateIn) {
        return 'bg-red-500';
      } 
      else if (due.getTime() - dateIn.getTime() < 7 * 24 * 60 * 60 * 1000) {
        return 'bg-yellow-500'; 
      }

      return 'bg-green-500'; 
    };

  return (
    <div className="flex flex-col h-screen w-full bg-gray-50">
      <nav className="flex justify-between items-center p-4 bg-white border-b shadow-sm">
        <h1 className="text-2xl font-bold text-primary">Invoice App</h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
              <Avatar className="h-12 w-12 font-bold bg-primary">
                <AvatarFallback>{user!.displayName![0] ?? 'U'}</AvatarFallback>
              </Avatar>
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
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Invoice List</h2>
            <p className="text-gray-500 text-sm mt-1">Manage your invoices</p>
          </div>
          <Button 
            onClick={handleCreateInvoice}
            className="px-6"
          >
            Create Invoice
          </Button>
        </div>
        <ScrollArea className="h-[400px] flex-1 rounded-lg border bg-white shadow-sm">
          {initialLoading ? (
            <div className="col-span-full text-center py-20 text-gray-500">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              Loading invoices...
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
              {error && (
                <div className="col-span-full text-center py-8 text-red-600">
                  Error: {error}
                </div>
              )}
              
              {filteredInvoices.length === 0 && !error && (
                <div className="col-span-full text-center py-16">
                  <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">No invoices found</p>
                  <p className="text-gray-400 text-sm">Create your first invoice!</p>
                </div>
              )}
              {filteredInvoices.map((invoice) => (
                <Card key={invoice.id} className="group hover:shadow-md transition-shadow duration-200">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <FileText className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg font-semibold">{invoice?.company?.name}</CardTitle>
                        <p className="text-sm text-gray-500">#{invoice?.invoice?.number}</p>
                      </div>
                    </div>
                    <Badge 
                      className={`${getStatusColor(invoice?.invoice?.dueDate, invoice?.invoice?.date)} text-white`}
                    >
                      {
                        new Date(invoice?.invoice?.dueDate ?? '1970-01-01') < new Date()
                          ? 'Overdue' 
                          : new Date(invoice?.invoice?.dueDate ?? '1970-01-01') < new Date(invoice?.invoice?.date ?? '1970-01-01') 
                          ? 'Overdue'
                          : 'Active' 
                      }
                    </Badge>
                  </CardHeader>

                  <CardContent className="pt-4">
                    <div className="space-y-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                        {invoice?.company?.address}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone className="h-4 w-4 mr-2 text-gray-400" />
                        {invoice?.company?.phone}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                        {formatDate(invoice?.invoice?.date)}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-2 text-gray-400" />
                        Due: {formatDate(invoice?.invoice?.dueDate)}
                      </div>
                    </div>

                    <div className="flex justify-between mt-6 pt-4 border-t">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEditInvoice(invoice?.id || "0")}
                        className="w-[48%] transition-colors"
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleDelete(invoice?.id || '0')}
                        className="w-[48%] transition-colors"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </ScrollArea>
      </div>
    </div>
  );
}