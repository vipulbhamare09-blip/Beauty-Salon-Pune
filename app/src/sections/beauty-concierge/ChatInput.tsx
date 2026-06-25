import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mic, SendHorizontal } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (msg: string) => void;
  disabled: boolean;
}

export default function ChatInput({ onSendMessage, disabled }: ChatInputProps) {
  const [text, setText] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Initialize SpeechRecognition if supported
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setText(prev => prev ? prev + ' ' + transcript : transcript);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'inherit';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [text]);

  const handleSend = () => {
    if (text.trim() && !disabled) {
      onSendMessage(text.trim());
      setText('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'inherit';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleListen = () => {
    if (!recognitionRef.current) {
      alert("Voice input is not supported in this browser.");
      return;
    }
    
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      try {
        recognitionRef.current.start();
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <div className="p-4 bg-white/50 backdrop-blur-md border-t border-salon-gray/10 w-full relative z-10 rounded-b-3xl">
      <motion.div 
        animate={{ 
          borderColor: isFocused ? '#1A1A1A' : 'rgba(153, 153, 153, 0.2)',
          boxShadow: isFocused ? '0 4px 20px rgba(0,0,0,0.05)' : 'none'
        }}
        className="relative flex items-end gap-2 bg-white rounded-2xl border transition-colors p-2"
      >
        <button 
          onClick={toggleListen}
          className={`p-2.5 transition-colors rounded-full flex-shrink-0 relative ${
            isListening ? 'text-red-500 bg-red-50' : 'text-salon-gray hover:text-salon-black hover:bg-salon-light'
          }`}
          title="Voice Input"
        >
          {isListening && (
            <span className="absolute inset-0 rounded-full border-2 border-red-500/30 animate-ping" />
          )}
          <Mic size={20} strokeWidth={1.5} />
        </button>

        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          placeholder={isListening ? "Listening..." : "Ask about skincare, hairstyles, or makeup..."}
          className="w-full bg-transparent border-none outline-none resize-none py-3 text-sm font-light text-salon-black placeholder:text-salon-gray/50 custom-scrollbar max-h-[120px]"
          rows={1}
          disabled={disabled || isListening}
        />

        <button 
          onClick={handleSend}
          disabled={!text.trim() || disabled || isListening}
          className={`p-2.5 rounded-full flex-shrink-0 transition-all ${
            text.trim() && !disabled && !isListening
              ? 'bg-salon-black text-white shadow-md' 
              : 'bg-salon-light text-salon-gray'
          }`}
        >
          <SendHorizontal size={20} strokeWidth={1.5} />
        </button>
      </motion.div>
      <div className="text-center mt-2">
        <p className="text-[10px] text-salon-gray uppercase tracking-widest">AI Concierge can make mistakes. Verify important information.</p>
      </div>
    </div>
  );
}
