import React, { useState, useEffect, useRef } from 'react';
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
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const Nav = ({ onContactClick }: { onContactClick: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">P</div>
          <span className="text-2xl font-display font-bold text-slate-900">Pursuit-One</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <a href="#features" className="hover:text-indigo-600 transition-colors">Features</a>
          <a href="#benefits" className="hover:text-indigo-600 transition-colors">Benefits</a>
          <a href="#integrations" className="hover:text-indigo-600 transition-colors">Integrations</a>
          <button onClick={onContactClick} className="hover:text-indigo-600 transition-colors">Contact Us</button>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <button 
            onClick={onContactClick}
            className="bg-indigo-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
          >
            Get Started Free
          </button>
        </div>

        <button className="md:hidden text-slate-900" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4 text-slate-600 font-medium">
              <a href="#features" onClick={() => setIsMobileMenuOpen(false)}>Features</a>
              <a href="#benefits" onClick={() => setIsMobileMenuOpen(false)}>Benefits</a>
              <a href="#integrations" onClick={() => setIsMobileMenuOpen(false)}>Integrations</a>
              <button 
                className="text-left"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onContactClick();
                }}
              >
                Contact Us
              </button>
              <hr className="border-slate-100" />
              <button 
                className="bg-indigo-600 text-white px-5 py-3 rounded-xl text-center font-semibold"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onContactClick();
                }}
              >
                Get Started Free
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ onContactClick }: { onContactClick: () => void }) => (
  <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-30">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-200 blur-[120px] rounded-full" />
      <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-emerald-100 blur-[100px] rounded-full" />
    </div>
    
    <div className="max-w-7xl mx-auto px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="inline-block px-4 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
          The Future of Relationship Management
        </span>
        <h1 className="text-5xl lg:text-7xl font-display font-extrabold text-slate-900 leading-[1.1] mb-6 max-w-4xl mx-auto">
          Close more deals. <br />
          <span className="text-indigo-600">Build better relationships.</span>
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          Pursuit-One CRM is the all-in-one platform that streamlines your sales pipeline, automates tedious tasks, and gives your team the insights they need to grow faster.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <button 
            onClick={onContactClick}
            className="w-full sm:w-auto bg-indigo-600 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 flex items-center justify-center gap-2 group"
          >
            Start Your Free Trial <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button 
            onClick={onContactClick}
            className="w-full sm:w-auto bg-white text-slate-900 border border-slate-200 px-8 py-4 rounded-full text-lg font-bold hover:bg-slate-50 transition-all"
          >
            Book a Demo
          </button>
        </div>

        <p className="text-sm text-slate-500 flex items-center justify-center gap-2">
          <CheckCircle2 size={16} className="text-emerald-500" /> No credit card required. 14-day free trial.
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mt-20 relative"
      >
        <div className="relative mx-auto max-w-5xl rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden p-2">
          <img 
            src="https://picsum.photos/seed/crm-dashboard/1600/900" 
            alt="Pursuit-One CRM Dashboard" 
            className="rounded-xl w-full h-auto"
            referrerPolicy="no-referrer"
          />
        </div>
        {/* Decorative elements */}
        <div className="absolute -top-6 -right-6 w-24 h-24 bg-indigo-600/10 rounded-full blur-2xl" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-emerald-600/10 rounded-full blur-3xl" />
      </motion.div>
    </div>
  </section>
);

