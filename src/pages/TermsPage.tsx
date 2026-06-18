import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Scale } from 'lucide-react';
import { Link } from 'react-router-dom';
import TermsOfService from '../components/TermsOfService';

const TermsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-indigo-500 selection:text-white font-sans antialiased">
      {/* Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="curve-bg opacity-30">
          <div className="curve"></div>
          <div className="curve"></div>
          <div className="curve"></div>
        </div>
      </div>

      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 py-4">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center overflow-hidden group-hover:rotate-12 transition-transform duration-500">
              <img 
                src="https://lh3.googleusercontent.com/d/1Uar9WDkx3lxYThfku15zf5Ht5w5gfPDL" 
                alt="Pursuit-One Logo" 
                className="w-full h-full object-cover invert"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="text-xl font-bold tracking-tighter text-slate-900">Pursuit-One</span>
          </Link>
          <Link to="/" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-indigo-600 transition-colors">
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>
      </nav>

      <main className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600 border border-indigo-100">
                <Scale size={32} />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">Terms of Service</h1>
                <p className="text-slate-500 text-sm mt-1">Last Updated: June 18, 2026</p>
              </div>
            </div>

            <div className="bg-white border border-slate-200 shadow-xl rounded-[2.5rem] p-8 md:p-12">
              <TermsOfService />
            </div>

            <div className="mt-12 text-center">
              <p className="text-slate-500 text-sm mb-6">Have questions about our Terms of Service?</p>
              <a 
                href="mailto:support@pursuit-one.com" 
                className="crystal-btn text-base inline-flex items-center gap-2"
              >
                <span>Contact Support</span>
              </a>
            </div>
          </motion.div>
        </div>
      </main>

      <footer className="relative z-10 bg-slate-900 text-white/50 py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-xs">© 2026 Pursuit-One. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default TermsPage;
