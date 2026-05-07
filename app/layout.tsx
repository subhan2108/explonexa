import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VisualEffects from "@/components/VisualEffects";
import { getContent } from "@/lib/data-service";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Explonexa | Explosive Growth To The Next Level",
  description: "Explonexa - Explosive Growth To The Next Level. Full-service digital marketing agency helping businesses scale globally with data-driven strategies.",
  keywords: "digital marketing, SEO, social media marketing, google ads, facebook ads, website development, content marketing, video editing",
  authors: [{ name: "Explonexa" }],
  openGraph: {
    title: "Explonexa - Explosive Growth To The Next Level",
    description: "Full-service digital marketing agency helping businesses scale globally with data-driven strategies.",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const content = await getContent();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
        <VisualEffects />
        <Navbar />
        <main>{children}</main>
        <Footer 
          description={content.footer.description} 
          socialLinks={content.footer.socialLinks} 
        />
      </body>
    </html>
  );
}
