import Link from "next/link";
import { ExternalLink, Download, BarChart3 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { PrysmStrategy } from "@/data/strategies";
import { formatPercent, formatStrategyReturn } from "@/data/strategies";
import { cn } from "@/lib/utils";

interface StrategyCardProps {
  strategy: PrysmStrategy;
  featured?: boolean;
}

const accentBorder: Record<PrysmStrategy["id"], string> = {
  blue: "border-t-blue-500",
  gold: "border-t-amber-500",
  green: "border-t-green-500",
};

export function StrategyCard({ strategy, featured = false }: StrategyCardProps) {
  const isTearSheet = strategy.metricsSource === "tear-sheet";

  return (
    <Card
      className={cn(
        "h-full min-w-0 overflow-hidden border-t-4 transition-all",
        accentBorder[strategy.id],
        featured && "ring-1 ring-green-500/30"
      )}
    >
      <CardContent className="flex h-full flex-col p-6">
        <div className="mb-5 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={cn(
                "text-[10px] font-semibold uppercase tracking-wider",
                strategy.accentClass
              )}
            >
              {strategy.market}
            </span>
            {strategy.liveDays > 0 && (
              <span className="rounded-full border border-border bg-foreground/5 px-2.5 py-0.5 text-[10px] font-medium text-muted">
                {strategy.liveDays}d live
              </span>
            )}
          </div>

          <div>
            <h3 className="text-lg font-bold leading-tight text-foreground">{strategy.name}</h3>
            <p className="mt-1 text-xs leading-relaxed text-muted italic">
              &ldquo;{strategy.tagline}&rdquo;
            </p>
          </div>
        </div>

        <p className="mb-5 text-sm leading-relaxed text-muted line-clamp-3">
          {strategy.description}
        </p>

        <div className="mb-5 grid grid-cols-2 gap-2">
          <Metric
            label="Total Return"
            value={formatStrategyReturn(strategy.totalReturn)}
            positive
            highlight
          />
          <Metric label="Monthly Avg" value={formatPercent(strategy.monthlyAvg)} positive />
          {isTearSheet && strategy.weeklyAvg !== undefined && (
            <Metric label="Weekly Avg" value={formatPercent(strategy.weeklyAvg)} positive />
          )}
          {!isTearSheet && strategy.annualReturn !== undefined && (
            <Metric label="Annual (CAGR)" value={formatPercent(strategy.annualReturn)} positive />
          )}
          <Metric label="Max DD" value={`${strategy.maxDrawdown}%`} />
          <Metric label="Win Rate" value={`${strategy.winRate}%`} />
        </div>

        <p className="mb-3 text-[11px] font-medium uppercase tracking-wide text-muted/80">
          {strategy.instrument}
        </p>

        <ul className="mb-5 flex-1 space-y-1.5">
          {strategy.highlights.slice(0, 3).map((item) => (
            <li key={item} className="flex items-start gap-2 text-xs leading-relaxed text-muted">
              <span
                className="mt-1.5 h-1 w-1 shrink-0 rounded-full"
                style={{ backgroundColor: strategy.accentColor }}
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto space-y-3 border-t border-border pt-4">
          <p className="text-[10px] leading-relaxed text-muted/50">{strategy.verification}</p>

          <div className="grid grid-cols-1 gap-2">
            {strategy.performanceUrl ? (
              <Button asChild size="sm" className="w-full normal-case tracking-wide">
                <a href={strategy.performanceUrl} target="_blank" rel="noopener noreferrer">
                  <BarChart3 className="h-3.5 w-3.5" />
                  Live Dashboard
                  <ExternalLink className="h-3 w-3 opacity-60" />
                </a>
              </Button>
            ) : (
              <Button asChild variant="outline" size="sm" className="w-full normal-case tracking-wide">
                <Link href="/live-performance">View Performance</Link>
              </Button>
            )}
            <Button asChild variant="outline" size="sm" className="w-full normal-case tracking-wide">
              <a href={strategy.tearSheetPath} target="_blank" rel="noopener noreferrer">
                <Download className="h-3.5 w-3.5" />
                Download Tear Sheet
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function Metric({
  label,
  value,
  positive = false,
  highlight = false,
}: {
  label: string;
  value: string;
  positive?: boolean;
  highlight?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border px-3 py-2.5",
        highlight ? "border-accent/30 bg-accent/10" : "border-border bg-primary/40"
      )}
    >
      <p className="text-[10px] uppercase tracking-wide text-muted">{label}</p>
      <p
        className={cn(
          "mt-0.5 text-base font-bold leading-none",
          positive ? "text-success" : "text-foreground"
        )}
      >
        {value}
      </p>
    </div>
  );
}
