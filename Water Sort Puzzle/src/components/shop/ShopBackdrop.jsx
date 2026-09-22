import React from 'react';

/**
 * Decorative 3D shop scene layer: perspective floor grid,
 * floating coins, gems and sparkles. Purely visual — never
 * intercepts input and sits behind the shop content.
 */

const COINS = [
  { style: { top: '11%', left: '5%', width: 26, height: 26 }, dur: 6.5, delay: 0 },
  { style: { top: '27%', right: '4%', width: 20, height: 20 }, dur: 7.6, delay: 1.1 },
  { style: { top: '48%', left: '2%', width: 18, height: 18 }, dur: 8.2, delay: 0.5 },
  { style: { top: '66%', right: '3%', width: 24, height: 24 }, dur: 6.9, delay: 1.7 },
  { style: { top: '86%', left: '6%', width: 20, height: 20 }, dur: 7.9, delay: 0.9 },
];

const GEMS = [
  { cls: 'gem-violet', style: { top: '20%', left: '13%', width: 15, height: 15 }, dur: 7.4, delay: 0.3 },
  { cls: 'gem-emerald', style: { top: '42%', right: '9%', width: 13, height: 13 }, dur: 8.6, delay: 1.4 },
  { cls: 'gem-rose', style: { top: '78%', right: '12%', width: 14, height: 14 }, dur: 7.7, delay: 0.8 },
  { cls: 'gem-blue', style: { top: '92%', left: '14%', width: 12, height: 12 }, dur: 8.9, delay: 2.0 },
];

const SPARKS = [
  { style: { top: '16%', right: '16%', width: 10, height: 10 }, dur: 4.2, delay: 0.2 },
  { style: { top: '36%', left: '8%', width: 8, height: 8 }, dur: 5.1, delay: 1.6 },
  { style: { top: '58%', right: '6%', width: 9, height: 9 }, dur: 4.6, delay: 0.9 },
  { style: { top: '74%', left: '4%', width: 8, height: 8 }, dur: 5.4, delay: 2.2 },
  { style: { top: '88%', right: '20%', width: 10, height: 10 }, dur: 4.9, delay: 1.2 },
];

export const ShopBackdrop = () => (
  <div className="shop-backdrop" aria-hidden="true">
    <span className="shop-blob blob-violet" style={{ top: '-60px', left: '-50px', width: 210, height: 210 }} />
    <span className="shop-blob blob-cyan" style={{ top: '30%', right: '-70px', width: 190, height: 190 }} />
    <span className="shop-blob blob-pink" style={{ bottom: '4%', left: '-60px', width: 200, height: 200 }} />
    <div className="shop-floor" />
    {COINS.map((c, i) => (
      <span
        key={`coin-${i}`}
        className="shop-fx-coin"
        style={{ ...c.style, animationDuration: `${c.dur}s`, animationDelay: `${c.delay}s` }}
      />
    ))}
    {GEMS.map((g, i) => (
      <span
        key={`gem-${i}`}
        className={`shop-fx-gem ${g.cls}`}
        style={{ ...g.style, animationDuration: `${g.dur}s`, animationDelay: `${g.delay}s` }}
      />
    ))}
    {SPARKS.map((s, i) => (
      <span
        key={`spark-${i}`}
        className="shop-fx-spark"
        style={{ ...s.style, animationDuration: `${s.dur}s`, animationDelay: `${s.delay}s` }}
      />
    ))}
  </div>
);

export default ShopBackdrop;
