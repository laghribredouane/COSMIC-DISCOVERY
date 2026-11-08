import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateLightTravelTime,
  calculateCelestialRatio,
  evaluateQuizPerformance,
  filterArticlesList,
  searchQuranStudiesList,
  calculateMoonPhase,
  filterCelestialEventsList
} from './cosmicCalculations';
import { ScientificArticle, QuranVerseStudy } from '../types/cosmic';

test('calculateLightTravelTime returns instant for zero or negative distances', () => {
  const resultZero = calculateLightTravelTime(0);
  assert.equal(resultZero.seconds, 0);
  assert.match(resultZero.formatted.ar, /0 ثانية/);

  const resultNegative = calculateLightTravelTime(-500);
  assert.equal(resultNegative.seconds, 0);
});

test('calculateLightTravelTime calculates Moon-to-Earth light travel time accurately (~1.3s)', () => {
  const earthMoonDistanceKm = 384400;
  const result = calculateLightTravelTime(earthMoonDistanceKm);
  // 384400 / 299792.458 = ~1.282 seconds
  assert.ok(result.seconds > 1.25 && result.seconds < 1.35);
  assert.match(result.formatted.ar, /ثانية/);
  assert.match(result.formatted.en, /seconds/);
});

test('calculateLightTravelTime calculates Sun-to-Earth light travel time accurately (~8.3 min)', () => {
  const sunEarthDistanceKm = 149600000;
  const result = calculateLightTravelTime(sunEarthDistanceKm);
  // 149600000 / 299792.458 = 499 seconds = ~8 min 19 sec
  assert.ok(result.seconds > 495 && result.seconds < 505);
  assert.match(result.formatted.ar, /8 دقيقة/);
  assert.match(result.formatted.en, /8 min/);
});

test('calculateCelestialRatio calculates diameter and volume scale ratios between Sun and Earth', () => {
  const sunDiameter = 1392700;
  const earthDiameter = 12742;
  const ratio = calculateCelestialRatio(sunDiameter, earthDiameter);
  // Sun diameter is ~109x Earth
  assert.ok(ratio.diameterRatio > 108 && ratio.diameterRatio < 110);
  // Volume ratio is ~1.3 million
  assert.ok(ratio.volumeRatio > 1200000 && ratio.volumeRatio < 1400000);
});

test('evaluateQuizPerformance assigns ranks and feedback properly', () => {
  const perfect = evaluateQuizPerformance(10, 10, 'ar');
  assert.equal(perfect.percentage, 100);
  assert.equal(perfect.rankKey, 'cosmologist');
  assert.ok(perfect.feedback.length > 0);

  const good = evaluateQuizPerformance(10, 8, 'en');
  assert.equal(good.percentage, 80);
  assert.equal(good.rankKey, 'astronomer');

  const medium = evaluateQuizPerformance(10, 5, 'fr');
  assert.equal(medium.percentage, 50);
  assert.equal(medium.rankKey, 'explorer');

  const beginner = evaluateQuizPerformance(10, 2, 'ar');
  assert.equal(beginner.percentage, 20);
  assert.equal(beginner.rankKey, 'novice');
});

test('filterArticlesList matches category and keyword in various languages', () => {
  const mockArticles: ScientificArticle[] = [
    {
      id: 'a1',
      title: { ar: 'مجرة المرأة المسلسلة (أندروميدا)', en: 'Andromeda Galaxy', fr: 'Galaxie d’Andromède' },
      category: 'galaxies',
      summary: { ar: 'أقرب مجرة حلزونية كبرى إلى درب التبانة', en: 'Nearest major spiral galaxy to Milky Way', fr: 'Plus proche grande galaxie spirale' },
      introduction: { ar: 'مقدمة', en: 'Intro', fr: 'Intro' },
      contentSimple: { ar: 'شرح مبسط', en: 'Simple', fr: 'Simple' },
      contentAdvanced: { ar: 'شرح متقدم', en: 'Advanced', fr: 'Advanced' },
      keyFacts: { ar: ['تحتوي على تريليون نجم'], en: ['Contains 1 trillion stars'], fr: ['Contient 1 billion d’étoiles'] },
      specs: { diameter: '220,000 ly' },
      image: '',
      imageCaption: { ar: '', en: '', fr: '' },
      imageCredit: 'NASA',
      sources: [{ title: 'NASA' }],
      lastUpdated: '2026-01-01',
      isApproved: true,
      readingTimeMin: 5,
      views: 120,
      likes: 15
    },
    {
      id: 'a2',
      title: { ar: 'الثقوب السوداء الفائقة', en: 'Supermassive Black Holes', fr: 'Trous Noirs Supermassifs' },
      category: 'black-holes',
      summary: { ar: 'وحوش الجاذبية في مراكز المجرات', en: 'Gravitational monsters at galactic centers', fr: 'Monstres gravitationnels' },
      introduction: { ar: 'مقدمة', en: 'Intro', fr: 'Intro' },
      contentSimple: { ar: 'شرح مبسط', en: 'Simple', fr: 'Simple' },
      contentAdvanced: { ar: 'شرح متقدم', en: 'Advanced', fr: 'Advanced' },
      keyFacts: { ar: ['كتلة تزيد عن ملايين الشموس'], en: ['Mass over millions of suns'], fr: ['Masse de millions de soleils'] },
      specs: { mass: 'Millions of solar masses' },
      image: '',
      imageCaption: { ar: '', en: '', fr: '' },
      imageCredit: 'EHT',
      sources: [{ title: 'Event Horizon Telescope' }],
      lastUpdated: '2026-01-01',
      isApproved: true,
      readingTimeMin: 6,
      views: 95,
      likes: 22
    }
  ];

  // Category filter
  const galaxiesOnly = filterArticlesList(mockArticles, '', 'galaxies', 'ar');
  assert.equal(galaxiesOnly.length, 1);
  assert.equal(galaxiesOnly[0].id, 'a1');

  // Search keyword in Arabic
  const searchResult = filterArticlesList(mockArticles, 'جاذبية', 'all', 'ar');
  assert.equal(searchResult.length, 1);
  assert.equal(searchResult[0].id, 'a2');

  // Search keyword in English
  const searchEn = filterArticlesList(mockArticles, 'spiral', 'all', 'en');
  assert.equal(searchEn.length, 1);
  assert.equal(searchEn[0].id, 'a1');
});

