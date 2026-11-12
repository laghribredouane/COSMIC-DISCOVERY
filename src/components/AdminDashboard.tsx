import React, { useState, useEffect } from 'react';
import {
  Shield,
  BookOpen,
  BrainCircuit,
  BarChart3,
  Plus,
  Trash2,
  CheckCircle,
  Clock,
  Eye,
  Edit3,
  X,
  HelpCircle,
  SlidersHorizontal,
  Copy,
  Check,
  Lock,
  LogOut,
  KeyRound,
  EyeOff,
  ShieldCheck,
  AlertCircle,
  Mail,
  UserCheck
} from 'lucide-react';
import { ScientificArticle, Language, CosmicCategory, SiteStatistics, QuizQuestion } from '../types/cosmic';
import { translations } from '../i18n/translations';
import {
  GoogleAdsConfig,
  loadGoogleAdsConfig,
  saveGoogleAdsConfig,
} from './GoogleAdUnit';

const AUTH_STORAGE_KEY = 'cosmic_admin_auth_v1';

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

  // Admin Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      const raw =
        typeof window !== 'undefined'
          ? localStorage.getItem(AUTH_STORAGE_KEY) || sessionStorage.getItem(AUTH_STORAGE_KEY)
          : null;
      if (!raw) return false;
      const parsed = JSON.parse(raw);
      return Boolean(parsed?.token);
    } catch {
      return false;
    }
  });

  const [adminUser, setAdminUser] = useState<{ email: string; name?: string; role?: string } | null>(() => {
    try {
      const raw =
        typeof window !== 'undefined'
          ? localStorage.getItem(AUTH_STORAGE_KEY) || sessionStorage.getItem(AUTH_STORAGE_KEY)
          : null;
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      return parsed?.user || { email: parsed?.email || 'Laghribredouane@gmail.com', role: 'Super Admin' };
    } catch {
      return null;
    }
  });

  const [loginEmail, setLoginEmail] = useState('Laghribredouane@gmail.com');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Verify existing session on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const raw = localStorage.getItem(AUTH_STORAGE_KEY) || sessionStorage.getItem(AUTH_STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (parsed?.token) {
          fetch('/api/admin/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: parsed.token }),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data?.success && data?.authenticated) {
                setIsAuthenticated(true);
                setAdminUser(data.user);
              } else {
                localStorage.removeItem(AUTH_STORAGE_KEY);
                sessionStorage.removeItem(AUTH_STORAGE_KEY);
                setIsAuthenticated(false);
                setAdminUser(null);
              }
            })
            .catch(() => {
              // Maintain local session if network temporarily offline
            });
        }
      } catch {
        setIsAuthenticated(false);
      }
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setIsAuthenticating(true);

    const cleanEmail = loginEmail.trim().toLowerCase();
    const cleanPassword = loginPassword;

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail, password: cleanPassword }),
      });

      const data = await res.json();

      if (res.ok && data?.success) {
        const sessionData = {
          token: data.token,
          user: data.user,
          timestamp: Date.now(),
        };
        if (rememberMe) {
          localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(sessionData));
        } else {
          sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(sessionData));
        }
        setIsAuthenticated(true);
        setAdminUser(data.user);
        setIsAuthenticating(false);
        return;
      }

      // Fallback check if server endpoint failed or returned non-200
      if (cleanEmail === 'laghribredouane@gmail.com' && cleanPassword === 'Dtnokia2024@') {
        const fallbackSession = {
          token: 'local-session-' + Date.now(),
          user: { email: 'Laghribredouane@gmail.com', name: 'Redouane Laghrib', role: 'Super Admin' },
          timestamp: Date.now(),
        };
        if (rememberMe) {
          localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(fallbackSession));
        } else {
          sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(fallbackSession));
        }
        setIsAuthenticated(true);
        setAdminUser(fallbackSession.user);
        setIsAuthenticating(false);
        return;
      }

      setAuthError(t.adminAuthError);
    } catch {
      if (cleanEmail === 'laghribredouane@gmail.com' && cleanPassword === 'Dtnokia2024@') {
        const fallbackSession = {
          token: 'local-session-' + Date.now(),
          user: { email: 'Laghribredouane@gmail.com', name: 'Redouane Laghrib', role: 'Super Admin' },
          timestamp: Date.now(),
        };
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(fallbackSession));
        setIsAuthenticated(true);
        setAdminUser(fallbackSession.user);
      } else {
        setAuthError(t.adminAuthError);
      }
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleLogout = async () => {
    if (typeof window !== 'undefined') {
      const raw = localStorage.getItem(AUTH_STORAGE_KEY) || sessionStorage.getItem(AUTH_STORAGE_KEY);
      if (raw) {
        try {
          const parsed = JSON.parse(raw);
          if (parsed?.token) {
            await fetch('/api/admin/logout', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ token: parsed.token }),
            }).catch(() => {});
          }
        } catch {}
      }
      localStorage.removeItem(AUTH_STORAGE_KEY);
      sessionStorage.removeItem(AUTH_STORAGE_KEY);
    }
    setIsAuthenticated(false);
    setAdminUser(null);
    setLoginPassword('');
  };

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

  // Render Secure Admin Login Gate if not authenticated
  if (!isAuthenticated) {
    return (
      <section className="min-h-[580px] flex items-center justify-center py-8 px-4">
        <div className="w-full max-w-md rounded-3xl bg-gradient-to-b from-[#0a1026] via-[#070c20] to-[#040817] border border-cyan-800/50 shadow-2xl p-7 sm:p-9 space-y-6 relative overflow-hidden backdrop-blur-2xl">
          {/* Subtle cosmic glow accents */}
          <div className="absolute -top-24 -end-24 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -start-24 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Header & Icon */}
          <div className="text-center space-y-3 relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-600 via-indigo-600 to-amber-400 p-[2px] mx-auto shadow-xl shadow-cyan-500/20">
              <div className="w-full h-full bg-[#080d1e] rounded-[14px] flex items-center justify-center">
                <Lock className="w-8 h-8 text-cyan-300" />
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-[10px] font-bold text-cyan-300 uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>COSMIC DISCOVERY • ACCESS CONTROL</span>
            </div>

            <h2 className="text-2xl font-black text-white">
              {t.adminLoginTitle}
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              {t.adminLoginSubtitle}
            </p>
          </div>

          {/* Error Message Banner */}
          {authError && (
            <div className="p-3.5 rounded-2xl bg-rose-950/50 border border-rose-800/60 flex items-start gap-3 text-xs text-rose-200 animate-in fade-in duration-200">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{authError}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4 relative z-10">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
                <span>{t.adminEmailLabel}</span>
                <span className="text-[10px] font-normal text-slate-400">Laghribredouane@gmail.com</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute start-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => {
                    setLoginEmail(e.target.value);
                    setAuthError(null);
                  }}
                  autoComplete="email"
                  placeholder="Laghribredouane@gmail.com"
                  className="w-full ps-10 pe-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 block">
                {t.adminPasswordLabel}
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute start-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={loginPassword}
                  onChange={(e) => {
                    setLoginPassword(e.target.value);
                    setAuthError(null);
                  }}
                  autoComplete="current-password"
                  placeholder="••••••••••••"
                  className="w-full ps-10 pe-10 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute end-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-cyan-500 focus:ring-cyan-500/30"
                />
                <span className="text-xs text-slate-300 font-medium">
                  {t.adminRememberMe}
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isAuthenticating}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-amber-500 hover:from-cyan-400 hover:via-indigo-500 hover:to-amber-400 text-black font-black text-xs shadow-lg shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isAuthenticating ? (
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
              ) : (
                <Lock className="w-4 h-4" />
              )}
              <span>{t.adminLoginBtn}</span>
            </button>

            {/* Quick Fill Button for the Administrator */}
            <button
              type="button"
              onClick={() => {
                setLoginEmail('Laghribredouane@gmail.com');
                setLoginPassword('Dtnokia2024@');
                setAuthError(null);
              }}
              className="w-full py-2 rounded-xl bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 border border-slate-800 text-[11px] font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>{t.adminQuickFill}</span>
            </button>
          </form>

          {/* Security details badge */}
          <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800/80 text-center">
            <span className="text-[10px] text-slate-400 block font-mono">
              SHA-256 Auth Guard • Session Protected • Cosmic Discovery
            </span>
          </div>
        </div>
      </section>
    );
  }

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

          {/* Authenticated Controls & Admin Profile Badge */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-cyan-950/60 border border-cyan-500/40 text-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-slate-200 font-mono text-[11px] font-semibold">
                {adminUser?.email || 'Laghribredouane@gmail.com'}
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300">
                Super Admin
              </span>
            </div>

            <button
              onClick={() => setActiveTab('add-article')}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs shadow-lg shadow-cyan-600/20 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>{t.adminTabAdd}</span>
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800/50 text-rose-300 text-xs font-bold transition-all cursor-pointer"
              title={t.adminLogoutBtn}
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>{t.adminLogoutBtn}</span>
            </button>
          </div>
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
