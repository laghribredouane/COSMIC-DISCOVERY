import React from 'react';
import { Clock, Eye, Heart, ArrowRight, ArrowLeft, BookOpen } from 'lucide-react';
import { ScientificArticle, Language } from '../types/cosmic';
import { translations } from '../i18n/translations';

interface ArticleCardProps {
  article: ScientificArticle;
  language: Language;
  onOpen: () => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, language, onOpen }) => {
  const t = translations[language];
  const isRtl = language === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <div 
      onClick={onOpen}
      className="group cursor-pointer rounded-2xl overflow-hidden bg-slate-900/70 border border-slate-800 hover:border-cyan-500/50 shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
    >
      <div>
        {/* Cover Image */}
        <div className="relative h-48 w-full overflow-hidden bg-slate-950">
          <img
            src={article.image}
            alt={article.title[language] || article.title.ar}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
          
          {/* Top Category Badge */}
          <div className="absolute top-3 start-3">
            <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-cyan-300 border border-cyan-500/30 text-[11px] font-bold uppercase">
              {t.sections[article.category] || article.category}
            </span>
          </div>

          {/* Reading Time */}
          <div className="absolute bottom-3 end-3 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-950/80 backdrop-blur-md text-[11px] text-slate-300">
            <Clock className="w-3 h-3 text-cyan-400" />
            <span>{article.readingTimeMin} {t.readingTime}</span>
          </div>
        </div>

        {/* Text Details */}
        <div className="p-5">
          <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2 mb-2">
            {article.title[language] || article.title.ar}
          </h3>
          <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed mb-4">
            {article.summary[language] || article.summary.ar}
          </p>

          {/* Key Facts snippet */}
          <div className="space-y-1">
            {(article.keyFacts[language] || article.keyFacts.ar).slice(0, 2).map((fact, i) => (
              <div key={i} className="text-[11px] text-slate-400 truncate flex items-center gap-1.5">
                <span className="text-cyan-400">•</span>
                <span>{fact}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer info */}
      <div className="px-5 py-3 border-t border-slate-800/80 bg-slate-950/40 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <Eye className="w-3.5 h-3.5" />
            <span>{article.views}</span>
          </span>
          <span className="flex items-center gap-1">
            <Heart className="w-3.5 h-3.5 text-rose-400" />
            <span>{article.likes}</span>
          </span>
        </div>

        <span className="flex items-center gap-1 font-bold text-cyan-400 group-hover:underline">
          <span>{t.readArticle}</span>
          <ArrowIcon className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  );
};
