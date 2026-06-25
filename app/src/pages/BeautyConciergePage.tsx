import BeautyProfileSidebar from '../sections/beauty-concierge/BeautyProfileSidebar';
import ChatInterface from '../sections/beauty-concierge/ChatInterface';
import SEO from '../components/system/SEO';

export default function BeautyConciergePage() {
  return (
    <div className="min-h-screen bg-[#F5F5F7] flex flex-col font-poppins selection:bg-salon-black selection:text-salon-white">
      <SEO title="Beauty Concierge" description="Chat with your personal AI Beauty Concierge." />
      
      {/* 
        Full viewport experience: 
        We use flex-grow, subtract header height approximately, and hide main window overflow.
        Desktop: 2 columns. Mobile: stacked.
      */}
      <main className="flex-grow pt-24 pb-8 px-4 lg:px-8 max-w-[1600px] mx-auto w-full flex flex-col lg:flex-row gap-6 lg:h-[calc(100vh-2rem)]">
        
        {/* Left Sidebar: Profile & Context */}
        <div className="w-full lg:w-1/4 lg:h-full lg:overflow-y-auto custom-scrollbar flex-shrink-0">
          <BeautyProfileSidebar />
        </div>

        {/* Right Area: Chat Window */}
        <div className="w-full lg:w-3/4 flex-grow lg:h-full flex flex-col bg-white/80 backdrop-blur-md rounded-3xl border border-salon-gray/20 shadow-sm overflow-hidden">
          <ChatInterface />
        </div>

      </main>

    </div>
  );
}
