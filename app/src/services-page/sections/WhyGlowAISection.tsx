import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, Brain, Scissors, Diamond } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Sparkles,
    title: "Personalized Recommendations",
    description:
      "Beauty advice tailored to your unique features, preferences, and goals",
  },
  {
    icon: Brain,
    title: "AI-Powered Insights",
    description:
      "Cutting-edge artificial intelligence analyzes your beauty profile with precision",
  },
  {
    icon: Scissors,
    title: "Expert Salon Network",
    description:
      "Connect with verified, top-rated salons and beauty professionals near you",
  },
  {
    icon: Diamond,
    title: "Luxury Beauty Experience",
    description:
      "Enjoy a seamless, premium journey from consultation to transformation",
  },
];

export default function WhyGlowAISection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const columns = sectionRef.current.querySelectorAll(".feature-column");
    gsap.fromTo(
      columns,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="bg-white py-[100px]">
      <div className="max-w-[1200px] mx-auto px-5 lg:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-10">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="feature-column text-center flex flex-col items-center"
              >
                <Icon
                  size={40}
                  strokeWidth={1}
                  className="text-black mb-5"
                />
                <h4 className="font-display text-xl lg:text-2xl font-normal text-black mb-3">
                  {feature.title}
                </h4>
                <p className="font-body text-[15px] font-light text-body leading-[1.6]">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
