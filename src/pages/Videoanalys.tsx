import { Video, Volume2, Move, Gauge, Eye, Shield, Wrench, CheckCircle2, ArrowRight, AlertTriangle, Flame, Upload, Film } from "lucide-react";
import { UspPageLayout } from "@/components/UspPageLayout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useRef } from "react";

import heroVideoanalys from "@/assets/hero-videoanalys.jpg";

const analysKategorier = [
  {
    icon: Gauge,
    title: "Hydraulik & Rörelse",
    description: "Responsfördröjning, cylinderstavar, slangar och trycksystem bedöms under belastning.",
    items: ["Responstid", "Cylinderstavar", "Slangar", "Läckage", "Oljeläckage"],
  },
  {
    icon: Volume2,
    title: "Ljud & Motoranalys",
    description: "AI:n lyssnar efter onormala ljud som indikerar slitage eller kommande problem.",
    items: ["Motorljud", "Hydraulikpump", "Rototilt-lager", "Svänglager", "Ventilljud"],
  },
  {
    icon: Flame,
    title: "Avgasanalys",
    description: "Rökfärg, volym och mönster analyseras för att bedöma motorns hälsa.",
    items: ["Rökfärg", "Volym", "Kontinuitet", "Kallstart", "Belastning"],
  },
  {
    icon: Move,
    title: "Cykelhastighet",
    description: "Bom, arm och svängrörelse jämförs mot förväntade hastigheter för modellen.",
    items: ["Bom upp/ned", "Arm rörelse", "Svängrörelse", "Rototilt rotation", "Pumpkapacitet"],
  },
  {
    icon: Eye,
    title: "Däck / Underrede",
    description: "Mönsterdjup, rullare, bandspänning och slitage bedöms visuellt under rörelse.",
    items: ["Däckmönster", "Rullare", "Spännhjul", "Bandspänning", "Drivhjul"],
  },
  {
    icon: Wrench,
    title: "Bom & Sticka",
    description: "Svetsfogar, glapp och cylinderinfästningar inspekteras under belastning.",
    items: ["Svetsfogar", "Bult/bussning", "Cylinderinfästning", "Skoptänder", "Strukturskada"],
  },
];

const ljudKategorier = [
  { category: "Malande", cause: "Slitna lager, tandskada", severity: "Hög", repairCost: "30 000 – 150 000 kr" },
  { category: "Gnisslande", cause: "Remslirning, bromsslitage", severity: "Medel", repairCost: "5 000 – 25 000 kr" },
  { category: "Knackande", cause: "Vevstaksknack, kolvslap", severity: "Kritisk", repairCost: "80 000 – 200 000 kr" },
  { category: "Väsande", cause: "Hydraulikläckage, tätningar", severity: "Medel–Hög", repairCost: "10 000 – 40 000 kr" },
  { category: "Skramlade", cause: "Lösa paneler, motorfästen", severity: "Låg–Medel", repairCost: "2 000 – 10 000 kr" },
  { category: "Ylande", cause: "Sviktande hydraulikpump", severity: "Hög", repairCost: "30 000 – 80 000 kr" },
  { category: "Mullrande", cause: "Rullager, drivlineproblem", severity: "Medel–Hög", repairCost: "15 000 – 60 000 kr" },
];

const avgasAnalys = [
  { color: "Klar", meaning: "Normal förbränning – god motor", status: "Normalt", statusColor: "text-success" },
  { color: "Vit", meaning: "Kylvätskeläckage, packningsskada", status: "Kritisk", statusColor: "text-destructive" },
  { color: "Svart", meaning: "Igensatt filter, injektorer", status: "Medel–Hög", statusColor: "text-primary" },
  { color: "Blå/grå", meaning: "Oljeförbränning, kolvringar", status: "Kritisk", statusColor: "text-destructive" },
];

const hydraulikChecks = [
  { check: "Cylinderstavar", issue: "Gropfrätning, repor, rost", impact: "15 000 – 40 000 kr/st" },
  { check: "Leak-down", issue: "Bom sjunker inom 30 sek = internt läckage", impact: "25 000 – 60 000 kr" },
  { check: "Responsfördröjning", issue: ">0.5 sek = pump/ventilslitage", impact: "20 000 – 50 000 kr" },
  { check: "Cykelhastighet", issue: ">30% långsammare = pumpslitage", impact: "30 000 – 80 000 kr" },
];

