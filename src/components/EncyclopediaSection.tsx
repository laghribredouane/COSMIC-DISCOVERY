import React, { useState } from 'react';
import { Search, Filter, BookOpen, Sparkles, X } from 'lucide-react';
import { ScientificArticle, Language, CosmicCategory } from '../types/cosmic';
import { filterArticlesList } from '../utils/cosmicCalculations';
import { ArticleCard } from './ArticleCard';
import { translations } from '../i18n/translations';

interface EncyclopediaSectionProps {
  articles: ScientificArticle[];
  language: Language;
  onOpenArticle: (article: ScientificArticle) => void;
  selectedCategory: CosmicCategory | 'all';
  setSelectedCategory: (cat: CosmicCategory | 'all') => void;
}

export const EncyclopediaSection: React.FC<EncyclopediaSectionProps> = ({
  articles,
  language,
  onOpenArticle,
  selectedCategory,
  setSelectedCategory,
}) => {
  const t = translations[language];
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArticles = filterArticlesList(articles, searchQuery, selectedCategory, language);

  const categoryOptions: Array<{ id: CosmicCategory | 'all'; label: string }> = [
    { id: 'all', label: t.allCategories },
    { id: 'galaxies', label: t.sections.galaxies },
    { id: 'stars', label: t.sections.stars },
    { id: 'solar-system', label: t.sections['solar-system'] },
    { id: 'black-holes', label: t.sections['black-holes'] },
    { id: 'nebulae', label: t.sections.nebulae },
    { id: 'cosmic-distances', label: t.sections['cosmic-distances'] },
    { id: 'cosmology-origin', label: t.sections['cosmology-origin'] },
    { id: 'discoveries', label: t.sections.discoveries },
    { id: 'quran-cosmos', label: t.sections['quran-cosmos'] },
    { id: 'reflections', label: t.sections.reflections },
  ];

  return (
    <section className="space-y-8">
      {/* Search & Header Row */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-3">
            <BookOpen className="w-7 h-7 text-cyan-400" />
            <span>{t.navEncyclopedia}</span>
            <span className="text-xs px-3 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800">
              {filteredArticles.length} {t.totalArticlesCount}
            </span>
          </h2>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 absolute start-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full ps-10 pe-10 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-cyan-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute end-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Category Pills Slider */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categoryOptions.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/25'
                : 'bg-slate-900/70 border border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      {filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              language={language}
              onOpen={() => onOpenArticle(article)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 p-8 rounded-3xl bg-slate-900/40 border border-slate-800 text-slate-400">
          <BookOpen className="w-12 h-12 mx-auto text-slate-600 mb-4" />
          <p className="text-base font-semibold">{t.noResults}</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-cyan-600/20 text-cyan-300 border border-cyan-500/30 text-xs font-bold hover:bg-cyan-600/30"
          >
            {language === 'ar' ? 'إعادة ضبط التصفية' : 'Reset Filters'}
          </button>
        </div>
      )}
    </section>
  );
};
