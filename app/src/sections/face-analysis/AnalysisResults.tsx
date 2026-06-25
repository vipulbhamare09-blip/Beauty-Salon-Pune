import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, RadialBarChart, RadialBar, PolarRadiusAxis } from 'recharts';
import { Download, Scissors, RefreshCcw, MapPin, MessageCircle } from 'lucide-react';
import { usePDFExport } from '../../contexts/PDFExportContext';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import { useBeautyEcosystemStore } from '../../store/useBeautyEcosystemStore';
import StaggerContainer from '../../components/ui/StaggerContainer';
import StaggerItem from '../../components/ui/StaggerItem';
import AnimatedNumber from '../../components/ui/AnimatedNumber';

interface AnalysisResultsProps {
  image: string;
  onRetake: () => void;
}

const MOCK_RADAR_DATA = [
  { subject: 'Symmetry', A: 95, fullMark: 100 },
  { subject: 'Jawline', A: 91, fullMark: 100 },
  { subject: 'Eye Balance', A: 93, fullMark: 100 },
  { subject: 'Smile Score', A: 96, fullMark: 100 },
  { subject: 'Proportion', A: 90, fullMark: 100 },
];

const MOCK_SKIN_DATA = [
  { name: 'Skin Health', value: 88, fill: '#000000' }
];

