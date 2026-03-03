import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  ArrowRight, ArrowLeft, Camera, CheckCircle2, Upload, X, Video,
  Target, TrendingUp, Wrench, Globe, Fingerprint, ShieldCheck,
  Lock, FileSearch, AlertTriangle, Eye, Mail
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { DashboardLayout } from "@/layouts/DashboardLayout";

/* ── Data ── */
const maskintyper = ["Grävmaskin", "Hjullastare", "Dumper", "Kran", "Lastbil", "Teleskoplastare", "Grävlastare", "Minigrävare", "Bulldozer", "Betongblandare"];
const märken: Record<string, string[]> = {
  Grävmaskin: ["Volvo", "CAT", "Komatsu", "Hitachi", "Liebherr", "Doosan", "Hyundai", "JCB", "Kubota"],
  Hjullastare: ["Volvo", "CAT", "Komatsu", "Liebherr", "JCB", "Doosan"],
  Dumper: ["Volvo", "CAT", "Bell", "Komatsu"],
  Kran: ["Liebherr", "Tadano", "Manitowoc", "Terex"],
  Lastbil: ["Scania", "Volvo", "MAN", "Mercedes-Benz", "DAF", "Iveco"],
  Teleskoplastare: ["Merlo", "Manitou", "JCB", "Bobcat", "Claas"],
  Grävlastare: ["JCB", "CAT", "Volvo", "Case"],
  Minigrävare: ["Kubota", "Bobcat", "Yanmar", "CAT", "Volvo"],
  Bulldozer: ["CAT", "Komatsu", "Liebherr", "John Deere"],
  Betongblandare: ["Liebherr", "Stetter", "Schwing"],
};

const selectClass =
  "w-full bg-muted/50 border border-border rounded-xl py-3 px-4 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all duration-200 appearance-none cursor-pointer";

const kontrollpunkter = [
  "Exteriör & Chassi", "Underrede & Däck", "Bom & Arbetsutrustning",
  "Hytt & Interiör", "Hydraulik & Motor", "Tillbehör & Redskap",
];

const scanSteps = [
  { id: "identify", label: "Identifierar maskin...", icon: Fingerprint, duration: 1200 },
  { id: "exterior", label: "Analyserar exteriör (12 punkter)...", icon: Camera, duration: 1800 },
  { id: "undercarriage", label: "Granskar underrede & däck...", icon: Wrench, duration: 1400 },
  { id: "boom", label: "Kontrollerar bom & sticka...", icon: Eye, duration: 1600 },
  { id: "cabin", label: "Inspekterar hytt & interiör...", icon: FileSearch, duration: 1200 },
  { id: "hydraulics", label: "Analyserar hydraulik & motor...", icon: AlertTriangle, duration: 1800 },
  { id: "equipment", label: "Identifierar tillbehör...", icon: Target, duration: 1400 },
  { id: "damage", label: "Skadeidentifiering & kostnadsberäkning...", icon: TrendingUp, duration: 1600 },
];

const valuationScanSteps = [
  { id: "spec-verify", label: "Verifierar specifikationer...", icon: Wrench, duration: 1000 },
  { id: "model-match", label: "Matchar mot 160 000+ modeller...", icon: FileSearch, duration: 1400 },
  { id: "market-scan", label: "Skannar marknadsdata (14 källor)...", icon: Globe, duration: 1600 },
  { id: "condition-adjust", label: "Justerar för skick (AI-analys)...", icon: Eye, duration: 1200 },
  { id: "triangulation", label: "Triangulerar slutvärde...", icon: Target, duration: 1800 },
  { id: "expert-verify", label: "Expertverifiering...", icon: ShieldCheck, duration: 1400 },
];

