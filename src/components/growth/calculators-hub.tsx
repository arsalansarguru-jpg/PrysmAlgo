"use client";

import { useState, useMemo } from "react";
import { Calculator, Copy, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/shared/section-header";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "compound", label: "Compound Growth" },
  { id: "drawdown", label: "Drawdown Recovery" },
  { id: "position", label: "Position Sizing" },
  { id: "rr", label: "Risk Reward" },
  { id: "allocation", label: "Portfolio Allocation" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export function CalculatorsHub() {
  const [tab, setTab] = useState<TabId>("compound");
  const [copied, setCopied] = useState(false);

  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(5);
  const [drawdown, setDrawdown] = useState(20);
  const [account, setAccount] = useState(250000);
  const [riskPct, setRiskPct] = useState(1);
  const [stopLoss, setStopLoss] = useState(50);
  const [entry, setEntry] = useState(100);
  const [stop, setStop] = useState(95);
  const [target, setTarget] = useState(110);
  const [allocTotal, setAllocTotal] = useState(500000);
  const [bluePct, setBluePct] = useState(45);
  const [goldPct, setGoldPct] = useState(30);
  const [greenPct, setGreenPct] = useState(25);

  const results = useMemo(() => {
    const compound = principal * Math.pow(1 + rate / 100, years);
    const compoundGain = compound - principal;
    const recovery = drawdown > 0 ? (drawdown / (100 - drawdown)) * 100 : 0;
    const riskAmount = account * (riskPct / 100);
    const positionSize = stopLoss > 0 ? riskAmount / stopLoss : 0;
    const risk = Math.abs(entry - stop);
    const reward = Math.abs(target - entry);
    const rr = risk > 0 ? reward / risk : 0;
    const totalPct = bluePct + goldPct + greenPct;
    return {
      compound, compoundGain,
      recovery,
      riskAmount, positionSize,
      rr, risk, reward,
      blue: allocTotal * (bluePct / 100),
      gold: allocTotal * (goldPct / 100),
      green: allocTotal * (greenPct / 100),
      totalPct,
    };
  }, [principal, rate, years, drawdown, account, riskPct, stopLoss, entry, stop, target, allocTotal, bluePct, goldPct, greenPct]);

  const exportText = () => {
    const lines: Record<TabId, string> = {
      compound: `Compound Growth: $${principal.toLocaleString()} at ${rate}% for ${years}y = $${results.compound.toFixed(0)} (+$${results.compoundGain.toFixed(0)})`,
      drawdown: `Drawdown Recovery: ${drawdown}% loss requires +${results.recovery.toFixed(1)}% gain to recover`,
      position: `Position Size: $${results.riskAmount.toFixed(0)} risk / $${stopLoss} stop = ${results.positionSize.toFixed(2)} lots`,
      rr: `Risk/Reward: ${results.rr.toFixed(2)}:1 (Risk: $${results.risk}, Reward: $${results.reward})`,
      allocation: `Allocation: Blue $${results.blue.toFixed(0)} | Gold $${results.gold.toFixed(0)} | Green $${results.green.toFixed(0)}`,
    };
    navigator.clipboard.writeText(lines[tab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="pt-28 pb-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeader label="Tools" title="Investor Calculators" description="Professional-grade calculators for portfolio planning and risk analysis." align="left" />

        <div className="flex flex-wrap gap-2 mb-8">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                "px-4 py-2 rounded-lg text-xs font-medium uppercase tracking-wide transition-colors",
                tab === t.id ? "bg-accent text-white dark:text-primary" : "bg-primary/50 text-muted border border-border hover:text-foreground"
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-base">
              <Calculator className="h-5 w-5 text-accent" />
              {TABS.find((t) => t.id === tab)?.label}
            </CardTitle>
            <Button variant="outline" size="sm" onClick={exportText}>
              {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
              {copied ? "Copied" : "Export"}
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            {tab === "compound" && (
              <>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div><Label>Principal ($)</Label><Input type="number" value={principal} onChange={(e) => setPrincipal(+e.target.value)} className="mt-1" /></div>
                  <div><Label>Annual Rate (%)</Label><Input type="number" value={rate} onChange={(e) => setRate(+e.target.value)} className="mt-1" /></div>
                  <div><Label>Years</Label><Input type="number" value={years} onChange={(e) => setYears(+e.target.value)} className="mt-1" /></div>
                </div>
                <ResultBox label="Future Value" value={`$${results.compound.toLocaleString(undefined, { maximumFractionDigits: 0 })}`} />
                <ResultBox label="Total Gain" value={`+$${results.compoundGain.toLocaleString(undefined, { maximumFractionDigits: 0 })}`} positive />
              </>
            )}
            {tab === "drawdown" && (
              <>
                <div><Label>Drawdown (%)</Label><Input type="number" value={drawdown} onChange={(e) => setDrawdown(+e.target.value)} className="mt-1 max-w-xs" /></div>
                <ResultBox label="Recovery Required" value={`+${results.recovery.toFixed(1)}%`} />
                <p className="text-xs text-muted">A {drawdown}% drawdown requires a {results.recovery.toFixed(1)}% gain to return to breakeven.</p>
              </>
            )}
            {tab === "position" && (
              <>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div><Label>Account Size ($)</Label><Input type="number" value={account} onChange={(e) => setAccount(+e.target.value)} className="mt-1" /></div>
                  <div><Label>Risk per Trade (%)</Label><Input type="number" value={riskPct} onChange={(e) => setRiskPct(+e.target.value)} className="mt-1" /></div>
                  <div><Label>Stop Loss (pips/$)</Label><Input type="number" value={stopLoss} onChange={(e) => setStopLoss(+e.target.value)} className="mt-1" /></div>
                </div>
                <ResultBox label="Risk Amount" value={`$${results.riskAmount.toFixed(0)}`} />
                <ResultBox label="Position Size" value={`${results.positionSize.toFixed(2)} lots`} positive />
              </>
            )}
            {tab === "rr" && (
              <>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div><Label>Entry</Label><Input type="number" value={entry} onChange={(e) => setEntry(+e.target.value)} className="mt-1" /></div>
                  <div><Label>Stop Loss</Label><Input type="number" value={stop} onChange={(e) => setStop(+e.target.value)} className="mt-1" /></div>
                  <div><Label>Target</Label><Input type="number" value={target} onChange={(e) => setTarget(+e.target.value)} className="mt-1" /></div>
                </div>
                <ResultBox label="Risk/Reward Ratio" value={`${results.rr.toFixed(2)}:1`} positive />
              </>
            )}
            {tab === "allocation" && (
              <>
                <div><Label>Total Portfolio ($)</Label><Input type="number" value={allocTotal} onChange={(e) => setAllocTotal(+e.target.value)} className="mt-1 max-w-xs" /></div>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div><Label>Prysm Blue (%)</Label><Input type="number" value={bluePct} onChange={(e) => setBluePct(+e.target.value)} className="mt-1" /></div>
                  <div><Label>Prysm Gold (%)</Label><Input type="number" value={goldPct} onChange={(e) => setGoldPct(+e.target.value)} className="mt-1" /></div>
                  <div><Label>Prysm Green (%)</Label><Input type="number" value={greenPct} onChange={(e) => setGreenPct(+e.target.value)} className="mt-1" /></div>
                </div>
                <div className="grid sm:grid-cols-3 gap-3">
                  <ResultBox label="Prysm Blue" value={`$${results.blue.toLocaleString(undefined, { maximumFractionDigits: 0 })}`} />
                  <ResultBox label="Prysm Gold" value={`$${results.gold.toLocaleString(undefined, { maximumFractionDigits: 0 })}`} />
                  <ResultBox label="Prysm Green" value={`$${results.green.toLocaleString(undefined, { maximumFractionDigits: 0 })}`} />
                </div>
                {results.totalPct !== 100 && (
                  <p className="text-xs text-amber-400">Allocation totals {results.totalPct}% (should equal 100%)</p>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ResultBox({ label, value, positive }: { label: string; value: string; positive?: boolean }) {
  return (
    <div className="rounded-xl border border-accent/20 bg-accent/5 p-6 text-center">
      <p className="text-xs text-muted uppercase tracking-wider mb-1">{label}</p>
      <p className={`text-2xl font-bold ${positive ? "text-success" : "text-foreground"}`}>{value}</p>
    </div>
  );
}
