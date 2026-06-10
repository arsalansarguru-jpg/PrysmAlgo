import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo/metadata";
import { GlossaryIndex } from "@/components/authority/glossary-index";

export const metadata: Metadata = createMetadata({
  title: "Investor Glossary — 500+ Trading & Investing Terms",
  description: "Comprehensive institutional glossary covering algorithmic trading, risk management, forex, gold, and quantitative investing.",
  path: "/glossary",
  keywords: ["trading glossary", "algorithmic trading terms", "investor glossary"],
});

export default function GlossaryPage() {
  return <GlossaryIndex />;
}
