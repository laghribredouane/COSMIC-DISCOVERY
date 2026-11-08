export type Language = 'ar' | 'en' | 'fr';

export type CosmicCategory =
  | 'galaxies'
  | 'stars'
  | 'solar-system'
  | 'black-holes'
  | 'nebulae'
  | 'cosmic-distances'
  | 'cosmology-origin'
  | 'virtual-journeys'
  | 'discoveries'
  | 'quran-cosmos'
  | 'reflections'
  | 'quiz';

export interface LocalizedString {
  ar: string;
  en: string;
  fr: string;
}

export interface LocalizedArray {
  ar: string[];
  en: string[];
  fr: string[];
}

export interface CelestialSpecs {
  diameter?: string;
  mass?: string;
  temperature?: string;
  distance?: string;
  age?: string;
  composition?: string;
  orbitalPeriod?: string;
  speed?: string;
  discoveryYear?: string;
}

export interface ScientificArticle {
  id: string;
  title: LocalizedString;
  category: CosmicCategory;
  summary: LocalizedString;
  introduction: LocalizedString;
  contentSimple: LocalizedString;
  contentAdvanced: LocalizedString;
  keyFacts: LocalizedArray;
  specs: CelestialSpecs;
  image: string;
  imageCaption: LocalizedString;
  imageCredit: string;
  sources: Array<{ title: string; url?: string; organization?: string }>;
  relatedQuranVerseId?: string;
  lastUpdated: string;
  isApproved: boolean;
  isGeminiGenerated?: boolean;
  readingTimeMin: number;
  views: number;
  likes: number;
}

export interface QuranVerseStudy {
  id: string;
  surah: LocalizedString;
  surahNumber: number;
  ayahNumber: number;
  arabicText: string;
  translation: {
    en: string;
    fr: string;
  };
  classicalTafsir: {
    source: string; // e.g. ابن كثير / السعدي / الطبري
    text: string;
  };
  modernScientificContext: LocalizedString;
  contemplationNote: LocalizedString;
  methodologicalGuideline: LocalizedString; // Distinct guidance against forced science interpolation
  sources: string[];
}

export interface CelestialBody {
  id: string;
  name: LocalizedString;
  type: 'star' | 'planet' | 'black-hole' | 'galaxy' | 'moon' | 'nebula';
  diameterKm: number;
  massKg?: string;
  distanceFromSunKm?: number;
  distanceLightYears?: number;
  surfaceTempCelsius?: number;
  rotationPeriodHours?: number;
  orbitalPeriodDays?: number;
  moonsCount?: number;
  color: string;
  texturePattern?: string;
  description: LocalizedString;
  image: string;
  quranicReflection?: {
    verseText: string;
    surah: LocalizedString;
    surahNumber?: number;
    ayahNumber: number;
    tafsirSummary: LocalizedString;
    reflection: LocalizedString;
  };
}

export interface SpaceGalleryItem {
  id: string;
  title: LocalizedString;
  category: 'galaxy' | 'nebula' | 'star-cluster' | 'planet' | 'black-hole' | 'telescope';
  imageUrl: string;
  telescope: 'JWST' | 'Hubble' | 'Chandra' | 'ESO / VLT' | 'Event Horizon Telescope';
  credit: string;
  description: LocalizedString;
  releaseDate: string;
  specs?: {
    instrument?: string;
    distance?: string;
    constellation?: string;
  };
}

export interface QuizQuestion {
  id: string;
  category: CosmicCategory | 'general';
  difficulty: 'easy' | 'medium' | 'hard';
  question: LocalizedString;
  options: LocalizedArray;
  correctIndex: number;
  explanation: LocalizedString;
  scientificReference: string;
}

export interface ConstellationStar {
  id: string;
  name: LocalizedString;
  x: number; // 0 to 100 percentage in map
  y: number; // 0 to 100 percentage in map
  mag: number; // apparent magnitude
  spectralType?: string;
}

export interface Constellation {
  id: string;
  name: LocalizedString;
  arabicClassicalName: string; // e.g. "صورة الجبار" / "صورة الكلب الأكبر"
  abbreviation: string;
  hemisphere: 'north' | 'south' | 'zodiac';
  season: 'winter' | 'spring' | 'summer' | 'autumn';
  brightestStar: {
    name: LocalizedString;
    arabicName: string;
    magnitude: number;
    distanceLy: number;
    spectralType: string;
  };
  starsCount: number;
  stars: ConstellationStar[];
  lines: Array<[number, number]>; // pairs of indices into stars
  history: LocalizedString;
  alSufiNote: LocalizedString; // Reference to Abd al-Rahman al-Sufi (كتاب صور الكواكب الثابتة)
  astronomicalData: {
    areaSqDeg: number;
    bestMonth: LocalizedString;
    deepSkyObjects: string[];
  };
  quranicReflection?: {
    verseText: string;
    surah: LocalizedString;
    surahNumber: number;
    ayahNumber: number;
    tafsirSummary: LocalizedString;
    reflection: LocalizedString;
  };
}

export interface SpaceMissionFeed {
  id: string;
  name: LocalizedString;
  agency: 'NASA' | 'ESA' | 'International' | 'JAXA';
  type: 'telescope' | 'rover' | 'station' | 'interstellar' | 'lunar' | 'deep-space';
  status: 'active' | 'operational' | 'nominal';
  launchDate: string;
  currentLocation: LocalizedString;
  telemetry: {
    speed?: string;
    distanceFromEarth?: string;
    target?: string;
    coordinates?: string;
    instrumentsActive?: string;
    crewCount?: number;
    sol?: number;
  };
  recentUpdate: LocalizedString;
  image: string;
  officialLink?: string;
}

export interface CelestialEvent {
  id: string;
  title: LocalizedString;
  type: 'meteor-shower' | 'eclipse' | 'planetary-alignment' | 'moon-phase' | 'solstice';
  date: string;
  timeUtc?: string;
  visibilityRegion: LocalizedString;
  description: LocalizedString;
  observationGuide: LocalizedString;
  specs: {
    ratePerHour?: number;
    constellation?: string;
    opticalAidRequired: LocalizedString;
    illumination?: string;
  };
  quranicReflection?: {
    verseText: string;
    surah: LocalizedString;
    ayahNumber: number;
    reflection: LocalizedString;
  };
}

export interface MoonPhaseInfo {
  phaseName: LocalizedString;
  phaseCode: 'new' | 'waxing-crescent' | 'first-quarter' | 'waxing-gibbous' | 'full' | 'waning-gibbous' | 'last-quarter' | 'waning-crescent';
  illuminationFraction: number; // 0 to 1
  moonAgeDays: number; // 0 to 29.53
  icon: string;
}

export interface SiteStatistics {
  articlesCount: number;
  totalViews: number;
  quizzesTaken: number;
  geminiGenerationsCount: number;
  activeLearners: number;
}

