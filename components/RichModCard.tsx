
import React, { useState, useEffect } from 'react';
import { ModMetadata } from '../types';
import { fetchModrinthData, getCurseForgeSearchUrl } from '../services/modService';

interface RichModCardProps {
  name: string;
  version: string;
  loader: string;
}

const RichModCard: React.FC<RichModCardProps> = ({ name, version, loader }) => {
  const [data, setData] = useState<ModMetadata | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const loadData = async () => {
      setLoading(true);
      const result = await fetchModrinthData(name, version, loader);
      if (isMounted) {
        setData(result);
        setLoading(false);
      }
    };
    loadData();
    return () => { isMounted = false; };
  }, [name, version, loader]);

  if (loading) {
    return (
      <div className="inline-block align-middle my-1.5 mr-3 w-full sm:w-[340px]">
        <div className="flex items-center gap-4 p-3 bg-zinc-950/40 border border-zinc-900 rounded-xl animate-pulse">
          <div className="w-12 h-12 rounded-lg bg-zinc-900 shrink-0"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-zinc-900 rounded w-2/3"></div>
            <div className="h-2 bg-zinc-900 rounded w-full"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    const cfUrl = getCurseForgeSearchUrl(name);
    return (
      <div className="inline-block align-middle my-1.5 mr-3">
        <div className="flex items-center gap-3 p-2 px-3 bg-zinc-950/60 border border-zinc-800 rounded-lg hover:border-zinc-700 transition-all group">
           <div className="w-6 h-6 rounded bg-zinc-900 flex items-center justify-center text-zinc-700 group-hover:text-morph-blue transition-colors">
              <i className="fa-solid fa-magnifying-glass text-[10px]"></i>
           </div>
           <strong className="text-cyan-400 font-bold text-sm tracking-tight">{name}</strong>
           <a 
            href={cfUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-2 py-1 text-[9px] bg-blue-600/10 text-blue-500 rounded border border-blue-600/20 hover:bg-blue-600/20 font-black uppercase tracking-widest transition-all"
          >
            CurseForge
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="inline-block align-middle my-2 mr-3 w-full sm:w-[380px] group">
      <div className="flex items-center gap-4 p-4 bg-zinc-950/80 hover:bg-zinc-900/90 rounded-2xl border border-zinc-800/60 group-hover:border-morph-blue/30 transition-all shadow-lg relative overflow-hidden">
        {/* Subtle Side Glow */}
        <div className="absolute top-0 left-0 w-1 h-full bg-morph-blue opacity-0 group-hover:opacity-100 transition-opacity"></div>
        
        <div className="relative shrink-0">
          <img 
            src={data.iconUrl} 
            alt={data.title} 
            className="w-14 h-14 rounded-xl shadow-inner bg-zinc-900 object-cover border border-zinc-800 group-hover:border-zinc-700 transition-all"
            onError={(e) => (e.currentTarget.src = 'https://cdn-raw.modrinth.com/badge.svg')}
          />
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full border-4 border-zinc-950 flex items-center justify-center">
             <i className="fa-solid fa-check text-[6px] text-zinc-950 font-bold"></i>
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex flex-col">
            <h4 className="text-sm font-black text-cyan-300 truncate group-hover:text-cyan-200 transition-colors">{data.title}</h4>
            <div className="flex items-center gap-2 mt-1">
               <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">
                {data.downloads > 1000000 ? `${(data.downloads/1000000).toFixed(1)}M` : data.downloads.toLocaleString()} DLs
               </span>
               <div className="w-1 h-1 rounded-full bg-zinc-800"></div>
               <span className="text-[9px] font-black text-blue-500 uppercase tracking-widest">Modrinth</span>
            </div>
          </div>
          <p className="text-[10px] text-zinc-500 line-clamp-1 italic mt-1.5 opacity-70 group-hover:opacity-100 transition-opacity">{data.description}</p>
        </div>
        
        <a 
          href={data.link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="shrink-0 w-10 h-10 bg-zinc-900 group-hover:bg-morph-blue flex items-center justify-center rounded-xl border border-zinc-800 group-hover:border-blue-400/30 text-zinc-600 group-hover:text-white transition-all shadow-sm"
          title="Open Repository"
        >
          <i className="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
        </a>
      </div>
    </div>
  );
};

export default RichModCard;
