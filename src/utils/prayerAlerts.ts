import { Language } from '../types/cosmic';

export type ObligatoryPrayerId = 'Fajr' | 'Dhuhr' | 'Asr' | 'Maghrib' | 'Isha';
export type AlertSoundTone = 'adhan-tone' | 'chime' | 'soft-bell';

export interface PrayerAlertSettings {
  enabled: boolean;
  minutesBefore: number;
  browserNotification: boolean;
  soundTone: AlertSoundTone;
  volume: number; // 0.1 to 1.0
  prayers: Record<ObligatoryPrayerId, boolean>;
}

export interface PrayerLocationConfig {
  presetId: string;
  lat: number;
  lng: number;
  utcOffsetHours: number;
  calculationMethod: number;
  locationLabel: { ar: string; en: string; fr: string };
  cachedDateKey?: string;
  cachedTimings?: Partial<Record<ObligatoryPrayerId, string>>;
}

export const PRAYER_ALERT_SETTINGS_KEY = 'cosmic_prayer_alert_settings_v1';
export const PRAYER_LOCATION_CONFIG_KEY = 'cosmic_prayer_location_v1';
export const PRAYER_ALERT_FIRED_KEY = 'cosmic_prayer_alert_fired_v1';

export const PRAYER_ALERTS_UPDATED_EVENT = 'cosmic-prayer-alerts-updated';
export const PRAYER_LOCATION_UPDATED_EVENT = 'cosmic-prayer-location-updated';

export const DEFAULT_PRAYER_ALERT_SETTINGS: PrayerAlertSettings = {
  enabled: true,
  minutesBefore: 15,
  browserNotification: true,
  soundTone: 'adhan-tone',
  volume: 0.75,
  prayers: {
    Fajr: true,
    Dhuhr: true,
    Asr: true,
    Maghrib: true,
    Isha: true,
  },
};

export const DEFAULT_PRAYER_LOCATION_CONFIG: PrayerLocationConfig = {
  presetId: 'makkah',
  lat: 21.4225,
  lng: 39.8262,
  utcOffsetHours: 3,
  calculationMethod: 4,
  locationLabel: {
    ar: 'مكة المكرمة، المملكة العربية السعودية',
    en: 'Makkah Al-Mukarramah, Saudi Arabia',
    fr: 'La Mecque, Arabie Saoudite',
  },
};

export const OBLIGATORY_PRAYER_NAMES: Record<
  ObligatoryPrayerId,
  { ar: string; en: string; fr: string }
> = {
  Fajr: { ar: 'صلاة الفجر', en: 'Fajr Prayer', fr: 'Prière du Fajr' },
  Dhuhr: { ar: 'صلاة الظهر', en: 'Dhuhr Prayer', fr: 'Prière du Dhuhr' },
  Asr: { ar: 'صلاة العصر', en: 'Asr Prayer', fr: 'Prière de l’Asr' },
  Maghrib: { ar: 'صلاة المغرب', en: 'Maghrib Prayer', fr: 'Prière du Maghrib' },
  Isha: { ar: 'صلاة العشاء', en: 'Isha Prayer', fr: 'Prière de l’Isha' },
};

const METHOD_ANGLES: Record<number, { fajr: number; isha: number }> = {
  4: { fajr: 18.5, isha: 17 },
  3: { fajr: 18, isha: 17 },
  5: { fajr: 19.5, isha: 17.5 },
  2: { fajr: 15, isha: 15 },
  12: { fajr: 12, isha: 12 },
  13: { fajr: 18, isha: 17 },
  16: { fajr: 18.2, isha: 18.2 },
};

export function loadPrayerAlertSettings(): PrayerAlertSettings {
  if (typeof window === 'undefined') return DEFAULT_PRAYER_ALERT_SETTINGS;
  try {
    const raw = localStorage.getItem(PRAYER_ALERT_SETTINGS_KEY);
    if (!raw) return DEFAULT_PRAYER_ALERT_SETTINGS;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_PRAYER_ALERT_SETTINGS,
      ...parsed,
      prayers: {
        ...DEFAULT_PRAYER_ALERT_SETTINGS.prayers,
        ...(parsed?.prayers || {}),
      },
    };
  } catch {
    return DEFAULT_PRAYER_ALERT_SETTINGS;
  }
}

