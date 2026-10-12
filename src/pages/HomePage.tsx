import React, { useState, useEffect, useRef } from 'react';
import { 
  Users, 
  TrendingUp, 
  BarChart3, 
  Zap, 
  CheckCircle2, 
  ArrowRight, 
  Globe,
  MessageSquare,
  Loader2,
  Calendar,
  Share2,
  PhoneCall,
  Flame,
  UserCheck,
  Building2,
  Briefcase,
  Layers,
  Clock,
  Sparkles,
  MousePointerClick,
  Send,
  Heart,
  ChevronRight,
  ShieldCheck,
  Filter,
  Check,
  Tag,
  MessageCircle,
  Smartphone,
  Eye,
  Settings,
  HelpCircle,
  FileSpreadsheet
} from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import app, { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import KaleidoscopeCanvas from '../components/KaleidoscopeCanvas';

const APP_LOGIN_URL = "https://app.pursuit-one.com/#/login";

// --- Navbar ---
const Navbar = ({ onContactClick, onPricingClick }: { onContactClick: () => void, onPricingClick: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Content Hub', href: '#content-hub' },
    { name: 'WhatsApp', href: '#whatsapp' },
    { name: 'Leads', href: '#lead-capture' },
    { name: 'Campaigns', href: '#campaigns' },
    { name: 'Agencies', href: '#multi-business' },
    { name: 'Use Cases', href: '#use-cases' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-white/85 backdrop-blur-xl border-b border-slate-200/80 py-3 shadow-sm' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-10 h-10 bg-slate-950 rounded-xl flex items-center justify-center overflow-hidden shadow-md group-hover:scale-105 transition-all duration-300">
            <img 
              src="https://lh3.googleusercontent.com/d/1Uar9WDkx3lxYThfku15zf5Ht5w5gfPDL" 
              alt="Pursuit-One Logo" 
              className="w-full h-full object-cover invert"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-slate-900 leading-tight">Pursuit-One</span>
            <span className="text-[10px] font-semibold text-indigo-600 tracking-wider uppercase">Social & Agency Suite</span>
          </div>
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-7">
          {navLinks.map((item) => (
            <a 
              key={item.name} 
              href={item.href} 
              className="text-xs font-bold text-slate-600 hover:text-indigo-600 transition-colors uppercase tracking-wider"
            >
              {item.name}
            </a>
          ))}
          <button 
            onClick={onPricingClick} 
            className="text-xs font-bold text-slate-600 hover:text-indigo-600 transition-colors uppercase tracking-wider flex items-center gap-1"
          >
            <span>Pricing</span>
            <span className="text-[9px] px-1.5 py-0.2 rounded-full font-bold bg-pink-100 text-pink-700">30% OFF</span>
          </button>
        </div>

        {/* Right Action: Navigates to app login */}
        <div className="flex items-center gap-3">
          <a 
            href={APP_LOGIN_URL} 
            className="hidden sm:inline-flex px-5 py-2.5 rounded-full text-xs font-bold bg-slate-900 text-white hover:bg-indigo-600 transition-all duration-300 shadow-md shadow-indigo-500/10"
          >
            Start Free Trial
          </a>
          
          {/* Mobile hamburger */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg"
            aria-label="Toggle Menu"
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <span className="w-full h-0.5 bg-current rounded-full" />
              <span className="w-full h-0.5 bg-current rounded-full" />
              <span className="w-full h-0.5 bg-current rounded-full" />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-2xl border-b border-slate-200 px-6 py-4 space-y-3 animate-in fade-in duration-200">
          {navLinks.map((item) => (
            <a 
              key={item.name} 
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-semibold text-slate-700 hover:text-indigo-600 py-1"
            >
              {item.name}
            </a>
          ))}
          <a 
            href={APP_LOGIN_URL}
            onClick={() => setMobileMenuOpen(false)}
            className="block w-full py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl shadow-md text-center"
          >
            Start 7-Day Free Trial (No Card Needed)
          </a>
        </div>
      )}
    </nav>
  );
};

// --- Hero Section ---
const Hero = ({ onPricingClick }: { onPricingClick: () => void }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 70]);

  return (
    <section id="hero" ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-transparent pt-28 pb-16">
      {/* Background running curves */}
      <motion.div style={{ scale }} className="absolute inset-0 z-0 opacity-25 pointer-events-none">
        <div className="curve-bg bg-transparent">
          <div className="curve"></div>
          <div className="curve"></div>
          <div className="curve"></div>
        </div>
      </motion.div>

      <motion.div style={{ opacity, y }} className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Top Tag */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.85 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.8 }} 
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-indigo-600 text-xs font-bold uppercase tracking-widest mb-8 border border-indigo-100 shadow-sm"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-pulse shadow-sm" />
          <span>Unified Social Media Management & Agency Platform</span>
        </motion.div>
        
        {/* Main Headline */}
        <motion.h1 
          initial={{ opacity: 0, filter: "blur(10px)", y: 25 }} 
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }} 
          transition={{ duration: 0.9, delay: 0.15 }} 
          className="text-5xl sm:text-7xl lg:text-8xl font-bold text-slate-900 tracking-tight mb-8 leading-[1.08]"
        >
          Manage social, messaging, and multi-business operations with{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-600">
            brilliance.
          </span>
        </motion.h1>
        
        {/* Value Proposition Description */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.9, delay: 0.35 }} 
          className="text-lg sm:text-xl md:text-2xl text-slate-900 mb-10 max-w-3xl mx-auto font-semibold leading-relaxed tracking-normal drop-shadow-[0_1px_1px_rgba(255,255,255,0.9)]"
        >
          The all-in-one command center for Facebook & Instagram scheduling, verified WhatsApp Business marketing broadcasts, automated Meta instant lead capture, predefined ad objectives, and segregated multi-business operations.
        </motion.p>
        
        {/* Crystal Button with Shiny Thin Running Light */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.9, delay: 0.55 }} 
          className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-6"
        >
          <a href={APP_LOGIN_URL} className="crystal-btn text-lg group">
            <span className="flex items-center gap-2">
              Start Free 7-Day Trial <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </a>
          
          <a 
            href="#content-hub" 
            className="px-8 py-4 bg-white/95 hover:bg-white backdrop-blur-xl text-slate-900 border border-slate-300 hover:border-indigo-400 rounded-full font-bold text-base transition-all shadow-md hover:shadow-lg"
          >
            Explore Feature Hub
          </a>
        </motion.div>

        {/* Free trial guarantee subtext */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.75 }} 
          className="flex flex-wrap items-center justify-center gap-4 text-xs font-bold"
        >
          <span className="flex items-center gap-2 bg-white text-slate-900 px-4 py-2 rounded-full border-2 border-emerald-400 shadow-md">
            <CheckCircle2 size={16} className="text-emerald-500 fill-emerald-100" />
            <span>No credit card required to start</span>
          </span>
          <span className="flex items-center gap-2 bg-white text-slate-900 px-4 py-2 rounded-full border-2 border-indigo-400 shadow-md">
            <CheckCircle2 size={16} className="text-indigo-600 fill-indigo-100" />
            <span>Full access to all 6 core modules</span>
          </span>
          <span className="flex items-center gap-2 bg-white text-slate-900 px-4 py-2 rounded-full border-2 border-pink-400 shadow-md">
            <CheckCircle2 size={16} className="text-pink-600 fill-pink-100" />
            <span>Sign up today for 30% off (3 months)</span>
          </span>
        </motion.div>

        {/* Floating Feature Tiles Underneath */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.9, delay: 0.9 }} 
          className="mt-14 pt-8 border-t border-slate-300 max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 text-left"
        >
          {[
            { 
              label: 'Content Hub', 
              desc: 'FB & IG Publishing', 
              border: 'border-blue-400 hover:border-blue-600',
              glow: 'hover:shadow-blue-200/80',
              iconBg: 'bg-blue-600 text-white',
              badge: 'bg-blue-50 text-blue-900 font-bold',
              dot: 'bg-blue-500',
              icon: '✦'
            },
            { 
              label: 'WhatsApp', 
              desc: 'Official Broadcasts', 
              border: 'border-emerald-400 hover:border-emerald-600',
              glow: 'hover:shadow-emerald-200/80',
              iconBg: 'bg-emerald-600 text-white',
              badge: 'bg-emerald-50 text-emerald-900 font-bold',
              dot: 'bg-emerald-500',
              icon: '💬'
            },
            { 
              label: 'Lead Capture', 
              desc: 'Instant Form Sync', 
              border: 'border-violet-400 hover:border-violet-600',
              glow: 'hover:shadow-violet-200/80',
              iconBg: 'bg-violet-600 text-white',
              badge: 'bg-violet-50 text-violet-900 font-bold',
              dot: 'bg-violet-500',
              icon: '⚡'
            },
            { 
              label: '8 Goals', 
              desc: 'Predefined Campaigns', 
              border: 'border-amber-400 hover:border-amber-600',
              glow: 'hover:shadow-amber-200/80',
              iconBg: 'bg-amber-500 text-white',
              badge: 'bg-amber-50 text-amber-900 font-bold',
              dot: 'bg-amber-500',
              icon: '🎯'
            },
            { 
              label: 'Multi-Business', 
              desc: 'Strict Segregation', 
              border: 'border-cyan-400 hover:border-cyan-600',
              glow: 'hover:shadow-cyan-200/80',
              iconBg: 'bg-cyan-600 text-white',
              badge: 'bg-cyan-50 text-cyan-900 font-bold',
              dot: 'bg-cyan-500',
              icon: '🏢'
            },
            { 
              label: 'Agency Hub', 
              desc: 'Staff Audit & Calendar', 
              border: 'border-rose-400 hover:border-rose-600',
              glow: 'hover:shadow-rose-200/80',
              iconBg: 'bg-rose-600 text-white',
              badge: 'bg-rose-50 text-rose-900 font-bold',
              dot: 'bg-rose-500',
              icon: '👥'
            },
          ].map((item, idx) => (
            <div 
              key={idx} 
              className={`group bg-white border-2 ${item.border} rounded-2xl p-4 shadow-md hover:shadow-xl ${item.glow} transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold ${item.iconBg} shadow-sm group-hover:scale-110 transition-transform`}>
                  {item.icon}
                </span>
                <span className={`w-2.5 h-2.5 rounded-full ${item.dot} ring-4 ring-slate-100 group-hover:scale-125 transition-transform`} />
              </div>
              <div>
                <span className="text-[13px] font-extrabold text-slate-900 block truncate leading-snug">
                  {item.label}
                </span>
                <span className="text-xs text-slate-700 font-semibold block truncate mt-1">
                  {item.desc}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

// --- Section 1: Social Media Management & Content Hub ---
const ContentHubSection = () => {
  return (
    <section id="content-hub" className="py-28 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-50/90 text-cyan-800 text-xs font-bold uppercase tracking-widest mb-4 border border-cyan-200/80 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
            Phase 01 // Social Media Management & Content Hub
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6 leading-tight">
            Seamless publishing, instant conversations, and smart boosting.
          </h2>
          <p className="text-lg text-slate-600 font-medium leading-relaxed">
            Eliminate cross-platform friction. Plan and schedule content across Facebook and Instagram from one master visual calendar, engage directly with incoming feedback, and supercharge high-performing posts.
          </p>
        </div>

        {/* 4 Feature Pillars Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* 1. Facebook & Instagram Content Posting */}
          <motion.div 
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
            className="bg-white/85 backdrop-blur-2xl border border-slate-200/90 rounded-[2.5rem] p-8 md:p-10 shadow-xl relative overflow-hidden"
          >
            <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center mb-6 border border-cyan-100 shadow-xs">
              <Calendar size={24} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">Facebook & Instagram Content Posting</h3>
            <p className="text-slate-600 leading-relaxed font-medium mb-6">
              Seamlessly schedule, publish, and manage your social posts across Facebook and Instagram from a single unified calendar. Drag, drop, preview real-time smartphone feed mockups, and auto-queue at optimal engagement windows.
            </p>
            {/* Interactive Calendar Preview Pill */}
            <div className="p-4 bg-slate-50/90 rounded-2xl border border-slate-200/80 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
                <span className="font-bold text-slate-800">Unified Publishing Matrix</span>
              </div>
              <span className="font-semibold text-cyan-700 bg-cyan-100/70 px-2.5 py-0.5 rounded-full text-[10px]">
                Auto-Synced (FB & IG)
              </span>
            </div>
          </motion.div>

          {/* 2. Direct Post Engagement */}
          <motion.div 
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
            className="bg-white/85 backdrop-blur-2xl border border-slate-200/90 rounded-[2.5rem] p-8 md:p-10 shadow-xl relative overflow-hidden"
          >
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-6 border border-indigo-100 shadow-xs">
              <MessageSquare size={24} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">Direct Post Engagement</h3>
            <p className="text-slate-600 leading-relaxed font-medium mb-6">
              Monitor and respond to incoming comments and post messages instantly to keep your audience engaged and conversations moving. Never leave a high-intent follower or prospective customer waiting.
            </p>
            {/* Live Comment Stream Pill */}
            <div className="p-4 bg-slate-50/90 rounded-2xl border border-slate-200/80 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-ping" />
                <span className="font-bold text-slate-800">Instant Comment Stream</span>
              </div>
              <span className="font-semibold text-indigo-700 bg-indigo-100/70 px-2.5 py-0.5 rounded-full text-[10px]">
                Real-Time Inbox
              </span>
            </div>
          </motion.div>

          {/* 3. Content Boosting */}
          <motion.div 
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
            className="bg-white/85 backdrop-blur-2xl border border-slate-200/90 rounded-[2.5rem] p-8 md:p-10 shadow-xl relative overflow-hidden"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-6 border border-amber-100 shadow-xs">
              <Flame size={24} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">Content Boosting</h3>
            <p className="text-slate-600 leading-relaxed font-medium mb-6">
              Amplify your top-performing organic posts with just a few clicks to expand your reach and target new audiences directly. Identify high-engagement content and trigger automated ad spend immediately.
            </p>
            <div className="p-4 bg-slate-50/90 rounded-2xl border border-slate-200/80 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span className="font-bold text-slate-800">1-Click Post Booster</span>
              </div>
              <span className="font-semibold text-amber-700 bg-amber-100/70 px-2.5 py-0.5 rounded-full text-[10px]">
                Smart Spend Engine
              </span>
            </div>
          </motion.div>

          {/* 4. Interactive Content Insights */}
          <motion.div 
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
            className="bg-white/85 backdrop-blur-2xl border border-slate-200/90 rounded-[2.5rem] p-8 md:p-10 shadow-xl relative overflow-hidden"
          >
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 border border-blue-100 shadow-xs">
              <BarChart3 size={24} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">Interactive Content Insights</h3>
            <p className="text-slate-600 leading-relaxed font-medium mb-6">
              Track performance metrics in real time with interactive analytics dashboards that measure reach, engagement rates, and overall content effectiveness. Export beautiful, client-ready reports effortlessly.
            </p>
            <div className="p-4 bg-slate-50/90 rounded-2xl border border-slate-200/80 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                <span className="font-bold text-slate-800">Live ROI & Reach Visualizer</span>
              </div>
              <span className="font-semibold text-blue-700 bg-blue-100/70 px-2.5 py-0.5 rounded-full text-[10px]">
                Real-Time Telemetry
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// --- Section 2: WhatsApp Business Messaging ---
const WhatsAppSection = () => {
  return (
    <section id="whatsapp" className="py-28 bg-transparent relative overflow-hidden border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Text */}
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50/90 text-emerald-800 text-xs font-bold uppercase tracking-widest mb-6 border border-emerald-200/80 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Phase 02 // WhatsApp Business Messaging
            </div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6 leading-tight">
              Direct customer reach with 98% open rates.
            </h2>
            <p className="text-lg text-slate-600 font-medium leading-relaxed mb-8">
              Connect with your prospective clients and customers right where they read every message. Pursuit-One natively manages compliant WhatsApp message templates and powers high-volume broadcast campaigns.
            </p>

            <div className="space-y-6">
              <div className="bg-white/80 backdrop-blur-xl border border-slate-200/90 rounded-2xl p-6 shadow-md">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">01</div>
                  <h4 className="text-xl font-bold text-slate-900">Template Management</h4>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed font-medium pl-11">
                  Create, submit, and manage custom WhatsApp message templates directly within the platform. Streamline Meta compliance and keep approval status centralized.
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-xl border border-slate-200/90 rounded-2xl p-6 shadow-md">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">02</div>
                  <h4 className="text-xl font-bold text-slate-900">Marketing Broadcasts</h4>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed font-medium pl-11">
                  Send targeted marketing messages and updates at scale using pre-approved WhatsApp templates to drive immediate customer engagement and instant responses.
                </p>
              </div>
            </div>
          </div>

          {/* Right Visual: Interactive WhatsApp Simulator Card */}
          <div className="relative">
            <div className="absolute inset-0 bg-emerald-500/10 rounded-full blur-3xl" />
            <div className="bg-white/90 backdrop-blur-2xl border border-slate-200/90 rounded-[2.5rem] p-6 sm:p-8 shadow-2xl relative">
              {/* WhatsApp Header Mockup */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold shadow-sm">
                    <MessageCircle size={20} />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-slate-900 text-sm">Pursuit-One Verified</span>
                      <ShieldCheck size={14} className="text-emerald-500" />
                    </div>
                    <span className="text-[11px] text-slate-400 font-medium">WhatsApp Official Business API</span>
                  </div>
                </div>
                <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full border border-emerald-100">
                  Meta Approved
                </span>
              </div>

              {/* Message Bubble Simulator */}
              <div className="bg-emerald-50/60 rounded-2xl p-5 border border-emerald-100/80 mb-5 text-sm space-y-3">
                <p className="font-semibold text-slate-800">
                  🎉 Hi Alex, welcome to our special 30% OFF promotion!
                </p>
                <p className="text-slate-600 text-xs leading-relaxed">
                  Your 7-day free trial on Pursuit-One is active. Start scheduling Facebook & Instagram posts, capture Instant Form leads, and launch campaigns today.
                </p>
                <div className="pt-2 flex flex-col sm:flex-row gap-2">
                  <a 
                    href={APP_LOGIN_URL}
                    className="bg-white text-emerald-700 font-bold text-xs py-2 px-4 rounded-xl border border-emerald-200/80 text-center shadow-xs hover:bg-emerald-50 transition-colors"
                  >
                    Start 7-Day Free Trial
                  </a>
                  <a 
                    href="#contact"
                    className="bg-white text-slate-700 font-medium text-xs py-2 px-4 rounded-xl border border-slate-200 text-center shadow-xs hover:bg-slate-50 transition-colors"
                  >
                    Talk to Support Team
                  </a>
                </div>
              </div>

              {/* Broadcast Metrics Card */}
              <div className="grid grid-cols-3 gap-3 text-center bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Sent</span>
                  <span className="text-slate-900 font-bold text-base">5,000</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Delivered</span>
                  <span className="text-emerald-600 font-bold text-base">99.4%</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Read Rate</span>
                  <span className="text-indigo-600 font-bold text-base">97.8%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Section 3: Lead Capture & Instant Forms ---
const LeadCaptureSection = () => {
  return (
    <section id="lead-capture" className="py-28 bg-transparent relative overflow-hidden border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-50/90 text-pink-800 text-xs font-bold uppercase tracking-widest mb-4 border border-pink-200/80 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
            Phase 03 // Lead Capture & Instant Forms
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6 leading-tight">
            Capture native leads. Delegate instantly. Close faster.
          </h2>
          <p className="text-lg text-slate-600 font-medium leading-relaxed">
            Eliminate manual CSV downloads and delayed replies. High-intent prospective customers from Facebook & Instagram Instant Forms sync in real time directly to your centralized pipeline.
          </p>
        </div>

        {/* 3 Core Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* 1. Instant Form Integration */}
          <div className="bg-white/85 backdrop-blur-2xl border border-slate-200/90 rounded-[2.5rem] p-8 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-pink-50 text-pink-600 flex items-center justify-center mb-6 border border-pink-100 shadow-xs">
              <Zap size={24} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">Instant Form Integration</h3>
            <p className="text-slate-600 text-sm leading-relaxed font-medium">
              Capture high-intent leads automatically from native Facebook and Instagram Instant Forms without manual data entry. Zero webhook complications or external third-party bridge tools required.
            </p>
          </div>

          {/* 2. Unified Leads Board */}
          <div className="bg-white/85 backdrop-blur-2xl border border-slate-200/90 rounded-[2.5rem] p-8 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-6 border border-purple-100 shadow-xs">
              <Layers size={24} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">Unified Leads Board</h3>
            <p className="text-slate-600 text-sm leading-relaxed font-medium">
              Track, filter, and manage every captured lead within a dynamic, centralized pipeline board. View customer phone numbers, inquiries, form values, and current stage statuses at a single glance.
            </p>
          </div>

          {/* 3. Team Assignment & Collaboration */}
          <div className="bg-white/85 backdrop-blur-2xl border border-slate-200/90 rounded-[2.5rem] p-8 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-6 border border-indigo-100 shadow-xs">
              <UserCheck size={24} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">Team Assignment & Collaboration</h3>
            <p className="text-slate-600 text-sm leading-relaxed font-medium">
              Assign specific leads to yourself or delegate them directly to your business team members for quick follow-ups. Keep accountability tight and prevent hot prospects from going cold.
            </p>
          </div>
        </div>

        {/* Live Kanban Pipeline Board Mockup */}
        <div className="bg-white/90 backdrop-blur-2xl border border-slate-200/90 rounded-[2.5rem] p-6 sm:p-8 shadow-2xl">
          <div className="flex flex-wrap items-center justify-between pb-6 border-b border-slate-100 gap-4 mb-6">
            <div>
              <h4 className="text-lg font-bold text-slate-900">Live Leads Board Simulator</h4>
              <p className="text-xs text-slate-500 font-medium">Direct synchronization from Meta Instant Forms</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100">
                12 New Leads Today
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {/* Stage 1: New Lead */}
            <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-200/80">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">New Lead (Form)</span>
                <span className="text-[10px] bg-slate-200 px-2 py-0.5 rounded-full font-bold">4</span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-2">
                <div className="flex justify-between items-start">
                  <span className="font-bold text-xs text-slate-900">David Miller</span>
                  <span className="text-[9px] font-bold bg-pink-100 text-pink-700 px-1.5 py-0.5 rounded">Instagram Form</span>
                </div>
                <p className="text-[11px] text-slate-500 truncate">Interested in Starter Social Management</p>
                <div className="flex justify-between items-center pt-1 border-t border-slate-100 text-[10px]">
                  <span className="text-slate-400">Just now</span>
                  <span className="text-indigo-600 font-bold">Unassigned</span>
                </div>
              </div>
            </div>

            {/* Stage 2: Contacted & Follow-up */}
            <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-200/80">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Contacted</span>
                <span className="text-[10px] bg-slate-200 px-2 py-0.5 rounded-full font-bold">5</span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-2">
                <div className="flex justify-between items-start">
                  <span className="font-bold text-xs text-slate-900">Elena Rostova</span>
                  <span className="text-[9px] font-bold bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">Facebook Form</span>
                </div>
                <p className="text-[11px] text-slate-500 truncate">WhatsApp broadcast sent // 30% offer</p>
                <div className="flex justify-between items-center pt-1 border-t border-slate-100 text-[10px]">
                  <span className="text-slate-400">14m ago</span>
                  <span className="text-emerald-600 font-bold">Assigned: Sarah</span>
                </div>
              </div>
            </div>

            {/* Stage 3: Closed / Converted */}
            <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-200/80">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Converted Client</span>
                <span className="text-[10px] bg-slate-200 px-2 py-0.5 rounded-full font-bold">3</span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-2">
                <div className="flex justify-between items-start">
                  <span className="font-bold text-xs text-slate-900">Marcus Vance</span>
                  <span className="text-[9px] font-bold bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded">Trial Activated</span>
                </div>
                <p className="text-[11px] text-slate-500 truncate">Upgraded to Starter $24.50/mo</p>
                <div className="flex justify-between items-center pt-1 border-t border-slate-100 text-[10px]">
                  <span className="text-slate-400">1h ago</span>
                  <span className="text-indigo-600 font-bold">Assigned: Mark</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Section 4: Marketing Campaigns & Predefined Goals ---
const CampaignsSection = () => {
  const predefinedGoals = [
    {
      title: "Get Messages",
      desc: "Drive direct conversations via Messenger, Instagram Direct, and WhatsApp.",
      icon: MessageSquare,
      color: "from-blue-500 to-indigo-600"
    },
    {
      title: "Boost Facebook Contents",
      desc: "Increase visibility and interactions on your Facebook posts.",
      icon: Share2,
      color: "from-blue-600 to-sky-600"
    },
    {
      title: "Boost Instagram Contents",
      desc: "Amplify your visual content and profile reach on Instagram.",
      icon: Sparkles,
      color: "from-pink-500 to-rose-600"
    },
    {
      title: "Get Calls",
      desc: "Encourage prospective clients to call your business directly.",
      icon: PhoneCall,
      color: "from-emerald-500 to-teal-600"
    },
    {
      title: "Get Page Likes",
      desc: "Grow your Facebook community and brand following.",
      icon: Heart,
      color: "from-indigo-500 to-purple-600"
    },
    {
      title: "Get Website Visits",
      desc: "Drive targeted traffic straight to your landing pages or website.",
      icon: Globe,
      color: "from-cyan-500 to-blue-600"
    },
    {
      title: "Get Page Follows and Likes",
      desc: "Build long-term audience loyalty across channels.",
      icon: Users,
      color: "from-purple-500 to-fuchsia-600"
    },
    {
      title: "Get Leads",
      desc: "Optimize ad spend specifically for instant form conversions and lead capture.",
      icon: Zap,
      color: "from-amber-500 to-orange-600"
    }
  ];

  return (
    <section id="campaigns" className="py-28 bg-transparent relative overflow-hidden border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50/90 text-amber-800 text-xs font-bold uppercase tracking-widest mb-4 border border-amber-200/80 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            Phase 04 // Marketing Campaigns & Predefined Goals
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6 leading-tight">
            Targeted campaigns built for your strategic goals.
          </h2>
          <p className="text-lg text-slate-600 font-medium leading-relaxed">
            <strong>Campaign Creator:</strong> Build targeted marketing campaigns quickly using an intuitive step-by-step campaign builder. Choose from built-in strategic goals designed to match your exact business needs without ads manager complexity.
          </p>
        </div>

        {/* 8 Predefined Campaign Objectives Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {predefinedGoals.map((goal, idx) => {
            const IconComponent = goal.icon;
            return (
              <motion.div 
                key={idx}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ duration: 0.25 }}
                className="bg-white/85 backdrop-blur-2xl border border-slate-200/90 rounded-3xl p-6 shadow-lg flex flex-col justify-between group hover:border-indigo-300 transition-all"
              >
                <div>
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${goal.color} text-white flex items-center justify-center mb-5 shadow-md group-hover:scale-110 transition-transform`}>
                    <IconComponent size={22} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                    {goal.title}
                  </h3>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    {goal.desc}
                  </p>
                </div>
                <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-400 group-hover:text-indigo-600 transition-colors">
                  <span>Objective #{idx + 1}</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// --- Section 5: Multi-Business Account Management & Agency Operations ---
const MultiBusinessSection = () => {
  return (
    <section id="multi-business" className="py-28 bg-transparent relative overflow-hidden border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50/90 text-indigo-800 text-xs font-bold uppercase tracking-widest mb-4 border border-indigo-200/80 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
            Agency Hub // Multi-Business Account Management
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6 leading-tight">
            Strict segregation. Master oversight. Flawless execution.
          </h2>
          <p className="text-lg text-slate-600 font-medium leading-relaxed">
            Run multiple distinct client businesses or sibling brands under a single master account with strict security boundaries, isolated lead tracking, full team audit trails, and synchronized collaborative calendars.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Account Segregation */}
          <div className="bg-white/85 backdrop-blur-2xl border border-slate-200/90 rounded-[2.5rem] p-8 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-6 border border-indigo-100 shadow-xs">
              <Building2 size={24} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">Account Segregation</h3>
            <p className="text-slate-600 text-sm leading-relaxed font-medium">
              Easily manage multiple businesses under a single master account with strict data and permission boundaries. Switch between business profiles in one click without accidental cross-posting.
            </p>
          </div>

          {/* Isolated Lead Tracking */}
          <div className="bg-white/85 backdrop-blur-2xl border border-slate-200/90 rounded-[2.5rem] p-8 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 border border-emerald-100 shadow-xs">
              <Filter size={24} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">Isolated Lead Tracking</h3>
            <p className="text-slate-600 text-sm leading-relaxed font-medium">
              Keep leads, campaigns, and metrics completely organized and segregated per respective business entity to prevent cross-contamination and guarantee ironclad client privacy.
            </p>
          </div>

          {/* Team Activity Tracking */}
          <div className="bg-white/85 backdrop-blur-2xl border border-slate-200/90 rounded-[2.5rem] p-8 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-6 border border-purple-100 shadow-xs">
              <Clock size={24} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">Team Activity Tracking</h3>
            <p className="text-slate-600 text-sm leading-relaxed font-medium">
              Monitor your supporting team members' actions across different client businesses to ensure alignment with your internal processes and leave nothing untracked.
            </p>
          </div>

          {/* Team Calendar & Reminders */}
          <div className="bg-white/85 backdrop-blur-2xl border border-slate-200/90 rounded-[2.5rem] p-8 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-6 border border-amber-100 shadow-xs">
              <Calendar size={24} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">Team Calendar & Reminders</h3>
            <p className="text-slate-600 text-sm leading-relaxed font-medium">
              Schedule reminders, coordinate tasks, and track team events in a centralized collaborative calendar so your entire marketing department stays perfectly synchronized.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Section 6: Comprehensive Use Cases & Value Proposition ---
const UseCasesSection = () => {
  return (
    <section id="use-cases" className="py-28 bg-transparent relative overflow-hidden border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest px-3.5 py-1 bg-indigo-50 text-indigo-700 rounded-full border border-indigo-100 mb-4 inline-block">
            Tailored For Growth
          </span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6">
            Engineered for your exact business model.
          </h2>
          <p className="text-lg text-slate-600 font-medium leading-relaxed">
            Whether you operate an independent growing business or run a high-demand digital marketing agency, Pursuit-One replaces tool chaos with singular operational clarity.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Card 1: For SMBs */}
          <div className="bg-white/90 backdrop-blur-2xl border border-slate-200/90 rounded-[3rem] p-8 md:p-12 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-6 border border-blue-100">
                <Building2 size={14} />
                For Small to Medium-Sized Businesses (SMBs)
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-6">
                End the exhausting tab-switching cycle.
              </h3>
              <p className="text-slate-600 leading-relaxed font-medium mb-8">
                If you are tired of switching constantly between multiple social media platforms to manage your posts, content, and messaging—and losing track of your ad spend versus lead conversions—<strong>Pursuit-One brings everything under one cohesive roof</strong>.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  "One unified calendar for Facebook & Instagram",
                  "Direct engagement with comments and messages",
                  "Fast WhatsApp Business outreach with official templates",
                  "Automated lead capture without manual CSV handling",
                  "Start completely free for 7 days with no credit card"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 size={18} className="text-indigo-600 shrink-0" />
                    <span className="text-sm text-slate-700 font-semibold">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Starter Tier</span>
              <span className="text-sm font-bold text-slate-900">Manage up to 2 businesses + 1 team member for just $24.50/mo.</span>
            </div>
          </div>

          {/* Card 2: For Digital Marketing Agencies */}
          <div className="bg-slate-950 text-white rounded-[3rem] p-8 md:p-12 shadow-2xl flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-600/20 rounded-full blur-[100px] pointer-events-none" />
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-900/60 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-6 border border-indigo-700/50">
                <Briefcase size={14} />
                For Digital Marketing Agencies
              </div>
              <h3 className="text-3xl font-bold text-white mb-6">
                Scale client operations with strict isolation.
              </h3>
              <p className="text-white/70 leading-relaxed font-medium mb-8">
                If you manage multiple client businesses and coordinate with supporting team members, <strong>Pursuit-One is the ultimate solution</strong>. Keep client social profiles strictly segregated, track every lead and its associated acquisition cost down to the penny, monitor staff activity to ensure processes are followed, and stay synchronized using the team calendar.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  "Strict multi-business data and account segregation",
                  "Isolated lead tracking per respective business entity",
                  "Full staff activity audit trail across client accounts",
                  "Centralized collaborative agency calendar & task reminders",
                  "Custom volume pricing for 3+ businesses & multi-seat teams"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
                    <span className="text-sm text-white/90 font-semibold">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative z-10 p-6 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/10">
              <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider block mb-1">Agency Custom Tiers</span>
              <span className="text-sm font-bold text-white">Need &gt;2 businesses &amp; onboarding many team members? Reach out to support for our best offer.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Section 7: Pricing Section ---
const PricingSection = ({ onContactClick }: { onContactClick: () => void }) => {
  return (
    <section id="pricing" className="py-28 bg-transparent relative overflow-hidden border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-50/90 text-pink-800 text-xs font-bold uppercase tracking-widest mb-4 border border-pink-200/80 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
            Phase 05 // Transparent Pricing & Free Trial
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6">
            Start free today. Scale without friction.
          </h2>
          <p className="text-lg text-slate-600 font-medium leading-relaxed">
            <strong>Start Pursuit-One free trial without any credit card information.</strong> Test all features risk-free for 7 full days.
          </p>

          {/* 30% OFF Special Banner */}
          <div className="mt-6 inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white font-bold text-sm shadow-xl shadow-pink-500/20">
            <Sparkles size={18} />
            <span>Sign up today for 3 months at 30% OFF your full price!</span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto mb-6">
          {/* Starter Plan */}
          <div className="bg-white/95 backdrop-blur-2xl border-2 border-indigo-600 rounded-[3rem] p-8 md:p-12 shadow-2xl relative flex flex-col justify-between">
            {/* Ribbon */}
            <div className="absolute -top-4 right-8 bg-gradient-to-r from-pink-500 to-indigo-600 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-md">
              Special 30% Discount
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">Starter Plan</h3>
                  <p className="text-xs text-slate-500 font-medium">All-in-one suite for growing businesses</p>
                </div>
                <span className="text-[11px] font-bold bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full border border-emerald-100">
                  7-Day Free Trial
                </span>
              </div>

              {/* Price display with strikethrough */}
              <div className="my-6 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl md:text-5xl font-extrabold text-slate-950">$24.50</span>
                  <span className="text-xs font-bold text-slate-500 uppercase">USD / month</span>
                </div>
                <div className="mt-2 flex items-center gap-2 text-xs">
                  <span className="text-slate-400 line-through font-semibold">$35.00 USD</span>
                  <span className="text-pink-600 font-bold bg-pink-50 px-2 py-0.5 rounded-full">Save 30% for 3 months</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-2 font-medium">
                  After your 7-day free trial. Cancel anytime with zero penalties.
                </p>
              </div>

              {/* What's included */}
              <div className="space-y-3.5 mb-8">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Includes all core features:
                </span>
                {[
                  "Facebook & Instagram Content Posting & Scheduling",
                  "Direct Post Engagement & Unified Comment Inbox",
                  "1-Click Content Boosting & Real-Time Performance Insights",
                  "WhatsApp Business Template Management & Broadcasts",
                  "Native Meta Instant Form Lead Capture & Pipeline Board",
                  "All 8 Predefined Campaign Goals Builder",
                  "Multi-Business Management up to 2 Businesses",
                  "1 Additional Team Member Seat included",
                  "No credit card required for 7-day trial"
                ].map((feat, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Check size={16} className="text-indigo-600 shrink-0 font-bold" />
                    <span className="text-xs text-slate-700 font-semibold">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Crystal button action - Navigates to app login */}
            <div className="pt-4">
              <a 
                href={APP_LOGIN_URL} 
                className="crystal-btn w-full !py-4 text-base"
              >
                <span>Start Free 7-Day Trial</span>
              </a>
              <p className="text-center text-[11px] text-slate-400 mt-3 font-medium">
                No credit card required • Instant access
              </p>
            </div>
          </div>

          {/* Digital Marketing Agency Plan */}
          <div className="bg-slate-900 text-white border border-slate-800 rounded-[3rem] p-8 md:p-12 shadow-2xl flex flex-col justify-between relative overflow-hidden">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-white">Agency &amp; Enterprise</h3>
                  <p className="text-xs text-slate-400 font-medium">For scaling agencies managing &gt;2 businesses</p>
                </div>
                <span className="text-[11px] font-bold bg-indigo-900/60 text-indigo-300 px-3 py-1 rounded-full border border-indigo-700/50">
                  Custom Volume
                </span>
              </div>

              {/* Price display */}
              <div className="my-6 p-6 bg-slate-800/80 rounded-2xl border border-white/10">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl md:text-4xl font-extrabold text-white">Best Offer</span>
                  <span className="text-xs font-semibold text-indigo-300">Custom volume tailored to your agency</span>
                </div>
                <p className="text-xs text-white/70 mt-2 font-medium leading-relaxed">
                  Managing more than 2 businesses or onboarding multiple support team members? Reach out to our support team for the best offer and personalized multi-tenant onboarding.
                </p>
              </div>

              {/* What's included */}
              <div className="space-y-3.5 mb-8">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Everything in Starter, plus:
                </span>
                {[
                  "Management for 3 to 100+ segregated client businesses",
                  "Onboarding for multiple supporting team members",
                  "Isolated lead tracking per respective client entity",
                  "Full staff activity audit logs across client accounts",
                  "Agency Shared Calendar, Reminders & Workflow Sync",
                  "Dedicated Account Manager & VIP 1-on-1 Onboarding",
                  "Custom SLA and priority technical support",
                  "Agency volume discount packages available"
                ].map((feat, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Check size={16} className="text-emerald-400 shrink-0 font-bold" />
                    <span className="text-xs text-white/90 font-semibold">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action */}
            <div className="pt-4">
              <button 
                onClick={onContactClick} 
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-full text-base transition-all shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2"
              >
                <span>Contact Support for Best Offer</span>
                <ArrowRight size={18} />
              </button>
              <p className="text-center text-[11px] text-white/50 mt-3 font-medium">
                Our agency specialist responds in under 15 minutes
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Section 8: Contact Form ---
const ContactForm = React.forwardRef<HTMLDivElement, { initialPlan?: string }>((props, ref) => {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    company: '', 
    planType: 'Starter (7-Day Trial)', 
    message: '' 
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    let sentSuccessfully = false;

    const submissionData = { 
      name: formData.name,
      email: formData.email,
      company: formData.company || "N/A",
      planType: formData.planType,
      message: formData.message || `Interest in ${formData.planType}`,
      recipient: "support@pursuit-one.com",
      to: "support@pursuit-one.com",
      source: "website_lead", 
      createdAt: serverTimestamp() 
    };

    // 1. Try sending to backend API route for instant notification
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          recipient: "support@pursuit-one.com",
          to: "support@pursuit-one.com"
        })
      });
      if (response.ok) {
        sentSuccessfully = true;
      }
    } catch (err) {
      console.warn("Backend API dispatch:", err);
    }

    // 2. Also persist to Firestore contact_messages if accessible
    if (db) {
      try {
        await addDoc(collection(db, 'contact_messages'), submissionData);
        sentSuccessfully = true;
      } catch (firestoreErr) {
        console.warn("Firestore contact message storage:", firestoreErr);
      }
    }

    if (sentSuccessfully) {
      setStatus('success');
      setFormData({ name: '', email: '', company: '', planType: 'Starter (7-Day Trial)', message: '' });
    } else {
      // Fallback: trigger user's email client directly to support@pursuit-one.com
      const subject = encodeURIComponent(`Pursuit-One Inquiry: ${formData.planType} - ${formData.name}`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company || 'N/A'}\nPlan: ${formData.planType}\n\nMessage:\n${formData.message}`
      );
      window.location.href = `mailto:support@pursuit-one.com?subject=${subject}&body=${body}`;
      setStatus('success');
      setFormData({ name: '', email: '', company: '', planType: 'Starter (7-Day Trial)', message: '' });
    }
  };

  return (
    <section ref={ref} id="contact" className="py-28 bg-white/80 backdrop-blur-2xl text-slate-900 overflow-hidden relative border-t border-slate-200/80">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white border border-slate-200 shadow-2xl rounded-[3rem] p-10 md:p-16 relative overflow-hidden">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest px-3.5 py-1 bg-indigo-50 text-indigo-700 rounded-full border border-indigo-100 mb-4 inline-block">
              Get Started In Minutes
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Start your free trial or request an agency proposal.
            </h2>
            <p className="text-slate-500 font-medium text-sm leading-relaxed">
              No credit card required for the 7-day trial. Need &gt;2 businesses? Tell us about your agency and we'll send our best volume offer immediately to your inbox.
            </p>
          </div>
          
          {status === 'success' ? (
            <div className="text-center py-12">
              <CheckCircle2 size={64} className="text-emerald-500 mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-3 text-slate-900">Enquiry Sent to Support!</h3>
              <p className="text-slate-600 mb-2 font-medium text-sm">
                Your message has been emailed directly to <strong className="text-indigo-600">support@pursuit-one.com</strong>.
              </p>
              <p className="text-slate-500 mb-6 text-xs font-medium">
                Our support and onboarding team will activate your workspace and reach out within 15 minutes.
              </p>
              <button 
                onClick={() => setStatus('idle')} 
                className="text-indigo-600 font-bold text-sm hover:underline"
              >
                Submit another inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">Full Name *</label>
                  <input 
                    required 
                    type="text" 
                    placeholder="e.g. John Doe" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 outline-none focus:border-indigo-500 focus:bg-white transition-all text-slate-900 text-sm font-medium" 
                    value={formData.name} 
                    onChange={e => setFormData({...formData, name: e.target.value})} 
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">Work Email *</label>
                  <input 
                    required 
                    type="email" 
                    placeholder="john@company.com" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 outline-none focus:border-indigo-500 focus:bg-white transition-all text-slate-900 text-sm font-medium" 
                    value={formData.email} 
                    onChange={e => setFormData({...formData, email: e.target.value})} 
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">Business / Agency Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Acme Marketing Agency" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 outline-none focus:border-indigo-500 focus:bg-white transition-all text-slate-900 text-sm font-medium" 
                    value={formData.company} 
                    onChange={e => setFormData({...formData, company: e.target.value})} 
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">Interest Plan</label>
                  <select 
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 outline-none focus:border-indigo-500 focus:bg-white transition-all text-slate-900 text-sm font-semibold"
                    value={formData.planType}
                    onChange={e => setFormData({...formData, planType: e.target.value})}
                  >
                    <option value="Starter (7-Day Trial)">Starter Plan (7-Day Free Trial // $24.50/mo)</option>
                    <option value="Agency Custom (>2 Businesses)">Digital Marketing Agency (&gt;2 Businesses &amp; Team)</option>
                    <option value="Enterprise / White-Label">Enterprise / Custom Multi-Tenant Solution</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">How can we help? (Optional)</label>
                <textarea 
                  rows={3} 
                  placeholder="Tell us how many businesses you manage or any questions..." 
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 outline-none focus:border-indigo-500 focus:bg-white transition-all resize-none text-slate-900 text-sm font-medium" 
                  value={formData.message} 
                  onChange={e => setFormData({...formData, message: e.target.value})} 
                />
              </div>

              <button 
                disabled={status === 'loading'} 
                className="crystal-btn w-full !py-4 text-base"
              >
                {status === 'loading' ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <span>Submit &amp; Start Free 7-Day Trial <ArrowRight size={18} className="inline ml-2" /></span>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
});

// --- Footer ---
const Footer = () => (
  <footer className="bg-slate-950 text-white/50 py-20 border-t border-white/10">
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-black rounded-xl flex items-center justify-center overflow-hidden border border-white/20">
          <img 
            src="https://lh3.googleusercontent.com/d/1Uar9WDkx3lxYThfku15zf5Ht5w5gfPDL" 
            alt="Pursuit-One Logo" 
            className="w-full h-full object-cover invert" 
            referrerPolicy="no-referrer" 
          />
        </div>
        <div className="flex flex-col">
          <span className="text-white font-bold tracking-tight text-lg">Pursuit-One</span>
          <span className="text-[10px] text-white/40">Social Media &amp; Agency Operations</span>
        </div>
      </div>
      <div className="flex gap-8 text-xs font-bold uppercase tracking-widest text-white/60">
        <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
        <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
        <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
        <a href="#contact" className="hover:text-white transition-colors">Contact</a>
      </div>
      <p className="text-xs text-white/40 font-medium">© 2026 Pursuit-One. All rights reserved.</p>
    </div>
  </footer>
);

// --- Main Page Component ---
export default function HomePage() {
  const contactRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);

  const scrollToContact = () => contactRef.current?.scrollIntoView({ behavior: 'smooth' });
  const scrollToPricing = () => pricingRef.current?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="relative min-h-screen bg-slate-50/30 selection:bg-indigo-500 selection:text-white font-sans antialiased text-slate-900 overflow-x-hidden">
      {/* Real Optical iPhone Kaleidoscope Engine (Fullscreen WebGL background with scroll sync) */}
      <KaleidoscopeCanvas />

      {/* Navigation */}
      <Navbar onContactClick={scrollToContact} onPricingClick={scrollToPricing} />

      <main className="relative z-10">
        {/* Hero Section */}
        <Hero onPricingClick={scrollToPricing} />

        {/* 1. Social Media Management & Content Hub */}
        <ContentHubSection />

        {/* 2. WhatsApp Business Messaging */}
        <WhatsAppSection />

        {/* 3. Lead Capture & Instant Forms */}
        <LeadCaptureSection />

        {/* 4. Marketing Campaigns & Predefined Goals */}
        <CampaignsSection />

        {/* 5. Multi-Business Account Management & Agency Operations */}
        <MultiBusinessSection />

        {/* 6. Comprehensive Use Cases & Value Proposition */}
        <UseCasesSection />

        {/* 7. Pricing Section ($35 with 30% discount -> $24.50, 7-day free trial no card needed, Agency custom offer) */}
        <div ref={pricingRef}>
          <PricingSection onContactClick={scrollToContact} />
        </div>

        {/* 8. Contact & Free Trial Submission Form */}
        <ContactForm ref={contactRef} />

        {/* 9. Bottom Call to Action */}
        <section className="py-28 bg-slate-950/90 text-white text-center relative overflow-hidden border-t border-white/10 backdrop-blur-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/40 via-slate-950 to-slate-950" />
          <div className="max-w-4xl mx-auto px-6 relative z-10">
            <span className="text-xs font-bold uppercase tracking-widest px-3.5 py-1 bg-indigo-500/20 text-indigo-300 rounded-full border border-indigo-400/30 mb-6 inline-block">
              Ready to elevate your operations?
            </span>
            <h2 className="text-4xl md:text-7xl font-bold mb-6 tracking-tight leading-tight text-white">
              Start your free 7-day trial today.
            </h2>
            <p className="text-lg text-white/70 mb-10 max-w-2xl mx-auto font-medium">
              Join the businesses and agencies scaling social reach, automating WhatsApp marketing, and capturing high-intent leads on Pursuit-One.
            </p>
            <a href={APP_LOGIN_URL} className="crystal-btn text-lg group inline-flex">
              <span className="flex items-center gap-2">
                Start 7-Day Free Trial — No Card Needed <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
