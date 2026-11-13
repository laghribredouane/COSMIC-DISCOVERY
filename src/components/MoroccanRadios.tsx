import React, { useState, useEffect, useRef } from 'react';
import Hls from 'hls.js';
import {
  Radio,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Search,
  Heart,
  ExternalLink,
  RefreshCw,
  BookOpen,
  Globe2,
  MapPin,
  Mic,
  Music,
  Loader2,
  AlertCircle,
  Sparkles,
  Signal
} from 'lucide-react';
import { Language } from '../types/cosmic';

interface MoroccanRadiosProps {
  language: Language;
}

type RadioCategory = 'all' | 'quran' | 'national' | 'regional' | 'news-general' | 'sports-music' | 'favorites';

interface MoroccanStation {
  id: string;
  name: { ar: string; en: string; fr: string };
  subtitle: { ar: string; en: string; fr: string };
  category: Exclude<RadioCategory, 'all' | 'favorites'>;
  streamUrl: string;
  sourcePageUrl: string;
  city: { ar: string; en: string; fr: string };
  frequency?: string;
  network: string;
  accentColor: string;
}

const MOROCCAN_STATIONS: MoroccanStation[] = [
  {
    id: 'idaa-mohammed-assadiss',
    name: {
      ar: 'إذاعة محمد السادس للقرآن الكريم',
      en: 'Idaât Mohammed Assadiss (Quran)',
      fr: 'Radio Mohammed VI du Saint Coran'
    },
    subtitle: {
      ar: 'تلاوات قرآنية متواصلة برواية ورش عن نافع وبرامج التفسير والسيرة والفقه على مدار الساعة',
      en: '24/7 Holy Quran recitations in Moroccan Warsh reading, Tafsir, and Islamic heritage programs',
      fr: 'Récitations du Saint Coran 24h/24 selon la lecture Warsh, exégèse et programmes religieux'
    },
    category: 'quran',
    streamUrl: 'https://radoxo.com/stream/eb/radio_med_VI.m3u8',
    sourcePageUrl: 'https://radiomaroc.org/71-idaa-mohammed-assadiss.html',
    city: { ar: 'الرباط • تغطية وطنية شاملة', en: 'Rabat • Nationwide', fr: 'Rabat • Couverture Nationale' },
    frequency: '94.2 / 98.6 FM',
    network: 'SNRT',
    accentColor: 'from-amber-500 to-emerald-600'
  },
  {
    id: 'idaa-al-watania',
    name: {
      ar: 'الإذاعة الوطنية المغربية',
      en: 'Al Idaa Al Watania (National Radio)',
      fr: 'Radio Nationale Marocaine (SNRT)'
    },
    subtitle: {
      ar: 'القناة الإذاعية الوطنية الأم للبرامج الثقافية والأخبار الوطنية والرياضة والمجتمع',
      en: 'Morocco’s flagship national public broadcast covering news, culture, society, and national events',
      fr: 'La radio nationale publique de référence pour l’actualité, la culture et les grands débats'
    },
    category: 'national',
    streamUrl: 'https://radoxo.com/stream/eb/radio_nationale.m3u8',
    sourcePageUrl: 'https://radiomaroc.org/70-idaa-al-watania.html',
    city: { ar: 'الرباط • البث الوطني', en: 'Rabat • National', fr: 'Rabat • National' },
    frequency: '93.5 / 100.7 FM',
    network: 'SNRT',
    accentColor: 'from-red-600 to-emerald-600'
  },
  {
    id: 'radio-al-amazighia',
    name: {
      ar: 'الإذاعة الأمازيغية',
      en: 'Radio Al Amazighia',
      fr: 'Radio Amazighe (SNRT)'
    },
    subtitle: {
      ar: 'الإذاعة الوطنية الأمازيغية بثلاث روافد (تاشلحيت، تمازيغت، تاريفيت) للثقافة والتراث والأخبار',
      en: 'National Amazigh radio broadcasting in Tashelhit, Tamazight, and Tarifit across Morocco',
      fr: 'Radio nationale amazighe diffusant en Tachelhit, Tamazight et Tarifit'
    },
    category: 'national',
    streamUrl: 'https://radoxo.com/stream/eb/radio_amazigh.m3u8',
    sourcePageUrl: 'https://radiomaroc.org/47-radio-al-amazighia.html',
    city: { ar: 'الرباط • البث الوطني', en: 'Rabat • National', fr: 'Rabat • National' },
    frequency: '97.2 FM',
    network: 'SNRT',
    accentColor: 'from-amber-500 to-cyan-600'
  },
  {
    id: 'chaine-inter',
    name: {
      ar: 'الإذاعة الدولية (Chaîne Inter)',
      en: 'SNRT Chaîne Inter',
      fr: 'Chaîne Inter (SNRT Internationale)'
    },
    subtitle: {
      ar: 'الإذاعة الوطنية باللغات الأجنبية (الفرنسية والإنجليزية والإسبانية) للأخبار والثقافة والموسيقى',
      en: 'Moroccan national international station broadcasting news, culture, and world music',
      fr: 'Chaîne internationale de la SNRT dédiée à l’information, à la culture et à la musique'
    },
    category: 'national',
    streamUrl: 'https://radoxo.com/stream/eb/radio_inter.m3u8',
    sourcePageUrl: 'https://radiomaroc.org/69-radio-chaine-inter.html',
    city: { ar: 'الرباط • البث الوطني', en: 'Rabat • National', fr: 'Rabat • National' },
    frequency: '96.6 / 104.2 FM',
    network: 'SNRT',
    accentColor: 'from-cyan-500 to-indigo-600'
  },
  {
    id: 'rim-radio',
    name: {
      ar: 'إذاعة الأخبار المغربية (RIM Radio - MAP)',
      en: 'RIM Radio (Moroccan News Agency)',
      fr: 'RIM Radio (Radio Information Marocaine - MAP)'
    },
    subtitle: {
      ar: 'الإذاعة الإخبارية الرسمية التابعة لوكالة المغرب العربي للأنباء على مدار 24 ساعة',
      en: 'Continuous 24/7 news radio from the Moroccan News Agency (MAP)',
      fr: 'Radio d’information continue 24h/24 de l’Agence Maghreb Arabe Presse (MAP)'
    },
    category: 'national',
    streamUrl: 'https://streaming.rimradio.ma/live',
    sourcePageUrl: 'https://radiomaroc.org/54-rim.html',
    city: { ar: 'الرباط • وكالة MAP', en: 'Rabat • MAP Agency', fr: 'Rabat • Agence MAP' },
    frequency: 'Digital / Web Live',
    network: 'MAP',
    accentColor: 'from-blue-600 to-cyan-500'
  },
  {
    id: 'medi1-radio',
    name: {
      ar: 'إذاعة ميدي 1 (Medi1 Radio)',
      en: 'Medi1 Radio',
      fr: 'Medi1 Radio (Radio Méditerranée Internationale)'
    },
    subtitle: {
      ar: 'الإذاعة المغاربية والدولية الكبرى للأخبار العاجلة والتحليلات والحوارات المباشرة',
      en: 'Premier Maghreb & Mediterranean news, analysis, and talk radio broadcasting from Tangier',
      fr: 'Grande radio d’information, d’analyse et de débats émettant depuis Tanger'
    },
    category: 'news-general',
    streamUrl: 'https://radoxo.com/stream/eb/83_medi1radio-maghreb_8s9i4bn.m3u8',
    sourcePageUrl: 'https://radiomaroc.org/6-medi-1-radio.html',
    city: { ar: 'طنجة • البث الوطني', en: 'Tangier • Nationwide', fr: 'Tanger • National' },
    frequency: '99.6 FM',
    network: 'Medi1',
    accentColor: 'from-rose-600 to-orange-500'
  },
  {
    id: 'medina-coran',
    name: {
      ar: 'إذاعة مدينة قرآن (Medina Coran)',
      en: 'Medina Coran Radio',
      fr: 'Radio Medina Coran'
    },
    subtitle: {
      ar: 'بث متواصل لتلاوات القرآن الكريم الخاشعة بأصوات كبار القراء المغاربة والمشارقة',
      en: 'Continuous Quranic recitations by renowned Moroccan and Islamic reciters',
      fr: 'Diffusion continue de récitations du Saint Coran par de grands récitateurs'
    },
    category: 'quran',
    streamUrl: 'https://medinacoran.ice.infomaniak.ch/medinacoran-128.mp3',
    sourcePageUrl: 'https://radiomaroc.org/113531-medina-coran-mdyn-alkran-019b32.html',
    city: { ar: 'الدار البيضاء • بث رقمي', en: 'Casablanca • Digital', fr: 'Casablanca • Numérique' },
    frequency: 'Web / Digital',
    network: 'Medina',
    accentColor: 'from-emerald-600 to-teal-500'
  },
  {
    id: 'med-radio',
    name: {
      ar: 'ميد راديو (Med Radio)',
      en: 'Med Radio',
      fr: 'Med Radio'
    },
    subtitle: {
      ar: 'برامج اجتماعية وخدمية ونقاشات يومية قريبة من انشغالات المواطنين في كل جهات المغرب',
      en: 'Popular Moroccan talk, social advice, legal guidance, and daily news station',
      fr: 'Radio généraliste de proximité dédiée aux débats sociaux et à l’actualité'
    },
    category: 'news-general',
    streamUrl: 'https://medradio.ice.infomaniak.ch/medradio-128.mp3',
    sourcePageUrl: 'https://radiomaroc.org/21-med-radio.html',
    city: { ar: 'الدار البيضاء • البث الوطني', en: 'Casablanca • Nationwide', fr: 'Casablanca • National' },
    frequency: '88.2 FM',
    network: 'Med Radio',
    accentColor: 'from-sky-500 to-blue-700'
  },
  {
    id: 'radio-aswat',
    name: {
      ar: 'راديو أصوات (Radio Aswat)',
      en: 'Radio Aswat',
      fr: 'Radio Aswat'
    },
    subtitle: {
      ar: 'إذاعة وطنية شاملة للأخبار والمجتمع والرياضة والبرامج الحوارية',
      en: 'Generalist national radio offering news bulletins, talk shows, and sports coverage',
      fr: 'Radio généraliste nationale axée sur l’actualité, la société et le sport'
    },
    category: 'news-general',
    streamUrl: 'https://broadcast.ice.infomaniak.ch/aswat-high.mp3',
    sourcePageUrl: 'https://radiomaroc.org/5-radio-aswat.html',
    city: { ar: 'الدار البيضاء • البث الوطني', en: 'Casablanca • Nationwide', fr: 'Casablanca • National' },
    frequency: '104.3 FM',
    network: 'Aswat',
    accentColor: 'from-orange-500 to-red-600'
  },
  {
    id: 'atlantic-radio',
    name: {
      ar: 'أتلانتيك راديو (Atlantic Radio)',
      en: 'Atlantic Radio',
      fr: 'Atlantic Radio'
    },
    subtitle: {
      ar: 'الأولى في الاقتصاد والمال والأعمال والأخبار الوطنية والدولية بالمغرب',
      en: 'Morocco’s leading economic, financial, and business news radio station',
      fr: 'Première radio marocaine d’information économique, financière et d’actualité'
    },
    category: 'news-general',
    streamUrl: 'https://atlantic-sonic.nindohost.net:9300/stream',
    sourcePageUrl: 'https://radiomaroc.org/19-atlantic-radio.html',
    city: { ar: 'الدار البيضاء • البث الوطني', en: 'Casablanca • Nationwide', fr: 'Casablanca • National' },
    frequency: '102.5 / 92.5 FM',
    network: 'Eco-Médias',
    accentColor: 'from-blue-500 to-indigo-700'
  },
  {
    id: 'mfm-radio',
    name: {
      ar: 'راديو إم إف إم (MFM Radio)',
      en: 'MFM Radio',
      fr: 'MFM Radio Maroc'
    },
    subtitle: {
      ar: 'إذاعة وطنية للبرامج التفاعلية والاجتماعية والموسيقى المغربية',
      en: 'National radio for interactive talk, family programs, and Moroccan music',
      fr: 'Radio nationale de proximité, talk-shows interactifs et musique marocaine'
    },
    category: 'news-general',
    streamUrl: 'https://a5.asurahosting.com:7980/radio.mp3',
    sourcePageUrl: 'https://radiomaroc.org/4-mfm-radio.html',
    city: { ar: 'الدار البيضاء • البث الوطني', en: 'Casablanca • Nationwide', fr: 'Casablanca • National' },
    frequency: '88.7 FM',
    network: 'MFM',
    accentColor: 'from-fuchsia-600 to-purple-700'
  },
  {
    id: 'medina-fm',
    name: {
      ar: 'راديو مدينة إف إم (Medina FM)',
      en: 'Radio Medina FM',
      fr: 'Radio Medina FM'
    },
    subtitle: {
      ar: 'إذاعة القرب التي تغطي الأخبار الجهوية والفلاحية والمجتمعية والتراث المغربي',
      en: 'Proximity radio covering regional news, agriculture, and Moroccan cultural heritage',
      fr: 'Radio de proximité dédiée à l’actualité régionale, l’agriculture et la culture'
    },
    category: 'news-general',
    streamUrl: 'https://medinafm.ice.infomaniak.ch/medinafm-128.mp3',
    sourcePageUrl: 'https://radiomaroc.org/28-radio-medina-fm.html',
    city: { ar: 'مكناس • البث الوطني', en: 'Meknes • Nationwide', fr: 'Meknès • National' },
    frequency: '102.0 FM',
    network: 'Medina FM',
    accentColor: 'from-emerald-500 to-cyan-600'
  },
  {
    id: 'cap-radio',
    name: {
      ar: 'كاب راديو (Cap Radio)',
      en: 'Cap Radio',
      fr: 'Cap Radio'
    },
    subtitle: {
      ar: 'إذاعة شمال المغرب والريف والشرق للبرامج الإخبارية والثقافية والتنموية',
      en: 'Northern & Eastern Morocco radio covering Rif, Tangier, Tetouan, and Oriental news',
      fr: 'Radio du Nord et de l’Oriental marocain pour l’information et le développement local'
    },
    category: 'news-general',
    streamUrl: 'https://listen.radioking.com/radio/710810/stream/776366',
    sourcePageUrl: 'https://radiomaroc.org/43-cap-radio.html',
    city: { ar: 'طنجة / الناظور', en: 'Tangier / Nador', fr: 'Tanger / Nador' },
    frequency: '98.1 FM',
    network: 'Cap Radio',
    accentColor: 'from-teal-500 to-blue-600'
  },
  {
    id: 'tanger-med',
    name: {
      ar: 'إذاعة طنجة المتوسط (Tanger Med)',
      en: 'Radio Tanger Med',
      fr: 'Radio Tanger Med'
    },
    subtitle: {
      ar: 'إذاعة ميناء طنجة المتوسط والبوغاز لنقل حركة العبور وأخبار الشمال والموسيقى',
      en: 'Tangier-Med port & Strait region station for maritime, traffic, and regional broadcasts',
      fr: 'Radio du détroit et du port Tanger-Med pour l’info trafic, maritime et régionale'
    },
    category: 'news-general',
    streamUrl: 'https://radiotangermed-22.ice.infomaniak.ch/radiotangermed-22-192.mp3',
    sourcePageUrl: 'https://radiomaroc.org/60469-athaaa-tng-almtost.html',
    city: { ar: 'طنجة المتوسط', en: 'Tangier Med', fr: 'Tanger Med' },
    frequency: '100.2 FM',
    network: 'Tanger Med',
    accentColor: 'from-cyan-500 to-sky-700'
  },
  {
    id: 'radio-mars',
    name: {
      ar: 'راديو مارس (Radio Mars)',
      en: 'Radio Mars (Sports & Music)',
      fr: 'Radio Mars (Sport & Musique)'
    },
    subtitle: {
      ar: 'الإذاعة الرياضية الأولى في المغرب لمتابعة البطولة الوطنية والمنتخبات والموسيقى',
      en: 'Morocco’s #1 sports and music station covering national football and global athletics',
      fr: 'Première radio sportive et musicale du Maroc dédiée au football et aux sports'
    },
    category: 'sports-music',
    streamUrl: 'https://radiomars.ice.infomaniak.ch/radiomars-128.mp3',
    sourcePageUrl: 'https://radiomaroc.org/17-radio-mars.html',
    city: { ar: 'الدار البيضاء • البث الوطني', en: 'Casablanca • Nationwide', fr: 'Casablanca • National' },
    frequency: '91.2 FM',
    network: 'Radio Mars',
    accentColor: 'from-red-600 to-amber-500'
  },
  {
    id: 'chada-fm',
    name: {
      ar: 'شذى إف إم (Chada FM)',
      en: 'Chada FM',
      fr: 'Chada FM'
    },
    subtitle: {
      ar: 'إذاعة الفن والطرب المغربي والعربي وبرامج الترفيه والثقافة',
      en: 'Leading station for Moroccan & Arabic music, culture, and entertainment shows',
      fr: 'Radio dédiée à la musique marocaine et arabe, à la culture et au divertissement'
    },
    category: 'sports-music',
    streamUrl: 'https://chadafm.ice.infomaniak.ch/chadafm-128.aac',
    sourcePageUrl: 'https://radiomaroc.org/16-chada-fm.html',
    city: { ar: 'الدار البيضاء • البث الوطني', en: 'Casablanca • Nationwide', fr: 'Casablanca • National' },
    frequency: '100.8 FM',
    network: 'Chada',
    accentColor: 'from-pink-600 to-rose-500'
  },
  {
    id: 'hit-radio',
    name: {
      ar: 'هيت راديو (Hit Radio)',
      en: 'Hit Radio',
      fr: 'Hit Radio Maroc'
    },
    subtitle: {
      ar: 'الإذاعة الشبابية الأولى في المغرب لأحدث الأغاني وبرامج الصباح الشبابية',
      en: 'Morocco’s top youth and contemporary hits station broadcasting nationwide',
      fr: 'Première radio musicale jeune du Maroc diffusant les hits nationaux et internationaux'
    },
    category: 'sports-music',
    streamUrl: 'https://hitradio-maroc.ice.infomaniak.ch/hitradio-maroc-128.mp3',
    sourcePageUrl: 'https://radiomaroc.org/22-hit-radio-fm.html',
    city: { ar: 'الرباط • البث الوطني', en: 'Rabat • Nationwide', fr: 'Rabat • National' },
    frequency: '99.8 FM',
    network: 'Hit Radio',
    accentColor: 'from-yellow-500 to-red-600'
  },
  {
    id: 'u-radio',
    name: {
      ar: 'يو راديو (U Radio)',
      en: 'U Radio',
      fr: 'U Radio'
    },
    subtitle: {
      ar: 'إذاعة مغربية موسيقية وترفيهية عصرية على مدار الساعة',
      en: 'Modern Moroccan music and lifestyle radio streaming 24/7',
      fr: 'Radio musicale et culturelle moderne marocaine 24h/24'
    },
    category: 'sports-music',
    streamUrl: 'https://uradio-aac.ice.infomaniak.ch/uradio.aac',
    sourcePageUrl: 'https://radiomaroc.org/400-u-radio.html',
    city: { ar: 'الدار البيضاء', en: 'Casablanca', fr: 'Casablanca' },
    frequency: '92.9 FM',
    network: 'U Radio',
    accentColor: 'from-violet-600 to-indigo-600'
  },
  // SNRT Regional Radios
  {
    id: 'snrt-agadir',
    name: {
      ar: 'إذاعة أكادير الجهوية (SNRT Agadir)',
      en: 'SNRT Regional Radio Agadir',
      fr: 'SNRT Radio Régionale Agadir'
    },
    subtitle: {
      ar: 'الإذاعة الجهوية لجهة سوس ماسة - أخبار وبرامج بالعربية والأمازيغية',
      en: 'Regional public station for Souss-Massa broadcasting in Arabic and Tashelhit',
      fr: 'Station régionale publique du Souss-Massa (arabe et amazighe)'
    },
    category: 'regional',
    streamUrl: 'https://radoxo.com/stream/eb/radio_agadir.m3u8',
    sourcePageUrl: 'https://radiomaroc.org/63786-snrt-radio-agadir.html',
    city: { ar: 'أكادير • سوس ماسة', en: 'Agadir • Souss-Massa', fr: 'Agadir • Souss-Massa' },
    frequency: '87.9 FM',
    network: 'SNRT',
    accentColor: 'from-amber-500 to-orange-600'
  },
  {
    id: 'snrt-fes',
    name: {
      ar: 'إذاعة فاس الجهوية (SNRT Fès)',
      en: 'SNRT Regional Radio Fès',
      fr: 'SNRT Radio Régionale Fès'
    },
    subtitle: {
      ar: 'الإذاعة الجهوية لفاس ومكناس للتراث الأندلسي والمديح والأخبار الجهوية',
      en: 'Regional station for Fès-Meknès featuring cultural heritage, Andalusi music, and local news',
      fr: 'Radio régionale publique de Fès-Meknès pour la culture, le patrimoine et l’actualité'
    },
    category: 'regional',
    streamUrl: 'https://radoxo.com/stream/eb/radio_fes.m3u8',
    sourcePageUrl: 'https://radiomaroc.org/',
    city: { ar: 'فاس • فاس مكناس', en: 'Fès • Fès-Meknès', fr: 'Fès • Fès-Meknès' },
    frequency: '98.4 FM',
    network: 'SNRT',
    accentColor: 'from-emerald-600 to-cyan-600'
  },
  {
    id: 'snrt-oujda',
    name: {
      ar: 'إذاعة وجدة الجهوية (SNRT Oujda)',
      en: 'SNRT Regional Radio Oujda',
      fr: 'SNRT Radio Régionale Oujda'
    },
    subtitle: {
      ar: 'الإذاعة الجهوية لجهة الشرق لنقل أخبار الجهة والبرامج الثقافية والفنية',
      en: 'Regional public station serving the Oriental region of Morocco',
      fr: 'Station régionale publique de l’Oriental marocain'
    },
    category: 'regional',
    streamUrl: 'https://radoxo.com/stream/eb/radio_oujda.m3u8',
    sourcePageUrl: 'https://radiomaroc.org/',
    city: { ar: 'وجدة • جهة الشرق', en: 'Oujda • Oriental', fr: 'Oujda • Oriental' },
    frequency: '96.1 FM',
    network: 'SNRT',
    accentColor: 'from-indigo-500 to-blue-600'
  },
  {
    id: 'snrt-tetouan',
    name: {
      ar: 'إذاعة تطوان الجهوية (SNRT Tétouan)',
      en: 'SNRT Regional Radio Tétouan',
      fr: 'SNRT Radio Régionale Tétouan'
    },
    subtitle: {
      ar: 'الإذاعة الجهوية لشمال المغرب وطنجة تطوان الحسيمة للثقافة والموسيقى الأندلسية',
      en: 'Regional station for Northern Morocco dedicated to local news and Andalusi heritage',
      fr: 'Radio régionale du Nord du Maroc dédiée à l’actualité et à la musique andalouse'
    },
    category: 'regional',
    streamUrl: 'https://radoxo.com/stream/eb/radio_tetouan.m3u8',
    sourcePageUrl: 'https://radiomaroc.org/',
    city: { ar: 'تطوان • طنجة تطوان الحسيمة', en: 'Tétouan • North', fr: 'Tétouan • Nord' },
    frequency: '93.7 FM',
    network: 'SNRT',
    accentColor: 'from-cyan-500 to-teal-600'
  },
  {
    id: 'snrt-laayoune',
    name: {
      ar: 'إذاعة العيون الجهوية (SNRT Laâyoune)',
      en: 'SNRT Regional Radio Laâyoune',
      fr: 'SNRT Radio Régionale Laâyoune'
    },
    subtitle: {
      ar: 'الإذاعة الجهوية للأقاليم الجنوبية - العيون الساقية الحمراء والثقافة الحسانية',
      en: 'Regional station for Morocco’s southern provinces highlighting Hassani culture and local news',
      fr: 'Radio régionale des provinces du Sud dédiée à l’actualité et à la culture hassanie'
    },
    category: 'regional',
    streamUrl: 'https://radoxo.com/stream/eb/radio_laayoune.m3u8',
    sourcePageUrl: 'https://radiomaroc.org/',
    city: { ar: 'العيون • الساقية الحمراء', en: 'Laâyoune • South', fr: 'Laâyoune • Sud' },
    frequency: '91.6 FM',
    network: 'SNRT',
    accentColor: 'from-amber-600 to-yellow-500'
  },
  {
    id: 'snrt-dakhla',
    name: {
      ar: 'إذاعة الداخلة الجهوية (SNRT Dakhla)',
      en: 'SNRT Regional Radio Dakhla',
      fr: 'SNRT Radio Régionale Dakhla'
    },
    subtitle: {
      ar: 'الإذاعة الجهوية لجهة الداخلة وادي الذهب لبرامج التنمية والثقافة الصحراوية',
      en: 'Regional station for Dakhla-Oued Ed-Dahab covering coastal development and heritage',
      fr: 'Station régionale de Dakhla-Oued Ed-Dahab dédiée au patrimoine et au développement local'
    },
    category: 'regional',
    streamUrl: 'https://radoxo.com/stream/eb/radio_dakhla.m3u8',
    sourcePageUrl: 'https://radiomaroc.org/',
    city: { ar: 'الداخلة • وادي الذهب', en: 'Dakhla • Oued Ed-Dahab', fr: 'Dakhla • Oued Ed-Dahab' },
    frequency: '99.1 FM',
    network: 'SNRT',
    accentColor: 'from-sky-500 to-amber-500'
  }
];

