import { CountryLandingRoute, getCountryMetadata } from "@/components/growth/country-landing-route";
export const metadata = getCountryMetadata("algorithmic-trading-dubai");
export default function Page() {
  return <CountryLandingRoute slug="algorithmic-trading-dubai" />;
}
