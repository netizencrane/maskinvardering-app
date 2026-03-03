import { Shield, Lock, Eye, EyeOff, Users, FileText, AlertTriangle, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const permissions = [
  { label: "Värderingsrapporter", desc: "Vem kan se dina maskinintyg och VMV-rapporter", access: "Privat", icon: FileText },
  { label: "Maskinparkens data", desc: "Synlighet för flottöversikt, timmar och status", access: "Företagsinternt", icon: Eye },
  { label: "Ekonomisk information", desc: "Lånedetaljer, marknadsvärde och balansräkning", access: "Privat", icon: Lock },
  { label: "Marknadsbevakning", desc: "Dina bevakade maskiner och prisnotiser", access: "Privat", icon: AlertTriangle },
];

const shareHistory = [
  { doc: "VMV – Volvo EC220E", sharedWith: "SEB Företag", date: "2026-02-20", type: "Värderingsintyg" },
  { doc: "Flottöversikt Q1 2026", sharedWith: "Revisor AB", date: "2026-02-15", type: "Rapport" },
  { doc: "VMV – CAT 950M", sharedWith: "Nordea Leasing", date: "2026-02-10", type: "Värderingsintyg" },
  { doc: "Likviditetsindex – 5 maskiner", sharedWith: "Handelsbanken", date: "2026-01-28", type: "Rapport" },
];

const accessLevels = [
  { level: "Privat", desc: "Bara du kan se", icon: Lock, color: "text-destructive" },
  { level: "Företagsinternt", desc: "Alla i ditt företag", icon: Users, color: "text-primary" },
  { level: "Delad med part", desc: "Specifika mottagare", icon: Eye, color: "text-secondary" },
];

export default function Sekretess() {
  const [showDetails, setShowDetails] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Sekretess & Behörigheter</h1>
        <p className="text-muted-foreground mt-1">Kontrollera vem som kan se din data, rapporter och ekonomiska information.</p>
      </div>

      {/* Access levels legend */}
      <div className="flex flex-wrap gap-4">
        {accessLevels.map((level) => (
          <div key={level.level} className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-card/50">
            <level.icon className={`w-4 h-4 ${level.color}`} />
            <div>
              <p className="text-sm font-semibold">{level.level}</p>
              <p className="text-xs text-muted-foreground">{level.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Permissions */}
      <div>
        <h2 className="text-lg font-bold mb-4">Dataåtkomst</h2>
        <div className="space-y-3">
          {permissions.map((perm, i) => (
            <motion.div
              key={perm.label}
              className="flex items-center justify-between p-5 rounded-2xl border border-border bg-card/50 hover:bg-card transition-colors duration-200"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.08 }}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                  <perm.icon className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{perm.label}</p>
                  <p className="text-xs text-muted-foreground">{perm.desc}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${
                  perm.access === "Privat" 
                    ? "border-destructive/30 bg-destructive/10 text-destructive" 
                    : "border-primary/30 bg-primary/10 text-primary"
                }`}>
                  {perm.access}
                </span>
                <Button variant="ghost" size="sm">Ändra</Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Share history */}
      <div>
        <h2 className="text-lg font-bold mb-4">Delningshistorik</h2>
        <div className="rounded-2xl border border-border bg-card/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3">Dokument</th>
                  <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3">Typ</th>
                  <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3">Delad med</th>
                  <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3">Datum</th>
                  <th className="text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3">Åtgärd</th>
                </tr>
              </thead>
              <tbody>
                {shareHistory.map((item, i) => (
                  <motion.tr
                    key={i}
                    className="border-b border-border/50 hover:bg-muted/30 transition-colors duration-200"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                  >
                    <td className="px-5 py-4 text-sm font-semibold">{item.doc}</td>
                    <td className="px-5 py-4">
                      <span className="text-xs font-medium px-2.5 py-0.5 rounded-full border border-border bg-muted/50">{item.type}</span>
                    </td>
                    <td className="px-5 py-4 text-sm text-muted-foreground">{item.sharedWith}</td>
                    <td className="px-5 py-4 text-sm text-muted-foreground">{item.date}</td>
                    <td className="px-5 py-4 text-right">
                      <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                        Återkalla
                      </Button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* GDPR notice */}
      <div className="p-5 rounded-2xl border border-border bg-card/50 flex items-start gap-4">
        <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold mb-1">GDPR-kompatibel datahantering</p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            All data lagras inom EU och hanteras i enlighet med GDPR. Du har alltid full kontroll och kan begära radering av all data.
            Värderingsrapporter krypteras och delas enbart med de parter du godkänner.
          </p>
        </div>
      </div>
    </div>
  );
}
