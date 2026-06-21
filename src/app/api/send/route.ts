import { Resend } from "resend";
import { NextResponse } from "next/server";

const RECIPIENT = "kevin@krazius-solutions.com";
const FROM = "Culina Kontaktformular <onboarding@resend.dev>";

function escapeHtml(text: string | undefined): string {
  if (!text) return "";
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function row(label: string, value: string | undefined) {
  if (!value) return "";
  return `<tr><td style="padding:4px 12px 4px 0;color:#555;white-space:nowrap">${label}</td><td style="padding:4px 0"><strong>${escapeHtml(value)}</strong></td></tr>`;
}

function emailHtml(title: string, rows: string, extra?: string) {
  return `
    <div style="font-family:sans-serif;max-width:560px;margin:0 auto">
      <h2 style="margin-bottom:16px">${title}</h2>
      <table style="border-collapse:collapse;width:100%">${rows}</table>
      ${extra ? `<div style="margin-top:16px;white-space:pre-wrap;background:#f5f5f5;padding:12px;border-radius:6px">${escapeHtml(extra)}</div>` : ""}
    </div>`;
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 },
      );
    }

    const resend = new Resend(apiKey);
    const body = await request.json();
    const { type, title, ...data } = body;

    // Der variable Titel (z. B. "Location anfragen") bestimmt Betreff & Überschrift.
    const heading = title ?? "Neue Anfrage";
    const sender = data.name ?? data.buyerName ?? "";
    const subject = sender ? `${heading} – von ${sender}` : heading;

    let rows = "";
    let extra: string | undefined;

    switch (type) {
      case "contact":
        rows = row("Name", data.name) + row("E-Mail", data.email);
        extra = data.message;
        break;

      case "voucher":
        rows =
          row("Betrag", data.amount ? `${data.amount} €` : undefined) +
          row(
            "Format",
            data.format === "digital" ? "Digital (PDF)" : "Gedruckt",
          ) +
          row("Empfänger", data.recipientName) +
          row("Käufer", data.buyerName) +
          row("E-Mail", data.buyerEmail);
        extra = data.message;
        break;

      case "catering":
        rows =
          row("Name", data.name) +
          row("E-Mail", data.email) +
          row("Telefon", data.phone) +
          row("Küche", data.cuisine) +
          row("Datum", data.date) +
          row("Personen", data.guests);
        extra = data.message;
        break;

      case "inquiry":
        rows =
          row("Name", data.name) +
          row("E-Mail", data.email) +
          row("Anlass", data.occasion) +
          row("Datum", data.date) +
          row("Personen", data.guests);
        extra = data.message;
        break;

      case "application":
        rows =
          row("Name", data.name) +
          row("E-Mail", data.email) +
          row("Telefon", data.phone);
        extra = data.idea;
        break;

      default:
        return NextResponse.json(
          { error: "Unknown form type" },
          { status: 400 },
        );
    }

    const html = emailHtml(heading, rows, extra);

    await resend.emails.send({ from: FROM, to: RECIPIENT, subject, html });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 },
    );
  }
}
