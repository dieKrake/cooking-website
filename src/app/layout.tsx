import type { Metadata } from "next";
import { Navbar } from "@/components/organisms/navbar";
import { Footer } from "@/components/organisms/footer";
import localFont from "next/font/local";
import "./globals.css";

const fontHeading = localFont({
  src: "./fonts/Inconsolata-Black.ttf",
  variable: "--font-heading",
  display: "swap",
});

const fontBody = localFont({
  src: "./fonts/Inconsolata-Medium.ttf",
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Culina – Gemeinsam kochen im Herzen von Aalen",
    template: "%s | Culina",
  },
  description:
    "Familiäre Kochkurse, einzigartiges Catering und unvergessliche Feinkost-Genussmomente (ehemals Koch Klub am Kocher)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${fontHeading.variable} ${fontBody.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