export function savePrayerAlertSettings(settings: PrayerAlertSettings): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(PRAYER_ALERT_SETTINGS_KEY, JSON.stringify(settings));
    window.dispatchEvent(new CustomEvent(PRAYER_ALERTS_UPDATED_EVENT, { detail: settings }));
  } catch {
    // Ignore storage quota errors
  }
}

export function loadPrayerLocationConfig(): PrayerLocationConfig {
  if (typeof window === 'undefined') return DEFAULT_PRAYER_LOCATION_CONFIG;
  try {
    const raw = localStorage.getItem(PRAYER_LOCATION_CONFIG_KEY);
    if (!raw) return DEFAULT_PRAYER_LOCATION_CONFIG;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_PRAYER_LOCATION_CONFIG,
      ...parsed,
      locationLabel: {
        ...DEFAULT_PRAYER_LOCATION_CONFIG.locationLabel,
        ...(parsed?.locationLabel || {}),
      },
    };
  } catch {
    return DEFAULT_PRAYER_LOCATION_CONFIG;
  }
}

export function savePrayerLocationConfig(config: PrayerLocationConfig): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(PRAYER_LOCATION_CONFIG_KEY, JSON.stringify(config));
    window.dispatchEvent(new CustomEvent(PRAYER_LOCATION_UPDATED_EVENT, { detail: config }));
  } catch {
    // Ignore storage quota errors
  }
}

/**
 * Astronomical calculation of the 5 obligatory prayer times for a given coordinate & date
 */
export function computeObligatoryPrayerTimings(
  loc: PrayerLocationConfig,
  now: Date
): {
  dateKey: string;
  currentLocalMinutes: number;
  timings: Record<ObligatoryPrayerId, string>;
} {
  const d2r = (d: number) => (d * Math.PI) / 180;
  const r2d = (r: number) => (r * 180) / Math.PI;
  const sinD = (d: number) => Math.sin(d2r(d));
  const cosD = (d: number) => Math.cos(d2r(d));
  const tanD = (d: number) => Math.tan(d2r(d));
  const asinD = (x: number) => r2d(Math.asin(Math.max(-1, Math.min(1, x))));
  const acosD = (x: number) => r2d(Math.acos(Math.max(-1, Math.min(1, x))));
  const atan2D = (y: number, x: number) => r2d(Math.atan2(y, x));

  const localMs = now.getTime() + loc.utcOffsetHours * 3600000;
  const localDate = new Date(localMs);
  const year = localDate.getUTCFullYear();
  const month = localDate.getUTCMonth() + 1;
  const day = localDate.getUTCDate();
  const dateKey = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  const currentLocalMinutes = localDate.getUTCHours() * 60 + localDate.getUTCMinutes();

  // Prefer live synced API timings for today if coordinates match
  if (
    loc.cachedDateKey === dateKey &&
    loc.cachedTimings?.Fajr &&
    loc.cachedTimings?.Dhuhr &&
    loc.cachedTimings?.Asr &&
    loc.cachedTimings?.Maghrib &&
    loc.cachedTimings?.Isha
  ) {
    return {
      dateKey,
      currentLocalMinutes,
      timings: {
        Fajr: loc.cachedTimings.Fajr,
        Dhuhr: loc.cachedTimings.Dhuhr,
        Asr: loc.cachedTimings.Asr,
        Maghrib: loc.cachedTimings.Maghrib,
        Isha: loc.cachedTimings.Isha,
      },
    };
  }

  const angles = METHOD_ANGLES[loc.calculationMethod] || { fajr: 18.5, isha: 17 };
  const noonUtc = Date.UTC(year, month - 1, day, 12, 0, 0);
  const jd = noonUtc / 86400000 + 2440587.5;
  const d = jd - 2451545.0;

  const g = (357.529 + 0.98560028 * d) % 360;
  const q = (280.459 + 0.98564736 * d) % 360;
  const L = (q + 1.915 * sinD(g) + 0.02 * sinD(2 * g) + 360) % 360;
  const e = 23.439 - 0.00000036 * d;
  const RA = (atan2D(cosD(e) * sinD(L), cosD(L)) + 360) % 360;
  const decl = asinD(sinD(e) * sinD(L));

  let eqtDeg = q - RA;
  if (eqtDeg > 180) eqtDeg -= 360;
  if (eqtDeg < -180) eqtDeg += 360;
  const eqtHours = eqtDeg / 15;
  const dhuhrHours = 12 + loc.utcOffsetHours - loc.lng / 15 - eqtHours;

  const hourAngleForAltitude = (alpha: number): number => {
    const num = sinD(alpha) - sinD(loc.lat) * sinD(decl);
    const den = cosD(loc.lat) * cosD(decl);
    const ratio = num / den;
    if (ratio > 1) return 0;
    if (ratio < -1) return 12;
    return acosD(ratio) / 15;
  };

  const shadowRatio = 1 + tanD(Math.abs(loc.lat - decl));
  const asrAltitude = r2d(Math.atan(1 / shadowRatio));

  const formatHours = (h: number): string => {
    const norm = ((h % 24) + 24) % 24;
    const totalMinutes = Math.round(norm * 60);
    const hh = Math.floor(totalMinutes / 60) % 24;
    const mm = totalMinutes % 60;
    return `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`;
  };

  return {
    dateKey,
    currentLocalMinutes,
    timings: {
      Fajr: formatHours(dhuhrHours - hourAngleForAltitude(-angles.fajr)),
      Dhuhr: formatHours(dhuhrHours + 2 / 60),
      Asr: formatHours(dhuhrHours + hourAngleForAltitude(asrAltitude)),
      Maghrib: formatHours(dhuhrHours + hourAngleForAltitude(-0.833)),
      Isha: formatHours(dhuhrHours + hourAngleForAltitude(-angles.isha)),
    },
  };
}

let sharedAudioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  if (!AudioCtx) return null;
  if (!sharedAudioCtx) {
    sharedAudioCtx = new AudioCtx();
  }
  if (sharedAudioCtx.state === 'suspended') {
    sharedAudioCtx.resume().catch(() => {});
  }
  return sharedAudioCtx;
}

/**
 * Synthesizes a clear, respectful melodic audio alert via Web Audio API
 */
export function playPrayerAlertSound(tone: AlertSoundTone = 'adhan-tone', volume = 0.75): boolean {
  try {
    const ctx = getAudioContext();
    if (!ctx) return false;

    const safeVol = Math.max(0.05, Math.min(1, volume));
    const now = ctx.currentTime;

    // Hijaz / peaceful harmonic note sequences (Hz, startOffsetSec, durationSec)
    const sequences: Record<AlertSoundTone, Array<[number, number, number]>> = {
      'adhan-tone': [
        [293.66, 0.0, 0.55], // D4
        [349.23, 0.45, 0.5], // F4
        [369.99, 0.9, 0.6], // F#4 (Hijaz interval)
        [440.0, 1.45, 0.85], // A4
        [392.0, 2.2, 0.5], // G4
        [369.99, 2.65, 0.55], // F#4
        [293.66, 3.15, 1.1], // D4 resolution
      ],
      chime: [
        [523.25, 0.0, 0.7], // C5
        [659.25, 0.35, 0.7], // E5
        [783.99, 0.7, 0.9], // G5
        [1046.5, 1.1, 1.3], // C6
      ],
      'soft-bell': [
        [587.33, 0.0, 0.85], // D5
        [880.0, 0.5, 1.1], // A5
        [587.33, 1.3, 0.95], // D5
      ],
    };

    const notes = sequences[tone] || sequences['adhan-tone'];

    notes.forEach(([freq, offset, dur]) => {
      const osc = ctx.createOscillator();
      const subOsc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = tone === 'adhan-tone' ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq, now + offset);

      // Gentle harmonic overtone for warm acoustic richness
      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(freq * 2, now + offset);

      const subGain = ctx.createGain();
      subGain.gain.setValueAtTime(0.18, now + offset);

      gain.gain.setValueAtTime(0.0001, now + offset);
      gain.gain.exponentialRampToValueAtTime(safeVol * 0.45, now + offset + 0.06);
      gain.gain.exponentialRampToValueAtTime(safeVol * 0.25, now + offset + dur * 0.55);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + offset + dur);

      osc.connect(gain);
      subOsc.connect(subGain);
      subGain.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + offset);
      subOsc.start(now + offset);
      osc.stop(now + offset + dur + 0.05);
      subOsc.stop(now + offset + dur + 0.05);
    });

    return true;
  } catch {
    return false;
  }
}