const Overview = () => (
  <section className="py-24 bg-slate-50">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-slate-900 mb-6">
            What is Pursuit-One CRM?
          </h2>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            Pursuit-One CRM is a modern, cloud-based customer relationship management solution designed for businesses that value speed, clarity, and results. Whether you're a scaling startup or an established enterprise, our platform centralizes your customer data, sales activities, and team communication in one intuitive interface.
          </p>
          <div className="space-y-4">
            {[
              { title: "For Sales Teams", desc: "Manage leads, track deals, and forecast revenue with precision." },
              { title: "For Marketing Teams", desc: "Segment audiences and launch targeted campaigns that convert." },
              { title: "For Support Teams", desc: "Deliver exceptional service with a 360-degree view of every customer." }
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-4 bg-white rounded-xl border border-slate-100 shadow-sm">
                <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600 shrink-0">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{item.title}</h4>
                  <p className="text-slate-500 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="aspect-square bg-indigo-600 rounded-3xl overflow-hidden shadow-2xl rotate-3">
             <img 
              src="https://picsum.photos/seed/team-collaboration/800/800" 
              alt="Team Collaboration" 
              className="w-full h-full object-cover opacity-90"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 max-w-[240px] -rotate-3">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                <TrendingUp size={20} />
              </div>
              <span className="font-bold text-slate-900">+42% Growth</span>
            </div>
            <p className="text-xs text-slate-500">Average revenue increase for Pursuit-One users in their first year.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Features = () => {
  const features = [
    { icon: <Users />, title: "Lead & Contact Management", desc: "Capture leads from any source and manage your entire contact database with ease." },
    { icon: <TrendingUp />, title: "Sales Pipeline Tracking", desc: "Visualize your sales process and move deals through custom stages with drag-and-drop simplicity." },
    { icon: <LayoutDashboard />, title: "Customizable Dashboards", desc: "Build the views you need to stay on top of your KPIs and team performance." },
    { icon: <BarChart3 />, title: "Reporting & Analytics", desc: "Deep-dive into your data with powerful, automated reports that reveal growth opportunities." },
    { icon: <Zap />, title: "Workflow Automation", desc: "Eliminate repetitive tasks by automating follow-ups, assignments, and status updates." },
    { icon: <Smartphone />, title: "Mobile Access", desc: "Stay connected on the go with our fully-featured mobile app for iOS and Android." }
  ];

  return (
    <section id="features" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-display font-bold text-slate-900 mb-4">Powerful Features for Modern Teams</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">Everything you need to manage your customer lifecycle from first touch to loyal advocate.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div key={i} className="group p-8 rounded-2xl border border-slate-100 bg-white hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300">
              <div className="w-14 h-14 bg-slate-50 text-slate-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                {React.cloneElement(f.icon as React.ReactElement, { size: 28 })}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{f.title}</h3>
              <p className="text-slate-600 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Benefits = () => (
  <section id="benefits" className="py-24 bg-indigo-900 text-white overflow-hidden relative">
    <div className="absolute top-0 right-0 w-1/2 h-full bg-indigo-800/50 skew-x-12 translate-x-1/4" />
    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <div className="text-center mb-16">
        <h2 className="text-3xl lg:text-5xl font-display font-bold mb-4">Why Choose Pursuit-One?</h2>
        <p className="text-indigo-200 text-lg max-w-2xl mx-auto">We don't just provide software; we provide a foundation for your business success.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-12">
        {[
          { icon: <Zap />, title: "Increase Sales Productivity", desc: "Spend less time on data entry and more time selling. Our automation tools handle the busy work so you can focus on closing." },
          { icon: <Users />, title: "Improve Customer Engagement", desc: "Deliver personalized experiences at scale. Know exactly what your customers need before they even ask." },
          { icon: <Puzzle />, title: "Boost Team Collaboration", desc: "Break down silos. Share notes, activities, and insights across departments for a unified customer approach." },
          { icon: <ShieldCheck />, title: "Data-Driven Decision Making", desc: "Stop guessing. Use real-time analytics to understand what's working and where you need to pivot." }
        ].map((b, i) => (
          <div key={i} className="flex gap-6">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 text-indigo-300">
              {React.cloneElement(b.icon as React.ReactElement, { size: 32 })}
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-3">{b.title}</h3>
              <p className="text-indigo-100 leading-relaxed opacity-80">{b.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Integrations = () => (
  <section id="integrations" className="py-24">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-slate-900 mb-6">Connect Your Entire Tech Stack</h2>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            Pursuit-One CRM doesn't work in isolation. We offer native integrations with the tools your team already uses every day. From email and calendars to accounting and support software, we keep your data synced and your workflows fluid.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: <Mail />, name: "Email Sync" },
              { icon: <Calendar />, name: "Calendar" },
              { icon: <MessageSquare />, name: "Slack/Teams" },
              { icon: <Calculator />, name: "Accounting" },
              { icon: <Globe />, name: "Webhooks" },
              { icon: <Puzzle />, name: "Open API" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 bg-slate-50">
                <div className="text-indigo-600">{item.icon}</div>
                <span className="font-medium text-slate-700 text-sm">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[1,2,3,4,5,6,7,8,9].map((i) => (
            <div key={i} className="aspect-square bg-white border border-slate-100 rounded-2xl shadow-sm flex items-center justify-center p-4 hover:shadow-md transition-shadow">
               <img 
                src={`https://picsum.photos/seed/logo-${i}/100/100`} 
                alt="Integration Logo" 
                className="w-12 h-12 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all"
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const Testimonials = () => (
  <section className="py-24 bg-slate-50 overflow-hidden">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-3xl lg:text-5xl font-display font-bold text-slate-900 mb-4">Trusted by 10,000+ Companies</h2>
        <div className="flex items-center justify-center gap-1 text-amber-400 mb-2">
          {[1,2,3,4,5].map(i => <Star key={i} fill="currentColor" size={20} />)}
        </div>
        <p className="text-slate-600">Rated 4.9/5 on G2 and Capterra</p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {[
          { name: "Sarah Jenkins", role: "VP of Sales, TechFlow", quote: "Pursuit-One transformed our sales process. We've seen a 30% increase in deal velocity since switching from our old legacy CRM." },
          { name: "Michael Chen", role: "Founder, GrowthLabs", quote: "The automation features are a game-changer. My team saves at least 10 hours a week on administrative tasks. It's intuitive and powerful." },
          { name: "Elena Rodriguez", role: "Operations Director, GlobalLink", quote: "The implementation was seamless. The support team was there every step of the way, and the reporting insights are incredible." }
        ].map((t, i) => (
          <div key={i} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative">
            <div className="absolute -top-4 -left-4 w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-serif text-2xl">"</div>
            <p className="text-slate-600 italic mb-6 leading-relaxed">"{t.quote}"</p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-slate-200 overflow-hidden">
                <img src={`https://picsum.photos/seed/user-${i}/100/100`} alt={t.name} referrerPolicy="no-referrer" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">{t.name}</h4>
                <p className="text-xs text-slate-500">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const ContactForm = React.forwardRef<HTMLDivElement>((props, ref) => {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', company: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section ref={ref} id="contact" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-slate-50 rounded-[2rem] p-8 md:p-12 border border-slate-100 shadow-xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-slate-900 mb-4">Contact Us</h2>
            <p className="text-slate-600">Fill out the form below and our team will get back to you shortly.</p>
          </div>

          {status === 'success' ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={40} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Message Sent!</h3>
              <p className="text-slate-600 mb-8">Thank you for reaching out. We'll be in touch soon.</p>
              <button 
                onClick={() => setStatus('idle')}
                className="text-indigo-600 font-bold hover:underline"
              >
                Send another message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Full Name</label>
                  <input 
                    required
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                  <input 
                    required
                    type="email"
                    placeholder="john@company.com"
                    className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Company Name</label>
                <input 
                  required
                  type="text"
                  placeholder="Acme Inc."
                  className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">How can we help?</label>
                <textarea 
                  required
                  rows={4}
                  placeholder="Tell us about your team's needs..."
                  className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 outline-none transition-all resize-none"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>
              
              <button 
                disabled={status === 'loading'}
                type="submit"
                className="w-full bg-indigo-600 text-white py-5 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {status === 'loading' ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <>Send Message <Send size={20} /></>
                )}
              </button>

              {status === 'error' && (
                <p className="text-red-500 text-center text-sm font-medium">
                  Something went wrong. Please try again later.
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
});

const Footer = ({ onContactClick }: { onContactClick: () => void }) => (
  <footer className="bg-slate-900 text-slate-400 py-20">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">P</div>
            <span className="text-2xl font-display font-bold text-white">Pursuit-One</span>
          </div>
          <p className="max-w-sm mb-8">
            Empowering businesses to build lasting relationships and drive sustainable growth through intelligent CRM solutions.
          </p>
          <div className="flex gap-4">
            {['Twitter', 'LinkedIn', 'Facebook', 'Instagram'].map(s => (
              <a key={s} href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all">
                <span className="sr-only">{s}</span>
                <Globe size={20} />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6">Product</h4>
          <ul className="space-y-4 text-sm">
            <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
            <li><a href="#integrations" className="hover:text-white transition-colors">Integrations</a></li>
            <li><button onClick={onContactClick} className="hover:text-white transition-colors">Contact Us</button></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6">Company</h4>
          <ul className="space-y-4 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
            <li><button onClick={onContactClick} className="hover:text-white transition-colors">Contact</button></li>
            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
          </ul>
        </div>
      </div>
      <div className="pt-8 border-t border-slate-800 text-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <p>© 2026 Pursuit-One CRM. All rights reserved.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
        </div>
      </div>
    </div>
  </footer>
);

const CTASection = ({ onContactClick }: { onContactClick: () => void }) => (
  <section className="py-24 relative overflow-hidden">
    <div className="max-w-5xl mx-auto px-6">
      <div className="bg-indigo-600 rounded-[3rem] p-12 lg:p-20 text-center text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-white blur-[100px] rounded-full" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-white blur-[100px] rounded-full" />
        </div>
        <div className="relative z-10">
          <h2 className="text-4xl lg:text-6xl font-display font-bold mb-6">Ready to accelerate your growth?</h2>
          <p className="text-xl text-indigo-100 mb-10 max-w-2xl mx-auto">
            Join thousands of teams who are closing more deals and building better relationships with Pursuit-One CRM.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={onContactClick}
              className="w-full sm:w-auto bg-white text-indigo-600 px-10 py-5 rounded-full text-xl font-bold hover:bg-indigo-50 transition-all shadow-xl"
            >
              Start Your Free Trial
            </button>
            <button 
              onClick={onContactClick}
              className="w-full sm:w-auto bg-indigo-700 text-white border border-indigo-500 px-10 py-5 rounded-full text-xl font-bold hover:bg-indigo-800 transition-all"
            >
              Talk to Sales
            </button>
          </div>
          <p className="mt-8 text-indigo-200 text-sm">No credit card required • Cancel anytime • 24/7 Support</p>
        </div>
      </div>
    </div>
  </section>
);

export default function App() {
  const contactRef = useRef<HTMLDivElement>(null);

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen selection:bg-indigo-100 selection:text-indigo-900">
      <Nav onContactClick={scrollToContact} />
      <main>
        <Hero onContactClick={scrollToContact} />
        <Overview />
        <Features />
        <Benefits />
        <Integrations />
        <Testimonials />
        <ContactForm ref={contactRef} />
        <CTASection onContactClick={scrollToContact} />
      </main>
      <Footer onContactClick={scrollToContact} />
    </div>
  );
}


