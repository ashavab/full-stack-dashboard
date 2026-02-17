import { useState, useEffect, useMemo } from 'react';

export const SUPPORTED_CURRENCIES = ['AUD', 'BGN', 'BRL', 'CAD', 'CHF', 'CNY', 'CZK', 'DKK', 'EUR', 'GBP', 'HKD', 'HUF', 'IDR', 'ILS', 'INR', 'ISK', 'JPY', 'KRW', 'MXN', 'MYR', 'NOK', 'NZD', 'PHP', 'PLN', 'RON', 'SEK', 'SGD', 'THB', 'TRY', 'USD', 'ZAR'].sort();

export function useForexData(base: string, start: string, end: string, visible: string[]) {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  const yDomain = useMemo(() => {
    if (chartData.length === 0) return [-5, 5];
    let values = chartData.flatMap(d => visible.map(v => d[v]).filter(val => val !== undefined));
    return [Math.floor(Math.min(...values, 0) - 5), Math.ceil(Math.max(...values, 0) + 5)];
  }, [chartData, visible]);

  useEffect(() => {
    const fetchData = async () => {
      if (!visible.length) { setChartData([]); return; }
      setLoading(true);
      try {
        const res = await fetch(`https://api.frankfurter.app/${start}..${end}?from=${base}&to=${visible.join(',')}`);
        const data = await res.json();
        const dates = Object.keys(data.rates);
        if (!dates.length) return;
        const firstRates = data.rates[dates[0]];
        const formatted = dates.map(date => {
          const entry: any = { name: new Date(date).toLocaleDateString('en-US', { month: 'short', year: '2-digit' }) };
          visible.forEach(c => entry[c] = parseFloat((((data.rates[date][c] / firstRates[c]) - 1) * 100).toFixed(2)));
          return entry;
        });
        setChartData(formatted.filter((_, i) => i % Math.max(1, Math.floor(formatted.length / 100)) === 0));
      } catch (e) { console.error(e); } finally { setLoading(false); }
    };
    fetchData();
  }, [base, start, end, visible]);

  return { chartData, loading, yDomain };
}