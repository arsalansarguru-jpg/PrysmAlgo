import type { AuthorityPage } from "@/types/content";
import { STANDARD_INTERNAL_LINKS } from "@/data/seo-helpers";

function page(
  slug: string,
  title: string,
  description: string,
  category: string,
  keywords: string[],
  sections: { heading: string; paragraphs: string[] }[],
  faqs: { question: string; answer: string }[]
): AuthorityPage {
  return {
    slug,
    title,
    description,
    category,
    keywords,
    sections,
    faqs,
    internalLinks: [
      ...STANDARD_INTERNAL_LINKS,
      { href: "/live-performance", label: "Live Performance" },
      { href: "/glossary", label: "Glossary" },
      { href: "/case-studies", label: "Case Studies" },
    ],
  };
}

export const AUTHORITY_PAGES: AuthorityPage[] = [
  page(
    "why-prysmalgo",
    "Why PrysmAlgo",
    "Institutional algorithmic trading with live performance transparency, documented risk frameworks, and verified track records across forex, gold, and US equities.",
    "Authority",
    ["why prysmalgo", "algorithmic trading india", "institutional trading uae"],
    [
      { heading: "Institutional-Grade Technology", paragraphs: ["PrysmAlgo builds systematic trading infrastructure for qualified investors who demand transparency, risk control, and auditable performance."] },
      { heading: "Live Performance Verification", paragraphs: ["Every strategy is backed by institutional tear sheets and live dashboard access. PRYSM GREEN offers real-time trade verification at green.prysmalgo.com."] },
      { heading: "Risk-First Philosophy", paragraphs: ["Maximum drawdown protocols, emergency stops, and position sizing rules are embedded in every strategy — not added as an afterthought."] },
    ],
    [{ question: "Who should invest with PrysmAlgo?", answer: "Qualified investors with appropriate capital, risk tolerance, and investment horizon seeking systematic exposure." }]
  ),
  page(
    "risk-framework",
    "Risk Framework",
    "PrysmAlgo's institutional risk management framework covering drawdown protection, position sizing, emergency protocols, and portfolio-level controls.",
    "Risk Management",
    ["risk framework", "trading risk management", "drawdown protection"],
    [
      { heading: "Per-Trade Risk Controls", paragraphs: ["Each trade risks a defined percentage of account equity. Position size is calculated from stop-loss distance and portfolio heat limits."] },
      { heading: "Drawdown Protection", paragraphs: ["Maximum drawdown thresholds trigger automatic position reduction or strategy pause. Historical drawdown profiles inform allocation sizing."] },
      { heading: "Emergency Protocols", paragraphs: ["Circuit breakers, emergency stops, and manual override capabilities protect capital during extreme market events."] },
    ],
    [{ question: "What is the maximum drawdown?", answer: "Varies by strategy: PRYSM BLUE -7.7%, PRYSM GOLD -2.3%, PRYSM GREEN -9.16% per verified data." }]
  ),
  page(
    "investment-philosophy",
    "Investment Philosophy",
    "PrysmAlgo's investment philosophy: systematic execution, capital preservation, and transparent performance for long-term compounding.",
    "Philosophy",
    ["investment philosophy", "systematic investing", "capital preservation"],
    [
      { heading: "Systematic Over Discretionary", paragraphs: ["Rules-based execution removes emotional bias and ensures consistent application of risk parameters across all market conditions."] },
      { heading: "Preservation Enables Compounding", paragraphs: ["Controlling drawdowns is more important than maximizing returns. Capital preserved during downturns compounds faster during recoveries."] },
      { heading: "Transparency Builds Trust", paragraphs: ["Investors deserve full visibility into performance, risk metrics, and trade execution. We publish live data, not marketing claims."] },
    ],
    []
  ),
  page(
    "technology",
    "Technology",
    "Cloud-native trading infrastructure, API integrations, real-time monitoring, and AI-powered signal generation via the Blue Engine.",
    "Technology",
    ["trading technology", "algo trading infrastructure", "blue engine"],
    [
      { heading: "Infrastructure", paragraphs: ["Cloud-native architecture with redundant failover, low-latency execution, and 24/7 monitoring dashboards."] },
      { heading: "Blue Engine AI", paragraphs: ["Proprietary neural ensemble system for signal generation with model validation, governance, and drift detection."] },
      { heading: "Integration", paragraphs: ["Broker API connectivity, FIX protocol support, and institutional-grade order management."] },
    ],
    []
  ),
  page(
    "blue-engine",
    "Blue Engine",
    "PrysmAlgo's proprietary AI signal generation system — neural ensembles, model governance, and systematic alpha production.",
    "AI Trading",
    ["blue engine", "ai trading prysmalgo", "neural network trading"],
    [
      { heading: "Architecture", paragraphs: ["Blue Engine combines multiple neural network ensembles trained on diverse feature sets with ensemble voting for robust signal generation."] },
      { heading: "Governance", paragraphs: ["Walk-forward validation, out-of-sample testing, and continuous model drift monitoring ensure signals remain statistically valid."] },
      { heading: "Integration", paragraphs: ["Signals feed directly into execution algorithms with pre-trade risk checks and post-trade attribution."] },
    ],
    []
  ),
  page(
    "capital-preservation",
    "Capital Preservation",
    "Institutional capital preservation strategies using systematic risk controls, low-drawdown approaches, and multi-asset diversification.",
    "Wealth Preservation",
    ["capital preservation", "wealth preservation", "low drawdown investing"],
    [
      { heading: "Preservation-First Allocation", paragraphs: ["PRYSM GOLD's -2.3% maximum drawdown demonstrates our commitment to capital preservation alongside growth objectives."] },
      { heading: "Multi-Strategy Diversification", paragraphs: ["Blending forex, gold, and equity strategies reduces portfolio-level correlation and drawdown risk."] },
      { heading: "Crisis Protocols", paragraphs: ["Emergency stop systems and volatility regime detection protect capital during black swan events."] },
    ],
    []
  ),
];

export function getAuthorityPage(slug: string) {
  return AUTHORITY_PAGES.find((p) => p.slug === slug);
}
