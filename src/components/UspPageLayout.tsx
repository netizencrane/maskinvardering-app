import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SEOHead } from "@/components/SEOHead";
import { type LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface UspPageLayoutProps {
  icon: LucideIcon;
  title: string;
  tagline: string;
  headline: ReactNode;
  subtitle: string;
  ctaText: string;
  ctaLink?: string;
  heroImage?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoCanonical?: string;
  seoJsonLd?: Record<string, unknown> | Record<string, unknown>[];
  children: ReactNode;
}

export function UspPageLayout({ icon: Icon, title, tagline, headline, subtitle, ctaText, ctaLink, heroImage, seoTitle, seoDescription, seoCanonical, seoJsonLd, children }: UspPageLayoutProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {seoTitle && seoDescription && (
        <SEOHead title={seoTitle} description={seoDescription} canonical={seoCanonical} jsonLd={seoJsonLd} />
      )}
      <SiteHeader />

      {/* Hero */}
      <section className="py-20 sm:py-28 px-4 relative overflow-hidden">
        {heroImage && (
          <>
            <img src={heroImage} alt="" className="absolute inset-0 w-full h-full object-cover z-0" />
            <div className="absolute inset-0 bg-background/75 backdrop-blur-[2px] z-0" />
          </>
        )}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px] pointer-events-none z-0" />
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-3 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Icon className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-foreground">{title}</h2>
                <span className="text-xs font-semibold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">{tagline}</span>
              </div>
            </div>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {headline}
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-3"
          >
            <Button className="gradient-gold text-primary-foreground font-semibold text-base px-8 py-3 h-auto" onClick={() => navigate(ctaLink || "/dashboard")}>
              {ctaText}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button variant="outline" className="text-base px-8 py-3 h-auto" onClick={() => navigate("/")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Tillbaka
            </Button>
          </motion.div>
        </div>
      </section>

      {children}

      {/* CTA */}
      <section className="py-20 px-4">
        <motion.div
          className="max-w-3xl mx-auto text-center rounded-3xl border border-border bg-card/50 p-10 sm:p-16 relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 relative z-10">Redo att komma igång?</h2>
          <p className="text-muted-foreground mb-8 relative z-10">Gratis att testa. Resultat på 15 minuter.</p>
          <Button
            className="gradient-gold text-primary-foreground font-bold text-base px-10 py-3.5 h-auto relative z-10 hover:scale-105 transition-transform"
            onClick={() => navigate("/dashboard")}
          >
            Verifiera Värde nu
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
      </section>

      <SiteFooter />
    </div>
  );
}
