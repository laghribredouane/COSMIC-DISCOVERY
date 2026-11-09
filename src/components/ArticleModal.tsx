import React, { useState, useEffect, useMemo } from 'react';
import {
  X,
  Clock,
  Calendar,
  Heart,
  Share2,
  Sparkles,
  ExternalLink,
  Layers,
  Award,
  ChevronRight,
  ChevronLeft,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Type,
  List,
  Check,
  BookOpen
} from 'lucide-react';
import { ScientificArticle, Language } from '../types/cosmic';
import { translations } from '../i18n/translations';

interface ArticleModalProps {
  article: ScientificArticle | null;
  articles?: ScientificArticle[];
  onSelectArticle?: (article: ScientificArticle) => void;
  onClose: () => void;
  language: Language;
  onSelectVerse?: (verseId: string) => void;
  onLike?: (articleId: string) => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = (props) => {
  if (!props.article) return null;
  return <ArticleModalDialog {...props} article={props.article} />;
};

const ArticleModalDialog: React.FC<ArticleModalProps & { article: ScientificArticle }> = ({
  article,
  articles = [],
  onSelectArticle,
  onClose,
  language,
  onSelectVerse,
  onLike,
}) => {
  const t = translations[language];
  const isRtl = language === 'ar';

  const [readingLevel, setReadingLevel] = useState<'simple' | 'advanced'>('simple');
  const [liked, setLiked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [fontSizeLevel, setFontSizeLevel] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showArticleIndex, setShowArticleIndex] = useState(false);

  // Compute current index & adjacent articles
  const currentIndex = useMemo(() => {
    return articles.findIndex((a) => a.id === article.id);
  }, [articles, article.id]);

  const hasNext = currentIndex >= 0 && currentIndex < articles.length - 1;
  const hasPrev = currentIndex > 0;

  const handleNext = () => {
    if (hasNext && onSelectArticle) {
      stopSpeech();
      onSelectArticle(articles[currentIndex + 1]);
    }
  };

  const handlePrev = () => {
    if (hasPrev && onSelectArticle) {
      stopSpeech();
      onSelectArticle(articles[currentIndex - 1]);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        stopSpeech();
        onClose();
      } else if (e.key === 'ArrowRight') {
        if (isRtl) handlePrev();
        else handleNext();
      } else if (e.key === 'ArrowLeft') {
        if (isRtl) handleNext();
        else handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, articles, isRtl]);

  const stopSpeech = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  // Stop speech on unmount
  useEffect(() => {
    return () => stopSpeech();
  }, [article.id]);

  const handleToggleSpeech = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (isSpeaking) {
      stopSpeech();
      return;
    }

    const titleText = article.title[language] || article.title.ar;
    const summaryText = article.summary[language] || article.summary.ar;
    const bodyText =
      readingLevel === 'simple'
        ? article.contentSimple[language] || article.contentSimple.ar
        : article.contentAdvanced[language] || article.contentAdvanced.ar;

    const fullSpeech = `${titleText}. ${summaryText}. ${bodyText}`;
    const utterance = new SpeechSynthesisUtterance(fullSpeech);
    utterance.lang = language === 'ar' ? 'ar-SA' : language === 'fr' ? 'fr-FR' : 'en-US';
    utterance.rate = 0.95;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleLike = () => {
    if (!liked && onLike) {
      onLike(article.id);
      setLiked(true);
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const fontClass =
    fontSizeLevel === 'xlarge'
      ? 'text-lg sm:text-xl leading-loose'
      : fontSizeLevel === 'large'
      ? 'text-base sm:text-lg leading-relaxed'
      : 'text-sm sm:text-base leading-relaxed';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in">
      <div
        className={`relative w-full overflow-y-auto rounded-3xl bg-[#080d22] border border-cyan-800/50 shadow-2xl text-slate-100 flex flex-col transition-all duration-300 ${
          isFullscreen ? 'h-[98vh] max-w-7xl' : 'max-h-[92vh] max-w-4xl'
        }`}
      >
        {/* Top Header Bar */}
        <div className="sticky top-0 z-30 flex items-center justify-between p-3.5 sm:p-5 bg-[#080d22]/95 backdrop-blur-md border-b border-slate-800 gap-3">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
            <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-bold uppercase whitespace-nowrap">
              {t.sections[article.category] || article.category}
            </span>

            <span className="hidden sm:flex items-center gap-1 text-xs text-slate-400 whitespace-nowrap">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              <span>
                {article.readingTimeMin} {t.readingTime}
              </span>
            </span>

            {/* Articles Index Selector Button */}
            {articles.length > 0 && (
              <button
                type="button"
                onClick={() => setShowArticleIndex(!showArticleIndex)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-cyan-300 text-xs font-bold transition-colors whitespace-nowrap border border-slate-700 cursor-pointer"
              >
                <List className="w-3.5 h-3.5" />
                <span>
                  {language === 'ar'
                    ? `فهرس المقالات (${articles.length})`
                    : language === 'fr'
                    ? `Tous les Articles (${articles.length})`
                    : `All Articles (${articles.length})`}
                </span>
              </button>
            )}
          </div>

          {/* Quick Controls: Next/Prev, Speech, Zoom, Fullscreen, Close */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Prev / Next buttons */}
            {articles.length > 1 && onSelectArticle && (
              <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
                <button
                  type="button"
                  onClick={isRtl ? handleNext : handlePrev}
                  disabled={isRtl ? !hasNext : !hasPrev}
                  title={language === 'ar' ? 'المقال السابق' : 'Previous Article'}
                  className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  {isRtl ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                </button>
                <span className="text-[11px] font-mono text-cyan-400 px-1">
                  {currentIndex + 1} / {articles.length}
                </span>
                <button
                  type="button"
                  onClick={isRtl ? handlePrev : handleNext}
                  disabled={isRtl ? !hasPrev : !hasNext}
                  title={language === 'ar' ? 'المقال التالي' : 'Next Article'}
                  className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  {isRtl ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>
              </div>
            )}

            {/* Text to Speech */}
            <button
              type="button"
              onClick={handleToggleSpeech}
              title={
                isSpeaking
                  ? language === 'ar'
                    ? 'إيقاف القراءة الصوتية'
                    : 'Stop Voice Reading'
                  : language === 'ar'
                  ? 'استمع للمقال بصوت واضح'
                  : 'Listen to Article'
              }
              className={`p-2 rounded-xl transition-colors cursor-pointer ${
                isSpeaking
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse'
                  : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white'
              }`}
            >
              {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* Font Size Toggle */}
            <button
              type="button"
              onClick={() => {
                setFontSizeLevel((prev) =>
                  prev === 'normal' ? 'large' : prev === 'large' ? 'xlarge' : 'normal'
                );
              }}
              title={language === 'ar' ? 'تغيير حجم الخط' : 'Adjust Font Size'}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer hidden sm:flex"
            >
              <Type className="w-4 h-4" />
            </button>

            {/* Fullscreen Toggle */}
            <button
              type="button"
              onClick={() => setIsFullscreen(!isFullscreen)}
              title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer hidden md:flex"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            {/* Close */}
            <button
              type="button"
              onClick={() => {
                stopSpeech();
                onClose();
              }}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-rose-950/40 text-slate-300 hover:text-rose-400 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dropdown Index of All Articles */}
        {showArticleIndex && articles.length > 0 && (
          <div className="p-4 bg-slate-950/95 border-b border-slate-800 max-h-64 overflow-y-auto animate-in slide-in-from-top-2">
            <div className="flex items-center justify-between mb-3 text-xs font-bold text-cyan-300">
              <span className="flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" />
                <span>
                  {language === 'ar'
                    ? 'فهرس جميع مقالات الموسوعة الكونية — اختر مقالاً للانتقال إليه مباشرة:'
                    : 'All Cosmic Encyclopedia Articles — Pick to Read Instantly:'}
                </span>
              </span>
              <button
                type="button"
                onClick={() => setShowArticleIndex(false)}
                className="text-slate-400 hover:text-white text-xs"
              >
                {language === 'ar' ? 'إغلاق الفهرس' : 'Close'}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {articles.map((art, idx) => {
                const isActive = art.id === article.id;
                return (
                  <button
                    key={art.id}
                    type="button"
                    onClick={() => {
                      stopSpeech();
                      if (onSelectArticle) onSelectArticle(art);
                      setShowArticleIndex(false);
                    }}
                    className={`flex items-start gap-2.5 p-2.5 rounded-xl text-start text-xs transition-all cursor-pointer ${
                      isActive
                        ? 'bg-cyan-500/20 border border-cyan-500 text-cyan-200 font-bold'
                        : 'bg-slate-900/70 border border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <span className="font-mono text-[10px] text-cyan-400 mt-0.5">#{idx + 1}</span>
                    <div className="min-w-0 flex-1">
                      <div className="text-[10px] text-slate-400 uppercase truncate">
                        {t.sections[art.category] || art.category}
                      </div>
                      <div className="truncate font-semibold text-slate-100">
                        {art.title[language] || art.title.ar}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Content Body */}
        <div className="p-5 sm:p-8 space-y-8 flex-1">
          {/* Title & Summary */}
          <div>
            <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight mb-4">
              {article.title[language] || article.title.ar}
            </h1>
            <p className="text-base sm:text-lg text-cyan-200/90 font-medium leading-relaxed bg-cyan-950/25 p-4 rounded-2xl border border-cyan-900/30">
              {article.summary[language] || article.summary.ar}
            </p>
          </div>

          {/* Hero Image */}
          {article.image && (
            <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-xl bg-slate-950">
              <img
                src={article.image}
                alt={article.title[language] || article.title.ar}
                className="w-full h-64 sm:h-96 object-cover"
              />
              <div className="p-3 bg-slate-900/90 text-xs text-slate-400 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-t border-slate-800">
                <span>{article.imageCaption[language] || article.imageCaption.ar}</span>
                <span className="font-semibold text-cyan-400">{article.imageCredit}</span>
              </div>
            </div>
          )}

          {/* Reading Level Selector Switch */}
          <div className="flex items-center justify-center">
            <div className="p-1 rounded-2xl bg-slate-900 border border-slate-700/80 flex items-center shadow-inner">
              <button
                type="button"
                onClick={() => setReadingLevel('simple')}
                className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
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
                className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  readingLevel === 'advanced'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                🔬 {t.readingLevelAdvanced}
              </button>
            </div>
          </div>

          {/* Main Article Text */}
          <div className={`prose prose-invert max-w-none text-slate-200 ${fontClass}`}>
            {readingLevel === 'simple' ? (
              <div className="bg-slate-900/40 p-5 sm:p-6 rounded-2xl border border-slate-800 whitespace-pre-line leading-loose">
                {article.contentSimple[language] || article.contentSimple.ar}
              </div>
            ) : (
              <div className="space-y-4 bg-slate-900/40 p-5 sm:p-6 rounded-2xl border border-slate-800 whitespace-pre-line leading-loose">
                <div>{article.contentAdvanced[language] || article.contentAdvanced.ar}</div>
                <div className="text-xs text-cyan-400/90 border-t border-slate-800 pt-3 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>
                    {language === 'ar'
                      ? 'محتوى أكاديمي دقيق مستند لأحدث المراجع الفلكية الدولية.'
                      : 'Peer-reviewed academic astrophysics context.'}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Key Facts & Specs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Key Facts */}
            <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800">
              <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-300 mb-3 flex items-center gap-2">
                <Award className="w-4 h-4" />
                <span>{t.keyFacts}</span>
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                {(article.keyFacts[language] || article.keyFacts.ar).map((fact, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span>{fact}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Scientific Specs Table */}
            <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800">
              <h3 className="text-sm font-bold uppercase tracking-wider text-amber-300 mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4" />
                <span>{t.scientificSpecs}</span>
              </h3>
              <div className="space-y-2 text-xs sm:text-sm divide-y divide-slate-800">
                {article.specs.diameter && (
                  <div className="flex justify-between py-1">
                    <span className="text-slate-400">{language === 'ar' ? 'القطر:' : 'Diameter:'}</span>
                    <strong className="text-slate-200 font-mono">{article.specs.diameter}</strong>
                  </div>
                )}
                {article.specs.mass && (
                  <div className="flex justify-between py-1">
                    <span className="text-slate-400">{language === 'ar' ? 'الكتلة:' : 'Mass:'}</span>
                    <strong className="text-slate-200 font-mono">{article.specs.mass}</strong>
                  </div>
                )}
                {article.specs.temperature && (
                  <div className="flex justify-between py-1">
                    <span className="text-slate-400">
                      {language === 'ar' ? 'الحرارة:' : 'Temperature:'}
                    </span>
                    <strong className="text-slate-200 font-mono">{article.specs.temperature}</strong>
                  </div>
                )}
                {article.specs.distance && (
                  <div className="flex justify-between py-1">
                    <span className="text-slate-400">{language === 'ar' ? 'المسافة:' : 'Distance:'}</span>
                    <strong className="text-slate-200 font-mono">{article.specs.distance}</strong>
                  </div>
                )}
                {article.specs.speed && (
                  <div className="flex justify-between py-1">
                    <span className="text-slate-400">{language === 'ar' ? 'السرعة:' : 'Speed:'}</span>
                    <strong className="text-slate-200 font-mono">{article.specs.speed}</strong>
                  </div>
                )}
                {article.specs.age && (
                  <div className="flex justify-between py-1">
                    <span className="text-slate-400">
                      {language === 'ar' ? 'العمر المقدر:' : 'Estimated Age:'}
                    </span>
                    <strong className="text-slate-200 font-mono">{article.specs.age}</strong>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Related Quranic Link */}
          {article.relatedQuranVerseId && onSelectVerse && (
            <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
                <span className="text-xs sm:text-sm text-amber-200 font-medium">
                  {t.relatedQuranVerse}
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  stopSpeech();
                  onSelectVerse(article.relatedQuranVerseId!);
                  onClose();
                }}
                className="px-3.5 py-1.5 rounded-xl bg-amber-500 text-black font-bold text-xs hover:bg-amber-400 transition-colors shrink-0 cursor-pointer"
              >
                {language === 'ar' ? 'عرض التأمل القرآني' : 'View Quranic Study'}
              </button>
            </div>
          )}

          {/* Next / Previous Article Navigation Banner at bottom */}
          {articles.length > 1 && onSelectArticle && (
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-cyan-800/40 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs text-slate-300">
                <span className="font-bold text-cyan-300">
                  {language === 'ar' ? 'متابعة القراءة: ' : 'Continue Reading: '}
                </span>
                <span>
                  {language === 'ar'
                    ? `المقال ${currentIndex + 1} من أصل ${articles.length} مقالات متاحة`
                    : `Article ${currentIndex + 1} of ${articles.length} open articles`}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={isRtl ? handleNext : handlePrev}
                  disabled={isRtl ? !hasNext : !hasPrev}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs font-bold transition-colors cursor-pointer"
                >
                  {isRtl ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                  <span>{language === 'ar' ? 'المقال السابق' : 'Previous Article'}</span>
                </button>
                <button
                  type="button"
                  onClick={isRtl ? handlePrev : handleNext}
                  disabled={isRtl ? !hasPrev : !hasNext}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
                >
                  <span>{language === 'ar' ? 'المقال التالي' : 'Next Article'}</span>
                  {isRtl ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}

          {/* Sources and References */}
          <div className="border-t border-slate-800 pt-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              {t.scientificSources}
            </h4>
            <div className="flex flex-wrap gap-2">
              {article.sources.map((src, i) => (
                <a
                  key={i}
                  href={src.url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-xs text-cyan-300 hover:text-white border border-slate-700 hover:border-cyan-500 transition-colors"
                >
                  <span>{src.title}</span>
                  {src.url && <ExternalLink className="w-3 h-3" />}
                </a>
              ))}
            </div>
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between border-t border-slate-800 pt-6 text-xs text-slate-400">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={handleLike}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
                  liked
                    ? 'bg-rose-500/20 border-rose-500 text-rose-300'
                    : 'bg-slate-900 border-slate-800 hover:text-white'
                }`}
              >
                <Heart className={`w-4 h-4 ${liked ? 'fill-rose-500 text-rose-500' : ''}`} />
                <span>{article.likes + (liked ? 1 : 0)}</span>
              </button>

              <button
                type="button"
                onClick={handleShare}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:text-white transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                <span>
                  {copied ? (language === 'ar' ? 'تم النسخ!' : 'Copied!') : t.shareArticle}
                </span>
              </button>
            </div>

            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>
                {t.lastUpdated}: {article.lastUpdated}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
