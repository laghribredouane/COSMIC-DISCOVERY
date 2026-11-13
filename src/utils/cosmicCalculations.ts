import { Language, ScientificArticle, QuranVerseStudy, CosmicCategory } from '../types/cosmic';

export const SPEED_OF_LIGHT_KMS = 299792.458; // km per second
export const ONE_AU_KM = 149597870.7; // Astronomical Unit in km
export const ONE_LIGHT_YEAR_KM = 9460730472580.8; // Light Year in km
export const ONE_PARSEC_KM = 30856775814913.67; // Parsec in km

export interface LightTravelResult {
  seconds: number;
  formatted: {
    ar: string;
    en: string;
    fr: string;
  };
  humanReadableScale: string;
}

/**
 * Calculates the time it takes for light to travel a given distance in kilometers.
 */
export function calculateLightTravelTime(distanceKm: number): LightTravelResult {
  if (distanceKm <= 0) {
    return {
      seconds: 0,
      formatted: {
        ar: 'فوري (0 ثانية)',
        en: 'Instant (0 seconds)',
        fr: 'Instantané (0 seconde)'
      },
      humanReadableScale: '0s'
    };
  }

  const seconds = distanceKm / SPEED_OF_LIGHT_KMS;

  if (seconds < 60) {
    const s = Math.round(seconds * 10) / 10;
    return {
      seconds,
      formatted: {
        ar: `${s} ثانية`,
        en: `${s} seconds`,
        fr: `${s} secondes`
      },
      humanReadableScale: `${s}s`
    };
  }

  const minutes = seconds / 60;
  if (minutes < 60) {
    const m = Math.floor(minutes);
    const remS = Math.round(seconds % 60);
    return {
      seconds,
      formatted: {
        ar: `${m} دقيقة و ${remS} ثانية`,
        en: `${m} min ${remS} sec`,
        fr: `${m} min ${remS} sec`
      },
      humanReadableScale: `${m}m ${remS}s`
    };
  }

  const hours = minutes / 60;
  if (hours < 24) {
    const h = Math.floor(hours);
    const remM = Math.round(minutes % 60);
    return {
      seconds,
      formatted: {
        ar: `${h} ساعة و ${remM} دقيقة`,
        en: `${h} hours ${remM} min`,
        fr: `${h} heures ${remM} min`
      },
      humanReadableScale: `${h}h ${remM}m`
    };
  }

  const days = hours / 24;
  if (days < 365) {
    const d = Math.floor(days);
    const remH = Math.round(hours % 24);
    return {
      seconds,
      formatted: {
        ar: `${d} يوم و ${remH} ساعة`,
        en: `${d} days ${remH} hours`,
        fr: `${d} jours ${remH} heures`
      },
      humanReadableScale: `${d}d`
    };
  }

  const years = (days / 365.25);
  const formattedYears = years > 1000000 
    ? (years / 1000000).toFixed(2) + ' M' 
    : years > 1000 
    ? (years / 1000).toFixed(1) + ' k' 
    : years.toFixed(2);

  return {
    seconds,
    formatted: {
      ar: `${formattedYears} سنة ضوئية`,
      en: `${formattedYears} light-years`,
      fr: `${formattedYears} années-lumière`
    },
    humanReadableScale: `${formattedYears} ly`
  };
}

/**
 * Calculates comparative diameter and volume ratios between two celestial bodies.
 */
export function calculateCelestialRatio(diameter1Km: number, diameter2Km: number) {
  if (diameter2Km <= 0 || diameter1Km <= 0) {
    return { diameterRatio: 1, volumeRatio: 1, ratioString: '1:1' };
  }
  const diameterRatio = diameter1Km / diameter2Km;
  const volumeRatio = Math.pow(diameterRatio, 3);

  return {
    diameterRatio: Math.round(diameterRatio * 100) / 100,
    volumeRatio,
    ratioString: diameterRatio >= 1 ? `${(diameterRatio).toFixed(1)}x` : `1/${(1 / diameterRatio).toFixed(1)}x`
  };
}

