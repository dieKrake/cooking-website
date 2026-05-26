import { Resend } from "resend";
import { NextResponse } from "next/server";

const RECIPIENT = "kevin@krazius-solutions.com";
const FROM = "Culina Kontaktformular <onboarding@resend.dev>";

function row(label: string, value: string | undefined) {
  if (!value) return "";
  return `<tr><td style="padding:4px 12px 4px 0;color:#555;white-space:nowrap">${label}</td><td style="padding:4px 0"><strong>${value}</strong></td></tr>`;
}

function emailHtml(title: string, rows: string, extra?: string) {
  return `
    <div style="font-family:sans-serif;max-width:560px;margin:0 auto">
      <h2 style="margin-bottom:16px">${title}</h2>
      <table style="border-collapse:collapse;width:100%">${rows}</table>
      ${extra ? `<div style="margin-top:16px;white-space:pre-wrap;background:#f5f5f5;padding:12px;border-radius:6px">${extra}</div>` : ""}
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
    const { type, ...data } = body;

    let subject = "";
    let html = "";

    switch (type) {
      case "contact":
        subject = `Neue Kontaktanfrage von ${data.name}`;
        html = emailHtml(
          "Neue Kontaktanfrage",
          row("Name", data.name) + row("E-Mail", data.email),
          data.message,
        );
        break;

      case "voucher":
        subject = `Gutschein-Bestellung von ${data.buyerName}`;
        html = emailHtml(
          "Neue Gutschein-Bestellung",
          row("Betrag", `${data.amount} €`) +
            row(
              "Format",
              data.format === "digital" ? "Digital (PDF)" : "Gedruckt",
            ) +
            row("Empfänger", data.recipientName) +
            row("Käufer", data.buyerName) +
            row("E-Mail", data.buyerEmail),
          data.message,
        );
        break;

      case "catering":
        subject = `Catering-Anfrage von ${data.name}`;
        html = emailHtml(
          "Neue Catering-Anfrage",
          row("Name", data.name) +
            row("E-Mail", data.email) +
            row("Telefon", data.phone) +
            row("Küche", data.cuisine) +
            row("Datum", data.date) +
            row("Personen", data.guests),
          data.message,
        );
        break;

      case "inquiry":
        subject = `Location-Anfrage von ${data.name}`;
        html = emailHtml(
          "Neue Location-Anfrage",
          row("Name", data.name) +
            row("E-Mail", data.email) +
            row("Anlass", data.occasion) +
            row("Datum", data.date) +
            row("Personen", data.guests),
          data.message,
        );
        break;

      case "application":
        subject = `Kursleiter-Bewerbung von ${data.name}`;
        html = emailHtml(
          "Neue Kursleiter-Bewerbung",
          row("Name", data.name) +
            row("E-Mail", data.email) +
            row("Telefon", data.phone),
          data.idea,
        );
        break;

      default:
        return NextResponse.json(
          { error: "Unknown form type" },
          { status: 400 },
        );
    }

    await resend.emails.send({ from: FROM, to: RECIPIENT, subject, html });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 },
    );
  }
}
