import { motion } from 'framer-motion';
import { ArrowRight, MessageSquareHeart } from 'lucide-react';
import { useNavigate } from 'react-router';

export default function RecommendedServices() {
  const navigate = useNavigate();

  const services = [
    { title: "Bridal Glow Facial", price: "₹2,499", category: "Skin Care" },
    { title: "Event Hair Styling", price: "₹1,499", category: "Hair Care" },
    { title: "Full Face Makeup", price: "₹1,999", category: "Makeup" },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className="mt-8 pt-12 border-t border-salon-gray/10"
    >
      <div className="text-center mb-10">
        <h3 className="text-2xl font-playfair text-salon-black mb-2">Recommended Services</h3>
        <p className="text-sm font-light text-salon-gray">Accelerate your results with professional treatments at our salon.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {services.map((srv, i) => (
          <div 
            key={i} 
            onClick={() => {
              const serviceSlug = srv.title.toLowerCase().replace(/\s+/g, '-');
              navigate(`/salon-finder?service=${serviceSlug}`);
            }}
            className="bg-white p-6 rounded-3xl border border-salon-gray/10 flex flex-col justify-between group hover:border-salon-black transition-colors cursor-pointer"
          >
            <div>
              <span className="text-[10px] uppercase tracking-widest text-salon-gray">{srv.category}</span>
              <h4 className="text-lg font-medium text-salon-black mt-2 mb-4">{srv.title}</h4>
            </div>
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-salon-gray/10">
              <span className="text-sm font-medium">{srv.price}</span>
              <ArrowRight size={16} className="text-salon-gray group-hover:text-salon-black transition-colors transform group-hover:translate-x-1" />
            </div>
          </div>
        ))}
      </div>

      {/* Concierge Integration CTA */}
      <div className="bg-gradient-to-r from-salon-black to-gray-800 p-8 rounded-3xl text-white text-center flex flex-col items-center shadow-lg relative overflow-hidden">
        <MessageSquareHeart size={32} className="mb-4 opacity-80" strokeWidth={1.5} />
        <h3 className="text-xl font-playfair mb-2 relative z-10">Have questions about your timeline?</h3>
        <p className="text-sm font-light text-white/70 mb-6 max-w-md relative z-10">Share this plan directly with our AI Beauty Concierge to get personalized product recommendations and routine adjustments.</p>
        <button 
          onClick={() => navigate('/beauty-concierge')}
          className="bg-white text-salon-black px-8 py-3 rounded-full text-xs uppercase tracking-widest font-medium hover:bg-salon-light transition-colors relative z-10"
        >
          Discuss Plan With Concierge
        </button>
      </div>
      
    </motion.div>
  );
}
