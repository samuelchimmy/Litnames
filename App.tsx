
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import SearchDomain from './components/SearchDomain';
import Roadmap from './components/Roadmap';
import Documentation from './components/Documentation';
import AIAssistant from './components/AIAssistant';
import MintFlow from './components/MintFlow';
import Lightning from './components/Lightning';
import ElectricBorder from './components/ElectricBorder';
import { FEATURES, LIGHTER_REF_URL } from './constants';
import { OwnedDomain } from './types';
import { ExternalLink, Flame, Users, Zap, Globe, ArrowRight, Wallet, User as UserIcon, LayoutDashboard, Activity, CheckCircle2 } from 'lucide-react';

const App: React.FC = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [ownedDomains, setOwnedDomains] = useState<OwnedDomain[]>([]);
  const [activeMint, setActiveMint] = useState<string | null>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [liveMints, setLiveMints] = useState<string[]>(['trader.lit', 'alpha.lit', 'whale.lit', 'maker.lit']);

  // Initialize from local storage
  useEffect(() => {
    const saved = localStorage.getItem('lit_domains');
    if (saved) {
      try {
        setOwnedDomains(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved domains", e);
      }
    }

    // Simulate live registration feed
    const interval = setInterval(() => {
      const prefixes = ['liquidator', 'degens', 'flash', 'bolt', 'fire', 'scout', 'pro', 'elite', 'whale', 'maker'];
      const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
      const randomNum = Math.floor(Math.random() * 999);
      const randomName = `${randomPrefix}${randomNum > 500 ? '' : randomNum}.lit`;
      setLiveMints(prev => [randomName, ...prev.slice(0, 3)]);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleConnect = () => {
    setWalletConnected(true);
  };

  const handleMintComplete = (name: string, years: number) => {
    const newDomain: OwnedDomain = {
      name,
      expiryYears: years,
      mintedAt: new Date(),
      isPrimary: ownedDomains.length === 0 // First one minted becomes primary
    };
    const updated = [...ownedDomains, newDomain];
    setOwnedDomains(updated);
    localStorage.setItem('lit_domains', JSON.stringify(updated));
    setActiveMint(null);
    setShowProfile(true);
  };

  const setPrimary = (name: string) => {
    const updated = ownedDomains.map(d => ({
      ...d,
      isPrimary: d.name === name
    }));
    setOwnedDomains(updated);
    localStorage.setItem('lit_domains', JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen relative bg-[#050505]">
      <Navbar />
      <AIAssistant />

      {activeMint && (
        <MintFlow 
          domain={activeMint} 
          onClose={() => setActiveMint(null)} 
          onComplete={handleMintComplete}
        />
      )}

      {/* Main Content Toggle */}
      {!showProfile ? (
        <>
          {/* Hero Section */}
          <section className="relative pt-20 pb-32 px-4 overflow-hidden min-h-[700px] flex flex-col justify-center">
            {/* Lightning Background Integration */}
            <div className="absolute inset-0 z-0 opacity-40">
              <Lightning
                hue={25} // Orange hue for LitNames branding
                xOffset={0}
                speed={0.8}
                intensity={1.2}
                size={0.6}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/0 via-[#050505]/60 to-[#050505]" />
            </div>

            <div className="max-w-7xl mx-auto text-center relative z-10">
              <a 
                href={LIGHTER_REF_URL} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600/10 border border-orange-500/20 rounded-full mb-8 hover:bg-orange-600/20 transition-all backdrop-blur-sm"
              >
                <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                <span className="text-xs font-bold text-orange-500 uppercase tracking-widest">Lighter Community Naming Service</span>
              </a>
              
              {!walletConnected ? (
                <div className="mb-12 animate-in fade-in zoom-in duration-500">
                  <h1 className="text-6xl md:text-9xl font-black mb-6 tracking-tighter uppercase italic drop-shadow-2xl">
                    GET <span className="text-gradient">LIT</span>
                  </h1>
                  <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                    Map your <a href={LIGHTER_REF_URL} className="text-orange-500 hover:underline">Lighter address</a> to a human-readable trading ID. 
                    Built for the high-performance <a href={LIGHTER_REF_URL} className="text-white hover:text-orange-500 transition-colors">Lighter.xyz</a> ecosystem.
                  </p>
                  
                  <div className="inline-block">
                    <ElectricBorder 
                      color="#f97316" 
                      speed={1.5} 
                      chaos={0.4} 
                      thickness={2.5}
                      style={{ borderRadius: 9999 }}
                    >
                      <button 
                        onClick={handleConnect}
                        className="group relative inline-flex items-center gap-3 bg-white text-black px-12 py-6 rounded-full font-black text-2xl hover:bg-orange-600 hover:text-white transition-all transform hover:scale-105 active:scale-95"
                      >
                        <Wallet className="w-8 h-8" /> CONNECT WALLET
                      </button>
                    </ElectricBorder>
                  </div>
                </div>
              ) : (
                <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                  <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter uppercase italic">
                    SEARCH <span className="text-gradient">.LIT</span>
                  </h1>
                  <SearchDomain onMint={setActiveMint} />
                  
                  <div className="mt-8 flex justify-center gap-6">
                    <ElectricBorder color="#f97316" speed={1.2} chaos={0.2} style={{ borderRadius: 20 }}>
                      <button 
                        onClick={() => setShowProfile(true)}
                        className="flex items-center gap-3 text-zinc-200 hover:text-white font-black text-sm transition-all bg-zinc-900 px-8 py-4 rounded-2xl"
                      >
                        <LayoutDashboard className="w-5 h-5 text-orange-500" /> TRADER DASHBOARD ({ownedDomains.length})
                      </button>
                    </ElectricBorder>
                  </div>
                </div>
              )}

              {/* Live Feed Component */}
              <div className="mt-20 max-w-sm mx-auto">
                <div className="flex items-center gap-2 mb-4 justify-center text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">
                  <Activity className="w-3 h-3 text-green-500" /> Verifiable Registration Feed
                </div>
                <div className="flex flex-col gap-2">
                  {liveMints.map((name, i) => (
                    <div key={i} className="flex items-center justify-between px-5 py-3 bg-zinc-900/60 rounded-xl border border-zinc-800/80 text-[11px] animate-in slide-in-from-right-4 fade-in backdrop-blur-sm">
                      <span className="text-white font-bold italic">{name}</span>
                      <span className="text-zinc-500 font-mono">0x{Math.random().toString(16).slice(2, 6)}...{Math.random().toString(16).slice(2, 6)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="py-24 px-4 border-t border-zinc-900 bg-black">
            <div className="max-w-7xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-black mb-4 tracking-tight uppercase italic">DEX-READY IDENTITY</h2>
              <p className="text-zinc-500">Your .lit name integrates natively with <a href={LIGHTER_REF_URL} className="text-orange-500 hover:underline">Lighter's</a> verifiable orderbooks.</p>
            </div>
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {FEATURES.map((feature, idx) => (
                  <ElectricBorder key={idx} color="#f97316" speed={0.5} chaos={0.15} style={{ borderRadius: 32 }}>
                    <div className="p-8 rounded-[32px] bg-zinc-900/40 border border-zinc-800/50 hover:border-orange-500/20 transition-all group hover:bg-zinc-900/60 h-full backdrop-blur-sm">
                      <div className="mb-6 p-4 bg-zinc-950 rounded-2xl w-fit group-hover:glow-orange transition-all">
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-black mb-3 text-white uppercase italic">{feature.title}</h3>
                      <p className="text-zinc-400 text-sm leading-relaxed">{feature.description}</p>
                    </div>
                  </ElectricBorder>
                ))}
              </div>
            </div>
          </section>

          <Roadmap />
          <Documentation />
        </>
      ) : (
        <div className="max-w-5xl mx-auto px-4 py-12 animate-in fade-in slide-in-from-left-8 duration-500">
          <div className="flex justify-between items-center mb-12">
            <div>
              <button 
                onClick={() => setShowProfile(false)}
                className="text-zinc-500 hover:text-white flex items-center gap-2 text-sm font-black uppercase mb-2 transition-colors group"
              >
                <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" /> Back to Get Lit
              </button>
              <h2 className="text-4xl font-black text-white uppercase italic">Trader Dashboard</h2>
            </div>
            <div className="flex items-center gap-4 p-4 bg-zinc-900 rounded-2xl border border-zinc-800">
              <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center shadow-lg shadow-orange-600/20">
                <UserIcon className="w-6 h-6 text-white" />
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest leading-none">Connected <a href={LIGHTER_REF_URL} className="hover:text-orange-500 transition-colors font-black">Lighter Wallet</a></p>
                <p className="text-sm font-mono text-white">0x71...F4a2</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ownedDomains.length > 0 ? ownedDomains.map((d, i) => (
              <ElectricBorder key={i} color={d.isPrimary ? "#f97316" : "#27272a"} speed={d.isPrimary ? 1.5 : 0.4} chaos={d.isPrimary ? 0.4 : 0.05} style={{ borderRadius: 32 }}>
                <div className={`bg-zinc-900 p-8 rounded-[32px] transition-all group relative overflow-hidden h-full ${d.isPrimary ? 'shadow-[0_0_30px_rgba(249,115,22,0.15)]' : ''}`}>
                  {d.isPrimary && (
                    <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 bg-orange-500/10 rounded-full border border-orange-500/20">
                      <CheckCircle2 className="w-3 h-3 text-orange-500" />
                      <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest">Primary</span>
                    </div>
                  )}
                  <h3 className="text-3xl font-black text-white mb-4 italic tracking-tighter">
                    {d.name}<span className="text-orange-600">.lit</span>
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-xs">
                      <span className="text-zinc-500 font-black uppercase tracking-wider">Status</span>
                      <span className="text-green-500 font-black uppercase tracking-wider">Verified</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-zinc-500 font-black uppercase tracking-wider">Period</span>
                      <span className="text-white font-black">{d.expiryYears} Years</span>
                    </div>
                  </div>
                  <div className="mt-8 flex flex-col gap-3">
                    {!d.isPrimary && (
                      <button 
                        onClick={() => setPrimary(d.name)}
                        className="w-full py-4 bg-orange-600 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all hover:bg-orange-500 shadow-lg shadow-orange-600/20"
                      >
                        SET AS PRIMARY ID
                      </button>
                    )}
                    <div className="flex gap-3">
                      <button className="flex-1 py-4 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">MANAGE</button>
                      <button className="flex-1 py-4 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">TRANSFER</button>
                    </div>
                  </div>
                </div>
              </ElectricBorder>
            )) : (
              <div className="col-span-full py-24 text-center bg-zinc-900/30 rounded-[48px] border border-dashed border-zinc-800">
                <Flame className="w-16 h-16 text-zinc-700 mx-auto mb-6" />
                <p className="text-zinc-500 font-black uppercase tracking-widest text-lg">No .lit domains secured</p>
                <p className="text-zinc-600 text-sm mt-2">Trade with identity on <a href={LIGHTER_REF_URL} className="text-orange-500 hover:underline">Lighter</a>.</p>
                <div className="inline-block mt-10">
                  <ElectricBorder color="#f97316" speed={1.5} chaos={0.5} style={{ borderRadius: 999 }}>
                    <button 
                      onClick={() => setShowProfile(false)}
                      className="px-14 py-5 bg-orange-600 text-white rounded-full font-black uppercase tracking-[0.2em] hover:bg-orange-500 transition-all shadow-2xl shadow-orange-600/30"
                    >
                      Get Lit Now
                    </button>
                  </ElectricBorder>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-zinc-900 text-zinc-500 text-sm bg-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-orange-600" />
            <span className="font-black text-white uppercase tracking-tight italic">LitNames</span>
            <span className="mx-2 opacity-30">|</span>
            <a href={LIGHTER_REF_URL} target="_blank" rel="noopener noreferrer" className="text-xs uppercase font-black hover:text-orange-500 transition-colors tracking-widest">Lighter Community Initiative</a>
          </div>
          <div className="flex gap-8">
            <a href={LIGHTER_REF_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1 font-black uppercase text-[10px] tracking-widest">Trade on Lighter <ExternalLink className="w-3 h-3" /></a>
            <a href="#" className="hover:text-white transition-colors uppercase font-black text-[10px] tracking-widest">Twitter</a>
            <a href="#" className="hover:text-white transition-colors uppercase font-black text-[10px] tracking-widest">Telegram</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
