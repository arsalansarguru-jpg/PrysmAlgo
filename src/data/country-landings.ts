import type { SeoContentPage } from "@/types/seo";
import { STANDARD_INTERNAL_LINKS } from "./seo-helpers";

export interface CountryLanding extends SeoContentPage {
  heroSubtitle: string;
  benefits: { title: string; description: string }[];
  marketOverview: { heading: string; paragraphs: string[] }[];
  whyPrysmAlgo: { heading: string; paragraphs: string[] }[];
}

function landing(
  slug: string,
  title: string,
  description: string,
  category: string,
  keywords: string[],
  heroSubtitle: string,
  benefits: CountryLanding["benefits"],
  marketOverview: CountryLanding["marketOverview"],
  whyPrysmAlgo: CountryLanding["whyPrysmAlgo"],
  faqs: CountryLanding["faqs"],
  internalLinks: CountryLanding["internalLinks"]
): CountryLanding {
  const sections = [
    ...marketOverview,
    ...whyPrysmAlgo,
    {
      heading: "Institutional Infrastructure",
      paragraphs: [
        "PrysmAlgo provides institutional-grade algorithmic infrastructure with Prysm Blue, Gold, and Green strategies — each with verified live track records and transparent reporting.",
        "Qualified investors receive dedicated onboarding, monthly performance reports, and direct access to our Mumbai-based investor relations team.",
      ],
    },
  ];
  return {
    slug,
    title,
    description,
    category,
    keywords,
    heroSubtitle,
    benefits,
    marketOverview,
    whyPrysmAlgo,
    sections,
    faqs,
    internalLinks,
  };
}

