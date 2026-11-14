import React, { useState, useEffect, useRef } from 'react';
import {
  Telescope,
  Compass,
  BookOpen,
  Sparkles,
  Orbit,
  Image,
  HelpCircle,
  Globe,
  Menu,
  X,
  Search,
  Radio,
  Calendar,
  MapPin,
  Lock,
  ChevronDown,
  Settings,
  Bell
} from 'lucide-react';
import { Language } from '../types/cosmic';
import { translations } from '../i18n/translations';
import { PRAYER_ALERTS_UPDATED_EVENT, loadPrayerAlertSettings } from '../utils/prayerAlerts';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  onOpenSearch: () => void;
  onOpenSettings: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  language,
  setLanguage,
  onOpenSearch,
  onOpenSettings,
}) => {
  const t = translations[language];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [alertsEnabled, setAlertsEnabled] = useState<boolean>(() => loadPrayerAlertSettings().enabled);
  const langDropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const sync = () => setAlertsEnabled(loadPrayerAlertSettings().enabled);
    window.addEventListener(PRAYER_ALERTS_UPDATED_EVENT, sync);
    return () => window.removeEventListener(PRAYER_ALERTS_UPDATED_EVENT, sync);
  }, []);

  // Close language dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(e.target as Node)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Primary Cosmic Pathways + Essential Tools (All visible cleanly)
  const primaryPathways = [
    { id: 'home', label: t.navHome, icon: Compass, badge: '' },
    { id: 'encyclopedia', label: t.navEncyclopedia, icon: BookOpen, badge: '11' },
    { id: 'sky-map', label: t.navSkyMap, icon: Sparkles, badge: 'الصوفي' },
    { id: 'live-feeds', label: t.navLiveFeeds, icon: Radio, badge: 'مباشر' },
    { id: 'events', label: t.navEvents, icon: Calendar, badge: '2026' },
    { id: 'virtual-journeys', label: t.navVirtualJourney, icon: Orbit, badge: '3D' },
    { id: 'quran-cosmos', label: t.navQuranCosmos, icon: BookOpen, badge: 'ورش' },
    { id: 'national-radios', label: t.navNationalRadios, icon: Radio, badge: '24' },
    { id: 'gallery', label: t.navGallery, icon: Image, badge: 'JWST' },
    { id: 'quiz', label: t.navQuiz, icon: HelpCircle, badge: '' },
    { id: 'prayer-times', label: t.navPrayerTimes, icon: Compass, badge: '' },
    { id: 'observatories-map', label: (t as any).navObservatoriesMap || 'مراصد ومواقع الرصد', icon: MapPin, badge: '' },
  ];

  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
    setLangDropdownOpen(false);
  };

  const handleSelectRoute = (tabId: string) => {
    setCurrentTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const languageNames: Record<Language, string> = {
    ar: 'العربية',
    en: 'English',
    fr: 'Français',
  };

  return (
    <>
      {/* Sticky Top Action & Brand Bar */}
      <header className="sticky top-0 z-40 backdrop-blur-2xl bg-[#040714]/95 border-b border-cyan-900/40 shadow-lg shadow-black/30">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-2">
            {/* Logo & Brand Identity (Truncates cleanly so action buttons never overflow) */}
            <div
              onClick={() => handleSelectRoute('home')}
              className="flex items-center gap-2 sm:gap-3 cursor-pointer group min-w-0 flex-1"
            >
              <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-cyan-600 via-indigo-600 to-amber-400 p-[2px] shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-400/40 transition-shadow shrink-0">
                <div className="w-full h-full bg-[#080d1e] rounded-[10px] flex items-center justify-center">
                  <Telescope className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-300 transform group-hover:rotate-12 transition-transform duration-300" />
                </div>
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="text-sm sm:text-xl font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-white to-amber-200 truncate">
                    {t.siteTitle}
                  </span>
                  <span className="hidden lg:inline-block px-1.5 py-0.5 rounded text-[10px] font-bold bg-cyan-950/80 text-cyan-300 border border-cyan-800/50 shrink-0">
                    الكون & ورش
                  </span>
                </div>
                <span className="text-[10px] sm:text-[11px] font-medium text-cyan-300/80 tracking-wide truncate hidden sm:block">
                  {t.slogan}
                </span>
              </div>
            </div>

            {/* Right Action Tools: Language Switcher, Search, Settings, Admin, Menu */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              {/* Language Switcher - Always Visible on All Screens */}
              <div className="relative" ref={langDropdownRef}>
                <button
                  type="button"
                  onClick={() => setLangDropdownOpen((prev) => !prev)}
                  className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg bg-cyan-950/60 hover:bg-cyan-900/70 text-cyan-200 border border-cyan-500/40 text-xs font-bold transition-colors cursor-pointer"
                  aria-expanded={langDropdownOpen}
                  aria-label="Language selector"
                  data-testid="language-switcher-button"
                >
                  <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400 shrink-0" />
                  <span className="uppercase">{language}</span>
                  <span className="hidden md:inline text-[11px] text-cyan-300/90">
                    ({languageNames[language]})
                  </span>
                  <ChevronDown className="w-3 h-3 text-cyan-400 shrink-0" />
                </button>

                {langDropdownOpen && (
                  <div className="absolute end-0 mt-2 w-40 rounded-xl bg-[#0c1229] border border-cyan-500/40 shadow-2xl py-1.5 z-50 animate-in fade-in zoom-in-95">
                    <button
                      type="button"
                      onClick={() => handleLanguageChange('ar')}
                      className={`w-full text-start px-3.5 py-2 text-xs font-bold transition-colors cursor-pointer flex items-center justify-between ${
                        language === 'ar' ? 'text-cyan-300 bg-cyan-950/70' : 'text-slate-300 hover:bg-slate-800/70'
                      }`}
                    >
                      <span>العربية</span>
                      <span className="text-[10px] font-mono text-cyan-400">AR</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleLanguageChange('en')}
                      className={`w-full text-start px-3.5 py-2 text-xs font-bold transition-colors cursor-pointer flex items-center justify-between ${
                        language === 'en' ? 'text-cyan-300 bg-cyan-950/70' : 'text-slate-300 hover:bg-slate-800/70'
                      }`}
                    >
                      <span>English</span>
                      <span className="text-[10px] font-mono text-cyan-400">EN</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleLanguageChange('fr')}
                      className={`w-full text-start px-3.5 py-2 text-xs font-bold transition-colors cursor-pointer flex items-center justify-between ${
                        language === 'fr' ? 'text-cyan-300 bg-cyan-950/70' : 'text-slate-300 hover:bg-slate-800/70'
                      }`}
                    >
                      <span>Français</span>
                      <span className="text-[10px] font-mono text-cyan-400">FR</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Quick Search Button */}
              <button
                type="button"
                onClick={onOpenSearch}
                aria-label="Search"
                title={language === 'ar' ? 'البحث الشامل والبحث الصوتي' : 'Global & Voice Search'}
                className="flex items-center gap-1.5 p-2 sm:px-2.5 sm:py-2 rounded-lg bg-slate-800/70 hover:bg-slate-700 text-slate-200 hover:text-cyan-300 border border-slate-700/60 transition-colors cursor-pointer"
              >
                <Search className="w-4 h-4 text-cyan-400" />
                <span className="hidden xl:inline text-xs font-bold">
                  {language === 'ar' ? 'بحث' : language === 'fr' ? 'Rechercher' : 'Search'}
                </span>
              </button>

              {/* Settings & Prayer Alerts Panel Button */}
              <button
                type="button"
                onClick={onOpenSettings}
                data-testid="navbar-settings-button"
                title={language === 'ar' ? 'لوحة الإعدادات وتنبيهات الصلاة' : 'Settings & Prayer Alerts'}
                aria-label={language === 'ar' ? 'لوحة الإعدادات' : 'Settings'}
                className="relative flex items-center gap-1.5 p-2 sm:px-2.5 sm:py-2 rounded-lg bg-slate-800/70 hover:bg-slate-700 text-slate-200 hover:text-cyan-300 border border-slate-700/60 text-xs font-bold transition-colors cursor-pointer"
              >
                <Settings className="w-4 h-4 text-cyan-400" />
                <span className="hidden lg:inline">
                  {language === 'ar' ? 'الإعدادات' : language === 'fr' ? 'Paramètres' : 'Settings'}
                </span>
                <span
                  className={`w-2 h-2 rounded-full shrink-0 ${
                    alertsEnabled ? 'bg-emerald-400 shadow-sm shadow-emerald-400/70' : 'bg-slate-500'
                  }`}
                />
              </button>

              {/* Admin Dashboard Protected Button */}
              <button
                type="button"
                onClick={() => handleSelectRoute('admin')}
                title={language === 'ar' ? 'لوحة الإدارة المحمية بكلمة السر' : 'Admin Dashboard (Password Protected)'}
                className={`flex items-center gap-1.5 p-2 sm:px-2.5 sm:py-2 rounded-lg text-xs font-black transition-all cursor-pointer ${
                  currentTab === 'admin'
                    ? 'bg-red-500/25 text-red-300 border border-red-500/40 shadow-sm shadow-red-500/20'
                    : 'bg-slate-800/70 text-slate-200 hover:text-white hover:bg-slate-700 border border-slate-700/60'
                }`}
              >
                <Lock className="w-4 h-4 text-red-400" />
                <span className="hidden md:inline">{t.navAdmin}</span>
              </button>

              {/* Mobile / Tablet Drawer Toggle Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                className="lg:hidden p-2 rounded-lg bg-slate-800/80 text-cyan-300 hover:text-white border border-cyan-700/40 cursor-pointer"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-4 h-4 text-rose-400" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer Menu (Full controls + quick language bar) */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-cyan-950/60 bg-[#080d1e]/98 px-4 pt-3 pb-6 space-y-2 backdrop-blur-2xl max-h-[82vh] overflow-y-auto">
            {/* Quick Language Switcher Bar inside Drawer */}
            <div className="p-2.5 rounded-xl bg-slate-900/90 border border-cyan-900/40 flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                <Globe className="w-4 h-4" />
                <span>{language === 'ar' ? 'لغة المنصة:' : 'Language:'}</span>
              </span>
              <div className="flex items-center gap-1.5">
                {(['ar', 'en', 'fr'] as Language[]).map((langCode) => (
                  <button
                    key={langCode}
                    type="button"
                    onClick={() => handleLanguageChange(langCode)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                      language === langCode
                        ? 'bg-cyan-500 text-slate-950'
                        : 'bg-slate-800 text-slate-300 hover:text-white'
                    }`}
                  >
                    {languageNames[langCode]}
                  </button>
                ))}
              </div>
            </div>

            <div className="px-2 py-1 text-[11px] font-bold text-cyan-400 uppercase tracking-wider">
              {language === 'ar' ? 'جميع المسارات الرئيسية' : 'All Main Pathways'}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {primaryPathways.map((item) => {
                const Icon = item.icon;
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelectRoute(item.id)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                        : 'bg-slate-900/60 text-slate-300 hover:bg-slate-800/70 border border-slate-800/60'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                      <span className="truncate">{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 font-mono shrink-0">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="pt-2 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSettings();
                }}
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold bg-cyan-950/40 text-cyan-200 border border-cyan-500/30 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-cyan-400" />
                  <span>
                    {language === 'ar'
                      ? 'الإعدادات والتنبيهات'
                      : language === 'fr'
                      ? 'Paramètres & Alertes'
                      : 'Settings & Alerts'}
                  </span>
                </div>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                    alertsEnabled ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {alertsEnabled ? (language === 'ar' ? 'مفعّل' : 'ON') : language === 'ar' ? 'معطّل' : 'OFF'}
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleSelectRoute('admin')}
                className="w-full flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-red-950/40 text-red-300 border border-red-500/40 cursor-pointer"
              >
                <Lock className="w-4 h-4 text-red-400" />
                <span>{t.navAdmin}</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Always-Visible Main Pathways Navigation Bar (Wraps cleanly so ALL buttons & routes remain visible on every screen size) */}
      <nav
        aria-label={language === 'ar' ? 'المسارات الرئيسية' : 'Main Pathways'}
        className="relative z-30 border-b border-cyan-900/30 bg-[#060a1a]/95 backdrop-blur-xl px-3 sm:px-6 lg:px-8 py-2.5"
      >
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center sm:justify-start gap-1.5 sm:gap-2">
          {primaryPathways.map((path) => {
            const Icon = path.icon;
            const isActive = currentTab === path.id;
            return (
              <button
                key={path.id}
                type="button"
                onClick={() => handleSelectRoute(path.id)}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-[11px] sm:text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white shadow-md shadow-cyan-500/25 border border-cyan-300/40'
                    : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800/80'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-cyan-200' : 'text-cyan-400/80'}`} />
                <span className="whitespace-nowrap">{path.label}</span>
                {path.badge && (
                  <span
                    className={`text-[9px] px-1.5 py-0.2 rounded font-mono ${
                      isActive ? 'bg-white/20 text-white' : 'bg-cyan-950/80 text-cyan-300'
                    }`}
                  >
                    {path.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};
