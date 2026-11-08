import React, { useState } from 'react';
import { X, Clock, Calendar, Bookmark, Heart, Share2, Sparkles, BookOpen, ExternalLink, Layers, Award } from 'lucide-react';
import { ScientificArticle, Language } from '../types/cosmic';
import { translations } from '../i18n/translations';

interface ArticleModalProps {
  article: ScientificArticle | null;
  onClose: () => void;
  language: Language;
  onSelectVerse?: (verseId: string) => void;
  onLike?: (articleId: string) => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  onClose,
  language,
  onSelectVerse,
  onLike,
}) => {
  if (!article) return null;
  const t = translations[language];

  const [readingLevel, setReadingLevel] = useState<'simple' | 'advanced'>('simple');
  const [liked, setLiked] = useState(false);
  const [copied, setCopied] = useState(false);

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

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#080d22] border border-cyan-800/50 shadow-2xl text-slate-100 flex flex-col">
        
        {/* Top Header Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between p-4 sm:p-6 bg-[#080d22]/95 backdrop-blur-md border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-bold uppercase">
              {t.sections[article.category] || article.category}
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-400">
              <Clock className="w-3.5 h-3.5" />
              <span>{article.readingTimeMin} {t.readingTime}</span>
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-8">
          
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
                onClick={() => setReadingLevel('simple')}
                className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  readingLevel === 'simple'
                    ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/25'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                🌱 {t.readingLevelSimple}
              </button>
              <button
                onClick={() => setReadingLevel('advanced')}
                className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
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
          <div className="prose prose-invert max-w-none text-slate-200 leading-loose text-base sm:text-lg">
            {readingLevel === 'simple' ? (
              <p className="bg-slate-900/40 p-5 rounded-2xl border border-slate-800">
                {article.contentSimple[language] || article.contentSimple.ar}
              </p>
            ) : (
              <div className="space-y-4 bg-slate-900/40 p-5 rounded-2xl border border-slate-800">
                <p>{article.contentAdvanced[language] || article.contentAdvanced.ar}</p>
                <div className="text-xs text-slate-400 border-t border-slate-800 pt-3">
                  {language === 'ar' ? 'تحليل معمق مستند لأحدث الأبحاث الفلكية المحكمة.' : 'Peer-reviewed astrophysics context.'}
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
                    <span className="text-slate-400">{language === 'ar' ? 'الحرارة:' : 'Temperature:'}</span>
                    <strong className="text-slate-200 font-mono">{article.specs.temperature}</strong>
                  </div>
                )}
                {article.specs.distance && (
                  <div className="flex justify-between py-1">
                    <span className="text-slate-400">{language === 'ar' ? 'المسافة:' : 'Distance:'}</span>
                    <strong className="text-slate-200 font-mono">{article.specs.distance}</strong>
                  </div>
                )}
                {article.specs.age && (
                  <div className="flex justify-between py-1">
                    <span className="text-slate-400">{language === 'ar' ? 'العمر المقدر:' : 'Estimated Age:'}</span>
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
                onClick={() => {
                  onSelectVerse(article.relatedQuranVerseId!);
                  onClose();
                }}
                className="px-3.5 py-1.5 rounded-xl bg-amber-500 text-black font-bold text-xs hover:bg-amber-400 transition-colors shrink-0"
              >
                {language === 'ar' ? 'عرض التأمل القرآني' : 'View Quranic Study'}
              </button>
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
                onClick={handleLike}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-colors ${
                  liked
                    ? 'bg-rose-500/20 border-rose-500 text-rose-300'
                    : 'bg-slate-900 border-slate-800 hover:text-white'
                }`}
              >
                <Heart className={`w-4 h-4 ${liked ? 'fill-rose-500 text-rose-500' : ''}`} />
                <span>{article.likes + (liked ? 1 : 0)}</span>
              </button>

              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:text-white transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span>{copied ? (language === 'ar' ? 'تم النسخ!' : 'Copied!') : t.shareArticle}</span>
              </button>
            </div>

            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>{t.lastUpdated}: {article.lastUpdated}</span>
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};
