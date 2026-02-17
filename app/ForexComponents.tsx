'use client';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from 'recharts';
import { Heart, Calendar, ArrowRightLeft, Crown, TrendingDown } from 'lucide-react';
import { SUPPORTED_CURRENCIES } from './useForexData';

// THE BRAT AUDIO ENGINE
export const BratMusic = ({ isActive }: { isActive: boolean }) => (
  <audio 
    src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" 
    autoPlay loop muted={!isActive} className="hidden" 
  />
);

export const DateControls = ({ start, end, onSetStart, onSetEnd, onPreset, isBratMode }: any) => (
  <div className={`flex flex-wrap items-center gap-4 p-5 transition-all duration-300 ${isBratMode ? 'bg-black border-4 border-[#8ace00]' : 'bg-white/60 rounded-[2.5rem] border-2 border-rose-100 backdrop-blur-md shadow-sm'}`}>
    <div className={`flex gap-2 p-1.5 ${isBratMode ? 'bg-[#8ace00]' : 'bg-rose-50 rounded-2xl'}`}>
      {['1W', '1M', '1Y', 'MAX'].map(l => (
        <button key={l} onClick={() => onPreset(l)} className={`px-5 py-2 text-[11px] font-black uppercase tracking-widest transition-all ${isBratMode ? 'text-black hover:bg-black hover:text-[#8ace00]' : 'text-rose-400 hover:bg-rose-400 hover:text-white rounded-xl'}`}>
          {l}
        </button>
      ))}
    </div>
    <div className="flex items-center gap-3 ml-auto">
      <div className={`flex items-center gap-2 px-4 py-2 border-2 ${isBratMode ? 'bg-black border-[#8ace00] text-[#8ace00]' : 'bg-white border-rose-50 rounded-2xl shadow-inner'}`}>
        <Calendar size={14} className={isBratMode ? 'text-[#8ace00]' : 'text-rose-300'} />
        <input type="date" value={start} onChange={e => onSetStart(e.target.value)} className="bg-transparent text-xs font-bold outline-none" />
      </div>
      <ArrowRightLeft size={16} className={isBratMode ? 'text-[#8ace00]' : 'text-rose-200'} />
      <div className={`flex items-center gap-2 px-4 py-2 border-2 ${isBratMode ? 'bg-black border-[#8ace00] text-[#8ace00]' : 'bg-white border-rose-50 rounded-2xl shadow-inner'}`}>
        <input type="date" value={end} onChange={e => onSetEnd(e.target.value)} className="bg-transparent text-xs font-bold outline-none" />
      </div>
    </div>
  </div>
);

export const CurrencyGrid = ({ selected, onToggle, base, getColor, chartData = [], isBratMode }: any) => {
  const validData = [...chartData].reverse().find(entry => SUPPORTED_CURRENCIES.some(curr => entry[curr] !== 0)) || {};
  const sorted = [...SUPPORTED_CURRENCIES].filter(c => c !== base).sort((a, b) => (validData[b] || 0) - (validData[a] || 0));
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className={`p-4 border-4 flex items-center gap-4 transition-all ${isBratMode ? 'bg-[#8ace00] border-[#8ace00] text-black shadow-[8px_8px_0px_white]' : 'bg-white/80 rounded-[2rem] border-yellow-100 shadow-sm'}`}>
          <div className={isBratMode ? 'bg-black p-3' : 'bg-yellow-50 p-3 rounded-2xl'}><Crown className={isBratMode ? 'text-[#8ace00]' : 'text-yellow-500'} size={20} /></div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest">Market Queen</p>
            <p className="text-sm font-bold italic">{sorted[0]} (+{(validData[sorted[0]] || 0).toFixed(2)}%)</p>
          </div>
        </div>
        <div className={`p-4 border-4 flex items-center gap-4 transition-all ${isBratMode ? 'bg-black border-[#8ace00] text-[#8ace00]' : 'bg-white/80 rounded-[2rem] border-rose-100 shadow-sm'}`}>
          <div className={isBratMode ? 'bg-[#8ace00] p-3' : 'bg-rose-50 p-3 rounded-2xl'}><TrendingDown className={isBratMode ? 'text-black' : 'text-rose-400'} size={20} /></div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest">Biggest Dip</p>
            <p className="text-sm font-bold italic">{sorted[sorted.length-1]} ({(validData[sorted[sorted.length-1]] || 0).toFixed(2)}%)</p>
          </div>
        </div>
      </div>
      <div className={`flex flex-wrap gap-3 p-6 transition-all ${isBratMode ? 'bg-black border-4 border-[#8ace00]' : 'bg-white/40 rounded-[3rem] border-2 border-rose-50 shadow-inner'}`}>
        {sorted.map(c => (
          <button key={c} onClick={() => onToggle(c)} className={`px-5 py-2.5 font-black text-[11px] transition-all ${selected.includes(c) ? (isBratMode ? 'bg-[#8ace00] text-black scale-110 -rotate-2' : 'text-white shadow-lg scale-110 rounded-full') : (isBratMode ? 'text-[#8ace00] border-2 border-[#8ace00]' : 'bg-white border-2 border-rose-100 text-rose-300 rounded-full')}`} style={{ backgroundColor: selected.includes(c) && !isBratMode ? getColor(c) : '' }}>{c}</button>
        ))}
      </div>
    </div>
  );
};

