import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  BookOpen,
  Search,
  Volume2,
  Play,
  Pause,
  Bookmark,
  BookmarkCheck,
  Copy,
  Check,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Info,
  Sun,
  Moon,
  List,
  BookMarked,
  Award,
  X
} from 'lucide-react';
import { Language } from '../types/cosmic';
import {
  SURAH_METADATA_WARSH,
  MOROCCAN_WARSH_RECITERS,
  SurahMetaWarsh,
} from '../data/surahMetadataWarsh';

interface MoroccanWarshQuranProps {
  language: Language;
}

interface WarshVerse {
  chapter: number;
  verse: number;
  text: string;
  page?: number;
  juz?: number;
  hizb?: number;
  maqra?: number;
}

interface MarginWordMeaning {
  word: string;
  meaning: string;
  verse?: number;
}

interface SavedBookmark {
  surahNumber: number;
  verseNumber: number;
  pageNumber: number;
  surahNameAr: string;
  timestamp: string;
}

const COSMIC_KEYWORDS_AR = [
  'السماوات',
  'السماء',
  'الأرض',
  'الارز',
  'الشمس',
  'القمر',
  'النجوم',
  'الكواكب',
  'فلك',
  'الليل',
  'النهار',
  'البروج',
  'الطارق',
  'المشارق',
  'المغارب',
  'الشفق',
  'الفجر',
  'الأهلة',
  'الرياح',
  'السحاب',
];

function normalizeArabicText(str: string): string {
  return str
    .replace(/[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06ED\u08F0-\u08FF]/g, '')
    .replace(/[أإآٱ]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/ى/g, 'ي')
    .trim();
}

function isCosmicVerse(text: string): boolean {
  const norm = normalizeArabicText(text);
  return COSMIC_KEYWORDS_AR.some((kw) => norm.includes(normalizeArabicText(kw)));
}

/**
 * Ornate Octagonal Moroccan Verse Number Medallion (نجمة ثمانية مغربية لأرقام الآيات 1، 2، 3...)
 */
const MoroccanVerseMedallion: React.FC<{
  verseNumber: number;
  darkTheme?: boolean;
}> = ({ verseNumber, darkTheme = false }) => {
  return (
    <span
      className="inline-flex items-center justify-center align-middle mx-1.5 select-none relative"
      style={{ width: '2.15em', height: '2.15em' }}
      title={`آية ${verseNumber}`}
    >
      <svg viewBox="0 0 44 44" className="w-full h-full overflow-visible">
        {/* Outer 8-pointed star (Rub el Hizb geometry) */}
        <polygon
          points="22,2 27.5,8.5 36,8 35.5,16.5 42,22 35.5,27.5 36,36 27.5,35.5 22,42 16.5,35.5 8,36 8.5,27.5 2,22 8.5,16.5 8,8 16.5,8.5"
          fill={darkTheme ? '#112233' : '#ffffff'}
          stroke={darkTheme ? '#fbbf24' : '#1e293b'}
          strokeWidth="1.8"
        />
        <polygon
          points="22,5 26.5,10.5 33.5,10.5 33.5,17.5 39,22 33.5,26.5 33.5,33.5 26.5,33.5 22,39 17.5,33.5 10.5,33.5 10.5,26.5 5,22 10.5,17.5 10.5,10.5 17.5,10.5"
          fill="none"
          stroke={darkTheme ? '#38bdf8' : '#15803d'}
          strokeWidth="1"
        />
        <circle
          cx="22"
          cy="22"
          r="11.5"
          fill={darkTheme ? '#081226' : '#fefcf5'}
          stroke={darkTheme ? '#fbbf24' : '#1e293b'}
          strokeWidth="1.3"
        />
        <text
          x="22"
          y="26.5"
          textAnchor="middle"
          fill={darkTheme ? '#fde68a' : '#111827'}
          fontSize="13.5"
          fontWeight="800"
          fontFamily="'Plus Jakarta Sans', 'Cairo', sans-serif"
        >
          {verseNumber}
        </text>
      </svg>
    </span>
  );
};

/**
 * Ornate Moroccan Marginal Mihrab/Dome Emblem for Thumun / Rub' / Hizb (علامة الثُّمُن / الحِزْب بالهامش)
 */
const MarginalThumunEmblem: React.FC<{
  label?: string;
  darkTheme?: boolean;
}> = ({ label = 'ثُمُنٌ', darkTheme = false }) => {
  return (
    <div className="my-3 flex flex-col items-center justify-center select-none">
      <svg viewBox="0 0 70 105" className="w-14 h-20">
        {/* Top Finial Crescent & Star */}
        <circle
          cx="35"
          cy="9"
          r="3.5"
          fill="none"
          stroke={darkTheme ? '#fbbf24' : '#15803d'}
          strokeWidth="1.5"
        />
        <line
          x1="35"
          y1="13"
          x2="35"
          y2="20"
          stroke={darkTheme ? '#fbbf24' : '#1e293b'}
          strokeWidth="1.5"
        />
        {/* Moroccan Arch / Dome Frame */}
        <path
          d="M35,20 C48,28 58,38 58,52 L58,92 L12,92 L12,52 C12,38 22,28 35,20 Z"
          fill={darkTheme ? '#0b192c' : '#fcf8ed'}
          stroke={darkTheme ? '#fbbf24' : '#1e293b'}
          strokeWidth="1.7"
        />
        <path
          d="M35,25 C45,32 54,40 54,52 L54,88 L16,88 L16,52 C16,40 25,32 35,25 Z"
          fill="none"
          stroke={darkTheme ? '#10b981' : '#15803d'}
          strokeWidth="1"
        />
        <text
          x="35"
          y="66"
          textAnchor="middle"
          fill={darkTheme ? '#fde68a' : '#111827'}
          fontSize="16"
          fontWeight="800"
          fontFamily="'Scheherazade New', 'Amiri', serif"
        >
          {label}
        </text>
      </svg>
    </div>
  );
};

/**
 * Automatic Color-Coded Tajweed Renderer for Riwayat Warsh 'an Nafi'
 * Colors letters and words according to the 7 official Tajweed Mushaf categories:
 * - Magenta (#d81b60): مدّ مشبع 6 حركات
 * - Orange (#e65100): مدّ 2 أو 4 أو 6 جوازاً
 * - Gold (#b8860b): مدّ حركتين
 * - Green (#15803d): إخفاء، ومواقع الغُنّة (حركتين)
 * - Dark Blue (#0d47a1): تفخيم
 * - Cyan (#00838f): قلقلة
 * - Grey (#888888): إدغام، وما لا يُلفظ
 */
