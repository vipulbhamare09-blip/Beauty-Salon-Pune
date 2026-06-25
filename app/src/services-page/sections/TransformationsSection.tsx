import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GoldLine from "@services/components/GoldLine";
import BlackButton from "@services/components/BlackButton";

gsap.registerPlugin(ScrollTrigger);

const transformations = [
  {
    image: "/images/transform-hair.png",
    category: "TRANSFORMATION",
    title: "Hair Transformation",
  },
  {
    image: "/images/transform-color.png",
    category: "TRANSFORMATION",
    title: "Color Transformation",
  },
  {
    image: "/images/transform-bridal.png",
    category: "TRANSFORMATION",
    title: "Bridal Transformation",
  },
  {
    image: "/images/transform-styling.png",
    category: "TRANSFORMATION",
    title: "Styling Transformation",
  },
];

export default function TransformationsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !headerRef.current || !cardsRef.current) return;

    // Header animation
    const headerElements = headerRef.current.querySelectorAll("[data-animate]");
    gsap.fromTo(
      headerElements,
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

    // Cards staggered animation
    const cards = cardsRef.current.querySelectorAll(".transform-card");
    gsap.fromTo(
      cards,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 80%",
          once: true,
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="bg-cream py-[100px] lg:py-[120px]">
      <div className="max-w-[1200px] mx-auto px-5 lg:px-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <div data-animate className="flex justify-center mb-5">
            <GoldLine centered />
          </div>
          <h2
            data-animate
            className="font-display text-[32px] lg:text-[48px] font-normal text-black leading-[1.2] tracking-[-0.5px]"
          >
            Before &amp; After Transformations
          </h2>
          <p
            data-animate
            className="font-body text-base font-light text-body mt-4 max-w-[500px] mx-auto"
          >
            Real results from AI-powered beauty transformations
          </p>
        </div>

        {/* Cards Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
        >
          {transformations.map((item, index) => (
            <div key={index} className="transform-card group cursor-pointer">
              <div className="overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full aspect-[4/3] object-cover transition-transform duration-400 ease-out group-hover:scale-[1.02]"
                />
              </div>
              <p className="font-body text-[10px] font-medium uppercase tracking-[2px] text-gold mt-4">
                {item.category}
              </p>
              <h3 className="font-display text-xl lg:text-2xl font-normal text-black mt-2">
                {item.title}
              </h3>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div data-animate className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
          <BlackButton>VIEW GALLERY</BlackButton>
          <BlackButton variant="white-outline">SHARE YOUR STORY</BlackButton>
        </div>
      </div>
    </section>
  );
}
