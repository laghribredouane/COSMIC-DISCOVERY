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
  Volume1,
  Play,
  Pause,
  Square,
  Headphones,
  Maximize2,
  Minimize2,
  Type,
  List,
  Check,
  CheckCircle2,
  Copy,
  BookOpen,
  Send,
  Smartphone,
  Link2,
  Mail
} from 'lucide-react';
import { ScientificArticle, Language } from '../types/cosmic';
import { translations } from '../i18n/translations';

// Custom Crisp SVG Icons for Social Media Platforms
const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c4.56 0 8.25 3.69 8.25 8.24 0 2.2-.86 4.28-2.42 5.84l-.15.15-4.88 1.28.34-.89c-.39-.24-.76-.51-1.11-.81l-.1-.08-.13-.02a8.212 8.212 0 0 1-4.73-1.63l-.36-.26-3.11.82.83-3.03-.24-.38a8.225 8.225 0 0 1-1.28-4.4c0-4.55 3.7-8.24 8.25-8.24m4.53 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.24-.75-.67-1.25-1.5-1.4-1.75-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.32-.02-.45-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.78 2.72 4.31 3.81.6.26 1.07.41 1.44.53.61.19 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.1-.22-.17-.47-.3" />
  </svg>
);

const XTwitterIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const TelegramIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
  </svg>
);

const FacebookIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const LinkedInIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

const EmailIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
  </svg>
);

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
  const [richCopied, setRichCopied] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [showSharePanel, setShowSharePanel] = useState(false);
  const [shareFeedback, setShareFeedback] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speechRate, setSpeechRate] = useState<number>(1.0);
  const [speechSupported, setSpeechSupported] = useState(true);
  const [fontSizeLevel, setFontSizeLevel] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showArticleIndex, setShowArticleIndex] = useState(false);

  // Check Web Speech API browser availability
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const supported = 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
      setSpeechSupported(supported);
    }
  }, []);

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
        if (isShareModalOpen) {
          setIsShareModalOpen(false);
          return;
        }
        stopSpeech();
        onClose();
      } else if (e.key === 'ArrowRight') {
        if (!isShareModalOpen) {
          if (isRtl) handlePrev();
          else handleNext();
        }
      } else if (e.key === 'ArrowLeft') {
        if (!isShareModalOpen) {
          if (isRtl) handleNext();
          else handlePrev();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, articles, isRtl, isShareModalOpen]);

  const stopSpeech = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setIsPaused(false);
    }
  };

  // Stop speech on unmount or article change
  useEffect(() => {
    return () => stopSpeech();
  }, [article.id]);

  const handlePauseResumeSpeech = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    } else if (window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  };

  const handleStartSpeech = (rateOverride?: number) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setSpeechSupported(false);
      return;
    }

    // Cancel any ongoing speech first
    window.speechSynthesis.cancel();

    const titleText = article.title[language] || article.title.ar;
    const summaryText = article.summary[language] || article.summary.ar;
    const bodyText =
      readingLevel === 'simple'
        ? article.contentSimple[language] || article.contentSimple.ar
        : article.contentAdvanced[language] || article.contentAdvanced.ar;

    const fullSpeech = `${titleText}. ${summaryText}. ${bodyText}`;
    const utterance = new SpeechSynthesisUtterance(fullSpeech);

    // Natural voice and language matching
    const langCode = language === 'ar' ? 'ar-SA' : language === 'fr' ? 'fr-FR' : 'en-US';
    utterance.lang = langCode;
    utterance.rate = rateOverride ?? speechRate;

    try {
      const voices = window.speechSynthesis.getVoices();
      const prefix = language === 'ar' ? 'ar' : language === 'fr' ? 'fr' : 'en';
      const bestVoice =
        voices.find((v) => v.lang.toLowerCase().startsWith(prefix)) ||
        voices.find((v) => v.lang.toLowerCase().includes(prefix));
      if (bestVoice) {
        utterance.voice = bestVoice;
      }
    } catch {
      // Voice fallback ignored
    }

    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };

    setIsSpeaking(true);
    setIsPaused(false);
    window.speechSynthesis.speak(utterance);
  };

  const handleToggleSpeech = () => {
    if (isSpeaking) {
      if (isPaused) {
        handlePauseResumeSpeech();
      } else {
        stopSpeech();
      }
    } else {
      handleStartSpeech();
    }
  };

  const handleLike = () => {
    if (!liked && onLike) {
      onLike(article.id);
      setLiked(true);
    }
  };

  const canUseWebShare = useMemo(() => {
    return typeof navigator !== 'undefined' && typeof navigator.share === 'function';
  }, []);

  const getShareUrl = (): string => {
    if (typeof window === 'undefined') return '';
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('article', article.id);
      return url.toString();
    } catch {
      return window.location.href;
    }
  };

  const copyToClipboard = async (customUrl?: string): Promise<boolean> => {
    const url = customUrl || getShareUrl();
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setShareFeedback('copied');
        setTimeout(() => {
          setCopied(false);
          setShareFeedback(null);
        }, 3000);
        return true;
      } catch {
        // Fallback for older browsers
        try {
          const textarea = document.createElement('textarea');
          textarea.value = url;
          textarea.style.position = 'fixed';
          textarea.style.opacity = '0';
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand('copy');
          document.body.removeChild(textarea);
          setCopied(true);
          setShareFeedback('copied');
          setTimeout(() => {
            setCopied(false);
            setShareFeedback(null);
          }, 3000);
          return true;
        } catch {
          // ignore error
        }
      }
    }
    return false;
  };

  const shareTitle = article.title[language] || article.title.ar;
  const shareSummary = article.summary[language] || article.summary.ar;
  const currentShareUrl = getShareUrl();

  const handleOpenShare = () => {
    setIsShareModalOpen(true);
  };

  const handleNativeDeviceShare = async () => {
    if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
      try {
        await navigator.share({
          title: shareTitle,
          text: `${shareTitle}\n\n${shareSummary}`,
          url: currentShareUrl,
        });
      } catch (err: any) {
        if (err?.name !== 'AbortError') {
          console.error('Web Share error:', err);
        }
      }
    }
  };

  const copyRichShareText = async () => {
    const textToCopy = `${shareTitle}\n\n${shareSummary}\n\n${currentShareUrl}`;
    const ok = await copyToClipboard(textToCopy);
    if (ok) {
      setRichCopied(true);
      setTimeout(() => setRichCopied(false), 3000);
    }
  };

  const socialPlatforms = useMemo(() => [
    {
      name: language === 'ar' ? 'واتساب' : 'WhatsApp',
      icon: WhatsAppIcon,
      bgClass: 'bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-md shadow-[#25D366]/20',
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareTitle}\n\n${shareSummary}\n\n${currentShareUrl}`)}`,
    },
    {
      name: language === 'ar' ? 'إكس (تويتر)' : 'X (Twitter)',
      icon: XTwitterIcon,
      bgClass: 'bg-black hover:bg-slate-900 text-white border border-slate-700 shadow-md',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(currentShareUrl)}`,
    },
    {
      name: language === 'ar' ? 'تيليغرام' : 'Telegram',
      icon: TelegramIcon,
      bgClass: 'bg-[#229ED9] hover:bg-[#1e8ec3] text-white shadow-md shadow-[#229ED9]/20',
      url: `https://t.me/share/url?url=${encodeURIComponent(currentShareUrl)}&text=${encodeURIComponent(shareTitle)}`,
    },
    {
      name: language === 'ar' ? 'فيسبوك' : 'Facebook',
      icon: FacebookIcon,
      bgClass: 'bg-[#1877F2] hover:bg-[#166fe5] text-white shadow-md shadow-[#1877F2]/20',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentShareUrl)}`,
    },
    {
      name: language === 'ar' ? 'لينكد إن' : 'LinkedIn',
      icon: LinkedInIcon,
      bgClass: 'bg-[#0A66C2] hover:bg-[#095196] text-white shadow-md shadow-[#0A66C2]/20',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentShareUrl)}`,
    },
    {
      name: language === 'ar' ? 'البريد الإلكتروني' : 'Email',
      icon: EmailIcon,
      bgClass: 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-md shadow-cyan-600/20',
      url: `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(`${shareTitle}\n\n${shareSummary}\n\n${currentShareUrl}`)}`,
    },
  ], [shareTitle, shareSummary, currentShareUrl, language]);

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

            {/* Text to Speech Button in Top Bar */}
            <button
              type="button"
              onClick={handleToggleSpeech}
              title={
                isSpeaking
                  ? isPaused
                    ? language === 'ar'
                      ? 'استئناف القراءة الصوتية'
                      : 'Resume Audio Reading'
                    : language === 'ar'
                    ? 'إيقاف مؤقت للقراءة الصوتية'
                    : 'Pause Audio Reading'
                  : language === 'ar'
                  ? 'استمع للمقال بصوت واضح عبر Web Speech API'
                  : 'Listen to Article Aloud (Web Speech API)'
              }
              className={`p-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                isSpeaking && !isPaused
                  ? 'bg-cyan-500/25 text-cyan-300 border border-cyan-400 shadow-md shadow-cyan-500/20'
                  : isSpeaking && isPaused
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white'
              }`}
            >
              {isSpeaking && !isPaused ? (
                <Volume2 className="w-4 h-4 text-cyan-400 animate-pulse" />
              ) : isSpeaking && isPaused ? (
                <Volume1 className="w-4 h-4 text-amber-400" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
              <span className="text-xs font-semibold hidden md:inline">
                {isSpeaking
                  ? isPaused
                    ? language === 'ar'
                      ? 'مؤقت'
                      : 'Paused'
                    : language === 'ar'
                    ? 'جاري الاستماع...'
                    : 'Playing...'
                  : language === 'ar'
                  ? 'قراءة صوتية'
                  : language === 'fr'
                  ? 'Lecture vocale'
                  : 'Listen'}
              </span>
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

            {/* Share Button (Direct Link & Social Media) */}
            <button
              type="button"
              onClick={handleOpenShare}
              title={
                language === 'ar'
                  ? 'مشاركة المقال'
                  : language === 'fr'
                  ? 'Partager l’article'
                  : 'Share Article'
              }
              className={`p-2 sm:px-3 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                copied
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50'
                  : 'bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/40 hover:border-cyan-400'
              }`}
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4 text-cyan-300" />}
              <span className="text-xs font-semibold">
                {copied
                  ? language === 'ar'
                    ? 'تم النسخ!'
                    : language === 'fr'
                    ? 'Copié !'
                    : 'Copied!'
                  : t.shareArticle}
              </span>
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

        {/* Interactive Social Media & Link Sharing Drawer */}
        {showSharePanel && (
          <div className="p-4 sm:p-5 bg-[#0b122c] border-b border-cyan-800/60 animate-in slide-in-from-top-2 shadow-2xl relative z-20">
            <div className="flex items-center justify-between gap-3 mb-3.5">
              <div className="flex items-center gap-2">
                <Share2 className="w-4 h-4 text-cyan-400" />
                <h4 className="text-sm font-bold text-white">
                  {language === 'ar'
                    ? 'مشاركة المقال عبر وسائل التواصل الاجتماعي'
                    : language === 'fr'
                    ? 'Partager l’article sur les réseaux sociaux'
                    : 'Share Article on Social Media'}
                </h4>
              </div>

              <button
                type="button"
                onClick={() => setShowSharePanel(false)}
                className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close share panel"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Copied Success Alert Banner */}
            {copied && (
              <div className="mb-3 p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/50 flex items-center gap-2 text-xs text-emerald-300 font-semibold animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  {language === 'ar'
                    ? 'تم نسخ رابط المقال إلى الحافظة بنجاح! يمكنك لصقه أو مشاركته الآن عبر أي منصة.'
                    : language === 'fr'
                    ? 'Lien de l’article copié dans le presse-papiers avec succès !'
                    : 'Article link copied to clipboard successfully!'}
                </span>
              </div>
            )}

            {/* Read-only URL box with 1-click Copy */}
            <div className="flex items-center gap-2 mb-4 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
              <input
                type="text"
                readOnly
                value={currentShareUrl}
                className="bg-transparent text-xs font-mono text-cyan-300 flex-1 px-2.5 py-1 outline-none select-all truncate"
              />
              <button
                type="button"
                onClick={() => copyToClipboard(currentShareUrl)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer shrink-0 ${
                  copied
                    ? 'bg-emerald-500 text-slate-950'
                    : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950'
                }`}
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>
                  {copied
                    ? language === 'ar'
                      ? 'تم النسخ'
                      : language === 'fr'
                      ? 'Copié'
                      : 'Copied'
                    : language === 'ar'
                    ? 'نسخ الرابط'
                    : language === 'fr'
                    ? 'Copier le lien'
                    : 'Copy Link'}
                </span>
              </button>
            </div>

            {/* Social Share Buttons Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
              {socialPlatforms.map((platform) => (
                <a
                  key={platform.name}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm ${platform.bgClass}`}
                >
                  <platform.icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{platform.name}</span>
                </a>
              ))}
            </div>

            {/* Device Web Share API Button if available */}
            {canUseWebShare && (
              <div className="mt-3.5 pt-3 border-t border-slate-800 flex justify-end">
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      await navigator.share({
                        title: shareTitle,
                        text: `${shareTitle} — ${shareSummary}`,
                        url: currentShareUrl,
                      });
                    } catch {
                      // ignore abort
                    }
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-bold transition-colors cursor-pointer border border-cyan-800/50"
                >
                  <Smartphone className="w-4 h-4 text-cyan-400" />
                  <span>
                    {language === 'ar'
                      ? 'مشاركة عبر تطبيقات الهاتف (Web Share)'
                      : language === 'fr'
                      ? 'Partager via les applications de l’appareil'
                      : 'Share via Device Apps'}
                  </span>
                </button>
              </div>
            )}
          </div>
        )}

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

          {/* Quick Action & Share Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-slate-900/80 border border-cyan-900/40 shadow-md">
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                <span>{article.lastUpdated}</span>
              </span>
              <span className="text-slate-600 hidden sm:inline">•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                <span>{article.readingTimeMin} {t.readingTime}</span>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleOpenShare}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500/25 to-blue-500/25 hover:from-cyan-500/40 hover:to-blue-500/40 border border-cyan-500/50 text-cyan-200 text-xs font-bold transition-all cursor-pointer shadow-sm hover:scale-[1.02]"
              >
                <Share2 className="w-4 h-4 text-cyan-300" />
                <span>{t.shareArticle}</span>
              </button>

              <button
                type="button"
                onClick={() => copyToClipboard(currentShareUrl)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                title={language === 'ar' ? 'نسخ رابط المقال المباشر' : 'Copy Direct Article Link'}
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-cyan-400" />}
                <span>{copied ? (language === 'ar' ? 'تم النسخ' : 'Copied') : (language === 'ar' ? 'نسخ الرابط' : 'Copy Link')}</span>
              </button>
            </div>
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

          {/* Dedicated Interactive Web Speech Audio Player Bar */}
          <div className="rounded-2xl p-4 sm:p-5 bg-gradient-to-r from-slate-900/95 via-indigo-950/40 to-slate-900/95 border border-cyan-800/40 shadow-xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div
                className={`p-3 rounded-2xl shrink-0 transition-all ${
                  isSpeaking && !isPaused
                    ? 'bg-cyan-500/20 border border-cyan-400 text-cyan-300 shadow-lg shadow-cyan-500/20'
                    : 'bg-slate-800 border border-slate-700 text-slate-300'
                }`}
              >
                <Headphones className="w-5 h-5 text-cyan-400" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white">
                    {language === 'ar'
                      ? 'القارئ الصوتي الذكي (Web Speech API)'
                      : language === 'fr'
                      ? 'Lecteur vocal intelligent (Web Speech API)'
                      : 'Smart Audio Reader (Web Speech API)'}
                  </h3>
                  {isSpeaking && !isPaused && (
                    <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-[10px] text-cyan-300 font-bold animate-pulse">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                      <span>
                        {language === 'ar'
                          ? 'جاري القراءة الصوتية'
                          : language === 'fr'
                          ? 'Lecture en cours'
                          : 'Playing'}
                      </span>
                    </span>
                  )}
                  {isSpeaking && isPaused && (
                    <span className="px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-[10px] text-amber-300 font-bold">
                      {language === 'ar' ? 'مؤقت' : language === 'fr' ? 'En pause' : 'Paused'}
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-400 mt-0.5">
                  {language === 'ar'
                    ? `استمع إلى مقال «${article.title[language] || article.title.ar}» بنطق صوتي طبيعي ومباشر.`
                    : language === 'fr'
                    ? `Écoutez l'article lu à voix haute grâce à la synthèse vocale intégrée du navigateur.`
                    : `Listen to this article read aloud using the browser's built-in Web Speech API.`}
                </p>
              </div>
            </div>

            {/* Audio Controls */}
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              {/* Play / Pause Toggle Button */}
              <button
                type="button"
                onClick={handleToggleSpeech}
                disabled={!speechSupported}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer shadow-md disabled:opacity-50 disabled:cursor-not-allowed ${
                  isSpeaking && !isPaused
                    ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-rose-500/20'
                    : isSpeaking && isPaused
                    ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-black'
                    : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black shadow-cyan-500/20'
                }`}
              >
                {isSpeaking && !isPaused ? (
                  <>
                    <Pause className="w-4 h-4" />
                    <span>{language === 'ar' ? 'إيقاف مؤقت' : language === 'fr' ? 'Pause' : 'Pause'}</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" />
                    <span>
                      {isPaused
                        ? language === 'ar'
                          ? 'استئناف'
                          : language === 'fr'
                          ? 'Reprendre'
                          : 'Resume'
                        : language === 'ar'
                        ? 'استمع للمقال'
                        : language === 'fr'
                        ? 'Écouter l’article'
                        : 'Listen to Article'}
                    </span>
                  </>
                )}
              </button>

              {/* Stop Button */}
              {isSpeaking && (
                <button
                  type="button"
                  onClick={stopSpeech}
                  title={language === 'ar' ? 'إنهاء القراءة' : language === 'fr' ? 'Arrêter' : 'Stop'}
                  className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  <Square className="w-4 h-4" />
                </button>
              )}

              {/* Speed / Rate Selector */}
              <div className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-xl border border-slate-800">
                {[0.8, 1.0, 1.2].map((rate) => (
                  <button
                    key={rate}
                    type="button"
                    onClick={() => {
                      setSpeechRate(rate);
                      if (isSpeaking) {
                        handleStartSpeech(rate);
                      }
                    }}
                    className={`px-2 py-1 rounded-lg text-[11px] font-bold font-mono transition-colors cursor-pointer ${
                      speechRate === rate
                        ? 'bg-cyan-500/30 text-cyan-300 border border-cyan-500/50'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {rate}x
                  </button>
                ))}
              </div>
            </div>
          </div>

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

              {/* Text-to-Speech Quick Toggle */}
              <button
                type="button"
                onClick={handleToggleSpeech}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
                  isSpeaking && !isPaused
                    ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300'
                    : isSpeaking && isPaused
                    ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                    : 'bg-slate-900 border-slate-800 hover:text-white'
                }`}
                title={
                  language === 'ar'
                    ? 'الاستماع للمقال عبر القارئ الصوتي'
                    : language === 'fr'
                    ? 'Écouter l’article'
                    : 'Listen to Article Aloud'
                }
              >
                {isSpeaking && !isPaused ? (
                  <Volume2 className="w-4 h-4 text-cyan-400 animate-pulse" />
                ) : isSpeaking && isPaused ? (
                  <Volume1 className="w-4 h-4 text-amber-400" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
                <span>
                  {isSpeaking
                    ? isPaused
                      ? language === 'ar'
                        ? 'مؤقت'
                        : 'Paused'
                      : language === 'ar'
                      ? 'إيقاف'
                      : 'Stop'
                    : language === 'ar'
                    ? 'استماع'
                    : language === 'fr'
                    ? 'Écouter'
                    : 'Listen'}
                </span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleOpenShare}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 border border-cyan-500/50 hover:border-cyan-400 text-cyan-200 font-bold text-xs transition-all cursor-pointer shadow-sm"
                >
                  <Share2 className="w-4 h-4 text-cyan-400" />
                  <span>{t.shareArticle}</span>
                </button>

                <button
                  type="button"
                  onClick={() => copyToClipboard(currentShareUrl)}
                  className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 transition-colors cursor-pointer"
                  title={language === 'ar' ? 'نسخ الرابط المباشر' : 'Copy Direct Link'}
                  aria-label="Copy Direct Link"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
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

      {/* Dedicated Floating Share Dialog Modal */}
      {isShareModalOpen && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setIsShareModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="share-modal-title"
        >
          <div
            className="relative w-full max-w-lg rounded-3xl bg-[#090e24] border border-cyan-500/50 shadow-2xl p-5 sm:p-6 text-slate-100 flex flex-col gap-4 animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto scrollbar-thin"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Share Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300">
                  <Share2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 id="share-modal-title" className="text-base font-bold text-white">
                    {language === 'ar'
                      ? 'مشاركة المقال العلمي'
                      : language === 'fr'
                      ? 'Partager l’article scientifique'
                      : 'Share Scientific Article'}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {language === 'ar'
                      ? 'انسخ الرابط المباشر أو انشر المقال عبر منصات التواصل'
                      : 'Copy direct link or share on social platforms'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsShareModalOpen(false)}
                className="p-1.5 rounded-xl bg-slate-800/80 hover:bg-rose-950/40 text-slate-400 hover:text-rose-400 border border-slate-700 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Article Mini Card Preview */}
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-cyan-900/40 flex items-start gap-3">
              {article.image && (
                <img
                  src={article.image}
                  alt=""
                  className="w-16 h-16 rounded-xl object-cover shrink-0 border border-slate-800"
                />
              )}
              <div className="min-w-0 flex-1">
                <span className="inline-block px-2 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 text-[10px] font-bold border border-cyan-500/30 mb-1">
                  {t.sections[article.category] || article.category}
                </span>
                <h4 className="text-xs sm:text-sm font-bold text-white truncate">
                  {article.title[language] || article.title.ar}
                </h4>
                <p className="text-[11px] text-slate-400 line-clamp-2 mt-0.5">
                  {article.summary[language] || article.summary.ar}
                </p>
              </div>
            </div>

            {/* Copied Success Alerts */}
            {copied && (
              <div className="p-3 rounded-xl bg-emerald-950/70 border border-emerald-500/60 flex items-center gap-2 text-xs text-emerald-300 font-semibold animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  {language === 'ar'
                    ? 'تم نسخ الرابط المباشر للمقال بنجاح! جاهز للصق والمشاركة.'
                    : language === 'fr'
                    ? 'Lien direct de l’article copié avec succès !'
                    : 'Direct article link copied successfully!'}
                </span>
              </div>
            )}

            {richCopied && (
              <div className="p-3 rounded-xl bg-cyan-950/70 border border-cyan-500/60 flex items-center gap-2 text-xs text-cyan-300 font-semibold animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>
                  {language === 'ar'
                    ? 'تم نسخ عنوان وملخص المقال مع الرابط بنجاح!'
                    : 'Article title, summary & link copied!'}
                </span>
              </div>
            )}

            {/* Direct Link Section */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Link2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>
                  {language === 'ar'
                    ? 'الرابط المباشر للمقال:'
                    : language === 'fr'
                    ? 'Lien direct de l’article :'
                    : 'Direct Article Link:'}
                </span>
              </label>
              <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800 focus-within:border-cyan-500/70 transition-colors">
                <input
                  type="text"
                  readOnly
                  value={currentShareUrl}
                  onClick={(e) => (e.target as HTMLInputElement).select()}
                  className="bg-transparent text-xs font-mono text-cyan-300 flex-1 px-2.5 py-1.5 outline-none select-all truncate"
                />
                <button
                  type="button"
                  onClick={() => copyToClipboard(currentShareUrl)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer shrink-0 ${
                    copied
                      ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30'
                      : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-md shadow-cyan-500/20'
                  }`}
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>
                    {copied
                      ? language === 'ar'
                        ? 'تم النسخ'
                        : 'Copied'
                      : language === 'ar'
                      ? 'نسخ الرابط'
                      : language === 'fr'
                      ? 'Copier'
                      : 'Copy Link'}
                  </span>
                </button>
              </div>
            </div>

            {/* Social Platforms Grid */}
            <div>
              <span className="block text-xs font-bold text-slate-300 mb-2">
                {language === 'ar'
                  ? 'المشاركة عبر منصات التواصل الاجتماعي:'
                  : language === 'fr'
                  ? 'Partager sur les réseaux sociaux :'
                  : 'Share on Social Media:'}
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {socialPlatforms.map((platform) => (
                  <a
                    key={platform.name}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${platform.bgClass}`}
                  >
                    <platform.icon className="w-4 h-4 shrink-0" />
                    <span className="truncate">{platform.name}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Additional Actions: Copy Rich Text + Web Share */}
            <div className="pt-2 border-t border-slate-800/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2">
              <button
                type="button"
                onClick={copyRichShareText}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition-colors cursor-pointer"
                title={language === 'ar' ? 'نسخ عنوان وملخص المقال مع الرابط المباشر' : 'Copy title & summary with direct link'}
              >
                <Copy className="w-3.5 h-3.5 text-cyan-400" />
                <span>
                  {richCopied
                    ? language === 'ar'
                      ? 'تم نسخ النص الكامل'
                      : 'Copied Full Text'
                    : language === 'ar'
                    ? 'نسخ الملخص مع الرابط'
                    : 'Copy Summary & Link'}
                </span>
              </button>

              {canUseWebShare && (
                <button
                  type="button"
                  onClick={handleNativeDeviceShare}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-cyan-950/60 hover:bg-cyan-900/60 text-cyan-300 hover:text-cyan-200 text-xs font-bold border border-cyan-800/50 transition-colors cursor-pointer"
                >
                  <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
                  <span>
                    {language === 'ar'
                      ? 'تطبيقات الجهاز'
                      : language === 'fr'
                      ? 'Applications de l’appareil'
                      : 'Device Apps'}
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