export const COUNTRY_LANDINGS: CountryLanding[] = [
  landing(
    "algorithmic-trading-india",
    "Algorithmic Trading in India",
    "Institutional algorithmic trading solutions for qualified investors in India. AI-powered systems with capital preservation focus.",
    "India",
    ["algorithmic trading India", "AI trading India", "quantitative trading India"],
    "Institutional-grade algorithmic trading technology for India's serious investors",
    [
      { title: "Regulated Broker Integration", description: "Connect through SEBI-regulated brokerage partners with full KYC/AML compliance." },
      { title: "Mumbai Headquarters", description: "Direct access to our Mumbai Central office for consultations and investor relations." },
      { title: "Multi-Strategy Access", description: "Prysm Blue, Gold, and Green strategies with verified live performance." },
      { title: "Capital Preservation", description: "Five-tier risk architecture designed for institutional capital protection." },
    ],
    [
      {
        heading: "Algorithmic Trading Landscape in India",
        paragraphs: [
          "India's financial markets have experienced significant growth in systematic and quantitative trading adoption. NSE and BSE volumes continue expanding as institutional allocators and HNW individuals seek technology-driven approaches.",
          "The regulatory framework supports algorithmic trading through registered brokers, making India an increasingly attractive market for systematic investment strategies.",
        ],
      },
      {
        heading: "Market Opportunity for Indian Investors",
        paragraphs: [
          "Indian investors benefit from growing forex market access, expanding derivative products, and increasing institutional acceptance of quantitative strategies.",
          "PrysmAlgo serves qualified Indian investors with global market access through regulated brokerage infrastructure while maintaining local investor support from Mumbai.",
        ],
      },
    ],
    [
      {
        heading: "Why Indian Investors Choose PrysmAlgo",
        paragraphs: [
          "Disciplined risk management with maximum drawdown controls, transparent monthly reporting, and performance-based fees aligned with investor interests.",
          "Minimum investment threshold of $250,000 USD ensures institutional-grade service. Capital remains in your own regulated brokerage account at all times.",
        ],
      },
    ],
    [
      { question: "Is algorithmic trading legal in India?", answer: "Yes, when conducted through regulated brokerage accounts with compliant technology providers." },
      { question: "What is the minimum investment?", answer: "The minimum allocation is $250,000 USD for qualified investors meeting suitability requirements." },
      { question: "Can I visit the Mumbai office?", answer: "Yes. Schedule a consultation through our contact page or Calendly." },
    ],
    [...STANDARD_INTERNAL_LINKS, { href: "/algorithmic-trading-mumbai", label: "Algorithmic Trading Mumbai" }]
  ),
  landing(
    "algorithmic-trading-mumbai",
    "Algorithmic Trading in Mumbai",
    "PrysmAlgo headquarters in Mumbai Central — institutional algorithmic trading for Maharashtra and pan-India investors.",
    "Mumbai",
    ["algorithmic trading Mumbai", "AI trading Mumbai"],
    "Mumbai's institutional algorithmic trading partner",
    [
      { title: "Local HQ Access", description: "Visit our Mumbai Central office for in-person strategy consultations." },
      { title: "Pan-India Reach", description: "Serving qualified investors across Maharashtra and all of India." },
      { title: "Institutional Support", description: "Dedicated investor relations and onboarding assistance." },
      { title: "Live Performance", description: "Access verified Prysm strategy performance and tear sheets." },
    ],
    [
      {
        heading: "Mumbai: India's Financial Capital",
        paragraphs: [
          "Mumbai serves as India's primary financial hub, home to major exchanges, institutional allocators, and high-net-worth investor communities in BKC, Nariman Point, and Lower Parel.",
          "PrysmAlgo is headquartered at Shop No. 7, Abu Bakkar Palace, Dimtimkar Road, Nagpada, Mumbai Central — serving investors across Maharashtra and India.",
        ],
      },
    ],
    [
      {
        heading: "Local Investor Services",
        paragraphs: [
          "Mumbai-based investors benefit from direct access to our team for consultations, onboarding, and investor relations support.",
          "We offer in-person strategy consultations alongside our global digital infrastructure and live performance dashboards.",
        ],
      },
    ],
    [{ question: "Where is the PrysmAlgo Mumbai office?", answer: "Shop No. 7, Abu Bakkar Palace, Dimtimkar Road, Nagpada, Mumbai Central, Mumbai - 400008." }],
    [...STANDARD_INTERNAL_LINKS, { href: "/algorithmic-trading-india", label: "Algorithmic Trading India" }]
  ),
  landing(
    "algorithmic-trading-uae",
    "Algorithmic Trading in the UAE",
    "Institutional algorithmic trading technology for qualified investors across the United Arab Emirates.",
    "UAE",
    ["algorithmic trading UAE", "AI trading UAE", "algorithmic trading Dubai"],
    "Systematic trading infrastructure for UAE allocators and family offices",
    [
      { title: "GCC Market Access", description: "Multi-market forex, commodities, and equity strategies." },
      { title: "Institutional Reporting", description: "Monthly performance reports and transparent attribution." },
      { title: "Risk Framework", description: "Institutional-grade drawdown controls and monitoring." },
      { title: "Remote Onboarding", description: "Full digital onboarding with KYC/AML compliance." },
    ],
    [
      {
        heading: "UAE's Quantitative Finance Growth",
        paragraphs: [
          "The UAE has emerged as a significant center for wealth management and alternative investments in the Middle East, with Dubai and Abu Dhabi attracting global capital.",
          "Family offices and institutional allocators increasingly adopt systematic trading for portfolio diversification beyond traditional assets.",
        ],
      },
    ],
    [
      {
        heading: "PrysmAlgo for UAE Investors",
        paragraphs: [
          "Our platform serves qualified UAE investors with the same institutional risk framework, transparent reporting, and AI-powered execution used globally.",
          "Multi-market access across forex, gold, and US equities provides diversification beyond regional markets.",
        ],
      },
    ],
    [{ question: "Do you serve investors in the UAE?", answer: "Yes. We serve qualified UAE investors subject to KYC/AML verification and suitability assessment." }],
    [...STANDARD_INTERNAL_LINKS, { href: "/algorithmic-trading-dubai", label: "Algorithmic Trading Dubai" }]
  ),
  landing(
    "algorithmic-trading-dubai",
    "Algorithmic Trading in Dubai",
    "Institutional algorithmic trading technology for qualified investors in Dubai and the UAE market.",
    "Dubai",
    ["algorithmic trading Dubai", "quantitative trading Dubai"],
    "Dubai's gateway to institutional algorithmic trading",
    [
      { title: "DIFC Ecosystem", description: "Serving investors in Dubai's world-class financial district." },
      { title: "Global Strategies", description: "Prysm Blue, Gold, and Green with live verified performance." },
      { title: "Wealth Management", description: "Designed for family offices and HNW allocators." },
      { title: "Transparent Fees", description: "Performance-based fee model aligned with investor outcomes." },
    ],
    [
      {
        heading: "Dubai's Growing Quantitative Finance Sector",
        paragraphs: [
          "Dubai and the UAE have emerged as significant centers for wealth management and alternative investments in the Middle East.",
          "Institutional and HNW investors in the region increasingly adopt systematic trading approaches for portfolio diversification.",
        ],
      },
    ],
    [
      {
        heading: "PrysmAlgo for Dubai Investors",
        paragraphs: [
          "Our platform serves qualified UAE investors with institutional risk framework, transparent reporting, and AI-powered execution.",
          "Access live Prysm Green US equity performance and download institutional tear sheets for all strategies.",
        ],
      },
    ],
    [{ question: "Do you serve investors in Dubai?", answer: "Yes. We serve qualified investors in the UAE subject to KYC/AML verification." }],
    [...STANDARD_INTERNAL_LINKS, { href: "/algorithmic-trading-uae", label: "Algorithmic Trading UAE" }]
  ),
  landing(
    "ai-trading-india",
    "AI Trading in India",
    "AI-powered algorithmic trading solutions for qualified investors in India with institutional risk controls.",
    "India",
    ["AI trading India", "algorithmic trading India", "AI investment platform India"],
    "AI-driven systematic trading for India's qualified investors",
    [
      { title: "Blue Engine AI", description: "Proprietary neural network ensembles for signal generation." },
      { title: "Risk-Controlled AI", description: "AI decisions bounded by institutional risk parameters." },
      { title: "Live Verification", description: "Semi-verified and live performance dashboards." },
      { title: "Indian Support", description: "Mumbai-based team for onboarding and relations." },
    ],
    [
      {
        heading: "AI Adoption in Indian Finance",
        paragraphs: [
          "Indian financial institutions and investors are increasingly adopting AI-driven trading systems for improved execution and risk management.",
          "PrysmAlgo's Blue Engine combines neural network ensembles with institutional risk controls designed for serious capital.",
        ],
      },
    ],
    [
      {
        heading: "Why AI Trading with PrysmAlgo",
        paragraphs: [
          "Our AI infrastructure powers Prysm Blue, Gold, and Green — three live strategies with verified track records and transparent reporting.",
          "AI enhances execution and risk management without replacing institutional discipline and capital preservation priorities.",
        ],
      },
    ],
    [{ question: "Is AI trading suitable for Indian investors?", answer: "Yes, for qualified investors meeting minimum thresholds through regulated brokerage accounts." }],
    STANDARD_INTERNAL_LINKS
  ),
  landing(
    "ai-trading-uae",
    "AI Trading in the UAE",
    "AI-powered algorithmic trading for qualified investors in the UAE and Gulf region.",
    "UAE",
    ["AI trading UAE", "AI trading Dubai", "algorithmic trading UAE"],
    "Institutional AI trading technology for Gulf region allocators",
    [
      { title: "Systematic AI Execution", description: "Rule-based AI with no emotional override." },
      { title: "Multi-Asset AI", description: "Forex, gold, and US equity AI strategies." },
      { title: "Live Dashboards", description: "Real-time performance at green.prysmalgo.com." },
      { title: "Institutional Grade", description: "Built for family offices and professional allocators." },
    ],
    [
      {
        heading: "AI Trading in the Gulf Region",
        paragraphs: [
          "UAE-based family offices and institutional allocators leverage AI trading technology for systematic portfolio growth with controlled risk exposure.",
          "The region's growing fintech ecosystem supports sophisticated quantitative investment approaches.",
        ],
      },
    ],
    [
      {
        heading: "PrysmAlgo AI Infrastructure",
        paragraphs: [
          "PrysmAlgo provides the infrastructure, risk management, and reporting that institutional relationships in the UAE demand.",
          "Our AI systems operate within strict risk budgets with full transparency and monthly investor reporting.",
        ],
      },
    ],
    [{ question: "What AI strategies are available?", answer: "Prysm Blue (forex), Prysm Gold (gold), and Prysm Green (US equities) — all AI-powered with live track records." }],
    STANDARD_INTERNAL_LINKS
  ),
];

export function getCountryLanding(slug: string) {
  return COUNTRY_LANDINGS.find((l) => l.slug === slug);
}
