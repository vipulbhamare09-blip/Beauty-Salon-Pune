import { MapPin, Phone, Mail } from "lucide-react";
import { useNavigate } from "react-router";

export default function Footer() {
  const navigate = useNavigate();

  const quickLinks = [
    { label: "HOME", action: () => navigate("/") },
    { label: "SERVICES", action: () => window.scrollTo({ top: 0, behavior: "smooth" }) },
    { label: "CONTACT", action: () => document.getElementById("contact-section")?.scrollIntoView({ behavior: "smooth", block: "start" }) },
  ];

  return (
    <footer id="contact-section" className="bg-black text-white">
      <div className="max-w-[1200px] mx-auto px-5 lg:px-10 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {/* Column 1: Contact Info */}
          <div>
            <h4 className="font-body text-xs font-medium uppercase tracking-[2px] text-white mb-6">
              CONTACT
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={18} strokeWidth={1.5} className="mt-0.5 flex-shrink-0" />
                <span className="font-body text-[13px] font-normal text-white leading-[1.8]">
                  Pune Beauty Salon, FC Road, Pune, Maharashtra 411005
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} strokeWidth={1.5} className="flex-shrink-0" />
                <span className="font-body text-[13px] font-normal text-white">
                  +91 98765 43210
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} strokeWidth={1.5} className="flex-shrink-0" />
                <span className="font-body text-[13px] font-normal text-white">
                  contact@punebeautysalon.com
                </span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-body text-xs font-medium uppercase tracking-[2px] text-white mb-6">
              QUICK LINKS
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      link.action();
                    }}
                    className="font-body text-[13px] font-normal uppercase tracking-[1px] text-white transition-opacity duration-200 hover:opacity-60 cursor-pointer"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Newsletter */}
          <div>
            <h4 className="font-body text-xs font-medium uppercase tracking-[2px] text-white mb-6">
              NEWSLETTER
            </h4>
            <p className="font-body text-[13px] font-light text-white/70 leading-[1.6] mb-5">
              Subscribe for premium salon offers, beauty updates, and exclusive Pune salon experiences.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="space-y-2.5"
            >
              <input
                type="email"
                placeholder="Your email address"
                className="w-full h-[50px] px-5 bg-transparent border border-white/30 text-white font-body text-sm placeholder:text-white/40 focus:border-white focus:outline-none transition-colors duration-300"
              />
              <button
                type="submit"
                className="w-full h-[50px] bg-white text-black font-body text-xs font-medium uppercase tracking-[2px] transition-all duration-200 hover:bg-gray-100"
              >
                SUBSCRIBE
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 text-center">
          <p className="font-body text-xs font-light text-body">
            2026 Pune Beauty Salon. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
