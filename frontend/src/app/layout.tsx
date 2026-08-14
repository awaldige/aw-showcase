import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AW Showcase",
  description:
    "AW Showcase — Acessórios e estilo em uma experiência moderna.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-50 text-gray-950 antialiased">
        {children}
      </body>
    </html>
  );
}