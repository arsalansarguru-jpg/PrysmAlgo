export type Locale = "en" | "ar" | "hi" | "mr";

export const SUPPORTED_LOCALES: { code: Locale; label: string; dir: "ltr" | "rtl" }[] = [
  { code: "en", label: "English", dir: "ltr" },
  { code: "ar", label: "العربية", dir: "rtl" },
  { code: "hi", label: "हिन्दी", dir: "ltr" },
  { code: "mr", label: "मराठी", dir: "ltr" },
];

const STRINGS: Record<Locale, Record<string, string>> = {
  en: {
    "nav.portal": "Investor Portal",
    "nav.ir": "Investor Relations",
    "nav.data_room": "Data Room",
    "nav.apply": "Apply",
    "dashboard.aum": "AUM",
    "dashboard.growth": "Growth",
  },
  ar: {
    "nav.portal": "بوابة المستثمر",
    "nav.ir": "علاقات المستثمرين",
    "nav.data_room": "غرفة البيانات",
    "nav.apply": "تقديم طلب",
    "dashboard.aum": "الأصول المُدارة",
    "dashboard.growth": "النمو",
  },
  hi: {
    "nav.portal": "निवेशक पोर्टल",
    "nav.ir": "निवेशक संबंध",
    "nav.data_room": "डेटा रूम",
    "nav.apply": "आवेदन करें",
    "dashboard.aum": "AUM",
    "dashboard.growth": "वृद्धि",
  },
  mr: {
    "nav.portal": "गुंतवणूकदार पोर्टल",
    "nav.ir": "गुंतवणूकदार संबंध",
    "nav.data_room": "डेटा रूम",
    "nav.apply": "अर्ज करा",
    "dashboard.aum": "AUM",
    "dashboard.growth": "वाढ",
  },
};

export function t(key: string, locale: Locale = "en"): string {
  return STRINGS[locale]?.[key] ?? STRINGS.en[key] ?? key;
}

export function getLocaleFromHeaders(acceptLanguage?: string): Locale {
  if (!acceptLanguage) return "en";
  if (acceptLanguage.includes("ar")) return "ar";
  if (acceptLanguage.includes("hi")) return "hi";
  if (acceptLanguage.includes("mr")) return "mr";
  return "en";
}
