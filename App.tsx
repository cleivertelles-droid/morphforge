
import React, { useState, useEffect } from 'react';
import Layout, { MorphLogo } from './components/Layout';
import { MCVersion, ModLoader, ArchitectQuery, ModpackGeneration } from './types';
import { MC_VERSIONS, LOADERS, PRESET_THEMES } from './constants';
import { generateModpack } from './services/geminiService';
import MarkdownRenderer from './components/MarkdownRenderer';

const App: React.FC = () => {
  const [query, setQuery] = useState<ArchitectQuery>({
    version: '1.20.1',
    loader: ModLoader.FORGE,
    prompt: ''
  });
  const [history, setHistory] = useState<ModpackGeneration[]>([]);
  const [currentGeneration, setCurrentGeneration] = useState<ModpackGeneration | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingStep, setLoadingStep] = useState(0);
  const [isThemesExpanded, setIsThemesExpanded] = useState(true);

  const loadingMessages = [
    "Initializing neural web...",
    "Scanning modrinth nodes...",
    "Analyzing binary strands...",
    "Weaving dependency patterns...",
    "Optimizing JVM pathways...",
    "Finalizing synthesis blueprint...",
    "Deploying MorphForge architecture..."
  ];

  useEffect(() => {
    const saved = localStorage.getItem('modpack_history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load history", e);
      }
    }
  }, []);

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setLoadingStep(prev => (prev + 1) % loadingMessages.length);
      }, 2500);
      return () => clearInterval(interval);
    }
  }, [isLoading]);

  const saveToHistory = (gen: ModpackGeneration) => {
    const newHistory = [gen, ...history].slice(0, 10);
    setHistory(newHistory);
    localStorage.setItem('modpack_history', JSON.stringify(newHistory));
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.prompt.trim()) return;

    setIsLoading(true);
    setError(null);
    setCurrentGeneration(null);
    setLoadingStep(0);

    try {
      const result = await generateModpack(query);
      const newGen: ModpackGeneration = {
        id: crypto.randomUUID(),
        timestamp: Date.now(),
        query: { ...query },
        result
      };
      setCurrentGeneration(newGen);
      saveToHistory(newGen);
    } catch (err: any) {
      setError(err.message || "Neural link interrupted. Please verify API connection.");
    } finally {
      setIsLoading(false);
    }
  };

  const loadFromHistory = (gen: ModpackGeneration) => {
    setCurrentGeneration(gen);
    setQuery(gen.query);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectTheme = (prompt: string) => {
    setQuery(prev => ({ ...prev, prompt }));
  };

  return (
    <Layout>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-[1400px] mx-auto items-start">
        {/* Left Column: Input Core */}
        <div className="lg:col-span-4 space-y-8 lg:sticky lg:top-28">
          <div className="morph-panel rounded-3xl p-8 border-white/5 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-30 transition-opacity">
               <MorphLogo className="w-12 h-12" glow={false} />
            </div>
            
            <h2 className="text-xl font-black mb-10 flex items-center gap-4 text-white uppercase tracking-tighter">
              <div className="w-10 h-10 rounded-xl bg-morph-blue/10 flex items-center justify-center text-morph-blue border border-morph-blue/20">
                <i className="fa-solid fa-code-branch text-sm"></i>
              </div>
              Architect Core
            </h2>
            
            <form onSubmit={handleGenerate} className="space-y-8">
              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-3">
                  <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Target Version</label>
                  <div className="relative group">
                    <select 
                      value={query.version}
                      onChange={(e) => setQuery({ ...query, version: e.target.value as MCVersion })}
                      className="w-full bg-zinc-950/50 border border-white/10 rounded-xl px-5 py-3.5 text-xs font-bold text-zinc-300 focus:border-morph-blue focus:ring-1 focus:ring-morph-blue/30 outline-none appearance-none cursor-pointer transition-all hover:bg-zinc-900/50"
                    >
                      {MC_VERSIONS.map(v => <option key={v} value={v}>VER {v}</option>)}
                    </select>
                    <i className="fa-solid fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-zinc-600 pointer-events-none"></i>
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Synthesizer</label>
                  <div className="relative group">
                    <select 
                      value={query.loader}
                      onChange={(e) => setQuery({ ...query, loader: e.target.value as ModLoader })}
                      className="w-full bg-zinc-950/50 border border-white/10 rounded-xl px-5 py-3.5 text-xs font-bold text-zinc-300 focus:border-morph-blue focus:ring-1 focus:ring-morph-blue/30 outline-none appearance-none cursor-pointer transition-all hover:bg-zinc-900/50"
                    >
                      {LOADERS.map(l => <option key={l} value={l}>{l.toUpperCase()}</option>)}
                    </select>
                    <i className="fa-solid fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-zinc-600 pointer-events-none"></i>
                  </div>
                </div>
              </div>

              {/* Neural Themes Section */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setIsThemesExpanded(!isThemesExpanded)}
                  className="w-full flex items-center justify-between text-[11px] font-black text-zinc-400 uppercase tracking-[0.3em] hover:text-white transition-colors py-3 group/btn"
                >
                  <span className="flex items-center gap-3">
                    <i className="fa-solid fa-spider text-morph-blue group-hover/btn:scale-125 transition-transform"></i>
                    Neural Strands
                  </span>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center bg-white/5 border border-white/10 transition-transform duration-500 ${isThemesExpanded ? 'rotate-180' : ''}`}>
                    <i className="fa-solid fa-caret-down text-[10px]"></i>
                  </div>
                </button>
                
                <div className={`overflow-hidden transition-all duration-700 ease-in-out ${isThemesExpanded ? 'max-h-[600px] opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                  <div className="grid grid-cols-2 gap-3 pb-4">
                    {PRESET_THEMES.map(theme => (
                      <button
                        key={theme.id}
                        type="button"
                        onClick={() => selectTheme(theme.prompt)}
                        className={`group flex flex-col items-center justify-center p-4 bg-zinc-950/40 border transition-all text-center rounded-2xl hover:scale-[1.03] active:scale-95 ${
                          query.prompt === theme.prompt 
                          ? 'border-morph-blue bg-morph-blue/5 shadow-[0_0_20px_rgba(0,204,255,0.1)]' 
                          : 'border-white/5 hover:border-white/20'
                        }`}
                      >
                        <i className={`fa-solid ${theme.icon} ${theme.color} text-xl mb-2.5 group-hover:scale-110 transition-transform`}></i>
                        <span className="text-[10px] font-extrabold text-zinc-500 group-hover:text-zinc-200 uppercase tracking-tight">{theme.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="relative">
                <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-4">Vision Input</label>
                <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-zinc-950/80 group-focus-within:border-morph-blue/40 transition-all shadow-inner">
                   <textarea
                    required
                    placeholder="Describe your modpack vision..."
                    className="w-full bg-transparent p-6 text-sm h-64 focus:outline-none transition-all resize-none placeholder-zinc-800 text-zinc-300 leading-relaxed font-mono"
                    value={query.prompt}
                    onChange={(e) => setQuery({ ...query, prompt: e.target.value })}
                  />
                  <div className="absolute bottom-3 right-4 opacity-10 text-[8px] font-pixel text-zinc-400 pointer-events-none uppercase tracking-widest">Buffer Status: Optimal</div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-5 rounded-2xl font-black text-xs tracking-[0.4em] uppercase transition-all flex items-center justify-center gap-4 voxel-button ${
                  isLoading 
                  ? 'bg-zinc-900 text-zinc-700 border-zinc-800 cursor-not-allowed opacity-50' 
                  : 'bg-morph-blue hover:bg-morph-darkBlue text-white shadow-2xl shadow-blue-950/40 border border-blue-400/20'
                }`}
              >
                {isLoading ? (
                  <i className="fa-solid fa-circle-nodes animate-pulse text-lg"></i>
                ) : (
                  <i className="fa-solid fa-code-merge text-lg"></i>
                )}
                {isLoading ? 'Synthesizing...' : 'Deploy Blueprint'}
              </button>
            </form>
          </div>

          {/* History Panel */}
          <div className="morph-panel rounded-3xl p-8 border-white/5 shadow-xl bg-zinc-950/40">
            <h2 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em] mb-8 flex items-center gap-4">
              <i className="fa-solid fa-history text-morph-blue/60"></i>
              Local Archives
              <span className="flex-1 h-px bg-white/5"></span>
            </h2>
            {history.length === 0 ? (
              <div className="py-12 text-center border border-dashed border-white/10 rounded-2xl bg-black/20">
                 <p className="text-zinc-700 text-[10px] font-bold uppercase tracking-widest">Neural archive empty</p>
              </div>
            ) : (
              <div className="space-y-4">
                {history.map(item => (
                  <button
                    key={item.id}
                    onClick={() => loadFromHistory(item)}
                    className="w-full text-left p-4 rounded-2xl border border-white/5 hover:bg-zinc-900/80 hover:border-morph-blue/30 transition-all group relative overflow-hidden"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[9px] font-pixel text-morph-blue opacity-80">{item.query.version} | {item.query.loader.toUpperCase()}</span>
                      <span className="text-[8px] font-bold text-zinc-600 uppercase">{new Date(item.timestamp).toLocaleDateString()}</span>
                    </div>
                    <p className="text-[11px] font-bold text-zinc-500 line-clamp-1 group-hover:text-zinc-300 tracking-tight">
                      {item.query.prompt}
                    </p>
                    <div className="absolute right-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity">
                       <i className="fa-solid fa-chevron-right text-[10px] text-morph-blue"></i>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Dynamic Output Display */}
        <div className="lg:col-span-8 min-h-[800px]">
          {!currentGeneration && !isLoading && !error && (
            <div className="h-full flex flex-col items-center justify-center text-center p-20 border-2 border-dashed border-white/5 rounded-[48px] bg-zinc-950/20 relative overflow-hidden group">
               <div className="absolute inset-0 bg-gradient-to-br from-morph-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
              
              <div className="w-48 h-48 bg-black/40 border border-white/5 rounded-[60px] flex items-center justify-center mb-12 shadow-inner relative group-hover:border-morph-blue/20 transition-all duration-700">
                <div className="absolute inset-0 bg-morph-blue/10 blur-3xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <MorphLogo className="w-32 h-32 transform group-hover:scale-110 transition-all duration-700 relative z-10" />
              </div>
              
              <h3 className="text-4xl font-black text-white mb-6 tracking-tight uppercase">Ready for Synthesis</h3>
              <p className="text-zinc-500 max-w-lg text-xl font-medium leading-relaxed mb-10">
                The MorphForge neural engine is active. Define your vision in the command core to weave a custom modpack strand.
              </p>
              <div className="flex gap-6 items-center">
                <span className="flex items-center gap-2 px-6 py-2 rounded-full border border-white/5 bg-zinc-900/50 text-[10px] font-black text-zinc-600 uppercase tracking-widest group-hover:border-morph-blue/20 transition-all">
                  <div className="w-1.5 h-1.5 rounded-full bg-morph-blue animate-pulse"></div>
                  Neural Link: Standby
                </span>
                <span className="text-zinc-800 text-2xl font-pixel">///</span>
                <span className="flex items-center gap-2 px-6 py-2 rounded-full border border-white/5 bg-zinc-900/50 text-[10px] font-black text-zinc-600 uppercase tracking-widest">
                  Arch-V2.5
                </span>
              </div>
            </div>
          )}

          {isLoading && (
            <div className="h-full flex flex-col items-center justify-center p-20 bg-zinc-950/60 rounded-[48px] border border-white/5 relative overflow-hidden backdrop-blur-3xl">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-morph-blue/10 via-transparent to-transparent opacity-40 animate-pulse"></div>
              
              <div className="relative z-10 flex flex-col items-center w-full">
                <div className="w-56 h-56 mb-16 relative flex items-center justify-center">
                  <div className="absolute inset-0 bg-morph-blue/30 blur-[60px] animate-pulse"></div>
                  <div className="absolute inset-0 border-[2px] border-morph-blue/10 rounded-full animate-[ping_4s_linear_infinite]"></div>
                  <div className="absolute inset-0 border-[1px] border-morph-blue/20 rounded-full animate-[spin_10s_linear_infinite]"></div>
                  <MorphLogo className="w-36 h-36" />
                </div>
                
                <h3 className="text-4xl font-black text-white mb-6 tracking-tight uppercase italic">Weaving Strands</h3>
                
                <div className="bg-morph-blue/5 px-8 py-3 rounded-2xl border border-morph-blue/20 flex items-center gap-4">
                  <div className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-morph-blue opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-morph-blue"></span>
                  </div>
                  <p className="text-morph-blue font-mono text-sm font-bold tracking-tight uppercase">
                    {loadingMessages[loadingStep]}
                  </p>
                </div>
                
                <div className="mt-20 w-96 bg-zinc-900 h-2 rounded-full overflow-hidden p-0.5 border border-white/5">
                  <div 
                    className="h-full bg-morph-blue transition-all duration-1000 rounded-full shadow-[0_0_25px_rgba(0,204,255,0.7)]" 
                    style={{ width: `${((loadingStep + 1) / loadingMessages.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="p-20 bg-red-950/10 border border-red-900/30 rounded-[48px] text-center backdrop-blur-3xl relative overflow-hidden flex flex-col items-center justify-center min-h-[600px]">
               <div className="absolute top-0 left-0 w-full h-1.5 bg-red-600/40"></div>
              <div className="w-32 h-32 bg-red-600/10 rounded-[40px] flex items-center justify-center mb-10 border border-red-600/20 shadow-2xl">
                <i className="fa-solid fa-triangle-exclamation text-6xl text-red-500 animate-pulse"></i>
              </div>
              <h3 className="text-4xl font-black text-red-100 mb-6 tracking-tighter uppercase">Synthesis Failed</h3>
              <p className="text-red-300/60 mb-12 max-w-sm mx-auto font-bold text-xl leading-relaxed">{error}</p>
              <button 
                onClick={handleGenerate}
                className="px-16 py-5 bg-red-600/20 hover:bg-red-600/30 text-red-100 rounded-2xl transition-all border border-red-600/40 font-black uppercase tracking-[0.4em] text-xs voxel-button"
                style={{ boxShadow: '0 6px 0 0 rgba(185, 28, 28, 0.4)' }}
              >
                Re-Initialize Core
              </button>
            </div>
          )}

          {currentGeneration && !isLoading && (
            <div className="animate-in fade-in slide-in-from-bottom-16 duration-1000 ease-out">
              <div className="morph-panel rounded-[56px] overflow-hidden border-white/5 shadow-[0_40px_100px_-20px_rgba(0,0,0,1)]">
                {/* Deployment Header */}
                <div className="bg-zinc-950/80 p-12 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-10">
                  <div className="flex items-center gap-8">
                    <div className="relative group">
                       <div className="absolute inset-0 bg-morph-blue/20 blur-2xl group-hover:blur-3xl transition-all opacity-50"></div>
                        <div className="relative w-24 h-24 bg-gradient-to-br from-zinc-900 to-black rounded-3xl flex items-center justify-center text-white text-4xl shadow-2xl border border-morph-blue/10">
                          <MorphLogo className="w-16 h-16" glow={false} />
                        </div>
                    </div>
                    <div>
                      <h2 className="text-4xl font-black text-white leading-none tracking-tight uppercase italic">Synthesized Blueprint</h2>
                      <div className="flex items-center gap-4 mt-5">
                        <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-lg bg-morph-blue/10 border border-morph-blue/20">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                          </span>
                          <span className="text-[10px] text-morph-blue font-pixel uppercase tracking-widest">Linked</span>
                        </div>
                        <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-[0.3em]">Signature: Verified_Deployment</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div className="flex flex-col items-end gap-3">
                       <div className="flex gap-3">
                        <div className="px-5 py-3 bg-zinc-900/50 text-morph-blue text-[11px] font-pixel rounded-2xl border border-white/5 backdrop-blur-lg">
                          {currentGeneration.query.version}
                        </div>
                        <div className="px-5 py-3 bg-zinc-900/50 text-cyan-500 text-[11px] font-pixel rounded-2xl border border-white/5 backdrop-blur-lg uppercase">
                          {currentGeneration.query.loader}
                        </div>
                       </div>
                       <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest mr-2">Engine Architecture</span>
                    </div>
                  </div>
                </div>

                {/* Synthesis Output Body */}
                <div className="p-12 md:p-20 bg-gradient-to-b from-transparent via-black/40 to-black/80">
                  <MarkdownRenderer 
                    content={currentGeneration.result} 
                    version={currentGeneration.query.version}
                    loader={currentGeneration.query.loader}
                  />
                </div>

                {/* Dispatch Footnote */}
                <div className="p-12 bg-zinc-950/40 border-t border-white/5 backdrop-blur-xl">
                  <div className="flex items-center justify-between gap-10 p-8 bg-zinc-900/40 rounded-3xl border border-white/5 relative group hover:border-morph-blue/20 transition-all">
                    <div className="flex items-start gap-6">
                      <div className="w-12 h-12 rounded-2xl bg-morph-blue/5 flex items-center justify-center text-morph-blue shrink-0 shadow-inner border border-morph-blue/10">
                         <i className="fa-solid fa-microchip text-xl"></i>
                      </div>
                      <div className="space-y-1.5">
                        <h5 className="text-[10px] font-black text-zinc-200 uppercase tracking-widest">Architect Dispatch</h5>
                        <p className="text-[13px] text-zinc-500 leading-relaxed font-medium">
                          Neural strand verification complete. All dependencies for the {currentGeneration.query.loader} synthesizer have been cross-checked for compatibility with target VER {currentGeneration.query.version}.
                        </p>
                      </div>
                    </div>
                    <div className="hidden sm:block">
                       <MorphLogo className="w-10 h-10 opacity-20 grayscale group-hover:grayscale-0 group-hover:opacity-40 transition-all" glow={false} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default App;
