import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router';
import { ChevronLeft } from 'lucide-react';
import Footer from '../sections/Footer';
import SkinAdvisorHero from '../sections/skin-advisor/SkinAdvisorHero';
import UploadArea from '../sections/face-analysis/UploadArea';
import SkinAdvisorLoading from '../sections/skin-advisor/SkinAdvisorLoading';
import SkinAdvisorDashboard from '../sections/skin-advisor/SkinAdvisorDashboard';
import AIPipeline from '../components/system/AIPipeline';
import SuccessModal from '../components/system/SuccessModal';
import SEO from '../components/system/SEO';

export type SkinAdvisorState = 'idle' | 'simulating' | 'pipeline' | 'success' | 'dashboard';

export default function SkinAdvisorPage() {
  const [advisorState, setAdvisorState] = useState<SkinAdvisorState>('idle');
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleUpload = (img: string) => {
    setOriginalImage(img);
    setAdvisorState('simulating');
  };

  const handleSimulationComplete = () => {
    setAdvisorState('pipeline');
  };

  const handlePipelineComplete = () => {
    setAdvisorState('success');
  };

  const handleSuccessComplete = () => {
    setAdvisorState('dashboard');
  };

  return (
    <div className="min-h-screen bg-salon-light flex flex-col font-poppins selection:bg-salon-black selection:text-salon-white">
      <SEO title="Skin Advisor" description="Get clinical-grade skin analysis and personalized routines." />
      
      <main className="flex-grow pt-24 pb-20 relative overflow-hidden">
        {/* Subtle Background Elements to match premium aesthetic */}
        <div className="absolute top-0 left-0 w-full h-[60vh] bg-gradient-to-b from-salon-light to-transparent opacity-50 pointer-events-none" />
        
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative z-10">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => navigate('/services')}
            className="flex items-center text-salon-gray hover:text-salon-black transition-colors mb-8 text-sm tracking-widest uppercase"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Services
          </motion.button>

          <AnimatePresence mode="wait">
            {advisorState === 'idle' && (
              <motion.div
                key="idle"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                transition={{ duration: 0.6 }}
              >
                <SkinAdvisorHero />
                <UploadArea onUpload={handleUpload} />
              </motion.div>
            )}

            {advisorState === 'simulating' && originalImage && (
              <motion.div
                key="simulating"
                initial={{ opacity: 0, filter: 'blur(10px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.8 }}
              >
                <SkinAdvisorLoading image={originalImage} onComplete={handleSimulationComplete} />
              </motion.div>
            )}

            {advisorState === 'pipeline' && (
              <motion.div
                key="pipeline"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="min-h-[50vh] flex flex-col items-center justify-center"
              >
                <AIPipeline 
                  steps={[
                    "Analyzing Skin Texture",
                    "Measuring Hydration Levels",
                    "Detecting Fine Lines",
                    "Assessing Pores and Pigmentation",
                    "Formulating Skincare Routine",
                    "Personalized Report Ready"
                  ]}
                  onComplete={handlePipelineComplete}
                  stepDuration={250}
                />
              </motion.div>
            )}

            {advisorState === 'success' && (
              <SuccessModal 
                onComplete={handleSuccessComplete}
                title="Analysis Complete"
                subtitle="Your personalized skincare routine is ready."
              />
            )}

            {advisorState === 'dashboard' && originalImage && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <SkinAdvisorDashboard originalImage={originalImage} onRetake={() => setAdvisorState('idle')} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <Footer />
    </div>
  );
}
