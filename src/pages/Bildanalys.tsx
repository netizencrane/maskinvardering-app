import { Camera, CheckCircle2, Eye, ArrowRight, ChevronRight, AlertTriangle, Shield, Zap, DollarSign, Upload, ImagePlus } from "lucide-react";
import { UspPageLayout } from "@/components/UspPageLayout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useRef } from "react";

const kontrollpunkter = [
  {
    category: "Exteriör & Chassi",
    items: ["Lackskador & repor", "Rost & korrosion", "Bucklor & deformering", "Dekaler & CE-märkning", "Motvikt & sidoplåtar", "Stegar & handtag", "Typskyltar"],
  },
  {
    category: "Underrede & Däck",
    items: ["Däckmönster djup", "Bandskor slitage", "Rullare & löphjul", "Spännhjul", "Sprickor i gummi", "Fälgar & hjulbultar", "Bandspänning"],
  },
  {
    category: "Bom & Arbetsutrustning",
    items: ["Svetsfogar", "Bult/bussning spel", "Cylinderinfästning", "Skoptänder & egg", "Snabbfäste skick", "Schaktblad", "Sticka slitage"],
  },
  {
    category: "Hytt & Interiör",
    items: ["Glasrutor", "Förarstol", "Instrumentpanel", "Kontroller & spakar", "AC-system", "Säkerhetsbälte", "Innertak & klädsel"],
  },
  {
    category: "Hydraulik & Motor",
    items: ["Hydraulslangar", "Kopplingar & fittings", "Oljespill/läckage", "Cylinderstavar", "Filterbyten", "Motorblock visuellt", "AdBlue-tank"],
  },
  {
    category: "Tillbehör & Redskap",
    items: ["Rototilt", "GPS/maskinstyrning", "Arbetsbelysning LED", "Backkamera", "SMP-skopa", "Varningsljus", "Centralsmörjning"],
  },
];

const identityChecks = [
  { label: "Märke & Modell", description: "Logotyper, emblem och namnplåtar verifieras automatiskt" },
  { label: "Modellår & Generation", description: "Typskyltar och designgeneration identifieras" },
  { label: "Miljöklass", description: "AdBlue-tank och Stage-dekaler kopplas till residualvärde" },
  { label: "Besiktningsdekal", description: "SMP-inspektion verifieras via dekal på hytt/bom" },
];

const valueEnhancers = [
  { equipment: "Tiltrotator (Engcon, Steelwrist)", impact: "+120 000 – 180 000 kr" },
  { equipment: "3D Maskinstyrning (GPS)", impact: "+150 000 – 250 000 kr" },
  { equipment: "Centralsmörjning", impact: "+15 000 – 25 000 kr" },
  { equipment: "Dieselvärmare", impact: "+15 000 – 25 000 kr" },
];

const conditionAxes = [
  { axis: "Däck / Underrede", description: "Mönsterdjup, däcktyp, slitage och bandspänning" },
  { axis: "Bom & Sticka", description: "Sprickor, svetsreparationer, cylinderinfästningar" },
  { axis: "Hytt & Kaross", description: "Rost, bucklor, glasskador, belysning och dekaler" },
  { axis: "Helhetsbedömning", description: "Viktad sammanställning av maskinens visuella skick" },
];

