import { redirect } from "next/navigation";
import { resourcePages } from "@/data/seo-silos";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return resourcePages.map((p) => ({ slug: p.slug }));
}

export default async function LegacyResourceRedirect({ params }: Props) {
  const { slug } = await params;
  redirect(`/learn/${slug}`);
}
