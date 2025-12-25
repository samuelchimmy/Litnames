
import React from 'react';
import { Flame } from 'lucide-react';
import ElectricBorder from './ElectricBorder';

interface Props {
  onLaunch?: () => void;
}

const Navbar: React.FC<Props> = ({ onLaunch }) => {
  return (
    <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-orange-500/20 px-3 md:px-4 py-3 md:py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="p-1 md:p-1.5 bg-orange-600 rounded-lg glow-orange shrink-0">
            <Flame className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
          <span className="text-lg md:text-xl font-black tracking-tight text-white uppercase italic">LitNames</span>
        </div>
        <div className="hidden md:flex gap-8 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          <a href="#" onClick={(e) => { e.preventDefault(); onLaunch?.(); }} className="hover:text-orange-500 transition-colors">Search</a>
          <a href="#roadmap" className="hover:text-orange-500 transition-colors">Roadmap</a>
          <a href="#docs" className="hover:text-orange-500 transition-colors">Documentation</a>
          <a href="#ecosystem" className="hover:text-orange-500 transition-colors">Ecosystem</a>
        </div>
        <div className="shrink-0">
          <ElectricBorder color="#f97316" speed={1} chaos={0.1} style={{ borderRadius: 999 }}>
            <button 
              onClick={onLaunch}
              className="bg-orange-600 hover:bg-orange-700 text-white px-4 md:px-5 py-2 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest transition-all"
            >
              Launch
            </button>
          </ElectricBorder>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