/**
 * Evaluates quiz results and generates grade breakdown.
 */
export function evaluateQuizPerformance(total: number, correct: number, lang: Language = 'ar') {
  if (total <= 0) return { percentage: 0, rankKey: 'novice', feedback: '' };

  const percentage = Math.round((correct / total) * 100);
  let rankKey: 'astronomer' | 'cosmologist' | 'explorer' | 'novice';

  if (percentage >= 90) {
    rankKey = 'cosmologist';
  } else if (percentage >= 70) {
    rankKey = 'astronomer';
  } else if (percentage >= 50) {
    rankKey = 'explorer';
  } else {
    rankKey = 'novice';
  }

  const feedbackMessages = {
    cosmologist: {
      ar: 'أداء فلكي استثنائي! تمتلك معرفة كونية عميقة وشاملة.',
      en: 'Exceptional astronomical performance! You possess profound cosmic mastery.',
      fr: 'Performance astronomique exceptionnelle ! Vous possédez une maîtrise cosmique profonde.'
    },
    astronomer: {
      ar: 'مستوى فلكي متميز! لديك استيعاب علمي رائع لمعالم الكون.',
      en: 'Distinguished astronomer level! You have a great scientific grasp of cosmic realms.',
      fr: 'Niveau astronome remarquable ! Excellente compréhension scientifique de l’univers.'
    },
    explorer: {
      ar: 'مستكشف كوني واعد! واصل القراءة والاطلاع لتعميق فهمك للأجرام والظواهر.',
      en: 'Promising cosmic explorer! Keep exploring to deepen your grasp of celestial phenomena.',
      fr: 'Explorateur cosmique prometteur ! Continuez à explorer pour approfondir vos connaissances.'
    },
    novice: {
      ar: 'بداية الرحلة في آفاق السماء! تصفح موسوعتنا العلمية واكتشف عجائب الكون.',
      en: 'The beginning of your cosmic odyssey! Browse our encyclopedia to unveil wonders.',
      fr: 'Le début de votre odyssée céleste ! Parcourez notre encyclopédie pour découvrir les merveilles.'
    }
  };

  return {
    percentage,
    rankKey,
    feedback: feedbackMessages[rankKey][lang]
  };
}

/**
 * Filter scientific articles by search text and category.
 */
export function filterArticlesList(
  articles: ScientificArticle[],
  query: string,
  category: CosmicCategory | 'all',
  lang: Language = 'ar'
): ScientificArticle[] {
  const cleanQuery = query.trim().toLowerCase();
  const normalizedQuery = normalizeArabic(cleanQuery);

  return articles.filter(article => {
    // Category match
    if (category !== 'all' && article.category !== category) {
      return false;
    }

    if (!cleanQuery) return true;

    const title = (article.title[lang] || article.title.ar).toLowerCase();
    const summary = (article.summary[lang] || article.summary.ar).toLowerCase();
    const intro = (article.introduction[lang] || article.introduction.ar).toLowerCase();
    const keyFacts = (article.keyFacts[lang] || article.keyFacts.ar).join(' ').toLowerCase();

    return (
      title.includes(cleanQuery) ||
      summary.includes(cleanQuery) ||
      intro.includes(cleanQuery) ||
      keyFacts.includes(cleanQuery) ||
      (normalizedQuery.length > 0 &&
        (normalizeArabic(title).includes(normalizedQuery) ||
          normalizeArabic(summary).includes(normalizedQuery) ||
          normalizeArabic(intro).includes(normalizedQuery) ||
          normalizeArabic(keyFacts).includes(normalizedQuery)))
    );
  });
}

/**
 * Normalizes Arabic text by removing Tashkeel (diacritics) and normalizing variants of Alef, Ta Marbuta, etc.
 */
