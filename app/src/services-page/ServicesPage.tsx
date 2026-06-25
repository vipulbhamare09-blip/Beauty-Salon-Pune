import SEO from '@/components/system/SEO';
import Footer from "@services/components/Footer";
import HeroSection from "@services/sections/HeroSection";
import AIServicesSections from "@services/sections/AIServicesSections";
import TransformationsSection from "@services/sections/TransformationsSection";
import WhyGlowAISection from "@services/sections/WhyGlowAISection";
import './services-page.css';

export default function ServicesPage() {
  return (
    <main className="services-page min-h-screen">
      <SEO title="Services & AI Experiences" description="Explore our suite of premium AI-powered beauty modules." />
      <div>
        <HeroSection />
        <AIServicesSections />
        <TransformationsSection />
        <WhyGlowAISection />
      </div>
      <Footer />
    </main>
  );
}
