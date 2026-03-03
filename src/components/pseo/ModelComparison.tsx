import { useState } from "react";
import { motion } from "framer-motion";
import { Columns3 } from "lucide-react";

interface Model {
  name: string;
  priceRange: string;
  liquidity: number;
}

interface Props {
  machineType: string;
  models: Model[];
}

export function ModelComparison({ machineType, models }: Props) {
  const [selected, setSelected] = useState<number[]>([0, 1]);

  const toggle = (idx: number) => {
    if (selected.includes(idx)) {
      if (selected.length > 1) setSelected(selected.filter(i => i !== idx));
    } else if (selected.length < 3) {
      setSelected([...selected, idx]);
    }
  };

  const active = selected.map(i => models[i]).filter(Boolean);

  return (
    <section className="py-16 px-4 border-t border-border">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="flex items-center gap-3 mb-3">
            <Columns3 className="w-5 h-5 text-primary" />
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Jämför modeller – <span className="text-gradient-gold">{machineType}</span>
            </h2>
          </div>
          <p className="text-muted-foreground mb-6 max-w-xl">Välj 2–3 modeller att jämföra sida vid sida.</p>

          <div className="flex flex-wrap gap-2 mb-8">
            {models.map((m, i) => (
              <button
                key={m.name}
                onClick={() => toggle(i)}
                className={`px-4 py-2 rounded-xl border text-sm font-semibold transition-all duration-200 ${
                  selected.includes(i)
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-card/50 text-muted-foreground hover:border-primary/30"
                }`}
              >
                {m.name}
              </button>
            ))}
          </div>

          <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${active.length}, 1fr)` }}>
            {active.map((m) => (
              <motion.div
                key={m.name}
                className="p-6 rounded-2xl border border-border bg-card/50 text-center"
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <h3 className="text-base font-bold mb-4">{m.name}</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Prisintervall</p>
                    <p className="text-lg font-extrabold">{m.priceRange}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Likviditetsindex</p>
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-20 h-2 rounded-full bg-muted overflow-hidden">
                        <div className="h-full rounded-full bg-primary" style={{ width: `${m.liquidity}%` }} />
                      </div>
                      <span className="text-sm font-bold">{m.liquidity}%</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Försäljningstid</p>
                    <p className="text-sm font-semibold">{m.liquidity > 75 ? "< 14 dagar" : m.liquidity > 60 ? "14–30 dagar" : "30–60 dagar"}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
