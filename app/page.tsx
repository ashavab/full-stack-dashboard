'use client';
import { useState, useEffect } from 'react';
import { Wallet, ArrowUpRight, Activity } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', price: 62000 },
  { name: 'Tue', price: 64000 },
  { name: 'Wed', price: 63000 },
  { name: 'Thu', price: 67000 },
  { name: 'Fri', price: 66000 },
  { name: 'Sat', price: 69000 },
  { name: 'Sun', price: 71000 },
];

export default function Dashboard() {
  const [prices, setPrices] = useState({ btc: 0, eth: 0 });

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd');
        const json = await res.json();
        setPrices({ btc: json.bitcoin.usd, eth: json.ethereum.usd });
      } catch (error) {
        console.error("Failed to fetch prices:", error);
      }
    };
    fetchPrices();
  }, []);

  return (
    <main className="flex min-h-screen bg-gray-900 text-white">
      <aside className="w-64 border-r border-gray-800 p-6 hidden md:block">
        <h1 className="text-xl font-bold text-emerald-500 mb-10">SmartDash</h1>
        <nav className="space-y-4">
          <div className="text-gray-400 hover:text-white cursor-pointer">Overview</div>
          <div className="text-gray-400 hover:text-white cursor-pointer">Portfolio</div>
        </nav>
      </aside>

      <section className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold">Market Overview</h2>
          <button className="bg-emerald-600 px-4 py-2 rounded-lg font-medium hover:bg-emerald-500">Connect Wallet</button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-emerald-500/10 rounded-lg"><Wallet className="text-emerald-500" /></div>
              <span className="text-emerald-500 flex items-center text-sm"><ArrowUpRight size={16} /> +2.4%</span>
            </div>
            <p className="text-gray-400 text-sm">Bitcoin Price</p>
            <h3 className="text-2xl font-bold">${prices.btc.toLocaleString()}</h3>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-blue-500/10 rounded-lg"><Activity className="text-blue-500" /></div>
            </div>
            <p className="text-gray-400 text-sm">Ethereum Price</p>
            <h3 className="text-2xl font-bold">${prices.eth.toLocaleString()}</h3>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <p className="text-gray-400 text-sm">Market Status</p>
            <h3 className="text-xl font-bold text-emerald-400 mt-4">Live Updates Active</h3>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 h-[400px]">
          <h3 className="text-lg font-medium mb-6">Price Performance (7D)</h3>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
              <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis hide domain={['auto', 'auto']} />
              <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }} />
              <Area type="monotone" dataKey="price" stroke="#10b981" fillOpacity={1} fill="url(#colorPrice)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>
    </main>
  );
}