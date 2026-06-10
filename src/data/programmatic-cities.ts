import type { ProgrammaticCity } from "@/types/content";
import { buildSeoPage, STANDARD_INTERNAL_LINKS } from "@/data/seo-helpers";

export const PROGRAMMATIC_CITIES: ProgrammaticCity[] = [
  { slug: "mumbai", name: "Mumbai", country: "India", countryCode: "IN", region: "Maharashtra", population: "21M+", investorProfile: "Family offices, HNWI, institutional allocators" },
  { slug: "delhi", name: "Delhi", country: "India", countryCode: "IN", region: "NCR", population: "32M+", investorProfile: "Corporate executives, business owners, UHNWI" },
  { slug: "bangalore", name: "Bangalore", country: "India", countryCode: "IN", region: "Karnataka", population: "13M+", investorProfile: "Tech executives, startup founders, global NRIs" },
  { slug: "hyderabad", name: "Hyderabad", country: "India", countryCode: "IN", region: "Telangana", population: "10M+", investorProfile: "Pharma, tech, and real estate investors" },
  { slug: "chennai", name: "Chennai", country: "India", countryCode: "IN", region: "Tamil Nadu", population: "11M+", investorProfile: "Industrial families, conservative growth investors" },
  { slug: "pune", name: "Pune", country: "India", countryCode: "IN", region: "Maharashtra", population: "7M+", investorProfile: "IT professionals, manufacturing entrepreneurs" },
  { slug: "ahmedabad", name: "Ahmedabad", country: "India", countryCode: "IN", region: "Gujarat", population: "8M+", investorProfile: "Trading communities, business families" },
  { slug: "kolkata", name: "Kolkata", country: "India", countryCode: "IN", region: "West Bengal", population: "15M+", investorProfile: "Traditional business families, conservative allocators" },
  { slug: "dubai", name: "Dubai", country: "UAE", countryCode: "AE", region: "Dubai", population: "3.5M+", investorProfile: "International HNWI, expat professionals, family offices" },
  { slug: "abu-dhabi", name: "Abu Dhabi", country: "UAE", countryCode: "AE", region: "Abu Dhabi", population: "1.5M+", investorProfile: "Sovereign-adjacent allocators, institutional investors" },
  { slug: "sharjah", name: "Sharjah", country: "UAE", countryCode: "AE", region: "Sharjah", population: "1.8M+", investorProfile: "Regional business owners, cross-border investors" },
  { slug: "new-york", name: "New York", country: "USA", countryCode: "US", region: "New York", population: "8.3M+", investorProfile: "Family offices, hedge fund allocators, institutional investors" },
  { slug: "san-francisco", name: "San Francisco", country: "USA", countryCode: "US", region: "California", population: "4.7M+", investorProfile: "Tech executives, venture capitalists, global allocators" },
  { slug: "los-angeles", name: "Los Angeles", country: "USA", countryCode: "US", region: "California", population: "13M+", investorProfile: "Entertainment industry HNWI, real estate investors, family offices" },
  { slug: "london", name: "London", country: "UK", countryCode: "GB", region: "Greater London", population: "9M+", investorProfile: "Institutional allocators, family offices, international HNWI" },
  { slug: "manchester", name: "Manchester", country: "UK", countryCode: "GB", region: "Greater Manchester", population: "2.8M+", investorProfile: "Northern business families, professional investors, tech entrepreneurs" },
];

export type ProgrammaticVertical = "algorithmic-trading" | "ai-trading" | "quantitative-investing";

const VERTICAL_LABELS: Record<ProgrammaticVertical, string> = {
  "algorithmic-trading": "Algorithmic Trading",
  "ai-trading": "AI Trading",
  "quantitative-investing": "Quantitative Investing",
};

export function buildCityPage(vertical: ProgrammaticVertical, city: ProgrammaticCity) {
  const label = VERTICAL_LABELS[vertical];
  const slug = city.slug;
  const title = `${label} in ${city.name} — Institutional Solutions for ${city.country} Investors`;
  const description = `Professional ${label.toLowerCase()} for qualified investors in ${city.name}, ${city.region}. Live performance, risk frameworks, and systematic strategies from PrysmAlgo.`;

  return buildSeoPage(
    slug,
    title,
    description,
    label,
    [`${label.toLowerCase()} ${city.name.toLowerCase()}`, `${label.toLowerCase()} ${city.country.toLowerCase()}`, `systematic trading ${city.name}`],
    [
      {
        heading: `${label} for ${city.name} Investors`,
        paragraphs: [
          `${city.name} is a major financial center in ${city.region} with a growing community of ${city.investorProfile.toLowerCase()}. PrysmAlgo provides institutional-grade ${label.toLowerCase()} technology with documented live performance.`,
          `Our Mumbai-based team serves qualified investors across ${city.country} with transparent reporting, systematic risk controls, and dedicated investor support.`,
        ],
      },
      {
        heading: "Market Overview",
        paragraphs: [
          `Investors in ${city.name} increasingly seek systematic alternatives to discretionary trading. ${label} offers rules-based execution, consistent risk management, and auditable performance attribution.`,
          `PrysmAlgo strategies — PRYSM BLUE (forex), PRYSM GOLD (commodities), and PRYSM GREEN (US equities) — provide diversified systematic exposure with live verification.`,
        ],
      },
      {
        heading: `Why PrysmAlgo in ${city.name}`,
        paragraphs: [
          "Live performance transparency with institutional tear sheets and real-time dashboard access.",
          "Documented risk frameworks with maximum drawdown protocols and emergency stop systems.",
          "Dedicated investor onboarding including suitability assessment and strategy consultation.",
        ],
      },
      {
        heading: "Benefits for Qualified Investors",
        paragraphs: [
          "Access to three complementary systematic strategies with verified track records.",
          "Monthly investor reporting and quarterly performance summaries.",
          "Dedicated investor support across India, UAE, USA, and UK with Calendly strategy consultations.",
        ],
      },
      {
        heading: "Getting Started",
        paragraphs: [
          `Qualified investors in ${city.name} can begin with our investor assessment, review live performance data, and schedule a strategy consultation with our team.`,
        ],
      },
    ],
    [
      { question: `Is PrysmAlgo available to investors in ${city.name}?`, answer: `Yes. We serve qualified investors in ${city.name} and across ${city.country} with remote onboarding and optional office meetings in Mumbai.` },
      { question: `What is the minimum investment?`, answer: "Capital requirements vary by strategy. Complete our investor assessment for personalized guidance." },
      { question: `How is performance verified?`, answer: "Performance is documented through institutional tear sheets and live dashboard verification at green.prysmalgo.com." },
    ],
    [
      ...STANDARD_INTERNAL_LINKS,
      { href: "/live-performance", label: "Live Performance Center" },
      { href: "/investor-assessment", label: "Investor Assessment" },
      { href: "/glossary", label: "Investor Glossary" },
    ]
  );
}

export function getAllCityRoutes(vertical: ProgrammaticVertical) {
  return PROGRAMMATIC_CITIES.map((city) => ({
    city: city.slug,
    slug: `${vertical}-${city.slug}`,
    page: buildCityPage(vertical, city),
  }));
}

export function getCityRoute(vertical: ProgrammaticVertical, citySlug: string) {
  const city = PROGRAMMATIC_CITIES.find((c) => c.slug === citySlug);
  if (!city) return null;
  return { city, page: buildCityPage(vertical, city) };
}
