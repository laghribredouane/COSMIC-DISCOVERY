import React, { useState } from 'react';
import {
  Search,
  Filter,
  BookOpen,
  Sparkles,
  X,
  LayoutGrid,
  BookText,
  Clock,
  Layers,
  Award,
  ChevronRight,
  ChevronLeft,
  Volume2,
  VolumeX,
  ExternalLink,
  Share2,
  Heart,
  Calendar,
  Check
} from 'lucide-react';
import { ScientificArticle, Language, CosmicCategory } from '../types/cosmic';
import { filterArticlesList } from '../utils/cosmicCalculations';
import { ArticleCard } from './ArticleCard';
import { KaheelPartnerAds } from './KaheelPartnerAds';
import { GoogleAdUnit } from './GoogleAdUnit';
import { translations } from '../i18n/translations';

interface EncyclopediaSectionProps {
  articles: ScientificArticle[];
  language: Language;
  onOpenArticle: (article: ScientificArticle) => void;
  selectedCategory: CosmicCategory | 'all';
  setSelectedCategory: (cat: CosmicCategory | 'all') => void;
}

export const EncyclopediaSection: React.FC<EncyclopediaSectionProps> = ({
  articles,
  language,
  onOpenArticle,
  selectedCategory,
  setSelectedCategory,
}) => {
  const t = translations[language];
  const isRtl = language === 'ar';
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'cards' | 'reader'>('cards');
  const [selectedReaderArticleId, setSelectedReaderArticleId] = useState<string>(
    articles[0]?.id || ''
  );
  const [readingLevel, setReadingLevel] = useState<'simple' | 'advanced'>('simple');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [copied, setCopied] = useState(false);

  const filteredArticles = filterArticlesList(articles, searchQuery, selectedCategory, language);

  const currentReaderArticle =
    articles.find((a) => a.id === selectedReaderArticleId) ||
    filteredArticles[0] ||
    articles[0];

  const categoryOptions: Array<{ id: CosmicCategory | 'all'; label: string }> = [
    { id: 'all', label: t.allCategories },
    { id: 'galaxies', label: t.sections.galaxies },
    { id: 'stars', label: t.sections.stars },
    { id: 'solar-system', label: t.sections['solar-system'] },
    { id: 'black-holes', label: t.sections['black-holes'] },
    { id: 'nebulae', label: t.sections.nebulae },
    { id: 'cosmic-distances', label: t.sections['cosmic-distances'] },
    { id: 'cosmology-origin', label: t.sections['cosmology-origin'] },
    { id: 'discoveries', label: t.sections.discoveries },
    { id: 'quran-cosmos', label: t.sections['quran-cosmos'] },
    { id: 'reflections', label: t.sections.reflections },
  ];

  const readerIndex = articles.findIndex((a) => a.id === currentReaderArticle?.id);
  const hasNextReader = readerIndex >= 0 && readerIndex < articles.length - 1;
  const hasPrevReader = readerIndex > 0;

  const handleNextReader = () => {
    stopSpeech();
    if (hasNextReader) {
      setSelectedReaderArticleId(articles[readerIndex + 1].id);
    }
  };

  const handlePrevReader = () => {
    stopSpeech();
    if (hasPrevReader) {
      setSelectedReaderArticleId(articles[readerIndex - 1].id);
    }
  };

  const stopSpeech = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const handleToggleSpeech = () => {
    if (!currentReaderArticle || typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (isSpeaking) {
      stopSpeech();
      return;
    }

    const titleText = currentReaderArticle.title[language] || currentReaderArticle.title.ar;
    const summaryText = currentReaderArticle.summary[language] || currentReaderArticle.summary.ar;
    const bodyText =
      readingLevel === 'simple'
        ? currentReaderArticle.contentSimple[language] || currentReaderArticle.contentSimple.ar
        : currentReaderArticle.contentAdvanced[language] || currentReaderArticle.contentAdvanced.ar;

    const fullSpeech = `${titleText}. ${summaryText}. ${bodyText}`;
    const utterance = new SpeechSynthesisUtterance(fullSpeech);
    utterance.lang = language === 'ar' ? 'ar-SA' : language === 'fr' ? 'fr-FR' : 'en-US';
    utterance.rate = 0.95;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleShareReaderArticle = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section className="space-y-8">
      {/* Header & Controls Row */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-3">
            <BookOpen className="w-7 h-7 text-cyan-400" />
            <span>{t.navEncyclopedia}</span>
            <span className="text-xs px-3 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800">
              {filteredArticles.length} {t.totalArticlesCount}
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {language === 'ar'
              ? 'موسوعة علمية شاملة تضم مقالات فلكية موثقة حول المجرات، النجوم، الثقوب السوداء، وتأملات القرآن والكون.'
              : 'Comprehensive astrophysics encyclopedia with peer-reviewed articles across all cosmic realms.'}
          </p>
        </div>

        {/* View Mode Toggle & Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* View Mode: Cards vs Open Reader */}
          <div className="flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => {
                stopSpeech();
                setViewMode('cards');
              }}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'cards'
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'شبكة البطاقات' : 'Cards Grid'}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                stopSpeech();
                setViewMode('reader');
              }}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'reader'
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BookText className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'قارئ المقالات المفتوح' : 'Open Reader'}</span>
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute start-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full ps-10 pe-10 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-cyan-400"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute end-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Category Tabs Slider */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categoryOptions.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          const count =
            cat.id === 'all'
              ? articles.length
              : articles.filter((a) => a.category === cat.id).length;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/25'
                  : 'bg-slate-900/70 border border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isSelected ? 'bg-slate-950 text-cyan-300' : 'bg-slate-800 text-slate-400'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Quick Action Banner: "قراءة وتصفح جميع المقالات" */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-950/60 via-slate-900 to-indigo-950/60 border border-cyan-800/40 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-300 shrink-0">
            <BookText className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">
              {language === 'ar'
                ? `جميع المقالات مفتوحة بالكامل (${articles.length} مقالاً علمياً موثقاً)`
                : `All Articles Fully Open (${articles.length} Peer-Reviewed Articles)`}
            </h4>
            <p className="text-xs text-slate-400">
              {language === 'ar'
                ? 'يمكنك قراءة وتصفح أي مقال مباشرة على الصفحة، أو النقر لفتحه في قارئ ملء الشاشة مع القراءة الصوتية.'
                : 'Read any article inline directly on the page, or click to open full-screen reading mode.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => {
              stopSpeech();
              setViewMode('reader');
              if (filteredArticles.length > 0) {
                setSelectedReaderArticleId(filteredArticles[0].id);
              }
            }}
            className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs transition-colors cursor-pointer"
          >
            {language === 'ar' ? 'فتح قارئ المقالات المباشر' : 'Launch Inline Reader'}
          </button>
        </div>
      </div>

      {/* Promotional Partner Banner for https://kaheel7.net/ */}
      <KaheelPartnerAds language={language} variant="compact-banner" />

      {/* Google Ads In-Article Unit */}
      <GoogleAdUnit language={language} format="in-article" slotKey="encyclopediaInArticle" />

      {/* VIEW 1: OPEN READER VIEW (Inline Comprehensive Reader) */}
      {viewMode === 'reader' && currentReaderArticle && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: All Articles Index List (5 cols) */}
          <div className="lg:col-span-4 space-y-3 bg-slate-900/60 p-4 rounded-3xl border border-slate-800">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs font-bold text-cyan-300">
              <span>
                {language === 'ar'
                  ? `قائمة المقالات (${filteredArticles.length})`
                  : `Articles Index (${filteredArticles.length})`}
              </span>
              <span className="text-[11px] text-slate-400">
                {language === 'ar' ? 'انقر للقراءة المباشرة' : 'Click to read'}
              </span>
            </div>

            <div className="space-y-2 max-h-[750px] overflow-y-auto pe-1">
              {filteredArticles.map((art, idx) => {
                const isSelected = art.id === currentReaderArticle.id;
                return (
                  <button
                    key={art.id}
                    type="button"
                    onClick={() => {
                      stopSpeech();
                      setSelectedReaderArticleId(art.id);
                    }}
                    className={`w-full text-start p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                      isSelected
                        ? 'bg-cyan-500/15 border-cyan-500 text-white shadow-lg shadow-cyan-500/10'
                        : 'bg-slate-950/70 border-slate-800/80 text-slate-300 hover:bg-slate-800/80 hover:text-white'
                    }`}
                  >
                    <span className="font-mono text-xs text-cyan-400 mt-0.5">#{idx + 1}</span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                        <span className="uppercase font-semibold">
                          {t.sections[art.category] || art.category}
                        </span>
                        <span>
                          {art.readingTimeMin} {t.readingTime}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold leading-snug line-clamp-2">
                        {art.title[language] || art.title.ar}
                      </h4>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Full Open Article Reader (8 cols) */}
          <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-6">
            {/* Top Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-bold uppercase">
                  {t.sections[currentReaderArticle.category] || currentReaderArticle.category}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>
                    {currentReaderArticle.readingTimeMin} {t.readingTime}
                  </span>
                </span>
              </div>

              <div className="flex items-center gap-2">
                {/* Speech Synthesis Button */}
                <button
                  type="button"
                  onClick={handleToggleSpeech}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                    isSpeaking
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500 animate-pulse'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                  }`}
                >
                  {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                  <span>{isSpeaking ? (language === 'ar' ? 'إيقاف' : 'Stop') : language === 'ar' ? 'استمع للمقال' : 'Listen'}</span>
                </button>

                {/* Popout Fullscreen Modal Button */}
                <button
                  type="button"
                  onClick={() => onOpenArticle(currentReaderArticle)}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-bold transition-colors cursor-pointer"
                >
                  {language === 'ar' ? 'عرض مكبّر' : 'Expand Modal'}
                </button>
              </div>
            </div>

            {/* Article Title & Summary */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight mb-3">
                {currentReaderArticle.title[language] || currentReaderArticle.title.ar}
              </h1>
              <p className="text-sm sm:text-base text-cyan-200/95 font-medium leading-relaxed bg-cyan-950/20 p-4 rounded-2xl border border-cyan-900/30">
                {currentReaderArticle.summary[language] || currentReaderArticle.summary.ar}
              </p>
            </div>

            {/* Cover Image */}
            {currentReaderArticle.image && (
              <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-950">
                <img
                  src={currentReaderArticle.image}
                  alt={currentReaderArticle.title[language] || currentReaderArticle.title.ar}
                  className="w-full h-64 sm:h-80 object-cover"
                />
                <div className="p-3 bg-slate-900/90 text-xs text-slate-400 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-t border-slate-800">
                  <span>
                    {currentReaderArticle.imageCaption[language] || currentReaderArticle.imageCaption.ar}
                  </span>
                  <span className="font-semibold text-cyan-400">
                    {currentReaderArticle.imageCredit}
                  </span>
                </div>
              </div>
            )}

            {/* Reading Level Selector */}
            <div className="flex items-center justify-center">
              <div className="p-1 rounded-2xl bg-slate-950 border border-slate-800 flex items-center shadow-inner">
                <button
                  type="button"
                  onClick={() => setReadingLevel('simple')}
                  className={`px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    readingLevel === 'simple'
                      ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/25'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  🌱 {t.readingLevelSimple}
                </button>
                <button
                  type="button"
                  onClick={() => setReadingLevel('advanced')}
                  className={`px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    readingLevel === 'advanced'
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  🔬 {t.readingLevelAdvanced}
                </button>
              </div>
            </div>

            {/* Article Text Content */}
            <div className="prose prose-invert max-w-none text-slate-200 text-sm sm:text-base leading-loose whitespace-pre-line bg-slate-950/60 p-5 sm:p-6 rounded-2xl border border-slate-800">
              {readingLevel === 'simple'
                ? currentReaderArticle.contentSimple[language] || currentReaderArticle.contentSimple.ar
                : currentReaderArticle.contentAdvanced[language] || currentReaderArticle.contentAdvanced.ar}
            </div>

            {/* Key Facts & Specs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-300 mb-2.5 flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  <span>{t.keyFacts}</span>
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {(
                    currentReaderArticle.keyFacts[language] || currentReaderArticle.keyFacts.ar
                  ).map((fact, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-cyan-400 mt-0.5">•</span>
                      <span>{fact}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300 mb-2.5 flex items-center gap-2">
                  <Layers className="w-4 h-4" />
                  <span>{t.scientificSpecs}</span>
                </h4>
                <div className="space-y-1.5 text-xs divide-y divide-slate-800">
                  {currentReaderArticle.specs.diameter && (
                    <div className="flex justify-between py-1">
                      <span className="text-slate-400">{language === 'ar' ? 'القطر:' : 'Diameter:'}</span>
                      <strong className="text-slate-200 font-mono">
                        {currentReaderArticle.specs.diameter}
                      </strong>
                    </div>
                  )}
                  {currentReaderArticle.specs.mass && (
                    <div className="flex justify-between py-1">
                      <span className="text-slate-400">{language === 'ar' ? 'الكتلة:' : 'Mass:'}</span>
                      <strong className="text-slate-200 font-mono">
                        {currentReaderArticle.specs.mass}
                      </strong>
                    </div>
                  )}
                  {currentReaderArticle.specs.temperature && (
                    <div className="flex justify-between py-1">
                      <span className="text-slate-400">
                        {language === 'ar' ? 'الحرارة:' : 'Temperature:'}
                      </span>
                      <strong className="text-slate-200 font-mono">
                        {currentReaderArticle.specs.temperature}
                      </strong>
                    </div>
                  )}
                  {currentReaderArticle.specs.distance && (
                    <div className="flex justify-between py-1">
                      <span className="text-slate-400">{language === 'ar' ? 'المسافة:' : 'Distance:'}</span>
                      <strong className="text-slate-200 font-mono">
                        {currentReaderArticle.specs.distance}
                      </strong>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Navigation Buttons: Next & Previous */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={isRtl ? handleNextReader : handlePrevReader}
                disabled={isRtl ? !hasNextReader : !hasPrevReader}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs font-bold transition-colors cursor-pointer"
              >
                {isRtl ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                <span>{language === 'ar' ? 'المقال السابق' : 'Previous Article'}</span>
              </button>

              <button
                type="button"
                onClick={handleShareReaderArticle}
                className="flex items-center gap-1 px-3 py-2 rounded-xl bg-slate-800 text-xs text-slate-300 hover:text-white cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copied ? (language === 'ar' ? 'تم النسخ!' : 'Copied!') : t.shareArticle}</span>
              </button>

              <button
                type="button"
                onClick={isRtl ? handlePrevReader : handleNextReader}
                disabled={isRtl ? !hasPrevReader : !hasNextReader}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
              >
                <span>{language === 'ar' ? 'المقال التالي' : 'Next Article'}</span>
                {isRtl ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: CARDS GRID VIEW */}
      {viewMode === 'cards' && (
        <>
          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  language={language}
                  onOpen={() => onOpenArticle(article)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 p-8 rounded-3xl bg-slate-900/40 border border-slate-800 text-slate-400">
              <BookOpen className="w-12 h-12 mx-auto text-slate-600 mb-4" />
              <p className="text-base font-semibold">{t.noResults}</p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="mt-4 px-4 py-2 rounded-xl bg-cyan-600/20 text-cyan-300 border border-cyan-500/30 text-xs font-bold hover:bg-cyan-600/30 cursor-pointer"
              >
                {language === 'ar' ? 'إعادة ضبط التصفية' : 'Reset Filters'}
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
};
