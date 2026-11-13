import React, { useState, useEffect } from 'react';
import {
  Radio,
  RefreshCw,
  ExternalLink,
  Globe2,
  Gauge,
  Navigation,
  Satellite,
  Tv,
  Eye,
  CheckCircle2,
  Video,
  Play,
  Maximize2,
  Sparkles,
  Info,
  Clock,
  Layers,
  Compass
} from 'lucide-react';
import { SpaceMissionFeed, Language } from '../types/cosmic';
import { initialSpaceFeeds } from '../data/cosmicData';

interface LiveSpaceFeedsProps {
  language: Language;
}

interface LiveStreamChannel {
  id: string;
  title: { ar: string; en: string; fr: string };
  agency: 'NASA' | 'ESA' | 'International';
  description: { ar: string; en: string; fr: string };
  embedUrl: string;
  backupEmbedUrl: string;
  officialUrl: string;
  category: 'earth-view' | 'tv-broadcast' | 'mission-control';
  resolution: string;
  badge: { ar: string; en: string; fr: string };
  metrics: {
    label: { ar: string; en: string; fr: string };
    value: string;
  }[];
}

interface DynamicStreamUrls {
  nasaIssEarth?: string;
  nasaTvLive?: string;
  esaWebTv?: string;
  issSen4k?: string;
  nasaJplMars?: string;
}

