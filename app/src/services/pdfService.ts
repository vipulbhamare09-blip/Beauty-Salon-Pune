import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export type DownloadMode = 'full' | 'face' | 'skin' | 'compare';

class PDFService {
  
  /**
   * Orchestrates the high-quality PDF generation.
   * Finds the hidden report container, renders each page element, and stitches them into a PDF.
   */
  public async generateReport(mode: DownloadMode, onProgress: (stage: string) => void): Promise<void> {
    try {
      onProgress('Aggregating beauty data...');
      // Small delay to let the DOM settle if we just mounted the hidden report
      await new Promise(resolve => setTimeout(resolve, 500));

      const reportContainer = document.getElementById('comprehensive-pdf-report');
      if (!reportContainer) {
        throw new Error("Report container not found in DOM.");
      }

      onProgress('Rendering clinical report...');
      
      // Select the pages based on the mode
      let pages = Array.from(reportContainer.querySelectorAll('.pdf-page')) as HTMLElement[];
      
      if (mode === 'face') {
        pages = pages.filter(p => p.dataset.pageType === 'cover' || p.dataset.pageType === 'face');
      } else if (mode === 'skin') {
        pages = pages.filter(p => p.dataset.pageType === 'cover' || p.dataset.pageType === 'skin' || p.dataset.pageType === 'action');
      } else if (mode === 'compare') {
        pages = pages.filter(p => p.dataset.pageType === 'cover' || p.dataset.pageType === 'compare');
      }

      if (pages.length === 0) {
        throw new Error("No pages matched the export mode.");
      }

      // We use A4 proportions for the PDF (210 x 297 mm)
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // A4 dimensions in mm
      const pdfWidth = 210;
      const pdfHeight = 297;

      for (let i = 0; i < pages.length; i++) {
        const pageElement = pages[i];
        
        onProgress(`Optimizing PDF (Page ${i + 1} of ${pages.length})...`);

        // High scale for crystal clear typography
        const canvas = await html2canvas(pageElement, {
          scale: 3, 
          useCORS: true,
          logging: false,
          backgroundColor: '#FFFFFF',
        });

        const imgData = canvas.toDataURL('image/jpeg', 0.85); // 0.85 compression to balance size and sharpness

        if (i > 0) {
          pdf.addPage();
        }

        pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');
      }

      onProgress('Preparing download...');
      pdf.save(`PuneBeauty_Clinical_Report_${Date.now()}.pdf`);

    } catch (error) {
      console.error("Failed to generate PDF report:", error);
      throw error;
    }
  }
}

export const pdfService = new PDFService();
