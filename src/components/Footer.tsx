import React from 'react';
import { Telescope, ShieldCheck, Heart, Sparkles, Orbit, BookOpen, ExternalLink } from 'lucide-react';
import { Language } from '../types/cosmic';
import { translations } from '../i18n/translations';

interface FooterProps {
  language: Language;
  onSelectTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ language, onSelectTab }) => {
  const t = translations[language];

  return (
    <footer className="relative mt-24 border-t border-cyan-950/80 bg-[#040714] text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1: Brand & Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-amber-400 p-[2px]">
                <div className="w-full h-full bg-[#080d1e] rounded-[10px] flex items-center justify-center">
                  <Telescope className="w-5 h-5 text-cyan-300" />
                </div>
              </div>
              <span className="text-xl font-black text-white">{t.siteTitle}</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t.footerDesc}
            </p>
          </div>

          {/* Col 2: Fast Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-4">
              {language === 'ar' ? 'المسارات الكونية' : 'Cosmic Pathways'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onSelectTab('encyclopedia')} className="hover:text-cyan-300 transition-colors">
                  {t.navEncyclopedia}
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('sky-map')} className="hover:text-cyan-300 transition-colors">
                  {t.navSkyMap}
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('live-feeds')} className="hover:text-cyan-300 transition-colors">
                  {t.navLiveFeeds}
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('events')} className="hover:text-cyan-300 transition-colors">
                  {t.navEvents}
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('virtual-journeys')} className="hover:text-cyan-300 transition-colors">
                  {t.navVirtualJourney}
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('quran-cosmos')} className="hover:text-cyan-300 transition-colors">
                  {t.navQuranCosmos}
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('gallery')} className="hover:text-cyan-300 transition-colors">
                  {t.navGallery}
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('gemini-lab')} className="hover:text-cyan-300 transition-colors">
                  {t.navGeminiLab}
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('quiz')} className="hover:text-cyan-300 transition-colors">
                  {t.navQuiz}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Astronomical Authorities */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-4">
              {language === 'ar' ? 'المصادر الفلكية' : 'Astrophysical Sources'}
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-1.5">
                <span className="text-cyan-400">•</span>
                <span>NASA Astrophysics Data System (ADS)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-cyan-400">•</span>
                <span>European Space Agency (ESA) Science</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-cyan-400">•</span>
                <span>James Webb Space Telescope (JWST / STScI)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-cyan-400">•</span>
                <span>SIMBAD Astronomical Database</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Islamic Methodology */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-4">
              {language === 'ar' ? 'الضوابط الشرعية والتفسيرية' : 'Hermeneutical Standards'}
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              {language === 'ar'
                ? 'اعتماد تفاسير أئمة أهل السنة المعتمدين (ابن كثير، الطبري، القرطبي، السعدي)، والتمييز بين التفسير الشرعي والتأمل العلمي.'
                : 'Adherence to authoritative classical commentaries (Ibn Kathir, Al-Tabari, Al-Saadi) with strict distinction between scripture and evolving physics models.'}
            </p>
            <div className="flex items-center gap-2 text-[11px] text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>{language === 'ar' ? 'منهج موثق ومنضبط' : 'Verified & Rigorous Methodology'}</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-900 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <span>{t.rightsReserved}</span>
          <span className="text-slate-500 text-[11px]">{t.footerCredits}</span>
        </div>

      </div>
    </footer>
  );
};
