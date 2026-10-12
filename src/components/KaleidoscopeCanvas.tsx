import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { 
  Sparkles, 
  ChevronUp, 
  ChevronDown, 
  Maximize2, 
  Minimize2, 
  RotateCw,
  Compass
} from 'lucide-react';

export interface KaleidoscopePalette {
  name: string;
  sectionId: string;
  subtitle: string;
  primary: THREE.Color;
  secondary: THREE.Color;
  accent: THREE.Color;
  highlight: THREE.Color;
  primaryHex: string;
  secondaryHex: string;
  accentHex: string;
  highlightHex: string;
  bgGlow: string;
}

// 6 Apple iPhone inspired gemstone palettes aligned with Pursuit-One's identity
export const PALETTES: KaleidoscopePalette[] = [
  {
    name: 'Prismatic Sapphire',
    sectionId: 'hero',
    subtitle: 'Hero // Social Media Powerhouse',
    primary: new THREE.Color('#3b82f6'),
    secondary: new THREE.Color('#4f46e5'),
    accent: new THREE.Color('#8b5cf6'),
    highlight: new THREE.Color('#ec4899'),
    primaryHex: '#3b82f6',
    secondaryHex: '#4f46e5',
    accentHex: '#8b5cf6',
    highlightHex: '#ec4899',
    bgGlow: 'rgba(59, 130, 246, 0.12)'
  },
  {
    name: 'Electric Cyan & Lapis',
    sectionId: 'content-hub',
    subtitle: 'Phase 01 // Content Hub & Social Posting',
    primary: new THREE.Color('#06b6d4'),
    secondary: new THREE.Color('#0284c7'),
    accent: new THREE.Color('#38bdf8'),
    highlight: new THREE.Color('#6366f1'),
    primaryHex: '#06b6d4',
    secondaryHex: '#0284c7',
    accentHex: '#38bdf8',
    highlightHex: '#6366f1',
    bgGlow: 'rgba(6, 182, 212, 0.12)'
  },
  {
    name: 'Rose Quartz & Fuchsia',
    sectionId: 'whatsapp',
    subtitle: 'Phase 02 // WhatsApp Business Messaging',
    primary: new THREE.Color('#ec4899'),
    secondary: new THREE.Color('#c026d3'),
    accent: new THREE.Color('#9333ea'),
    highlight: new THREE.Color('#f43f5e'),
    primaryHex: '#ec4899',
    secondaryHex: '#c026d3',
    accentHex: '#9333ea',
    highlightHex: '#f43f5e',
    bgGlow: 'rgba(236, 72, 153, 0.12)'
  },
  {
    name: 'Emerald Jade & Mint',
    sectionId: 'lead-capture',
    subtitle: 'Phase 03 // Lead Capture & Instant Forms',
    primary: new THREE.Color('#10b981'),
    secondary: new THREE.Color('#059669'),
    accent: new THREE.Color('#14b8a6'),
    highlight: new THREE.Color('#3b82f6'),
    primaryHex: '#10b981',
    secondaryHex: '#059669',
    accentHex: '#14b8a6',
    highlightHex: '#3b82f6',
    bgGlow: 'rgba(16, 185, 129, 0.12)'
  },
  {
    name: 'Sunset Topaz & Amber',
    sectionId: 'campaigns',
    subtitle: 'Phase 04 // Marketing Campaigns & Goals',
    primary: new THREE.Color('#f59e0b'),
    secondary: new THREE.Color('#f43f5e'),
    accent: new THREE.Color('#8b5cf6'),
    highlight: new THREE.Color('#ec4899'),
    primaryHex: '#f59e0b',
    secondaryHex: '#f43f5e',
    accentHex: '#8b5cf6',
    highlightHex: '#ec4899',
    bgGlow: 'rgba(245, 158, 11, 0.12)'
  },
  {
    name: 'Cosmic Diamond Spectrum',
    sectionId: 'pricing',
    subtitle: 'Phase 05 // Starter & Agency Pricing',
    primary: new THREE.Color('#6366f1'),
    secondary: new THREE.Color('#ec4899'),
    accent: new THREE.Color('#06b6d4'),
    highlight: new THREE.Color('#a855f7'),
    primaryHex: '#6366f1',
    secondaryHex: '#ec4899',
    accentHex: '#06b6d4',
    highlightHex: '#a855f7',
    bgGlow: 'rgba(99, 102, 241, 0.14)'
  }
];

