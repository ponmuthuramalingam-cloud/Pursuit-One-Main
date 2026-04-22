import React, { useState, useEffect, useRef } from 'react';
import { 
  Users, 
  TrendingUp, 
  LayoutDashboard, 
  BarChart3, 
  Zap, 
  Puzzle, 
  CheckCircle2, 
  ArrowRight, 
  Globe,
  MessageSquare,
  Loader2,
  Database,
  Layers,
  Cpu,
  Share2,
  Bot,
  Calendar,
  PenTool
} from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// --- Components ---
const Navbar = ({ onContactClick, onPricingClick }: { onContactClick: () => void, onPricingClick: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${isScrolled ? 'bg-white/80 backdrop-blur-md border-b border-slate-200 py-3 shadow-sm' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center overflow-hidden group-hover:rotate-12 transition-transform duration-500">
            <img 
              src="https://lh3.googleusercontent.com/d/1Uar9WDkx3lxYThfku15zf5Ht5w5gfPDL" 
              alt="Pursuit-One Logo" 
              className="w-full h-full object-cover invert"
              referrerPolicy="no-referrer"
            />
          </div>
          <span className="text-2xl font-bold tracking-tighter text-slate-900">Pursuit-One</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {['Features', 'Publishing', 'Analytics'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-xs font-bold text-slate-500 hover:text-indigo-600 transition-all uppercase tracking-widest">{item}</a>
          ))}
          <button onClick={onPricingClick} className="text-xs font-bold text-slate-500 hover:text-indigo-600 transition-all uppercase tracking-widest">Pricing</button>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={onContactClick} className="px-6 py-2.5 rounded-full text-xs font-bold bg-slate-900 text-white hover:bg-indigo-600 hover:text-white transition-all duration-500 shadow-xl shadow-indigo-500/10">Get Started</button>
        </div>
      </div>
    </nav>
  );
};

const Hero = ({ onPricingClick }: { onPricingClick: () => void }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white pt-20">
      <motion.div style={{ scale }} className="absolute inset-0 z-0">
        <div className="curve-bg">
          <div className="curve"></div>
          <div className="curve"></div>
          <div className="curve"></div>
        </div>
      </motion.div>

      <motion.div style={{ opacity, y }} className="relative z-10 text-center px-6 max-w-5xl mx-auto mt-10">
        <motion.span initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="inline-block px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-widest mb-8 border border-indigo-100">
          The Premier Social Media Management Platform
        </motion.span>
        
        <motion.h1 initial={{ opacity: 0, filter: "blur(10px)", y: 20 }} animate={{ opacity: 1, filter: "blur(0px)", y: 0 }} transition={{ duration: 1, delay: 0.2 }} className="text-6xl md:text-8xl lg:text-9xl font-bold text-slate-900 tracking-tighter mb-6 leading-[1.05]">
          Manage social <br /> with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600">brilliance.</span>
        </motion.h1>
        
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4 }} className="text-xl md:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto font-medium leading-relaxed">
          Elevate your brand with intelligent scheduling, deep analytics, and unified community engagement. Drive exponential growth on social media today.
        </motion.p>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.6 }} className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button className="crystal-btn text-lg" onClick={onPricingClick}>
            <span>Start 7-Day Free Trial</span>
          </button>
          <a href="#features" className="px-10 py-5 bg-slate-50 text-slate-900 border border-slate-200 hover:border-indigo-200 hover:bg-indigo-50 rounded-full font-bold text-lg transition-all shadow-sm">
            Explore Features
          </a>
        </motion.div>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="mt-6 text-sm text-slate-500 font-medium">No credit card required to start.</motion.p>
      </motion.div>
    </section>
  );
};

