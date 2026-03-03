import { BarChart3, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, Activity, Globe, Filter } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const categories = ["Alla", "Grävmaskiner", "Hjullastare", "Dumpers", "Kranar", "Lastbilar"];

const marketData = [
  { machine: "Volvo EC220E", category: "Grävmaskiner", price: "1 250 000", change: +3.2, demand: 87, trend: "up", comparables: 34 },
  { machine: "CAT 950M", category: "Hjullastare", price: "890 000", change: -1.4, demand: 74, trend: "down", comparables: 21 },
  { machine: "Liebherr LTM 1100", category: "Kranar", price: "4 750 000", change: +5.1, demand: 91, trend: "up", comparables: 12 },
  { machine: "Komatsu PC210", category: "Grävmaskiner", price: "980 000", change: +2.8, demand: 82, trend: "up", comparables: 28 },
  { machine: "Scania R500", category: "Lastbilar", price: "720 000", change: -0.6, demand: 69, trend: "down", comparables: 45 },
  { machine: "Hitachi ZX130", category: "Grävmaskiner", price: "1 100 000", change: +1.9, demand: 79, trend: "up", comparables: 19 },
  { machine: "JCB 3CX", category: "Hjullastare", price: "560 000", change: +4.3, demand: 85, trend: "up", comparables: 37 },
  { machine: "Doosan DX225", category: "Grävmaskiner", price: "1 050 000", change: -2.1, demand: 76, trend: "down", comparables: 15 },
  { machine: "Bell B30E", category: "Dumpers", price: "2 300 000", change: +1.2, demand: 68, trend: "up", comparables: 8 },
  { machine: "Tadano GR-1000", category: "Kranar", price: "3 800 000", change: +0.8, demand: 72, trend: "up", comparables: 11 },
];

const stats = [
  { label: "Snitt prisförändring", value: "+2.1%", sub: "Senaste 30 dagarna", icon: TrendingUp, color: "text-success" },
  { label: "Aktiva marknader", value: "14", sub: "Nordiska + Globala", icon: Globe, color: "text-secondary" },
  { label: "Bevakade modeller", value: "160 000+", sub: "Uppdateras dagligen", icon: Activity, color: "text-primary" },
  { label: "Snitt likviditetsindex", value: "78%", sub: "Alla kategorier", icon: BarChart3, color: "text-primary" },
];

export default function Marknadsmonitor() {
  const [activeCategory, setActiveCategory] = useState("Alla");

  const filtered = activeCategory === "Alla"
    ? marketData
    : marketData.filter((d) => d.category === activeCategory);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Marknadsmonitor</h1>
        <p className="text-muted-foreground mt-1">Realtidsöversikt av maskinpriser och efterfrågan i Norden och globalt.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            className="p-5 rounded-2xl border border-border bg-card/50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
              <span className="text-xs text-muted-foreground">{stat.label}</span>
            </div>
            <p className="text-2xl font-extrabold">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{stat.sub}</p>
          </motion.div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex items-center gap-2 flex-wrap">
        <Filter className="w-4 h-4 text-muted-foreground" />
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={activeCategory === cat ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory(cat)}
            className={activeCategory === cat ? "gradient-gold text-primary-foreground" : ""}
          >
            {cat}
          </Button>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-border bg-card/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3">Maskin</th>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3">Kategori</th>
                <th className="text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3">Pris (SEK)</th>
                <th className="text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3">Förändring</th>
                <th className="text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3">Likviditetsindex</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item, i) => (
                <motion.tr
                  key={item.machine}
                  className="border-b border-border/50 hover:bg-muted/30 transition-colors duration-200 cursor-pointer"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                >
                  <td className="px-5 py-4 text-sm font-semibold">{item.machine}</td>
                  <td className="px-5 py-4 text-sm text-muted-foreground">{item.category}</td>
                  <td className="px-5 py-4 text-sm font-bold text-right">{item.price}</td>
                  <td className="px-5 py-4 text-sm text-right">
                    <div className="flex flex-col items-end">
                      <span className={`inline-flex items-center gap-1 font-semibold ${item.change > 0 ? "text-success" : "text-destructive"}`}>
                        {item.change > 0 ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                        {item.change > 0 ? "+" : ""}{item.change}%
                      </span>
                      <span className="text-[10px] text-muted-foreground mt-0.5">baserat på {item.comparables} objekt</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="inline-flex items-center gap-2">
                      <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full rounded-full bg-primary"
                          style={{ width: `${item.demand}%` }}
                        />
                      </div>
                      <span className="text-xs font-semibold text-muted-foreground">{item.demand}%</span>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
