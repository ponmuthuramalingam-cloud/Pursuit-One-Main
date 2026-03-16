import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import PrivacyContent from '../components/PrivacyContent';

const PrivacyPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-indigo-500 selection:text-white font-sans antialiased">
      {/* Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-indigo-600/10 blur-[120px] rounded-full" />
      </div>

      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-2xl border-b border-white/5 py-4">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center overflow-hidden group-hover:rotate-12 transition-transform duration-500">
              <img 
                src="https://lh3.googleusercontent.com/d/1Uar9WDkx3lxYThfku15zf5Ht5w5gfPDL" 
                alt="Pursuit-One Logo" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="text-xl font-bold tracking-tighter text-white">Pursuit-One</span>
          </Link>
          <Link to="/" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors">
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
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-indigo-500/10 rounded-2xl text-indigo-400">
                <ShieldCheck size={32} />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Privacy Policy</h1>
                <p className="text-white/40 text-sm mt-1">Last Updated: March 16, 2026</p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-12">
              <PrivacyContent />
            </div>

            <div className="mt-12 text-center">
              <p className="text-white/40 text-sm mb-6">Have questions about our privacy practices?</p>
              <a 
                href="mailto:support@pursuit-one.com" 
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-bold hover:scale-105 transition-transform"
              >
                Contact Support
              </a>
            </div>
          </motion.div>
        </div>
      </main>

      <footer className="relative z-10 bg-black text-white/40 py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-xs">© 2026 Pursuit-One CRM. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default PrivacyPage;
