import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { pdfService, type DownloadMode } from '../services/pdfService';
import ComprehensivePDFReport from '../components/pdf/ComprehensivePDFReport';
import ExportLoadingModal from '../components/pdf/ExportLoadingModal';

interface PDFExportContextType {
  exportReport: (mode: DownloadMode) => Promise<void>;
}

const PDFExportContext = createContext<PDFExportContextType | undefined>(undefined);

export function PDFExportProvider({ children }: { children: ReactNode }) {
  const [isExporting, setIsExporting] = useState(false);
  const [exportStage, setExportStage] = useState('Initializing...');

  const exportReport = async (mode: DownloadMode) => {
    setIsExporting(true);
    setExportStage('Initializing...');
    
    try {
      await pdfService.generateReport(mode, (stage) => setExportStage(stage));
    } catch (error) {
      console.error("Export failed", error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <PDFExportContext.Provider value={{ exportReport }}>
      {children}
      
      {/* Hidden PDF Engine */}
      <ComprehensivePDFReport />
      
      {/* Global Loading Modal */}
      <ExportLoadingModal isOpen={isExporting} stage={exportStage} />
    </PDFExportContext.Provider>
  );
}

export const usePDFExport = () => {
  const context = useContext(PDFExportContext);
  if (context === undefined) {
    throw new Error('usePDFExport must be used within a PDFExportProvider');
  }
  return context;
};
