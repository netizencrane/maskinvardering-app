import { motion } from "framer-motion";
import { Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface Props {
  machineType: string;
}

export function ExpertCallCta({ machineType }: Props) {
  const navigate = useNavigate();

  return (
    <section className="py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="flex flex-col sm:flex-row items-center gap-6 p-8 rounded-2xl border border-primary/20 bg-primary/5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
            <Phone className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h3 className="text-lg font-extrabold mb-1">Boka ett expertsamtal – gratis 15 min</h3>
            <p className="text-sm text-muted-foreground">
              Har du en högvärdig {machineType.toLowerCase()} eller komplex flotta? Prata direkt med en certifierad maskinvärderingsexpert.
            </p>
          </div>
          <Button className="gradient-gold text-primary-foreground font-semibold px-6 h-auto py-2.5 shrink-0" onClick={() => navigate("/kontakt")}>
            Boka samtal <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
