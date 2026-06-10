import Link from "next/link";
import { Shield, Eye, Cpu, BarChart3, Lock, ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { faqSchema } from "@/lib/seo/schemas";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FOUNDER } from "@/lib/constants";

const trustPillars = [
  { icon: Shield, title: "Risk Philosophy", description: "Capital preservation is our foundation. Every system decision prioritizes protecting investor capital over aggressive return targets." },
  { icon: BarChart3, title: "Methodology", description: "Transparent, systematic approaches with documented performance attribution, risk metrics, and benchmark comparisons." },
  { icon: Cpu, title: "Technology", description: "Proprietary Blue Engine infrastructure with five integrated systems: AI decision engine, risk layer, scanner, execution, and portfolio optimizer." },
  { icon: Eye, title: "Transparency", description: "Monthly investor reports, real-time dashboard access, and full fee disclosure with no hidden costs or unrealistic claims." },
  { icon: Lock, title: "Custody", description: "Your capital remains in your own regulated brokerage account. PrysmAlgo never has custody of investor funds." },
];

const trustFaqs = [
  { question: "How does PrysmAlgo protect investor capital?", answer: "Through five-tier risk architecture including position limits, drawdown protection, emergency stops, and 24/5 monitoring." },
  { question: "Is performance data verified?", answer: "All performance figures are calculated using industry-standard methodologies with comprehensive monthly reporting." },
  { question: "Who founded PrysmAlgo?", answer: `${FOUNDER.name}, ${FOUNDER.title}, with 15+ years in quantitative finance and systematic trading.` },
];

export function TrustPage() {
  return (
    <div className="pt-28 pb-24">
      <JsonLd data={faqSchema(trustFaqs)} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: "Why Trust PrysmAlgo", path: "/trust" }]} />
        <h1 className="font-display text-3xl lg:text-5xl font-bold text-foreground mb-6">
          Why Trust PrysmAlgo
        </h1>
        <p className="text-lg text-muted max-w-3xl mb-12 leading-relaxed">
          Institutional investors demand more than performance claims. They require transparency,
          disciplined risk management, and technology they can verify. PrysmAlgo was built to meet
          those standards.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {trustPillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <Card key={pillar.title} className="hover:border-accent/30 transition-colors">
                <CardContent className="p-8">
                  <Icon className="h-8 w-8 text-accent mb-4" />
                  <h2 className="text-lg font-semibold text-foreground mb-3">{pillar.title}</h2>
                  <p className="text-sm text-muted leading-relaxed">{pillar.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="flex gap-4">
          <Button asChild>
            <Link href="/apply">Apply as Investor <ArrowRight className="h-4 w-4" /></Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/about">About Our Team</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
