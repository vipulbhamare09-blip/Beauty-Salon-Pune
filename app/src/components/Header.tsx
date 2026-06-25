"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router";

const navItems = [
  { label: "HOME", href: "/" },
  { label: "SERVICES", href: "/services" },
  { label: "CONTACT", href: "#contact-section" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const isLandingPage = location.pathname === "/" || location.pathname === "/home";
  const isServicesPage = location.pathname === "/services";

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 80);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initialize on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const visibleNavItems = navItems.filter(item => {
    if (isLandingPage && item.label === "CONTACT") return false;
    return true;
  });

  let headerStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 9999,
    transform: 'translateY(0)',
    transition: 'background 0.35s ease, transform 0.35s ease, opacity 0.35s ease, backdrop-filter 0.35s ease, box-shadow 0.35s ease',
    willChange: 'transform, background',
  };

  if ((isLandingPage || isServicesPage) && !mobileMenuOpen) {
    if (isScrolled) {
      headerStyle.background = 'rgba(0,0,0,0.95)';
      headerStyle.backdropFilter = 'blur(10px)';
      headerStyle.WebkitBackdropFilter = 'blur(10px)';
      headerStyle.boxShadow = '0 4px 20px rgba(0,0,0,0.2)';
    } else {
      headerStyle.background = 'transparent';
      headerStyle.backdropFilter = 'none';
      headerStyle.WebkitBackdropFilter = 'none';
      headerStyle.boxShadow = 'none';
    }
  } else {
    headerStyle.background = 'rgba(0,0,0,0.95)';
    headerStyle.backdropFilter = 'blur(10px)';
    headerStyle.WebkitBackdropFilter = 'blur(10px)';
  }

  return (
    <header
      className="fixed top-0 left-0 w-full z-[9999] h-[70px] flex items-center"
      style={headerStyle}
    >
      <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-10 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <span
            className="text-salon-white text-2xl italic tracking-wide"
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
            Pune Beauty Salon
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
          {visibleNavItems.map((item) => (
            <Link
              key={item.label}
              to={item.href.startsWith('#') ? `/services${item.href}` : item.href}
              onClick={(e) => {
                if (item.href.startsWith('#')) {
                  if (location.pathname === '/services') {
                    e.preventDefault();
                    document.getElementById(item.href.substring(1))?.scrollIntoView({ behavior: 'smooth' });
                  }
                }
              }}
              className={`relative text-salon-white text-[11px] font-poppins tracking-[0.2em] transition-opacity group ${
                (location.pathname === item.href || (location.pathname === '/services' && item.href.startsWith('#'))) ? "opacity-100" : "opacity-70 hover:opacity-100"
              }`}
            >
              {item.label}
              <span className={`absolute -bottom-1 left-0 h-[1px] bg-salon-white transition-all duration-300 ${
                (location.pathname === item.href) ? "w-full" : "w-0 group-hover:w-full"
              }`} />
            </Link>
          ))}
        </nav>

        {/* Right Side */}
        <div className="hidden lg:flex items-center gap-5">
          <button aria-label="Search" className="text-salon-white hover:opacity-70 transition-opacity">
            <Search size={16} strokeWidth={1.5} />
          </button>
          <span className="text-salon-white/30">|</span>
          {!isLandingPage && (
            <Link
              to="/my-appointments"
              className="text-salon-white text-[11px] font-poppins tracking-[0.15em] hover:opacity-80 transition-opacity"
            >
              MY APPOINTMENTS
            </Link>
          )}
          <Link
            to={location.pathname === "/services" ? "/salon-finder" : "/services"}
            className="text-salon-white text-[11px] font-poppins tracking-[0.15em] hover:opacity-80 transition-opacity"
          >
            BOOK ONLINE
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          aria-label="Toggle Menu"
          aria-expanded={mobileMenuOpen}
          className="lg:hidden text-salon-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-[70px] left-0 right-0 bg-salon-black border-t border-salon-white/10 lg:hidden overflow-hidden"
          >
            <nav className="flex flex-col py-4">
              {visibleNavItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href.startsWith('#') ? `/services${item.href}` : item.href}
                  className="text-salon-white text-xs tracking-[0.2em] py-4 px-6 hover:bg-salon-white/5 transition-colors border-b border-white/5"
                  onClick={(e) => {
                    if (item.href.startsWith('#')) {
                      if (location.pathname === '/services') {
                        e.preventDefault();
                        document.getElementById(item.href.substring(1))?.scrollIntoView({ behavior: 'smooth' });
                      }
                    }
                    setMobileMenuOpen(false);
                  }}
                >
                  {item.label}
                </Link>
              ))}
              {!isLandingPage && (
                <Link
                  to="/my-appointments"
                  className="text-salon-white text-xs tracking-[0.15em] py-4 px-6 hover:bg-salon-white/5 transition-colors border-b border-white/5"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  MY APPOINTMENTS
                </Link>
              )}
              <Link
                to={location.pathname === "/services" ? "/salon-finder" : "/services"}
                className="text-salon-white text-xs tracking-[0.15em] py-4 px-6 hover:bg-salon-white/5 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                BOOK ONLINE
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
