import { Bell, Eye, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface AuctionWatchCtaProps {
  label: string;
  activeCount?: number;
}

export function AuctionWatchCta({ label, activeCount }: AuctionWatchCtaProps) {
  const navigate = useNavigate();
  return (
    <motion.div
      className="rounded-2xl border border-primary/30 bg-card/50 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-5"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
        <Eye className="w-6 h-6 text-primary" />
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-extrabold uppercase tracking-wide mb-1">
          Bevaka auktioner för {label}
        </h3>
        <p className="text-sm text-muted-foreground">
          Få notis direkt när nya objekt dyker upp på marknaden.
        </p>
        {activeCount != null && (
          <p className="text-sm mt-1">
            <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1.5 pulse-green" />
            <span className="text-primary font-bold">{activeCount} aktiva</span>
            <span className="text-muted-foreground"> just nu</span>
          </p>
        )}
      </div>
      <Button
        className="gradient-gold text-primary-foreground font-bold uppercase tracking-wide shrink-0"
        onClick={() => navigate("/kontakt")}
      >
        <Bell className="w-4 h-4 mr-2" />
        Skapa bevakning
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </motion.div>
  );
}
