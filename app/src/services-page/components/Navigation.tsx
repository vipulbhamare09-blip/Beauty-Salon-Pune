import { useState, useEffect } from "react";
import { Search, ShoppingBag, Menu, X } from "lucide-react";
import { useNavigate } from "react-router";
import gsap from "gsap";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      const links = document.querySelectorAll(".mobile-link");
      gsap.fromTo(
        links,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: "power2.out", delay: 0.2 }
      );
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: "HOME", href: "#", to: "/" },
    { label: "SERVICES", href: "#services", active: true },
    { label: "CONTACT", href: "#contact", isScroll: true },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[1000] h-[70px] flex items-center transition-all duration-300 ease-in-out ${
          scrolled
            ? "bg-white/95 backdrop-blur-[10px] shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1400px] w-full mx-auto px-5 lg:px-10 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="font-display text-[20px] font-normal text-black tracking-normal"
          >
            Pune Beauty Salon
          </a>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  if (link.to) {
                    e.preventDefault();
                    navigate(link.to);
                  } else if (link.isScroll) {
                    e.preventDefault();
                    document.getElementById("contact-section")?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }
                }}
                className="relative font-body text-[11px] font-normal uppercase tracking-[2px] text-black transition-opacity duration-200 hover:opacity-60 cursor-pointer"
              >
                {link.label}
                {link.active && (
                  <span className="absolute -top-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-gold" />
                )}
              </a>
            ))}
          </div>

          {/* Utility Icons */}
          <div className="hidden lg:flex items-center gap-5">
            <button className="text-black transition-opacity duration-200 hover:opacity-60">
              <Search size={18} strokeWidth={1.5} />
            </button>
            <button className="relative text-black transition-opacity duration-200 hover:opacity-60">
              <ShoppingBag size={18} strokeWidth={1.5} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-black text-white text-[9px] font-body font-medium rounded-full flex items-center justify-center">
                0
              </span>
            </button>
            <button
              onClick={() => navigate('/salon-finder')}
              className="font-body text-[11px] font-medium uppercase tracking-[2px] text-black border border-black px-5 py-2.5 transition-all duration-200 hover:bg-black hover:text-white"
            >
              BOOK ONLINE
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden text-black"
          >
            <Menu size={24} strokeWidth={1.5} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[2000] bg-black/95 flex flex-col items-center justify-center">
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-5 right-5 text-white"
          >
            <X size={28} strokeWidth={1.5} />
          </button>
          <div className="flex flex-col items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  if (link.to) {
                    e.preventDefault();
                    setMobileMenuOpen(false);
                    navigate(link.to);
                  } else if (link.isScroll) {
                    e.preventDefault();
                    setMobileMenuOpen(false);
                    setTimeout(() => {
                      document.getElementById("contact-section")?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }, 300);
                  } else {
                    setMobileMenuOpen(false);
                  }
                }}
                className="mobile-link font-display text-[32px] font-normal text-white opacity-0 cursor-pointer"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
