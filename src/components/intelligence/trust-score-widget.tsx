import { TRUST_SCORE, TRUST_DIMENSIONS } from "@/data/intelligence/trust-score";

export function TrustScoreWidget({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <div className="rounded-xl border border-accent/30 bg-accent/5 p-4 text-center">
        <p className="text-xs text-muted uppercase tracking-wider mb-1">Trust Score</p>
        <p className="text-3xl font-bold text-accent">{TRUST_SCORE.overall}</p>
        <p className="text-[10px] text-muted mt-1">Updated {TRUST_SCORE.updatedAt}</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-primary/30 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold text-foreground">Investor Trust Score</h3>
          <p className="text-xs text-muted">Proprietary transparency framework</p>
        </div>
        <div className="text-right">
          <p className="text-4xl font-bold text-accent">{TRUST_SCORE.overall}</p>
          <p className="text-[10px] text-muted">/ 100</p>
        </div>
      </div>
      <div className="space-y-4">
        {TRUST_DIMENSIONS.map((d) => {
          const val = TRUST_SCORE[d.key];
          return (
            <div key={d.key}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-foreground">{d.label}</span>
                <span className="text-accent font-medium">{val}</span>
              </div>
              <div className="h-1.5 rounded-full bg-border overflow-hidden">
                <div className="h-full rounded-full bg-gradient-brand" style={{ width: `${val}%` }} />
              </div>
              <p className="text-[10px] text-muted mt-1">{d.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
