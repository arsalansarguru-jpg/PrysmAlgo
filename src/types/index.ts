export interface PerformanceMetric {
  label: string;
  value: string;
  change?: string;
  positive?: boolean;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  startingCapital: number;
  riskProfile: string;
  duration: string;
  growth: number;
  description: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface ApplicationFormData {
  name: string;
  email: string;
  phone: string;
  country: string;
  investmentAmount: string;
  experience: string;
  riskTolerance: string;
  goals: string;
  message: string;
  signatureName: string;
  declarationsAccepted: boolean;
  riskDisclosureAccepted: boolean;
  consentMarketing: boolean;
}