export function normalizeArabic(text: string): string {
  if (!text) return '';
  return text
    // Remove Tashkeel (Fatha, Damma, Kasra, Sukun, Shaddah, Tanwin, etc.)
    .replace(/[\u064B-\u0652\u0670\u0640]/g, '')
    // Normalize Alefs
    .replace(/[إأآٱ]/g, 'ا')
    // Normalize Ta Marbuta
    .replace(/ة/g, 'ه')
    // Normalize Ya / Alef Maqsura
    .replace(/ى/g, 'ي')
    .toLowerCase();
}

/**
 * Search Quran and cosmos studies by keyword or Surah.
 */
export function searchQuranStudiesList(
  studies: QuranVerseStudy[],
  query: string,
  lang: Language = 'ar'
): QuranVerseStudy[] {
  const cleanQuery = query.trim().toLowerCase();
  if (!cleanQuery) return studies;

  const normalizedQuery = normalizeArabic(cleanQuery);

  return studies.filter(item => {
    const surahName = (item.surah[lang] || item.surah.ar).toLowerCase();
    const normalizedSurah = normalizeArabic(surahName);

    const arabicText = item.arabicText.toLowerCase();
    const normalizedArabic = normalizeArabic(arabicText);

    const tafsirText = item.classicalTafsir.text.toLowerCase();
    const normalizedTafsir = normalizeArabic(tafsirText);

    const context = (item.modernScientificContext[lang] || item.modernScientificContext.ar).toLowerCase();
    const normalizedContext = normalizeArabic(context);

    const contemplation = (item.contemplationNote[lang] || item.contemplationNote.ar).toLowerCase();
    const normalizedContemplation = normalizeArabic(contemplation);

    return (
      surahName.includes(cleanQuery) ||
      normalizedSurah.includes(normalizedQuery) ||
      arabicText.includes(cleanQuery) ||
      normalizedArabic.includes(normalizedQuery) ||
      tafsirText.includes(cleanQuery) ||
      normalizedTafsir.includes(normalizedQuery) ||
      context.includes(cleanQuery) ||
      normalizedContext.includes(normalizedQuery) ||
      contemplation.includes(cleanQuery) ||
      normalizedContemplation.includes(normalizedQuery) ||
      String(item.surahNumber) === cleanQuery ||
      String(item.ayahNumber) === cleanQuery
    );
  });
}

/**
 * Calculate accurate astronomical moon phase and illumination for a given date.
 */
export function calculateMoonPhase(date: Date = new Date()): import('../types/cosmic').MoonPhaseInfo {
  // Reference known new moon: Jan 6, 2000 18:14 UTC (JD 2451549.26)
  const knownNewMoon = new Date('2000-01-06T18:14:00Z').getTime();
  const synodicMonthMs = 29.53058867 * 24 * 60 * 60 * 1000;

  const diffMs = date.getTime() - knownNewMoon;
  const cycleFraction = (diffMs % synodicMonthMs) / synodicMonthMs;
  const normalizedFraction = cycleFraction < 0 ? cycleFraction + 1 : cycleFraction;

  const moonAgeDays = Math.round(normalizedFraction * 29.53058867 * 10) / 10;
  // Illumination fraction: 0 at new moon, 1 at full moon (cycle 0.5)
  const illuminationFraction = Math.round((1 - Math.cos(normalizedFraction * 2 * Math.PI)) / 2 * 100) / 100;

  let phaseCode: import('../types/cosmic').MoonPhaseInfo['phaseCode'];
  let icon: string;
  let phaseName: import('../types/cosmic').LocalizedString;

  if (normalizedFraction < 0.03 || normalizedFraction >= 0.97) {
    phaseCode = 'new';
    icon = '🌑';
    phaseName = { ar: 'المحاق (القمر الجديد)', en: 'New Moon', fr: 'Nouvelle Lune' };
  } else if (normalizedFraction < 0.22) {
    phaseCode = 'waxing-crescent';
    icon = '🌒';
    phaseName = { ar: 'الهلال المتزايد', en: 'Waxing Crescent', fr: 'Premier Croissant' };
  } else if (normalizedFraction < 0.28) {
    phaseCode = 'first-quarter';
    icon = '🌓';
    phaseName = { ar: 'التربيع الأول', en: 'First Quarter', fr: 'Premier Quartier' };
  } else if (normalizedFraction < 0.47) {
    phaseCode = 'waxing-gibbous';
    icon = '🌔';
    phaseName = { ar: 'الأحدب المتزايد', en: 'Waxing Gibbous', fr: 'Lune Gibbeuse Croissante' };
  } else if (normalizedFraction < 0.53) {
    phaseCode = 'full';
    icon = '🌕';
    phaseName = { ar: 'البدر المكتمل', en: 'Full Moon', fr: 'Pleine Lune' };
  } else if (normalizedFraction < 0.72) {
    phaseCode = 'waning-gibbous';
    icon = '🌖';
    phaseName = { ar: 'الأحدب المتناقص', en: 'Waning Gibbous', fr: 'Lune Gibbeuse Décroissante' };
  } else if (normalizedFraction < 0.78) {
    phaseCode = 'last-quarter';
    icon = '🌗';
    phaseName = { ar: 'التربيع الأخير', en: 'Last Quarter', fr: 'Dernier Quartier' };
  } else {
    phaseCode = 'waning-crescent';
    icon = '🌘';
    phaseName = { ar: 'الهلال المتناقص', en: 'Waning Crescent', fr: 'Dernier Croissant' };
  }

  return {
    phaseName,
    phaseCode,
    illuminationFraction,
    moonAgeDays,
    icon
  };
}

