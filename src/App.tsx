/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Language, CosmicCategory, ScientificArticle, SiteStatistics } from './types/cosmic';
import { initialArticles, initialQuranStudies, initialCelestialBodies, initialStats } from './data/cosmicData';
import { CosmicStarfield } from './components/CosmicStarfield';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { EncyclopediaSection } from './components/EncyclopediaSection';
import { VirtualSolarSystem } from './components/VirtualSolarSystem';
import { CosmicScaleExplorer } from './components/CosmicScaleExplorer';
import { LightTravelCalculator } from './components/LightTravelCalculator';
import { CelestialComparator } from './components/CelestialComparator';
import { QuranCosmosSection } from './components/QuranCosmosSection';
import { SpaceGallery } from './components/SpaceGallery';
import { AiCosmicLab } from './components/AiCosmicLab';
import { CosmicQuiz } from './components/CosmicQuiz';
import { AdminDashboard } from './components/AdminDashboard';
import { SkyMap } from './components/SkyMap';
import { LiveSpaceFeeds } from './components/LiveSpaceFeeds';
import { CelestialEvents } from './components/CelestialEvents';
import { CosmicPrayerTimes } from './components/CosmicPrayerTimes';
import { CosmicHadithOfTheDay } from './components/CosmicHadithOfTheDay';
import { CosmicObservatoriesMap } from './components/CosmicObservatoriesMap';
import { KaheelPartnerAds } from './components/KaheelPartnerAds';
import { GoogleAdUnit } from './components/GoogleAdUnit';
import { Footer } from './components/Footer';
import { ArticleModal } from './components/ArticleModal';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { translations } from './i18n/translations';
import { Sparkles, ArrowRight, ArrowLeft, Telescope, Orbit, Layers, BookOpen, Radio, Calendar, Compass, Box, MapPin } from 'lucide-react';

