import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Sales from "./pages/Sales";
import GenerateBill from "./pages/GenerateBill";
import PrintPDF from "./pages/PrintPDF";
import Reports from "./pages/Reports";
import Analytics from "./pages/Analytics";
import ProfitLoss from "./pages/ProfitLoss";
import Customers from "./pages/Customers";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/generate-bill" element={<GenerateBill />} />
          <Route path="/print-pdf" element={<PrintPDF />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/profit-loss" element={<ProfitLoss />} />
          <Route path="/sales-reports" element={<Reports />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/notifications" element={<Index />} />
          <Route path="/profile" element={<Settings />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
