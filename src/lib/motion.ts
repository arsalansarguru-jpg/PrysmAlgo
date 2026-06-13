/**
 * Shared scroll-reveal configuration for Framer Motion `whileInView` sections.
 *
 * The 200px bottom rootMargin pre-triggers the animation just before a section
 * scrolls into view, which prevents the "blank black gap" / "black screen on
 * scroll_to" issues where opacity:0 content never became visible until the
 * viewport crossed an exact threshold.
 */
export const REVEAL_VIEWPORT = {
  once: true,
  amount: 0.15,
  margin: "0px 0px 200px 0px",
} as const;

/** Cap staggered reveal delays so late items (e.g. step 6) never stay dimmed. */
export function revealDelay(index: number, step = 0.08, max = 0.32) {
  return Math.min(index * step, max);
}