function renderTajweedColoredWarshText(
  verseText: string,
  enableTajweedColors: boolean,
  darkTheme: boolean
): React.ReactNode {
  const cleanText = verseText.replace(/۞/g, '').trim();
  const hasThumunRosette = verseText.includes('۞');

  if (!enableTajweedColors) {
    return (
      <>
        {hasThumunRosette && (
          <span
            className={`mx-1.5 text-2xl align-middle ${
              darkTheme ? 'text-amber-400' : 'text-emerald-700'
            }`}
            title="علامة الثمن / الحزب"
          >
            ۞
          </span>
        )}
        <span>{cleanText}</span>
      </>
    );
  }

  // Palette tuned for both Moroccan Parchment and Night Mode
  const colors = {
    madd6: darkTheme ? '#f43f5e' : '#d81b60', // مد مشبع 6 حركات (Magenta)
    madd246: darkTheme ? '#fb923c' : '#e65100', // مد 2 أو 4 أو 6 جوازاً (Orange)
    madd2: darkTheme ? '#fbbf24' : '#b47b00', // مد حركتين (Golden Yellow)
    ghunnah: darkTheme ? '#4ade80' : '#15803d', // إخفاء ومواقع الغنة (Emerald Green)
    tafkhim: darkTheme ? '#60a5fa' : '#0d47a1', // تفخيم (Deep Blue)
    qalqalah: darkTheme ? '#22d3ee' : '#00838f', // قلقلة (Cyan)
    silent: darkTheme ? '#64748b' : '#8c8c8c', // إدغام وما لا يلفظ (Muted Grey)
  };

  // Split into words and colorize clusters within each word
  const words = cleanText.split(/\s+/);

  const colorizeWord = (word: string, wIdx: number, totalWords: number) => {
    // Group base Arabic letter with all following combining marks/diacritics
    const clusters: string[] = [];
    let current = '';
    for (const ch of word) {
      const code = ch.charCodeAt(0);
      const isCombining =
        (code >= 0x0610 && code <= 0x061a) ||
        (code >= 0x064b && code <= 0x065f) ||
        code === 0x0670 ||
        (code >= 0x06d6 && code <= 0x06ed) ||
        (code >= 0x08f0 && code <= 0x08ff);

      if (isCombining && current.length > 0) {
        current += ch;
      } else {
        if (current) clusters.push(current);
        current = ch;
      }
    }
    if (current) clusters.push(current);

    const isLastWordInVerse = wIdx === totalWords - 1;

    return (
      <React.Fragment key={wIdx}>
        {clusters.map((cluster, cIdx) => {
          const baseChar = cluster[0];
          const nextCluster = clusters[cIdx + 1] || '';
          let color: string | undefined = undefined;

          // 1. Magenta: Maddah sign (\u0653 ٓ) or آ (Madd Mushba' 6 counts in Warsh)
          if (cluster.includes('\u0653') || baseChar === 'آ') {
            color = colors.madd6;
          }
          // 2. Green: Ghunnah on Noon/Meem Mushaddadah (نّ / مّ) or Iqlab meem (\u06E2 / \u06ED) or Tanween/Noon before Ghunnah
          else if (
            ((baseChar === 'ن' || baseChar === 'م') && cluster.includes('\u0651')) ||
            cluster.includes('\u06e2') ||
            ((baseChar === 'ن' || /[\u064b\u064c\u064d\u08f0\u08f1\u08f2]/.test(cluster)) &&
              cIdx === clusters.length - 1)
          ) {
            color = colors.ghunnah;
          }
          // 3. Grey: Silent Wasl Alif (اِ۬ / اُ۪ / اَ۬ in the middle of speech) or silent Alif after Waw (واْ)
          else if (
            cluster.includes('\u06df') ||
            (wIdx > 0 && cIdx === 0 && ( cluster.includes('\u06ec') || cluster.includes('\u06eb') ))
          ) {
            color = colors.silent;
          }
          // 4. Orange: Madd 'Arid lil-Sukun (ו / ي / ا before final letter of verse) or Badal
          else if (
            isLastWordInVerse &&
            cIdx === clusters.length - 2 &&
            (baseChar === 'و' || baseChar === 'ي' || baseChar === 'ا' || cluster.includes('\u0670'))
          ) {
            color = colors.madd246;
          }
          // 5. Gold: Dagger Alif (\u0670 ـٰ) natural 2-count elongation
          else if (cluster.includes('\u0670')) {
            color = colors.madd2;
          }
          // 6. Cyan: Qalqalah letters (ق ط ب ج د) with Sukun (\u0652)
          else if (
            'قطبجد'.includes(baseChar) &&
            cluster.includes('\u0652')
          ) {
            color = colors.qalqalah;
          }
          // 7. Dark Blue: Tafkhim letters (ص ض ط ظ خ غ ق) or thickened Ra
          else if (
            'صضطظخغق'.includes(baseChar) ||
            (baseChar === 'ر' && (cluster.includes('\u064e') || cluster.includes('\u064f')) && !cluster.includes('\u06ec'))
          ) {
            color = colors.tafkhim;
          }
          // Check if next cluster is a dagger alif
          else if (nextCluster === '\u0670') {
            color = colors.madd2;
          }

          if (!color) {
            return <span key={cIdx}>{cluster}</span>;
          }
          return (
            <span key={cIdx} style={{ color }}>
              {cluster}
            </span>
          );
        })}
        {wIdx < totalWords - 1 ? ' ' : ''}
      </React.Fragment>
    );
  };

  return (
    <>
      {hasThumunRosette && (
        <span
          className={`mx-1.5 text-2xl align-middle ${
            darkTheme ? 'text-amber-400' : 'text-emerald-700'
          }`}
          title="علامة الثمن / الحزب"
        >
          ۞
        </span>
      )}
      {words.map((w, idx) => colorizeWord(w, idx, words.length))}
    </>
  );
}

