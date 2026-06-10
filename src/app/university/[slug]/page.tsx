import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createMetadata } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { Button } from "@/components/ui/button";
import { UNIVERSITY_COURSES, getCourse } from "@/data/intelligence/university";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return UNIVERSITY_COURSES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const c = getCourse(slug);
  if (!c) return { title: "Not Found" };
  return createMetadata({ title: c.title, description: c.description, path: `/university/${c.slug}` });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();

  return (
    <div className="pt-28 pb-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: "University", path: "/university" }, { name: course.title, path: `/university/${course.slug}` }]} />
        <h1 className="font-display text-3xl font-bold text-foreground mb-4">{course.title}</h1>
        <p className="text-muted mb-6">{course.description}</p>
        <div className="flex gap-4 text-sm text-muted mb-8">
          <span>{course.modules} modules</span>
          <span>{course.duration}</span>
          <span>{course.level}</span>
          {course.certificate && <span className="text-accent">Certificate included</span>}
        </div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Curriculum</h2>
        <div className="space-y-3 mb-8">
          {course.lessons.map((l, i) => (
            <div key={l.title} className="flex justify-between rounded-lg border border-border p-4 text-sm">
              <span className="text-foreground">{i + 1}. {l.title}</span>
              <span className="text-muted">{l.duration}</span>
            </div>
          ))}
        </div>
        <Button>Start Course</Button>
        <Button asChild variant="outline" className="ml-3"><Link href="/university">← All Courses</Link></Button>
      </div>
    </div>
  );
}
