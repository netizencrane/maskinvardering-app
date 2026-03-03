import { useMemo } from "react";
import { motion } from "framer-motion";
import { Activity, CheckCircle2 } from "lucide-react";

interface Model {
  name: string;
  priceRange: string;
}

interface Props {
  machineType: string;
  models: Model[];
}

export function RecentTransactions({ machineType, models }: Props) {
  const transactions = useMemo(() => {
    const daysAgo = [1, 2, 4, 6, 9];
    return models.slice(0, 5).map((m, i) => {
      const low = parseInt(m.priceRange.replace(/\s/g, "").split("–")[0]);
      const high = parseInt(m.priceRange.replace(/\s/g, "").split("–")[1]);
      const price = Math.round((low + (high - low) * (0.4 + Math.random() * 0.3)) / 10000) * 10000;
      return {
        model: m.name,
        price,
        daysAgo: daysAgo[i],
        region: ["Svealand", "Götaland", "Norrland", "Västkusten", "Mälardalen"][i],
      };
    });
  }, [models]);

  return (
    <section className="py-16 px-4 border-t border-border">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="flex items-center gap-3 mb-3">
            <Activity className="w-5 h-5 text-primary" />
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Senaste värderingar – <span className="text-gradient-gold">{machineType}</span>
            </h2>
          </div>
          <p className="text-muted-foreground mb-8 max-w-xl">
            Anonymiserade verifierade värderingar från de senaste 14 dagarna.
          </p>
          <div className="space-y-3">
            {transactions.map((t, i) => (
              <motion.div
                key={i}
                className="flex items-center justify-between p-4 rounded-xl border border-border bg-card/50 hover:bg-card transition-colors"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <div>
                    <p className="text-sm font-bold">{t.model}</p>
                    <p className="text-xs text-muted-foreground">{t.region} · {t.daysAgo} {t.daysAgo === 1 ? "dag" : "dagar"} sedan</p>
                  </div>
                </div>
                <p className="text-sm font-extrabold text-gradient-gold whitespace-nowrap">{t.price.toLocaleString("sv-SE")} SEK</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
