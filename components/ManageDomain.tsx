
import React, { useState } from 'react';
import { X, Save, Sparkles, Loader2, Twitter, MessageCircle, Globe, Hash } from 'lucide-react';
import { OwnedDomain } from '../types';
import { GoogleGenAI } from "@google/genai";
import ElectricBorder from './ElectricBorder';

interface Props {
  domain: OwnedDomain;
  onClose: () => void;
  onSave: (records: OwnedDomain['records']) => void;
}

const ManageDomain: React.FC<Props> = ({ domain, onClose, onSave }) => {
  const [records, setRecords] = useState(domain.records || { bio: '', discord: '', twitter: '', telegram: '' });
  const [isGenerating, setIsGenerating] = useState(false);

  const generateBio = async () => {
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Generate a short, high-energy crypto trader bio for a user with the domain "${domain.name}.lit" in the Lighter DEX ecosystem.
      Keywords: High-performance, verifiable, speed, liquid, alpha.
      Constraints: Max 15 words. Energetic and "lit" tone.`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt
      });
      
      const newBio = response.text?.trim() || "Alpha trader dominating the Lighter orderbooks. Speed and scale combined.";
      setRecords(prev => ({ ...prev, bio: newBio }));
    } catch (e) {
      console.error(e);
      setRecords(prev => ({ ...prev, bio: "Scalping alpha on Lighter. Fast, verifiable, and unstoppable." }));
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
      <div className="w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-[32px] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="p-6 md:p-8">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase mb-1">
                Manage {domain.name}<span className="text-orange-600">.lit</span>
              </h2>
              <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Protocol Text Records</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-zinc-800 rounded-full transition-colors">
              <X className="w-6 h-6 text-zinc-400" />
            </button>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center mb-1">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Trader Bio</label>
                <button 
                  onClick={generateBio}
                  disabled={isGenerating}
                  className="flex items-center gap-2 text-[10px] font-black text-orange-500 uppercase hover:text-orange-400 transition-colors disabled:opacity-50"
                >
                  {isGenerating ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                  Generate with AI
                </button>
              </div>
              <textarea 
                value={records.bio}
                onChange={(e) => setRecords(prev => ({ ...prev, bio: e.target.value }))}
                placeholder="Share your trading philosophy..."
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-orange-600 min-h-[100px] transition-all"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                  <Twitter className="w-3 h-3" /> Twitter Handle
                </label>
                <input 
                  type="text"
                  value={records.twitter}
                  onChange={(e) => setRecords(prev => ({ ...prev, twitter: e.target.value }))}
                  placeholder="@handle"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-orange-600 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                  <MessageCircle className="w-3 h-3" /> Discord Tag
                </label>
                <input 
                  type="text"
                  value={records.discord}
                  onChange={(e) => setRecords(prev => ({ ...prev, discord: e.target.value }))}
                  placeholder="user#0000"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-orange-600 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                  <Globe className="w-3 h-3" /> Telegram
                </label>
                <input 
                  type="text"
                  value={records.telegram}
                  onChange={(e) => setRecords(prev => ({ ...prev, telegram: e.target.value }))}
                  placeholder="t.me/username"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-orange-600 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                  <Hash className="w-3 h-3" /> External Profile
                </label>
                <input 
                  type="text"
                  placeholder="https://..."
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white opacity-50 cursor-not-allowed"
                  disabled
                />
              </div>
            </div>
          </div>

          <div className="mt-10">
            <ElectricBorder color="#f97316" speed={1.5} chaos={0.3} style={{ borderRadius: 16 }}>
              <button 
                onClick={() => onSave(records)}
                className="w-full py-4 bg-orange-600 text-white rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-orange-500 transition-all shadow-xl shadow-orange-600/20 flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" /> Save Text Records
              </button>
            </ElectricBorder>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageDomain;
