import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Fingerprint, Camera, Link2, FileSearch, Wrench, ShieldCheck, Lock,
  ArrowRight, Mail, CheckCircle2, TrendingUp, Target, Clock, AlertTriangle,
  Globe, Building2, FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

/* ── Simulated machine data based on input type ── */
function getSimulatedMachine(type: string, input: string) {
  // Different simulations per input type
  const machines: Record<string, any> = {
    reg: {
      label: `Reg-nr: ${input.toUpperCase()}`,
      name: "Volvo EC220E",
      year: 2019,
      hours: 4200,
      type: "Grävmaskin",
      brand: "Volvo",
      rangeLow: 980000,
      rangeHigh: 1320000,
      exactValue: 1145000,
      liquidity: 87,
      scanSteps: [
        { id: "reg-lookup", label: "Söker fordonsregistret...", duration: 1200, icon: FileText },
        { id: "owner-history", label: "Hämtar ägarhistorik...", duration: 1000, icon: Fingerprint },
        { id: "inspection", label: "Kontrollerar besiktningsdata...", duration: 1400, icon: Wrench },
        { id: "market-match", label: "Matchar mot marknadsdata...", duration: 1600, icon: TrendingUp },
        { id: "triangulation", label: "Triangulerar värde...", duration: 1800, icon: Target },
      ],
    },
    url: {
      label: `Annons-URL`,
      name: "CAT 320",
      year: 2020,
      hours: 3800,
      type: "Grävmaskin",
      brand: "CAT",
      rangeLow: 1100000,
      rangeHigh: 1520000,
      exactValue: 1310000,
      liquidity: 84,
      scanSteps: [
        { id: "url-fetch", label: "Hämtar annonsdata...", duration: 1000, icon: Globe },
        { id: "image-scan", label: "Analyserar bilder (AI Radar)...", duration: 1800, icon: Camera },
        { id: "spec-extract", label: "Extraherar specifikationer...", duration: 1200, icon: FileSearch },
        { id: "price-compare", label: "Jämför med 14 marknader...", duration: 1600, icon: Link2 },
        { id: "triangulation", label: "Triangulerar värde...", duration: 1400, icon: Target },
      ],
    },
    org: {
      label: `Org-nr: ${input}`,
      name: "3 maskiner identifierade",
      year: null,
      hours: null,
      type: "Maskinpark",
      brand: "Diverse",
      rangeLow: 2800000,
      rangeHigh: 4200000,
      exactValue: 3450000,
      liquidity: 78,
      scanSteps: [
        { id: "org-lookup", label: "Söker bolagsregistret...", duration: 1200, icon: Building2 },
        { id: "asset-scan", label: "Identifierar registrerade tillgångar...", duration: 1600, icon: FileSearch },
        { id: "lien-check", label: "Kontrollerar företagsinteckningar...", duration: 1400, icon: Lock },
        { id: "fleet-value", label: "Värderar maskinpark...", duration: 2000, icon: TrendingUp },
        { id: "liquidity-calc", label: "Beräknar dold likviditet...", duration: 1800, icon: Target },
      ],
    },
    manual: {
      label: "Manuell värdering",
      name: input || "Volvo L90H",
      year: 2018,
      hours: 5500,
      type: "Hjullastare",
      brand: "Volvo",
      rangeLow: 720000,
      rangeHigh: 1050000,
      exactValue: 880000,
      liquidity: 81,
      scanSteps: [
        { id: "spec-verify", label: "Verifierar specifikationer...", duration: 1000, icon: Wrench },
        { id: "model-match", label: "Matchar mot 160 000+ modeller...", duration: 1400, icon: FileSearch },
        { id: "market-scan", label: "Skannar marknadsdata...", duration: 1600, icon: Globe },
        { id: "residual-calc", label: "Beräknar residualvärde...", duration: 1200, icon: TrendingUp },
        { id: "triangulation", label: "Triangulerar slutvärde...", duration: 1800, icon: Target },
      ],
    },
  };
  return machines[type] || machines.reg;
}

