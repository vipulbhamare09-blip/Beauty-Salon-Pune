import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { RefreshCcw, Download, MapPin, MessageCircle, AlertCircle, CheckCircle2, ShieldAlert } from 'lucide-react';
import { usePDFExport } from '../../contexts/PDFExportContext';
import { useBeautyEcosystemStore } from '../../store/useBeautyEcosystemStore';
import type { SkinReportData } from './types';
import StaggerContainer from '../../components/ui/StaggerContainer';
import StaggerItem from '../../components/ui/StaggerItem';
import AnimatedNumber from '../../components/ui/AnimatedNumber';

interface SkinAdvisorDashboardProps {
  originalImage: string;
  onRetake: () => void;
}

const facialRegions: Record<string, { x: number; y: number }> = {
  forehead: { x: 50, y: 20 },
  leftCheek: { x: 32, y: 50 },
  rightCheek: { x: 68, y: 50 },
  nose: { x: 50, y: 48 },
  chin: { x: 50, y: 75 },
  leftEye: { x: 38, y: 38 },
  rightEye: { x: 62, y: 38 },
  jawline: { x: 50, y: 65 },
  mouthArea: { x: 50, y: 62 }
};

const concernMapping: Record<string, string[]> = {
  Acne: ["forehead", "leftCheek", "rightCheek", "chin"],
  Pigmentation: ["leftCheek", "rightCheek", "forehead"],
  "Dark Circles": ["leftEye", "rightEye"],
  Pores: ["nose", "leftCheek", "rightCheek"],
  Hydration: ["forehead", "leftCheek", "rightCheek", "mouthArea"],
  Oiliness: ["forehead", "nose", "chin"]
};

const possibleConcerns = ["Hydration", "Pigmentation", "Pores", "Oiliness", "Dark Circles", "Acne"];

const MOCK_REPORT: SkinReportData = {
  userImage: '', 
  overallScore: 89,
  confidenceScore: 96,
  metrics: [
    { name: 'Hydration', score: 72, status: 'Needs Improvement' },
    { name: 'Oil Level', score: 85, status: 'Good' },
    { name: 'Pores', score: 92, status: 'Excellent' },
    { name: 'Pigmentation', score: 88, status: 'Good' },
    { name: 'Acne', score: 95, status: 'Excellent' },
    { name: 'UV Shield', score: 68, status: 'Needs Improvement' },
    { name: 'Elasticity', score: 90, status: 'Excellent' },
  ],
  concerns: [], // Will be populated dynamically
  recommendedIngredients: ['Niacinamide', 'Hyaluronic Acid', 'Vitamin C', 'Ceramides', 'Peptides'],
  avoidedIngredients: ['Heavy Fragrances', 'Alcohol-heavy Toners', 'Comedogenic Oils'],
  recommendedProducts: ['Luxury Gentle Cleanser', 'Hydrating Barrier Serum', 'Daily Mineral SPF 50', 'Ceramide Night Cream', 'BHA Liquid Exfoliant'],
  routines: {
    morning: [
      { step: 1, name: 'Gentle Cleanse', description: 'Wash face with lukewarm water and a non-stripping cleanser.' },
      { step: 2, name: 'Vitamin C Serum', description: 'Apply 3-4 drops to brighten and protect against free radicals.' },
      { step: 3, name: 'Light Moisturizer', description: 'Lock in hydration without clogging pores.' },
      { step: 4, name: 'SPF 50+', description: 'Apply generously to face, neck, and chest.' },
    ],
    night: [
      { step: 1, name: 'Double Cleanse', description: 'Use a cleansing balm followed by a water-based cleanser.' },
      { step: 2, name: 'Retinol', description: 'Apply a pea-sized amount to stimulate collagen production.' },
      { step: 3, name: 'Rich Night Cream', description: 'Apply a thick layer to repair the skin barrier overnight.' },
    ],
    weekly: [
      { step: 1, name: 'BHA Exfoliation', description: 'Use 2x a week to gently clear pores.' },
      { step: 2, name: 'Hydrating Mask', description: 'Use 1x a week to boost moisture levels.' },
    ],
  },
  forecast: [
    { metric: 'Hydration', improvement: '+15%' },
    { metric: 'Elasticity', improvement: '+8%' },
    { metric: 'Texture', improvement: '+12%' },
    { metric: 'Glow', improvement: '+18%' },
  ]
};

