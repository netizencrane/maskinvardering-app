import { useState, useEffect, useCallback } from "react";
import {
  Eye, Search, Zap, AlertTriangle, CheckCircle2, Plus, Camera,
  ScanLine, Gem, ArrowRight, ExternalLink, X, Info
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SEOHead } from "@/components/SEOHead";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

/* ──────────────────────────── Mock Data ──────────────────────────── */

const mockSourceData = {
  adTitle: "Volvo EC220E Grävmaskin 2019",
  adUrl: "https://klaravik.se/auction/volvo-ec220e-2019",
  adKeywords: [
    { key: "Timmätare", value: "4 850 h", verified: true },
    { key: "Skick", value: "Bra", verified: false, discrepancy: "Sprickor i underrede synliga" },
    { key: "Utrustning", value: "Standard", verified: false, discrepancy: "Rototilt ej nämnd" },
    { key: "Årsmodell", value: "2019", verified: true },
    { key: "Vikt", value: "22 200 kg", verified: true },
    { key: "Motor", value: "Volvo D6J", verified: true },
  ],
};

const mockAiDetections = [
  { id: 1, label: "Underrede – slitage", severity: "warn", x: 15, y: 72, detail: "Synligt slitage på medbringare och drivhjul. Uppskattat kvarvarande liv: 40%." },
  { id: 2, label: "Hydraulcylinder – OK", severity: "ok", x: 62, y: 35, detail: "Inga synliga läckage. Cylinderstång i gott skick." },
  { id: 3, label: "Bomstruktur – OK", severity: "ok", x: 45, y: 20, detail: "Inga synliga sprickor eller deformationer i svetsfogar." },
  { id: 4, label: "Hytt – mindre skada", severity: "warn", x: 35, y: 15, detail: "Repa på höger sidoruta. Kosmetisk skada, ej strukturell." },
  { id: 5, label: "Rototilt S70", severity: "treasure", x: 78, y: 55, detail: "Engcon S70 Rototilt identifierad. Ej nämnd i annons. Uppskattat värde: 185 000 SEK." },
  { id: 6, label: "GPS-system", severity: "treasure", x: 30, y: 8, detail: "Trimble GPS-antenner identifierade på hytttak. Uppskattat värde: 95 000 SEK." },
];

const mockTreasures = [
  { id: "rototilt", name: "Engcon S70 Rototilt", estimatedValue: 185000, confidence: 94, added: false },
  { id: "gps", name: "Trimble GPS Maskinstyrning", estimatedValue: 95000, confidence: 88, added: false },
  { id: "bucket", name: "Svängbar planeringsskopa 2000mm", estimatedValue: 32000, confidence: 76, added: false },
];

/* ──────────────────────────── Scanner ──────────────────────────── */

