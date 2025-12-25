
import React from 'react';
import { ROADMAP_DATA } from '../constants';

const Roadmap: React.FC = () => {
  return (
    <section className="py-24 px-4 bg-zinc-950" id="roadmap">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">The Lit Path</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            From architecture to the final community finish. Our roadmap ensures a sustainable and powerful naming layer for the Lighter ecosystem.
          </p>
        </div>

        <div className="relative border-l-2 border-zinc-800 ml-4 space-y-12">
          {ROADMAP_DATA.map((item, idx) => (
            <div key={idx} className="relative pl-8 group">
              <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 border-zinc-950 ${
                item.status === 'completed' ? 'bg-green-500' :
                item.status === 'current' ? 'bg-orange-600 animate-pulse' : 'bg-zinc-800'
              }`} />
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-1">
                <span className="text-xs font-bold uppercase tracking-widest text-orange-500">
                  {item.phase}
                </span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                  item.status === 'completed' ? 'bg-green-500/20 text-green-500' :
                  item.status === 'current' ? 'bg-orange-500/20 text-orange-500' : 'bg-zinc-800 text-zinc-500'
                }`}>
                  {item.status}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                {item.title}
              </h3>
              <p className="text-zinc-400 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