function ImageUploadApp() {
  const [files, setFiles] = useState<File[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (newFiles: FileList | null) => {
    if (!newFiles) return;
    const imageFiles = Array.from(newFiles).filter(f => f.type.startsWith("image/"));
    setFiles(prev => [...prev, ...imageFiles]);
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">AI Bildanalys</h1>
        <p className="text-muted-foreground mt-1">Ladda upp foton av maskinen. AI:n analyserar 50 kontrollpunkter och ger en skickbedömning med värdepåverkan.</p>
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
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
        <div className="flex flex-col items-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
            <ImagePlus className="w-7 h-7 text-primary" />
          </div>
          <div>
            <p className="text-sm font-semibold">Dra & släpp bilder här</p>
            <p className="text-xs text-muted-foreground mt-1">eller klicka för att välja filer · JPG, PNG, HEIC</p>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="rounded-xl border border-border bg-card/50 p-4">
        <h3 className="text-sm font-bold mb-2">📸 Tips för bästa resultat</h3>
        <ul className="grid sm:grid-cols-2 gap-1.5 text-xs text-muted-foreground">
          <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-success shrink-0" />Fotografera i dagsljus</li>
          <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-success shrink-0" />Inkludera typskylt & serienummer</li>
          <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-success shrink-0" />Fotografera alla fyra sidor</li>
          <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-success shrink-0" />Inkludera underrede & däck</li>
          <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-success shrink-0" />Zooma in på skador</li>
          <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-success shrink-0" />Fotografera hytten inifrån</li>
        </ul>
      </div>

      {/* Uploaded files */}
      {files.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-bold">{files.length} bild{files.length > 1 ? "er" : ""} uppladdade</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {files.map((file, i) => (
              <div key={i} className="relative group rounded-xl overflow-hidden border border-border aspect-square">
                <img src={URL.createObjectURL(file)} alt={file.name} className="w-full h-full object-cover" />
                <button
                  onClick={(e) => { e.stopPropagation(); removeFile(i); }}
                  className="absolute top-2 right-2 w-6 h-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ✕
                </button>
                <div className="absolute bottom-0 inset-x-0 bg-background/80 backdrop-blur-sm px-2 py-1">
                  <p className="text-[10px] text-muted-foreground truncate">{file.name}</p>
                </div>
              </div>
            ))}
          </div>
          <Button className="gradient-gold text-primary-foreground font-semibold w-full sm:w-auto">
            <Camera className="w-4 h-4 mr-2" />
            Starta AI-analys ({files.length} bild{files.length > 1 ? "er" : ""})
          </Button>
        </div>
      )}
    </div>
  );
}

