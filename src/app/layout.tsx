import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";
import { StickyCta } from "@/components/shared/sticky-cta";
import { ExitIntentPopup } from "@/components/growth/exit-intent-popup";
import { AiConcierge } from "@/components/growth/ai-concierge";
import { CookieConsent } from "@/components/acquisition/cookie-consent";
import { JsonLd } from "@/components/seo/json-ld";
import { Analytics } from "@/components/seo/analytics";
import { globalSchemas } from "@/lib/seo/schemas";
import { knowledgeGraphSchema } from "@/lib/seo/knowledge-graph";
import { intelligenceGraphSchema } from "@/lib/seo/knowledge-graph-v5";
import { createMetadata } from "@/lib/seo/metadata";
import { GLOBAL_KEYWORDS } from "@/lib/seo/keywords";
import { SITE_CONFIG } from "@/lib/constants";
import { ThemeProvider } from "@/lib/theme-provider";
import { ThemeScript } from "@/components/shared/theme-script";
import "./globals.css";

const GSC_VERIFICATION = process.env.NEXT_PUBLIC_GSC_VERIFICATION;

export const metadata: Metadata = {
  ...createMetadata({
    title: SITE_CONFIG.tagline,
    description: SITE_CONFIG.description,
    path: "/",
    keywords: [...GLOBAL_KEYWORDS],
  }),
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: `${SITE_CONFIG.name} | ${SITE_CONFIG.tagline}`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  manifest: "/manifest.json",
  ...(GSC_VERIFICATION && {
    verification: { google: GSC_VERIFICATION },
  }),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <ThemeScript />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <JsonLd data={[...globalSchemas(), knowledgeGraphSchema(), intelligenceGraphSchema()]} />
      </head>
      <body className="font-sans tracking-wide">
        <ThemeProvider>
          <Analytics />
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <WhatsAppButton />
          <StickyCta />
          <ExitIntentPopup />
          <AiConcierge />
          <CookieConsent />
        </ThemeProvider>
      </body>
    </html>
  );
}
