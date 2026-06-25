import { useState } from 'react';
import Footer from '../sections/Footer';
import EventIntakeForm from '../sections/event-planner/EventIntakeForm';
import EventDashboard from '../sections/event-planner/EventDashboard';
import EventTimeline from '../sections/event-planner/EventTimeline';
import RecommendedServices from '../sections/event-planner/RecommendedServices';
import type { EventPlan, EventType } from '../services/eventPlanner';
import { eventPlanner } from '../services/eventPlanner';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/system/SEO';
import { useBeautyEcosystemStore } from '../store/useBeautyEcosystemStore';
import { Check } from 'lucide-react';
import Confetti from '../components/system/Confetti';

export default function EventPlannerPage() {
  const [appState, setAppState] = useState<'idle' | 'generating' | 'success' | 'results'>('idle');
  const [plan, setPlan] = useState<EventPlan | null>(null);
  const setEventPlanner = useBeautyEcosystemStore(state => state.setEventPlanner);

  const handleGenerate = (eventType: EventType, targetDate: Date, preferences: string[]) => {
    setAppState('generating');
    
    // Simulate premium AI calculation
    setTimeout(() => {
      const generatedPlan = eventPlanner.generateTimeline(eventType, targetDate);
      setPlan(generatedPlan);
      setEventPlanner({
        selectedEvent: eventType,
        beautyPreferences: preferences.length > 0 ? preferences : generatedPlan.milestones.flatMap(m => m.tasks.map(t => t.text))
      });
      setAppState('success');
      
      // Transition to results after brief success state
      setTimeout(() => {
        setAppState('results');
      }, 2500);
    }, 2500);
  };

  const handleUpdateTask = (milestoneId: string, taskId: string, completed: boolean) => {
    if (!plan) return;
    
    const newMilestones = plan.milestones.map(m => {
      if (m.id !== milestoneId) return m;
      return {
        ...m,
        tasks: m.tasks.map(t => t.id === taskId ? { ...t, completed } : t)
      };
    });

    const completedTasks = newMilestones.reduce((sum, m) => 
      sum + m.tasks.filter(t => t.completed).length, 0
    );

    const readinessScore = Math.round((completedTasks / plan.totalTasks) * 100);

    setPlan({
      ...plan,
      milestones: newMilestones,
      completedTasks,
      readinessScore
    });
  };

  const handleReset = () => {
    setAppState('idle');
    setPlan(null);
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] flex flex-col font-poppins selection:bg-salon-black selection:text-salon-white">
      <SEO title="Event Beauty Planner" description="Plan your beauty preparations perfectly for your next big event." />
      
      <main className="flex-grow pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-4 lg:px-8 w-full">
          
          <AnimatePresence mode="wait">
            {appState === 'idle' && (
              <motion.div key="idle" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                <div className="text-center mb-16">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-salon-gray mb-6">Event Preparation</p>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-salon-black mb-6" style={{ fontFamily: '"Playfair Display", serif' }}>Beauty Event Planner</h1>
                  <p className="text-salon-gray font-light max-w-xl mx-auto leading-relaxed text-sm md:text-base">
                    Prepare for your big day with a personalized, AI-generated beauty countdown timeline based on your unique profile.
                  </p>
                </div>
                <EventIntakeForm onGenerate={handleGenerate} />
              </motion.div>
            )}

            {appState === 'generating' && (
              <motion.div key="generating" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center py-40">
                <div className="relative w-24 h-24 mb-10">
                  <div className="absolute inset-0 border-2 border-neutral-200 rounded-full"></div>
                  <div className="absolute inset-0 border-2 border-salon-black rounded-full border-t-transparent animate-spin"></div>
                </div>
                <h2 className="text-2xl font-light text-salon-black mb-4" style={{ fontFamily: '"Playfair Display", serif' }}>Curating your beauty journey...</h2>
                <div className="h-6 overflow-hidden">
                  <motion.p 
                    animate={{ y: [0, -24, -24, -48] }} 
                    transition={{ duration: 2, times: [0, 0.4, 0.6, 1] }} 
                    className="text-salon-gray font-light text-sm flex flex-col items-center"
                  >
                    <span className="h-6 flex items-center">Analyzing event requirements...</span>
                    <span className="h-6 flex items-center">Calculating optimal treatment dates...</span>
                    <span className="h-6 flex items-center">Building your beauty timeline...</span>
                  </motion.p>
                </div>
              </motion.div>
            )}

            {appState === 'success' && (
              <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }} className="flex flex-col items-center justify-center py-40 relative">
                <Confetti />
                <div className="w-20 h-20 bg-salon-black rounded-full flex items-center justify-center text-white mb-8 shadow-xl">
                  <Check size={32} strokeWidth={1.5} />
                </div>
                <h2 className="text-3xl font-light text-salon-black mb-3" style={{ fontFamily: '"Playfair Display", serif' }}>Plan Ready</h2>
                <p className="text-salon-gray font-light">Your personalized beauty countdown is ready.</p>
              </motion.div>
            )}

            {appState === 'results' && plan && (
              <motion.div key="results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-16">
                <div className="text-center">
                  <h1 className="text-4xl md:text-5xl font-light text-salon-black mb-4" style={{ fontFamily: '"Playfair Display", serif' }}>Your Personalized Beauty Timeline</h1>
                  <p className="text-salon-gray font-light text-sm">Follow these steps for a flawless look on your big day.</p>
                </div>
                <EventDashboard plan={plan} onReset={handleReset} />
                <EventTimeline plan={plan} onUpdateTask={handleUpdateTask} />
                <RecommendedServices />
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </main>

      {/* Make sure we only show footer if not full-height app */}
      {(appState === 'idle' || appState === 'results') && <Footer />}
    </div>
  );
}