export const LiveSpaceFeeds: React.FC<LiveSpaceFeedsProps> = ({ language }) => {
  const [feeds, setFeeds] = useState<SpaceMissionFeed[]>(initialSpaceFeeds);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [filterAgency, setFilterAgency] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [dynamicStreams, setDynamicStreams] = useState<DynamicStreamUrls>({});
  const [useBackupFeed, setUseBackupFeed] = useState<boolean>(false);
  const [playerReloadKey, setPlayerReloadKey] = useState<number>(0);

  // Real-time ISS telemetry
  const [issPosition, setIssPosition] = useState<{ latitude: string; longitude: string }>({
    latitude: '24.8124',
    longitude: '46.7219'
  });

  // Active Live Video Stream selection (NASA / ESA)
  const [activeStreamId, setActiveStreamId] = useState<string>('nasa-iss-earth');
  const [isCinemaMode, setIsCinemaMode] = useState<boolean>(false);

  // Curated Official Live Video Streams from NASA and ESA (dynamically refreshed by /api/space-feeds)
  const liveStreams: LiveStreamChannel[] = [
    {
      id: 'nasa-iss-earth',
      title: {
        ar: 'بث الأرض المباشر بدقة HD من محطة الفضاء الدولية (NASA ISS)',
        en: 'NASA ISS Live HD Views of Earth from Orbit',
        fr: 'NASA ISS : Vues en Direct de la Terre en Haute Définition'
      },
      agency: 'NASA',
      description: {
        ar: 'بث حي ومباشر على مدار الساعة لكوكب الأرض من الكاميرات الخارجية لمحطة الفضاء الدولية على ارتفاع 420 كم وبسرعة 27,600 كم/ساعة.',
        en: 'Continuous 24/7 live video stream of Earth from external high-definition cameras on the International Space Station traveling at 27,600 km/h.',
        fr: 'Diffusion continue 24/7 de la Terre depuis les caméras HD de la Station Spatiale Internationale orbitant à 27 600 km/h.'
      },
      embedUrl: dynamicStreams.nasaIssEarth || 'https://www.youtube.com/embed/ROboUHfPUrU?autoplay=0&mute=1&rel=0',
      backupEmbedUrl: 'https://www.youtube.com/embed/videoseries?list=PL2aBZuCeDwlQMf6xMgQAUAY_nbHAgW5jz&rel=0',
      officialUrl: 'https://www.nasa.gov/live/',
      category: 'earth-view',
      resolution: '1080p HD • 60fps',
      badge: { ar: 'بث الأرض المباشر (ISS)', en: 'Live Earth Cam', fr: 'Direct Terre HD' },
      metrics: [
        { label: { ar: 'الارتفاع المداري', en: 'Orbital Altitude', fr: 'Altitude' }, value: '~418 km' },
        { label: { ar: 'السرعة المدارية', en: 'Speed', fr: 'Vitesse' }, value: '27,600 km/h' },
        { label: { ar: 'دورة كاملة حول الأرض', en: 'Orbit Time', fr: 'Période' }, value: '92.68 min' }
      ]
    },
    {
      id: 'nasa-tv-public',
      title: {
        ar: 'قناة NASA الرسمية - البث الفضائي الحي والمؤتمرات',
        en: 'NASA Official Live Broadcast & Mission Stream',
        fr: 'NASA : Diffusion Officielle en Direct'
      },
      agency: 'NASA',
      description: {
        ar: 'القناة الرسمية لوكالة الفضاء الأمريكية لنقل البث الفضائي المباشر، وعمليات إطلاق الصواريخ، والسير في الفضاء، والتغطيات العلمية.',
        en: 'NASA’s official live broadcast stream covering International Space Station operations, rocket launches, spacewalks, and science briefings.',
        fr: 'Le flux officiel en direct de la NASA couvrant l’ISS, les lancements de fusées, les sorties extravéhiculaires et les conférences scientifiques.'
      },
      embedUrl: dynamicStreams.nasaTvLive || 'https://www.youtube.com/embed/M3HKLzjvKPc?autoplay=0&mute=1&rel=0',
      backupEmbedUrl: 'https://www.youtube.com/embed/videoseries?list=UULA_DiR1FfKNvjuUpBHmylQ&rel=0',
      officialUrl: 'https://plus.nasa.gov/',
      category: 'tv-broadcast',
      resolution: '1080p HD • Live',
      badge: { ar: 'قناة ناسا الرسمية', en: 'NASA TV Live', fr: 'NASA TV Direct' },
      metrics: [
        { label: { ar: 'نوع البث', en: 'Broadcast Type', fr: 'Type' }, value: '24/7 Live Stream' },
        { label: { ar: 'التغطية', en: 'Coverage', fr: 'Couverture' }, value: 'Artemis, ISS, JWST' },
        { label: { ar: 'المصدر', en: 'Source', fr: 'Source' }, value: 'NASA / NASA+' }
      ]
    },
    {
      id: 'esa-web-tv',
      title: {
        ar: 'بث وكالة الفضاء الأوروبية المباشر (ESA Web TV)',
        en: 'ESA Web TV - European Space Agency Live Channel',
        fr: 'ESA Web TV : Chaîne en Direct de l’Agence Spatiale Européenne'
      },
      agency: 'ESA',
      description: {
        ar: 'البث الحي الرسمي لقناة ESA Web TV لتغطية عمليات الإطلاق، ومهمات مراقبة الأرض وسنتينل، ومسابر الفضاء البعيد كـ Euclid و Juice.',
        en: 'Official ESA Web TV live channel covering Ariane/Vega launches from Kourou, Earth observation, and deep-space missions such as Euclid & Juice.',
        fr: 'Chaîne officielle en direct ESA Web TV couvrant les lancements Ariane/Vega depuis Kourou, Copernicus et les sondes Juice & Euclid.'
      },
      embedUrl: dynamicStreams.esaWebTv || 'https://player.vimeo.com/video/1244361795?title=0&byline=0&portrait=0&autopause=0&player_id=0&app_id=207236&muted=1',
      backupEmbedUrl: 'https://www.youtube.com/embed/videoseries?list=UUIBaDdAbGlFDeS33shmlD0A&rel=0',
      officialUrl: 'https://watch.esa.int/',
      category: 'mission-control',
      resolution: '1080p HD • ESA Web TV',
      badge: { ar: 'وكالة الفضاء الأوروبية', en: 'ESA Web TV', fr: 'ESA Web TV' },
      metrics: [
        { label: { ar: 'مركز العمليات', en: 'Operations Center', fr: 'Centre' }, value: 'ESOC (Darmstadt)' },
        { label: { ar: 'قاعدة الإطلاق', en: 'Spaceport', fr: 'Base' }, value: 'CSG Kourou, French Guiana' },
        { label: { ar: 'البرامج الحالية', en: 'Active Missions', fr: 'Missions' }, value: 'Copernicus, Juice, Euclid' }
      ]
    },
    {
      id: 'iss-sen-4k',
      title: {
        ar: 'بث الأرض المباشر بدقة 4K من محطة الفضاء الدولية',
        en: 'Live 4K Video of Earth from Space (ISS 4K Cameras)',
        fr: 'Direct Vidéo 4K de la Terre depuis l’Espace (ISS)'
      },
      agency: 'International',
      description: {
        ar: 'بث مباشر متواصل بدقة 4K فائقة الوضوح للأفق الأرضي والغلاف الجوي والسحب والمدن من كاميرات الفضاء على متن المحطة الدولية.',
        en: 'Continuous ultra-high-definition 4K live livestream of Earth’s horizon, weather systems, and auroras from space cameras aboard the ISS.',
        fr: 'Diffusion continue 4K ultra-haute définition de la Terre, des formations nuageuses et de l’horizon spatial depuis la station ISS.'
      },
      embedUrl: dynamicStreams.issSen4k || 'https://www.youtube.com/embed/fO9e9jnhYK8?autoplay=0&mute=1&rel=0',
      backupEmbedUrl: 'https://www.youtube.com/embed/ROboUHfPUrU?autoplay=0&mute=1&rel=0',
      officialUrl: 'https://www.nasa.gov/international-space-station/',
      category: 'earth-view',
      resolution: '4K UHD • Live',
      badge: { ar: 'بث 4K من المدار', en: '4K Space Live', fr: 'Direct 4K Orbite' },
      metrics: [
        { label: { ar: 'الدقة البصرية', en: 'Resolution', fr: 'Résolution' }, value: '4K Ultra HD' },
        { label: { ar: 'المدار', en: 'Orbit', fr: 'Orbite' }, value: 'LEO (~415 km)' },
        { label: { ar: 'البث', en: 'Feed Status', fr: 'Statut' }, value: '24/7 Live Stream' }
      ]
    },
    {
      id: 'nasa-perseverance-mars',
      title: {
        ar: 'تغطية مسبار بيرسيفيرنس ومهمات المريخ (NASA JPL)',
        en: 'Mars Perseverance Rover & JPL Mission Dispatches',
        fr: 'Rover Perseverance sur Mars & Flux NASA JPL'
      },
      agency: 'NASA',
      description: {
        ar: 'تغطية رسمية متواصلة من مختبر الدفع النفاث (NASA JPL) لمشاهد هبوط ومهام مسبار بيرسيفيرنس ومروحية إنجينويتي في فوهة جيزيرو على المريخ.',
        en: 'Official NASA JPL multi-angle telemetry and mission broadcasts from Perseverance Rover in Jezero Crater on Mars.',
        fr: 'Diffusions officielles NASA JPL et séquences de mission du rover Perseverance dans le cratère Jezero sur Mars.'
      },
      embedUrl: dynamicStreams.nasaJplMars || 'https://www.youtube.com/embed/videoseries?list=PLTiv_XWHnOZqut4YY0yVlPIRLeoqub_EJ&rel=0',
      backupEmbedUrl: 'https://www.youtube.com/embed/videoseries?list=UUryGec9PdUCLjpJW2mgCuLw&rel=0',
      officialUrl: 'https://mars.nasa.gov/mars2020/',
      category: 'mission-control',
      resolution: '1080p Official JPL',
      badge: { ar: 'مهمة المريخ JPL', en: 'Mars JPL Feed', fr: 'Mission Mars JPL' },
      metrics: [
        { label: { ar: 'الموقع', en: 'Location', fr: 'Lieu' }, value: 'Jezero Crater, Mars' },
        { label: { ar: 'تأخير الإشارة الضوئية', en: 'Signal Delay', fr: 'Délai Radio' }, value: '~12.5 minutes' },
        { label: { ar: 'الجهة المشغلة', en: 'Operator', fr: 'Opérateur' }, value: 'NASA JPL' }
      ]
    }
  ];

  const currentStream = liveStreams.find((s) => s.id === activeStreamId) || liveStreams[0];
  const activeEmbedUrl = useBackupFeed ? currentStream.backupEmbedUrl : currentStream.embedUrl;

  const fetchLiveFeeds = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/space-feeds', {
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        const rawText = await res.text();
        const trimmed = rawText.trim();
        if (trimmed.startsWith('{')) {
          const data = JSON.parse(trimmed);
          if (data.liveIss) {
            setIssPosition(data.liveIss);
          }
          if (data.streams && typeof data.streams === 'object') {
            setDynamicStreams(data.streams);
          }
          if (data.feeds && Array.isArray(data.feeds)) {
            setFeeds(data.feeds);
          }
          setLastUpdated(new Date());
        }
      }
    } catch {
      // Fallback stays on verified default streams & initialSpaceFeeds
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveFeeds();
    const interval = setInterval(fetchLiveFeeds, 45000); // 45 seconds auto-refresh
    return () => clearInterval(interval);
  }, []);

  const filteredFeeds = feeds.filter((feed) => {
    if (filterAgency !== 'all' && feed.agency !== filterAgency) return false;
    if (filterType !== 'all' && feed.type !== filterType) return false;
    return true;
  });

  const texts = {
    ar: {
      title: 'بث المهمات الفضائية المباشرة (NASA & ESA)',
      subtitle: 'بث حي ومباشر بالصوت والصورة عالي الدقة من وكالتي NASA و ESA، وتتبع لحظي لمركبات الفضاء ومحطة الفضاء الدولية ومسابر الفضاء السحيق.',
      liveStreamsHeader: 'شاشات البث المباشر (NASA TV & ESA Live Web TV)',
      refreshBtn: 'تحديث البيانات الحية',
      liveBadge: 'مباشر الآن',
      statusOperational: 'تعمل بكفاءة كاملة',
      statusActive: 'في الخدمة المدارية',
      speed: 'السرعة المدارية:',
      distanceFromEarth: 'المسافة من الأرض:',
      instruments: 'الأجهزة العاملة:',
      crew: 'طاقم رواد الفضاء:',
      currentPosition: 'الموقع الحالي:',
      lastUpdateHeader: 'آخر إشارة وبرقية علمية:',
      launchDate: 'تاريخ الإطلاق:',
      allAgencies: 'كافة الوكالات',
      allTypes: 'كافة الفئات',
      officialSite: 'البوابة الرسمية للمهمة',
      openOfficialStream: 'فتح البث في الموقع الرسمي',
      issLiveTracker: 'تتبع مدار محطة الفضاء الدولية (ISS Tracker)',
      latitude: 'خط العرض:',
      longitude: 'خط الطول:',
      cinemaMode: 'وضع الشاشة السينمائي',
      cinemaModeExit: 'العودة للوضع العادي',
      reloadPlayer: 'إعادة تحميل البث',
      backupSource: 'مصدر بديل',
      primarySource: 'البث الأساسي',
      officialFeedLabel: 'بث رسمي معتمد',
      operationalLabel: 'متصل ويعمل بكفاءة'
    },
    en: {
      title: 'NASA & ESA Live Space Streams & Telemetry',
      subtitle: 'Live HD video broadcasts directly from NASA and ESA, paired with real-time telemetry from active spacecraft, the ISS, and deep-space explorers.',
      liveStreamsHeader: 'Live Video Broadcast Theater (NASA TV & ESA Web TV)',
      refreshBtn: 'Refresh Live Feeds',
      liveBadge: 'LIVE NOW',
      statusOperational: 'Operational',
      statusActive: 'Active Orbit',
      speed: 'Orbital Speed:',
      distanceFromEarth: 'Distance from Earth:',
      instruments: 'Active Instruments:',
      crew: 'Astronaut Crew:',
      currentPosition: 'Current Position:',
      lastUpdateHeader: 'Latest Scientific Dispatch:',
      launchDate: 'Launch Date:',
      allAgencies: 'All Agencies',
      allTypes: 'All Types',
      officialSite: 'Official Mission Portal',
      openOfficialStream: 'Open on Official Agency Stream',
      issLiveTracker: 'ISS Real-Time Orbit Coordinates',
      latitude: 'Latitude:',
      longitude: 'Longitude:',
      cinemaMode: 'Cinema Theater Mode',
      cinemaModeExit: 'Exit Theater Mode',
      reloadPlayer: 'Reload Stream',
      backupSource: 'Backup Feed',
      primarySource: 'Primary Live',
      officialFeedLabel: 'Official Feed',
      operationalLabel: '100% Operational'
    },
    fr: {
      title: 'Diffusions en Direct NASA & ESA et Télémétrie',
      subtitle: 'Flux vidéo haute définition en direct de la NASA et de l’ESA, accompagnés du suivi télémétrique en temps réel de l’ISS et des missions spatiales.',
      liveStreamsHeader: 'Théâtre des Diffusions en Direct (NASA TV & ESA Web TV)',
      refreshBtn: 'Actualiser le Direct',
      liveBadge: 'EN DIRECT',
      statusOperational: 'Opérationnel',
      statusActive: 'En Orbite Active',
      speed: 'Vitesse Orbitale :',
      distanceFromEarth: 'Distance de la Terre :',
      instruments: 'Instruments Actifs :',
      crew: 'Équipage à Bord :',
      currentPosition: 'Position Actuelle :',
      lastUpdateHeader: 'Dernière Dépêche Scientifique :',
      launchDate: 'Date de Lancement :',
      allAgencies: 'Toutes Agences',
      allTypes: 'Toutes Catégories',
      officialSite: 'Portail Officiel de Mission',
      openOfficialStream: 'Ouvrir sur le flux officiel',
      issLiveTracker: 'Coordonnées Orbitales en Direct (ISS)',
      latitude: 'Latitude :',
      longitude: 'Longitude :',
      cinemaMode: 'Mode Cinéma Plein Écran',
      cinemaModeExit: 'Quitter le Mode Cinéma',
      reloadPlayer: 'Recharger le lecteur',
      backupSource: 'Flux de secours',
      primarySource: 'Flux principal',
      officialFeedLabel: 'Flux Officiel',
      operationalLabel: '100% Opérationnel'
    }
  };

  const t = texts[language] || texts.en;

  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      
      {/* Top Banner Header */}
      <div className="relative rounded-3xl overflow-hidden border border-cyan-500/30 bg-gradient-to-br from-[#060a1b] via-[#091533] to-[#040816] p-6 sm:p-8 shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-xs font-bold text-cyan-300">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping inline-block" />
              <span>{t.liveBadge}</span>
              <span className="text-slate-400">•</span>
              <span>NASA & ESA Live Webcast</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-amber-200">
              {t.title}
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              {t.subtitle}
            </p>
          </div>

          {/* Refresh Action & Last Ping */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <button
              onClick={fetchLiveFeeds}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/25 transition-all disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              <span>{t.refreshBtn}</span>
            </button>
            <div className="text-[11px] text-slate-400">
              {language === 'ar' ? 'آخر مزامنة:' : language === 'fr' ? 'Dernière synchro :' : 'Last Synced:'}{' '}
              <span className="text-cyan-300 font-medium">
                {lastUpdated.toLocaleTimeString(language === 'ar' ? 'ar-EG' : language === 'fr' ? 'fr-FR' : 'en-US')}
              </span>
            </div>
          </div>
        </div>

        {/* Real-time ISS Coordinates Banner */}
        <div className="mt-6 pt-5 border-t border-cyan-900/40 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 text-cyan-300 font-bold">
            <Satellite className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>{t.issLiveTracker}:</span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-950/80 border border-slate-800 text-amber-300 font-mono">
              {t.latitude} {issPosition.latitude}° | {t.longitude} {issPosition.longitude}°
            </span>
          </div>
          <div className="flex items-center gap-4 text-slate-400 text-[11px]">
            <span>🚀 27,600 km/h</span>
            <span>🛰️ ~418 km {language === 'ar' ? 'الارتفاع' : language === 'fr' ? 'Altitude' : 'Altitude'}</span>
            <span>⏱️ 92.68 min {language === 'ar' ? 'الدورة المدارية' : language === 'fr' ? 'Orbite' : 'Orbit'}</span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. NASA & ESA LIVE VIDEO STREAM THEATER */}
      {/* ========================================================================= */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-red-950/80 border border-red-500/40 flex items-center justify-center text-red-400 shadow-lg">
              <Tv className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                {t.liveStreamsHeader}
              </h2>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setPlayerReloadKey((k) => k + 1)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 hover:bg-slate-800 text-xs font-semibold text-slate-300 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t.reloadPlayer}</span>
            </button>
            <button
              onClick={() => setUseBackupFeed((v) => !v)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-colors ${
                useBackupFeed
                  ? 'bg-amber-950/70 border-amber-500/50 text-amber-300'
                  : 'bg-slate-900 border-slate-700 hover:bg-slate-800 text-slate-300'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              <span>{useBackupFeed ? t.primarySource : t.backupSource}</span>
            </button>
            <button
              onClick={() => setIsCinemaMode(!isCinemaMode)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 hover:bg-slate-800 text-xs font-semibold text-slate-300 transition-colors"
            >
              <Maximize2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>{isCinemaMode ? t.cinemaModeExit : t.cinemaMode}</span>
            </button>
            <a
              href={currentStream.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-950/60 border border-cyan-700/50 hover:bg-cyan-900/60 text-xs font-bold text-cyan-300 transition-colors"
            >
              <span>{t.openOfficialStream}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Live Channel Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
          {liveStreams.map((stream) => {
            const isSelected = activeStreamId === stream.id;
            return (
              <button
                key={stream.id}
                onClick={() => {
                  setActiveStreamId(stream.id);
                  setUseBackupFeed(false);
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all border shrink-0 ${
                  isSelected
                    ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white border-red-400 shadow-lg shadow-red-500/25 scale-[1.02]'
                    : 'bg-slate-900/90 text-slate-300 border-slate-800 hover:bg-slate-800/90 hover:border-slate-700'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-white animate-pulse' : 'bg-red-500'}`} />
                <span className="px-1.5 py-0.5 rounded-md text-[10px] font-black bg-black/40 text-amber-300">
                  {stream.agency}
                </span>
                <span>{stream.badge[language] || stream.badge.en}</span>
              </button>
            );
          })}
        </div>

        {/* Live Stream Main Theater Stage */}
        <div className="rounded-3xl overflow-hidden border border-cyan-800/40 bg-gradient-to-b from-slate-950 to-[#040817] shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Video Player Column */}
            <div className={`${isCinemaMode ? 'lg:col-span-12' : 'lg:col-span-8'} bg-black relative`}>
              <div className="relative aspect-video w-full bg-slate-950 overflow-hidden">
                <iframe
                  key={`${currentStream.id}-${useBackupFeed ? 'backup' : 'primary'}-${playerReloadKey}`}
                  src={activeEmbedUrl}
                  title={currentStream.title[language] || currentStream.title.en}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="w-full h-full border-0 absolute inset-0"
                />

                {/* Overlaid Live Tag */}
                <div className="absolute top-4 start-4 flex items-center gap-2 pointer-events-none z-10">
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600/90 text-white font-bold text-xs backdrop-blur-md shadow-lg shadow-red-600/30">
                    <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                    <span>LIVE</span>
                  </div>
                  <div className="px-2.5 py-1 rounded-full bg-black/75 text-cyan-300 font-mono text-[11px] backdrop-blur-md border border-cyan-500/30">
                    {currentStream.resolution}
                  </div>
                </div>
              </div>
            </div>

            {/* Stream Telemetry & Meta Sidebar */}
            {!isCinemaMode && (
              <div className="lg:col-span-4 p-5 sm:p-6 flex flex-col justify-between space-y-5 border-t lg:border-t-0 lg:border-s border-cyan-950/80 bg-slate-950/70">
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-1 rounded-lg text-xs font-black bg-indigo-950 border border-indigo-500/40 text-indigo-300">
                      {currentStream.agency} • {t.officialFeedLabel}
                    </span>
                    <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      {t.operationalLabel}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                      {currentStream.title[language] || currentStream.title.en}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed mt-2">
                      {currentStream.description[language] || currentStream.description.en}
                    </p>
                  </div>

                  {/* Telemetry Metrics for Active Stream */}
                  <div className="space-y-2 pt-2">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Gauge className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{language === 'ar' ? 'بيانات البث الميدانية:' : language === 'fr' ? 'Télémétrie du flux :' : 'Live Stream Telemetry:'}</span>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      {currentStream.metrics.map((m, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs"
                        >
                          <span className="text-slate-400">{m.label[language] || m.label.en}</span>
                          <span className="font-bold text-cyan-300 font-mono">{m.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Direct Link Action */}
                <div className="pt-4 border-t border-slate-800">
                  <a
                    href={currentStream.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs transition-all shadow-md"
                  >
                    <span>{t.officialSite} ({currentStream.agency})</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. ACTIVE SPACE MISSION TELEMETRY FEEDS */}
      {/* ========================================================================= */}
      <div className="space-y-6 pt-4">
        {/* Filter Controls Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              {language === 'ar' ? 'تتبع مركبات ومهمات الفضاء النشطة' : 'Active Spacecraft Telemetry Dispatches'}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              {language === 'ar' ? 'متابعة حية لتلسكوب جيمس ويب، محطة الفضاء، مسبار بيرسيفيرنس، وسفن الفضاء السحيق' : 'Live status monitoring for JWST, ISS, Perseverance, and deep-space explorers'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Agency Filters */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-900/90 border border-slate-800">
              {['all', 'NASA', 'ESA', 'International'].map((agency) => (
                <button
                  key={agency}
                  onClick={() => setFilterAgency(agency)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    filterAgency === agency
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                      : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  {agency === 'all' ? t.allAgencies : agency}
                </button>
              ))}
            </div>

            {/* Type Filters */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-900/90 border border-slate-800">
              {[
                { id: 'all', label: t.allTypes },
                { id: 'telescope', label: language === 'ar' ? 'تلسكوبات' : 'Telescopes' },
                { id: 'station', label: language === 'ar' ? 'محطات' : 'Stations' },
                { id: 'rover', label: language === 'ar' ? 'مسابر' : 'Rovers' }
              ].map((type) => (
                <button
                  key={type.id}
                  onClick={() => setFilterType(type.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    filterType === type.id
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                      : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid of Active Space Mission Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFeeds.map((feed) => (
            <div
              key={feed.id}
              className="group bg-[#080d1e] rounded-3xl border border-cyan-900/30 hover:border-cyan-500/50 transition-all duration-300 overflow-hidden shadow-xl flex flex-col justify-between"
            >
              {/* Mission Image Header */}
              <div className="relative aspect-[16/9] overflow-hidden bg-slate-950">
                <img
                  src={feed.image}
                  alt={feed.name[language] || feed.name.en}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080d1e] via-transparent to-black/40" />

                {/* Status Badge */}
                <div className="absolute top-3 start-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-cyan-500/40 text-[11px] font-bold text-cyan-300">
                  <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                  <span>
                    {feed.status === 'operational'
                      ? t.statusOperational
                      : t.statusActive}
                  </span>
                </div>

                {/* Agency Tag */}
                <div className="absolute top-3 end-3 px-2.5 py-1 rounded-lg bg-indigo-950/90 border border-indigo-500/40 text-[11px] font-bold text-indigo-200">
                  {feed.agency}
                </div>

                {/* Current Location Badge */}
                <div className="absolute bottom-3 start-3 end-3 flex items-center gap-1.5 text-xs text-white bg-slate-950/70 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800/80">
                  <Navigation className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                  <span className="truncate">{feed.currentLocation[language] || feed.currentLocation.en}</span>
                </div>
              </div>

              {/* Mission Details Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {feed.name[language] || feed.name.en}
                  </h3>
                  <div className="text-xs text-slate-400 mt-0.5">
                    {t.launchDate} <span className="text-slate-300 font-medium">{feed.launchDate}</span>
                  </div>

                  {/* Telemetry Dashboard Metrics */}
                  <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                    {feed.telemetry.speed && (
                      <div className="bg-slate-900/90 p-2.5 rounded-xl border border-slate-800">
                        <div className="text-slate-400 text-[11px] flex items-center gap-1">
                          <Gauge className="w-3 h-3 text-cyan-400" />
                          {t.speed}
                        </div>
                        <div className="font-bold text-white mt-0.5 truncate">
                          {feed.telemetry.speed}
                        </div>
                      </div>
                    )}

                    {feed.telemetry.distanceFromEarth && (
                      <div className="bg-slate-900/90 p-2.5 rounded-xl border border-slate-800">
                        <div className="text-slate-400 text-[11px] flex items-center gap-1">
                          <Globe2 className="w-3 h-3 text-cyan-400" />
                          {t.distanceFromEarth}
                        </div>
                        <div className="font-bold text-cyan-300 mt-0.5 truncate">
                          {feed.telemetry.distanceFromEarth}
                        </div>
                      </div>
                    )}

                    {feed.telemetry.instrumentsActive && (
                      <div className="bg-slate-900/90 p-2.5 rounded-xl border border-slate-800 col-span-2">
                        <div className="text-slate-400 text-[11px] flex items-center gap-1">
                          <Satellite className="w-3 h-3 text-cyan-400" />
                          {t.instruments}
                        </div>
                        <div className="font-bold text-white mt-0.5 truncate">
                          {feed.telemetry.instrumentsActive}
                        </div>
                      </div>
                    )}

                    {feed.telemetry.crewCount !== undefined && (
                      <div className="bg-slate-900/90 p-2.5 rounded-xl border border-slate-800 col-span-2">
                        <div className="text-slate-400 text-[11px] flex items-center gap-1">
                          <Compass className="w-3 h-3 text-amber-400" />
                          {t.crew}
                        </div>
                        <div className="font-bold text-amber-300 mt-0.5 truncate">
                          {feed.telemetry.crewCount} {language === 'ar' ? 'رواد فضاء على متنها' : 'Astronauts on board'}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Latest Scientific Dispatch */}
                  <div className="mt-4 p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80">
                    <div className="text-[11px] font-bold text-amber-400/90 mb-1">
                      {t.lastUpdateHeader}
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                      {feed.recentUpdate[language] || feed.recentUpdate.en}
                    </p>
                  </div>
                </div>

                {/* External Official Link */}
                {feed.officialLink && (
                  <div className="pt-4 border-t border-slate-800/80 mt-4">
                    <a
                      href={feed.officialLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      <span>{t.officialSite}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
