import { Button } from "@/components/ui/button";
import HeroSection from "../components/home/herosection";
import BgGradient from "../components/common/bg-gradient";
import DemoSection from "../components/home/demo-section";
import HowItWorksSection from "../components/home/how-it-works-section";
import PricingSection from '../components/home/pricing-section';
import CTASection from '../components/home/cta-section';

export default function Home() {
  return (
    <div className="relative w-full">
      <BgGradient/>
        <div className="flex flex-col">
          <HeroSection />
          <DemoSection />
          <HowItWorksSection />
          <PricingSection />
          <CTASection />
        </div>
    
    </div>
  );
}
