import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in application:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 z-[9999] bg-salon-light flex items-center justify-center font-poppins">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-16 rounded-[2rem] shadow-sm border border-salon-gray/10 text-center max-w-lg mx-auto"
          >
            <div className="w-16 h-16 rounded-full bg-salon-black text-white flex items-center justify-center mx-auto mb-8 text-2xl font-playfair italic">
              PB
            </div>
            <h1 className="text-3xl font-playfair mb-4 text-salon-black">Something went wrong</h1>
            <p className="text-sm font-light text-salon-gray mb-10 leading-relaxed">
              The beauty experience encountered an unexpected issue. Our team has been notified.
            </p>
            
            <div className="flex gap-4 justify-center">
              <button 
                onClick={() => window.location.reload()}
                className="px-8 py-3 bg-salon-black text-white text-xs uppercase tracking-widest rounded-full hover:bg-salon-gray transition-colors"
              >
                Retry
              </button>
              <button 
                onClick={() => window.location.href = '/'}
                className="px-8 py-3 bg-white text-salon-black border border-salon-gray/20 text-xs uppercase tracking-widest rounded-full hover:bg-salon-light transition-colors"
              >
                Go Home
              </button>
            </div>
            
            {import.meta.env.MODE === 'development' && this.state.error && (
              <div className="mt-8 p-4 bg-red-50 text-red-800 text-xs text-left rounded-xl overflow-auto max-h-32 font-mono">
                {this.state.error.toString()}
              </div>
            )}
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}
