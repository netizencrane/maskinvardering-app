import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  const allItems: BreadcrumbItem[] = [{ label: "Hem", href: "/" }, ...items];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: allItems.map((b, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: b.label,
              ...(b.href ? { item: `https://maskinvardering.se${b.href}` } : {}),
            })),
          }),
        }}
      />
      <nav aria-label="Breadcrumb" className={`flex items-center gap-1.5 text-sm ${className}`}>
        {allItems.map((item, i) => {
          const isLast = i === allItems.length - 1;
          return (
            <span key={i} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/50 shrink-0" />}
              {isLast || !item.href ? (
                <span className={isLast ? "text-primary font-bold truncate max-w-[200px]" : "text-muted-foreground"}>
                  {i === 0 ? (
                    <span className="flex items-center gap-1">
                      <Home className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">{item.label}</span>
                    </span>
                  ) : item.label}
                </span>
              ) : (
                <Link to={item.href} className="text-muted-foreground hover:text-primary transition-colors truncate max-w-[200px]">
                  {i === 0 ? (
                    <span className="flex items-center gap-1">
                      <Home className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">{item.label}</span>
                    </span>
                  ) : item.label}
                </Link>
              )}
            </span>
          );
        })}
      </nav>
    </>
  );
}
