import type { MarketWidget } from "@/types/intelligence";

export const MARKET_WIDGETS: MarketWidget[] = [
  { id: "xauusd", symbol: "XAU/USD", name: "Gold", price: 2342.5, change: 12.3, changePct: 0.53, category: "commodity" },
  { id: "eurusd", symbol: "EUR/USD", name: "Euro", price: 1.0842, change: -0.0012, changePct: -0.11, category: "forex" },
  { id: "dxy", symbol: "DXY", name: "US Dollar Index", price: 104.32, change: 0.18, changePct: 0.17, category: "forex" },
  { id: "wti", symbol: "WTI", name: "Oil", price: 78.45, change: -0.62, changePct: -0.78, category: "commodity" },
  { id: "ndx", symbol: "NDX", name: "Nasdaq 100", price: 18234.5, change: 124.8, changePct: 0.69, category: "index" },
  { id: "spx", symbol: "SPX", name: "S&P 500", price: 5234.2, change: 28.4, changePct: 0.55, category: "index" },
  { id: "vix", symbol: "VIX", name: "Volatility Index", price: 14.82, change: -0.34, changePct: -2.24, category: "volatility" },
];

export const ECONOMIC_CALENDAR = [
  { time: "08:30 EST", event: "US CPI MoM", impact: "High", forecast: "0.3%", previous: "0.4%" },
  { time: "10:00 EST", event: "Fed Chair Speech", impact: "High", forecast: "—", previous: "—" },
  { time: "14:00 EST", event: "FOMC Minutes", impact: "High", forecast: "—", previous: "—" },
  { time: "02:00 EST", event: "ECB Rate Decision", impact: "High", forecast: "4.50%", previous: "4.50%" },
];

export const MARKET_COMMENTARY = "Risk-on sentiment persists as US equities extend gains while gold consolidates near $2,340. EUR/USD remains range-bound ahead of ECB. Prysm systematic models flag low-volatility regime with elevated event risk window.";

export const AI_INSIGHTS = [
  { title: "Regime: Low Volatility", body: "VIX below 15 suggests compression phase. Historical precedents show 68% probability of volatility expansion within 14 days.", confidence: 72 },
  { title: "Gold Structure", body: "XAU/USD holding above 200-day MA. Prysm Gold strategy maintains long bias with tightened stop protocols.", confidence: 81 },
  { title: "Forex Flow", body: "EUR/USD order flow indicates institutional accumulation near 1.0820 support zone.", confidence: 65 },
];

export const MACRO_ALERTS = [
  { level: "high", message: "FOMC minutes release — systematic strategies reducing pre-event exposure by 15%." },
  { level: "medium", message: "Gold volatility compressing — Prysm Gold position sizing normalized." },
  { level: "low", message: "USD index stable — no regime shift detected across Prysm Blue models." },
];

export const MARKET_REGIME = {
  current: "Low Volatility / Risk-On",
  previous: "Transitional",
  confidence: 78,
  description: "Multi-factor regime model indicates sustained low-vol environment with event-risk overlay for central bank week.",
};
