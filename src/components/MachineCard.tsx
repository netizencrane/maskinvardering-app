import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface MachineCardProps {
  id: string;
  name: string;
  image: string;
  liquidityIndex: number;
  precision: number;
  category: string;
  status: "verified" | "ai-estimate" | "in-pool";
  value: string;
  change: number;
}

function StatusBadge({ status }: { status: MachineCardProps["status"] }) {
  switch (status) {
    case "verified":
      return (
      <span className="inline-flex items-center gap-1.5 rounded-full gradient-gold px-2.5 py-0.5 text-[10px] font-semibold text-primary-foreground">
          Expertverifierad
        </span>
      );
    case "ai-estimate":
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-0.5 text-[10px] font-semibold text-secondary">
          AI Estimate
        </span>
      );
    case "in-pool":
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-0.5 text-[10px] font-semibold text-success">
          <span className="w-1.5 h-1.5 rounded-full bg-success pulse-green" />
          In Pool
        </span>
      );
  }
}

export function MachineCard({ id, name, image, liquidityIndex, precision, category, status, value, change }: MachineCardProps) {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      onClick={() => navigate(`/machine/${id}`)}
      className="group relative overflow-hidden rounded-xl border border-border bg-card card-surface cursor-pointer transition-all duration-300 hover:border-primary/30 hover:glow-primary"
    >
      {/* Image */}
      <div className="relative h-40 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
        <div className="absolute top-3 left-3">
          <StatusBadge status={status} />
        </div>
        <div className="absolute bottom-3 left-3">
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">{category}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-semibold text-foreground leading-tight">{name}</h3>
          <div className="text-right shrink-0">
            <p className="text-2xl font-extrabold text-primary leading-none">{liquidityIndex}%</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">Likviditetsindex</p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground mb-0.5">Indikativt Marknadsvärde</p>
            <p className="text-lg font-bold text-foreground">{value}</p>
            <p className={`text-xs font-medium ${change >= 0 ? 'text-success' : 'text-destructive'}`}>
              {change >= 0 ? '▲' : '▼'} {Math.abs(change)}% senaste 30d
            </p>
          </div>
        </div>

        {/* Precision Meter */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-muted-foreground">Precision</span>
            <span className="text-[10px] font-semibold text-foreground">{precision}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full precision-meter transition-all duration-700"
              style={{ width: `${precision}%` }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
