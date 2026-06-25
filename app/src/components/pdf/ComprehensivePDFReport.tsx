import { useEffect, useState } from 'react';
import { reportService, type ReportData } from '../../services/reportService';
import { CircularProgress, BarChart, RadarChart } from './MonochromeCharts';
import { QrCode } from 'lucide-react'; // Mocking QR Code with icon

/**
 * A hidden layout wrapper that renders the 7 A4 pages for html2canvas.
 * Positioned absolutely off-screen to avoid disrupting the main UI.
 */
export default function ComprehensivePDFReport() {
  const [data, setData] = useState<ReportData | null>(null);

  useEffect(() => {
    // Generate the data once mounted
    setData(reportService.generateReportData());
  }, []);

  if (!data) return null;

  // A4 dimensions at standard web DPI: 800px by 1131px
  const pageStyle = "w-[800px] h-[1131px] bg-white flex flex-col relative overflow-hidden text-salon-black font-poppins shrink-0 pdf-page";
  const headerStyle = "w-full border-b-[0.5px] border-salon-gray/20 pb-4 mb-8 flex justify-between items-end";
  const footerStyle = "absolute bottom-0 left-0 w-full p-8 border-t-[0.5px] border-salon-gray/20 flex justify-between items-center text-[10px] text-salon-gray uppercase tracking-widest bg-white";

  const PageHeader = ({ title }: { title: string }) => (
    <div className={headerStyle}>
      <div>
        <h2 className="text-2xl font-playfair">{title}</h2>
        <p className="text-[10px] uppercase tracking-[3px] text-salon-gray mt-1">Pune Beauty Salon • Clinical AI Report</p>
      </div>
      <div className="text-right text-[10px] uppercase tracking-widest text-salon-gray">
        <p>User ID: {data.user.id}</p>
        <p>Session: {data.sessionId}</p>
      </div>
    </div>
  );

  const PageFooter = ({ pageNum }: { pageNum: number }) => (
    <div className={footerStyle}>
      <span>CONFIDENTIAL CLINICAL REPORT</span>
      <span>PAGE {pageNum} OF 7</span>
    </div>
  );

  return (
    <div 
      id="comprehensive-pdf-report" 
      className="absolute top-0 left-[-9999px] flex flex-col gap-10 bg-gray-100 p-10"
      style={{ zIndex: -9999 }} // Ensure it's hidden but in the DOM
    >
      
      {/* PAGE 1: COVER */}
      <div className={pageStyle} data-page-type="cover">
        <div className="flex-1 flex flex-col items-center justify-center p-16 text-center">
          <h1 className="text-5xl font-playfair tracking-wide mb-4">Pune Beauty</h1>
          <p className="text-sm uppercase tracking-[4px] text-salon-gray mb-16">Comprehensive Clinical Report</p>
          
          <div className="w-48 h-48 rounded-full border border-salon-gray/20 flex items-center justify-center mb-12 p-2 bg-salon-light">
            {data.user.photo ? (
              <img src={data.user.photo} alt="User" className="w-full h-full rounded-full object-cover" />
            ) : (
              <div className="w-full h-full rounded-full bg-salon-gray/10 flex items-center justify-center text-salon-gray uppercase text-[10px] tracking-widest">No Image</div>
            )}
          </div>

          <div className="border border-salon-gray/20 p-8 rounded-3xl w-full max-w-lg mb-12 relative overflow-hidden bg-white shadow-sm">
             <div className="absolute top-0 left-0 w-2 h-full bg-salon-black"></div>
             <p className="text-[10px] uppercase tracking-widest text-salon-gray mb-2">Overall Wellness Index</p>
             <p className="text-6xl font-playfair mb-2">{data.scores.overallWellnessIndex}<span className="text-2xl text-salon-gray">/100</span></p>
             <p className="text-xs font-medium uppercase tracking-widest">{data.user.profileCategory}</p>
          </div>

          <div className="text-left w-full max-w-lg border-t border-salon-gray/20 pt-8">
            <p className="text-[10px] uppercase tracking-widest text-salon-gray mb-2">Executive Summary</p>
            <p className="text-sm font-light leading-relaxed text-salon-black/80">{data.concierge.aiSummary}</p>
          </div>
        </div>

        <div className="absolute bottom-16 right-16 flex flex-col items-center gap-2">
          <div className="p-2 border border-salon-gray/20 rounded-lg"><QrCode size={48} strokeWidth={1}/></div>
          <span className="text-[8px] uppercase tracking-widest text-salon-gray">Scan to Verify</span>
        </div>

        <PageFooter pageNum={1} />
      </div>

      {/* PAGE 2: FACE ANALYSIS */}
      <div className={pageStyle} data-page-type="face">
        <div className="p-12 flex-1 relative">
          <PageHeader title="Facial Architecture Analysis" />
          
          <div className="grid grid-cols-2 gap-12 mt-12">
            <div>
              <div className="mb-12">
                <p className="text-[10px] uppercase tracking-widest text-salon-gray mb-4">Core Metrics</p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="p-6 bg-salon-light rounded-2xl">
                    <p className="text-3xl font-playfair mb-1">{data.scores.beautyScore}</p>
                    <p className="text-[10px] uppercase tracking-widest text-salon-gray">Beauty Score</p>
                  </div>
                  <div className="p-6 bg-salon-light rounded-2xl">
                    <p className="text-3xl font-playfair mb-1">{data.faceAnalysis.symmetry}%</p>
                    <p className="text-[10px] uppercase tracking-widest text-salon-gray">Symmetry</p>
                  </div>
                </div>
              </div>
              
              <div className="mb-12">
                <p className="text-[10px] uppercase tracking-widest text-salon-gray mb-4">Shape & Proportions</p>
                <p className="text-lg font-medium mb-2">{data.faceAnalysis.faceShape} Shape</p>
                <p className="text-sm font-light text-salon-black/70 mb-6">{data.faceAnalysis.proportions}</p>
              </div>
            </div>

            <div className="flex justify-center items-start pt-8">
               <CircularProgress value={data.faceAnalysis.symmetry} label="Symmetry Alignment" size={240} strokeWidth={12} />
            </div>
          </div>

          <div className="mt-8 border-t border-salon-gray/20 pt-8">
             <p className="text-[10px] uppercase tracking-widest text-salon-gray mb-4">Architectural Recommendations</p>
             <ul className="space-y-3">
               {data.faceAnalysis.recommendations.map((rec, i) => (
                 <li key={i} className="flex gap-3 text-sm font-light">
                   <span className="text-salon-gray">—</span> {rec}
                 </li>
               ))}
             </ul>
          </div>
        </div>
        <PageFooter pageNum={2} />
      </div>

      {/* PAGE 3: SKIN REPORT */}
      <div className={pageStyle} data-page-type="skin">
        <div className="p-12 flex-1 relative">
          <PageHeader title="Clinical Skin Assessment" />
          
          <div className="grid grid-cols-2 gap-12 mt-12">
             <div className="flex justify-center items-center">
               <RadarChart data={[
                 { label: 'Hydration', value: data.skinReport.hydration },
                 { label: 'Tone/Pigment', value: data.skinReport.pigmentation },
                 { label: 'Clarity', value: 100 - data.skinReport.acne }, // inverted for clarity
                 { label: 'Elasticity', value: data.skinReport.elasticity },
                 { label: 'Resilience', value: 100 - data.skinReport.uvSensitivity }
               ]} />
             </div>
             
             <div>
               <p className="text-[10px] uppercase tracking-widest text-salon-gray mb-6">Metric Breakdown</p>
               <BarChart data={[
                 { label: 'Hydration Levels', value: data.skinReport.hydration },
                 { label: 'Pigmentation Health', value: data.skinReport.pigmentation },
                 { label: 'Acne Severity', value: data.skinReport.acne },
                 { label: 'Skin Elasticity', value: data.skinReport.elasticity },
               ]} />
             </div>
          </div>

          <div className="mt-16 bg-salon-light p-8 rounded-3xl">
             <p className="text-[10px] uppercase tracking-widest text-salon-gray mb-2">Overall Skin Health Score</p>
             <p className="text-4xl font-playfair">{data.scores.skinScore}<span className="text-lg text-salon-gray">/100</span></p>
          </div>
        </div>
        <PageFooter pageNum={3} />
      </div>

      {/* PAGE 4: HAIR ANALYSIS */}
      <div className={pageStyle} data-page-type="hair">
        <div className="p-12 flex-1 relative">
          <PageHeader title="Hair & Styling Profile" />
          
          <div className="mt-12 bg-salon-black text-white p-10 rounded-3xl relative overflow-hidden">
             <div className="relative z-10">
               <p className="text-[10px] uppercase tracking-widest text-white/50 mb-2">Primary Match</p>
               <h3 className="text-4xl font-playfair mb-4">{data.hairAnalysis.topStyle}</h3>
               <div className="flex items-center gap-4">
                 <div className="px-4 py-1.5 rounded-full border border-white/20 text-xs font-medium">{data.hairAnalysis.suitability}% Suitability</div>
               </div>
             </div>
             {/* Decorative graphic */}
             <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-white/5 skew-x-12 translate-x-1/4"></div>
          </div>

          <div className="grid grid-cols-2 gap-12 mt-12">
            <div>
               <p className="text-[10px] uppercase tracking-widest text-salon-gray mb-4">Identified Concerns</p>
               <ul className="space-y-3">
                 {data.hairAnalysis.concerns.map((c, i) => (
                   <li key={i} className="flex gap-3 text-sm font-light">
                     <span className="w-1.5 h-1.5 rounded-full bg-salon-black mt-2"></span> {c}
                   </li>
                 ))}
               </ul>
            </div>
            <div>
               <p className="text-[10px] uppercase tracking-widest text-salon-gray mb-4">Styling Recommendations</p>
               <ul className="space-y-3">
                 {data.hairAnalysis.styling.map((s, i) => (
                   <li key={i} className="flex gap-3 text-sm font-light">
                     <span className="w-1.5 h-1.5 rounded-full bg-salon-black mt-2"></span> {s}
                   </li>
                 ))}
               </ul>
            </div>
          </div>
        </div>
        <PageFooter pageNum={4} />
      </div>

      {/* PAGE 5: TRANSFORMATION */}
      <div className={pageStyle} data-page-type="compare">
        <div className="p-12 flex-1 relative">
          <PageHeader title="Transformation Analysis" />
          
          {data.transformation.beforeImage && data.transformation.afterImage ? (
            <div className="mt-12">
               <div className="flex gap-6 mb-8">
                 <div className="flex-1 aspect-[3/4] relative rounded-2xl overflow-hidden border border-salon-gray/20">
                   <img src={data.transformation.beforeImage} className="w-full h-full object-cover" />
                   <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 rounded-full text-[9px] uppercase tracking-widest font-medium">Before</div>
                 </div>
                 <div className="flex-1 aspect-[3/4] relative rounded-2xl overflow-hidden border border-salon-black">
                   <img src={data.transformation.afterImage} className="w-full h-full object-cover" />
                   <div className="absolute top-4 left-4 bg-salon-black text-white px-3 py-1 rounded-full text-[9px] uppercase tracking-widest font-medium">After</div>
                 </div>
               </div>
               
               <div className="grid grid-cols-2 gap-6 bg-salon-light p-8 rounded-3xl">
                 <div>
                   <p className="text-[10px] uppercase tracking-widest text-salon-gray mb-1">Transformation Category</p>
                   <p className="text-xl font-medium">{data.transformation.metrics?.overall.category || 'Premium Enhancement'}</p>
                 </div>
                 <div className="text-right">
                   <p className="text-[10px] uppercase tracking-widest text-salon-gray mb-1">Improvement Score</p>
                   <p className="text-xl font-medium">+{data.scores.transformationScore}%</p>
                 </div>
               </div>
            </div>
          ) : (
            <div className="mt-32 flex flex-col items-center justify-center text-salon-gray">
              <p className="text-sm uppercase tracking-widest">No Transformation Images Provided</p>
            </div>
          )}
        </div>
        <PageFooter pageNum={5} />
      </div>

      {/* PAGE 6: ACTION PLAN */}
      <div className={pageStyle} data-page-type="action">
        <div className="p-12 flex-1 relative">
          <PageHeader title="Personalized Action Plan" />
          
          <div className="mt-12 space-y-10">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-salon-gray mb-4 border-b border-salon-gray/20 pb-2">AM Routine (Morning)</p>
              <div className="flex gap-4">
                {data.actionPlan.morning.map((step, i) => (
                  <div key={i} className="flex-1 bg-salon-light p-4 rounded-xl text-center">
                    <span className="block text-[10px] text-salon-gray mb-1">STEP {i+1}</span>
                    <span className="text-xs font-medium">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-widest text-salon-gray mb-4 border-b border-salon-gray/20 pb-2">PM Routine (Night)</p>
              <div className="flex gap-4">
                {data.actionPlan.night.map((step, i) => (
                  <div key={i} className="flex-1 bg-salon-black text-white p-4 rounded-xl text-center">
                    <span className="block text-[10px] text-white/50 mb-1">STEP {i+1}</span>
                    <span className="text-xs font-medium">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8">
               <div>
                  <p className="text-[10px] uppercase tracking-widest text-salon-gray mb-4 border-b border-salon-gray/20 pb-2">Weekly Treatments</p>
                  <ul className="space-y-2">
                    {data.actionPlan.weekly.map((w, i) => <li key={i} className="text-sm font-light flex items-center gap-2"><span className="w-1 h-1 bg-salon-black rounded-full"></span>{w}</li>)}
                  </ul>
               </div>
               <div>
                  <p className="text-[10px] uppercase tracking-widest text-salon-gray mb-4 border-b border-salon-gray/20 pb-2">Ingredients to Avoid</p>
                  <ul className="space-y-2 text-red-800">
                    {data.actionPlan.avoid.map((a, i) => <li key={i} className="text-sm font-light flex items-center gap-2"><span className="w-1 h-1 bg-red-800 rounded-full"></span>{a}</li>)}
                  </ul>
               </div>
            </div>
          </div>
        </div>
        <PageFooter pageNum={6} />
      </div>

      {/* PAGE 7: CONCIERGE */}
      <div className={pageStyle} data-page-type="concierge">
        <div className="p-12 flex-1 relative">
          <PageHeader title="Concierge Directives" />
          
          <div className="mt-12 bg-white border border-salon-gray/20 p-10 rounded-3xl shadow-sm">
             <p className="text-[10px] uppercase tracking-widest text-salon-gray mb-4">Recommended Next Step</p>
             <h3 className="text-2xl font-playfair mb-4">Book a session at {data.concierge.salonRecommendation}</h3>
             <p className="text-sm font-light text-salon-black/70 mb-8">Based on your clinical profile, our AI Concierge highly recommends a professional consultation to address your specific hydration and styling needs.</p>
             
             <div className="space-y-4">
               {data.concierge.nextActions.map((action, i) => (
                 <div key={i} className="flex items-center gap-4 p-4 bg-salon-light rounded-xl">
                   <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-xs font-medium">{i+1}</div>
                   <span className="text-sm font-medium">{action}</span>
                 </div>
               ))}
             </div>
          </div>

          <div className="absolute bottom-32 left-1/2 -translate-x-1/2 text-center w-full max-w-sm">
            <p className="text-[10px] uppercase tracking-widest text-salon-gray">End of Report</p>
            <div className="w-12 h-[1px] bg-salon-gray/30 mx-auto mt-4"></div>
          </div>
        </div>
        <PageFooter pageNum={7} />
      </div>

    </div>
  );
}
