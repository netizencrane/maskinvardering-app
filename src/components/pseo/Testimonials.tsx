import { motion } from "framer-motion";
import { Quote } from "lucide-react";

interface Props {
  machineType: string;
}

const testimonials = [
  {
    quote: "Vi sålde vår grävmaskin för 15% mer än väntat tack vare VMV-rapporten. Banken godkände refinansieringen samma vecka.",
    name: "F. Lindström",
    role: "Ägare, entreprenadbolag i Västsverige",
  },
  {
    quote: "Likviditetsindex hjälpte oss tajma försäljningen av tre maskiner – vi frigjorde 2,4 MSEK i kapital på under en månad.",
    name: "M. Sandberg",
    role: "Ekonomiansvarig, maskinuthyrning i Mälardalen",
  },
  {
    quote: "Snabbast och mest professionella värderingsunderlaget vi sett. Kreditkommittén godkände utan kompletteringar.",
    name: "A. Karlsson",
    role: "CFO, åkeriföretag i Norrbotten",
  },
];

export function Testimonials({ machineType }: Props) {
  return (
    <section className="py-16 px-4 border-t border-border">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3">
            Vad våra kunder säger
          </h2>
          <p className="text-muted-foreground mb-10 max-w-xl">
            Företagare och ekonomichefer som använder Maskinvärdering.se för bättre beslut.
          </p>
          <div className="grid sm:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                className="p-6 rounded-2xl border border-border bg-card/50 relative"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Quote className="w-8 h-8 text-primary/20 absolute top-4 right-4" />
                <p className="text-sm leading-relaxed mb-5 italic text-muted-foreground">"{t.quote}"</p>
                <div>
                  <p className="text-sm font-bold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
