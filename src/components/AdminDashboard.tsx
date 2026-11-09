import React, { useState } from 'react';
import { Shield, BookOpen, BrainCircuit, BarChart3, Plus, Trash2, CheckCircle, Clock, Eye, Edit3, X, HelpCircle, SlidersHorizontal, Copy, Check } from 'lucide-react';
import { ScientificArticle, Language, CosmicCategory, SiteStatistics, QuizQuestion } from '../types/cosmic';
import { translations } from '../i18n/translations';
import {
  GoogleAdsConfig,
  loadGoogleAdsConfig,
  saveGoogleAdsConfig,
} from './GoogleAdUnit';

interface AdminDashboardProps {
  articles: ScientificArticle[];
  setArticles: React.Dispatch<React.SetStateAction<ScientificArticle[]>>;
  stats: SiteStatistics;
  language: Language;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  articles,
  setArticles,
  stats,
  language,
}) => {
  const t = translations[language];

  const [activeTab, setActiveTab] = useState<'articles' | 'gemini-queue' | 'stats' | 'google-ads' | 'add-article'>('google-ads');
  const [editingArticle, setEditingArticle] = useState<ScientificArticle | null>(null);
  const [adsConfig, setAdsConfig] = useState<GoogleAdsConfig>(() => loadGoogleAdsConfig());
  const [savedNotice, setSavedNotice] = useState(false);
  const [copiedSnippet, setCopiedSnippet] = useState<'script' | 'adstxt' | null>(null);

  // New Article Form State
  const [formData, setFormData] = useState({
    titleAr: '',
    titleEn: '',
    category: 'galaxies' as CosmicCategory,
    summaryAr: '',
    contentSimpleAr: '',
    contentAdvancedAr: '',
    keyFactsAr: '',
    diameter: '',
    mass: '',
    temperature: '',
    distance: '',
    imageUrl: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=1600&auto=format&fit=crop',
    imageCredit: 'NASA / ESA',
    sources: 'NASA Astrophysics Data System'
  });

  const handleApproveArticle = (id: string) => {
    setArticles((prev) =>
      prev.map((a) => (a.id === id ? { ...a, isApproved: true } : a))
    );
  };

  const handleDeleteArticle = (id: string) => {
    setArticles((prev) => prev.filter((a) => a.id !== id));
  };

  const handleSaveAdsConfig = (e: React.FormEvent) => {
    e.preventDefault();
    saveGoogleAdsConfig(adsConfig);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  const handleCopySnippet = (type: 'script' | 'adstxt', text: string) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopiedSnippet(type);
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  const handleSaveNewArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.titleAr.trim()) return;

    const newArticle: ScientificArticle = {
      id: `article-${Date.now()}`,
      title: {
        ar: formData.titleAr,
        en: formData.titleEn || formData.titleAr,
        fr: formData.titleAr
      },
      category: formData.category,
      summary: {
        ar: formData.summaryAr,
        en: formData.summaryAr,
        fr: formData.summaryAr
      },
      introduction: {
        ar: formData.summaryAr,
        en: formData.summaryAr,
        fr: formData.summaryAr
      },
      contentSimple: {
        ar: formData.contentSimpleAr || formData.summaryAr,
        en: formData.contentSimpleAr || formData.summaryAr,
        fr: formData.contentSimpleAr || formData.summaryAr
      },
      contentAdvanced: {
        ar: formData.contentAdvancedAr || formData.contentSimpleAr,
        en: formData.contentAdvancedAr || formData.contentSimpleAr,
        fr: formData.contentAdvancedAr || formData.contentSimpleAr
      },
      keyFacts: {
        ar: formData.keyFactsAr ? formData.keyFactsAr.split('\n').filter(Boolean) : ['حقيقة علمية موثقة'],
        en: ['Verified astrophysics fact'],
        fr: ['Fait astrophysique vérifié']
      },
      specs: {
        diameter: formData.diameter,
        mass: formData.mass,
        temperature: formData.temperature,
        distance: formData.distance
      },
      image: formData.imageUrl,
      imageCaption: {
        ar: formData.titleAr,
        en: formData.titleEn || formData.titleAr,
        fr: formData.titleAr
      },
      imageCredit: formData.imageCredit,
      sources: [{ title: formData.sources }],
      lastUpdated: new Date().toISOString().split('T')[0],
      isApproved: true,
      readingTimeMin: 5,
      views: 1,
      likes: 0
    };

    setArticles((prev) => [newArticle, ...prev]);
    setActiveTab('articles');
    // Reset form
    setFormData({
      titleAr: '',
      titleEn: '',
      category: 'galaxies',
      summaryAr: '',
      contentSimpleAr: '',
      contentAdvancedAr: '',
      keyFactsAr: '',
      diameter: '',
      mass: '',
      temperature: '',
      distance: '',
      imageUrl: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=1600&auto=format&fit=crop',
      imageCredit: 'NASA / ESA',
      sources: 'NASA Astrophysics Data System'
    });
  };

  const pendingDrafts = articles.filter((a) => !a.isApproved);
  const headScriptSnippet = `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsConfig.clientId}" crossorigin="anonymous"></script>`;
  const adsTxtSnippet = `google.com, ${adsConfig.clientId.replace(/^ca-/, '')}, DIRECT, f08c47fec0942fa0`;

  return (
    <section className="space-y-8">
      {/* Header */}
      <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-900/90 via-[#0a0f26]/90 to-[#060a1a]/90 border border-cyan-800/40 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-300">
              <Shield className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-white">{t.adminTitle}</h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-0.5">{t.adminSubtitle}</p>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('add-article')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white font-bold text-xs shadow-lg shadow-cyan-600/20 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>{t.adminTabAdd}</span>
          </button>
        </div>
      </div>

      {/* Tabs Row */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
        {[
          {
            id: 'google-ads',
            label:
              language === 'ar'
                ? 'إعلانات Google AdSense'
                : language === 'fr'
                ? 'Google Ads & AdSense'
                : 'Google Ads & AdSense',
            icon: SlidersHorizontal,
          },
          { id: 'articles', label: t.adminTabArticles, icon: BookOpen, count: articles.length },
          { id: 'gemini-queue', label: t.adminTabGeminiQueue, icon: BrainCircuit, count: pendingDrafts.length },
          { id: 'stats', label: t.adminTabStats, icon: BarChart3 },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${isActive ? 'bg-cyan-500 text-black' : 'bg-slate-800 text-slate-300'}`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB 0: GOOGLE ADS & ADSENSE MANAGER */}
      {activeTab === 'google-ads' && (
        <form
          onSubmit={handleSaveAdsConfig}
          className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-xl font-black text-white">
                {language === 'ar'
                  ? 'إدارة إعلانات Google Ads & AdSense'
                  : language === 'fr'
                  ? 'Configuration Google Ads & AdSense'
                  : 'Google Ads & AdSense Configuration'}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {language === 'ar'
                  ? 'تحكم في معرف الناشر (Publisher ID) ومعرفات الوحدات الإعلانية (Ad Slots) وتفعيل الإعلانات عبر الموقع.'
                  : language === 'fr'
                  ? 'Gérez votre identifiant éditeur Google AdSense (ca-pub-...) et les emplacements d’annonces sur le site.'
                  : 'Manage your Google AdSense Publisher ID (ca-pub-...) and ad unit slots across the site.'}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <label className="inline-flex items-center gap-2 text-xs font-bold text-slate-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={adsConfig.enabled}
                  onChange={(e) => setAdsConfig({ ...adsConfig, enabled: e.target.checked })}
                  className="w-4 h-4 accent-cyan-500 rounded"
                />
                <span>
                  {language === 'ar'
                    ? 'تفعيل إعلانات Google'
                    : language === 'fr'
                    ? 'Activer Google Ads'
                    : 'Enable Google Ads'}
                </span>
              </label>

              <label className="inline-flex items-center gap-2 text-xs font-bold text-slate-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={adsConfig.autoAds}
                  onChange={(e) => setAdsConfig({ ...adsConfig, autoAds: e.target.checked })}
                  className="w-4 h-4 accent-amber-500 rounded"
                />
                <span>Auto Ads</span>
              </label>
            </div>
          </div>

          {/* Publisher ID & Slots Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                {language === 'ar'
                  ? 'معرّف ناشر Google AdSense (Publisher Client ID)'
                  : language === 'fr'
                  ? 'Identifiant Éditeur Google AdSense (Client ID)'
                  : 'Google AdSense Publisher Client ID'}
              </label>
              <input
                type="text"
                value={adsConfig.clientId}
                onChange={(e) => setAdsConfig({ ...adsConfig, clientId: e.target.value.trim() })}
                placeholder="ca-pub-XXXXXXXXXXXXXXXX"
                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-cyan-300 font-mono text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                {language === 'ar'
                  ? 'وحدة إعلان الصفحة الرئيسية (Leaderboard Slot ID)'
                  : 'Home Leaderboard Slot ID'}
              </label>
              <input
                type="text"
                value={adsConfig.slots.homeLeaderboard}
                onChange={(e) =>
                  setAdsConfig({
                    ...adsConfig,
                    slots: { ...adsConfig.slots, homeLeaderboard: e.target.value.trim() },
                  })
                }
                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                {language === 'ar'
                  ? 'وحدة إعلان داخل الموسوعة (In-Article Slot ID)'
                  : 'Encyclopedia In-Article Slot ID'}
              </label>
              <input
                type="text"
                value={adsConfig.slots.encyclopediaInArticle}
                onChange={(e) =>
                  setAdsConfig({
                    ...adsConfig,
                    slots: { ...adsConfig.slots, encyclopediaInArticle: e.target.value.trim() },
                  })
                }
                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                {language === 'ar'
                  ? 'وحدة إعلان قسم القرآن والكون (Quran & Cosmos Slot ID)'
                  : 'Quran & Cosmos Banner Slot ID'}
              </label>
              <input
                type="text"
                value={adsConfig.slots.quranCosmosBanner}
                onChange={(e) =>
                  setAdsConfig({
                    ...adsConfig,
                    slots: { ...adsConfig.slots, quranCosmosBanner: e.target.value.trim() },
                  })
                }
                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                {language === 'ar'
                  ? 'وحدة الإعلانات المتعددة السفلية (Multiplex Slot ID)'
                  : 'Footer Multiplex Slot ID'}
              </label>
              <input
                type="text"
                value={adsConfig.slots.footerMultiplex}
                onChange={(e) =>
                  setAdsConfig({
                    ...adsConfig,
                    slots: { ...adsConfig.slots, footerMultiplex: e.target.value.trim() },
                  })
                }
                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-xs"
              />
            </div>
          </div>

          {/* Code Snippets & ads.txt verification */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-300">
                  {language === 'ar' ? 'كود تفعيل AdSense في <head>' : 'AdSense <head> Script'}
                </span>
                <button
                  type="button"
                  onClick={() => handleCopySnippet('script', headScriptSnippet)}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] cursor-pointer"
                >
                  {copiedSnippet === 'script' ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  <span>{language === 'ar' ? 'نسخ' : 'Copy'}</span>
                </button>
              </div>
              <pre className="text-[11px] font-mono text-slate-400 overflow-x-auto whitespace-pre-wrap break-all">
                {headScriptSnippet}
              </pre>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-cyan-300">
                  {language === 'ar' ? 'سجل التحقق /ads.txt المفعّل' : 'Active /ads.txt Record'}
                </span>
                <button
                  type="button"
                  onClick={() => handleCopySnippet('adstxt', adsTxtSnippet)}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] cursor-pointer"
                >
                  {copiedSnippet === 'adstxt' ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  <span>{language === 'ar' ? 'نسخ' : 'Copy'}</span>
                </button>
              </div>
              <pre className="text-[11px] font-mono text-slate-400 overflow-x-auto whitespace-pre-wrap break-all">
                {adsTxtSnippet}
              </pre>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-800">
            <div>
              {savedNotice && (
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                  <CheckCircle className="w-4 h-4" />
                  <span>
                    {language === 'ar'
                      ? 'تم حفظ وتحديث إعدادات Google Ads بنجاح!'
                      : language === 'fr'
                      ? 'Paramètres Google Ads enregistrés avec succès !'
                      : 'Google Ads settings saved and applied!'}
                  </span>
                </span>
              )}
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs shadow-lg shadow-cyan-500/20 transition-colors cursor-pointer"
            >
              {language === 'ar'
                ? 'حفظ وتطبيق إعدادات Google Ads'
                : language === 'fr'
                ? 'Enregistrer la configuration Google Ads'
                : 'Save Google Ads Settings'}
            </button>
          </div>
        </form>
      )}

      {/* TAB 1: Articles List */}
      {activeTab === 'articles' && (
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-start text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-bold uppercase text-[11px]">
                  <th className="py-3 px-4 text-start">{language === 'ar' ? 'المقال' : 'Article'}</th>
                  <th className="py-3 px-4 text-start">{language === 'ar' ? 'التصنيف' : 'Category'}</th>
                  <th className="py-3 px-4 text-start">{language === 'ar' ? 'الحالة' : 'Status'}</th>
                  <th className="py-3 px-4 text-start">{language === 'ar' ? 'المشاهدات' : 'Views'}</th>
                  <th className="py-3 px-4 text-end">{language === 'ar' ? 'الإجراءات' : 'Actions'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {articles.map((art) => (
                  <tr key={art.id} className="hover:bg-slate-800/40">
                    <td className="py-3 px-4 font-bold text-white max-w-xs truncate">
                      {art.title[language] || art.title.ar}
                    </td>
                    <td className="py-3 px-4 text-slate-300">
                      {t.sections[art.category] || art.category}
                    </td>
                    <td className="py-3 px-4">
                      {art.isApproved ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 text-[11px] font-semibold">
                          <CheckCircle className="w-3 h-3" />
                          <span>{t.statusApproved}</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-800 text-[11px] font-semibold">
                          <Clock className="w-3 h-3" />
                          <span>{t.statusPending}</span>
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 font-mono text-cyan-300">{art.views}</td>
                    <td className="py-3 px-4 text-end">
                      <button
                        onClick={() => handleDeleteArticle(art.id)}
                        className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-950/40"
                        title={t.btnDelete}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: Gemini Queue Review */}
      {activeTab === 'gemini-queue' && (
        <div className="space-y-4">
          {pendingDrafts.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-slate-900/40 border border-slate-800 text-slate-400">
              <BrainCircuit className="w-12 h-12 mx-auto mb-3 text-slate-600" />
              <p>{language === 'ar' ? 'لا توجد مسودات ذكاء اصطناعي قيد الانتظار حالياً.' : 'No AI drafts currently awaiting review.'}</p>
            </div>
          ) : (
            pendingDrafts.map((draft) => (
              <div key={draft.id} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-800 text-xs font-bold">
                    Gemini AI Draft
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleApproveArticle(draft.id)}
                      className="flex items-center gap-1 px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>{t.btnApprove}</span>
                    </button>
                    <button
                      onClick={() => handleDeleteArticle(draft.id)}
                      className="p-2 rounded-lg text-rose-400 hover:bg-rose-950/40"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white">{draft.title[language] || draft.title.ar}</h3>
                <p className="text-xs text-slate-300 leading-relaxed max-h-32 overflow-y-auto">
                  {draft.contentSimple[language] || draft.contentSimple.ar}
                </p>
              </div>
            ))
          )}
        </div>
      )}

      {/* TAB 3: Stats */}
      {activeTab === 'stats' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800">
            <span className="text-xs text-slate-400 block mb-1">{t.totalVisitors}</span>
            <div className="text-3xl font-black text-cyan-300 font-mono">{stats.totalViews.toLocaleString()}</div>
          </div>
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800">
            <span className="text-xs text-slate-400 block mb-1">{t.totalArticlesCount}</span>
            <div className="text-3xl font-black text-amber-300 font-mono">{articles.length}</div>
          </div>
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800">
            <span className="text-xs text-slate-400 block mb-1">{t.quizzesCompleted}</span>
            <div className="text-3xl font-black text-emerald-400 font-mono">{stats.quizzesTaken.toLocaleString()}</div>
          </div>
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800">
            <span className="text-xs text-slate-400 block mb-1">
              {language === 'ar' ? 'استشارات Gemini الفلكية' : 'Gemini AI Queries'}
            </span>
            <div className="text-3xl font-black text-indigo-400 font-mono">{stats.geminiGenerationsCount}</div>
          </div>
        </div>
      )}

      {/* TAB 4: Add New Article Form */}
      {activeTab === 'add-article' && (
        <form onSubmit={handleSaveNewArticle} className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <h3 className="text-lg font-bold text-white">{t.adminTabAdd}</h3>
            <button
              type="button"
              onClick={() => setActiveTab('articles')}
              className="p-1 rounded-lg text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                {language === 'ar' ? 'عنوان المقال (بالعربية)' : 'Title (Arabic)'} *
              </label>
              <input
                type="text"
                required
                value={formData.titleAr}
                onChange={(e) => setFormData({ ...formData, titleAr: e.target.value })}
                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                {language === 'ar' ? 'القسم / التصنيف' : 'Category'} *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm"
              >
                <option value="galaxies">{t.sections.galaxies}</option>
                <option value="stars">{t.sections.stars}</option>
                <option value="solar-system">{t.sections['solar-system']}</option>
                <option value="black-holes">{t.sections['black-holes']}</option>
                <option value="nebulae">{t.sections.nebulae}</option>
                <option value="cosmic-distances">{t.sections['cosmic-distances']}</option>
                <option value="cosmology-origin">{t.sections['cosmology-origin']}</option>
                <option value="discoveries">{t.sections.discoveries}</option>
                <option value="quran-cosmos">{t.sections['quran-cosmos']}</option>
                <option value="reflections">{t.sections.reflections}</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">
              {language === 'ar' ? 'المقدمة والملخص العلمي' : 'Summary'}
            </label>
            <textarea
              rows={2}
              value={formData.summaryAr}
              onChange={(e) => setFormData({ ...formData, summaryAr: e.target.value })}
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                {t.readingLevelSimple}
              </label>
              <textarea
                rows={4}
                value={formData.contentSimpleAr}
                onChange={(e) => setFormData({ ...formData, contentSimpleAr: e.target.value })}
                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                {t.readingLevelAdvanced}
              </label>
              <textarea
                rows={4}
                value={formData.contentAdvancedAr}
                onChange={(e) => setFormData({ ...formData, contentAdvancedAr: e.target.value })}
                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm"
              />
            </div>
          </div>

          {/* Specs inputs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">{language === 'ar' ? 'القطر' : 'Diameter'}</label>
              <input
                type="text"
                placeholder="e.g. 100,000 ly"
                value={formData.diameter}
                onChange={(e) => setFormData({ ...formData, diameter: e.target.value })}
                className="w-full p-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">{language === 'ar' ? 'الكتلة' : 'Mass'}</label>
              <input
                type="text"
                placeholder="e.g. 1.5 × 10¹² M☉"
                value={formData.mass}
                onChange={(e) => setFormData({ ...formData, mass: e.target.value })}
                className="w-full p-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">{language === 'ar' ? 'الحرارة' : 'Temperature'}</label>
              <input
                type="text"
                placeholder="e.g. 5,500 °C"
                value={formData.temperature}
                onChange={(e) => setFormData({ ...formData, temperature: e.target.value })}
                className="w-full p-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">{language === 'ar' ? 'المسافة' : 'Distance'}</label>
              <input
                type="text"
                placeholder="e.g. 2.5 M ly"
                value={formData.distance}
                onChange={(e) => setFormData({ ...formData, distance: e.target.value })}
                className="w-full p-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setActiveTab('articles')}
              className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold"
            >
              {language === 'ar' ? 'إلغاء' : 'Cancel'}
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white font-bold text-xs shadow-lg shadow-cyan-600/20"
            >
              {language === 'ar' ? 'نشر المقال واعتماده' : 'Publish Article'}
            </button>
          </div>
        </form>
      )}
    </section>
  );
};
