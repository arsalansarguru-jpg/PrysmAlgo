import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { LIBRARY_RESOURCES } from "@/data/resource-library";
import { LeadCaptureForm } from "@/components/seo/lead-capture-form";
import { FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function ResourceLibraryPage() {
  const featured = LIBRARY_RESOURCES.filter((r) => r.featured);
  return (
    <div className="pt-28 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: "Resources", path: "/resources" }]} />
        <h1 className="font-display text-3xl lg:text-5xl font-bold text-foreground mb-4">Resource Library</h1>
        <p className="text-lg text-muted max-w-3xl mb-4">
          Institutional guides, handbooks, and frameworks for qualified investors.
        </p>
        <p className="text-sm text-muted mb-12">
          Also explore our <Link href="/learn" className="text-accent hover:underline">educational articles</Link> and <Link href="/academy" className="text-accent hover:underline">Investor Academy</Link>.
        </p>

        <h2 className="text-lg font-semibold text-foreground mb-6">Featured Resources</h2>
        <div className="grid lg:grid-cols-3 gap-6 mb-16">
          {featured.map((r) => (
            <div key={r.slug} className="rounded-xl border border-accent/20 bg-accent/5 p-6 flex flex-col">
              <FileText className="h-8 w-8 text-accent mb-4" />
              <span className="text-[10px] uppercase tracking-brand text-accent">{r.category}</span>
              <h3 className="text-lg font-semibold text-foreground mt-2 mb-2">{r.title}</h3>
              <p className="text-sm text-muted flex-1 mb-4">{r.description}</p>
              <ul className="space-y-1 mb-4">
                {r.previewSections.map((s) => (
                  <li key={s} className="text-xs text-muted">• {s}</li>
                ))}
              </ul>
              <p className="text-xs text-muted/60 mb-4">{r.pages} pages</p>
              <Button asChild variant="outline" size="sm">
                <a href={r.filePath} target="_blank" rel="noopener noreferrer">
                  <Download className="h-3 w-3" /> Preview PDF
                </a>
              </Button>
            </div>
          ))}
        </div>

        <h2 className="text-lg font-semibold text-foreground mb-6">All Resources</h2>
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {LIBRARY_RESOURCES.map((r) => (
            <div key={r.slug} className="rounded-xl border border-border bg-primary/30 p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-[10px] text-accent">{r.category}</span>
                  <h3 className="font-semibold text-foreground mt-1">{r.title}</h3>
                  <p className="text-sm text-muted mt-2">{r.description}</p>
                </div>
                <Button asChild variant="outline" size="sm">
                  <a href={r.filePath} target="_blank" rel="noopener noreferrer">
                    <Download className="h-3 w-3" />
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-xl mx-auto">
          <LeadCaptureForm
            title="Download All Resources"
            description="Enter your email to receive our complete institutional resource pack."
            resourceName="PrysmAlgo Resource Library"
          />
        </div>
      </div>
    </div>
  );
}
