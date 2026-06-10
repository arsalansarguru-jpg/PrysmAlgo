"use client";

import { useEffect, useState } from "react";
import type { InvestorHealthScore } from "@/types/capital-v7";

const RISK_COLORS = { low: "text-success", medium: "text-yellow-400", high: "text-red-400" };

export function HealthScoreWidget({ email = "investor@example.com" }: { email?: string }) {
  const [score, setScore] = useState<InvestorHealthScore | null>(null);

  useEffect(() => {
    fetch(`/api/v1/health-score?email=${encodeURIComponent(email)}`)
      .then((r) => r.json())
      .then((d) => setScore(d.score));
  }, [email]);

  if (!score) return null;

  const dimensions = [
    { label: "Engagement", value: score.engagementScore },
    { label: "Portal Usage", value: score.portalUsageScore },
    { label: "Email Opens", value: score.emailOpensScore },
    { label: "Referrals", value: score.referralScore },
  ];

  return (
    <div className="rounded-xl border border-border bg-primary/30 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground">Investor Health Score</h3>
        <span className={`text-2xl font-bold ${score.overallScore >= 70 ? "text-success" : score.overallScore >= 50 ? "text-yellow-400" : "text-red-400"}`}>
          {score.overallScore}
        </span>
      </div>
      <p className={`text-xs mb-4 ${RISK_COLORS[score.retentionRisk]}`}>
        Retention risk: {score.retentionRisk}
      </p>
      <div className="space-y-3">
        {dimensions.map((d) => (
          <div key={d.label}>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-muted">{d.label}</span>
              <span className="text-foreground">{d.value}</span>
            </div>
            <div className="h-1.5 rounded-full bg-border">
              <div className="h-1.5 rounded-full bg-accent" style={{ width: `${d.value}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
