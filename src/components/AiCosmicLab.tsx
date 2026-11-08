import React, { useState } from 'react';
import { BrainCircuit, Send, Sparkles, Scale, BookOpen, Layers, Check, Copy, AlertCircle, BookmarkPlus } from 'lucide-react';
import { Language, ScientificArticle } from '../types/cosmic';
import { translations } from '../i18n/translations';

interface AiCosmicLabProps {
  language: Language;
  onSaveArticleDraft?: (article: Partial<ScientificArticle>) => void;
}

export const AiCosmicLab: React.FC<AiCosmicLabProps> = ({ language, onSaveArticleDraft }) => {
  const t = translations[language];

  const [mode, setMode] = useState<'ask' | 'article' | 'compare' | 'reflection'>('ask');
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  const samplePrompts = {
    ask: [
      {
        ar: 'ما هو المصير النهائي لشمسنا بعد 5 مليارات سنة عند استنفاد وقود الهيدروجين؟',
        en: 'What is the ultimate fate of our Sun in 5 billion years when hydrogen fuel is depleted?',
        fr: 'Quel est le destin final du Soleil dans 5 milliards d’années lorsque l’hydrogène sera épuisé ?'
      },
      {
        ar: 'كيف ترصد مراصد LIGO وVirgo موجات الجاذبية الناتجة عن اصطدام الثقوب السوداء؟',
        en: 'How do LIGO and Virgo observatories detect gravitational waves from merging black holes?',
        fr: 'Comment les observatoires LIGO et Virgo détectent-ils les ondes gravitationnelles de fusion de trous noirs ?'
      }
    ],
    article: [
      {
        ar: 'المستعرات العظمى (Supernovae): محركات تخصيب الكون بالعناصر الثقيلة',
        en: 'Supernovae: Cosmic Engines Enriching the Universe with Heavy Elements',
        fr: 'Supernovae : Moteurs Cosmiques Enrichissant l’Univers en Éléments Lourds'
      },
      {
        ar: 'سديم كارينا (الجؤجؤ): جبال الغاز وحاضنات النجوم الشابة',
        en: 'The Carina Nebula: Gas Mountains and Stellar Nurseries',
        fr: 'La Nébuleuse de la Carène : Montagnes de Gaz et Pouponnières d’Étoiles'
      }
    ],
    compare: [
      {
        ar: 'مقارنة فيزيائية شاملة بين كوكب الأرض وكوكب الزهرة من حيث الضغط والمناخ والحجم',
        en: 'In-depth physical comparison between Earth and Venus (pressure, climate, scale)',
        fr: 'Comparaison physique approfondie entre la Terre et Vénus (pression, climat, dimensions)'
      },
      {
        ar: 'مقارنة بين النجوم النيوترونية والثقوب السوداء النجمية',
        en: 'Comparison between Neutron Stars and Stellar-Mass Black Holes',
        fr: 'Comparaison entre Étoiles à Neutrons et Trous Noirs Stellaires'
      }
    ],
    reflection: [
      {
        ar: 'تأمل في دقة التوازن الفلكي المداري في قوله تعالى (وكل في فلك يسبحون) مع حركة الشمس في درب التبانة',
        en: 'Contemplation on orbital precision in "Each swimming in an orbit" and galactic solar motion',
        fr: 'Méditation sur l’harmonie orbitale et le mouvement galactique du Soleil'
      },
      {
        ar: 'تأمل علمي منضبط في نشأة الحديد النجمي وتوافقه مع قوله تعالى (وأنزلنا الحديد)',
        en: 'Disciplined scientific reflection on stellar iron genesis and the phrasing "sent down iron"',
        fr: 'Réflexion scientifique disciplinée sur l’origine stellaire du fer'
      }
    ]
  };

  const handleSend = async (customPrompt?: string) => {
    const textToSend = customPrompt || prompt;
    if (!textToSend.trim() || loading) return;

    setLoading(true);
    setError(null);
    setResult(null);
    setSaved(false);

    try {
      const response = await fetch('/api/gemini/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          prompt: textToSend,
          mode,
          language,
        }),
      });

      const rawText = await response.text();
      const trimmed = rawText.trim();

      if (!trimmed || trimmed.startsWith('<')) {
        throw new Error(
          language === 'ar'
            ? 'الخادم قيد التحديث اللحظي، يرجى المحاولة مرة أخرى بعد ثوانٍ.'
            : 'The server is refreshing. Please try again in a moment.'
        );
      }

      const data = JSON.parse(trimmed);

      if (!response.ok || data.error) {
        throw new Error(data.error || 'Failed to communicate with Gemini API');
      }

      setResult(data.result);
    } catch (err: any) {
      setError(
        err?.message ||
          (language === 'ar'
            ? 'حدث خطأ أثناء الاتصال بمحرك الذكاء الاصطناعي.'
            : 'Error occurred while contacting Gemini')
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSaveToDrafts = () => {
    if (!result || !onSaveArticleDraft) return;

    onSaveArticleDraft({
      title: {
        ar: prompt.slice(0, 80),
        en: prompt.slice(0, 80),
        fr: prompt.slice(0, 80)
      },
      category: 'discoveries',
      summary: {
        ar: result.slice(0, 200) + '...',
        en: result.slice(0, 200) + '...',
        fr: result.slice(0, 200) + '...'
      },
      contentSimple: {
        ar: result,
        en: result,
        fr: result
      },
      contentAdvanced: {
        ar: result,
        en: result,
        fr: result
      },
      isGeminiGenerated: true,
      isApproved: false,
      lastUpdated: new Date().toISOString().split('T')[0]
    });

    setSaved(true);
  };

  const handleCopy = () => {
    if (result && navigator.clipboard) {
      navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="p-8 rounded-3xl bg-gradient-to-br from-indigo-950/80 via-slate-900/90 to-[#080d22]/90 border border-indigo-500/30 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-3 rounded-2xl bg-indigo-500/20 text-indigo-400">
            <BrainCircuit className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">{t.aiLabTitle}</h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-0.5">{t.aiLabDesc}</p>
          </div>
        </div>
      </div>

      {/* Mode Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {[
          { id: 'ask', label: t.aiTabAsk, icon: Sparkles },
          { id: 'article', label: t.aiTabGenerateArticle, icon: BookOpen },
          { id: 'compare', label: t.aiTabCompare, icon: Scale },
          { id: 'reflection', label: t.aiTabQuranReflection, icon: Layers },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = mode === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setMode(tab.id as any);
                setResult(null);
                setError(null);
              }}
              className={`p-3.5 rounded-2xl border text-start flex items-center gap-3 font-bold text-xs sm:text-sm transition-all ${
                isActive
                  ? 'bg-indigo-600/20 border-indigo-400 text-white shadow-lg shadow-indigo-600/20'
                  : 'bg-slate-900/70 border-slate-800 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Prompt Suggestions */}
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
          {language === 'ar' ? 'مقترحات بحثية سريعة:' : 'Quick Prompt Suggestions:'}
        </span>
        <div className="flex flex-wrap gap-2">
          {samplePrompts[mode].map((sample, idx) => (
            <button
              key={idx}
              onClick={() => {
                const text = sample[language] || sample.ar;
                setPrompt(text);
                handleSend(text);
              }}
              className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-400 text-xs text-slate-300 hover:text-white transition-colors text-start"
            >
              💡 {sample[language] || sample.ar}
            </button>
          ))}
        </div>
      </div>

      {/* Input Box */}
      <div className="p-4 sm:p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
        <textarea
          rows={4}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={t.aiPlaceholder}
          className="w-full p-4 rounded-2xl bg-slate-950/80 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-400 resize-none"
        />

        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs text-slate-400">
            {t.aiDisclaimer}
          </span>

          <button
            onClick={() => handleSend()}
            disabled={loading || !prompt.trim()}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-400 hover:to-cyan-400 text-white font-bold text-sm shadow-lg shadow-indigo-600/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>{t.aiGenerating}</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>{t.btnSendAi}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Error state */}
      {error && (
        <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-500/40 text-rose-200 text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div>
            <strong className="block font-bold mb-1">
              {language === 'ar' ? 'تعذر استدعاء الذكاء الاصطناعي' : 'Gemini Request Notice'}
            </strong>
            <p>{error}</p>
          </div>
        </div>
      )}

      {/* Result Display */}
      {result && (
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-cyan-800/40 shadow-2xl backdrop-blur-xl space-y-6 animate-in fade-in">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-300" />
              <span className="text-sm font-bold text-white uppercase tracking-wider">
                {language === 'ar' ? 'إجابة Gemini العلمية الموثقة' : 'Gemini Verified Scientific Response'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                title="Copy"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>

              {onSaveArticleDraft && (
                <button
                  onClick={handleSaveToDrafts}
                  disabled={saved}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                    saved
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                  }`}
                >
                  <BookmarkPlus className="w-3.5 h-3.5" />
                  <span>
                    {saved
                      ? (language === 'ar' ? 'تم الحفظ في المسودات' : 'Saved to Drafts')
                      : (language === 'ar' ? 'حفظ كمسودة للإدارة' : 'Save to Admin Drafts')}
                  </span>
                </button>
              )}
            </div>
          </div>

          <div className="prose prose-invert max-w-none text-slate-100 leading-relaxed text-sm sm:text-base whitespace-pre-wrap font-sans">
            {result}
          </div>
        </div>
      )}
    </div>
  );
};
