import React, { useState } from 'react';
import { Image as ImageIcon, Telescope, ExternalLink, X, Calendar, Sparkles } from 'lucide-react';
import { SpaceGalleryItem, Language } from '../types/cosmic';
import { initialGalleryItems } from '../data/cosmicData';
import { translations } from '../i18n/translations';

interface SpaceGalleryProps {
  language: Language;
}

export const SpaceGallery: React.FC<SpaceGalleryProps> = ({ language }) => {
  const t = translations[language];
  const [selectedTelescope, setSelectedTelescope] = useState<string>('all');
  const [activeItem, setActiveItem] = useState<SpaceGalleryItem | null>(null);

  const filteredItems = initialGalleryItems.filter((item) => {
    if (selectedTelescope !== 'all' && item.telescope !== selectedTelescope) return false;
    return true;
  });

  return (
    <section className="space-y-8">
      {/* Gallery Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-3">
            <ImageIcon className="w-7 h-7 text-cyan-400" />
            <span>{t.navGallery}</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            {language === 'ar' ? 'معرض بصري فلكي فائق الدقة من تلسكوبات ناسا ووكالة الفضاء الأوروبية' : 'High-resolution deep space imagery from NASA, ESA, JWST, and Hubble'}
          </p>
        </div>

        {/* Telescope Filter */}
        <div className="flex items-center gap-2 overflow-x-auto">
          {['all', 'JWST', 'Hubble'].map((tel) => (
            <button
              key={tel}
              onClick={() => setSelectedTelescope(tel)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedTelescope === tel
                  ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/25'
                  : 'bg-slate-900/80 border border-slate-800 text-slate-300 hover:bg-slate-800'
              }`}
            >
              {tel === 'all' ? t.allCategories : tel}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveItem(item)}
            className="group cursor-pointer relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-cyan-500/40 shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="relative h-72 sm:h-80 w-full overflow-hidden">
              <img
                src={item.imageUrl}
                alt={item.title[language] || item.title.ar}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-90" />
              
              <div className="absolute top-4 start-4">
                <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-cyan-300 border border-cyan-500/30 text-xs font-bold">
                  {item.telescope}
                </span>
              </div>

              <div className="absolute bottom-4 inset-x-4">
                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">
                  {item.title[language] || item.title.ar}
                </h3>
                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                  {item.description[language] || item.description.ar}
                </p>
                <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 border-t border-slate-800/80 pt-2">
                  <span>{item.credit}</span>
                  <span>{item.releaseDate}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activeItem && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-lg flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl rounded-3xl bg-[#090e24] border border-cyan-800/60 shadow-2xl overflow-hidden">
            <button
              onClick={() => setActiveItem(null)}
              className="absolute top-4 end-4 z-20 p-2.5 rounded-full bg-black/70 hover:bg-black text-white"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <img
              src={activeItem.imageUrl}
              alt={activeItem.title[language] || activeItem.title.ar}
              className="w-full max-h-[60vh] object-cover"
            />

            <div className="p-6 sm:p-8 space-y-4 text-slate-200">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-bold">
                  {activeItem.telescope}
                </span>
                <span className="text-xs text-slate-400">{activeItem.credit}</span>
              </div>

              <h2 className="text-2xl font-black text-white">
                {activeItem.title[language] || activeItem.title.ar}
              </h2>

              <p className="text-sm leading-relaxed text-slate-300">
                {activeItem.description[language] || activeItem.description.ar}
              </p>

              {activeItem.specs && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800 text-xs">
                  {activeItem.specs.instrument && (
                    <div>
                      <span className="text-slate-400 block">{language === 'ar' ? 'الجهاز الراصد:' : 'Instrument:'}</span>
                      <strong className="text-white font-mono">{activeItem.specs.instrument}</strong>
                    </div>
                  )}
                  {activeItem.specs.distance && (
                    <div>
                      <span className="text-slate-400 block">{language === 'ar' ? 'المسافة:' : 'Distance:'}</span>
                      <strong className="text-cyan-300 font-mono">{activeItem.specs.distance}</strong>
                    </div>
                  )}
                  {activeItem.specs.constellation && (
                    <div>
                      <span className="text-slate-400 block">{language === 'ar' ? 'الكوكبة:' : 'Constellation:'}</span>
                      <strong className="text-amber-300 font-mono">{activeItem.specs.constellation}</strong>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
