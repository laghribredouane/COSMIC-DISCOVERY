import React, { useState, useMemo } from 'react';
import { Calendar, Moon, Sparkles, Eye, Clock, Compass, Filter, CheckCircle2, ChevronRight, AlertCircle } from 'lucide-react';
import { CelestialEvent, Language } from '../types/cosmic';
import { initialCelestialEvents } from '../data/cosmicData';
import { calculateMoonPhase, filterCelestialEventsList } from '../utils/cosmicCalculations';

interface CelestialEventsProps {
  language: Language;
}

export const CelestialEvents: React.FC<CelestialEventsProps> = ({ language }) => {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [activeEventId, setActiveEventId] = useState<string>('perseids-2026');

  // Compute live moon phase using astronomical calculation module
  const currentMoonPhase = useMemo(() => {
    return calculateMoonPhase(new Date());
  }, []);

  const filteredEvents = useMemo(() => {
    return filterCelestialEventsList(initialCelestialEvents, selectedType);
  }, [selectedType]);

  const activeEvent = useMemo(() => {
    return (
      initialCelestialEvents.find((e) => e.id === activeEventId) ||
      initialCelestialEvents[0]
    );
  }, [activeEventId]);

  const eventTypes = [
    { id: 'all', label: { ar: 'كافة الظواهر', en: 'All Events', fr: 'Tous Événements' } },
    { id: 'meteor-shower', label: { ar: 'زخات الشهب', en: 'Meteor Showers', fr: 'Pluies d’Étoiles' } },
    { id: 'eclipse', label: { ar: 'الكسوف والخسوف', en: 'Eclipses', fr: 'Éclipses' } },
    { id: 'planetary-alignment', label: { ar: 'التقابل وحركات الكواكب', en: 'Planetary Alignments', fr: 'Alignements Planétaires' } },
  ];

  const texts = {
    ar: {
      title: 'أجندة الظواهر الفلكية والبيانات السماوية المباشرة',
      subtitle: 'دليل رصد الظواهر الفلكية القادمة من زخات شهب وكسوف واقترانات، مع حالة طور القمر الحالية والتأملات القرآنية المرتبطة',
      moonPhaseWidgetTitle: 'طور القمر اللحظي المحسوب فلكياً',
      illumination: 'نسبة إضاءة القرص:',
      moonAge: 'عمر القمر بالتقريب:',
      days: 'يوماً',
      observationGuide: 'دليل وإرشادات الرصد الميداني',
      opticalAid: 'أداة الرصد المطلوبة:',
      visibility: 'نطاق الرؤية الجغرافية:',
      quranicReflection: 'تأمل قرآني مرتبط بالظاهرة',
      viewDetails: 'عرض تفاصيل الرصد',
      ratePerHour: 'معدل الشهب المتوقع:',
      meteorsPerHour: 'شهاب / ساعة',
    },
    en: {
      title: 'Celestial Events Calendar & Real-Time Astronomical Data',
      subtitle: 'Your guide to upcoming meteor showers, solar eclipses, planetary oppositions, real-time moon phase, and authentic Quranic reflections',
      moonPhaseWidgetTitle: 'Real-Time Astronomical Moon Phase',
      illumination: 'Disk Illumination:',
      moonAge: 'Approximate Moon Age:',
      days: 'days',
      observationGuide: 'Field Observation Guide',
      opticalAid: 'Required Optical Equipment:',
      visibility: 'Geographic Visibility:',
      quranicReflection: 'Quranic Contemplation on this Event',
      viewDetails: 'View Observation Guide',
      ratePerHour: 'Expected Zenithal Rate:',
      meteorsPerHour: 'meteors / hour',
    },
    fr: {
      title: 'Calendrier des Événements Célestes & Données en Direct',
      subtitle: 'Guide d’observation des pluies de météores, éclipses, oppositions planétaires, phase lunaire en direct et méditations coraniques',
      moonPhaseWidgetTitle: 'Phase Lunaire Astronomique en Direct',
      illumination: 'Illumination du Disque :',
      moonAge: 'Âge Approximatif :',
      days: 'jours',
      observationGuide: 'Guide d’Observation sur le Terrain',
      opticalAid: 'Instrument Requis :',
      visibility: 'Visibilité Géographique :',
      quranicReflection: 'Méditation Coranique Associée',
      viewDetails: 'Voir le Guide',
      ratePerHour: 'Taux Horaire Estimé :',
      meteorsPerHour: 'météores / heure',
    },
  };

  const t = texts[language] || texts.en;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Banner & Live Moon Phase Widget */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Main Title Banner (8 cols) */}
        <div className="lg:col-span-8 relative rounded-3xl overflow-hidden border border-cyan-500/30 bg-gradient-to-br from-[#060a1d] via-[#091535] to-[#040816] p-6 sm:p-8 shadow-2xl flex flex-col justify-between">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-xs font-semibold text-cyan-300">
              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
              <span>{language === 'ar' ? 'أجندة الرصد الفلكي الموثقة' : 'Verified Astronomical Calendar'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-amber-200">
              {t.title}
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
              {t.subtitle}
            </p>
          </div>

          {/* Filter Pills */}
          <div className="mt-6 pt-6 border-t border-cyan-950/70 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5 me-2">
              <Filter className="w-3.5 h-3.5 text-cyan-400" />
              {language === 'ar' ? 'التصنيف:' : 'Filter:'}
            </span>
            {eventTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                  selectedType === type.id
                    ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:bg-slate-800'
                }`}
              >
                {type.label[language]}
              </button>
            ))}
          </div>
        </div>

        {/* Live Moon Phase Card (4 cols) */}
        <div className="lg:col-span-4 rounded-3xl border border-amber-500/30 bg-gradient-to-br from-[#0b1226] via-[#0e1938] to-[#080d1e] p-6 shadow-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider">
                {t.moonPhaseWidgetTitle}
              </span>
              <span className="text-2xl">{currentMoonPhase.icon}</span>
            </div>

            <div className="mt-4 flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-slate-950 border border-amber-500/30 flex items-center justify-center text-3xl shadow-inner shadow-amber-500/20">
                {currentMoonPhase.icon}
              </div>
              <div>
                <h3 className="text-lg font-black text-white">
                  {currentMoonPhase.phaseName[language]}
                </h3>
                <p className="text-xs text-amber-300 font-medium">
                  {currentMoonPhase.phaseName.ar}
                </p>
              </div>
            </div>

            {/* Metrics */}
            <div className="mt-5 space-y-2.5 text-xs pt-4 border-t border-slate-800">
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-400">{t.illumination}</span>
                <span className="font-bold text-cyan-300">
                  {Math.round(currentMoonPhase.illuminationFraction * 100)}%
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-400">{t.moonAge}</span>
                <span className="font-semibold text-white">
                  {currentMoonPhase.moonAgeDays.toFixed(1)} {t.days}
                </span>
              </div>
            </div>
          </div>

          {/* Quranic Signpost on Moon */}
          <div className="mt-4 p-3 rounded-2xl bg-slate-950/80 border border-amber-500/20 text-center">
            <p className="text-xs font-amiri text-amber-200 font-semibold leading-relaxed">
              « وَالْقَمَرَ قَدَّرْنَاهُ مَنَازِلَ حَتَّىٰ عَادَ كَالْعُرْجُونِ الْقَدِيمِ »
            </p>
            <div className="text-[10px] text-amber-300/80 mt-1">
              [سورة يس - الآية 39]
            </div>
          </div>
        </div>
      </div>

      {/* Main Events Feed & Selected Event Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Events List (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {filteredEvents.map((event) => {
            const isSelected = event.id === activeEvent.id;
            return (
              <div
                key={event.id}
                onClick={() => setActiveEventId(event.id)}
                className={`p-5 rounded-3xl border cursor-pointer transition-all duration-300 flex flex-col justify-between gap-3 ${
                  isSelected
                    ? 'bg-[#09142f] border-cyan-500/60 shadow-xl shadow-cyan-500/10'
                    : 'bg-[#080d1e] border-cyan-900/30 hover:border-cyan-700/50 hover:bg-[#091024]'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-cyan-950 text-cyan-300 border border-cyan-800/40">
                        {event.type.replace('-', ' ')}
                      </span>
                      {event.timeUtc && (
                        <span className="text-[11px] text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-cyan-400" />
                          {event.timeUtc}
                        </span>
                      )}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300">
                      {event.title[language]}
                    </h3>
                  </div>

                  {/* Date Badge */}
                  <div className="flex-shrink-0 text-center px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-[11px] font-bold text-amber-300">
                      {new Date(event.date).toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      {new Date(event.date).getFullYear()}
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                  {event.description[language]}
                </p>

                <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-xs text-cyan-400 font-semibold">
                  <span className="truncate text-slate-400 font-normal">
                    {t.visibility} <span className="text-slate-300">{event.visibilityRegion[language]}</span>
                  </span>
                  <span className="flex items-center gap-1 flex-shrink-0">
                    {t.viewDetails}
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Event Comprehensive Observation Guide & Tafsir (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-[#080d1e] rounded-3xl p-6 border border-cyan-800/40 shadow-xl space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-400">
              <Compass className="w-4 h-4 text-cyan-400" />
              <span>{t.observationGuide}</span>
            </div>

            <h3 className="text-xl font-black text-white">
              {activeEvent.title[language]}
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed">
              {activeEvent.description[language]}
            </p>

            {/* Field Guide Box */}
            <div className="bg-slate-900/90 rounded-2xl p-4 border border-cyan-900/40 space-y-2.5 text-xs">
              <div className="flex items-start gap-2">
                <Eye className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">
                    {t.observationGuide}:
                  </span>
                  <p className="text-slate-300 leading-relaxed mt-0.5 text-[11px]">
                    {activeEvent.observationGuide[language]}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                <span className="text-slate-400">{t.opticalAid}</span>
                <span className="font-bold text-cyan-300">
                  {activeEvent.specs.opticalAidRequired[language]}
                </span>
              </div>

              {activeEvent.specs.ratePerHour && (
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">{t.ratePerHour}</span>
                  <span className="font-bold text-amber-300">
                    ~{activeEvent.specs.ratePerHour} {t.meteorsPerHour}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Authentic Quranic Reflection for this Event */}
          {activeEvent.quranicReflection && (
            <div className="bg-gradient-to-br from-[#0c142b] to-[#080d1e] rounded-3xl p-6 border border-amber-600/35 shadow-xl space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>{t.quranicReflection}</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/70 border border-amber-500/20 text-center space-y-2">
                <p className="text-base sm:text-lg font-amiri text-amber-100 font-bold leading-loose">
                  « {activeEvent.quranicReflection.verseText} »
                </p>
                <div className="text-[11px] font-medium text-amber-300/80">
                  [{activeEvent.quranicReflection.surah[language]} - {language === 'ar' ? 'الآية' : 'Ayah'} {activeEvent.quranicReflection.ayahNumber}]
                </div>
              </div>

              <div className="space-y-1 text-xs">
                <div className="font-bold text-cyan-300">
                  {language === 'ar' ? 'أوجه التأمل والتفكر:' : language === 'fr' ? 'Méditation Scientifique & Spirituelle :' : 'Contemplative Insight:'}
                </div>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  {activeEvent.quranicReflection.reflection[language]}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
