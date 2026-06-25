import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, UserCircle, Droplet, Star, Search, CalendarHeart } from 'lucide-react';
import type { BeautyMessage } from '../../services/beautyAssistant';
import { beautyAssistant } from '../../services/beautyAssistant';
import ChatEmptyState from './ChatEmptyState';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { useNavigate } from 'react-router';

export default function ChatInterface() {
  const [messages, setMessages] = useState<BeautyMessage[]>([]);
  const [isAiTyping, setIsAiTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isAiTyping]);

  const handleSendMessage = async (text: string) => {
    const userMsg: BeautyMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date()
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setIsAiTyping(true);

    // AI "Typing" bubble placeholder
    const typingMsgId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, {
      id: typingMsgId,
      role: 'ai',
      content: '',
      timestamp: new Date(),
      isTyping: true
    }]);

    try {
      const responseContent = await beautyAssistant.sendMessage(text, newHistory);
      
      setMessages(prev => prev.map(m => m.id === typingMsgId ? {
        id: typingMsgId,
        role: 'ai',
        content: responseContent,
        timestamp: new Date(),
        isTyping: false
      } : m));
    } catch (e) {
      // Fallback on error
      setMessages(prev => prev.map(m => m.id === typingMsgId ? {
        ...m,
        content: "I'm having trouble connecting right now. Please try again later.",
        isTyping: false
      } : m));
    } finally {
      setIsAiTyping(false);
    }
  };

  const handleClear = () => {
    setMessages([]);
  };

  const handleRegenerate = async () => {
    if (messages.length < 2) return;
    const lastUserMsg = [...messages].reverse().find(m => m.role === 'user');
    if (!lastUserMsg) return;

    // Remove last AI message
    setMessages(prev => prev.slice(0, prev.length - 1));
    await handleSendMessage(lastUserMsg.content);
  };

  return (
    <div className="flex flex-col h-full w-full relative bg-salon-white/50">
      
      {/* Header with Quick Actions */}
      <div className="flex-shrink-0 border-b border-salon-gray/10 bg-white/50 backdrop-blur-md p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 z-20">
        <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pb-1 sm:pb-0">
          <button onClick={() => navigate('/face-analysis')} className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-salon-light hover:bg-salon-black hover:text-white transition-colors rounded-full text-[10px] uppercase tracking-widest text-salon-black border border-salon-gray/10">
            <UserCircle size={12} /> Face Analysis
          </button>
          <button onClick={() => navigate('/hairstyle-simulator')} className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-salon-light hover:bg-salon-black hover:text-white transition-colors rounded-full text-[10px] uppercase tracking-widest text-salon-black border border-salon-gray/10">
            <Star size={12} /> Hairstyle Simulator
          </button>
          <button onClick={() => navigate('/skin-advisor')} className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-salon-light hover:bg-salon-black hover:text-white transition-colors rounded-full text-[10px] uppercase tracking-widest text-salon-black border border-salon-gray/10">
            <Droplet size={12} /> Skin Advisor
          </button>
          <button onClick={() => navigate('/event-planner')} className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-salon-light hover:bg-salon-black hover:text-white transition-colors rounded-full text-[10px] uppercase tracking-widest text-salon-black border border-salon-gray/10">
            <CalendarHeart size={12} /> Event Planner
          </button>
          <button onClick={() => navigate('/salon-finder')} className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-salon-light hover:bg-salon-black hover:text-white transition-colors rounded-full text-[10px] uppercase tracking-widest text-salon-black border border-salon-gray/10">
            <Search size={12} /> Salon Finder
          </button>
        </div>
        
        {messages.length > 0 && (
          <button 
            onClick={handleClear}
            className="flex-shrink-0 text-salon-gray hover:text-red-500 transition-colors p-2"
            title="Clear Chat"
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>

      {/* Messages Area */}
      <div 
        ref={scrollRef}
        className="flex-grow overflow-y-auto custom-scrollbar p-4 lg:p-8 flex flex-col relative"
      >
        <AnimatePresence mode="wait">
          {messages.length === 0 ? (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full">
              <ChatEmptyState onSelectStarter={handleSendMessage} />
            </motion.div>
          ) : (
            <div className="flex flex-col max-w-4xl mx-auto w-full">
              {messages.map((msg, idx) => (
                <ChatMessage 
                  key={msg.id} 
                  message={msg} 
                  onRegenerate={idx === messages.length - 1 && msg.role === 'ai' && !msg.isTyping ? handleRegenerate : undefined}
                />
              ))}
              <div ref={messagesEndRef} className="h-4" />
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Input Area */}
      <ChatInput onSendMessage={handleSendMessage} disabled={isAiTyping} />

    </div>
  );
}
