import { motion } from "framer-motion";
import { Banknote, ShoppingCart, Download, TrendingUp, Target, DollarSign, ArrowRight, CheckCircle2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { machines } from "@/data/machines";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Line, LineChart, Legend } from "recharts";
import { useNavigate } from "react-router-dom";

// Aggregate fleet data
const totalValue = machines.reduce((sum, m) => sum + m.valueNum, 0);
const avgLiquidity = Math.round(machines.reduce((sum, m) => sum + m.liquidityIndex, 0) / machines.length * 10) / 10;
const avgChange = Math.round(machines.reduce((sum, m) => sum + m.change, 0) / machines.length * 10) / 10;

// Generate 3-year residual value forecast
const generateForecast = () => {
  const months = ["Mar", "Jun", "Sep", "Dec"];
  const years = [2026, 2027, 2028];
  const data: { period: string; optimistic: number; expected: number; conservative: number }[] = [];
  
  let optimistic = totalValue;
  let expected = totalValue;
  let conservative = totalValue;

  data.push({ period: "Nu", optimistic, expected, conservative });

  years.forEach((year) => {
    months.forEach((month) => {
      optimistic *= (1 - 0.015 + Math.random() * 0.01);
      expected *= (1 - 0.025 + Math.random() * 0.005);
      conservative *= (1 - 0.035 + Math.random() * 0.005);
      data.push({
        period: `${month} ${year.toString().slice(2)}`,
        optimistic: Math.round(optimistic),
        expected: Math.round(expected),
        conservative: Math.round(conservative),
      });
    });
  });
  return data;
};

const forecastData = generateForecast();

// Top machines by value
const topMachines = [...machines].sort((a, b) => b.valueNum - a.valueNum).slice(0, 4);

// Liquidity gauge component
function FleetLiquidityGauge({ value }: { value: number }) {
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
      <div className="relative w-48 h-48">
        <svg viewBox="0 0 120 120" className="w-full h-full">
          <circle cx="60" cy="60" r="54" fill="none" stroke="hsl(217 33% 22%)" strokeWidth="8" strokeLinecap="round"
            strokeDasharray={`${circumference * 0.75} ${circumference * 0.25}`} transform={`rotate(${rotation} 60 60)`} />
          <motion.circle cx="60" cy="60" r="54" fill="none" stroke={getColor(value)} strokeWidth="8" strokeLinecap="round"
            strokeDasharray={`${progress} ${circumference - progress}`} transform={`rotate(${rotation} 60 60)`}
            initial={{ strokeDasharray: `0 ${circumference}` }}
            animate={{ strokeDasharray: `${progress} ${circumference - progress}` }}
            transition={{ duration: 1.5, ease: "easeOut" }} />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span className="text-5xl font-extrabold text-foreground" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            {value}%
          </motion.span>
          <span className="text-xs text-muted-foreground mt-1">Likviditetsindex</span>
        </div>
      </div>
      <span className="text-sm font-semibold mt-2" style={{ color: getColor(value) }}>
        {getLabel(value)}
      </span>
      <p className="text-xs text-muted-foreground text-center mt-1 max-w-[200px]">
        Snitt för hela flottan baserat på {machines.length} maskiner
      </p>
    </div>
  );
}

const ForecastTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg px-4 py-3 shadow-xl">
        <p className="text-xs text-muted-foreground font-medium mb-2">{label}</p>
        {payload.map((entry: any) => (
          <div key={entry.name} className="flex items-center gap-2 text-xs">
            <span className="w-2 h-2 rounded-full" style={{ background: entry.color }} />
            <span className="text-muted-foreground capitalize">{entry.name}:</span>
            <span className="font-bold text-foreground">{new Intl.NumberFormat("sv-SE").format(entry.value)} SEK</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function ValuationDashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="text-2xl font-extrabold text-foreground">Valuation Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Verifierat Marknadsvärde, likviditet och prognos för din maskinpark</p>
      </motion.div>

      {/* Top Row: VMV + Gauge */}
      <div className="grid lg:grid-cols-5 gap-5">
        {/* VMV - Large Card */}
        <motion.div
          className="lg:col-span-3 rounded-xl border border-border bg-card card-surface p-6 sm:p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Totalt Verifierat Marknadsvärde (VMV)</p>
          <div className="flex flex-wrap items-end gap-4 mb-4">
            <motion.p
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gradient-gold leading-none"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {new Intl.NumberFormat("sv-SE").format(totalValue)}
            </motion.p>
            <span className="text-xl font-bold text-muted-foreground mb-1">SEK</span>
          </div>
          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold ${avgChange >= 0 ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'}`}>
            {avgChange >= 0 ? '▲' : '▼'} {Math.abs(avgChange)}% snitt senaste 30 dagarna
          </div>

          {/* Fleet breakdown */}
          <div className="mt-6 pt-5 border-t border-border">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-4">Maskiner efter värde</p>
            <div className="space-y-3">
              {topMachines.map((m, i) => {
                const pct = Math.round((m.valueNum / totalValue) * 1000) / 10;
                const residualValue = Math.round(m.valueNum * 0.62);
                const depreciationValue = Math.round(m.valueNum * 0.78);
                const tradeInValue = Math.round(m.valueNum * 0.85);

                return (
                  <motion.div
                    key={m.id}
                    className="rounded-xl border border-border bg-muted/10 hover:border-primary/30 transition-all duration-200 cursor-pointer group"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    onClick={() => navigate(`/machine/${m.id}`)}
                  >
                    {/* Top row: image, name, value, liquidity */}
                    <div className="flex items-center gap-3 px-4 py-3">
                      <img src={m.image} alt={m.name} className="w-10 h-10 rounded-lg object-cover border border-border shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground truncate group-hover:text-primary transition-colors">{m.name}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">{m.category}</span>
                          <span className={`text-[10px] font-semibold ${m.change >= 0 ? 'text-success' : 'text-destructive'}`}>
                            {m.change >= 0 ? '+' : ''}{m.change}%
                          </span>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-sm font-bold text-foreground">{m.value}</p>
                        <p className="text-[10px] text-muted-foreground">{pct}% av totalen</p>
                      </div>
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <span className="text-[10px] font-bold text-primary">{m.liquidityIndex}</span>
                      </div>
                    </div>

                    {/* Bottom row: residual, depreciation, trade-in */}
                    <div className="grid grid-cols-3 gap-2 px-4 pb-3 pt-0">
                      <div className="rounded-lg bg-muted/30 px-2.5 py-1.5">
                        <p className="text-[9px] text-muted-foreground uppercase tracking-wider">Restvärde</p>
                        <p className="text-xs font-bold text-foreground">{new Intl.NumberFormat("sv-SE").format(residualValue)} <span className="text-muted-foreground font-normal">SEK</span></p>
                      </div>
                      <div className="rounded-lg bg-muted/30 px-2.5 py-1.5">
                        <p className="text-[9px] text-muted-foreground uppercase tracking-wider">Avskrivning</p>
                        <p className="text-xs font-bold text-foreground">{new Intl.NumberFormat("sv-SE").format(depreciationValue)} <span className="text-muted-foreground font-normal">SEK</span></p>
                      </div>
                      <div className="rounded-lg bg-muted/30 px-2.5 py-1.5">
                        <p className="text-[9px] text-muted-foreground uppercase tracking-wider">Inbytesvärde</p>
                        <p className="text-xs font-bold text-foreground">{new Intl.NumberFormat("sv-SE").format(tradeInValue)} <span className="text-muted-foreground font-normal">SEK</span></p>
                      </div>
                    </div>

                    {/* % bar */}
                    <div className="px-4 pb-3">
                      <div className="w-full h-1 rounded-full bg-muted overflow-hidden">
                        <motion.div
                          className="h-full rounded-full bg-primary/60"
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 0.8, delay: 0.4 + i * 0.1 }}
                        />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-border grid grid-cols-3 gap-4">
            <div>
              <p className="text-[11px] text-muted-foreground">Verifieringsmetod</p>
              <p className="text-xs font-semibold text-foreground">Triangulering + Expert</p>
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground">Senast uppdaterad</p>
              <p className="text-xs font-semibold text-foreground">Idag, 09:42</p>
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground">Konfidensintervall</p>
              <p className="text-xs font-semibold text-foreground">±3.2%</p>
            </div>
          </div>
        </motion.div>

        {/* Liquidity Gauge */}
        <motion.div
          className="lg:col-span-2 rounded-xl border border-border bg-card card-surface p-6 flex flex-col items-center justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <FleetLiquidityGauge value={Math.round(avgLiquidity)} />

          {/* Per-machine liquidity bars */}
          <div className="w-full mt-6 pt-4 border-t border-border space-y-2.5">
            <p className="text-[11px] text-muted-foreground uppercase tracking-wider mb-1">Per maskin</p>
            {machines.map((m) => (
              <div key={m.id} className="flex items-center gap-2">
                <span className="text-[11px] text-muted-foreground w-24 truncate">{m.name.split(' ').slice(0, 2).join(' ')}</span>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      background: m.liquidityIndex >= 80 ? "hsl(160 84% 39%)" : m.liquidityIndex >= 60 ? "hsl(43 96% 56%)" : "hsl(0 84% 60%)"
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${m.liquidityIndex}%` }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  />
                </div>
                <span className="text-[11px] font-bold text-foreground w-8 text-right">{m.liquidityIndex}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Residual Value Forecast Chart */}
      <motion.div
        className="rounded-xl border border-border bg-card card-surface p-5 sm:p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
          <div>
            <h3 className="text-base font-bold text-foreground">Residual Value – 3-årsprognos</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Prognostiserat flottavärde med optimistiskt, förväntat och konservativt scenario</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 rounded bg-success" />
              <span className="text-[10px] text-muted-foreground">Optimistiskt</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 rounded bg-primary" />
              <span className="text-[10px] text-muted-foreground">Förväntat</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 rounded bg-destructive" />
              <span className="text-[10px] text-muted-foreground">Konservativt</span>
            </div>
          </div>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={forecastData} margin={{ top: 5, right: 20, bottom: 0, left: 5 }}>
              <defs>
                <linearGradient id="areaOptimistic" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(160 84% 39%)" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="hsl(160 84% 39%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(217 25% 25%)" vertical={false} />
              <XAxis
                dataKey="period"
                tick={{ fill: "hsl(215 20% 55%)", fontSize: 10 }}
                axisLine={false}
                tickLine={false}
                interval={2}
              />
              <YAxis
                tick={{ fill: "hsl(215 20% 55%)", fontSize: 10 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`}
                width={50}
              />
              <Tooltip content={<ForecastTooltip />} />
              <Line type="monotone" dataKey="optimistic" name="Optimistiskt" stroke="hsl(160 84% 39%)" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="expected" name="Förväntat" stroke="hsl(43 96% 56%)" strokeWidth={2.5} dot={false} />
              <Line type="monotone" dataKey="conservative" name="Konservativt" stroke="hsl(0 84% 60%)" strokeWidth={2} dot={false} strokeDasharray="6 3" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Action Center */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35 }}
      >
        <h3 className="text-base font-bold text-foreground mb-4">Action Center</h3>
        <div className="grid sm:grid-cols-3 gap-5">
          {/* Refinance */}
          <div className="rounded-xl border border-border bg-card card-surface p-6 hover:border-primary/30 transition-all duration-300 group flex flex-col">
            <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors">
              <Banknote className="w-6 h-6 text-secondary" />
            </div>
            <h4 className="text-lg font-bold text-foreground mb-1">Refinansiera</h4>
            <p className="text-xs text-muted-foreground mb-1">Koppling till bank</p>
            <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-4">
              Frigör dold likviditet genom att refinansiera obelånade maskiner. Bank-Ready rapporter bifogas automatiskt.
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
              <CheckCircle2 className="w-3.5 h-3.5 text-success" />
              <span>Snitt 12% dold likviditet</span>
            </div>
            <Button className="gradient-gold text-primary-foreground font-semibold w-full">
              Ansök om refinansiering
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* Sell in Pool */}
          <div className="rounded-xl border border-border bg-card card-surface p-6 hover:border-primary/30 transition-all duration-300 group flex flex-col">
            <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center mb-4 group-hover:bg-success/20 transition-colors">
              <ShoppingCart className="w-6 h-6 text-success" />
            </div>
            <h4 className="text-lg font-bold text-foreground mb-1">Sälj i Poolen</h4>
            <p className="text-xs text-muted-foreground mb-1">5% kommission</p>
            <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-4">
              Publicera maskiner i vår exklusiva säljpool. Verifierade köpare med omedelbar tillgång till dina tillgångar.
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
              <CheckCircle2 className="w-3.5 h-3.5 text-success" />
              <span>Snitt 14 dagar till försäljning</span>
            </div>
            <Button variant="outline" className="w-full font-semibold border-success/30 text-success hover:bg-success/10 hover:text-success">
              Publicera i Poolen
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* Export PDF */}
          <div className="rounded-xl border border-border bg-card card-surface p-6 hover:border-primary/30 transition-all duration-300 group flex flex-col">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <Download className="w-6 h-6 text-primary" />
            </div>
            <h4 className="text-lg font-bold text-foreground mb-1">Exportera PDF</h4>
            <p className="text-xs text-muted-foreground mb-1">Officiellt intyg</p>
            <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-4">
              Ladda ner ett signerat värderingsintyg för revision, bank eller försäkring. Expertverifierat med mänsklig signatur.
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
              <CheckCircle2 className="w-3.5 h-3.5 text-success" />
              <span>Leverans inom 24h</span>
            </div>
            <Button variant="outline" className="w-full font-semibold border-border hover:border-primary/40">
              Beställ värderingsintyg
              <Download className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
