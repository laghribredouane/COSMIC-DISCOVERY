import React, { useState, useEffect } from 'react';
import {
  ExternalLink,
  BookOpen,
  Globe,
  Compass,
  Award,
  Check,
  Copy,
  ChevronLeft,
  ChevronRight,
  FileText,
  Calculator,
  HeartHandshake
} from 'lucide-react';
import { Language } from '../types/cosmic';

interface KaheelPartnerAdsProps {
  language: Language;
  variant?: 'hero-ribbon' | 'featured-showcase' | 'compact-banner';
}

interface KaheelAdCampaign {
  id: string;
  category: { ar: string; en: string; fr: string };
  title: { ar: string; en: string; fr: string };
  subtitle: { ar: string; en: string; fr: string };
  verseQuote: { ar: string; ref: string };
  highlights: { ar: string[]; en: string[]; fr: string[] };
  ctaLabel: { ar: string; en: string; fr: string };
  url: string;
  accentColor: 'amber' | 'cyan' | 'emerald' | 'indigo';
}

const KAHEEL_CAMPAIGNS: KaheelAdCampaign[] = [
  {
    id: 'cosmic-miracles',
    category: {
      ar: 'الإعجاز العلمي في الكون والفلك',
      en: 'Cosmic & Astronomical Miracles',
      fr: 'Miracles Cosmiques et Astronomiques',
    },
    title: {
      ar: 'موسوعة الكحيل للإعجاز العلمي في القرآن والسنة',
      en: 'Al-Kaheel Encyclopedia of Scientific Miracles in Quran & Sunnah',
      fr: 'Encyclopédie Al-Kaheel des Miracles Scientifiques du Coran et de la Sunna',
    },
    subtitle: {
      ar: 'الموقع الرسمي للمهندس عبد الدائم الكحيل (kaheel7.net) — مئات الأبحاث المصورة حول أسرار الكون، المجرات، النسيج الكوني، والنجوم الطارقة في ضوء الآيات القرآنية.',
      en: 'Official portal of Eng. Abduldaem Al-Kaheel (kaheel7.net) — hundreds of illustrated studies on galaxies, the cosmic web, and astrophysics in the light of the Quran.',
      fr: 'Portail officiel de l’Ing. Abduldaem Al-Kaheel (kaheel7.net) — des centaines d’études illustrées sur l’univers, les galaxies et l’astrophysique à la lumière du Coran.',
    },
    verseQuote: {
      ar: '﴿سَنُرِيهِمْ آيَاتِنَا فِي الْآفَاقِ وَفِي أَنفُسِهِمْ حَتَّىٰ يَتَبَيَّنَ لَهُمْ أَنَّهُ الْحَقُّ﴾',
      ref: 'سورة فصلت : 53',
    },
    highlights: {
      ar: [
        'موسوعة الفلك والفضاء بالصور عالية الدقة',
        'حقائق توسع الكون والدخان الكوني والمجرات',
        'مقالات علمية موثقة بـ 12 لغة عالمية',
      ],
      en: [
        'Illustrated Astronomy & Space Encyclopedia',
        'Cosmic expansion, interstellar smoke & galaxies',
        'Peer-referenced studies in 12+ languages',
      ],
      fr: [
        'Encyclopédie illustrée de l’astronomie et de l’espace',
        'Expansion cosmique, fumée stellaire et galaxies',
        'Études documentées en plus de 12 langues',
      ],
    },
    ctaLabel: {
      ar: 'زيارة موسوعة الإعجاز الكوني في kaheel7.net',
      en: 'Visit Cosmic Miracles at kaheel7.net',
      fr: 'Visiter kaheel7.net',
    },
    url: 'https://kaheel7.net/',
    accentColor: 'amber',
  },
  {
    id: 'free-library',
    category: {
      ar: 'المكتبة المجانية والكتب المصورة',
      en: 'Free Books & Visual Publications',
      fr: 'Bibliothèque Gratuite & Livres Illustrés',
    },
    title: {
      ar: 'حمّل مجاناً مئات الكتب والأبحاث العلمية المصورة من موقع الكحيل',
      en: 'Download Hundreds of Free Illustrated Scientific Books at Kaheel7.net',
      fr: 'Téléchargez gratuitement des centaines de livres illustrés sur Kaheel7.net',
    },
    subtitle: {
      ar: 'يوفر موقع المهندس عبد الدائم الكحيل مكتبة رقمية مجانية شاملة تضم سلسلة كتب «روائع الإعجاز»، كتيبات الحقائق العلمية، والعروض التقديمية المتاحة للتحميل والنشر بدون حقوق طبع.',
      en: 'Access a complete open digital library featuring the Miracles Series, PDF booklets, presentations, and scientific documentaries free for download and sharing.',
      fr: 'Accédez à une bibliothèque numérique gratuite comprenant des livres PDF, des présentations et des recherches scientifiques libres de droits.',
    },
    verseQuote: {
      ar: '﴿وَقُل رَّبِّ زِدْنِي عِلْمًا﴾',
      ref: 'سورة طه : 114',
    },
    highlights: {
      ar: [
        'كتب PDF مجانية جاهزة للتحميل والقراءة المباشرة',
        'أبحاث مصورة في علوم الأرض والبحار والجبال',
        'محتوى وقفي مجاني متاح للنشر والترجمة',
      ],
      en: [
        'Free PDF books ready for instant download',
        'Illustrated Earth, Ocean & Mountain studies',
        'Open educational content free to share',
      ],
      fr: [
        'Livres PDF gratuits prêts au téléchargement',
        'Études illustrées sur la Terre et les océans',
        'Contenu éducatif ouvert et gratuit',
      ],
    },
    ctaLabel: {
      ar: 'تصفح المكتبة المجانية في kaheel7.net',
      en: 'Browse Free Library at kaheel7.net',
      fr: 'Parcourir la bibliothèque sur kaheel7.net',
    },
    url: 'https://kaheel7.net/',
    accentColor: 'cyan',
  },
  {
    id: 'numerical-symmetry',
    category: {
      ar: 'البناء الرقمي والإعجاز العددي',
      en: 'Numerical Symmetry & Quranic Precision',
      fr: 'Harmonie Numérique & Précision Coranique',
    },
    title: {
      ar: 'أسرار الإعجاز العددي واللغوي في آيات القرآن الكريم',
      en: 'Discover Numerical & Linguistic Precision in the Holy Quran',
      fr: 'Découvrez la précision numérique et linguistique du Saint Coran',
    },
    subtitle: {
      ar: 'دراسات إحصائية وبحوث معمقة للمهندس عبد الدائم الكحيل تكشف التناسق الرياضي المذهل في ترتيب سور وآيات وكلمات وحروف القرآن الكريم.',
      en: 'In-depth statistical studies by Eng. Abduldaem Al-Kaheel revealing mathematical symmetry across chapters, verses, words, and letters of the Quran.',
      fr: 'Études statistiques approfondies de l’Ing. Abduldaem Al-Kaheel révélant l’harmonie mathématique des sourates, versets et lettres du Coran.',
    },
    verseQuote: {
      ar: '﴿وَأَحْصَىٰ كُلَّ شَيْءٍ عَدَدًا﴾',
      ref: 'سورة الجن : 28',
    },
    highlights: {
      ar: [
        'موسوعة أسرار الرقم 7 في القرآن والكون',
        'إحصاءات دقيقة لتكرار الكلمات والآيات الكونية',
        'براهين علمية ولغوية تخاطب العقل المعاصر',
      ],
      en: [
        'Encyclopedia of Number 7 in Quran & Cosmos',
        'Exact lexical statistics of cosmic verses',
        'Rational proofs for contemporary minds',
      ],
      fr: [
        'Encyclopédie du chiffre 7 dans le Coran et le cosmos',
        'Statistiques lexicales exactes des versets cosmiques',
        'Preuves rationnelles pour l’esprit contemporain',
      ],
    },
    ctaLabel: {
      ar: 'استكشف أبحاث الإعجاز العددي في kaheel7.net',
      en: 'Explore Numerical Studies at kaheel7.net',
      fr: 'Explorer les études sur kaheel7.net',
    },
    url: 'https://kaheel7.net/',
    accentColor: 'emerald',
  },
  {
    id: 'healing-and-sunnah',
    category: {
      ar: 'أسرار الشفاء والتدبر والسنة النبوية',
      en: 'Quranic Contemplation & Prophetic Medicine',
      fr: 'Méditation Coranique & Médecine Prophétique',
    },
    title: {
      ar: 'آفاق التدبر والاستشفاء بالقرآن وروائع الإعجاز في السنة النبوية',
      en: 'Quranic Reflection, Wellbeing & Scientific Signs in the Prophetic Sunnah',
      fr: 'Méditation du Coran, bien-être et signes scientifiques dans la Sunna',
    },
    subtitle: {
      ar: 'مقالات يومية متجددة تربط أحدث الاكتشافات العلمية والطبية بهدي القرآن الكريم والأحاديث النبوية الشريفة بأسلوب علمي رصين وميسر.',
      en: 'Daily updated articles connecting modern scientific and medical discoveries with Quranic guidance and authentic Prophetic traditions.',
      fr: 'Articles quotidiens reliant les découvertes scientifiques modernes aux enseignements du Coran et des hadiths authentiques.',
    },
    verseQuote: {
      ar: '﴿وَنُنَزِّلُ مِنَ الْقُرْآنِ مَا هُوَ شِفَاءٌ وَرَحْمَةٌ لِّلْمُؤْمِنِينَ﴾',
      ref: 'سورة الإسراء : 82',
    },
    highlights: {
      ar: [
        'الإعجاز الطبي والنفسي في الآيات والأحاديث',
        'تأملات يومية مصورة لزيادة الخشوع واليقين',
        'فيديوهات وصوتيات علمية وإيمانية متجددة',
      ],
      en: [
        'Medical & psychological insights in Scripture',
        'Daily visual reflections for deeper contemplation',
        'Scientific & educational audio-visual library',
      ],
      fr: [
        'Perspectives médicales et scientifiques des textes',
        'Réflexions visuelles quotidiennes',
        'Médiathèque scientifique et éducative',
      ],
    },
    ctaLabel: {
      ar: 'ادخل إلى بوابة الشفاء والتدبر في kaheel7.net',
      en: 'Open Contemplation Portal at kaheel7.net',
      fr: 'Accéder au portail sur kaheel7.net',
    },
    url: 'https://kaheel7.net/',
    accentColor: 'indigo',
  },
];

