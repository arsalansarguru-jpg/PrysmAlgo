export interface SeoContentPage {
  slug: string;
  title: string;
  description: string;
  category: string;
  keywords: string[];
  sections: { heading: string; paragraphs: string[] }[];
  faqs: { question: string; answer: string }[];
  internalLinks: { href: string; label: string }[];
}

export interface BlogArticle {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  keywords: string[];
  sections: { heading: string; paragraphs: string[] }[];
  faqs: { question: string; answer: string }[];
  internalLinks: { href: string; label: string }[];
  featuredImagePrompt: string;
}
