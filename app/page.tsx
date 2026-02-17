'use client';
import { useState, useEffect } from 'react';
import { useForexData, SUPPORTED_CURRENCIES } from './useForexData';
import { DateControls, CurrencyGrid, PerformanceChart, BoutiqueFooter, BratMusic } from './ForexComponents';
import { Globe, Sparkles, VolumeX, Music } from 'lucide-react';

export default function ForexDashboard() {
  const [base, setBase] = useState('GBP');
  const [start, setStart] = useState('2025-02-17');
  const [end, setEnd] = useState(new Date().toISOString().split('T')[0]);
  const [visible, setVisible] = useState(['USD', 'EUR', 'JPY']);
  const [isBratMode, setIsBratMode] = useState(false);

  const { chartData, yDomain } = useForexData(base, start, end, visible);

  // NUCLEAR STYLE INJECTION: Force black background over layout/global overrides
  useEffect(() => {
    const styleId = 'brat-force-dark';
    let styleTag = document.getElementById(styleId);

    if (isBratMode) {
      document.documentElement.classList.add('dark');
      if (!styleTag) {
        styleTag = document.createElement('style');
        styleTag.id = styleId;
        styleTag.innerHTML = `
          html, body, :host, #root, [data-theme], .light, .dark {
            background-color: #000000 !important;
            background: #000000 !important;
            color: #8ace00 !important;
          }
          * { border-color: #8ace0033 !important; }
        `;
        document.head.appendChild(styleTag);
      }
    } else {
      document.documentElement.classList.remove('dark');
      if (styleTag) styleTag.remove();
    }
    return () => { styleTag?.remove(); };
  }, [isBratMode]);

  const getColor = (c: string) => {
    const hue = (SUPPORTED_CURRENCIES.indexOf(c) * 137.5) % 360;
    return isBratMode ? `hsl(${hue}, 95%, 60%)` : `hsl(${hue}, 65%, 70%)`;
  };

  const handlePreset = (label: string) => {
    const endD = new Date();
    const startD = new Date();
    if (label === '1W') startD.setDate(endD.getDate() - 7);
    else if (label === '1M') startD.setMonth(endD.getMonth() - 1);
    else if (label === '1Y') startD.setFullYear(endD.getFullYear() - 1);
    else if (label === 'MAX') startD.setFullYear(1999);
    setStart(startD.toISOString().split('T')[0]);
    setEnd(endD.toISOString().split('T')[0]);
  };

  return (
    <main className={`min-h-screen transition-all duration-500 ${isBratMode ? 'bg-black' : 'p-4 md:p-8'}`}>
      <BratMusic isActive={isBratMode} />
      
      <div className="max-w-7xl mx-auto space-y-8 relative z-10 p-4 md:p-8">
        <header className={`p-10 transition-all border-4 ${
          isBratMode 
            ? 'bg-black border-[#8ace00] animate-brat-glitch shadow-[0_0_60px_rgba(138,206,0,0.4)]' 
            : 'bg-white/70 rounded-[4rem] border-white backdrop-blur-3xl shadow-xl'
        }`}>
          <div className="flex justify-between items-start mb-10">
            <h1 className={`text-6xl font-black italic tracking-tighter flex items-center gap-3 transition-all ${isBratMode ? 'text-[#8ace00] uppercase skew-x-[-5deg]' : 'text-rose-400'}`}>
              <Globe size={36} className={isBratMode ? "animate-spin-slow" : ""} /> 
              forex<span className={isBratMode ? 'line-through decoration-white' : ''}>soft</span>
            </h1>
            
            <div className="flex flex-col items-end gap-4">
              <button 
                onClick={() => setIsBratMode(!isBratMode)}
                className={`flex items-center gap-2 px-8 py-3 font-black text-xs uppercase tracking-widest transition-all ${
                  isBratMode 
                    ? 'bg-[#8ace00] text-black border-2 border-white hover:scale-105' 
                    : 'bg-rose-100 text-rose-500 rounded-full hover:bg-rose-200 shadow-sm'
                }`}
              >
                {isBratMode ? <VolumeX size={16} /> : <Sparkles size={16} />} 
                {isBratMode ? 'STOP THE PARTY' : 'GO BRAT'}
              </button>
              
              <div className="flex flex-col items-end">
                <span className={`text-[10px] font-black uppercase mb-2 tracking-widest ${isBratMode ? 'text-[#8ace00]' : 'text-rose-300'}`}>Base Asset</span>
                <select value={base} onChange={e => setBase(e.target.value)} className={`px-5 py-2 rounded-2xl text-sm font-bold shadow-sm outline-none border-2 ${isBratMode ? 'bg-black text-[#8ace00] border-[#8ace00]' : 'bg-white border-rose-50 text-rose-400'}`}>
                  {SUPPORTED_CURRENCIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
          </div>
          
          <DateControls start={start} end={end} onSetStart={setStart} onSetEnd={setEnd} onPreset={handlePreset} isBratMode={isBratMode} />
          
          <div className="mt-8">
            <CurrencyGrid 
              selected={visible} 
              onToggle={(c: string) => setVisible(v => v.includes(c) ? v.filter(x => x !== c) : [...v, c])} 
              base={base} 
              getColor={getColor} 
              chartData={chartData} 
              isBratMode={isBratMode} 
            />
          </div>
        </header>

        <div className={isBratMode ? 'animate-brat-glitch' : ''}>
          <PerformanceChart 
            chartData={chartData} 
            visible={visible} 
            yDomain={yDomain} 
            getColor={isBratMode ? () => '#8ace00' : getColor} 
            isBratMode={isBratMode} 
          />
        </div>
        
        <BoutiqueFooter isBratMode={isBratMode} />
      </div>
    </main>
  );
}