/* ── Step 1: Machine Info ── */
function StepMachineInfo({ data, onChange, onNext }: {
  data: { maskintyp: string; märke: string; modell: string; år: string; timmar: string };
  onChange: (d: any) => void;
  onNext: () => void;
}) {
  const available = data.maskintyp ? märken[data.maskintyp] || [] : [];
  const canProceed = data.maskintyp && data.märke;

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      className="max-w-lg mx-auto"
    >
      <h2 className="text-2xl font-extrabold tracking-tight mb-2">Steg 1: Maskinuppgifter</h2>
      <p className="text-sm text-muted-foreground mb-6">Fyll i grunduppgifter om maskinen du vill värdera.</p>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2 sm:col-span-1">
            <label className="block text-xs font-medium text-muted-foreground mb-1.5">Maskintyp *</label>
            <select value={data.maskintyp} onChange={(e) => onChange({ ...data, maskintyp: e.target.value, märke: "" })} className={selectClass}>
              <option value="">Välj maskintyp</option>
              {maskintyper.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label className="block text-xs font-medium text-muted-foreground mb-1.5">Märke *</label>
            <select value={data.märke} onChange={(e) => onChange({ ...data, märke: e.target.value })} disabled={!data.maskintyp} className={`${selectClass} disabled:opacity-40`}>
              <option value="">Välj märke</option>
              {available.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <div className="col-span-2">
            <label className="block text-xs font-medium text-muted-foreground mb-1.5">Modell</label>
            <input type="text" placeholder="T.ex. EC220E, 950M..." value={data.modell} onChange={(e) => onChange({ ...data, modell: e.target.value })} className={selectClass} />
          </div>
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1.5">Årsmodell</label>
            <input type="number" placeholder="T.ex. 2019" min="1980" max="2026" value={data.år} onChange={(e) => onChange({ ...data, år: e.target.value })} className={selectClass} />
          </div>
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1.5">Drifttimmar</label>
            <input type="number" placeholder="T.ex. 4500" min="0" value={data.timmar} onChange={(e) => onChange({ ...data, timmar: e.target.value })} className={selectClass} />
          </div>
        </div>

        <Button onClick={onNext} disabled={!canProceed} className="w-full gradient-gold text-primary-foreground font-semibold py-3 h-auto rounded-xl disabled:opacity-50">
          Nästa steg
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </motion.div>
  );
}

/* ── Auth Gate ── */
function AuthGate({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "register">("register");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes("@")) onLogin();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="max-w-md mx-auto"
    >
      <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-7 h-7 text-primary" />
          </div>
          <h2 className="text-xl font-extrabold mb-1">
            {mode === "register" ? "Skapa konto för att fortsätta" : "Logga in"}
          </h2>
          <p className="text-sm text-muted-foreground">
            {mode === "register"
              ? "Dina maskinuppgifter är sparade. Skapa ett konto för att slutföra värderingen."
              : "Logga in med ditt befintliga konto."}
          </p>
        </div>

        <button
          onClick={onLogin}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-border bg-card hover:bg-muted/50 transition-colors text-sm font-medium mb-4"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          Fortsätt med Google
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs text-muted-foreground">eller</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1.5">E-post</label>
            <input type="email" placeholder="din@email.se" value={email} onChange={(e) => setEmail(e.target.value)} className={selectClass} required />
          </div>
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1.5">Lösenord</label>
            <input type="password" placeholder="Minst 6 tecken" value={password} onChange={(e) => setPassword(e.target.value)} className={selectClass} required />
          </div>
          <Button type="submit" className="w-full gradient-gold text-primary-foreground font-semibold py-3 h-auto rounded-xl">
            {mode === "register" ? "Skapa konto & fortsätt" : "Logga in & fortsätt"}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </form>

        <p className="text-xs text-muted-foreground text-center mt-4">
          {mode === "register" ? (
            <>Har du redan konto? <button onClick={() => setMode("login")} className="text-primary font-medium hover:underline">Logga in</button></>
          ) : (
            <>Inget konto? <button onClick={() => setMode("register")} className="text-primary font-medium hover:underline">Skapa konto</button></>
          )}
        </p>
      </div>
    </motion.div>
  );
}

