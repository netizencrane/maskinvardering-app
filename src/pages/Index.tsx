import { Plus, Warehouse, TrendingUp, Target, DollarSign } from "lucide-react";
import { motion } from "framer-motion";
import { MachineCard } from "@/components/MachineCard";
import { StatsCard } from "@/components/StatsCard";
import { FilterBar } from "@/components/FilterBar";
import { Button } from "@/components/ui/button";
import { machines } from "@/data/machines";

const Index = () => {
  return (
    <div className="space-y-6">
      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Totalt Flottavärde" value="9 475 000 kr" change="▲ 2.8% denna månad" changeType="positive" icon={DollarSign} delay={0} />
        <StatsCard title="Maskiner" value="6" change="2 nya denna månad" changeType="neutral" icon={Warehouse} delay={0.1} />
        <StatsCard title="Snitt Likviditetsindex" value="79.2%" change="▲ 1.4 poäng" changeType="positive" icon={Target} delay={0.2} />
        <StatsCard title="Marknadstrend" value="+2.3%" change="Nordisk marknad" changeType="positive" icon={TrendingUp} delay={0.3} />
      </div>

      {/* Header + Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-foreground">Maskinparken</h2>
          <p className="text-sm text-muted-foreground mt-0.5">Överblick av alla dina tillgångar</p>
        </div>
        <Button className="gradient-gold text-primary-foreground font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
          <Plus className="w-4 h-4 mr-2" />
          Lägg till maskin
        </Button>
      </div>

      <FilterBar />

      {/* Machine Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {machines.map((machine) => (
          <MachineCard key={machine.id} id={machine.id} {...machine} />
        ))}
      </div>
    </div>
  );
};

export default Index;
