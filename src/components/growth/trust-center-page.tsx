import Link from "next/link";
import { Shield, Lock, FileText, BarChart3, AlertTriangle, ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { faqSchema } from "@/lib/seo/schemas";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const sections = [
  { icon: AlertTriangle, title: "Risk Disclosure", href: "/risk-management", description: "Comprehensive risk framework including drawdown limits, position sizing, and emergency protocols." },
  { icon: Lock, title: "Privacy Policy", href: "/privacy-policy", description: "How we collect, use, and protect your personal and financial information." },
  { icon: FileText, title: "Terms of Service", href: "/terms", description: "Platform usage agreement, eligibility requirements, and investor responsibilities." },
  { icon: Shield, title: "Security Standards", href: "#security", description: "Encryption, access controls, and infrastructure security protecting investor data." },
  { icon: BarChart3, title: "Performance Methodology", href: "/performance-methodology", description: "How we measure, report, and attribute performance with full transparency." },
  { icon: Shield, title: "Investor Protection", href: "/trust", description: "Custody model, fee alignment, and institutional integrity protocols." },
];

const faqs = [
  { question: "Is PrysmAlgo a registered investment advisor?", answer: "PrysmAlgo is a technology provider connecting to regulated brokerage accounts. We are not a registered investment advisor, broker-dealer, or custodian." },
  { question: "Where is investor capital held?", answer: "Capital remains in the investor's own regulated brokerage account at all times. PrysmAlgo never has custody of investor funds." },
  { question: "How is performance verified?", answer: "Strategies use semi-verified and live-verified accounts with institutional tear sheets and real-time dashboards where available." },
];

export function TrustCenterPage() {
  return (
    <div className="pt-28 pb-24">
      <JsonLd data={faqSchema(faqs)} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: "Trust Center", path: "/trust-center" }]} />
        <h1 className="font-display text-3xl lg:text-5xl font-bold text-foreground mb-4">Trust Center</h1>
        <p className="text-lg text-muted max-w-3xl mb-16">Enterprise-grade transparency, compliance information, and investor protection frameworks.</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {sections.map((s) => (
            <Link key={s.title} href={s.href} className="group rounded-xl border border-border bg-primary/30 p-6 hover:border-accent/30 transition-colors">
              <s.icon className="h-8 w-8 text-accent mb-4" />
              <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors mb-2">{s.title}</h3>
              <p className="text-sm text-muted leading-relaxed mb-3">{s.description}</p>
              <span className="flex items-center gap-1 text-xs text-accent">Learn more <ArrowRight className="h-3 w-3" /></span>
            </Link>
          ))}
        </div>

        <section id="security" className="mb-16 rounded-xl border border-border bg-primary/20 p-8">
          <h2 className="text-xl font-semibold text-foreground mb-4">Security Standards</h2>
          <ul className="space-y-2 text-sm text-muted">
            <li>• Industry-standard encryption for data in transit and at rest</li>
            <li>• Role-based access controls and audit logging</li>
            <li>• Two-tier verification protocol for performance integrity</li>
            <li>• Segregated investor accounts — no capital pooling</li>
            <li>• Regular security reviews and infrastructure monitoring</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-6">Compliance FAQs</h2>
          <Accordion type="single" collapsible>
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </div>
    </div>
  );
}
