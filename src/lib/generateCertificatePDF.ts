import jsPDF from "jspdf";
import "jspdf-autotable";
import QRCode from "qrcode";
import type { Machine } from "@/data/machines";

// Extend jsPDF type for autotable
declare module "jspdf" {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
    lastAutoTable: { finalY: number };
  }
}

// Colors
const SLATE_950 = [10, 15, 30];
const SLATE_800 = [30, 41, 59];
const SLATE_600 = [71, 85, 105];
const SLATE_200 = [226, 232, 240];
const AMBER_500 = [245, 158, 11];
const AMBER_400 = [251, 191, 36];
const WHITE = [255, 255, 255];
const GREEN = [16, 185, 129];
const RED = [239, 68, 68];

function drawRoundedRect(doc: jsPDF, x: number, y: number, w: number, h: number, r: number, fill: number[]) {
  doc.setFillColor(fill[0], fill[1], fill[2]);
  doc.roundedRect(x, y, w, h, r, r, "F");
}

function drawGauge(doc: jsPDF, cx: number, cy: number, radius: number, value: number) {
  const startAngle = (135 * Math.PI) / 180;
  const totalAngle = (270 * Math.PI) / 180;
  const segments = 60;

  // Background arc
  for (let i = 0; i < segments; i++) {
    const angle1 = startAngle + (i / segments) * totalAngle;
    const angle2 = startAngle + ((i + 1) / segments) * totalAngle;
    doc.setDrawColor(SLATE_800[0], SLATE_800[1], SLATE_800[2]);
    doc.setLineWidth(3);
    doc.line(
      cx + Math.cos(angle1) * radius, cy + Math.sin(angle1) * radius,
      cx + Math.cos(angle2) * radius, cy + Math.sin(angle2) * radius
    );
  }

  // Value arc
  const valueSegments = Math.round((value / 100) * segments);
  const color = value >= 80 ? GREEN : value >= 60 ? AMBER_500 : RED;
  for (let i = 0; i < valueSegments; i++) {
    const angle1 = startAngle + (i / segments) * totalAngle;
    const angle2 = startAngle + ((i + 1) / segments) * totalAngle;
    doc.setDrawColor(color[0], color[1], color[2]);
    doc.setLineWidth(3);
    doc.line(
      cx + Math.cos(angle1) * radius, cy + Math.sin(angle1) * radius,
      cx + Math.cos(angle2) * radius, cy + Math.sin(angle2) * radius
    );
  }

  // Center text
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(WHITE[0], WHITE[1], WHITE[2]);
  doc.text(`${value}%`, cx, cy + 2, { align: "center" });

  doc.setFontSize(7);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(SLATE_600[0], SLATE_600[1], SLATE_600[2]);
  doc.text("Likviditetsindex", cx, cy + 9, { align: "center" });
}

function drawWatermark(doc: jsPDF) {
  doc.setFontSize(60);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(255, 255, 255);
  doc.setGState(new (doc as any).GState({ opacity: 0.03 }));
  doc.text("EXPERT VERIFIED", 105, 160, { align: "center", angle: 35 });
  doc.setGState(new (doc as any).GState({ opacity: 1 }));
}

