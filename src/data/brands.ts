import pseoGravmaskin from "@/assets/pseo-gravmaskin.jpg";
import pseoHjullastare from "@/assets/pseo-hjullastare.jpg";
import pseoDumper from "@/assets/pseo-dumper.jpg";
import pseoKran from "@/assets/pseo-kran.jpg";
import pseoLastbil from "@/assets/pseo-lastbil.jpg";
import pseoTeleskoplastare from "@/assets/pseo-teleskoplastare.jpg";
import machineExcavator from "@/assets/machine-excavator.jpg";
import machineLoader from "@/assets/machine-loader.jpg";
import machineCrane from "@/assets/machine-crane.jpg";
import machineBulldozer from "@/assets/machine-bulldozer.jpg";
import machineForklift from "@/assets/machine-forklift.jpg";
import machineMixer from "@/assets/machine-mixer.jpg";

export interface BrandData {
  slug: string;
  name: string;
  heroImage: string;
  heroAlt: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  seoText: string;
  machineTypes: { label: string; href: string }[];
  popularModels: { name: string; type: string; priceRange: string; liquidity: number }[];
  stats: { label: string; value: string }[];
  faqs: { q: string; a: string }[];
}

export const brands: BrandData[] = [
  // ── GRÄVMASKINSTILLVERKARE ──
  {
    slug: "volvo",
    name: "Volvo",
    heroImage: pseoGravmaskin,
    heroAlt: "Volvo grävmaskin på byggarbetsplats – värdera Volvo-maskiner med AI-driven maskinvärdering",
    metaTitle: "Värdera Volvo-maskiner – Verifierat Marknadsvärde | Maskinvärdering.se",
    metaDescription: "Få verifierat marknadsvärde på Volvo grävmaskiner, hjullastare, dumpers och lastbilar. AI-driven värdering med expertverifiering. Resultat på 15 min.",
    h1: "Värdera Volvo-maskiner – grävmaskiner, hjullastare & dumpers",
    intro: "Volvo Construction Equipment och Volvo Trucks är bland Nordens mest handlade märken. Vår AI-drivna värdering täcker hela Volvos sortiment med realtidsdata från 14 marknader.",
    seoText: "Volvo är det dominerande märket på den nordiska anläggningsmarknaden. Med en marknadsandel på över 30% i Sverige är Volvo-maskiner bland de mest likvida tillgångarna i branschen. Volvo EC-serien (grävmaskiner), L-serien (hjullastare) och A-serien (dumpers) har konsekvent högt andrahandsvärde tack vare brett servicenät, hög driftsäkerhet och stark efterfrågan.\n\nVår AI-drivna värdering analyserar tusentals Volvo-transaktioner dagligen – från auktionsresultat på Klaravik och Ritchie Bros till återförsäljarpriser och privata försäljningar. Vi tar hänsyn till maskinspecifika faktorer som drifttimmar, Stage-klass (IIIB/IV/V), utrustningsnivå och geografisk placering.\n\nVolvo-maskiner med dokumenterad servicehistorik via Volvo CareTrack värderas i snitt 8–15% högre. Elektriska modeller som Volvo ECR25 Electric och L25 Electric har börjat etablera sig med premiumpriser i tätortsnära projekt.",
    machineTypes: [
      { label: "Grävmaskin", href: "/vardera-gravmaskin" },
      { label: "Hjullastare", href: "/vardera-hjullastare" },
      { label: "Dumper", href: "/vardera-dumper" },
      { label: "Lastbil", href: "/vardera-lastbil" },
    ],
    popularModels: [
      { name: "Volvo EC220E", type: "Grävmaskin", priceRange: "900 000 – 1 400 000", liquidity: 87 },
      { name: "Volvo L90H", type: "Hjullastare", priceRange: "800 000 – 1 300 000", liquidity: 85 },
      { name: "Volvo A30G", type: "Dumper", priceRange: "1 800 000 – 3 200 000", liquidity: 76 },
      { name: "Volvo FH16", type: "Lastbil", priceRange: "600 000 – 1 100 000", liquidity: 78 },
      { name: "Volvo L120H", type: "Hjullastare", priceRange: "1 200 000 – 1 900 000", liquidity: 81 },
      { name: "Volvo A25G", type: "Dumper", priceRange: "1 400 000 – 2 500 000", liquidity: 79 },
    ],
    stats: [
      { label: "Modeller i databasen", value: "24 500+" },
      { label: "Snitt likviditet", value: "84%" },
      { label: "Marknadstrend 30d", value: "+2.1%" },
    ],
    faqs: [
      { q: "Vilka Volvo-maskiner kan ni värdera?", a: "Vi värderar hela Volvo-sortimentet: grävmaskiner (EC-serien), hjullastare (L-serien), dumpers (A-serien), lastbilar (FH/FM/FE) och kompaktmaskiner. Databasen täcker modeller från 2000 och framåt." },
      { q: "Hur påverkar Volvo CareTrack värdet?", a: "Dokumenterad servicehistorik via CareTrack höjer värdet med 8–15%. Det visar köparen att maskinen har underhållits enligt Volvos rekommendationer." },
      { q: "Har Volvo bäst andrahandsvärde?", a: "I Norden har Volvo konsekvent högst likviditetsindex bland anläggningsmaskiner, tack vare brett servicenät och stark efterfrågan. EC220E och L90H är särskilt starka." },
      { q: "Kan ni värdera elektriska Volvo-maskiner?", a: "Ja, vi värderar ECR25 Electric, L25 Electric och övriga elektriska modeller. Dessa har premiumpriser men smalare marknad – vi tar hänsyn till detta i likviditetsindexet." },
    ],
  },
  {
    slug: "cat",
    name: "CAT",
    heroImage: machineExcavator,
    heroAlt: "CAT grävmaskin i arbete – värdera CAT-maskiner med AI-driven maskinvärdering",
    metaTitle: "Värdera CAT-maskiner – Verifierat Marknadsvärde | Maskinvärdering.se",
    metaDescription: "Få verifierat marknadsvärde på CAT grävmaskiner, hjullastare och dumpers. AI-driven värdering baserad på globala transaktionsdata. Resultat på 15 min.",
    h1: "Värdera CAT-maskiner – globalt ledande inom anläggning",
    intro: "Caterpillar (CAT) är världens största tillverkare av anläggningsmaskiner. Vår AI analyserar CAT-transaktioner från 14 marknader för att ge dig ett exakt, expertverifierat marknadsvärde.",
    seoText: "CAT (Caterpillar) är världens mest igenkända varumärke inom anläggningsmaskiner. Med en global närvaro och enastående återförsäljarnätverk har CAT-maskiner historiskt höga andrahandsvärden, särskilt på den internationella marknaden.\n\nPå den nordiska marknaden har CAT en stark position inom medelstora och stora grävmaskiner (320-serien, 330-serien) samt hjullastare (950/966-serien). CAT-maskiner exporteras ofta till Mellanöstern, Afrika och Östeuropa, vilket skapar en bred köparbas och stabil prissättning.\n\nVår värdering tar hänsyn till CATs unika faktorer: Cat Grade-teknologi, Product Link-data (telematics), emissionsklasser och regionala prisskillnader. CAT-maskiner med låga timmar och dokumenterad service genom Cat Inspect har konsekvent premiumvärden.",
    machineTypes: [
      { label: "Grävmaskin", href: "/vardera-gravmaskin" },
      { label: "Hjullastare", href: "/vardera-hjullastare" },
      { label: "Dumper", href: "/vardera-dumper" },
    ],
    popularModels: [
      { name: "CAT 320", type: "Grävmaskin", priceRange: "1 100 000 – 1 800 000", liquidity: 84 },
      { name: "CAT 950M", type: "Hjullastare", priceRange: "700 000 – 1 100 000", liquidity: 74 },
      { name: "CAT 730", type: "Dumper", priceRange: "2 000 000 – 3 500 000", liquidity: 72 },
      { name: "CAT 330", type: "Grävmaskin", priceRange: "1 400 000 – 2 200 000", liquidity: 80 },
    ],
    stats: [
      { label: "Modeller i databasen", value: "18 200+" },
      { label: "Snitt likviditet", value: "78%" },
      { label: "Marknadstrend 30d", value: "+1.8%" },
    ],
    faqs: [
      { q: "Har CAT bra andrahandsvärde i Norden?", a: "Ja, CAT har stark global efterfrågan vilket ger hög likviditet. Exportmöjligheter till Mellanöstern och Afrika breddar köparmarknaden ytterligare." },
      { q: "Vilka CAT-modeller har högst likviditet?", a: "CAT 320 (grävmaskin) och CAT 950M (hjullastare) har konsekvent högst likviditet. 320-serien är den mest handlade globalt." },
      { q: "Påverkar Cat Grade-teknologi värdet?", a: "Ja, maskinstyrd utrustning (Cat Grade) höjer värdet med 5–12% beroende på system och årsmodell." },
      { q: "Kan ni värdera äldre CAT-maskiner?", a: "Vi värderar CAT-maskiner från 2000 och framåt. Äldre modeller som D-serien har fortfarande aktiv andrahandsmarknad, särskilt för export." },
    ],
  },
  {
    slug: "komatsu",
    name: "Komatsu",
    heroImage: pseoGravmaskin,
    heroAlt: "Komatsu grävmaskin på arbetsplats – värdera Komatsu-maskiner med AI-driven maskinvärdering",
    metaTitle: "Värdera Komatsu-maskiner – Verifierat Marknadsvärde | Maskinvärdering.se",
    metaDescription: "Få verifierat marknadsvärde på Komatsu grävmaskiner, hjullastare och dumpers. AI-driven värdering med realtidsdata. Expertverifierat på 15 min.",
    h1: "Värdera Komatsu – japansk precision i maskinvärdering",
    intro: "Komatsu är världens näst största tillverkare av anläggningsmaskiner. Känd för hållbarhet och bränsleekonomi har Komatsu stark efterfrågan i Norden och globalt.",
    seoText: "Komatsu har en stark position på den nordiska marknaden, särskilt inom medelstora grävmaskiner (PC210/PC240) och hjullastare (WA320/WA470). Japansk kvalitetstradition kombinerat med avancerad KOMTRAX-telematik ger Komatsu-maskiner ett stabilt andrahandsvärde.\n\nKomatsu-maskiner är kända för låg bränsleförbrukning och hög driftsäkerhet, vilket gör dem attraktiva för köpare som prioriterar driftsekonomi. Intelligent Machine Control (iMC) på nyare modeller adderar ytterligare värde.\n\nPå den globala marknaden har Komatsu stark efterfrågan i Asien, Australien och Sydamerika, vilket ger goda exportmöjligheter och bidrar till stabil prissättning.",
    machineTypes: [
      { label: "Grävmaskin", href: "/vardera-gravmaskin" },
      { label: "Hjullastare", href: "/vardera-hjullastare" },
      { label: "Dumper", href: "/vardera-dumper" },
    ],
    popularModels: [
      { name: "Komatsu PC210", type: "Grävmaskin", priceRange: "800 000 – 1 200 000", liquidity: 82 },
      { name: "Komatsu WA320", type: "Hjullastare", priceRange: "600 000 – 950 000", liquidity: 78 },
      { name: "Komatsu HM300", type: "Dumper", priceRange: "1 500 000 – 2 600 000", liquidity: 71 },
      { name: "Komatsu PC360", type: "Grävmaskin", priceRange: "1 300 000 – 2 100 000", liquidity: 75 },
    ],
    stats: [
      { label: "Modeller i databasen", value: "12 800+" },
      { label: "Snitt likviditet", value: "77%" },
      { label: "Marknadstrend 30d", value: "+1.4%" },
    ],
    faqs: [
      { q: "Hur står sig Komatsu mot Volvo och CAT?", a: "Komatsu har något lägre likviditet i Norden jämfört med Volvo, men stark global efterfrågan. Bränsleeffektivitet och KOMTRAX-data är starka försäljningsargument." },
      { q: "Påverkar KOMTRAX-data värdet?", a: "Ja, dokumenterad KOMTRAX-historik ger köparen full insyn i maskinens användning och underhåll, vilket kan höja värdet med 5–10%." },
      { q: "Vilka Komatsu-modeller värderar ni?", a: "Alla Komatsu-modeller: PC-serien (grävmaskiner), WA-serien (hjullastare), HM-serien (dumpers) och D-serien (bandtraktorer). Från 2000 och framåt." },
      { q: "Är Komatsu bra att köpa begagnad?", a: "Komatsu är kända för låga underhållskostnader och hög driftsäkerhet. PC210 är en av marknadens mest pålitliga medelstora grävmaskiner." },
    ],
  },
  {
    slug: "hitachi",
    name: "Hitachi",
    heroImage: machineExcavator,
    heroAlt: "Hitachi grävmaskin i arbete – värdera Hitachi-maskiner med AI-driven maskinvärdering",
    metaTitle: "Värdera Hitachi-maskiner – Verifierat Marknadsvärde | Maskinvärdering.se",
    metaDescription: "Få verifierat marknadsvärde på Hitachi grävmaskiner. AI-driven värdering med global marknadsdata. Expertverifierat resultat på 15 minuter.",
    h1: "Värdera Hitachi – grävmaskiner med japansk kvalitet",
    intro: "Hitachi Construction Machinery är specialiserade på grävmaskiner med rykte om exceptionell hydraulik och precision. Stark efterfrågan globalt ger stabil andrahandsmarknad.",
    seoText: "Hitachi är ett av de mest respekterade namnen inom grävmaskiner, med ZX-serien som flaggskepp. Hitachis avancerade hydrauliksystem (HIOS) ger mjuka, precisa rörelser som är särskilt uppskattade av erfarna maskinister.\n\nPå den nordiska marknaden har Hitachi en trogen kundbas, särskilt inom medelstora och stora grävmaskiner. ZX130 och ZX210 är populära modeller med god likviditet. Hitachis samarbete med John Deere (avvecklat 2022) har lett till en separat marknad för Deere-märkta Hitachi-maskiner.\n\nHitachi-maskiner har stark exportefterfrågan till Asien och Oceanien, vilket stödjer andrahandsvärdet även på den nordiska marknaden.",
    machineTypes: [
      { label: "Grävmaskin", href: "/vardera-gravmaskin" },
      { label: "Hjullastare", href: "/vardera-hjullastare" },
    ],
    popularModels: [
      { name: "Hitachi ZX130", type: "Grävmaskin", priceRange: "700 000 – 1 100 000", liquidity: 79 },
      { name: "Hitachi ZX210", type: "Grävmaskin", priceRange: "900 000 – 1 400 000", liquidity: 77 },
      { name: "Hitachi ZX350", type: "Grävmaskin", priceRange: "1 500 000 – 2 400 000", liquidity: 72 },
    ],
    stats: [
      { label: "Modeller i databasen", value: "8 400+" },
      { label: "Snitt likviditet", value: "76%" },
      { label: "Marknadstrend 30d", value: "+0.9%" },
    ],
    faqs: [
      { q: "Har Hitachi bra andrahandsvärde?", a: "Hitachi har stabilt andrahandsvärde tack vare hög kvalitet och global efterfrågan. ZX-serien är särskilt eftertraktad i Asien och Australien." },
      { q: "Vad hände med Hitachi/John Deere-samarbetet?", a: "Samarbetet avslutades 2022. Äldre Deere-märkta Hitachi-maskiner värderas separat men följer liknande prismodeller." },
      { q: "Vilka Hitachi-modeller har ni data på?", a: "Vi täcker hela ZX-serien från minigrävare (ZX33) till stora grävmaskiner (ZX890). Modeller från 2000 och framåt." },
    ],
  },
  {
    slug: "liebherr",
    name: "Liebherr",
    heroImage: pseoKran,
    heroAlt: "Liebherr mobilkran och grävmaskin – värdera Liebherr-maskiner med AI-driven maskinvärdering",
    metaTitle: "Värdera Liebherr-maskiner – Verifierat Marknadsvärde | Maskinvärdering.se",
    metaDescription: "Få verifierat marknadsvärde på Liebherr kranar, grävmaskiner och hjullastare. AI-driven värdering med expertverifiering. Bank-ready rapporter.",
    h1: "Värdera Liebherr – kranar, grävmaskiner & hjullastare",
    intro: "Liebherr är Europas ledande tillverkare av mobilkranar och premiumanläggningsmaskiner. Vår AI värderar hela Liebherr-sortimentet med data från globala transaktioner.",
    seoText: "Liebherr är synonymt med premium inom anläggningsmaskiner, särskilt mobilkranar. LTM-serien dominerar den europeiska kranmarknaden med marknadsandelar över 50% i vissa segment. Liebherrs kranar har exceptionellt högt andrahandsvärde – en LTM 1100 kan behålla 60–70% av sitt värde efter 10 år.\n\nInom grävmaskiner erbjuder Liebherr R-serien (bandgrävare) och A-serien (hjulgrävare) som är populära i tätortsnära projekt tack vare låg ljudnivå och hög prestanda. Liebherr-hjullastare (L-serien) används brett i grusverk och bergtäkter.\n\nVindkraftexpansionen i Norden 2024–2026 har drivit extrem efterfrågan på Liebherr-kranar med 100+ tons kapacitet. Priserna har ökat 15–25% för dessa modeller.",
    machineTypes: [
      { label: "Kran", href: "/vardera-kran" },
      { label: "Grävmaskin", href: "/vardera-gravmaskin" },
      { label: "Hjullastare", href: "/vardera-hjullastare" },
    ],
    popularModels: [
      { name: "Liebherr LTM 1100", type: "Kran", priceRange: "3 500 000 – 6 500 000", liquidity: 91 },
      { name: "Liebherr LTM 1060", type: "Kran", priceRange: "2 200 000 – 3 800 000", liquidity: 85 },
      { name: "Liebherr R 920", type: "Grävmaskin", priceRange: "800 000 – 1 300 000", liquidity: 78 },
      { name: "Liebherr L550", type: "Hjullastare", priceRange: "900 000 – 1 500 000", liquidity: 72 },
      { name: "Liebherr A 918", type: "Grävmaskin", priceRange: "700 000 – 1 100 000", liquidity: 74 },
    ],
    stats: [
      { label: "Modeller i databasen", value: "9 600+" },
      { label: "Snitt likviditet", value: "80%" },
      { label: "Marknadstrend 30d", value: "+4.2%" },
    ],
    faqs: [
      { q: "Varför är Liebherr-kranar så dyra?", a: "Liebherr-kranar har premiumpriser tack vare dominant marknad, extrem efterfrågan (vindkraft) och lång livslängd. En välskött LTM kan tjäna pengar i 20+ år." },
      { q: "Hur påverkar vindkraften Liebherr-priserna?", a: "Vindkraftexpansionen har drivit priserna på 100+ tons kranar upp 15–25% sedan 2024. Efterfrågan förväntas vara stark till 2028." },
      { q: "Värderar ni Liebherr-hjulgrävare?", a: "Ja, A-serien (A 914–A 924) har stark efterfrågan i stadsmiljö. Kompakta modeller som A 918 har hög likviditet." },
    ],
  },
  {
    slug: "doosan",
    name: "Doosan",
    heroImage: machineExcavator,
    heroAlt: "Doosan grävmaskin i arbete – värdera Doosan-maskiner med AI-driven maskinvärdering",
    metaTitle: "Värdera Doosan-maskiner – Verifierat Marknadsvärde | Maskinvärdering.se",
    metaDescription: "Få verifierat marknadsvärde på Doosan grävmaskiner, hjullastare och dumpers. AI-driven värdering med realtidsdata från nordiska marknader.",
    h1: "Värdera Doosan – prisvärd kraft i världsklass",
    intro: "Doosan (numera Develon) erbjuder konkurrenskraftiga anläggningsmaskiner med starkt pris-prestanda-förhållande. Vår AI värderar Doosan-maskiner med nordisk och global marknadsdata.",
    seoText: "Doosan, som genomgår varumärkesbytet till Develon, har vuxit kraftigt på den nordiska marknaden under det senaste decenniet. DX-serien (grävmaskiner) erbjuder konkurrenskraftigt pris-prestanda-förhållande som attraherar både entreprenörer och uthyrningsbolag.\n\nDoosan-maskiner har historiskt haft lägre andrahandsvärde än Volvo och CAT, men gapet har minskat i takt med att kvalitet och serviceorganisation förbättrats. DX225 och DX300 har blivit populära i mellanklassen.\n\nVarumärkesbytet till Develon (2024) skapar en övergångsperiod där Doosan-märkta maskiner kan ha en liten prispress, men Develon-maskiner förväntas etablera sig med starkare prispositionering.",
    machineTypes: [
      { label: "Grävmaskin", href: "/vardera-gravmaskin" },
      { label: "Hjullastare", href: "/vardera-hjullastare" },
      { label: "Dumper", href: "/vardera-dumper" },
    ],
    popularModels: [
      { name: "Doosan DX225", type: "Grävmaskin", priceRange: "850 000 – 1 300 000", liquidity: 76 },
      { name: "Doosan DX300", type: "Grävmaskin", priceRange: "1 100 000 – 1 700 000", liquidity: 72 },
      { name: "Doosan DL300", type: "Hjullastare", priceRange: "700 000 – 1 100 000", liquidity: 68 },
    ],
    stats: [
      { label: "Modeller i databasen", value: "5 200+" },
      { label: "Snitt likviditet", value: "72%" },
      { label: "Marknadstrend 30d", value: "+0.4%" },
    ],
    faqs: [
      { q: "Vad händer med Doosan-varumärket?", a: "Doosan byter namn till Develon. Befintliga Doosan-maskiner värderas normalt – vi tar hänsyn till övergångsperioden i våra analyser." },
      { q: "Har Doosan lägre andrahandsvärde?", a: "Historiskt något lägre än Volvo/CAT, men gapet minskar. Doosan erbjuder ofta bättre pris-prestanda vid köp, men andrahandsvärdet följer med proportionellt." },
    ],
  },
  {
    slug: "hyundai",
    name: "Hyundai",
    heroImage: machineExcavator,
    heroAlt: "Hyundai grävmaskin på arbetsplats – värdera Hyundai-maskiner med AI-driven maskinvärdering",
    metaTitle: "Värdera Hyundai-maskiner – Verifierat Marknadsvärde | Maskinvärdering.se",
    metaDescription: "Få verifierat marknadsvärde på Hyundai grävmaskiner och hjullastare. AI-driven värdering baserad på nordisk och global marknadsdata.",
    h1: "Värdera Hyundai – sydkoreansk innovation i anläggning",
    intro: "Hyundai Construction Equipment växer snabbt i Norden med konkurrenskraftiga maskiner och modern teknik. Vår AI värderar Hyundai-maskiner med realtidsdata.",
    seoText: "Hyundai Construction Equipment har gjort stora framsteg på den nordiska marknaden med HX-serien (grävmaskiner) och HL-serien (hjullastare). Moderna kabiner med excellent förarkomfort och konkurrenskraftig prissättning har drivit tillväxten.\n\nHyundai-maskiner har förbättrat sitt andrahandsvärde markant de senaste åren. HX220A och HX300A har etablerat sig som seriösa alternativ till de europeiska och japanska märkena. Hyundais CAPO-system (Connected Advanced Powertrain Optimization) ger bränsleeffektivitet som tilltalar kostnadsfokuserade köpare.",
    machineTypes: [
      { label: "Grävmaskin", href: "/vardera-gravmaskin" },
      { label: "Hjullastare", href: "/vardera-hjullastare" },
    ],
    popularModels: [
      { name: "Hyundai HX220A", type: "Grävmaskin", priceRange: "800 000 – 1 250 000", liquidity: 73 },
      { name: "Hyundai HX300A", type: "Grävmaskin", priceRange: "1 100 000 – 1 700 000", liquidity: 70 },
      { name: "Hyundai HL960A", type: "Hjullastare", priceRange: "700 000 – 1 100 000", liquidity: 67 },
    ],
    stats: [
      { label: "Modeller i databasen", value: "4 100+" },
      { label: "Snitt likviditet", value: "70%" },
      { label: "Marknadstrend 30d", value: "+1.1%" },
    ],
    faqs: [
      { q: "Hur står sig Hyundai mot Volvo?", a: "Hyundai erbjuder lägre inköpspris men har något lägre likviditet vid återförsäljning. Kvaliteten har förbättrats markant med A-serien." },
      { q: "Vilka Hyundai-modeller värderar ni?", a: "Hela HX-serien (grävmaskiner) och HL-serien (hjullastare). Modeller från 2005 och framåt." },
    ],
  },
  {
    slug: "jcb",
    name: "JCB",
    heroImage: pseoTeleskoplastare,
    heroAlt: "JCB teleskoplastare på byggarbetsplats – värdera JCB-maskiner med AI-driven maskinvärdering",
    metaTitle: "Värdera JCB-maskiner – Verifierat Marknadsvärde | Maskinvärdering.se",
    metaDescription: "Få verifierat marknadsvärde på JCB grävmaskiner, teleskoplastare och hjullastare. AI-driven värdering med expertverifiering på 15 minuter.",
    h1: "Värdera JCB – teleskoplastare & anläggningsmaskiner",
    intro: "JCB är världsledande inom teleskoplastare och har en bred portfölj av anläggningsmaskiner. Vår AI värderar hela JCB-sortimentet med nordisk och global marknadsdata.",
    seoText: "JCB är mest kända som världens ledande tillverkare av teleskoplastare (Loadall-serien), men erbjuder även grävmaskiner (JS-serien), hjullastare och minigrävare. JCBs unika ecoMAX-motorer eliminerar behovet av AdBlue/DEF, vilket är en stark försäljningspunkt.\n\nJCB 541-70 är den mest populära teleskoplastaren i Norden med konsekvent hög likviditet. JCBs starka servicenätverk och brett utbud av tillbehör gör maskinerna mångsidiga och eftertraktade.\n\nPå den nordiska marknaden har JCB stark position inom lantbruk, bygg och industri. JCBs Hydradig och innovativa konceptmaskiner har stärkt varumärkets premiumimage.",
    machineTypes: [
      { label: "Teleskoplastare", href: "/vardera-teleskoplastare" },
      { label: "Grävmaskin", href: "/vardera-gravmaskin" },
      { label: "Hjullastare", href: "/vardera-hjullastare" },
    ],
    popularModels: [
      { name: "JCB 541-70", type: "Teleskoplastare", priceRange: "450 000 – 750 000", liquidity: 85 },
      { name: "JCB JS220", type: "Grävmaskin", priceRange: "750 000 – 1 200 000", liquidity: 74 },
      { name: "JCB 3CX", type: "Grävlastare", priceRange: "400 000 – 700 000", liquidity: 82 },
    ],
    stats: [
      { label: "Modeller i databasen", value: "7 800+" },
      { label: "Snitt likviditet", value: "80%" },
      { label: "Marknadstrend 30d", value: "+1.5%" },
    ],
    faqs: [
      { q: "Har JCB bra andrahandsvärde?", a: "Ja, särskilt teleskoplastare (541-70) och grävlastare (3CX) har konsekvent hög likviditet i Norden." },
      { q: "Påverkar ecoMAX-motorn värdet?", a: "JCBs ecoMAX-motor utan AdBlue-krav är en fördel – lägre driftskostnader och färre komponenter att underhålla." },
    ],
  },
  {
    slug: "kubota",
    name: "Kubota",
    heroImage: machineExcavator,
    heroAlt: "Kubota minigrävare i arbete – värdera Kubota-maskiner med AI-driven maskinvärdering",
    metaTitle: "Värdera Kubota-maskiner – Verifierat Marknadsvärde | Maskinvärdering.se",
    metaDescription: "Få verifierat marknadsvärde på Kubota minigrävare och kompaktmaskiner. AI-driven värdering med expertverifiering. Resultat på 15 minuter.",
    h1: "Värdera Kubota – ledande inom minigrävare",
    intro: "Kubota dominerar marknaden för minigrävare och kompaktmaskiner. Våra AI-analyser täcker hela Kubotas sortiment med exakt marknadsdata från Norden.",
    seoText: "Kubota är världsledande inom minigrävare (1–8 ton) och har exceptionellt högt andrahandsvärde i denna klass. KX-serien (KX040, KX057, KX080) är bland de mest handlade maskinerna på den nordiska marknaden med likviditetsindex som regelmässigt överstiger 85%.\n\nMinigrävare har den högsta likviditeten av alla maskintyper tack vare bred användning – från villaägare och kommuner till byggföretag och anläggare. Kubota drar nytta av denna breda marknad med exceptionell tillförlitlighet och låga driftskostnader.\n\nKubotas U-serie (U17, U27, U48) och den större KX080 har starka positioner. Maskinerna har kompakta dimensioner som gör dem idealiska för tätortsnära projekt.",
    machineTypes: [
      { label: "Grävmaskin", href: "/vardera-gravmaskin" },
    ],
    popularModels: [
      { name: "Kubota KX080", type: "Minigrävare", priceRange: "350 000 – 650 000", liquidity: 88 },
      { name: "Kubota KX057", type: "Minigrävare", priceRange: "280 000 – 480 000", liquidity: 86 },
      { name: "Kubota U27", type: "Minigrävare", priceRange: "180 000 – 320 000", liquidity: 90 },
      { name: "Kubota KX040", type: "Minigrävare", priceRange: "220 000 – 400 000", liquidity: 87 },
    ],
    stats: [
      { label: "Modeller i databasen", value: "6 500+" },
      { label: "Snitt likviditet", value: "88%" },
      { label: "Marknadstrend 30d", value: "+2.8%" },
    ],
    faqs: [
      { q: "Varför har Kubota så hög likviditet?", a: "Minigrävare har den bredaste köparmarknaden – från privatpersoner till stora entreprenörer. Kubota är kvalitetsledaren i klassen." },
      { q: "Vilken Kubota-modell är mest efterfrågad?", a: "KX080 och U27 har högst likviditet. KX080 är den största minigrävaren och U27 är perfekt för tätort och trädgård." },
    ],
  },
  {
    slug: "kobelco",
    name: "Kobelco",
    heroImage: machineExcavator,
    heroAlt: "Kobelco grävmaskin på arbetsplats – värdera Kobelco-maskiner med AI-driven maskinvärdering",
    metaTitle: "Värdera Kobelco-maskiner – Verifierat Marknadsvärde | Maskinvärdering.se",
    metaDescription: "Få verifierat marknadsvärde på Kobelco grävmaskiner. AI-driven värdering med expertverifiering och realtidsdata från nordiska marknader.",
    h1: "Värdera Kobelco – specialisterna på grävmaskiner",
    intro: "Kobelco är en specialiserad japansk grävmaskinstillverkare känd för bränsleeffektivitet och miljöprestanda. Vi värderar alla Kobelco-modeller med global marknadsdata.",
    seoText: "Kobelco är en nischad men respekterad aktör på den nordiska grävmaskinsmarknaden. SK-serien erbjuder utmärkt bränsleeffektivitet och en av marknadens tystaste kabiner. Kobelcos NEXT-system minskar bränsleförbrukningen med upp till 10% jämfört med konkurrenter.\n\nKobelco har en smalare men lojal kundbas i Norden. Andrahandsvärdet är stabilt men likviditeten något lägre än Volvo och CAT på grund av mindre serviceorganisation. Exportmöjligheter till Asien kompenserar delvis.",
    machineTypes: [
      { label: "Grävmaskin", href: "/vardera-gravmaskin" },
    ],
    popularModels: [
      { name: "Kobelco SK210", type: "Grävmaskin", priceRange: "800 000 – 1 200 000", liquidity: 70 },
      { name: "Kobelco SK140", type: "Grävmaskin", priceRange: "600 000 – 950 000", liquidity: 68 },
    ],
    stats: [
      { label: "Modeller i databasen", value: "3 200+" },
      { label: "Snitt likviditet", value: "69%" },
      { label: "Marknadstrend 30d", value: "+0.6%" },
    ],
    faqs: [
      { q: "Har Kobelco bra andrahandsvärde?", a: "Kobelco har stabilt värde men lägre likviditet i Norden. Exportmarknaden (Asien) ger ytterligare köpare." },
      { q: "Vad skiljer Kobelco från andra märken?", a: "Bränsleeffektivitet och låg ljudnivå. Kobelcos NEXT-teknologi sparar upp till 10% bränsle." },
    ],
  },
  // ── DUMPERSTILLVERKARE ──
  {
    slug: "bell",
    name: "Bell",
    heroImage: pseoDumper,
    heroAlt: "Bell ramstyrda dumper på byggarbetsplats – värdera Bell-maskiner med AI-driven maskinvärdering",
    metaTitle: "Värdera Bell-dumpers – Verifierat Marknadsvärde | Maskinvärdering.se",
    metaDescription: "Få verifierat marknadsvärde på Bell dumpers. AI-driven värdering med global marknadsdata och expertverifiering. Resultat på 15 minuter.",
    h1: "Värdera Bell – specialister på ramstyrda dumpers",
    intro: "Bell Equipment är en sydafrikansk tillverkare specialiserad på ramstyrda dumpers. Stark närvaro i Afrika, Norden och gruvmarknaden ger stabil prissättning.",
    seoText: "Bell Equipment har etablerat sig som ett starkt alternativ till Volvo och CAT inom ramstyrda dumpers. B-serien (B25E, B30E, B40E) erbjuder robust konstruktion anpassad för tuffa förhållanden i gruv- och bergtäktsindustrin.\n\nI Norden har Bell vuxit genom attraktiv prissättning och stark serviceorganisation. Bell-dumpers är kända för enkel underhållstillgänglighet och låga driftskostnader per transporterat ton. Andrahandsvärdet har stabiliserats i takt med ökande marknadsacceptans.",
    machineTypes: [
      { label: "Dumper", href: "/vardera-dumper" },
    ],
    popularModels: [
      { name: "Bell B30E", type: "Dumper", priceRange: "1 600 000 – 2 800 000", liquidity: 68 },
      { name: "Bell B25E", type: "Dumper", priceRange: "1 300 000 – 2 300 000", liquidity: 65 },
      { name: "Bell B40E", type: "Dumper", priceRange: "2 200 000 – 3 800 000", liquidity: 62 },
    ],
    stats: [
      { label: "Modeller i databasen", value: "2 100+" },
      { label: "Snitt likviditet", value: "65%" },
      { label: "Marknadstrend 30d", value: "+0.3%" },
    ],
    faqs: [
      { q: "Hur står sig Bell mot Volvo-dumpers?", a: "Bell erbjuder lägre inköpspris och konkurrenskraftiga driftskostnader. Volvo har högre likviditet i Norden men Bell är stark på exportmarknaden." },
      { q: "Värderar ni Bell-dumpers i alla storlekar?", a: "Ja, från B20E till B60E. Vi har global data inklusive den starka afrikanska marknaden." },
    ],
  },
  {
    slug: "hydrema",
    name: "Hydrema",
    heroImage: pseoDumper,
    heroAlt: "Hydrema dumper på arbetsplats – värdera Hydrema-maskiner med AI-driven maskinvärdering",
    metaTitle: "Värdera Hydrema-maskiner – Verifierat Marknadsvärde | Maskinvärdering.se",
    metaDescription: "Få verifierat marknadsvärde på Hydrema dumpers och anläggningsmaskiner. AI-driven värdering med nordisk marknadsdata.",
    h1: "Värdera Hydrema – danskt hantverk i anläggningsmaskiner",
    intro: "Hydrema är en dansk tillverkare av kompakta dumpers och anläggningsmaskiner. Populär i Skandinavien för mångsidighet och kompakta mått.",
    seoText: "Hydrema har en unik position på den nordiska marknaden med kompakta, mångsidiga maskiner som kombinerar dumper- och grävfunktionalitet. 900-serien är populär i kommuner och för mindre entreprenörer tack vare kompakta mått och god framkomlighet.\n\nHydremas danska ursprung ger stark serviceorganisation i hela Skandinavien. Maskinerna har lägre priser än de stora märkena men erbjuder utmärkt pris-prestanda för sin nisch.",
    machineTypes: [
      { label: "Dumper", href: "/vardera-dumper" },
    ],
    popularModels: [
      { name: "Hydrema 922F", type: "Dumper", priceRange: "600 000 – 1 000 000", liquidity: 71 },
      { name: "Hydrema 912FS", type: "Dumper", priceRange: "500 000 – 850 000", liquidity: 68 },
    ],
    stats: [
      { label: "Modeller i databasen", value: "1 400+" },
      { label: "Snitt likviditet", value: "69%" },
      { label: "Marknadstrend 30d", value: "+0.5%" },
    ],
    faqs: [
      { q: "Var kan man sälja Hydrema-maskiner?", a: "Primärt i Skandinavien och Nordeuropa. Vår värdering tar hänsyn till den regionala marknaden." },
    ],
  },
  // ── KRANTILLVERKARE ──
  {
    slug: "tadano",
    name: "Tadano",
    heroImage: pseoKran,
    heroAlt: "Tadano mobilkran vid lyft – värdera Tadano-kranar med AI-driven maskinvärdering",
    metaTitle: "Värdera Tadano-kranar – Verifierat Marknadsvärde | Maskinvärdering.se",
    metaDescription: "Få verifierat marknadsvärde på Tadano mobilkranar och tornkranar. AI-driven värdering med global marknadsdata och expertverifiering.",
    h1: "Värdera Tadano – japanska kranar i världsklass",
    intro: "Tadano är en av världens ledande krantillverkare efter förvärvet av Demag. Vår AI värderar alla Tadano-kranmodeller med data från globala transaktioner.",
    seoText: "Tadano har förstärkt sin position dramatiskt genom förvärvet av Demag 2019, och är nu världens näst största krantillverkare. ATF-serien och GR-serien erbjuder brett utbud från 15 till 1 200 tons kapacitet.\n\nPå den nordiska marknaden har Tadano vuxit stadigt med fokus på mobilkranar i 50–200 tons klassen. Tadano-kranar har starkt andrahandsvärde globalt tack vare japansk kvalitetstradition och Demags europeiska ingenjörskonst.",
    machineTypes: [
      { label: "Kran", href: "/vardera-kran" },
    ],
    popularModels: [
      { name: "Tadano GR-1000", type: "Kran", priceRange: "2 800 000 – 4 500 000", liquidity: 72 },
      { name: "Tadano ATF 70G-4", type: "Kran", priceRange: "2 500 000 – 4 200 000", liquidity: 74 },
      { name: "Tadano ATF 130G-5", type: "Kran", priceRange: "5 000 000 – 8 500 000", liquidity: 70 },
    ],
    stats: [
      { label: "Modeller i databasen", value: "3 800+" },
      { label: "Snitt likviditet", value: "72%" },
      { label: "Marknadstrend 30d", value: "+3.8%" },
    ],
    faqs: [
      { q: "Vad hände med Demag?", a: "Tadano förvärvade Demag 2019. Demag-kranar fortsätter produceras under Tadano-paraplyet. Vi värderar båda varumärkena." },
      { q: "Har Tadano bra andrahandsvärde?", a: "Ja, stark global efterfrågan ger stabila priser. ATF-serien är särskilt eftertraktad i Europa och Mellanöstern." },
    ],
  },
  {
    slug: "manitowoc",
    name: "Manitowoc",
    heroImage: pseoKran,
    heroAlt: "Manitowoc kran vid byggprojekt – värdera Manitowoc-kranar med AI-driven maskinvärdering",
    metaTitle: "Värdera Manitowoc-kranar – Verifierat Marknadsvärde | Maskinvärdering.se",
    metaDescription: "Få verifierat marknadsvärde på Manitowoc och Grove kranar. AI-driven värdering med global marknadsdata och expertverifiering.",
    h1: "Värdera Manitowoc & Grove – amerikanska kranspecialister",
    intro: "Manitowoc och Grove är globalt erkända krantillverkare. Vår AI värderar hela sortimentet med realtidsdata från internationella kranmarknader.",
    seoText: "Manitowoc Company är en av världens ledande krantillverkare och äger varumärkena Manitowoc (bandkranar), Grove (mobilkranar) och Potain (tornkranar). GMK-serien (Grove) är en av de mest populära mobilkransserierna globalt.\n\nPå den nordiska marknaden har Grove GMK-serien stark position i mellanklassen (40–100 ton). Manitowoc bandkranar används i stora infrastruktur- och vindkraftsprojekt.",
    machineTypes: [
      { label: "Kran", href: "/vardera-kran" },
    ],
    popularModels: [
      { name: "Grove GMK4100", type: "Kran", priceRange: "3 000 000 – 5 200 000", liquidity: 78 },
      { name: "Grove GMK3060", type: "Kran", priceRange: "2 000 000 – 3 500 000", liquidity: 75 },
    ],
    stats: [
      { label: "Modeller i databasen", value: "2 900+" },
      { label: "Snitt likviditet", value: "75%" },
      { label: "Marknadstrend 30d", value: "+2.5%" },
    ],
    faqs: [
      { q: "Vad är skillnaden mellan Manitowoc och Grove?", a: "Grove tillverkar mobilkranar, Manitowoc bandkranar, och Potain tornkranar. Alla ägs av Manitowoc Company." },
    ],
  },
  {
    slug: "terex",
    name: "Terex",
    heroImage: pseoKran,
    heroAlt: "Terex kran på arbetsplats – värdera Terex-kranar med AI-driven maskinvärdering",
    metaTitle: "Värdera Terex-maskiner – Verifierat Marknadsvärde | Maskinvärdering.se",
    metaDescription: "Få verifierat marknadsvärde på Terex kranar och anläggningsmaskiner. AI-driven värdering med global marknadsdata.",
    h1: "Värdera Terex – kranar & lyftutrustning",
    intro: "Terex erbjuder ett brett sortiment av kranar och lyftutrustning. Vår AI värderar Terex-maskiner med global transaktionsdata.",
    seoText: "Terex har en bred portfölj av kranar och lyftutrustning. Efter att ha sålt sin mobilkranverksamhet (Demag) till Tadano fokuserar Terex på specialkranar, torn- och lyftkranar. Terex Rough Terrain-kranar har nischad men stabil marknad.\n\nPå den nordiska marknaden har Terex en begränsad men lojal kundbas, främst inom specialiserade lyftuppdrag och tornkranar.",
    machineTypes: [
      { label: "Kran", href: "/vardera-kran" },
    ],
    popularModels: [
      { name: "Terex AC 100/4L", type: "Kran", priceRange: "2 500 000 – 4 000 000", liquidity: 65 },
    ],
    stats: [
      { label: "Modeller i databasen", value: "1 800+" },
      { label: "Snitt likviditet", value: "64%" },
      { label: "Marknadstrend 30d", value: "+0.2%" },
    ],
    faqs: [
      { q: "Värderar ni gamla Terex-Demag kranar?", a: "Ja, vi har historisk data på Terex-Demag kranar. Dessa värderas nu inom Tadano-spektrumet men med Terex-historik." },
    ],
  },
  {
    slug: "sany",
    name: "Sany",
    heroImage: machineCrane,
    heroAlt: "Sany kran vid byggprojekt – värdera Sany-maskiner med AI-driven maskinvärdering",
    metaTitle: "Värdera Sany-maskiner – Verifierat Marknadsvärde | Maskinvärdering.se",
    metaDescription: "Få verifierat marknadsvärde på Sany kranar och anläggningsmaskiner. AI-driven värdering med global marknadsdata.",
    h1: "Värdera Sany – Kinas största maskintillverkare",
    intro: "Sany är världens största tillverkare av anläggningsmaskiner mätt i volym. Snabb tillväxt i Europa med konkurrenskraftiga priser och modern teknik.",
    seoText: "Sany har vuxit till världens största anläggningsmaskinstillverkare och expanderar nu aggressivt i Europa. SCC-serien (kranar) och SY-serien (grävmaskiner) erbjuder modern teknik till konkurrenskraftiga priser.\n\nPå den nordiska marknaden är Sany relativt nytt men växer snabbt. Andrahandsvärdet är under etablering – priserna kan vara 15–25% lägre än europeiska och japanska märken, men detta förväntas stabiliseras i takt med att service och reservdelstillgång förbättras.",
    machineTypes: [
      { label: "Kran", href: "/vardera-kran" },
      { label: "Grävmaskin", href: "/vardera-gravmaskin" },
    ],
    popularModels: [
      { name: "Sany SCC800", type: "Kran", priceRange: "2 000 000 – 3 500 000", liquidity: 55 },
      { name: "Sany SY215C", type: "Grävmaskin", priceRange: "600 000 – 950 000", liquidity: 58 },
    ],
    stats: [
      { label: "Modeller i databasen", value: "2 400+" },
      { label: "Snitt likviditet", value: "57%" },
      { label: "Marknadstrend 30d", value: "+1.0%" },
    ],
    faqs: [
      { q: "Har Sany bra andrahandsvärde i Norden?", a: "Andrahandsvärdet är under etablering. Sany erbjuder låga inköpspriser men likviditeten är lägre än etablerade märken." },
    ],
  },
  {
    slug: "zoomlion",
    name: "Zoomlion",
    heroImage: machineCrane,
    heroAlt: "Zoomlion kran i arbete – värdera Zoomlion-maskiner med AI-driven maskinvärdering",
    metaTitle: "Värdera Zoomlion-maskiner – Verifierat Marknadsvärde | Maskinvärdering.se",
    metaDescription: "Få verifierat marknadsvärde på Zoomlion kranar och anläggningsmaskiner. AI-driven värdering med global marknadsdata.",
    h1: "Värdera Zoomlion – kinesisk innovation i kranmarknaden",
    intro: "Zoomlion är en av världens största krantillverkare med stark position i Asien. Expanderar i Europa med moderna modeller.",
    seoText: "Zoomlion är Kinas näst största tillverkare av kranar och anläggningsmaskiner. Med avancerad teknik och konkurrenskraftiga priser expanderar Zoomlion i Europa, om än med begränsad nordisk närvaro hittills.\n\nAndrahandsvärdet för Zoomlion-maskiner är starkt beroende av exportmarknaden (Asien, Afrika, Mellanöstern). I Norden är likviditeten begränsad men priserna konkurrenskraftiga.",
    machineTypes: [
      { label: "Kran", href: "/vardera-kran" },
    ],
    popularModels: [
      { name: "Zoomlion ZTC250", type: "Kran", priceRange: "1 500 000 – 2 800 000", liquidity: 50 },
    ],
    stats: [
      { label: "Modeller i databasen", value: "1 600+" },
      { label: "Snitt likviditet", value: "50%" },
      { label: "Marknadstrend 30d", value: "+0.4%" },
    ],
    faqs: [
      { q: "Kan ni värdera Zoomlion i Norden?", a: "Ja, vi har global data. Den nordiska marknaden är begränsad men vi inkluderar exportpotential i värderingen." },
    ],
  },
  {
    slug: "grove",
    name: "Grove",
    heroImage: pseoKran,
    heroAlt: "Grove mobilkran vid lyft – värdera Grove-kranar med AI-driven maskinvärdering",
    metaTitle: "Värdera Grove-kranar – Verifierat Marknadsvärde | Maskinvärdering.se",
    metaDescription: "Få verifierat marknadsvärde på Grove mobilkranar. AI-driven värdering med global marknadsdata och expertverifiering.",
    h1: "Värdera Grove – mobilkranar i världsklass",
    intro: "Grove (en del av Manitowoc) tillverkar några av världens mest populära mobilkranar. GMK-serien är en favorit bland nordiska kranentreprenörer.",
    seoText: "Grove är ett av de mest etablerade namnen inom mobilkranar globalt. GMK-serien (Grove Mobile Kran) erbjuder brett sortiment från 30 till 450 ton. GMK4100 och GMK3060 är bland de mest populära modellerna i Norden.\n\nGrove-kranar har starkt andrahandsvärde tack vare global efterfrågan och beprövad teknik. Serviceorganisationen i Norden sköts via Manitowoc/Grove-nätverket.",
    machineTypes: [
      { label: "Kran", href: "/vardera-kran" },
    ],
    popularModels: [
      { name: "Grove GMK4100", type: "Kran", priceRange: "3 000 000 – 5 200 000", liquidity: 78 },
      { name: "Grove GMK3060", type: "Kran", priceRange: "2 000 000 – 3 500 000", liquidity: 75 },
      { name: "Grove GMK5150", type: "Kran", priceRange: "5 500 000 – 9 000 000", liquidity: 72 },
    ],
    stats: [
      { label: "Modeller i databasen", value: "2 400+" },
      { label: "Snitt likviditet", value: "75%" },
      { label: "Marknadstrend 30d", value: "+2.8%" },
    ],
    faqs: [
      { q: "Är Grove och Manitowoc samma företag?", a: "Ja, Grove är mobilkransvarumärket inom Manitowoc Company. Manitowoc tillverkar bandkranar och Potain tillverkar tornkranar." },
    ],
  },
  // ── LASTBILSTILLVERKARE ──
  {
    slug: "scania",
    name: "Scania",
    heroImage: pseoLastbil,
    heroAlt: "Scania lastbil vid logistikterminal – värdera Scania-lastbilar med AI-driven maskinvärdering",
    metaTitle: "Värdera Scania-lastbilar – Verifierat Marknadsvärde | Maskinvärdering.se",
    metaDescription: "Få verifierat marknadsvärde på Scania R, S och P-serien. AI-driven värdering med nordisk och europeisk marknadsdata. Resultat på 15 min.",
    h1: "Värdera Scania – Sveriges stolthet inom lastbilar",
    intro: "Scania är en av Nordens mest prestigefyllda lastbilstillverkare. Vår AI värderar alla Scania-modeller med realtidsdata från svenska och europeiska transaktioner.",
    seoText: "Scania har ett av de starkaste varumärkena inom tunga lastbilar i Europa. R-serien och S-serien dominerar den nordiska marknaden med premium-positionering och exceptionellt andrahandsvärde.\n\nScania-lastbilar med V8-motor (R500/R730/S730) har kultstatus och premiumpris på andrahandsmarknaden. Euro 6-kraven har gjort moderna Scania-modeller särskilt eftertraktade. Äldre Euro 5-modeller har fortfarande stark exportmarknad till Östeuropa och Afrika.\n\nScania Fleet Management-data kan dokumentera körhistorik och underhåll, vilket höjer andrahandsvärdet med 5–10% för lastbilar med fullständig historik.",
    machineTypes: [
      { label: "Lastbil", href: "/vardera-lastbil" },
    ],
    popularModels: [
      { name: "Scania R500", type: "Dragbil", priceRange: "550 000 – 950 000", liquidity: 72 },
      { name: "Scania S730", type: "Dragbil", priceRange: "800 000 – 1 400 000", liquidity: 69 },
      { name: "Scania P410", type: "Distributionsbil", priceRange: "400 000 – 700 000", liquidity: 74 },
      { name: "Scania G500", type: "Tippbil", priceRange: "500 000 – 900 000", liquidity: 70 },
    ],
    stats: [
      { label: "Modeller i databasen", value: "15 800+" },
      { label: "Snitt likviditet", value: "71%" },
      { label: "Marknadstrend 30d", value: "-0.3%" },
    ],
    faqs: [
      { q: "Har Scania bäst andrahandsvärde bland lastbilar?", a: "I Norden har Scania och Volvo jämförbara andrahandsvärden. Scania V8-modeller har premiumstatus. Internationellt är Scania särskilt eftertraktad." },
      { q: "Påverkar Euro-klass Scania-värdet?", a: "Ja, Euro 6 är standard i Norden. Euro 5 sänker värdet 20–30% på hemmamarknaden men har stark exportefterfrågan." },
    ],
  },
  {
    slug: "man",
    name: "MAN",
    heroImage: pseoLastbil,
    heroAlt: "MAN lastbil på motorväg – värdera MAN-lastbilar med AI-driven maskinvärdering",
    metaTitle: "Värdera MAN-lastbilar – Verifierat Marknadsvärde | Maskinvärdering.se",
    metaDescription: "Få verifierat marknadsvärde på MAN TGX, TGS och TGL. AI-driven värdering med europeisk marknadsdata och expertverifiering.",
    h1: "Värdera MAN – tysk ingenjörskonst i tunga transporter",
    intro: "MAN Truck & Bus är en av Europas ledande lastbilstillverkare. Vår AI värderar alla MAN-modeller med data från nordiska och europeiska marknader.",
    seoText: "MAN (en del av Traton Group, tillsammans med Scania) har en stark position i mellanklassen av tunga lastbilar. TGX-serien är huvudkontendent på den europeiska fjärrtransportmarknaden.\n\nPå den nordiska marknaden har MAN en stabil men mindre marknadsandel jämfört med Scania och Volvo. MAN-lastbilar erbjuder ofta konkurrensmässigt pris-prestanda med tysk ingenjörskvalitet och tillförlitliga D-motorer.",
    machineTypes: [
      { label: "Lastbil", href: "/vardera-lastbil" },
    ],
    popularModels: [
      { name: "MAN TGX 18.510", type: "Dragbil", priceRange: "500 000 – 850 000", liquidity: 65 },
      { name: "MAN TGS 26.510", type: "Tippbil", priceRange: "550 000 – 900 000", liquidity: 63 },
    ],
    stats: [
      { label: "Modeller i databasen", value: "11 200+" },
      { label: "Snitt likviditet", value: "65%" },
      { label: "Marknadstrend 30d", value: "-0.8%" },
    ],
    faqs: [
      { q: "Har MAN lägre andrahandsvärde än Scania?", a: "I Norden har MAN generellt 5–15% lägre andrahandsvärde, men erbjuder konkurrenskraftigt inköpspris. Internationellt är skillnaden mindre." },
    ],
  },
  {
    slug: "mercedes-benz",
    name: "Mercedes-Benz",
    heroImage: pseoLastbil,
    heroAlt: "Mercedes-Benz Actros på motorväg – värdera Mercedes-lastbilar med AI-driven maskinvärdering",
    metaTitle: "Värdera Mercedes-Benz lastbilar – Verifierat Marknadsvärde | Maskinvärdering.se",
    metaDescription: "Få verifierat marknadsvärde på Mercedes-Benz Actros, Arocs och Atego. AI-driven värdering med europeisk marknadsdata.",
    h1: "Värdera Mercedes-Benz – premium i lastbilsklassen",
    intro: "Mercedes-Benz Trucks (Daimler Truck) är världens ledande lastbilstillverkare. Actros är en av Europas mest handlade lastbilar med stark likviditet.",
    seoText: "Mercedes-Benz Actros är en av de mest igenkända lastbilarna i världen. Med banbrytande teknologi som MirrorCam, Predictive Powertrain Control och OM-motorerna har Actros konsekvent hög efterfrågan.\n\nPå den nordiska marknaden har Mercedes-Benz en stabil position, särskilt inom distribution (Atego) och anläggning (Arocs). Actros-serien konkurrerar direkt med Scania R-serien och Volvo FH. Andrahandsvärdet är starkt globalt med bred exportmarknad.",
    machineTypes: [
      { label: "Lastbil", href: "/vardera-lastbil" },
    ],
    popularModels: [
      { name: "Mercedes-Benz Actros", type: "Dragbil", priceRange: "550 000 – 1 000 000", liquidity: 71 },
      { name: "Mercedes-Benz Arocs", type: "Anläggningsbil", priceRange: "600 000 – 1 050 000", liquidity: 68 },
      { name: "Mercedes-Benz Atego", type: "Distributionsbil", priceRange: "350 000 – 600 000", liquidity: 70 },
    ],
    stats: [
      { label: "Modeller i databasen", value: "14 500+" },
      { label: "Snitt likviditet", value: "70%" },
      { label: "Marknadstrend 30d", value: "-0.4%" },
    ],
    faqs: [
      { q: "Är Mercedes-Benz bra att köpa begagnad?", a: "Ja, Actros och Arocs har stark global efterfrågan. Mercedes-Benz har brett servicenät och god reservdelstillgång." },
    ],
  },
  {
    slug: "daf",
    name: "DAF",
    heroImage: pseoLastbil,
    heroAlt: "DAF lastbil på europeisk motorväg – värdera DAF-lastbilar med AI-driven maskinvärdering",
    metaTitle: "Värdera DAF-lastbilar – Verifierat Marknadsvärde | Maskinvärdering.se",
    metaDescription: "Få verifierat marknadsvärde på DAF XF, XG och CF. AI-driven värdering med europeisk marknadsdata och expertverifiering.",
    h1: "Värdera DAF – holländsk effektivitet i lastbilar",
    intro: "DAF Trucks (PACCAR) är en ledande europeisk lastbilstillverkare med stark position i Benelux och UK. Växande närvaro i Norden.",
    seoText: "DAF Trucks har stärkt sin position kraftigt med den nya XG- och XG+-serien som vann International Truck of the Year 2022. Med förbättrad aerodynamik och bränsleeffektivitet konkurrerar DAF nu direkt med de nordiska favoriterna.\n\nPå den nordiska marknaden har DAF historiskt haft lägre marknadsandel men växer stadigt. Andrahandsvärdet är stabilt, särskilt för XF-serien, med god exportefterfrågan till UK och Benelux.",
    machineTypes: [
      { label: "Lastbil", href: "/vardera-lastbil" },
    ],
    popularModels: [
      { name: "DAF XF 480", type: "Dragbil", priceRange: "450 000 – 800 000", liquidity: 62 },
      { name: "DAF XG 530", type: "Dragbil", priceRange: "550 000 – 950 000", liquidity: 60 },
    ],
    stats: [
      { label: "Modeller i databasen", value: "8 900+" },
      { label: "Snitt likviditet", value: "61%" },
      { label: "Marknadstrend 30d", value: "-0.2%" },
    ],
    faqs: [
      { q: "Är DAF populärt i Norden?", a: "DAF växer i Norden men har lägre marknadsandel. Internationellt (UK, Benelux) är DAF mycket populärt med hög likviditet." },
    ],
  },
  {
    slug: "iveco",
    name: "Iveco",
    heroImage: pseoLastbil,
    heroAlt: "Iveco lastbil vid logistikcentral – värdera Iveco-lastbilar med AI-driven maskinvärdering",
    metaTitle: "Värdera Iveco-lastbilar – Verifierat Marknadsvärde | Maskinvärdering.se",
    metaDescription: "Få verifierat marknadsvärde på Iveco S-Way, Eurocargo och Daily. AI-driven värdering med europeisk marknadsdata.",
    h1: "Värdera Iveco – italiensk lastbilstradition",
    intro: "Iveco är en ledande europeisk lastbils- och transportfordonstillverkare. Stark position i Sydeuropa med växande närvaro i Norden.",
    seoText: "Iveco har en nischad men stabil position på den nordiska marknaden. S-Way-serien (tunga lastbilar) och Daily-serien (lätta lastbilar) är mest populära. Iveco har tagit ledningen inom gasdriven teknik med LNG/CNG-modeller.\n\nAndrahandsvärdet för Iveco i Norden är lägre än för Scania och Volvo, men exportmöjligheter till Sydeuropa och Afrika ger bredare köparbas.",
    machineTypes: [
      { label: "Lastbil", href: "/vardera-lastbil" },
    ],
    popularModels: [
      { name: "Iveco S-Way", type: "Dragbil", priceRange: "400 000 – 700 000", liquidity: 58 },
      { name: "Iveco Eurocargo", type: "Distributionsbil", priceRange: "300 000 – 550 000", liquidity: 62 },
    ],
    stats: [
      { label: "Modeller i databasen", value: "7 200+" },
      { label: "Snitt likviditet", value: "60%" },
      { label: "Marknadstrend 30d", value: "-1.0%" },
    ],
    faqs: [
      { q: "Är Iveco svårsålt i Norden?", a: "Iveco har lägre likviditet i Norden men god efterfrågan i Sydeuropa. Vi inkluderar internationell exportpotential i värderingen." },
    ],
  },
  {
    slug: "renault-trucks",
    name: "Renault Trucks",
    heroImage: pseoLastbil,
    heroAlt: "Renault Trucks lastbil – värdera Renault-lastbilar med AI-driven maskinvärdering",
    metaTitle: "Värdera Renault Trucks – Verifierat Marknadsvärde | Maskinvärdering.se",
    metaDescription: "Få verifierat marknadsvärde på Renault T, C och D-serien. AI-driven värdering med europeisk marknadsdata.",
    h1: "Värdera Renault Trucks – franskt hantverk i transport",
    intro: "Renault Trucks (Volvo Group) erbjuder ett brett lastbilssortiment. Stark position i Frankrike med växande närvaro i Europa.",
    seoText: "Renault Trucks, ägt av Volvo Group, delar plattform och drivlinor med Volvo men har en distinkt marknadsposition. T-serien (fjärrtransport), C-serien (anläggning) och D-serien (distribution) täcker alla segment.\n\nI Norden har Renault Trucks begränsad närvaro men nytta av Volvos serviceorganisation. Andrahandsvärdet är stabilt i Frankrike och Sydeuropa men lägre i Norden. Renault Trucks E-Tech (elektrisk) har gjort inbrytningar i stadsdistribution.",
    machineTypes: [
      { label: "Lastbil", href: "/vardera-lastbil" },
    ],
    popularModels: [
      { name: "Renault T480", type: "Dragbil", priceRange: "400 000 – 700 000", liquidity: 55 },
      { name: "Renault C430", type: "Anläggningsbil", priceRange: "450 000 – 750 000", liquidity: 58 },
    ],
    stats: [
      { label: "Modeller i databasen", value: "6 800+" },
      { label: "Snitt likviditet", value: "57%" },
      { label: "Marknadstrend 30d", value: "-0.5%" },
    ],
    faqs: [
      { q: "Delar Renault Trucks teknik med Volvo?", a: "Ja, Renault Trucks ägs av Volvo Group och delar plattform. Servicenätverket i Norden hanteras via Volvo." },
    ],
  },
  // ── TELESKOPLASTARTILLVERKARE ──
  {
    slug: "merlo",
    name: "Merlo",
    heroImage: pseoTeleskoplastare,
    heroAlt: "Merlo teleskoplastare vid lantbruk – värdera Merlo-maskiner med AI-driven maskinvärdering",
    metaTitle: "Värdera Merlo-maskiner – Verifierat Marknadsvärde | Maskinvärdering.se",
    metaDescription: "Få verifierat marknadsvärde på Merlo teleskoplastare. AI-driven värdering med nordisk marknadsdata och expertverifiering.",
    h1: "Värdera Merlo – italienska teleskoplastare i toppklass",
    intro: "Merlo är en av världens ledande tillverkare av teleskoplastare med innovativ Roto-teknik. Stark närvaro i nordiskt lantbruk och bygg.",
    seoText: "Merlo är känt för innovation inom teleskoplastare, särskilt den roterande Roto-serien som erbjuder 360° rotation. P-serien (fasta teleskoplastare) är bland de mest populära i Norden för både lantbruk och byggindustri.\n\nMerlo P40.17 har konsekvent hög likviditet tack vare optimal kombination av lyftkapacitet (4 ton) och lyfthöjd (17 meter). Roto-modeller har premiumpriser men smalare andrahandsmarknad.\n\nMerlos italienska tillverkning med fokus på robusthet och servicebarhet har skapat ett lojalt kundkonto i Skandinavien.",
    machineTypes: [
      { label: "Teleskoplastare", href: "/vardera-teleskoplastare" },
    ],
    popularModels: [
      { name: "Merlo P40.17", type: "Teleskoplastare", priceRange: "500 000 – 850 000", liquidity: 82 },
      { name: "Merlo Roto 40.25", type: "Roterande", priceRange: "800 000 – 1 400 000", liquidity: 70 },
      { name: "Merlo P50.18", type: "Teleskoplastare", priceRange: "600 000 – 1 000 000", liquidity: 78 },
    ],
    stats: [
      { label: "Modeller i databasen", value: "3 400+" },
      { label: "Snitt likviditet", value: "77%" },
      { label: "Marknadstrend 30d", value: "+2.0%" },
    ],
    faqs: [
      { q: "Vad är speciellt med Merlo Roto?", a: "Merlo Roto har 360° roterande överrede vilket ger maximal flexibilitet. Premium pris men unik kapabilitet." },
      { q: "Är Merlo bra att köpa begagnad?", a: "Ja, Merlo har starkt andrahandsvärde i Norden tack vare kvalitet och god serviceorganisation." },
    ],
  },
  {
    slug: "manitou",
    name: "Manitou",
    heroImage: pseoTeleskoplastare,
    heroAlt: "Manitou teleskoplastare på byggarbetsplats – värdera Manitou-maskiner med AI-driven maskinvärdering",
    metaTitle: "Värdera Manitou-maskiner – Verifierat Marknadsvärde | Maskinvärdering.se",
    metaDescription: "Få verifierat marknadsvärde på Manitou teleskoplastare och truckar. AI-driven värdering med europeisk marknadsdata.",
    h1: "Värdera Manitou – franska teleskoplastare med global räckvidd",
    intro: "Manitou är en av världens största tillverkare av teleskoplastare och materialhantering. Brett sortiment för lantbruk, bygg och industri.",
    seoText: "Manitou Group är en global ledare inom materialhantering med teleskoplastare (MT/MLT-serien), terrängtruckar och personlyftare. MT 1440 och MLT 735 är bland de mest populära modellerna i Norden.\n\nManitou erbjuder specifika lantbruksmodeller (MLT-serien) och byggmodeller (MT-serien) med anpassad utrustning. Serviceorganisationen i Norden är välutbyggd med god reservdelstillgång.\n\nManitous NewAg-koncept (lantbruksspecifika modeller) har stärkt varumärkets position hos svenska och nordiska lantbrukare.",
    machineTypes: [
      { label: "Teleskoplastare", href: "/vardera-teleskoplastare" },
    ],
    popularModels: [
      { name: "Manitou MT 1440", type: "Teleskoplastare", priceRange: "400 000 – 700 000", liquidity: 79 },
      { name: "Manitou MLT 735", type: "Lantbruk", priceRange: "350 000 – 600 000", liquidity: 76 },
      { name: "Manitou MT 1840", type: "Teleskoplastare", priceRange: "500 000 – 850 000", liquidity: 74 },
    ],
    stats: [
      { label: "Modeller i databasen", value: "4 600+" },
      { label: "Snitt likviditet", value: "76%" },
      { label: "Marknadstrend 30d", value: "+1.6%" },
    ],
    faqs: [
      { q: "Vad skiljer MT- och MLT-serien?", a: "MT-serien är byggoptimerad med robust konstruktion. MLT-serien är lantbruksanpassad med jordbruksspecifik utrustning och hydraulik." },
    ],
  },
  {
    slug: "bobcat",
    name: "Bobcat",
    heroImage: machineLoader,
    heroAlt: "Bobcat kompaktlastare på arbetsplats – värdera Bobcat-maskiner med AI-driven maskinvärdering",
    metaTitle: "Värdera Bobcat-maskiner – Verifierat Marknadsvärde | Maskinvärdering.se",
    metaDescription: "Få verifierat marknadsvärde på Bobcat teleskoplastare, kompaktlastare och minigrävare. AI-driven värdering med nordisk marknadsdata.",
    h1: "Värdera Bobcat – kompaktmaskiner & teleskoplastare",
    intro: "Bobcat (Doosan Bobcat) är världsledande inom kompaktmaskiner. Vår AI värderar hela Bobcat-sortimentet med realtidsdata från nordiska marknader.",
    seoText: "Bobcat är synonymt med kompaktlastare (skid-steer) men har ett brett sortiment som inkluderar teleskoplastare (TL-serien), minigrävare (E-serien) och kompakthjullastare. Bobcat-maskiner har exceptionellt hög likviditet tack vare bred användning i allt från trädgård till tung industri.\n\nBobcat TL43.80HF är en populär teleskoplastare med stark lyftkapacitet. E-serien minigrävare konkurrerar direkt med Kubota i kompaktklassen.",
    machineTypes: [
      { label: "Teleskoplastare", href: "/vardera-teleskoplastare" },
      { label: "Grävmaskin", href: "/vardera-gravmaskin" },
    ],
    popularModels: [
      { name: "Bobcat TL43.80HF", type: "Teleskoplastare", priceRange: "550 000 – 900 000", liquidity: 76 },
      { name: "Bobcat E50", type: "Minigrävare", priceRange: "300 000 – 500 000", liquidity: 83 },
      { name: "Bobcat S770", type: "Kompaktlastare", priceRange: "350 000 – 550 000", liquidity: 80 },
    ],
    stats: [
      { label: "Modeller i databasen", value: "5 800+" },
      { label: "Snitt likviditet", value: "80%" },
      { label: "Marknadstrend 30d", value: "+1.9%" },
    ],
    faqs: [
      { q: "Värderar ni Bobcat kompaktlastare?", a: "Ja, alla Bobcat-modeller: kompaktlastare (S-serien), teleskoplastare (TL-serien) och minigrävare (E-serien)." },
    ],
  },
  {
    slug: "claas",
    name: "Claas",
    heroImage: pseoTeleskoplastare,
    heroAlt: "Claas teleskoplastare vid lantbruk – värdera Claas-maskiner med AI-driven maskinvärdering",
    metaTitle: "Värdera Claas Scorpion – Verifierat Marknadsvärde | Maskinvärdering.se",
    metaDescription: "Få verifierat marknadsvärde på Claas Scorpion teleskoplastare. AI-driven värdering med nordisk lantbruksdata.",
    h1: "Värdera Claas – teleskoplastare för lantbruket",
    intro: "Claas är en tysk premiummärkare känd för lantbruksmaskiner. Scorpion-serien av teleskoplastare har stark position i nordiskt lantbruk.",
    seoText: "Claas är mest känd för tröskor och grönytemaskiner men erbjuder en framstående serie teleskoplastare – Scorpion-serien. Tillverkade av Liebherr med Claas-specifikation erbjuder de premium kvalitet och jordbruksanpassning.\n\nScorpion 741 och 746 är populära i Norden tack vare robusthet och Claas serviceorganisation. Andrahandsvärdet är stabilt med stark säsongsefterfrågan under vår och höst.",
    machineTypes: [
      { label: "Teleskoplastare", href: "/vardera-teleskoplastare" },
    ],
    popularModels: [
      { name: "Claas Scorpion 741", type: "Teleskoplastare", priceRange: "500 000 – 800 000", liquidity: 74 },
      { name: "Claas Scorpion 746", type: "Teleskoplastare", priceRange: "550 000 – 900 000", liquidity: 72 },
    ],
    stats: [
      { label: "Modeller i databasen", value: "1 800+" },
      { label: "Snitt likviditet", value: "73%" },
      { label: "Marknadstrend 30d", value: "+1.2%" },
    ],
    faqs: [
      { q: "Är Claas Scorpion samma som Liebherr?", a: "Claas Scorpion tillverkas av Liebherr med Claas-specifik utrustning och programvara. De delar grundkonstruktion." },
    ],
  },
  {
    slug: "dieci",
    name: "Dieci",
    heroImage: pseoTeleskoplastare,
    heroAlt: "Dieci teleskoplastare på byggarbetsplats – värdera Dieci-maskiner med AI-driven maskinvärdering",
    metaTitle: "Värdera Dieci-maskiner – Verifierat Marknadsvärde | Maskinvärdering.se",
    metaDescription: "Få verifierat marknadsvärde på Dieci teleskoplastare. AI-driven värdering med europeisk marknadsdata.",
    h1: "Värdera Dieci – italienska teleskoplastare för tuff drift",
    intro: "Dieci är en italiensk tillverkare av kraftfulla teleskoplastare med fokus på byggindustri och tunga lyft.",
    seoText: "Dieci har positionerat sig som specialisten på kraftfulla teleskoplastare med hög lyftkapacitet. Agri- och Icarus-serierna erbjuder upp till 21 meters lyfthöjd och 7 tons kapacitet.\n\nPå den nordiska marknaden har Dieci en nischad men växande position, särskilt bland byggföretag som behöver tung lyftkapacitet. Andrahandsvärdet är stabilt men likviditeten lägre än Merlo och JCB.",
    machineTypes: [
      { label: "Teleskoplastare", href: "/vardera-teleskoplastare" },
    ],
    popularModels: [
      { name: "Dieci Agri Plus 40.7", type: "Teleskoplastare", priceRange: "450 000 – 750 000", liquidity: 68 },
      { name: "Dieci Icarus 40.17", type: "Teleskoplastare", priceRange: "500 000 – 850 000", liquidity: 65 },
    ],
    stats: [
      { label: "Modeller i databasen", value: "1 200+" },
      { label: "Snitt likviditet", value: "67%" },
      { label: "Marknadstrend 30d", value: "+0.8%" },
    ],
    faqs: [
      { q: "Är Dieci populärt i Norden?", a: "Dieci har en nischad position. Störst i Italien och Sydeuropa, men växande i Norden inom tunga lyftapplikationer." },
    ],
  },
  {
    slug: "faresin",
    name: "Faresin",
    heroImage: pseoTeleskoplastare,
    heroAlt: "Faresin teleskoplastare – värdera Faresin-maskiner med AI-driven maskinvärdering",
    metaTitle: "Värdera Faresin-maskiner – Verifierat Marknadsvärde | Maskinvärdering.se",
    metaDescription: "Få verifierat marknadsvärde på Faresin teleskoplastare. AI-driven värdering med europeisk marknadsdata.",
    h1: "Värdera Faresin – kompakta teleskoplastare från Italien",
    intro: "Faresin Industries producerar kompakta och medelstora teleskoplastare med fokus på lantbruk och lätt byggindustri.",
    seoText: "Faresin är en italiensk tillverkare av teleskoplastare med fokus på kompakta och medelstora modeller. Faresin erbjuder konkurrenskraftiga priser och har vuxit i Europa de senaste åren.\n\nPå den nordiska marknaden har Faresin begränsad men växande närvaro, främst inom lantbruk. Andrahandsvärdet etableras successivt.",
    machineTypes: [
      { label: "Teleskoplastare", href: "/vardera-teleskoplastare" },
    ],
    popularModels: [
      { name: "Faresin FH 7.30", type: "Teleskoplastare", priceRange: "350 000 – 580 000", liquidity: 60 },
    ],
    stats: [
      { label: "Modeller i databasen", value: "800+" },
      { label: "Snitt likviditet", value: "60%" },
      { label: "Marknadstrend 30d", value: "+0.4%" },
    ],
    faqs: [
      { q: "Finns Faresin-service i Norden?", a: "Faresin har begränsad serviceorganisation i Norden. Vi inkluderar detta i likviditetsbedömningen." },
    ],
  },
  {
    slug: "magni",
    name: "Magni",
    heroImage: pseoTeleskoplastare,
    heroAlt: "Magni roterande teleskoplastare på bygge – värdera Magni-maskiner med AI-driven maskinvärdering",
    metaTitle: "Värdera Magni-maskiner – Verifierat Marknadsvärde | Maskinvärdering.se",
    metaDescription: "Få verifierat marknadsvärde på Magni roterande teleskoplastare. AI-driven värdering med europeisk marknadsdata.",
    h1: "Värdera Magni – roterande teleskoplastare i premiumklass",
    intro: "Magni är specialiserat på roterande teleskoplastare med exceptionell lyftkapacitet. Italiensk premium för krävande lyftuppdrag.",
    seoText: "Magni Telescopic Handlers har etablerat sig som premiumalternativet inom roterande teleskoplastare. Med fokus på tunga lyft (upp till 70 tons kapacitet) och extrema lyfthöjder (46 meter) fyller Magni en unik nisch.\n\nMagni RTH-serien (Rotating Telehandler) konkurrerar med traditionella mobilkranar i vissa applikationer, till lägre kostnad. I Norden har Magni vuxit bland uthyrningsbolag och specialiserade byggföretag.",
    machineTypes: [
      { label: "Teleskoplastare", href: "/vardera-teleskoplastare" },
    ],
    popularModels: [
      { name: "Magni RTH 6.26", type: "Roterande", priceRange: "900 000 – 1 500 000", liquidity: 65 },
      { name: "Magni RTH 5.35", type: "Roterande", priceRange: "1 100 000 – 1 800 000", liquidity: 62 },
    ],
    stats: [
      { label: "Modeller i databasen", value: "1 000+" },
      { label: "Snitt likviditet", value: "64%" },
      { label: "Marknadstrend 30d", value: "+1.5%" },
    ],
    faqs: [
      { q: "Vad skiljer Magni från Merlo Roto?", a: "Magni fokuserar på tyngre lyft och högre kapacitet. Merlo Roto är bredare med fler kompakta modeller. Magni dominerar i premiumsegmentet." },
    ],
  },
  // ── VEDMASKINSTILLVERKARE ──
  {
    slug: "palax",
    name: "Palax",
    heroImage: machineBulldozer,
    heroAlt: "Palax vedmaskin i arbete – värdera Palax-maskiner med AI-driven maskinvärdering",
    metaTitle: "Värdera Palax-maskiner – Indikativt Marknadsvärde | Maskinvärdering.se",
    metaDescription: "Få indikativt marknadsvärde på Palax vedmaskiner. AI-driven värdering med nordisk marknadsdata. Resultat på 15 min.",
    h1: "Värdera Palax – Finlands ledande vedmaskiner",
    intro: "Palax är Nordens mest populära vedmaskinsmärke. Finsk kvalitet med stark andrahandsmarknad gör Palax till en säker investering i vedproduktion.",
    seoText: "Palax är en finsk tillverkare som dominerar den nordiska vedmaskinsmarknaden med en komplett serie från kompakta vedkapar till professionella kombinationsmaskiner. C-serien (kombimaskiner) och D-serien (vedprocessorer) är de mest handlade modellerna i Norden.\n\nPalax C1000 och D360 Pro har konsekvent högt andrahandsvärde tack vare robust konstruktion, god reservdelstillgång och ett brett servicenät i Finland och Sverige. Palax-maskiner med dokumenterad service och låga drifttimmar behåller 60–70% av nypriset efter 5 år.\n\nBioenergisektorns tillväxt har drivit efterfrågan på professionella Palax-maskiner, särskilt under höst- och vintersäsongen. Marknaden är starkast i Finland, Sverige och Norge.",
    machineTypes: [
      { label: "Vedmaskin", href: "/vardera-vedmaskin" },
    ],
    popularModels: [
      { name: "Palax C1000", type: "Kombimaskin", priceRange: "200 000 – 400 000", liquidity: 78 },
      { name: "Palax D360 Pro", type: "Vedprocessor", priceRange: "180 000 – 350 000", liquidity: 72 },
      { name: "Palax C750", type: "Kombimaskin", priceRange: "150 000 – 280 000", liquidity: 75 },
    ],
    stats: [
      { label: "Modeller i databasen", value: "1 200+" },
      { label: "Snitt likviditet", value: "75%" },
      { label: "Marknadstrend 30d", value: "+2.4%" },
    ],
    faqs: [
      { q: "Vilka Palax-modeller värderar ni?", a: "Vi värderar hela Palax-sortimentet: C-serien (kombimaskiner), D-serien (vedprocessorer) och Power-serien. Modeller från 2005 och framåt." },
      { q: "Har Palax bra andrahandsvärde?", a: "Ja, Palax har Nordens starkaste andrahandsvärde bland vedmaskiner tack vare hög kvalitet och bred marknad." },
      { q: "När är bästa tiden att sälja en Palax?", a: "Högsäsong för vedmaskiner är september–november. Priserna kan vara 10–15% högre under denna period." },
    ],
  },
  {
    slug: "hakki-pilke",
    name: "Hakki Pilke",
    heroImage: machineBulldozer,
    heroAlt: "Hakki Pilke vedmaskin – värdera Hakki Pilke-maskiner med AI-driven maskinvärdering",
    metaTitle: "Värdera Hakki Pilke – Indikativt Marknadsvärde | Maskinvärdering.se",
    metaDescription: "Få indikativt marknadsvärde på Hakki Pilke vedmaskiner. AI-driven värdering med nordisk marknadsdata och expertverifiering.",
    h1: "Värdera Hakki Pilke – professionella vedprocessorer",
    intro: "Hakki Pilke är en finsk premium-tillverkare av vedprocessorer och vedkapar. Känd för hög kapacitet och robust konstruktion i professionell vedproduktion.",
    seoText: "Hakki Pilke tillverkar professionella vedprocessorer i Viitasaari, Finland. Sortimentet sträcker sig från kompakta 1X-serien till de kraftfulla 50- och 55-serierna för storskalig vedproduktion.\n\nHakki Pilke 43 Pro är en av Nordens mest populära professionella vedprocessorer med kapacitet att bearbeta stammar upp till 43 cm diameter. Maskinen har hög genomströmning och är anpassad för nordisk ved.\n\nHakki Pilke har starkt andrahandsvärde i Finland och Sverige. Professionella modeller (38/43/50-serien) har lägre volym men stabil efterfrågan bland skogsbrukare och vedentreprenörer.",
    machineTypes: [
      { label: "Vedmaskin", href: "/vardera-vedmaskin" },
    ],
    popularModels: [
      { name: "Hakki Pilke 43 Pro", type: "Vedprocessor", priceRange: "250 000 – 450 000", liquidity: 76 },
      { name: "Hakki Pilke 38 Pro", type: "Vedprocessor", priceRange: "200 000 – 380 000", liquidity: 74 },
      { name: "Hakki Pilke 1X-37", type: "Vedkap", priceRange: "80 000 – 160 000", liquidity: 70 },
    ],
    stats: [
      { label: "Modeller i databasen", value: "800+" },
      { label: "Snitt likviditet", value: "74%" },
      { label: "Marknadstrend 30d", value: "+1.8%" },
    ],
    faqs: [
      { q: "Vad skiljer Hakki Pilke från Palax?", a: "Hakki Pilke fokuserar mer på professionella vedprocessorer med hög kapacitet, medan Palax har bredare sortiment med fler kompaktmodeller." },
      { q: "Hur är andrahandsvärdet på Hakki Pilke?", a: "Starkt i Norden, särskilt för professionella modeller. 43 Pro och 38 Pro har stabil efterfrågan bland vedentreprenörer." },
    ],
  },
  {
    slug: "japa",
    name: "Japa",
    heroImage: machineBulldozer,
    heroAlt: "Japa vedmaskin i arbete – värdera Japa-maskiner med AI-driven maskinvärdering",
    metaTitle: "Värdera Japa-maskiner – Indikativt Marknadsvärde | Maskinvärdering.se",
    metaDescription: "Få indikativt marknadsvärde på Japa vedmaskiner. AI-driven värdering med nordisk marknadsdata.",
    h1: "Värdera Japa – finska vedmaskiner för alla behov",
    intro: "Japa är en finsk vedmaskinstillverkare känd för kompakta och prisvärda vedkapar och vedklyvar. Populär bland hobbyvedhuggare och mindre skogsbruk.",
    seoText: "Japa, baserat i Finland, tillverkar ett brett sortiment vedmaskiner från kompakta vedklyvar till professionella vedprocessorer. Japa 435 och Japa 365 är bland de mest sålda vedmaskinerna i Norden tack vare utmärkt pris-prestanda.\n\nJapa-maskiner riktar sig till både hobbybrukare och professionella vedproducenter. De kompakta modellerna (305/335) är populära bland husägare, medan 435 och uppåt är professionella verktyg.\n\nAndrahandsvärdet är stabilt men lägre än Palax och Hakki Pilke i absolutvärde. Japas prisvärda positionering gör dem till attraktiva begagnatköp.",
    machineTypes: [
      { label: "Vedmaskin", href: "/vardera-vedmaskin" },
    ],
    popularModels: [
      { name: "Japa 435", type: "Vedprocessor", priceRange: "150 000 – 300 000", liquidity: 74 },
      { name: "Japa 365", type: "Vedprocessor", priceRange: "120 000 – 230 000", liquidity: 72 },
      { name: "Japa 305", type: "Vedkap", priceRange: "60 000 – 120 000", liquidity: 68 },
    ],
    stats: [
      { label: "Modeller i databasen", value: "900+" },
      { label: "Snitt likviditet", value: "72%" },
      { label: "Marknadstrend 30d", value: "+1.5%" },
    ],
    faqs: [
      { q: "Är Japa bra för hobbybruk?", a: "Ja, Japa 305 och 335 är perfekta för hobbyvedhuggare med kompakt design och konkurrenskraftigt pris." },
      { q: "Hur står sig Japa mot Palax?", a: "Japa är generellt mer prisvärd. Palax har starkare andrahandsvärde och bredare serviceorganisation." },
    ],
  },
  {
    slug: "posch",
    name: "Posch",
    heroImage: machineBulldozer,
    heroAlt: "Posch vedmaskin på arbetsplats – värdera Posch-maskiner med AI-driven maskinvärdering",
    metaTitle: "Värdera Posch-maskiner – Indikativt Marknadsvärde | Maskinvärdering.se",
    metaDescription: "Få indikativt marknadsvärde på Posch vedmaskiner. AI-driven värdering med europeisk marknadsdata.",
    h1: "Värdera Posch – österrikisk kvalitet i vedmaskiner",
    intro: "Posch är en österrikisk premium-tillverkare av vedmaskiner och vedprocessorer. Känd för robust konstruktion och innovativ teknik inom vedbearbetning.",
    seoText: "Posch Leibnitz GmbH tillverkar vedmaskiner i Österrike sedan 1947. Sortimentet omfattar allt från vedklyvar och vedkapar till helautomatiska vedprocessorer (SpaltFix-serien).\n\nPosch SpaltFix är en av marknadens mest respekterade professionella vedprocessorer med helautomatisk matning och kapning. Den österrikiska konstruktionen står för långsiktig hållbarhet.\n\nPå den nordiska marknaden har Posch en nischad men växande position. Andrahandsvärdet är stabilt, särskilt för SpaltFix-modellerna som har lojal kundbas bland professionella vedproducenter.",
    machineTypes: [
      { label: "Vedmaskin", href: "/vardera-vedmaskin" },
    ],
    popularModels: [
      { name: "Posch SpaltFix S-375", type: "Vedprocessor", priceRange: "180 000 – 350 000", liquidity: 70 },
      { name: "Posch HydroCombi 20", type: "Vedklyv", priceRange: "80 000 – 150 000", liquidity: 66 },
    ],
    stats: [
      { label: "Modeller i databasen", value: "600+" },
      { label: "Snitt likviditet", value: "68%" },
      { label: "Marknadstrend 30d", value: "+1.0%" },
    ],
    faqs: [
      { q: "Är Posch populärt i Norden?", a: "Posch har en nischad men lojal kundbas i Norden, särskilt SpaltFix-serien bland professionella vedproducenter." },
      { q: "Hur är reservdelstillgången?", a: "Posch har god reservdelstillgång via auktoriserade återförsäljare i Norden. Leveranstider kan vara längre än finska märken." },
    ],
  },
  {
    slug: "tajfun",
    name: "Tajfun",
    heroImage: machineBulldozer,
    heroAlt: "Tajfun vedmaskin – värdera Tajfun-maskiner med AI-driven maskinvärdering",
    metaTitle: "Värdera Tajfun-maskiner – Indikativt Marknadsvärde | Maskinvärdering.se",
    metaDescription: "Få indikativt marknadsvärde på Tajfun vedmaskiner. AI-driven värdering med europeisk marknadsdata.",
    h1: "Värdera Tajfun – slovenska vedmaskiner med stark teknik",
    intro: "Tajfun är en slovensk tillverkare av vedmaskiner och vinschsystem. Känd för innovativa vedprocessorer och skogsvinsch med konkurrenskraftiga priser.",
    seoText: "Tajfun, baserat i Slovenien, tillverkar vedprocessorer, vedkapar och skogsvinsch. RCA-serien (vedprocessorer) har blivit populär i Europa tack vare smart design och konkurrenskraftigt pris.\n\nTajfun har specialiserat sig på effektiva vedprocessorer med hydraulisk matning och automatiserad vedhantering. RCA 380 och RCA 480 är de mest populära modellerna i Norden.\n\nAndrahandsvärdet på Tajfun-maskiner har stärkts de senaste åren i takt med ökad marknadsacceptans. Prisnivån är lägre än finska märken men kvaliteten har förbättrats markant.",
    machineTypes: [
      { label: "Vedmaskin", href: "/vardera-vedmaskin" },
    ],
    popularModels: [
      { name: "Tajfun RCA 480", type: "Vedprocessor", priceRange: "140 000 – 280 000", liquidity: 66 },
      { name: "Tajfun RCA 380", type: "Vedprocessor", priceRange: "100 000 – 200 000", liquidity: 64 },
    ],
    stats: [
      { label: "Modeller i databasen", value: "500+" },
      { label: "Snitt likviditet", value: "65%" },
      { label: "Marknadstrend 30d", value: "+0.8%" },
    ],
    faqs: [
      { q: "Är Tajfun ett bra val för vedproduktion?", a: "Tajfun erbjuder bra pris-prestanda. RCA-serien är effektiv men har lägre likviditet än finska märken på andrahandsmarknaden." },
    ],
  },
  {
    slug: "blockbuster",
    name: "Blockbuster",
    heroImage: machineBulldozer,
    heroAlt: "Blockbuster vedmaskin – värdera Blockbuster-maskiner med AI-driven maskinvärdering",
    metaTitle: "Värdera Blockbuster-maskiner – Indikativt Marknadsvärde | Maskinvärdering.se",
    metaDescription: "Få indikativt marknadsvärde på Blockbuster vedmaskiner. AI-driven värdering med nordisk marknadsdata.",
    h1: "Värdera Blockbuster – kraftfulla vedklyvar",
    intro: "Blockbuster tillverkar robusta vedklyvar och vedprocessorer. Populär bland professionella och semi-professionella vedproducenter i Norden.",
    seoText: "Blockbuster är specialiserade på kraftfulla vedklyvar och vedprocessorer med fokus på hög klyvkraft och effektivitet. Maskinerna är konstruerade för krävande nordisk ved – björk, bok och ek.\n\nBlockbuster-vedklyvar har rykte om extrem klyvkraft och enkel konstruktion som ger lågt underhåll. Populära bland lantbrukare och semi-professionella vedproducenter.\n\nAndrahandsvärdet på Blockbuster-maskiner varierar. Professionella modeller har stabil efterfrågan men begränsad volym på andrahandsmarknaden.",
    machineTypes: [
      { label: "Vedmaskin", href: "/vardera-vedmaskin" },
    ],
    popularModels: [
      { name: "Blockbuster 20T", type: "Vedklyv", priceRange: "50 000 – 100 000", liquidity: 62 },
      { name: "Blockbuster 30T Pro", type: "Vedklyv", priceRange: "80 000 – 150 000", liquidity: 60 },
    ],
    stats: [
      { label: "Modeller i databasen", value: "400+" },
      { label: "Snitt likviditet", value: "61%" },
      { label: "Marknadstrend 30d", value: "+0.5%" },
    ],
    faqs: [
      { q: "Värderar ni Blockbuster-vedklyvar?", a: "Ja, vi värderar alla Blockbuster-modeller – från kompakta vedklyvar till professionella processorer." },
    ],
  },
];

export function getBrandBySlug(slug: string): BrandData | undefined {
  return brands.find((b) => b.slug === slug);
}
