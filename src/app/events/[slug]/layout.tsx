import { IR_EVENTS } from "@/data/capital-v7/events";

export function generateStaticParams() {
  return IR_EVENTS.map((e) => ({ slug: e.slug }));
}

export default function EventLayout({ children }: { children: React.ReactNode }) {
  return children;
}
