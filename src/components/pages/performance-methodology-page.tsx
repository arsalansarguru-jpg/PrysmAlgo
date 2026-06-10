import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { Button } from "@/components/ui/button";

const sections = [
  { title: "Performance Calculation", content: "All returns are calculated net of fees using time-weighted return methodology. Equity curves reflect actual portfolio values at marked-to-market prices." },
  { title: "Risk-Adjusted Metrics", content: "We report Sharpe ratio, Sortino ratio, Calmar ratio, maximum drawdown, volatility, beta, and alpha relative to relevant benchmarks." },
  { title: "Benchmark Comparison", content: "Performance is compared against S&P 500, hedge fund indices, and 60/40 portfolios to provide context for risk-adjusted outcomes." },
  { title: "Attribution Analysis", content: "Monthly reports include strategy-level attribution, instrument breakdown, and trade analytics for complete transparency." },
  { title: "Reporting Frequency", content: "Comprehensive monthly reports delivered to all qualified investors with real-time dashboard access between reporting periods." },
];

export function PerformanceMethodologyPage() {
  return (
    <div className="pt-28 pb-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: "Performance Methodology", path: "/performance-methodology" }]} />
        <h1 className="font-display text-3xl lg:text-5xl font-bold text-foreground mb-6">
          Performance Methodology
        </h1>
        <p className="text-lg text-muted mb-12 leading-relaxed">
          PrysmAlgo is committed to transparent, accurate performance reporting. This page outlines
          our measurement standards and reporting practices for institutional investors.
        </p>

        <div className="space-y-8 mb-12">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-xl font-semibold text-foreground mb-3">{section.title}</h2>
              <p className="text-muted leading-relaxed">{section.content}</p>
            </section>
          ))}
        </div>

        <p className="text-xs text-muted/60 mb-8">
          Past performance is not indicative of future results. All figures represent demo data for
          illustrative purposes unless otherwise stated in official investor reports.
        </p>

        <Button asChild>
          <Link href="/performance">View Performance Dashboard</Link>
        </Button>
      </div>
    </div>
  );
}