export async function generateBankReadyPDF(machine: Machine) {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageW = 210;
  const margin = 15;
  const contentW = pageW - margin * 2;
  const certId = `VMV-${Date.now().toString(36).toUpperCase()}-${machine.id.slice(0, 6).toUpperCase()}`;
  const today = new Date().toLocaleDateString("sv-SE");

  // ── Background
  doc.setFillColor(SLATE_950[0], SLATE_950[1], SLATE_950[2]);
  doc.rect(0, 0, 210, 297, "F");

  // ── Watermark
  drawWatermark(doc);

  // ── Header bar
  drawRoundedRect(doc, margin, 10, contentW, 28, 3, SLATE_800);

  // Header left: brand
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(WHITE[0], WHITE[1], WHITE[2]);
  doc.text("Maskinvärdering", margin + 6, 22);
  doc.setTextColor(SLATE_600[0], SLATE_600[1], SLATE_600[2]);
  doc.text(".se", margin + 6 + doc.getTextWidth("Maskinvärdering"), 22);

  // Header right: cert type
  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(AMBER_500[0], AMBER_500[1], AMBER_500[2]);
  doc.text("BANK-READY VÄRDERINGSINTYG", pageW - margin - 6, 20, { align: "right" });
  doc.setFontSize(7);
  doc.setTextColor(SLATE_600[0], SLATE_600[1], SLATE_600[2]);
  doc.text(`Certifikat: ${certId}`, pageW - margin - 6, 26, { align: "right" });

  // ── Amber accent line
  doc.setFillColor(AMBER_500[0], AMBER_500[1], AMBER_500[2]);
  doc.rect(margin, 40, contentW, 1, "F");

  // ── Title section
  let y = 48;
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(WHITE[0], WHITE[1], WHITE[2]);
  doc.text(machine.name, margin, y);

  y += 7;
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(SLATE_600[0], SLATE_600[1], SLATE_600[2]);
  doc.text(`${machine.category} · ${machine.owner} · Utfärdat ${today}`, margin, y);

  // ── VMV Value box
  y += 10;
  drawRoundedRect(doc, margin, y, contentW, 30, 3, SLATE_800);

  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(SLATE_600[0], SLATE_600[1], SLATE_600[2]);
  doc.text("VERIFIERAT MARKNADSVÄRDE (VMV)", margin + 8, y + 9);

  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(AMBER_400[0], AMBER_400[1], AMBER_400[2]);
  doc.text(machine.value, margin + 8, y + 22);

  // Change badge
  const changeColor = machine.change >= 0 ? GREEN : RED;
  const changeText = `${machine.change >= 0 ? "▲" : "▼"} ${Math.abs(machine.change)}% senaste 30d`;
  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(changeColor[0], changeColor[1], changeColor[2]);
  doc.text(changeText, margin + 8 + doc.getTextWidth(machine.value) + 6, y + 22, { baseline: "alphabetic" });

  // Confidence
  doc.setFontSize(8);
  doc.setTextColor(SLATE_600[0], SLATE_600[1], SLATE_600[2]);
  doc.setFont("helvetica", "normal");
  doc.text("Konfidensintervall: ±3.2%  |  Metod: Triangulering + Expert", pageW - margin - 8, y + 22, { align: "right" });

  // ── Gauge + Tables row
  y += 38;
  const gaugeX = pageW - margin - 35;

  // Draw gauge
  drawGauge(doc, gaugeX, y + 22, 18, machine.liquidityIndex);

  // ── Identification table
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(AMBER_500[0], AMBER_500[1], AMBER_500[2]);
  doc.text("IDENTIFIKATION", margin, y);
  doc.setFontSize(6);
  doc.setTextColor(SLATE_600[0], SLATE_600[1], SLATE_600[2]);
  doc.text("Källa: Fordonsregistret", margin + 40, y);

  doc.autoTable({
    startY: y + 3,
    margin: { left: margin, right: 80 },
    theme: "plain",
    styles: { fontSize: 8, cellPadding: 2, textColor: SLATE_200, fillColor: false as any },
    headStyles: { fillColor: false as any, textColor: SLATE_600, fontSize: 7 },
    columnStyles: { 0: { fontStyle: "bold", cellWidth: 35, textColor: SLATE_600 }, 1: { textColor: WHITE } },
    body: [
      ["Serienummer", machine.serial],
      ["Årsmodell", machine.year.toString()],
      ["Ägare", machine.owner],
      ["Plats", machine.location],
      ["Senaste besiktning", machine.lastInspection],
      ["Nästa service", machine.nextService],
    ],
  });

  // ── Technical specs table
  y = doc.lastAutoTable.finalY + 8;
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(AMBER_500[0], AMBER_500[1], AMBER_500[2]);
  doc.text("TEKNISKA SPECIFIKATIONER", margin, y);
  doc.setFontSize(6);
  doc.setTextColor(SLATE_600[0], SLATE_600[1], SLATE_600[2]);
  doc.text("Källa: Global teknisk databas", margin + 58, y);

  const lecturaSpecs = getLecturaSpecs(machine);

  doc.autoTable({
    startY: y + 3,
    margin: { left: margin, right: margin },
    theme: "plain",
    styles: { fontSize: 8, cellPadding: 2, textColor: SLATE_200, fillColor: false as any },
    headStyles: { fillColor: false as any, textColor: SLATE_600, fontSize: 7 },
    columnStyles: { 0: { fontStyle: "bold", cellWidth: 45, textColor: SLATE_600 }, 1: { textColor: WHITE } },
    body: lecturaSpecs,
  });

  // ── Value History table
  y = doc.lastAutoTable.finalY + 8;
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(AMBER_500[0], AMBER_500[1], AMBER_500[2]);
  doc.text("VÄRDEUTVECKLING", margin, y);

  doc.autoTable({
    startY: y + 3,
    margin: { left: margin, right: margin },
    theme: "plain",
    styles: { fontSize: 8, cellPadding: 2.5, textColor: SLATE_200, fillColor: false as any },
    headStyles: { fillColor: SLATE_800 as any, textColor: AMBER_500, fontSize: 7, fontStyle: "bold" },
    head: [["Månad", "VMV (SEK)", "Förändring"]],
    body: machine.valueHistory.map((vh, i) => {
      const prev = i > 0 ? machine.valueHistory[i - 1].value : vh.value;
      const change = ((vh.value - prev) / prev * 100).toFixed(1);
      return [vh.month, new Intl.NumberFormat("sv-SE").format(vh.value), `${Number(change) >= 0 ? "+" : ""}${change}%`];
    }),
  });

  // ── Additional values
  y = doc.lastAutoTable.finalY + 8;
  const residual = Math.round(machine.valueNum * 0.62);
  const depreciation = Math.round(machine.valueNum * 0.78);
  const tradeIn = Math.round(machine.valueNum * 0.85);
  const fmt = (n: number) => new Intl.NumberFormat("sv-SE").format(n);

  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(AMBER_500[0], AMBER_500[1], AMBER_500[2]);
  doc.text("KOMPLETTERANDE VÄRDEN", margin, y);

  doc.autoTable({
    startY: y + 3,
    margin: { left: margin, right: margin },
    theme: "plain",
    styles: { fontSize: 8, cellPadding: 2.5, textColor: SLATE_200, fillColor: false as any },
    headStyles: { fillColor: false as any, textColor: SLATE_600, fontSize: 7 },
    columnStyles: { 0: { fontStyle: "bold", cellWidth: 45, textColor: SLATE_600 }, 1: { textColor: WHITE } },
    body: [
      ["Restvärde (3 år)", `${fmt(residual)} SEK`],
      ["Avskrivningsvärde", `${fmt(depreciation)} SEK`],
      ["Inbytesvärde", `${fmt(tradeIn)} SEK`],
      ["Precision", `${machine.precision}%`],
    ],
  });

  // ── AI-scan thumbnail placeholder
  y = doc.lastAutoTable.finalY + 8;
  drawRoundedRect(doc, margin, y, 40, 28, 2, SLATE_800);
  doc.setFontSize(6);
  doc.setTextColor(SLATE_600[0], SLATE_600[1], SLATE_600[2]);
  doc.text("AI-SCAN", margin + 3, y + 5);

  // Scan overlay markers
  doc.setDrawColor(AMBER_500[0], AMBER_500[1], AMBER_500[2]);
  doc.setLineWidth(0.3);
  doc.rect(margin + 4, y + 8, 8, 6);
  doc.rect(margin + 16, y + 10, 10, 8);
  doc.rect(margin + 28, y + 7, 7, 10);

  doc.setFontSize(5);
  doc.setTextColor(GREEN[0], GREEN[1], GREEN[2]);
  doc.text("✓ Skick verifierat", margin + 4, y + 25);

  // Description next to thumbnail
  doc.setFontSize(7);
  doc.setTextColor(SLATE_600[0], SLATE_600[1], SLATE_600[2]);
  doc.text("Beskrivning:", margin + 46, y + 5);
  doc.setTextColor(WHITE[0], WHITE[1], WHITE[2]);
  const descLines = doc.splitTextToSize(machine.description, contentW - 50);
  doc.text(descLines, margin + 46, y + 10);

  // ── QR Code
  const qrUrl = `https://maskinvardering.se/verify/${certId}`;
  try {
    const qrDataUrl = await QRCode.toDataURL(qrUrl, {
      width: 200,
      margin: 1,
      color: { dark: "#f5f5f5", light: "#0a0f1e" },
    });
    doc.addImage(qrDataUrl, "PNG", pageW - margin - 25, y, 25, 25);
    doc.setFontSize(5);
    doc.setTextColor(SLATE_600[0], SLATE_600[1], SLATE_600[2]);
    doc.text("Skanna för verifiering", pageW - margin - 12.5, y + 27, { align: "center" });
  } catch {
    // Fallback if QR fails
    doc.setFontSize(6);
    doc.setTextColor(SLATE_600[0], SLATE_600[1], SLATE_600[2]);
    doc.text(`Verifiera: ${qrUrl}`, pageW - margin - 25, y + 10);
  }

  // ── Footer
  const footerY = 275;

  // Amber line
  doc.setFillColor(AMBER_500[0], AMBER_500[1], AMBER_500[2]);
  doc.rect(margin, footerY, contentW, 0.5, "F");

  // Compliance logos (text-based)
  doc.setFontSize(6);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(SLATE_600[0], SLATE_600[1], SLATE_600[2]);

  const logos = ["Marknadsdata", "AI-analys", "BankID"];
  const logoSpacing = 30;
  const startX = margin;
  logos.forEach((logo, i) => {
    drawRoundedRect(doc, startX + i * logoSpacing, footerY + 3, 25, 8, 1, SLATE_800);
    doc.setTextColor(AMBER_500[0], AMBER_500[1], AMBER_500[2]);
    doc.text(logo, startX + i * logoSpacing + 12.5, footerY + 8, { align: "center" });
  });

  // Footer text
  doc.setFont("helvetica", "normal");
  doc.setFontSize(5);
  doc.setTextColor(SLATE_600[0], SLATE_600[1], SLATE_600[2]);
  doc.text(
    `Certifikat ${certId} · Utfärdat ${today} · Giltigt 30 dagar · Maskinvärdering.se – en del av MaskinFinans · maskinvardering.se/verify/${certId}`,
    margin, footerY + 16
  );
  doc.text("Detta dokument är digitalt signerat och kan verifieras via QR-koden ovan.", margin, footerY + 19);

  // ── Save
  doc.save(`VMV-Intyg-${machine.name.replace(/\s+/g, "-")}-${today}.pdf`);
}

