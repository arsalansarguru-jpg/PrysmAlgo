import Link from "next/link";
import { Mail, Phone, MapPin, MessageCircle, Linkedin, Facebook, Instagram } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { SITE_CONFIG, NAV_LINKS, GROWTH_LINKS, INTELLIGENCE_LINKS, CAPITAL_V7_LINKS } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-border bg-primary/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          <div className="space-y-4">
            <Logo variant="full" />
            <p className="text-sm text-muted leading-relaxed">
              {SITE_CONFIG.subheading}
            </p>
            <p className="text-xs text-muted/60">
              Institutional-grade algorithmic trading technology for serious investors.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Navigation
            </h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Contact
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  {SITE_CONFIG.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${SITE_CONFIG.phoneTel}`}
                  className="flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  {SITE_CONFIG.phone}
                </a>
              </li>
              <li>
                <a
                  href={SITE_CONFIG.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={SITE_CONFIG.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={SITE_CONFIG.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors"
                >
                  <Facebook className="h-4 w-4" />
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href={SITE_CONFIG.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors"
                >
                  <Instagram className="h-4 w-4" />
                  Instagram
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                {SITE_CONFIG.address}
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Intelligence
            </h4>
            <ul className="space-y-3">
              {INTELLIGENCE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted hover:text-accent transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Capital Platform
            </h4>
            <ul className="space-y-3">
              {CAPITAL_V7_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted hover:text-accent transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Resources
            </h4>
            <ul className="space-y-3">
              {GROWTH_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted hover:text-accent transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a href={SITE_CONFIG.greenPerformance} target="_blank" rel="noopener noreferrer" className="text-sm text-muted hover:text-accent transition-colors">
                  Prysm Green Dashboard
                </a>
              </li>
              <li><Link href="/performance" className="text-sm text-muted hover:text-accent transition-colors">Strategy Analytics</Link></li>
              <li><Link href="/locations" className="text-sm text-muted hover:text-accent transition-colors">Locations</Link></li>
              <li><Link href="/guides" className="text-sm text-muted hover:text-accent transition-colors">Investor Guides</Link></li>
              <li><Link href="/privacy-policy" className="text-sm text-muted hover:text-accent transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-sm text-muted hover:text-accent transition-colors">Terms of Service</Link></li>
            </ul>
            <div className="mt-6 rounded-lg border border-border bg-background/50 p-4">
              <p className="text-xs text-muted/60 leading-relaxed">
                Past performance is not indicative of future results. Trading involves substantial risk of loss. 
                PrysmAlgo is a technology provider, not a registered investment advisor.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted/60">
            &copy; {new Date().getFullYear()} PrysmAlgo. All rights reserved to Noble Technologies LLP.
          </p>
          <p className="text-xs text-muted/60">
            Designed for institutional investors. Not available to retail traders.
          </p>
        </div>
      </div>
    </footer>
  );
}