export const KaheelPartnerAds: React.FC<KaheelPartnerAdsProps> = ({
  language,
  variant = 'featured-showcase',
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [copiedUrl, setCopiedUrl] = useState(false);

  const isRtl = language === 'ar';
  const activeCampaign = KAHEEL_CAMPAIGNS[activeIndex] || KAHEEL_CAMPAIGNS[0];

  useEffect(() => {
    if (variant !== 'hero-ribbon') return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % KAHEEL_CAMPAIGNS.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [variant]);

  const handleCopyUrl = () => {
    navigator.clipboard.writeText('https://kaheel7.net/').catch(() => {});
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  // VARIANT 1: TOP HERO RIBBON AD BANNER
  if (variant === 'hero-ribbon') {
    return (
      <div
        data-testid="kaheel-ad-hero-ribbon"
        className="w-full rounded-2xl bg-slate-900/95 border border-amber-500/35 px-4 py-3 shadow-lg transition-colors"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/40 flex items-center justify-center text-amber-300 shrink-0">
              <Globe className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2 text-xs text-amber-300/90 font-semibold">
                <span>
                  {language === 'ar'
                    ? 'إعلان شريك معرفي مميز'
                    : language === 'fr'
                    ? 'Partenaire Scientifique Recommandé'
                    : 'Featured Knowledge Partner'}
                </span>
                <span aria-hidden="true">·</span>
                <span className="font-mono text-amber-200">kaheel7.net</span>
                <span aria-hidden="true">·</span>
                <span className="text-slate-300">
                  {activeCampaign.category[language]}
                </span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-white truncate mt-0.5">
                {activeCampaign.title[language]}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0 self-end md:self-center">
            <div className="hidden sm:flex items-center gap-1">
              <button
                type="button"
                onClick={() =>
                  setActiveIndex(
                    (prev) => (prev - 1 + KAHEEL_CAMPAIGNS.length) % KAHEEL_CAMPAIGNS.length
                  )
                }
                aria-label="Previous announcement"
                className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
              >
                {isRtl ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
              </button>
              <button
                type="button"
                onClick={() => setActiveIndex((prev) => (prev + 1) % KAHEEL_CAMPAIGNS.length)}
                aria-label="Next announcement"
                className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
              >
                {isRtl ? <ChevronLeft className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
              </button>
            </div>

            <a
              href="https://kaheel7.net/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs whitespace-nowrap shrink-0 transition-colors shadow-sm"
            >
              <span>
                {language === 'ar'
                  ? 'زيارة موقع الكحيل (kaheel7.net)'
                  : language === 'fr'
                  ? 'Visiter kaheel7.net'
                  : 'Visit kaheel7.net'}
              </span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    );
  }

  // VARIANT 2: COMPACT IN-FEED BANNER AD
  if (variant === 'compact-banner') {
    return (
      <div
        data-testid="kaheel-ad-compact-banner"
        className="rounded-2xl bg-slate-900/90 border border-amber-500/35 p-5 sm:p-6 shadow-xl"
      >
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 text-xs text-amber-300 font-semibold">
              <span>
                {language === 'ar'
                  ? 'إعلان علمي موصى به'
                  : language === 'fr'
                  ? 'Portail Scientifique Recommandé'
                  : 'Sponsored Scientific Portal'}
              </span>
              <span aria-hidden="true">·</span>
              <span>
                {language === 'ar'
                  ? 'الموقع الرسمي للمهندس عبد الدائم الكحيل'
                  : 'Eng. Abduldaem Al-Kaheel Official Portal'}
              </span>
              <span aria-hidden="true">·</span>
              <span className="font-mono text-cyan-300">https://kaheel7.net/</span>
            </div>

            <h3 className="text-lg sm:text-xl font-black text-white">
              {language === 'ar'
                ? 'موسوعة الكحيل للإعجاز العلمي في القرآن والسنة — أبحاث وكتب مجانية في الفلك والكون والقرآن'
                : language === 'fr'
                ? 'Encyclopédie Al-Kaheel des Miracles Scientifiques dans le Coran et la Sunna (kaheel7.net)'
                : 'Al-Kaheel Encyclopedia of Scientific Miracles in the Quran & Sunnah (kaheel7.net)'}
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {language === 'ar'
                ? 'استكشف آلاف المقالات الموثقة، الكتب الإلكترونية المجانية، أسرار الإعجاز الكوني والعددي، وأحدث الاكتشافات العلمية التي تشهد بصدق آيات القرآن الكريم بأكثر من 12 لغة عالمية.'
                : language === 'fr'
                ? 'Explorez des milliers d’articles documentés, des livres PDF gratuits, et les découvertes cosmiques et numériques en plus de 12 langues.'
                : 'Explore thousands of documented articles, free PDF books, and cosmic & numerical studies across more than 12 global languages.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={handleCopyUrl}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold whitespace-nowrap shrink-0 transition-colors cursor-pointer"
            >
              {copiedUrl ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{language === 'ar' ? 'تم نسخ الرابط' : 'Link Copied'}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span>kaheel7.net</span>
                </>
              )}
            </button>

            <a
              href="https://kaheel7.net/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs whitespace-nowrap shrink-0 transition-colors shadow-md"
            >
              <span>
                {language === 'ar'
                  ? 'الدخول إلى موقع الكحيل (kaheel7.net)'
                  : language === 'fr'
                  ? 'Ouvrir kaheel7.net'
                  : 'Open kaheel7.net'}
              </span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    );
  }

  // VARIANT 3: FULL FEATURED MULTI-PORTAL AD SHOWCASE
  return (
    <section
      data-testid="kaheel-ad-featured-showcase"
      className="rounded-3xl bg-slate-900/95 border border-amber-500/40 p-6 sm:p-8 shadow-2xl space-y-6"
    >
      {/* Top Kicker & Partner Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2 text-xs text-amber-300 font-semibold">
            <span>
              {language === 'ar'
                ? 'إعلان ومنصة علمية موصى بها'
                : language === 'fr'
                ? 'Plateforme Scientifique Partenaire'
                : 'Sponsored Scientific Knowledge Partner'}
            </span>
            <span aria-hidden="true">·</span>
            <span className="font-mono text-cyan-300">https://kaheel7.net/</span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-300">
              {language === 'ar'
                ? 'الموقع الرسمي للمهندس عبد الدائم الكحيل'
                : 'Official Website of Eng. Abduldaem Al-Kaheel'}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white">
            {language === 'ar'
              ? 'موسوعة الكحيل للإعجاز العلمي في القرآن والسنة (kaheel7.net)'
              : language === 'fr'
              ? 'Encyclopédie Al-Kaheel des Miracles Scientifiques (kaheel7.net)'
              : 'Al-Kaheel Encyclopedia of Scientific Miracles (kaheel7.net)'}
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={handleCopyUrl}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold whitespace-nowrap shrink-0 transition-colors cursor-pointer"
          >
            {copiedUrl ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>{language === 'ar' ? 'تم نسخ رابط الموقع' : 'URL Copied'}</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-amber-300" />
                <span>
                  {language === 'ar' ? 'نسخ الرابط: kaheel7.net' : 'Copy: kaheel7.net'}
                </span>
              </>
            )}
          </button>

          <a
            href="https://kaheel7.net/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm whitespace-nowrap shrink-0 transition-colors shadow-lg shadow-amber-500/20"
          >
            <span>
              {language === 'ar'
                ? 'تصفح موقع الكحيل الآن'
                : language === 'fr'
                ? 'Visiter kaheel7.net maintenant'
                : 'Visit kaheel7.net Now'}
            </span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Interactive Ad Category Selector Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {KAHEEL_CAMPAIGNS.map((camp, idx) => {
          const isSelected = idx === activeIndex;
          return (
            <button
              key={camp.id}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                isSelected
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'bg-slate-950/80 text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              {camp.category[language]}
            </button>
          );
        })}
      </div>

      {/* Main Spotlight Ad Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left / Main Ad Banner Content (7 cols) */}
        <div className="lg:col-span-7 rounded-2xl bg-slate-950/90 border border-slate-800 p-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-2 text-xs text-amber-300 font-semibold">
              <span>{activeCampaign.category[language]}</span>
              <span className="font-mono text-slate-400">{activeCampaign.verseQuote.ref}</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/90 border border-amber-500/25 text-center">
              <p className="font-quran text-lg sm:text-xl text-amber-200 leading-relaxed">
                {activeCampaign.verseQuote.ar}
              </p>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white leading-snug">
              {activeCampaign.title[language]}
            </h3>

            <p className="text-sm text-slate-300 leading-relaxed">
              {activeCampaign.subtitle[language]}
            </p>

            <div className="space-y-2 pt-1">
              {activeCampaign.highlights[language].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs text-slate-400">
              <span>
                {language === 'ar'
                  ? 'متاح مجاناً بـ 12 لغة عالمية · بدون حقوق طبع'
                  : 'Available free in 12+ languages · Open educational license'}
              </span>
            </div>

            <a
              href={activeCampaign.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs whitespace-nowrap shrink-0 transition-colors"
            >
              <span>{activeCampaign.ctaLabel[language]}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Right / 4 Quick Direct Portal Ad Cards (5 cols) */}
        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a
            href="https://kaheel7.net/"
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-amber-500/50 p-4 flex flex-col justify-between transition-colors"
          >
            <div className="space-y-2">
              <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-300">
                <Compass className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                {language === 'ar' ? 'إعجاز الكون والفلك' : 'Astronomy & Cosmos'}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                {language === 'ar'
                  ? 'المجرات، الثقوب السوداء، النسيج الكوني، والطارق في القرآن الكريم.'
                  : 'Galaxies, black holes, the cosmic web & pulsars in the Quran.'}
              </p>
            </div>
            <div className="pt-3 mt-3 border-t border-slate-900 flex items-center justify-between text-[11px] font-bold text-amber-400">
              <span>kaheel7.net</span>
              <ExternalLink className="w-3 h-3" />
            </div>
          </a>

          <a
            href="https://kaheel7.net/"
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-cyan-500/50 p-4 flex flex-col justify-between transition-colors"
          >
            <div className="space-y-2">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-300">
                <FileText className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                {language === 'ar' ? 'الكتب والأبحاث المجانية' : 'Free PDF Books'}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                {language === 'ar'
                  ? 'تحميل مجاني ومباشر لسلسلة كتب روائع الإعجاز العلمي والأبحاث المصورة.'
                  : 'Free instant download of illustrated books and research series.'}
              </p>
            </div>
            <div className="pt-3 mt-3 border-t border-slate-900 flex items-center justify-between text-[11px] font-bold text-cyan-400">
              <span>kaheel7.net</span>
              <ExternalLink className="w-3 h-3" />
            </div>
          </a>

          <a
            href="https://kaheel7.net/"
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/50 p-4 flex flex-col justify-between transition-colors"
          >
            <div className="space-y-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-300">
                <Calculator className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                {language === 'ar' ? 'موسوعة الإعجاز العددي' : 'Numerical Miracles'}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                {language === 'ar'
                  ? 'أسرار الرقم 7 والتناسق الإحصائي والرياضي في سور وآيات القرآن.'
                  : 'Mathematical harmony and statistical precision across Quranic verses.'}
              </p>
            </div>
            <div className="pt-3 mt-3 border-t border-slate-900 flex items-center justify-between text-[11px] font-bold text-emerald-400">
              <span>kaheel7.net</span>
              <ExternalLink className="w-3 h-3" />
            </div>
          </a>

          <a
            href="https://kaheel7.net/"
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/50 p-4 flex flex-col justify-between transition-colors"
          >
            <div className="space-y-2">
              <div className="w-9 h-9 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-300">
                <HeartHandshake className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                {language === 'ar' ? 'الشفاء بالقرآن والسنة' : 'Healing & Sunnah'}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                {language === 'ar'
                  ? 'برامج التدبر، الطب النبوي، والحقائق العلمية في الأحاديث الشريفة.'
                  : 'Contemplation guides, Prophetic medicine & scientific Hadith studies.'}
              </p>
            </div>
            <div className="pt-3 mt-3 border-t border-slate-900 flex items-center justify-between text-[11px] font-bold text-indigo-400">
              <span>kaheel7.net</span>
              <ExternalLink className="w-3 h-3" />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};
