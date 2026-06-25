import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GoldLine from "./GoldLine";
import FeatureList from "./FeatureList";
import BlackButton from "./BlackButton";

gsap.registerPlugin(ScrollTrigger);

interface ServiceSectionProps {
  label?: string;
  heading: string;
  description: string;
  features: string[];
  buttonText: string;
  imageSrc: string;
  imageAlt: string;
  imagePosition: "left" | "right";
  backgroundColor: "white" | "cream";
  onClick?: () => void;
}

export default function ServiceSection({
  label,
  heading,
  description,
  features,
  buttonText,
  imageSrc,
  imageAlt,
  imagePosition,
  backgroundColor,
  onClick,
}: ServiceSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !contentRef.current || !imageRef.current) return;

    const textElements = contentRef.current.querySelectorAll("[data-animate]");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        once: true,
      },
    });

    tl.fromTo(
      textElements,
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
      }
    );

    tl.fromTo(
      imageRef.current.querySelector("img"),
      { opacity: 0, scale: 1.03 },
      { opacity: 1, scale: 1, duration: 0.9, ease: "power2.out" },
      "-=0.5"
    );
  }, { scope: sectionRef });

  const bgClass = backgroundColor === "cream" ? "bg-cream" : "bg-white";
  const imageFirst = imagePosition === "left";

  return (
    <section ref={sectionRef} className={`${bgClass} py-[100px] lg:py-[120px]`}>
      <div className="max-w-[1200px] mx-auto px-5 lg:px-10">
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center ${
            imageFirst ? "lg:[direction:rtl]" : ""
          }`}
        >
          {/* Content Column */}
          <div
            ref={contentRef}
            className={`${imageFirst ? "lg:[direction:ltr]" : ""}`}
          >
            {label && (
              <p
                data-animate
                className="font-body text-[10px] font-medium uppercase tracking-[3px] text-body mb-3"
              >
                {label}
              </p>
            )}
            <div data-animate>
              <GoldLine className="mb-5" />
            </div>
            <h2
              data-animate
              className="font-display text-[32px] lg:text-[48px] font-normal text-black leading-[1.2] tracking-[-0.5px]"
            >
              {heading}
            </h2>
            <p
              data-animate
              className="font-body text-base font-light text-body leading-[1.7] mt-5"
            >
              {description}
            </p>
            <div data-animate className="mt-5">
              <FeatureList items={features} />
            </div>
            <div data-animate className="mt-9">
              <BlackButton onClick={onClick}>{buttonText}</BlackButton>
            </div>
          </div>

          {/* Image Column */}
          <div
            ref={imageRef}
            className={`overflow-hidden ${imageFirst ? "lg:[direction:ltr]" : ""}`}
          >
            <img
              src={imageSrc}
              alt={imageAlt}
              className="w-full h-auto min-h-[400px] object-cover transition-transform duration-400 ease-out hover:scale-[1.02] bg-salon-light"
              onError={(e) => {
                e.currentTarget.src = "/images/hero-model.jpg";
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