// Vertex Shader
const KALEIDOSCOPE_VERTEX_SHADER = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`;

// Optical Gemstone Kaleidoscope Fragment Shader
const KALEIDOSCOPE_FRAGMENT_SHADER = `
precision highp float;

uniform vec2 u_resolution;
uniform float u_rotation;       // Only rotates when user scrolls (CW on down, CCW on up)
uniform float u_scroll;
uniform vec2 u_mouse;
uniform float u_symmetry;
uniform int u_style;            // 0: Gemstones, 1: Diamond Facets, 2: Crystal Rosette, 3: Stained Glass
uniform vec3 u_colorA;
uniform vec3 u_colorB;
uniform vec3 u_colorC;
uniform vec3 u_colorD;
uniform float u_vibrancy;
uniform float u_centerOffset;   // Moves smoothly left to right / right to left
uniform float u_scale;          // Makes kaleidoscope image smaller & compact

varying vec2 vUv;

#define PI 3.14159265358979323846
#define TWO_PI 6.28318530717958647692

// Rotation matrix
mat2 rot(float a) {
  float c = cos(a);
  float s = sin(a);
  return mat2(c, -s, s, c);
}

// Dihedral Symmetry Folding (D_n group)
vec2 foldKaleidoscope(vec2 p, float segments, float rotAngle) {
  float r = length(p);
  float angle = atan(p.y, p.x);
  
  // Apply scroll-driven rotation ONLY
  angle += rotAngle;
  
  // Sector division
  float sector = TWO_PI / segments;
  angle = mod(angle, sector);
  
  // Optical mirror fold
  if (angle > sector * 0.5) {
    angle = sector - angle;
  }
  
  return vec2(cos(angle), sin(angle)) * r;
}

// Formed from colorful gemstone crystals & brilliant cut stones
vec4 generateGemstonePattern(vec2 p, float scaleOffset) {
  p *= scaleOffset;
  float r = length(p);
  
  // 1. Brilliant-Cut Gemstone Lattice (Diamond & Hexagonal Facets)
  vec2 gemGrid1 = rot(0.5235) * p * 6.8;
  vec2 f1 = abs(fract(gemGrid1) - 0.5);
  // Hexagonal facet boundary
  float hexFacet = max(f1.x * 0.866 + f1.y * 0.5, f1.y);
  float hexBevel = smoothstep(0.48, 0.32, hexFacet);
  float hexRidge = smoothstep(0.45, 0.49, hexFacet) * smoothstep(0.53, 0.49, hexFacet);

  // 2. Secondary Diamond Gemstone Lattice
  vec2 gemGrid2 = rot(-0.35) * p * 9.5;
  vec2 f2 = abs(fract(gemGrid2) - 0.5);
  float diamondFacet = f2.x + f2.y;
  float diamondBevel = smoothstep(0.5, 0.3, diamondFacet);
  float diamondRidge = smoothstep(0.46, 0.50, diamondFacet) * smoothstep(0.54, 0.50, diamondFacet);

  // 3. Polished Gemstone Rosette Rings (Tiered stone rings like a jeweler's crown)
  float gemRing1 = sin(r * 16.0);
  float gemRing2 = cos(r * 26.0);
  float gemRing3 = sin(r * 38.0);
  float ringTexture = (gemRing1 * 0.5 + gemRing2 * 0.35 + gemRing3 * 0.15);

  // 4. Polished Round Gem Nodules
  float gemNoduleA = smoothstep(0.7, 0.2, length(p - vec2(0.22, 0.08)));
  float gemNoduleB = smoothstep(0.9, 0.3, length(p - vec2(0.50, 0.16)));
  float gemNoduleC = smoothstep(1.2, 0.45, length(p - vec2(0.82, 0.24)));

  // Combine gemstone bodies
  float stoneBody = gemNoduleA * 0.7 + gemNoduleB * 0.6 + gemNoduleC * 0.45;
  stoneBody += hexBevel * 0.5 + diamondBevel * 0.4 + ringTexture * 0.2;

  // Crystalline specular reflection gleams
  float stoneLuster = (hexRidge + diamondRidge * 1.2) * 1.8;

  // Brilliant center core diamond
  float centerGem = exp(-r * 7.5) * 2.8;

  // Soft circular vignette bounding the smaller kaleidoscope image
  // Keeps written contents on the page completely readable
  float boundaryFade = smoothstep(1.35, 0.45, r);

  return vec4(stoneBody, stoneLuster, centerGem, boundaryFade);
}

