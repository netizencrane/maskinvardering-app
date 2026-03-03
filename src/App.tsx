import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { AuthProvider } from "@/contexts/AuthContext";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import Index from "./pages/Index";
import MachineDetail from "./pages/MachineDetail";
import ValuationDashboard from "./pages/ValuationDashboard";
import ValuationFlow from "./pages/ValuationFlow";
import ValuationResultPage from "./pages/ValuationResultPage";
import Bildanalys from "./pages/Bildanalys";
import Videoanalys from "./pages/Videoanalys";
import AIVisionVerification from "./pages/AIVisionVerification";
import Marknadsmonitor from "./pages/Marknadsmonitor";
import Ekonomi from "./pages/Ekonomi";
import ExitPrognos from "./pages/ExitPrognos";
import Sekretess from "./pages/Sekretess";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import AuthCallback from "./pages/AuthCallback";
import NotFound from "./pages/NotFound";
import { useAuth } from "@/contexts/AuthContext";

const queryClient = new QueryClient();

/** Redirect unauthenticated users to login. */
function RequireAuth({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/logga-in" replace />;
  return <>{children}</>;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public auth routes */}
            <Route path="/logga-in" element={<LoginPage />} />
            <Route path="/skapa-konto" element={<SignUpPage />} />
            <Route path="/auth/callback" element={<AuthCallback />} />

            {/* Protected dashboard routes */}
            <Route
              path="/"
              element={
                <RequireAuth>
                  <DashboardLayout><Index /></DashboardLayout>
                </RequireAuth>
              }
            />
            <Route
              path="/vardera"
              element={
                <RequireAuth>
                  <DashboardLayout><ValuationFlow embedded /></DashboardLayout>
                </RequireAuth>
              }
            />
            <Route
              path="/resultat"
              element={
                <RequireAuth>
                  <DashboardLayout><ValuationResultPage /></DashboardLayout>
                </RequireAuth>
              }
            />
            <Route
              path="/varderingar"
              element={
                <RequireAuth>
                  <DashboardLayout><ValuationDashboard /></DashboardLayout>
                </RequireAuth>
              }
            />
            <Route
              path="/maskin/:id"
              element={
                <RequireAuth>
                  <DashboardLayout><MachineDetail /></DashboardLayout>
                </RequireAuth>
              }
            />
            <Route
              path="/bildanalys"
              element={
                <RequireAuth>
                  <DashboardLayout><Bildanalys /></DashboardLayout>
                </RequireAuth>
              }
            />
            <Route
              path="/videoanalys"
              element={
                <RequireAuth>
                  <DashboardLayout><Videoanalys /></DashboardLayout>
                </RequireAuth>
              }
            />
            <Route
              path="/ai-vision"
              element={
                <RequireAuth>
                  <DashboardLayout><AIVisionVerification /></DashboardLayout>
                </RequireAuth>
              }
            />
            <Route
              path="/marknad"
              element={
                <RequireAuth>
                  <DashboardLayout><Marknadsmonitor /></DashboardLayout>
                </RequireAuth>
              }
            />
            <Route
              path="/ekonomi"
              element={
                <RequireAuth>
                  <DashboardLayout><Ekonomi /></DashboardLayout>
                </RequireAuth>
              }
            />
            <Route
              path="/exit-prognos"
              element={
                <RequireAuth>
                  <DashboardLayout><ExitPrognos /></DashboardLayout>
                </RequireAuth>
              }
            />
            <Route
              path="/sekretess"
              element={
                <RequireAuth>
                  <DashboardLayout><Sekretess /></DashboardLayout>
                </RequireAuth>
              }
            />
            <Route
              path="/app/rapporter"
              element={
                <RequireAuth>
                  <DashboardLayout>
                    <div className="space-y-6">
                      <h1 className="text-2xl font-extrabold tracking-tight">Rapporter</h1>
                      <p className="text-muted-foreground">Dina Bank-Ready rapporter och värderingsintyg visas här.</p>
                    </div>
                  </DashboardLayout>
                </RequireAuth>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