test('searchQuranStudiesList locates verse by surah name, number, or Arabic text', () => {
  const mockStudies: QuranVerseStudy[] = [
    {
      id: 'q1',
      surah: { ar: 'الذاريات', en: 'Adh-Dhariyat', fr: 'Adh-Dhariyat' },
      surahNumber: 51,
      ayahNumber: 47,
      arabicText: 'وَالسَّمَاءَ بَنَيْنَاهَا بِأَيْدٍ وَإِنَّا لَمُوسِعُونَ',
      translation: { en: 'And the heaven We constructed with strength, and indeed, We are [its] expander.', fr: 'Le ciel, Nous l’avons construit par Notre puissance et Nous l’élargissons constamment.' },
      classicalTafsir: { source: 'تفسير ابن كثير', text: 'أي وسعنا أرجاءها ورفعناها بغير عمد' },
      modernScientificContext: { ar: 'اكتشاف تمدد الكون عبر إدوين هابل ومسبار بلانك', en: 'Discovery of the expanding universe by Edwin Hubble', fr: 'Découverte de l’expansion de l’univers' },
      contemplationNote: { ar: 'تأمل في دقة التعبير القرآني وموافقة المعنى اللغوي مع اتساع الفضاء', en: 'Contemplation on the linguistic resonance with cosmic expansion', fr: 'Méditation sur la résonance linguistique' },
      methodologicalGuideline: { ar: 'بيان أن الآية أصلها التبجيل والقدرة ولا يجوز تحميل اللفظ ما لا يحتمل', en: 'Guidelines against over-interpreting', fr: 'Lignes directrices méthodologiques' },
      sources: ['تفسير ابن كثير', 'NASA Hubble cosmology archive']
    }
  ];

  const bySurah = searchQuranStudiesList(mockStudies, 'الذاريات', 'ar');
  assert.equal(bySurah.length, 1);

  const byAyahNumber = searchQuranStudiesList(mockStudies, '47', 'ar');
  assert.equal(byAyahNumber.length, 1);

  const byText = searchQuranStudiesList(mockStudies, 'لموسعون', 'ar');
  assert.equal(byText.length, 1);

  const byMissing = searchQuranStudiesList(mockStudies, 'البقرة', 'ar');
  assert.equal(byMissing.length, 0);
});

test('calculateMoonPhase returns valid illumination and phase details', () => {
  const moonNow = calculateMoonPhase(new Date());
  assert.ok(moonNow.moonAgeDays >= 0 && moonNow.moonAgeDays <= 30);
  assert.ok(moonNow.illuminationFraction >= 0 && moonNow.illuminationFraction <= 1);
  assert.ok(moonNow.icon.length > 0);
  assert.ok(moonNow.phaseName.ar.length > 0);
  assert.ok(moonNow.phaseName.en.length > 0);
});

test('filterCelestialEventsList filters by type and searches title in Arabic and English', () => {
  const mockEvents = [
    {
      id: 'e1',
      title: { ar: 'زخة شهب البرشاويات الفائقة', en: 'Perseid Meteor Shower', fr: 'Pluie d’étoiles filantes des Perséides' },
      type: 'meteor-shower' as const,
      date: '2026-08-12',
      visibilityRegion: { ar: 'عالمي', en: 'Global', fr: 'Global' },
      description: { ar: 'شهب سريعة ومضيئة', en: 'Bright and swift meteors', fr: 'Météores lumineux' },
      observationGuide: { ar: 'انظر نحو الشمال الشرقي', en: 'Look north-east', fr: 'Regardez vers le nord-est' },
      specs: { ratePerHour: 100, opticalAidRequired: { ar: 'بالعين المجردة', en: 'Naked eye', fr: 'À l’œil nu' } }
    },
    {
      id: 'e2',
      title: { ar: 'كسوف شمسي كلي', en: 'Total Solar Eclipse', fr: 'Éclipse Solaire Totale' },
      type: 'eclipse' as const,
      date: '2026-08-12',
      visibilityRegion: { ar: 'أوروبا والشرق الأوسط', en: 'Europe & Middle East', fr: 'Europe et Moyen-Orient' },
      description: { ar: 'يحجب القمر قرص الشمس كلياً', en: 'Moon occults solar disk completely', fr: 'Occultation totale' },
      observationGuide: { ar: 'استخدم نظارات الكسوف المعتمدة', en: 'Use solar eclipse glasses', fr: 'Lunettes spéciales' },
      specs: { opticalAidRequired: { ar: 'نظارات كسوف معتمدة', en: 'Certified glasses', fr: 'Lunettes certifiées' } }
    }
  ];

  const showersOnly = filterCelestialEventsList(mockEvents, 'meteor-shower', '', 'ar');
  assert.equal(showersOnly.length, 1);
  assert.equal(showersOnly[0].id, 'e1');

  const searchEclipse = filterCelestialEventsList(mockEvents, 'all', 'كسوف', 'ar');
  assert.equal(searchEclipse.length, 1);
  assert.equal(searchEclipse[0].id, 'e2');
});