export default function AnalysisResults({ image, onRetake }: AnalysisResultsProps) {
  const navigate = useNavigate();
  const { exportReport } = usePDFExport();
  const setFaceAnalysis = useBeautyEcosystemStore(state => state.setFaceAnalysis);

  useEffect(() => {
    setFaceAnalysis({
      faceShape: 'Oval',
      beautyScore: 92,
      symmetryScore: 95,
      strengths: ['Jawline', 'Eye Balance'],
      detectedGender: 'female' // using mock logic as default
    });
  }, [setFaceAnalysis]);

  const handleDownloadPDF = async () => {
    await exportReport('face');
  };

  return (
    <StaggerContainer className="max-w-[1200px] mx-auto w-full pb-20">
      <div className="text-center mb-16">
        <StaggerItem className="text-4xl lg:text-5xl font-light text-salon-black mb-4" style={{ fontFamily: '"Playfair Display", serif' }}>
          Your Analysis Report
        </StaggerItem>
        <StaggerItem className="text-salon-gray font-poppins tracking-[0.2em] uppercase text-sm">
          Discover your unique beauty metrics
        </StaggerItem>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16">
        {/* Left Column: Image & Primary Score */}
        <div className="lg:col-span-4 flex flex-col gap-8">
          <StaggerItem className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[3/4] bg-salon-black group hover:shadow-3xl hover:-translate-y-1 hover:border-white/20 transition-all duration-300">
            <img src={image} alt="Analyzed face" className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
              <div>
                <p className="text-white/70 text-xs font-poppins uppercase tracking-widest mb-1">Overall Beauty Score</p>
                <p className="text-white text-5xl font-light" style={{ fontFamily: '"Playfair Display", serif' }}>
                  <AnimatedNumber value={92} />
                  <span className="text-2xl text-white/50">/100</span>
                </p>
              </div>
            </div>
          </StaggerItem>

          <StaggerItem className="bg-white/50 backdrop-blur-md border border-salon-gray/10 p-6 rounded-3xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
            <h3 className="font-poppins uppercase tracking-widest text-xs text-salon-gray mb-6">Core Traits</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-salon-gray/10 pb-4">
                <span className="text-salon-black font-medium text-sm">Face Shape</span>
                <span className="text-salon-gray text-sm">Oval</span>
              </div>
              <div className="flex justify-between items-center border-b border-salon-gray/10 pb-4">
                <span className="text-salon-black font-medium text-sm">Skin Type</span>
                <span className="text-salon-gray text-sm">Combination</span>
              </div>
              <div className="flex justify-between items-center border-b border-salon-gray/10 pb-4">
                <span className="text-salon-black font-medium text-sm">Estimated Age</span>
                <span className="text-salon-gray text-sm">23</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-salon-black font-medium text-sm">AI Confidence</span>
                <span className="text-salon-black font-medium text-sm">98%</span>
              </div>
            </div>
          </StaggerItem>
        </div>

        {/* Right Column: Charts & Details */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Radar Chart */}
            <StaggerItem className="bg-white/50 backdrop-blur-md border border-salon-gray/10 p-6 rounded-3xl shadow-sm flex flex-col items-center hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <h3 className="font-poppins uppercase tracking-widest text-xs text-salon-gray mb-2 w-full text-left">Facial Balance</h3>
              <div className="w-full h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={MOCK_RADAR_DATA}>
                    <PolarGrid stroke="#e5e5e5" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#666666', fontSize: 11, fontFamily: 'Poppins' }} />
                    <Radar name="Balance" dataKey="A" stroke="#000000" fill="#000000" fillOpacity={0.1} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </StaggerItem>

            {/* Circular Progress & Skin Health */}
            <StaggerItem className="bg-white/50 backdrop-blur-md border border-salon-gray/10 p-6 rounded-3xl shadow-sm flex flex-col items-center justify-between hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <h3 className="font-poppins uppercase tracking-widest text-xs text-salon-gray mb-2 w-full text-left">Skin Health</h3>
              <div className="w-full h-[180px] relative">
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart cx="50%" cy="50%" innerRadius="70%" outerRadius="100%" barSize={10} data={MOCK_SKIN_DATA} startAngle={90} endAngle={-270}>
                    <PolarRadiusAxis type="number" domain={[0, 100]} angle={90} tick={false} axisLine={false} />
                    <RadialBar background={{ fill: '#f5f5f5' }} dataKey="value" cornerRadius={10} />
                  </RadialBarChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <AnimatedNumber value={88} suffix="%" className="text-3xl font-light text-salon-black" style={{ fontFamily: '"Playfair Display", serif' }} />
                  <span className="text-[10px] text-salon-gray uppercase tracking-widest">Score</span>
                </div>
              </div>
              <div className="w-full mt-4 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-salon-gray">Dark Circles</span>
                  <span className="text-salon-black font-medium">Low</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-salon-gray">Acne</span>
                  <span className="text-salon-black font-medium">Minimal</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-salon-gray">Pigmentation</span>
                  <span className="text-salon-black font-medium">Very Low</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-salon-gray">Hydration</span>
                  <span className="text-salon-gray italic">Needs Improvement</span>
                </div>
              </div>
            </StaggerItem>
          </div>

          {/* Recommendations Section */}
          <StaggerItem className="bg-salon-black text-salon-white p-8 rounded-3xl shadow-2xl relative overflow-hidden hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)] hover:-translate-y-1 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
            <h3 className="font-poppins uppercase tracking-widest text-xs text-white/50 mb-6 relative z-10">AI Recommendations</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 relative z-10">
              <div>
                <h4 className="text-lg font-light mb-2" style={{ fontFamily: '"Playfair Display", serif' }}>Hairstyles</h4>
                <p className="text-xs text-white/70 leading-relaxed font-poppins">Long layers or a textured bob to compliment your oval face shape. Add soft curtain bangs.</p>
              </div>
              <div>
                <h4 className="text-lg font-light mb-2" style={{ fontFamily: '"Playfair Display", serif' }}>Skincare</h4>
                <p className="text-xs text-white/70 leading-relaxed font-poppins">Focus on hydration. Incorporate a hyaluronic acid serum and a richer moisturizer at night.</p>
              </div>
              <div>
                <h4 className="text-lg font-light mb-2" style={{ fontFamily: '"Playfair Display", serif' }}>Makeup</h4>
                <p className="text-xs text-white/70 leading-relaxed font-poppins">Dewy foundation finish with peach blush tones. Soft brown eyeliner to enhance your eye balance.</p>
              </div>
              <div>
                <h4 className="text-lg font-light mb-2" style={{ fontFamily: '"Playfair Display", serif' }}>Eyebrows</h4>
                <p className="text-xs text-white/70 leading-relaxed font-poppins">Maintain a natural soft arch. Avoid over-plucking the tail ends.</p>
              </div>
              <div className="sm:col-span-2 md:col-span-1">
                <h4 className="text-lg font-light mb-2" style={{ fontFamily: '"Playfair Display", serif' }}>Best Colors</h4>
                <div className="flex gap-2 mt-3">
                  <div className="w-6 h-6 rounded-full bg-[#E8D3C8] border border-white/20" title="Soft Peach" />
                  <div className="w-6 h-6 rounded-full bg-[#8A9A86] border border-white/20" title="Sage Green" />
                  <div className="w-6 h-6 rounded-full bg-[#D4AF37] border border-white/20" title="Soft Gold" />
                  <div className="w-6 h-6 rounded-full bg-[#4A5D6A] border border-white/20" title="Slate Blue" />
                </div>
              </div>
            </div>
          </StaggerItem>
        </div>
      </div>

      {/* Action Buttons */}
      <StaggerContainer className="flex flex-wrap justify-center gap-4 mt-8" staggerChildren={0.1}>
        <StaggerItem>
          <button
            onClick={handleDownloadPDF}
            className="px-6 py-3 bg-salon-black text-salon-white text-xs tracking-[0.15em] uppercase hover:bg-salon-dark hover:-translate-y-1 hover:shadow-lg transition-all flex items-center gap-2"
          >
            <Download size={14} />
            Download PDF
          </button>
        </StaggerItem>
        <StaggerItem>
          <button
            onClick={() => navigate('/hairstyle-simulator')}
            className="px-6 py-3 bg-white text-salon-black border border-salon-black/20 text-xs tracking-[0.15em] uppercase hover:border-salon-black hover:-translate-y-1 hover:shadow-lg transition-all flex items-center gap-2"
          >
            <Scissors size={14} />
            Try Hairstyles
          </button>
        </StaggerItem>
        <StaggerItem>
          <button
            onClick={() => navigate('/salon-finder')}
            className="px-6 py-3 bg-white text-salon-black border border-salon-black/20 text-xs tracking-[0.15em] uppercase hover:border-salon-black hover:-translate-y-1 hover:shadow-lg transition-all flex items-center gap-2"
          >
            <MapPin size={14} />
            Find Salon
          </button>
        </StaggerItem>
        <StaggerItem>
          <button
            onClick={() => navigate('/beauty-concierge')}
            className="px-6 py-3 bg-white text-salon-black border border-salon-black/20 text-xs tracking-[0.15em] uppercase hover:border-salon-black hover:-translate-y-1 hover:shadow-lg transition-all flex items-center gap-2"
          >
            <MessageCircle size={14} />
            Talk to Beauty AI
          </button>
        </StaggerItem>
        <StaggerItem>
          <button
            onClick={onRetake}
            className="px-6 py-3 text-salon-gray text-xs tracking-[0.15em] uppercase hover:text-salon-black hover:-translate-y-1 transition-all flex items-center gap-2"
          >
            <RefreshCcw size={14} />
            Retake Photo
          </button>
        </StaggerItem>
      </StaggerContainer>
    </StaggerContainer>
  );
}
