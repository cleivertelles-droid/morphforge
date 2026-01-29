
import React from 'react';

export const MorphLogo = ({ className = "w-11 h-11", glow = true }: { className?: string; glow?: boolean }) => (
  <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="morph-glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
      <linearGradient id="web-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00ccff" />
        <stop offset="100%" stopColor="#006699" />
      </linearGradient>
    </defs>
    
    <g filter={glow ? "url(#morph-glow)" : "none"} stroke="url(#web-gradient)" strokeWidth="1.2" fill="none">
      {/* Spider Web Radiating Lines (The "Core Network") */}
      <line x1="50" y1="50" x2="50" y2="5" />
      <line x1="50" y1="50" x2="95" y2="50" />
      <line x1="50" y1="50" x2="50" y2="95" />
      <line x1="50" y1="50" x2="5" y2="50" />
      
      <line x1="50" y1="50" x2="82" y2="18" />
      <line x1="50" y1="50" x2="82" y2="82" />
      <line x1="50" y1="50" x2="18" y2="82" />
      <line x1="50" y1="50" x2="18" y2="18" />

      {/* Hexagonal Web Layers (The "Data Structures") */}
      <path d="M50 15 L75 25 L85 50 L75 75 L50 85 L25 75 L15 50 L25 25 Z" opacity="0.8">
        <animate attributeName="opacity" values="0.8;0.4;0.8" dur="4s" repeatCount="indefinite" />
      </path>
      <path d="M50 30 L65 37 L70 50 L65 63 L50 70 L35 63 L30 50 L35 37 Z" opacity="0.6">
        <animate attributeName="opacity" values="0.6;0.3;0.6" dur="3s" repeatCount="indefinite" />
      </path>
      <path d="M50 42 L56 45 L58 50 L56 55 L50 58 L44 55 L42 50 L44 45 Z" opacity="0.4" />

      {/* Connection Nodes (The "Mod Entry Points") */}
      <circle cx="50" cy="15" r="2.5" fill="#00ccff" stroke="none">
         <animate attributeName="r" values="2.5;3.5;2.5" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="85" cy="50" r="2.5" fill="#00ccff" stroke="none" />
      <circle cx="50" cy="85" r="2.5" fill="#00ccff" stroke="none" />
      <circle cx="15" cy="50" r="2.5" fill="#00ccff" stroke="none" />
      
      <circle cx="75" cy="25" r="1.8" fill="#00ccff" stroke="none" opacity="0.6" />
      <circle cx="75" cy="75" r="1.8" fill="#00ccff" stroke="none" opacity="0.6" />
      <circle cx="25" cy="75" r="1.8" fill="#00ccff" stroke="none" opacity="0.6" />
      <circle cx="25" cy="25" r="1.8" fill="#00ccff" stroke="none" opacity="0.6" />

      {/* Central Morph Core */}
      <circle cx="50" cy="50" r="5" fill="#00ccff" stroke="none">
        <animate attributeName="opacity" values="1;0.6;1" dur="2s" repeatCount="indefinite" />
      </circle>
      
      {/* Dynamic Data Fragments */}
      <rect x="10" y="20" width="4" height="4" fill="#00ccff" opacity="0.3" stroke="none">
        <animateTransform attributeName="transform" type="translate" values="0 0; 5 -5; 0 0" dur="5s" repeatCount="indefinite" />
      </rect>
      <rect x="85" y="80" width="3" height="3" fill="#00ccff" opacity="0.4" stroke="none" />
    </g>
  </svg>
);

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-morph-blue/20">
      <header className="border-b border-white/5 bg-zinc-950/60 backdrop-blur-2xl sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <div className="relative group cursor-pointer">
              <div className="absolute inset-0 bg-morph-blue blur-3xl opacity-10 group-hover:opacity-40 transition-opacity duration-500"></div>
              <div className="relative flex items-center justify-center p-1">
                 <MorphLogo className="w-16 h-16 transform group-hover:rotate-12 transition-all duration-700 ease-in-out" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black tracking-tighter text-white">
                  MORPH<span className="text-morph-blue glow-text">FORGE</span>
                </h1>
                <div className="px-1.5 py-0.5 rounded-md bg-morph-blue/10 border border-morph-blue/20">
                   <span className="text-[10px] font-pixel text-morph-blue leading-none">AI</span>
                </div>
              </div>
              <p className="text-[10px] uppercase tracking-[0.5em] text-zinc-500 font-bold ml-0.5 mt-0.5">Neural Synthesis Network</p>
            </div>
          </div>
          
          <nav className="hidden lg:flex items-center gap-10">
            <a href="#" className="text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-morph-blue transition-all">Documentation</a>
            <a href="#" className="text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-morph-blue transition-all">Repositories</a>
            <div className="h-6 w-px bg-white/5"></div>
            <a href="https://github.com" target="_blank" className="flex items-center gap-2.5 px-5 py-2.5 bg-white/5 hover:bg-white/10 rounded-full text-zinc-300 hover:text-white transition-all border border-white/5 text-[10px] font-bold uppercase tracking-widest">
              <i className="fa-brands fa-github text-sm"></i> Neural Hub
            </a>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-[1400px] mx-auto w-full px-6 py-12">
        {children}
      </main>

      <footer className="border-t border-white/5 py-16 bg-zinc-950/80 backdrop-blur-3xl mt-12">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                 <MorphLogo className="w-10 h-10" glow={false} />
                 <h2 className="text-lg font-black text-white tracking-tighter uppercase">MorphForge</h2>
              </div>
              <p className="text-zinc-500 text-xs max-w-sm leading-relaxed">
                The ultimate neural synthesis platform for Minecraft modding. Architecting optimized modpack structures for every version and loader.
              </p>
              <div className="text-zinc-600 text-[9px] italic uppercase tracking-widest">
                Independent AI Synthesis Protocol. Not associated with Mojang AB.
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-16">
               <div className="space-y-4">
                  <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Network</h4>
                  <div className="flex flex-col gap-2 text-xs font-medium text-zinc-500">
                     <a href="#" className="hover:text-morph-blue transition-colors">Neural Core</a>
                     <a href="#" className="hover:text-morph-blue transition-colors">Modrinth Bridge</a>
                     <a href="#" className="hover:text-morph-blue transition-colors">CF API Gateway</a>
                  </div>
               </div>
               <div className="space-y-4">
                  <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Support</h4>
                  <div className="flex flex-col gap-2 text-xs font-medium text-zinc-500">
                     <a href="#" className="hover:text-morph-blue transition-colors">Discord Command</a>
                     <a href="#" className="hover:text-morph-blue transition-colors">X / Feed</a>
                     <a href="#" className="hover:text-morph-blue transition-colors">GitHub Issues</a>
                  </div>
               </div>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6">
             <p className="text-zinc-600 text-[10px] font-medium tracking-wide">© {new Date().getFullYear()} MORPHFORGE SYNTHESIZER. ALL RIGHTS RESERVED.</p>
             <div className="flex gap-4">
                <span className="text-[9px] font-pixel text-morph-blue/40 uppercase tracking-widest">Core Status: Optimal</span>
                <span className="text-[9px] font-pixel text-morph-blue/40 uppercase tracking-widest">Neural: Active</span>
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