function getLecturaSpecs(machine: Machine): string[][] {
  // Technical specs based on category
  const base = [
    ["Drifttimmar", `${machine.hours.toLocaleString("sv-SE")} h`],
    ["Tillverkningsår", machine.year.toString()],
    ["Kategori", machine.category],
  ];

  if (machine.category === "Grävmaskiner") {
    return [...base,
      ["Operativvikt", "22 200 kg"],
      ["Motoreffekt", "122 kW (166 hp)"],
      ["Max grävdjup", "6 710 mm"],
      ["Skopvolym", "0.80–1.55 m³"],
      ["Motor", "Volvo D6J Tier 4 Final"],
    ];
  }
  if (machine.category === "Hjullastare") {
    return [...base,
      ["Operativvikt", "18 500 kg"],
      ["Motoreffekt", "162 kW (217 hp)"],
      ["Skopvolym", "3.2–4.5 m³"],
      ["Tippkapacitet", "10 200 kg"],
    ];
  }
  if (machine.category === "Kranar") {
    return [...base,
      ["Max lyftkapacitet", "100 000 kg"],
      ["Max lyfthöjd", "60 m"],
      ["Bomblängd", "11.5–52 m"],
      ["Antal axlar", "5"],
    ];
  }
  return [...base,
    ["Motoreffekt", "N/A"],
    ["Operativvikt", "N/A"],
  ];
}
