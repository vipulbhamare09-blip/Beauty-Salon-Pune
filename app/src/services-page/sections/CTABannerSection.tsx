import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GoldLine from "@services/components/GoldLine";
import BlackButton from "@services/components/BlackButton";

gsap.registerPlugin(ScrollTrigger);

export default function CTABannerSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const elements = sectionRef.current.querySelectorAll("[data-animate]");
    gsap.fromTo(
      elements,
      { opacity: 0, y: 24 },
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
    <section
      ref={sectionRef}
      className="bg-pink py-[100px] text-center"
    >
      <div className="max-w-[800px] mx-auto px-5 lg:px-10">
        <div data-animate className="flex justify-center mb-5">
          <GoldLine centered />
        </div>
        <h2
          data-animate
          className="font-display text-[32px] lg:text-[48px] font-normal text-black leading-[1.2] tracking-[-0.5px]"
        >
          Ready To Discover Your Best Look?
        </h2>
        <p
          data-animate
          className="font-body text-base font-light text-body mt-5 max-w-[600px] mx-auto"
        >
          Experience AI-powered beauty recommendations designed specifically for
          you. Let our technology guide you to your most beautiful self.
        </p>
        <div data-animate className="mt-9">
          <BlackButton>START YOUR BEAUTY JOURNEY</BlackButton>
        </div>
      </div>
    </section>
  );
}
