import type { EventPlan } from '../../services/eventPlanner';
import { differenceInDays } from 'date-fns';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock, RotateCcw, Trophy } from 'lucide-react';

interface EventDashboardProps {
  plan: EventPlan;
  onReset: () => void;
}

export default function EventDashboard({ plan, onReset }: EventDashboardProps) {
  const daysRemaining = differenceInDays(plan.targetDate, new Date());
  
  let statusText = "Needs Attention";
  let statusColor = "text-red-500";
  if (plan.readinessScore > 50) {
    statusText = "On Track";
    statusColor = "text-yellow-500";
  }
  if (plan.readinessScore === 100) {
    statusText = "Excellent Preparation";
    statusColor = "text-green-500";
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-salon-black text-white rounded-3xl p-6 lg:p-8 shadow-xl flex flex-col lg:flex-row justify-between items-center gap-8 relative overflow-hidden"
    >
      {/* Background Decor */}
      <div className="absolute -right-20 -top-20 opacity-5 pointer-events-none">
        <Trophy size={200} />
      </div>

      <div className="flex flex-col gap-2 w-full lg:w-auto relative z-10">
        <div className="flex items-center justify-between lg:justify-start gap-4">
          <h2 className="text-2xl font-playfair">{plan.eventType} Preparation</h2>
          <button 
            onClick={onReset}
            className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-salon-gray hover:text-white transition-colors border border-salon-gray/30 px-3 py-1 rounded-full"
          >
            <RotateCcw size={12} /> Reset
          </button>
        </div>
        <p className="text-salon-gray text-sm font-light">Target Date: <span className="text-white">{plan.targetDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span></p>
      </div>

      <div className="grid grid-cols-3 gap-6 w-full lg:w-auto relative z-10">
        
        {/* Readiness Score */}
        <div className="flex flex-col items-center justify-center p-4 bg-white/10 rounded-2xl">
          <span className="text-xs text-salon-gray uppercase tracking-widest mb-1 text-center">Readiness</span>
          <span className="text-3xl font-light text-white">{plan.readinessScore}%</span>
          <span className={`text-[9px] uppercase tracking-wider mt-1 text-center ${statusColor}`}>{statusText}</span>
        </div>

        {/* Days Remaining */}
        <div className="flex flex-col items-center justify-center p-4 bg-white/5 rounded-2xl">
          <span className="text-xs text-salon-gray uppercase tracking-widest mb-1 flex items-center gap-1"><Clock size={12}/> Days</span>
          <span className="text-3xl font-light text-white">{Math.max(0, daysRemaining)}</span>
          <span className="text-[9px] uppercase tracking-wider mt-1 text-salon-gray text-center">Remaining</span>
        </div>

        {/* Tasks Completed */}
        <div className="flex flex-col items-center justify-center p-4 bg-white/5 rounded-2xl">
          <span className="text-xs text-salon-gray uppercase tracking-widest mb-1 flex items-center gap-1"><CheckCircle2 size={12}/> Tasks</span>
          <span className="text-3xl font-light text-white">{plan.completedTasks}<span className="text-sm text-salon-gray">/{plan.totalTasks}</span></span>
          <span className="text-[9px] uppercase tracking-wider mt-1 text-salon-gray text-center">Completed</span>
        </div>

      </div>

    </motion.div>
  );
}
