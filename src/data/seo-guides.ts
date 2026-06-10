import type { SeoContentPage } from "@/types/seo";
import { buildSeoPage, STANDARD_INTERNAL_LINKS } from "./seo-helpers";

export const guidePages: SeoContentPage[] = [
  buildSeoPage(
    "institutional-investor-guide",
    "Institutional Investor Guide to Algorithmic Trading",
    "A comprehensive guide for institutional investors evaluating algorithmic trading technology and systematic investment strategies.",
    "Investor Guides",
    ["institutional investor guide", "algorithmic trading guide"],
    [
      { heading: "Who This Guide Is For", paragraphs: ["This guide is designed for institutional allocators, family offices, and high-net-worth investors evaluating algorithmic trading technology.", "It provides framework for due diligence without exaggerated performance claims."] },
      { heading: "Evaluation Framework", paragraphs: ["Assess technology infrastructure, risk management depth, reporting transparency, fee structure, and regulatory compliance before allocating capital.", "Request detailed performance attribution, risk metrics, and reference conversations with existing investors."] },
      { heading: "Onboarding Process", paragraphs: ["Qualified investors complete application, KYC/AML verification, broker connection, and strategy activation — typically within 5-10 business days.", "Capital remains in your regulated brokerage account throughout."] },
    ],
    [{ question: "How long does onboarding take?", answer: "Typically 5-10 business days from application submission to strategy activation." }],
    STANDARD_INTERNAL_LINKS
  ),
  buildSeoPage(
    "algorithmic-trading-risk-guide",
    "Algorithmic Trading Risk Guide",
    "Essential risk management concepts every algorithmic trading investor should understand before allocating capital.",
    "Investor Guides",
    ["algorithmic trading risk guide", "trading risk management"],
    [
      { heading: "Understanding Trading Risk", paragraphs: ["All trading involves risk of loss. Algorithmic systems face market risk, model risk, technology risk, and liquidity risk.", "Institutional frameworks address each risk category through dedicated controls and monitoring."] },
      { heading: "Key Risk Metrics", paragraphs: ["Evaluate maximum drawdown, Sharpe ratio, Sortino ratio, volatility, and beta relative to benchmarks.", "PrysmAlgo provides comprehensive monthly risk reports covering all key metrics."] },
    ],
    [{ question: "What is acceptable maximum drawdown?", answer: "This depends on risk tolerance. Our standard parameters target -8% maximum with automatic controls at -5%." }],
    [...STANDARD_INTERNAL_LINKS, { href: "/risk-management", label: "Full Risk Framework" }]
  ),
  buildSeoPage(
    "capital-preservation-whitepaper",
    "Capital Preservation Whitepaper",
    "Institutional perspectives on capital preservation in algorithmic trading and systematic investment strategies.",
    "Whitepapers",
    ["capital preservation whitepaper", "wealth preservation strategy"],
    [
      { heading: "The Preservation Imperative", paragraphs: ["Capital preservation is not optional for institutional investors — it is the foundation upon which sustainable returns are built.", "This whitepaper outlines the multi-layered approach PrysmAlgo employs to protect investor capital."] },
      { heading: "Five-Tier Risk Architecture", paragraphs: ["From trade filter validation through emergency stop systems, each tier provides independent capital protection.", "No single control point creates vulnerability — defense in depth is essential."] },
    ],
    [{ question: "Can I download this whitepaper?", answer: "Contact our team at info@prysmalgo.com to request the full whitepaper document." }],
    STANDARD_INTERNAL_LINKS
  ),
  buildSeoPage(
    "performance-methodology-overview",
    "Performance Methodology Overview",
    "How PrysmAlgo measures, reports, and attributes performance with full transparency for institutional investors.",
    "Performance Reports",
    ["performance methodology", "trading performance reporting"],
    [
      { heading: "Performance Measurement Standards", paragraphs: ["All performance figures are calculated net of fees using industry-standard methodologies with independent verification.", "We report equity curves, monthly returns, risk metrics, and benchmark comparisons in every investor report."] },
      { heading: "Attribution Analysis", paragraphs: ["Monthly reports include strategy-level attribution, instrument breakdown, and risk decomposition.", "Transparency builds the trust essential for long-term institutional relationships."] },
    ],
    [{ question: "How often is performance reported?", answer: "Comprehensive monthly reports with real-time dashboard access for qualified investors." }],
    [...STANDARD_INTERNAL_LINKS, { href: "/performance-methodology", label: "Detailed Methodology" }]
  ),
];
