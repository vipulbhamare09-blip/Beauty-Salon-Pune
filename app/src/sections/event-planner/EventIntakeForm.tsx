import { useState } from 'react';
import type { EventType } from '../../services/eventPlanner';
import { Calendar as CalendarIcon, ArrowRight, Check, Gem, Sparkles, Briefcase, Heart, Star, Cake, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';

const EVENT_TYPES: { type: EventType; icon: React.ElementType; subtitle: string }[] = [
  { type: 'Wedding', icon: Gem, subtitle: 'Bridal beauty preparation' },
  { type: 'Party', icon: Sparkles, subtitle: 'Glow for your celebration' },
  { type: 'Interview', icon: Briefcase, subtitle: 'Professional polished look' },
  { type: 'Date Night', icon: Heart, subtitle: 'Elegant evening styling' },
  { type: 'Festival', icon: Star, subtitle: 'Long-lasting glam' },
  { type: 'Birthday', icon: Cake, subtitle: 'Celebrate with confidence' },
  { type: 'Graduation', icon: GraduationCap, subtitle: 'Picture-perfect finish' },
];

const PREFERENCES = [
  'Natural Makeup', 'Full Glam', 'Hair Styling', 'Skincare Prep', 
  'Professional Makeup', 'Nail Services', 'Spa Treatment'
];

interface EventIntakeFormProps {
  onGenerate: (type: EventType, date: Date, preferences: string[]) => void;
}

export default function EventIntakeForm({ onGenerate }: EventIntakeFormProps) {
  const [selectedType, setSelectedType] = useState<EventType | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);

  const handleGenerate = () => {
    if (selectedType && selectedDate) {
      const d = new Date(selectedDate);
      const targetDate = new Date(d.getTime() + d.getTimezoneOffset() * 60000);
      onGenerate(selectedType, targetDate, selectedPreferences);
    }
  };

  const togglePreference = (pref: string) => {
    setSelectedPreferences(prev => 
      prev.includes(pref) ? prev.filter(p => p !== pref) : [...prev, pref]
    );
  };

  const isFormComplete = selectedType && selectedDate;

  return (
    <div className="flex flex-col gap-12 w-full max-w-4xl mx-auto">
      
      {/* SECTION 1: Event Type */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/70 backdrop-blur-md rounded-[36px] p-8 lg:p-12 border border-neutral-200 shadow-sm"
      >
        <div className="mb-10">
          <p className="text-[10px] uppercase tracking-[0.3em] text-salon-gray mb-3">Step 01</p>
          <h2 className="text-3xl font-light text-salon-black mb-2" style={{ fontFamily: '"Playfair Display", serif' }}>Select Event Type</h2>
          <p className="text-sm font-light text-salon-gray">Choose the occasion you're preparing for.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {EVENT_TYPES.map(({ type, icon: Icon, subtitle }) => {
            const isSelected = selectedType === type;
            return (
              <motion.button
                key={type}
                onClick={() => setSelectedType(type)}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.3 }}
                className={`relative flex flex-col items-start text-left p-6 rounded-3xl border transition-all duration-300 ${
                  isSelected 
                    ? 'border-salon-black bg-salon-black/5 shadow-md' 
                    : 'border-neutral-200 bg-white/50 hover:border-salon-black/20 hover:shadow-sm hover:bg-white'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-4 right-4 text-salon-black">
                    <Check size={16} strokeWidth={2} />
                  </div>
                )}
                <div className={`mb-4 p-3 rounded-full flex items-center justify-center ${isSelected ? 'bg-white text-salon-black shadow-sm' : 'bg-salon-light text-salon-gray'}`}>
                  <Icon size={20} strokeWidth={1.5} />
                </div>
                <span className="text-base font-medium text-salon-black mb-1">{type}</span>
                <span className="text-xs font-light text-salon-gray">{subtitle}</span>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* SECTION 2: Event Date */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="bg-white/70 backdrop-blur-md rounded-[36px] p-8 lg:p-12 border border-neutral-200 shadow-sm"
      >
        <div className="mb-10">
          <p className="text-[10px] uppercase tracking-[0.3em] text-salon-gray mb-3">Step 02</p>
          <h2 className="text-3xl font-light text-salon-black mb-2" style={{ fontFamily: '"Playfair Display", serif' }}>Event Date</h2>
          <p className="text-sm font-light text-salon-gray">When is your event taking place?</p>
        </div>
        <div className="max-w-md relative group">
          <div className="absolute left-6 top-1/2 -translate-y-1/2 text-salon-gray pointer-events-none transition-colors group-hover:text-salon-black">
            <CalendarIcon size={20} strokeWidth={1.5} />
          </div>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="w-full h-[72px] pl-16 pr-8 bg-white border border-neutral-200 rounded-full text-salon-black font-light text-lg focus:outline-none focus:ring-1 focus:ring-salon-black transition-all hover:border-salon-gray/40 shadow-sm hover:shadow-md cursor-pointer"
          />
        </div>
      </motion.div>

      {/* SECTION 3: Beauty Preferences */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-white/70 backdrop-blur-md rounded-[36px] p-8 lg:p-12 border border-neutral-200 shadow-sm"
      >
        <div className="mb-10">
          <p className="text-[10px] uppercase tracking-[0.3em] text-salon-gray mb-3">Step 03</p>
          <h2 className="text-3xl font-light text-salon-black mb-2" style={{ fontFamily: '"Playfair Display", serif' }}>Beauty Preferences</h2>
          <p className="text-sm font-light text-salon-gray">Select the services you are planning to get.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          {PREFERENCES.map(pref => {
            const isSelected = selectedPreferences.includes(pref);
            return (
              <motion.button
                key={pref}
                onClick={() => togglePreference(pref)}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
                className={`px-6 py-3 rounded-full text-sm font-light transition-all duration-300 border ${
                  isSelected
                    ? 'bg-salon-black text-white border-salon-black shadow-md'
                    : 'bg-transparent text-salon-black border-neutral-200 hover:border-salon-gray/40 hover:bg-white'
                }`}
              >
                {pref}
              </motion.button>
            );
          })}
        </div>

        <div className="flex justify-end pt-12 mt-12 border-t border-neutral-200">
          <button
            onClick={handleGenerate}
            disabled={!isFormComplete}
            className={`flex items-center gap-3 px-10 py-5 rounded-full text-xs font-medium uppercase tracking-widest transition-all duration-300 ${
              isFormComplete 
                ? 'bg-salon-black text-white hover:bg-salon-dark hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.15)] group' 
                : 'bg-salon-gray/10 text-salon-gray cursor-not-allowed opacity-50'
            }`}
          >
            Generate Timeline
            {isFormComplete && <ArrowRight size={16} strokeWidth={1.5} className="transition-transform group-hover:translate-x-1" />}
          </button>
        </div>
      </motion.div>

    </div>
  );
}