function VideoUploadApp() {
  const [files, setFiles] = useState<File[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (newFiles: FileList | null) => {
    if (!newFiles) return;
    const videoFiles = Array.from(newFiles).filter(f => f.type.startsWith("video/"));
    setFiles(prev => [...prev, ...videoFiles]);
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">AI Videoanalys</h1>
        <p className="text-muted-foreground mt-1">Ladda upp video av maskinen i drift. AI:n analyserar ljud, rörelse, avgaser och visuellt skick – 200 kontrollpunkter.</p>
      </div>

      {/* Upload zone */}
      <div
        className={`relative border-2 border-dashed rounded-2xl p-10 text-center transition-colors duration-200 cursor-pointer ${
          dragOver ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
        }`}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files); }}
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept="video/*"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
        <div className="flex flex-col items-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Film className="w-7 h-7 text-primary" />
          </div>
          <div>
            <p className="text-sm font-semibold">Dra & släpp videofiler här</p>
            <p className="text-xs text-muted-foreground mt-1">eller klicka för att välja filer · MP4, MOV, AVI</p>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="rounded-xl border border-border bg-card/50 p-4">
        <h3 className="text-sm font-bold mb-2">🎬 Tips för bästa resultat</h3>
        <ul className="grid sm:grid-cols-2 gap-1.5 text-xs text-muted-foreground">
          <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-success shrink-0" />Filma maskinen under drift</li>
          <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-success shrink-0" />Inkludera kallstart om möjligt</li>
          <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-success shrink-0" />Panorera runt hela maskinen</li>
          <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-success shrink-0" />Filma bom- och armrörelse</li>
          <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-success shrink-0" />Fånga avgaser vid gaspådrag</li>
          <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-success shrink-0" />Undvik bakgrundsljud</li>
        </ul>
      </div>

      {/* Uploaded files */}
      {files.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-bold">{files.length} video{files.length > 1 ? "r" : ""} uppladdade</h3>
          <div className="space-y-2">
            {files.map((file, i) => (
              <div key={i} className="flex items-center gap-3 rounded-xl border border-border bg-card/50 p-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Film className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <p className="text-[10px] text-muted-foreground">{(file.size / 1024 / 1024).toFixed(1)} MB</p>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); removeFile(i); }}
                  className="w-6 h-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center text-xs shrink-0"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          <Button className="gradient-gold text-primary-foreground font-semibold w-full sm:w-auto">
            <Video className="w-4 h-4 mr-2" />
            Starta AI-analys ({files.length} video{files.length > 1 ? "r" : ""})
          </Button>
        </div>
      )}
    </div>
  );
}

