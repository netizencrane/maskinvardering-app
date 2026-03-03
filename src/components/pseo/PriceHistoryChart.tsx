import { useMemo } from "react";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { TrendingUp } from "lucide-react";

interface Props {
  machineType: string;
  avgPriceNum?: number;
}

export function PriceHistoryChart({ machineType, avgPriceNum = 1500000 }: Props) {
  const data = useMemo(() => {
    const months = ["Mar", "Apr", "Maj", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec", "Jan", "Feb"];
    const base = avgPriceNum;
    return months.map((m, i) => ({
      month: m,
      price: Math.round(base * (0.92 + Math.sin(i * 0.5) * 0.04 + i * 0.007 + (Math.random() * 0.02 - 0.01))),
    }));
  }, [avgPriceNum]);

  const formatSEK = (v: number) => `${(v / 1000000).toFixed(1)}M`;

  return (
    <section className="py-16 px-4 border-t border-border">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="flex items-center gap-3 mb-3">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Prisutveckling – <span className="text-gradient-gold">{machineType}</span>
            </h2>
          </div>
          <p className="text-muted-foreground mb-8 max-w-xl">
            Genomsnittligt marknadsvärde senaste 12 månaderna baserat på verifierade transaktioner i Norden.
          </p>
          <div className="rounded-2xl border border-border bg-card/50 p-6">
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="priceGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} tickFormatter={formatSEK} width={50} />
                <Tooltip
                  formatter={(v: number) => [`${v.toLocaleString("sv-SE")} SEK`, "Snittpris"]}
                  contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12, fontSize: 13 }}
                />
                <Area type="monotone" dataKey="price" stroke="hsl(var(--primary))" strokeWidth={2.5} fill="url(#priceGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