// SVG Progress Ring Component
function ProgressRing({ score, label, status }: { score: number, label: string, status: string }) {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-24 h-24 mb-3">
        <svg className="w-full h-full transform -rotate-90">
          <circle cx="48" cy="48" r={radius} stroke="currentColor" strokeWidth="4" fill="transparent" className="text-salon-gray/20" />
          <motion.circle
            cx="48" cy="48" r={radius} stroke="currentColor" strokeWidth="4" fill="transparent"
            className="text-salon-black drop-shadow-md"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <AnimatedNumber value={score} className="text-xl font-light text-salon-black font-poppins" />
        </div>
      </div>
      <span className="text-xs font-poppins uppercase tracking-widest text-salon-black mb-1 text-center">{label}</span>
      <span className="text-[9px] font-poppins uppercase tracking-wider text-salon-gray">{status}</span>
    </div>
  );
}

export default function SkinAdvisorDashboard({ originalImage, onRetake }: SkinAdvisorDashboardProps) {
  const navigate = useNavigate();
  const { exportReport } = usePDFExport();
  const [report, setReport] = useState<SkinReportData | null>(null);
  const setSkinAdvisor = useBeautyEcosystemStore(state => state.setSkinAdvisor);


  useEffect(() => {
    // Simulate Intelligent Analysis (Demo)
    const numConcerns = Math.floor(Math.random() * 3) + 2; // 2 to 4 concerns
    const shuffled = [...possibleConcerns].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, numConcerns);

    const generatedConcerns = selected.map(c => {
      let issueStr = c;
      if (c === 'Hydration') issueStr = 'Mild Dehydration';
      if (c === 'Pigmentation') issueStr = 'Uneven Pigmentation';
      if (c === 'Pores') issueStr = 'Enlarged Pores';
      if (c === 'Oiliness') issueStr = 'Excess Sebum';
      if (c === 'Acne') issueStr = 'Active Breakouts';
      
      return {
        id: c,
        issue: issueStr,
        impact: `Identified ${c.toLowerCase()} zones requiring attention.`,
        recommendation: `Targeted treatment for ${c.toLowerCase()}.`,
        confidence: Math.floor(85 + Math.random() * 14) // 85 to 98
      };
    });

    const newReport = {
      ...MOCK_REPORT,
      userImage: originalImage,
      concerns: generatedConcerns,
    };
    
    setReport(newReport);

    setSkinAdvisor({
      skinType: 'Combination', // Simulated mock
      hydrationScore: newReport.metrics.find(m => m.name === 'Hydration')?.score || 72,
      acneScore: newReport.metrics.find(m => m.name === 'Acne')?.score || 95,
      skinHealthScore: newReport.overallScore,
      detectedConcerns: generatedConcerns.map(c => c.id)
    });
  }, [originalImage, setSkinAdvisor]);

  if (!report) return null;

  return (
    <div className="w-full pb-10">
      
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
        
        {/* LEFT COLUMN: Sticky Visuals */}
        <div className="w-full lg:w-1/3 flex flex-col gap-8 lg:sticky lg:top-32 lg:h-[calc(100vh-8rem)]">
          <StaggerContainer>
          {/* Hero Score Card */}
          <StaggerItem 
            className="bg-salon-black text-salon-white rounded-3xl p-8 relative overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
            <div className="relative z-10 flex flex-col items-center text-center">
              <span className="text-xs font-poppins uppercase tracking-widest text-white/60 mb-2">Skin Health Score</span>
              <div className="text-6xl font-light mb-2 flex items-baseline gap-2" style={{ fontFamily: '"Playfair Display", serif' }}>
                <AnimatedNumber value={report.overallScore} /> <span className="text-2xl text-white/40">/ 100</span>
              </div>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-xs font-poppins tracking-widest uppercase mb-6">
                Excellent
              </span>
              <div className="w-full pt-6 border-t border-white/10 flex justify-between items-center text-xs font-poppins tracking-wider text-white/50">
                <span>Analysis Confidence</span>
                <span className="text-white"><AnimatedNumber value={report.confidenceScore} suffix="%" /></span>
              </div>
            </div>
          </StaggerItem>

          {/* AI Skin Overlay Visual */}
          <StaggerItem 
            className="relative w-full aspect-[3/4] rounded-3xl overflow-hidden bg-salon-light border border-salon-gray/20 shadow-sm group hover:shadow-xl hover:-translate-y-1 hover:border-salon-gray/40 transition-all duration-300 mt-8"
          >
            <img src={report.userImage} alt="User Face" className="w-full h-full object-cover opacity-90" />
            
            {/* Overlay Markers */}
            <div className="absolute inset-0 pointer-events-none z-10">
              {(() => {
                // Group concerns by facial region to prevent overlapping/stacked labels
                const regionsMap = new Map<string, typeof report.concerns>();
                report.concerns.forEach(concern => {
                  const regions = concernMapping[concern.id] || [];
                  regions.forEach(regionKey => {
                    if (!regionsMap.has(regionKey)) regionsMap.set(regionKey, []);
                    regionsMap.get(regionKey)!.push(concern);
                  });
                });

                return Array.from(regionsMap.entries()).map(([regionKey, concernsAtRegion], idx) => {
                  const region = facialRegions[regionKey];
                  if (!region) return null;
                  
                  return (
                    <motion.div 
                      key={regionKey}
                      initial={{ opacity: 0, scale: 0.8 }} 
                      animate={{ opacity: 1, scale: 1 }} 
                      transition={{ delay: 1 + (idx * 0.15), duration: 0.4 }} 
                      className="absolute flex flex-col items-center"
                      style={{ top: `${region.y}%`, left: `${region.x}%`, transform: 'translate(-50%, -50%)' }}
                    >
                      <div className="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.9)] animate-pulse mb-1.5" />
                      <div className="flex flex-col gap-1 items-center">
                        {concernsAtRegion.map(concern => (
                          <span 
                            key={concern.id}
                            className="bg-white/90 backdrop-blur-md px-2 py-1 rounded shadow-sm text-[8px] uppercase tracking-wider text-salon-black font-medium whitespace-nowrap"
                          >
                            {concern.issue} • {concern.confidence}%
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  );
                });
              })()}
            </div>
            
            <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-3 rounded-2xl flex items-center justify-between shadow-sm z-20">
              <span className="text-[10px] font-poppins uppercase tracking-widest text-salon-black flex items-center gap-2">
                <ShieldAlert size={12} />
                AI Mapping Active
              </span>
            </div>
          </StaggerItem>
          </StaggerContainer>
        </div>

        {/* RIGHT COLUMN: Scrollable Data */}
        <StaggerContainer className="w-full lg:w-2/3 flex flex-col gap-12">
          
          {/* Detailed Metrics */}
          <section>
            <h3 className="text-2xl text-salon-black mb-8 font-light" style={{ fontFamily: '"Playfair Display", serif' }}>Detailed Metrics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-4">
              {report.metrics.map((m) => (
                <StaggerItem key={m.name}>
                  <ProgressRing score={m.score} label={m.name} status={m.status} />
                </StaggerItem>
              ))}
            </div>
          </section>

          {/* Detected Concerns */}
          <section>
            <h3 className="text-2xl text-salon-black mb-6 font-light" style={{ fontFamily: '"Playfair Display", serif' }}>Detected Concerns</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {report.concerns.map((c) => (
                <StaggerItem key={c.issue}
                  className="p-6 bg-salon-light rounded-3xl border border-salon-gray/10 hover:shadow-lg hover:-translate-y-1 hover:border-salon-gray/30 transition-all duration-300"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <AlertCircle size={16} className="text-salon-black" />
                    <h4 className="text-sm font-poppins font-medium uppercase tracking-wider">{c.issue}</h4>
                  </div>
                  <p className="text-xs text-salon-gray mb-3 leading-relaxed">{c.impact}</p>
                  <p className="text-xs font-medium text-salon-black italic">Rec: {c.recommendation}</p>
                </StaggerItem>
              ))}
            </div>
          </section>

          {/* Ingredients & Products */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <StaggerItem>
              <h3 className="text-lg font-poppins uppercase tracking-widest text-salon-black mb-4 flex items-center gap-2">
                <CheckCircle2 size={16} /> Recommended
              </h3>
              <div className="flex flex-wrap gap-2 mb-8">
                {report.recommendedIngredients.map(i => (
                  <span key={i} className="px-3 py-1.5 bg-salon-black text-white text-[10px] uppercase tracking-wider rounded-full">{i}</span>
                ))}
              </div>

              <h3 className="text-lg font-poppins uppercase tracking-widest text-salon-black mb-4 flex items-center gap-2">
                <ShieldAlert size={16} /> Avoid
              </h3>
              <div className="flex flex-wrap gap-2">
                {report.avoidedIngredients.map(i => (
                  <span key={i} className="px-3 py-1.5 bg-salon-light border border-salon-gray/20 text-salon-gray text-[10px] uppercase tracking-wider rounded-full">{i}</span>
                ))}
              </div>
            </StaggerItem>

            <StaggerItem className="bg-salon-light p-8 rounded-3xl border border-salon-gray/10 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <h3 className="text-lg font-poppins uppercase tracking-widest text-salon-black mb-6">Product Matches</h3>
              <ul className="space-y-4">
                {report.recommendedProducts.map(p => (
                  <li key={p} className="flex items-center gap-3 text-sm text-salon-gray">
                    <div className="w-1.5 h-1.5 rounded-full bg-salon-black" />
                    {p}
                  </li>
                ))}
              </ul>
            </StaggerItem>
          </section>

          {/* Routines Timeline */}
          <section>
            <h3 className="text-2xl text-salon-black mb-8 font-light" style={{ fontFamily: '"Playfair Display", serif' }}>Prescribed Routine</h3>
            <div className="space-y-8">
              {Object.entries(report.routines).map(([time, steps]) => (
                <StaggerItem key={time}>
                  <h4 className="text-sm font-poppins uppercase tracking-widest text-salon-gray mb-4 border-b border-salon-gray/20 pb-2">{time}</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {steps.map(step => (
                      <div key={step.step} className="p-4 bg-white border border-salon-gray/10 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-salon-gray/30 transition-all duration-300">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="w-6 h-6 flex items-center justify-center bg-salon-black text-white text-[10px] rounded-full font-medium">
                            {step.step}
                          </span>
                          <span className="font-poppins uppercase tracking-wider text-xs font-medium text-salon-black">{step.name}</span>
                        </div>
                        <p className="text-[11px] text-salon-gray pl-9">{step.description}</p>
                      </div>
                    ))}
                  </div>
                </StaggerItem>
              ))}
            </div>
          </section>

          {/* Expected Improvement */}
          <section>
            <h3 className="text-2xl text-salon-black mb-6 font-light" style={{ fontFamily: '"Playfair Display", serif' }}>30-Day Forecast</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {report.forecast.map((f) => (
                <StaggerItem key={f.metric}
                  className="bg-salon-black text-white p-6 rounded-3xl text-center hover:shadow-[0_15px_30px_rgba(0,0,0,0.2)] hover:-translate-y-1 transition-all duration-300"
                >
                  <span className="block text-[10px] uppercase tracking-widest text-white/60 mb-2">{f.metric}</span>
                  <span className="block text-2xl font-light" style={{ fontFamily: '"Playfair Display", serif' }}>{f.improvement}</span>
                </StaggerItem>
              ))}
            </div>
          </section>

          {/* Future Integrations CTA */}
          <StaggerContainer className="flex flex-col sm:flex-row gap-4 mt-8 pt-8 border-t border-salon-gray/20">
            <StaggerItem className="flex-1">
              <button onClick={() => exportReport('skin')} className="w-full flex items-center justify-center gap-2 py-4 bg-salon-black text-white rounded-none uppercase text-xs tracking-widest hover:bg-salon-dark hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                <Download size={16} /> Download Report
              </button>
            </StaggerItem>
            <StaggerItem className="flex-1">
              <button onClick={() => navigate('/beauty-concierge')} className="w-full flex items-center justify-center gap-2 py-4 border border-salon-black text-salon-black rounded-none uppercase text-xs tracking-widest hover:bg-salon-light hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                <MessageCircle size={16} /> Beauty Concierge
              </button>
            </StaggerItem>
            <StaggerItem className="flex-1">
              <button onClick={() => navigate('/salon-finder')} className="w-full flex items-center justify-center gap-2 py-4 border border-salon-black text-salon-black rounded-none uppercase text-xs tracking-widest hover:bg-salon-light hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                <MapPin size={16} /> Find Salon
              </button>
            </StaggerItem>
          </StaggerContainer>

          <StaggerContainer className="flex justify-center mt-8">
            <StaggerItem>
              <button onClick={onRetake} className="px-8 py-4 text-salon-gray text-xs tracking-[0.15em] uppercase hover:text-salon-black hover:-translate-y-1 transition-all duration-300 flex items-center gap-2">
                <RefreshCcw size={14} /> Upload New Photo
              </button>
            </StaggerItem>
          </StaggerContainer>

        </StaggerContainer>
      </div>

    </div>
  );
}
