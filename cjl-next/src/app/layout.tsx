import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackendPing from "@/components/BackendPing";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "CJL Consultoria - Soluções em Tecnologia",
  description:
    "Consultoria especializada em TI para pequenas e médias empresas. Desenvolvimento de software, infraestrutura, segurança digital e inovação. Conheça nossos sistemas: Convivium, TradeLinkInvest e SAPLINK.",
  keywords: ["consultoria TI", "desenvolvimento de software", "CJL Consultoria", "tecnologia", "infraestrutura", "segurança digital", "PME", "São Paulo"],
  authors: [{ name: "CJL Consultoria" }],
  openGraph: {
    title: "CJL Consultoria - Soluções em Tecnologia",
    description: "Consultoria especializada em TI para PMEs. Desenvolvimento de software sob medida, infraestrutura, segurança e inovação digital.",
    url: "https://www.cjlconsultoria.com",
    siteName: "CJL Consultoria",
    images: [
      {
        url: "/images/logocjl.png",
        width: 500,
        height: 500,
        alt: "CJL Consultoria",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "CJL Consultoria - Soluções em Tecnologia",
    description: "Consultoria especializada em TI para PMEs. Desenvolvimento, infraestrutura e segurança digital.",
    images: ["/images/logocjl.png"],
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-white text-gray-800 font-[family-name:var(--font-inter)]">
        <BackendPing />
        <Navbar />
        <main className="flex-1 pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