/**
 * Filter celestial events by type and search query.
 */
export function filterCelestialEventsList(
  events: import('../types/cosmic').CelestialEvent[],
  type: string = 'all',
  query: string = '',
  lang: Language = 'ar'
): import('../types/cosmic').CelestialEvent[] {
  const cleanQuery = query.trim().toLowerCase();
  const normalizedQuery = normalizeArabic(cleanQuery);

  return events.filter((ev) => {
    if (type !== 'all' && ev.type !== type) return false;
    if (!cleanQuery) return true;

    const title = (ev.title[lang] || ev.title.ar).toLowerCase();
    const desc = (ev.description[lang] || ev.description.ar).toLowerCase();

    return (
      title.includes(cleanQuery) ||
      normalizeArabic(title).includes(normalizedQuery) ||
      desc.includes(cleanQuery) ||
      normalizeArabic(desc).includes(normalizedQuery) ||
      ev.date.includes(cleanQuery)
    );
  });
}

/**
 * Filter and search constellations in the Sky Map.
 */
export function searchConstellationsList(
  constellations: import('../types/cosmic').Constellation[],
  query: string,
  hemisphere: string,
  lang: Language = 'ar'
): import('../types/cosmic').Constellation[] {
  const cleanQuery = query.trim().toLowerCase();
  const normalizedQuery = normalizeArabic(cleanQuery);

  return constellations.filter((c) => {
    if (hemisphere !== 'all' && c.hemisphere !== hemisphere) return false;
    if (!cleanQuery) return true;

    const name = (c.name[lang] || c.name.ar).toLowerCase();
    const arabicClassical = c.arabicClassicalName.toLowerCase();
    const starName = (c.brightestStar.name[lang] || c.brightestStar.name.ar).toLowerCase();
    const arabicStarName = c.brightestStar.arabicName.toLowerCase();

    return (
      name.includes(cleanQuery) ||
      normalizeArabic(name).includes(normalizedQuery) ||
      arabicClassical.includes(cleanQuery) ||
      normalizeArabic(arabicClassical).includes(normalizedQuery) ||
      starName.includes(cleanQuery) ||
      normalizeArabic(starName).includes(normalizedQuery) ||
      arabicStarName.includes(cleanQuery) ||
      normalizeArabic(arabicStarName).includes(normalizedQuery)
    );
  });
}
