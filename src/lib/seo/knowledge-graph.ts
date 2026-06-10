import { SITE_CONFIG } from "@/lib/constants";

/** Entity relationship graph for schema.org @graph */
export const KNOWLEDGE_ENTITIES = {
  prysmAlgo: {
    "@type": "Organization",
    "@id": `${SITE_CONFIG.url}/#organization`,
    name: "PrysmAlgo",
  },
  algorithmicTrading: {
    "@type": "Thing",
    "@id": `${SITE_CONFIG.url}/#algorithmic-trading`,
    name: "Algorithmic Trading",
    sameAs: "https://en.wikipedia.org/wiki/Algorithmic_trading",
  },
  aiTrading: {
    "@type": "Thing",
    "@id": `${SITE_CONFIG.url}/#ai-trading`,
    name: "AI Trading",
  },
  riskManagement: {
    "@type": "Thing",
    "@id": `${SITE_CONFIG.url}/#risk-management`,
    name: "Risk Management",
  },
  forexMarkets: {
    "@type": "Thing",
    "@id": `${SITE_CONFIG.url}/#forex-markets`,
    name: "Forex Markets",
  },
  capitalPreservation: {
    "@type": "Thing",
    "@id": `${SITE_CONFIG.url}/#capital-preservation`,
    name: "Capital Preservation",
  },
  quantitativeInvesting: {
    "@type": "Thing",
    "@id": `${SITE_CONFIG.url}/#quantitative-investing`,
    name: "Quantitative Investing",
  },
} as const;

export const ENTITY_RELATIONSHIPS = [
  { from: "prysmAlgo", to: "algorithmicTrading", relation: "knowsAbout" },
  { from: "prysmAlgo", to: "aiTrading", relation: "knowsAbout" },
  { from: "prysmAlgo", to: "riskManagement", relation: "knowsAbout" },
  { from: "prysmAlgo", to: "forexMarkets", relation: "knowsAbout" },
  { from: "prysmAlgo", to: "capitalPreservation", relation: "knowsAbout" },
  { from: "prysmAlgo", to: "quantitativeInvesting", relation: "knowsAbout" },
  { from: "algorithmicTrading", to: "riskManagement", relation: "relatedTo" },
  { from: "aiTrading", to: "algorithmicTrading", relation: "relatedTo" },
  { from: "quantitativeInvesting", to: "riskManagement", relation: "relatedTo" },
  { from: "forexMarkets", to: "algorithmicTrading", relation: "relatedTo" },
  { from: "capitalPreservation", to: "riskManagement", relation: "relatedTo" },
] as const;

export function knowledgeGraphSchema() {
  const entities = Object.values(KNOWLEDGE_ENTITIES);
  const org = {
    ...KNOWLEDGE_ENTITIES.prysmAlgo,
    knowsAbout: [
      KNOWLEDGE_ENTITIES.algorithmicTrading["@id"],
      KNOWLEDGE_ENTITIES.aiTrading["@id"],
      KNOWLEDGE_ENTITIES.riskManagement["@id"],
      KNOWLEDGE_ENTITIES.forexMarkets["@id"],
      KNOWLEDGE_ENTITIES.capitalPreservation["@id"],
      KNOWLEDGE_ENTITIES.quantitativeInvesting["@id"],
    ],
    url: SITE_CONFIG.url,
  };

  return {
    "@context": "https://schema.org",
    "@graph": [...entities, org],
  };
}
