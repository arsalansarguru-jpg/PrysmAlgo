interface LegalPageProps {
  title: string;
  lastUpdated: string;
  content: string;
}

export function LegalPage({ title, lastUpdated, content }: LegalPageProps) {
  const sections = content.trim().split("\n\n");

  return (
    <div className="pt-28 pb-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">{title}</h1>
        <p className="text-sm text-muted mb-12">Last updated: {lastUpdated}</p>

        <div className="space-y-8">
          {sections.map((section, index) => {
            const lines = section.split("\n");
            const heading = lines[0].replace("## ", "");
            const body = lines.slice(1).join("\n");

            return (
              <div key={index}>
                <h2 className="text-xl font-semibold text-foreground mb-3">{heading}</h2>
                <p className="text-muted leading-relaxed">{body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
