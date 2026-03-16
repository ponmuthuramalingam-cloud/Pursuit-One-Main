import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import HomePage from './pages/HomePage';
import PrivacyPage from './pages/PrivacyPage';

// --- Error Handling ---
interface ErrorBoundaryProps { children: React.ReactNode }
interface ErrorBoundaryState { hasError: boolean; error: any; errorInfo: any }

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false, error: null, errorInfo: null };

  constructor(props: ErrorBoundaryProps) {
    super(props);
  }

  static getDerivedStateFromError(error: any): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
    (this as any).setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 p-6 text-white text-center">
          <div className="max-w-2xl w-full bg-slate-900 rounded-3xl p-8 border border-slate-800 shadow-2xl">
            <AlertCircle size={48} className="text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Application Error</h2>
            <p className="text-white/60 mb-6 text-sm">We encountered an unexpected error while rendering the application.</p>
            
            <div className="bg-black/50 rounded-xl p-4 mb-8 text-left overflow-auto max-h-48 border border-white/5">
              <code className="text-xs text-red-400 font-mono block whitespace-pre-wrap">
                {this.state.error?.toString()}
              </code>
              {this.state.errorInfo && (
                <code className="text-[10px] text-white/30 font-mono block mt-2 whitespace-pre-wrap">
                  {this.state.errorInfo.componentStack}
                </code>
              )}
            </div>

            <button 
              onClick={() => window.location.reload()} 
              className="w-full bg-indigo-600 hover:bg-indigo-500 py-3 rounded-xl font-bold transition-colors shadow-lg shadow-indigo-500/20"
            >
              Reload Application
            </button>
          </div>
        </div>
      );
    }

    return (this as any).props.children;
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          {/* Fallback for SPA routing */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}
