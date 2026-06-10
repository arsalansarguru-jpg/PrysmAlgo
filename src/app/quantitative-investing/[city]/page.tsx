import { ProgrammaticCityRoute, getCityMetadata } from "@/components/authority/programmatic-city-route";
import { PROGRAMMATIC_CITIES } from "@/data/programmatic-cities";

interface Props {
  params: Promise<{ city: string }>;
}

export async function generateStaticParams() {
  return PROGRAMMATIC_CITIES.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { city } = await params;
  return getCityMetadata("quantitative-investing", city);
}

export default async function Page({ params }: Props) {
  const { city } = await params;
  return <ProgrammaticCityRoute vertical="quantitative-investing" citySlug={city} />;
}
