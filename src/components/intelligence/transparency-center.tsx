import Link from "next/link";
import { Button } from "@/components/ui/button";
import { IntelligenceHeader } from "./intelligence-header";
import { TrustScoreWidget } from "./trust-score-widget";
import { LiveMetricsBanner } from "./live-metrics-banner";
import { PRYSM_STRATEGIES } from "@/data/strategies";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQS = [
  { q: "How is performance verified?", a: "Through institutional tear sheets, live dashboard at green.prysmalgo.com, and monthly investor reports." },
  { q: "What methodology is used?", a: "Time-weighted returns, maximum drawdown from peak, and risk-adjusted metrics per GIPS-inspired standards." },
  { q: "Is third-party verification available?", a: "Qualified investors receive full audit documentation during due diligence." },
];

export function TransparencyCenter() {
  return (
    <div className="pt-28 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <IntelligenceHeader
          label="Performance Transparency"
          title="Transparency Center"
          description="Live track records, monthly reports, risk statistics, methodology, and third-party verification for qualified investors."
          breadcrumb={{ name: "Transparency", path: "/transparency" }}
        />

        <LiveMetricsBanner />

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <h2 className="text-lg font-semibold text-foreground mb-4">Live Track Records</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {PRYSM_STRATEGIES.map((s) => (
                <div key={s.id} className="rounded-xl border border-border bg-primary/30 p-5">
                  <h3 className="font-bold text-foreground">{s.name}</h3>
                  <p className="text-2xl font-bold text-success mt-2">+{s.totalReturn}%</p>
                  <p className="text-xs text-muted mt-1">Max DD: {s.maxDrawdown}%</p>
                  <p className="text-xs text-muted">Win Rate: {s.winRate}%</p>
                </div>
              ))}
            </div>
          </div>
          <TrustScoreWidget />
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="rounded-xl border border-border p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Methodology</h2>
            <ul className="space-y-2 text-sm text-muted">
              <li>• Time-weighted return calculation</li>
              <li>• Peak-to-trough maximum drawdown</li>
              <li>• Sharpe, Sortino, and Calmar ratios</li>
              <li>• Trade-level attribution analysis</li>
              <li>• Monthly reconciliation reports</li>
            </ul>
            <Button asChild variant="outline" className="mt-4"><Link href="/performance-methodology">Full Methodology</Link></Button>
          </div>
          <div className="rounded-xl border border-border p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Third-Party Verification</h2>
            <p className="text-sm text-muted mb-4">Qualified investors access broker statements, live dashboard verification, and institutional tear sheets during due diligence.</p>
            <Button asChild><Link href="/live-performance">View Live Performance</Link></Button>
          </div>
        </div>

        <h2 className="text-lg font-semibold text-foreground mb-4">Investor FAQs</h2>
        <Accordion type="single" collapsible>
          {FAQS.map((f, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger>{f.q}</AccordionTrigger>
              <AccordionContent>{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