export default function Bildanalys() {
  const navigate = useNavigate();
  const location = useLocation();
  const isAppMode = location.pathname.startsWith("/app/");

  if (isAppMode) {
    return <ImageUploadApp />;
  }

  return (
    <UspPageLayout
      icon={Camera}
      title="AI Bildanalys"
      seoTitle="AI Bildanalys – 50 kontrollpunkter | Maskinvärdering.se"
      seoDescription="Ladda upp foton av din maskin. AI:n identifierar skador, bedömer skick och rapporterar värdepåverkan. 50 kontrollpunkter."
      seoCanonical="https://maskinvardering.se/bildanalys"
      seoJsonLd={{ "@context": "https://schema.org", "@type": "Service", name: "AI Bildanalys", description: "50-punkts bildanalys med automatisk skadeidentifiering och värdepåverkan.", provider: { "@type": "Organization", name: "Maskinvärdering.se" }, url: "https://maskinvardering.se/bildanalys" }}
      tagline="50 kontrollpunkter"
      headline={<>Varje pixel avslöjar <span className="text-gradient-gold">sanningen</span></>}
      subtitle="Ladda upp foton av din maskin. Vår AI granskar 50 kontrollpunkter – exteriör, underrede, hydraulik, hytt och arbetsutrustning – och ger dig en komplett skickbedömning med värdepåverkan i kronor."
      ctaText="Testa bildanalys"
      ctaLink="/dashboard"
    >
      {/* Identitetsverifiering */}
      <section className="py-16 px-4 border-t border-border">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3">
            Automatisk <span className="text-gradient-gold">identitetsverifiering</span>
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl">AI:n identifierar maskinens identitet direkt från bilderna – märke, modell, miljöklass och besiktningsstatus.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {identityChecks.map((check, i) => (
              <motion.div key={check.label} className="p-5 rounded-2xl border border-border bg-card/50 flex items-start gap-3" initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <Shield className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold">{check.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{check.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skickbedömning */}
      <section className="py-16 px-4 border-t border-border">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3">
            Skickbedömning i <span className="text-gradient-gold">fyra dimensioner</span>
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl">Varje maskin bedöms längs fyra axlar baserat på visuellt skick. Resultatet styr värdejusteringen direkt.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {conditionAxes.map((ax, i) => (
              <motion.div key={ax.axis} className="p-5 rounded-2xl border border-border bg-card/50" initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <h3 className="text-sm font-bold mb-1">{ax.axis}</h3>
                <p className="text-xs text-muted-foreground">{ax.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Värdehöjande utrustning */}
      <section className="py-16 px-4 border-t border-border">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3">
            Värdehöjande <span className="text-gradient-gold">utrustning identifieras</span>
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl">AI:n upptäcker automatiskt tillbehör som ökar maskinens marknadsvärde – och kvantifierar effekten i kronor.</p>
          <div className="rounded-2xl border border-border bg-card/50 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/20">
                  <th className="text-left text-xs font-bold text-primary uppercase tracking-widest px-6 py-4">Utrustning</th>
                  <th className="text-right text-xs font-bold text-success uppercase tracking-widest px-6 py-4">Värdepåverkan</th>
                </tr>
              </thead>
              <tbody>
                {valueEnhancers.map((item) => (
                  <tr key={item.equipment} className="border-b border-border/20 last:border-0">
                    <td className="px-6 py-4 font-medium">{item.equipment}</td>
                    <td className="px-6 py-4 text-right font-bold text-success">{item.impact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 50 kontrollpunkter */}
      <section className="py-16 px-4 border-t border-border">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3">
            Alla <span className="text-gradient-gold">50 kontrollpunkter</span>
          </h2>
          <p className="text-muted-foreground mb-10 max-w-xl">Varje foto analyseras mot dessa kategorier. Inget missas.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {kontrollpunkter.map((cat, i) => (
              <motion.div key={cat.category} className="p-5 rounded-2xl border border-border bg-card/50" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <h3 className="text-sm font-bold uppercase tracking-wide mb-3 text-primary">{cat.category}</h3>
                <ul className="space-y-1.5">
                  {cat.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-3.5 h-3.5 text-success shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skador → Värdepåverkan */}
      <section className="py-16 px-4 border-t border-border">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3">
            Varje skada <span className="text-gradient-gold">omvandlas till kronor</span>
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl">Identifierade brister kvantifieras med typiska reparationskostnader och justerar maskinens marknadsvärde direkt.</p>
          <div className="grid sm:grid-cols-2 gap-6">
            <motion.div className="p-6 rounded-2xl border border-destructive/30 bg-destructive/5" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-destructive" />
                <h3 className="text-base font-bold">Automatiskt identifierat</h3>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Oljeläckage på cylindrar och markspill</li>
                <li>• Sprickor och svetsreparationer på bom/sticka</li>
                <li>• Rost, bucklor och glasskador på kaross</li>
                <li>• Slitna däck/band med synligt cordvävnad</li>
                <li>• Repor och skavmärken på karosseri</li>
              </ul>
            </motion.div>
            <motion.div className="p-6 rounded-2xl border border-border bg-card/50" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <h3 className="text-base font-bold mb-4">Värdepåverkan (exempel)</h3>
              <div className="space-y-3">
                {[
                  { issue: "Oljeläckage på cylinderstavar", impact: "-15 000 – 40 000 kr" },
                  { issue: "Sprickor i bom/sticka", impact: "-30 000 – 100 000 kr" },
                  { issue: "Slitna skoptänder", impact: "-5 000 kr" },
                  { issue: "Glasskada i hytt", impact: "-8 000 – 15 000 kr" },
                ].map((item) => (
                  <div key={item.issue} className="flex items-center justify-between py-2 border-b border-border/50">
                    <span className="text-sm text-muted-foreground">{item.issue}</span>
                    <span className="text-sm font-bold text-destructive whitespace-nowrap ml-4">{item.impact}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Korsreferens */}
      <section className="py-16 px-4 border-t border-border">
        <div className="max-w-5xl mx-auto">
          <motion.div className="rounded-2xl border-2 border-dashed border-primary/40 bg-primary/5 p-6" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="flex items-center gap-2 mb-4">
              <Eye className="w-5 h-5 text-primary" />
              <h3 className="text-base font-bold">Korsreferens – bild vs. beskrivning</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              AI:n jämför automatiskt visuella observationer mot din textbeskrivning och rapporterar utrustning eller skador som syns i bilderna men saknas i texten. Fler bilder ger högre tillförlitlighet i värderingen.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Motorrum ej filmat", "CE-märkning ej synlig", "Typskyltar ej synliga", "Redskap saknas"].map((item) => (
                <span key={item} className="px-3 py-1.5 rounded-lg border border-primary/30 bg-card text-xs font-medium text-foreground">{item}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </UspPageLayout>
  );
}
