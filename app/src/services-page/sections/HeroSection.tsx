import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router";
import GoldLine from "@services/components/GoldLine";
import BlackButton from "@services/components/BlackButton";

import img1 from "C:/Users/Vipul Bhamare/Downloads/Gemini_Generated_Image_yi8ef7yi8ef7yi8e.png";
import img2 from "C:/Users/Vipul Bhamare/Downloads/Gemini_Generated_Image_yj0ctyj0ctyj0cty.png";
import img3 from "C:/Users/Vipul Bhamare/Downloads/Gemini_Generated_Image_gu77nkgu77nkgu77.png";
import img4 from "C:/Users/Vipul Bhamare/Downloads/Gemini_Generated_Image_rmw1ugrmw1ugrmw1.png";

const serviceHeroImages = [img1, img2, img3, img4];

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? serviceHeroImages.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === serviceHeroImages.length - 1 ? 0 : prev + 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === serviceHeroImages.length - 1 ? 0 : prev + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useGSAP(() => {
    if (!contentRef.current || !imageContainerRef.current) return;

    // Parallax effect on background container
    gsap.to(imageContainerRef.current, {
      yPercent: -15,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    // Staggered content entrance on page load
    const elements = contentRef.current.querySelectorAll("[data-hero]");
    gsap.fromTo(
      elements,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.2,
        ease: "power2.out",
        delay: 0.3,
      }
    );
  }, { scope: heroRef });

  return (
    <section
      ref={heroRef}
      className="relative w-full min-h-[100dvh] overflow-hidden flex items-center justify-center bg-black"
    >
      {/* Background Images */}
      <div ref={imageContainerRef} className="absolute top-0 left-0 w-full h-[120%] z-0">
        {serviceHeroImages.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Service Hero ${index + 1}`}
            loading="eager"
            decoding="async"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[800ms] ease-in-out ${
              currentSlide === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/40 z-[1]" />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-[2] text-center px-5 max-w-[700px] mx-auto"
      >
        <p
          data-hero
          className="font-body text-[10px] font-medium uppercase tracking-[3px] text-white mb-4 opacity-0"
        >
          AI-POWERED BEAUTY
        </p>
        <div data-hero className="flex justify-center mb-5 opacity-0">
          <GoldLine centered />
        </div>
        <h1
          data-hero
          className="font-display text-[42px] md:text-[64px] lg:text-[84px] font-normal text-white leading-[1.1] tracking-[-1px] opacity-0"
          style={{ textShadow: "0 2px 20px rgba(0,0,0,0.3)" }}
        >
          AI BEAUTY SERVICES
        </h1>
        <p
          data-hero
          className="font-body text-base md:text-lg font-light text-white/90 mt-5 max-w-[500px] mx-auto opacity-0"
        >
          Transform Your Beauty Experience With AI
        </p>
        <div
          data-hero
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-9 opacity-0"
        >
          <BlackButton onClick={() => navigate('/beauty-concierge')}>START CONSULTATION</BlackButton>
          <BlackButton 
            variant="white"
            onClick={() => {
              const element = document.getElementById("ai-face-analysis");
              if (element) {
                const offset = 70;
                const y = element.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top: y, behavior: "smooth" });
              }
            }}
          >
            EXPLORE SERVICES
          </BlackButton>
        </div>
      </div>

      {/* Slider Navigation */}
      <div className="absolute bottom-5 left-5 z-[3] flex gap-1">
        <button 
          onClick={prevSlide}
          className="w-10 h-10 bg-black/50 flex items-center justify-center text-white transition-colors duration-200 hover:bg-black/70"
        >
          <ChevronLeft size={18} strokeWidth={1.5} />
        </button>
        <button 
          onClick={nextSlide}
          className="w-10 h-10 bg-black/50 flex items-center justify-center text-white transition-colors duration-200 hover:bg-black/70"
        >
          <ChevronRight size={18} strokeWidth={1.5} />
        </button>
      </div>
    </section>
  );
}
