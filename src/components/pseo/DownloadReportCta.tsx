import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Download, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  machineType: string;
}

export function DownloadReportCta({ machineType }: Props) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSent(true);
  };

  return (
    <section className="py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="p-8 sm:p-10 rounded-2xl border border-border bg-card/50 relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="absolute top-0 right-0 w-[300px] h-[200px] bg-primary/5 blur-[80px] rounded-full pointer-events-none" />
          <div className="relative z-10 flex flex-col sm:flex-row items-start gap-6">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-extrabold mb-1">Ladda ner exempelrapport – VMV {machineType}</h3>
              <p className="text-sm text-muted-foreground mb-5">
                Se exakt hur ett Verifierat Marknadsvärde-intyg ser ut. Innehåller konfidensintervall, likviditetsindex och residualvärdeprognos.
              </p>
              {sent ? (
                <motion.div
                  className="flex items-center gap-2 text-sm font-semibold text-primary"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  Exempelrapport skickad till {email}
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex gap-3 max-w-md">
                  <input
                    type="email"
                    required
                    placeholder="din@epost.se"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="flex-1 rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                  <Button type="submit" className="gradient-gold text-primary-foreground font-semibold px-5 h-auto py-2.5 shrink-0">
                    <Download className="w-4 h-4 mr-1" /> Ladda ner
                  </Button>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