const ScrollStory = () => {
  const main = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    if (!main.current) return;
    const panels = gsap.utils.toArray(".story-panel");
    const ctx = gsap.context(() => {
      panels.forEach((panel: any) => {
        ScrollTrigger.create({ trigger: panel, start: "top top", pin: true, pinSpacing: false, snap: 1 });
        const content = panel.querySelector(".story-content");
        if (content) {
          gsap.fromTo(content, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, scrollTrigger: { trigger: panel, start: "top center", toggleActions: "play reverse play reverse" } });
        }
      });
    }, main);
    return () => ctx.revert();
  }, { scope: main, dependencies: [] });

  return (
    <div ref={main} className="bg-white">
      <section className="story-panel h-screen flex items-center justify-center bg-indigo-50 text-slate-900 px-6 overflow-hidden relative border-t border-slate-200">
        <div className="absolute inset-0 opacity-40 mix-blend-multiply flex items-center justify-center">
          <div className="w-[120%] h-[120%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-200/50 via-transparent to-transparent" />
        </div>
        <div className="story-content max-w-4xl text-center relative z-10">
          <h2 className="text-5xl md:text-8xl font-bold mb-8 tracking-tight">Plan with precision.</h2>
          <p className="text-xl md:text-2xl text-slate-600 font-medium">Visually map out your content calendar. Automate your posts across every network to hit your audience at the perfect time.</p>
        </div>
      </section>
      <section className="story-panel h-screen flex items-center justify-center bg-white text-slate-900 px-6 border-t border-slate-200 overflow-hidden relative">
        <div className="absolute inset-0 flex items-center justify-center opacity-5"><div className="w-[150%] h-[150%] border-4 border-indigo-500 rounded-full animate-[spin_60s_linear_infinite]" /><div className="absolute w-[120%] h-[120%] border-2 border-purple-500 rounded-full animate-[spin_40s_linear_infinite_reverse]" /></div>
        <div className="story-content max-w-4xl text-center relative z-10">
          <h2 className="text-5xl md:text-8xl font-bold mb-8 tracking-tight">Engage at scale.</h2>
          <p className="text-xl md:text-2xl text-slate-600 font-medium">Bring every message, comment, and mention into a single, unified inbox. Turn social interactions into meaningful relationships.</p>
        </div>
      </section>
      <section className="story-panel h-screen flex items-center justify-center bg-slate-50 text-slate-900 px-6 border-t border-slate-200 overflow-hidden relative">
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-pink-100/40 to-transparent pointer-events-none" />
        <div className="story-content max-w-4xl text-center relative z-10">
          <h2 className="text-5xl md:text-8xl font-bold mb-8 tracking-tight">Measure what matters.</h2>
          <p className="text-xl md:text-2xl text-slate-600 font-medium">Gain crystal clear insights into audience growth, engagement rates, and ROI with our beautiful, real-time analytics dashboards.</p>
        </div>
      </section>
    </div>
  );
};

