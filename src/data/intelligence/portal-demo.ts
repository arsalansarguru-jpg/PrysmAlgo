import type { PortalPortfolio } from "@/types/intelligence";

export const DEMO_PORTFOLIO: PortalPortfolio = {
  totalValue: 1_184_000,
  ytdReturn: 18.4,
  monthlyReturn: 3.2,
  maxDrawdown: -6.8,
  sharpe: 1.84,
  allocation: [
    { strategy: "PRYSM BLUE", pct: 45, value: 532_800 },
    { strategy: "PRYSM GOLD", pct: 30, value: 355_200 },
    { strategy: "PRYSM GREEN", pct: 25, value: 296_000 },
  ],
  equityCurve: [
    { month: "Oct 25", value: 1000000 },
    { month: "Nov 25", value: 1050000 },
    { month: "Dec 25", value: 1080000 },
    { month: "Jan 26", value: 1120000 },
    { month: "Feb 26", value: 1150000 },
    { month: "Mar 26", value: 1184000 },
  ],
  monthlyReports: [
    { month: "March 2026", title: "Monthly Investor Report", url: "#" },
    { month: "February 2026", title: "Monthly Investor Report", url: "#" },
    { month: "January 2026", title: "Monthly Investor Report", url: "#" },
    { month: "Q4 2025", title: "Quarterly Performance Summary", url: "#" },
  ],
  profitShare: [
    { period: "Q1 2026", amount: 42800 },
    { period: "Q4 2025", amount: 38200 },
    { period: "Q3 2025", amount: 31500 },
  ],
  withdrawals: [
    { date: "2026-02-15", amount: 50000, status: "Completed" },
    { date: "2025-11-20", amount: 25000, status: "Completed" },
  ],
  documents: [
    { name: "Subscription Agreement", type: "Legal", date: "2025-06-01" },
    { name: "KYC Verification", type: "Compliance", date: "2025-06-05" },
    { name: "Risk Disclosure", type: "Legal", date: "2025-06-01" },
    { name: "Q1 2026 Quarterly Letter", type: "Report", date: "2026-01-15" },
  ],
};
