import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { DocumentList } from '@/components/DocumentList';
import { CreateInvoice } from '@/components/CreateInvoice';
import { Toaster } from '@/components/ui/sonner';
import { ProtectedRoute } from '@/components/auth/ProtectedRouter';
import LoginPage from '@/components/auth/Login';
import RegisterPage from '@/components/auth/Register';
import { StoreProvider } from '@/components/StoreProvider';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <StoreProvider>
      <Router>
        <div className="min-h-screen bg-background w-full">
          <Routes>
            <Route path="/login" element={
            <LoginPage />
            } />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <DocumentList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/create-invoice"
              element={
                <ProtectedRoute>
                  <CreateInvoice />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
          <Toaster />
          <ToastContainer />
        </div>
      </Router>
    </StoreProvider>
  );
}

export default App;

