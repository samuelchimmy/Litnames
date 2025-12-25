
import React, { useState } from 'react';
import { Calendar, CreditCard, ShieldCheck, ArrowRight, Loader2, PartyPopper } from 'lucide-react';
import ElectricBorder from './ElectricBorder';

interface Props {
  domain: string;
  onClose: () => void;
  onComplete: (domain: string, years: number) => void;
  accountAddress?: string | null;
}

const MintFlow: React.FC<Props> = ({ domain, onClose, onComplete, accountAddress }) => {
  const [step, setStep] = useState(1);
  const [years, setYears] = useState(1);
  const [isMinting, setIsMinting] = useState(false);

  const pricePerYear = 0.05; // ETH equivalent in Lighter

  const handleMint = () => {
    setIsMinting(true);
    setTimeout(() => {
      setIsMinting(false);
      setStep(3);
    }, 2000);
  };

  const formatAddress = (addr: string | null | undefined) => {
    if (!addr) return "0x00...0000";
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-[32px] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
        
        {/* Progress Bar */}
        <div className="flex h-1 w-full bg-zinc-800">
          <div className={`h-full bg-orange-600 transition-all duration-500 ${step === 1 ? 'w-1/3' : step === 2 ? 'w-2/3' : 'w-full'}`} />
        </div>

        <div className="p-8">
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-white mb-2 uppercase italic tracking-tight">Configure Registration</h2>
                <p className="text-zinc-400">Choose how long you want to own {domain}.lit</p>
              </div>

              <div className="p-6 bg-zinc-800 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Calendar className="w-6 h-6 text-orange-500" />
                  <div>
                    <p className="text-sm font-medium text-zinc-400">Duration</p>
                    <p className="text-lg font-bold text-white">{years} Year{years > 1 ? 's' : ''}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setYears(Math.max(1, years - 1))} className="w-8 h-8 rounded-lg bg-zinc-700 text-white font-bold hover:bg-zinc-600">-</button>
                  <button onClick={() => setYears(years + 1)} className="w-8 h-8 rounded-lg bg-zinc-700 text-white font-bold hover:bg-zinc-600">+</button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500">Registration Price</span>
                  <span className="text-white font-medium">{(years * pricePerYear).toFixed(3)} LIT</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500">Estimated Gas</span>
                  <span className="text-white font-medium">0.001 LIT</span>
                </div>
                <div className="border-t border-zinc-800 pt-2 flex justify-between font-bold text-lg">
                  <span className="text-white">Total</span>
                  <span className="text-orange-500">{(years * pricePerYear + 0.001).toFixed(3)} LIT</span>
                </div>
              </div>

              <button 
                onClick={() => setStep(2)}
                className="w-full py-4 bg-orange-600 rounded-2xl font-bold text-white flex items-center justify-center gap-2 hover:bg-orange-500 transition-all"
              >
                Continue to Payment <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-white mb-2 uppercase italic tracking-tight">Final Confirmation</h2>
                <p className="text-zinc-400">Review your transaction on Lighter Chain</p>
              </div>

              <div className="p-6 border border-orange-500/20 bg-orange-500/5 rounded-2xl space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">Domain</span>
                  <span className="text-white font-bold">{domain}.lit</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">Owner</span>
                  <span className="text-zinc-500 font-mono text-xs">{formatAddress(accountAddress)}</span>
                </div>
              </div>

              <ElectricBorder color="#f97316" speed={2} chaos={0.6} style={{ borderRadius: 16 }}>
                <button 
                  onClick={handleMint}
                  disabled={isMinting}
                  className="w-full py-4 bg-orange-600 rounded-2xl font-bold text-white flex items-center justify-center gap-2 hover:bg-orange-500 transition-all disabled:opacity-50"
                >
                  {isMinting ? <><Loader2 className="w-5 h-5 animate-spin" /> Confirming...</> : 'Confirm & Mint'}
                </button>
              </ElectricBorder>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 text-center py-4">
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <PartyPopper className="w-10 h-10 text-green-500" />
              </div>
              <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">LIT MINTED!</h2>
              <p className="text-zinc-400">
                Congratulations! You are now the official owner of <span className="text-orange-500 font-bold">{domain}.lit</span>.
              </p>
              
              <div className="p-4 bg-zinc-800 rounded-2xl">
                <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold mb-1">Transaction Hash</p>
                <p className="text-zinc-300 font-mono text-xs overflow-hidden text-ellipsis">0x9a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t</p>
              </div>

              <button 
                onClick={() => onComplete(domain, years)}
                className="w-full py-4 bg-white text-black rounded-2xl font-bold hover:bg-zinc-200 transition-all"
              >
                View Profile
              </button>
            </div>
          )}

          <button 
            onClick={onClose}
            className="w-full mt-4 text-zinc-500 text-sm font-medium hover:text-zinc-300 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default MintFlow;