/* ── Scanning Phase ── */
function ScanningPhase({ steps, onComplete }: { steps: any[]; onComplete: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (currentStep >= steps.length) {
      onComplete();
      return;
    }

    const step = steps[currentStep];
    const timer = setTimeout(() => {
      setCompletedSteps((prev) => [...prev, currentStep]);
      setProgress(((currentStep + 1) / steps.length) * 100);
      setCurrentStep((prev) => prev + 1);
    }, step.duration);

    return () => clearTimeout(timer);
  }, [currentStep, steps.length]);

  return (
    <div className="flex flex-col items-center">
      {/* Scanning ring */}
      <div className="relative w-48 h-48 mb-8">
        <svg viewBox="0 0 200 200" className="w-full h-full" style={{ transform: "rotate(-90deg)" }}>
          <circle cx="100" cy="100" r="85" fill="none" stroke="hsl(var(--border))" strokeWidth="4" />
          <motion.circle
            cx="100" cy="100" r="85" fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 85}`}
            animate={{ strokeDashoffset: 2 * Math.PI * 85 * (1 - progress / 100) }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            filter="url(#scanGlow)"
          />
          <defs>
            <filter id="scanGlow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
          {/* Sweep */}
          <motion.circle
            cx="100" cy="100" r="85" fill="none"
            stroke="hsl(var(--primary) / 0.3)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`30 ${2 * Math.PI * 85 - 30}`}
            animate={{ strokeDashoffset: [0, -(2 * Math.PI * 85)] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <Fingerprint className="w-10 h-10 text-primary mb-1" />
          <p className="text-lg font-extrabold text-gradient-gold">{Math.round(progress)}%</p>
        </div>
      </div>

      {/* Steps list */}
      <div className="w-full max-w-sm space-y-2">
        {steps.map((step: any, i: number) => {
          const isCompleted = completedSteps.includes(i);
          const isActive = currentStep === i && !isCompleted;
          const StepIcon = step.icon;

          return (
            <motion.div
              key={step.id}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-500 ${
                isCompleted ? "border-primary/30 bg-primary/5" : isActive ? "border-secondary/30 bg-secondary/5" : "border-border bg-card/30"
              }`}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                isCompleted ? "bg-primary/15" : isActive ? "bg-secondary/15" : "bg-muted/30"
              }`}>
                {isCompleted ? (
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                ) : (
                  <StepIcon className={`w-4 h-4 ${isActive ? "text-secondary" : "text-muted-foreground"}`} />
                )}
              </div>
              <span className={`text-sm font-medium flex-1 ${
                isCompleted ? "text-foreground" : isActive ? "text-secondary" : "text-muted-foreground"
              }`}>
                {step.label}
              </span>
              {isActive && (
                <motion.div
                  className="w-2.5 h-2.5 rounded-full bg-secondary"
                  animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Result Phase with Email Gate ── */
function ResultPhase({ machine }: { machine: any }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [showExact, setShowExact] = useState(false);
  const [detailPhase, setDetailPhase] = useState(0);

  // Run detail "fingerprint" scan after email submit
  useEffect(() => {
    if (!emailSubmitted) return;
    const timers = [
      setTimeout(() => setDetailPhase(1), 800),
      setTimeout(() => setDetailPhase(2), 1800),
      setTimeout(() => setDetailPhase(3), 2800),
      setTimeout(() => setDetailPhase(4), 3800),
      setTimeout(() => { setDetailPhase(5); setShowExact(true); }, 4800),
    ];
    return () => timers.forEach(clearTimeout);
  }, [emailSubmitted]);

  const detailSteps = [
    { label: "Verifierar bildanalys...", icon: Camera, done: detailPhase >= 1 },
    { label: "Kontrollerar servicebok...", icon: FileSearch, done: detailPhase >= 2 },
    { label: "Analyserar besiktningshistorik...", icon: Wrench, done: detailPhase >= 3 },
    { label: "Expertverifiering pågår...", icon: ShieldCheck, done: detailPhase >= 4 },
    { label: "Signerar värderingsintyg...", icon: Lock, done: detailPhase >= 5 },
  ];

  const formatPrice = (n: number) => n.toLocaleString("sv-SE");

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes("@")) setEmailSubmitted(true);
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Machine info */}
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-xs font-bold text-primary uppercase tracking-wider mb-2">Värderingsresultat</p>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">{machine.name}</h2>
        <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
          {machine.year && <span>{machine.year}</span>}
          {machine.hours && <span>{machine.hours.toLocaleString("sv-SE")} timmar</span>}
          <span>{machine.type}</span>
        </div>
      </motion.div>

      {/* Value Range Card */}
      <motion.div
        className="rounded-3xl border border-border bg-card/50 p-8 sm:p-10 mb-8 relative overflow-hidden"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[150px] bg-primary/10 blur-[80px] rounded-full pointer-events-none" />

        {!showExact ? (
          <>
            <p className="text-xs text-muted-foreground text-center uppercase tracking-wider mb-6 relative z-10">
              Uppskattat marknadsvärde (spann)
            </p>
            <div className="flex items-center justify-center gap-4 sm:gap-8 relative z-10">
              <div className="text-right">
                <p className="text-2xl sm:text-3xl font-extrabold text-foreground">{formatPrice(machine.rangeLow)}</p>
                <p className="text-xs text-muted-foreground mt-1">Konservativt</p>
              </div>
              <div className="text-muted-foreground text-2xl font-light">–</div>
              <div className="text-left">
                <p className="text-2xl sm:text-3xl font-extrabold text-foreground">{formatPrice(machine.rangeHigh)}</p>
                <p className="text-xs text-muted-foreground mt-1">Optimistiskt</p>
              </div>
            </div>
            <p className="text-center text-xs text-muted-foreground mt-4 relative z-10">SEK</p>

            {/* Liquidity bar */}
            <div className="mt-8 relative z-10">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-muted-foreground">Likviditetsindex</span>
                <span className="font-bold text-primary">{machine.liquidity}/100</span>
              </div>
              <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: `${machine.liquidity}%` }}
                  transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
                />
              </div>
            </div>

            {/* Blurred exact value teaser */}
            <div className="mt-8 p-5 rounded-2xl border border-border bg-muted/20 relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Indikativt Marknadsvärde (VMV)</p>
                  <p className="text-2xl font-extrabold text-foreground blur-md select-none pointer-events-none">
                    {formatPrice(machine.exactValue)} SEK
                  </p>
                </div>
                <Lock className="w-8 h-8 text-muted-foreground/50" />
              </div>
              <p className="text-[10px] text-muted-foreground mt-2">Lås upp exakt VMV med din e-postadress</p>
            </div>
          </>
        ) : (
          /* Exact value revealed */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center relative z-10"
          >
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Indikativt Marknadsvärde (VMV)</p>
            <p className="text-4xl sm:text-5xl font-extrabold text-gradient-gold mb-2">
              {formatPrice(machine.exactValue)} SEK
            </p>
            <p className="text-sm text-muted-foreground">Konfidensintervall: ±3.2%</p>

            <div className="flex items-center justify-center gap-4 mt-6 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-success" />
                Expertverifierat
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                Bank-Ready
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Email Gate or Detail Scan */}
      {!emailSubmitted ? (
        <motion.div
          className="rounded-2xl border border-primary/20 bg-primary/5 p-6 sm:p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <Mail className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-bold mb-1">Lås upp exakt värdering</h3>
            <p className="text-sm text-muted-foreground">
              Ange din e-post för att få det exakta Indikativa Marknadsvärdet (VMV) med expertverifiering och bankfärdigt intyg.
            </p>
          </div>
          <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="email"
                placeholder="din@email.se"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-card border border-border rounded-xl py-3.5 pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
                required
              />
            </div>
            <Button
              type="submit"
              className="gradient-gold text-primary-foreground font-semibold px-8 py-3.5 h-auto rounded-xl"
            >
              Lås upp VMV
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>
          <p className="text-[10px] text-muted-foreground text-center mt-3">
            Gratis · Ingen registrering · Resultat direkt
          </p>
        </motion.div>
      ) : !showExact ? (
        /* Detail fingerprint scan after email */
        <motion.div
          className="rounded-2xl border border-border bg-card/50 p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-xs font-bold text-primary uppercase tracking-wider mb-4 text-center">Precisionsanalys pågår</p>
          <div className="space-y-2">
            {detailSteps.map((step, i) => (
              <motion.div
                key={step.label}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-500 ${
                  step.done ? "border-primary/30 bg-primary/5" : detailPhase === i ? "border-secondary/30 bg-secondary/5" : "border-border bg-card/30"
                }`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  step.done ? "bg-primary/15" : detailPhase === i ? "bg-secondary/15" : "bg-muted/30"
                }`}>
                  {step.done ? (
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                  ) : (
                    <step.icon className={`w-4 h-4 ${detailPhase === i ? "text-secondary" : "text-muted-foreground"}`} />
                  )}
                </div>
                <span className={`text-sm font-medium flex-1 ${
                  step.done ? "text-foreground" : detailPhase === i ? "text-secondary" : "text-muted-foreground"
                }`}>
                  {step.label}
                </span>
                {detailPhase === i && !step.done && (
                  <motion.div
                    className="w-2.5 h-2.5 rounded-full bg-secondary"
                    animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      ) : (
        /* Post-reveal CTA */
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <button
              onClick={() => navigate("/dashboard")}
              className="p-5 rounded-2xl border border-border bg-card/50 hover:border-primary/30 hover:bg-card transition-all duration-200 text-left group"
            >
              <TrendingUp className="w-5 h-5 text-primary mb-2" />
              <p className="text-sm font-bold mb-1">Hämta fullständig rapport</p>
              <p className="text-xs text-muted-foreground">Bank-Ready VMV-intyg med Likviditetsindex och expertverifiering.</p>
            </button>
            <button
              onClick={() => navigate("/dashboard")}
              className="p-5 rounded-2xl border border-border bg-card/50 hover:border-primary/30 hover:bg-card transition-all duration-200 text-left group"
            >
              <Target className="w-5 h-5 text-primary mb-2" />
              <p className="text-sm font-bold mb-1">Värdera fler maskiner</p>
              <p className="text-xs text-muted-foreground">Lägg till hela din maskinpark och frigör dold likviditet.</p>
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

/* ── Main Page ── */
export default function ValuationResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const type = params.get("type") || "reg";
  const input = params.get("input") || "ABC123";
  const manualName = params.get("name") || "";

  const machine = getSimulatedMachine(type, type === "manual" ? manualName : input);
  const [scanComplete, setScanComplete] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <section className="py-16 sm:py-24 px-4 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/3 blur-[150px] pointer-events-none" />

        <div className="relative z-10">
          <AnimatePresence mode="wait">
            {!scanComplete ? (
              <motion.div
                key="scanning"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div className="text-center mb-10">
                  <motion.p
                    className="text-xs font-bold text-primary uppercase tracking-wider mb-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {machine.label}
                  </motion.p>
                  <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Analyserar din maskin...</h1>
                </div>
                <ScanningPhase
                  steps={machine.scanSteps}
                  onComplete={() => setScanComplete(true)}
                />
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <ResultPhase machine={machine} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
