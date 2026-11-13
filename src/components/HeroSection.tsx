import React, { useState, useRef } from 'react';
import { Sparkles, Orbit, ArrowRight, ArrowLeft, RefreshCw, Star, Layers } from 'lucide-react';
import { Language, SiteStatistics } from '../types/cosmic';
import { translations } from '../i18n/translations';
import { HeroParticles } from './HeroParticles';

interface HeroSectionProps {
  language: Language;
  stats: SiteStatistics;
  onExplore: () => void;
  onLaunchVirtual: () => void;
  onSelectCategory: (cat: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  language,
  stats,
  onExplore,
  onLaunchVirtual,
  onSelectCategory,
}) => {
  const t = translations[language];
  const isRtl = language === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;
  const heroContainerRef = useRef<HTMLElement | null>(null);

  const cosmicFacts = [
    {
      ar: 'يحتوي الكون المنظور على ما يقارب 2 تريليون مجرة، وتحتوي مجرتنا درب التبانة وحدها على أكثر من 100 مليار نجم!',
      en: 'The observable universe harbors an estimated 2 trillion galaxies; our Milky Way alone contains over 100 billion stars!',
      fr: 'L’univers observable compte environ 2 billions de galaxies ; notre Voie Lactée abrite à elle seule plus de 100 milliards d’étoiles !'
    },
    {
      ar: 'الضوء المنبعث من مجرة أندروميدا يستغرق 2.5 مليون سنة ليصل إلى أعيننا عندما ننظر إلى السماء ليلاً.',
      en: 'Photons arriving from the Andromeda Galaxy departed 2.5 million years ago before reaching your gaze tonight.',
      fr: 'La lumière émise par la galaxie d’Andromède a voyagé pendant 2,5 millions d’années avant d’atteindre nos yeux.'
    },
    {
      ar: 'كل ذرة حديد في دمائنا وكوكبنا وُلدت في قلب نجم عملاق انفجر كمستعر أعظم (Supernova) ونزل إلى الأرض.',
      en: 'Every atom of iron coursing through your hemoglobin was forged in the core of a massive dying star that exploded into space.',
      fr: 'Chaque atome de fer dans notre sang provient du cœur d’une étoile géante qui a explosé en supernova.'
    }
  ];

  const [factIndex, setFactIndex] = useState(0);

  const nextFact = () => {
    setFactIndex((prev) => (prev + 1) % cosmicFacts.length);
  };

  const categories = [
    { id: 'galaxies', label: t.sections.galaxies, icon: '🌌' },
    { id: 'stars', label: t.sections.stars, icon: '⭐' },
    { id: 'solar-system', label: t.sections['solar-system'], icon: '🪐' },
    { id: 'black-holes', label: t.sections['black-holes'], icon: '🕳️' },
    { id: 'nebulae', label: t.sections.nebulae, icon: '✨' },
    { id: 'cosmology-origin', label: t.sections['cosmology-origin'], icon: '💥' },
    { id: 'quran-cosmos', label: t.sections['quran-cosmos'], icon: '📖' },
    { id: 'discoveries', label: t.sections.discoveries, icon: '🔭' },
  ];

  return (
    <section
      ref={heroContainerRef}
      className="relative overflow-hidden rounded-3xl pt-12 pb-20 px-4 sm:px-6 lg:px-8"
    >
      {/* Interactive Mouse-Reactive Cosmic Particle System */}
      <HeroParticles containerRef={heroContainerRef} />

      {/* Glow Backdrop */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-cyan-600/20 via-indigo-600/20 to-purple-600/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 text-center">
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs sm:text-sm font-semibold shadow-lg shadow-cyan-950/50 mb-8 backdrop-blur-md animate-fade-in">
          <Sparkles className="w-4 h-4 text-amber-300 animate-spin-slow" />
          <span>{t.heroBadge}</span>
        </div>

        {/* Main Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.25] text-white max-w-4xl mx-auto mb-6">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-sky-100 to-amber-200">
            {t.heroTitle}
          </span>
        </h1>

        {/* Subtitle / Description */}
        <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10">
          {t.heroDesc}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <button
            onClick={onExplore}
            className="flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-base shadow-xl shadow-cyan-600/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5 transition-all"
          >
            <span>{t.btnStartJourney}</span>
            <ArrowIcon className="w-4 h-4" />
          </button>

          <button
            onClick={onLaunchVirtual}
            className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-cyan-300 hover:text-white font-bold text-base border border-cyan-800/50 shadow-lg hover:-translate-y-0.5 transition-all backdrop-blur-md"
          >
            <Orbit className="w-5 h-5 text-cyan-400" />
            <span>{t.btnVirtualFlight}</span>
          </button>
        </div>

        {/* Interactive Cosmic Fact Card */}
        <div className="max-w-2xl mx-auto mb-16 p-5 rounded-2xl bg-gradient-to-b from-slate-900/90 to-[#080d1e]/90 border border-cyan-900/40 shadow-2xl backdrop-blur-xl text-start flex items-start gap-4">
          <div className="p-3 rounded-xl bg-cyan-950/80 border border-cyan-500/30 text-amber-300 shrink-0 mt-0.5">
            <Star className="w-5 h-5 fill-amber-300/30" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                {language === 'ar' ? 'معلومة فلكية ملهمة' : language === 'fr' ? 'Fait Astronomique du Jour' : 'Cosmic Fact of the Moment'}
              </span>
              <button
                onClick={nextFact}
                className="text-xs text-slate-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
                title="Next Fact"
              >
                <RefreshCw className="w-3 h-3" />
                <span>{language === 'ar' ? 'التالي' : language === 'fr' ? 'Suivant' : 'Next'}</span>
              </button>
            </div>
            <p className="text-sm text-slate-200 leading-relaxed">
              {cosmicFacts[factIndex][language]}
            </p>
          </div>
        </div>

        {/* Quick Category Grid */}
        <div className="mb-16">
          <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-6">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>{language === 'ar' ? 'المسارات الكونية الرئيسية' : language === 'fr' ? 'Voies Cosmiques Principales' : 'Key Cosmic Pathways'}</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800/80 hover:border-cyan-500/40 text-start text-xs sm:text-sm font-bold text-slate-200 hover:text-cyan-300 transition-all hover:scale-[1.02] shadow-sm"
              >
                <span className="text-xl">{cat.icon}</span>
                <span className="truncate">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Live Metrics Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto border-t border-slate-800/70 pt-8">
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <div className="text-2xl sm:text-3xl font-black text-cyan-300 mb-1">
              {stats.articlesCount}+
            </div>
            <div className="text-xs text-slate-400 font-medium">{t.statArticles}</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <div className="text-2xl sm:text-3xl font-black text-amber-300 mb-1">
              50+
            </div>
            <div className="text-xs text-slate-400 font-medium">{t.statVerses}</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <div className="text-2xl sm:text-3xl font-black text-indigo-300 mb-1">
              100%
            </div>
            <div className="text-xs text-slate-400 font-medium">{t.statAccuracy}</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <div className="text-2xl sm:text-3xl font-black text-emerald-400 mb-1">
              {stats.totalViews.toLocaleString()}+
            </div>
            <div className="text-xs text-slate-400 font-medium">{t.viewsCount}</div>
          </div>
        </div>
      </div>
    </section>
  );
};
