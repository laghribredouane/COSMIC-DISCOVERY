import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Compass,
  MapPin,
  Calendar,
  Clock,
  Sun,
  Moon,
  Sparkles,
  Navigation,
  RefreshCw,
  BookOpen,
  Star,
  Globe,
  CheckCircle2,
  AlertCircle,
  Sliders,
  Eye
} from 'lucide-react';
import { Language } from '../types/cosmic';

interface CosmicPrayerTimesProps {
  language: Language;
}

interface LocationPreset {
  id: string;
  name: { ar: string; en: string; fr: string };
  country: { ar: string; en: string; fr: string };
  lat: number;
  lng: number;
  timezone: string;
  utcOffsetHours: number;
  defaultMethod: number;
}

interface PrayerTimings {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
  LastThird: string;
  Midnight: string;
}

interface HijriCalendarData {
  day: number;
  monthNumber: number;
  monthName: { ar: string; en: string; fr: string };
  year: number;
  weekdayName: { ar: string; en: string; fr: string };
  designation: string;
  isPostMaghribRollover: boolean;
  moonAgeDays: number;
  moonIllumination: number;
}

interface GregorianCalendarData {
  day: number;
  monthNumber: number;
  monthName: { ar: string; en: string; fr: string };
  year: number;
  weekdayName: { ar: string; en: string; fr: string };
  formattedFull: string;
  localTimeStr: string;
  julianDay: number;
}

interface CelestialAzimuthBody {
  id: string;
  name: { ar: string; en: string; fr: string };
  symbol: string;
  azimuthDeg: number;
  altitudeDeg: number;
  color: string;
  type: 'sun' | 'moon' | 'star' | 'planet';
  isAboveHorizon: boolean;
  note: { ar: string; en: string; fr: string };
}

const KAABA_COORDS = {
  lat: 21.422487,
  lng: 39.826206,
};

const LOCATION_PRESETS: LocationPreset[] = [
  {
    id: 'makkah',
    name: { ar: 'مكة المكرمة', en: 'Makkah Al-Mukarramah', fr: 'La Mecque' },
    country: { ar: 'المملكة العربية السعودية', en: 'Saudi Arabia', fr: 'Arabie Saoudite' },
    lat: 21.4225,
    lng: 39.8262,
    timezone: 'Asia/Riyadh',
    utcOffsetHours: 3,
    defaultMethod: 4, // Umm al-Qura
  },
  {
    id: 'madinah',
    name: { ar: 'المدينة المنورة', en: 'Al-Madinah Al-Munawwarah', fr: 'Médine' },
    country: { ar: 'المملكة العربية السعودية', en: 'Saudi Arabia', fr: 'Arabie Saoudite' },
    lat: 24.4672,
    lng: 39.6112,
    timezone: 'Asia/Riyadh',
    utcOffsetHours: 3,
    defaultMethod: 4,
  },
  {
    id: 'cairo',
    name: { ar: 'القاهرة (مرصد حلوان)', en: 'Cairo (Helwan Observatory)', fr: 'Le Caire' },
    country: { ar: 'مصر', en: 'Egypt', fr: 'Égypte' },
    lat: 30.0444,
    lng: 31.2357,
    timezone: 'Africa/Cairo',
    utcOffsetHours: 2,
    defaultMethod: 5, // Egyptian General Authority
  },
  {
    id: 'algiers',
    name: { ar: 'الجزائر العاصمة (مرصد بوزريعة)', en: 'Algiers (Bouzareah Observatory)', fr: 'Alger (Observatoire de Bouzaréah)' },
    country: { ar: 'الجزائر', en: 'Algeria', fr: 'Algérie' },
    lat: 36.7538,
    lng: 3.0588,
    timezone: 'Africa/Algiers',
    utcOffsetHours: 1,
    defaultMethod: 3, // MWL
  },
  {
    id: 'casablanca',
    name: { ar: 'الدار البيضاء', en: 'Casablanca', fr: 'Casablanca' },
    country: { ar: 'المغرب', en: 'Morocco', fr: 'Maroc' },
    lat: 33.5731,
    lng: -7.5898,
    timezone: 'Africa/Casablanca',
    utcOffsetHours: 1,
    defaultMethod: 3,
  },
  {
    id: 'jerusalem',
    name: { ar: 'القدس الشريف', en: 'Al-Quds (Jerusalem)', fr: 'Jérusalem' },
    country: { ar: 'فلسطين', en: 'Palestine', fr: 'Palestine' },
    lat: 31.7781,
    lng: 35.2354,
    timezone: 'Asia/Jerusalem',
    utcOffsetHours: 2,
    defaultMethod: 3,
  },
  {
    id: 'dubai',
    name: { ar: 'دبي (مركز الفلك الدولي)', en: 'Dubai', fr: 'Dubaï' },
    country: { ar: 'الإمارات العربية المتحدة', en: 'UAE', fr: 'Émirats Arabes Unis' },
    lat: 25.2048,
    lng: 55.2708,
    timezone: 'Asia/Dubai',
    utcOffsetHours: 4,
    defaultMethod: 16,
  },
  {
    id: 'istanbul',
    name: { ar: 'إسطنبول (مرصد تقي الدين)', en: 'Istanbul', fr: 'Istanbul' },
    country: { ar: 'تركيا', en: 'Turkey', fr: 'Turquie' },
    lat: 41.0082,
    lng: 28.9784,
    timezone: 'Europe/Istanbul',
    utcOffsetHours: 3,
    defaultMethod: 13,
  },
  {
    id: 'paris',
    name: { ar: 'باريس (مرصد باريس)', en: 'Paris Observatory', fr: 'Paris (Observatoire de Paris)' },
    country: { ar: 'فرنسا', en: 'France', fr: 'France' },
    lat: 48.8566,
    lng: 2.3522,
    timezone: 'Europe/Paris',
    utcOffsetHours: 1,
    defaultMethod: 12,
  },
  {
    id: 'greenwich',
    name: { ar: 'لندن (مرصد غرينتش)', en: 'London (Greenwich Observatory)', fr: 'Londres (Greenwich)' },
    country: { ar: 'المملكة المتحدة', en: 'United Kingdom', fr: 'Royaume-Uni' },
    lat: 51.4769,
    lng: -0.0005,
    timezone: 'Europe/London',
    utcOffsetHours: 0,
    defaultMethod: 3,
  },
  {
    id: 'tokyo',
    name: { ar: 'طوكيو (المرصد الفلكي الوطني)', en: 'Tokyo (NAOJ Observatory)', fr: 'Tokyo' },
    country: { ar: 'اليابان', en: 'Japan', fr: 'Japon' },
    lat: 35.6762,
    lng: 139.6503,
    timezone: 'Asia/Tokyo',
    utcOffsetHours: 9,
    defaultMethod: 3,
  },
  {
    id: 'newyork',
    name: { ar: 'نيويورك', en: 'New York', fr: 'New York' },
    country: { ar: 'الولايات المتحدة', en: 'United States', fr: 'États-Unis' },
    lat: 40.7128,
    lng: -74.006,
    timezone: 'America/New_York',
    utcOffsetHours: -5,
    defaultMethod: 2, // ISNA
  },
];

const CALCULATION_METHODS = [
  {
    id: 4,
    name: {
      ar: 'تقويم أم القرى (مكة المكرمة) - الفجر 18.5°',
      en: 'Umm al-Qura University, Makkah (Fajr 18.5°)',
      fr: 'Université Umm al-Qura, La Mecque (Fajr 18.5°)',
    },
    fajrAngle: 18.5,
    ishaAngle: 17,
  },
  {
    id: 3,
    name: {
      ar: 'رابطة العالم الإسلامي - الفجر 18° / العشاء 17°',
      en: 'Muslim World League (MWL - Fajr 18°, Isha 17°)',
      fr: 'Ligue Islamique Mondiale (Fajr 18°, Isha 17°)',
    },
    fajrAngle: 18,
    ishaAngle: 17,
  },
  {
    id: 5,
    name: {
      ar: 'الهيئة المصرية العامة للمساحة - الفجر 19.5° / العشاء 17.5°',
      en: 'Egyptian General Authority of Survey (Fajr 19.5°, Isha 17.5°)',
      fr: 'Autorité Générale Égyptienne d’Arpentage (Fajr 19.5°)',
    },
    fajrAngle: 19.5,
    ishaAngle: 17.5,
  },
  {
    id: 2,
    name: {
      ar: 'الجمعية الإسلامية لأمريكا الشمالية (ISNA) - 15°',
      en: 'Islamic Society of North America (ISNA - 15°)',
      fr: 'ISNA Amérique du Nord (15°)',
    },
    fajrAngle: 15,
    ishaAngle: 15,
  },
  {
    id: 12,
    name: {
      ar: 'اتحاد المنظمات الإسلامية في فرنسا (UOIF) - 12°',
      en: 'Union des Organisations Islamiques de France (12°)',
      fr: 'UOIF - Musulmans de France (12°)',
    },
    fajrAngle: 12,
    ishaAngle: 12,
  },
];

const HIJRI_MONTHS: Array<{ ar: string; en: string; fr: string }> = [
  { ar: 'مُحَرَّم', en: 'Muharram', fr: 'Mouharram' },
  { ar: 'صَفَر', en: 'Safar', fr: 'Safar' },
  { ar: 'رَبِيع الأَوَّل', en: "Rabi' al-Awwal", fr: 'Rabi al-Awwal' },
  { ar: 'رَبِيع الآخِر', en: "Rabi' al-Thani", fr: 'Rabi al-Thani' },
  { ar: 'جُمَادَى الأُولَى', en: 'Jumada al-Ula', fr: 'Joumada al-Oula' },
  { ar: 'جُمَادَى الآخِرَة', en: 'Jumada al-Akhirah', fr: 'Joumada al-Akhira' },
  { ar: 'رَجَب', en: 'Rajab', fr: 'Rajab' },
  { ar: 'شَعْبَان', en: "Sha'ban", fr: 'Chaabane' },
  { ar: 'رَمَضَان', en: 'Ramadan', fr: 'Ramadan' },
  { ar: 'شَوَّال', en: 'Shawwal', fr: 'Chawwal' },
  { ar: 'ذُو القَعْدَة', en: "Dhu al-Qi'dah", fr: 'Dhou al-Qi`da' },
  { ar: 'ذُو الحِجَّة', en: 'Dhu al-Hijjah', fr: 'Dhou al-Hijja' },
];

