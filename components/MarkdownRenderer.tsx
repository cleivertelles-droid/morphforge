
import React from 'react';
import RichModCard from './RichModCard';
import { MorphLogo } from './Layout';

interface MarkdownRendererProps {
  content: string;
  version?: string;
  loader?: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, version = '1.20.1', loader = 'Forge' }) => {
  const extractMods = (text: string) => {
    const regex = /\*\*(.*?)\*\*/g;
    const mods: string[] = [];
    let match;
    while ((match = regex.exec(text)) !== null) {
      if (match[1] && !mods.includes(match[1])) {
        mods.push(match[1]);
      }
    }
    return mods;
  };

  const allMods = extractMods(content);

  const parseLineContent = (text: string, isModList: boolean) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        const modName = part.slice(2, -2);
        if (isModList) {
          return <RichModCard key={i} name={modName} version={version} loader={loader} />;
        }
        return <strong key={i} className="text-cyan-400 font-bold">{modName}</strong>;
      }
      return part;
    });
  };

  const lines = content.split('\n');
  const footerStartIndex = lines.findIndex(l => l.includes('## Installation & Download Center'));

  const renderContent = (contentLines: string[], isFooter: boolean = false) => {
    return contentLines.map((line, i) => {
      // Headers
      if (line.startsWith('### ')) return (
        <h3 key={i} className="text-xl font-black mt-10 mb-5 text-cyan-500 uppercase tracking-tight flex items-center gap-3">
          <span className="w-1.5 h-6 bg-cyan-500/20 rounded-full"></span>
          {line.replace('### ', '')}
        </h3>
      );
      if (line.startsWith('## ')) return (
        <h2 key={i} className={`text-2xl font-black mt-14 mb-8 border-b-2 border-zinc-800 pb-4 uppercase tracking-tighter ${isFooter ? 'text-morph-blue' : 'text-white'}`}>
          {line.replace('## ', '')}
        </h2>
      );
      if (line.startsWith('# ')) return (
        <h1 key={i} className="text-5xl font-black mt-12 mb-10 text-white tracking-tighter uppercase leading-none italic">
          {line.replace('# ', '')}
        </h1>
      );
      
      // List items
      if (line.startsWith('- ') || line.startsWith('* ')) {
        const contentStr = line.substring(2);
        return (
          <div key={i} className={`flex items-start gap-4 my-4 ${isFooter ? 'bg-zinc-900/30 p-4 rounded-xl border border-zinc-800/50 mb-3' : ''}`}>
            <span className="text-morph-blue mt-2 shrink-0 flex items-center justify-center w-6 h-6 rounded-lg bg-morph-blue/10">
              {isFooter ? <i className="fa-solid fa-check text-[10px]"></i> : <i className="fa-solid fa-cube text-[8px]"></i>}
            </span>
            <div className="flex-1 text-zinc-400 leading-relaxed text-base md:text-lg font-medium">
              {parseLineContent(contentStr, !isFooter)}
            </div>
          </div>
        );
      }

      // Action buttons
      if (line.includes('[📥 DOWNLOAD VIA MODRINTH (.mrpack)]')) {
        return (
          <div key={i} className="my-8">
            <a href="https://modrinth.com" target="_blank" className="w-full inline-flex items-center justify-center gap-4 bg-[#30b27b] hover:bg-[#258d61] text-white font-black py-6 px-10 rounded-2xl transition-all shadow-2xl shadow-emerald-950/40 no-underline uppercase tracking-[0.2em] text-xs border border-emerald-400/20 active:scale-[0.98] voxel-button" style={{ boxShadow: '0 6px 0 0 #1a6d4a' }}>
              <i className="fa-solid fa-box-archive text-xl"></i> Download Modrinth Synthesis
            </a>
          </div>
        );
      }
      if (line.includes('[📥 DOWNLOAD VIA CURSEFORGE (.zip)]')) {
        return (
          <div key={i} className="my-8">
            <a href="https://www.curseforge.com" target="_blank" className="w-full inline-flex items-center justify-center gap-4 bg-[#f16436] hover:bg-[#d15329] text-white font-black py-6 px-10 rounded-2xl transition-all shadow-2xl shadow-orange-950/40 no-underline uppercase tracking-[0.2em] text-xs border border-orange-400/20 active:scale-[0.98] voxel-button" style={{ boxShadow: '0 6px 0 0 #a34121' }}>
              <i className="fa-solid fa-file-zipper text-xl"></i> Download CurseForge Pack
            </a>
          </div>
        );
      }

      if (line.trim() === '') return <div key={i} className="h-4"></div>;
      return <p key={i} className="my-4 leading-relaxed text-zinc-400 text-lg font-medium">{parseLineContent(line, false)}</p>;
    });
  };

  const bodyLines = footerStartIndex === -1 ? lines : lines.slice(0, footerStartIndex);
  const footerLines = footerStartIndex === -1 ? [] : lines.slice(footerStartIndex);

  return (
    <div className="max-w-none selection:bg-morph-blue/30">
      {renderContent(bodyLines)}
      
      {footerLines.length > 0 && (
        <div className="mt-20 relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-morph-blue/20 via-zinc-800 to-morph-blue/20 rounded-[36px] blur-2xl opacity-50 group-hover:opacity-80 transition-opacity"></div>
          <div className="relative bg-zinc-950/90 backdrop-blur-2xl rounded-[32px] p-10 md:p-16 border border-zinc-800 shadow-2xl">
            <div className="flex items-center gap-6 mb-12">
              <div className="w-20 h-20 bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl flex items-center justify-center text-white text-3xl shadow-xl border border-blue-400/20">
                <MorphLogo className="w-12 h-12" />
              </div>
              <div>
                <h2 className="text-3xl font-black text-white m-0 tracking-tight uppercase">Deployment Protocol</h2>
                <div className="flex items-center gap-2 mt-2">
                   <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                   <p className="text-[10px] text-zinc-500 font-pixel uppercase tracking-widest">MORPHFORGE CORE READY</p>
                </div>
              </div>
            </div>

            {/* Quick Link Grid */}
            {allMods.length > 0 && (
              <div className="mb-14">
                <h4 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.4em] mb-8 flex items-center gap-4">
                  <span className="w-12 h-px bg-zinc-800"></span>
                  MANIFEST
                  <span className="flex-1 h-px bg-zinc-800"></span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {allMods.map((mod, idx) => (
                    <RichModCard key={idx} name={mod} version={version} loader={loader} />
                  ))}
                </div>
              </div>
            )}

            {/* Instructions & Buttons */}
            <div className="space-y-6">
              {renderContent(footerLines.slice(1), true)}
            </div>
            
            <div className="mt-16 pt-10 border-t border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-6">
                 <div className="flex flex-col gap-1">
                    <p className="text-[9px] text-zinc-600 font-pixel uppercase tracking-widest">Digital Signature Hash</p>
                    <p className="text-[10px] text-morph-blue font-mono font-bold tracking-tighter">
                      SYN-{version} | {loader.toUpperCase()} | HEX-{Math.random().toString(16).substring(2, 10).toUpperCase()}
                    </p>
                 </div>
                 <div className="flex gap-6 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                    <MorphLogo className="w-8 h-8" glow={false} />
                    <i className="fa-solid fa-shield-halved text-2xl" title="Verified Architecture"></i>
                    <i className="fa-solid fa-wifi text-2xl" title="Real-time Syncing"></i>
                 </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarkdownRenderer;
