import pseoGravmaskin from "@/assets/pseo-gravmaskin.jpg";
import pseoHjullastare from "@/assets/pseo-hjullastare.jpg";
import pseoDumper from "@/assets/pseo-dumper.jpg";
import pseoKran from "@/assets/pseo-kran.jpg";
import pseoLastbil from "@/assets/pseo-lastbil.jpg";
import pseoTeleskoplastare from "@/assets/pseo-teleskoplastare.jpg";
import machineLoader from "@/assets/machine-loader.jpg";
import machineBulldozer from "@/assets/machine-bulldozer.jpg";
import machineForklift from "@/assets/machine-forklift.jpg";

export interface MachineTypeData {
  slug: string;
  label: string;
  count: number;
  href: string;
  categorySlug: string;
}

export interface CategoryData {
  slug: string;
  name: string;
  heroImage: string;
  heroAlt: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  seoText: string;
  totalActive: number;
  types: MachineTypeData[];
  faqs: { q: string; a: string }[];
  avgPrice: string;
  avgLiquidity: string;
  trendDirection: string;
  topBrands: string[];
  topModels: { name: string; priceRange: string; liquidity: number }[];
}

export const categories: CategoryData[] = [
  {
    slug: "entreprenad",
    name: "Entreprenad",
    heroImage: pseoGravmaskin,
    heroAlt: "Entreprenadmaskiner på byggarbetsplats – värdera grävmaskiner, hjullastare och dumpers",
    metaTitle: "Värdera Entreprenadmaskiner – Grävmaskiner, Hjullastare & Dumpers | Maskinvärdering.se",
    metaDescription: "Få indikativt marknadsvärde på entreprenadmaskiner. AI-driven värdering av grävmaskiner, hjullastare, dumpers och vältar. Resultat på 15 min.",
    h1: "Värdera entreprenadmaskiner – grävmaskiner, hjullastare & dumpers",
    intro: "Entreprenadmaskiner utgör ryggraden i nordisk byggindustri. Vår AI-drivna värdering täcker alla typer av anläggningsmaskiner med realtidsdata från 14 marknader.",
    seoText: "Entreprenadmaskiner är den största och mest likvida kategorin på den nordiska maskinmarknaden. Grävmaskiner, hjullastare och dumpers omsätts dagligen på auktioner, via återförsäljare och i privata transaktioner.\n\nSäsongsvariationen är tydlig – efterfrågan toppar i mars–maj inför byggsäsongen och priserna kan vara 10–18% högre under denna period. Vinterhalvåret innebär ofta lägre priser men även lägre utbud.\n\nMedelstora grävmaskiner (20–30 ton) har konsekvent högst likviditet, följt av hjullastare i 15–25-tonsklassen. Dumpers har lägre omsättningshastighet men högre styckvärde.",
    totalActive: 142,
    types: [
      { slug: "gravmaskiner", label: "Grävmaskiner", count: 47, href: "/vardera-gravmaskin", categorySlug: "entreprenad" },
      { slug: "hjullastare", label: "Hjullastare", count: 31, href: "/vardera-hjullastare", categorySlug: "entreprenad" },
      { slug: "dumpers", label: "Dumpers", count: 18, href: "/vardera-dumper", categorySlug: "entreprenad" },
      { slug: "valtar", label: "Vältar", count: 12, href: "/vardera-valt", categorySlug: "entreprenad" },
    ],
    faqs: [
      { q: "Vilka entreprenadmaskiner kan ni värdera?", a: "Vi värderar grävmaskiner, hjullastare, dumpers, vältar, bulldozers och kompaktlastare. Alla märken från 2000 och framåt." },
      { q: "Hur påverkar byggsäsongen priserna?", a: "Mars–maj är högsäsong med 10–18% högre priser. Bästa köptillfället är november–januari." },
      { q: "Vilken maskintyp har bäst likviditet?", a: "Medelstora grävmaskiner (20–30 ton) har konsekvent högst likviditet – vanligtvis 80–90% index." },
    ],
    avgPrice: "1 150 000 SEK",
    avgLiquidity: "82%",
    trendDirection: "+2.4%",
    topBrands: ["Volvo", "CAT", "Komatsu", "Hitachi", "Liebherr", "Doosan"],
    topModels: [
      { name: "Volvo EC220E", priceRange: "900 000 – 1 400 000", liquidity: 87 },
      { name: "CAT 320", priceRange: "1 100 000 – 1 800 000", liquidity: 84 },
      { name: "Volvo L90H", priceRange: "800 000 – 1 300 000", liquidity: 85 },
      { name: "Volvo A30G", priceRange: "1 800 000 – 3 200 000", liquidity: 76 },
    ],
  },
  {
    slug: "transport",
    name: "Transport",
    heroImage: pseoLastbil,
    heroAlt: "Transportfordon och lastbilar – värdera lastbilar, dragbilar och distributionsfordon",
    metaTitle: "Värdera Lastbilar & Transportfordon – Indikativt Marknadsvärde | Maskinvärdering.se",
    metaDescription: "Få indikativt marknadsvärde på lastbilar, dragbilar och transportfordon. Scania, Volvo, MAN, Mercedes-Benz. AI-driven värdering på 15 min.",
    h1: "Värdera lastbilar & transportfordon – alla märken",
    intro: "Lastbilar och transportfordon är kritiska tillgångar i åkeribranschen. Vår AI analyserar tusentals lastbilstransaktioner dagligen för att ge dig ett exakt marknadsvärde.",
    seoText: "Den nordiska lastbilsmarknaden domineras av Scania och Volvo, med MAN, Mercedes-Benz och DAF som starka utmanare. Andrahandsvärdet på lastbilar påverkas kraftigt av Euro-klass, körsträcka, fordonstyp och regionala skillnader.\n\nDragbilar har den mest aktiva andrahandsmarknaden med stark exportefterfrågan till Östeuropa, Mellanöstern och Afrika. Distributionsbilar har en mer lokal marknad men stabil likviditet.\n\nElektriska lastbilar som Volvo FH Electric och Scania BEV börjar etablera sig med premiumpriser men begränsad andrahandsmarknad.",
    totalActive: 189,
    types: [
      { slug: "dragbilar", label: "Dragbilar", count: 62, href: "/vardera-dragbil", categorySlug: "transport" },
      { slug: "lastvaxlare", label: "Lastväxlare", count: 38, href: "/vardera-lastvaxlare", categorySlug: "transport" },
      { slug: "slapvagnar", label: "Släpvagnar", count: 54, href: "/vardera-slapvagn", categorySlug: "transport" },
      { slug: "budbilar", label: "Budbilar", count: 35, href: "/vardera-budbil", categorySlug: "transport" },
    ],
    faqs: [
      { q: "Vilka lastbilsmärken värderar ni?", a: "Scania, Volvo, MAN, Mercedes-Benz, DAF, Iveco, Renault Trucks med flera. Alla modeller från 2000 och framåt." },
      { q: "Hur påverkar Euro-klass värdet?", a: "Euro 6 är standard i Norden. Euro 5 sänker värdet 20–30% men har stark exportefterfrågan." },
    ],
    avgPrice: "780 000 SEK",
    avgLiquidity: "71%",
    trendDirection: "-0.6%",
    topBrands: ["Scania", "Volvo", "MAN", "Mercedes-Benz", "DAF", "Iveco"],
    topModels: [
      { name: "Volvo FH16", priceRange: "600 000 – 1 100 000", liquidity: 78 },
      { name: "Scania R500", priceRange: "550 000 – 950 000", liquidity: 72 },
      { name: "MAN TGX 18.510", priceRange: "500 000 – 850 000", liquidity: 65 },
      { name: "Mercedes-Benz Actros", priceRange: "550 000 – 1 000 000", liquidity: 71 },
    ],
  },
  {
    slug: "lantbruk",
    name: "Lantbruk",
    heroImage: pseoTeleskoplastare,
    heroAlt: "Lantbruksmaskiner – traktorer, skördetröskor och teleskoplastare för jordbruk",
    metaTitle: "Värdera Lantbruksmaskiner – Traktorer & Skördetröskor | Maskinvärdering.se",
    metaDescription: "Få indikativt marknadsvärde på lantbruksmaskiner. Traktorer, skördetröskor, balpressar och teleskoplastare. AI-driven värdering på 15 min.",
    h1: "Värdera lantbruksmaskiner – traktorer, tröskor & redskap",
    intro: "Lantbruksmaskiner är betydande tillgångar med stark säsongsvariation i pris och efterfrågan. Vår AI analyserar marknadsdata specifikt för jordbrukssektorn.",
    seoText: "Lantbruksmaskiner har en unik marknadsdynamik med stark säsongsvariation. Traktorer är den mest likvida kategorin med brett köparunderlag – från hobbyodlare till storjordbruk.\n\nSkördetröskor har hög styckvärde men smalare marknad, medan balpressar och redskap har snabbare omsättning. Teleskoplastare för lantbruk (Manitou MLT, JCB Agri) har vuxit i popularitet.\n\nNordiska lantbruksmaskiner har premiumvärde tack vare välskött skick och dokumenterat underhåll. Exportefterfrågan till Östeuropa och Afrika är stark.",
    totalActive: 98,
    types: [
      { slug: "traktorer", label: "Traktorer", count: 42, href: "/vardera-traktor", categorySlug: "lantbruk" },
      { slug: "skordetroskor", label: "Skördetröskor", count: 18, href: "/vardera-skordetroska", categorySlug: "lantbruk" },
      { slug: "balpressar", label: "Balpressar", count: 22, href: "/vardera-balpress", categorySlug: "lantbruk" },
      { slug: "vagnar", label: "Vagnar", count: 16, href: "/vardera-vagn", categorySlug: "lantbruk" },
    ],
    faqs: [
      { q: "Kan ni värdera traktorer?", a: "Ja, vi värderar alla traktormärken: John Deere, Valtra, Fendt, New Holland, Massey Ferguson med flera." },
      { q: "Har lantbruksmaskiner säsongsvariation?", a: "Ja, efterfrågan toppar vår och höst. Vinterpriser kan vara 10–15% lägre." },
    ],
    avgPrice: "620 000 SEK",
    avgLiquidity: "74%",
    trendDirection: "+1.8%",
    topBrands: ["John Deere", "Valtra", "Fendt", "New Holland", "Massey Ferguson", "Claas"],
    topModels: [
      { name: "John Deere 6215R", priceRange: "700 000 – 1 200 000", liquidity: 82 },
      { name: "Valtra T254", priceRange: "600 000 – 1 000 000", liquidity: 78 },
      { name: "Fendt 724 Vario", priceRange: "800 000 – 1 400 000", liquidity: 76 },
      { name: "Claas Scorpion 741", priceRange: "500 000 – 800 000", liquidity: 74 },
    ],
  },
  {
    slug: "skogsbruk",
    name: "Skogsbruk",
    heroImage: machineBulldozer,
    heroAlt: "Skogsmaskiner i arbete – skördare, skotare och timmerbilar för skogsbruk",
    metaTitle: "Värdera Skogsmaskiner – Skördare & Skotare | Maskinvärdering.se",
    metaDescription: "Få indikativt marknadsvärde på skogsmaskiner. Skördare, skotare, timmerbilar och vedmaskiner. AI-driven värdering med nordisk skogsdata.",
    h1: "Värdera skogsmaskiner – skördare, skotare & timmerbilar",
    intro: "Nordisk skogsindustri är världsledande och skogsmaskiner representerar betydande investeringar. Vår AI täcker hela den nordiska skogsmaskinmarknaden.",
    seoText: "Den nordiska skogsmaskinmarknaden är en av världens mest avancerade. Sverige och Finland är de största marknaderna med tillverkare som John Deere (Timberjack), Ponsse, Komatsu Forest och Rottne.\n\nSkördare (harvester) har högst styckvärde – moderna fullstora skördare kostar 3–6 MSEK nya. Andrahandsvärdet beror kraftigt på aggregatskick och drifttimmar. Skotare (forwarder) har bredare marknad med stabil likviditet.\n\nTimmerbilar (Scania, Volvo) med kran (Hiab, Palfinger) värderas som komplett enhet. Kranens skick och kapacitet påverkar totalvärdet väsentligt.",
    totalActive: 67,
    types: [
      { slug: "skordare", label: "Skördare", count: 22, href: "/vardera-skordare", categorySlug: "skogsbruk" },
      { slug: "skotare", label: "Skotare", count: 19, href: "/vardera-skotare", categorySlug: "skogsbruk" },
      { slug: "timmerbilar", label: "Timmerbilar", count: 15, href: "/vardera-timmerbil", categorySlug: "skogsbruk" },
      { slug: "vedmaskiner", label: "Vedmaskiner", count: 11, href: "/vardera-vedmaskin", categorySlug: "skogsbruk" },
    ],
    faqs: [
      { q: "Kan ni värdera skogsmaskiner?", a: "Ja, vi värderar skördare, skotare, timmerbilar och vedmaskiner. Alla märken: John Deere, Ponsse, Komatsu Forest, Rottne." },
      { q: "Hur påverkar aggregatskick värdet?", a: "Aggregatet (sågkopplingsenheten) på en skördare kan utgöra 20–30% av totalvärdet. Nyligen renoverat aggregat höjer värdet markant." },
    ],
    avgPrice: "1 850 000 SEK",
    avgLiquidity: "69%",
    trendDirection: "+1.4%",
    topBrands: ["John Deere", "Ponsse", "Komatsu Forest", "Rottne", "Scania", "Volvo"],
    topModels: [
      { name: "John Deere 1270G", priceRange: "2 500 000 – 4 500 000", liquidity: 72 },
      { name: "Ponsse Ergo", priceRange: "2 800 000 – 5 000 000", liquidity: 70 },
      { name: "Komatsu 931XC", priceRange: "2 200 000 – 4 000 000", liquidity: 68 },
      { name: "Rottne H21D", priceRange: "1 800 000 – 3 200 000", liquidity: 66 },
    ],
  },
  {
    slug: "fastighet-gronyta",
    name: "Fastighet & Grönyta",
    heroImage: machineLoader,
    heroAlt: "Kompaktmaskiner för fastighet och grönyta – kompaktlastare, gräsklippare och sopmaskiner",
    metaTitle: "Värdera Fastighets- & Grönytamaskiner | Maskinvärdering.se",
    metaDescription: "Få indikativt marknadsvärde på kompaktlastare, gräsklippare och sopmaskiner. AI-driven värdering för fastighet och grönyta.",
    h1: "Värdera maskiner för fastighet & grönyta",
    intro: "Kompakta maskiner för fastighetsförvaltning och grönyteskötsel är en växande marknad. Vår AI värderar allt från kompaktlastare till professionella gräsklippare.",
    seoText: "Fastighets- och grönytemaskiner omfattar kompaktlastare (Bobcat, Avant), professionella gräsklippare (Husqvarna, John Deere) och sopmaskiner. Dessa maskiner har ofta hög likviditet tack vare brett köparunderlag.\n\nKompaktlastare med multifunktion (snöröjning, sopning, grävning) är särskilt eftertraktade. Bobcat S-serien och Avant-lastare dominerar den nordiska marknaden.\n\nSäsongsvariation är kraftig – snöröjningsmaskiner har premiumpriser september–november, medan grönytemaskiner toppar mars–maj.",
    totalActive: 54,
    types: [
      { slug: "kompaktlastare", label: "Kompaktlastare", count: 22, href: "/vardera-kompaktlastare", categorySlug: "fastighet-gronyta" },
      { slug: "grasklippare", label: "Gräsklippare (proffs)", count: 15, href: "/vardera-grasklippare", categorySlug: "fastighet-gronyta" },
      { slug: "sopmaskiner", label: "Sopmaskiner", count: 17, href: "/vardera-sopmaskin", categorySlug: "fastighet-gronyta" },
    ],
    faqs: [
      { q: "Kan ni värdera kompaktlastare?", a: "Ja, Bobcat, Avant, Wacker Neuson och fler. Kompaktlastare har ofta hög likviditet tack vare bred användning." },
    ],
    avgPrice: "185 000 SEK",
    avgLiquidity: "77%",
    trendDirection: "+1.6%",
    topBrands: ["Bobcat", "Avant", "Husqvarna", "John Deere", "Wacker Neuson"],
    topModels: [
      { name: "Bobcat S770", priceRange: "350 000 – 550 000", liquidity: 80 },
      { name: "Bobcat E50", priceRange: "300 000 – 500 000", liquidity: 83 },
      { name: "Avant 760i", priceRange: "200 000 – 350 000", liquidity: 78 },
    ],
  },
  {
    slug: "industri-lyft",
    name: "Industri & Lyft",
    heroImage: machineForklift,
    heroAlt: "Industrimaskiner och truckar – gaffeltruckar, kranar och teleskoplastare",
    metaTitle: "Värdera Industrimaskiner & Truckar | Maskinvärdering.se",
    metaDescription: "Få indikativt marknadsvärde på gaffeltruckar, teleskoplastare och industrilyft. AI-driven värdering för industri och lager.",
    h1: "Värdera industrimaskiner & truckar",
    intro: "Gaffeltruckar, teleskoplastare och industrilyft är kritiska tillgångar i lager och industri. Vår AI värderar alla typer av materialhanteringsutrustning.",
    seoText: "Industri- och lyftmaskiner omfattar gaffeltruckar, teleskoplastare, personlyftare (saxliftar, bomliftar) och kranar. Gaffeltruckar har den bredaste marknaden med hög likviditet – Toyota, Linde och Still dominerar.\n\nElektriska truckar (Toyota, Linde, Still) har premiumvärde i takt med hållbarhetskrav. Gasol- och dieseltruckar har stark exportmarknad. Personlyftare (JLG, Genie, Haulotte) har vuxit kraftigt med ökande säkerhetskrav.\n\nTeleskoplastare i industrimiljö (Manitou, Merlo, JCB) har dubbel marknad – både bygg och industri – vilket ger stabil likviditet.",
    totalActive: 83,
    types: [
      { slug: "gaffeltruckar", label: "Gaffeltruckar", count: 35, href: "/vardera-gaffeltruck", categorySlug: "industri-lyft" },
      { slug: "teleskoplastare", label: "Teleskoplastare", count: 28, href: "/vardera-teleskoplastare", categorySlug: "industri-lyft" },
      { slug: "kranar", label: "Kranar", count: 20, href: "/vardera-kran", categorySlug: "industri-lyft" },
    ],
    faqs: [
      { q: "Kan ni värdera gaffeltruckar?", a: "Ja, Toyota, Linde, Still, Hyster, Yale och fler. Elektriska truckar har premiumvärde." },
    ],
    avgPrice: "420 000 SEK",
    avgLiquidity: "76%",
    trendDirection: "+2.0%",
    topBrands: ["Toyota", "Linde", "Still", "JCB", "Manitou", "Merlo"],
    topModels: [
      { name: "Toyota 8FBET18", priceRange: "180 000 – 320 000", liquidity: 84 },
      { name: "Linde H50D", priceRange: "250 000 – 450 000", liquidity: 78 },
      { name: "JCB 541-70", priceRange: "450 000 – 750 000", liquidity: 85 },
      { name: "Manitou MT 1440", priceRange: "400 000 – 700 000", liquidity: 79 },
    ],
  },
];

export function getCategoryBySlug(slug: string): CategoryData | undefined {
  return categories.find((c) => c.slug === slug);
}

// Helper: find which category a machine type href belongs to
export function getCategoryForMachineType(href: string): CategoryData | undefined {
  return categories.find((c) => c.types.some((t) => t.href === href));
}

// Helper: get machine type data from its href
export function getMachineTypeByHref(href: string): (MachineTypeData & { category: CategoryData }) | undefined {
  for (const cat of categories) {
    const mt = cat.types.find((t) => t.href === href);
    if (mt) return { ...mt, category: cat };
  }
  return undefined;
}
