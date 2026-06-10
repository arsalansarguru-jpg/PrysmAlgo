import { FOUNDER } from "@/lib/constants";

export const founderTimeline = [
  { year: "2009", title: "Quantitative Finance", description: "Began career in systematic trading at tier-one investment banks." },
  { year: "2014", title: "Hedge Fund Strategy", description: "Led quantitative strategy development for institutional portfolios." },
  { year: "2018", title: "Risk Architecture", description: "Designed multi-tier risk frameworks for systematic trading desks." },
  { year: "2021", title: "PrysmAlgo Founded", description: "Founded PrysmAlgo to democratize institutional-grade algorithmic trading." },
  { year: "2023", title: "Prysm Blue Live", description: "Launched Prysm Blue with 844+ days of verified EUR/USD execution." },
  { year: "2025", title: "Multi-Strategy Platform", description: "Expanded to Prysm Gold and Prysm Green with live performance dashboards." },
];

export const founderAchievements = [
  "15+ years in quantitative finance and systematic trading",
  "Former quantitative strategist at tier-one investment banks",
  "Built institutional risk frameworks managing multi-million dollar portfolios",
  "Founded PrysmAlgo under Noble Technologies LLP",
  "Architect of the proprietary Blue Engine AI infrastructure",
];

export const thoughtLeadership = [
  { title: "Capital Preservation in Algorithmic Trading", type: "Article", date: "2025" },
  { title: "The Future of AI in Institutional Investing", type: "Commentary", date: "2025" },
  { title: "Risk Management for Systematic Portfolios", type: "Whitepaper", date: "2024" },
  { title: "Why Discipline Beats Discretion", type: "Article", date: "2024" },
];

export const founderPageData = {
  ...FOUNDER,
  mission: "Democratize access to institutional-grade algorithmic trading while maintaining the capital preservation and risk discipline that professional investors demand.",
  vision: "Become the trusted technology partner for allocators worldwide, setting the standard for transparency, risk management, and consistent performance.",
  journey: `${FOUNDER.name} founded PrysmAlgo after fifteen years in quantitative finance, witnessing how retail-focused trading services failed serious investors. He set out to build technology that meets institutional standards — where capital preservation comes first and returns follow disciplined execution.`,
  timeline: founderTimeline,
  achievements: founderAchievements,
  thoughtLeadership,
};
