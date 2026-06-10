import type { NewsArticle } from "@/types/content";

export const NEWS_CATEGORIES = ["Company News", "Market Updates", "Research Releases", "Partnerships", "Events"] as const;

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    slug: "prysmalgo-launches-authority-engine-v3",
    title: "PrysmAlgo Launches Authority Engine V3.0 Content Platform",
    excerpt: "New investor education hub with glossary, research, and programmatic SEO for India and UAE markets.",
    category: "Company News",
    date: "2026-03-01",
    author: "PrysmAlgo Editorial",
    featured: true,
    sections: [
      { heading: "Platform Expansion", paragraphs: ["PrysmAlgo has expanded its digital authority platform with 500+ glossary terms, 200 article blueprints, and programmatic city landing pages across India and UAE."] },
      { heading: "Investor Focus", paragraphs: ["The expansion supports qualified investor education, EEAT signals, and transparent access to live performance data."] },
    ],
    faqs: [{ question: "Who is this platform for?", answer: "Qualified and institutional investors evaluating systematic trading strategies." }],
    internalLinks: [{ href: "/academy", label: "Investor Academy" }, { href: "/glossary", label: "Glossary" }],
  },
  {
    slug: "prysm-green-dashboard-milestone",
    title: "Prysm Green Live Dashboard Surpasses 3,800 Trades",
    excerpt: "US equity systematic strategy reaches new milestone with full trade transparency on green.prysmalgo.com.",
    category: "Market Updates",
    date: "2026-02-15",
    author: "Performance Team",
    featured: true,
    sections: [
      { heading: "Milestone", paragraphs: ["PRYSM GREEN has logged over 3,884 trades with live dashboard verification available to qualified investors."] },
    ],
    faqs: [],
    internalLinks: [{ href: "/live-performance", label: "Performance Center" }],
  },
  {
    slug: "weekly-research-hub-launch",
    title: "Weekly Research Hub Now Available",
    excerpt: "Institutional forex, gold, and macro research published weekly for investor subscribers.",
    category: "Research Releases",
    date: "2026-02-01",
    author: "Research Desk",
    featured: false,
    sections: [{ heading: "Research Coverage", paragraphs: ["Weekly outlooks cover EUR/USD, XAU/USD, macro events, and AI trading research."] }],
    faqs: [],
    internalLinks: [{ href: "/research", label: "Research Hub" }],
  },
  {
    slug: "mumbai-office-investor-summit-2026",
    title: "PrysmAlgo Hosts Mumbai Investor Summit 2026",
    excerpt: "Institutional investors gathered at Mumbai Central for systematic trading education and strategy review.",
    category: "Events",
    date: "2026-01-20",
    author: "Events Team",
    featured: false,
    sections: [{ heading: "Summit Highlights", paragraphs: ["Founder Arsalan Sarguru presented the Blue Engine architecture and live performance methodology."] }],
    faqs: [],
    internalLinks: [{ href: "/founder", label: "Founder Profile" }, { href: "/contact", label: "Contact" }],
  },
  {
    slug: "uae-expansion-strategic-partnership",
    title: "PrysmAlgo Expands UAE Investor Services",
    excerpt: "Enhanced onboarding and research coverage for qualified investors in Dubai and Abu Dhabi.",
    category: "Partnerships",
    date: "2026-01-10",
    author: "PrysmAlgo",
    featured: false,
    sections: [{ heading: "UAE Growth", paragraphs: ["Dedicated landing pages and localized research support UAE investor acquisition."] }],
    faqs: [],
    internalLinks: [{ href: "/algorithmic-trading-dubai", label: "Dubai Landing Page" }],
  },
];

export function getNewsArticle(slug: string) {
  return NEWS_ARTICLES.find((n) => n.slug === slug);
}
