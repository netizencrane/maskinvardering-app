import { useState } from "react";
import { Clock, TrendingDown, TrendingUp, AlertTriangle, CheckCircle2, ArrowRight, BarChart3, Calendar, DollarSign } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SEOHead, serviceSchema } from "@/components/SEOHead";
import heroBg from "@/assets/hero-exit.jpg";

/* ── Mock machine data for prognosis ── */
const mockMachines = [
  { id: "volvo-ec220e", name: "Volvo EC220E", year: 2019, hours: 4850, category: "Grävmaskin", currentValue: 1450000, optimalExitMonths: 8 },
  { id: "cat-950gc", name: "CAT 950 GC", year: 2020, hours: 3200, category: "Hjullastare", currentValue: 1820000, optimalExitMonths: 14 },
  { id: "liebherr-ltm", name: "Liebherr LTM 1100", year: 2017, hours: 6100, category: "Kran", currentValue: 4200000, optimalExitMonths: 3 },
];

function fmt(n: number) {
  return new Intl.NumberFormat("sv-SE").format(n);
}

/* ── Prognosis card per machine ── */
function PrognosisCard({ machine, index }: { machine: typeof mockMachines[0]; index: number }) {
  const optimistic = Math.round(machine.currentValue * 1.05);
  const expected = Math.round(machine.currentValue * 0.92);
  const conservative = Math.round(machine.currentValue * 0.78);
  const isUrgent = machine.optimalExitMonths <= 6;

  return (
    <motion.div
      className="rounded-2xl border border-border bg-card/60 backdrop-blur-sm overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
    >
      {/* Header */}
      <div className="p-6 border-b border-border flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold">{machine.name}</h3>
          <p className="text-xs text-muted-foreground">{machine.category} · {machine.year} · {fmt(machine.hours)} h</p>
        </div>
        {isUrgent ? (
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-destructive bg-destructive/10 px-3 py-1 rounded-full">
            <AlertTriangle className="w-3.5 h-3.5" />
            Brådskande
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-success bg-success/10 px-3 py-1 rounded-full">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Stabil
          </span>
        )}
      </div>

      {/* Body */}
      <div className="p-6">
        {/* Current VMV */}
        <div className="mb-6">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Verifierat marknadsvärde (VMV)</p>
          <p className="text-2xl font-extrabold text-gradient-gold">{fmt(machine.currentValue)} SEK</p>
        </div>

        {/* Scenarios */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="p-3 rounded-xl border border-border bg-background/50 text-center">
            <TrendingUp className="w-4 h-4 text-success mx-auto mb-1" />
            <p className="text-xs text-muted-foreground mb-1">Optimistisk</p>
            <p className="text-sm font-bold text-success">{fmt(optimistic)}</p>
          </div>
          <div className="p-3 rounded-xl border border-primary/30 bg-primary/5 text-center">
            <BarChart3 className="w-4 h-4 text-primary mx-auto mb-1" />
            <p className="text-xs text-muted-foreground mb-1">Förväntat</p>
            <p className="text-sm font-bold text-primary">{fmt(expected)}</p>
          </div>
          <div className="p-3 rounded-xl border border-border bg-background/50 text-center">
            <TrendingDown className="w-4 h-4 text-destructive mx-auto mb-1" />
            <p className="text-xs text-muted-foreground mb-1">Konservativ</p>
            <p className="text-sm font-bold text-destructive">{fmt(conservative)}</p>
          </div>
        </div>

        {/* Optimal exit */}
        <div className="flex items-center gap-3 p-4 rounded-xl bg-primary/5 border border-primary/20">
          <Calendar className="w-5 h-5 text-primary shrink-0" />
          <div>
            <p className="text-sm font-bold">Optimal exit om {machine.optimalExitMonths} månader</p>
            <p className="text-xs text-muted-foreground">
              {isUrgent
                ? "Värdetappet accelererar snart – agera inom kort."
                : "Värdet är stabilt. Planera exit i lugn och ro."}
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 pb-6">
        <div className="flex gap-2">
          <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
            <motion.div
              className={`h-full rounded-full ${isUrgent ? "bg-destructive" : "bg-primary"}`}
              initial={{ width: 0 }}
              whileInView={{ width: `${Math.min(100, ((12 - machine.optimalExitMonths) / 12) * 100)}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.5 + index * 0.15 }}
            />
          </div>
          <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Risk</span>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Summary stats ── */
const summaryStats = [
  { icon: DollarSign, label: "Total VMV", value: "7 470 000 SEK" },
  { icon: TrendingDown, label: "Potentiell förlust vid sen exit", value: "–1 120 000 SEK" },
  { icon: Calendar, label: "Närmaste optimal exit", value: "3 månader" },
  { icon: CheckCircle2, label: "Maskiner med brådskande exit", value: "1 av 3" },
];

export default function ExitPrognos() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Exit-prognos – Maskinparkens avyttring | Maskinvärdering.se"
        description="Simulerad exit-prognos för din maskinpark. Se optimala avyttringstidpunkter och maximera ROI."
        canonical="https://maskinvardering.se/exit-prognos"
        jsonLd={{ "@context": "https://schema.org", "@type": "WebPage", name: "Exit-prognos", description: "Simulerad exit-prognos för maskinparker.", url: "https://maskinvardering.se/exit-prognos" }}
      />
      <SiteHeader />

      {/* Hero */}
      <section className="py-20 sm:py-28 px-4 relative overflow-hidden">
        <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover z-0" />
        <div className="absolute inset-0 bg-background/80 backdrop-blur-[2px] z-0" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px] pointer-events-none z-0" />
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-3 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Clock className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-foreground">Exit-prognos</h2>
                <span className="text-xs font-semibold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">Simulerad data</span>
              </div>
            </div>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Din maskinparks{" "}
            <span className="text-gradient-gold">exit-prognos</span>
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Se när du bör sälja varje maskin för att maximera avkastningen. Tre scenarier per maskin – baserat på residualvärde, drifttimmar och marknadsdata.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Button className="gradient-gold text-primary-foreground font-semibold text-base px-8 py-3 h-auto" onClick={() => navigate("/exit-planering")}>
              Läs mer om Exit-planering
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Summary stats */}
      <section className="py-12 px-4 border-t border-border">
        <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
          {summaryStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="p-5 rounded-2xl border border-border bg-card/50 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <stat.icon className="w-5 h-5 text-primary mx-auto mb-2" />
              <p className="text-xl sm:text-2xl font-extrabold text-gradient-gold">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Machine prognosis cards */}
      <section className="py-16 px-4 border-t border-border">
        <div className="max-w-5xl mx-auto">
          <motion.div className="mb-10" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">Maskinvis prognos</h2>
            <p className="text-muted-foreground text-sm">Tre scenarier beräknade med residualvärdekurvor och marknadsdata.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockMachines.map((m, i) => (
              <PrognosisCard key={m.id} machine={m} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <motion.div
          className="max-w-3xl mx-auto text-center rounded-3xl border border-border bg-card/50 p-10 sm:p-16 relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 relative z-10">Vill du ha prognos för dina maskiner?</h2>
          <p className="text-muted-foreground mb-8 relative z-10">Skapa ett konto och lägg till dina maskiner – få exit-prognos direkt.</p>
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
