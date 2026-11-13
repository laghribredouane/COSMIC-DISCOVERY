import React, { useState } from 'react';
import {
  Telescope,
  Compass,
  BookOpen,
  Sparkles,
  Orbit,
  Image,
  HelpCircle,
  Shield,
  Globe,
  Menu,
  X,
  Search,
  Radio,
  Calendar,
  MapPin,
  Lock,
  ChevronDown
} from 'lucide-react';
import { Language } from '../types/cosmic';
import { translations } from '../i18n/translations';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  language,
  setLanguage,
  onOpenSearch,
}) => {
  const t = translations[language];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);

  // The 9 Primary Pathways explicitly requested by the user
  const primary9Pathways = [
    { id: 'encyclopedia', label: t.navEncyclopedia, icon: BookOpen, badge: '11 دراسة' },
    { id: 'sky-map', label: t.navSkyMap, icon: Sparkles, badge: 'الصوفي' },
    { id: 'live-feeds', label: t.navLiveFeeds, icon: Radio, badge: 'مباشر' },
    { id: 'events', label: t.navEvents, icon: Calendar, badge: '2026' },
    { id: 'virtual-journeys', label: t.navVirtualJourney, icon: Orbit, badge: '3D' },
    { id: 'quran-cosmos', label: t.navQuranCosmos, icon: BookOpen, badge: 'ورش' },
    { id: 'national-radios', label: t.navNationalRadios, icon: Radio, badge: '24 إذاعة' },
    { id: 'gallery', label: t.navGallery, icon: Image, badge: 'JWST' },
    { id: 'quiz', label: t.navQuiz, icon: HelpCircle, badge: 'تحدي' },
  ];

  // Secondary Tools
  const secondaryTools = [
    { id: 'observatories-map', label: (t as any).navObservatoriesMap || 'مراصد ومواقع الرصد', icon: MapPin },
    { id: 'prayer-times', label: t.navPrayerTimes, icon: Calendar },
  ];

  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
    setLangDropdownOpen(false);
  };

  const isToolActive = secondaryTools.some((tool) => tool.id === currentTab);

  return (
    <header className="sticky top-0 z-40 backdrop-blur-2xl bg-[#040714]/90 border-b border-cyan-900/30 transition-all duration-300">
      {/* Top Navbar Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-3">
          
          {/* Logo & Identity */}
          <div 
            onClick={() => {
              setCurrentTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            <div className="relative w-11 h-11 rounded-xl bg-gradient-to-tr from-cyan-600 via-indigo-600 to-amber-400 p-[2px] shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-400/40 transition-shadow">
              <div className="w-full h-full bg-[#080d1e] rounded-[10px] flex items-center justify-center">
                <Telescope className="w-6 h-6 text-cyan-300 transform group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-lg sm:text-xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-white to-amber-200">
                  {t.siteTitle}
                </span>
                <span className="hidden xl:inline-block px-1.5 py-0.5 rounded text-[10px] font-bold bg-cyan-950/80 text-cyan-300 border border-cyan-800/50">
                  الكون & ورش
                </span>
              </div>
              <span className="text-[11px] font-medium text-cyan-300/80 tracking-wide hidden sm:block">
                {t.slogan}
              </span>
            </div>
          </div>

          {/* Desktop Primary Nav (Key sections + Tools dropdown) */}
          <nav className="hidden xl:flex items-center gap-1">
            <button
              onClick={() => setCurrentTab('home')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all duration-200 ${
                currentTab === 'home'
                  ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-cyan-400" />
              <span>{t.navHome}</span>
            </button>

            {/* Core First 5 Pathways on Desktop Top Row */}
            {primary9Pathways.slice(0, 5).map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all duration-200 ${
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-400/40 shadow-sm shadow-cyan-500/20'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-300' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}

            {/* Next Pathways */}
            {primary9Pathways.slice(5).map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all duration-200 ${
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-400/40 shadow-sm shadow-cyan-500/20'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-300' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}

            {/* Secondary Tools Dropdown */}
            <div className="relative">
              <button
                onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
                className={`flex items-center gap-1 px-2.5 py-2 rounded-lg text-xs font-bold transition-all duration-200 ${
                  isToolActive
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <span>{language === 'ar' ? 'أدوات أخرى' : 'More'}</span>
                <ChevronDown className="w-3 h-3" />
              </button>

              {toolsDropdownOpen && (
                <div className="absolute end-0 mt-2 w-52 rounded-xl bg-[#0a1024] border border-cyan-800/40 shadow-2xl py-1 z-50 animate-in fade-in zoom-in-95">
                  {secondaryTools.map((tool) => {
                    const ToolIcon = tool.icon;
                    return (
                      <button
                        key={tool.id}
                        onClick={() => {
                          setCurrentTab(tool.id);
                          setToolsDropdownOpen(false);
                        }}
                        className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold transition-colors ${
                          currentTab === tool.id
                            ? 'text-cyan-300 bg-cyan-950/60'
                            : 'text-slate-300 hover:bg-slate-800/60'
                        }`}
                      >
                        <ToolIcon className="w-4 h-4 text-cyan-400" />
                        <span>{tool.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          {/* Right Action Tools: Admin Locked Button, Search, Language & Mobile Menu */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Admin Dashboard Protected Button */}
            <button
              onClick={() => setCurrentTab('admin')}
              title={language === 'ar' ? 'لوحة الإدارة المحمية بكلمة السر' : 'Admin Dashboard (Password Protected)'}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-lg text-xs font-black transition-all ${
                currentTab === 'admin'
                  ? 'bg-red-500/25 text-red-300 border border-red-500/40 shadow-sm shadow-red-500/20'
                  : 'bg-slate-800/60 text-slate-300 hover:text-white hover:bg-slate-700/60 border border-slate-700/50'
              }`}
            >
              <Lock className="w-3.5 h-3.5 text-red-400" />
              <span className="hidden md:inline">{t.navAdmin}</span>
            </button>

            {/* Quick Search Button */}
            <button
              onClick={onOpenSearch}
              aria-label="Search"
              className="p-2 sm:p-2.5 rounded-lg bg-slate-800/60 hover:bg-slate-700/60 text-slate-300 hover:text-cyan-300 border border-slate-700/50 transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-lg bg-slate-800/60 hover:bg-slate-700/60 text-slate-200 border border-slate-700/50 text-xs font-bold uppercase transition-colors"
                aria-expanded={langDropdownOpen}
                aria-label="Language selector"
              >
                <Globe className="w-3.5 h-3.5 text-cyan-400" />
                <span>{language.toUpperCase()}</span>
              </button>

              {langDropdownOpen && (
                <div className="absolute end-0 mt-2 w-36 rounded-xl bg-[#0c1229] border border-cyan-800/40 shadow-2xl py-1 z-50 animate-in fade-in zoom-in-95">
                  <button
                    onClick={() => handleLanguageChange('ar')}
                    className={`w-full text-start px-4 py-2 text-xs font-bold transition-colors ${
                      language === 'ar' ? 'text-cyan-400 bg-cyan-950/40' : 'text-slate-300 hover:bg-slate-800/60'
                    }`}
                  >
                    العربية (Arabic)
                  </button>
                  <button
                    onClick={() => handleLanguageChange('en')}
                    className={`w-full text-start px-4 py-2 text-xs font-bold transition-colors ${
                      language === 'en' ? 'text-cyan-400 bg-cyan-950/40' : 'text-slate-300 hover:bg-slate-800/60'
                    }`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => handleLanguageChange('fr')}
                    className={`w-full text-start px-4 py-2 text-xs font-bold transition-colors ${
                      language === 'fr' ? 'text-cyan-400 bg-cyan-950/40' : 'text-slate-300 hover:bg-slate-800/60'
                    }`}
                  >
                    Français
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2.5 rounded-lg bg-slate-800/60 text-slate-300 hover:text-white border border-slate-700/50"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-cyan-300" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Persistent Quick Navigation Strip for the 9 Core Pathways */}
      <div className="border-t border-cyan-950/50 bg-[#060a1a]/90 backdrop-blur-xl px-4 py-2 overflow-x-auto scrollbar-thin scrollbar-thumb-cyan-900 scrollbar-track-transparent">
        <div className="max-w-7xl mx-auto flex items-center gap-1.5 sm:gap-2 min-w-max">
          <span className="text-[10px] font-black uppercase text-cyan-400/80 px-2 shrink-0 hidden sm:inline">
            {language === 'ar' ? 'المسارات الكونية:' : 'Cosmic Tracks:'}
          </span>
          {primary9Pathways.map((path) => {
            const Icon = path.icon;
            const isActive = currentTab === path.id;
            return (
              <button
                key={path.id}
                onClick={() => {
                  setCurrentTab(path.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white shadow-md shadow-cyan-500/25 border border-cyan-300/40'
                    : 'bg-slate-900/70 text-slate-300 hover:text-white hover:bg-slate-800/80 border border-slate-800/70'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-200' : 'text-slate-400'}`} />
                <span>{path.label}</span>
                {path.badge && (
                  <span
                    className={`text-[9px] px-1.5 py-0.2 rounded font-mono ${
                      isActive ? 'bg-white/20 text-white' : 'bg-cyan-950/70 text-cyan-300'
                    }`}
                  >
                    {path.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-cyan-950/50 bg-[#080d1e]/98 px-4 pt-3 pb-6 space-y-1 backdrop-blur-2xl max-h-[80vh] overflow-y-auto">
          <div className="px-3 py-1.5 text-[11px] font-bold text-cyan-400 uppercase tracking-wider">
            {language === 'ar' ? 'المسارات الرئيسية' : 'Primary Pathways'}
          </div>

          <button
            onClick={() => {
              setCurrentTab('home');
              setMobileMenuOpen(false);
            }}
            className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
              currentTab === 'home'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                : 'text-slate-300 hover:bg-slate-800/50'
            }`}
          >
            <div className="flex items-center gap-3">
              <Compass className="w-5 h-5 text-cyan-400" />
              <span>{t.navHome}</span>
            </div>
          </button>

          {primary9Pathways.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    : 'text-slate-300 hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 font-mono">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-2 border-t border-slate-800/80 my-2">
            <div className="px-3 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              {language === 'ar' ? 'الأدوات والمراصد' : 'Tools & Observatories'}
            </div>
            {secondaryTools.map((tool) => {
              const ToolIcon = tool.icon;
              return (
                <button
                  key={tool.id}
                  onClick={() => {
                    setCurrentTab(tool.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    currentTab === tool.id
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'text-slate-300 hover:bg-slate-800/50'
                  }`}
                >
                  <ToolIcon className="w-5 h-5 text-amber-400" />
                  <span>{tool.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-red-900/40">
            <button
              onClick={() => {
                setCurrentTab('admin');
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold bg-red-950/40 text-red-300 border border-red-500/40"
            >
              <Lock className="w-5 h-5 text-red-400" />
              <span>{t.navAdmin} (محمية بكلمة السر)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
