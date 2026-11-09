import React, { useState } from 'react';
import { Search, X, BookOpen, Sparkles, Orbit, Image, ArrowRight, ArrowLeft } from 'lucide-react';
import { ScientificArticle, QuranVerseStudy, CelestialBody, Language } from '../types/cosmic';
import { filterArticlesList, searchQuranStudiesList, normalizeArabic } from '../utils/cosmicCalculations';
import { translations } from '../i18n/translations';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  articles: ScientificArticle[];
  quranStudies: QuranVerseStudy[];
  celestialBodies: CelestialBody[];
  language: Language;
  onSelectArticle: (article: ScientificArticle) => void;
  onSelectQuranStudy: (studyId: string) => void;
  onSelectTab: (tab: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = (props) => {
  if (!props.isOpen) return null;
  return <GlobalSearchModalDialog {...props} />;
};

const GlobalSearchModalDialog: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  articles,
  quranStudies,
  celestialBodies,
  language,
  onSelectArticle,
  onSelectQuranStudy,
  onSelectTab,
}) => {
  const t = translations[language];
  const [query, setQuery] = useState('');

  const matchedArticles = filterArticlesList(articles, query, 'all', language);
  const matchedQuran = searchQuranStudiesList(quranStudies, query, language);

  const normalizedQuery = normalizeArabic(query.trim().toLowerCase());
  const matchedBodies = query.trim()
    ? celestialBodies.filter((b) => {
        const name = (b.name[language] || b.name.ar).toLowerCase();
        return name.includes(query.toLowerCase()) || normalizeArabic(name).includes(normalizedQuery);
      })
    : [];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-start justify-center p-4 pt-16 sm:pt-24 animate-in fade-in">
      <div className="w-full max-w-2xl rounded-3xl bg-[#090e24] border border-cyan-800/60 shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        
        {/* Search Input Bar */}
        <div className="relative p-4 sm:p-5 border-b border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-cyan-400 shrink-0" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full bg-transparent text-base sm:text-lg text-white placeholder-slate-500 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Results Area */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {query.trim() === '' ? (
            <div className="text-center py-8 text-xs text-slate-400">
              {language === 'ar'
                ? 'اكتب اسم كوكب، نجم، مجرة، رقم سورة، أو كلمة مفتاحية للبحث السريع في كامل المنصة.'
                : 'Type any celestial body, galaxy, Surah name, or concept to search.'}
            </div>
          ) : (
            <>
              {/* Celestial Bodies */}
              {matchedBodies.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                    <Orbit className="w-3.5 h-3.5" />
                    <span>{t.sections['solar-system']}</span>
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {matchedBodies.map((b) => (
                      <button
                        key={b.id}
                        onClick={() => {
                          onSelectTab('virtual-journeys');
                          onClose();
                        }}
                        className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-start flex items-center gap-2.5 transition-colors"
                      >
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: b.color }} />
                        <span className="text-xs font-bold text-white truncate">{b.name[language] || b.name.ar}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Articles */}
              {matchedArticles.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>{t.navEncyclopedia} ({matchedArticles.length})</span>
                  </span>
                  <div className="space-y-2">
                    {matchedArticles.map((art) => (
                      <button
                        key={art.id}
                        onClick={() => {
                          onSelectArticle(art);
                          onClose();
                        }}
                        className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-start flex items-center justify-between gap-3 transition-colors"
                      >
                        <div>
                          <h4 className="text-xs font-bold text-white mb-0.5">{art.title[language] || art.title.ar}</h4>
                          <span className="text-[10px] text-cyan-400">{t.sections[art.category] || art.category}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quran Studies */}
              {matchedQuran.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{t.navQuranCosmos} ({matchedQuran.length})</span>
                  </span>
                  <div className="space-y-2">
                    {matchedQuran.map((study) => (
                      <button
                        key={study.id}
                        onClick={() => {
                          onSelectQuranStudy(study.id);
                          onSelectTab('quran-cosmos');
                          onClose();
                        }}
                        className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 text-start transition-colors"
                      >
                        <div className="text-[11px] text-emerald-300 font-bold mb-1">
                          {t.surahLabel} {study.surah[language] || study.surah.ar} : {study.ayahNumber}
                        </div>
                        <p className="font-quran text-sm text-amber-100 truncate">
                          {study.arabicText}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {matchedArticles.length === 0 && matchedQuran.length === 0 && matchedBodies.length === 0 && (
                <div className="text-center py-8 text-xs text-slate-400">
                  {t.noResults}
                </div>
              )}
            </>
          )}
        </div>

      </div>
    </div>
  );
};
