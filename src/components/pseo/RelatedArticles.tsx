import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, ArrowRight } from "lucide-react";
import { articles } from "@/data/articles";

interface Props {
  machineType: string;
}

export function RelatedArticles({ machineType }: Props) {
  // Show first 3 articles as related content
  const related = articles.slice(0, 3);

  return (
    <section className="py-16 px-4 border-t border-border">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="flex items-center gap-3 mb-3">
            <BookOpen className="w-5 h-5 text-primary" />
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Kunskapsbank – <span className="text-gradient-gold">{machineType}</span>
            </h2>
          </div>
          <p className="text-muted-foreground mb-8 max-w-xl">
            Fördjupa dig i värdering, finansiering och marknadstrender för att fatta bättre beslut.
          </p>
          <div className="grid sm:grid-cols-3 gap-5">
            {related.map((a, i) => (
              <motion.div
                key={a.slug}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  to={`/artiklar/${a.slug}`}
                  className="block p-6 rounded-2xl border border-border bg-card/50 hover:border-primary/30 transition-all duration-200 group h-full"
                >
                  <span className="text-xs font-bold text-primary uppercase tracking-wider">{a.category}</span>
                  <h3 className="text-base font-bold mt-2 mb-2 group-hover:text-primary transition-colors leading-snug">{a.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{a.excerpt}</p>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    Läs artikel <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
