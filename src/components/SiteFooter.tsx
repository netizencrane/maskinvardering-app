import { useNavigate } from "react-router-dom";
import logoIcon from "@/assets/logo-icon.png";
import { categories } from "@/data/categories";

const maskintyper = [
  { label: "Värdera Grävmaskin", href: "/vardera-gravmaskin" },
  { label: "Värdera Hjullastare", href: "/vardera-hjullastare" },
  { label: "Värdera Dumper", href: "/vardera-dumper" },
  { label: "Värdera Kran", href: "/vardera-kran" },
  { label: "Värdera Lastbil", href: "/vardera-lastbil" },
  { label: "Värdera Teleskoplastare", href: "/vardera-teleskoplastare" },
];

const corporateLinks = [
  { label: "Om oss", href: "/om-plattformen" },
  { label: "Hur funkar det?", href: "/hur-funkar-det" },
  { label: "Kontakt", href: "/kontakt" },
  { label: "Villkor", href: "/" },
  { label: "Integritetspolicy", href: "/" },
  { label: "Karriär", href: "/" },
];

const topBrands = [
  { label: "Volvo", href: "/tillverkare/volvo" },
  { label: "CAT", href: "/tillverkare/cat" },
  { label: "Komatsu", href: "/tillverkare/komatsu" },
  { label: "Liebherr", href: "/tillverkare/liebherr" },
  { label: "Hitachi", href: "/tillverkare/hitachi" },
  { label: "Scania", href: "/tillverkare/scania" },
];

const topModels = [
  { label: "Volvo EC220E", href: "/tillverkare/volvo/volvo-ec220e" },
  { label: "CAT 320", href: "/tillverkare/cat/cat-320" },
  { label: "Komatsu PC210", href: "/tillverkare/komatsu/komatsu-pc210" },
  { label: "Liebherr LTM 1100", href: "/tillverkare/liebherr/liebherr-ltm-1100" },
  { label: "Hitachi ZX210", href: "/tillverkare/hitachi/hitachi-zx210" },
  { label: "Scania R500", href: "/tillverkare/scania/scania-r500" },
];

const topCategories = categories.slice(0, 6).map((c) => ({
  label: c.name,
  href: `/${c.slug}`,
}));

export function SiteFooter() {
  const navigate = useNavigate();

  const linkClass =
    "text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 block";

  return (
    <footer className="border-t border-border bg-[hsl(222_47%_6%)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-10 lg:gap-6">
          {/* Col 1: About */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-2">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2.5 mb-4 hover:opacity-80 transition-opacity duration-200"
            >
              <svg width="32" height="32" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                <rect width="36" height="36" rx="8" fill="hsl(43 96% 56%)" />
                <circle cx="18" cy="18" r="10" stroke="hsl(222 47% 11%)" strokeWidth="1.5" fill="none" />
                <line x1="18" y1="6" x2="18" y2="12" stroke="hsl(222 47% 11%)" strokeWidth="1.5" />
                <line x1="18" y1="24" x2="18" y2="30" stroke="hsl(222 47% 11%)" strokeWidth="1.5" />
                <line x1="6" y1="18" x2="12" y2="18" stroke="hsl(222 47% 11%)" strokeWidth="1.5" />
                <line x1="24" y1="18" x2="30" y2="18" stroke="hsl(222 47% 11%)" strokeWidth="1.5" />
                <rect x="13" y="20" width="3" height="6" rx="0.5" fill="hsl(222 47% 11%)" />
                <rect x="17" y="17" width="3" height="9" rx="0.5" fill="hsl(222 47% 11%)" />
                <rect x="21" y="14" width="3" height="12" rx="0.5" fill="hsl(222 47% 11%)" />
              </svg>
              <span className="text-sm font-extrabold tracking-tight">
                <span className="text-gradient-gold">Maskin</span>
                <span className="text-foreground">värdering</span>
                <span className="text-muted-foreground">.se</span>
              </span>
            </button>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Nordens ledande plattform för AI-driven maskinvärdering. Vi kombinerar realtidsdata, global expertis och mänsklig validering.
            </p>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">info@maskinvardering.se</p>
              <p className="text-xs text-muted-foreground">Stockholm, Sverige</p>
            </div>
          </div>

          {/* Col 2: Värdera maskin */}
          <div>
            <h4 className="text-sm font-bold text-foreground mb-4">Värdera maskin</h4>
            <ul className="space-y-2.5">
              {maskintyper.map((link) => (
                <li key={link.label}>
                  <button onClick={() => navigate(link.href)} className={linkClass}>{link.label}</button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Kategori */}
          <div>
            <h4 className="text-sm font-bold text-foreground mb-4">Värdera kategori</h4>
            <ul className="space-y-2.5">
              {topCategories.map((link) => (
                <li key={link.label}>
                  <button onClick={() => navigate(link.href)} className={linkClass}>{link.label}</button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Märke */}
          <div>
            <h4 className="text-sm font-bold text-foreground mb-4">Värdera märke</h4>
            <ul className="space-y-2.5">
              {topBrands.map((link) => (
                <li key={link.label}>
                  <button onClick={() => navigate(link.href)} className={linkClass}>{link.label}</button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5: Modell */}
          <div className="hidden sm:block">
            <h4 className="text-sm font-bold text-foreground mb-4">Populära modeller</h4>
            <ul className="space-y-2.5">
              {topModels.map((link) => (
                <li key={link.label}>
                  <button onClick={() => navigate(link.href)} className={linkClass}>{link.label}</button>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Företag row */}
        <div className="border-t border-border mt-10 pt-8">
          <div className="flex flex-wrap gap-x-8 gap-y-2">
            {corporateLinks.map((link) => (
              <button key={link.label} onClick={() => navigate(link.href)} className={linkClass}>{link.label}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            © 2026 Maskinvärdering.se. Alla rättigheter förbehållna.
          </p>
          <p className="text-xs text-muted-foreground/60">
            en del av MaskinFinans
          </p>
        </div>
      </div>
    </footer>
  );
}
