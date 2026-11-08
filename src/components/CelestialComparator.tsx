import React, { useState } from 'react';
import { Scale, ArrowRightLeft, Sparkles } from 'lucide-react';
import { Language, CelestialBody } from '../types/cosmic';
import { initialCelestialBodies } from '../data/cosmicData';
import { calculateCelestialRatio } from '../utils/cosmicCalculations';
import { translations } from '../i18n/translations';

interface CelestialComparatorProps {
  language: Language;
}

export const CelestialComparator: React.FC<CelestialComparatorProps> = ({ language }) => {
  const t = translations[language];

  // Additional titans for comparison
  const comparatorBodies: CelestialBody[] = [
    ...initialCelestialBodies,
    {
      id: 'stephenson',
      name: { ar: 'ستيفنسون 2-18 (أكبر نجم معروف)', en: 'Stephenson 2-18 (Largest Star)', fr: 'Stephenson 2-18 (Plus grande étoile)' },
      type: 'star',
      diameterKm: 2980000000, // ~2,150 solar radii
      surfaceTempCelsius: 3200,
      color: '#b91c1c',
      description: {
        ar: 'عملاق أحمر فائق هائل؛ حجمه يستوعب ما يقرب من 10 مليارات شمس!',
        en: 'A colossal red hypergiant capable of containing nearly 10 billion suns!',
        fr: 'Une hypergéante rouge colossale pouvant contenir près de 10 milliards de soleils !'
      },
      image: ''
    },
    {
      id: 'ton618-body',
      name: { ar: 'ثقب TON 618 (أعظم ثقب أسود)', en: 'TON 618 (Supermassive Black Hole)', fr: 'TON 618 (Trou noir géant)' },
      type: 'black-hole',
      diameterKm: 390000000000, // ~1300 AU
      color: '#4c1d95',
      description: {
        ar: 'أفق حدث ضخم يعادل قطره أكثر من 2,700 ضعف المسافة بين الأرض والشمس!',
        en: 'An event horizon diameter exceeding 2,700 times the distance from Earth to the Sun!',
        fr: 'Un horizon des événements de plus de 2 700 fois la distance Terre-Soleil !'
      },
      image: ''
    }
  ];

  const [bodyAId, setBodyAId] = useState<string>('earth');
  const [bodyBId, setBodyBId] = useState<string>('jupiter');

  const bodyA = comparatorBodies.find((b) => b.id === bodyAId) || comparatorBodies[3];
  const bodyB = comparatorBodies.find((b) => b.id === bodyBId) || comparatorBodies[5];

  const comparison = calculateCelestialRatio(bodyA.diameterKm, bodyB.diameterKm);

  // Compute visual relative circle sizes (bounded between 20px and 120px)
  const maxDiameter = Math.max(bodyA.diameterKm, bodyB.diameterKm);
  const sizeA = Math.max(20, Math.round((bodyA.diameterKm / maxDiameter) * 120));
  const sizeB = Math.max(20, Math.round((bodyB.diameterKm / maxDiameter) * 120));

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900/90 to-[#080d22]/90 border border-cyan-800/40 shadow-2xl backdrop-blur-xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-2xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-300">
          <Scale className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white">{t.comparatorTitle}</h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-0.5">{t.comparatorDesc}</p>
        </div>
      </div>

      {/* Selectors Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            {t.selectBodyA}
          </label>
          <select
            value={bodyAId}
            onChange={(e) => setBodyAId(e.target.value)}
            className="w-full p-3 rounded-xl bg-slate-950/80 border border-slate-700 text-white font-bold text-sm focus:border-cyan-400 focus:outline-none"
          >
            {comparatorBodies.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name[language] || b.name.ar} ({b.diameterKm.toLocaleString()} km)
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            {t.selectBodyB}
          </label>
          <select
            value={bodyBId}
            onChange={(e) => setBodyBId(e.target.value)}
            className="w-full p-3 rounded-xl bg-slate-950/80 border border-slate-700 text-white font-bold text-sm focus:border-cyan-400 focus:outline-none"
          >
            {comparatorBodies.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name[language] || b.name.ar} ({b.diameterKm.toLocaleString()} km)
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Side-by-Side Visual Stage */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 rounded-2xl bg-slate-950/60 border border-slate-800/80 items-center justify-items-center mb-6 min-h-[220px]">
        {/* Body A */}
        <div className="flex flex-col items-center gap-3">
          <div className="h-32 flex items-center justify-center">
            <div
              className="rounded-full shadow-2xl transition-all duration-500"
              style={{
                width: `${sizeA}px`,
                height: `${sizeA}px`,
                backgroundColor: bodyA.color,
                boxShadow: `0 0 25px ${bodyA.color}66`
              }}
            />
          </div>
          <span className="text-base font-black text-white">
            {bodyA.name[language] || bodyA.name.ar}
          </span>
          <span className="text-xs font-mono text-cyan-300">
            {bodyA.diameterKm.toLocaleString()} km
          </span>
        </div>

        {/* Body B */}
        <div className="flex flex-col items-center gap-3">
          <div className="h-32 flex items-center justify-center">
            <div
              className="rounded-full shadow-2xl transition-all duration-500"
              style={{
                width: `${sizeB}px`,
                height: `${sizeB}px`,
                backgroundColor: bodyB.color,
                boxShadow: `0 0 25px ${bodyB.color}66`
              }}
            />
          </div>
          <span className="text-base font-black text-white">
            {bodyB.name[language] || bodyB.name.ar}
          </span>
          <span className="text-xs font-mono text-amber-300">
            {bodyB.diameterKm.toLocaleString()} km
          </span>
        </div>
      </div>

      {/* Comparison Mathematical Verdict */}
      <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-300 shrink-0" />
          <span className="text-slate-200">
            {t.diameterComparison}{' '}
            <strong className="text-cyan-300 font-mono text-base">{comparison.ratioString}</strong>
          </span>
        </div>
        <div className="text-xs text-slate-300">
          {t.volumeComparison}{' '}
          <strong className="text-amber-300 font-mono text-sm">
            {comparison.volumeRatio >= 1
              ? `~${Math.round(comparison.volumeRatio).toLocaleString()}x`
              : `~1/${Math.round(1 / comparison.volumeRatio).toLocaleString()}x`}
          </strong>
        </div>
      </div>
    </div>
  );
};
