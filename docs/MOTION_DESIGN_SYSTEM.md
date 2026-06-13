# PrysmAlgo V8 — Institutional Motion Design System

A motion-first visual upgrade that makes PrysmAlgo feel like a hybrid of
Bloomberg Terminal, Apple Vision Pro, BlackRock, Stripe, Linear, Ramp and
Vercel. Every animation must increase **trust, precision, stability and
risk-awareness** — never "get-rich-quick", casino, or crypto-neon energy.

> **Hard constraint:** this layer only upgrades *visual quality + motion*. It
> does **not** change architecture, SEO, CRM, routes, or business logic.

---

## 1. Design language

| Principle | Expression |
| --- | --- |
| Intelligence | Connected data networks, signal streams, neural pathways |
| Stability | Slow, decelerating motion; nothing snaps or bounces hard |
| Precision | Short travel distances, exact easing, aligned grids |
| Risk management | Central "risk engine" pulse, shields, drawdown filters |
| Institutional trust | Glassmorphism, deep space, restrained gold/cyan accents |

**Ambient palette** (CSS vars in `globals.css`): deep navy `--ambient-navy`,
graphite `--ambient-graphite`, cyan highlight `--ambient-cyan`, subtle gold
`--ambient-gold`. Brand violet remains the primary accent.

---

## 2. Animation token system

Source of truth: [`src/lib/motion-tokens.ts`](../src/lib/motion-tokens.ts)
(re-exported from `src/lib/motion.ts`).

- **EASING** — `standard`, `entrance`, `emphasized`, `ambient` cubic-beziers.
- **DURATION** — `micro 0.16s`, `fast 0.28s`, `base 0.6s`, `slow 0.9s`,
  `ambient 18s`.
- **DISTANCE** — `sm 12 / md 24 / lg 40` px travel.
- **Variants** — `fadeUp`, `fadeIn`, `scaleIn`, `depthIn` (blur+scale),
  `staggerContainer()`, `hoverLift`.
- **Scroll reveal** — `REVEAL_VIEWPORT` (pre-triggers 200px early, `amount 0.15`,
  `once`) + `revealDelay(i)` (caps stagger so late items never stay dimmed).

**Rules:** entrances decelerate and are subtle; ambient motion is
near-imperceptible and long; hover/press is fast (≤260ms) and small (≤4px /
≤3% scale). Everything honors `prefers-reduced-motion` (global guard in
`globals.css`, plus `useReducedMotion()` in canvas/JS animations).

---

## 3. Component architecture (`src/components/motion/`)

| Component | Role | Status |
| --- | --- | --- |
| `AmbientGradient` | Code-native "ShaderGradient" background (drifting radial layers + grid + vignette) | ✅ live |
| `CapitalNetworkCore` | Canvas "AI Trading Core": data nodes, pathways, signal streams, risk-engine pulse, pointer parallax | ✅ live |
| `CapitalNetworkCoreLazy` | `dynamic(ssr:false)` wrapper for the canvas | ✅ live |
| `SplineScene` | Spline scaffold; renders the canvas core as fallback | 🔌 scaffold |
| `RiveAnimation` | Rive scaffold (nav states, journey, metrics, assessment) | 🔌 scaffold |
| `LottieIcon` | Animated icon system (10 named icons) with gentle SVG fallback | ✅ live (SVG) |

**Updated primitives:** `Button` (sheen sweep + lift + press), `Card`
(`interactive` hover elevation/glow), `Skeleton` (shimmer surface).

### Spline scene architecture (when assets are authored)
1. **Homepage Hero** → *Interactive AI Trading Core* (floating nodes, capital
   network, neural pathways, signal streams, risk engine). Subtle parallax only.
2. **Blue Engine** → *3D AI Engine* with glass layers: Data Ingestion → Signal
   Generation → Risk Filtering → Execution → Portfolio, animated flow paths.
3. **Market Terminal** → *3D Market Universe* (Gold, Forex, DXY, S&P, Nasdaq,
   macro) with live relationship links.
