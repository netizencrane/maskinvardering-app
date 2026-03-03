import excavatorImg from "@/assets/machine-excavator.jpg";
import loaderImg from "@/assets/machine-loader.jpg";
import craneImg from "@/assets/machine-crane.jpg";
import bulldozerImg from "@/assets/machine-bulldozer.jpg";
import mixerImg from "@/assets/machine-mixer.jpg";
import forkliftImg from "@/assets/machine-forklift.jpg";

export interface Machine {
  id: string;
  name: string;
  image: string;
  liquidityIndex: number;
  precision: number;
  category: string;
  status: "verified" | "ai-estimate" | "in-pool";
  value: string;
  valueNum: number;
  change: number;
  year: number;
  hours: number;
  serial: string;
  owner: string;
  location: string;
  lastInspection: string;
  nextService: string;
  description: string;
  valueHistory: { month: string; value: number }[];
}

export const machines: Machine[] = [
  {
    id: "volvo-ec220e",
    name: "Volvo EC220E Grävmaskin",
    image: excavatorImg,
    liquidityIndex: 87,
    precision: 92,
    category: "Grävmaskiner",
    status: "verified",
    value: "1 250 000 SEK",
    valueNum: 1250000,
    change: 3.2,
    year: 2019,
    hours: 4820,
    serial: "VCEC220EJ00412345",
    owner: "Byggteknik AB",
    location: "Stockholm, Sverige",
    lastInspection: "2026-01-15",
    nextService: "2026-04-01",
    description: "Volvo EC220E i utmärkt skick med lågförbrukning. Hydraulrenovering genomförd 2024. Komplett servicehistorik tillgänglig.",
    valueHistory: [
      { month: "Sep", value: 1180000 },
      { month: "Okt", value: 1195000 },
      { month: "Nov", value: 1210000 },
      { month: "Dec", value: 1220000 },
      { month: "Jan", value: 1235000 },
      { month: "Feb", value: 1250000 },
    ],
  },
  {
    id: "cat-950m",
    name: "CAT 950M Hjullastare",
    image: loaderImg,
    liquidityIndex: 74,
    precision: 85,
    category: "Hjullastare",
    status: "ai-estimate",
    value: "890 000 SEK",
    valueNum: 890000,
    change: -1.5,
    year: 2020,
    hours: 3200,
    serial: "CAT950MK00567890",
    owner: "Byggteknik AB",
    location: "Göteborg, Sverige",
    lastInspection: "2025-11-20",
    nextService: "2026-03-15",
    description: "CAT 950M hjullastare med Z-bar-länkage. Bra arbetsmaskin för tunga lyft och materialhantering.",
    valueHistory: [
      { month: "Sep", value: 920000 },
      { month: "Okt", value: 915000 },
      { month: "Nov", value: 905000 },
      { month: "Dec", value: 900000 },
      { month: "Jan", value: 895000 },
      { month: "Feb", value: 890000 },
    ],
  },
  {
    id: "liebherr-ltm1100",
    name: "Liebherr LTM 1100 Kran",
    image: craneImg,
    liquidityIndex: 91,
    precision: 96,
    category: "Kranar",
    status: "verified",
    value: "4 750 000 SEK",
    valueNum: 4750000,
    change: 5.1,
    year: 2018,
    hours: 6100,
    serial: "LTM1100G00198765",
    owner: "Byggteknik AB",
    location: "Malmö, Sverige",
    lastInspection: "2026-02-01",
    nextService: "2026-05-10",
    description: "Liebherr LTM 1100 mobilkran med 100 ton lyftkapacitet. Perfekt för tunga infrastrukturprojekt.",
    valueHistory: [
      { month: "Sep", value: 4400000 },
      { month: "Okt", value: 4500000 },
      { month: "Nov", value: 4580000 },
      { month: "Dec", value: 4650000 },
      { month: "Jan", value: 4700000 },
      { month: "Feb", value: 4750000 },
    ],
  },
  {
    id: "cat-d6t",
    name: "CAT D6T Bulldozer",
    image: bulldozerImg,
    liquidityIndex: 68,
    precision: 78,
    category: "Bulldozers",
    status: "in-pool",
    value: "1 680 000 SEK",
    valueNum: 1680000,
    change: -0.8,
    year: 2017,
    hours: 7500,
    serial: "CATD6TN00334455",
    owner: "Byggteknik AB",
    location: "Uppsala, Sverige",
    lastInspection: "2025-10-05",
    nextService: "2026-02-28",
    description: "CAT D6T bulldozer med VPAT-blad. Stabil maskin för markarbeten och planering.",
    valueHistory: [
      { month: "Sep", value: 1710000 },
      { month: "Okt", value: 1705000 },
      { month: "Nov", value: 1700000 },
      { month: "Dec", value: 1695000 },
      { month: "Jan", value: 1688000 },
      { month: "Feb", value: 1680000 },
    ],
  },
  {
    id: "scania-mixer",
    name: "Scania Betongblandare",
    image: mixerImg,
    liquidityIndex: 72,
    precision: 81,
    category: "Lastbilar",
    status: "ai-estimate",
    value: "620 000 SEK",
    valueNum: 620000,
    change: 1.2,
    year: 2021,
    hours: 2100,
    serial: "SCAMIXR00778899",
    owner: "Byggteknik AB",
    location: "Linköping, Sverige",
    lastInspection: "2025-12-12",
    nextService: "2026-06-01",
    description: "Scania betongblandare med 9m³ trumma. Låg körsträcka och väl underhållen.",
    valueHistory: [
      { month: "Sep", value: 600000 },
      { month: "Okt", value: 605000 },
      { month: "Nov", value: 608000 },
      { month: "Dec", value: 612000 },
      { month: "Jan", value: 615000 },
      { month: "Feb", value: 620000 },
    ],
  },
  {
    id: "toyota-8fbn25",
    name: "Toyota 8FBN25 Truck",
    image: forkliftImg,
    liquidityIndex: 83,
    precision: 89,
    category: "Truckar",
    status: "in-pool",
    value: "285 000 SEK",
    valueNum: 285000,
    change: 4.7,
    year: 2022,
    hours: 1200,
    serial: "TOY8FBN25X001122",
    owner: "Byggteknik AB",
    location: "Västerås, Sverige",
    lastInspection: "2026-01-28",
    nextService: "2026-07-15",
    description: "Toyota 8FBN25 eltruck med 2,5 ton kapacitet. Idealisk för lagerhantering.",
    valueHistory: [
      { month: "Sep", value: 260000 },
      { month: "Okt", value: 265000 },
      { month: "Nov", value: 270000 },
      { month: "Dec", value: 275000 },
      { month: "Jan", value: 280000 },
      { month: "Feb", value: 285000 },
    ],
  },
];

export function getMachineById(id: string): Machine | undefined {
  return machines.find((m) => m.id === id);
}
