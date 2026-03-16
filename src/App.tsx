import React, { useState, useEffect, useRef, Component } from 'react';
import { 
  Users, 
  TrendingUp, 
  LayoutDashboard, 
  BarChart3, 
  Zap, 
  Smartphone, 
  Puzzle, 
  CheckCircle2, 
  ArrowRight, 
  Menu, 
  X, 
  Star,
  ShieldCheck,
  Globe,
  Clock,
  Mail,
  Calendar,
  MessageSquare,
  Calculator,
  Send,
  Loader2,
  AlertCircle,
  ChevronRight,
  Database,
  Layers,
  Cpu,
  Share2,
  Bot
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'motion/react';
import { db, auth } from './firebase';
import { collection, addDoc, serverTimestamp, getDocFromServer, doc } from 'firebase/firestore';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// --- Error Handling ---
const OperationTypeValues = { CREATE: 'create', UPDATE: 'update', DELETE: 'delete', LIST: 'list', GET: 'get', WRITE: 'write' } as const;
type OperationType = typeof OperationTypeValues[keyof typeof OperationTypeValues];

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

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  console.error('Firestore Error: ', error);
  throw new Error(error instanceof Error ? error.message : String(error));
}

// --- Components ---
const Navbar = ({ onContactClick }: { onContactClick: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${isScrolled ? 'bg-black/60 backdrop-blur-2xl border-b border-white/5 py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center overflow-hidden group-hover:rotate-12 transition-transform duration-500">
            <img 
              src="https://lh3.googleusercontent.com/d/1Uar9WDkx3lxYThfku15zf5Ht5w5gfPDL" 
              alt="Pursuit-One Logo" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <span className="text-2xl font-bold tracking-tighter text-white">Pursuit-One</span>
        </div>
        <div className="hidden md:flex items-center gap-10">
          {['Features', 'Ecosystem', 'Integrations', 'Demo'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-[10px] font-bold text-white/40 hover:text-white transition-all uppercase tracking-[0.2em]">{item}</a>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <button onClick={onContactClick} className="px-6 py-2.5 rounded-full text-xs font-bold bg-white text-black hover:bg-indigo-500 hover:text-white transition-all duration-500 shadow-xl shadow-white/5">Get Started</button>
        </div>
      </div>
    </nav>
  );
};

const Hero = ({ onContactClick }: { onContactClick: () => void }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]); // Slow zoom effect
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section ref={containerRef} className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Cinematic Background */}
      <motion.div style={{ scale }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/20 via-transparent to-black" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-indigo-600/10 rounded-full blur-[180px]" />
        
        {/* Moving Particles Simulation */}
        <div className="absolute inset-0 opacity-30">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              initial={{ 
                x: Math.random() * 100 + "%", 
                y: Math.random() * 100 + "%",
                opacity: Math.random()
              }}
              animate={{ 
                y: ["-10%", "110%"],
                opacity: [0, 1, 0]
              }}
              transition={{ 
                duration: Math.random() * 10 + 10, 
                repeat: Infinity, 
                ease: "linear",
                delay: Math.random() * 10
              }}
            />
          ))}
        </div>
      </motion.div>

      <motion.div style={{ opacity, y }} className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.span 
          initial={{ opacity: 0, letterSpacing: "0.5em" }} 
          animate={{ opacity: 1, letterSpacing: "0.3em" }} 
          transition={{ duration: 1.5 }}
          className="text-indigo-400 text-xs font-bold uppercase mb-8 block"
        >
          Pursuit-One CRM
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0, filter: "blur(10px)", y: 20 }} 
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }} 
          transition={{ duration: 1, delay: 0.2 }} 
          className="text-6xl md:text-9xl font-bold text-white tracking-tighter mb-8 leading-none"
        >
          The smarter way <br /> to <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">grow.</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1, delay: 0.4 }} 
          className="text-xl md:text-2xl text-white/40 mb-12 max-w-2xl mx-auto font-medium leading-relaxed"
        >
          A powerful CRM platform designed to streamline customer engagement, automate workflows, and empower businesses with actionable insights.
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1, delay: 0.6 }} 
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <button 
            onClick={onContactClick} 
            className="w-full sm:w-auto px-12 py-5 bg-white text-black rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-2xl shadow-white/10"
          >
            Get Started
          </button>
          <button 
            onClick={onContactClick} 
            className="w-full sm:w-auto px-12 py-5 bg-white/5 text-white border border-white/10 rounded-full font-bold text-lg hover:bg-white/10 transition-all backdrop-blur-sm"
          >
            Request Demo
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
};

