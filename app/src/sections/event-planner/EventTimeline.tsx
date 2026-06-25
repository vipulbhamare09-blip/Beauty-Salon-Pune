import { motion } from 'framer-motion';
import type { EventPlan, TimelineMilestone, TimelineTask } from '../../services/eventPlanner';
import { Check, Sparkles } from 'lucide-react';

interface EventTimelineProps {
  plan: EventPlan;
  onUpdateTask: (milestoneId: string, taskId: string, completed: boolean) => void;
}

export default function EventTimeline({ plan, onUpdateTask }: EventTimelineProps) {
  return (
    <div className="relative py-10 max-w-3xl mx-auto w-full">
      {/* Left Vertical Line */}
      <div className="absolute left-[39px] md:left-[47px] top-10 bottom-10 w-[2px] bg-neutral-200">
        <motion.div 
          initial={{ height: 0 }}
          whileInView={{ height: '100%' }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="w-full bg-salon-black"
        />
      </div>
      
      <div className="space-y-12">
        {plan.milestones.map((milestone, index) => (
          <MilestoneCard 
            key={milestone.id} 
            milestone={milestone} 
            index={index} 
            onUpdateTask={onUpdateTask} 
          />
        ))}
      </div>
    </div>
  );
}

interface MilestoneCardProps {
  milestone: TimelineMilestone;
  index: number;
  onUpdateTask: (milestoneId: string, taskId: string, completed: boolean) => void;
}

function MilestoneCard({ milestone, index, onUpdateTask }: MilestoneCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="relative flex items-start w-full group"
    >
      {/* Node Indicator */}
      <div className="flex-shrink-0 w-20 md:w-24 flex justify-center mt-6 relative z-10">
        <motion.div 
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: (index * 0.15) + 0.2 }}
          className="w-4 h-4 rounded-full bg-salon-black border-4 border-white shadow-sm transition-transform duration-300 group-hover:scale-125"
        />
      </div>

      {/* Card Content */}
      <div className="flex-grow pl-4 md:pl-8">
        <div className="mb-4">
          <p className="text-2xl font-light text-salon-black" style={{ fontFamily: '"Playfair Display", serif' }}>{milestone.offsetLabel}</p>
          <p className="text-xs font-light tracking-[0.2em] uppercase text-salon-gray mt-1">{milestone.dateLabel}</p>
        </div>

        <motion.div 
          whileHover={{ y: -2 }}
          transition={{ duration: 0.3 }}
          className="bg-white/70 backdrop-blur-md p-8 rounded-3xl shadow-sm border border-neutral-200 hover:shadow-md transition-shadow"
        >
          <ul className="space-y-5">
            {milestone.tasks.map(task => (
              <TaskRow 
                key={task.id} 
                task={task} 
                onToggle={() => onUpdateTask(milestone.id, task.id, !task.completed)} 
              />
            ))}
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
}

function TaskRow({ task, onToggle }: { task: TimelineTask, onToggle: () => void }) {
  return (
    <li className="flex items-start gap-4 group cursor-pointer" onClick={onToggle}>
      <button 
        className={`mt-1 flex-shrink-0 w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-300 ${
          task.completed 
            ? 'bg-salon-black border-salon-black text-white' 
            : 'border-neutral-300 group-hover:border-salon-black text-transparent'
        }`}
      >
        <Check size={12} strokeWidth={2} />
      </button>
      
      <div className="flex flex-col flex-grow">
        <span className={`text-left text-sm transition-colors duration-300 ${task.completed ? 'text-salon-gray line-through font-light' : 'text-salon-black font-medium'}`}>
          {task.text}
        </span>
        <div className="flex flex-wrap items-center gap-2 mt-1.5">
          <span className="text-[9px] uppercase tracking-[0.1em] text-salon-gray bg-salon-light px-2.5 py-1 rounded-full border border-neutral-100">
            {task.category}
          </span>
          {task.isEcosystemRecommendation && (
            <span className="text-[9px] uppercase tracking-[0.1em] text-salon-black bg-neutral-100 px-2.5 py-1 rounded-full border border-neutral-200 flex items-center gap-1">
              <Sparkles size={10} strokeWidth={1.5} /> AI Match
            </span>
          )}
        </div>
      </div>
    </li>
  );
}
