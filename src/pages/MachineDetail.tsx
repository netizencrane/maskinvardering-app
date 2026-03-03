import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft, MapPin, Calendar, Clock, Hash, FileText, Banknote, ShoppingCart,
  RefreshCw, Download, CheckCircle2, AlertTriangle, Camera, Video, Volume2,
  Shield, Wrench, Eye, Target, TrendingUp, Gauge, Flame, Activity,
  DollarSign, BarChart3, Globe, Zap, ThermometerSun, Percent
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getMachineById } from "@/data/machines";
import { PrecisionScanner } from "@/components/PrecisionScanner";
import { generateBankReadyPDF } from "@/lib/generateCertificatePDF";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";

/* ── Status Badge ── */
function StatusBadge({ status }: { status: "verified" | "ai-estimate" | "in-pool" }) {
  switch (status) {
    case "verified":
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full gradient-gold px-3 py-1 text-xs font-semibold text-primary-foreground">
          <CheckCircle2 className="w-3.5 h-3.5" />
          Expertverifierad
        </span>
      );
    case "ai-estimate":
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-xs font-semibold text-secondary">
          AI Estimate
        </span>
      );
    case "in-pool":
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-xs font-semibold text-success">
          <span className="w-2 h-2 rounded-full bg-success pulse-green" />
          I Säljpoolen
        </span>
      );
  }
}

/* ── Liquidity Gauge ── */
function LiquidityGauge({ value }: { value: number }) {
  const circumference = 2 * Math.PI * 54;
  const progress = (value / 100) * circumference * 0.75;
  const rotation = 135;

  const getColor = (v: number) => {
    if (v >= 80) return "hsl(160 84% 39%)";
    if (v >= 60) return "hsl(43 96% 56%)";
    return "hsl(0 84% 60%)";
  };

  const getLabel = (v: number) => {
    if (v >= 80) return "Hög likviditet";
    if (v >= 60) return "Medel likviditet";
    return "Låg likviditet";
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-44 h-44">
        <svg viewBox="0 0 120 120" className="w-full h-full">
          <circle cx="60" cy="60" r="54" fill="none" stroke="hsl(217 33% 22%)" strokeWidth="8" strokeLinecap="round"
            strokeDasharray={`${circumference * 0.75} ${circumference * 0.25}`} transform={`rotate(${rotation} 60 60)`} />
          <motion.circle cx="60" cy="60" r="54" fill="none" stroke={getColor(value)} strokeWidth="8" strokeLinecap="round"
            strokeDasharray={`${progress} ${circumference - progress}`} transform={`rotate(${rotation} 60 60)`}
            initial={{ strokeDasharray: `0 ${circumference}` }}
            animate={{ strokeDasharray: `${progress} ${circumference - progress}` }}
            transition={{ duration: 1.2, ease: "easeOut" }} />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span className="text-4xl font-extrabold text-foreground" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            {value}%
          </motion.span>
          <span className="text-[10px] text-muted-foreground mt-0.5">Likviditetsindex</span>
        </div>
      </div>
      <span className="text-xs font-semibold mt-1" style={{ color: getColor(value) }}>{getLabel(value)}</span>
    </div>
  );
}

/* ── Custom Tooltip ── */
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg px-3 py-2 shadow-lg">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-bold text-foreground">{new Intl.NumberFormat("sv-SE").format(payload[0].value)} SEK</p>
      </div>
    );
  }
  return null;
};

/* ── Simulated inspection data ── */
const conditionData = [
  { subject: "Exteriör", score: 82, fullMark: 100 },
  { subject: "Underrede", score: 71, fullMark: 100 },
  { subject: "Bom & Sticka", score: 88, fullMark: 100 },
  { subject: "Hytt", score: 90, fullMark: 100 },
  { subject: "Hydraulik", score: 76, fullMark: 100 },
  { subject: "Motor", score: 84, fullMark: 100 },
];

const inspectionFindings = [
  { area: "Exteriör", finding: "Mindre lackskador höger sida", severity: "Låg", cost: "8 000 kr", icon: Eye },
  { area: "Underrede", finding: "Däckmönster 40% kvar, vänster bak", severity: "Medel", cost: "35 000 kr", icon: Wrench },
  { area: "Hydraulik", finding: "Mindre oljeläckage vid cylinderstav", severity: "Medel", cost: "18 000 kr", icon: AlertTriangle },
  { area: "Hytt", finding: "Spricka i höger sidoruta", severity: "Låg", cost: "12 000 kr", icon: Eye },
];

