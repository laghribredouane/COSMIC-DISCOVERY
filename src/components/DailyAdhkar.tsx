import React, { useState, useMemo, useEffect } from 'react';
import {
  Sun,
  Moon,
  Sparkles,
  Copy,
  Check,
  RotateCcw,
  CheckCircle2,
  BookmarkCheck,
  Compass,
  Heart,
} from 'lucide-react';
import { Language } from '../types/cosmic';

interface DailyAdhkarProps {
  language: Language;
}

type DhikrCategory = 'all' | 'morning' | 'evening' | 'cosmic' | 'tasbeeh';

interface DhikrItem {
  id: string;
  category: Exclude<DhikrCategory, 'all'>;
  title: { ar: string; en: string; fr: string };
  arabicText: string;
  translation: { en: string; fr: string };
  targetCount: number;
  virtue: { ar: string; en: string; fr: string };
  source: { ar: string; en: string; fr: string };
}

const DAILY_ADHKAR_LIST: DhikrItem[] = [
  {
    id: 'dhikr-sayyid-al-istighfar',
    category: 'morning',
    title: {
      ar: 'سيد الاستغفار',
      en: 'Master Supplication of Forgiveness',
      fr: 'La Maîtresse Demande de Pardon',
    },
    arabicText:
      'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ.',
    translation: {
      en: 'O Allah, You are my Lord, none has the right to be worshipped except You. You created me and I am Your servant, and I abide to Your covenant and promise as best I can...',
      fr: 'Ô Allah, Tu es mon Seigneur, nul ne mérite d’être adoré en dehors de Toi. Tu m’as créé et je suis Ton serviteur...',
    },
    targetCount: 1,
    virtue: {
      ar: 'من قالها موقناً بها في الصباح أو المساء ومات من يومه أو ليلته دخل الجنة.',
      en: 'Whoever recites it with firm conviction in the morning or evening and passes away that day or night enters Paradise.',
      fr: 'Celui qui la récite avec conviction le matin ou le soir entre au Paradis s’il décède ce jour ou cette nuit.',
    },
    source: {
      ar: 'صحيح البخاري (6306)',
      en: 'Sahih al-Bukhari (6306)',
      fr: 'Sahih al-Boukhari (6306)',
    },
  },
  {
    id: 'dhikr-morning-light',
    category: 'morning',
    title: {
      ar: 'ذكر مطلع الفجر والشمس',
      en: 'Morning Praise of Cosmic Creation',
      fr: 'Louange Matinale de la Création',
    },
    arabicText:
      'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَذَا الْيَوْمِ وَخَيْرَ مَا بَعْدَهُ.',
    translation: {
      en: 'We have reached the morning and at this very time all sovereignty belongs to Allah. All praise is for Allah. None has the right to be worshipped except Allah alone, without partner...',
      fr: 'Nous voici au matin et toute la souveraineté appartient à Allah. Louange à Allah, nul n’est digne d’adoration hormis Allah Seul...',
    },
    targetCount: 1,
    virtue: {
      ar: 'إقرار بتجديد الكون واليوم تحت ملكوت الله وحمده في مطلع كل صباح.',
      en: 'Daily affirmation acknowledging Allah’s sovereignty over time, light, and creation.',
      fr: 'Affirmation quotidienne reconnaissant la souveraineté d’Allah sur la création et le jour nouveau.',
    },
    source: {
      ar: 'صحيح مسلم (2723)',
      en: 'Sahih Muslim (2723)',
      fr: 'Sahih Mouslim (2723)',
    },
  },
  {
    id: 'dhikr-hasbiyallah',
    category: 'morning',
    title: {
      ar: 'ذكر الكفاية والتوكل (رب العرش العظيم)',
      en: 'Sufficiency & Reliance Upon the Lord of the Mighty Throne',
      fr: 'Confiance en le Seigneur du Trône Immense',
    },
    arabicText:
      'حَسْبِيَ اللَّهُ لَا إِلَهَ إِلَّا هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ.',
    translation: {
      en: 'Allah is sufficient for me. There is no deity except Him. On Him I have relied, and He is the Lord of the Great Throne.',
      fr: 'Allah me suffit. Il n’y a de divinité que Lui. En Lui je place ma confiance, et Il est le Seigneur du Trône immense.',
    },
    targetCount: 7,
    virtue: {
      ar: 'من قالها حين يصبح وحين يمسي سبع مرات كفاه الله ما أهمّه من أمر الدنيا والآخرة.',
      en: 'Recited 7 times morning and evening for divine sufficiency against worries.',
      fr: 'Récité 7 fois matin et soir pour être préservé des soucis de ce monde et de l’au-delà.',
    },
    source: {
      ar: 'التوبة: 129 • سنن أبي داود (5081)',
      en: 'Quran 9:129 • Sunan Abi Dawud (5081)',
      fr: 'Coran 9:129 • Sounan Abou Daoud (5081)',
    },
  },
  {
    id: 'dhikr-evening-nightfall',
    category: 'evening',
    title: {
      ar: 'ذكر المساء ودخول الليل',
      en: 'Evening Remembrance at Nightfall',
      fr: 'Invocation du Soir à la Tombée de la Nuit',
    },
    arabicText:
      'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَذِهِ اللَّيْلَةِ وَخَيْرَ مَا بَعْدَهَا.',
    translation: {
      en: 'We have reached the evening and at this very time all sovereignty belongs to Allah. All praise is for Allah...',
      fr: 'Nous voici au soir et toute la souveraineté appartient à Allah. Louange à Allah...',
    },
    targetCount: 1,
    virtue: {
      ar: 'سنة المساء التي تستقبل سكون الليل وتبدّل الأفلاك بالشكر والدعاء.',
      en: 'Prophetic evening remembrance welcoming the serenity of the night sky.',
      fr: 'Tradition prophétique du soir accueillant la sérénité de la nuit.',
    },
    source: {
      ar: 'صحيح مسلم (2723)',
      en: 'Sahih Muslim (2723)',
      fr: 'Sahih Mouslim (2723)',
    },
  },
  {
    id: 'dhikr-protection-heavens-earth',
    category: 'evening',
    title: {
      ar: 'الحصن في الأرض والسماء',
      en: 'Protection Across Earth and Heavens',
      fr: 'Protection sur Terre et dans les Cieux',
    },
    arabicText:
      'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ.',
    translation: {
      en: 'In the name of Allah, with whose name nothing on earth or in the heavens can cause harm, and He is the All-Hearing, the All-Knowing.',
      fr: 'Au nom d’Allah avec le nom duquel rien sur terre ni dans le ciel ne peut nuire, et Il est l’Audient, l’Omniscient.',
    },
    targetCount: 3,
    virtue: {
      ar: 'من قالها ثلاثاً إذا أصبح وثلاثاً إذا أمسى لم يضره شيء بإذن الله.',
      en: 'Recited 3 times in the morning and evening for complete divine protection.',
      fr: 'Récité 3 fois le matin et 3 fois le soir, rien ne saurait nuire par la permission d’Allah.',
    },
    source: {
      ar: 'سنن أبي داود (5088) والترمذي (3388) - حديث صحيح',
      en: 'Abi Dawud (5088) & Al-Tirmidhi (3388) - Sahih',
      fr: 'Abou Daoud (5088) & At-Tirmidhi (3388) - Sahih',
    },
  },
  {
    id: 'dhikr-cosmic-contemplation',
    category: 'cosmic',
    title: {
      ar: 'تسبيح التفكر في خلق السماوات والأرض',
      en: 'Contemplation of the Heavens & Earth',
      fr: 'Contemplation des Cieux et de la Terre',
    },
    arabicText:
      'رَبَّنَا مَا خَلَقْتَ هَٰذَا بَاطِلًا سُبْحَانَكَ فَقِنَا عَذَابَ النَّارِ ۞ اللَّهُمَّ لَكَ الْحَمْدُ أَنْتَ نُورُ السَّمَاوَاتِ وَالْأَرْضِ وَمَنْ فِيهِنَّ، وَلَكَ الْحَمْدُ أَنْتَ قَيِّمُ السَّمَاوَاتِ وَالْأَرْضِ وَمَنْ فِيهِنَّ.',
    translation: {
      en: 'Our Lord, You did not create this aimlessly; exalted are You! O Allah, to You belongs all praise: You are the Light of the heavens and the earth and all within them, and You are the Sustainer of the heavens and the earth.',
      fr: 'Seigneur, Tu n’as pas créé tout cela en vain ! Gloire à Toi ! Ô Allah, à Toi la louange, Tu es la Lumière des cieux et de la terre et Tu en es le Soutien.',
    },
    targetCount: 1,
    virtue: {
      ar: 'كان النبي ﷺ يدعو به إذا قام من الليل ونظر إلى آفاق السماء ونجومها.',
      en: 'Recited by the Prophet ﷺ during the stillness of the night while contemplating the skies.',
      fr: 'Invocation du Prophète ﷺ durant le calme de la nuit en contemplant la voûte céleste.',
    },
    source: {
      ar: 'آل عمران: 191 • متفق عليه (البخاري 1120 ومسلم 769)',
      en: 'Quran 3:191 • Bukhari (1120) & Muslim (769)',
      fr: 'Coran 3:191 • Boukhari (1120) & Mouslim (769)',
    },
  },
  {
    id: 'dhikr-hilal-new-moon',
    category: 'cosmic',
    title: {
      ar: 'دعاء رؤية الهلال وبداية الشهر القمري',
      en: 'Supplication Upon Sighting the Crescent Moon',
      fr: 'Invocation à l’Observation du Croissant Lunaire',
    },
    arabicText:
      'اللَّهُ أَكْبَرُ، اللَّهُمَّ أَهِلَّهُ عَلَيْنَا بِالْأَمْنِ وَالْإِيمَانِ، وَالسَّلَامَةِ وَالْإِسْلَامِ، وَالتَّوْفِيقِ لِمَا تُحِبُّ وَتَرْضَى، رَبُّنَا وَرَبُّكَ اللَّهُ.',
    translation: {
      en: 'Allah is the Greatest! O Allah, bring this crescent upon us with security and faith, with peace and Islam, and with success in doing what You love and are pleased with. Our Lord and your Lord is Allah.',
      fr: 'Allah est le Plus Grand ! Ô Allah, fais apparaître ce croissant pour nous avec sécurité, foi, paix et soumission. Notre Seigneur et ton Seigneur (ô lune) est Allah.',
    },
    targetCount: 1,
    virtue: {
      ar: 'يربط المسلم بين التوقيت القمري الفلكي وبين الدعاء والألفة مع مخلوقات الكون.',
      en: 'Unites astronomical lunar observation with gratitude and spiritual harmony.',
      fr: 'Relie l’observation astronomique du cycle lunaire à la gratitude et à la sérénité.',
    },
    source: {
      ar: 'سنن الترمذي (3451) والدارمي (1697) - حديث حسن صحيح',
      en: 'Al-Tirmidhi (3451) & Al-Darimi (1697)',
      fr: 'At-Tirmidhi (3451) & Ad-Darimi (1697)',
    },
  },
  {
    id: 'dhikr-subhanallah-creation-count',
    category: 'tasbeeh',
    title: {
      ar: 'التسبيح المضاعف بعدد الخلق',
      en: 'Glorification Equal to the Creation',
      fr: 'Glorification à la Mesure de la Création',
    },
    arabicText:
      'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ، عَدَدَ خَلْقِهِ، وَرِضَا نَفْسِهِ، وَزِنَةَ عَرْشِهِ، وَمِدَادَ كَلِمَاتِهِ.',
    translation: {
      en: 'Glory and praise be to Allah, as numerous as His creation, as pleasing to Himself, as weighty as His Throne, and as ink for His words.',
      fr: 'Gloire et louange à Allah autant de fois que Ses créatures, autant qu’Il le veut, du poids de Son Trône et autant que l’encre de Ses paroles.',
    },
    targetCount: 3,
    virtue: {
      ar: 'ثلاث كلمات جامعة تعدل الساعات الطوال من الذكر وتستحضر اتساع المخلوقات وثقل العرش.',
      en: 'Three repetitions in the morning carry immense weight and evoke cosmic scale.',
      fr: 'Trois répétitions le matin équivalant à de longues heures d’évocation.',
    },
    source: {
      ar: 'صحيح مسلم (2726)',
      en: 'Sahih Muslim (2726)',
      fr: 'Sahih Mouslim (2726)',
    },
  },
  {
    id: 'dhikr-baqiyat-salihat',
    category: 'tasbeeh',
    title: {
      ar: 'الباقيات الصالحات وتسبيح بحمده',
      en: 'SubhanAllah wa Bihamdihi (Light on the Tongue)',
      fr: 'SubhanAllah wa Bihamdihi (Louange Légère et Pesante)',
    },
    arabicText: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ، سُبْحَانَ اللَّهِ الْعَظِيمِ.',
    translation: {
      en: 'Glory and praise be to Allah; Glory be to Allah, the Supreme.',
      fr: 'Gloire et louange à Allah ; Gloire à Allah, l’Immense.',
    },
    targetCount: 33,
    virtue: {
      ar: 'كلمتان خفيفتان على اللسان، ثقيلتان في الميزان، حبيبتان إلى الرحمن.',
      en: 'Two phrases light on the tongue, heavy on the Scale, beloved to the Most Merciful.',
      fr: 'Deux paroles légères sur la langue, lourdes dans la Balance et aimées du Tout-Miséricordieux.',
    },
    source: {
      ar: 'متفق عليه: صحيح البخاري (6406) وصحيح مسلم (2694)',
      en: 'Agreed Upon: Bukhari (6406) & Muslim (2694)',
      fr: 'Boukhari (6406) & Mouslim (2694)',
    },
  },
];