void main() {
  // Normalize screen coordinates (-1 to 1)
  vec2 p = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);

  // Gentle mouse parallax tilt
  p += u_mouse * 0.035;

  // Dynamic horizontal movement: smoothly slides left-to-right and right-to-left as user scrolls
  p.x -= u_centerOffset;

  // Make the kaleidoscope animated image smaller as requested
  p /= u_scale;

  // Scroll-driven rotation angle (Clockwise when scrolling down, Anticlockwise when scrolling up, NO rotation when idle)
  float rotAngle = u_rotation;

  // Chromatic dispersion through faceted gemstones (dispersion index for RGB)
  vec2 foldedR = foldKaleidoscope(p, u_symmetry, rotAngle - 0.005);
  vec2 foldedG = foldKaleidoscope(p, u_symmetry, rotAngle);
  vec2 foldedB = foldKaleidoscope(p, u_symmetry, rotAngle + 0.005);

  vec4 sampR = generateGemstonePattern(foldedR, 0.993);
  vec4 sampG = generateGemstonePattern(foldedG, 1.000);
  vec4 sampB = generateGemstonePattern(foldedB, 1.007);

  float dist = length(p);

  // Multi-tier color mixing with active gemstone palette
  float t1 = clamp(sampG.x * 1.15, 0.0, 1.0);
  float t2 = clamp(sin(dist * 6.0) * 0.5 + 0.5, 0.0, 1.0);
  
  vec3 colBase = mix(u_colorA, u_colorB, t1);
  colBase = mix(colBase, u_colorC, t2 * 0.6);
  colBase = mix(colBase, u_colorD, sampG.y * 0.5);

  // Apply chromatic dispersion to RGB channels for authentic gemstone light split
  vec3 finalColor = vec3(
    colBase.r * (0.85 + sampR.x * 0.45) + sampR.y * 0.35,
    colBase.g * (0.85 + sampG.x * 0.45) + sampG.y * 0.35,
    colBase.b * (0.85 + sampB.x * 0.45) + sampB.y * 0.35
  );

  // Radiant central diamond core
  vec3 diamondCore = vec3(1.0, 0.96, 0.98) * (sampG.z * 1.35);
  finalColor += diamondCore;

  // Specular facet gleam lines
  float stoneGleam = sampG.y * 0.75;
  finalColor += vec3(0.95, 0.98, 1.0) * stoneGleam;

  // Boundary feathering to make it a compact, elegant floating rosette
  float vignette = sampG.w;
  finalColor *= vignette;

  // Vibrancy and lightness tuning
  finalColor = mix(finalColor, finalColor * finalColor * 1.25, 0.25);
  
  // Alpha transparency: keeps written content easily readable
  // Softer alpha prevents washing out text and cards
  float alpha = clamp((sampG.x * 0.55 + sampG.y * 0.4 + sampG.z * 0.8) * vignette * u_vibrancy, 0.0, 0.72);

  gl_FragColor = vec4(finalColor, alpha);
}
`;

interface KaleidoscopeCanvasProps {
  onPaletteChange?: (palette: KaleidoscopePalette) => void;
  interactive?: boolean;
}

export const KaleidoscopeCanvas: React.FC<KaleidoscopeCanvasProps> = ({ 
  onPaletteChange,
  interactive = true 
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activePaletteIndex, setActivePaletteIndex] = useState(0);
  const [expandedHUD, setExpandedHUD] = useState(false);
  const [symmetrySlices, setSymmetrySlices] = useState(12);
  const [vibrancy, setVibrancy] = useState<number>(0.75);
  const [isFullscreenPreview, setIsFullscreenPreview] = useState(false);

  // Animation and state tracking
  const stateRef = useRef({
    // Scroll progress & position
    scrollProgress: 0,
    targetScroll: 0,
    lastScrollY: 0,
    // Scroll-driven rotation (clockwise on scroll down, anticlockwise on scroll up, zero when idle)
    scrollRotation: 0,
    targetRotation: 0,
    rotationVelocity: 0,
    isScrolling: false,
    scrollTimeoutId: 0 as any,
    // Horizontal center offset (smoothly sways left to right and right to left)
    currentOffset: 0.28,
    targetOffset: 0.28,
    // Mouse
    mouseX: 0,
    mouseY: 0,
    targetMouseX: 0,
    targetMouseY: 0,
    paletteIndex: 0,
    symmetry: 12,
    vibrancy: 0.75,
    activeColorA: new THREE.Color('#3b82f6'),
    activeColorB: new THREE.Color('#4f46e5'),
    activeColorC: new THREE.Color('#8b5cf6'),
    activeColorD: new THREE.Color('#ec4899'),
  });

  const scrollToPaletteSection = (index: number) => {
    const pal = PALETTES[index];
    if (!pal) return;
    const targetElement = document.getElementById(pal.sectionId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    } else {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const targetPos = (index / (PALETTES.length - 1)) * totalScroll;
      window.scrollTo({ top: targetPos, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    stateRef.current.symmetry = symmetrySlices;
    stateRef.current.vibrancy = vibrancy;
  }, [symmetrySlices, vibrancy]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // --- Scene & Camera ---
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Initial scroll position
    stateRef.current.lastScrollY = window.scrollY;

    // --- Uniforms ---
    const uniforms = {
      u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      u_rotation: { value: 0.0 }, // Directly controlled by scroll delta
      u_scroll: { value: 0.0 },
      u_mouse: { value: new THREE.Vector2(0, 0) },
      u_symmetry: { value: symmetrySlices },
      u_style: { value: 0 },
      u_colorA: { value: new THREE.Color('#3b82f6') },
      u_colorB: { value: new THREE.Color('#4f46e5') },
      u_colorC: { value: new THREE.Color('#8b5cf6') },
      u_colorD: { value: new THREE.Color('#ec4899') },
      u_vibrancy: { value: vibrancy },
      u_centerOffset: { value: 0.28 },
      u_scale: { value: 0.65 } // Smaller, compact size
    };

    const quadGeometry = new THREE.PlaneGeometry(2, 2);
    const quadMaterial = new THREE.ShaderMaterial({
      vertexShader: KALEIDOSCOPE_VERTEX_SHADER,
      fragmentShader: KALEIDOSCOPE_FRAGMENT_SHADER,
      uniforms: uniforms,
      transparent: true,
      depthWrite: false,
      depthTest: false
    });

    const quadMesh = new THREE.Mesh(quadGeometry, quadMaterial);
    scene.add(quadMesh);

    // --- Scroll Event Listener ---
    // Specifically tracks scroll direction:
    // Scrolling down -> deltaY > 0 -> targetRotation increases (clockwise)
    // Scrolling up   -> deltaY < 0 -> targetRotation decreases (anticlockwise)
    // Idle           -> rotation stops smoothly
    const handleScroll = () => {
      const currentY = window.scrollY;
      const deltaY = currentY - stateRef.current.lastScrollY;
      stateRef.current.lastScrollY = currentY;

      // Update total scroll percentage (0 to 1)
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalScroll > 0 ? Math.max(0, Math.min(1, currentY / totalScroll)) : 0;
      stateRef.current.targetScroll = progress;

      // Rotate clockwise on scroll down (deltaY > 0), anticlockwise on scroll up (deltaY < 0)
      if (Math.abs(deltaY) > 0.1) {
        stateRef.current.targetRotation += deltaY * 0.0038;
        stateRef.current.rotationVelocity = deltaY * 0.0038;
        stateRef.current.isScrolling = true;

        clearTimeout(stateRef.current.scrollTimeoutId);
        stateRef.current.scrollTimeoutId = setTimeout(() => {
          stateRef.current.isScrolling = false;
        }, 120);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      stateRef.current.targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
      stateRef.current.targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      uniforms.u_resolution.value.set(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize);

    handleScroll();

    let animationFrameId: number;

    // --- Render Loop ---
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Smooth scroll lerp
      stateRef.current.scrollProgress += (stateRef.current.targetScroll - stateRef.current.scrollProgress) * 0.08;
      const sp = stateRef.current.scrollProgress;
      uniforms.u_scroll.value = sp;

      // Smooth rotation damping:
      // Rotates smoothly to targetRotation. When user stops scrolling, rotation comes to a smooth halt!
      stateRef.current.scrollRotation += (stateRef.current.targetRotation - stateRef.current.scrollRotation) * 0.12;
      uniforms.u_rotation.value = stateRef.current.scrollRotation;

      // Smooth left-to-right and right-to-left swaying motion as user scrolls:
      // Oscillates smoothly between -0.32 and +0.32 across the page sections
      const isMobile = window.innerWidth < 1024;
      let targetOffsetX = 0;
      if (!isMobile) {
        // Cosine wave: at sp=0 (hero) shifted right (~ +0.30)
        // Then swings left (~ -0.30), right, left, and settles centered at the bottom
        targetOffsetX = Math.cos(sp * Math.PI * 4.0) * 0.32;
        if (sp > 0.88) {
          // Softly center at pricing and footer
          const taper = (1.0 - sp) / 0.12;
          targetOffsetX *= Math.max(0, taper);
        }
      } else {
        // Subtle offset on mobile screens
        targetOffsetX = Math.cos(sp * Math.PI * 3.0) * 0.10;
      }

      stateRef.current.currentOffset += (targetOffsetX - stateRef.current.currentOffset) * 0.06;
      uniforms.u_centerOffset.value = stateRef.current.currentOffset;

      // Mouse lerp
      stateRef.current.mouseX += (stateRef.current.targetMouseX - stateRef.current.mouseX) * 0.05;
      stateRef.current.mouseY += (stateRef.current.targetMouseY - stateRef.current.mouseY) * 0.05;
      uniforms.u_mouse.value.set(stateRef.current.mouseX, stateRef.current.mouseY);

      // Palette interpolation based on scroll
      const totalPalettes = PALETTES.length;
      const scaledProgress = sp * (totalPalettes - 1);
      const currentIndex = Math.min(Math.floor(scaledProgress), totalPalettes - 2);
      const fraction = scaledProgress - currentIndex;

      const palA = PALETTES[currentIndex];
      const palB = PALETTES[currentIndex + 1];

      stateRef.current.activeColorA.copy(palA.primary).lerp(palB.primary, fraction);
      stateRef.current.activeColorB.copy(palA.secondary).lerp(palB.secondary, fraction);
      stateRef.current.activeColorC.copy(palA.accent).lerp(palB.accent, fraction);
      stateRef.current.activeColorD.copy(palA.highlight).lerp(palB.highlight, fraction);

      uniforms.u_colorA.value.copy(stateRef.current.activeColorA);
      uniforms.u_colorB.value.copy(stateRef.current.activeColorB);
      uniforms.u_colorC.value.copy(stateRef.current.activeColorC);
      uniforms.u_colorD.value.copy(stateRef.current.activeColorD);

      uniforms.u_symmetry.value = stateRef.current.symmetry;
      uniforms.u_vibrancy.value = stateRef.current.vibrancy;

      const roundedPaletteIdx = Math.min(Math.round(scaledProgress), totalPalettes - 1);
      if (stateRef.current.paletteIndex !== roundedPaletteIdx) {
        stateRef.current.paletteIndex = roundedPaletteIdx;
        setActivePaletteIndex(roundedPaletteIdx);
        if (onPaletteChange) {
          onPaletteChange(PALETTES[roundedPaletteIdx]);
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      quadGeometry.dispose();
      quadMaterial.dispose();
      renderer.dispose();

      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  const currentPalette = PALETTES[activePaletteIndex] || PALETTES[0];

  return (
    <>
      {/* Real Optical Gemstone Kaleidoscope Canvas (Smooth Scroll-Driven Rotation & Sway) */}
      <div 
        ref={mountRef} 
        className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-1000"
        aria-hidden="true"
      />

      {/* Gentle Ambient Background Glow */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 transition-all duration-1000 opacity-60"
        style={{
          background: `radial-gradient(circle at 65% 35%, ${currentPalette.bgGlow} 0%, transparent 65%)`
        }}
        aria-hidden="true"
      />

      {/* Fullscreen Wallpaper Preview Modal */}
      {isFullscreenPreview && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="bg-white/95 backdrop-blur-2xl border border-slate-200/90 rounded-3xl p-6 shadow-2xl max-w-md w-full relative">
            <button 
              onClick={() => setIsFullscreenPreview(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              title="Close Preview"
            >
              <Minimize2 size={18} />
            </button>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="text-indigo-600" size={20} />
              <h3 className="text-lg font-bold text-slate-900">Gemstone Kaleidoscope</h3>
            </div>
            <p className="text-sm text-slate-600 mb-4 leading-relaxed font-medium">
              Patterns formed from colorful gemstones (sapphire, ruby, emerald, diamond). Rotates clockwise when scrolling down, anticlockwise when scrolling up, and smoothly stays still when idle.
            </p>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs space-y-2 mb-4">
              <div className="flex justify-between font-semibold">
                <span className="text-slate-500">Active Phase:</span>
                <span className="text-indigo-600">{currentPalette.name}</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span className="text-slate-500">Rotation Mode:</span>
                <span className="text-slate-800">Scroll-Locked (CW down / CCW up)</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span className="text-slate-500">Sway Motion:</span>
                <span className="text-slate-800">Left-to-Right Smooth Gliding</span>
              </div>
            </div>
            <button
              onClick={() => setIsFullscreenPreview(false)}
              className="w-full py-3 bg-slate-900 hover:bg-black text-white font-semibold text-sm rounded-xl transition-all shadow-md"
            >
              Continue Exploring Website
            </button>
          </div>
        </div>
      )}

      {/* Floating HUD Controls */}
      {interactive && (
        <aside 
          aria-label="Kaleidoscope Controls"
          className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2"
        >
          {/* Expanded Settings Card */}
          {expandedHUD && (
            <div className="bg-white/95 backdrop-blur-2xl border border-slate-200 shadow-2xl rounded-3xl p-5 mb-2 w-80 max-w-[calc(100vw-3rem)] animate-in fade-in slide-in-from-bottom-3 duration-300">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                <div className="flex items-center gap-2">
                  <Sparkles size={16} className="text-indigo-600" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-900">
                    Gemstone Kaleidoscope
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button 
                    onClick={() => setIsFullscreenPreview(true)}
                    className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                    title="Fullscreen Wallpaper View"
                  >
                    <Maximize2 size={13} />
                  </button>
                  <span className="text-[10px] font-semibold text-indigo-700 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-full">
                    Scroll-Driven
                  </span>
                </div>
              </div>

              {/* Behavior Notes */}
              <div className="mb-4 p-3 bg-indigo-50/70 border border-indigo-100 rounded-xl text-[11px] text-slate-600 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-indigo-800">
                  <RotateCw size={12} />
                  <span>Scroll-Sync Dynamics</span>
                </div>
                <p>• Scrolls down: rotates clockwise</p>
                <p>• Scrolls up: rotates anticlockwise</p>
                <p>• Idle: halts smoothly</p>
                <p>• Sways left-to-right as you navigate</p>
              </div>

              {/* Symmetry Slices */}
              <div className="mb-4">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  Symmetry Mirrors
                </span>
                <div className="flex gap-1.5">
                  {[8, 12, 16, 24].map((slices) => (
                    <button
                      key={slices}
                      onClick={() => setSymmetrySlices(slices)}
                      className={`flex-1 py-1.5 text-[11px] font-bold rounded-lg transition-all ${
                        symmetrySlices === slices
                          ? 'bg-slate-900 text-white shadow-sm'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-100'
                      }`}
                    >
                      {slices}x
                    </button>
                  ))}
                </div>
              </div>

              {/* Chromatic Phases */}
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  Gemstone Color Phases
                </span>
                <div className="space-y-1.5 max-h-44 overflow-y-auto pr-1">
                  {PALETTES.map((pal, idx) => {
                    const isActive = idx === activePaletteIndex;
                    return (
                      <button
                        key={pal.name}
                        onClick={() => scrollToPaletteSection(idx)}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-all ${
                          isActive 
                            ? 'bg-slate-900 text-white shadow-md' 
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span 
                            className="w-2.5 h-2.5 rounded-full shrink-0 shadow-xs"
                            style={{ backgroundColor: pal.primaryHex }}
                          />
                          <span className="truncate">{pal.name}</span>
                        </div>
                        <div className="flex items-center gap-1 shrink-0 ml-2">
                          <span className="w-1.5 h-3.5 rounded-full" style={{ backgroundColor: pal.primaryHex }} />
                          <span className="w-1.5 h-3.5 rounded-full" style={{ backgroundColor: pal.secondaryHex }} />
                          <span className="w-1.5 h-3.5 rounded-full" style={{ backgroundColor: pal.accentHex }} />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Collapsed Pill HUD */}
          <div 
            onClick={() => setExpandedHUD(!expandedHUD)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setExpandedHUD(!expandedHUD); }}
            className="flex items-center gap-3 bg-white/90 hover:bg-white backdrop-blur-xl border border-slate-200/90 rounded-full px-4 py-2.5 shadow-xl shadow-slate-900/10 cursor-pointer transition-all duration-300 hover:shadow-2xl group select-none"
          >
            {/* Pulsing jewel indicator */}
            <div className="relative flex items-center justify-center">
              <span 
                className="w-3.5 h-3.5 rounded-full animate-ping absolute opacity-60"
                style={{ backgroundColor: currentPalette.primaryHex }}
              />
              <span 
                className="w-3.5 h-3.5 rounded-full relative transition-colors duration-500 shadow-sm"
                style={{ backgroundColor: currentPalette.primaryHex }}
              />
            </div>

            {/* Label */}
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold tracking-widest uppercase text-slate-400">
                  Gemstone Optics
                </span>
                <span className="text-[9px] px-1.5 py-0.2 rounded-full font-bold bg-indigo-50 text-indigo-600 border border-indigo-100">
                  Scroll-Sync
                </span>
              </div>
              <span className="text-xs font-bold tracking-tight text-slate-900 flex items-center gap-1">
                {currentPalette.name}
              </span>
            </div>

            {/* Gemstone Mini Bars */}
            <div className="flex items-center gap-1 pl-2 border-l border-slate-200">
              <div 
                className="w-2 h-5 rounded-full transition-colors duration-500 shadow-xs" 
                style={{ backgroundColor: currentPalette.primaryHex }} 
              />
              <div 
                className="w-2 h-5 rounded-full transition-colors duration-500 shadow-xs" 
                style={{ backgroundColor: currentPalette.secondaryHex }} 
              />
              <div 
                className="w-2 h-5 rounded-full transition-colors duration-500 shadow-xs" 
                style={{ backgroundColor: currentPalette.accentHex }} 
              />
            </div>

            <div className="text-slate-400 group-hover:text-slate-600 transition-colors pl-1">
              {expandedHUD ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
            </div>
          </div>
        </aside>
      )}
    </>
  );
};

export default KaleidoscopeCanvas;