const identifiedEquipment = [
  { name: "Engcon EC219 Tiltrotator", impact: "+145 000 kr", confidence: 97 },
  { name: "Trimble Earthworks GPS", impact: "+185 000 kr", confidence: 94 },
  { name: "Centralsmörjning", impact: "+20 000 kr", confidence: 99 },
  { name: "LED Arbetsbelysning", impact: "+8 000 kr", confidence: 96 },
  { name: "Backkamera", impact: "+5 000 kr", confidence: 98 },
  { name: "Dieselvärmare", impact: "+18 000 kr", confidence: 92 },
];

const audioFindings = [
  { type: "Motorljud", status: "Normal", statusColor: "text-success" },
  { type: "Hydraulikpump", status: "Normal", statusColor: "text-success" },
  { type: "Svänglager", status: "Övervakning", statusColor: "text-primary" },
  { type: "Rototilt-lager", status: "Normal", statusColor: "text-success" },
];

const exhaustAnalysis = { color: "Klar", status: "Normal", statusColor: "text-success", meaning: "Normal förbränning – god motor" };

const riskKPIs = [
  { label: "Peak Shortfall Exposure", value: "12.4%", status: "green", description: "Max förlustrisk vid snabbavyttring" },
  { label: "Market Liquidity Duration", value: "18 dagar", status: "green", description: "Uppskattad tid till försäljning" },
  { label: "Macro-Sensitivity Index", value: "0.34", status: "yellow", description: "Känslighet för makroekonomi" },
  { label: "LGD Proxy", value: "8.2%", status: "green", description: "Loss Given Default – estimat" },
  { label: "Amortization Alignment", value: "94%", status: "green", description: "Överensstämmelse med avskrivningsplan" },
];

const macroFactors = [
  { label: "EUR/SEK", value: "11.42", change: "+0.3%", icon: Globe },
  { label: "Styrränta", value: "3.25%", change: "0%", icon: Percent },
  { label: "CPIF Inflation", value: "2.1%", change: "-0.2%", icon: ThermometerSun },
];

const comparables = [
  { name: "Volvo EC220E, 2019, 5 200h", price: "1 180 000 SEK", source: "Klaravik", daysAgo: 12 },
  { name: "Volvo EC220E, 2018, 4 900h", price: "1 150 000 SEK", source: "Ritchie Bros", daysAgo: 18 },
  { name: "Volvo EC220E, 2020, 3 800h", price: "1 380 000 SEK", source: "Mascus", daysAgo: 7 },
  { name: "Volvo EC220E, 2019, 5 500h", price: "1 090 000 SEK", source: "Privat annons", daysAgo: 24 },
];

/* ── Section Header ── */
function SectionHeader({ icon: Icon, title, subtitle }: { icon: any; title: string; subtitle?: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
        <Icon className="w-4.5 h-4.5 text-primary" />
      </div>
      <div>
        <h3 className="text-sm font-bold text-foreground">{title}</h3>
        {subtitle && <p className="text-[11px] text-muted-foreground">{subtitle}</p>}
      </div>
    </div>
  );
}