export async function requestBrowserNotificationPermission(): Promise<'granted' | 'denied' | 'default' | 'unsupported'> {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return 'unsupported';
  }
  if (Notification.permission === 'granted') return 'granted';
  if (Notification.permission === 'denied') return 'denied';
  try {
    const result = await Notification.requestPermission();
    return result;
  } catch {
    return Notification.permission;
  }
}

export function getBrowserNotificationStatus(): 'granted' | 'denied' | 'default' | 'unsupported' {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return 'unsupported';
  }
  return Notification.permission;
}

export function showBrowserPrayerNotification(
  prayerId: ObligatoryPrayerId,
  prayerTime: string,
  minutesBefore: number,
  language: Language
): void {
  if (typeof window === 'undefined' || !('Notification' in window)) return;
  if (Notification.permission !== 'granted') return;

  const pName = OBLIGATORY_PRAYER_NAMES[prayerId][language];
  const title =
    language === 'ar'
      ? `تنبيه قبل ${pName}`
      : language === 'fr'
      ? `Rappel avant ${pName}`
      : `Upcoming: ${pName}`;

  const body =
    language === 'ar'
      ? `متبقي ${minutesBefore} دقيقة على أذان ${pName} (${prayerTime})`
      : language === 'fr'
      ? `Il reste ${minutesBefore} minutes avant ${pName} (${prayerTime})`
      : `${minutesBefore} minutes remaining until ${pName} (${prayerTime})`;

  try {
    new Notification(title, {
      body,
      icon: '/favicon.ico',
      tag: `prayer-alert-${prayerId}`,
    });
  } catch {
    // Some browsers disallow new Notification() without ServiceWorkerRegistration
  }
}

function getLocalDateKey(utcOffsetHours: number): string {
  const localDate = new Date(Date.now() + utcOffsetHours * 3600000);
  return `${localDate.getUTCFullYear()}-${String(localDate.getUTCMonth() + 1).padStart(2, '0')}-${String(localDate.getUTCDate()).padStart(2, '0')}`;
}

async function fetchSyncedTimingsForLocation(
  lat: number,
  lng: number,
  method: number
): Promise<Partial<Record<ObligatoryPrayerId, string>> | undefined> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);
    const res = await fetch(`/api/prayer-times?latitude=${lat}&longitude=${lng}&method=${method}`, {
      headers: { Accept: 'application/json' },
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    if (!res.ok) return undefined;
    const json = await res.json();
    const timings = json?.data?.timings;
    if (!timings) return undefined;
    const clean = (s: unknown) => (typeof s === 'string' ? s.split(' ')[0] : undefined);
    return {
      Fajr: clean(timings.Fajr),
      Dhuhr: clean(timings.Dhuhr),
      Asr: clean(timings.Asr),
      Maghrib: clean(timings.Maghrib),
      Isha: clean(timings.Isha),
    };
  } catch {
    return undefined;
  }
}

function resolveDefaultMethodForCountry(countryCode: string): number {
  const cc = countryCode.toUpperCase();
  if (cc === 'MA' || cc === 'FR' || cc === 'TN' || cc === 'DZ') return 12; // UOIF / Maghreb angles
  if (cc === 'EG') return 5; // Egyptian General Authority
  if (cc === 'TR') return 13; // Diyanet
  if (cc === 'US' || cc === 'CA') return 2; // ISNA
  if (cc === 'AE') return 16;
  return 4; // Umm Al-Qura
}

/**
 * Automatically updates user geographic location & today's synced prayer times when opening the app.
 * Uses browser GPS when granted/allowed, with seamless server IP geolocation fallback.
 */
