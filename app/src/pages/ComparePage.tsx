import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '../sections/Footer';
import CompareUpload from '../sections/compare/CompareUpload';
import CompareLoading from '../sections/compare/CompareLoading';
import CompareResults from '../sections/compare/CompareResults';
import { compareService } from '../services/compareService';
import type { CompareMetrics } from '../services/compareService';
import SEO from '../components/system/SEO';
import { toast } from 'sonner';
import AIPipeline from '../components/system/AIPipeline';
import SuccessModal from '../components/system/SuccessModal';

export default function ComparePage() {
  const [appState, setAppState] = useState<'upload' | 'validating' | 'loading' | 'pipeline' | 'success' | 'results'>('upload');
  
  const [beforeImage, setBeforeImage] = useState<string | null>(null);
  const [afterImage, setAfterImage] = useState<string | null>(null);
  

  const [metrics, setMetrics] = useState<CompareMetrics | null>(null);

  // Load from local storage on mount
  useEffect(() => {
    const saved = compareService.getSavedResults();
    if (saved) {
      setBeforeImage(saved.beforeImage);
      setAfterImage(saved.afterImage);
      setMetrics(saved.metrics);
      setAppState('results');
    }
  }, []);

  const handleValidation = async (beforeUrl: string, afterUrl: string) => {
    setAppState('validating');
    
    const result = await compareService.validateImages(beforeUrl, afterUrl);

    if (result.status === 'valid' || result.status === 'warning') {
      if (result.status === 'warning') {
        toast.warning(result.message || "Minor alignment issue detected, but proceeding.");
      }
      handleAnalysis(beforeUrl, afterUrl);
    } else {
      toast.error(result.message || "Image validation failed. Please upload clearer images.");
      setAppState('upload');
    }
  };

  const handleAnalysis = async (beforeUrl: string, afterUrl: string) => {
    setAppState('loading');
    const result = await compareService.analyzeTransformation(beforeUrl, afterUrl);
    setMetrics(result);
    compareService.saveResults(beforeUrl, afterUrl, result);
    // Simulate slight delay before pipeline
    setTimeout(() => {
      setAppState('pipeline');
    }, 500);
  };

  const handlePipelineComplete = () => {
    setAppState('success');
  };

  const handleSuccessComplete = () => {
    setAppState('results');
  };

  const resetComparison = () => {
    compareService.clearSavedResults();
    setBeforeImage(null);
    setAfterImage(null);
    setMetrics(null);
    setAppState('upload');
  };

  return (
    <div className="min-h-screen bg-salon-light flex flex-col font-poppins selection:bg-salon-black selection:text-salon-white">
      <SEO title="Before & After Transformation" description="Visualize your beauty transformation with our AI-powered before and after slider." />
      
      <main className="flex-grow pt-24 pb-12 flex flex-col items-center justify-center relative min-h-[calc(100vh-80px)]">
        
        <AnimatePresence mode="wait">
          
          {appState === 'upload' && (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full max-w-[1400px] mx-auto px-4 lg:px-8"
            >
              <CompareUpload 
                beforeImage={beforeImage}
                setBeforeImage={setBeforeImage}
                afterImage={afterImage}
                setAfterImage={setAfterImage}
                onAnalyze={() => {
                  if (beforeImage && afterImage) handleValidation(beforeImage, afterImage);
                }}
              />
            </motion.div>
          )}

          {(appState === 'validating' || appState === 'loading') && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full max-w-4xl mx-auto px-4"
            >
              <CompareLoading stage={appState} />
            </motion.div>
          )}

          {appState === 'pipeline' && (
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
                  "Aligning Images",
                  "Detecting Facial Transformations",
                  "Analyzing Skin Enhancements",
                  "Measuring Feature Improvements",
                  "Calculating Beauty Metrics",
                  "Preparing Comparison Report"
                ]}
                onComplete={handlePipelineComplete}
                stepDuration={250}
              />
            </motion.div>
          )}

          {appState === 'success' && (
            <SuccessModal 
              onComplete={handleSuccessComplete}
              title="Comparison Complete"
              subtitle="Your detailed transformation analysis is ready."
            />
          )}

          {appState === 'results' && metrics && beforeImage && afterImage && (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="w-full max-w-[1600px] mx-auto px-4 lg:px-8"
            >
              <CompareResults 
                beforeImage={beforeImage} 
                afterImage={afterImage} 
                metrics={metrics} 
                onReset={resetComparison}
              />
            </motion.div>
          )}

        </AnimatePresence>

      </main>

      {appState !== 'results' && <Footer />}
    </div>
  );
}