/* ── Main Component ── */
export default function MachineDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const machine = getMachineById(id || "");

  if (!machine) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-4">
        <AlertTriangle className="w-12 h-12 text-muted-foreground" />
        <p className="text-lg text-muted-foreground">Maskinen hittades inte</p>
        <Button variant="outline" onClick={() => navigate("/dashboard")}>
          <ArrowLeft className="w-4 h-4 mr-2" />Tillbaka till Flottpark
        </Button>
      </div>
    );
  }

  const fmt = (n: number) => new Intl.NumberFormat("sv-SE").format(n);
  const residual = Math.round(machine.valueNum * 0.62);
  const depreciation = Math.round(machine.valueNum * 0.78);
  const tradeIn = Math.round(machine.valueNum * 0.85);
  const totalDamage = inspectionFindings.reduce((sum, f) => sum + parseInt(f.cost.replace(/\D/g, "")), 0);
  const totalEquipment = identifiedEquipment.reduce((sum, e) => sum + parseInt(e.impact.replace(/\D/g, "")), 0);
  const avgCondition = Math.round(conditionData.reduce((sum, d) => sum + d.score, 0) / conditionData.length);

  const specs = [
    { icon: Calendar, label: "Årsmodell", value: machine.year.toString() },
    { icon: Clock, label: "Drifttimmar", value: `${machine.hours.toLocaleString("sv-SE")} h` },
    { icon: Hash, label: "Serienummer", value: machine.serial },
    { icon: MapPin, label: "Plats", value: machine.location },
    { icon: Calendar, label: "Senaste besiktning", value: machine.lastInspection },
    { icon: Clock, label: "Nästa service", value: machine.nextService },
  ];

  return (
    <div className="space-y-6">
      {/* Back + Title */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")} className="text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-xl font-bold text-foreground truncate">{machine.name}</h1>
            <StatusBadge status={machine.status} />
          </div>
          <p className="text-sm text-muted-foreground mt-0.5">{machine.category} · {machine.owner}</p>
        </div>
      </div>

      {/* Hero: Image + Gauge + VMV */}
      <div className="grid lg:grid-cols-3 gap-5">
        <motion.div className="lg:col-span-1 rounded-xl overflow-hidden border border-border" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <img src={machine.image} alt={machine.name} className="w-full h-64 lg:h-full object-cover" />
        </motion.div>

        <motion.div className="rounded-xl border border-border bg-card card-surface p-6 flex flex-col items-center justify-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
          <PrecisionScanner value={machine.value} completedSteps={["identity", "images", "url"]} />
        </motion.div>

        <motion.div className="rounded-xl border border-border bg-card card-surface p-6 flex flex-col justify-between" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Indikativt Marknadsvärde</p>
            <p className="text-3xl font-extrabold text-gradient-gold leading-tight">{machine.value}</p>
            <p className={`text-sm font-medium mt-2 ${machine.change >= 0 ? 'text-success' : 'text-destructive'}`}>
              {machine.change >= 0 ? '▲' : '▼'} {Math.abs(machine.change)}% senaste 30 dagarna
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-border space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Verifieringsmetod</span>
              <span className="text-foreground font-medium">Triangulering + Expert</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Senast uppdaterad</span>
              <span className="text-foreground font-medium">Idag, 09:42</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Konfidensintervall</span>
              <span className="text-foreground font-medium">±3.2%</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Precision</span>
              <span className="text-foreground font-medium">{machine.precision}%</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Action Buttons */}
      <motion.div className="grid grid-cols-2 sm:grid-cols-4 gap-3" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }}>
        <Button className="gradient-gold text-primary-foreground font-semibold h-12">
          <ShoppingCart className="w-4 h-4 mr-2" />Publicera i Pool (5%)
        </Button>
        <Button variant="outline" className="h-12 font-semibold border-border hover:border-primary/40">
          <Banknote className="w-4 h-4 mr-2" />Refinansiera
        </Button>
        <Button variant="outline" className="h-12 font-semibold border-border hover:border-primary/40" onClick={() => generateBankReadyPDF(machine)}>
          <Download className="w-4 h-4 mr-2" />Exportera PDF
        </Button>
        <Button variant="outline" className="h-12 font-semibold border-border hover:border-primary/40">
          <RefreshCw className="w-4 h-4 mr-2" />Begär omvärdering
        </Button>
      </motion.div>

      {/* Financial Overview */}
      <motion.div className="grid sm:grid-cols-3 gap-3" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.35 }}>
        {[
          { label: "Restvärde (3 år)", value: `${fmt(residual)} SEK`, sub: "62% av VMV", icon: TrendingUp },
          { label: "Avskrivningsvärde", value: `${fmt(depreciation)} SEK`, sub: "78% av VMV", icon: BarChart3 },
          { label: "Inbytesvärde", value: `${fmt(tradeIn)} SEK`, sub: "85% av VMV", icon: DollarSign },
        ].map((item, i) => (
          <div key={item.label} className="rounded-xl border border-border bg-card card-surface p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                <item.icon className="w-3.5 h-3.5 text-primary" />
              </div>
              <span className="text-[11px] text-muted-foreground">{item.label}</span>
            </div>
            <p className="text-lg font-extrabold text-foreground">{item.value}</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">{item.sub}</p>
          </div>
        ))}
      </motion.div>

      {/* Value Chart + Machine Data */}
      <div className="grid lg:grid-cols-3 gap-5">
        <motion.div className="lg:col-span-2 rounded-xl border border-border bg-card card-surface p-5" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.35 }}>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-sm font-bold text-foreground">Värdeutveckling</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Senaste 6 månaderna</p>
            </div>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${machine.change >= 0 ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'}`}>
              {machine.change >= 0 ? '+' : ''}{machine.change}%
            </span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={machine.valueHistory} margin={{ top: 5, right: 5, bottom: 0, left: 5 }}>
                <defs>
                  <linearGradient id="valueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(43 96% 56%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(43 96% 56%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(217 25% 25%)" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: "hsl(215 20% 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "hsl(215 20% 55%)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`} width={45} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="value" stroke="hsl(43 96% 56%)" strokeWidth={2.5} fill="url(#valueGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div className="rounded-xl border border-border bg-card card-surface p-5" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
          <h3 className="text-sm font-bold text-foreground mb-4">Maskindata</h3>
          <div className="space-y-4">
            {specs.map((spec) => (
              <div key={spec.label} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <spec.icon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-[11px] text-muted-foreground">{spec.label}</p>
                  <p className="text-sm font-semibold text-foreground">{spec.value}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 pt-4 border-t border-border">
            <h4 className="text-xs text-muted-foreground mb-2">Beskrivning</h4>
            <p className="text-xs text-foreground leading-relaxed">{machine.description}</p>
          </div>
        </motion.div>
      </div>

      {/* AI Inspection: Condition Radar + Findings */}
      <div className="grid lg:grid-cols-2 gap-5">
        <motion.div className="rounded-xl border border-border bg-card card-surface p-5" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <SectionHeader icon={Camera} title="AI Skickbedömning" subtitle={`Genomsnitt: ${avgCondition}/100 · 50 kontrollpunkter`} />
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={conditionData} cx="50%" cy="50%" outerRadius="70%">
                <PolarGrid stroke="hsl(217 25% 25%)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: "hsl(215 20% 65%)", fontSize: 11 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name="Skick" dataKey="score" stroke="hsl(43 96% 56%)" fill="hsl(43 96% 56%)" fillOpacity={0.2} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div className="rounded-xl border border-border bg-card card-surface p-5" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <SectionHeader icon={AlertTriangle} title="Identifierade brister" subtitle={`Totalt: -${fmt(totalDamage)} kr värdepåverkan`} />
          <div className="space-y-3">
            {inspectionFindings.map((f, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl border border-border bg-muted/10">
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${f.severity === "Medel" ? "bg-primary/10" : "bg-muted/30"}`}>
                  <f.icon className={`w-3.5 h-3.5 ${f.severity === "Medel" ? "text-primary" : "text-muted-foreground"}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-bold text-foreground">{f.area}</p>
                    <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${f.severity === "Medel" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>{f.severity}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{f.finding}</p>
                </div>
                <span className="text-xs font-bold text-destructive whitespace-nowrap">-{f.cost}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Equipment Identified + Audio/Exhaust */}
      <div className="grid lg:grid-cols-2 gap-5">
        <motion.div className="rounded-xl border border-border bg-card card-surface p-5" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <SectionHeader icon={Target} title="Identifierad utrustning" subtitle={`Totalt: +${fmt(totalEquipment)} kr värdepåverkan`} />
          <div className="space-y-2">
            {identifiedEquipment.map((eq) => (
              <div key={eq.name} className="flex items-center justify-between p-2.5 rounded-lg border border-border/50 bg-muted/5">
                <div className="flex items-center gap-2.5 min-w-0">
                  <CheckCircle2 className="w-3.5 h-3.5 text-success shrink-0" />
                  <span className="text-xs font-medium text-foreground truncate">{eq.name}</span>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-[10px] text-muted-foreground">{eq.confidence}%</span>
                  <span className="text-xs font-bold text-success">{eq.impact}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div className="rounded-xl border border-border bg-card card-surface p-5" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <SectionHeader icon={Video} title="Videoanalys" subtitle="Ljud, avgaser & hydraulik · 200 kontrollpunkter" />

          {/* Audio */}
          <div className="mb-4">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">Ljuddiagnostik</p>
            <div className="grid grid-cols-2 gap-2">
              {audioFindings.map((a) => (
                <div key={a.type} className="flex items-center justify-between p-2 rounded-lg border border-border/50 bg-muted/5">
                  <div className="flex items-center gap-2">
                    <Volume2 className="w-3 h-3 text-muted-foreground" />
                    <span className="text-[11px] text-foreground">{a.type}</span>
                  </div>
                  <span className={`text-[10px] font-bold ${a.statusColor}`}>{a.status}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Exhaust */}
          <div className="mb-4">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">Avgasanalys</p>
            <div className="flex items-center gap-3 p-3 rounded-lg border border-border/50 bg-muted/5">
              <Flame className={`w-4 h-4 ${exhaustAnalysis.statusColor}`} />
              <div>
                <p className="text-xs font-bold">{exhaustAnalysis.color} rök – <span className={exhaustAnalysis.statusColor}>{exhaustAnalysis.status}</span></p>
                <p className="text-[10px] text-muted-foreground">{exhaustAnalysis.meaning}</p>
              </div>
            </div>
          </div>

          {/* Hydraulic response */}
          <div>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">Hydraulik responstid</p>
            <div className="space-y-2">
              {[
                { label: "Bom upp", value: "0.3s", max: "0.5s", ok: true },
                { label: "Sticka", value: "0.4s", max: "0.5s", ok: true },
                { label: "Svängrörelse", value: "0.6s", max: "0.8s", ok: true },
              ].map((h) => (
                <div key={h.label} className="flex items-center justify-between p-2 rounded-lg border border-border/50 bg-muted/5">
                  <div className="flex items-center gap-2">
                    <Gauge className="w-3 h-3 text-muted-foreground" />
                    <span className="text-[11px] text-foreground">{h.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-foreground">{h.value}</span>
                    <span className="text-[10px] text-muted-foreground">/ {h.max}</span>
                    <CheckCircle2 className="w-3 h-3 text-success" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Risk KPIs (Bank/Finance) */}
      <motion.div className="rounded-xl border border-border bg-card card-surface p-5" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <SectionHeader icon={Shield} title="Risk KPI:er – Finansiell bedömning" subtitle="5 nyckeltal för banker och försäkringsbolag" />
        <div className="grid sm:grid-cols-5 gap-3">
          {riskKPIs.map((kpi) => (
            <div key={kpi.label} className="p-3 rounded-xl border border-border bg-muted/5 text-center">
              <div className={`w-3 h-3 rounded-full mx-auto mb-2 ${kpi.status === "green" ? "bg-success" : kpi.status === "yellow" ? "bg-primary" : "bg-destructive"}`} />
              <p className="text-lg font-extrabold text-foreground">{kpi.value}</p>
              <p className="text-[10px] font-bold text-muted-foreground mt-1 leading-tight">{kpi.label}</p>
              <p className="text-[9px] text-muted-foreground/70 mt-0.5">{kpi.description}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Comparables + Macro Factors */}
      <div className="grid lg:grid-cols-3 gap-5">
        <motion.div className="lg:col-span-2 rounded-xl border border-border bg-card card-surface p-5" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <SectionHeader icon={BarChart3} title="Jämförbara objekt" subtitle={`${comparables.length} comparables senaste 30 dagarna`} />
          <div className="space-y-2">
            {comparables.map((c, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-border/50 bg-muted/5">
                <div className="min-w-0">
                  <p className="text-xs font-medium text-foreground truncate">{c.name}</p>
                  <p className="text-[10px] text-muted-foreground">{c.source} · {c.daysAgo} dagar sedan</p>
                </div>
                <span className="text-sm font-bold text-foreground whitespace-nowrap ml-3">{c.price}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div className="rounded-xl border border-border bg-card card-surface p-5" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <SectionHeader icon={Activity} title="Makrofaktorer" subtitle="Påverkar marknadsvärdet" />
          <div className="space-y-3">
            {macroFactors.map((m) => (
              <div key={m.label} className="p-3 rounded-xl border border-border/50 bg-muted/5">
                <div className="flex items-center gap-2 mb-1">
                  <m.icon className="w-3.5 h-3.5 text-muted-foreground" />
                  <span className="text-[11px] text-muted-foreground">{m.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-extrabold text-foreground">{m.value}</span>
                  <span className={`text-[10px] font-semibold ${m.change.startsWith("+") ? "text-success" : m.change.startsWith("-") ? "text-destructive" : "text-muted-foreground"}`}>{m.change}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-border">
            <p className="text-[10px] text-muted-foreground leading-relaxed">
              Makroekonomiska faktorer vägs in automatiskt vid triangulering. EUR/SEK-kursen och styrräntan påverkar importpriser och finansieringskostnader.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