export default function App() {
  const [language, setLanguage] = useState<Language>('ar');
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [articles, setArticles] = useState<ScientificArticle[]>(initialArticles);
  const [stats, setStats] = useState<SiteStatistics>(initialStats);
  const [selectedCategory, setSelectedCategory] = useState<CosmicCategory | 'all'>('all');
  const [activeArticleModal, setActiveArticleModal] = useState<ScientificArticle | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showAllHomeArticles, setShowAllHomeArticles] = useState(false);
  const [quotaExceeded, setQuotaExceeded] = useState(false);
  const [virtualSubTab, setVirtualSubTab] = useState<'all' | 'solar-system' | 'scale' | 'light-calc' | 'comparator'>('all');

  const t = translations[language];
  const isRtl = language === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  // Google Maps Platform Tier 1 / Tier 2 quota defense listener
  useEffect(() => {
    const handleQuota = () => setQuotaExceeded(true);
    window.addEventListener('gmp-quota-exceeded', handleQuota);
    return () => window.removeEventListener('gmp-quota-exceeded', handleQuota);
  }, []);

  // Check URL query parameters on load to open shared article if present
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const sharedArticleId = params.get('article');
    if (sharedArticleId) {
      const target = articles.find((a) => a.id === sharedArticleId);
      if (target) {
        setActiveArticleModal(target);
      }
    }
  }, [articles]);

  // Keep URL query parameter synchronized with active article modal
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const url = new URL(window.location.href);
      if (activeArticleModal) {
        url.searchParams.set('article', activeArticleModal.id);
      } else {
        url.searchParams.delete('article');
      }
      window.history.replaceState({}, '', url.toString());
    } catch {
      // Ignore URL state errors
    }
  }, [activeArticleModal]);

  const handleSelectCategory = (cat: string) => {
    setSelectedCategory(cat as any);
    if (cat === 'quran-cosmos' || cat === 'reflections') {
      setCurrentTab('quran-cosmos');
    } else if (cat === 'virtual-journeys' || cat === 'solar-system' || cat === 'cosmic-distances') {
      setCurrentTab('virtual-journeys');
    } else {
      setCurrentTab('encyclopedia');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLikeArticle = (id: string) => {
    setArticles((prev) =>
      prev.map((a) => (a.id === id ? { ...a, likes: a.likes + 1 } : a))
    );
  };

  const handleOpenArticle = (art: ScientificArticle) => {
    setActiveArticleModal(art);
    setArticles((prev) =>
      prev.map((a) => (a.id === art.id ? { ...a, views: a.views + 1 } : a))
    );
    setStats((prev) => ({ ...prev, totalViews: prev.totalViews + 1 }));
  };

  const handleSaveArticleDraft = (draft: Partial<ScientificArticle>) => {
    const fullArticle: ScientificArticle = {
      id: `draft-${Date.now()}`,
      title: draft.title || { ar: 'مسودة فلكية', en: 'Draft', fr: 'Brouillon' },
      category: draft.category || 'discoveries',
      summary: draft.summary || { ar: '', en: '', fr: '' },
      introduction: draft.introduction || draft.summary || { ar: '', en: '', fr: '' },
      contentSimple: draft.contentSimple || { ar: '', en: '', fr: '' },
      contentAdvanced: draft.contentAdvanced || { ar: '', en: '', fr: '' },
      keyFacts: draft.keyFacts || { ar: ['حقائق علمية معتمدة'], en: ['Verified facts'], fr: ['Faits vérifiés'] },
      specs: draft.specs || {},
      image: draft.image || 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=1600&auto=format&fit=crop',
      imageCaption: draft.imageCaption || { ar: 'صورة توضيحية', en: 'Illustration', fr: 'Illustration' },
      imageCredit: draft.imageCredit || 'NASA / Gemini AI',
      sources: draft.sources || [{ title: 'NASA Astrophysics Data System' }],
      lastUpdated: new Date().toISOString().split('T')[0],
      isApproved: false,
      isGeminiGenerated: true,
      readingTimeMin: 5,
      views: 0,
      likes: 0,
    };

    setArticles((prev) => [fullArticle, ...prev]);
    setStats((prev) => ({
      ...prev,
      geminiGenerationsCount: prev.geminiGenerationsCount + 1,
      articlesCount: prev.articlesCount + 1,
    }));
  };

  return (
    <div className="relative min-h-screen bg-[#040714] text-slate-100 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Background Starfield */}
      <CosmicStarfield />

      {/* Google Maps Platform In-App Quota Exceeded Defense Banner */}
      {quotaExceeded && (
        <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2.5 text-xs md:text-sm text-center sticky top-0 z-50 shadow-sm">
          <span>
            Google Maps Platform quota reached. If you are the app owner, visit{' '}
            <a
              href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-semibold text-amber-950 hover:text-amber-800"
            >
              maps developer site
            </a>{' '}
            for instructions to update your account.
          </span>
        </div>
      )}

      {/* Navigation */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        language={language}
        setLanguage={setLanguage}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
        {/* Global Top Promotional Ad Ribbon for https://kaheel7.net/ */}
        <KaheelPartnerAds language={language} variant="hero-ribbon" />
        
        {/* VIEW 1: HOME */}
        {currentTab === 'home' && (
          <div className="space-y-20">
            <HeroSection
              language={language}
              stats={stats}
              onExplore={() => setCurrentTab('encyclopedia')}
              onLaunchVirtual={() => setCurrentTab('virtual-journeys')}
              onOpenAi={() => setCurrentTab('gemini-lab')}
              onSelectCategory={handleSelectCategory}
            />

            {/* Featured Interactive Ad Showcase for https://kaheel7.net/ */}
            <KaheelPartnerAds language={language} variant="featured-showcase" />

            {/* Google Ads Leaderboard Unit on Home */}
            <GoogleAdUnit
              language={language}
              format="leaderboard"
              slotKey="homeLeaderboard"
              onOpenAdsAdmin={() => {
                setCurrentTab('admin');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Cosmic Hadith of the Day: Authentic Prophetic Traditions on the Universe */}
            <CosmicHadithOfTheDay language={language} />

            {/* Cosmic Prayer Times, Dual Hijri-Gregorian Calendar & Qibla Compass on Home */}
            <CosmicPrayerTimes language={language} />

            {/* Interactive Solar System Highlight on Home */}
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1">
                    <Orbit className="w-4 h-4" />
                    <span>{t.navVirtualJourney}</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white">
                    {t.virtualSimulatorTitle}
                  </h2>
                </div>
                <button
                  onClick={() => setCurrentTab('virtual-journeys')}
                  className="flex items-center gap-2 text-xs font-bold text-cyan-300 hover:text-white transition-colors"
                >
                  <span>{language === 'ar' ? 'استكشاف الأبعاد والمقاييس بالكامل' : 'Explore Full Simulator & Scales'}</span>
                  <ArrowIcon className="w-3.5 h-3.5" />
                </button>
              </div>

              <VirtualSolarSystem language={language} />
            </div>

            {/* Featured Articles Section: All Articles Openable & Expandable */}
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
                    <BookOpen className="w-4 h-4" />
                    <span>{t.navEncyclopedia}</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white">
                    {language === 'ar'
                      ? `المقالات والبحوث الفلكية المتاحة للقراءة (${articles.length} مقالاً)`
                      : `Astrophysical Articles & Research (${articles.length} Open Articles)`}
                  </h2>
                </div>
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => setShowAllHomeArticles(!showAllHomeArticles)}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-cyan-300 transition-colors cursor-pointer"
                  >
                    {showAllHomeArticles
                      ? language === 'ar'
                        ? 'عرض أقل (6 مقالات)'
                        : 'Show Less'
                      : language === 'ar'
                      ? `فتح جميع المقالات هنا (${articles.length})`
                      : `Open All Articles Here (${articles.length})`}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentTab('encyclopedia');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-colors cursor-pointer"
                  >
                    <span>{language === 'ar' ? 'القارئ الموسوعي المفتوح' : 'Launch Open Reader'}</span>
                    <ArrowIcon className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(showAllHomeArticles ? articles : articles.slice(0, 6)).map((art) => (
                  <div
                    key={art.id}
                    onClick={() => handleOpenArticle(art)}
                    className="group cursor-pointer rounded-2xl overflow-hidden bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
                  >
                    <div className="h-44 overflow-hidden relative">
                      <img
                        src={art.image}
                        alt={art.title[language] || art.title.ar}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute top-3 start-3">
                        <span className="px-2.5 py-1 rounded-full bg-slate-950/80 text-[10px] font-bold text-cyan-300 border border-cyan-500/30 uppercase">
                          {t.sections[art.category] || art.category}
                        </span>
                      </div>
                      <div className="absolute bottom-3 end-3 px-2 py-0.5 rounded-md bg-slate-950/80 text-[10px] text-slate-300 font-mono">
                        {art.readingTimeMin} {t.readingTime}
                      </div>
                    </div>
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2 mb-2">
                          {art.title[language] || art.title.ar}
                        </h3>
                        <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                          {art.summary[language] || art.summary.ar}
                        </p>
                      </div>
                      <div className="pt-4 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/60 mt-3">
                        <span className="text-[11px] text-slate-500">{art.views} مشاهدة</span>
                        <span className="font-bold text-cyan-400 flex items-center gap-1 group-hover:translate-x-[-2px] transition-transform">
                          <span>{t.readArticle}</span>
                          <ArrowIcon className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Space Hub Widgets on Home: Sky Map, Live Feeds, Celestial Events */}
            <div className="space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block mb-1">
                  {language === 'ar' ? 'الميزات الفلكية التفاعلية المباشرة' : 'Live Interactive Astronomical Suites'}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white">
                  {language === 'ar' ? 'استكشف السماء بالوقت الفعلي' : 'Real-Time Cosmos Exploration'}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* 1. Sky Map Widget */}
                <div
                  onClick={() => {
                    setCurrentTab('sky-map');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="group cursor-pointer rounded-3xl p-6 bg-gradient-to-br from-[#091535] to-[#050917] border border-cyan-500/30 hover:border-cyan-400/60 shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-300 group-hover:scale-110 transition-transform">
                      <Sparkles className="w-6 h-6 text-cyan-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {t.navSkyMap}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {language === 'ar'
                        ? 'خريطة فلكية تفاعلية تحاكي صور الكواكب الثابتة للصوفي ومواقع النجوم وأقدارها مع تأملات قرآنية موثقة.'
                        : 'Interactive celestial chart documenting Al-Sufi constellations with modern magnitudes and Quranic reflections.'}
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-cyan-900/40 flex items-center justify-between text-xs font-bold text-cyan-400">
                    <span>{language === 'ar' ? 'فتح الخريطة التفاعلية' : 'Launch Sky Map'}</span>
                    <ArrowIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* 2. Live Space Feeds Widget */}
                <div
                  onClick={() => {
                    setCurrentTab('live-feeds');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="group cursor-pointer rounded-3xl p-6 bg-gradient-to-br from-[#0d1633] to-[#060b1b] border border-indigo-500/30 hover:border-indigo-400/60 shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-950/80 border border-indigo-500/40 flex items-center justify-center text-indigo-300 group-hover:scale-110 transition-transform">
                      <Radio className="w-6 h-6 text-indigo-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                      {t.navLiveFeeds}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {language === 'ar'
                        ? 'تتبع حي للحظات إرسال تلسكوب جيمس ويب ومحطة الفضاء الدولية ومسبار بيرسيفيرنس على المريخ وسفن فوياجر.'
                        : 'Live telemetry tracking for JWST, ISS, Mars Perseverance, and Voyager 1 interstellar voyage.'}
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-indigo-900/40 flex items-center justify-between text-xs font-bold text-indigo-400">
                    <span>{language === 'ar' ? 'عرض التتبع المباشر' : 'View Live Telemetry'}</span>
                    <ArrowIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* 3. Celestial Events & Moon Phase Widget */}
                <div
                  onClick={() => {
                    setCurrentTab('events');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="group cursor-pointer rounded-3xl p-6 bg-gradient-to-br from-[#12192d] to-[#070d1c] border border-amber-500/30 hover:border-amber-400/60 shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-amber-950/80 border border-amber-500/40 flex items-center justify-center text-amber-300 group-hover:scale-110 transition-transform">
                      <Calendar className="w-6 h-6 text-amber-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                      {t.navEvents}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {language === 'ar'
                        ? 'حساب لحظي لطور القمر، مع أجندة دقيقة لزخات الشهب والكسوف الكلي ومواعيد ذروة الرصد بالعين والتلسكوب.'
                        : 'Real-time moon phase calculator, meteor shower peaks, solar eclipse guide, and planetary oppositions.'}
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-amber-900/40 flex items-center justify-between text-xs font-bold text-amber-400">
                    <span>{language === 'ar' ? 'أجندة الظواهر الفلكية' : 'Explore Events'}</span>
                    <ArrowIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* 4. Google Maps Observatories & Dark Sky Widget */}
                <div
                  onClick={() => {
                    setCurrentTab('observatories-map');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="group cursor-pointer rounded-3xl p-6 bg-gradient-to-br from-[#061530] to-[#04091a] border border-cyan-500/40 hover:border-cyan-300 shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-300 group-hover:scale-110 transition-transform">
                      <MapPin className="w-6 h-6 text-cyan-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {(t as any).navObservatoriesMap || 'مراصد ومواقع الرصد'}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {language === 'ar'
                        ? 'استكشف عبر Google Maps أكبر التلسكوبات العالمية، مرصد أوكايمدن بالمغرب، والمراصد الإسلامية، ومحميات السماء المظلمة.'
                        : 'Interactive Google Maps explorer for world-class observatories, Moroccan Oukaïmeden, and dark-sky reserves.'}
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-cyan-900/40 flex items-center justify-between text-xs font-bold text-cyan-400">
                    <span>{language === 'ar' ? 'فتح خريطة المراصد' : 'Explore Maps'}</span>
                    <ArrowIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>

            {/* Complete Moroccan Warsh Mushaf & Quran Cosmos Section Preview on Home */}
            <div className="p-8 rounded-3xl bg-gradient-to-r from-[#07211b] via-slate-900 to-amber-950/30 border-2 border-amber-500/40 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
              <div className="space-y-2 text-center md:text-start">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                  {language === 'ar'
                    ? 'المصحف المحمدي الشريف • رواية ورش عن نافع (القراءة المغربية)'
                    : 'Complete Holy Quran • Moroccan Reading (Riwayat Warsh an Nafi)'}
                </span>
                <h3 className="text-2xl font-black text-white">
                  {language === 'ar'
                    ? 'القرآن الكريم كاملاً برواية ورش عن نافع (114 سورة • 60 حزباً) مع تلاوات القراء المغاربة'
                    : 'Complete Holy Quran in Riwayat Warsh (114 Surahs • 60 Hizbs) & Cosmic Verse Studies'}
                </h3>
                <p className="text-sm text-slate-300 max-w-2xl">
                  {language === 'ar'
                    ? 'تصفح جميع سور القرآن الكريم بالرسم العثماني المغربي وضبط ورش من طريق الأزرق، مع الاستماع لكبار القراء المغاربة (عمر القزابري، العيون الكوشي، عبد المجيب بنكيران) ودراسة الآيات الكونية.'
                    : 'Read all 114 Surahs in authentic Moroccan Warsh script, listen to renowned Moroccan reciters, and explore cosmic Quranic reflections.'}
                </p>
              </div>
              <button
                onClick={() => {
                  setCurrentTab('quran-cosmos');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black font-black text-xs shrink-0 shadow-lg shadow-amber-500/25 transition-all cursor-pointer"
              >
                {language === 'ar'
                  ? 'فتح المصحف الشريف كاملاً (رواية ورش)'
                  : 'Open Complete Warsh Quran'}
              </button>
            </div>
          </div>
        )}

        {/* VIEW 2: ENCYCLOPEDIA */}
        {currentTab === 'encyclopedia' && (
          <EncyclopediaSection
            articles={articles}
            language={language}
            onOpenArticle={handleOpenArticle}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        )}

        {/* VIEW 3: VIRTUAL JOURNEYS & TOOLS */}
        {currentTab === 'virtual-journeys' && (
          <div className="space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-bold">
                <Orbit className="w-3.5 h-3.5" />
                <span>{t.sections['virtual-journeys']}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-white">
                {language === 'ar' ? 'الرحلات الافتراضية ومقاييس الكون' : 'Virtual Space Journeys & Cosmic Scales'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
                {language === 'ar'
                  ? 'مجموعة متكاملة من 4 محاكيات تفاعلية ثلاثية الأبعاد وحواسب فلكية دقيقة لمقارنة الأجرام وسرعة الضوء'
                  : 'Suite of 4 interactive 3D simulators and precision calculators for cosmic scales, light speed, and planetary sizes'}
              </p>
            </div>

            {/* Sub-navigation switcher */}
            <div className="flex items-center justify-center flex-wrap gap-2 p-1.5 bg-slate-900/80 backdrop-blur-xl border border-cyan-900/40 rounded-2xl max-w-4xl mx-auto">
              <button
                onClick={() => setVirtualSubTab('all')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  virtualSubTab === 'all'
                    ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white shadow-md shadow-cyan-500/20'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {language === 'ar' ? 'عرض جميع المحاكيات' : 'Show All'}
              </button>
              <button
                onClick={() => setVirtualSubTab('solar-system')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  virtualSubTab === 'solar-system'
                    ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white shadow-md shadow-cyan-500/20'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {language === 'ar' ? '1. المجموعة الشمسية 3D' : '1. 3D Solar System'}
              </button>
              <button
                onClick={() => setVirtualSubTab('scale')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  virtualSubTab === 'scale'
                    ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white shadow-md shadow-cyan-500/20'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {language === 'ar' ? '2. مقاييس الكون التفاعلية' : '2. Cosmic Scales'}
              </button>
              <button
                onClick={() => setVirtualSubTab('light-calc')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  virtualSubTab === 'light-calc'
                    ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white shadow-md shadow-cyan-500/20'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {language === 'ar' ? '3. حاسبة رحلة الضوء' : '3. Light Travel Calc'}
              </button>
              <button
                onClick={() => setVirtualSubTab('comparator')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  virtualSubTab === 'comparator'
                    ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white shadow-md shadow-cyan-500/20'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {language === 'ar' ? '4. مقارنة أحجام وأوزان الأجرام' : '4. Celestial Comparator'}
              </button>
            </div>

            {/* 1. Solar System Simulator */}
            {(virtualSubTab === 'all' || virtualSubTab === 'solar-system') && (
              <VirtualSolarSystem language={language} />
            )}

            {/* 2. Cosmic Scale Explorer */}
            {(virtualSubTab === 'all' || virtualSubTab === 'scale') && (
              <CosmicScaleExplorer language={language} />
            )}

            {/* 3. Light Travel Calculator */}
            {(virtualSubTab === 'all' || virtualSubTab === 'light-calc') && (
              <LightTravelCalculator language={language} />
            )}

            {/* 4. Celestial Comparator */}
            {(virtualSubTab === 'all' || virtualSubTab === 'comparator') && (
              <CelestialComparator language={language} />
            )}
          </div>
        )}

        {/* VIEW: SKY MAP & CONSTELLATIONS */}
        {currentTab === 'sky-map' && (
          <SkyMap language={language} />
        )}

        {/* VIEW: LIVE SPACE FEEDS */}
        {currentTab === 'live-feeds' && (
          <LiveSpaceFeeds language={language} />
        )}

        {/* VIEW: CELESTIAL EVENTS & CALENDAR */}
        {currentTab === 'events' && (
          <CelestialEvents language={language} />
        )}

        {/* VIEW: COSMIC PRAYER TIMES, HIJRI/GREGORIAN CALENDAR & QIBLA COMPASS */}
        {currentTab === 'prayer-times' && (
          <CosmicPrayerTimes language={language} />
        )}

        {/* VIEW: GOOGLE MAPS - COSMIC OBSERVATORIES & SKY WATCHING */}
        {currentTab === 'observatories-map' && (
          <CosmicObservatoriesMap language={language} />
        )}

        {/* VIEW 4: QURAN & COSMOS */}
        {currentTab === 'quran-cosmos' && (
          <QuranCosmosSection language={language} />
        )}

        {/* VIEW 5: SPACE GALLERY */}
        {currentTab === 'gallery' && (
          <SpaceGallery language={language} />
        )}

        {/* VIEW 6: GEMINI AI COSMIC LAB */}
        {currentTab === 'gemini-lab' && (
          <AiCosmicLab
            language={language}
            onSaveArticleDraft={handleSaveArticleDraft}
          />
        )}

        {/* VIEW 7: COSMIC QUIZ */}
        {currentTab === 'quiz' && (
          <CosmicQuiz language={language} />
        )}

        {/* VIEW 8: ADMIN DASHBOARD */}
        {currentTab === 'admin' && (
          <AdminDashboard
            articles={articles}
            setArticles={setArticles}
            stats={stats}
            language={language}
          />
        )}

        {/* Global Bottom Google Ads Multiplex Unit */}
        <GoogleAdUnit
          language={language}
          format="multiplex"
          slotKey="footerMultiplex"
          onOpenAdsAdmin={() => {
            setCurrentTab('admin');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      </main>

      {/* Global Search Modal */}
      {isSearchOpen && (
        <GlobalSearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          articles={articles}
          quranStudies={initialQuranStudies}
          celestialBodies={initialCelestialBodies}
          language={language}
          onSelectArticle={handleOpenArticle}
          onSelectQuranStudy={(id) => setCurrentTab('quran-cosmos')}
          onSelectTab={setCurrentTab}
        />
      )}

      {/* Article Detail Modal with Full Article Navigation */}
      {activeArticleModal && (
        <ArticleModal
          article={activeArticleModal}
          articles={articles}
          onSelectArticle={handleOpenArticle}
          onClose={() => setActiveArticleModal(null)}
          language={language}
          onLike={handleLikeArticle}
          onSelectVerse={() => setCurrentTab('quran-cosmos')}
        />
      )}

      {/* Footer */}
      <Footer language={language} onSelectTab={setCurrentTab} />
    </div>
  );
}
