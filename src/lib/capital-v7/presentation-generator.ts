import { getLivePerformance } from "@/lib/performance/service";
import { PRYSM_STRATEGIES } from "@/data/strategies";
import { FOUNDER, SITE_CONFIG } from "@/lib/constants";

export async function generatePresentationHtml(): Promise<string> {
  const perf = await getLivePerformance();
  const m = perf.metrics;
  const strategies = PRYSM_STRATEGIES.map((s) =>
    `<tr><td>${s.name}</td><td>+${s.totalReturn}%</td><td>${s.maxDrawdown}%</td><td>${s.winRate}%</td></tr>`
  ).join("");

  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>PrysmAlgo Investor Presentation</title>
<style>
  body{font-family:system-ui,sans-serif;background:#0a0a0f;color:#fff;padding:40px;max-width:900px;margin:0 auto}
  h1{color:#9D4EDD;font-size:2rem} h2{color:#E040FB;margin-top:2rem;border-bottom:1px solid #333;padding-bottom:8px}
  table{width:100%;border-collapse:collapse;margin:1rem 0} td,th{padding:10px;border:1px solid #333;text-align:left}
  th{background:#1A0A2E;color:#9D4EDD}
  .metric{display:inline-block;margin:10px 20px 10px 0;padding:15px 20px;background:#1A0A2E;border-radius:8px}
  .metric strong{display:block;font-size:1.5rem;color:#4ADE80}
  @media print{body{padding:20px}}
</style></head><body>
<h1>PRYSMALGO — Institutional Investor Presentation</h1>
<p>${SITE_CONFIG.tagline}</p>
<p><em>${FOUNDER.name}, ${FOUNDER.title}</em></p>

<h2>Performance Overview</h2>
<div class="metric"><strong>+${m.totalReturn}%</strong>Total Return</div>
<div class="metric"><strong>${m.maxDrawdown}%</strong>Max Drawdown</div>
<div class="metric"><strong>${m.winRate}%</strong>Win Rate</div>
<div class="metric"><strong>${m.profitFactor}</strong>Profit Factor</div>

<h2>Strategy Track Records</h2>
<table><tr><th>Strategy</th><th>Return</th><th>Max DD</th><th>Win Rate</th></tr>${strategies}</table>

<h2>Risk Management</h2>
<p>Multi-layer drawdown control, position sizing, regime detection, and emergency shutdown logic.</p>

<h2>Investment Philosophy</h2>
<p>Capital preservation first. Disciplined systematic execution. Institutional-grade transparency.</p>

<p style="margin-top:3rem;font-size:0.8rem;color:#666">${SITE_CONFIG.email} · ${SITE_CONFIG.url}</p>
</body></html>`;
}
