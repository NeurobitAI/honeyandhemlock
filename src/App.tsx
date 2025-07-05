
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Films from "./pages/Films";
import ScriptPortal from "./pages/ScriptPortal";
import AdminLogin from "./pages/AdminLogin";
import JudgeLogin from "./pages/JudgeLogin";
import JudgeSignup from "./pages/JudgeSignup";
import AdminDashboard from "./pages/AdminDashboard";
import JudgeDashboard from "./pages/JudgeDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/films" element={<Films />} />
            <Route path="/script-portal" element={<ScriptPortal />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/judge" element={<JudgeLogin />} />
            <Route path="/judge-signup" element={<JudgeSignup />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/judge-dashboard" element={<JudgeDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
