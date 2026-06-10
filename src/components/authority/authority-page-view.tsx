import { SeoContentPageView } from "@/components/seo/seo-content-page";
import { RelatedContent } from "./related-content";
import { getRelatedContent } from "@/lib/seo/internal-linking";
import type { AuthorityPage } from "@/types/content";

interface Props {
  page: AuthorityPage;
  basePath: string;
}

export function AuthorityPageView({ page, basePath }: Props) {
  const related = getRelatedContent({ slug: page.slug, category: page.category, keywords: page.keywords, type: "authority" });

  return (
    <>
      <SeoContentPageView
        page={page}
        basePath={basePath}
        breadcrumbPrefix={{ name: "Authority", path: "/why-prysmalgo" }}
        showLeadCapture
      />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 -mt-12 pb-24">
        <RelatedContent related={related} />
      </div>
    </>
  );
}
