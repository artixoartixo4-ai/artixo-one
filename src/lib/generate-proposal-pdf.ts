import { jsPDF } from "jspdf";
import type { Tier } from "@/data/pricing";

type ProposalInput = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
  tier?: Tier | undefined;
};

const GOLD: [number, number, number] = [194, 156, 83];
const CHARCOAL: [number, number, number] = [45, 45, 45];
const MUTED: [number, number, number] = [110, 108, 102];
const MARGIN = 20;
const PAGE_WIDTH = 210;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;

/**
 * Builds a one-page proposal / enquiry-summary PDF entirely in the browser
 * (no server, no third-party API) and triggers a download. Used right after
 * a Contact form submission so the visitor walks away with something
 * concrete, even before ARTIXO ONE replies personally.
 */
export function generateProposalPdf(input: ProposalInput) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  let y = 24;

  // Header
  doc.setTextColor(...CHARCOAL);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("ARTIXO ONE", MARGIN, y);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(...MUTED);
  doc.text("Software & Design Studio · Mannar, Sri Lanka", MARGIN, y + 6);

  doc.setDrawColor(...GOLD);
  doc.setLineWidth(0.6);
  doc.line(MARGIN, y + 12, PAGE_WIDTH - MARGIN, y + 12);
  y += 24;

  const title = input.tier ? `Project Proposal — ${input.tier.name} Package` : "Project Enquiry Summary";
  doc.setTextColor(...CHARCOAL);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text(title, MARGIN, y);
  y += 6;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...MUTED);
  doc.text(
    `Generated ${new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}`,
    MARGIN,
    y
  );
  y += 12;

  // Client details
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(...CHARCOAL);
  doc.text("Prepared For", MARGIN, y);
  y += 6;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  const clientName = `${input.firstName} ${input.lastName}`.trim();
  const details = [
    clientName && `Name: ${clientName}`,
    input.email && `Email: ${input.email}`,
    input.phone && `Phone: ${input.phone}`,
    input.projectType && `Project Type: ${input.projectType}`,
  ].filter(Boolean) as string[];
  for (const line of details) {
    doc.text(line, MARGIN, y);
    y += 5.5;
  }
  y += 4;

  // Package details (if one was selected on the Pricing section)
  if (input.tier) {
    doc.setDrawColor(...GOLD);
    doc.setFillColor(250, 247, 240);
    const boxTop = y;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(...CHARCOAL);
    y += 8;
    doc.text(`${input.tier.name} — ${input.tier.price}${input.tier.price !== "Custom" ? " starting" : ""}`, MARGIN + 5, y);
    y += 6;
    doc.setFont("helvetica", "italic");
    doc.setFontSize(9.5);
    doc.setTextColor(...MUTED);
    const taglineLines = doc.splitTextToSize(input.tier.tagline, CONTENT_WIDTH - 10);
    doc.text(taglineLines, MARGIN + 5, y);
    y += taglineLines.length * 5 + 3;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(...CHARCOAL);
    for (const feature of input.tier.features) {
      doc.setTextColor(...GOLD);
      doc.text("•", MARGIN + 5, y);
      doc.setTextColor(...CHARCOAL);
      const lines = doc.splitTextToSize(feature, CONTENT_WIDTH - 20);
      doc.text(lines, MARGIN + 11, y);
      y += lines.length * 5.2;
    }
    const boxBottom = y + 4;
    doc.roundedRect(MARGIN, boxTop, CONTENT_WIDTH, boxBottom - boxTop, 3, 3, "S");
    y = boxBottom + 10;
  }

  // Message
  if (input.message) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(...CHARCOAL);
    doc.text("Project Notes", MARGIN, y);
    y += 6;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(...MUTED);
    const msgLines = doc.splitTextToSize(input.message, CONTENT_WIDTH);
    doc.text(msgLines, MARGIN, y);
    y += msgLines.length * 5.5 + 6;
  }

  // Footer
  const footerY = 275;
  doc.setDrawColor(220, 216, 206);
  doc.setLineWidth(0.3);
  doc.line(MARGIN, footerY - 8, PAGE_WIDTH - MARGIN, footerY - 8);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(...MUTED);
  doc.text(
    "This is an indicative summary — final scope, timeline and pricing are confirmed after a short call with our team.",
    MARGIN,
    footerY
  );
  doc.text(
    "ARTIXO ONE  ·  +94 75 412 0403  ·  artixoartixo46@gmail.com  ·  artixo-one.vercel.app",
    MARGIN,
    footerY + 5
  );

  const filenameSafe = (clientName || "enquiry").toLowerCase().replace(/[^a-z0-9]+/g, "-");
  doc.save(`artixo-one-${input.tier ? "proposal" : "enquiry"}-${filenameSafe}.pdf`);
}