const ADHKAR_COUNTS_STORAGE_KEY = 'cosmic_daily_adhkar_counts_v1';

function getTodayDateKey(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

function getDefaultPeriodCategory(): Exclude<DhikrCategory, 'all'> {
  const h = new Date().getHours();
  if (h >= 4 && h < 15) return 'morning';
  if (h >= 15 && h < 21) return 'evening';
  return 'cosmic';
}

export const DailyAdhkar: React.FC<DailyAdhkarProps> = ({ language }) => {
  const [selectedCategory, setSelectedCategory] = useState<DhikrCategory>(() =>
    getDefaultPeriodCategory()
  );
  const [counts, setCounts] = useState<Record<string, number>>(() => {
    if (typeof window === 'undefined') return {};
    try {
      const raw = localStorage.getItem(ADHKAR_COUNTS_STORAGE_KEY);
      if (!raw) return {};
      const parsed = JSON.parse(raw);
      if (parsed?.dateKey === getTodayDateKey() && parsed?.counts) {
        return parsed.counts;
      }
    } catch {
      // Ignore storage error
    }
    return {};
  });
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(
        ADHKAR_COUNTS_STORAGE_KEY,
        JSON.stringify({ dateKey: getTodayDateKey(), counts })
      );
    } catch {
      // Ignore storage error
    }
  }, [counts]);

  const timePeriodBanner = useMemo(() => {
    const h = new Date().getHours();
    if (h >= 4 && h < 15) {
      return {
        icon: Sun,
        label:
          language === 'ar'
            ? 'أذكار الصباح المأثورة'
            : language === 'fr'
            ? 'Invocations du Matin'
            : 'Morning Adhkar',
      };
    }
    if (h >= 15 && h < 21) {
      return {
        icon: Moon,
        label:
          language === 'ar'
            ? 'أذكار المساء والسكينة'
            : language === 'fr'
            ? 'Invocations du Soir'
            : 'Evening Adhkar',
      };
    }
    return {
      icon: Sparkles,
      label:
        language === 'ar'
          ? 'أذكار الليل والتفكر في السماء'
          : language === 'fr'
          ? 'Contemplation Nocturne du Ciel'
          : 'Night Sky Contemplation',
    };
  }, [language]);

  const filteredList = useMemo(() => {
    if (selectedCategory === 'all') return DAILY_ADHKAR_LIST;
    return DAILY_ADHKAR_LIST.filter((d) => d.category === selectedCategory);
  }, [selectedCategory]);

  const completedCount = useMemo(() => {
    return DAILY_ADHKAR_LIST.filter((d) => (counts[d.id] || 0) >= d.targetCount).length;
  }, [counts]);

  const handleIncrement = (item: DhikrItem) => {
    setCounts((prev) => {
      const current = prev[item.id] || 0;
      if (current >= item.targetCount) return prev;
      return { ...prev, [item.id]: current + 1 };
    });
  };

  const handleResetItem = (id: string) => {
    setCounts((prev) => ({ ...prev, [id]: 0 }));
  };

  const handleResetAll = () => {
    setCounts({});
  };

  const handleCopy = (item: DhikrItem) => {
    if (!navigator.clipboard) return;
    navigator.clipboard.writeText(`${item.arabicText}\n— ${item.source[language]}`);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId((prev) => (prev === item.id ? null : prev)), 2000);
  };

  const categories: Array<{
    id: DhikrCategory;
    label: { ar: string; en: string; fr: string };
    icon: React.ElementType;
  }> = [
    { id: 'all', label: { ar: 'جميع الأذكار', en: 'All Adhkar', fr: 'Toutes' }, icon: BookmarkCheck },
    { id: 'morning', label: { ar: 'أذكار الصباح', en: 'Morning', fr: 'Matin' }, icon: Sun },
    { id: 'evening', label: { ar: 'أذكار المساء', en: 'Evening', fr: 'Soir' }, icon: Moon },
    { id: 'cosmic', label: { ar: 'أذكار الكون والسماء', en: 'Sky & Cosmos', fr: 'Ciel & Cosmos' }, icon: Compass },
    { id: 'tasbeeh', label: { ar: 'التسبيح المضاعف', en: 'Tasbeeh', fr: 'Tasbih' }, icon: Heart },
  ];

  const PeriodIcon = timePeriodBanner.icon;

  return (
    <section
      id="daily-adhkar"
      data-testid="daily-adhkar-section"
      aria-label={language === 'ar' ? 'أذكار اليوم' : 'Daily Adhkar'}
      className="space-y-6"
    >
      <div className="rounded-3xl bg-gradient-to-br from-[#07151b] via-[#091022] to-[#131008] border border-emerald-500/30 p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2 text-xs text-emerald-300/90 font-semibold">
              <PeriodIcon className="w-4 h-4 text-amber-400" />
              <span>{timePeriodBanner.label}</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-slate-400">
                {language === 'ar'
                  ? 'حصن المسلم اليومي تحت سماء الكون'
                  : language === 'fr'
                  ? 'Citadelle du Croyant sous la Voûte Céleste'
                  : 'Daily Fortress & Remembrance Beneath the Cosmos'}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white text-balance">
              {language === 'ar'
                ? 'أذكار اليوم والذكر الكوني المأثور'
                : language === 'fr'
                ? 'Invocations Quotidiennes (Adhkar du Jour)'
                : 'Daily Adhkar & Prophetic Remembrances'}
            </h2>
          </div>

          {/* Daily Progress Indicator & Reset */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <div className="px-4 py-2.5 rounded-2xl bg-slate-950/90 border border-emerald-500/30 flex items-center gap-3">
              <div className="text-xs">
                <span className="text-slate-400 block text-[11px]">
                  {language === 'ar'
                    ? 'إنجاز اليوم:'
                    : language === 'fr'
                    ? 'Accompli aujourd’hui :'
                    : 'Today’s Progress:'}
                </span>
                <span className="font-mono tabular-nums font-black text-emerald-300 text-sm">
                  {completedCount} / {DAILY_ADHKAR_LIST.length}{' '}
                  <span className="font-sans text-[11px] font-bold text-slate-300">
                    {language === 'ar' ? 'ذكر مكتمل' : 'completed'}
                  </span>
                </span>
              </div>
              <div className="w-16 h-2 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-400 to-amber-400 transition-all duration-300"
                  style={{
                    width: `${Math.round((completedCount / DAILY_ADHKAR_LIST.length) * 100)}%`,
                  }}
                />
              </div>
            </div>

            {completedCount > 0 && (
              <button
                type="button"
                onClick={handleResetAll}
                className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white text-xs font-bold transition-colors cursor-pointer whitespace-nowrap"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{language === 'ar' ? 'تصفير العداد' : language === 'fr' ? 'Réinitialiser' : 'Reset All'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const active = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  active
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                    : 'bg-slate-900/80 text-slate-300 border border-slate-800 hover:border-emerald-500/40 hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label[language]}</span>
              </button>
            );
          })}
        </div>

        {/* Adhkar Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredList.map((item) => {
            const currentCount = counts[item.id] || 0;
            const isDone = currentCount >= item.targetCount;
            const progressPct = Math.min(100, Math.round((currentCount / item.targetCount) * 100));

            return (
              <article
                key={item.id}
                data-testid={`dhikr-card-${item.id}`}
                className={`rounded-2xl p-5 sm:p-6 border flex flex-col justify-between gap-4 transition-all ${
                  isDone
                    ? 'bg-emerald-950/35 border-emerald-500/50'
                    : 'bg-slate-950/75 border-slate-800 hover:border-amber-500/35'
                }`}
              >
                <div className="space-y-3">
                  {/* Quiet metadata line */}
                  <div className="flex items-center justify-between gap-2 text-xs text-slate-400">
                    <span className="font-bold text-amber-300">{item.title[language]}</span>
                    <span className="font-mono text-[11px] text-slate-400 shrink-0">
                      {item.source[language]}
                    </span>
                  </div>

                  {/* Arabic Dhikr Text */}
                  <p
                    dir="rtl"
                    className="font-quran text-lg sm:text-xl leading-loose text-amber-50/95 selection:bg-emerald-500/30"
                  >
                    {item.arabicText}
                  </p>

                  {language !== 'ar' && (
                    <p className="text-xs text-slate-300 leading-relaxed border-t border-slate-800/70 pt-2">
                      {item.translation[language]}
                    </p>
                  )}

                  {/* Virtue Note */}
                  <p className="text-xs text-emerald-200/80 leading-relaxed pt-1">
                    {item.virtue[language]}
                  </p>
                </div>

                {/* Interactive Counter & Copy Bar */}
                <div className="pt-3 border-t border-slate-800/80 space-y-2.5">
                  <div className="w-full h-1 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-200 ${
                        isDone ? 'bg-emerald-400' : 'bg-amber-400'
                      }`}
                      style={{ width: `${progressPct}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => handleIncrement(item)}
                      disabled={isDone}
                      data-testid={`dhikr-count-btn-${item.id}`}
                      className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-black flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        isDone
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 cursor-default'
                          : 'bg-gradient-to-r from-amber-500 to-emerald-500 hover:from-amber-400 hover:to-emerald-400 text-slate-950 shadow-md shadow-emerald-500/15 active:scale-[0.98]'
                      }`}
                    >
                      {isDone ? (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          <span>
                            {language === 'ar'
                              ? `تم الذكر (${item.targetCount}/${item.targetCount})`
                              : language === 'fr'
                              ? `Accompli (${item.targetCount}/${item.targetCount})`
                              : `Completed (${item.targetCount}/${item.targetCount})`}
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="font-mono tabular-nums text-sm">
                            {currentCount} / {item.targetCount}
                          </span>
                          <span>
                            {language === 'ar'
                              ? 'اضغط للتسبيح والعدّ'
                              : language === 'fr'
                              ? 'Appuyer pour compter'
                              : 'Tap to Count'}
                          </span>
                        </>
                      )}
                    </button>

                    <div className="flex items-center gap-1.5">
                      {currentCount > 0 && (
                        <button
                          type="button"
                          onClick={() => handleResetItem(item.id)}
                          title={language === 'ar' ? 'إعادة ضبط' : 'Reset counter'}
                          aria-label="Reset counter"
                          className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                        >
                          <RotateCcw className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => handleCopy(item)}
                        title={language === 'ar' ? 'نسخ الذكر' : 'Copy Dhikr'}
                        aria-label="Copy Dhikr"
                        className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer"
                      >
                        {copiedId === item.id ? (
                          <Check className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
