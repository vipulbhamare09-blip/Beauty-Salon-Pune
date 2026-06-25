import ServiceSection from "@services/components/ServiceSection";
import { useNavigate } from "react-router";

export default function AIServicesSections() {
  const navigate = useNavigate();

  const services = [
    {
      heading: "AI Face Analysis Studio",
      description:
        "Upload your selfie and receive personalized beauty recommendations based on facial structure, hair type, and style compatibility. Our advanced AI analyzes your unique features to suggest the most flattering looks.",
      features: [
        "Face Shape Detection",
        "Hair Type Analysis",
        "Skin Tone Identification",
        "Beauty Recommendations",
      ],
      buttonText: "TRY FACE ANALYSIS",
      onClick: () => navigate("/face-analysis"),
      imageSrc: "/images/face-analysis.jpg",
      imageAlt: "AI Face Analysis Studio",
      imagePosition: "right" as const,
      backgroundColor: "cream" as const,
    },
    {
      heading: "AI Hairstyle Simulator",
      description:
        "Preview hairstyles before visiting a salon. Our AI technology maps your facial structure and overlays different cuts, colors, and styles so you can see exactly how each look will transform your appearance.",
      features: [
        "Haircut Visualization",
        "Hair Color Preview",
        "Style Matching",
        "Trend Suggestions",
      ],
      buttonText: "EXPLORE HAIRSTYLES",
      onClick: () => navigate("/hairstyle-simulator"),
      imageSrc: "/images/hairstyle-simulator.jpg",
      imageAlt: "AI Hairstyle Simulator",
      imagePosition: "left" as const,
      backgroundColor: "white" as const,
    },
    {
      heading: "AI Skin Advisor",
      description:
        "Receive personalized skincare recommendations and treatment suggestions. Our AI evaluates your skin condition, concerns, and goals to create a tailored regimen that brings out your natural glow.",
      features: [
        "Skin Assessment",
        "Treatment Suggestions",
        "Care Recommendations",
        "Beauty Planning",
      ],
      buttonText: "START SKIN ANALYSIS",
      onClick: () => navigate("/skin-advisor"),
      imageSrc: "/images/skin-advisor.jpg",
      imageAlt: "AI Skin Advisor",
      imagePosition: "right" as const,
      backgroundColor: "cream" as const,
    },
    {
      heading: "AI Beauty Concierge",
      description:
        "Chat with an intelligent beauty assistant that helps you choose services, treatments, and beauty plans. Get instant, expert-level guidance tailored to your needs, schedule, and preferences.",
      features: [
        "24/7 Availability",
        "Personalized Advice",
        "Product Matchmaker",
        "Routine Builder",
      ],
      buttonText: "TALK TO CONCIERGE",
      onClick: () => navigate("/beauty-concierge"),
      imageSrc: "/images/beauty-concierge.jpg",
      imageAlt: "AI Beauty Concierge",
      imagePosition: "left" as const,
      backgroundColor: "white" as const,
    },
    {
      heading: "Event Beauty Planner",
      description:
        "Create personalized beauty timelines for weddings, interviews, parties, photoshoots, and special occasions. Our AI plans every treatment and appointment so you look flawless for your big day.",
      features: [
        "Beauty Timeline",
        "Treatment Scheduling",
        "Budget Planning",
        "Salon Recommendations",
      ],
      buttonText: "PLAN MY EVENT",
      onClick: () => navigate("/event-planner"),
      imageSrc: "/images/event-planner.jpg",
      imageAlt: "Event Beauty Planner",
      imagePosition: "right" as const,
      backgroundColor: "cream" as const,
    },
    {
      heading: "Find Your Perfect Salon",
      description:
        "Our AI helps match you with salons based on your goals, preferences, location, and budget. Discover top-rated professionals who specialize in exactly what you need.",
      features: [
        "Personalized Matching",
        "Location-Based Search",
        "Budget-Friendly Options",
        "Verified Reviews",
      ],
      buttonText: "FIND A SALON",
      onClick: () => navigate("/salon-finder"),
      imageSrc: "/images/salon-matching.jpg",
      imageAlt: "Salon Matching",
      imagePosition: "left" as const,
      backgroundColor: "white" as const,
    },
  ];

  return (
    <div id="services">
      {services.map((service, index) => (
        <div key={index} id={index === 0 ? "ai-face-analysis" : undefined}>
          <ServiceSection {...service} />
        </div>
      ))}
    </div>
  );
}
