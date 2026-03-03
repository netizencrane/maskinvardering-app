import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Search, ChevronDown, ChevronRight, Shield, LogOut, Settings, LayoutDashboard, TrendingUp, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import logoIcon from "@/assets/logo-icon.png";

import { categories } from "@/data/categories";

const megaMenuCategories = categories.map((c) => ({
  name: c.name,
  slug: c.slug,
  types: c.types.map((t) => ({ label: t.label, href: t.href, count: t.count })),
  totalActive: c.totalActive,
}));

const värderaMaskinLinks = [
  { label: "Värdera Grävmaskin", href: "/vardera-gravmaskin" },
  { label: "Värdera Hjullastare", href: "/vardera-hjullastare" },
  { label: "Värdera Dumper", href: "/vardera-dumper" },
  { label: "Värdera Kran", href: "/vardera-kran" },
  { label: "Värdera Lastbil", href: "/vardera-lastbil" },
  { label: "Värdera Teleskoplastare", href: "/vardera-teleskoplastare" },
];

const tjänsterLinks = [
  { label: "Verifierat Marknadsvärde", href: "/vmv" },
  { label: "Likviditetsindex", href: "/likviditetsindex" },
  { label: "Human-in-the-Loop", href: "/human-in-the-loop" },
  { label: "Exit-planering", href: "/exit-planering" },
  { label: "Dold Likviditet", href: "/dold-likviditet" },
];

const målgrupperLinks = [
  { label: "Entreprenören", subtitle: "1–3 maskiner", href: "/entreprenoren" },
  { label: "Entreprenadbolag", subtitle: "5–50 maskiner", href: "/entreprenadbolag" },
  { label: "Uthyrningsbolag", subtitle: "Maskinuthyrning", href: "/uthyrningsbolag" },
  { label: "Maskinhandlaren", subtitle: "Köper & säljer", href: "/maskinhandlaren" },
  { label: "Verkstäder", subtitle: "Service & reparation", href: "/verkstader" },
];

