
import React, { useState } from 'react';
import { Search, CheckCircle, XCircle, ArrowRight, Sparkles, AlertTriangle, TrendingUp, Zap, Target } from 'lucide-react';
import { GoogleGenAI, Type } from "@google/genai";
import { LIGHTER_REF_URL } from '../constants';
import ElectricBorder from './ElectricBorder';

interface Alternative {
  name: string;
  description: string;
}

interface SearchResult {
  available: boolean;
  name: string;
  rarity: string;
  vibe: string;
  alternatives: Alternative[];
}

interface Props {
  onMint: (name: string) => void;
}

const SearchDomain: React.FC<Props> = ({ onMint }) => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState<SearchResult | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;
    setIsSearching(true);
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Evaluate the crypto domain name "${query}.lit" for the Lighter ecosystem.
      Context: Lighter (at app.lighter.xyz) is a high-performance, verifiable DEX focused on speed and security.
      
      Instructions:
      1. Availability: Boolean (names < 4 chars are reserved/taken).
      2. Rarity: One of: Legendary, Rare, or Common.
      3. Vibe: A short, energetic trading-focused description (max 10 words).
      4. Alternatives: Provide 6 premium suggestions that reflect:
         - High-performance trading (e.g., scalper, alpha, whale, maker).
         - Lighter's core features (e.g., verifiable, scale, liquid, speed).
         - Current market trends (e.g., bull, moon, pump, degen).
      
      For each alternative, provide a short "why" description (e.g., "Perfect for high-volume market makers").`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              available: { type: Type.BOOLEAN },
              rarity: { type: Type.STRING },
              vibe: { type: Type.STRING },
              alternatives: { 
                type: Type.ARRAY, 
                items: { 
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    description: { type: Type.STRING }
                  },
                  required: ["name", "description"]
                } 
              }
            },
            required: ["available", "rarity", "vibe", "alternatives"]
          }
        }
      });

      const data = JSON.parse(response.text || '{}');
      // Logic override for mock:
      const available = query.length > 3 && data.available;
      setResult({ ...data, available, name: query.toLowerCase() });
    } catch (err) {
      console.error(err);
      setResult({
        available: query.length > 3,
        name: query.toLowerCase(),
        rarity: "Common",
        vibe: "Ready for action on Lighter",
        alternatives: [
          { name: "flame." + query, description: "Heat up your trading game" },
          { name: "alpha." + query, description: "For the top tier traders" },
          { name: "lit." + query, description: "Keep it simple and lit" }
        ]
      });
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6" id="search">
      <form onSubmit={handleSearch} className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-yellow-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Get Lit: Search your trader ID..."
          className="relative w-full bg-zinc-900 border-2 border-zinc-800 rounded-2xl py-6 px-8 pr-16 text-xl focus:outline-none focus:border-orange-600 transition-all text-white placeholder-zinc-500 shadow-2xl"
        />
        <button
          type="submit"
          disabled={isSearching}
          className="absolute right-4 top-4 bottom-4 aspect-square bg-orange-600 rounded-xl flex items-center justify-center hover:bg-orange-500 transition-colors disabled:opacity-50 shadow-lg"
        >
          {isSearching ? (
            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Search className="w-7 h-7 text-white" />
          )}
        </button>
      </form>

      {result && (
        <div className="mt-8 space-y-6 animate-in fade-in slide-in-from-top-4 duration-500">
          <ElectricBorder color={result.available ? "#22c55e" : "#ef4444"} speed={1} chaos={0.1} style={{ borderRadius: 32 }}>
            <div className={`p-8 rounded-[32px] flex flex-col md:flex-row md:items-center justify-between gap-6 ${result.available ? 'bg-zinc-900' : 'bg-zinc-900'} relative overflow-hidden`}>
              {result.available && (
                <div className="absolute top-0 right-0 p-4 opacity-5">
                  <CheckCircle className="w-32 h-32 text-green-500" />
                </div>
              )}
              <div className="flex items-center gap-6 relative z-10">
                <div className={`p-4 rounded-2xl ${result.available ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
                  {result.available ? (
                    <Zap className="w-8 h-8 text-green-500" />
                  ) : (
                    <XCircle className="w-8 h-8 text-red-500" />
                  )}
                </div>
                <div>
                  <h3 className="font-black text-3xl text-white italic tracking-tighter">
                    {result.name}<span className="text-orange-600">.lit</span>
                  </h3>
                  <div className="flex items-center gap-3 mt-2">
                    <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full border ${
                      result.rarity.toLowerCase() === 'legendary' ? 'bg-orange-500/20 border-orange-500/30 text-orange-400' :
                      result.rarity.toLowerCase() === 'rare' ? 'bg-blue-500/20 border-blue-500/30 text-blue-400' :
                      'bg-zinc-800 border-zinc-700 text-zinc-400'
                    }`}>
                      {result.rarity}
                    </span>
                    <span className="text-zinc-500 text-xs font-medium italic">"{result.vibe}"</span>
                  </div>
                </div>
              </div>
              {result.available ? (
                <ElectricBorder color="#ffffff" speed={2} chaos={0.5} style={{ borderRadius: 16 }}>
                  <button 
                    onClick={() => onMint(result.name)}
                    className="relative z-10 flex items-center justify-center gap-2 bg-white text-black hover:bg-orange-600 hover:text-white px-10 py-4 rounded-2xl font-black text-lg transition-all transform hover:scale-105 active:scale-95"
                  >
                    MINT THIS <ArrowRight className="w-5 h-5" />
                  </button>
                </ElectricBorder>
              ) : (
                <div className="flex items-center gap-2 text-red-500 font-black uppercase tracking-widest text-sm bg-red-500/10 px-4 py-2 rounded-xl border border-red-500/20">
                  <AlertTriangle className="w-4 h-4" /> Reserved
                </div>
              )}
            </div>
          </ElectricBorder>

          <div className="p-8 bg-zinc-900/40 border border-zinc-800 rounded-[32px] backdrop-blur-md">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-600/20 rounded-lg">
                  <Sparkles className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <h4 className="text-white font-black uppercase tracking-tight">AI Trading Personas</h4>
                  <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Optimized for Lighter DEX</p>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-1 px-3 py-1 bg-zinc-800/50 rounded-full border border-zinc-700/50">
                <Target className="w-3 h-3 text-orange-500" />
                <span className="text-[10px] text-zinc-400 font-bold uppercase">Trending Meta</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {result.alternatives.map((alt, i) => (
                <button 
                  key={i}
                  onClick={() => { setQuery(alt.name.replace('.lit', '')); setResult(null); }}
                  className="flex flex-col items-start text-left p-5 bg-zinc-800/40 hover:bg-zinc-800 hover:border-orange-500/50 rounded-2xl transition-all border border-zinc-700/50 group"
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className="text-white font-bold text-lg group-hover:text-orange-500 transition-colors">
                      {alt.name.includes('.lit') ? alt.name : `${alt.name}.lit`}
                    </span>
                    <TrendingUp className="w-4 h-4 text-zinc-600 group-hover:text-orange-500/50 transition-colors" />
                  </div>
                  <p className="text-[10px] text-zinc-500 font-medium leading-tight">{alt.description}</p>
                </button>
              ))}
            </div>
            
            <div className="mt-8 pt-6 border-t border-zinc-800/50 flex justify-center">
              <p className="text-[11px] text-zinc-500 text-center">
                Can't find the right one? <a href={LIGHTER_REF_URL} target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:underline">Check out top traders on Lighter</a> for inspiration.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchDomain;