const ScrollStory = () => {
  const main = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    if (!main.current) return;
    
    const panels = gsap.utils.toArray(".story-panel");
    
    // Create a context to ensure proper cleanup
    const ctx = gsap.context(() => {
      panels.forEach((panel: any) => {
        ScrollTrigger.create({
          trigger: panel,
          start: "top top",
          pin: true,
          pinSpacing: false,
          snap: 1,
        });
        
        const content = panel.querySelector(".story-content");
        if (content) {
          gsap.fromTo(content, 
            { opacity: 0, y: 50 },
            { 
              opacity: 1, 
              y: 0, 
              duration: 1,
              scrollTrigger: {
                trigger: panel,
                start: "top center",
                toggleActions: "play reverse play reverse"
              }
            }
          );
        }
      });
    }, main);

    return () => ctx.revert();
  }, { scope: main, dependencies: [] });

  return (
    <div ref={main} className="bg-black">
      <section className="story-panel h-screen flex items-center justify-center bg-black text-white px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent" />
        </div>
        <div className="story-content max-w-4xl text-center relative z-10">
          <h2 className="text-5xl md:text-8xl font-bold mb-8 tracking-tight">Built for teams that move fast.</h2>
          <p className="text-xl md:text-2xl text-white/40 font-medium">As you scroll, the future of CRM unfolds. Experience a platform that anticipates your needs.</p>
        </div>
      </section>
      
      <section className="story-panel h-screen flex items-center justify-center bg-slate-950 text-white px-6 border-t border-white/5 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <div className="w-[150%] h-[150%] border border-white/10 rounded-full animate-[spin_60s_linear_infinite]" />
          <div className="absolute w-[120%] h-[120%] border border-white/5 rounded-full animate-[spin_40s_linear_infinite_reverse]" />
        </div>
        <div className="story-content max-w-4xl text-center relative z-10">
          <h2 className="text-5xl md:text-8xl font-bold mb-8 tracking-tight">Track leads with precision.</h2>
          <p className="text-xl md:text-2xl text-white/40 font-medium">Never lose a conversation again. Intelligent lead scoring and automated categorization at your fingertips.</p>
        </div>
      </section>

      <section className="story-panel h-screen flex items-center justify-center bg-black text-white px-6 border-t border-white/5 overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-indigo-500/10 to-transparent" />
        <div className="story-content max-w-4xl text-center relative z-10">
          <h2 className="text-5xl md:text-8xl font-bold mb-8 tracking-tight">Automate the ordinary.</h2>
          <p className="text-xl md:text-2xl text-white/40 font-medium">Let Pursuit-One handle the follow-ups, task assignments, and data entry while you focus on building real relationships.</p>
        </div>
      </section>
    </div>
  );
};

