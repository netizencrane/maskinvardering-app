import { SEOHead, breadcrumbSchema } from "@/components/SEOHead";
import { ArrowRight, CheckCircle2, TrendingUp, Shield, Clock, Target } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { AuctionWatchCta } from "@/components/AuctionWatchCta";
import { getCategoryForMachineType } from "@/data/categories";
import { type LucideIcon } from "lucide-react";
import { PriceHistoryChart } from "@/components/pseo/PriceHistoryChart";
import { QuickValuationTool } from "@/components/pseo/QuickValuationTool";
import { ModelComparison } from "@/components/pseo/ModelComparison";
import { RelatedArticles } from "@/components/pseo/RelatedArticles";
import { RecentTransactions } from "@/components/pseo/RecentTransactions";
import { Testimonials } from "@/components/pseo/Testimonials";
import { ExpertCallCta } from "@/components/pseo/ExpertCallCta";
import { DownloadReportCta } from "@/components/pseo/DownloadReportCta";

interface PseoModel {
  name: string;
  priceRange: string;
  liquidity: number;
}

interface PseoFaq {
  q: string;
  a: string;
}

export interface MachineTypePageProps {
  slug: string;
  machineType: string;
  metaTitle: string;
  metaDescription: string;
  heroImage: string;
  heroAlt: string;
  h1: string;
  intro: string;
  brands: string[];
  models: PseoModel[];
  valuationFactors: { icon: LucideIcon; title: string; description: string }[];
  marketInsight: string;
  avgPrice: string;
  avgLiquidity: string;
  trendDirection: string;
  faqs: PseoFaq[];
  relatedTypes: { label: string; href: string }[];
}

