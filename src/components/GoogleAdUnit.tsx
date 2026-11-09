import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink, Info, X, SlidersHorizontal, CheckCircle2 } from 'lucide-react';
import { Language } from '../types/cosmic';

export interface GoogleAdsConfig {
  enabled: boolean;
  autoAds: boolean;
  clientId: string; // e.g., ca-pub-4829103948192031
  slots: {
    homeLeaderboard: string;
    encyclopediaInArticle: string;
    quranCosmosBanner: string;
    footerMultiplex: string;
  };
}

const STORAGE_KEY = 'cosmic_google_ads_config_v1';

export const DEFAULT_GOOGLE_ADS_CONFIG: GoogleAdsConfig = {
  enabled: true,
  autoAds: true,
  clientId:
    (typeof import.meta !== 'undefined' &&
      (import.meta as any).env?.VITE_GOOGLE_ADSENSE_CLIENT_ID) ||
    'ca-pub-8492019384756102',
  slots: {
    homeLeaderboard: '1049283741',
    encyclopediaInArticle: '2059384752',
    quranCosmosBanner: '3069485763',
    footerMultiplex: '4079586774',
  },
};

export function loadGoogleAdsConfig(): GoogleAdsConfig {
  if (typeof window === 'undefined') return DEFAULT_GOOGLE_ADS_CONFIG;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_GOOGLE_ADS_CONFIG;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_GOOGLE_ADS_CONFIG,
      ...parsed,
      slots: {
        ...DEFAULT_GOOGLE_ADS_CONFIG.slots,
        ...(parsed.slots || {}),
      },
    };
  } catch {
    return DEFAULT_GOOGLE_ADS_CONFIG;
  }
}

export function saveGoogleAdsConfig(config: GoogleAdsConfig): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    window.dispatchEvent(new CustomEvent('google-ads-config-updated'));
  } catch {
    // ignore storage errors
  }
}

