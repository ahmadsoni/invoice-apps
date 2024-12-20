import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DocumentList } from './components/DocumentList';
import { CreateInvoice } from './components/CreateInvoice';
import { Toaster } from '@/components/ui/sonner';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background w-full">
        <Routes>
          <Route path="/" element={<DocumentList />} />
          <Route path="/create-invoice" element={<CreateInvoice />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;