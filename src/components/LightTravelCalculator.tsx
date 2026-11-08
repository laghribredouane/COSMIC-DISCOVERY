import React, { useState } from 'react';
import { Zap, Clock, Compass, ArrowRight, ArrowLeft } from 'lucide-react';
import { Language } from '../types/cosmic';
import { calculateLightTravelTime } from '../utils/cosmicCalculations';
import { translations } from '../i18n/translations';

interface LightTravelCalculatorProps {
  language: Language;
}

interface Destination {
  id: string;
  name: { ar: string; en: string; fr: string };
  distanceKm: number;
  category: 'solar' | 'stellar' | 'galactic' | 'cosmic';
  icon: string;
}

export const LightTravelCalculator: React.FC<LightTravelCalculatorProps> = ({ language }) => {
  const t = translations[language];

  const destinations: Destination[] = [
    {
      id: 'moon',
      name: { ar: 'القمر (متوسط المسافة)', en: 'The Moon (Average Distance)', fr: 'La Lune (Distance Moyenne)' },
      distanceKm: 384400,
      category: 'solar',
      icon: '🌕'
    },
    {
      id: 'sun',
      name: { ar: 'الشمس (الوحدة الفلكية 1 AU)', en: 'The Sun (1 Astronomical Unit)', fr: 'Le Soleil (1 Unité Astronomique)' },
      distanceKm: 149597870,
      category: 'solar',
      icon: '☀️'
    },
    {
      id: 'mars-close',
      name: { ar: 'المريخ (أقرب اقتراب من الأرض)', en: 'Mars (Closest Approach)', fr: 'Mars (Au Plus Proche)' },
      distanceKm: 54600000,
      category: 'solar',
      icon: '🔴'
    },
    {
      id: 'jupiter',
      name: { ar: 'كوكب المشتري', en: 'Jupiter', fr: 'Jupiter' },
      distanceKm: 628730000,
      category: 'solar',
      icon: '🪐'
    },
    {
      id: 'voyager1',
      name: { ar: 'مسبار فوياجر 1 (أبعد منجز بشري)', en: 'Voyager 1 (Furthest Spacecraft)', fr: 'Voyager 1 (Sonde la plus lointaine)' },
      distanceKm: 24300000000,
      category: 'solar',
      icon: '🛰️'
    },
    {
      id: 'proxima',
      name: { ar: 'بروكسيما قنطورس (أقرب نجم لشمسنا)', en: 'Proxima Centauri (Nearest Star)', fr: 'Proxima du Centaure (Étoile la plus proche)' },
      distanceKm: 40170000000000, // ~4.246 ly
      category: 'stellar',
      icon: '⭐'
    },
    {
      id: 'orion',
      name: { ar: 'سديم الجبار (Orion Nebula M42)', en: 'Orion Nebula (M42)', fr: 'Nébuleuse d’Orion (M42)' },
      distanceKm: 12690000000000000, // ~1,344 ly
      category: 'stellar',
      icon: '✨'
    },
    {
      id: 'sag-a',
      name: { ar: 'مركز درب التبانة (Sagittarius A*)', en: 'Galactic Center (Sagittarius A*)', fr: 'Centre Galactique (Sagittarius A*)' },
      distanceKm: 251600000000000000, // ~26,600 ly
      category: 'galactic',
      icon: '🕳️'
    },
    {
      id: 'andromeda',
      name: { ar: 'مجرة أندروميدا (المرأة المسلسلة)', en: 'Andromeda Galaxy (M31)', fr: 'Galaxie d’Andromède (M31)' },
      distanceKm: 24000000000000000000, // ~2.537 M ly
      category: 'cosmic',
      icon: '🌌'
    }
  ];

  const [selectedDestId, setSelectedDestId] = useState<string>('sun');

  const selectedDest = destinations.find((d) => d.id === selectedDestId) || destinations[1];
  const travelTime = calculateLightTravelTime(selectedDest.distanceKm);

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900/90 to-[#080d22]/90 border border-cyan-800/40 shadow-2xl backdrop-blur-xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-2xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-300">
          <Zap className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white">{t.distanceCalcTitle}</h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-0.5">{t.distanceCalcDesc}</p>
        </div>
      </div>

      {/* Destination Selector Buttons */}
      <div className="mb-8">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
          {t.selectDestination}
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {destinations.map((dest) => (
            <button
              key={dest.id}
              onClick={() => setSelectedDestId(dest.id)}
              className={`p-3 rounded-xl border text-start flex flex-col gap-1 transition-all ${
                selectedDestId === dest.id
                  ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800/60 hover:text-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-lg">{dest.icon}</span>
                <span className="text-[10px] font-mono text-cyan-400 uppercase">{dest.category}</span>
              </div>
              <span className="text-xs font-bold truncate">
                {dest.name[language] || dest.name.ar}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Calculated Results Display */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 rounded-2xl bg-slate-950/60 border border-slate-800/80 mb-6">
        <div>
          <span className="text-xs text-slate-400 block mb-1">{t.distanceInKm}</span>
          <div className="text-xl sm:text-2xl font-black text-cyan-300 font-mono">
            {selectedDest.distanceKm.toLocaleString()} <span className="text-xs font-normal text-slate-400">km</span>
          </div>
        </div>

        <div>
          <span className="text-xs text-slate-400 block mb-1">{t.lightTravelTime}</span>
          <div className="text-xl sm:text-2xl font-black text-amber-300 font-mono">
            {travelTime.formatted[language]}
          </div>
        </div>

        <div>
          <span className="text-xs text-slate-400 block mb-1">
            {language === 'ar' ? 'المقياس البشري' : 'Human Scale Perspective'}
          </span>
          <div className="text-sm text-slate-300 leading-snug">
            {travelTime.seconds < 60 ? (
              <span>⚡ {language === 'ar' ? 'وصول شبه لحظي بسرعة 300 ألف كم/ثانية' : 'Near-instantaneous transmission at 300,000 km/s'}</span>
            ) : travelTime.seconds < 3600 * 24 ? (
              <span>🛰️ {language === 'ar' ? 'يتطلب تأخيراً ملموساً في إشارات اللاسلكي والمسبارات' : 'Requires noticeable radio relay delay for deep probes'}</span>
            ) : (
              <span>🌌 {language === 'ar' ? 'يسافر الضوء لسنوات طويلة عبر سكون الفراغ النجمي' : 'Light journeys across interstellar gulfs for centuries or millennia'}</span>
            )}
          </div>
        </div>
      </div>

      {/* Light Transit Visual Bar */}
      <div className="relative h-3 rounded-full bg-slate-800 overflow-hidden">
        <div className="absolute inset-y-0 start-0 bg-gradient-to-r from-cyan-400 via-amber-300 to-indigo-400 rounded-full animate-pulse-slow w-full" />
      </div>
    </div>
  );
};