export function MachineTypePage({
  slug, machineType, metaTitle, metaDescription, heroImage, heroAlt,
  h1, intro, brands, models, valuationFactors, marketInsight,
  avgPrice, avgLiquidity, trendDirection, faqs, relatedTypes,
}: MachineTypePageProps) {
  const navigate = useNavigate();
  const category = getCategoryForMachineType(`/${slug}`);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Värdera ${machineType} – Maskinvärdering.se`,
    description: metaDescription,
    provider: {
      "@type": "Organization",
      name: "Maskinvärdering.se",
      url: "https://maskinvardering.se",
    },
    areaServed: { "@type": "Place", name: "Norden" },
    serviceType: `${machineType}värdering`,
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbs = [
    { name: "Hem", url: "https://maskinvardering.se/" },
    ...(category ? [{ name: category.name, url: `https://maskinvardering.se/${category.slug}` }] : []),
    { name: machineType, url: `https://maskinvardering.se/${slug}` },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title={metaTitle}
        description={metaDescription}
        canonical={`https://maskinvardering.se/${slug}`}
        jsonLd={[jsonLd, faqJsonLd, breadcrumbSchema(breadcrumbs)]}
      />
      <SiteHeader />

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
        <Breadcrumbs items={[
          ...(category ? [{ label: category.name, href: `/${category.slug}` }] : []),
          { label: machineType },
        ]} />
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <img src={heroImage} alt={heroAlt} className="absolute inset-0 w-full h-full object-cover" loading="eager" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
          <motion.div className="max-w-2xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-xs font-bold text-primary uppercase tracking-wider mb-4 block">Maskinvärdering</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08] mb-6">{h1}</h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl">{intro}</p>
            <div className="flex flex-wrap gap-3">
              <Button className="gradient-gold text-primary-foreground font-semibold text-base px-8 py-3 h-auto" onClick={() => navigate("/dashboard")}>
                Verifiera Värde
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="outline" className="text-base px-8 py-3 h-auto" onClick={() => navigate("/likviditetsindex")}>
                Läs om Likviditetsindex
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Market Stats */}
      <section className="py-16 px-4 border-t border-border">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-3 gap-6">
            {[
              { label: `Snittpris ${machineType.toLowerCase()}`, value: avgPrice, icon: Target },
              { label: "Snitt likviditetsindex", value: avgLiquidity, icon: TrendingUp },
              { label: "Marknadstrend 30d", value: trendDirection, icon: Shield },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                className="p-6 rounded-2xl border border-border bg-card/50 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <stat.icon className="w-5 h-5 text-primary mx-auto mb-3" />
                <p className="text-2xl sm:text-3xl font-extrabold text-gradient-gold">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-2 uppercase tracking-wider">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="py-16 px-4 border-t border-border">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3">
            Värdera {machineType.toLowerCase()} från <span className="text-gradient-gold">alla märken</span>
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl">Vi täcker alla ledande tillverkare med realtidsdata från Norden och globalt.</p>
          <div className="flex flex-wrap gap-3">
            {brands.map((brand) => {
              const slug = brand.toLowerCase().replace(/\s+/g, "-");
              return (
                <Link key={brand} to={`/tillverkare/${slug}`} className="px-5 py-2.5 rounded-xl border border-border bg-card/50 text-sm font-semibold hover:border-primary/30 hover:bg-card transition-all duration-200">
                  {brand}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Popular Models Table */}
      <section className="py-16 px-4 border-t border-border">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-8">
            Populära modeller – <span className="text-gradient-gold">{machineType}</span>
          </h2>
          <div className="rounded-2xl border border-border bg-card/50 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6 py-4">Modell</th>
                  <th className="text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6 py-4">Prisintervall (SEK)</th>
                  <th className="text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6 py-4">Likviditetsindex</th>
                </tr>
              </thead>
              <tbody>
                {models.map((m, i) => (
                  <motion.tr
                    key={m.name}
                    className="border-b border-border/50 hover:bg-muted/20 transition-colors duration-200"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <td className="px-6 py-4 text-sm font-bold">{m.name}</td>
                    <td className="px-6 py-4 text-sm text-right text-muted-foreground">{m.priceRange}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden">
                          <div className="h-full rounded-full bg-primary" style={{ width: `${m.liquidity}%` }} />
                        </div>
                        <span className="text-xs font-bold">{m.liquidity}%</span>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Valuation Factors */}
      <section className="py-16 px-4 border-t border-border">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3">
            Vad påverkar värdet på en {machineType.toLowerCase()}?
          </h2>
          <p className="text-muted-foreground mb-10 max-w-xl">{marketInsight}</p>
          <div className="grid sm:grid-cols-2 gap-5">
            {valuationFactors.map((f, i) => (
              <motion.div
                key={f.title}
                className="p-6 rounded-2xl border border-border bg-card/50 hover:border-primary/20 transition-all duration-300 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <f.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-base font-bold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Price History Chart */}
      <PriceHistoryChart machineType={machineType} />

      {/* Quick Valuation Tool */}
      <QuickValuationTool machineType={machineType} brands={brands} />

      {/* Model Comparison */}
      <ModelComparison machineType={machineType} models={models} />

      {/* Recent Transactions */}
      <RecentTransactions machineType={machineType} models={models} />

      {/* Testimonials */}
      <Testimonials machineType={machineType} />

      {/* Download Report CTA */}
      <DownloadReportCta machineType={machineType} />

      {/* Expert Call CTA */}
      <ExpertCallCta machineType={machineType} />

      {/* FAQ */}
      <section className="py-16 px-4 border-t border-border">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-10">
            Vanliga frågor om {machineType.toLowerCase()}värdering
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.details
                key={i}
                className="group p-5 rounded-2xl border border-border bg-card/50 hover:bg-card transition-colors duration-200 cursor-pointer"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <summary className="text-sm font-bold list-none flex items-center justify-between">
                  {faq.q}
                  <span className="text-muted-foreground group-open:rotate-45 transition-transform duration-200 text-lg">+</span>
                </summary>
                <p className="text-sm text-muted-foreground leading-relaxed mt-3 pt-3 border-t border-border">{faq.a}</p>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <RelatedArticles machineType={machineType} />

      {/* Related Types */}
      <section className="py-16 px-4 border-t border-border">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl font-bold mb-6">Värdera fler maskintyper</h2>
          <div className="flex flex-wrap gap-3">
            {relatedTypes.map((rt) => (
              <Button key={rt.href} variant="outline" onClick={() => navigate(rt.href)} className="font-semibold">
                {rt.label}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Auction Watch CTA */}
      <section className="py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <AuctionWatchCta label={machineType.toLowerCase()} activeCount={Math.floor(Math.random() * 30) + 10} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <motion.div
          className="max-w-3xl mx-auto text-center rounded-3xl border border-border bg-card/50 p-10 sm:p-16 relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 relative z-10">
            Redo att värdera din {machineType.toLowerCase()}?
          </h2>
          <p className="text-muted-foreground mb-8 relative z-10">Gratis att testa. Resultat på 15 minuter. Expertverifierat.</p>
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