const GREGORIAN_MONTHS: Array<{ ar: string; en: string; fr: string }> = [
  { ar: 'يناير (كانون الثاني)', en: 'January', fr: 'Janvier' },
  { ar: 'فبراير (شباط)', en: 'February', fr: 'Février' },
  { ar: 'مارس (آذار)', en: 'March', fr: 'Mars' },
  { ar: 'أبريل (نيسان)', en: 'April', fr: 'Avril' },
  { ar: 'مايو (أيار)', en: 'May', fr: 'Mai' },
  { ar: 'يونيو (حزيران)', en: 'June', fr: 'Juin' },
  { ar: 'يوليو (تموز)', en: 'July', fr: 'Juillet' },
  { ar: 'أغسطس (آب)', en: 'August', fr: 'Août' },
  { ar: 'سبتمبر (أيلول)', en: 'September', fr: 'Septembre' },
  { ar: 'أكتوبر (تشرين الأول)', en: 'October', fr: 'Octobre' },
  { ar: 'نوفمبر (تشرين الثاني)', en: 'November', fr: 'Novembre' },
  { ar: 'ديسمبر (كانون الأول)', en: 'December', fr: 'Décembre' },
];

const WEEKDAYS: Array<{ ar: string; en: string; fr: string }> = [
  { ar: 'الأحد', en: 'Sunday', fr: 'Dimanche' },
  { ar: 'الاثنين', en: 'Monday', fr: 'Lundi' },
  { ar: 'الثلاثاء', en: 'Tuesday', fr: 'Mardi' },
  { ar: 'الأربعاء', en: 'Wednesday', fr: 'Mercredi' },
  { ar: 'الخميس', en: 'Thursday', fr: 'Jeudi' },
  { ar: 'الجمعة', en: 'Friday', fr: 'Vendredi' },
  { ar: 'السبت', en: 'Saturday', fr: 'Samedi' },
];

// Trigonometric helpers in degrees
const d2r = (d: number) => (d * Math.PI) / 180;
const r2d = (r: number) => (r * 180) / Math.PI;
const sinD = (d: number) => Math.sin(d2r(d));
const cosD = (d: number) => Math.cos(d2r(d));
const tanD = (d: number) => Math.tan(d2r(d));
const asinD = (x: number) => r2d(Math.asin(Math.max(-1, Math.min(1, x))));
const acosD = (x: number) => r2d(Math.acos(Math.max(-1, Math.min(1, x))));
const atan2D = (y: number, x: number) => r2d(Math.atan2(y, x));

/**
 * Calculate Great-Circle Qibla Bearing (0° = True North, 90° = East) & Distance (km)
 */
export function calculateQiblaAndDistance(lat: number, lng: number): {
  qiblaBearing: number;
  distanceKm: number;
} {
  const dLng = KAABA_COORDS.lng - lng;
  const y = sinD(dLng);
  const x = cosD(lat) * tanD(KAABA_COORDS.lat) - sinD(lat) * cosD(dLng);
  const bearing = (atan2D(y, x) + 360) % 360;

  // Haversine distance
  const R = 6371; // Earth mean radius km
  const dLat = KAABA_COORDS.lat - lat;
  const a =
    sinD(dLat / 2) * sinD(dLat / 2) +
    cosD(lat) * cosD(KAABA_COORDS.lat) * sinD(dLng / 2) * sinD(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distanceKm = Math.round(R * c);

  return {
    qiblaBearing: Number(bearing.toFixed(1)),
    distanceKm,
  };
}

/**
 * Compute Julian Day from UTC timestamp
 */
function getJulianDay(date: Date): number {
  return date.getTime() / 86400000 + 2440587.5;
}

/**
 * High-precision astronomical solar calculation for Prayer Times & Solar Coordinates
 */
function computeAstronomicalPrayerTimes(
  lat: number,
  lng: number,
  utcOffsetHours: number,
  date: Date,
  fajrAngle = 18.5,
  ishaAngle = 17
): {
  timings: PrayerTimings;
  solarDeclination: number;
  equationOfTimeMin: number;
} {
  // Get local year, month, day in target offset
  const localMs = date.getTime() + utcOffsetHours * 3600000;
  const localDate = new Date(localMs);
  const year = localDate.getUTCFullYear();
  const month = localDate.getUTCMonth() + 1;
  const day = localDate.getUTCDate();

  // Julian Date at 12:00 UTC of that date
  const noonUtc = Date.UTC(year, month - 1, day, 12, 0, 0);
  const jd = noonUtc / 86400000 + 2440587.5;
  const d = jd - 2451545.0;

  // Mean anomaly and ecliptic longitude of the Sun
  const g = (357.529 + 0.98560028 * d) % 360;
  const q = (280.459 + 0.98564736 * d) % 360;
  const L = (q + 1.915 * sinD(g) + 0.02 * sinD(2 * g) + 360) % 360;

  const e = 23.439 - 0.00000036 * d;
  const RA = (atan2D(cosD(e) * sinD(L), cosD(L)) + 360) % 360;
  const decl = asinD(sinD(e) * sinD(L));

  // Equation of time in hours
  let eqtDeg = q - RA;
  if (eqtDeg > 180) eqtDeg -= 360;
  if (eqtDeg < -180) eqtDeg += 360;
  const eqtHours = eqtDeg / 15;
  const equationOfTimeMin = Number((eqtHours * 60).toFixed(1));

  // Solar transit (Dhuhr) in local clock hours
  const dhuhrHours = 12 + utcOffsetHours - lng / 15 - eqtHours;

  // Hour angle helper for altitude alpha (in degrees)
  const hourAngleForAltitude = (alpha: number): number => {
    const num = sinD(alpha) - sinD(lat) * sinD(decl);
    const den = cosD(lat) * cosD(decl);
    const ratio = num / den;
    if (ratio > 1) return 0;
    if (ratio < -1) return 12;
    return acosD(ratio) / 15;
  };

  // Standard Shafi'i/Majority Asr shadow factor = 1
  const shadowRatio = 1 + tanD(Math.abs(lat - decl));
  const asrAltitude = r2d(Math.atan(1 / shadowRatio));

  const tSunrise = hourAngleForAltitude(-0.833);
  const tFajr = hourAngleForAltitude(-fajrAngle);
  const tIsha = hourAngleForAltitude(-ishaAngle);
  const tAsr = hourAngleForAltitude(asrAltitude);

  const fajrH = dhuhrHours - tFajr;
  const sunriseH = dhuhrHours - tSunrise;
  const dhuhrH = dhuhrHours + 2 / 60; // +2 min precaution after meridian transit
  const asrH = dhuhrHours + tAsr;
  const maghribH = dhuhrHours + tSunrise;
  const ishaH = dhuhrHours + tIsha;

  // Night duration from Maghrib to Fajr (next day)
  const nightDuration = 24 - maghribH + fajrH;
  const midnightH = (maghribH + nightDuration / 2) % 24;
  const lastThirdH = (maghribH + (2 * nightDuration) / 3) % 24;

  const formatHours = (h: number): string => {
    const norm = ((h % 24) + 24) % 24;
    const totalMinutes = Math.round(norm * 60);
    const hh = Math.floor(totalMinutes / 60) % 24;
    const mm = totalMinutes % 60;
    return `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`;
  };

  return {
    timings: {
      Fajr: formatHours(fajrH),
      Sunrise: formatHours(sunriseH),
      Dhuhr: formatHours(dhuhrH),
      Asr: formatHours(asrH),
      Maghrib: formatHours(maghribH),
      Isha: formatHours(ishaH),
      Midnight: formatHours(midnightH),
      LastThird: formatHours(lastThirdH),
    },
    solarDeclination: Number(decl.toFixed(2)),
    equationOfTimeMin,
  };
}

/**
 * Compute Dual Hijri and Gregorian Calendar Data dynamically for the user's location & timezone
 */
function computeLocationCalendars(
  now: Date,
  utcOffsetHours: number,
  maghribTimeStr: string,
  hijriOffsetDays: number,
  advanceAtMaghrib: boolean,
  language: Language
): {
  hijri: HijriCalendarData;
  gregorian: GregorianCalendarData;
  currentLocalMinutes: number;
} {
  // Shift UTC time by the location's UTC offset
  const locationTimeMs = now.getTime() + utcOffsetHours * 3600000;
  const locDate = new Date(locationTimeMs);

  const gYear = locDate.getUTCFullYear();
  const gMonth = locDate.getUTCMonth() + 1;
  const gDay = locDate.getUTCDate();
  const gWeekday = locDate.getUTCDay();
  const gHours = locDate.getUTCHours();
  const gMinutes = locDate.getUTCMinutes();
  const gSeconds = locDate.getUTCSeconds();

  const currentLocalMinutes = gHours * 60 + gMinutes;
  const [magH, magM] = maghribTimeStr.split(':').map(Number);
  const maghribMinutes = (magH || 18) * 60 + (magM || 0);
  const isPostMaghrib = currentLocalMinutes >= maghribMinutes;

  // In Islamic astronomy, the new lunar day begins at Maghrib (sunset) at that location
  const totalDayShift = hijriOffsetDays + (advanceAtMaghrib && isPostMaghrib ? 1 : 0);
  const effectiveHijriDate = new Date(locationTimeMs + totalDayShift * 86400000);

  let hDay = 1;
  let hMonth = 1;
  let hYear = 1448;

  // Use Intl.DateTimeFormat with 'islamic-umalqura' calendar at UTC for the shifted location date
  try {
    const formatter = new Intl.DateTimeFormat('en-TN-u-ca-islamic-umalqura', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      timeZone: 'UTC',
    });
    const parts = formatter.formatToParts(effectiveHijriDate);
    const dayPart = parts.find((p) => p.type === 'day')?.value;
    const monthPart = parts.find((p) => p.type === 'month')?.value;
    const yearPart = parts.find((p) => p.type === 'year')?.value;

    if (dayPart && monthPart && yearPart) {
      hDay = parseInt(dayPart, 10);
      hMonth = parseInt(monthPart, 10);
      hYear = parseInt(yearPart.replace(/\D/g, ''), 10);
    }
  } catch {
    // Fallback Kuwaiti/Tabular Hijri algorithm if Intl islamic-umalqura is unavailable
    const jd = Math.floor(effectiveHijriDate.getTime() / 86400000 + 2440587.5);
    const l = jd - 1948440 + 10632;
    const n = Math.floor((l - 1) / 10631);
    const l2 = l - 10631 * n + 354;
    const j =
      Math.floor((10985 - l2) / 5316) * Math.floor((50 * l2) / 17719) +
      Math.floor(l2 / 5670) * Math.floor((43 * l2) / 15238);
    const l3 =
      l2 -
      Math.floor((30 - j) / 15) * Math.floor((17719 * j) / 50) -
      Math.floor(j / 16) * Math.floor((15238 * j) / 43) +
      29;
    hMonth = Math.floor((24 * l3) / 709);
    hDay = l3 - Math.floor((709 * hMonth) / 24);
    hYear = 30 * n + j - 30;
  }

  const hWeekdayIndex = effectiveHijriDate.getUTCDay();
  const jdNow = Number(getJulianDay(now).toFixed(4));

  // Synodic moon age & illumination
  const knownNewMoonMs = Date.UTC(2025, 0, 29, 12, 36, 0);
  const synodicDays = 29.530588853;
  const elapsedDays = (now.getTime() - knownNewMoonMs) / 86400000;
  const cyclePos = ((elapsedDays % synodicDays) + synodicDays) % synodicDays;
  const moonAgeDays = Number(cyclePos.toFixed(1));
  const moonIllumination = Math.round(
    ((1 - Math.cos((2 * Math.PI * cyclePos) / synodicDays)) / 2) * 100
  );

  const gMonthObj = GREGORIAN_MONTHS[(gMonth - 1) % 12] || GREGORIAN_MONTHS[0];
  const hMonthObj = HIJRI_MONTHS[(hMonth - 1) % 12] || HIJRI_MONTHS[0];

  const formattedGregorian =
    language === 'ar'
      ? `${WEEKDAYS[gWeekday].ar}، ${gDay} ${gMonthObj.ar} ${gYear} م`
      : language === 'fr'
      ? `${WEEKDAYS[gWeekday].fr} ${gDay} ${gMonthObj.fr} ${gYear}`
      : `${WEEKDAYS[gWeekday].en}, ${gMonthObj.en} ${gDay}, ${gYear} CE`;

  const localTimeStr = `${String(gHours).padStart(2, '0')}:${String(gMinutes).padStart(2, '0')}:${String(gSeconds).padStart(2, '0')}`;

  return {
    hijri: {
      day: hDay,
      monthNumber: hMonth,
      monthName: hMonthObj,
      year: hYear,
      weekdayName: WEEKDAYS[hWeekdayIndex],
      designation: language === 'ar' ? 'هـ' : 'AH',
      isPostMaghribRollover: advanceAtMaghrib && isPostMaghrib,
      moonAgeDays,
      moonIllumination,
    },
    gregorian: {
      day: gDay,
      monthNumber: gMonth,
      monthName: gMonthObj,
      year: gYear,
      weekdayName: WEEKDAYS[gWeekday],
      formattedFull: formattedGregorian,
      localTimeStr,
      julianDay: jdNow,
    },
    currentLocalMinutes,
  };
}

