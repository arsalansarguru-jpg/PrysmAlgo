import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo/metadata";
import { AcademyPage } from "@/components/growth/academy-page";

export const metadata: Metadata = createMetadata({
  title: "Investor Academy | Algorithmic Trading Education",
  description: "Professional education on algorithmic trading, AI investing, risk management, forex markets, and institutional finance.",
  path: "/academy",
  keywords: ["algorithmic trading education", "investor academy", "AI trading courses"],
});

export default function AcademyRoute() {
  return <AcademyPage />;
}
