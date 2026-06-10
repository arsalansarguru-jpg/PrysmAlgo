import { CountryLandingRoute, getCountryMetadata } from "@/components/growth/country-landing-route";
export const metadata = getCountryMetadata("ai-trading-uae");
export default function Page() {
  return <CountryLandingRoute slug="ai-trading-uae" />;
}