export async function autoUpdateLocationOnAppOpen(): Promise<void> {
  if (typeof window === 'undefined') return;

  const existing = loadPrayerLocationConfig();

  const applyAndSync = async (
    lat: number,
    lng: number,
    utcOffsetHours: number,
    presetId: string,
    label: { ar: string; en: string; fr: string },
    method: number
  ) => {
    const cachedTimings = await fetchSyncedTimingsForLocation(lat, lng, method);
    savePrayerLocationConfig({
      presetId,
      lat,
      lng,
      utcOffsetHours,
      calculationMethod: method,
      locationLabel: label,
      cachedDateKey: cachedTimings ? getLocalDateKey(utcOffsetHours) : undefined,
      cachedTimings,
    });
  };

  // Try browser GPS automatically
  if ('geolocation' in navigator) {
    try {
      const gpsPos = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: false,
          timeout: 4000,
          maximumAge: 10 * 60 * 1000,
        });
      });

      const userLat = Number(gpsPos.coords.latitude.toFixed(4));
      const userLng = Number(gpsPos.coords.longitude.toFixed(4));
      const browserOffset = -new Date().getTimezoneOffset() / 60;

      // Enrich with city name from IP geo if close, or show GPS coordinates
      let label = {
        ar: `موقعك التلقائي (${userLat}°, ${userLng}°)`,
        en: `Auto-Detected Location (${userLat}°, ${userLng}°)`,
        fr: `Position Automatique (${userLat}°, ${userLng}°)`,
      };
      let method = existing.calculationMethod || 4;

      try {
        const geoRes = await fetch('/api/geolocation', { cache: 'no-store' });
        if (geoRes.ok) {
          const geoJson = await geoRes.json();
          if (geoJson?.success && geoJson.city) {
            const distApprox =
              Math.abs((geoJson.lat || 0) - userLat) + Math.abs((geoJson.lng || 0) - userLng);
            if (distApprox < 1.5) {
              const cityStr = [geoJson.city, geoJson.country].filter(Boolean).join(', ');
              label = {
                ar: `${cityStr} (محدّث تلقائياً)`,
                en: `${cityStr} (Auto-Detected)`,
                fr: `${cityStr} (Détecté automatiquement)`,
              };
            }
            if (geoJson.countryCode) {
              method = resolveDefaultMethodForCountry(geoJson.countryCode);
            }
          }
        }
      } catch {
        // Keep coordinate label
      }

      await applyAndSync(userLat, userLng, browserOffset, 'auto-gps', label, method);
      return;
    } catch {
      // GPS unavailable or denied; proceed seamlessly to server IP geolocation fallback
    }
  }

  // Fallback: Automatic server-side IP geolocation
  try {
    const res = await fetch('/api/geolocation', { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      if (data?.success && typeof data.lat === 'number' && typeof data.lng === 'number') {
        const place = [data.city, data.country].filter(Boolean).join(', ') || `${data.lat}°, ${data.lng}°`;
        const method = data.countryCode
          ? resolveDefaultMethodForCountry(data.countryCode)
          : existing.calculationMethod || 4;
        await applyAndSync(
          data.lat,
          data.lng,
          typeof data.utcOffsetHours === 'number'
            ? data.utcOffsetHours
            : -new Date().getTimezoneOffset() / 60,
          'auto-ip',
          {
            ar: `${place} (تحديث تلقائي)`,
            en: `${place} (Auto-Updated)`,
            fr: `${place} (Mise à jour auto)`,
          },
          method
        );
        return;
      }
    }
  } catch {
    // Ignore network error and refresh existing location timings
  }

  // At minimum refresh today's timings for saved coordinates when opening the app
  const refreshedTimings = await fetchSyncedTimingsForLocation(
    existing.lat,
    existing.lng,
    existing.calculationMethod
  );
  if (refreshedTimings) {
    savePrayerLocationConfig({
      ...existing,
      cachedDateKey: getLocalDateKey(existing.utcOffsetHours),
      cachedTimings: refreshedTimings,
    });
  }
}

const APP_VERSION_STORAGE_KEY = 'cosmic_app_boot_version';

/**
 * Checks server build/boot version on app open & tab focus; clears stale service worker caches
 * and refreshes the page cleanly if a new deployment is active.
 */
export async function checkAndAutoRefreshAppVersion(): Promise<void> {
  if (typeof window === 'undefined') return;
  try {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then((regs) => {
        regs.forEach((reg) => {
          reg.update().catch(() => {});
        });
      }).catch(() => {});
    }

    const res = await fetch('/api/version', { cache: 'no-store' });
    if (!res.ok) return;
    const data = await res.json();
    const latestVersion = String(data?.version || '');
    if (!latestVersion) return;

    const currentVersion = sessionStorage.getItem(APP_VERSION_STORAGE_KEY);
    if (!currentVersion) {
      sessionStorage.setItem(APP_VERSION_STORAGE_KEY, latestVersion);
    } else if (currentVersion !== latestVersion) {
      sessionStorage.setItem(APP_VERSION_STORAGE_KEY, latestVersion);
      window.location.reload();
    }
  } catch {
    // Ignore transient network failures
  }
}

