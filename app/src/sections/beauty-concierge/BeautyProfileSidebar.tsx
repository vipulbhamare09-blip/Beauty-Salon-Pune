import { motion } from 'framer-motion';
import { UserCircle, Sparkles, TrendingUp, ChevronRight, Droplet, Star } from 'lucide-react';
import { useNavigate } from 'react-router';

export default function BeautyProfileSidebar() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6 font-poppins pb-8">
      
      {/* User Header */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-salon-black text-white flex items-center justify-center shadow-sm">
          <UserCircle size={24} strokeWidth={1.5} />
        </div>
        <div>
          <h2 className="text-lg text-salon-black font-medium leading-tight">Your Profile</h2>
          <p className="text-xs text-salon-gray uppercase tracking-widest">VIP Member</p>
        </div>
      </motion.div>

      {/* Today's Insights (New Req) */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-gradient-to-br from-salon-black to-gray-800 text-white p-6 rounded-3xl shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-20"><Sparkles size={48} /></div>
        <h3 className="text-xs uppercase tracking-widest text-white/70 mb-4 flex items-center gap-2">
          <TrendingUp size={14} /> Today's Insights
        </h3>
        <ul className="space-y-4 relative z-10">
          <li className="flex items-start gap-3">
            <span className="mt-1 w-1.5 h-1.5 bg-green-400 rounded-full flex-shrink-0 animate-pulse" />
            <p className="text-sm font-light leading-snug">Skin Hydration improved by 12% since last week.</p>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 w-1.5 h-1.5 bg-white/50 rounded-full flex-shrink-0" />
            <p className="text-sm font-light leading-snug">Curtain Bangs remains your highest 95% hairstyle match.</p>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 w-1.5 h-1.5 bg-yellow-400 rounded-full flex-shrink-0" />
            <p className="text-sm font-light leading-snug">UV Index is High (8). SPF 50 reapplication required.</p>
          </li>
        </ul>
      </motion.div>

      {/* Contextual Ecosystem Memory */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white p-6 rounded-3xl border border-salon-gray/10 shadow-sm">
        <h3 className="text-xs uppercase tracking-widest text-salon-gray mb-4">Ecosystem Memory</h3>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-salon-gray/5">
            <span className="text-sm text-salon-gray">Face Shape</span>
            <span className="text-sm font-medium text-salon-black">Oval</span>
          </div>
          <div className="flex justify-between items-center pb-3 border-b border-salon-gray/5">
            <span className="text-sm text-salon-gray">Skin Type</span>
            <span className="text-sm font-medium text-salon-black">Combination</span>
          </div>
          <div className="flex justify-between items-center pb-3 border-b border-salon-gray/5">
            <span className="text-sm text-salon-gray">Skin Health</span>
            <span className="text-sm font-medium text-salon-black">89 / 100</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-salon-gray">Last Analysis</span>
            <span className="text-sm font-medium text-salon-black">Today</span>
          </div>
        </div>
      </motion.div>

      {/* Quick Navigation */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white p-4 rounded-3xl border border-salon-gray/10 shadow-sm flex flex-col gap-2">
        <h3 className="text-xs uppercase tracking-widest text-salon-gray mb-2 px-2">Quick Navigation</h3>
        <button onClick={() => navigate('/face-analysis')} className="flex items-center justify-between p-3 hover:bg-salon-light rounded-xl transition-colors text-sm text-salon-black font-medium group">
          <div className="flex items-center gap-3"><UserCircle size={16} className="text-salon-gray group-hover:text-salon-black transition-colors" /> Face Analysis</div>
          <ChevronRight size={14} className="text-salon-gray opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
        <button onClick={() => navigate('/skin-advisor')} className="flex items-center justify-between p-3 hover:bg-salon-light rounded-xl transition-colors text-sm text-salon-black font-medium group">
          <div className="flex items-center gap-3"><Droplet size={16} className="text-salon-gray group-hover:text-salon-black transition-colors" /> Skin Advisor</div>
          <ChevronRight size={14} className="text-salon-gray opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
        <button onClick={() => navigate('/hairstyle-simulator')} className="flex items-center justify-between p-3 hover:bg-salon-light rounded-xl transition-colors text-sm text-salon-black font-medium group">
          <div className="flex items-center gap-3"><Star size={16} className="text-salon-gray group-hover:text-salon-black transition-colors" /> Hairstyle Simulator</div>
          <ChevronRight size={14} className="text-salon-gray opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
      </motion.div>

    </div>
  );
}
