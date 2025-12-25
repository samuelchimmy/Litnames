
import React from 'react';
import { Flame } from 'lucide-react';
import ElectricBorder from './ElectricBorder';

const Navbar: React.FC = () => {
  return (
    <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-orange-500/20 px-4 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-orange-600 rounded-lg glow-orange">
            <Flame className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white uppercase italic">LitNames</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-400 uppercase tracking-widest">
          <a href="#search" className="hover:text-orange-500 transition-colors">Search</a>
          <a href="#roadmap" className="hover:text-orange-500 transition-colors">Roadmap</a>
          <a href="#docs" className="hover:text-orange-500 transition-colors">Documentation</a>
          <a href="#ecosystem" className="hover:text-orange-500 transition-colors">Ecosystem</a>
        </div>
        <ElectricBorder color="#f97316" speed={1} chaos={0.1} style={{ borderRadius: 999 }}>
          <button className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2 rounded-full text-sm font-semibold transition-all">
            Launch App
          </button>
        </ElectricBorder>
      </div>
    </nav>
  );
};

export default Navbar;
