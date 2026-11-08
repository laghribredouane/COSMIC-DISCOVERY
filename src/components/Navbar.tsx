import React, { useState } from 'react';
import { Telescope, Compass, BookOpen, Sparkles, Orbit, Image, BrainCircuit, HelpCircle, Shield, Globe, Menu, X, Search, Radio, Calendar } from 'lucide-react';
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

  const navItems = [
    { id: 'home', label: t.navHome, icon: Compass },
    { id: 'quran-cosmos', label: t.navQuranCosmos, icon: BookOpen },
    { id: 'prayer-times', label: t.navPrayerTimes, icon: Calendar },
    { id: 'encyclopedia', label: t.navEncyclopedia, icon: BookOpen },
    { id: 'sky-map', label: t.navSkyMap, icon: Sparkles },
    { id: 'live-feeds', label: t.navLiveFeeds, icon: Radio },
    { id: 'events', label: t.navEvents, icon: Calendar },
    { id: 'virtual-journeys', label: t.navVirtualJourney, icon: Orbit },
    { id: 'gallery', label: t.navGallery, icon: Image },
    { id: 'gemini-lab', label: t.navGeminiLab, icon: BrainCircuit },
    { id: 'quiz', label: t.navQuiz, icon: HelpCircle },
    { id: 'admin', label: t.navAdmin, icon: Shield },
  ];

  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
    setLangDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#050711]/85 border-b border-cyan-900/30 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Identity */}
          <div 
            onClick={() => setCurrentTab('home')}
            className="flex items-center gap-3.5 cursor-pointer group"
          >
            <div className="relative w-11 h-11 rounded-xl bg-gradient-to-tr from-cyan-600 via-indigo-600 to-amber-400 p-[2px] shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-400/40 transition-shadow">
              <div className="w-full h-full bg-[#080d1e] rounded-[10px] flex items-center justify-center">
                <Telescope className="w-6 h-6 text-cyan-300 transform group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-white to-amber-200">
                {t.siteTitle}
              </span>
              <span className="text-[11px] font-medium text-cyan-300/80 tracking-wide hidden sm:block">
                {t.slogan}
              </span>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentTab(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-sm shadow-cyan-500/10'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Tools: Search, Language & Mobile Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Search Button */}
            <button
              onClick={onOpenSearch}
              aria-label="Search"
              className="p-2.5 rounded-lg bg-slate-800/60 hover:bg-slate-700/60 text-slate-300 hover:text-cyan-300 border border-slate-700/50 transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800/60 hover:bg-slate-700/60 text-slate-200 border border-slate-700/50 text-xs font-bold uppercase transition-colors"
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
              className="lg:hidden p-2.5 rounded-lg bg-slate-800/60 text-slate-300 hover:text-white border border-slate-700/50"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-cyan-950/50 bg-[#080d1e]/98 px-4 pt-3 pb-6 space-y-1 backdrop-blur-2xl">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    : 'text-slate-300 hover:bg-slate-800/50'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
