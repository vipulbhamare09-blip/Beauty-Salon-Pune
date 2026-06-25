import { motion } from 'framer-motion';
import type { CompareMetrics } from '../../services/compareService';
import { Sparkles, ArrowUpRight, ShieldCheck, HeartHandshake, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router';
import StaggerContainer from '../../components/ui/StaggerContainer';
import StaggerItem from '../../components/ui/StaggerItem';
import AnimatedNumber from '../../components/ui/AnimatedNumber';

interface Props {
  metrics: CompareMetrics;
  onDownload: () => void;
}

export default function AIPanel({ metrics, onDownload }: Props) {
  const navigate = useNavigate();

  return (
    <StaggerContainer className="w-full flex flex-col gap-6" id="ai-panel">
      
      {/* Overall Score Header */}
      <StaggerItem className="bg-salon-black text-white p-6 sm:p-8 rounded-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
        
        <div className="relative z-10">
          <p className="text-[10px] uppercase tracking-[3px] text-white/50 mb-2">Overall Transformation</p>
          <h2 className="text-3xl font-playfair mb-1">{metrics.overall.category}</h2>
          <p className="text-sm font-light text-white/70">Analysis complete. Alignment score: {metrics.alignmentScore}%</p>
        </div>

        <div className="flex items-center gap-4 relative z-10">
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-widest text-white/50 mb-1">Beauty Score</p>
            <p className="text-2xl font-medium">+<AnimatedNumber value={metrics.overall.beautyScoreDelta} /></p>
          </div>
          <div className="w-16 h-16 rounded-full border-2 border-white/20 flex items-center justify-center relative">
             <motion.div 
                initial={{ rotate: 0 }}
                whileInView={{ rotate: metrics.overall.improvementPercentage * 3.6 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                viewport={{ once: true }}
                className="absolute inset-0 border-2 border-white rounded-full border-l-transparent border-t-transparent"
             />
             <AnimatedNumber value={metrics.overall.improvementPercentage} suffix="%" className="text-sm font-medium" />
          </div>
        </div>
      </StaggerItem>

      {/* Metric Breakdown Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Skin */}
        <MetricCard title="Skin Improvements" icon={<Sparkles size={16} />}>
          <ProgressBar label="Hydration" value={metrics.skin.hydration} />
          <ProgressBar label="Texture" value={metrics.skin.texture} />
          <ProgressBar label="Glow" value={metrics.skin.glow} />
          <ProgressBar label="Acne Reduction" value={Math.abs(metrics.skin.acneVisibility)} />
        </MetricCard>

        {/* Hair */}
        <MetricCard title="Hair Enhancements" icon={<Sparkles size={16} />}>
          <ProgressBar label="Volume" value={metrics.hair.volume} />
          <ProgressBar label="Shine" value={metrics.hair.shine} />
          <ProgressBar label="Frizz Control" value={metrics.hair.frizzReduction} />
          <ProgressBar label="Styling" value={metrics.hair.stylingEnhancement} />
        </MetricCard>

        {/* Facial Presentation */}
        <MetricCard title="Facial Presentation" icon={<ShieldCheck size={16} />}>
          <ProgressBar label="Confidence" value={metrics.facial.confidenceScore} />
          <ProgressBar label="Brightness" value={metrics.facial.brightness} />
          <ProgressBar label="Sharpness" value={metrics.facial.sharpness} />
          <ProgressBar label="Symmetry" value={metrics.facial.symmetry} />
        </MetricCard>

      </div>

      {/* Actions */}
      <StaggerItem className="flex flex-col sm:flex-row gap-4 mt-4">
        <button 
          onClick={onDownload}
          className="flex-1 bg-white border border-salon-gray/20 text-salon-black py-4 rounded-2xl text-xs uppercase tracking-widest font-medium hover:border-salon-black/50 hover:shadow-lg hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
        >
          Download Premium Report
        </button>
      </StaggerItem>

      {/* Ecosystem CTAs */}
      <StaggerItem className="mt-8 border-t border-salon-gray/10 pt-8">
        <p className="text-[10px] uppercase tracking-[3px] text-salon-gray mb-6 text-center">Continue Your Beauty Journey</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <EcosystemCTA 
            title="Skin Advisor" 
            desc="Get deeper routines" 
            icon={<Sparkles size={18}/>} 
            onClick={() => navigate('/skin-advisor')}
          />
          <EcosystemCTA 
            title="Concierge" 
            desc="Ask AI about this" 
            icon={<HeartHandshake size={18}/>} 
            onClick={() => navigate('/beauty-concierge')}
          />
          <EcosystemCTA 
            title="Salons" 
            desc="Book next session" 
            icon={<MapPin size={18}/>} 
            onClick={() => navigate('/salon-finder')}
          />
        </div>
      </StaggerItem>

    </StaggerContainer>
  );
}

function MetricCard({ title, icon, children }: { title: string, icon: React.ReactNode, children: React.ReactNode }) {
  return (
    <StaggerItem className="bg-white p-6 rounded-3xl border border-salon-gray/10 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-center gap-2 text-salon-black mb-6 border-b border-salon-gray/10 pb-4">
        {icon}
        <h3 className="text-sm font-medium tracking-wide">{title}</h3>
      </div>
      <div className="flex flex-col gap-4">
        {children}
      </div>
    </StaggerItem>
  );
}

function ProgressBar({ label, value }: { label: string, value: number }) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-1.5">
        <span className="text-salon-gray font-light">{label}</span>
        <span className="text-salon-black font-medium">+<AnimatedNumber value={value} suffix="%" /></span>
      </div>
      <div className="w-full h-1.5 bg-salon-light rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: `${Math.min(100, Math.max(0, value))}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="h-full bg-salon-black rounded-full"
        ></motion.div>
      </div>
    </div>
  );
}

function EcosystemCTA({ title, desc, icon, onClick }: { title: string, desc: string, icon: React.ReactNode, onClick: () => void }) {
  return (
    <button onClick={onClick} className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-salon-gray/10 hover:border-salon-black/30 hover:shadow-md transition-all group">
      <div className="w-10 h-10 rounded-full bg-salon-light flex items-center justify-center text-salon-gray group-hover:text-salon-black group-hover:bg-gray-100 transition-colors mb-3">
        {icon}
      </div>
      <p className="text-xs font-medium text-salon-black mb-1">{title}</p>
      <p className="text-[10px] text-salon-gray font-light flex items-center gap-1">{desc} <ArrowUpRight size={10}/></p>
    </button>
  );
}
