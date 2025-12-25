
import React from 'react';
import { Terminal, Server, ShieldCheck } from 'lucide-react';
import { LIGHTER_REF_URL } from '../constants';
import ElectricBorder from './ElectricBorder';

const Documentation: React.FC = () => {
  const codeSnippet = `import { ConnectButton } from '@litnames/rainbowkit';

export const LitApp = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold italic uppercase tracking-tighter">
        Get Lit <span className="text-orange-500">DEX</span>
      </h1>
      {/* LitNames handles resolution automatically */}
      <ConnectButton />
    </div>
  );
};`;

  return (
    <section className="py-24 px-4 border-t border-zinc-900" id="docs">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-4xl font-bold mb-6 italic uppercase">
              <a href={LIGHTER_REF_URL} target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 transition-colors">Lighter Integration</a>
            </h2>
            <p className="text-zinc-400 mb-8 leading-relaxed">
              LitNames is the community-driven identity layer for <a href={LIGHTER_REF_URL} className="text-orange-500 hover:underline">Lighter</a>. We provide high-level SDKs for RainbowKit, Dynamic, and low-level REST APIs to ensure your dApp is ready to <span className="text-orange-500 font-bold italic underline decoration-orange-500/30 underline-offset-4">GET LIT</span>.
            </p>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="p-3 bg-zinc-900 rounded-xl">
                  <Terminal className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <h4 className="font-bold text-white uppercase tracking-tight">
                    <a href={LIGHTER_REF_URL} className="hover:text-orange-500 transition-colors">Lighter API</a>
                  </h4>
                  <p className="text-sm text-zinc-400">Query names and text records directly from our high-performance API nodes.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="p-3 bg-zinc-900 rounded-xl">
                  <Server className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h4 className="font-bold text-white uppercase tracking-tight">Verifiable Resolution</h4>
                  <p className="text-sm text-zinc-400">Resolution happens natively on the <a href={LIGHTER_REF_URL} className="text-blue-400 hover:underline">Lighter chain</a>, ensuring security matches the exchange matching engine.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="p-3 bg-zinc-900 rounded-xl">
                  <ShieldCheck className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <h4 className="font-bold text-white uppercase tracking-tight">Community Owned</h4>
                  <p className="text-sm text-zinc-400">All logic is decentralized and managed by the <a href={LIGHTER_REF_URL} className="text-green-400 hover:underline">Lighter community initiative</a>.</p>
                </div>
              </div>
            </div>
          </div>

          <ElectricBorder color="#f97316" speed={0.3} chaos={0.05} style={{ borderRadius: 24 }}>
            <div className="bg-[#0d1117] rounded-3xl border border-zinc-800 overflow-hidden shadow-2xl h-full">
              <div className="flex items-center gap-2 px-4 py-3 bg-[#161b22] border-b border-zinc-800">
                <div className="w-3 h-3 rounded-full bg-red-500/20" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                <div className="w-3 h-3 rounded-full bg-green-500/20" />
                <span className="text-xs text-zinc-500 ml-2 font-mono uppercase tracking-tighter">Lighter Integration Example</span>
              </div>
              <pre className="p-6 text-sm font-mono text-zinc-300 overflow-x-auto">
                <code>{codeSnippet}</code>
              </pre>
            </div>
          </ElectricBorder>
        </div>
      </div>
    </section>
  );
};

export default Documentation;