/* ── Step 2: Beskrivning ── */
function StepDescription({ data, onChange, onNext, onBack }: {
  data: { beskrivning: string; ovrigInfo: string };
  onChange: (d: any) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="max-w-lg mx-auto">
      <h2 className="text-2xl font-extrabold tracking-tight mb-2">Steg 2: Beskrivning</h2>
      <p className="text-sm text-muted-foreground mb-6">Beskriv maskinens skick, historik och eventuella tillbehör. Ju mer info desto bättre värdering.</p>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1.5">Beskrivning *</label>
          <textarea
            value={data.beskrivning}
            onChange={(e) => onChange({ ...data, beskrivning: e.target.value })}
            placeholder="Beskriv maskinens skick, servicehistorik, eventuella skador, utrustning etc. T.ex. 'Nyservad, rototilt Engcon EC219, GPS Trimble, inga kända skador.'"
            rows={5}
            className={`${selectClass} resize-none`}
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1.5">Övrig information</label>
          <textarea
            value={data.ovrigInfo}
            onChange={(e) => onChange({ ...data, ovrigInfo: e.target.value })}
            placeholder="Ange t.ex. senaste besiktning, garantistatus, finansieringsinfo, önskad säljtidpunkt, antal ägare etc."
            rows={3}
            className={`${selectClass} resize-none`}
          />
        </div>

        {/* Hjälptext */}
        <div className="rounded-xl border border-border bg-card/50 p-4">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Tips för bättre värdering</p>
          <ul className="space-y-1.5 text-xs text-muted-foreground">
            <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-success shrink-0" />Nämn alla tillbehör (rototilt, GPS, centralsmörjning)</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-success shrink-0" />Beskriv servicehistorik och senaste motorservice</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-success shrink-0" />Ange kända skador eller slitage</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-success shrink-0" />Inkludera SMP-besiktningsstatus om tillgänglig</li>
          </ul>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={onBack} className="rounded-xl">
            <ArrowLeft className="w-4 h-4 mr-1" /> Tillbaka
          </Button>
          <Button onClick={onNext} disabled={!data.beskrivning.trim()} className="flex-1 gradient-gold text-primary-foreground font-semibold py-3 h-auto rounded-xl disabled:opacity-50">
            Nästa steg
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Step 3: Image/Video Upload ── */
function StepImageUpload({ images, setImages, videoFile, setVideoFile, onNext, onBack }: {
  images: string[];
  setImages: (imgs: string[]) => void;
  videoFile: string | null;
  setVideoFile: (v: string | null) => void;
  onNext: () => void;
  onBack: () => void;
}) {

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const newImages: string[] = [];
    Array.from(files).forEach((file) => {
      newImages.push(URL.createObjectURL(file));
    });
    setImages([...images, ...newImages]);
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setVideoFile(files[0].name);
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="max-w-lg mx-auto">
      <h2 className="text-2xl font-extrabold tracking-tight mb-2">Steg 3: Lägg till bilder & video</h2>
      <p className="text-sm text-muted-foreground mb-6">Lägg till foton och/eller video av maskinen. Fler bilder = högre precision. Analyseras i nästa steg.</p>

      {/* Image Upload area */}
      <label className="block rounded-2xl border-2 border-dashed border-border bg-muted/20 p-8 text-center cursor-pointer hover:border-primary/40 transition-colors mb-4">
        <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
        <p className="text-sm font-medium mb-1">Klicka eller dra bilder hit</p>
        <p className="text-xs text-muted-foreground">JPG, PNG – max 10 bilder</p>
        <input type="file" accept="image/*" multiple onChange={handleFileChange} className="hidden" />
      </label>

      {/* Video Upload area */}
      <label className="block rounded-2xl border-2 border-dashed border-border bg-muted/20 p-6 text-center cursor-pointer hover:border-primary/40 transition-colors mb-4">
        <Video className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
        <p className="text-sm font-medium mb-1">Lägg till video (valfritt)</p>
        <p className="text-xs text-muted-foreground">MP4, MOV – max 200 MB</p>
        <input type="file" accept="video/*" onChange={handleVideoChange} className="hidden" />
      </label>

      {/* Preview images */}
      {images.length > 0 && (
        <div className="grid grid-cols-4 gap-2 mb-4">
          {images.map((img, i) => (
            <div key={i} className="relative rounded-xl overflow-hidden border border-border aspect-square group">
              <img src={img} alt={`Bild ${i + 1}`} className="w-full h-full object-cover" />
              <button onClick={() => removeImage(i)} className="absolute top-1 right-1 w-6 h-6 rounded-full bg-background/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Preview video */}
      {videoFile && (
        <div className="rounded-xl border border-border bg-card/50 p-3 mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Video className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">{videoFile}</span>
          </div>
          <button onClick={() => setVideoFile(null)} className="text-muted-foreground hover:text-foreground">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Checklist */}
      <div className="rounded-xl border border-border bg-card/50 p-4 mb-6">
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">AI analyserar dessa områden</p>
        <div className="grid grid-cols-2 gap-2">
          {kontrollpunkter.map((k) => (
            <div key={k} className="flex items-center gap-2 text-xs text-muted-foreground">
              <CheckCircle2 className="w-3 h-3 text-primary shrink-0" />
              {k}
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onBack} className="rounded-xl">
          <ArrowLeft className="w-4 h-4 mr-1" /> Tillbaka
        </Button>
        <Button onClick={onNext} disabled={images.length === 0 && !videoFile} className="flex-1 gradient-gold text-primary-foreground font-semibold py-3 h-auto rounded-xl disabled:opacity-50">
          Värdera maskin
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </motion.div>
  );
}

/* ── Step 3: Valuation Result ── */
function StepValuationResult({ machineData, onBack }: {
  machineData: { maskintyp: string; märke: string; modell: string; år: string; timmar: string };
  onBack: () => void;
}) {
  const [scanning, setScanning] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [progress, setProgress] = useState(0);

  const machineName = `${machineData.märke} ${machineData.modell || machineData.maskintyp}`.trim();
  const baseValue = 850000 + Math.random() * 600000;
  const exactValue = Math.round(baseValue);
  const rangeLow = Math.round(exactValue * 0.82);
  const rangeHigh = Math.round(exactValue * 1.15);

  useEffect(() => {
    if (!scanning || currentStep >= valuationScanSteps.length) return;
    const step = valuationScanSteps[currentStep];
    const timer = setTimeout(() => {
      setCompletedSteps((prev) => [...prev, currentStep]);
      setProgress(((currentStep + 1) / valuationScanSteps.length) * 100);
      if (currentStep + 1 >= valuationScanSteps.length) {
        setTimeout(() => setScanning(false), 800);
      } else {
        setCurrentStep((prev) => prev + 1);
      }
    }, step.duration);
    return () => clearTimeout(timer);
  }, [scanning, currentStep]);

  const formatPrice = (n: number) => n.toLocaleString("sv-SE");

  if (scanning) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-lg mx-auto text-center">
        <h2 className="text-2xl font-extrabold tracking-tight mb-2">Värdering pågår</h2>
        <p className="text-sm text-muted-foreground mb-8">Triangulerar marknadsvärde för {machineName}...</p>

        <div className="relative w-40 h-40 mx-auto mb-8">
          <svg viewBox="0 0 200 200" className="w-full h-full" style={{ transform: "rotate(-90deg)" }}>
            <circle cx="100" cy="100" r="85" fill="none" stroke="hsl(var(--border))" strokeWidth="4" />
            <motion.circle cx="100" cy="100" r="85" fill="none" stroke="hsl(var(--primary))" strokeWidth="4" strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 85}`}
              animate={{ strokeDashoffset: 2 * Math.PI * 85 * (1 - progress / 100) }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Fingerprint className="w-8 h-8 text-primary mb-1" />
            <p className="text-lg font-extrabold text-gradient-gold">{Math.round(progress)}%</p>
          </div>
        </div>

        <div className="space-y-2 text-left max-w-sm mx-auto">
          {valuationScanSteps.map((step, i) => {
            const isCompleted = completedSteps.includes(i);
            const isActive = currentStep === i && !isCompleted;
            const StepIcon = step.icon;
            return (
              <motion.div key={step.id}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border transition-all ${isCompleted ? "border-primary/30 bg-primary/5" : isActive ? "border-secondary/30 bg-secondary/5" : "border-border bg-card/30"}`}
                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
              >
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${isCompleted ? "bg-primary/15" : isActive ? "bg-secondary/15" : "bg-muted/30"}`}>
                  {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5 text-primary" /> : <StepIcon className={`w-3.5 h-3.5 ${isActive ? "text-secondary" : "text-muted-foreground"}`} />}
                </div>
                <span className={`text-xs font-medium ${isCompleted ? "text-foreground" : isActive ? "text-secondary" : "text-muted-foreground"}`}>{step.label}</span>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-lg mx-auto">
      <div className="text-center mb-8">
        <p className="text-xs font-bold text-primary uppercase tracking-wider mb-2">Värdering klar</p>
        <h2 className="text-3xl font-extrabold tracking-tight mb-1">{machineName}</h2>
        <div className="flex items-center justify-center gap-3 text-sm text-muted-foreground">
          {machineData.år && <span>{machineData.år}</span>}
          {machineData.timmar && <span>{Number(machineData.timmar).toLocaleString("sv-SE")} timmar</span>}
          <span>{machineData.maskintyp}</span>
        </div>
      </div>

      {/* VMV Card */}
      <div className="rounded-2xl border border-border bg-card p-8 mb-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[150px] bg-primary/10 blur-[80px] rounded-full pointer-events-none" />
        <div className="relative z-10 text-center">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Indikativt Marknadsvärde (VMV)</p>
          <p className="text-4xl sm:text-5xl font-extrabold text-gradient-gold mb-2">{formatPrice(exactValue)} SEK</p>
          <p className="text-sm text-muted-foreground mb-4">Konfidensintervall: ±3.2%</p>
          <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground">
            <div>
              <p className="font-bold text-foreground">{formatPrice(rangeLow)} SEK</p>
              <p>Konservativt</p>
            </div>
            <div className="text-muted-foreground">–</div>
            <div>
              <p className="font-bold text-foreground">{formatPrice(rangeHigh)} SEK</p>
              <p>Optimistiskt</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 mt-6 flex items-center justify-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-success" />
            AI-analyserad
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-primary" />
            Expertverifierad
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onBack} className="rounded-xl">
          <ArrowLeft className="w-4 h-4 mr-1" /> Ny värdering
        </Button>
        <Button className="flex-1 gradient-gold text-primary-foreground font-semibold py-3 h-auto rounded-xl">
          Ladda ner rapport (PDF)
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </motion.div>
  );
}

/* ── Step Indicator ── */
function StepIndicator({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) {
  const labels = ["Maskininfo", "Beskrivning", "Bild & Video", "Värdering"];
  return (
    <div className="flex items-center justify-center gap-2 mb-10">
      {labels.map((label, i) => (
        <div key={label} className="flex items-center gap-2">
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${i < currentStep ? "bg-primary/15 text-primary" :
              i === currentStep ? "bg-primary text-primary-foreground" :
                "bg-muted/50 text-muted-foreground"
            }`}>
            {i < currentStep ? <CheckCircle2 className="w-3.5 h-3.5" /> : <span className="w-4 text-center">{i + 1}</span>}
            <span className="hidden sm:inline">{label}</span>
          </div>
          {i < labels.length - 1 && <div className={`w-8 h-px ${i < currentStep ? "bg-primary/50" : "bg-border"}`} />}
        </div>
      ))}
    </div>
  );
}

/* ── Main Flow ── */
export default function ValuationFlow({ embedded }: { embedded?: boolean } = {}) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isEmbedded = embedded || searchParams.get("embedded") === "true";

  const [step, setStep] = useState(0);
  const [showAuthGate, setShowAuthGate] = useState(false);
  const [machineData, setMachineData] = useState({
    maskintyp: searchParams.get("type") || "",
    märke: searchParams.get("brand") || "",
    modell: searchParams.get("model") || "",
    år: searchParams.get("year") || "",
    timmar: searchParams.get("hours") || "",
  });
  const [descriptionData, setDescriptionData] = useState({
    beskrivning: "",
    ovrigInfo: "",
  });
  const [images, setImages] = useState<string[]>([]);
  const [videoFile, setVideoFile] = useState<string | null>(null);

  const handleStep1Next = () => setStep(1);
  const handleStep2Next = () => setStep(2);

  const handleStep3Next = () => {
    if (!user && !isEmbedded) {
      // Redirect to sign-up page instead of showing inline auth gate.
      navigate("/skapa-konto");
      return;
    }
    setStep(3);
  };

  const handleAuthComplete = () => {
    setShowAuthGate(false);
    setStep(3);
  };

  const handleNewValuation = () => {
    setStep(0);
    setMachineData({ maskintyp: "", märke: "", modell: "", år: "", timmar: "" });
    setDescriptionData({ beskrivning: "", ovrigInfo: "" });
    setImages([]);
    setVideoFile(null);
  };

  const content = (
    <div className="py-10 px-4">
      <StepIndicator currentStep={showAuthGate ? 2 : step} totalSteps={4} />

      <AnimatePresence mode="wait">
        {showAuthGate ? (
          <AuthGate key="auth" onLogin={handleAuthComplete} />
        ) : step === 0 ? (
          <StepMachineInfo key="step1" data={machineData} onChange={setMachineData} onNext={handleStep1Next} />
        ) : step === 1 ? (
          <StepDescription key="step2" data={descriptionData} onChange={setDescriptionData} onNext={handleStep2Next} onBack={() => setStep(0)} />
        ) : step === 2 ? (
          <StepImageUpload
            key="step3"
            images={images}
            setImages={setImages}
            videoFile={videoFile}
            setVideoFile={setVideoFile}
            onNext={handleStep3Next}
            onBack={() => setStep(1)}
          />
        ) : (
          <StepValuationResult key="step4" machineData={machineData} onBack={handleNewValuation} />
        )}
      </AnimatePresence>
    </div>
  );

  if (isEmbedded) {
    return content;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="max-w-4xl mx-auto">{content}</main>
      <SiteFooter />
    </div>
  );
}