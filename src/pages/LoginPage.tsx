import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Eye, EyeOff, TrendingUp, Camera, Video, Loader2, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";

const usps = [
  { icon: TrendingUp, text: "Indikativt Marknadsvärde på 15 minuter" },
  { icon: Camera, text: "AI Bildanalys – 50 kontrollpunkter" },
  { icon: Video, text: "AI Videoanalys – ljud, hydraulik & avgaser" },
];

export default function LoginPage() {
  const navigate = useNavigate();
  const { signIn, signInWithOAuth } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error: authError } = await signIn(email, password);

    if (authError) {
      if (authError.message.includes("Invalid login credentials")) {
        setError("Felaktig e-post eller lösenord.");
      } else if (authError.message.includes("Email not confirmed")) {
        setError("E-postadressen är inte bekräftad. Kolla din inbox.");
      } else {
        setError(authError.message);
      }
      setLoading(false);
      return;
    }

    navigate("/dashboard");
  };

  const handleGoogleLogin = async () => {
    setError(null);
    setGoogleLoading(true);
    const { error: authError } = await signInWithOAuth("google");
    if (authError) {
      setError("Kunde inte ansluta till Google. Försök igen.");
      setGoogleLoading(false);
    }
    // OAuth redirects the browser – no need to setGoogleLoading(false) on success.
  };

  return (
    <div className="min-h-screen flex">
      {/* Left – Hero / USP */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/80 to-background/60" />
        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-20 py-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link to="/" className="flex items-center gap-3 mb-10 hover:opacity-80 transition-opacity">
              <svg width="40" height="40" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="36" height="36" rx="8" fill="hsl(43 96% 56%)" />
                <circle cx="18" cy="18" r="10" stroke="hsl(222 47% 11%)" strokeWidth="1.5" fill="none" />
                <line x1="18" y1="6" x2="18" y2="12" stroke="hsl(222 47% 11%)" strokeWidth="1.5" />
                <line x1="18" y1="24" x2="18" y2="30" stroke="hsl(222 47% 11%)" strokeWidth="1.5" />
                <line x1="6" y1="18" x2="12" y2="18" stroke="hsl(222 47% 11%)" strokeWidth="1.5" />
                <line x1="24" y1="18" x2="30" y2="18" stroke="hsl(222 47% 11%)" strokeWidth="1.5" />
                <rect x="13" y="20" width="3" height="6" rx="0.5" fill="hsl(222 47% 11%)" />
                <rect x="17" y="17" width="3" height="9" rx="0.5" fill="hsl(222 47% 11%)" />
                <rect x="21" y="14" width="3" height="12" rx="0.5" fill="hsl(222 47% 11%)" />
              </svg>
              <span className="text-xl font-extrabold tracking-tight">
                <span className="text-gradient-gold">Maskin</span>
                <span className="text-foreground">värdering</span>
                <span className="text-muted-foreground">.se</span>
              </span>
            </Link>

            <h1 className="text-3xl xl:text-4xl font-extrabold tracking-tight leading-tight mb-4">
              Fatta rätt beslut.<br />
              <span className="text-gradient-gold">Varje gång.</span>
            </h1>
            <p className="text-muted-foreground text-base leading-relaxed mb-10 max-w-md">
              Nordens mest avancerade plattform för maskinvärdering. AI-driven analys, makroekonomi och expertverifiering i en och samma rapport.
            </p>

            <div className="space-y-8 mt-4">
              {usps.map((usp, i) => (
                <motion.div
                  key={usp.text}
                  className="flex items-start gap-5"
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.15, duration: 0.4 }}
                >
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                    <usp.icon className="w-7 h-7 text-primary" />
                  </div>
                  <span className="text-lg font-semibold text-foreground pt-3">{usp.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right – Login form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 bg-background">
        <motion.div
          className="w-full max-w-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {/* Mobile logo */}
          <Link to="/" className="lg:hidden flex items-center gap-3 mb-8">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="36" height="36" rx="8" fill="hsl(43 96% 56%)" />
              <circle cx="18" cy="18" r="10" stroke="hsl(222 47% 11%)" strokeWidth="1.5" fill="none" />
              <line x1="18" y1="6" x2="18" y2="12" stroke="hsl(222 47% 11%)" strokeWidth="1.5" />
              <line x1="18" y1="24" x2="18" y2="30" stroke="hsl(222 47% 11%)" strokeWidth="1.5" />
              <line x1="6" y1="18" x2="12" y2="18" stroke="hsl(222 47% 11%)" strokeWidth="1.5" />
              <line x1="24" y1="18" x2="30" y2="18" stroke="hsl(222 47% 11%)" strokeWidth="1.5" />
              <rect x="13" y="20" width="3" height="6" rx="0.5" fill="hsl(222 47% 11%)" />
              <rect x="17" y="17" width="3" height="9" rx="0.5" fill="hsl(222 47% 11%)" />
              <rect x="21" y="14" width="3" height="12" rx="0.5" fill="hsl(222 47% 11%)" />
            </svg>
            <span className="text-base font-extrabold tracking-tight">
              <span className="text-gradient-gold">Maskin</span>
              <span className="text-foreground">värdering</span>
              <span className="text-muted-foreground">.se</span>
            </span>
          </Link>

          <h2 className="text-2xl font-extrabold tracking-tight mb-1">Logga in</h2>
          <p className="text-sm text-muted-foreground mb-8">Ange dina uppgifter för att komma åt plattformen.</p>

          {/* Error message */}
          {error && (
            <div className="flex items-start gap-2.5 p-3 rounded-lg bg-destructive/10 border border-destructive/20 mb-5">
              <AlertCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          {/* Google OAuth */}
          <Button
            type="button"
            variant="outline"
            className="w-full h-11 gap-3 text-sm font-semibold border-border hover:border-primary/40 transition-colors"
            onClick={handleGoogleLogin}
            disabled={googleLoading || loading}
          >
            {googleLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
            )}
            Logga in med Google
          </Button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground font-medium">eller</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Email form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="login-email">E-postadress</Label>
              <Input
                id="login-email"
                type="email"
                placeholder="namn@foretag.se"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11"
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="login-password">Lösenord</Label>
                <button type="button" className="text-xs text-primary hover:underline">Glömt lösenord?</button>
              </div>
              <div className="relative">
                <Input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 pr-10"
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-11 gradient-gold text-primary-foreground font-bold text-sm"
              disabled={loading || googleLoading}
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              Logga in
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Inget konto?{" "}
              <Link to="/skapa-konto" className="text-primary font-bold hover:underline">
                Skapa konto
              </Link>
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-border">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Shield className="w-3.5 h-3.5 text-primary" />
              <span>Krypterad anslutning · GDPR-säkrad</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
