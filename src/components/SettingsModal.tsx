import React, { useState, useEffect } from 'react';
import {
  X,
  Bell,
  BellOff,
  Volume2,
  Clock,
  CheckCircle2,
  Sparkles,
  Play,
  MapPin,
  Settings,
} from 'lucide-react';
import { Language } from '../types/cosmic';
import {
  AlertSoundTone,
  OBLIGATORY_PRAYER_NAMES,
  ObligatoryPrayerId,
  PrayerAlertSettings,
  getBrowserNotificationStatus,
  loadPrayerAlertSettings,
  loadPrayerLocationConfig,
  playPrayerAlertSound,
  requestBrowserNotificationPermission,
  savePrayerAlertSettings,
  showBrowserPrayerNotification,
} from '../utils/prayerAlerts';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onNavigateToPrayerTimes?: () => void;
  onTriggerTestBanner?: () => void;
}

const PRAYER_IDS: ObligatoryPrayerId[] = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  language,
  onNavigateToPrayerTimes,
  onTriggerTestBanner,
}) => {
  const [settings, setSettings] = useState<PrayerAlertSettings>(() => loadPrayerAlertSettings());
  const [notifStatus, setNotifStatus] = useState<'granted' | 'denied' | 'default' | 'unsupported'>(() =>
    getBrowserNotificationStatus()
  );
  const [testPlayedNotice, setTestPlayedNotice] = useState(false);
  const locationConfig = loadPrayerLocationConfig();

  useEffect(() => {
    if (isOpen) {
      setSettings(loadPrayerAlertSettings());
      setNotifStatus(getBrowserNotificationStatus());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const updateSettings = (next: PrayerAlertSettings) => {
    setSettings(next);
    savePrayerAlertSettings(next);
  };

  const handleToggleMaster = async () => {
    const nextEnabled = !settings.enabled;
    const updated = { ...settings, enabled: nextEnabled };
    updateSettings(updated);
    if (nextEnabled && updated.browserNotification && notifStatus === 'default') {
      const res = await requestBrowserNotificationPermission();
      setNotifStatus(res);
    }
  };

  const handleTogglePrayer = (id: ObligatoryPrayerId) => {
    updateSettings({
      ...settings,
      prayers: {
        ...settings.prayers,
        [id]: !settings.prayers[id],
      },
    });
  };

  const handleRequestBrowserPermission = async () => {
    const res = await requestBrowserNotificationPermission();
    setNotifStatus(res);
    if (res === 'granted') {
      updateSettings({ ...settings, browserNotification: true });
    }
  };

  const handleTestAlert = async () => {
    playPrayerAlertSound(settings.soundTone, settings.volume);
    if (settings.browserNotification) {
      if (notifStatus === 'default') {
        const res = await requestBrowserNotificationPermission();
        setNotifStatus(res);
      }
      showBrowserPrayerNotification('Dhuhr', '12:30', settings.minutesBefore, language);
    }
    if (onTriggerTestBanner) {
      onTriggerTestBanner();
    }
    setTestPlayedNotice(true);
    setTimeout(() => setTestPlayedNotice(false), 3000);
  };

  const toneOptions: Array<{
    id: AlertSoundTone;
    label: { ar: string; en: string; fr: string };
    desc: { ar: string; en: string; fr: string };
  }> = [
    {
      id: 'adhan-tone',
      label: { ar: 'نغمة أذان هادئة (مقام الحجاز)', en: 'Calm Adhan Melody (Hijaz)', fr: 'Mélodie Adhan Douce' },
      desc: { ar: 'نغمة روحانية متدرجة قبل الصلاة', en: 'Warm spiritual harmonic sequence', fr: 'Séquence harmonique apaisante' },
    },
    {
      id: 'chime',
      label: { ar: 'رنين فلكي متناغم', en: 'Cosmic Harmonic Chime', fr: 'Carillon Cosmique' },
      desc: { ar: 'نغمة واضحة ولطيفة متعددة النبرات', en: 'Clear resonant multi-note chime', fr: 'Carillon clair à plusieurs notes' },
    },
    {
      id: 'soft-bell',
      label: { ar: 'جرس تنبيه خفيف', en: 'Soft Alert Bell', fr: 'Cloche Douce' },
      desc: { ar: 'نغمة قصيرة وهادئة للتنبيه السريع', en: 'Minimalist gentle two-tone chime', fr: 'Sonnerie courte et discrète' },
    },
  ];

  const leadOptions = [5, 10, 15, 20, 30];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label={language === 'ar' ? 'لوحة الإعدادات' : 'Settings Panel'}
    >
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-gradient-to-b from-[#0b132a] via-[#070c1e] to-[#040814] border border-cyan-500/40 shadow-2xl p-6 sm:p-7 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-cyan-500/15 border border-cyan-500/40 text-cyan-300">
              <Settings className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                {language === 'ar'
                  ? 'لوحة الإعدادات والتنبيهات'
                  : language === 'fr'
                  ? 'Panneau des Paramètres & Alertes'
                  : 'Settings & Prayer Alerts Panel'}
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                {language === 'ar'
                  ? 'تحكم في التنبيه الصوتي التلقائي قبل مواقيت الصلوات الخمس'
                  : language === 'fr'
                  ? 'Configurez les alertes sonores avant chaque heure de prière'
                  : 'Configure automatic audio notifications before daily prayer times'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label={language === 'ar' ? 'إغلاق الإعدادات' : 'Close settings'}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-700/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Master Enable / Disable Switch */}
        <div
          className={`p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
            settings.enabled
              ? 'bg-emerald-950/35 border-emerald-500/50 shadow-lg shadow-emerald-950/30'
              : 'bg-slate-900/70 border-slate-800'
          }`}
        >
          <div className="flex items-start gap-3">
            <div
              className={`p-2.5 rounded-xl shrink-0 ${
                settings.enabled
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'bg-slate-800 text-slate-400 border border-slate-700'
              }`}
            >
              {settings.enabled ? <Bell className="w-5 h-5" /> : <BellOff className="w-5 h-5" />}
            </div>
            <div>
              <div className="font-black text-sm text-white flex items-center gap-2">
                <span>
                  {language === 'ar'
                    ? 'تنبيه صوتي قبل موعد كل صلاة'
                    : language === 'fr'
                    ? 'Alerte sonore avant chaque prière'
                    : 'Audio Notification Before Each Prayer'}
                </span>
                <span
                  className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                    settings.enabled
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {settings.enabled
                    ? language === 'ar'
                      ? 'مفعّل'
                      : language === 'fr'
                      ? 'Activé'
                      : 'Active'
                    : language === 'ar'
                    ? 'معطّل'
                    : language === 'fr'
                    ? 'Désactivé'
                    : 'Disabled'}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                {language === 'ar'
                  ? `إصدار تنبيه صوتي وإشعار مرئي قبل الأذان بـ ${settings.minutesBefore} دقيقة تلقائياً.`
                  : language === 'fr'
                  ? `Émet une alerte sonore et une notification ${settings.minutesBefore} minutes avant l’Adhan.`
                  : `Plays an audio alert and displays a notification ${settings.minutesBefore} minutes before each prayer.`}
              </p>
            </div>
          </div>

          <button
            type="button"
            role="switch"
            aria-checked={settings.enabled}
            data-testid="toggle-prayer-alerts"
            onClick={handleToggleMaster}
            className={`relative inline-flex h-8 w-16 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${
              settings.enabled ? 'bg-emerald-500' : 'bg-slate-700'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow-md transition duration-200 ${
                settings.enabled
                  ? language === 'ar'
                    ? '-translate-x-8'
                    : 'translate-x-8'
                  : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Lead Time Selector (Default: 15 minutes) */}
        <div className={`space-y-3 ${!settings.enabled ? 'opacity-50 pointer-events-none' : ''}`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>
                {language === 'ar'
                  ? 'وقت التنبيه قبل الأذان:'
                  : language === 'fr'
                  ? 'Délai de rappel avant l’Adhan :'
                  : 'Alert Timing Before Prayer:'}
              </span>
            </span>
            <span className="text-[11px] text-amber-300 font-bold">
              {language === 'ar'
                ? `قبل بـ ${settings.minutesBefore} دقيقة`
                : `${settings.minutesBefore} min before`}
            </span>
          </div>

          <div className="grid grid-cols-5 gap-2">
            {leadOptions.map((mins) => {
              const isSelected = settings.minutesBefore === mins;
              return (
                <button
                  key={mins}
                  type="button"
                  onClick={() => updateSettings({ ...settings, minutesBefore: mins })}
                  className={`py-2.5 px-2 rounded-xl border text-xs font-black transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20'
                      : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {mins}{' '}
                  <span className="text-[10px] font-semibold">
                    {language === 'ar' ? 'د' : 'm'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Select Prayers */}
        <div className={`space-y-3 ${!settings.enabled ? 'opacity-50 pointer-events-none' : ''}`}>
          <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>
              {language === 'ar'
                ? 'الصلوات المشمولة بالتنبيه:'
                : language === 'fr'
                ? 'Prières avec alerte active :'
                : 'Enabled Prayer Alerts:'}
            </span>
          </span>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {PRAYER_IDS.map((pid) => {
              const active = settings.prayers[pid];
              return (
                <button
                  key={pid}
                  type="button"
                  onClick={() => handleTogglePrayer(pid)}
                  className={`p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    active
                      ? 'bg-cyan-500/20 text-cyan-200 border-cyan-400/60'
                      : 'bg-slate-900/60 text-slate-500 border-slate-800 hover:text-slate-300'
                  }`}
                >
                  <CheckCircle2
                    className={`w-3.5 h-3.5 shrink-0 ${
                      active ? 'text-cyan-400' : 'text-slate-600'
                    }`}
                  />
                  <span>{OBLIGATORY_PRAYER_NAMES[pid][language]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Sound Tone & Volume */}
        <div className={`space-y-4 ${!settings.enabled ? 'opacity-50 pointer-events-none' : ''}`}>
          <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
            <Volume2 className="w-4 h-4 text-emerald-400" />
            <span>
              {language === 'ar'
                ? 'نغمة التنبيه ومستوى الصوت:'
                : language === 'fr'
                ? 'Sonnerie et volume :'
                : 'Alert Sound & Volume:'}
            </span>
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {toneOptions.map((tone) => {
              const active = settings.soundTone === tone.id;
              return (
                <button
                  key={tone.id}
                  type="button"
                  onClick={() => {
                    updateSettings({ ...settings, soundTone: tone.id });
                    playPrayerAlertSound(tone.id, settings.volume);
                  }}
                  className={`p-3 rounded-xl border text-start transition-all cursor-pointer ${
                    active
                      ? 'bg-emerald-950/60 border-emerald-400 text-white'
                      : 'bg-slate-900/70 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="text-xs font-black">{tone.label[language]}</div>
                  <div className="text-[10px] text-slate-400 mt-1">{tone.desc[language]}</div>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800">
            <Volume2 className="w-4 h-4 text-cyan-400 shrink-0" />
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.05"
              value={settings.volume}
              onChange={(e) => updateSettings({ ...settings, volume: parseFloat(e.target.value) })}
              aria-label="Alert volume"
              className="flex-1 accent-cyan-400 cursor-pointer"
            />
            <span className="text-xs font-mono font-bold text-cyan-300 w-10 text-end">
              {Math.round(settings.volume * 100)}%
            </span>
          </div>
        </div>

        {/* Browser Notifications & Location Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-200">
                {language === 'ar' ? 'إشعارات المتصفح' : 'Browser Notifications'}
              </span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                  notifStatus === 'granted'
                    ? 'bg-emerald-500/20 text-emerald-300'
                    : notifStatus === 'denied'
                    ? 'bg-rose-500/20 text-rose-300'
                    : 'bg-amber-500/20 text-amber-300'
                }`}
              >
                {notifStatus === 'granted'
                  ? language === 'ar'
                    ? 'مسموح'
                    : 'Allowed'
                  : notifStatus === 'denied'
                  ? language === 'ar'
                    ? 'مرفوض'
                    : 'Blocked'
                  : language === 'ar'
                  ? 'غير مفعّل'
                  : 'Not Set'}
              </span>
            </div>

            {notifStatus !== 'granted' && notifStatus !== 'unsupported' ? (
              <button
                type="button"
                onClick={handleRequestBrowserPermission}
                className="w-full py-2 px-3 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-200 text-xs font-bold transition-colors cursor-pointer"
              >
                {language === 'ar'
                  ? 'السماح بإشعارات النظام'
                  : 'Enable System Notifications'}
              </button>
            ) : (
              <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.browserNotification}
                  onChange={(e) =>
                    updateSettings({ ...settings, browserNotification: e.target.checked })
                  }
                  className="rounded border-slate-600 text-cyan-500"
                />
                <span>
                  {language === 'ar'
                    ? 'إظهار إشعار على الجهاز مع الصوت'
                    : 'Show OS popup notification'}
                </span>
              </label>
            )}
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 flex flex-col justify-between space-y-2">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div className="text-xs">
                <span className="text-slate-400 block text-[10px]">
                  {language === 'ar' ? 'موقع حساب المواقيت الحالي:' : 'Active Prayer Location:'}
                </span>
                <span className="font-bold text-white line-clamp-1">
                  {locationConfig.locationLabel[language]}
                </span>
              </div>
            </div>
            {onNavigateToPrayerTimes && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onNavigateToPrayerTimes();
                }}
                className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-bold transition-colors cursor-pointer"
              >
                {language === 'ar' ? 'تغيير المدينة أو الموقع (GPS)' : 'Change City / GPS Location'}
              </button>
            )}
          </div>
        </div>

        {/* Footer Actions: Test Alert & Close */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
          <button
            type="button"
            onClick={handleTestAlert}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-cyan-500 hover:from-amber-400 hover:to-cyan-400 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>
              {language === 'ar'
                ? 'اختبار التنبيه الصوتي الآن'
                : language === 'fr'
                ? 'Tester l’alerte sonore'
                : 'Test Audio Alert Now'}
            </span>
          </button>

          {testPlayedNotice && (
            <span className="text-xs font-bold text-emerald-400">
              {language === 'ar' ? '✓ تم تشغيل التنبيه التجريبي' : '✓ Test alert triggered'}
            </span>
          )}

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors cursor-pointer"
          >
            {language === 'ar' ? 'حفظ وإغلاق' : language === 'fr' ? 'Fermer' : 'Done'}
          </button>
        </div>
      </div>
    </div>
  );
};
