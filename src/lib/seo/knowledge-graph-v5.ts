import { SITE_CONFIG } from "@/lib/constants";

/** V5.0 extended entity graph */
export const V5_ENTITIES = {
  prysmAlgo: { "@id": `${SITE_CONFIG.url}/#organization`, name: "PrysmAlgo" },
  blueEngine: { "@id": `${SITE_CONFIG.url}/#blue-engine`, name: "Blue AI Trading Engine" },
  riskManagement: { "@id": `${SITE_CONFIG.url}/#risk-management`, name: "Risk Management" },
  forex: { "@id": `${SITE_CONFIG.url}/#forex-markets`, name: "Forex Markets" },
  gold: { "@id": `${SITE_CONFIG.url}/#gold-trading`, name: "Gold Trading" },
  aiTrading: { "@id": `${SITE_CONFIG.url}/#ai-trading`, name: "AI Trading" },
  quantitativeInvesting: { "@id": `${SITE_CONFIG.url}/#quantitative-investing`, name: "Quantitative Investing" },
  capitalPreservation: { "@id": `${SITE_CONFIG.url}/#capital-preservation`, name: "Capital Preservation" },
  research: { "@id": `${SITE_CONFIG.url}/#research-institute`, name: "Prysm Research Institute" },
  performance: { "@id": `${SITE_CONFIG.url}/#performance`, name: "Live Performance" },
  transparency: { "@id": `${SITE_CONFIG.url}/#transparency`, name: "Performance Transparency" },
  terminal: { "@id": `${SITE_CONFIG.url}/#market-terminal`, name: "Market Intelligence Terminal" },
};

export const V5_RELATIONSHIPS = [
  { from: "prysmAlgo", to: "blueEngine", relation: "owns" },
  { from: "prysmAlgo", to: "riskManagement", relation: "knowsAbout" },
  { from: "prysmAlgo", to: "research", relation: "publishes" },
  { from: "prysmAlgo", to: "performance", relation: "reports" },
  { from: "prysmAlgo", to: "transparency", relation: "maintains" },
  { from: "prysmAlgo", to: "terminal", relation: "provides" },
  { from: "blueEngine", to: "aiTrading", relation: "implements" },
  { from: "riskManagement", to: "capitalPreservation", relation: "enables" },
  { from: "forex", to: "quantitativeInvesting", relation: "relatedTo" },
  { from: "gold", to: "capitalPreservation", relation: "relatedTo" },
  { from: "research", to: "performance", relation: "analyzes" },
];

export function intelligenceGraphSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      ...Object.values(V5_ENTITIES).map((e) => ({ "@type": "Thing", ...e })),
      {
        "@type": "SoftwareApplication",
        "@id": `${SITE_CONFIG.url}/#intelligence-platform`,
        name: "PrysmAlgo Investor Intelligence Platform",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web, iOS, Android",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        provider: { "@id": `${SITE_CONFIG.url}/#organization` },
      },
    ],
  };
}
