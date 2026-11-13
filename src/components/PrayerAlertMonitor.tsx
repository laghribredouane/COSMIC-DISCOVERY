import React, { useState, useEffect, useCallback } from 'react';
import { Bell, Volume2, X, Settings } from 'lucide-react';
import { Language } from '../types/cosmic';
import {
  OBLIGATORY_PRAYER_NAMES,
  ObligatoryPrayerId,
  PRAYER_ALERTS_UPDATED_EVENT,
  PRAYER_ALERT_FIRED_KEY,
  PRAYER_LOCATION_UPDATED_EVENT,
  PrayerAlertSettings,
  PrayerLocationConfig,
  computeObligatoryPrayerTimings,
  loadPrayerAlertSettings,
  loadPrayerLocationConfig,
  playPrayerAlertSound,
  showBrowserPrayerNotification,
} from '../utils/prayerAlerts';

interface ActiveBannerAlert {
  prayerId: ObligatoryPrayerId;
  prayerTime: string;
  minutesBefore: number;
  isTest?: boolean;
}

interface PrayerAlertMonitorProps {
  language: Language;
  testTriggerCounter: number;
  onOpenSettings: () => void;
}

const MONITORED_PRAYERS: ObligatoryPrayerId[] = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

export const PrayerAlertMonitor: React.FC<PrayerAlertMonitorProps> = ({
  language,
  testTriggerCounter,
  onOpenSettings,
}) => {
  const [settings, setSettings] = useState<PrayerAlertSettings>(() => loadPrayerAlertSettings());
  const [locationConfig, setLocationConfig] = useState<PrayerLocationConfig>(() =>
    loadPrayerLocationConfig()
  );
  const [activeBanner, setActiveBanner] = useState<ActiveBannerAlert | null>(null);

  // Listen to settings & location updates across the app
  useEffect(() => {
    const onAlertsUpdate = () => setSettings(loadPrayerAlertSettings());
    const onLocationUpdate = () => setLocationConfig(loadPrayerLocationConfig());
    window.addEventListener(PRAYER_ALERTS_UPDATED_EVENT, onAlertsUpdate);
    window.addEventListener(PRAYER_LOCATION_UPDATED_EVENT, onLocationUpdate);
    return () => {
      window.removeEventListener(PRAYER_ALERTS_UPDATED_EVENT, onAlertsUpdate);
      window.removeEventListener(PRAYER_LOCATION_UPDATED_EVENT, onLocationUpdate);
    };
  }, []);

  // Show preview notification banner when triggered from SettingsModal test button
  useEffect(() => {
    if (testTriggerCounter <= 0) return;
    const latest = loadPrayerAlertSettings();
    setActiveBanner({
      prayerId: 'Dhuhr',
      prayerTime: '12:30',
      minutesBefore: latest.minutesBefore,
      isTest: true,
    });
  }, [testTriggerCounter]);

  const checkUpcomingPrayerAlerts = useCallback(() => {
    const currentSettings = loadPrayerAlertSettings();
    if (!currentSettings.enabled) return;

    const currentLoc = loadPrayerLocationConfig();
    const snapshot = computeObligatoryPrayerTimings(currentLoc, new Date());
    const nowMin = snapshot.currentLocalMinutes;
    const lead = currentSettings.minutesBefore;

    let firedMap: Record<string, boolean> = {};
    try {
      const raw = localStorage.getItem(PRAYER_ALERT_FIRED_KEY);
      if (raw) firedMap = JSON.parse(raw);
    } catch {
      firedMap = {};
    }

    for (const pid of MONITORED_PRAYERS) {
      if (!currentSettings.prayers[pid]) continue;
      const timeStr = snapshot.timings[pid];
      if (!timeStr) continue;

      const [hh, mm] = timeStr.split(':').map(Number);
      if (isNaN(hh) || isNaN(mm)) continue;

      let targetMin = hh * 60 + mm;
      let diff = targetMin - nowMin;
      if (diff < 0) diff += 24 * 60;

      // Trigger when exactly `lead` minutes remain (e.g., 15 minutes before prayer)
      if (diff === lead) {
        const dedupKey = `${snapshot.dateKey}:${pid}:${lead}`;
        if (!firedMap[dedupKey]) {
          // Prune older entries to keep storage clean
          const cleaned: Record<string, boolean> = {};
          for (const k of Object.keys(firedMap)) {
            if (k.startsWith(snapshot.dateKey)) cleaned[k] = true;
          }
          cleaned[dedupKey] = true;
          try {
            localStorage.setItem(PRAYER_ALERT_FIRED_KEY, JSON.stringify(cleaned));
          } catch {}

          playPrayerAlertSound(currentSettings.soundTone, currentSettings.volume);
          if (currentSettings.browserNotification) {
            showBrowserPrayerNotification(pid, timeStr, lead, language);
          }
          setActiveBanner({
            prayerId: pid,
            prayerTime: timeStr,
            minutesBefore: lead,
          });
          break;
        }
      }
    }
  }, [language]);

  useEffect(() => {
    checkUpcomingPrayerAlerts();
    const interval = setInterval(checkUpcomingPrayerAlerts, 10000);
    return () => clearInterval(interval);
  }, [checkUpcomingPrayerAlerts, settings, locationConfig]);

  if (!activeBanner) return null;

  const prayerName = OBLIGATORY_PRAYER_NAMES[activeBanner.prayerId][language];

  return (
    <div
      role="alert"
      data-testid="prayer-alert-banner"
      className="fixed bottom-5 end-5 z-50 max-w-md w-[calc(100%-2.5rem)] rounded-2xl bg-gradient-to-r from-[#091834] via-[#0b132b] to-[#111936] border-2 border-amber-400/70 shadow-2xl shadow-amber-500/20 p-4 animate-in slide-in-from-bottom-4 duration-300"
    >
      <div className="flex items-start gap-3">
        <div className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-400/50 text-amber-300 shrink-0 animate-pulse">
          <Bell className="w-5 h-5" />
        </div>

        <div className="flex-1 min-w-0 space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black text-amber-300 uppercase tracking-wide flex items-center gap-1">
              <Volume2 className="w-3.5 h-3.5" />
              <span>
                {activeBanner.isTest
                  ? language === 'ar'
                    ? 'معاينة تنبيه الصلاة'
                    : 'Prayer Alert Preview'
                  : language === 'ar'
                  ? `تنبيه قبل ${prayerName}`
                  : language === 'fr'
                  ? `Rappel avant ${prayerName}`
                  : `Upcoming ${prayerName}`}
              </span>
            </span>
          </div>

          <p className="text-sm font-bold text-white leading-snug">
            {language === 'ar'
              ? `متبقي ${activeBanner.minutesBefore} دقيقة على موعد ${prayerName} (${activeBanner.prayerTime})`
              : language === 'fr'
              ? `Il reste ${activeBanner.minutesBefore} min avant ${prayerName} (${activeBanner.prayerTime})`
              : `${activeBanner.minutesBefore} min remaining until ${prayerName} (${activeBanner.prayerTime})`}
          </p>

          <div className="flex items-center gap-2 pt-1.5">
            <button
              type="button"
              onClick={() => {
                setActiveBanner(null);
                onOpenSettings();
              }}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 text-[11px] font-bold transition-colors cursor-pointer"
            >
              <Settings className="w-3 h-3" />
              <span>{language === 'ar' ? 'الإعدادات' : 'Settings'}</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveBanner(null)}
              className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 text-[11px] font-bold transition-colors cursor-pointer"
            >
              {language === 'ar' ? 'تم، إغلاق' : 'Dismiss'}
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setActiveBanner(null)}
          aria-label="Close alert"
          className="p-1 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
