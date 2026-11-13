import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  X,
  BookOpen,
  Sparkles,
  Orbit,
  Mic,
  MicOff,
  Compass,
  Volume2,
  AlertCircle,
} from 'lucide-react';
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

interface SpeechRecognitionAlternativeLike {
  transcript: string;
}

interface SpeechRecognitionResultLike {
  isFinal: boolean;
  [index: number]: SpeechRecognitionAlternativeLike;
}

interface SpeechRecognitionEventLike {
  resultIndex: number;
  results: ArrayLike<SpeechRecognitionResultLike>;
}

interface SpeechRecognitionErrorEventLike {
  error: string;
}

interface SpeechRecognitionInstance {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  onstart: (() => void) | null;
  onresult: ((ev: SpeechRecognitionEventLike) => void) | null;
  onerror: ((ev: SpeechRecognitionErrorEventLike) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
}

type SpeechRecognitionConstructor = new () => SpeechRecognitionInstance;

interface PlatformQuickRoute {
  tabId: string;
  title: { ar: string; en: string; fr: string };
  keywords: string[];
}

const PLATFORM_ROUTES: PlatformQuickRoute[] = [
  {
    tabId: 'encyclopedia',
    title: { ar: 'الموسوعة الكونية', en: 'Cosmic Encyclopedia', fr: 'Encyclopédie Cosmique' },
    keywords: ['الموسوعه', 'مقالات', 'ابحاث', 'دراسات', 'علم الفلك', 'encyclopedia', 'articles'],
  },
  {
    tabId: 'sky-map',
    title: { ar: 'خريطة السماء والأبراج', en: 'Sky Map & Constellations', fr: 'Carte du Ciel' },
    keywords: ['خريطه السماء', 'الابراج', 'النجوم', 'الصوفي', 'sky map', 'constellations'],
  },
  {
    tabId: 'live-feeds',
    title: { ar: 'بث المهمات الفضائية المباشر', en: 'Live Space Feeds', fr: 'Missions en Direct' },
    keywords: ['بث مباشر', 'ناسا', 'المحطه الفضائيه', 'nasa', 'esa', 'live'],
  },
  {
    tabId: 'events',
    title: { ar: 'الظواهر والأحداث الفلكية', en: 'Celestial Events', fr: 'Événements Célestes' },
    keywords: ['ظواهر', 'كسوف', 'خسوف', 'احداث فلكيه', 'زخات الشهب', 'eclipses'],
  },
  {
    tabId: 'virtual-journeys',
    title: { ar: 'الرحلات الافتراضية ثلاثية الأبعاد', en: 'Virtual Space Journeys', fr: 'Voyages Virtuels' },
    keywords: ['الرحلات الافتراضيه', 'المجموعه الشمسيه', 'محاكاه', 'solar system', 'virtual'],
  },
  {
    tabId: 'quran-cosmos',
    title: { ar: 'المصحف الشريف (ورش) والكون', en: 'Holy Quran (Warsh) & Cosmos', fr: 'Saint Coran (Warsh)' },
    keywords: ['المصحف', 'القران', 'ورش', 'تفسير', 'ايات', 'quran', 'warsh'],
  },
  {
    tabId: 'national-radios',
    title: { ar: 'الإذاعات الوطنية المغربية', en: 'Moroccan National Radios', fr: 'Radios Nationales' },
    keywords: ['اذاعه', 'الاذاعات', 'راديو', 'محمد السادس', 'المغربيه', 'radio'],
  },
  {
    tabId: 'prayer-times',
    title: { ar: 'مواقيت الصلاة والقبلة والتقويم الهجري', en: 'Cosmic Prayer Times & Qibla', fr: 'Horaires de Prière & Qibla' },
    keywords: ['الصلاه', 'مواقيت', 'القبله', 'الهجري', 'اذان', 'prayer', 'qibla'],
  },
  {
    tabId: 'gallery',
    title: { ar: 'معرض الفضاء (جيمس ويب وهابل)', en: 'Space Gallery', fr: 'Galerie Spatiale' },
    keywords: ['معرض', 'صور الفضاء', 'جيمس ويب', 'هابل', 'gallery', 'jwst'],
  },
  {
    tabId: 'quiz',
    title: { ar: 'اختبر معلوماتك الفلكية', en: 'Cosmic Quiz', fr: 'Quiz Cosmique' },
    keywords: ['اختبار', 'مسابقه', 'اسئله', 'معلوماتك', 'quiz'],
  },
];

/**
 * Strip natural spoken Arabic command prefixes like "ابحث عن" or "افتح"
 */
function extractArabicVoiceQuery(rawTranscript: string): string {
  const cleaned = rawTranscript
    .trim()
    .replace(/^[.،؟!]+|[.،؟!]+$/g, '')
    .replace(
      /^(?:أريد أن أبحث عن|اريد ان ابحث عن|ابحث عن|أبحث عن|بحث عن|ابحث لي عن|أبحث لي عن|حدثني عن|ما هو|ما هي|معلومات عن|افتح قسم|افتح|انتقل إلى|انتقل الى|اذهب إلى|اذهب الى)\s+/i,
      ''
    )
    .trim();
  return cleaned || rawTranscript.trim();
}

const VOICE_SUGGESTIONS_AR = [
  'الثقوب السوداء',
  'مجرة درب التبانة',
  'المجموعة الشمسية',
  'توسع الكون',
  'الشمس',
  'مواقيت الصلاة',
];

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = (props) => {
  if (!props.isOpen) return null;
  return <GlobalSearchModalDialog {...props} />;
};

const GlobalSearchModalDialog: React.FC<GlobalSearchModalProps> = ({
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
  const [isListening, setIsListening] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState('');
  const [voiceError, setVoiceError] = useState<string | null>(null);
  const [lastSpokenText, setLastSpokenText] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);

  const getSpeechRecognitionCtor = (): SpeechRecognitionConstructor | null => {
    if (typeof window === 'undefined') return null;
    const w = window as unknown as {
      SpeechRecognition?: SpeechRecognitionConstructor;
      webkitSpeechRecognition?: SpeechRecognitionConstructor;
    };
    return w.SpeechRecognition || w.webkitSpeechRecognition || null;
  };

  const speechSupported = Boolean(getSpeechRecognitionCtor());

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          // Ignore cleanup errors
        }
      }
    };
  }, []);

  const stopVoiceRecognition = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // Ignore stop errors
      }
    }
    setIsListening(false);
    setInterimTranscript('');
  };

  const handleToggleVoiceSearch = () => {
    setVoiceError(null);

    if (isListening) {
      stopVoiceRecognition();
      return;
    }

    const SpeechCtor = getSpeechRecognitionCtor();
    if (!SpeechCtor) {
      setVoiceError(
        language === 'ar'
          ? 'المتصفح الحالي لا يدعم البحث الصوتي. يرجى استخدام Chrome أو Edge أو Safari.'
          : language === 'fr'
          ? 'La reconnaissance vocale n’est pas prise en charge par ce navigateur.'
          : 'Voice search is not supported in this browser.'
      );
      return;
    }

    try {
      const recognition = new SpeechCtor();
      // Arabic speech recognition primary ('ar-SA') so Arabic voice commands work reliably across interfaces
      recognition.lang = 'ar-SA';
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
        setVoiceError(null);
        setInterimTranscript('');
      };

      recognition.onresult = (event: SpeechRecognitionEventLike) => {
        let finalText = '';
        let interimText = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          const text = result[0]?.transcript || '';
          if (result.isFinal) {
            finalText += text;
          } else {
            interimText += text;
          }
        }

        if (interimText.trim()) {
          const cleanedInterim = extractArabicVoiceQuery(interimText);
          setInterimTranscript(interimText.trim());
          setQuery(cleanedInterim);
        }

        if (finalText.trim()) {
          const cleanedFinal = extractArabicVoiceQuery(finalText);
          setLastSpokenText(finalText.trim());
          setQuery(cleanedFinal);
          setInterimTranscript('');
        }
      };

      recognition.onerror = (event: SpeechRecognitionErrorEventLike) => {
        setIsListening(false);
        setInterimTranscript('');
        if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
          setVoiceError(
            language === 'ar'
              ? 'يرجى السماح للمتصفح بالوصول إلى الميكروفون لاستخدام البحث الصوتي.'
              : language === 'fr'
              ? 'Veuillez autoriser l’accès au microphone pour la recherche vocale.'
              : 'Please allow microphone access to use voice search.'
          );
        } else if (event.error === 'no-speech') {
          setVoiceError(
            language === 'ar'
              ? 'لم يتم التقاط صوت واضح. اضغط على الميكروفون وتحدث مجدداً.'
              : 'No speech detected. Tap the microphone and try again.'
          );
        } else if (event.error !== 'aborted') {
          setVoiceError(
            language === 'ar'
              ? 'تعذر بدء التعرف الصوتي، يرجى المحاولة مرة أخرى.'
              : 'Could not capture voice input. Please try again.'
          );
        }
      };

      recognition.onend = () => {
        setIsListening(false);
        setInterimTranscript('');
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch {
      setIsListening(false);
      setVoiceError(
        language === 'ar'
          ? 'تعذر تفعيل الميكروفون على هذا الجهاز.'
          : 'Unable to activate microphone on this device.'
      );
    }
  };

  const matchedArticles = filterArticlesList(articles, query, 'all', language);
  const matchedQuran = searchQuranStudiesList(quranStudies, query, language);

  const normalizedQuery = normalizeArabic(query.trim().toLowerCase());
  const matchedBodies = query.trim()
    ? celestialBodies.filter((b) => {
        const name = (b.name[language] || b.name.ar).toLowerCase();
        const nameAr = b.name.ar.toLowerCase();
        return (
          name.includes(query.toLowerCase()) ||
          nameAr.includes(query.toLowerCase()) ||
          normalizeArabic(name).includes(normalizedQuery) ||
          normalizeArabic(nameAr).includes(normalizedQuery)
        );
      })
    : [];

  const matchedRoutes = normalizedQuery
    ? PLATFORM_ROUTES.filter((route) => {
        const titleNorm = normalizeArabic(route.title.ar + ' ' + route.title[language]);
        return (
          titleNorm.includes(normalizedQuery) ||
          route.keywords.some((kw) => {
            const normKw = normalizeArabic(kw);
            return normKw.includes(normalizedQuery) || normalizedQuery.includes(normKw);
          })
        );
      })
    : [];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-start justify-center p-4 pt-14 sm:pt-20 animate-in fade-in">
      <div className="w-full max-w-2xl rounded-3xl bg-[#090e24] border border-cyan-800/60 shadow-2xl overflow-hidden flex flex-col max-h-[82vh]">
        {/* Search Input Bar with Arabic Voice Search Mic Button */}
        <div className="relative p-4 sm:p-5 border-b border-slate-800 flex items-center gap-2.5 sm:gap-3">
          <Search className="w-5 h-5 text-cyan-400 shrink-0" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setLastSpokenText(null);
            }}
            placeholder={
              isListening
                ? language === 'ar'
                  ? 'جاري الاستماع لأمرك الصوتي بالعربية...'
                  : 'Listening to Arabic voice command...'
                : t.searchPlaceholder
            }
            className="w-full bg-transparent text-base sm:text-lg text-white placeholder-slate-500 focus:outline-none"
          />

          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setLastSpokenText(null);
              }}
              aria-label="Clear search"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          {/* Arabic Voice Search Button */}
          <button
            type="button"
            onClick={handleToggleVoiceSearch}
            data-testid="voice-search-btn"
            title={
              isListening
                ? language === 'ar'
                  ? 'إيقاف الاستماع'
                  : 'Stop Voice Search'
                : language === 'ar'
                ? 'البحث الصوتي بالأوامر العربية'
                : 'Arabic Voice Search'
            }
            aria-label={language === 'ar' ? 'البحث الصوتي بالعربية' : 'Arabic Voice Search'}
            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-bold transition-all shrink-0 cursor-pointer ${
              isListening
                ? 'bg-rose-500/20 border-rose-400 text-rose-200 animate-pulse shadow-lg shadow-rose-500/25'
                : speechSupported
                ? 'bg-cyan-500/15 hover:bg-cyan-500/25 border-cyan-500/40 text-cyan-200'
                : 'bg-slate-800/80 border-slate-700 text-slate-400'
            }`}
          >
            {isListening ? <MicOff className="w-4 h-4 text-rose-300" /> : <Mic className="w-4 h-4 text-cyan-300" />}
            <span className="hidden sm:inline">
              {isListening
                ? language === 'ar'
                  ? 'إيقاف'
                  : 'Stop'
                : language === 'ar'
                ? 'بحث صوتي'
                : 'Voice (AR)'}
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              stopVoiceRecognition();
              onClose();
            }}
            aria-label="Close search"
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Listening / Voice Recognition Banner */}
        {isListening && (
          <div
            data-testid="voice-listening-banner"
            className="px-5 py-3 bg-rose-950/40 border-b border-rose-500/30 flex items-center justify-between gap-3 text-xs"
          >
            <div className="flex items-center gap-2.5 text-rose-200">
              <Volume2 className="w-4 h-4 text-rose-400 animate-bounce shrink-0" />
              <div>
                <span className="font-bold block">
                  {language === 'ar'
                    ? 'الميكروفون نشط (اللغة العربية) — انطق اسم المقال أو الموضوع الفلكي'
                    : 'Listening in Arabic (ar-SA) — Speak a topic or article name'}
                </span>
                {interimTranscript && (
                  <span className="text-[11px] text-amber-200 block mt-0.5">
                    «{interimTranscript}»
                  </span>
                )}
              </div>
            </div>
            <button
              type="button"
              onClick={stopVoiceRecognition}
              className="px-2.5 py-1 rounded-lg bg-rose-500/25 hover:bg-rose-500/40 text-rose-100 font-bold shrink-0 cursor-pointer"
            >
              {language === 'ar' ? 'إنهاء' : 'Stop'}
            </button>
          </div>
        )}

        {/* Voice Feedback / Error Message */}
        {voiceError && (
          <div className="px-5 py-2.5 bg-amber-950/40 border-b border-amber-500/30 flex items-center gap-2 text-xs text-amber-200">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{voiceError}</span>
          </div>
        )}

        {lastSpokenText && !isListening && (
          <div className="px-5 py-2 bg-cyan-950/35 border-b border-cyan-800/40 flex items-center justify-between gap-2 text-[11px] text-cyan-300">
            <span>
              {language === 'ar'
                ? `تم التعرف الصوتي على: «${lastSpokenText}»`
                : `Voice command captured: "${lastSpokenText}"`}
            </span>
            <button
              type="button"
              onClick={handleToggleVoiceSearch}
              className="text-amber-300 hover:underline font-bold cursor-pointer"
            >
              {language === 'ar' ? 'تحدث مجدداً' : 'Speak again'}
            </button>
          </div>
        )}

        {/* Search Results Area */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {query.trim() === '' ? (
            <div className="space-y-5 py-4 text-center">
              <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                {language === 'ar'
                  ? 'اكتب أو اضغط على زر الميكروفون «بحث صوتي» ونطق بالأمر الصوتي باللغة العربية للبحث الفوري في المقالات، الآيات، الأجرام السماوية، أو أقسام المنصة.'
                  : 'Type or tap "Voice (AR)" and speak an Arabic command to search articles, Quran studies, celestial bodies, or sections.'}
              </p>

              {/* Quick Spoken / Search Examples */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-cyan-400 block">
                  {language === 'ar' ? 'أمثلة للأوامر الصوتية العربية:' : 'Arabic Voice Command Examples:'}
                </span>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  {VOICE_SUGGESTIONS_AR.map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => setQuery(term)}
                      className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 text-xs text-slate-200 transition-colors cursor-pointer"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Platform Sections Quick Jumps */}
              {matchedRoutes.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-300 flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5" />
                    <span>{language === 'ar' ? 'أقسام المنصة المطابقة' : 'Matching Sections'}</span>
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {matchedRoutes.map((route) => (
                      <button
                        key={route.tabId}
                        type="button"
                        onClick={() => {
                          onSelectTab(route.tabId);
                          onClose();
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/30 hover:border-cyan-400/60 text-start text-xs font-bold text-white transition-colors cursor-pointer"
                      >
                        {route.title[language]}
                      </button>
                    ))}
                  </div>
                </div>
              )}

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
                        type="button"
                        onClick={() => {
                          onSelectTab('virtual-journeys');
                          onClose();
                        }}
                        className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-start flex items-center gap-2.5 transition-colors cursor-pointer"
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
                        type="button"
                        onClick={() => {
                          onSelectArticle(art);
                          onClose();
                        }}
                        className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-start flex items-center justify-between gap-3 transition-colors cursor-pointer"
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
                        type="button"
                        onClick={() => {
                          onSelectQuranStudy(study.id);
                          onSelectTab('quran-cosmos');
                          onClose();
                        }}
                        className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 text-start transition-colors cursor-pointer"
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

              {matchedRoutes.length === 0 &&
                matchedArticles.length === 0 &&
                matchedQuran.length === 0 &&
                matchedBodies.length === 0 && (
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
