"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Phone, Mail, MapPin } from "lucide-react";

const usefulLinks = [
  { label: "Home", href: "/" },
  { label: "Our Services", href: "/services" },
  { label: "Book Appointment", href: "/event-planner" },
  { label: "Find Salon", href: "/salon-finder" },
  { label: "Contact Us", href: "#contact" },
];

const lookbookImages = [
  "/images/lookbook-1.jpg",
  "/images/lookbook-2.jpg",
  "/images/lookbook-3.jpg",
  "/images/lookbook-4.jpg",
  "/images/lookbook-5.jpg",
  "/images/lookbook-6.jpg",
];

const socialIcons = [
  {
    name: "Facebook",
    path: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z",
  },
  {
    name: "Twitter",
    path: "M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0012 8v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z",
  },
  {
    name: "Instagram",
    path: "M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M7.5 3h9a4.5 4.5 0 014.5 4.5v9a4.5 4.5 0 01-4.5 4.5h-9A4.5 4.5 0 013 16.5v-9A4.5 4.5 0 017.5 3z",
  },
  {
    name: "LinkedIn",
    path: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z",
  },
];

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <footer id="contact" className="bg-salon-black pt-16 lg:pt-20 pb-6">
      <div ref={ref} className="max-w-[1200px] mx-auto px-6 lg:px-10">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-salon-white/10">
          {/* Column 1 - About Us */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-salon-white text-xs tracking-[0.2em] font-poppins font-medium mb-6">
              ABOUT US
            </h3>
            <p className="text-salon-white/50 text-xs leading-[1.8] font-light">
              Pune Beauty Salon is Pune’s premium AI-powered beauty destination, offering luxury salon discovery, smart beauty consultations, and personalized experiences tailored to your lifestyle.
            </p>
            {/* Social Icons */}
            <div className="flex gap-4 mt-6">
              {socialIcons.map((icon) => (
                <a
                  key={icon.name}
                  href="#"
                  className="text-salon-white/50 hover:text-salon-white transition-colors"
                  aria-label={icon.name}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d={icon.path} />
                  </svg>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Column 2 - Useful Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-salon-white text-xs tracking-[0.2em] font-poppins font-medium mb-6">
              USEFUL LINKS
            </h3>
            <ul className="space-y-3">
              {usefulLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-salon-white/50 text-xs font-light hover:text-salon-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3 - Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-salon-white text-xs tracking-[0.2em] font-poppins font-medium mb-6">
              CONTACT INFO
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-salon-white/50 mt-0.5">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                </span>
                <span className="text-salon-white/50 text-xs font-light">
                  Mon - Sun : 9:00 AM - 9:00 PM
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={12} className="text-salon-white/50 mt-0.5 flex-shrink-0" />
                <span className="text-salon-white/50 text-xs font-light">
                  +91 98230 45678
                </span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={12} className="text-salon-white/50 mt-0.5 flex-shrink-0" />
                <span className="text-salon-white/50 text-xs font-light">
                  FC Road, Shivajinagar, Pune, Maharashtra 411005
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={12} className="text-salon-white/50 mt-0.5 flex-shrink-0" />
                <span className="text-salon-white/50 text-xs font-light">
                  contact@punebeautysalon.com
                </span>
              </li>
            </ul>
          </motion.div>

          {/* Column 4 - Our Lookbook */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-salon-white text-xs tracking-[0.2em] font-poppins font-medium mb-6">
              OUR LOOKBOOK
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {lookbookImages.map((img, index) => (
                <a key={index} href="#lookbook" className="overflow-hidden group bg-neutral-900 block">
                  <img
                    src={img}
                    alt={`Lookbook ${index + 1}`}
                    className="w-full h-16 object-cover transition-transform duration-300 group-hover:scale-110"
                    onError={(e) => {
                      e.currentTarget.src = "/images/salon-interior.jpg";
                    }}
                  />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-salon-white/40 text-[10px] font-light tracking-wide flex items-center gap-2">
            &copy; 2025 Pune Beauty Salon. All Rights Reserved. <span className="hidden sm:inline text-salon-white/20">|</span> <span className="text-salon-white/30 italic">Made with ♥ in Pune</span>
          </p>
          <div className="flex gap-6">
            <a
              href="/"
              className="text-salon-white/40 text-[10px] font-light hover:text-salon-white/60 transition-colors"
            >
              Home
            </a>
            <a
              href="/services"
              className="text-salon-white/40 text-[10px] font-light hover:text-salon-white/60 transition-colors"
            >
              Services
            </a>
            <a
              href="/salon-finder"
              className="text-salon-white/40 text-[10px] font-light hover:text-salon-white/60 transition-colors"
            >
              Find Salon
            </a>
            <a
              href="#contact"
              className="text-salon-white/40 text-[10px] font-light hover:text-salon-white/60 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