export const PerformanceChart = ({ chartData = [], visible, yDomain, getColor, isBratMode }: any) => (
  <div className={`p-10 h-[650px] transition-all duration-700 ${isBratMode ? 'bg-black border-[10px] border-[#8ace00] shadow-[0_0_80px_rgba(138,206,0,0.15)]' : 'bg-white/80 rounded-[4rem] border-[3px] border-rose-100 shadow-xl'}`}>
    <ResponsiveContainer width="100%" height="90%">
      <LineChart data={chartData} margin={{ top: 20, right: 100, left: 40, bottom: 40 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={isBratMode ? "#8ace0022" : "#fce7f3"} vertical={false} />
        <XAxis dataKey="name" stroke={isBratMode ? "#8ace00" : "#fb7185"} fontSize={12} fontWeight={900} axisLine={false} tickLine={false} />
        <YAxis stroke={isBratMode ? "#8ace00" : "#fb7185"} fontSize={12} fontWeight={900} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} domain={yDomain} />
        <Tooltip contentStyle={{ backgroundColor: isBratMode ? '#8ace00' : 'white', border: 'none', color: 'black', fontWeight: 'black' }} />
        {visible.map((curr: string) => (
          <Line key={curr} type="stepAfter" dataKey={curr} stroke={isBratMode ? "#8ace00" : getColor(curr)} strokeWidth={isBratMode ? 2 : 5} dot={false}>
            <LabelList dataKey={curr} position="right" content={(p: any) => p.index === (chartData?.length - 1) && <text x={p.x} y={p.y} fill={isBratMode ? "#8ace00" : getColor(curr)} fontSize={14} fontWeight={900} dx={15}>{curr}</text>} />
          </Line>
        ))}
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export const BoutiqueFooter = ({ isBratMode }: any) => (
  <footer className="mt-20 pb-12 text-center">
    {isBratMode ? (
      <div className="space-y-4">
        <p className="text-7xl font-black tracking-tighter text-[#8ace00] uppercase blur-[0.5px] leading-none animate-pulse">bumpin' it</p>
        <p className="text-[10px] font-bold bg-[#8ace00] text-black inline-block px-4 py-1 tracking-widest">365 MARKET GIRL</p>
      </div>
    ) : (
      <>
        <div className="flex justify-center items-center gap-6 text-[10px] font-black uppercase tracking-[0.5em] text-rose-300/60">
          <span>Live Feed</span><span className="w-1 h-1 rounded-full bg-rose-200" /><span>Chic Analysis</span>
        </div>
        <p className="text-[11px] mt-4 font-medium italic text-rose-400/30 tracking-widest">Designed for high-fidelity markets & sophisticated dolls</p>
        <Heart size={16} className="mx-auto mt-6 text-rose-400 opacity-20" />
      </>
    )}
  </footer>
);