import { HeroSection } from "@/components/home/hero-section";
import { TrustBar } from "@/components/home/trust-bar";
import { PerformanceOverview } from "@/components/home/performance-overview";
import { WhyPrysmAlgo } from "@/components/home/why-prysmalgo";
import { HowItWorks } from "@/components/home/how-it-works";
import { BlueEngine } from "@/components/home/blue-engine";
import { RiskManagementSection } from "@/components/home/risk-management-section";
import { Testimonials } from "@/components/home/testimonials";
import { PrysmStrategies } from "@/components/home/prysm-strategies";
import { FounderStory } from "@/components/home/founder-story";
import { FaqSection } from "@/components/home/faq-section";
import { FinalCta } from "@/components/home/final-cta";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <PerformanceOverview />
      <WhyPrysmAlgo />
      <HowItWorks />
      <BlueEngine />
      <RiskManagementSection />
      <Testimonials />
      <PrysmStrategies />
      <FounderStory />
      <FaqSection />
      <FinalCta />
    </>
  );
}