export const MoroccanWarshQuran: React.FC<MoroccanWarshQuranProps> = ({ language }) => {
  // Navigation Mode: Browse by 604 Mushaf Pages OR Full Surah
  const [readingScope, setReadingScope] = useState<'page-by-page' | 'full-surah'>('page-by-page');
  // Default to Page 411 (Surah Luqman - Hizb 41) so the user immediately sees the exact page from their reference image, with full navigation across all 604 pages & 114 Surahs!
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(411);
  const [selectedSurahNumber, setSelectedSurahNumber] = useState<number>(31);
  const [currentHizbNumber, setCurrentHizbNumber] = useState<number>(41);

  const [verses, setVerses] = useState<WarshVerse[]>([]);
  const [marginMeanings, setMarginMeanings] = useState<MarginWordMeaning[]>([]);
  const [hasThumunOnPage, setHasThumunOnPage] = useState<boolean>(true);
  const [loadingMushaf, setLoadingMushaf] = useState<boolean>(false);
  const [highlightedVerse, setHighlightedVerse] = useState<number | null>(null);

  // Surah Filter & Hizb Filter in Sidebar
  const [surahSearch, setSurahSearch] = useState<string>('');
  const [selectedHizbFilter, setSelectedHizbFilter] = useState<number | 'all'>('all');
  const [revelationFilter, setRevelationFilter] = useState<'all' | 'meccan' | 'medinan'>('all');

  // Full Quran Verse Search State
  const [globalVerseQuery, setGlobalVerseQuery] = useState<string>('');
  const [globalSearchResults, setGlobalSearchResults] = useState<WarshVerse[]>([]);
  const [isSearchingGlobal, setIsSearchingGlobal] = useState<boolean>(false);
  const [showSearchModal, setShowSearchModal] = useState<boolean>(false);

  // Mushaf Display Preferences
  const [viewMode, setViewMode] = useState<'mushaf-page' | 'verse-cards'>('mushaf-page');
  const [mushafTheme, setMushafTheme] = useState<'moroccan-parchment' | 'cosmic-dark'>(
    'moroccan-parchment'
  );
  const [enableTajweedColors, setEnableTajweedColors] = useState<boolean>(true);
  const [fontSizeClass, setFontSizeClass] = useState<'text-2xl' | 'text-3xl' | 'text-4xl'>(
    'text-3xl'
  );
  const [highlightCosmicOnly, setHighlightCosmicOnly] = useState<boolean>(false);
  const [showWarshRulesInfo, setShowWarshRulesInfo] = useState<boolean>(false);

  // Copy & Bookmark State
  const [copiedVerseKey, setCopiedVerseKey] = useState<string | null>(null);
  const [bookmark, setBookmark] = useState<SavedBookmark | null>(() => {
    try {
      const saved = localStorage.getItem('cosmic_warsh_bookmark');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Audio Player State (Moroccan Warsh Reciters)
  const [selectedReciterId, setSelectedReciterId] = useState<string>(
    MOROCCAN_WARSH_RECITERS[0].id
  );
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [audioProgress, setAudioProgress] = useState<number>(0);
  const [audioDuration, setAudioDuration] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const activeSurahMeta: SurahMetaWarsh = useMemo(
    () =>
      SURAH_METADATA_WARSH.find((s) => s.number === selectedSurahNumber) ||
      SURAH_METADATA_WARSH[0],
    [selectedSurahNumber]
  );

  // In Moroccan Warsh / Madani count, Surahs with joined Muqatta'at have 1 fewer verse than Kufi count
  const warshSurahVerseCount = useMemo(() => {
    const joinedSet = new Set([2, 3, 7, 13, 26, 28, 29, 30, 31, 32, 40, 41, 43, 44, 45, 46]);
    return joinedSet.has(activeSurahMeta.number)
      ? activeSurahMeta.versesCount - 1
      : activeSurahMeta.versesCount;
  }, [activeSurahMeta]);

  const activeReciter = useMemo(
    () =>
      MOROCCAN_WARSH_RECITERS.find((r) => r.id === selectedReciterId) ||
      MOROCCAN_WARSH_RECITERS[0],
    [selectedReciterId]
  );

  const audioStreamUrl = useMemo(() => {
    const padded = String(selectedSurahNumber).padStart(3, '0');
    return `${activeReciter.serverUrl}${padded}.mp3`;
  }, [activeReciter, selectedSurahNumber]);

  // Fetch Mushaf Page (1..604)
  const fetchMushafPage = useCallback(async (pageNum: number) => {
    setLoadingMushaf(true);
    try {
      const res = await fetch(`/api/quran/warsh/page/${pageNum}`, {
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        const raw = await res.text();
        if (raw.trim().startsWith('{')) {
          const data = JSON.parse(raw.trim());
          if (Array.isArray(data.verses) && data.verses.length > 0) {
            setVerses(data.verses);
            setMarginMeanings(data.marginMeanings || []);
            setCurrentHizbNumber(data.hizb || 1);
            setHasThumunOnPage(!!data.hasThumunMarker);
            if (data.primarySurahNumber) {
              setSelectedSurahNumber(data.primarySurahNumber);
            }
            setLoadingMushaf(false);
            return;
          }
        }
      }
    } catch {
      // Keep current state
    } finally {
      setLoadingMushaf(false);
    }
  }, []);

  // Fetch Full Surah (1..114)
  const fetchFullSurah = useCallback(async (surahNum: number) => {
    setLoadingMushaf(true);
    try {
      const res = await fetch(`/api/quran/warsh/${surahNum}`, {
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        const raw = await res.text();
        if (raw.trim().startsWith('{')) {
          const data = JSON.parse(raw.trim());
          if (Array.isArray(data.verses) && data.verses.length > 0) {
            setVerses(data.verses);
            setMarginMeanings(data.marginMeanings || []);
            if (data.startPage) setCurrentPageNumber(data.startPage);
            if (data.hizb) setCurrentHizbNumber(data.hizb);
            setHasThumunOnPage(data.verses.some((v: WarshVerse) => v.text.includes('۞')));
            setLoadingMushaf(false);
            return;
          }
        }
      }
    } catch {
      // Keep current state
    } finally {
      setLoadingMushaf(false);
    }
  }, []);

  useEffect(() => {
    if (readingScope === 'page-by-page') {
      fetchMushafPage(currentPageNumber);
    } else {
      fetchFullSurah(selectedSurahNumber);
    }
  }, [readingScope, currentPageNumber, selectedSurahNumber, fetchMushafPage, fetchFullSurah]);

  // Select a Surah from the 114-Surah index and jump to its starting Mushaf page
  const handleSelectSurahFromIndex = async (surahNum: number) => {
    setSelectedSurahNumber(surahNum);
    setHighlightedVerse(null);
    try {
      const res = await fetch(`/api/quran/warsh/${surahNum}`, {
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        const raw = await res.text();
        if (raw.trim().startsWith('{')) {
          const data = JSON.parse(raw.trim());
          if (readingScope === 'page-by-page' && data.startPage) {
            setCurrentPageNumber(data.startPage);
          } else if (Array.isArray(data.verses)) {
            setVerses(data.verses);
            setMarginMeanings(data.marginMeanings || []);
            if (data.startPage) setCurrentPageNumber(data.startPage);
            if (data.hizb) setCurrentHizbNumber(data.hizb);
          }
        }
      }
    } catch {
      // Fallback handled by effect
    }
  };

  // Handle Audio Element Events
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    audioRef.current.load();
    setIsPlayingAudio(false);
    setAudioProgress(0);
  }, [audioStreamUrl]);

  const togglePlayAudio = () => {
    if (!audioRef.current) return;
    if (isPlayingAudio) {
      audioRef.current.pause();
      setIsPlayingAudio(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlayingAudio(true))
        .catch(() => setIsPlayingAudio(false));
    }
  };

  // Global Search across all 114 Surahs in Warsh
  const handleGlobalSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const q = globalVerseQuery.trim();
    if (q.length < 2) return;

    setIsSearchingGlobal(true);
    setShowSearchModal(true);
    try {
      const res = await fetch(`/api/quran/warsh-search?q=${encodeURIComponent(q)}`, {
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        const raw = await res.text();
        if (raw.trim().startsWith('{')) {
          const data = JSON.parse(raw.trim());
          setGlobalSearchResults(data.results || []);
        }
      }
    } catch {
      setGlobalSearchResults([]);
    } finally {
      setIsSearchingGlobal(false);
    }
  };

  // Filtered Surahs in Sidebar
  const filteredSurahs = useMemo(() => {
    return SURAH_METADATA_WARSH.filter((s) => {
      if (selectedHizbFilter !== 'all' && s.startHizb !== selectedHizbFilter) {
        return false;
      }
      if (revelationFilter !== 'all' && s.revelationType !== revelationFilter) {
        return false;
      }
      if (!surahSearch.trim()) return true;
      const q = surahSearch.trim().toLowerCase();
      return (
        s.nameAr.includes(q) ||
        (s.moroccanNoteAr && s.moroccanNoteAr.includes(q)) ||
        s.nameEn.toLowerCase().includes(q) ||
        s.nameFr.toLowerCase().includes(q) ||
        String(s.number) === q
      );
    });
  }, [surahSearch, selectedHizbFilter, revelationFilter]);

  const handleSaveBookmark = (surahNum: number, verseNum: number) => {
    const meta = SURAH_METADATA_WARSH.find((s) => s.number === surahNum) || activeSurahMeta;
    const newBookmark: SavedBookmark = {
      surahNumber: surahNum,
      verseNumber: verseNum,
      pageNumber: currentPageNumber,
      surahNameAr: meta.nameAr,
      timestamp: new Date().toLocaleTimeString(language === 'ar' ? 'ar-MA' : 'en-US', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
    setBookmark(newBookmark);
    try {
      localStorage.setItem('cosmic_warsh_bookmark', JSON.stringify(newBookmark));
    } catch {
      // Ignore storage error
    }
  };

  const handleCopyVerse = (v: WarshVerse) => {
    const key = `${v.chapter}:${v.verse}`;
    const citation = `﴿ ${v.text} ﴾ [سورة ${activeSurahMeta.nameAr}: ${v.verse} - رواية ورش عن نافع]`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(citation);
      setCopiedVerseKey(key);
      setTimeout(() => setCopiedVerseKey(null), 2000);
    }
  };

  const goToPreviousPageOrSurah = () => {
    if (readingScope === 'page-by-page') {
      if (currentPageNumber > 1) {
        setCurrentPageNumber((p) => p - 1);
        setHighlightedVerse(null);
      }
    } else if (selectedSurahNumber > 1) {
      handleSelectSurahFromIndex(selectedSurahNumber - 1);
    }
  };

  const goToNextPageOrSurah = () => {
    if (readingScope === 'page-by-page') {
      if (currentPageNumber < 604) {
        setCurrentPageNumber((p) => p + 1);
        setHighlightedVerse(null);
      }
    } else if (selectedSurahNumber < 114) {
      handleSelectSurahFromIndex(selectedSurahNumber + 1);
    }
  };

  const formatSeconds = (sec: number) => {
    if (!sec || isNaN(sec)) return '00:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  // Group verses on the current view by chapter so if a new Surah begins mid-page, its ornate Surah header & Basmalah render right in place!
  const chapterSectionsOnPage = useMemo(() => {
    const sections: Array<{
      surahMeta: SurahMetaWarsh;
      warshTotalVerses: number;
      startsFromVerseOne: boolean;
      verses: WarshVerse[];
    }> = [];

    const joinedSet = new Set([2, 3, 7, 13, 26, 28, 29, 30, 31, 32, 40, 41, 43, 44, 45, 46]);

    for (const v of verses) {
      if (highlightCosmicOnly && !isCosmicVerse(v.text)) continue;
      const lastSec = sections[sections.length - 1];
      if (!lastSec || lastSec.surahMeta.number !== v.chapter) {
        const meta =
          SURAH_METADATA_WARSH.find((s) => s.number === v.chapter) || activeSurahMeta;
        const warshTotal = joinedSet.has(meta.number)
          ? meta.versesCount - 1
          : meta.versesCount;
        sections.push({
          surahMeta: meta,
          warshTotalVerses: warshTotal,
          startsFromVerseOne: v.verse === 1,
          verses: [v],
        });
      } else {
        lastSec.verses.push(v);
      }
    }
    return sections;
  }, [verses, highlightCosmicOnly, activeSurahMeta]);

  const isDarkTheme = mushafTheme === 'cosmic-dark';

  return (
    <div className="space-y-8" data-testid="moroccan-warsh-mushaf">
      {/* ===================================================================== */}
      {/* 1. MOROCCAN TAJWEED MUSHAF HEADER & AUDIO PLAYER                      */}
      {/* ===================================================================== */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#07211b] via-[#091828] to-[#1a1308] border-2 border-amber-500/40 p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2.5 max-w-3xl">
            <div className="inline-flex flex-wrap items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/90 border border-amber-400/50 text-amber-300 text-xs font-bold">
              <Award className="w-4 h-4 text-amber-400" />
              <span>
                {language === 'ar'
                  ? 'مصحف التجويد الملون برواية ورش عن نافع • وبهامش معاني الكلمات (604 صفحات • 60 حزباً)'
                  : language === 'fr'
                  ? 'Mushaf Tajwid Coloré (Riwayat Warsh an Nafi) avec Explication des Mots en Marge'
                  : 'Color-Coded Tajweed Mushaf (Riwayat Warsh) with Marginal Vocabulary Meanings'}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">
              {language === 'ar'
                ? 'المصحف الشريف برواية ورش عن نافع (مصحف التجويد الملون بالهامش)'
                : 'The Holy Quran in Moroccan Riwayat Warsh (Color-Coded Tajweed Mushaf)'}
            </h1>

            <p className="text-sm text-slate-200 leading-relaxed">
              {language === 'ar'
                ? 'صفحات مطابقة للمصحف الشريف برواية ورش عن نافع من طريق الأزرق: إطار زخرفي مغربي أصيل، تلوين أحكام التجويد (المد المشبع، الغنة والإخفاء، التفخيم، القلقلة)، أرقام الآيات داخل النجمة الثمانية المغربية، وبيان معاني الكلمات وعلامة الثُّمُن على هامش كل صفحة.'
                : 'Authentic Moroccan Mushaf pages with ornamental green-and-gold borders, 7-color Tajweed highlighting, octagonal verse medallions, marginal vocabulary explanations, and the bottom Tajweed color key.'}
            </p>
          </div>

          {/* Quick Actions: Warsh Rules Info & Saved Bookmark */}
          <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => setShowWarshRulesInfo(!showWarshRulesInfo)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/50 text-amber-200 font-bold text-xs transition-all cursor-pointer"
            >
              <Info className="w-4 h-4 text-amber-400" />
              <span>
                {language === 'ar'
                  ? 'دليل ألوان التجويد ورواية ورش'
                  : 'Tajweed Color Guide & Warsh Rules'}
              </span>
            </button>

            {bookmark && (
              <button
                type="button"
                onClick={() => {
                  if (readingScope === 'page-by-page' && bookmark.pageNumber) {
                    setCurrentPageNumber(bookmark.pageNumber);
                  } else {
                    setSelectedSurahNumber(bookmark.surahNumber);
                  }
                  setHighlightedVerse(bookmark.verseNumber);
                }}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-emerald-950/90 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-200 text-xs font-bold transition-all cursor-pointer"
              >
                <BookmarkCheck className="w-4 h-4 text-emerald-400" />
                <span>
                  {language === 'ar'
                    ? `علامة الوقف: سورة ${bookmark.surahNameAr} (ص ${bookmark.pageNumber} • آية ${bookmark.verseNumber})`
                    : `Bookmark: Surah ${bookmark.surahNameAr} (p.${bookmark.pageNumber})`}
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Collapsible Guide to Moroccan Warsh Rules */}
        {showWarshRulesInfo && (
          <div className="mt-6 pt-6 border-t border-amber-500/30 grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-amber-500/30 space-y-1.5">
              <strong className="text-amber-300 block text-sm">
                1. الألوان الثلاثة للمدود (أحمر قاني / برتقالي / أصفر)
              </strong>
              <p className="text-slate-300 leading-relaxed">
                اللون الأحمر القاني للمد المشبع (6 حركات كاللازم والمتصل والمنفصل في ورش)، والبرتقالي للمد الجائز (2 أو 4 أو 6 حركات كالعارض للسكون والبدل)، والأصفر لمد الحركتين.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-emerald-500/30 space-y-1.5">
              <strong className="text-emerald-300 block text-sm">
                2. اللون الأخضر والرمادي (الغنة والإخفاء والإدغام)
              </strong>
              <p className="text-slate-300 leading-relaxed">
                اللون الأخضر يدل على مواقع الغنة (حركتين) في النون والميم المشددتين والإخفاء والإقلاب، واللون الرمادي يدل على ما لا يُلفظ (كهمزة الوصل في درج الكلام).
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-cyan-500/30 space-y-1.5">
              <strong className="text-cyan-300 block text-sm">
                3. اللون الأزرق الداكن والسماوي (التفخيم والقلقلة)
              </strong>
              <p className="text-slate-300 leading-relaxed">
                اللون الأزرق الداكن لحروف الاستعلاء والتفخيم واللام المغلظة والراء المفخمة، واللون الأزرق السماوي لحروف القلقلة الخمسة (قطب جد) الساكنة.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-amber-500/30 space-y-1.5">
              <strong className="text-amber-300 block text-sm">
                4. هامش بيان معاني الكلمات وعلامة الثُّمُن
              </strong>
              <p className="text-slate-300 leading-relaxed">
                يعرض الهامش الجانبي معاني المفردات القرآنية في الصفحة مع علامة (ثُمُنٌ / حِزْبٌ) وفق التقسيم المغربي للأحزاب الستين.
              </p>
            </div>
          </div>
        )}

        {/* Audio Player Bar with Reciter Portrait Thumbnail & Quick Reciter Strip */}
        <div className="mt-6 pt-5 border-t border-emerald-800/50 bg-slate-950/75 p-4 sm:p-5 rounded-2xl border border-amber-500/25 space-y-4">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3.5 flex-1">
              {/* Active Reciter Portrait Thumbnail */}
              <div className="flex items-center gap-3 shrink-0">
                <div
                  className={`relative w-14 h-14 rounded-2xl p-[2px] bg-gradient-to-br from-amber-400 via-yellow-500 to-emerald-500 shadow-lg transition-all ${
                    isPlayingAudio ? 'ring-2 ring-emerald-400/70 shadow-emerald-500/30' : 'shadow-amber-500/20'
                  }`}
                >
                  <img
                    src={activeReciter.avatarUrl}
                    alt={activeReciter.name[language] || activeReciter.name.ar}
                    className="w-full h-full rounded-[14px] object-cover bg-slate-900"
                  />
                  {isPlayingAudio && (
                    <span className="absolute -bottom-1 -end-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-slate-950 animate-pulse" />
                  )}
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5 text-amber-300 font-bold text-xs">
                    <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                    <span>
                      {language === 'ar' ? 'القارئ (برواية ورش):' : 'Moroccan Warsh Reciter:'}
                    </span>
                  </div>
                  <span className="text-sm font-black text-white mt-0.5">
                    {activeReciter.name[language] || activeReciter.name.ar}
                  </span>
                </div>
              </div>

              <select
                value={selectedReciterId}
                onChange={(e) => setSelectedReciterId(e.target.value)}
                aria-label="Select Moroccan Warsh Reciter"
                className="rounded-xl bg-slate-900 border border-amber-500/40 px-3 py-2 text-xs font-bold text-white focus:outline-none focus:border-amber-400"
              >
                {MOROCCAN_WARSH_RECITERS.map((reciter) => (
                  <option key={reciter.id} value={reciter.id}>
                    {reciter.name[language]} — {reciter.country[language]}
                  </option>
                ))}
              </select>

              <span className="text-[11px] text-slate-400 hidden xl:inline">
                {activeReciter.title[language]}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={togglePlayAudio}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 transition-all cursor-pointer shrink-0"
              >
                {isPlayingAudio ? (
                  <>
                    <Pause className="w-4 h-4" />
                    <span>
                      {language === 'ar'
                        ? `إيقاف تلاوة سورة ${activeSurahMeta.nameAr}`
                        : `Pause Surah ${activeSurahMeta.nameEn}`}
                    </span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    <span>
                      {language === 'ar'
                        ? `الاستماع لسورة ${activeSurahMeta.nameAr}`
                        : `Listen to Surah ${activeSurahMeta.nameEn}`}
                    </span>
                  </>
                )}
              </button>

              <div className="text-xs font-mono text-amber-200 bg-slate-900 px-3 py-2 rounded-xl border border-slate-800 shrink-0">
                {formatSeconds(audioProgress)} / {formatSeconds(audioDuration)}
              </div>

              <audio
                ref={audioRef}
                src={audioStreamUrl}
                preload="none"
                onTimeUpdate={() => {
                  if (audioRef.current) setAudioProgress(audioRef.current.currentTime);
                }}
                onLoadedMetadata={() => {
                  if (audioRef.current) setAudioDuration(audioRef.current.duration);
                }}
                onEnded={() => {
                  setIsPlayingAudio(false);
                  if (selectedSurahNumber < 114) {
                    handleSelectSurahFromIndex(selectedSurahNumber + 1);
                  }
                }}
              />
            </div>
          </div>

          {/* Interactive Reciters Thumbnail Selector Strip */}
          <div className="pt-3 border-t border-slate-800/80 flex items-center gap-2.5 overflow-x-auto pb-1">
            {MOROCCAN_WARSH_RECITERS.map((reciter) => {
              const isSelected = reciter.id === selectedReciterId;
              return (
                <button
                  key={reciter.id}
                  type="button"
                  onClick={() => setSelectedReciterId(reciter.id)}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-2xl border text-start transition-all shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-amber-500/20 to-emerald-500/15 border-amber-400 text-white shadow-md shadow-amber-500/10'
                      : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-800/90 hover:border-amber-500/40'
                  }`}
                >
                  <img
                    src={reciter.avatarUrl}
                    alt={reciter.name[language] || reciter.name.ar}
                    className={`w-9 h-9 rounded-xl object-cover shrink-0 border ${
                      isSelected ? 'border-amber-400' : 'border-slate-700'
                    }`}
                    loading="lazy"
                  />
                  <div className="min-w-0">
                    <div className={`text-xs font-bold whitespace-nowrap ${isSelected ? 'text-amber-300' : 'text-slate-200'}`}>
                      {reciter.name[language] || reciter.name.ar}
                    </div>
                    <div className="text-[10px] text-slate-400 whitespace-nowrap">
                      {reciter.country[language] || reciter.country.ar}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* 2. TOOLBAR: PAGE SELECTOR (1-604), TAJWEED TOGGLE, THEME & SEARCH     */}
      {/* ===================================================================== */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-center bg-slate-900/85 border border-slate-800 p-4 rounded-2xl">
        {/* Search Form */}
        <form onSubmit={handleGlobalSearch} className="xl:col-span-4 flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute start-3.5 top-1/2 -translate-y-1/2 text-amber-400" />
            <input
              type="text"
              value={globalVerseQuery}
              onChange={(e) => setGlobalVerseQuery(e.target.value)}
              placeholder={
                language === 'ar'
                  ? 'ابحث عن أي آية أو كلمة في المصحف كاملاً...'
                  : 'Search any word across all 604 pages...'
              }
              className="w-full ps-10 pe-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-400"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition-colors shrink-0 cursor-pointer"
          >
            {language === 'ar' ? 'بحث' : 'Search'}
          </button>
        </form>

        {/* Page Jump (1..604) & Scope Toggle */}
        <div className="xl:col-span-8 flex flex-wrap items-center justify-end gap-2">
          {/* Page-by-Page (604 Pages) vs Full Surah Toggle */}
          <div className="inline-flex rounded-xl bg-slate-950 p-1 border border-slate-800">
            <button
              type="button"
              onClick={() => setReadingScope('page-by-page')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                readingScope === 'page-by-page'
                  ? 'bg-emerald-600 text-white'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <BookMarked className="w-3.5 h-3.5" />
              <span>
                {language === 'ar' ? 'نظام الصفحات (604 صفحة)' : 'Mushaf Pages (1-604)'}
              </span>
            </button>
            <button
              type="button"
              onClick={() => setReadingScope('full-surah')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                readingScope === 'full-surah'
                  ? 'bg-emerald-600 text-white'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'السورة كاملة' : 'Full Surah'}</span>
            </button>
          </div>

          {/* Direct Page Selector (1..604) */}
          <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-xs">
            <span className="text-slate-400 font-bold">
              {language === 'ar' ? 'صفحة:' : 'Page:'}
            </span>
            <input
              type="number"
              min={1}
              max={604}
              value={currentPageNumber}
              onChange={(e) => {
                const val = parseInt(e.target.value, 10);
                if (!isNaN(val) && val >= 1 && val <= 604) {
                  setReadingScope('page-by-page');
                  setCurrentPageNumber(val);
                }
              }}
              aria-label="Mushaf Page Number"
              className="w-16 text-center font-mono font-bold text-amber-300 bg-slate-900 border border-slate-700 rounded-lg py-0.5 focus:outline-none focus:border-amber-400"
            />
            <span className="text-slate-500">/ 604</span>
          </div>

          {/* Tajweed Color-Coding Toggle */}
          <button
            type="button"
            onClick={() => setEnableTajweedColors(!enableTajweedColors)}
            className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
              enableTajweedColors
                ? 'bg-amber-500/20 border-amber-400 text-amber-200'
                : 'bg-slate-950 border-slate-800 text-slate-400'
            }`}
          >
            {language === 'ar' ? '🎨 ألوان التجويد' : '🎨 Tajweed Colors'}
          </button>

          {/* Mushaf Paper Theme Toggle */}
          <div className="inline-flex rounded-xl bg-slate-950 p-1 border border-slate-800">
            <button
              type="button"
              onClick={() => setMushafTheme('moroccan-parchment')}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                mushafTheme === 'moroccan-parchment'
                  ? 'bg-[#f4ead2] text-[#2c1e0f]'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Sun className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'ورق المصحف' : 'Mushaf Paper'}</span>
            </button>
            <button
              type="button"
              onClick={() => setMushafTheme('cosmic-dark')}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                mushafTheme === 'cosmic-dark'
                  ? 'bg-cyan-500 text-slate-950'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Moon className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'ليلي' : 'Night'}</span>
            </button>
          </div>

          {/* Font Size Controls */}
          <div className="inline-flex rounded-xl bg-slate-950 p-1 border border-slate-800">
            {[
              { id: 'text-2xl', label: 'A-' },
              { id: 'text-3xl', label: 'A' },
              { id: 'text-4xl', label: 'A+' },
            ].map((sz) => (
              <button
                key={sz.id}
                type="button"
                onClick={() => setFontSizeClass(sz.id as any)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  fontSizeClass === sz.id
                    ? 'bg-emerald-500 text-slate-950'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {sz.label}
              </button>
            ))}
          </div>

          {/* View Mode: Mushaf vs Cards */}
          <button
            type="button"
            onClick={() =>
              setViewMode(viewMode === 'mushaf-page' ? 'verse-cards' : 'mushaf-page')
            }
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-slate-300 hover:text-white cursor-pointer"
          >
            <List className="w-3.5 h-3.5 text-amber-400" />
            <span>
              {viewMode === 'mushaf-page'
                ? language === 'ar'
                  ? 'عرض البطاقات'
                  : 'Cards View'
                : language === 'ar'
                ? 'صفحة المصحف'
                : 'Mushaf Page'}
            </span>
          </button>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* GLOBAL SEARCH RESULTS MODAL                                           */}
      {/* ===================================================================== */}
      {showSearchModal && (
        <div className="rounded-3xl bg-slate-900/95 border-2 border-amber-500/40 p-6 shadow-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-amber-400" />
              <h3 className="text-base font-black text-white">
                {language === 'ar'
                  ? `نتائج البحث في المصحف الشريف عن: «${globalVerseQuery}» (${globalSearchResults.length} آية)`
                  : `Search Results for "${globalVerseQuery}" (${globalSearchResults.length} verses)`}
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setShowSearchModal(false)}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {isSearchingGlobal ? (
            <div className="py-8 text-center text-sm text-amber-300">
              {language === 'ar'
                ? 'جاري البحث في جميع سور القرآن الكريم برواية ورش...'
                : 'Searching all 114 Surahs...'}
            </div>
          ) : globalSearchResults.length === 0 ? (
            <div className="py-6 text-center text-sm text-slate-400">
              {language === 'ar'
                ? 'لم يتم العثور على آيات مطابقة.'
                : 'No matching verses found.'}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-80 overflow-y-auto pe-1">
              {globalSearchResults.map((resItem) => {
                const sMeta =
                  SURAH_METADATA_WARSH.find((s) => s.number === resItem.chapter) ||
                  SURAH_METADATA_WARSH[0];
                return (
                  <button
                    key={`${resItem.chapter}-${resItem.verse}`}
                    type="button"
                    onClick={() => {
                      if (resItem.page) {
                        setReadingScope('page-by-page');
                        setCurrentPageNumber(resItem.page);
                      } else {
                        setSelectedSurahNumber(resItem.chapter);
                      }
                      setHighlightedVerse(resItem.verse);
                      setShowSearchModal(false);
                    }}
                    className="p-3.5 rounded-2xl bg-slate-950/90 hover:bg-amber-950/30 border border-slate-800 hover:border-amber-500/40 text-start transition-all cursor-pointer space-y-1.5"
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-amber-400">
                      <span>
                        سورة {sMeta.nameAr} ({sMeta.nameEn})
                      </span>
                      <span>
                        ص {resItem.page || 1} • آية {resItem.verse}
                      </span>
                    </div>
                    <p className="font-quran text-xl text-white leading-relaxed">
                      {resItem.text}
                    </p>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ===================================================================== */}
      {/* 3. MAIN LAYOUT: 114 SURAHS INDEX (3 cols) + AUTHENTIC MUSHAF (9 cols) */}
      {/* ===================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT SIDEBAR (3 cols): 114 SURAHS & 60 AHZAB INDEX */}
        <div className="lg:col-span-3 rounded-3xl bg-slate-900/90 border border-slate-800 p-4 space-y-3.5 shadow-xl">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-black text-white flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>
                {language === 'ar' ? 'فهرس السور (114) والأحزاب (60)' : '114 Surahs & 60 Hizbs'}
              </span>
            </h2>
            <span className="text-[11px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/30">
              {filteredSurahs.length}
            </span>
          </div>

          {/* Search Surah */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute start-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={surahSearch}
              onChange={(e) => setSurahSearch(e.target.value)}
              placeholder={
                language === 'ar'
                  ? 'ابحث باسم السورة (لقمان، الكهف، يس)...'
                  : 'Filter Surah (1-114)...'
              }
              className="w-full ps-8 pe-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Filter by Moroccan 60 Hizbs */}
          <div className="grid grid-cols-2 gap-1.5">
            <select
              value={selectedHizbFilter}
              onChange={(e) =>
                setSelectedHizbFilter(
                  e.target.value === 'all' ? 'all' : Number(e.target.value)
                )
              }
              className="w-full rounded-xl bg-slate-950 border border-slate-700 px-2 py-1.5 text-[11px] text-white focus:outline-none focus:border-amber-400"
            >
              <option value="all">
                {language === 'ar' ? 'الأحزاب (1-60)' : 'All 60 Hizbs'}
              </option>
              {Array.from({ length: 60 }).map((_, idx) => {
                const h = idx + 1;
                return (
                  <option key={h} value={h}>
                    {language === 'ar' ? `حزب ${h}` : `Hizb ${h}`}
                  </option>
                );
              })}
            </select>

            <select
              value={revelationFilter}
              onChange={(e) => setRevelationFilter(e.target.value as any)}
              className="w-full rounded-xl bg-slate-950 border border-slate-700 px-2 py-1.5 text-[11px] text-white focus:outline-none focus:border-amber-400"
            >
              <option value="all">{language === 'ar' ? 'الكل (114)' : 'All'}</option>
              <option value="meccan">{language === 'ar' ? 'مكية' : 'Meccan'}</option>
              <option value="medinan">{language === 'ar' ? 'مدنية' : 'Medinan'}</option>
            </select>
          </div>

          {/* Scrollable List of all 114 Surahs */}
          <div className="space-y-1.5 max-h-[760px] overflow-y-auto pe-1">
            {filteredSurahs.map((surah) => {
              const isSelected = surah.number === selectedSurahNumber;
              return (
                <button
                  key={surah.number}
                  type="button"
                  data-testid={`surah-item-${surah.number}`}
                  onClick={() => handleSelectSurahFromIndex(surah.number)}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-start transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-amber-500/25 to-emerald-950/60 border-amber-400 text-white shadow-sm'
                      : 'bg-slate-950/70 border-slate-800/80 text-slate-300 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-[11px] font-black shrink-0 border ${
                        isSelected
                          ? 'bg-amber-500 text-slate-950 border-amber-300'
                          : 'bg-slate-900 text-amber-400 border-slate-700'
                      }`}
                    >
                      {surah.number}
                    </div>
                    <div className="truncate">
                      <div className="font-bold text-xs truncate">
                        سورة {surah.nameAr}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {surah.nameEn} • ح {surah.startHizb}
                      </div>
                    </div>
                  </div>

                  <span className="px-1.5 py-0.5 rounded bg-emerald-950/90 border border-emerald-500/30 text-[10px] font-bold text-emerald-300 shrink-0">
                    ح {surah.startHizb}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* =================================================================== */}
        {/* RIGHT MAIN MUSHAF SHEET (9 cols): EXACT REPLICA OF QURAN PAGE       */}
        {/* =================================================================== */}
        <div className="lg:col-span-9 space-y-4">
          {/* Page Navigation Bar Above the Mushaf Sheet */}
          <div className="flex items-center justify-between gap-3 bg-slate-900/90 border border-slate-800 px-4 py-2.5 rounded-2xl">
            <button
              type="button"
              onClick={goToPreviousPageOrSurah}
              disabled={
                readingScope === 'page-by-page'
                  ? currentPageNumber <= 1
                  : selectedSurahNumber <= 1
              }
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-slate-200 disabled:opacity-40 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4 text-amber-400" />
              <span>
                {readingScope === 'page-by-page'
                  ? language === 'ar'
                    ? 'الصفحة السابقة'
                    : 'Prev Page'
                  : language === 'ar'
                  ? 'السورة السابقة'
                  : 'Prev Surah'}
              </span>
            </button>

            <div className="text-center text-xs font-bold text-amber-300 flex flex-wrap items-center justify-center gap-2">
              <span>سُورَةُ {activeSurahMeta.nameAr}</span>
              <span>•</span>
              <span>حِزْب {currentHizbNumber}</span>
              <span>•</span>
              <span>
                {language === 'ar'
                  ? `صفحة ${currentPageNumber} من 604`
                  : `Page ${currentPageNumber} of 604`}
              </span>
            </div>

            <button
              type="button"
              onClick={goToNextPageOrSurah}
              disabled={
                readingScope === 'page-by-page'
                  ? currentPageNumber >= 604
                  : selectedSurahNumber >= 114
              }
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-slate-200 disabled:opacity-40 cursor-pointer"
            >
              <span>
                {readingScope === 'page-by-page'
                  ? language === 'ar'
                    ? 'الصفحة التالية'
                    : 'Next Page'
                  : language === 'ar'
                  ? 'السورة التالية'
                  : 'Next Surah'}
              </span>
              <ChevronLeft className="w-4 h-4 text-amber-400" />
            </button>
          </div>

          {loadingMushaf ? (
            <div className="rounded-3xl p-16 bg-slate-900/80 border border-amber-500/30 text-center space-y-3">
              <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-sm font-bold text-amber-200">
                {language === 'ar'
                  ? 'جاري تجهيز صفحة المصحف الشريف برواية ورش...'
                  : 'Loading Moroccan Warsh Mushaf page...'}
              </p>
            </div>
          ) : viewMode === 'mushaf-page' ? (
            /* =============================================================== */
            /* AUTHENTIC PRINTED MUSHAF SHEET WITH RIGHT MARGIN & BOTTOM KEY   */
            /* =============================================================== */
            <div
              data-testid="warsh-mushaf-page-container"
              dir="rtl"
              className={`rounded-3xl p-4 sm:p-8 shadow-2xl border transition-colors ${
                isDarkTheme
                  ? 'bg-[#060c1a] text-slate-100 border-amber-500/40'
                  : 'bg-[#faf6eb] text-[#111827] border-[#d6c7a1]'
              }`}
            >
              {/* Page Grid: Right Margin Vocabulary Column + Main Ornate Framed Mushaf Box */}
              <div className="flex flex-col md:flex-row items-stretch gap-4 sm:gap-5">
                {/* ----------------------------------------------------------- */}
                {/* RIGHT MARGIN COLUMN: بيان معاني الكلمات وعلامة الثُّمُن      */}
                {/* ----------------------------------------------------------- */}
                <aside
                  data-testid="mushaf-margin-vocabulary"
                  className="w-full md:w-44 shrink-0 flex flex-col justify-between py-6 px-2.5 md:border-e border-[#14967f]/25"
                >
                  <div className="space-y-3">
                    {marginMeanings.map((item, idx) => (
                      <div key={idx} className="leading-snug">
                        <div className="flex items-center gap-1.5 font-quran text-base font-bold">
                          <span className="w-2 h-2 bg-[#15803d] inline-block shrink-0" />
                          <span
                            className={
                              isDarkTheme ? 'text-amber-300' : 'text-[#3f1d0b]'
                            }
                          >
                            {item.word}
                          </span>
                        </div>
                        <p
                          className={`text-xs ps-3.5 font-serif leading-relaxed ${
                            isDarkTheme ? 'text-slate-300' : 'text-[#292524]'
                          }`}
                        >
                          {item.meaning}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Ornate Moroccan Thumun / Hizb Dome Emblem in Margin */}
                  {hasThumunOnPage && (
                    <MarginalThumunEmblem label="ثُمُنٌ" darkTheme={isDarkTheme} />
                  )}
                </aside>

                {/* ----------------------------------------------------------- */}
                {/* CENTER/LEFT MAIN FRAMED MUSHAF BOX                          */}
                {/* ----------------------------------------------------------- */}
                <div className="flex-1 flex flex-col">
                  {/* 1. TOP EAR TABS ABOVE THE FRAME (حِزْب 41 | سُورَةُ لُقْمَٰنَ 31) */}
                  <div className="flex items-end justify-between px-6 -mb-[2px] relative z-10">
                    {/* Right Top Ear Tab: Hizb */}
                    <div
                      className={`px-5 py-1 border-2 border-b-0 font-quran text-lg sm:text-xl font-bold tracking-wide ${
                        isDarkTheme
                          ? 'bg-[#09152b] border-[#14967f] text-amber-200'
                          : 'bg-[#fffdf7] border-[#14967f] text-[#111827]'
                      }`}
                    >
                      حِزْب {currentHizbNumber}
                    </div>

                    {/* Left Top Ear Tab: Surah Name & Number */}
                    <div
                      className={`px-5 py-1 border-2 border-b-0 font-quran text-lg sm:text-xl font-bold tracking-wide ${
                        isDarkTheme
                          ? 'bg-[#09152b] border-[#14967f] text-amber-200'
                          : 'bg-[#fffdf7] border-[#14967f] text-[#111827]'
                      }`}
                    >
                      سُورَةُ {activeSurahMeta.nameAr} {activeSurahMeta.number}
                    </div>
                  </div>

                  {/* 2. ORNATE DOUBLE EMERALD & GOLD GEOMETRIC MUSHAF FRAME */}
                  <div
                    className={`border-[3px] border-[#14967f] p-1.5 sm:p-2 ${
                      isDarkTheme
                        ? 'bg-gradient-to-r from-[#0d3b2e] via-[#1b4332] to-[#0d3b2e]'
                        : 'bg-[repeating-linear-gradient(45deg,#15803d_0px,#15803d_4px,#fef3c7_4px,#fef3c7_8px,#b91c1c_8px,#b91c1c_10px,#fef3c7_10px,#fef3c7_14px)]'
                    }`}
                  >
                    <div
                      className={`border-2 border-[#14967f] p-4 sm:p-7 ${
                        isDarkTheme ? 'bg-[#071022]' : 'bg-[#fffdf9]'
                      }`}
                    >
                      {chapterSectionsOnPage.map((sec) => (
                        <div key={sec.surahMeta.number} className="mb-6 last:mb-0">
                          {/* ORNATE SURAH HEADER CARTOUCHE BANNER (سرّة السورة المزخرفة) */}
                          {(sec.startsFromVerseOne || readingScope === 'full-surah') && (
                            <div className="mb-5">
                              <div
                                className={`relative rounded-xl border-2 border-[#15803d] overflow-hidden p-2 sm:p-3 flex items-center justify-between gap-2 shadow-md ${
                                  isDarkTheme
                                    ? 'bg-gradient-to-r from-[#064e3b] via-[#0f291e] to-[#064e3b]'
                                    : 'bg-gradient-to-r from-[#15803d] via-[#166534] to-[#15803d]'
                                }`}
                              >
                                {/* Right Wing Medallion: ترتيبها 31 */}
                                <div className="flex items-center gap-2 shrink-0">
                                  <div className="hidden sm:flex w-10 h-10 rounded-full border border-amber-300/60 bg-[#052e16]/60 items-center justify-center text-amber-300 text-lg">
                                    ❁
                                  </div>
                                  <div className="w-14 h-14 rounded-full border-2 border-[#fef08a] bg-[#15803d] flex flex-col items-center justify-center text-white shadow-inner">
                                    <span className="text-[10px] font-bold leading-none">
                                      ترتيبها
                                    </span>
                                    <span className="text-sm font-black font-mono mt-0.5">
                                      {sec.surahMeta.number}
                                    </span>
                                  </div>
                                </div>

                                {/* Center White Scalloped Cartouche: سُورَةُ لُقْمَٰنَ */}
                                <div
                                  className={`flex-1 max-w-md mx-auto py-1.5 px-4 rounded-full border-2 border-[#ca8a04] text-center shadow-inner ${
                                    isDarkTheme
                                      ? 'bg-[#09152b] text-amber-200'
                                      : 'bg-[#fffef7] text-[#111827]'
                                  }`}
                                >
                                  <h2
                                    data-testid="active-surah-heading"
                                    className="font-quran text-2xl sm:text-4xl font-bold tracking-wide"
                                  >
                                    سُورَةُ {sec.surahMeta.nameAr}
                                  </h2>
                                </div>

                                {/* Left Wing Medallion: آياتها 33 */}
                                <div className="flex items-center gap-2 shrink-0">
                                  <div className="w-14 h-14 rounded-full border-2 border-[#fef08a] bg-[#15803d] flex flex-col items-center justify-center text-white shadow-inner">
                                    <span className="text-[10px] font-bold leading-none">
                                      آياتها
                                    </span>
                                    <span className="text-sm font-black font-mono mt-0.5">
                                      {sec.warshTotalVerses}
                                    </span>
                                  </div>
                                  <div className="hidden sm:flex w-10 h-10 rounded-full border border-amber-300/60 bg-[#052e16]/60 items-center justify-center text-amber-300 text-lg">
                                    ❁
                                  </div>
                                </div>
                              </div>

                              {/* Centered Calligraphic Basmalah */}
                              {sec.surahMeta.number !== 1 && sec.surahMeta.number !== 9 && (
                                <div className="text-center pt-4 pb-2">
                                  <p
                                    className={`font-quran text-2xl sm:text-3xl font-bold ${
                                      isDarkTheme ? 'text-amber-100' : 'text-[#111827]'
                                    }`}
                                  >
                                    بِسْمِ اِ۬للَّهِ اِ۬لرَّحْمَٰنِ اِ۬لرَّحِيمِ
                                  </p>
                                </div>
                              )}
                            </div>
                          )}

                          {/* FULL-JUSTIFIED MUSHAF LINES WITH TAJWEED COLORS & OCTAGONAL MEDALLIONS */}
                          <div
                            className={`font-quran ${fontSizeClass} leading-[2.35] text-justify tracking-normal select-text`}
                            style={{ textAlignLast: 'center' }}
                          >
                            {sec.verses.map((v) => {
                              const isHighlighted = highlightedVerse === v.verse;
                              const isBookmarked =
                                bookmark?.surahNumber === v.chapter &&
                                bookmark?.verseNumber === v.verse;

                              return (
                                <span
                                  key={`${v.chapter}:${v.verse}`}
                                  onClick={() => handleSaveBookmark(v.chapter, v.verse)}
                                  title={`آية ${v.verse} - انقر لحفظ علامة الوقف`}
                                  className={`inline cursor-pointer rounded-lg px-0.5 transition-colors ${
                                    isHighlighted
                                      ? isDarkTheme
                                        ? 'bg-amber-500/30'
                                        : 'bg-amber-200/80'
                                      : isBookmarked
                                      ? isDarkTheme
                                        ? 'bg-emerald-500/25'
                                        : 'bg-emerald-100'
                                      : 'hover:bg-amber-500/10'
                                  }`}
                                >
                                  {renderTajweedColoredWarshText(
                                    v.text,
                                    enableTajweedColors,
                                    isDarkTheme
                                  )}
                                  <MoroccanVerseMedallion
                                    verseNumber={v.verse}
                                    darkTheme={isDarkTheme}
                                  />
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 3. BOTTOM 4-COLUMN TAJWEED COLOR LEGEND BAR (شريط مفتاح ألوان التجويد) */}
                  <div
                    data-testid="tajweed-legend-bar"
                    className={`grid grid-cols-2 sm:grid-cols-4 border-2 border-t-0 border-[#14967f] text-xs font-bold ${
                      isDarkTheme
                        ? 'bg-[#09152b] text-slate-200 divide-x divide-x-reverse divide-[#14967f]/50'
                        : 'bg-[#fffdf7] text-[#111827] divide-x divide-x-reverse divide-[#14967f]'
                    }`}
                  >
                    {/* Cell 1: مد مشبع 6 حركات & مد 2 أو 4 أو 6 جوازاً */}
                    <div className="p-2 flex flex-col justify-center gap-1">
                      <div className="flex items-center justify-between gap-1">
                        <span>مدّ مشبع 6 حركات</span>
                        <span className="w-3 h-3 rounded-full bg-[#d81b60] inline-block shrink-0" />
                      </div>
                      <div className="flex items-center justify-between gap-1">
                        <span>مدّ 2 أو 4 أو 6 جوازاً</span>
                        <span className="w-3 h-3 rounded-full bg-[#e65100] inline-block shrink-0" />
                      </div>
                    </div>

                    {/* Cell 2: مد حركتين */}
                    <div className="p-2 flex items-center justify-center gap-2">
                      <span>مدّ حركتين</span>
                      <span className="w-3 h-3 rounded-full bg-[#eab308] inline-block shrink-0" />
                    </div>

                    {/* Cell 3: إخفاء ومواقع الغنة & إدغام وما لا يلفظ */}
                    <div className="p-2 flex flex-col justify-center gap-1">
                      <div className="flex items-center justify-between gap-1">
                        <span>إخفاء، ومواقع الغُنّة (حركتين)</span>
                        <span className="w-3 h-3 rounded-full bg-[#15803d] inline-block shrink-0" />
                      </div>
                      <div className="flex items-center justify-between gap-1">
                        <span>إدغام، وما لا يُلفظ</span>
                        <span className="w-3 h-3 rounded-full bg-[#9ca3af] inline-block shrink-0" />
                      </div>
                    </div>

                    {/* Cell 4: تفخيم & قلقلة */}
                    <div className="p-2 flex flex-col justify-center gap-1">
                      <div className="flex items-center justify-between gap-1">
                        <span>تفخيم</span>
                        <span className="w-3 h-3 rounded-full bg-[#0d47a1] inline-block shrink-0" />
                      </div>
                      <div className="flex items-center justify-between gap-1">
                        <span>قلقلة</span>
                        <span className="w-3 h-3 rounded-full bg-[#06b6d4] inline-block shrink-0" />
                      </div>
                    </div>
                  </div>

                  {/* 4. CENTERED PAGE NUMBER AT THE BOTTOM OF THE SHEET (e.g. 411) */}
                  <div className="pt-3 flex items-center justify-between px-4">
                    <div className="text-[11px] font-bold text-[#14967f]">
                      رواية ورش عن نافع • المصحف المغربي
                    </div>
                    <div
                      data-testid="mushaf-page-number-footer"
                      className={`text-2xl font-black font-sans tracking-wider ${
                        isDarkTheme ? 'text-amber-300' : 'text-[#111827]'
                      }`}
                    >
                      {currentPageNumber}
                    </div>
                    <div className="text-[11px] font-bold text-[#14967f]">
                      حِزْب {currentHizbNumber}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* =============================================================== */
            /* MODE B: VERSE-BY-VERSE STUDY & COPY CARDS                       */
            /* =============================================================== */
            <div className="space-y-3" dir="rtl">
              {verses
                .filter((v) => !highlightCosmicOnly || isCosmicVerse(v.text))
                .map((v) => {
                  const key = `${v.chapter}:${v.verse}`;
                  const isCosmic = isCosmicVerse(v.text);
                  const isBookmarked =
                    bookmark?.surahNumber === v.chapter && bookmark?.verseNumber === v.verse;

                  return (
                    <div
                      key={key}
                      className={`p-5 rounded-2xl border transition-all ${
                        isBookmarked
                          ? 'bg-emerald-950/40 border-emerald-400/60'
                          : isCosmic
                          ? 'bg-slate-900/95 border-cyan-500/40'
                          : 'bg-slate-900/80 border-slate-800'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold">
                            الآية {v.verse}
                          </span>
                          {isCosmic && (
                            <span className="px-2.5 py-1 rounded-lg bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-[11px] font-bold flex items-center gap-1">
                              <Sparkles className="w-3 h-3" />
                              <span>آية كونية</span>
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleSaveBookmark(v.chapter, v.verse)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 border cursor-pointer ${
                              isBookmarked
                                ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                                : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
                            }`}
                          >
                            <Bookmark className="w-3.5 h-3.5" />
                            <span>{isBookmarked ? 'محفوظة كعلامة وقف' : 'حفظ الوقف'}</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleCopyVerse(v)}
                            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold flex items-center gap-1 border border-slate-700 cursor-pointer"
                          >
                            {copiedVerseKey === key ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                                <span className="text-emerald-300">تم النسخ</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>نسخ الآية</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                      <p
                        className={`font-quran ${fontSizeClass} leading-[2.2] text-amber-100 text-right`}
                      >
                        {renderTajweedColoredWarshText(v.text, enableTajweedColors, true)}
                        <MoroccanVerseMedallion verseNumber={v.verse} darkTheme={true} />
                      </p>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
