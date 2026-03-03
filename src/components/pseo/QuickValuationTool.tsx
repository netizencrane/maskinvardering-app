import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface Props {
  machineType: string;
  brands: string[];
}

export function QuickValuationTool({ machineType, brands }: Props) {
  const navigate = useNavigate();
  const [brand, setBrand] = useState("");
  const [year, setYear] = useState("");
  const [hours, setHours] = useState("");
  const [condition, setCondition] = useState("");
  const [estimate, setEstimate] = useState<number | null>(null);

  const handleEstimate = () => {
    const basePrice = 1800000;
    const yearFactor = Math.max(0.4, 1 - (2026 - Number(year)) * 0.06);
    const hoursFactor = Math.max(0.5, 1 - Number(hours) / 20000);
    const condFactor = condition === "Utmärkt" ? 1.1 : condition === "Bra" ? 1.0 : condition === "Medel" ? 0.85 : 0.7;
    setEstimate(Math.round(basePrice * yearFactor * hoursFactor * condFactor / 10000) * 10000);
  };

  const canEstimate = brand && year && hours && condition;

  return (
    <section className="py-16 px-4 border-t border-border">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="rounded-2xl border border-border bg-card/50 p-8 sm:p-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
              <Calculator className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Snabbvärdering – <span className="text-gradient-gold">{machineType}</span>
            </h2>
          </div>
          <p className="text-muted-foreground mb-8 max-w-lg">
            Få en indikativ prisuppskattning direkt. För indikativt marknadsvärde – starta en fullständig värdering.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Märke</label>
              <select value={brand} onChange={e => setBrand(e.target.value)} className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
                <option value="">Välj märke</option>
                {brands.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Årsmodell</label>
              <input type="number" placeholder="t.ex. 2019" value={year} onChange={e => setYear(e.target.value)} className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Drifttimmar</label>
              <input type="number" placeholder="t.ex. 4500" value={hours} onChange={e => setHours(e.target.value)} className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Skick</label>
              <select value={condition} onChange={e => setCondition(e.target.value)} className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
                <option value="">Välj skick</option>
                <option>Utmärkt</option>
                <option>Bra</option>
                <option>Medel</option>
                <option>Dåligt</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Button onClick={handleEstimate} disabled={!canEstimate} className="gradient-gold text-primary-foreground font-semibold px-6 py-2.5 h-auto">
              Beräkna indikativt värde
            </Button>
            {estimate !== null && (
              <motion.div
                className="flex items-center gap-4"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <div>
                  <p className="text-xs text-muted-foreground">Indikativt värde</p>
                  <p className="text-2xl font-extrabold text-gradient-gold">{estimate.toLocaleString("sv-SE")} SEK</p>
                </div>
                <Button variant="outline" onClick={() => navigate("/vardera")} className="font-semibold">
                  Fullständig värdering <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