export const MoroccanRadios: React.FC<MoroccanRadiosProps> = ({ language }) => {
  const [activeStation, setActiveStation] = useState<MoroccanStation>(MOROCCAN_STATIONS[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isBuffering, setIsBuffering] = useState<boolean>(false);
  const [streamError, setStreamError] = useState<string | null>(null);
  const [volume, setVolume] = useState<number>(0.85);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<RadioCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('cosmic_moroccan_radio_favs');
      return saved ? JSON.parse(saved) : ['idaa-mohammed-assadiss', 'idaa-al-watania'];
    } catch {
      return ['idaa-mohammed-assadiss', 'idaa-al-watania'];
    }
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hlsRef = useRef<Hls | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('cosmic_moroccan_radio_favs', JSON.stringify(favorites));
    } catch {
      // ignore storage errors
    }
  }, [favorites]);

  // Synchronize volume & mute on audio element
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const stopPlayback = () => {
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.removeAttribute('src');
      audioRef.current.load();
    }
    setIsPlaying(false);
    setIsBuffering(false);
  };

  const startStationPlayback = async (station: MoroccanStation) => {
    setActiveStation(station);
    setStreamError(null);
    setIsBuffering(true);

    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }

    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    audio.volume = isMuted ? 0 : volume;

    const isHls = station.streamUrl.includes('.m3u8');

    try {
      if (isHls) {
        if (Hls.isSupported()) {
          const hls = new Hls({
            enableWorker: true,
            lowLatencyMode: true
          });
          hlsRef.current = hls;
          hls.loadSource(station.streamUrl);
          hls.attachMedia(audio);

          hls.on(Hls.Events.MANIFEST_PARSED, async () => {
            try {
              await audio.play();
              setIsPlaying(true);
              setIsBuffering(false);
            } catch {
              setIsBuffering(false);
              setIsPlaying(false);
              setStreamError(
                language === 'ar'
                  ? 'يرجى الضغط على زر التشغيل لبدء البث الصوتي.'
                  : language === 'fr'
                  ? 'Veuillez cliquer sur Lire pour démarrer la diffusion.'
                  : 'Click Play to start audio stream.'
              );
            }
          });

          hls.on(Hls.Events.ERROR, (_event, data) => {
            if (data.fatal) {
              setIsBuffering(false);
              setIsPlaying(false);
              setStreamError(
                language === 'ar'
                  ? 'تعذر الاتصال مؤقتاً بهذه الإذاعة. يمكنك المحاولة مرة أخرى أو فتح صفحتها الرسمية.'
                  : language === 'fr'
                  ? 'Connexion temporairement indisponible pour cette station.'
                  : 'Unable to connect to this station right now. Try retrying or opening its official page.'
              );
            }
          });
        } else if (audio.canPlayType('application/vnd.apple.mpegurl')) {
          audio.src = station.streamUrl;
          await audio.play();
          setIsPlaying(true);
          setIsBuffering(false);
        } else {
          setIsBuffering(false);
          setStreamError(
            language === 'ar'
              ? 'متصفحك لا يدعم بث HLS لهذه القناة.'
              : 'Your browser does not support HLS audio streaming.'
          );
        }
      } else {
        audio.src = station.streamUrl;
        await audio.play();
        setIsPlaying(true);
        setIsBuffering(false);
      }
    } catch {
      setIsBuffering(false);
      setIsPlaying(false);
      setStreamError(
        language === 'ar'
          ? 'تعذر تشغيل البث المباشر حالياً، أعد المحاولة أو اختر إذاعة أخرى.'
          : language === 'fr'
          ? 'Impossible de lire ce flux actuellement. Réessayez.'
          : 'Could not start stream right now. Please retry.'
      );
    }
  };

  useEffect(() => {
    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
      }
    };
  }, []);

  const togglePlayActive = () => {
    if (isPlaying) {
      stopPlayback();
    } else {
      startStationPlayback(activeStation);
    }
  };

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredStations = MOROCCAN_STATIONS.filter((st) => {
    if (selectedCategory === 'favorites' && !favorites.includes(st.id)) return false;
    if (selectedCategory !== 'all' && selectedCategory !== 'favorites' && st.category !== selectedCategory) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const hay = `${st.name.ar} ${st.name.en} ${st.name.fr} ${st.city.ar} ${st.city.en} ${st.network} ${st.frequency || ''}`.toLowerCase();
      return hay.includes(q);
    }
    return true;
  });

  const texts = {
    ar: {
      badge: 'البث الإذاعي الوطني المغربي المباشر',
      title: 'الإذاعات الوطنية المغربية المباشرة',
      subtitle: 'استمع مباشرة لإذاعة محمد السادس للقرآن الكريم، والإذاعة الوطنية، والأمازيغية، والدولية، وميدي 1، وجميع الإذاعات الجهوية والخاصة بالمملكة المغربية.',
      featuredLabel: 'الإذاعة المميزة • القرآن الكريم 24/24',
      listenNow: 'استمع للبث المباشر',
      stopNow: 'إيقاف البث',
      connecting: 'جاري الاتصال بالبث...',
      nowPlaying: 'يتم البث المباشر الآن',
      standby: 'جاهز للتشغيل المباشر',
      searchPlaceholder: 'ابحث عن إذاعة (محمد السادس، الوطنية، الأمازيغية، ميدي 1، أكادير...)',
      sourceLink: 'صفحة الإذاعة في RadioMaroc',
      retry: 'إعادة الاتصال',
      stationCount: 'إذاعة وطنية وجهوية',
      categories: [
        { id: 'all', label: 'كل الإذاعات', icon: Radio },
        { id: 'quran', label: 'القرآن الكريم', icon: BookOpen },
        { id: 'national', label: 'الوطنية الرسمية (SNRT & MAP)', icon: Globe2 },
        { id: 'regional', label: 'الإذاعات الجهوية', icon: MapPin },
        { id: 'news-general', label: 'الإخبارية والعامة', icon: Mic },
        { id: 'sports-music', label: 'الرياضة والموسيقى', icon: Music },
        { id: 'favorites', label: 'المفضلة', icon: Heart }
      ]
    },
    en: {
      badge: 'Moroccan National Live Radio Network',
      title: 'Moroccan National & Regional Live Radios',
      subtitle: 'Listen live to Idaât Mohammed Assadiss (Quran), Al Idaa Al Watania, Al Amazighia, Chaîne Inter, Medi1, RIM MAP, and regional SNRT & private stations.',
      featuredLabel: 'Featured • Holy Quran 24/7',
      listenNow: 'Listen Live Now',
      stopNow: 'Stop Stream',
      connecting: 'Connecting to stream...',
      nowPlaying: 'Broadcasting Live Now',
      standby: 'Ready to Stream',
      searchPlaceholder: 'Search stations (Mohammed VI, Watania, Amazighia, Medi1, Agadir...)',
      sourceLink: 'Station on RadioMaroc',
      retry: 'Reconnect',
      stationCount: 'Live Stations',
      categories: [
        { id: 'all', label: 'All Stations', icon: Radio },
        { id: 'quran', label: 'Holy Quran', icon: BookOpen },
        { id: 'national', label: 'National Public (SNRT & MAP)', icon: Globe2 },
        { id: 'regional', label: 'Regional SNRT', icon: MapPin },
        { id: 'news-general', label: 'News & Talk', icon: Mic },
        { id: 'sports-music', label: 'Sports & Music', icon: Music },
        { id: 'favorites', label: 'Favorites', icon: Heart }
      ]
    },
    fr: {
      badge: 'Réseau des Radios Nationales Marocaines',
      title: 'Radios Nationales et Régionales du Maroc en Direct',
      subtitle: 'Écoutez en direct Radio Mohammed VI du Saint Coran, Al Idaa Al Watania, Radio Amazighe, Chaîne Inter, Medi1, RIM Radio et toutes les stations régionales et privées.',
      featuredLabel: 'À la Une • Saint Coran 24h/24',
      listenNow: 'Écouter en Direct',
      stopNow: 'Arrêter',
      connecting: 'Connexion au flux...',
      nowPlaying: 'Diffusion en Direct',
      standby: 'Prêt pour la lecture',
      searchPlaceholder: 'Rechercher une radio (Mohammed VI, Watania, Amazighe, Medi1...)',
      sourceLink: 'Page sur RadioMaroc',
      retry: 'Réessayer',
      stationCount: 'Stations en Direct',
      categories: [
        { id: 'all', label: 'Toutes', icon: Radio },
        { id: 'quran', label: 'Saint Coran', icon: BookOpen },
        { id: 'national', label: 'Nationales (SNRT & MAP)', icon: Globe2 },
        { id: 'regional', label: 'Régionales SNRT', icon: MapPin },
        { id: 'news-general', label: 'Info & Généralistes', icon: Mic },
        { id: 'sports-music', label: 'Sport & Musique', icon: Music },
        { id: 'favorites', label: 'Favoris', icon: Heart }
      ]
    }
  };

  const t = texts[language] || texts.ar;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Hidden HTML5 Audio element managed via HLS.js / Native Audio */}
      <audio
        ref={audioRef}
        preload="none"
        onPlaying={() => {
          setIsPlaying(true);
          setIsBuffering(false);
          setStreamError(null);
        }}
        onWaiting={() => setIsBuffering(true)}
        onPause={() => setIsPlaying(false)}
        onError={() => {
          setIsBuffering(false);
          setIsPlaying(false);
        }}
      />

      {/* Top Hero Banner + Featured Mohammed VI Quran Station */}
      <div className="relative rounded-3xl overflow-hidden border border-amber-500/40 bg-gradient-to-br from-[#071f1a] via-[#0a142c] to-[#050917] p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/80 border border-amber-500/40 text-xs font-bold text-amber-300">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping inline-block" />
              <span>{t.badge}</span>
              <span className="text-slate-400">•</span>
              <span>{MOROCCAN_STATIONS.length} {t.stationCount}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-emerald-300">
              {t.title}
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              {t.subtitle}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <button
              onClick={() => startStationPlayback(MOROCCAN_STATIONS[0])}
              className="flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-emerald-500 hover:from-amber-400 hover:to-emerald-400 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span>{MOROCCAN_STATIONS[0].name[language] || MOROCCAN_STATIONS[0].name.ar}</span>
            </button>
            <a
              href="https://radiomaroc.org/71-idaa-mohammed-assadiss.html"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-slate-900/90 border border-slate-700 hover:border-amber-400/50 text-xs font-bold text-slate-200 transition-colors"
            >
              <span>{t.sourceLink}</span>
              <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
            </a>
          </div>
        </div>
      </div>

      {/* Active Audio Player Control Deck */}
      <div className="sticky top-24 z-30 rounded-3xl border border-cyan-500/40 bg-[#070d1f]/95 backdrop-blur-2xl p-4 sm:p-5 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Active Station Info */}
          <div className="flex items-center gap-4 min-w-0">
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${activeStation.accentColor} p-[2px] shrink-0 shadow-lg`}>
              <div className="w-full h-full bg-[#060a18] rounded-[14px] flex items-center justify-center relative">
                {isBuffering ? (
                  <Loader2 className="w-6 h-6 text-amber-300 animate-spin" />
                ) : (
                  <Radio className={`w-6 h-6 ${isPlaying ? 'text-emerald-400 animate-pulse' : 'text-cyan-300'}`} />
                )}
                {isPlaying && (
                  <span className="absolute -top-1 -end-1 w-3 h-3 rounded-full bg-red-500 border-2 border-[#060a18] animate-ping" />
                )}
              </div>
            </div>

            <div className="min-w-0 space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2 py-0.5 rounded-md text-[10px] font-black bg-cyan-950 border border-cyan-500/40 text-cyan-300">
                  {activeStation.network}
                </span>
                {activeStation.frequency && (
                  <span className="text-[10px] font-mono text-amber-300">
                    {activeStation.frequency}
                  </span>
                )}
                <span className={`text-[11px] font-bold flex items-center gap-1 ${
                  isPlaying ? 'text-emerald-400' : isBuffering ? 'text-amber-300' : 'text-slate-400'
                }`}>
                  <Signal className="w-3 h-3" />
                  {isBuffering ? t.connecting : isPlaying ? t.nowPlaying : t.standby}
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-black text-white truncate">
                {activeStation.name[language] || activeStation.name.ar}
              </h2>
              <p className="text-xs text-slate-400 truncate">
                {activeStation.city[language] || activeStation.city.ar}
              </p>
            </div>
          </div>

          {/* Player Controls */}
          <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap">
            <button
              onClick={togglePlayActive}
              disabled={isBuffering}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-black text-xs transition-all shadow-lg cursor-pointer ${
                isPlaying
                  ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-500/25'
                  : 'bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 shadow-cyan-500/25'
              }`}
            >
              {isBuffering ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : isPlaying ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4 fill-current" />
              )}
              <span>{isPlaying ? t.stopNow : t.listenNow}</span>
            </button>

            {/* Volume Control */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-slate-900/90 border border-slate-800">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="text-slate-300 hover:text-cyan-300 transition-colors"
                aria-label="Toggle Mute"
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-4 h-4 text-rose-400" />
                ) : (
                  <Volume2 className="w-4 h-4 text-cyan-400" />
                )}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={isMuted ? 0 : volume}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  setVolume(val);
                  if (val > 0 && isMuted) setIsMuted(false);
                }}
                className="w-20 sm:w-24 accent-cyan-400 cursor-pointer"
                aria-label="Volume"
              />
            </div>

            <a
              href={activeStation.sourcePageUrl}
              target="_blank"
              rel="noopener noreferrer"
              title={t.sourceLink}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Stream Error Recovery Notice */}
        {streamError && (
          <div className="mt-3 pt-3 border-t border-rose-900/40 flex flex-wrap items-center justify-between gap-2 text-xs text-rose-300">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{streamError}</span>
            </div>
            <button
              onClick={() => startStationPlayback(activeStation)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-rose-950 border border-rose-500/40 hover:bg-rose-900 text-rose-200 font-bold"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{t.retry}</span>
            </button>
          </div>
        )}
      </div>

      {/* Search & Category Filter Controls */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 start-4" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full ps-11 pe-4 py-3 rounded-2xl bg-slate-900/80 border border-slate-800 focus:border-cyan-500/60 focus:outline-none text-sm text-white placeholder:text-slate-500"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {t.categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            const count =
              cat.id === 'all'
                ? MOROCCAN_STATIONS.length
                : cat.id === 'favorites'
                ? favorites.length
                : MOROCCAN_STATIONS.filter((s) => s.category === cat.id).length;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as RadioCategory)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap border transition-all shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white border-cyan-400 shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:bg-slate-800 hover:border-slate-700'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-amber-300' : 'text-slate-400'}`} />
                <span>{cat.label}</span>
                <span className={`px-1.5 py-0.2 rounded text-[10px] font-mono ${
                  isSelected ? 'bg-black/30 text-white' : 'bg-slate-950 text-cyan-300'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Stations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredStations.map((station) => {
          const isCurrent = activeStation.id === station.id;
          const isCurrentPlaying = isCurrent && isPlaying;
          const isFav = favorites.includes(station.id);

          return (
            <div
              key={station.id}
              onClick={() => {
                if (isCurrentPlaying) {
                  stopPlayback();
                } else {
                  startStationPlayback(station);
                }
              }}
              className={`group cursor-pointer rounded-3xl p-5 border transition-all duration-300 flex flex-col justify-between ${
                isCurrent
                  ? 'bg-gradient-to-br from-[#0c1b36] to-[#061325] border-cyan-400/70 shadow-xl shadow-cyan-500/15'
                  : 'bg-[#080d1e]/90 border-slate-800/90 hover:border-cyan-500/40 hover:-translate-y-0.5'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${station.accentColor} p-[2px] shrink-0`}>
                      <div className="w-full h-full rounded-[14px] bg-[#070b18] flex items-center justify-center">
                        {isCurrentPlaying ? (
                          <Sparkles className="w-5 h-5 text-emerald-400 animate-pulse" />
                        ) : (
                          <Radio className="w-5 h-5 text-amber-300" />
                        )}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-black bg-slate-900 border border-slate-700 text-cyan-300">
                          {station.network}
                        </span>
                        {station.frequency && (
                          <span className="text-[10px] font-mono text-amber-300/90">
                            {station.frequency}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1">
                        {station.city[language] || station.city.ar}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={(e) => toggleFavorite(station.id, e)}
                    aria-label="Favorite station"
                    className={`p-2 rounded-xl border transition-colors ${
                      isFav
                        ? 'bg-rose-950/60 border-rose-500/40 text-rose-400'
                        : 'bg-slate-900/70 border-slate-800 text-slate-500 hover:text-rose-300'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                  </button>
                </div>

                <div>
                  <h3 className="text-base font-black text-white group-hover:text-cyan-300 transition-colors">
                    {station.name[language] || station.name.ar}
                  </h3>
                  <p className="text-xs text-slate-300/90 leading-relaxed mt-1.5 line-clamp-2">
                    {station.subtitle[language] || station.subtitle.ar}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between gap-2">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  isCurrentPlaying
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 group-hover:bg-cyan-500 group-hover:text-slate-950'
                }`}>
                  {isCurrent && isBuffering ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : isCurrentPlaying ? (
                    <Pause className="w-3.5 h-3.5" />
                  ) : (
                    <Play className="w-3.5 h-3.5 fill-current" />
                  )}
                  <span>
                    {isCurrent && isBuffering
                      ? t.connecting
                      : isCurrentPlaying
                      ? t.stopNow
                      : t.listenNow}
                  </span>
                </span>

                <a
                  href={station.sourcePageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-[11px] font-semibold text-slate-400 hover:text-amber-300 inline-flex items-center gap-1"
                >
                  <span>RadioMaroc</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