const FeatureSection = ({ title, headline, content, icon: Icon, reversed = false }: any) => {
  return (
    <section className="min-h-screen flex items-center py-32 bg-white text-slate-900 overflow-hidden relative">
      <div className={`max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center ${reversed ? 'rtl' : ''}`}>
        <motion.div 
          className={reversed ? 'md:order-last' : ''}
          initial={{ opacity: 0, x: reversed ? 50 : -50 }} 
          whileInView={{ opacity: 1, x: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.8 }}
        >
          <span className="text-indigo-600 font-bold tracking-widest uppercase text-xs mb-4 block bg-indigo-50 inline-block px-3 py-1 rounded-full border border-indigo-100">{title}</span>
          <h2 className="text-5xl md:text-6xl font-bold mb-8 tracking-tight leading-none text-slate-900">{headline}</h2>
          <div className="space-y-6">
            {content.map((item: string, i: number) => (
              <div key={i} className="flex items-start gap-4">
                <CheckCircle2 className="text-indigo-500 mt-1 shrink-0" size={24} />
                <p className="text-lg text-slate-600 font-medium">{item}</p>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          whileInView={{ opacity: 1, scale: 1 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.8 }} 
          className="aspect-square rounded-[3rem] bg-gradient-to-br from-indigo-50/50 to-purple-50/50 border border-slate-100 shadow-2xl flex items-center justify-center p-12 overflow-hidden relative"
        >
          <div className="absolute inset-0 bg-white/40 backdrop-blur-3xl" />
          <Icon size={120} className="text-indigo-500 opacity-90 relative z-10" strokeWidth={1} />
        </motion.div>
      </div>
    </section>
  );
};

const ConnectSection = () => {
  return (
    <section id="publishing" className="py-32 bg-slate-900 text-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <span className="text-indigo-400 font-bold tracking-widest uppercase text-xs mb-6 block">Unified Workflow</span>
            <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight leading-none">Automate your social presence.</h2>
            <p className="text-xl text-white/60 mb-10 leading-relaxed">Combine creativity and performance perfectly. Build your content across networks efficiently, letting AI guide you toward creating high quality interactions.</p>
            <div className="space-y-8">
              {[
                { title: "Smart Scheduling", desc: "Select the optimal times to grab your audience's attention." },
                { title: "AI-Powered Ideation", desc: "Generate captions, refine ideas, and curate imagery instantly." },
                { title: "Approval Workflows", desc: "Maintain brand safety across external and internal stakeholders." }
              ].map((item, i) => (
                <div key={i} className="group">
                  <h4 className="text-xl font-bold mb-2 group-hover:text-indigo-400 transition-colors flex items-center gap-3"><Zap size={20} className="text-indigo-500" />{item.title}</h4>
                  <p className="text-white/50 pl-8">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
          <div className="relative aspect-square">
            <div className="absolute inset-0 bg-indigo-600/20 rounded-full blur-[100px] animate-pulse" />
            <motion.div animate={{ rotate: 360, scale: [1, 1.05, 1] }} transition={{ rotate: { duration: 30, repeat: Infinity, ease: "linear" }, scale: { duration: 4, repeat: Infinity, ease: "easeInOut" } }} className="relative w-full h-full flex items-center justify-center">
              <div className="w-3/4 h-3/4 border border-white/10 rounded-full flex items-center justify-center">
                <div className="w-2/3 h-2/3 border border-indigo-500/30 rounded-full flex items-center justify-center bg-black/50 backdrop-blur-md">
                  <Share2 size={64} className="text-indigo-500" />
                </div>
              </div>
              {[Globe, MessageSquare, Users, BarChart3].map((Icon, i) => (
                <motion.div key={i} className="absolute p-5 bg-slate-800 border border-white/10 rounded-2xl text-white shadow-2xl" style={{ top: `${50 + 42 * Math.sin(i * Math.PI / 2)}%`, left: `${50 + 42 * Math.cos(i * Math.PI / 2)}%` }} animate={{ y: [0, -15, 0] }} transition={{ duration: 4, delay: i * 0.7, repeat: Infinity }}>
                  <Icon size={28} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const PricingSection = () => {
  return (
    <section id="pricing" className="py-32 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 tracking-tight">Flexible plans for your growth.</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Choose the perfect plan to streamline your social media management. Start your <strong>free 7-day trial</strong> today.
          </p>
        </div>
        <div className="relative z-10 w-full overflow-x-auto pb-10">
          {/* @ts-ignore */}
          <stripe-pricing-table 
            pricing-table-id="prctbl_1TOGkXEHKIPSppstTcoPTwpY"
            publishable-key="pk_test_51TMojuEHKIPSppstURuEsKKaJVDAxWNXATHW7poUtLMv4GZL6529O48EKnch8Q6foWV5gWYKArL93ZnNpNjRmjqt00ivbt8QNs">
          {/* @ts-ignore */}
          </stripe-pricing-table>
        </div>
      </div>
    </section>
  );
};


const ContactForm = React.forwardRef<HTMLDivElement>((props, ref) => {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      if (db) {
        const submissionData = { ...formData, source: "website_social", createdAt: serverTimestamp() };
        if (!submissionData.company) delete (submissionData as any).company;
        await addDoc(collection(db, 'contact_messages'), submissionData);
      }
      setStatus('success');
      setFormData({ name: '', email: '', company: '', message: '' });
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <section ref={ref} id="contact" className="py-32 bg-white text-slate-900 overflow-hidden relative">
      <div className="absolute right-0 bottom-0 translate-x-1/3 translate-y-1/3 w-[800px] h-[800px] bg-indigo-50 rounded-full blur-[120px] -z-10" />
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white border border-slate-200 shadow-2xl rounded-[3rem] p-12 md:p-20 relative overflow-hidden">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 text-center">Let's talk growth.</h2>
          <p className="text-center text-slate-500 mb-12 text-lg">Have questions? Our team is ready to help you scale your social channels.</p>
          
          {status === 'success' ? (
            <div className="text-center py-12"><CheckCircle2 size={64} className="text-green-500 mx-auto mb-6" /><h3 className="text-2xl font-bold mb-4">Message Sent</h3><p className="text-slate-500 mb-8">We'll be in touch shortly.</p><button onClick={() => setStatus('idle')} className="text-indigo-600 font-bold hover:underline">Send another</button></div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <input required type="text" placeholder="Full Name" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:border-indigo-500 focus:bg-white transition-all text-slate-900" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                <input required type="email" placeholder="Work Email" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:border-indigo-500 focus:bg-white transition-all text-slate-900" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
              </div>
              <input type="text" placeholder="Company Name (Optional)" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:border-indigo-500 focus:bg-white transition-all text-slate-900" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} />
              <textarea required rows={4} placeholder="How can we help?" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:border-indigo-500 focus:bg-white transition-all resize-none text-slate-900" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} />
              <button disabled={status === 'loading'} className="crystal-btn w-full !py-5">
                {status === 'loading' ? <Loader2 className="animate-spin" /> : <span>Send Message <ArrowRight size={20} className="inline ml-2" /></span>}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
});

const Footer = () => (
  <footer className="bg-slate-900 text-white/50 py-20 border-t border-white/10">
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center overflow-hidden border border-white/20"><img src="https://lh3.googleusercontent.com/d/1Uar9WDkx3lxYThfku15zf5Ht5w5gfPDL" alt="Pursuit-One Logo" className="w-full h-full object-cover invert" referrerPolicy="no-referrer" /></div>
        <span className="text-white font-bold tracking-tight text-xl">Pursuit-One</span>
      </div>
      <div className="flex gap-8 text-xs font-bold uppercase tracking-widest text-white/60">
        <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
        <a href="#" className="hover:text-white transition-colors">Terms</a>
        <a href="#" className="hover:text-white transition-colors">Twitter</a>
      </div>
      <p className="text-sm">© 2026 Pursuit-One. All rights reserved.</p>
    </div>
  </footer>
);

export default function HomePage() {
  const contactRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);
  const scrollToContact = () => contactRef.current?.scrollIntoView({ behavior: 'smooth' });
  const scrollToPricing = () => pricingRef.current?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="bg-white min-h-screen selection:bg-indigo-500 selection:text-white font-sans antialiased text-slate-900">
      <Navbar onContactClick={scrollToContact} onPricingClick={scrollToPricing} />
      <main>
        <Hero onPricingClick={scrollToPricing} />
        <ScrollStory />
        
        <div id="features" className="bg-slate-50 border-y border-slate-200">
          <FeatureSection 
            title="Publishing" 
            headline="Create and plan." 
            icon={Calendar} 
            content={["Schedule your content calendar intuitively", "Preview posts for each platform", "Collaborate on drafts with your team"]} 
          />
          <FeatureSection 
            title="Unified Inbox" 
            headline="Never miss a message." 
            icon={MessageSquare} 
            reversed
            content={["Reply to DMs and comments everywhere", "Filter out the noise automatically", "Assign messages to team members"]} 
          />
          <FeatureSection 
            title="Analytics" 
            headline="Measure your success." 
            icon={BarChart3} 
            content={["Stunning reports ready to export", "Competitor tracking insights", "Engagement and demographic data"]} 
          />
        </div>
        
        <ConnectSection />
        
        <div ref={pricingRef}>
          <PricingSection />
        </div>

        <ContactForm ref={contactRef} />
        
        <section className="py-32 bg-slate-900 text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/40 via-slate-900 to-slate-900" />
          <div className="max-w-4xl mx-auto px-6 relative z-10">
            <h2 className="text-5xl md:text-8xl font-bold mb-8 tracking-tight leading-none text-white">Scale your audience.</h2>
            <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto font-medium">Join the thousands of modern businesses building communities, scheduling content, and analyzing growth on Pursuit-One.</p>
            <button onClick={scrollToPricing} className="crystal-btn text-xl">
              <span>Start Free 7-Day Trial</span>
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
