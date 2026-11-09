import React, { useState } from 'react';
import {
  Sparkles,
  BookOpen,
  Search,
  ShieldAlert,
  CheckCircle,
  Award
} from 'lucide-react';
import { Language } from '../types/cosmic';
import { initialQuranStudies } from '../data/cosmicData';
import { searchQuranStudiesList } from '../utils/cosmicCalculations';
import { translations } from '../i18n/translations';
import { MoroccanWarshQuran } from './MoroccanWarshQuran';
import { CosmicHadithOfTheDay } from './CosmicHadithOfTheDay';
import { KaheelPartnerAds } from './KaheelPartnerAds';
import { GoogleAdUnit } from './GoogleAdUnit';

interface QuranCosmosSectionProps {
  language: Language;
}

export const QuranCosmosSection: React.FC<QuranCosmosSectionProps> = ({ language }) => {
  const t = translations[language];
  const [activeSubTab, setActiveSubTab] = useState<'warsh-mushaf' | 'cosmic-studies' | 'cosmic-hadith'>('warsh-mushaf');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudyId, setSelectedStudyId] = useState<string>(initialQuranStudies[0].id);

  const filteredStudies = searchQuranStudiesList(initialQuranStudies, searchQuery, language);
  const activeStudy =
    initialQuranStudies.find((s) => s.id === selectedStudyId) || initialQuranStudies[0];

  return (
    <section className="space-y-8">
      {/* Top Mode Switcher: Complete Moroccan Warsh Mushaf vs Cosmic Verse Studies vs Cosmic Hadith */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-3 rounded-2xl bg-slate-900/90 border border-amber-500/30 shadow-xl">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            data-testid="tab-warsh-mushaf"
            onClick={() => setActiveSubTab('warsh-mushaf')}
            className={`flex items-center gap-2.5 px-5 py-3 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
              activeSubTab === 'warsh-mushaf'
                ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 shadow-lg shadow-amber-500/25'
                : 'bg-slate-950/80 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>
              {language === 'ar'
                ? 'المصحف الشريف كاملاً (رواية ورش عن نافع - القراءة المغربية)'
                : language === 'fr'
                ? 'Saint Coran Complet (Lecture Marocaine - Riwayat Warsh)'
                : 'Complete Holy Quran (Moroccan Reading - Riwayat Warsh)'}
            </span>
          </button>

          <button
            type="button"
            data-testid="tab-cosmic-studies"
            onClick={() => setActiveSubTab('cosmic-studies')}
            className={`flex items-center gap-2.5 px-5 py-3 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
              activeSubTab === 'cosmic-studies'
                ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 shadow-lg shadow-cyan-500/25'
                : 'bg-slate-950/80 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>
              {language === 'ar'
                ? 'تأملات الآيات الكونية والتفاسير المعتمدة'
                : language === 'fr'
                ? 'Études des Versets Cosmiques & Exégèses'
                : 'Cosmic Verse Studies & Classical Tafsir'}
            </span>
          </button>

          <button
            type="button"
            data-testid="tab-cosmic-hadith"
            onClick={() => setActiveSubTab('cosmic-hadith')}
            className={`flex items-center gap-2.5 px-5 py-3 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
              activeSubTab === 'cosmic-hadith'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-lg shadow-emerald-500/25'
                : 'bg-slate-950/80 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>
              {language === 'ar'
                ? 'حديث اليوم الكوني (صحيحا البخاري ومسلم)'
                : language === 'fr'
                ? 'Hadith Cosmique du Jour (Boukhari & Mouslim)'
                : 'Cosmic Hadith of the Day (Bukhari & Muslim)'}
            </span>
          </button>
        </div>

        <div className="text-xs font-bold text-amber-300/90 px-3">
          {language === 'ar'
            ? '114 سورة • 60 حزباً • 6236 آية بالرسم العثماني المغربي'
            : '114 Surahs • 60 Hizbs • 6,236 Verses in Warsh Rasm'}
        </div>
      </div>

      {/* SUB-VIEW 1: COMPLETE HOLY QURAN IN MOROCCAN RIWAYAT WARSH 'AN NAFI' */}
      {activeSubTab === 'warsh-mushaf' && <MoroccanWarshQuran language={language} />}

      {/* SUB-VIEW 3: COSMIC HADITH OF THE DAY */}
      {activeSubTab === 'cosmic-hadith' && <CosmicHadithOfTheDay language={language} />}

      {/* SUB-VIEW 2: COSMIC VERSE STUDIES & CLASSICAL TAFSIR */}
      {activeSubTab === 'cosmic-studies' && (
        <div className="space-y-8">
          {/* Header Banner */}
          <div className="relative p-8 rounded-3xl bg-gradient-to-br from-indigo-950/90 via-slate-900/90 to-[#070b1e]/90 border border-amber-500/30 shadow-2xl overflow-hidden backdrop-blur-xl">
            <div className="relative z-10 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs font-bold mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>
                  {language === 'ar'
                    ? 'المعرفة الكونية والآيات القرآنية'
                    : 'Quranic Signs & Cosmic Architecture'}
                </span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white mb-3">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-100 to-cyan-200">
                  {t.quranHeroTitle}
                </span>
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {t.quranHeroSubtitle}
              </p>
            </div>
          </div>

          {/* Strict Methodological Guidelines Notice Card */}
          <div className="p-6 rounded-2xl bg-amber-950/25 border border-amber-500/30 text-amber-100/90">
            <div className="flex items-start gap-3.5">
              <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300 shrink-0 mt-0.5">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div className="space-y-1.5 text-xs sm:text-sm">
                <strong className="block text-amber-200 text-sm sm:text-base font-bold">
                  {t.methodologyNoticeTitle}
                </strong>
                <p>• {t.methodologyNotice1}</p>
                <p>• {t.methodologyNotice2}</p>
                <p>• {t.methodologyNotice3}</p>
              </div>
            </div>
          </div>

          {/* Main Grid: Verse List & Deep Study Details */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: List of Verses & Search */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute start-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    language === 'ar'
                      ? 'ابحث في الآيات أو السور أو المواضيع...'
                      : 'Search verse or topic...'
                  }
                  className="w-full ps-10 pe-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-2.5 max-h-[600px] overflow-y-auto pe-1">
                {filteredStudies.map((study) => {
                  const isSelected = activeStudy.id === study.id;
                  return (
                    <button
                      key={study.id}
                      onClick={() => setSelectedStudyId(study.id)}
                      className={`w-full text-start p-4 rounded-2xl border transition-all ${
                        isSelected
                          ? 'bg-amber-500/15 border-amber-400 text-white shadow-lg shadow-amber-500/10'
                          : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800/60'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-bold text-amber-300 mb-2">
                        <span>
                          {t.surahLabel} {study.surah[language] || study.surah.ar}
                        </span>
                        <span className="font-mono text-slate-400">
                          {t.ayahLabel} {study.ayahNumber}
                        </span>
                      </div>

                      <p className="font-quran text-lg leading-loose text-amber-100/90 line-clamp-2">
                        {study.arabicText}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Active Study Deep Card */}
            <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-xl space-y-8">
              {/* Verse Display */}
              <div className="p-6 rounded-2xl bg-gradient-to-b from-[#0a1024] to-[#060a18] border border-amber-500/30 text-center relative">
                <div className="inline-block px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 text-xs font-bold mb-4">
                  {activeStudy.surah[language] || activeStudy.surah.ar} : {activeStudy.ayahNumber}
                </div>

                <p className="font-quran text-2xl sm:text-3xl leading-[2] text-amber-200 font-semibold mb-4">
                  « {activeStudy.arabicText} »
                </p>

                {language !== 'ar' && (
                  <p className="text-sm italic text-slate-300 max-w-xl mx-auto border-t border-slate-800 pt-3">
                    "{activeStudy.translation[language === 'fr' ? 'fr' : 'en']}"
                  </p>
                )}
              </div>

              {/* Section 1: Classical Tafsir */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-black text-amber-300 uppercase tracking-wide">
                  <BookOpen className="w-4 h-4 text-amber-400" />
                  <span>{t.classicalTafsirHeader}</span>
                  <span className="text-xs text-slate-400 font-normal">
                    ({activeStudy.classicalTafsir.source})
                  </span>
                </div>
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 text-sm text-slate-200 leading-relaxed font-sans">
                  {activeStudy.classicalTafsir.text}
                </div>
              </div>

              {/* Section 2: Modern Astrophysics */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-black text-cyan-300 uppercase tracking-wide">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span>{t.modernAstrophysicsHeader}</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 text-sm text-slate-200 leading-relaxed font-sans">
                  {activeStudy.modernScientificContext[language] ||
                    activeStudy.modernScientificContext.ar}
                </div>
              </div>

              {/* Section 3: Contemplation & Balanced Insights */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-black text-emerald-300 uppercase tracking-wide">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>{t.contemplationHeader}</span>
                </div>
                <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-800/30 text-sm text-slate-200 leading-relaxed">
                  {activeStudy.contemplationNote[language] || activeStudy.contemplationNote.ar}
                </div>
              </div>

              {/* Methodological Guidance Note for this Verse */}
              <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-800/30 text-xs text-amber-200/90 leading-relaxed">
                <strong className="block mb-1 text-amber-300 font-bold">
                  {language === 'ar' ? 'ضابط منهجي خاص بالآية:' : 'Methodological Constraint:'}
                </strong>
                {activeStudy.methodologicalGuideline[language] ||
                  activeStudy.methodologicalGuideline.ar}
              </div>

              {/* Sources List */}
              <div className="border-t border-slate-800 pt-4 flex flex-wrap items-center gap-2 text-xs text-slate-400">
                <span className="font-bold text-slate-300">
                  {language === 'ar' ? 'المراجع المعتمدة:' : 'Citations:'}
                </span>
                {activeStudy.sources.map((src, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-md bg-slate-800/80 text-slate-300"
                  >
                    {src}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Partner Ad Showcase for https://kaheel7.net/ inside Quran & Cosmos Section */}
      <KaheelPartnerAds language={language} variant="featured-showcase" />

      {/* Google Ads Leaderboard Unit inside Quran & Cosmos Section */}
      <GoogleAdUnit language={language} format="leaderboard" slotKey="quranCosmosBanner" />
    </section>
  );
};
