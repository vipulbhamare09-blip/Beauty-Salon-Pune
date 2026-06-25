import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router';
import { ChevronLeft } from 'lucide-react';
import Footer from '../sections/Footer';
import FaceAnalysisHero from '../sections/face-analysis/FaceAnalysisHero';
import UploadArea from '../sections/face-analysis/UploadArea';
import ScanningProcess from '../sections/face-analysis/ScanningProcess';
import AnalysisResults from '../sections/face-analysis/AnalysisResults';
import SEO from '../components/system/SEO';
import AIPipeline from '../components/system/AIPipeline';
import SuccessModal from '../components/system/SuccessModal';

export type AnalysisState = 'idle' | 'scanning' | 'pipeline' | 'success' | 'results';

export default function FaceAnalysisPage() {
  const [analysisState, setAnalysisState] = useState<AnalysisState>('idle');
  const [image, setImage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleUpload = (img: string) => {
    setImage(img);
    setAnalysisState('scanning');
  };

  const handleScanComplete = () => {
    setAnalysisState('pipeline');
  };

  const handlePipelineComplete = () => {
    setAnalysisState('success');
  };

  const handleSuccessComplete = () => {
    setAnalysisState('results');
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] flex flex-col font-poppins selection:bg-salon-black selection:text-salon-white">
      <SEO title="AI Face Analysis" description="Discover your unique facial architecture with our premium AI Face Analysis." />
      
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
            {analysisState === 'idle' && (
              <motion.div
                key="idle"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                transition={{ duration: 0.6 }}
              >
                <FaceAnalysisHero />
                <UploadArea onUpload={handleUpload} />
              </motion.div>
            )}

            {analysisState === 'scanning' && image && (
              <motion.div
                key="scanning"
                initial={{ opacity: 0, filter: 'blur(10px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.8 }}
              >
                <ScanningProcess image={image} onComplete={handleScanComplete} />
              </motion.div>
            )}

            {analysisState === 'pipeline' && (
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
                    "Face Detected",
                    "Facial Landmarks Identified",
                    "Skin Texture Analyzed",
                    "Face Shape Classified",
                    "Beauty Attributes Extracted",
                    "Personalized Recommendations Generated",
                    "Report Ready"
                  ]}
                  onComplete={handlePipelineComplete}
                  stepDuration={250}
                />
              </motion.div>
            )}

            {analysisState === 'success' && (
              <SuccessModal 
                onComplete={handleSuccessComplete}
                title="Analysis Complete"
                subtitle="Your personalized AI insights are ready."
              />
            )}

            {analysisState === 'results' && image && (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <AnalysisResults image={image} onRetake={() => setAnalysisState('idle')} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <Footer />
    </div>
  );
}