/**
 * Compute real-time azimuth & altitude of key celestial bodies for the observer's coordinates
 * so users can orient themselves toward the Qibla using visible stars, the Sun, and the Moon.
 */
function computeCelestialAzimuths(lat: number, lng: number, now: Date): CelestialAzimuthBody[] {
  const jd = getJulianDay(now);
  const d = jd - 2451545.0;

  // Greenwich Mean Sidereal Time (GMST) in degrees
  const gmst = (280.46061837 + 360.98564736629 * d) % 360;
  // Local Sidereal Time (LST) in degrees
  const lst = ((gmst + lng) % 360 + 360) % 360;

  // Helper to convert Equatorial (RA deg, Dec deg) -> Horizontal (Azimuth deg, Altitude deg)
  const eqToHorizontal = (raDeg: number, decDeg: number) => {
    const ha = ((lst - raDeg) % 360 + 360) % 360;
    const alt = asinD(sinD(lat) * sinD(decDeg) + cosD(lat) * cosD(decDeg) * cosD(ha));
    const y = -sinD(ha) * cosD(decDeg);
    const x = cosD(lat) * sinD(decDeg) - sinD(lat) * cosD(decDeg) * cosD(ha);
    const az = (atan2D(y, x) + 360) % 360;
    return {
      azimuthDeg: Number(az.toFixed(1)),
      altitudeDeg: Number(alt.toFixed(1)),
    };
  };

  // 1. Sun position
  const g = (357.529 + 0.98560028 * d) % 360;
  const q = (280.459 + 0.98564736 * d) % 360;
  const L = (q + 1.915 * sinD(g) + 0.02 * sinD(2 * g) + 360) % 360;
  const e = 23.439 - 0.00000036 * d;
  const sunRA = (atan2D(cosD(e) * sinD(L), cosD(L)) + 360) % 360;
  const sunDec = asinD(sinD(e) * sinD(L));
  const sunPos = eqToHorizontal(sunRA, sunDec);

  // 2. Moon position (simplified orbital elements)
  const Lm = (218.316 + 13.176396 * d) % 360;
  const Mm = (134.963 + 13.064993 * d) % 360;
  const Fm = (93.272 + 13.22935 * d) % 360;
  const moonLon = Lm + 6.289 * sinD(Mm);
  const moonLat = 5.128 * sinD(Fm);
  const moonRA =
    (atan2D(sinD(moonLon) * cosD(e) - tanD(moonLat) * sinD(e), cosD(moonLon)) + 360) % 360;
  const moonDec = asinD(sinD(moonLat) * cosD(e) + cosD(moonLat) * sinD(e) * sinD(moonLon));
  const moonPos = eqToHorizontal(moonRA, moonDec);

  // 3. Polaris (North Star - الجدي) - RA: 37.95°, Dec: +89.26°
  const polarisPos = eqToHorizontal(37.95, 89.26);

  // 4. Sirius (الشعرى اليمانية - Alpha Canis Majoris) - RA: 101.28°, Dec: -16.71°
  const siriusPos = eqToHorizontal(101.28, -16.71);

  // 5. Canopus (سهيل - Alpha Carinae) - RA: 95.98°, Dec: -52.70°
  const canopusPos = eqToHorizontal(95.98, -52.7);

  // 6. Arcturus (السماك الرامح - Alpha Boötis) - RA: 213.91°, Dec: +19.18°
  const arcturusPos = eqToHorizontal(213.91, 19.18);

  return [
    {
      id: 'sun',
      name: { ar: 'الشمس', en: 'The Sun', fr: 'Le Soleil' },
      symbol: '☀️',
      azimuthDeg: sunPos.azimuthDeg,
      altitudeDeg: sunPos.altitudeDeg,
      color: '#fbbf24',
      type: 'sun',
      isAboveHorizon: sunPos.altitudeDeg >= -0.833,
      note: {
        ar: 'المعيار الفلكي لمواقيت الصلوات الخمس والظل والزوال',
        en: 'Primary solar reference for meridian transit, shadow ratios, and twilight',
        fr: 'Référence solaire pour le zénith, l’ombre et les crépuscules',
      },
    },
    {
      id: 'moon',
      name: { ar: 'القمر', en: 'The Moon', fr: 'La Lune' },
      symbol: '🌙',
      azimuthDeg: moonPos.azimuthDeg,
      altitudeDeg: moonPos.altitudeDeg,
      color: '#e2e8f0',
      type: 'moon',
      isAboveHorizon: moonPos.altitudeDeg >= 0,
      note: {
        ar: 'ميقات الشهور الهجرية ومنازل القمر في القبة السماوية',
        en: 'Lunar calendar timekeeper & night sky azimuth reference',
        fr: 'Repère du calendrier hégirien et azimut lunaire nocturne',
      },
    },
    {
      id: 'polaris',
      name: { ar: 'نجم القطب (الجدي)', en: 'Polaris (North Star)', fr: 'Étoile Polaire (Polaris)' },
      symbol: '⭐',
      azimuthDeg: polarisPos.azimuthDeg,
      altitudeDeg: polarisPos.altitudeDeg,
      color: '#38bdf8',
      type: 'star',
      isAboveHorizon: polarisPos.altitudeDeg >= 0,
      note: {
        ar: 'يشير دائماً إلى الشمال الحقيقي (0°) ومنه تُقاس زاوية انحراف القبلة',
        en: 'Fixed near True Celestial North (0°), anchor for Qibla azimuth',
        fr: 'Indique le Nord Céleste Vrai (0°), repère fixe pour l’azimut de la Qibla',
      },
    },
    {
      id: 'sirius',
      name: { ar: 'الشعرى اليمانية (Sirius)', en: 'Sirius (Alpha CMa)', fr: 'Sirius (Alpha CMa)' },
      symbol: '✦',
      azimuthDeg: siriusPos.azimuthDeg,
      altitudeDeg: siriusPos.altitudeDeg,
      color: '#60a5fa',
      type: 'star',
      isAboveHorizon: siriusPos.altitudeDeg >= 0,
      note: {
        ar: 'ألمع نجوم السماء ليلاً، استُخدم تاريخياً في تحديد اتجاهات القبلة ليلاً',
        en: 'Brightest star in the night sky, classical navigational star for Qibla',
        fr: 'Étoile la plus brillante du ciel nocturne, repère historique d’orientation',
      },
    },
    {
      id: 'canopus',
      name: { ar: 'نجم سهيل (Canopus)', en: 'Canopus (Suhayl)', fr: 'Canopus (Souhayl)' },
      symbol: '✧',
      azimuthDeg: canopusPos.azimuthDeg,
      altitudeDeg: canopusPos.altitudeDeg,
      color: '#f59e0b',
      type: 'star',
      isAboveHorizon: canopusPos.altitudeDeg >= 0,
      note: {
        ar: 'دليل الأفق الجنوبي عند الفلكيين العرب لتحديد محاريب المساجد',
        en: 'Southern horizon beacon used in classical Islamic qibla astronomy',
        fr: 'Repère de l’horizon sud dans l’astronomie islamique classique',
      },
    },
    {
      id: 'arcturus',
      name: { ar: 'السماك الرامح (Arcturus)', en: 'Arcturus', fr: 'Arcturus' },
      symbol: '✶',
      azimuthDeg: arcturusPos.azimuthDeg,
      altitudeDeg: arcturusPos.altitudeDeg,
      color: '#fb923c',
      type: 'star',
      isAboveHorizon: arcturusPos.altitudeDeg >= 0,
      note: {
        ar: 'عملاق برتقالي ساطع يُرشد الراصدين في النصف الشمالي للكرة الأرضية',
        en: 'Bright orange giant guiding northern hemisphere skywatchers',
        fr: 'Géante orange brillante guidant les observateurs boréaux',
      },
    },
  ];
}