export function SiteHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut } = useAuth();
  const isLoggedIn = !!user;
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [activeMegaCat, setActiveMegaCat] = useState(megaMenuCategories[0].slug);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [målgrupperOpen, setMålgrupperOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const målgrupperRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (megaMenuRef.current && !megaMenuRef.current.contains(e.target as Node)) {
        setMegaMenuOpen(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
      if (målgrupperRef.current && !målgrupperRef.current.contains(e.target as Node)) {
        setMålgrupperOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setMegaMenuOpen(false);
    setDropdownOpen(false);
    setMålgrupperOpen(false);
    setUserMenuOpen(false);
    setMobileOpen(false);
  }, [location.pathname]);

  const navLinkClass =
    "text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200";
  const activeClass = "text-primary font-bold";

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-[hsl(222_47%_6%/0.9)] backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(true)}
          className="lg:hidden p-2 -ml-2 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Öppna meny"
        >
          <Menu className="w-5 h-5" />
        </button>
        {/* Logo */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity duration-200 shrink-0"
        >
          {/* SVG Logo Icon */}
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
            <rect width="36" height="36" rx="8" fill="hsl(43 96% 56%)" />
            {/* Crosshair circle */}
            <circle cx="18" cy="18" r="10" stroke="hsl(222 47% 11%)" strokeWidth="1.5" fill="none" />
            <line x1="18" y1="6" x2="18" y2="12" stroke="hsl(222 47% 11%)" strokeWidth="1.5" />
            <line x1="18" y1="24" x2="18" y2="30" stroke="hsl(222 47% 11%)" strokeWidth="1.5" />
            <line x1="6" y1="18" x2="12" y2="18" stroke="hsl(222 47% 11%)" strokeWidth="1.5" />
            <line x1="24" y1="18" x2="30" y2="18" stroke="hsl(222 47% 11%)" strokeWidth="1.5" />
            {/* Rising bars */}
            <rect x="13" y="20" width="3" height="6" rx="0.5" fill="hsl(222 47% 11%)" />
            <rect x="17" y="17" width="3" height="9" rx="0.5" fill="hsl(222 47% 11%)" />
            <rect x="21" y="14" width="3" height="12" rx="0.5" fill="hsl(222 47% 11%)" />
          </svg>
          <span className="text-base font-extrabold tracking-tight">
            <span className="text-gradient-gold">Maskin</span>
            <span className="text-foreground">värdering</span>
            <span className="text-muted-foreground">.se</span>
          </span>
        </button>

        {/* Center Nav - hidden on mobile */}
        <div className="hidden lg:flex items-center gap-6">
          {/* Värdera maskin dropdown */}
          <div className="relative" ref={megaMenuRef}>
            <button
              onClick={() => setMegaMenuOpen(!megaMenuOpen)}
              className={`${navLinkClass} inline-flex items-center gap-1 font-bold ${megaMenuOpen ? activeClass : ""}`}
            >
              Alla kategorier
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${megaMenuOpen ? "rotate-180" : ""}`} />
            </button>
            {megaMenuOpen && (
              <div className="absolute top-full left-0 mt-2 flex rounded-xl border border-border bg-card shadow-2xl z-50 overflow-hidden">
                {/* Left: category list */}
                <div className="w-48 border-r border-border bg-muted/30 py-2 shrink-0">
                  {megaMenuCategories.map((cat) => (
                    <div key={cat.slug}>
                      <button
                        onMouseEnter={() => setActiveMegaCat(cat.slug)}
                        onClick={() => navigate(`/${cat.slug}`)}
                        className={`flex items-center justify-between w-full px-4 py-2.5 text-sm transition-colors ${activeMegaCat === cat.slug
                            ? "bg-primary text-primary-foreground font-bold"
                            : "text-foreground hover:bg-muted font-medium"
                          }`}
                      >
                        {cat.name}
                        <ChevronRight size={12} className={activeMegaCat === cat.slug ? "text-primary-foreground" : "text-muted-foreground"} />
                      </button>
                    </div>
                  ))}
                </div>
                {/* Right: types for active category */}
                <div className="w-80 p-5">
                  {megaMenuCategories
                    .filter((c) => c.slug === activeMegaCat)
                    .map((cat) => (
                      <div key={cat.slug}>
                        <h3 className="text-base font-extrabold uppercase tracking-wide text-foreground mb-1">
                          {cat.name}
                          <span className="text-xs font-normal text-muted-foreground ml-2 tracking-normal normal-case">
                            ({cat.totalActive} aktiva)
                          </span>
                        </h3>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-3">
                          {cat.types.map((t) => (
                            <Link
                              key={t.href}
                              to={t.href}
                              className="text-sm text-muted-foreground hover:text-primary transition-colors py-1"
                            >
                              {t.label}
                              <span className="text-xs text-muted-foreground/60 ml-1">({t.count})</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>


          {/* Målgrupper dropdown */}
          <div className="relative" ref={målgrupperRef}>
            <button
              onClick={() => setMålgrupperOpen(!målgrupperOpen)}
              className={`${navLinkClass} inline-flex items-center gap-1 ${målgrupperOpen ? activeClass : ""}`}
            >
              Värdering För
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${målgrupperOpen ? "rotate-180" : ""}`} />
            </button>
            {målgrupperOpen && (
              <div className="absolute top-full left-0 mt-2 w-56 rounded-xl border border-border bg-card shadow-xl z-50 py-2">
                {målgrupperLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => navigate(link.href)}
                    className="block w-full text-left px-4 py-2.5 hover:bg-accent transition-colors duration-200"
                  >
                    <span className="block text-sm text-foreground font-medium">{link.label}</span>
                    <span className="block text-xs text-muted-foreground">{link.subtitle}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button onClick={() => navigate("/hur-funkar-det")} className={`${navLinkClass} ${location.pathname === "/hur-funkar-det" ? activeClass : ""}`}>
            Hur funkar det?
          </button>
          <button onClick={() => navigate("/priser")} className={`${navLinkClass} ${location.pathname === "/priser" ? activeClass : ""}`}>
            Priser
          </button>
          <button onClick={() => navigate("/artiklar")} className={`${navLinkClass} ${location.pathname.startsWith("/artiklar") ? activeClass : ""}`}>
            Artiklar
          </button>
          <button onClick={() => navigate("/om-plattformen")} className={`${navLinkClass} ${location.pathname === "/om-plattformen" ? activeClass : ""}`}>
            Om oss
          </button>
          <button onClick={() => navigate("/kontakt")} className={`${navLinkClass} ${location.pathname === "/kontakt" ? activeClass : ""}`}>
            Kontakt
          </button>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">

          {isLoggedIn && user ? (
            /* Logged-in: Avatar + dropdown */
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2.5 px-2 py-1.5 rounded-xl border border-border hover:border-primary/40 bg-card/50 transition-all duration-200"
              >
                <div className="w-8 h-8 rounded-lg gradient-gold flex items-center justify-center">
                  <span className="text-xs font-bold text-primary-foreground">{(user.user_metadata?.full_name || user.email || "?").substring(0, 2).toUpperCase()}</span>
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-xs font-semibold text-foreground leading-tight">{user.user_metadata?.full_name || user.email}</p>
                  <p className="text-[10px] text-muted-foreground leading-tight">{user.user_metadata?.company || ""}</p>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 text-muted-foreground transition-transform duration-200 ${userMenuOpen ? "rotate-180" : ""}`} />
              </button>

              {userMenuOpen && (
                <div className="absolute top-full right-0 mt-2 w-56 rounded-xl border border-border bg-card shadow-xl z-50 py-2">
                  <div className="px-4 py-3 border-b border-border">
                    <p className="text-sm font-semibold text-foreground">{user.user_metadata?.full_name || user.email}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                  <button
                    onClick={() => navigate("/dashboard")}
                    className="flex items-center gap-3 w-full text-left px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors duration-200"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Maskinparken
                  </button>
                  <button
                    onClick={() => navigate("/vardering")}
                    className="flex items-center gap-3 w-full text-left px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors duration-200"
                  >
                    <TrendingUp className="w-4 h-4" />
                    Värdering
                  </button>
                  <button
                    onClick={() => navigate("/sekretess")}
                    className="flex items-center gap-3 w-full text-left px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors duration-200"
                  >
                    <Settings className="w-4 h-4" />
                    Inställningar
                  </button>
                  <div className="border-t border-border mt-1 pt-1">
                    <button
                      onClick={() => { signOut(); setUserMenuOpen(false); }}
                      className="flex items-center gap-3 w-full text-left px-4 py-2.5 text-sm text-destructive hover:bg-destructive/10 transition-colors duration-200"
                    >
                      <LogOut className="w-4 h-4" />
                      Logga ut
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Logged-out: Login + CTA buttons */
            <>
              <Button
                variant="outline"
                className="hidden sm:inline-flex items-center gap-2 text-sm rounded-lg border-border hover:border-primary/50 transition-colors duration-200"
                onClick={() => navigate("/logga-in")}
              >
                <Shield className="w-4 h-4" />
                Logga in
              </Button>

              <Button
                className="gradient-gold text-primary-foreground font-bold text-sm rounded-lg transition-all duration-200 hover:scale-[1.02]"
                onClick={() => navigate("/skapa-konto")}
              >
                Starta gratis
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Mobile navigation sheet */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-[280px] bg-card border-border p-0">
          <SheetTitle className="sr-only">Meny</SheetTitle>
          <div className="flex flex-col h-full">
            <div className="p-4 border-b border-border">
              <span className="text-base font-extrabold tracking-tight">
                <span className="text-gradient-gold">Maskin</span>
                <span className="text-foreground">värdering</span>
                <span className="text-muted-foreground">.se</span>
              </span>
            </div>
            <div className="flex-1 overflow-y-auto py-4">
              {/* Värdera maskin */}
              <p className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Värdera maskin</p>
              {värderaMaskinLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => { navigate(link.href); setMobileOpen(false); }}
                  className="block w-full text-left px-4 py-2.5 text-sm text-foreground hover:bg-accent transition-colors"
                >
                  {link.label}
                </button>
              ))}


              {/* Värdering För */}
              <p className="px-4 mt-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Värdering För</p>
              {målgrupperLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => { navigate(link.href); setMobileOpen(false); }}
                  className="block w-full text-left px-4 py-2.5 hover:bg-accent transition-colors"
                >
                  <span className="block text-sm text-foreground font-medium">{link.label}</span>
                  <span className="block text-xs text-muted-foreground">{link.subtitle}</span>
                </button>
              ))}

              {/* Övriga länkar */}
              <div className="border-t border-border mt-4 pt-4">
                <button onClick={() => { navigate("/hur-funkar-det"); setMobileOpen(false); }} className="block w-full text-left px-4 py-2.5 text-sm text-foreground hover:bg-accent transition-colors">Hur funkar det?</button>
                <button onClick={() => { navigate("/priser"); setMobileOpen(false); }} className="block w-full text-left px-4 py-2.5 text-sm text-foreground hover:bg-accent transition-colors">Priser</button>
                <button onClick={() => { navigate("/artiklar"); setMobileOpen(false); }} className="block w-full text-left px-4 py-2.5 text-sm text-foreground hover:bg-accent transition-colors">Artiklar</button>
                <button onClick={() => { navigate("/om-plattformen"); setMobileOpen(false); }} className="block w-full text-left px-4 py-2.5 text-sm text-foreground hover:bg-accent transition-colors">Om oss</button>
                <button onClick={() => { navigate("/kontakt"); setMobileOpen(false); }} className="block w-full text-left px-4 py-2.5 text-sm text-foreground hover:bg-accent transition-colors">Kontakt</button>
              </div>
            </div>

            {/* Bottom actions */}
            <div className="p-4 border-t border-border">
              {isLoggedIn ? (
                <Button variant="destructive" className="w-full" onClick={() => { signOut(); setMobileOpen(false); navigate("/"); }}>
                  <LogOut className="w-4 h-4 mr-2" /> Logga ut
                </Button>
              ) : (
                <Button className="w-full gradient-gold text-primary-foreground font-bold" onClick={() => { setMobileOpen(false); navigate("/skapa-konto"); }}>
                  Starta gratis
                </Button>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
}