4. **Capital Preservation Hub** → *3D Risk Shield* (capital, risk, protection
   layers, drawdown filters, emergency controls).

Enable: `npm i @splinetool/react-spline`, then follow the inline instructions in
`spline-scene.tsx`. Host `.splinecode` under `/public/motion/spline`. Always
lazy + below ambient layers; budget < 1.5 MB/scene.

### Rive animation architecture
- **Navigation** — hover/active state transitions.
- **Investor Journey** — Visitor → Lead → Qualified → Investor → Active Client.
- **Dashboard Metrics** — counters, performance/risk/trust score cards.
- **Investor Assessment** — quiz states, progress, professional completion.

Enable: `npm i @rive-app/react-canvas`, follow `rive-animation.tsx`. Assets in
`/public/motion/rive`.

### Lottie asset mapping
`LottieIcon name=` → `performance, risk, research, transparency, security,
portal, academy, community, partners, trust`. 2–3s gentle loops, dark-mode
friendly. Enable real assets: `npm i @lottiefiles/dotlottie-react`, follow
`lottie-icon.tsx`; compressed assets in `/public/motion/lottie`.

### Illustration system (Icons8 / enterprise)
Consistent, premium, dark-compatible illustrations for: Risk Management,
Investor Education, Portfolio Analytics, Capital Preservation, Research, AI
Systems, Global Investors, Institutional Reporting. Store SVG/PNG in
`/public/motion/illustrations`; render via existing `next/image`.

---

## 4. ShaderGradient implementation

Code-native today via `AmbientGradient` (CSS radial layers + `ambient-drift`
keyframes + grid + vignette) — zero JS cost. Apply to Homepage, Research
Institute, Market Terminal, Investor Portal, Daily Briefing by mounting
`<AmbientGradient />` as the first child of the section (`relative` parent).
Swap in a real WebGL/ShaderGradient scene later via `<SplineScene>` behind it
without layout changes.

---

## 5. Scroll & micro-interactions

- **Sections:** fade / scale / parallax / depth via the token variants +
  `REVEAL_VIEWPORT`. No excessive movement.
- **Buttons:** sheen sweep + 1px lift + press scale.
- **Cards:** `interactive` elevation + glow.
- **Charts:** progressive reveal (Recharts) — equity curve renders fully (no
  partial-draw artifact).
- **Loading:** skeleton + shimmer.

---

## 6. Asset folder structure

```
public/motion/
  spline/         # .splinecode scenes (hero core, blue engine, market, shield)
  rive/           # .riv assets (nav, journey, metrics, assessment)
  lottie/         # .json / .lottie animated icons
  illustrations/  # enterprise SVG/PNG illustration system
src/components/motion/
  ambient-gradient.tsx
  capital-network-core.tsx (+ -lazy)
  spline-scene.tsx · rive-animation.tsx · lottie-icon.tsx · index.ts
src/lib/
  motion-tokens.ts · motion.ts
```

---

## 7. Performance optimization plan

Targets: **Desktop 60 FPS, Mobile 45 FPS, Lighthouse 95+.**

- **Lazy everything heavy:** canvas + future Spline/Rive via `dynamic(ssr:false)`;
  nothing animation-related is in the critical bundle.
- **Canvas budget:** DPR capped at 2; node count scales with area (14–36);
  paused via `IntersectionObserver` when offscreen; single static frame under
  reduced motion; full teardown on unmount.
- **GPU compositing:** ambient layers use the `.gpu` hint (`translateZ(0)` +
  `will-change`); animate only `transform`/`opacity`.
- **CSS-first ambient:** the ShaderGradient is pure CSS (no WebGL cost).
- **Reduced motion:** global media-query guard disables non-essential motion.
- **Asset budgets:** Spline < 1.5 MB/scene, Lottie compressed, Rive optimized;
  host locally under `/public/motion` and cache-control immutable.
- **Verify:** `npm run build` + Lighthouse on `/`; watch First Load JS for `/`.