function ScannerOverlay({ isScanning, onComplete }: { isScanning: boolean; onComplete: () => void }) {
  const [scanLine, setScanLine] = useState(0);
  const [phase, setPhase] = useState<"scanning" | "analyzing" | "done">("scanning");

  useEffect(() => {
    if (!isScanning) return;
    setPhase("scanning");
    setScanLine(0);

    const interval = setInterval(() => {
      setScanLine(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setPhase("analyzing");
          setTimeout(() => {
            setPhase("done");
            onComplete();
          }, 1500);
          return 100;
        }
        return prev + 1.5;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [isScanning, onComplete]);

  if (!isScanning && phase !== "done") return null;

  return (
    <AnimatePresence>
      {isScanning && phase === "scanning" && (
        <motion.div
          className="absolute inset-0 z-20 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Scan line */}
          <div
            className="absolute left-0 right-0 h-[2px] bg-primary shadow-[0_0_15px_hsl(43_96%_56%/0.8)]"
            style={{ top: `${scanLine}%` }}
          />
          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: "linear-gradient(hsl(43 96% 56% / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(43 96% 56% / 0.3) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <div className="absolute bottom-3 left-3 text-xs font-mono text-primary bg-background/80 px-2 py-1 rounded">
            <ScanLine className="w-3 h-3 inline mr-1" />
            Skannar... {Math.round(scanLine)}%
          </div>
        </motion.div>
      )}
      {isScanning && phase === "analyzing" && (
        <motion.div
          className="absolute inset-0 z-20 flex items-center justify-center bg-background/60 backdrop-blur-sm pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="text-center">
            <motion.div
              className="w-12 h-12 rounded-full border-2 border-primary border-t-transparent mx-auto mb-3"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <p className="text-sm font-bold text-primary">Gemini Pro Vision analyserar...</p>
            <p className="text-xs text-muted-foreground mt-1">Identifierar komponenter och skador</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ──────────────────────────── Detection Marker ──────────────────────────── */

function DetectionMarker({ detection, index }: { detection: typeof mockAiDetections[0]; index: number }) {
  const colors = {
    ok: { ring: "border-success", bg: "bg-success", text: "text-success" },
    warn: { ring: "border-primary", bg: "bg-primary", text: "text-primary" },
    treasure: { ring: "border-emerald-400", bg: "bg-emerald-500", text: "text-emerald-400" },
  };
  const c = colors[detection.severity as keyof typeof colors];

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <motion.div
          className={`absolute z-10 w-6 h-6 rounded-full ${c.ring} border-2 cursor-pointer flex items-center justify-center`}
          style={{ left: `${detection.x}%`, top: `${detection.y}%`, transform: "translate(-50%, -50%)" }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 + index * 0.15, type: "spring", stiffness: 300 }}
        >
          <div className={`w-2 h-2 rounded-full ${c.bg}`} />
          {detection.severity === "treasure" && (
            <motion.div
              className="absolute inset-0 rounded-full border border-emerald-400/50"
              animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          )}
        </motion.div>
      </TooltipTrigger>
      <TooltipContent side="top" className="max-w-[280px] p-3 bg-card border-border">
        <p className={`text-xs font-bold mb-1 ${c.text}`}>{detection.label}</p>
        <p className="text-xs text-muted-foreground leading-relaxed">{detection.detail}</p>
      </TooltipContent>
    </Tooltip>
  );
}

/* ──────────────────────────── Truth Score ──────────────────────────── */

function TruthScore({ score }: { score: number }) {
  const color = score >= 80 ? "text-success" : score >= 50 ? "text-primary" : "text-destructive";
  const label = score >= 80 ? "Pålitlig annons" : score >= 50 ? "Avvikelser funna" : "Varning – stora avvikelser";

  return (
    <motion.div
      className="p-5 rounded-2xl border border-border bg-card/60"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Truth Score</p>
        <Info className="w-3.5 h-3.5 text-muted-foreground" />
      </div>
      <div className="flex items-end gap-3 mb-3">
        <span className={`text-4xl font-extrabold ${color}`}>{score}</span>
        <span className="text-lg text-muted-foreground font-bold mb-1">/ 100</span>
      </div>
      <div className="w-full h-2 rounded-full bg-muted overflow-hidden mb-2">
        <motion.div
          className={`h-full rounded-full ${score >= 80 ? "bg-success" : score >= 50 ? "bg-primary" : "bg-destructive"}`}
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1.2, delay: 0.8 }}
        />
      </div>
      <p className={`text-xs font-semibold ${color}`}>{label}</p>
    </motion.div>
  );
}

/* ──────────────────────────── Main Page ──────────────────────────── */

export default function AIVisionVerification() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [auctionUrl, setAuctionUrl] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [treasures, setTreasures] = useState(mockTreasures);
  const [baseValue, setBaseValue] = useState(1450000);

  const handleScan = () => {
    if (!auctionUrl.trim()) {
      toast({ title: "Ange en auktionslänk", description: "Klistra in en URL från t.ex. Klaravik.", variant: "destructive" });
      return;
    }
    setIsScanning(true);
    setAnalysisComplete(false);
  };

  const handleScanComplete = useCallback(() => {
    setIsScanning(false);
    setAnalysisComplete(true);
    toast({ title: "Analys klar", description: "6 objekt identifierade. 2 avvikelser funna." });
  }, [toast]);

  const addTreasure = (id: string) => {
    setTreasures(prev => prev.map(t => t.id === id ? { ...t, added: true } : t));
    const item = treasures.find(t => t.id === id);
    if (item) {
      setBaseValue(prev => prev + item.estimatedValue);
      toast({ title: `${item.name} tillagt`, description: `+${new Intl.NumberFormat("sv-SE").format(item.estimatedValue)} SEK till marknadsvärdet.` });
    }
  };

  const truthScore = 62; // Simulated

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="AI Vision Verification – Maskinvärdering.se"
        description="Skanna auktionsannonser med AI. Identifiera dolda skador, saknad utrustning och avvikelser automatiskt."
        canonical="https://maskinvardering.se/ai-vision"
      />
      <SiteHeader />

      {/* Hero */}
      <section className="py-16 sm:py-20 px-4 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[140px] pointer-events-none" />
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Eye className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-foreground">AI Vision Verification</h2>
                <span className="text-xs font-semibold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">Gemini Pro Vision</span>
              </div>
            </div>
          </motion.div>

          <motion.h1
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.1] mb-4"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          >
            Se vad annonsen <span className="text-gradient-gold">inte berättar.</span>
          </motion.h1>
          <motion.p
            className="text-lg text-muted-foreground max-w-2xl mb-8"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          >
            Klistra in en auktionslänk – vår AI skannar bilderna, jämför med annonstexten och avslöjar dolda värden och brister.
          </motion.p>

          {/* URL Input */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 max-w-2xl"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          >
            <div className="flex-1 relative">
              <ExternalLink className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                className="pl-10 h-12 bg-card/60 border-border text-sm"
                placeholder="https://klaravik.se/auction/volvo-ec220e-2019..."
                value={auctionUrl}
                onChange={(e) => setAuctionUrl(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleScan()}
              />
            </div>
            <Button
              className="gradient-gold text-primary-foreground font-semibold h-12 px-8"
              onClick={handleScan}
              disabled={isScanning}
            >
              {isScanning ? (
                <>
                  <motion.div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
                  Analyserar...
                </>
              ) : (
                <>
                  <Camera className="w-4 h-4 mr-2" />
                  Analysera annons
                </>
              )}
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Split-screen Analysis */}
      <AnimatePresence>
        {(isScanning || analysisComplete) && (
          <motion.section
            className="px-4 pb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="max-w-6xl mx-auto">
              {/* Title */}
              <div className="flex items-center gap-2 mb-6">
                <ScanLine className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-extrabold">{mockSourceData.adTitle}</h2>
                <span className="text-xs text-muted-foreground ml-auto hidden sm:block">Simulerad analys</span>
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                {/* LEFT: Visual Evidence */}
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Visuell evidens – AI-skanning</p>
                  <div className="relative rounded-2xl border border-border bg-muted/30 overflow-hidden aspect-[4/3]">
                    {/* Placeholder image area */}
                    <div className="absolute inset-0 bg-gradient-to-br from-muted/50 to-muted flex items-center justify-center">
                      <div className="text-center text-muted-foreground">
                        <Camera className="w-10 h-10 mx-auto mb-2 opacity-30" />
                        <p className="text-xs opacity-50">Maskinbild – AI overlay</p>
                      </div>
                    </div>

                    <ScannerOverlay isScanning={isScanning} onComplete={handleScanComplete} />

                    {/* Detection markers */}
                    {analysisComplete && mockAiDetections.map((d, i) => (
                      <DetectionMarker key={d.id} detection={d} index={i} />
                    ))}

                    {/* Legend */}
                    {analysisComplete && (
                      <motion.div
                        className="absolute bottom-3 right-3 bg-background/90 backdrop-blur-sm rounded-lg p-2 border border-border"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
                      >
                        <div className="flex items-center gap-3 text-[10px]">
                          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-success" /> OK</span>
                          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-primary" /> Varning</span>
                          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Dolt värde</span>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* RIGHT: Source Data */}
                <div className="space-y-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Källdata – Annonstext vs AI</p>

                  {/* Truth Score */}
                  {analysisComplete && <TruthScore score={truthScore} />}

                  {/* Keyword comparison */}
                  {analysisComplete && (
                    <motion.div
                      className="rounded-2xl border border-border bg-card/60 overflow-hidden"
                      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
                    >
                      <div className="p-4 border-b border-border">
                        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Nyckelordsjämförelse</p>
                      </div>
                      <div className="divide-y divide-border">
                        {mockSourceData.adKeywords.map((kw, i) => (
                          <motion.div
                            key={kw.key}
                            className="px-4 py-3 flex items-center gap-3"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.9 + i * 0.08 }}
                          >
                            {kw.verified ? (
                              <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
                            ) : (
                              <AlertTriangle className="w-4 h-4 text-primary shrink-0" />
                            )}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-foreground">{kw.key}</span>
                                <span className="text-xs text-muted-foreground">"{kw.value}"</span>
                              </div>
                              {kw.discrepancy && (
                                <p className="text-[11px] text-primary mt-0.5">{kw.discrepancy}</p>
                              )}
                            </div>
                            <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${kw.verified ? "text-success bg-success/10" : "text-primary bg-primary/10"}`}>
                              {kw.verified ? "Stämmer" : "Avvikelse"}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Found Treasures */}
              {analysisComplete && (
                <motion.div
                  className="mt-10"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <Gem className="w-5 h-5 text-emerald-400" />
                    <h3 className="text-lg font-extrabold">Dolda värden – "Found Treasures"</h3>
                    <span className="text-xs text-muted-foreground ml-auto">
                      Totalt marknadsvärde: <span className="text-gradient-gold font-bold">{new Intl.NumberFormat("sv-SE").format(baseValue)} SEK</span>
                    </span>
                  </div>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {treasures.map((t, i) => (
                      <motion.div
                        key={t.id}
                        className={`p-5 rounded-2xl border transition-all duration-300 ${t.added ? "border-emerald-500/30 bg-emerald-500/5" : "border-border bg-card/60 hover:border-emerald-500/20"}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.4 + i * 0.12 }}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                            <Gem className="w-4 h-4 text-emerald-400" />
                          </div>
                          <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                            {t.confidence}% konfidens
                          </span>
                        </div>
                        <h4 className="text-sm font-bold mb-1">{t.name}</h4>
                        <p className="text-lg font-extrabold text-emerald-400 mb-3">
                          +{new Intl.NumberFormat("sv-SE").format(t.estimatedValue)} SEK
                        </p>
                        <Button
                          variant={t.added ? "outline" : "default"}
                          size="sm"
                          className={`w-full text-xs font-semibold ${t.added ? "border-emerald-500/30 text-emerald-400" : "gradient-gold text-primary-foreground"}`}
                          disabled={t.added}
                          onClick={() => addTreasure(t.id)}
                        >
                          {t.added ? (
                            <><CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Tillagt i värdering</>
                          ) : (
                            <><Plus className="w-3.5 h-3.5 mr-1" /> Lägg till i värdering</>
                          )}
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* CTA */}
      <section className="py-20 px-4">
        <motion.div
          className="max-w-3xl mx-auto text-center rounded-3xl border border-border bg-card/50 p-10 sm:p-16 relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 relative z-10">Redo att verifiera din nästa affär?</h2>
          <p className="text-muted-foreground mb-8 relative z-10">AI-driven annonsverifiering. Hitta dolda värden och brister innan du köper.</p>
          <Button
            className="gradient-gold text-primary-foreground font-bold text-base px-10 py-3.5 h-auto relative z-10 hover:scale-105 transition-transform"
            onClick={() => navigate("/dashboard")}
          >
            Kom igång gratis
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
      </section>

      <SiteFooter />
    </div>
  );
}
