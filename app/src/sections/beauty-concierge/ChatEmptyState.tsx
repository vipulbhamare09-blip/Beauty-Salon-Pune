import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

interface ChatEmptyStateProps {
  onSelectStarter: (text: string) => void;
}

export default function ChatEmptyState({ onSelectStarter }: ChatEmptyStateProps) {
  const starters = [
    { title: "What hairstyle suits my face shape?", category: "Hair Expert" },
    { title: "Create my skincare routine", category: "Skin Expert" },
    { title: "How can I reduce acne?", category: "Skin Expert" },
    { title: "Suggest wedding makeup", category: "Makeup Expert" },
    { title: "Best hairstyle for interviews", category: "Hair Expert" },
    { title: "Hair fall recovery plan", category: "Beauty Planner" },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full px-6 py-12 max-w-2xl mx-auto w-full">
      
      {/* Luxury Avatar */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }} 
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-24 h-24 rounded-full bg-gradient-to-tr from-salon-black to-gray-700 flex items-center justify-center shadow-xl mb-8 relative"
      >
        <Sparkles size={32} className="text-white" strokeWidth={1.5} />
        <div className="absolute inset-0 border border-white/20 rounded-full animate-ping opacity-20" />
      </motion.div>

      {/* Headlines */}
      <motion.h2 
        initial={{ y: 20, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        transition={{ duration: 0.8, delay: 0.1 }}
        className="text-3xl md:text-4xl text-salon-black mb-4 font-light text-center"
        style={{ fontFamily: '"Playfair Display", serif' }}
      >
        Hello, I'm your AI Beauty Concierge.
      </motion.h2>

      <motion.p 
        initial={{ y: 20, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-salon-gray text-center mb-12 font-light max-w-lg leading-relaxed"
      >
        I can help with skincare, hairstyles, beauty routines, makeup planning, salon recommendations, and personalized beauty guidance.
      </motion.p>

      {/* Specializations Grid */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        transition={{ duration: 0.8, delay: 0.3 }}
        className="w-full grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10"
      >
        {["Hair Expert", "Skin Expert", "Makeup Expert", "Beauty Planner"].map((expert) => {
          let starter = "";
          if (expert === "Hair Expert") starter = "Can you give me some hair styling advice based on my face shape?";
          if (expert === "Skin Expert") starter = "I need help building a skincare routine.";
          if (expert === "Makeup Expert") starter = "What makeup looks would suit me best?";
          if (expert === "Beauty Planner") starter = "I have an upcoming event, how should I prepare my beauty routine?";

          return (
            <motion.button 
              key={expert} 
              onClick={() => onSelectStarter(starter)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-salon-light border border-salon-gray/10 py-3 px-4 rounded-2xl text-center shadow-sm hover:border-salon-black hover:shadow-md transition-all"
            >
              <span className="text-[10px] uppercase tracking-widest text-salon-black font-medium">{expert}</span>
            </motion.button>
          );
        })}
      </motion.div>

      {/* Conversation Starters */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3">
        {starters.map((s, i) => (
          <motion.button
            key={i}
            onClick={() => onSelectStarter(s.title)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.05 }}
            className="group relative bg-white border border-salon-gray/10 p-4 rounded-2xl text-left hover:border-salon-black hover:shadow-md transition-all overflow-hidden"
          >
            <div className="absolute inset-0 bg-salon-light opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <span className="block text-[9px] uppercase tracking-wider text-salon-gray mb-2">{s.category}</span>
              <p className="text-sm text-salon-black font-medium pr-6">{s.title}</p>
              <ArrowRight size={14} className="absolute right-4 bottom-4 text-salon-gray opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all" />
            </div>
          </motion.button>
        ))}
      </div>

    </div>
  );
}
