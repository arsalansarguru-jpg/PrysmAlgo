import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { IR_COMMUNICATIONS } from "@/data/capital-v7/ir-communications";
import { getIrBySlug } from "@/lib/capital-v7/services";
import { IR_CATEGORY_LABELS, type IrCategory } from "@/types/capital-v7";
import { Button } from "@/components/ui/button";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return IR_COMMUNICATIONS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const comm = await getIrBySlug(slug);
  if (!comm) return { title: "Not Found" };
  return { title: comm.title, description: comm.summary };
}

export default async function IrDetailPage({ params }: Props) {
  const { slug } = await params;
  const comm = await getIrBySlug(slug);
  if (!comm) notFound();

  return (
    <div className="pt-28 pb-24">
      <div className="mx-auto max-w-3xl px-4">
        <Button variant="ghost" size="sm" asChild className="mb-6"><Link href="/ir">← Back to IR Center</Link></Button>
        <span className="text-xs uppercase tracking-wider text-accent">{IR_CATEGORY_LABELS[comm.category as IrCategory]}</span>
        <h1 className="font-display text-3xl font-bold text-foreground mt-2 mb-4">{comm.title}</h1>
        <p className="text-sm text-muted mb-8">{new Date(comm.publishedAt).toLocaleDateString()} · {comm.author}</p>
        <div className="max-w-none text-muted leading-relaxed whitespace-pre-line">{comm.body}</div>
      </div>
    </div>
  );
}