export default function Videoanalys() {
  const navigate = useNavigate();
  const location = useLocation();
  const isAppMode = location.pathname.startsWith("/app/");

  if (isAppMode) {
    return <VideoUploadApp />;
  }

  return (
    <UspPageLayout
      icon={Video}
      title="AI Videoanalys"
      seoTitle="AI Videoanalys – 200 kontrollpunkter | Maskinvärdering.se"
      seoDescription="Filma maskinen med mobilen. AI:n analyserar ljud, rörelse, avgaser och visuellt skick – 200 kontrollpunkter med värdepåverkan i kronor."
      seoCanonical="https://maskinvardering.se/videoanalys"
      seoJsonLd={{ "@context": "https://schema.org", "@type": "Service", name: "AI Videoanalys", description: "200-punkts videoanalys av maskiner med ljud-, rörelse- och avgasanalys.", provider: { "@type": "Organization", name: "Maskinvärdering.se" }, url: "https://maskinvardering.se/videoanalys" }}
      tagline="200 kontrollpunkter"
      headline={<>Maskinen bedöms <span className="text-gradient-gold">i drift</span></>}
      subtitle="Filma maskinen med mobilen. Vår AI analyserar ljud, rörelse, avgaser och visuellt skick – 200 kontrollpunkter som fångar slitage som bara syns under belastning. Varje avvikelse kvantifieras i kronor."
      ctaText="Testa videoanalys"
      ctaLink="/dashboard"
      heroImage={heroVideoanalys}
    >
      {/* 6 Analysområden */}
      <section className="py-16 px-4 border-t border-border">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3">
            Sex <span className="text-gradient-gold">analysområden</span>
          </h2>
          <p className="text-muted-foreground mb-10 max-w-xl">Varje video analyseras i sex dimensioner. Avvikelser flaggas med allvarlighetsgrad och uppskattad reparationskostnad.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {analysKategorier.map((cat, i) => (
              <motion.div key={cat.title} className="p-5 rounded-2xl border border-border bg-card/50" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <div className="flex items-center gap-2 mb-3">
                  <cat.icon className="w-4 h-4 text-primary" />
                  <h3 className="text-sm font-bold uppercase tracking-wide">{cat.title}</h3>
                </div>
                <p className="text-xs text-muted-foreground mb-3 leading-relaxed">{cat.description}</p>
                <ul className="space-y-1">
                  {cat.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <CheckCircle2 className="w-3 h-3 text-success shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ljuddiagnostik */}
      <section className="py-16 px-4 border-t border-border">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3">
            Ljuddiagnostik – <span className="text-gradient-gold">7 kategorier</span>
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl">AI:n lyssnar systematiskt efter ljud som indikerar komponentslitage. Varje identifierat ljud klassificeras och kopplas till en uppskattad reparationskostnad.</p>
          <div className="rounded-2xl border border-border bg-card/50 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/20">
                  <th className="text-left text-xs font-bold text-primary uppercase tracking-widest px-6 py-4">Ljudtyp</th>
                  <th className="text-left text-xs font-bold text-muted-foreground uppercase tracking-widest px-6 py-4 hidden sm:table-cell">Typisk orsak</th>
                  <th className="text-center text-xs font-bold text-muted-foreground uppercase tracking-widest px-6 py-4">Allvarlighet</th>
                  <th className="text-right text-xs font-bold text-destructive uppercase tracking-widest px-6 py-4">Reparationskostnad</th>
                </tr>
              </thead>
              <tbody>
                {ljudKategorier.map((item) => (
                  <tr key={item.category} className="border-b border-border/20 last:border-0 hover:bg-muted/10 transition-colors">
                    <td className="px-6 py-4 font-bold">{item.category}</td>
                    <td className="px-6 py-4 text-muted-foreground hidden sm:table-cell">{item.cause}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`text-xs font-bold ${item.severity === "Kritisk" ? "text-destructive" : item.severity === "Hög" ? "text-primary" : "text-muted-foreground"}`}>
                        {item.severity}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right font-bold text-destructive whitespace-nowrap">{item.repairCost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Avgasanalys */}
      <section className="py-16 px-4 border-t border-border">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3">
            Avgasanalys – <span className="text-gradient-gold">rökfärg avslöjar motorn</span>
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl">Rökens färg och volym ger direkta signaler om motorns hälsa och kommande reparationsbehov.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {avgasAnalys.map((item, i) => (
              <motion.div key={item.color} className="p-5 rounded-2xl border border-border bg-card/50 flex items-start gap-4" initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <div className="shrink-0">
                  <Flame className={`w-5 h-5 ${item.statusColor}`} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-bold">{item.color} rök</h3>
                    <span className={`text-[10px] font-bold ${item.statusColor}`}>{item.status}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{item.meaning}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Hydraulik */}
      <section className="py-16 px-4 border-t border-border">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3">
            Hydraulik & <span className="text-gradient-gold">cykelhastighet</span>
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl">Avvikelser i hydraulikens beteende identifieras under drift och kvantifieras med uppskattade reparationskostnader.</p>
          <div className="space-y-4">
            {hydraulikChecks.map((item, i) => (
              <motion.div key={item.check} className="p-5 rounded-2xl border border-border bg-card/50" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  <h3 className="text-sm font-bold flex-shrink-0">{item.check}</h3>
                  <p className="text-sm text-muted-foreground flex-1">{item.issue}</p>
                  <span className="text-sm font-bold text-destructive whitespace-nowrap">{item.impact}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Värdepåverkan */}
      <section className="py-16 px-4 border-t border-border">
        <div className="max-w-5xl mx-auto">
          <motion.div className="rounded-2xl border border-primary/20 bg-card/80 p-6 sm:p-8" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h3 className="text-lg font-extrabold mb-3">Varje observation blir en <span className="text-gradient-gold">värdejustering</span></h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Varje identifierad avvikelse – skada, ljudanomali, hydraulisk fördröjning – kvantifieras i kronor baserat på typiska reparationskostnader. Justeringarna integreras direkt i marknadsvärdet. Vid flera videor dedupliceras observationer automatiskt och skickbedömningar vägs samman.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Direkt koppling till VMV", "Reparationskostnader i SEK", "Automatisk deduplicering", "Vägs samman vid flera videor"].map((tag) => (
                <span key={tag} className="px-3 py-1.5 rounded-lg border border-primary/30 bg-primary/5 text-xs font-medium text-foreground">{tag}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </UspPageLayout>
  );
}