export const CosmicPrayerTimes: React.FC<CosmicPrayerTimesProps> = ({ language }) => {
  // Active Location State
  const [selectedPresetId, setSelectedPresetId] = useState<string>('makkah');
  const [lat, setLat] = useState<number>(LOCATION_PRESETS[0].lat);
  const [lng, setLng] = useState<number>(LOCATION_PRESETS[0].lng);
  const [utcOffsetHours, setUtcOffsetHours] = useState<number>(LOCATION_PRESETS[0].utcOffsetHours);
  const [locationLabel, setLocationLabel] = useState<{ ar: string; en: string; fr: string }>({
    ar: 'مكة المكرمة، المملكة العربية السعودية',
    en: 'Makkah Al-Mukarramah, Saudi Arabia',
    fr: 'La Mecque, Arabie Saoudite',
  });
  const [calculationMethod, setCalculationMethod] = useState<number>(4);
  const [hijriOffsetDays, setHijriOffsetDays] = useState<number>(0);
  const [advanceHijriAtMaghrib, setAdvanceHijriAtMaghrib] = useState<boolean>(true);

  // Geolocation & API Status
  const [geoStatus, setGeoStatus] = useState<'idle' | 'locating' | 'granted' | 'denied'>('idle');
  const [apiSyncStatus, setApiSyncStatus] = useState<'synced' | 'astronomic-engine' | 'loading'>('astronomic-engine');
  const [apiHijriOverride, setApiHijriOverride] = useState<{
    day: number;
    monthNumber: number;
    year: number;
  } | null>(null);
  const [apiTimingsOverride, setApiTimingsOverride] = useState<Partial<PrayerTimings> | null>(null);

  // Custom Lat/Lng Input Modal/Expand
  const [customLatInput, setCustomLatInput] = useState<string>('21.4225');
  const [customLngInput, setCustomLngInput] = useState<string>('39.8262');

  // Interactive Prayer Compass State
  const [observerHeading, setObserverHeading] = useState<number>(0); // 0° = facing North
  const [selectedCelestialBodyId, setSelectedCelestialBodyId] = useState<string>('sun');
  const [now, setNow] = useState<Date>(() => new Date());

  // Live clock tick every second
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch accurate Prayer Times & Hijri Date from Aladhan API whenever coordinates or method change
  const fetchAladhanData = useCallback(
    async (targetLat: number, targetLng: number, methodId: number) => {
      setApiSyncStatus('loading');
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 4500);
        const timestampSec = Math.floor(Date.now() / 1000);
        const url = `https://api.aladhan.com/v1/timings/${timestampSec}?latitude=${targetLat}&longitude=${targetLng}&method=${methodId}`;
        const res = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);

        if (res.ok) {
          const json = await res.json();
          const data = json?.data;
          if (data?.timings) {
            const cleanTime = (str: string) => (str ? str.split(' ')[0] : '00:00');
            setApiTimingsOverride({
              Fajr: cleanTime(data.timings.Fajr),
              Sunrise: cleanTime(data.timings.Sunrise),
              Dhuhr: cleanTime(data.timings.Dhuhr),
              Asr: cleanTime(data.timings.Asr),
              Maghrib: cleanTime(data.timings.Maghrib),
              Isha: cleanTime(data.timings.Isha),
              LastThird: cleanTime(data.timings.Lastthird || data.timings.Imsak),
              Midnight: cleanTime(data.timings.Midnight),
            });
          }
          if (data?.date?.hijri) {
            const h = data.date.hijri;
            setApiHijriOverride({
              day: parseInt(h.day, 10) || 1,
              monthNumber: Number(h.month?.number) || 1,
              year: parseInt(h.year, 10) || 1448,
            });
          }
          setApiSyncStatus('synced');
          return;
        }
      } catch {
        // Fallback to built-in astronomical engine
      }
      setApiTimingsOverride(null);
      setApiHijriOverride(null);
      setApiSyncStatus('astronomic-engine');
    },
    []
  );

  useEffect(() => {
    fetchAladhanData(lat, lng, calculationMethod);
  }, [lat, lng, calculationMethod, fetchAladhanData]);

  // Select Preset Location
  const handleSelectPreset = (presetId: string) => {
    const preset = LOCATION_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;
    setSelectedPresetId(preset.id);
    setLat(preset.lat);
    setLng(preset.lng);
    setCustomLatInput(String(preset.lat));
    setCustomLngInput(String(preset.lng));
    setUtcOffsetHours(preset.utcOffsetHours);
    setCalculationMethod(preset.defaultMethod);
    setLocationLabel({
      ar: `${preset.name.ar}، ${preset.country.ar}`,
      en: `${preset.name.en}, ${preset.country.en}`,
      fr: `${preset.name.fr}, ${preset.country.fr}`,
    });
    setGeoStatus('idle');
  };

  // Detect User GPS Location
  const handleDetectUserLocation = () => {
    if (!navigator.geolocation) {
      setGeoStatus('denied');
      return;
    }
    setGeoStatus('locating');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const userLat = Number(pos.coords.latitude.toFixed(4));
        const userLng = Number(pos.coords.longitude.toFixed(4));
        const browserOffsetHours = -new Date().getTimezoneOffset() / 60;
        setLat(userLat);
        setLng(userLng);
        setCustomLatInput(String(userLat));
        setCustomLngInput(String(userLng));
        setUtcOffsetHours(browserOffsetHours);
        setSelectedPresetId('custom-gps');
        setLocationLabel({
          ar: `موقعك الفلكي المباشر (${userLat}°, ${userLng}°)`,
          en: `Your Live GPS Coordinates (${userLat}°, ${userLng}°)`,
          fr: `Vos Coordonnées GPS en Direct (${userLat}°, ${userLng}°)`,
        });
        setGeoStatus('granted');
      },
      () => {
        setGeoStatus('denied');
      },
      { enableHighAccuracy: true, timeout: 7000 }
    );
  };

  // Apply Custom Coordinates
  const handleApplyCustomCoords = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedLat = parseFloat(customLatInput);
    const parsedLng = parseFloat(customLngInput);
    if (isNaN(parsedLat) || isNaN(parsedLng)) return;
    const clampedLat = Math.max(-66, Math.min(66, parsedLat));
    const clampedLng = Math.max(-180, Math.min(180, parsedLng));
    const estimatedOffset = Math.round(clampedLng / 15);
    setLat(clampedLat);
    setLng(clampedLng);
    setUtcOffsetHours(estimatedOffset);
    setSelectedPresetId('custom');
    setLocationLabel({
      ar: `مرصد مخصص (${clampedLat.toFixed(2)}° شمالاً، ${clampedLng.toFixed(2)}° شرقاً)`,
      en: `Custom Observatory (${clampedLat.toFixed(2)}°, ${clampedLng.toFixed(2)}°)`,
      fr: `Observatoire Personnalisé (${clampedLat.toFixed(2)}°, ${clampedLng.toFixed(2)}°)`,
    });
  };

  // Astronomical calculations
  const activeMethodObj =
    CALCULATION_METHODS.find((m) => m.id === calculationMethod) || CALCULATION_METHODS[0];

  const astroResult = useMemo(
    () =>
      computeAstronomicalPrayerTimes(
        lat,
        lng,
        utcOffsetHours,
        now,
        activeMethodObj.fajrAngle,
        activeMethodObj.ishaAngle
      ),
    [lat, lng, utcOffsetHours, now, activeMethodObj]
  );

  const effectiveTimings: PrayerTimings = useMemo(
    () => ({
      ...astroResult.timings,
      ...(apiTimingsOverride || {}),
    }),
    [astroResult.timings, apiTimingsOverride]
  );

  // Dual Hijri & Gregorian Calendar Computation
  const calendars = useMemo(() => {
    const base = computeLocationCalendars(
      now,
      utcOffsetHours,
      effectiveTimings.Maghrib,
      hijriOffsetDays,
      advanceHijriAtMaghrib,
      language
    );

    if (apiHijriOverride && hijriOffsetDays === 0 && !base.hijri.isPostMaghribRollover) {
      const mIdx = Math.max(0, Math.min(11, apiHijriOverride.monthNumber - 1));
      return {
        ...base,
        hijri: {
          ...base.hijri,
          day: apiHijriOverride.day,
          monthNumber: apiHijriOverride.monthNumber,
          monthName: HIJRI_MONTHS[mIdx],
          year: apiHijriOverride.year,
        },
      };
    }
    return base;
  }, [
    now,
    utcOffsetHours,
    effectiveTimings.Maghrib,
    hijriOffsetDays,
    advanceHijriAtMaghrib,
    language,
    apiHijriOverride,
  ]);

  // Qibla Bearing & Distance
  const qiblaData = useMemo(() => calculateQiblaAndDistance(lat, lng), [lat, lng]);

  // Celestial Bodies Azimuths
  const celestialBodies = useMemo(
    () => computeCelestialAzimuths(lat, lng, now),
    [lat, lng, now]
  );

  const activeCelestialBody =
    celestialBodies.find((b) => b.id === selectedCelestialBodyId) || celestialBodies[0];

  // Determine Next Prayer & Live Countdown
  const prayerSchedule = useMemo(() => {
    const list = [
      {
        id: 'Fajr',
        name: { ar: 'الفجر (الصبح الصادق)', en: 'Fajr (True Dawn)', fr: 'Fajr (Aube Vraie)' },
        time: effectiveTimings.Fajr,
        solarAngle: `-${activeMethodObj.fajrAngle}°`,
        phenomenon: {
          ar: 'بداية تشتت ضوء الشمس في طبقات الغلاف الجوي العليا بزاوية انخفاض تحت الأفق الشرقي',
          en: `Sun at -${activeMethodObj.fajrAngle}° below eastern horizon; first horizontal twilight glow`,
          fr: `Soleil à -${activeMethodObj.fajrAngle}° sous l’horizon est ; lueur de l’aube véritable`,
        },
      },
      {
        id: 'Sunrise',
        name: { ar: 'الشروق (طلوع الشمس)', en: 'Sunrise (Shuruq)', fr: 'Lever du Soleil (Chourouk)' },
        time: effectiveTimings.Sunrise,
        solarAngle: '-0.833°',
        phenomenon: {
          ar: 'ظهور الحافة العليا لقرص الشمس فوق الأفق الشرقي مع احتساب الانكسار الجوي (0.833°)',
          en: 'Upper limb of the solar disk crosses the eastern horizon accounting for atmospheric refraction',
          fr: 'Apparition du bord supérieur du disque solaire à l’horizon est',
        },
      },
      {
        id: 'Dhuhr',
        name: { ar: 'الظهر (زوال الشمس)', en: 'Dhuhr (Solar Transit)', fr: 'Dhuhr (Zénith / Méridien)' },
        time: effectiveTimings.Dhuhr,
        solarAngle: `${(90 - Math.abs(lat - astroResult.solarDeclination)).toFixed(1)}°`,
        phenomenon: {
          ar: 'عبور مركز الشمس خط الزوال السماوي المحلي (أعلى ارتفاع للشمس وأقصر ظل للشاخص)',
          en: 'Sun crosses the local celestial meridian (culmination) and begins descending westward',
          fr: 'Passage du Soleil au méridien céleste local et début de sa déclinaison vers l’ouest',
        },
      },
      {
        id: 'Asr',
        name: { ar: 'العصر (مقياس الظل)', en: 'Asr (Shadow Ratio)', fr: 'Asr (Ombre Méridienne)' },
        time: effectiveTimings.Asr,
        solarAngle: 'Shadow 1:1',
        phenomenon: {
          ar: 'بلوغ طول ظل كل شاخص مثله بعد إضافة ظل الزوال وفق المعادلة المثلثية الكروية',
          en: 'Shadow length of a vertical gnomon equals its height plus its meridian noon shadow',
          fr: 'La longueur de l’ombre d’un objet égale sa hauteur plus son ombre au zénith',
        },
      },
      {
        id: 'Maghrib',
        name: { ar: 'المغرب (غروب القرص)', en: 'Maghrib (Sunset)', fr: 'Maghrib (Coucher du Soleil)' },
        time: effectiveTimings.Maghrib,
        solarAngle: '-0.833°',
        phenomenon: {
          ar: 'اختفاء كامل قرص الشمس تحت الأفق الغربي وبداية اليوم الجديد في التقويم الهجري القمري',
          en: 'Upper solar limb sinks below the western horizon; marks the start of the new Hijri lunar date',
          fr: 'Disparition complète du disque solaire à l’ouest et début du nouveau jour hégirien',
        },
      },
      {
        id: 'Isha',
        name: { ar: 'العشاء (غيبوبة الشفق)', en: 'Isha (Nightfall)', fr: 'Isha (Nuit Astronomique)' },
        time: effectiveTimings.Isha,
        solarAngle: `-${activeMethodObj.ishaAngle}°`,
        phenomenon: {
          ar: 'احتجاب الشفق الأحمر/الأبيض تماماً ووصول الشمس لزاوية الظلام الفلكي الملائم لرصد المجرات',
          en: `Sun reaches -${activeMethodObj.ishaAngle}° below western horizon; sky reaches deep-sky darkness`,
          fr: `Soleil à -${activeMethodObj.ishaAngle}° sous l’horizon ouest ; obscurité propice à l’observation`,
        },
      },
    ];

    const toMin = (str: string) => {
      const [h, m] = str.split(':').map(Number);
      return (h || 0) * 60 + (m || 0);
    };

    const nowMin = calendars.currentLocalMinutes;
    let nextIdx = list.findIndex((p) => toMin(p.time) > nowMin);
    let minutesRemaining = 0;

    if (nextIdx === -1) {
      nextIdx = 0; // Tomorrow's Fajr
      minutesRemaining = 24 * 60 - nowMin + toMin(list[0].time);
    } else {
      minutesRemaining = toMin(list[nextIdx].time) - nowMin;
    }

    const remH = Math.floor(minutesRemaining / 60);
    const remM = minutesRemaining % 60;

    return {
      list,
      nextPrayer: list[nextIdx],
      remH,
      remM,
    };
  }, [effectiveTimings, activeMethodObj, lat, astroResult.solarDeclination, calendars.currentLocalMinutes]);

  // Angular difference between observer heading and Qibla
  const qiblaDelta = useMemo(() => {
    const diff = ((qiblaData.qiblaBearing - observerHeading + 540) % 360) - 180;
    return Number(diff.toFixed(1));
  }, [qiblaData.qiblaBearing, observerHeading]);

  const isQiblaAligned = Math.abs(qiblaDelta) <= 5;

  // Angular difference between Qibla and selected Celestial Body
  const celestialToQiblaDelta = useMemo(() => {
    const diff = ((qiblaData.qiblaBearing - activeCelestialBody.azimuthDeg + 540) % 360) - 180;
    return Number(diff.toFixed(1));
  }, [qiblaData.qiblaBearing, activeCelestialBody.azimuthDeg]);

  return (
    <section
      id="cosmic-prayer-times"
      className="space-y-10"
      aria-label={
        language === 'ar'
          ? 'مواقيت الصلاة الفلكية وبوصلة القبلة والتقويم الهجري والميلادي'
          : 'Cosmic Prayer Times, Dual Hijri-Gregorian Calendar & Qibla Compass'
      }
    >
      {/* ===================================================================== */}
      {/* 1. HEADER & LOCATION / OBSERVATORY SELECTOR                           */}
      {/* ===================================================================== */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#08152c] via-[#070d1f] to-[#111827] border border-cyan-500/30 p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-bold">
              <Compass className="w-4 h-4 text-amber-400" />
              <span>
                {language === 'ar'
                  ? 'علم الميقات الفلكي • التقويم الهجري والميلادي • بوصلة القبلة النجمية'
                  : language === 'fr'
                  ? 'Horaires de Prière Cosmiques • Calendrier Hégirien & Grégorien • Boussole Qibla'
                  : 'Cosmic Prayer Times • Dual Hijri-Gregorian Calendar • Celestial Qibla Compass'}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">
              {language === 'ar'
                ? 'مواقيت الصلاة الفلكية وبوصلة القبلة والأهلة'
                : language === 'fr'
                ? 'Horaires de Prière Astronomiques, Dates Hégirienne/Grégorienne & Boussole Qibla'
                : 'Cosmic Prayer Times, Hijri-Gregorian Calendar & Qibla Star Compass'}
            </h1>

            <p className="text-sm text-slate-300 leading-relaxed">
              {language === 'ar'
                ? 'حساب فلكي دقيق لمواقيت الصلاة بناءً على إحداثيات موقعك الجغرافي وزاوية ارتفاع الشمس، مع عرض مزدوج للتقويم الهجري القمري والميلادي الشمسي يتحدث تلقائياً، وبوصلة قبلة تفاعلية تربط اتجاه الكعبة المشرفة بمواقع الشمس والقمر والنجوم في السماء.'
                : language === 'fr'
                ? 'Calcul astronomique précis des heures de prière selon votre position, affichage dynamique simultané du calendrier Hégirien lunaire et Grégorien, et boussole Qibla céleste.'
                : 'Accurate location-based prayer timings, dynamically synchronized Hijri lunar and Gregorian solar calendars, and an interactive Prayer Compass aligning the Qibla with real-time celestial bodies.'}
            </p>
          </div>

          {/* Live GPS Button & Sync Badge */}
          <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-3 shrink-0">
            <button
              type="button"
              onClick={handleDetectUserLocation}
              className="flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-black text-xs shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
            >
              <Navigation className="w-4 h-4" />
              <span>
                {geoStatus === 'locating'
                  ? language === 'ar'
                    ? 'جاري تحديد موقعك الفلكي...'
                    : 'Detecting GPS Coordinates...'
                  : language === 'ar'
                  ? 'تحديد موقعي الحالي (GPS)'
                  : language === 'fr'
                  ? 'Utiliser ma position GPS'
                  : 'Use My Live Location (GPS)'}
              </span>
            </button>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-700/70 text-[11px] text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span className="font-bold text-cyan-200">{locationLabel[language]}</span>
              <span className="text-slate-400 font-mono">
                ({lat.toFixed(2)}°N, {lng.toFixed(2)}°E)
              </span>
            </div>
          </div>
        </div>

        {/* Preset Cities & Observatories Bar */}
        <div className="mt-6 pt-6 border-t border-slate-800/80 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span>
                {language === 'ar'
                  ? 'اختر مدينة أو مرصداً فلكياً لتحديث التوقيت والتاريخ الهجري والميلادي فوراً:'
                  : language === 'fr'
                  ? 'Sélectionnez une ville ou un observatoire pour actualiser le calendrier et la Qibla :'
                  : 'Select a city or observatory to dynamically update Hijri/Gregorian dates & prayer times:'}
              </span>
            </span>

            <span className="text-[11px] text-emerald-300 flex items-center gap-1.5 bg-emerald-950/50 border border-emerald-500/30 px-2.5 py-1 rounded-md">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>
                {apiSyncStatus === 'synced'
                  ? language === 'ar'
                    ? 'متصل ببيانات التقويم والمواقيت الفلكية الحية'
                    : 'Live Astronomical & Aladhan API Synced'
                  : language === 'ar'
                  ? 'المحرك الفلكي المدمج عالي الدقة نشط'
                  : 'Built-in High-Precision Ephemeris Active'}
              </span>
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {LOCATION_PRESETS.map((preset) => {
              const active = selectedPresetId === preset.id;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handleSelectPreset(preset.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    active
                      ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/25'
                      : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700/60'
                  }`}
                >
                  {preset.name[language]}
                </button>
              );
            })}
          </div>

          {/* Calculation Method & Custom Coordinates Controls */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-2">
            <div className="md:col-span-6">
              <label className="block text-[11px] font-bold text-slate-400 mb-1">
                {language === 'ar'
                  ? 'طريقة الحساب الفلكي وزوايا الفجر والعشاء:'
                  : language === 'fr'
                  ? 'Méthode de calcul astronomique :'
                  : 'Astronomical Calculation Method:'}
              </label>
              <select
                value={calculationMethod}
                onChange={(e) => setCalculationMethod(Number(e.target.value))}
                className="w-full rounded-xl bg-slate-900/90 border border-slate-700 px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
              >
                {CALCULATION_METHODS.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name[language]}
                  </option>
                ))}
              </select>
            </div>

            <form
              onSubmit={handleApplyCustomCoords}
              className="md:col-span-6 flex flex-wrap sm:flex-nowrap items-end gap-2"
            >
              <div className="w-1/2 sm:w-auto flex-1">
                <label className="block text-[11px] font-bold text-slate-400 mb-1">
                  {language === 'ar' ? 'خط العرض (Latitude):' : 'Latitude (°N):'}
                </label>
                <input
                  type="number"
                  step="0.0001"
                  value={customLatInput}
                  onChange={(e) => setCustomLatInput(e.target.value)}
                  className="w-full rounded-xl bg-slate-900/90 border border-slate-700 px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-cyan-400"
                />
              </div>
              <div className="w-1/2 sm:w-auto flex-1">
                <label className="block text-[11px] font-bold text-slate-400 mb-1">
                  {language === 'ar' ? 'خط الطول (Longitude):' : 'Longitude (°E):'}
                </label>
                <input
                  type="number"
                  step="0.0001"
                  value={customLngInput}
                  onChange={(e) => setCustomLngInput(e.target.value)}
                  className="w-full rounded-xl bg-slate-900/90 border border-slate-700 px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-cyan-400"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs transition-colors shrink-0 cursor-pointer"
              >
                {language === 'ar' ? 'تطبيق الإحداثيات' : 'Apply Coords'}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* 2. DUAL HIJRI & GREGORIAN CALENDAR PANEL (DYNAMIC BY USER LOCATION)   */}
      {/* ===================================================================== */}
      <div
        data-testid="dual-calendar-panel"
        className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch"
      >
        {/* HIJRI LUNAR CALENDAR CARD */}
        <div
          data-testid="hijri-date-card"
          className="lg:col-span-6 rounded-3xl p-6 sm:p-7 bg-gradient-to-br from-amber-950/40 via-[#0b132b] to-[#060a17] border border-amber-500/40 shadow-xl flex flex-col justify-between relative overflow-hidden"
        >
          <div className="space-y-4 relative z-10">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold">
                <Moon className="w-3.5 h-3.5 text-amber-400" />
                <span>
                  {language === 'ar'
                    ? 'التقويم الهجري القمري (حسب الموقع)'
                    : language === 'fr'
                    ? 'Calendrier Hégirien Lunaire (Selon le lieu)'
                    : 'Hijri Lunar Calendar (Location-Synchronized)'}
                </span>
              </div>

              {calendars.hijri.isPostMaghribRollover && (
                <span className="px-2.5 py-1 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-[11px] font-bold text-emerald-300">
                  {language === 'ar'
                    ? '🌙 دخل اليوم الهجري الجديد بعد غروب الشمس'
                    : '🌙 New Hijri Day Active (Post-Maghrib)'}
                </span>
              )}
            </div>

            {/* Prominent Hijri Date Display */}
            <div className="pt-1">
              <div className="text-xs font-semibold text-amber-200/80 mb-1">
                {calendars.hijri.weekdayName[language]}
              </div>
              <div
                data-testid="hijri-date-display"
                className="text-3xl sm:text-4xl font-black text-white tracking-tight flex flex-wrap items-baseline gap-2.5"
              >
                <span className="text-amber-400">{calendars.hijri.day}</span>
                <span>{calendars.hijri.monthName[language]}</span>
                <span className="text-amber-300">
                  {calendars.hijri.year} {calendars.hijri.designation}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-2">
                {language === 'ar'
                  ? `الشهر الهجري رقم ${calendars.hijri.monthNumber} • نسبة إضاءة القمر الليلة: ${calendars.hijri.moonIllumination}% (عمر القمر ${calendars.hijri.moonAgeDays} يوم)`
                  : language === 'fr'
                  ? `Mois hégirien n° ${calendars.hijri.monthNumber} • Illumination lunaire : ${calendars.hijri.moonIllumination}% (Âge : ${calendars.hijri.moonAgeDays} j)`
                  : `Hijri Month #${calendars.hijri.monthNumber} • Lunar Illumination: ${calendars.hijri.moonIllumination}% (Moon Age: ${calendars.hijri.moonAgeDays} days)`}
              </p>
            </div>
          </div>

          {/* Hijri Sighting Adjustment & Maghrib Rollover Toggle */}
          <div className="mt-6 pt-4 border-t border-amber-500/20 flex flex-wrap items-center justify-between gap-3 relative z-10">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-slate-300">
                {language === 'ar' ? 'تصحيح رؤية الهلال:' : 'Crescent Sighting Adj:'}
              </span>
              <div className="inline-flex rounded-lg bg-slate-900/90 p-0.5 border border-slate-700">
                {[-1, 0, 1].map((offset) => (
                  <button
                    key={offset}
                    type="button"
                    onClick={() => setHijriOffsetDays(offset)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-colors cursor-pointer ${
                      hijriOffsetDays === offset
                        ? 'bg-amber-500 text-slate-950'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    {offset > 0 ? `+${offset}` : offset === 0 ? (language === 'ar' ? 'تلقائي' : 'Auto') : offset}
                  </button>
                ))}
              </div>
            </div>

            <label className="flex items-center gap-2 text-[11px] text-slate-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={advanceHijriAtMaghrib}
                onChange={(e) => setAdvanceHijriAtMaghrib(e.target.checked)}
                className="rounded border-slate-600 text-amber-500 focus:ring-amber-500"
              />
              <span>
                {language === 'ar'
                  ? 'بداية اليوم الهجري عند غروب الشمس (المغرب)'
                  : 'Transition Hijri Day at Local Sunset (Maghrib)'}
              </span>
            </label>
          </div>
        </div>

        {/* GREGORIAN SOLAR CALENDAR & LOCAL OBSERVATORY CLOCK CARD */}
        <div
          data-testid="gregorian-date-card"
          className="lg:col-span-6 rounded-3xl p-6 sm:p-7 bg-gradient-to-br from-cyan-950/40 via-[#0b132b] to-[#060a17] border border-cyan-500/40 shadow-xl flex flex-col justify-between"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-xs font-bold">
                <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                <span>
                  {language === 'ar'
                    ? 'التقويم الميلادي الشمسي والتوقيت المحلي للموقع'
                    : language === 'fr'
                    ? 'Calendrier Grégorien Solaire & Heure Locale'
                    : 'Gregorian Solar Calendar & Location Solar Time'}
                </span>
              </div>

              <span className="px-2.5 py-1 rounded-lg bg-slate-900/90 border border-slate-700 text-[11px] font-mono text-cyan-300">
                UTC{utcOffsetHours >= 0 ? `+${utcOffsetHours}` : utcOffsetHours}
              </span>
            </div>

            {/* Prominent Gregorian Date Display */}
            <div className="pt-1 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <div className="text-xs font-semibold text-cyan-200/80 mb-1">
                  {calendars.gregorian.weekdayName[language]}
                </div>
                <div
                  data-testid="gregorian-date-display"
                  className="text-2xl sm:text-3xl font-black text-white tracking-tight"
                >
                  {calendars.gregorian.day} {calendars.gregorian.monthName[language]}{' '}
                  <span className="text-cyan-400">{calendars.gregorian.year}</span>
                </div>
                <p className="text-xs text-slate-300 mt-2">
                  {language === 'ar'
                    ? `اليوم اليولياني الفلكي (JD): ${calendars.gregorian.julianDay} • ميل الشمس: ${astroResult.solarDeclination}°`
                    : language === 'fr'
                    ? `Jour Julien (JD) : ${calendars.gregorian.julianDay} • Déclinaison solaire : ${astroResult.solarDeclination}°`
                    : `Julian Day (JD): ${calendars.gregorian.julianDay} • Solar Declination: ${astroResult.solarDeclination}°`}
                </p>
              </div>

              {/* Live Location Clock */}
              <div className="px-4 py-3 rounded-2xl bg-slate-950/90 border border-cyan-500/30 text-center shrink-0">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                  {language === 'ar' ? 'التوقيت المحلي في المرصد' : 'Local Observatory Time'}
                </div>
                <div className="text-2xl font-mono font-black text-cyan-300">
                  {calendars.gregorian.localTimeStr}
                </div>
              </div>
            </div>
          </div>

          {/* Next Prayer Countdown Bar */}
          <div className="mt-6 pt-4 border-t border-cyan-500/20 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs">
              <Clock className="w-4 h-4 text-amber-400" />
              <span className="text-slate-300">
                {language === 'ar' ? 'الصلاة القادمة:' : 'Next Prayer:'}
              </span>
              <span className="font-black text-white">
                {prayerSchedule.nextPrayer.name[language]} ({prayerSchedule.nextPrayer.time})
              </span>
            </div>

            <div className="px-3 py-1 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold">
              {language === 'ar'
                ? `متبقي ${prayerSchedule.remH} س و ${prayerSchedule.remM} د`
                : `In ${prayerSchedule.remH}h ${prayerSchedule.remM}m`}
            </div>
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* 3. MAIN GRID: PRAYER TIMINGS CARDS + INTERACTIVE PRAYER COMPASS       */}
      {/* ===================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN (7 cols): ASTRONOMICAL PRAYER TIMES & NIGHT OBSERVATION */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-3xl bg-slate-900/70 border border-slate-800 p-6 sm:p-7 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-xl font-black text-white flex items-center gap-2">
                  <Sun className="w-5 h-5 text-amber-400" />
                  <span>
                    {language === 'ar'
                      ? 'مواقيت الصلاة والظواهر الشمسية المرتبطة بها'
                      : language === 'fr'
                      ? 'Horaires de Prière & Phénomènes Solaires'
                      : 'Accurate Prayer Timings & Solar Horizon Positions'}
                  </span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  {language === 'ar'
                    ? `محسوبة بدقة لموقع: ${locationLabel.ar} • معادلة الزمان: ${astroResult.equationOfTimeMin} دقيقة`
                    : `Calculated for ${locationLabel.en} • Equation of Time: ${astroResult.equationOfTimeMin} min`}
                </p>
              </div>
            </div>

            {/* 6 Daily Prayer / Solar Milestones */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {prayerSchedule.list.map((item) => {
                const isNext = prayerSchedule.nextPrayer.id === item.id;
                return (
                  <div
                    key={item.id}
                    data-testid={`prayer-card-${item.id}`}
                    className={`rounded-2xl p-4 border transition-all ${
                      isNext
                        ? 'bg-gradient-to-br from-amber-950/50 to-slate-900 border-amber-400/70 shadow-lg shadow-amber-500/10'
                        : 'bg-slate-950/70 border-slate-800/90 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div>
                        <span className="text-sm font-black text-white block">
                          {item.name[language]}
                        </span>
                        <span className="text-[11px] font-mono text-cyan-400">
                          {language === 'ar' ? 'زاوية الشمس: ' : 'Solar Alt: '}
                          {item.solarAngle}
                        </span>
                      </div>

                      <div className="text-right">
                        <span
                          className={`text-2xl font-mono font-black ${
                            isNext ? 'text-amber-300' : 'text-white'
                          }`}
                        >
                          {item.time}
                        </span>
                        {isNext && (
                          <span className="block text-[10px] font-bold text-amber-400 uppercase">
                            {language === 'ar' ? 'الميقات القادم' : 'Next'}
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-300 leading-relaxed border-t border-slate-800/80 pt-2">
                      {item.phenomenon[language]}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Deep-Sky Observation & Last Third of the Night Card */}
            <div className="rounded-2xl p-4 bg-gradient-to-r from-indigo-950/60 via-slate-900 to-cyan-950/50 border border-indigo-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-300">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  <span>
                    {language === 'ar'
                      ? 'ميقات الثلث الأخير من الليل وأفضل وقت للرصد الفلكي العميق'
                      : 'Last Third of the Night & Optimal Deep-Sky Stargazing Window'}
                  </span>
                </div>
                <p className="text-xs text-slate-300">
                  {language === 'ar'
                    ? 'أصفى ساعات الليل خلوّاً من التلوث الضوئي الشفقي للتأمل والقيام ورصد المجرات والسدم الخافتة.'
                    : 'Peak atmospheric transparency after astronomical twilight for Tahajjud reflection and deep-sky observation.'}
                </p>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <div className="text-center px-3 py-2 rounded-xl bg-slate-950/80 border border-indigo-500/30">
                  <span className="block text-[10px] text-slate-400">
                    {language === 'ar' ? 'منتصف الليل الشرعي' : 'Solar Midnight'}
                  </span>
                  <span className="text-sm font-mono font-black text-indigo-200">
                    {effectiveTimings.Midnight}
                  </span>
                </div>
                <div className="text-center px-3 py-2 rounded-xl bg-slate-950/80 border border-amber-500/40">
                  <span className="block text-[10px] text-amber-300">
                    {language === 'ar' ? 'الثلث الأخير' : 'Last Third'}
                  </span>
                  <span className="text-sm font-mono font-black text-amber-300">
                    {effectiveTimings.LastThird}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* QURANIC & SCIENTIFIC CONTEMPLATION ON COSMIC TIMEKEEPING */}
          <div className="rounded-3xl bg-gradient-to-br from-amber-950/25 via-slate-900/90 to-slate-950 border border-amber-500/30 p-6 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider">
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>
                {language === 'ar'
                  ? 'الارتباط الوثيق بين الآيات القرآنية وحركة الأجرام والمواقيت'
                  : 'Quranic Reflections on Celestial Timekeeping & Stellar Navigation'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-amber-500/20 space-y-2">
                <p className="text-base font-bold text-amber-200 leading-relaxed font-serif">
                  ﴿ يَسْأَلُونَكَ عَنِ الْأَهِلَّةِ ۖ قُلْ هِيَ مَوَاقِيتُ لِلنَّاسِ وَالْحَجِّ ﴾
                </p>
                <div className="text-[11px] font-bold text-amber-400">
                  {language === 'ar' ? 'سورة البقرة - الآية 189' : 'Surah Al-Baqarah - Ayah 189'}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {language === 'ar'
                    ? 'بيان رباني لوظيفة الأطوار القمرية كميقات كوني عالمي يضبط الشهور الهجرية والمواسم التعبدية بدقة بصرية وفلكية.'
                    : 'Highlights the lunar phases (Ahillah) as universal visual and astronomical timekeepers for humanity.'}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/80 border border-cyan-500/20 space-y-2">
                <p className="text-base font-bold text-cyan-200 leading-relaxed font-serif">
                  ﴿ وَهُوَ الَّذِي جَعَلَ لَكُمُ النُّجُومَ لِتَهْتَدُوا بِهَا فِي ظُلُمَاتِ الْبَرِّ وَالْبَحْرِ ﴾
                </p>
                <div className="text-[11px] font-bold text-cyan-400">
                  {language === 'ar' ? 'سورة الأنعام - الآية 97' : "Surah Al-An'am - Ayah 97"}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {language === 'ar'
                    ? 'أسس المسلمون علم السمت والميقات للاهتداء بمطالع النجوم (كالجدي والشعرى وسهيل) في تحديد القبلة براً وبحراً.'
                    : 'Inspired generations of astronomers to chart stellar azimuths to determine the Qibla while observing the night sky.'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (5 cols): INTERACTIVE PRAYER COMPASS & CELESTIAL QIBLA FINDER */}
        <div
          data-testid="prayer-compass-panel"
          className="lg:col-span-5 rounded-3xl bg-gradient-to-b from-[#0a1329] to-[#050914] border border-cyan-500/40 p-6 sm:p-7 shadow-2xl space-y-6"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 block mb-1">
                {language === 'ar'
                  ? 'بوصلة القبلة والأجرام السماوية (Prayer Compass)'
                  : 'Interactive Qibla & Star Azimuth Prayer Compass'}
              </span>
              <h2 className="text-xl font-black text-white">
                {language === 'ar'
                  ? 'بوصلة القبلة الفلكية أثناء رصد السماء'
                  : language === 'fr'
                  ? 'Boussole de Prière (Qibla) & Repères Célestes'
                  : 'Prayer Compass: Find the Qibla via Celestial Bodies'}
              </h2>
            </div>

            <div className="text-end shrink-0">
              <span className="text-[10px] text-slate-400 block">
                {language === 'ar' ? 'زاوية القبلة (السمت)' : 'Qibla Azimuth'}
              </span>
              <span
                data-testid="qibla-bearing-value"
                className="text-xl font-mono font-black text-amber-400"
              >
                {qiblaData.qiblaBearing}°
              </span>
            </div>
          </div>

          {/* INTERACTIVE SVG COMPASS */}
          <div className="relative flex flex-col items-center justify-center py-2">
            <svg
              viewBox="0 0 320 320"
              className="w-64 h-64 sm:w-72 sm:h-72 select-none drop-shadow-[0_0_25px_rgba(6,182,212,0.18)]"
              role="img"
              aria-label="Interactive Qibla and Celestial Bodies Compass"
            >
              <defs>
                <radialGradient id="compassBg" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#0f1f42" />
                  <stop offset="70%" stopColor="#081026" />
                  <stop offset="100%" stopColor="#040814" />
                </radialGradient>
              </defs>

              {/* Outer Fixed Frame Indicator (Observer's Forward Line of Sight at Top) */}
              <polygon points="160,4 154,16 166,16" fill="#22d3ee" />

              {/* Rotating Compass Dial according to Observer Heading */}
              <g transform={`rotate(${-observerHeading}, 160, 160)`}>
                {/* Dial Circle */}
                <circle
                  cx="160"
                  cy="160"
                  r="136"
                  fill="url(#compassBg)"
                  stroke={isQiblaAligned ? '#10b981' : '#1e3a5f'}
                  strokeWidth={isQiblaAligned ? '3.5' : '2'}
                />
                <circle
                  cx="160"
                  cy="160"
                  r="105"
                  fill="none"
                  stroke="#1e293b"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                <circle cx="160" cy="160" r="68" fill="none" stroke="#1e293b" strokeWidth="1" />

                {/* Degree Ticks every 15 degrees */}
                {Array.from({ length: 24 }).map((_, idx) => {
                  const deg = idx * 15;
                  const isMajor = deg % 90 === 0;
                  return (
                    <g key={deg} transform={`rotate(${deg}, 160, 160)`}>
                      <line
                        x1="160"
                        y1="24"
                        x2="160"
                        y2={isMajor ? '36' : '30'}
                        stroke={isMajor ? '#38bdf8' : '#475569'}
                        strokeWidth={isMajor ? '2' : '1'}
                      />
                    </g>
                  );
                })}

                {/* Cardinal Labels */}
                <text
                  x="160"
                  y="50"
                  textAnchor="middle"
                  fill="#38bdf8"
                  fontSize="13"
                  fontWeight="900"
                >
                  N • ش
                </text>
                <text
                  x="272"
                  y="164"
                  textAnchor="middle"
                  fill="#94a3b8"
                  fontSize="12"
                  fontWeight="700"
                >
                  E • ق
                </text>
                <text
                  x="160"
                  y="280"
                  textAnchor="middle"
                  fill="#94a3b8"
                  fontSize="12"
                  fontWeight="700"
                >
                  S • ج
                </text>
                <text
                  x="48"
                  y="164"
                  textAnchor="middle"
                  fill="#94a3b8"
                  fontSize="12"
                  fontWeight="700"
                >
                  W • غ
                </text>

                {/* Celestial Bodies plotted on the Azimuth Ring */}
                {celestialBodies.map((body) => {
                  const isSelected = body.id === activeCelestialBody.id;
                  const rad = ((body.azimuthDeg - 90) * Math.PI) / 180;
                  const r = 105;
                  const cx = 160 + r * Math.cos(rad);
                  const cy = 160 + r * Math.sin(rad);

                  return (
                    <g
                      key={body.id}
                      onClick={() => setSelectedCelestialBodyId(body.id)}
                      className="cursor-pointer"
                    >
                      {isSelected && (
                        <line
                          x1="160"
                          y1="160"
                          x2={cx}
                          y2={cy}
                          stroke={body.color}
                          strokeWidth="1.5"
                          strokeDasharray="3 3"
                          opacity="0.8"
                        />
                      )}
                      <circle
                        cx={cx}
                        cy={cy}
                        r={isSelected ? '13' : '9'}
                        fill="#091326"
                        stroke={body.color}
                        strokeWidth={isSelected ? '2.5' : '1.5'}
                      />
                      <text
                        x={cx}
                        y={cy + 4}
                        textAnchor="middle"
                        fontSize={isSelected ? '12' : '9'}
                      >
                        {body.symbol}
                      </text>
                    </g>
                  );
                })}

                {/* QIBLA VECTOR & KAABA ICON */}
                <g transform={`rotate(${qiblaData.qiblaBearing}, 160, 160)`}>
                  <line
                    x1="160"
                    y1="160"
                    x2="160"
                    y2="36"
                    stroke="#f59e0b"
                    strokeWidth="3"
                  />
                  <polygon points="160,26 153,42 167,42" fill="#f59e0b" />
                  {/* Kaaba Emblem */}
                  <rect
                    x="151"
                    y="44"
                    width="18"
                    height="18"
                    rx="3"
                    fill="#0f172a"
                    stroke="#fbbf24"
                    strokeWidth="2"
                  />
                  <line x1="151" y1="50" x2="169" y2="50" stroke="#fbbf24" strokeWidth="2" />
                </g>
              </g>

              {/* Center Hub */}
              <circle cx="160" cy="160" r="18" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
              <circle
                cx="160"
                cy="160"
                r="5"
                fill={isQiblaAligned ? '#10b981' : '#f59e0b'}
              />
            </svg>

            {/* Alignment Status Pill */}
            <div
              className={`mt-3 px-4 py-1.5 rounded-full text-xs font-bold border transition-all ${
                isQiblaAligned
                  ? 'bg-emerald-950/90 border-emerald-400 text-emerald-300 shadow-lg shadow-emerald-500/20'
                  : 'bg-slate-900/90 border-slate-700 text-slate-300'
              }`}
            >
              {isQiblaAligned
                ? language === 'ar'
                  ? '✓ اتجاهك الآن مطابق تماماً لسمت القبلة (الكعبة المشرفة)'
                  : '✓ Aligned with the Qibla (Kaaba Direction)!'
                : language === 'ar'
                ? `انحراف عن القبلة: ${Math.abs(qiblaDelta)}° ${
                    qiblaDelta > 0 ? 'إلى اليمين (شرقاً)' : 'إلى اليسار (غرباً)'
                  }`
                : `Turn ${Math.abs(qiblaDelta)}° ${
                    qiblaDelta > 0 ? 'Clockwise (Right)' : 'Counter-Clockwise (Left)'
                  } to face Qibla`}
            </div>
          </div>

          {/* Observer Heading Rotation Control */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-300 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                <span>
                  {language === 'ar'
                    ? 'زاوية توجيه الراصد (تدوير البوصلة):'
                    : 'Observer Heading Orientation:'}
                </span>
              </span>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-cyan-300">{observerHeading}°</span>
                <button
                  type="button"
                  onClick={() => setObserverHeading(Math.round(qiblaData.qiblaBearing))}
                  className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-[11px] font-bold transition-colors cursor-pointer"
                >
                  {language === 'ar' ? 'توجيه نحو القبلة' : 'Align to Qibla'}
                </button>
              </div>
            </div>

            <input
              type="range"
              min="0"
              max="359"
              value={observerHeading}
              onChange={(e) => setObserverHeading(Number(e.target.value))}
              aria-label="Observer Heading Slider"
              className="w-full accent-amber-400 cursor-pointer"
            />

            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
              <span>
                {language === 'ar'
                  ? `المسافة الكروية لمكة: ${qiblaData.distanceKm.toLocaleString()} كم`
                  : `Distance to Makkah: ${qiblaData.distanceKm.toLocaleString()} km`}
              </span>
              <span>
                {language === 'ar'
                  ? `سمت الكعبة: ${qiblaData.qiblaBearing}°`
                  : `Kaaba Bearing: ${qiblaData.qiblaBearing}°`}
              </span>
            </div>
          </div>

          {/* CELESTIAL REFERENCE SELECTOR: FIND QIBLA USING STARS, SUN & MOON */}
          <div className="space-y-3 pt-2 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-amber-400" />
                <span>
                  {language === 'ar'
                    ? 'الاهتداء بالأجرام السماوية نحو القبلة الآن:'
                    : 'Find Qibla Relative to Celestial Bodies:'}
                </span>
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {celestialBodies.map((body) => {
                const active = body.id === activeCelestialBody.id;
                return (
                  <button
                    key={body.id}
                    type="button"
                    onClick={() => setSelectedCelestialBodyId(body.id)}
                    className={`p-2 rounded-xl border text-start transition-all cursor-pointer ${
                      active
                        ? 'bg-cyan-950/80 border-cyan-400 text-white'
                        : 'bg-slate-900/70 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{body.symbol}</span>
                      <span
                        className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${
                          body.isAboveHorizon
                            ? 'bg-emerald-950 text-emerald-300'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {body.isAboveHorizon
                          ? language === 'ar'
                            ? 'فوق الأفق'
                            : 'Visible'
                          : language === 'ar'
                          ? 'تحت الأفق'
                          : 'Below'}
                      </span>
                    </div>
                    <div className="text-[11px] font-bold truncate mt-1">
                      {body.name[language]}
                    </div>
                    <div className="text-[10px] font-mono text-cyan-300">
                      Az: {body.azimuthDeg}°
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Celestial Guide Details */}
            <div className="p-3.5 rounded-2xl bg-slate-950/90 border border-cyan-500/30 space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold text-cyan-300">
                <span>
                  {activeCelestialBody.symbol} {activeCelestialBody.name[language]}
                </span>
                <span className="font-mono">
                  {language === 'ar' ? 'السمت: ' : 'Azimuth: '}
                  {activeCelestialBody.azimuthDeg}° |{' '}
                  {language === 'ar' ? 'الارتفاع: ' : 'Alt: '}
                  {activeCelestialBody.altitudeDeg}°
                </span>
              </div>
              <p className="text-xs text-amber-200 font-semibold">
                {language === 'ar'
                  ? `إذا واجهت ${activeCelestialBody.name.ar} في السماء، فإن القبلة تقع على زاوية ${Math.abs(
                      celestialToQiblaDelta
                    )}° إلى ${celestialToQiblaDelta >= 0 ? 'يمينك' : 'يسارك'}.`
                  : `When facing ${activeCelestialBody.name.en}, the Qibla is ${Math.abs(
                      celestialToQiblaDelta
                    )}° to your ${celestialToQiblaDelta >= 0 ? 'right (clockwise)' : 'left (counter-clockwise)'}.`}
              </p>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {activeCelestialBody.note[language]}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
