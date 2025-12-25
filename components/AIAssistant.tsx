
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Send, X, Bot, Sparkles, Loader2 } from 'lucide-react';
import { LIGHTER_REF_URL } from '../constants';

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string | React.ReactNode }[]>([
    { 
      role: 'ai', 
      text: (
        <span>
          Ready to spark the .lit revolution? I'm your <a href={LIGHTER_REF_URL} target="_blank" rel="noopener noreferrer" className="text-orange-500 underline">Lighter Ecosystem Consultant</a>. Let's plan how to GET LIT for the whole community.
        </span>
      ) 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: userMsg,
        config: {
          systemInstruction: `You are a world-class Web3 Launch Consultant for LitNames (.lit), a community initiative for the Lighter ecosystem.
          
          BRANDING: Use the tagline "GET LIT" frequently. Your tone should be energetic, "lit", and highly professional.
          
          CONTEXT ABOUT LIGHTER:
          Lighter is a decentralized trading platform built for unmatched security and scale. It's the first exchange to offer verifiable order matching and liquidations while delivering best-in-class performance on par with traditional exchanges. The platform is accessible at app.lighter.xyz and lighter.exchange.
          
          REFERRAL POLICY: Whenever you mention the Lighter platform, you should encourage the user to use the ecosystem link: ${LIGHTER_REF_URL}
          
          YOUR GOALS:
          1. Help plan the building, setup, integration, collaboration, and marketing for LitNames as a ground-up community initiative.
          2. Emphasize how .lit names improve the trading experience on Lighter (orderbooks, profiles).
          3. Provide technical advice on custom ERC721 implementations and namehash algorithms for the Lighter chain.
          4. Suggest marketing strategies tailored to active traders and high-volume liquidity providers.
          
          NEVER mention other naming services or say this is a fork. This is a unique community initiative for Lighter.
          
          Be concise but high-impact. Focus on speed, precision, and community ownership.`
        }
      });

      setMessages(prev => [...prev, { role: 'ai', text: response.text || "Connection dropped. Lighter's speed is high, try sending that again!" }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', text: "Error: " + (err as Error).message }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 p-4 bg-orange-600 rounded-full shadow-2xl hover:scale-110 transition-transform z-50 glow-orange"
      >
        <Bot className="text-white w-6 h-6" />
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] h-[500px] bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden animate-in slide-in-from-bottom-4">
          <div className="p-4 bg-zinc-800 border-b border-zinc-700 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-orange-500" />
              <span className="font-bold text-white tracking-tight uppercase">Get Lit Planner</span>
            </div>
            <button onClick={() => setIsOpen(false)}><X className="w-4 h-4 text-zinc-400 hover:text-white transition-colors" /></button>
          </div>
          
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-900/50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                  m.role === 'user' ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/10' : 'bg-zinc-800 text-zinc-200 border border-zinc-700 shadow-sm'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-zinc-800 p-4 rounded-2xl border border-zinc-700">
                  <Loader2 className="w-4 h-4 animate-spin text-orange-500" />
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-zinc-900 border-t border-zinc-800 flex gap-2">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="How do we spark the .lit launch?"
              className="flex-1 bg-zinc-800 border-none rounded-xl px-4 py-3 text-sm text-white focus:ring-1 ring-orange-500 placeholder-zinc-500"
            />
            <button 
              onClick={handleSend}
              className="p-3 bg-orange-600 rounded-xl hover:bg-orange-500 transition-colors shadow-lg shadow-orange-600/20"
            >
              <Send className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AIAssistant;