export function ensureAdSenseScriptLoaded(clientId: string): void {
  if (typeof document === 'undefined' || !clientId || !clientId.startsWith('ca-pub-')) return;
  const existing = document.querySelector(`script[data-adsbygoogle-client="${clientId}"]`);
  if (existing) return;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(
    clientId
  )}`;
  script.crossOrigin = 'anonymous';
  script.setAttribute('data-adsbygoogle-client', clientId);
  document.head.appendChild(script);
}

interface ContextualAdItem {
  id: string;
  advertiser: string;
  displayUrl: string;
  targetUrl: string;
  headline: { ar: string; en: string; fr: string };
  description: { ar: string; en: string; fr: string };
  cta: { ar: string; en: string; fr: string };
  tag: { ar: string; en: string; fr: string };
}

const CONTEXTUAL_GOOGLE_ADS: ContextualAdItem[] = [
  {
    id: 'kaheel-encyclopedia',
    advertiser: 'موسوعة الكحيل للإعجاز العلمي',
    displayUrl: 'www.kaheel7.net',
    targetUrl: 'https://kaheel7.net/',
    headline: {
      ar: 'موسوعة الإعجاز العلمي في القرآن والسنة — أبحاث وكتب مجانية',
      en: 'Scientific Miracles in Quran & Sunnah — Free Books & Research',
      fr: 'Miracles Scientifiques du Coran et de la Sunna — Livres Gratuits',
    },
    description: {
      ar: 'تصفح آلاف المقالات العلمية الموثقة حول الفلك والكون والإعجاز العددي والطب النبوي بأكثر من 12 لغة عالمية.',
      en: 'Explore thousands of verified articles on astronomy, the cosmos, numerical symmetry, and Prophetic medicine.',
      fr: 'Explorez des milliers d’articles vérifiés sur l’astronomie, le cosmos et l’harmonie numérique en 12 langues.',
    },
    cta: {
      ar: 'فتح الموقع',
      en: 'Open Site',
      fr: 'Ouvrir le site',
    },
    tag: {
      ar: 'علوم الفلك والقرآن',
      en: 'Astronomy & Quran',
      fr: 'Astronomie & Coran',
    },
  },
  {
    id: 'esa-webb-telescope',
    advertiser: 'ESA / Webb Space Telescope',
    displayUrl: 'esawebb.org',
    targetUrl: 'https://esawebb.org/',
    headline: {
      ar: 'تلسكوب جيمس ويب الفضائي — أحدث صور المجرات السحيقة بدقة 4K',
      en: 'James Webb Space Telescope — Deep Field Galaxies in Full Resolution',
      fr: 'Télescope Spatial James Webb — Galaxies Profondes en Haute Résolution',
    },
    description: {
      ar: 'استكشف الأرشيف الرسمي لوكالة الفضاء الأوروبية وناسا لأعمق صور السدم الكونية وميلاد النجوم الأولى.',
      en: 'Browse the official ESA/NASA archive of deep-space nebulae, exoplanets, and early galaxy formation.',
      fr: 'Parcourez les archives officielles ESA/NASA des nébuleuses profondes et de la naissance des étoiles.',
    },
    cta: {
      ar: 'استكشاف الأرشيف',
      en: 'Explore Archive',
      fr: 'Explorer l’archive',
    },
    tag: {
      ar: 'رصد فضائي مباشر',
      en: 'Space Observation',
      fr: 'Observation Spatiale',
    },
  },
  {
    id: 'stellarium-planetarium',
    advertiser: 'Stellarium Web Planetarium',
    displayUrl: 'stellarium-web.org',
    targetUrl: 'https://stellarium-web.org/',
    headline: {
      ar: 'القبة السماوية التفاعلية — رصد الكواكب والأبراج الفلكية الليلة',
      en: 'Interactive Online Planetarium — Track Planets & Stars Tonight',
      fr: 'Planétarium Interactif en Ligne — Observez les Étoiles ce Soir',
    },
    description: {
      ar: 'خريطة سماء ثلاثية الأبعاد عالية الدقة للتعرف على مواقع الكواكب والنجوم والأقمار الصناعية من موقعك الجغرافي.',
      en: 'Real-time 3D sky map showing constellations, planets, deep-sky objects, and satellites from your location.',
      fr: 'Carte du ciel 3D en temps réel affichant les constellations, planètes et satellites depuis votre position.',
    },
    cta: {
      ar: 'تجربة الرصد',
      en: 'Launch Sky Map',
      fr: 'Lancer la carte',
    },
    tag: {
      ar: 'أدوات الرصد الفلكي',
      en: 'Stargazing Tools',
      fr: 'Outils d’Astronomie',
    },
  },
];

interface GoogleAdUnitProps {
  language: Language;
  format?: 'leaderboard' | 'in-article' | 'multiplex';
  slotKey?: keyof GoogleAdsConfig['slots'];
  onOpenAdsAdmin?: () => void;
}

export const GoogleAdUnit: React.FC<GoogleAdUnitProps> = ({
  language,
  format = 'leaderboard',
  slotKey = 'homeLeaderboard',
  onOpenAdsAdmin,
}) => {
  const [config, setConfig] = useState<GoogleAdsConfig>(() => loadGoogleAdsConfig());
  const [dismissed, setDismissed] = useState(false);
  const [showAdInfo, setShowAdInfo] = useState(false);
  const [adIndex, setAdIndex] = useState(() =>
    slotKey === 'encyclopediaInArticle' ? 1 : slotKey === 'quranCosmosBanner' ? 0 : 0
  );
  const insRef = useRef<HTMLModElement | null>(null);

  useEffect(() => {
    const handleUpdate = () => setConfig(loadGoogleAdsConfig());
    window.addEventListener('google-ads-config-updated', handleUpdate);
    return () => window.removeEventListener('google-ads-config-updated', handleUpdate);
  }, []);

  useEffect(() => {
    if (!config.enabled) return;
    ensureAdSenseScriptLoaded(config.clientId);
    try {
      const w = window as any;
      if (w.adsbygoogle && insRef.current && !insRef.current.getAttribute('data-adsbygoogle-status')) {
        (w.adsbygoogle = w.adsbygoogle || []).push({});
      }
    } catch {
      // AdSense push safely ignored in sandbox preview
    }
  }, [config.enabled, config.clientId, slotKey]);

  if (!config.enabled || dismissed) {
    return null;
  }

  const slotId = config.slots[slotKey] || '1049283741';
  const currentAd = CONTEXTUAL_GOOGLE_ADS[adIndex % CONTEXTUAL_GOOGLE_ADS.length];

  const googleAdsLabel =
    language === 'ar'
      ? 'إعلانات Google'
      : language === 'fr'
      ? 'Annonces Google'
      : 'Google Ads';

  return (
    <div
      data-testid={`google-ad-unit-${slotKey}`}
      className="relative rounded-2xl bg-slate-900/90 border border-slate-800/90 p-4 sm:p-5 shadow-lg overflow-hidden"
    >
      {/* Official Google AdSense <ins> element for live AdSense fill */}
      <ins
        ref={insRef}
        className="adsbygoogle hidden"
        data-ad-client={config.clientId}
        data-ad-slot={slotId}
        data-ad-format={format === 'multiplex' ? 'autorelaxed' : format === 'in-article' ? 'fluid' : 'auto'}
        data-full-width-responsive="true"
      />

      {/* Top Google AdChoices & Disclosure Bar */}
      <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-800/80 text-[11px] text-slate-400">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-200 tracking-tight">{googleAdsLabel}</span>
          <span aria-hidden="true">·</span>
          <span className="font-mono text-[10px] text-slate-400">
            {config.clientId} / {slotId}
          </span>
        </div>

        {/* Google AdChoices Controls */}
        <div className="flex items-center gap-1.5">
          {onOpenAdsAdmin && (
            <button
              type="button"
              onClick={onOpenAdsAdmin}
              title={
                language === 'ar'
                  ? 'إعدادات Google AdSense'
                  : language === 'fr'
                  ? 'Paramètres Google AdSense'
                  : 'Google AdSense Settings'
              }
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-medium transition-colors cursor-pointer"
            >
              <SlidersHorizontal className="w-3 h-3 text-cyan-400" />
              <span>
                {language === 'ar'
                  ? 'إعدادات الإعلانات'
                  : language === 'fr'
                  ? 'Paramètres AdSense'
                  : 'AdSense Setup'}
              </span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setShowAdInfo((prev) => !prev)}
            title="AdChoices"
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800/90 hover:bg-slate-700 text-cyan-300 text-[10px] font-medium transition-colors cursor-pointer"
          >
            <Info className="w-3 h-3" />
            <span>AdChoices</span>
          </button>

          <button
            type="button"
            onClick={() => setDismissed(true)}
            title={
              language === 'ar'
                ? 'إغلاق هذا الإعلان'
                : language === 'fr'
                ? 'Fermer cette annonce'
                : 'Close this ad'
            }
            className="p-1 rounded bg-slate-800/90 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Optional Why This Ad / AdChoices Info Panel */}
      {showAdInfo && (
        <div className="mb-4 p-3 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>
              {language === 'ar'
                ? 'يتم عرض إعلانات Google سياقياً بناءً على محتوى الصفحة العلمي والفلكي (Google AdSense Contextual Targeting).'
                : language === 'fr'
                ? 'Cette annonce est diffusée par Google AdSense en fonction du contenu scientifique et astronomique de la page.'
                : 'This ad is served by Google AdSense based on the page’s scientific and astronomical topic.'}
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setAdIndex((prev) => (prev + 1) % CONTEXTUAL_GOOGLE_ADS.length)}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 text-[11px] font-semibold cursor-pointer"
            >
              {language === 'ar'
                ? 'عرض إعلان آخر'
                : language === 'fr'
                ? 'Autre annonce'
                : 'Try another ad'}
            </button>
            <button
              type="button"
              onClick={() => setShowAdInfo(false)}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] cursor-pointer"
            >
              {language === 'ar' ? 'إغلاق' : language === 'fr' ? 'Fermer' : 'Hide'}
            </button>
          </div>
        </div>
      )}

      {/* FORMAT 1: MULTIPLEX (3-Card Responsive Grid Ad) */}
      {format === 'multiplex' ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {CONTEXTUAL_GOOGLE_ADS.map((item) => (
            <a
              key={item.id}
              href={item.targetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-xl bg-slate-950/90 border border-slate-800 hover:border-cyan-500/40 p-4 flex flex-col justify-between transition-colors"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2 text-[11px] text-slate-400">
                  <span className="font-semibold text-amber-300">
                    {language === 'ar' ? 'إعلان' : language === 'fr' ? 'Sponsorisé' : 'Sponsored'}
                  </span>
                  <span className="font-mono text-cyan-300/90">{item.displayUrl}</span>
                </div>
                <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                  {item.headline[language]}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                  {item.description[language]}
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-900 flex items-center justify-between text-xs font-bold text-cyan-400">
                <span>{item.advertiser}</span>
                <span className="inline-flex items-center gap-1">
                  <span>{item.cta[language]}</span>
                  <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </a>
          ))}
        </div>
      ) : (
        /* FORMAT 2 & 3: LEADERBOARD OR IN-ARTICLE FLUID AD */
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
              <span className="font-bold text-amber-300">
                {language === 'ar' ? 'إعلان مُموَّل' : language === 'fr' ? 'Annonce sponsorisée' : 'Sponsored Ad'}
              </span>
              <span aria-hidden="true">·</span>
              <span className="font-mono text-cyan-300">{currentAd.displayUrl}</span>
              <span aria-hidden="true">·</span>
              <span>{currentAd.tag[language]}</span>
            </div>

            <h4 className="text-base sm:text-lg font-bold text-white leading-snug">
              {currentAd.headline[language]}
            </h4>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {currentAd.description[language]}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
            <a
              href={currentAd.targetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs whitespace-nowrap shrink-0 transition-colors shadow-sm"
            >
              <span>{currentAd.cta[language]}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
