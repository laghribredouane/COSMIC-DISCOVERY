import React, { useState, useMemo } from 'react';
import { Sparkles, Eye, BookOpen, Compass, Search, Info, RotateCcw, ZoomIn, ZoomOut, Check } from 'lucide-react';
import { Constellation, Language } from '../types/cosmic';
import { initialConstellations } from '../data/cosmicData';
import { searchConstellationsList } from '../utils/cosmicCalculations';

interface SkyMapProps {
  language: Language;
}

export const SkyMap: React.FC<SkyMapProps> = ({ language }) => {
  const [selectedConstellationId, setSelectedConstellationId] = useState<string>('orion');
  const [selectedSeason, setSelectedSeason] = useState<string>('all');
  const [showLines, setShowLines] = useState<boolean>(true);
  const [showLabels, setShowLabels] = useState<boolean>(true);
  const [showGrid, setShowGrid] = useState<boolean>(true);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeStarId, setActiveStarId] = useState<string | null>(null);

  const filteredConstellations = useMemo(() => {
    let list = initialConstellations;
    if (selectedSeason !== 'all') {
      list = list.filter((c) => c.season === selectedSeason);
    }
    return searchConstellationsList(list, searchQuery, language);
  }, [selectedSeason, searchQuery, language]);

  const activeConstellation = useMemo(() => {
    return (
      initialConstellations.find((c) => c.id === selectedConstellationId) ||
      initialConstellations[0]
    );
  }, [selectedConstellationId]);

  const activeStar = useMemo(() => {
    if (!activeStarId || !activeConstellation) return null;
    return activeConstellation.stars.find((s) => s.id === activeStarId) || null;
  }, [activeStarId, activeConstellation]);

  const seasons = [
    { id: 'all', label: { ar: 'كافة الفصول', en: 'All Seasons', fr: 'Toutes Saisons' } },
    { id: 'winter', label: { ar: 'سماء الشتاء', en: 'Winter Sky', fr: 'Ciel d’Hiver' } },
    { id: 'spring', label: { ar: 'سماء الربيع', en: 'Spring Sky', fr: 'Ciel de Printemps' } },
    { id: 'summer', label: { ar: 'سماء الصيف', en: 'Summer Sky', fr: 'Ciel d’Été' } },
    { id: 'autumn', label: { ar: 'سماء الخريف', en: 'Autumn Sky', fr: 'Ciel d’Automne' } },
  ];

  const texts = {
    ar: {
      title: 'خريطة السماء التفاعلية والأبراج الفلكية',
      subtitle: 'استكشف صور الكواكب الثابتة ونجومها كما وثقها عبد الرحمن الصوفي مع ربطها بالبيانات الفيزيائية الحديثة والآيات القرآنية الكريمة',
      alSufiBook: 'توثيق عبد الرحمن الصوفي (كتاب صور الكواكب الثابتة 964م)',
      astronomicalData: 'البيانات الفلكية الحديثة',
      quranicReflection: 'التأمل القرآني الموثق',
      brightestStar: 'ألمع نجم في الكوكبة',
      apparentMagnitude: 'القدر الظاهري',
      distance: 'المسافة',
      lightYears: 'سنة ضوئية',
      spectralType: 'النوع الطيفي',
      deepSkyObjects: 'أجرام السماء العميقة المرافقة',
      bestMonth: 'أفضل توقيت للرصد',
      searchPlaceholder: 'ابحث عن كوكبة (الجبار، الكلب الأكبر، الدب الأكبر...)...',
      toggleLines: 'خطوط التوصيل',
      toggleLabels: 'أسماء النجوم',
      toggleGrid: 'شبكة الإحداثيات',
      resetView: 'إعادة ضبط',
      classicalArabicName: 'الاسم العربي التراثي عند الفلكيين المسلمين',
      clickStarToInspect: 'انقر على أي نجم في الخريطة لمعاينة إحداثياته وقدره النجمي',
    },
    en: {
      title: 'Interactive Sky Map & Constellations',
      subtitle: 'Explore classical constellations documented by Abd al-Rahman al-Sufi with modern astrophysics and authentic Quranic reflections',
      alSufiBook: 'Al-Sufi’s Documentation (Book of Fixed Stars 964 CE)',
      astronomicalData: 'Modern Astrophysical Telemetry',
      quranicReflection: 'Documented Quranic Reflection',
      brightestStar: 'Brightest Star',
      apparentMagnitude: 'Apparent Magnitude',
      distance: 'Distance',
      lightYears: 'light-years',
      spectralType: 'Spectral Type',
      deepSkyObjects: 'Associated Deep Sky Objects',
      bestMonth: 'Best Observation Period',
      searchPlaceholder: 'Search constellation (Orion, Ursa Major, Sirius...)...',
      toggleLines: 'Constellation Lines',
      toggleLabels: 'Star Labels',
      toggleGrid: 'Coordinate Grid',
      resetView: 'Reset View',
      classicalArabicName: 'Classical Arabic Astronomical Heritage',
      clickStarToInspect: 'Click any star to inspect its celestial magnitude and coordinates',
    },
    fr: {
      title: 'Carte Interactive du Ciel & Constellations',
      subtitle: 'Explorez les constellations historiques documentées par Al-Soufi, les données astrophysiques et les méditations coraniques',
      alSufiBook: 'Documentation d’Al-Soufi (Livre des Étoiles Fixes 964)',
      astronomicalData: 'Télémétrie Astrophysique Moderne',
      quranicReflection: 'Méditation Coranique Documentée',
      brightestStar: 'Étoile la Plus Brillante',
      apparentMagnitude: 'Magnitude Apparente',
      distance: 'Distance',
      lightYears: 'années-lumière',
      spectralType: 'Type Spectral',
      deepSkyObjects: 'Objets du Ciel Profond Associés',
      bestMonth: 'Meilleure Période d’Observation',
      searchPlaceholder: 'Rechercher une constellation (Orion, Grande Ourse...)...',
      toggleLines: 'Lignes de Constellation',
      toggleLabels: 'Noms des Étoiles',
      toggleGrid: 'Grille Céleste',
      resetView: 'Réinitialiser',
      classicalArabicName: 'Patrimoine Astronomique Arabe Classique',
      clickStarToInspect: 'Cliquez sur une étoile pour inspecter sa magnitude et ses coordonnées',
    },
  };

  const t = texts[language] || texts.en;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-cyan-500/25 bg-gradient-to-br from-[#070b1a] via-[#09142f] to-[#040814] p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 end-0 -mt-8 -me-8 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-xs font-semibold text-cyan-300">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>{t.alSufiBook}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-amber-200">
              {t.title}
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              {t.subtitle}
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center gap-3 bg-slate-900/80 border border-cyan-800/40 rounded-2xl p-4 self-start md:self-center">
            <Compass className="w-8 h-8 text-cyan-400 flex-shrink-0" />
            <div>
              <div className="text-xs text-slate-400">
                {language === 'ar' ? 'الكوكبة المعروضة' : language === 'fr' ? 'Constellation Active' : 'Active Constellation'}
              </div>
              <div className="text-base font-bold text-white">
                {activeConstellation.name[language]}
              </div>
              <div className="text-xs text-amber-300 font-medium">
                {activeConstellation.arabicClassicalName}
              </div>
            </div>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="mt-6 pt-6 border-t border-cyan-950/60 flex flex-wrap items-center justify-between gap-4">
          {/* Season Pills */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {seasons.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedSeason(s.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedSeason === s.id
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'bg-slate-800/70 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/50'
                }`}
              >
                {s.label[language]}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[220px] max-w-xs flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute start-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full bg-slate-900/90 border border-cyan-900/40 rounded-xl ps-9 pe-4 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>
      </div>

      {/* Main Sky Map Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Sky Canvas / Interactive Map (Left/Center: 8 cols) */}
        <div className="lg:col-span-8 bg-[#030611] rounded-3xl border border-cyan-900/35 overflow-hidden shadow-2xl relative flex flex-col">
          {/* Map Controls Header */}
          <div className="p-3.5 bg-slate-900/80 border-b border-cyan-900/30 flex flex-wrap items-center justify-between gap-2 z-20">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-cyan-400" />
                {activeConstellation.name[language]} ({activeConstellation.abbreviation})
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800/40">
                {activeConstellation.starsCount} {language === 'ar' ? 'نجماً رئيسياً' : 'Major Stars'}
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-xs">
              <button
                onClick={() => setShowLines(!showLines)}
                className={`px-2.5 py-1 rounded-lg border text-[11px] font-semibold transition-colors ${
                  showLines
                    ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300'
                    : 'bg-slate-800/50 border-slate-700 text-slate-400'
                }`}
              >
                {t.toggleLines}
              </button>
              <button
                onClick={() => setShowLabels(!showLabels)}
                className={`px-2.5 py-1 rounded-lg border text-[11px] font-semibold transition-colors ${
                  showLabels
                    ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300'
                    : 'bg-slate-800/50 border-slate-700 text-slate-400'
                }`}
              >
                {t.toggleLabels}
              </button>
              <button
                onClick={() => setShowGrid(!showGrid)}
                className={`px-2.5 py-1 rounded-lg border text-[11px] font-semibold transition-colors ${
                  showGrid
                    ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300'
                    : 'bg-slate-800/50 border-slate-700 text-slate-400'
                }`}
              >
                {t.toggleGrid}
              </button>

              <div className="h-4 w-[1px] bg-slate-700 mx-1" />

              <button
                onClick={() => setZoomLevel((z) => Math.min(z + 0.2, 1.8))}
                className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                aria-label="Zoom in"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setZoomLevel((z) => Math.max(z - 0.2, 0.8))}
                className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                aria-label="Zoom out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => {
                  setZoomLevel(1);
                  setActiveStarId(null);
                }}
                className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                aria-label="Reset zoom"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* SVG Sky Chart Area */}
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] overflow-hidden bg-radial from-[#0a1228] via-[#050815] to-[#010309] flex items-center justify-center p-4">
            {/* Background Cosmic Starfield Noise */}
            <div className="absolute inset-0 opacity-40 pointer-events-none">
              <svg width="100%" height="100%">
                <pattern id="starfield" width="80" height="80" patternUnits="userSpaceOnUse">
                  <circle cx="12" cy="18" r="0.7" fill="#ffffff" opacity="0.5" />
                  <circle cx="45" cy="65" r="0.5" fill="#a5f3fc" opacity="0.4" />
                  <circle cx="70" cy="22" r="0.9" fill="#fef08a" opacity="0.6" />
                  <circle cx="30" cy="50" r="0.4" fill="#ffffff" opacity="0.3" />
                  <circle cx="60" cy="75" r="0.8" fill="#93c5fd" opacity="0.5" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#starfield)" />
              </svg>
            </div>

            {/* Interactive SVG Chart */}
            <svg
              viewBox="0 0 1000 700"
              className="w-full h-full transition-transform duration-300 ease-out select-none cursor-crosshair"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              <defs>
                <radialGradient id="starGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
                  <stop offset="40%" stopColor="#0284c7" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#0369a1" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="brightRedGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#f87171" stopOpacity="1" />
                  <stop offset="40%" stopColor="#ef4444" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#b91c1c" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="siriusGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                  <stop offset="30%" stopColor="#bae6fd" stopOpacity="0.8" />
                  <stop offset="70%" stopColor="#38bdf8" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Celestial Coordinate Grid Lines */}
              {showGrid && (
                <g className="text-cyan-900/30 stroke-current" strokeWidth="1" strokeDasharray="3,6">
                  {/* Right Ascension vertical arcs */}
                  <line x1="200" y1="50" x2="200" y2="650" />
                  <line x1="400" y1="50" x2="400" y2="650" />
                  <line x1="600" y1="50" x2="600" y2="650" />
                  <line x1="800" y1="50" x2="800" y2="650" />
                  {/* Declination horizontal rings */}
                  <line x1="50" y1="150" x2="950" y2="150" />
                  <line x1="50" y1="350" x2="950" y2="350" />
                  <line x1="50" y1="550" x2="950" y2="550" />
                  {/* Celestial Equator Highlight */}
                  <line x1="50" y1="350" x2="950" y2="350" stroke="#0ea5e9" strokeOpacity="0.4" strokeWidth="1.5" strokeDasharray="6,6" />
                  <text x="70" y="342" fill="#38bdf8" fontSize="11" opacity="0.6">
                    Equator 0°
                  </text>
                  <text x="70" y="142" fill="#38bdf8" fontSize="11" opacity="0.4">
                    +30° Dec
                  </text>
                  <text x="70" y="542" fill="#38bdf8" fontSize="11" opacity="0.4">
                    -30° Dec
                  </text>
                </g>
              )}

              {/* Constellation Connecting Lines */}
              {showLines && (
                <g className="transition-all duration-500">
                  {activeConstellation.lines.map(([i1, i2], idx) => {
                    const s1 = activeConstellation.stars[i1];
                    const s2 = activeConstellation.stars[i2];
                    if (!s1 || !s2) return null;
                    const x1 = (s1.x / 100) * 800 + 100;
                    const y1 = (s1.y / 100) * 500 + 100;
                    const x2 = (s2.x / 100) * 800 + 100;
                    const y2 = (s2.y / 100) * 500 + 100;
                    return (
                      <line
                        key={`line-${idx}`}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke="#38bdf8"
                        strokeOpacity="0.4"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                    );
                  })}
                </g>
              )}

              {/* Constellation Stars */}
              {activeConstellation.stars.map((star) => {
                const cx = (star.x / 100) * 800 + 100;
                const cy = (star.y / 100) * 500 + 100;
                const isSelected = activeStarId === star.id;
                // Brighter stars have lower magnitude, size dynamically
                const radius = Math.max(3.5, 9.5 - star.mag * 2.2);
                const isRedGiant = star.spectralType?.startsWith('M') || star.name.en === 'Betelgeuse' || star.name.en === 'Aldebaran';
                const isSirius = star.name.en === 'Sirius';

                return (
                  <g
                    key={star.id}
                    onClick={() => setActiveStarId(star.id)}
                    className="cursor-pointer group"
                  >
                    {/* Outer Glow Halo */}
                    <circle
                      cx={cx}
                      cy={cy}
                      r={radius * (isSelected ? 3.8 : 2.5)}
                      fill={
                        isSirius
                          ? 'url(#siriusGlow)'
                          : isRedGiant
                          ? 'url(#brightRedGlow)'
                          : 'url(#starGlow)'
                      }
                      opacity={isSelected ? 0.9 : 0.6}
                      className="transition-all duration-200"
                    />

                    {/* Star Core Dot */}
                    <circle
                      cx={cx}
                      cy={cy}
                      r={radius}
                      fill={isRedGiant ? '#fca5a5' : '#ffffff'}
                      stroke={isSelected ? '#38bdf8' : isRedGiant ? '#ef4444' : '#7dd3fc'}
                      strokeWidth={isSelected ? 2.5 : 1.2}
                      className="transition-all duration-150 group-hover:scale-125"
                    />

                    {/* Star Label */}
                    {showLabels && (
                      <text
                        x={cx + radius + 6}
                        y={cy + 4}
                        fill={isSelected ? '#38bdf8' : '#e2e8f0'}
                        fontSize="12"
                        fontWeight={isSelected ? 'bold' : 'normal'}
                        className="select-none pointer-events-none drop-shadow-md"
                      >
                        {star.name[language]}
                        {isSelected && ` (Mag ${star.mag})`}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Bottom Tip Overlay */}
            <div className="absolute bottom-3 start-4 end-4 flex items-center justify-between text-[11px] text-slate-400 bg-slate-950/70 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-slate-800/60 pointer-events-none">
              <span className="flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-cyan-400" />
                {t.clickStarToInspect}
              </span>
              <span className="text-amber-400 font-medium">
                {activeConstellation.season.toUpperCase()} SKY
              </span>
            </div>
          </div>

          {/* Active Star Floating Info Bar (if selected) */}
          {activeStar && (
            <div className="p-4 bg-slate-900/90 border-t border-cyan-800/40 flex flex-wrap items-center justify-between gap-4 animate-in slide-in-from-bottom-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-cyan-950 flex items-center justify-center border border-cyan-600/40 text-cyan-300 font-bold text-xs">
                  ★
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    {activeStar.name[language]}
                    <span className="text-xs text-amber-300 font-normal">
                      {activeStar.name.ar}
                    </span>
                  </h4>
                  <p className="text-xs text-slate-400">
                    {t.apparentMagnitude}: <span className="text-cyan-300 font-semibold">{activeStar.mag}</span> |{' '}
                    {t.spectralType}: <span className="text-cyan-300 font-semibold">{activeStar.spectralType || 'A0V'}</span>
                  </p>
                </div>
              </div>

              <button
                onClick={() => setActiveStarId(null)}
                className="text-xs text-slate-400 hover:text-white px-2.5 py-1 rounded bg-slate-800"
              >
                {language === 'ar' ? 'إغلاق المعاينة' : 'Dismiss'}
              </button>
            </div>
          )}

          {/* Constellations Carousel Picker */}
          <div className="p-4 bg-slate-950/90 border-t border-cyan-950/60 flex items-center gap-2 overflow-x-auto">
            {filteredConstellations.map((c) => {
              const isSelected = c.id === activeConstellation.id;
              return (
                <button
                  key={c.id}
                  onClick={() => {
                    setSelectedConstellationId(c.id);
                    setActiveStarId(null);
                  }}
                  className={`flex-shrink-0 flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all border ${
                    isSelected
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-md shadow-cyan-500/10'
                      : 'bg-slate-900/70 text-slate-400 hover:text-slate-200 border-slate-800'
                  }`}
                >
                  <Sparkles className={`w-3.5 h-3.5 ${isSelected ? 'text-cyan-400' : 'text-slate-500'}`} />
                  <span>{c.name[language]}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Detailed Constellation & Quranic Study Drawer (Right: 4 cols) */}
        <div className="lg:col-span-4 space-y-5">
          {/* Constellation Core Bio */}
          <div className="bg-[#080d1e] rounded-3xl p-6 border border-cyan-900/35 shadow-xl space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">
                  {activeConstellation.abbreviation} • {activeConstellation.hemisphere.toUpperCase()}
                </span>
                <h3 className="text-xl font-black text-white mt-0.5">
                  {activeConstellation.name[language]}
                </h3>
              </div>
              <span className="px-3 py-1 rounded-xl bg-amber-950/50 border border-amber-600/40 text-amber-300 text-xs font-bold">
                {activeConstellation.arabicClassicalName}
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {activeConstellation.history[language]}
            </p>

            {/* Al-Sufi Commentary Box */}
            <div className="bg-slate-900/80 rounded-2xl p-4 border border-cyan-800/30 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-cyan-300">
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span>{t.alSufiBook}</span>
              </div>
              <p className="text-xs text-slate-300 italic leading-relaxed">
                "{activeConstellation.alSufiNote[language]}"
              </p>
            </div>

            {/* Brightest Star & Specs */}
            <div className="space-y-2.5 pt-2 border-t border-slate-800/80 text-xs">
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-400">{t.brightestStar}:</span>
                <span className="font-bold text-white">
                  {activeConstellation.brightestStar.name[language]} ({activeConstellation.brightestStar.arabicName})
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-400">{t.apparentMagnitude}:</span>
                <span className="font-semibold text-cyan-300">
                  {activeConstellation.brightestStar.magnitude}
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-400">{t.distance}:</span>
                <span className="font-semibold text-cyan-300">
                  {activeConstellation.brightestStar.distanceLy} {t.lightYears}
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-400">{t.bestMonth}:</span>
                <span className="font-semibold text-amber-300">
                  {activeConstellation.astronomicalData.bestMonth[language]}
                </span>
              </div>
            </div>

            {/* Deep Sky Objects Tags */}
            {activeConstellation.astronomicalData.deepSkyObjects.length > 0 && (
              <div className="pt-3 border-t border-slate-800/80 space-y-2">
                <span className="text-[11px] font-bold text-slate-400 block">
                  {t.deepSkyObjects}:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeConstellation.astronomicalData.deepSkyObjects.map((dso, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-slate-900 border border-cyan-900/50 text-[11px] text-cyan-300"
                    >
                      {dso}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Authentic Quranic Reflection Card (if present) */}
          {activeConstellation.quranicReflection && (
            <div className="bg-gradient-to-br from-[#0c1328] to-[#080d1e] rounded-3xl p-6 border border-amber-600/35 shadow-xl space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>{t.quranicReflection}</span>
              </div>

              {/* Quran Verse Callout */}
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-amber-500/20 text-center space-y-2">
                <p className="text-base sm:text-lg font-amiri text-amber-100 font-bold leading-loose">
                  « {activeConstellation.quranicReflection.verseText} »
                </p>
                <div className="text-[11px] font-medium text-amber-300/80">
                  [{activeConstellation.quranicReflection.surah[language]} - {language === 'ar' ? 'الآية' : 'Ayah'} {activeConstellation.quranicReflection.ayahNumber}]
                </div>
              </div>

              {/* Classical Tafsir */}
              <div className="space-y-1 text-xs">
                <div className="font-bold text-slate-300">
                  {language === 'ar' ? 'التفسير الشرعي المعتمد:' : language === 'fr' ? 'Exégèse Classique :' : 'Classical Tafsir:'}
                </div>
                <p className="text-slate-400 leading-relaxed italic">
                  {activeConstellation.quranicReflection.tafsirSummary[language]}
                </p>
              </div>

              {/* Respectful Contemplation */}
              <div className="space-y-1 pt-3 border-t border-slate-800 text-xs">
                <div className="font-bold text-cyan-300">
                  {language === 'ar' ? 'أوجه التأمل والتفكر:' : language === 'fr' ? 'Réflexion & Méditation :' : 'Reflective Insight:'}
                </div>
                <p className="text-slate-300 leading-relaxed">
                  {activeConstellation.quranicReflection.reflection[language]}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
