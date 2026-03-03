import { Landmark, TrendingUp, TrendingDown, ArrowUpRight, Wallet, CreditCard, PiggyBank, FileText } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const financialStats = [
  { label: "Totalt maskinvärde", value: "8 450 000 SEK", sub: "+340 000 senaste 30d", icon: Wallet, color: "text-primary", trend: "up" },
  { label: "Obelånat kapital", value: "3 200 000 SEK", sub: "Kan frigöras via refinansiering", icon: PiggyBank, color: "text-success", trend: "up" },
  { label: "Månadskostnad lån", value: "47 500 SEK", sub: "3 aktiva maskinlån", icon: CreditCard, color: "text-secondary", trend: "neutral" },
  { label: "Värdeutlåtanden", value: "12", sub: "4 väntar på signatur", icon: FileText, color: "text-primary", trend: "neutral" },
];

const loans = [
  { machine: "Volvo EC220E", bank: "SEB", remaining: "620 000", rate: "4.2%", monthly: "18 500", marketValue: "1 250 000", status: "Aktiv" },
  { machine: "CAT 950M", bank: "Nordea", remaining: "340 000", rate: "3.8%", monthly: "14 200", marketValue: "890 000", status: "Aktiv" },
  { machine: "Komatsu PC210", bank: "Handelsbanken", remaining: "450 000", rate: "4.5%", monthly: "14 800", marketValue: "980 000", status: "Aktiv" },
];

const unlocked = [
  { machine: "Hitachi ZX130", marketValue: "1 100 000", potentialLoan: "770 000", note: "Obelånad – hög refinansieringspotential" },
  { machine: "JCB 3CX", marketValue: "560 000", potentialLoan: "390 000", note: "Obelånad – kan frigöra kassaflöde" },
];

export default function Ekonomi() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Ekonomi</h1>
        <p className="text-muted-foreground mt-1">Översikt av maskinparkens finansiella status, lån och dold likviditet.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {financialStats.map((stat, i) => (
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

      {/* Active Loans */}
      <div>
        <h2 className="text-lg font-bold mb-4">Aktiva maskinlån</h2>
        <div className="rounded-2xl border border-border bg-card/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3">Maskin</th>
                  <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3">Bank</th>
                  <th className="text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3">Kvar att betala</th>
                  <th className="text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3">Ränta</th>
                  <th className="text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3">Månadsbetalning</th>
                  <th className="text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3">Marknadsvärde</th>
                </tr>
              </thead>
              <tbody>
                {loans.map((loan, i) => (
                  <motion.tr
                    key={loan.machine}
                    className="border-b border-border/50 hover:bg-muted/30 transition-colors duration-200"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                  >
                    <td className="px-5 py-4 text-sm font-semibold">{loan.machine}</td>
                    <td className="px-5 py-4 text-sm text-muted-foreground">{loan.bank}</td>
                    <td className="px-5 py-4 text-sm text-right">{loan.remaining} SEK</td>
                    <td className="px-5 py-4 text-sm text-right text-muted-foreground">{loan.rate}</td>
                    <td className="px-5 py-4 text-sm text-right font-semibold">{loan.monthly} SEK</td>
                    <td className="px-5 py-4 text-sm text-right font-bold text-gradient-gold">{loan.marketValue} SEK</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Hidden Liquidity */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Dold likviditet – Obelånade maskiner</h2>
          <Button variant="outline" size="sm">
            Utforska refinansiering
          </Button>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {unlocked.map((item, i) => (
            <motion.div
              key={item.machine}
              className="p-5 rounded-2xl border border-primary/20 bg-card/50 hover:border-primary/40 transition-all duration-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <h3 className="font-bold mb-1">{item.machine}</h3>
              <p className="text-xs text-muted-foreground mb-3">{item.note}</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Marknadsvärde</p>
                  <p className="text-sm font-bold">{item.marketValue} SEK</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Möjligt lån (70%)</p>
                  <p className="text-sm font-bold text-gradient-gold">{item.potentialLoan} SEK</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
