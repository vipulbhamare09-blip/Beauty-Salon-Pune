import { motion } from 'framer-motion';
import { Sparkles, UserCircle, Copy, RotateCcw } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import type { BeautyMessage } from '../../services/beautyAssistant';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

interface ChatMessageProps {
  message: BeautyMessage;
  onRegenerate?: () => void;
}

export default function ChatMessage({ message, onRegenerate }: ChatMessageProps) {
  const isAI = message.role === 'ai';
  const navigate = useNavigate();

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    toast.success("Response copied to clipboard");
  };

  const timeString = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric' }).format(message.timestamp);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10, scale: 0.98 }} 
      animate={{ opacity: 1, y: 0, scale: 1 }} 
      transition={{ duration: 0.4 }}
      className={`flex w-full ${isAI ? 'justify-start' : 'justify-end'} mb-6 group`}
    >
      <div className={`flex gap-4 max-w-[85%] ${isAI ? 'flex-row' : 'flex-row-reverse'}`}>
        
        {/* Avatar */}
        <div className="flex-shrink-0 mt-1">
          {isAI ? (
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-salon-black to-gray-700 flex items-center justify-center shadow-sm">
              <Sparkles size={14} className="text-white" />
            </div>
          ) : (
            <div className="w-8 h-8 rounded-full bg-salon-light border border-salon-gray/20 flex items-center justify-center text-salon-gray">
              <UserCircle size={18} />
            </div>
          )}
        </div>

        {/* Message Bubble */}
        <div className="flex flex-col gap-1">
          <div className={`px-5 py-4 rounded-2xl ${
            isAI 
              ? 'bg-salon-light border border-salon-gray/10 text-salon-black rounded-tl-sm shadow-sm' 
              : 'bg-salon-black text-white rounded-tr-sm shadow-md'
          }`}>
            
            {message.isTyping ? (
              <div className="flex items-center gap-1.5 h-6">
                <motion.span animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0 }} className="w-1.5 h-1.5 bg-salon-gray rounded-full" />
                <motion.span animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-salon-gray rounded-full" />
                <motion.span animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-salon-gray rounded-full" />
              </div>
            ) : isAI ? (
              <div className="prose prose-sm prose-salon max-w-none text-sm font-light leading-relaxed">
                <ReactMarkdown
                  components={{
                    p: ({...props}) => <p className="mb-3 last:mb-0" {...props} />,
                    strong: ({...props}) => <strong className="font-medium text-salon-black uppercase text-[10px] tracking-widest block mb-1 mt-4" {...props} />,
                    ul: ({...props}) => <ul className="space-y-1 mb-3" {...props} />,
                    li: ({...props}) => (
                      <li className="flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-salon-gray mt-2 flex-shrink-0" />
                        <span {...props} />
                      </li>
                    ),
                    a: ({href, children}) => (
                      <button 
                        onClick={() => navigate(href || '/')}
                        className="mt-4 block w-full text-center py-3 bg-salon-black text-white text-xs uppercase tracking-widest hover:bg-salon-gray transition-colors"
                      >
                        {children}
                      </button>
                    )
                  }}
                >
                  {message.content}
                </ReactMarkdown>
              </div>
            ) : (
              <p className="text-sm font-light leading-relaxed">{message.content}</p>
            )}

          </div>
          
          {/* Footer actions & timestamp */}
          {!message.isTyping && (
            <div className={`flex items-center gap-3 text-[10px] uppercase tracking-wider text-salon-gray mt-1 px-1 ${isAI ? 'justify-start' : 'justify-end'}`}>
              <span>{timeString}</span>
              {isAI && (
                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                  <button onClick={handleCopy} className="hover:text-salon-black transition-colors flex items-center gap-1" title="Copy">
                    <Copy size={10} />
                  </button>
                  {onRegenerate && (
                    <button onClick={onRegenerate} className="hover:text-salon-black transition-colors flex items-center gap-1" title="Regenerate">
                      <RotateCcw size={10} />
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </motion.div>
  );
}
