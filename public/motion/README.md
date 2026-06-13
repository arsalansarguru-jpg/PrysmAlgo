# /public/motion — Motion & 3D asset library

Drop authored assets here. Wrapper components in `src/components/motion/` load
them with lazy/dynamic imports and graceful code-native fallbacks. See
`docs/MOTION_DESIGN_SYSTEM.md` for the full architecture.

| Folder | Format | Used by | Budget |
| --- | --- | --- | --- |
| `spline/` | `.splinecode` | `SplineScene` (hero core, blue engine, market universe, risk shield) | < 1.5 MB / scene |
| `rive/` | `.riv` | `RiveAnimation` (nav, investor journey, dashboard metrics, assessment) | optimized |
| `lottie/` | `.json` / `.lottie` | `LottieIcon` (performance, risk, research, …) | compressed, 2–3s loops |
| `illustrations/` | `.svg` / `.png` | enterprise illustration system (dark-mode compatible) | — |

Until real assets exist, the components render performant fallbacks
(`AmbientGradient`, `CapitalNetworkCore`, animated Lucide SVGs), so the
experience is complete with zero extra bundle weight.
