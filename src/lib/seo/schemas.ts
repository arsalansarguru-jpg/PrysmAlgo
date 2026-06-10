import { SITE_CONFIG, FOUNDER } from "@/lib/constants";

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_CONFIG.url}/#organization`,
    name: SITE_CONFIG.name,
    legalName: "Noble Technologies LLP",
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/logo.png`,
    image: `${SITE_CONFIG.url}/logo.png`,
    description: SITE_CONFIG.description,
    email: SITE_CONFIG.email,
    telephone: SITE_CONFIG.phoneTel,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_CONFIG.address,
      addressLocality: "Mumbai",
      addressRegion: "Maharashtra",
      postalCode: "400008",
      addressCountry: "IN",
    },
    founder: {
      "@type": "Person",
      name: FOUNDER.name,
      jobTitle: FOUNDER.title,
      image: `${SITE_CONFIG.url}${FOUNDER.image}`,
    },
    sameAs: [
      SITE_CONFIG.linkedin,
      SITE_CONFIG.facebook,
      SITE_CONFIG.instagram,
    ],
    areaServed: ["IN", "AE", "US", "GB", "SG"],
  };
}

export function financialServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "@id": `${SITE_CONFIG.url}/#financialservice`,
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/logo.png`,
    image: `${SITE_CONFIG.url}/logo.png`,
    email: SITE_CONFIG.email,
    telephone: SITE_CONFIG.phoneTel,
    priceRange: "$$$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_CONFIG.address,
      addressLocality: "Mumbai",
      addressCountry: "IN",
    },
    areaServed: [
      { "@type": "Country", name: "India" },
      { "@type": "Country", name: "United Arab Emirates" },
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "United Kingdom" },
      { "@type": "Place", name: "Worldwide" },
    ],
    serviceType: [
      "Algorithmic Trading Technology",
      "AI Trading Solutions",
      "Quantitative Investment Management",
      "Risk Management Systems",
    ],
    provider: { "@id": `${SITE_CONFIG.url}/#organization` },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_CONFIG.url}/#website`,
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    description: SITE_CONFIG.description,
    publisher: { "@id": `${SITE_CONFIG.url}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_CONFIG.url}/blog?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_CONFIG.url}${item.path}`,
    })),
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function articleSchema(article: {
  title: string;
  description: string;
  slug: string;
  date: string;
  author: string;
  category: string;
  image?: string;
  pathPrefix?: string;
}) {
  const pathPrefix = article.pathPrefix ?? "/blog";
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    author: {
      "@type": "Organization",
      name: article.author,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_CONFIG.url}/logo.png`,
      },
    },
    datePublished: article.date,
    dateModified: article.date,
    mainEntityOfPage: `${SITE_CONFIG.url}${pathPrefix}/${article.slug}`,
    image: article.image || `${SITE_CONFIG.url}/og-image.svg`,
    articleSection: article.category,
  };
}

export function definedTermSchema(term: {
  term: string;
  definition: string;
  slug: string;
  category: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: term.term,
    description: term.definition,
    url: `${SITE_CONFIG.url}/glossary/${term.slug}`,
    inDefinedTermSet: {
      "@type": "DefinedTermSet",
      name: "PrysmAlgo Investor Glossary",
      url: `${SITE_CONFIG.url}/glossary`,
    },
    termCode: term.slug,
  };
}

export function newsArticleSchema(article: {
  title: string;
  description: string;
  slug: string;
  date: string;
  author: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    dateModified: article.date,
    author: { "@type": "Organization", name: article.author },
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      logo: { "@type": "ImageObject", url: `${SITE_CONFIG.url}/logo.png` },
    },
    mainEntityOfPage: `${SITE_CONFIG.url}/news/${article.slug}`,
  };
}

export function globalSchemas() {
  return [organizationSchema(), financialServiceSchema(), websiteSchema()];
}