const FutureVision = () => {
  return (
    <section className="py-32 bg-black text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-indigo-400 font-bold tracking-widest uppercase text-xs mb-6 block">The Roadmap</span>
            <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight leading-none">The future of customer engagement.</h2>
            <p className="text-xl text-white/40 mb-10 leading-relaxed">
              We're building more than just a CRM. We're creating an intelligent ecosystem that evolves with your business.
            </p>
            <div className="space-y-8">
              {[
                { title: "Marketing Automation", desc: "Seamlessly transition from lead capture to nurturing campaigns." },
                { title: "AI-Driven Insights", desc: "Predictive analytics that tell you which deals are most likely to close." },
                { title: "Business Workflow Automation", desc: "Connect every department with unified, intelligent workflows." }
              ].map((item, i) => (
                <div key={i} className="group">
                  <h4 className="text-xl font-bold mb-2 group-hover:text-indigo-400 transition-colors">{item.title}</h4>
                  <p className="text-white/40">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
          
          <div className="relative aspect-square">
            <div className="absolute inset-0 bg-indigo-600/20 rounded-full blur-[100px] animate-pulse" />
            <motion.div 
              animate={{ 
                rotate: 360,
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
              }}
              className="relative w-full h-full flex items-center justify-center"
            >
              <div className="w-3/4 h-3/4 border border-white/10 rounded-full flex items-center justify-center">
                <div className="w-2/3 h-2/3 border border-indigo-500/20 rounded-full flex items-center justify-center">
                  <Cpu size={64} className="text-indigo-500" />
                </div>
              </div>
              
              {/* Floating Icons */}
              {[Bot, Share2, Layers, Database].map((Icon, i) => (
                <motion.div
                  key={i}
                  className="absolute p-4 bg-slate-900 border border-white/10 rounded-2xl text-indigo-400 shadow-2xl"
                  style={{
                    top: `${50 + 40 * Math.sin(i * Math.PI / 2)}%`,
                    left: `${50 + 40 * Math.cos(i * Math.PI / 2)}%`,
                  }}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, delay: i * 0.5, repeat: Infinity }}
                >
                  <Icon size={24} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FeatureSection = ({ title, headline, content, icon: Icon, dark = false }: any) => {
  return (
    <section className={`min-h-screen flex items-center py-32 ${dark ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
        <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <span className="text-indigo-500 font-bold tracking-widest uppercase text-xs mb-4 block">{title}</span>
          <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight leading-none">{headline}</h2>
          <div className="space-y-6">
            {content.map((item: string, i: number) => (
              <div key={i} className="flex items-start gap-4">
                <CheckCircle2 className="text-indigo-500 mt-1 shrink-0" size={20} />
                <p className={`text-lg ${dark ? 'text-white/60' : 'text-black/60'}`}>{item}</p>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className={`aspect-square rounded-[3rem] ${dark ? 'bg-white/5 border border-white/10' : 'bg-slate-50 border border-slate-200'} flex items-center justify-center p-12 overflow-hidden`}>
          <Icon size={120} className="text-indigo-500 opacity-80" strokeWidth={1} />
        </motion.div>
      </div>
    </section>
  );
};

const Ecosystem = () => {
  const services = [
    { name: 'CRM', icon: Users, desc: 'Sales & Pipeline' },
    { name: 'Messaging', icon: MessageSquare, desc: 'Customer Chat' },
    { name: 'Automation', icon: Zap, desc: 'Workflows' },
    { name: 'Analytics', icon: BarChart3, desc: 'Data Insights' },
    { name: 'Integrations', icon: Puzzle, desc: 'Connect Tools' },
    { name: 'AI Assistants', icon: Bot, desc: 'Smart Support' },
  ];

  return (
    <section id="ecosystem" className="py-32 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-8xl font-bold mb-8">More than CRM.</h2>
          <p className="text-xl text-white/40">A platform for modern businesses.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <motion.div key={s.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-10 rounded-[2.5rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all group">
              <s.icon size={32} className="text-indigo-400 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold mb-2">{s.name}</h3>
              <p className="text-white/40">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactForm = React.forwardRef<HTMLDivElement>((props, ref) => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', company: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      if (db) {
        const submissionData = {
          ...formData,
          source: "website",
          createdAt: serverTimestamp()
        };
        // Remove empty optional fields
        if (!submissionData.phone) delete (submissionData as any).phone;
        if (!submissionData.company) delete (submissionData as any).company;

        await addDoc(collection(db, 'contact_messages'), submissionData);
      } else {
        console.warn("Firestore not initialized, skipping message capture.");
      }
      
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', company: '', message: '' });
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <section ref={ref} id="contact" className="py-32 bg-black text-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white/5 border border-white/10 rounded-[3rem] p-12 md:p-20">
          <h2 className="text-4xl md:text-6xl font-bold mb-12 text-center">Get in touch.</h2>
          {status === 'success' ? (
            <div className="text-center py-12">
              <CheckCircle2 size={64} className="text-green-500 mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-4">Message Sent</h3>
              <p className="text-white/40 mb-8">We'll be in touch shortly.</p>
              <button onClick={() => setStatus('idle')} className="text-indigo-400 font-bold">Send another</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <input required type="text" placeholder="Name" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-indigo-500 transition-all" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                <input required type="email" placeholder="Email" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-indigo-500 transition-all" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <input type="tel" placeholder="Phone (Optional)" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-indigo-500 transition-all" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                <input type="text" placeholder="Company (Optional)" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-indigo-500 transition-all" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} />
              </div>
              <textarea required rows={4} placeholder="Message" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-indigo-500 transition-all resize-none" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} />
              <button disabled={status === 'loading'} className="w-full bg-white text-black py-5 rounded-full font-bold text-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-3">
                {status === 'loading' ? <Loader2 className="animate-spin" /> : <>Send Message <ArrowRight size={20} /></>}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
});

const PrivacyModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-slate-900 border border-white/10 rounded-[2.5rem] p-8 md:p-12 max-w-3xl w-full max-h-[80vh] overflow-y-auto custom-scrollbar"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Privacy Policy</h2>
                <p className="text-white/40 text-sm">Last Updated: 16-03-2026</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X size={24} className="text-white" />
              </button>
            </div>
            
            <div className="space-y-8 text-white/60 leading-relaxed">
              <section>
                <p>Pursuit-One provides a customer relationship management (CRM) platform that helps businesses manage their social media marketing and customer interactions.</p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-white mb-4">Information We Collect</h3>
                <p className="mb-4">When businesses connect their accounts to Pursuit-One, we may access certain information from third-party platforms such as Facebook, Instagram, WhatsApp, LinkedIn, or Google. This may include:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Public profile information used for login authentication</li>
                  <li>Facebook Page information and posts</li>
                  <li>Comments and engagement data from posts</li>
                  <li>Advertising campaign performance and insights</li>
                  <li>Lead information submitted through lead generation forms</li>
                  <li>Messages received through connected business messaging services such as WhatsApp</li>
                </ul>
                <p className="mt-4">This information is only accessed after the user or business administrator explicitly grants permission.</p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-white mb-4">How We Use the Information</h3>
                <p className="mb-4">The information collected is used to provide the following services within the Pursuit-One platform:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Display social media posts, comments, and engagement activity</li>
                  <li>Allow businesses to respond to customer comments and messages</li>
                  <li>Show advertising performance and insights</li>
                  <li>Retrieve leads generated from advertisements</li>
                  <li>Help businesses follow up with potential customers</li>
                  <li>Provide insights and recommendations to improve marketing performance</li>
                </ul>
                <p className="mt-4">We only use the data to provide services requested by the business using the platform.</p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-white mb-4">Data Sharing</h3>
                <p>Pursuit-One does not sell or share personal data with third parties. Data obtained through third-party platforms is used only to provide services to the business that authorized the connection.</p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-white mb-4">Data Security</h3>
                <p>We take reasonable technical and organizational measures to protect the information processed through our platform.</p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-white mb-4">Data Retention</h3>
                <p>Data is retained only as long as necessary to provide services to the business using the platform or until the user disconnects their account.</p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-white mb-4">User Data Deletion</h3>
                <p className="mb-4">If a user wishes to request deletion of their data, they can contact us at:</p>
                <p className="font-bold text-indigo-400">Email: support@pursuit-one.com</p>
                <p className="mt-4">Once a request is received, we will delete the user's data from our systems within a reasonable timeframe.</p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-white mb-4">Contact Us</h3>
                <p className="mb-4">If you have questions about this Privacy Policy, you can contact us at:</p>
                <p className="font-bold text-indigo-400">Email: support@pursuit-one.com</p>
              </section>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Footer = ({ onPrivacyClick }: { onPrivacyClick: () => void }) => (
  <footer className="bg-black text-white/40 py-20 border-t border-white/5">
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-white rounded flex items-center justify-center overflow-hidden">
          <img 
            src="https://lh3.googleusercontent.com/d/1Uar9WDkx3lxYThfku15zf5Ht5w5gfPDL" 
            alt="Pursuit-One Logo" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <span className="text-white font-bold tracking-tight">Pursuit-One</span>
      </div>
      <div className="flex gap-8 text-xs font-bold uppercase tracking-widest">
        <button onClick={onPrivacyClick} className="hover:text-white transition-colors">Privacy</button>
        <a href="#" className="hover:text-white transition-colors">Terms</a>
        <a href="#" className="hover:text-white transition-colors">Twitter</a>
      </div>
      <p className="text-xs">© 2026 Pursuit-One CRM. All rights reserved.</p>
    </div>
  </footer>
);

export default function App() {
  const contactRef = useRef<HTMLDivElement>(null);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  const scrollToContact = () => contactRef.current?.scrollIntoView({ behavior: 'smooth' });

  return (
    <ErrorBoundary>
      <div className="bg-black min-h-screen selection:bg-indigo-500 selection:text-white font-sans antialiased">
        <Navbar onContactClick={scrollToContact} />
        <main>
          <Hero onContactClick={scrollToContact} />
          <ScrollStory />
          <div id="features">
            <FeatureSection title="Lead Management" headline="Never lose a lead again." icon={Users} dark content={["Capture leads automatically", "Intelligent lead scoring", "Omnichannel organization"]} />
            <FeatureSection title="Sales Pipeline" headline="See your deals clearly." icon={TrendingUp} content={["Visual pipeline stages", "Revenue forecasting", "Team performance monitoring"]} />
            <FeatureSection title="Automation" headline="Let automation do the work." icon={Zap} dark content={["Automated follow-ups", "Smart task reminders", "Workflow triggers"]} />
            <FeatureSection title="Insights" headline="Decisions powered by data." icon={BarChart3} content={["Real-time reports", "Customer insights", "Performance analytics"]} />
          </div>
          <Ecosystem />
          <FutureVision />
          <section id="integrations" className="py-32 bg-white text-black text-center overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-5xl md:text-8xl font-bold mb-8 tracking-tight">Works with everything.</h2>
                <p className="text-xl text-black/40 mb-20 max-w-2xl mx-auto">Email, WhatsApp, Google Workspace, and more. Seamlessly integrated into your existing workflow.</p>
              </motion.div>
              
              <div className="relative flex overflow-hidden group">
                <motion.div 
                  animate={{ x: ["0%", "-50%"] }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="flex gap-20 items-center whitespace-nowrap py-10"
                >
                  {[Mail, MessageSquare, Globe, LayoutDashboard, Database, Share2, Layers, Cpu, Zap, Users].map((Icon, i) => (
                    <div key={i} className="flex items-center gap-4 text-black/20 hover:text-indigo-500 transition-colors cursor-pointer">
                      <Icon size={64} strokeWidth={1} />
                    </div>
                  ))}
                  {/* Duplicate for seamless loop */}
                  {[Mail, MessageSquare, Globe, LayoutDashboard, Database, Share2, Layers, Cpu, Zap, Users].map((Icon, i) => (
                    <div key={`dup-${i}`} className="flex items-center gap-4 text-black/20 hover:text-indigo-500 transition-colors cursor-pointer">
                      <Icon size={64} strokeWidth={1} />
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </section>
          <section id="demo" className="py-32 bg-black text-white text-center">
            <div className="max-w-4xl mx-auto px-6">
              <h2 className="text-5xl md:text-8xl font-bold mb-8 tracking-tight">See it in action.</h2>
              <div className="aspect-video bg-white/5 border border-white/10 rounded-[3rem] flex items-center justify-center mb-12">
                <Zap size={64} className="text-indigo-500 animate-pulse" />
              </div>
              <button onClick={scrollToContact} className="px-10 py-4 bg-white text-black rounded-full font-bold text-xl">Watch Demo</button>
            </div>
          </section>
          <ContactForm ref={contactRef} />
          <section className="py-32 bg-white text-black text-center">
            <div className="max-w-4xl mx-auto px-6">
              <h2 className="text-5xl md:text-8xl font-bold mb-12 tracking-tight leading-none">The future of engagement.</h2>
              <button onClick={scrollToContact} className="px-12 py-6 bg-black text-white rounded-full font-bold text-2xl hover:scale-105 transition-transform">Start Free Trial</button>
            </div>
          </section>
        </main>
        <Footer onPrivacyClick={() => setIsPrivacyOpen(true)} />
        <PrivacyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
      </div>
    </ErrorBoundary>
  );
}
