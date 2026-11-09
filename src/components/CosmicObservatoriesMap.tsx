import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from '@vis.gl/react-google-maps';
import {
  Telescope,
  Radio,
  Sparkles,
  Compass,
  MapPin,
  Layers,
  Search,
  Navigation,
  Globe2,
  Info,
  ExternalLink,
  ChevronRight,
  Maximize2,
  Key,
  ShieldAlert,
  Moon,
  Award
} from 'lucide-react';
import { Language } from '../types/cosmic';

export interface ObservatorySite {
  id: string;
  name: { ar: string; en: string; fr: string };
  location: { ar: string; en: string; fr: string };
  country: { ar: string; en: string; fr: string };
  lat: number;
  lng: number;
  elevationMeters: number;
  bortleScale: number; // 1 (pristine dark) to 9 (inner city)
  category: 'optical' | 'radio' | 'islamic-historic' | 'dark-sky';
  telescopes: string[];
  keyDiscovery: { ar: string; en: string; fr: string };
  description: { ar: string; en: string; fr: string };
  websiteUrl?: string;
}

const OBSERVATORIES: ObservatorySite[] = [
  {
    id: 'oukaimeden',
    name: {
      ar: 'مرصد أوكايمدن الفلكي',
      en: 'Oukaïmeden Observatory',
      fr: 'Observatoire de l’Oukaïmeden'
    },
    location: { ar: 'جبال الأطلس الكبير', en: 'High Atlas Mountains', fr: 'Haut Atlas' },
    country: { ar: 'المغرب', en: 'Morocco', fr: 'Maroc' },
    lat: 31.2064,
    lng: -7.8661,
    elevationMeters: 2750,
    bortleScale: 2,
    category: 'optical',
    telescopes: ['TRAPPIST-Nord (0.6m)', 'MOSS (0.5m)', 'OWL-Net'],
    keyDiscovery: {
      ar: 'المشاركة الفعالة في اكتشاف نظام الكواكب الخارجية الشهير (TRAPPIST-1) ذي السبعة كواكب الصخرية الشبيهة بالأرض.',
      en: 'Co-discovery of the famous TRAPPIST-1 system hosting seven Earth-sized rocky exoplanets.',
      fr: 'Co-découverte du système exoplanétaire TRAPPIST-1 abritant 7 planètes telluriques.'
    },
    description: {
      ar: 'مرصد جامعي مغربي رفيع المستوى تديره جامعة القاضي عياض بمراكش، ويعد من أهم مراصد شمال إفريقيا في تتبع الكويكبات والكواكب الخارجية.',
      en: 'Premier Moroccan research observatory affiliated with Cadi Ayyad University, internationally acclaimed for asteroid tracking and exoplanet detection.',
      fr: 'Observatoire de pointe affilié à l’Université Cadi Ayyad, réputé pour la surveillance des astéroïdes géocroiseurs et des exoplanètes.'
    },
    websiteUrl: 'https://www.uca.ma'
  },
  {
    id: 'roque-de-los-muchachos',
    name: {
      ar: 'مرصد روكي دي لوس موتشاتشوس',
      en: 'Roque de los Muchachos Observatory',
      fr: 'Observatoire du Roque de los Muchachos'
    },
    location: { ar: 'جزيرة لا بالما، جزر الكناري', en: 'La Palma, Canary Islands', fr: 'La Palma, Canaries' },
    country: { ar: 'إسبانيا', en: 'Spain', fr: 'Espagne' },
    lat: 28.7606,
    lng: -17.8816,
    elevationMeters: 2396,
    bortleScale: 1,
    category: 'optical',
    telescopes: ['Gran Telescopio Canarias (GTC 10.4m)', 'William Herschel (4.2m)', 'MAGIC (Cherenkov)'],
    keyDiscovery: {
      ar: 'يضم تلسكوب GTC، أكبر تلسكوب بصري أحادي الفتحة في العالم (10.4م)، ورصد أبعد المستعرات العظمى وأشعة غاما الكونية.',
      en: 'Houses the Gran Telescopio Canarias (10.4m), the world largest single-aperture optical telescope, mapping early universe gamma bursts.',
      fr: 'Abrite le GTC (10,4 m), le plus grand télescope optique unitaire au monde, pionnier des sursauts gamma.'
    },
    description: {
      ar: 'أحد أفضل مواقع الرصد الفلكي البصري في نصف الكرة الأرضية الشمالي بفضل سماء المحيط الأطلسي المستقرة والخالية من التلوث.',
      en: 'One of the northern hemisphere premier optical observation plateaus, celebrated for exceptionally laminar oceanic airflow.',
      fr: 'L’un des meilleurs sites d’observation au monde dans l’hémisphère nord avec un ciel d’une pureté exceptionnelle.'
    }
  },
  {
    id: 'alma',
    name: {
      ar: 'مرصد ألما الراديوي (ALMA)',
      en: 'ALMA Array (Atacama Large Millimeter Array)',
      fr: 'Réseau ALMA (Désert d’Atacama)'
    },
    location: { ar: 'هضبة تشانانتور، صحراء أتاكاما', en: 'Chajnantor Plateau, Atacama Desert', fr: 'Plateau de Chajnantor, Atacama' },
    country: { ar: 'تشيلي', en: 'Chile', fr: 'Chili' },
    lat: -23.0293,
    lng: -67.755,
    elevationMeters: 5050,
    bortleScale: 1,
    category: 'radio',
    telescopes: ['66 High-precision Radio Antennas (12m & 7m)'],
    keyDiscovery: {
      ar: 'تصوير الأقراص الكوكبية الأولية حول النجوم الوليدة وتحديد جزيئات الماء والمواد العضوية في أعماق الكون المبكر.',
      en: 'High-resolution imaging of protoplanetary disks, capturing newborn planet formation and prebiotic water signatures in the early universe.',
      fr: 'Imagerie ultra-haute résolution des disques protoplanétaires et détection de molécules d’eau primordiale.'
    },
    description: {
      ar: 'أقوى مصفوفة تلسكوبات راديوية مليمترية ودون مليمترية على وجه الأرض، تعمل بشراكة بين أوروبا وأمريكا الشمالية وشرق آسيا.',
      en: 'The most powerful millimeter/submillimeter radio astronomical interferometer on Earth, situated at an altitude of 5,050 meters.',
      fr: 'Le plus puissant interféromètre radioélectrique millimétrique au monde, perché à plus de 5 000 m d’altitude.'
    }
  },
  {
    id: 'paranal-vlt',
    name: {
      ar: 'مرصد بارانال - التلسكوب فائق الكبر (VLT)',
      en: 'Paranal Observatory (Very Large Telescope - VLT)',
      fr: 'Observatoire de Paranal (VLT - ESO)'
    },
    location: { ar: 'سيرو بارانال، صحراء أتاكاما', en: 'Cerro Paranal, Atacama Desert', fr: 'Cerro Paranal, Désert d’Atacama' },
    country: { ar: 'تشيلي', en: 'Chile', fr: 'Chili' },
    lat: -24.6272,
    lng: -70.4042,
    elevationMeters: 2635,
    bortleScale: 1,
    category: 'optical',
    telescopes: ['4 Unit Telescopes (8.2m Antu, Kueyen, Melipal, Yepun)', '4 Auxiliary Telescopes (1.8m)'],
    keyDiscovery: {
      ar: 'أول صورة مباشرة لكوكب خارج المجموعة الشمسية ورصد مسارات النجوم المحيطة بالثقب الأسود فائق الكتلة في مركز مجرتنا (جائزة نوبل 2020).',
      en: 'First direct image of an exoplanet and precision orbital tracking of stars orbiting Sagittarius A* (Nobel Prize in Physics 2020).',
      fr: 'Première image directe d’une exoplanète et suivi orbital précis des étoiles autour du trou noir supermassif Sagittarius A*.'
    },
    description: {
      ar: 'المرصد الرئيسي للمرصد الأوروبي الجنوبي (ESO) والرائد العالمي في علم التداخل الضوئي والبصريات التكيفية التي تحاكي الليزر الفضائي.',
      en: 'Flagship facility of the European Southern Observatory (ESO), leading optical interferometry with advanced laser guide star systems.',
      fr: 'Site emblématique de l’Observatoire Européen Austral (ESO), fer de lance mondial de l’optique adaptative laser.'
    }
  },
  {
    id: 'mauna-kea',
    name: {
      ar: 'مراصد ماونا كيا',
      en: 'Mauna Kea Observatories',
      fr: 'Observatoires du Mauna Kea'
    },
    location: { ar: 'قمة بركان ماونا كيا، هاواي', en: 'Mauna Kea Summit, Hawaii', fr: 'Sommet du Mauna Kea, Hawaï' },
    country: { ar: 'الولايات المتحدة الأمريكية', en: 'USA', fr: 'États-Unis' },
    lat: 19.8231,
    lng: -155.4694,
    elevationMeters: 4207,
    bortleScale: 1,
    category: 'optical',
    telescopes: ['W. M. Keck I & II (10m segmented)', 'Subaru (8.2m)', 'Gemini North (8.1m)'],
    keyDiscovery: {
      ar: 'تأكيد تسارع تمدد الكون واكتشاف الطاقة المظلمة، ورصد أقدم المجرات في فجر الكون.',
      en: 'Pivotal spectroscopic observations confirming accelerated cosmic expansion (Dark Energy) and deep cosmic dawn surveys.',
      fr: 'Mesures spectroscopiques clés de l’accélération de l’expansion de l’Univers (Énergie Sombre).'
    },
    description: {
      ar: 'تعد قمة ماونا كيا في المحيط الهادئ بمثابة العاصمة الفلكية العالمية للرصد البصري والأشعة تحت الحمراء نظراً لارتفاعها فوق 40% من الغلاف الجوي.',
      en: 'World-renowned scientific hub situated above 40% of Earth’s atmosphere, with dry and exceptionally steady Pacific skies.',
      fr: 'Haut lieu de l’astrophysique mondiale, s’élevant au-dessus de 40% de l’atmosphère terrestre.'
    }
  },
  {
    id: 'kottamia',
    name: {
      ar: 'مرصد القطامية الفلكي',
      en: 'Kottamia Astronomical Observatory',
      fr: 'Observatoire Astronomique de Kottamia'
    },
    location: { ar: 'الصحراء الشرقية، طريق السويس', en: 'Eastern Desert, Suez Road', fr: 'Désert Oriental' },
    country: { ar: 'مصر', en: 'Egypt', fr: 'Égypte' },
    lat: 29.9328,
    lng: 31.8294,
    elevationMeters: 476,
    bortleScale: 3,
    category: 'optical',
    telescopes: ['74-inch (1.9m) Reflector Telescope'],
    keyDiscovery: {
      ar: 'تحديد مواقع هبوط رحلات أبوللو على سطح القمر والمشاركة في الرصد الطيفي للنجوم المتغيرة والمستعرات.',
      en: 'Crucial lunar surface surveying assisting Apollo moon landing selections, stellar spectroscopy, and photometric monitoring.',
      fr: 'Cartographie lunaire ayant contribué au choix des sites d’alunissage d’Apollo.'
    },
    description: {
      ar: 'أكبر تلسكوب بصري في شمال إفريقيا والشرق الأوسط لعقود، يتبع المعهد القومي للبحوث الفلكية والجيوفيزيقية (حلوان).',
      en: 'The largest optical reflector in North Africa and the Arab world for decades, managed by NRIAG.',
      fr: 'Le plus grand réflecteur optique du Moyen-Orient et d’Afrique du Nord pendant des décennies.'
    }
  },
  {
    id: 'al-khatim',
    name: {
      ar: 'مرصد الختم الفلكي',
      en: 'Al-Khatim Astronomical Observatory',
      fr: 'Observatoire Astronomique d’Al-Khatim'
    },
    location: { ar: 'صحراء الختم، أبوظبي', en: 'Al-Khatim Desert, Abu Dhabi', fr: 'Désert d’Al-Khatim, Abou Dabi' },
    country: { ar: 'الإمارات العربية المتحدة', en: 'UAE', fr: 'Émirats Arabes Unis' },
    lat: 24.1614,
    lng: 55.0039,
    elevationMeters: 135,
    bortleScale: 3,
    category: 'optical',
    telescopes: ['0.35m Robotic Telescope', 'Meteor Fireball All-Sky Network Cameras'],
    keyDiscovery: {
      ar: 'الرصد المستمر للأهلة والمناسبات الهجرية، ومراقبة الكويكبات القريبة من الأرض (NEOs) ورصد الكرات النارية والنيازك الساقطة.',
      en: 'Precision crescent moon sighting research, NEO asteroid astrometry, and automated meteor tracking.',
      fr: 'Recherche avancée sur l’observation du croissant lunaire et la trajectographie des bolides météoritiques.'
    },
    description: {
      ar: 'مرصد فلكي متطور تابع لمركز الفلك الدولي، يسهم بانتظام في الأرصاد العالمية ويحمل كود مرصد معتمد من الاتحاد الفلكي الدولي (M44).',
      en: 'Specialized facility operated by the International Astronomical Center (IAU observatory code M44).',
      fr: 'Installation moderne opérée par le Centre International d’Astronomie (Code UAI: M44).'
    }
  },
  {
    id: 'fast-china',
    name: {
      ar: 'تلسكوب فاست الراديوي (عين السماء)',
      en: 'FAST Radio Telescope (Tianyan)',
      fr: 'Radiotélescope FAST (L’Œil Céleste)'
    },
    location: { ar: 'حوض داودانغ، قويتشو', en: 'Dawodang depression, Guizhou', fr: 'Dépression de Dawodang, Guizhou' },
    country: { ar: 'الصين', en: 'China', fr: 'Chine' },
    lat: 25.6529,
    lng: 106.8566,
    elevationMeters: 1110,
    bortleScale: 2,
    category: 'radio',
    telescopes: ['500-meter Aperture Spherical Radio Telescope'],
    keyDiscovery: {
      ar: 'اكتشاف أكثر من 900 نجم نباض (Pulsar) جديد ورصد ومضات الراديو السريعة المتكررة (FRBs) القادمة من أطراف الكون.',
      en: 'Discovery of over 900 new pulsars and detailed observation of cosmic Fast Radio Bursts (FRBs).',
      fr: 'Découverte de plus de 900 nouveaux pulsars et étude approfondie des sursauts radio rapides (FRB).'
    },
    description: {
      ar: 'أكبر تلسكوب راديوي ذي صحن مقعر فردي في العالم بقطر 500 متر مشيّد داخل حفرة كارستية طبيعية.',
      en: 'The world’s largest single-dish filled-aperture radio telescope, nestled within a natural karst basin.',
      fr: 'Le plus grand radiotélescope à réflecteur unique au monde, déployé sur 500 mètres de diamètre.'
    }
  },
  {
    id: 'ulugh-beg',
    name: {
      ar: 'مرصد ألغ بيك التاريخي',
      en: 'Ulugh Beg Historical Observatory',
      fr: 'Observatoire Historique d’Oulough Beg'
    },
    location: { ar: 'سمرقند', en: 'Samarkand', fr: 'Samarcande' },
    country: { ar: 'أوزبكستان', en: 'Uzbekistan', fr: 'Ouzbékistan' },
    lat: 39.6749,
    lng: 66.9937,
    elevationMeters: 710,
    bortleScale: 4,
    category: 'islamic-historic',
    telescopes: ['السدس الفلكي العملاق الدائري (فخري) بنصف قطر 40 متراً'],
    keyDiscovery: {
      ar: 'وضع جدول النجوم السلطاني (زيج ألغ بيك) عام 1437م الذي فهرس 1018 نجماً بدقة بلغت أجزاء من الدقيقة القوسية قبل اختراع التلسكوب بقرنين.',
      en: 'Produced the Zij-i Sultani star catalogue (1437 CE) cataloguing 1,018 stars with sub-arcminute accuracy two centuries before telescopes.',
      fr: 'Élaboration du catalogue Zij-i Sultani (1437) recensant 1 018 étoiles avec une précision inédite sans instruments optiques.'
    },
    description: {
      ar: 'شيده العالم والفلكي المسلم ألغ بيك عام 1420م، وبلغ طول قوس مقياسه 40 متراً منحوتاً داخل التل الصخري، مجسداً أوج الحضارة الفلكية الإسلامية.',
      en: 'Constructed in 1420 CE by the Timurid astronomer Ulugh Beg, featuring a massive 40m meridian sextant built into the limestone bedrock.',
      fr: 'Édifié en 1420 par le prince astronome Oulough Beg, témoignant de l’apogée de l’astronomie islamique classique.'
    }
  },
  {
    id: 'maragheh',
    name: {
      ar: 'مرصد مراغة التاريخي',
      en: 'Maragheh Historical Observatory',
      fr: 'Observatoire Historique de Maragha'
    },
    location: { ar: 'تلال مراغة، أذربيجان الشرقية', en: 'Maragheh Hills', fr: 'Collines de Maragha' },
    country: { ar: 'إيران', en: 'Iran', fr: 'Iran' },
    lat: 37.3942,
    lng: 46.2056,
    elevationMeters: 1540,
    bortleScale: 3,
    category: 'islamic-historic',
    telescopes: ['الأسطرلابات الجدارية، الربيعيات، والآلات ذات الحلق (ذات الحلق الفلكية)'],
    keyDiscovery: {
      ar: 'ابتكار نموذج «مزدوجة الطوسي» الهندسية لنصير الدين الطوسي، والتي استند إليها كوبرنيكوس لاحقاً في إثبات دوران الأرض حول الشمس.',
      en: 'Development of the Tusi Couple mathematical theorem by Nasir al-Din al-Tusi, later pivotal to Copernicus’ heliocentric breakthrough.',
      fr: 'Création du « couple d’Al-Tusi », concept géométrique révolutionnaire qui inspirera plus tard Nicolas Copernic.'
    },
    description: {
      ar: 'أول مؤسسة فلكية بحثية متكاملة في التاريخ (1259م)، ضمت مكتبة تحوي 400 ألف مخطوطة وفريقاً متعدد الثقافات من كبار علماء الفلك والرياضيات.',
      en: 'Founded in 1259 CE under Nasir al-Din al-Tusi, this institution was the prototype for modern astronomical research institutes with a 400,000-volume library.',
      fr: 'Fondé en 1259 sous la direction d’Al-Tusi, premier prototype moderne de complexe de recherche astronomique.'
    }
  },
  {
    id: 'aoraki-dark-sky',
    name: {
      ar: 'محمية أوراكي ماكينزي للسماء المظلمة',
      en: 'Aoraki Mackenzie International Dark Sky Reserve',
      fr: 'Réserve de Ciel Étoilé Aoraki Mackenzie'
    },
    location: { ar: 'حوض ماكينزي، الجزيرة الجنوبية', en: 'Mackenzie Basin, South Island', fr: 'Bassin de Mackenzie' },
    country: { ar: 'نيوزيلندا', en: 'New Zealand', fr: 'Nouvelle-Zélande' },
    lat: -43.9856,
    lng: 170.4633,
    elevationMeters: 1029,
    bortleScale: 1,
    category: 'dark-sky',
    telescopes: ['Mount John Observatory (1.8m MOA telescope for microlensing exoplanets)'],
    keyDiscovery: {
      ar: 'اكتشاف كواكب حرة طليقة تسبح بين النجوم بواسطة ظاهرة العدسة التثاقلية الصغرية، مع رؤية نقية مذهلة لسحابتي ماجلان ومجرة درب التبانة.',
      en: 'Detection of rogue exoplanets via gravitational microlensing, alongside world-leading stargazing of the Magellanic Clouds.',
      fr: 'Découverte de planètes errantes par microlentille gravitationnelle et vue cristalline sur les Nuages de Magellan.'
    },
    description: {
      ar: 'محمية ذهبية معتمدة من جمعية السماء المظلمة الدولية (IDA) تغطي أكثر من 4,300 كم² وتوفر صفاء بصرياً استثنائياً للكون الجنوبي.',
      en: 'Gold-tier IDA certified dark sky reserve covering 4,300 km², providing pristine southern hemisphere sky visibility.',
      fr: 'Réserve internationale de ciel étoilé de niveau Or s’étendant sur 4 300 km² sans pollution lumineuse.'
    }
  },
  {
    id: 'namibrand-dark-sky',
    name: {
      ar: 'محمية ناميبراند للسماء المظلمة',
      en: 'NamibRand Nature Reserve',
      fr: 'Réserve Naturelle de NamibRand'
    },
    location: { ar: 'صحراء ناميب', en: 'Namib Desert', fr: 'Désert du Namib' },
    country: { ar: 'ناميبيا', en: 'Namibia', fr: 'Namibie' },
    lat: -24.9667,
    lng: 15.9833,
    elevationMeters: 980,
    bortleScale: 1,
    category: 'dark-sky',
    telescopes: ['H.E.S.S. Gamma-Ray Cherenkov Telescopes', 'Amateur Astro-tourism Hubs'],
    keyDiscovery: {
      ar: 'سماء صحراوية بالغة السكون والظلمة تتيح رصد الإشعاعات الكونية عالية الطاقة وتفاصيل سديم الجبار وقوس مجرة درب التبانة بالعين المجردة.',
      en: 'Ultra-dark desert skies enabling high-energy stereoscopic cosmic ray detection and vivid naked-eye views of the Milky Way core.',
      fr: 'Site d’observation parmi les plus obscurs de la planète, hôte des télescopes gamma H.E.S.S.'
    },
    description: {
      ar: 'أول محمية طبيعية للسماء المظلمة في إفريقيا ذات رتبة ذهبية، تتميز بغياب تام للأضواء الصناعية ورطوبة تقارب الصفر.',
      en: 'Africa’s first certified Dark Sky Reserve, situated in the ancient Namib Desert with zero artificial illumination.',
      fr: 'Première réserve de ciel étoilé d’Afrique, réputée pour son atmosphère aride et son obscurité totale.'
    }
  }
];

// Coordinates of the Holy Kaaba in Mecca
const KAABA_COORDS = { lat: 21.4225, lng: 39.8262 };

/**
 * Calculates Great Circle distance between two coordinates in kilometers (Haversine formula)
 */
function calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

/**
 * Calculates initial bearing (azimuth in degrees 0-360) from Point A to Point B
 */
function calculateBearingDegrees(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const phi1 = (lat1 * Math.PI) / 180;
  const phi2 = (lat2 * Math.PI) / 180;
  const deltaLambda = ((lon2 - lon1) * Math.PI) / 180;

  const y = Math.sin(deltaLambda) * Math.cos(phi2);
  const x = Math.cos(phi1) * Math.sin(phi2) - Math.sin(phi1) * Math.cos(phi2) * Math.cos(deltaLambda);
  const theta = Math.atan2(y, x);
  const bearing = ((theta * 180) / Math.PI + 360) % 360;
  return Math.round(bearing * 10) / 10;
}

interface CosmicObservatoriesMapProps {
  language: Language;
}

export const CosmicObservatoriesMap: React.FC<CosmicObservatoriesMapProps> = ({ language }) => {
  const [apiKey, setApiKey] = useState<string>(() => {
    return (import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string) || '';
  });
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSite, setSelectedSite] = useState<ObservatorySite | null>(OBSERVATORIES[0]);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [nearestSite, setNearestSite] = useState<{ site: ObservatorySite; distanceKm: number } | null>(null);
  const [mapType, setMapType] = useState<'hybrid' | 'roadmap' | 'satellite' | 'terrain'>('hybrid');
  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);
  const [customKeyInput, setCustomKeyInput] = useState('');
  const [locatingUser, setLocatingUser] = useState(false);

  // Try fetching API key from server if not set in client env
  useEffect(() => {
    if (!apiKey) {
      fetch('/api/maps/config')
        .then((res) => res.json())
        .then((data) => {
          if (data && data.apiKey) {
            setApiKey(data.apiKey);
          }
        })
        .catch(() => {
          // Graceful fallback
        });
    }
  }, [apiKey]);

  // Filtered sites based on category and query
  const filteredSites = useMemo(() => {
    return OBSERVATORIES.filter((site) => {
      const matchesCategory = selectedCategory === 'all' || site.category === selectedCategory;
      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      const nameMatch =
        site.name.ar.toLowerCase().includes(q) ||
        site.name.en.toLowerCase().includes(q) ||
        site.name.fr.toLowerCase().includes(q);
      const countryMatch =
        site.country.ar.toLowerCase().includes(q) ||
        site.country.en.toLowerCase().includes(q) ||
        site.country.fr.toLowerCase().includes(q);
      const telescopeMatch = site.telescopes.some((t) => t.toLowerCase().includes(q));

      return nameMatch || countryMatch || telescopeMatch;
    });
  }, [selectedCategory, searchQuery]);

  // Handle Geolocation to find nearest observatory
  const handleLocateUser = useCallback(() => {
    if (!navigator.geolocation) {
      alert(language === 'ar' ? 'خاصية تحديد الموقع غير مدعومة في متصفحك.' : 'Geolocation is not supported by your browser.');
      return;
    }
    setLocatingUser(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setUserLocation(coords);
        setLocatingUser(false);

        // Calculate nearest observatory
        let closest: ObservatorySite = OBSERVATORIES[0];
        let minDistance = calculateDistanceKm(coords.lat, coords.lng, closest.lat, closest.lng);

        for (const site of OBSERVATORIES) {
          const d = calculateDistanceKm(coords.lat, coords.lng, site.lat, site.lng);
          if (d < minDistance) {
            minDistance = d;
            closest = site;
          }
        }

        setNearestSite({ site: closest, distanceKm: minDistance });
        setSelectedSite(closest);
      },
      () => {
        setLocatingUser(false);
        // Default to a central position if user denied
        alert(
          language === 'ar'
            ? 'تعذر الوصول لموقعك الحالي. يرجى تفعيل إذن الموقع في المتصفح.'
            : 'Could not access your location. Please check browser permissions.'
        );
      },
      { timeout: 10000 }
    );
  }, [language]);

  // Calculate astronomical details for the currently selected site
  const siteAstros = useMemo(() => {
    if (!selectedSite) return null;
    const distanceToKaaba = calculateDistanceKm(selectedSite.lat, selectedSite.lng, KAABA_COORDS.lat, KAABA_COORDS.lng);
    const qiblaAzimuth = calculateBearingDegrees(selectedSite.lat, selectedSite.lng, KAABA_COORDS.lat, KAABA_COORDS.lng);
    const polarisAltitude = selectedSite.lat > 0 ? Math.round(selectedSite.lat * 10) / 10 : null;

    return {
      distanceToKaaba,
      qiblaAzimuth,
      polarisAltitude
    };
  }, [selectedSite]);

  const getCategoryColor = (cat: ObservatorySite['category']) => {
    switch (cat) {
      case 'optical':
        return '#06b6d4'; // cyan
      case 'radio':
        return '#a855f7'; // purple
      case 'islamic-historic':
        return '#f59e0b'; // amber
      case 'dark-sky':
        return '#10b981'; // emerald
      default:
        return '#3b82f6';
    }
  };

  const getCategoryLabel = (cat: ObservatorySite['category']) => {
    if (language === 'ar') {
      switch (cat) {
        case 'optical':
          return 'مرصد بصري كبير';
        case 'radio':
          return 'تلسكوب راديوي عملاق';
        case 'islamic-historic':
          return 'مرصد إسلامي وتاريخي';
        case 'dark-sky':
          return 'محمية سماء مظلمة';
      }
    }
    if (language === 'fr') {
      switch (cat) {
        case 'optical':
          return 'Observatoire Optique';
        case 'radio':
          return 'Radiotélescope';
        case 'islamic-historic':
          return 'Observatoire Historique';
        case 'dark-sky':
          return 'Réserve de Ciel Étoilé';
      }
    }
    switch (cat) {
      case 'optical':
        return 'Optical Observatory';
      case 'radio':
        return 'Radio Array';
      case 'islamic-historic':
        return 'Historic Islamic Site';
      case 'dark-sky':
        return 'Dark Sky Reserve';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-[#06142e] via-[#091e42] to-[#040e24] border border-cyan-800/40 shadow-2xl relative overflow-hidden">
        <div className="absolute -end-16 -top-16 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-bold">
              <Globe2 className="w-4 h-4 text-cyan-400" />
              <span>
                {language === 'ar'
                  ? 'خرائط جوجل التفاعلية للرصد الفلكي'
                  : 'Interactive Google Maps Astronomical Explorer'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white">
              {language === 'ar'
                ? 'خريطة المراصد الفلكية العالمية ومواقع رصد السماء'
                : 'Global Astronomical Observatories & Dark Sky Reserves Map'}
            </h1>
            <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
              {language === 'ar'
                ? 'استكشف عبر Google Maps أكبر تلسكوبات العالم، من مرصد أوكايمدن في جبال الأطلس المغربية وتلسكوبات تشيلي وهاواي، إلى المراصد الإسلامية التاريخية ومحميات السماء المظلمة الأكثر نقاءً على الكوكب.'
                : 'Explore world-renowned observatories from Oukaïmeden in Morocco to Paranal in Chile, alongside historical Islamic observatories and pristine dark sky reserves via Google Maps Platform.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={handleLocateUser}
              disabled={locatingUser}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-600/30 hover:bg-cyan-600/40 text-cyan-200 border border-cyan-500/40 text-xs font-bold shadow-lg transition-all cursor-pointer"
            >
              <Navigation className={`w-4 h-4 text-cyan-400 ${locatingUser ? 'animate-spin' : ''}`} />
              <span>
                {locatingUser
                  ? language === 'ar'
                    ? 'جاري تحديد موقعك...'
                    : 'Locating...'
                  : language === 'ar'
                  ? 'أقرب مرصد إليك'
                  : 'Find Nearest Site'}
              </span>
            </button>

            <button
              onClick={() => setIsKeyModalOpen(true)}
              className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 border border-slate-700/60 text-xs font-bold transition-all cursor-pointer"
              title="Google Maps API Key Settings"
            >
              <Key className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">
                {language === 'ar' ? 'مفتاح الخرائط' : 'Maps Key'}
              </span>
            </button>
          </div>
        </div>

        {/* Nearest Observatory Card if found */}
        {nearestSite && userLocation && (
          <div className="mt-4 p-3.5 rounded-2xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-between gap-4 animate-in fade-in duration-300">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/20 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-cyan-400" />
              </div>
              <div className="text-xs">
                <span className="font-bold text-white block">
                  {language === 'ar' ? 'أقرب موقع رصد إليك:' : 'Nearest Site to Your Location:'}{' '}
                  <span className="text-cyan-300">{nearestSite.site.name[language]}</span>
                </span>
                <span className="text-slate-400">
                  {language === 'ar'
                    ? `المسافة التقديرية بالخط الجوي: ${nearestSite.distanceKm.toLocaleString()} كم`
                    : `Direct distance: approx. ${nearestSite.distanceKm.toLocaleString()} km`}
                </span>
              </div>
            </div>
            <button
              onClick={() => setSelectedSite(nearestSite.site)}
              className="px-3 py-1.5 rounded-lg bg-cyan-500 text-black text-xs font-bold hover:bg-cyan-400 transition-colors shrink-0 cursor-pointer"
            >
              {language === 'ar' ? 'عرض على الخريطة' : 'View on Map'}
            </button>
          </div>
        )}
      </div>

      {/* Control Bar: Categories & Search */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
        {/* Category Filter Chips */}
        <div className="md:col-span-8 flex flex-wrap items-center gap-2">
          {[
            { id: 'all', label: language === 'ar' ? 'جميع المواقع (12)' : 'All Sites (12)', icon: Globe2 },
            { id: 'optical', label: language === 'ar' ? 'مراصد بصرية' : 'Optical', icon: Telescope },
            { id: 'radio', label: language === 'ar' ? 'تلسكوبات راديوية' : 'Radio Arrays', icon: Radio },
            { id: 'islamic-historic', label: language === 'ar' ? 'مراصد إسلامية وتاريخية' : 'Historic Islamic', icon: Compass },
            { id: 'dark-sky', label: language === 'ar' ? 'محميات سماء مظلمة' : 'Dark Sky Reserves', icon: Moon }
          ].map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white shadow-md shadow-cyan-500/20 border border-cyan-400/40'
                    : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Search input */}
        <div className="md:col-span-4 relative">
          <Search className="w-4 h-4 text-slate-400 absolute start-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              language === 'ar'
                ? 'ابحث باسم المرصد، الدولة، التلسكوب...'
                : 'Search observatory, country, or telescope...'
            }
            className="w-full ps-10 pe-4 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
          />
        </div>
      </div>

      {/* Main Map View & Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left / Center Map Container */}
        <div className="lg:col-span-8 space-y-3">
          {/* Map View Frame with Explicit Height */}
          <div className="relative w-full h-[540px] sm:h-[620px] rounded-3xl overflow-hidden border border-cyan-900/40 shadow-2xl bg-[#030712]">
            {/* Map Type Bar inside Map */}
            <div className="absolute top-4 start-4 z-20 flex items-center gap-1.5 p-1 rounded-xl bg-black/80 backdrop-blur-md border border-cyan-800/40 shadow-lg">
              {(['hybrid', 'satellite', 'roadmap', 'terrain'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setMapType(type)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase transition-all cursor-pointer ${
                    mapType === type
                      ? 'bg-cyan-500 text-black shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* Google Maps SDK Rendering with vis.gl Provider */}
            <APIProvider apiKey={apiKey} solutionChannel="GMP_aistudio">
              <Map
                mapId="DEMO_MAP_ID"
                defaultCenter={{ lat: 26.0, lng: 15.0 }}
                defaultZoom={2}
                mapTypeId={mapType}
                gestureHandling="greedy"
                disableDefaultUI={false}
                internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
                style={{ width: '100%', height: '100%' }}
              >
                {/* Observatory Markers */}
                {filteredSites.map((site) => {
                  const isSelected = selectedSite?.id === site.id;
                  const catColor = getCategoryColor(site.category);
                  return (
                    <AdvancedMarker
                      key={site.id}
                      position={{ lat: site.lat, lng: site.lng }}
                      onClick={() => setSelectedSite(site)}
                      title={site.name[language]}
                      zIndex={isSelected ? 50 : 10}
                    >
                      <Pin
                        background={catColor}
                        glyphColor="#ffffff"
                        borderColor={isSelected ? '#ffffff' : '#030712'}
                        scale={isSelected ? 1.3 : 1.0}
                      />
                    </AdvancedMarker>
                  );
                })}

                {/* User Location Marker if available */}
                {userLocation && (
                  <AdvancedMarker
                    position={{ lat: userLocation.lat, lng: userLocation.lng }}
                    title={language === 'ar' ? 'موقعك الحالي' : 'Your Location'}
                    zIndex={100}
                  >
                    <div className="w-5 h-5 rounded-full bg-cyan-400 border-2 border-white shadow-lg animate-pulse" />
                  </AdvancedMarker>
                )}

                {/* Active InfoWindow */}
                {selectedSite && (
                  <InfoWindow
                    position={{ lat: selectedSite.lat, lng: selectedSite.lng }}
                    onCloseClick={() => setSelectedSite(null)}
                    headerContent={
                      <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-cyan-600" />
                        <span>{selectedSite.name[language]}</span>
                      </div>
                    }
                  >
                    <div className="text-xs text-slate-700 max-w-xs space-y-1.5 p-1">
                      <div className="font-semibold text-cyan-900">
                        {selectedSite.location[language]} • {selectedSite.country[language]}
                      </div>
                      <div className="text-[11px] text-slate-600 line-clamp-2">
                        {selectedSite.keyDiscovery[language]}
                      </div>
                      <div className="pt-1 flex items-center justify-between text-[10px] text-slate-500 border-t border-slate-200">
                        <span>الارتفاع: {selectedSite.elevationMeters.toLocaleString()} م</span>
                        <span>مقياس بورتل: {selectedSite.bortleScale}/9</span>
                      </div>
                    </div>
                  </InfoWindow>
                )}
              </Map>
            </APIProvider>
          </div>

          {/* Quick List Strip of Observatories */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {filteredSites.map((site) => {
              const isSelected = selectedSite?.id === site.id;
              const catColor = getCategoryColor(site.category);
              return (
                <button
                  key={site.id}
                  onClick={() => setSelectedSite(site)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-800 text-cyan-300 border border-cyan-500/50 shadow-md'
                      : 'bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800/50 border border-slate-800'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: catColor }} />
                  <span className="font-semibold">{site.name[language]}</span>
                  <span className="text-[10px] text-slate-500">({site.country[language]})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Details Panel for Selected Observatory */}
        <div className="lg:col-span-4 space-y-4">
          {selectedSite ? (
            <div className="p-6 rounded-3xl bg-slate-900/90 border border-cyan-800/30 shadow-2xl space-y-5">
              {/* Top Badge & Title */}
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className="px-2.5 py-1 rounded-full text-[11px] font-bold text-white uppercase tracking-wider"
                    style={{ backgroundColor: getCategoryColor(selectedSite.category) }}
                  >
                    {getCategoryLabel(selectedSite.category)}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{selectedSite.country[language]}</span>
                  </span>
                </div>
                <h3 className="text-xl font-black text-white leading-tight">
                  {selectedSite.name[language]}
                </h3>
                <p className="text-xs text-cyan-300/80 font-medium">
                  {selectedSite.location[language]} • {selectedSite.lat.toFixed(4)}°, {selectedSite.lng.toFixed(4)}°
                </p>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-300 leading-relaxed">
                {selectedSite.description[language]}
              </p>

              {/* Key Discovery Card */}
              <div className="p-3.5 rounded-2xl bg-[#06142e] border border-cyan-900/40 space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                  <Award className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{language === 'ar' ? 'أبرز الإنجازات والاكتشافات:' : 'Notable Discoveries & Science:'}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed ps-6">
                  {selectedSite.keyDiscovery[language]}
                </p>
              </div>

              {/* Technical Specifications */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/50 space-y-1">
                  <span className="text-slate-400 block text-[10px]">
                    {language === 'ar' ? 'الارتفاع فوق سطح البحر' : 'Elevation (Meters)'}
                  </span>
                  <span className="text-white font-bold text-sm">
                    {selectedSite.elevationMeters.toLocaleString()} م
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/50 space-y-1">
                  <span className="text-slate-400 block text-[10px]">
                    {language === 'ar' ? 'مقياس ظلمة السماء (Bortle)' : 'Sky Darkness (Bortle)'}
                  </span>
                  <span className="text-white font-bold text-sm">
                    الفئة {selectedSite.bortleScale} / 9
                  </span>
                </div>
              </div>

              {/* Primary Telescopes / Instruments */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-300 block">
                  {language === 'ar' ? 'أهم التلسكوبات والمصفوفات:' : 'Primary Telescopes & Instruments:'}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedSite.telescopes.map((tel, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-cyan-950/70 border border-cyan-800/40 text-cyan-200 text-xs font-medium"
                    >
                      {tel}
                    </span>
                  ))}
                </div>
              </div>

              {/* Celestial & Qibla Alignment Data */}
              {siteAstros && (
                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-950/30 to-indigo-950/30 border border-amber-900/40 space-y-2 text-xs">
                  <div className="flex items-center gap-2 font-bold text-amber-300">
                    <Compass className="w-4 h-4 text-amber-400" />
                    <span>
                      {language === 'ar'
                        ? 'المحاذاة الفلكية وزاوية القبلة الكونية'
                        : 'Celestial Azimuth & Qibla Bearing'}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300">
                    <div>
                      <span className="text-slate-400 block">
                        {language === 'ar' ? 'المسافة إلى مكة المكرمة:' : 'Distance to Kaaba:'}
                      </span>
                      <span className="font-bold text-white">
                        {siteAstros.distanceToKaaba.toLocaleString()} كم
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">
                        {language === 'ar' ? 'سمت القبلة من المرصد:' : 'Qibla Azimuth:'}
                      </span>
                      <span className="font-bold text-white">
                        {siteAstros.qiblaAzimuth}°
                      </span>
                    </div>
                  </div>
                  {siteAstros.polarisAltitude !== null && (
                    <div className="text-[10px] text-slate-400 border-t border-slate-700/50 pt-1.5">
                      {language === 'ar'
                        ? `ارتفاع النجم القطبي (Polaris): ${siteAstros.polarisAltitude}° فوق الأفق الشمالي`
                        : `Polaris celestial altitude: ${siteAstros.polarisAltitude}° above northern horizon`}
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 text-center space-y-3">
              <Telescope className="w-10 h-10 text-slate-600 mx-auto" />
              <h4 className="text-base font-bold text-white">
                {language === 'ar' ? 'حدد مرصداً من الخريطة' : 'Select an Observatory on the Map'}
              </h4>
              <p className="text-xs text-slate-400">
                {language === 'ar'
                  ? 'انقر على أي علامة في الخريطة لاستعراض تفاصيل المرصد وارتفاعه وتلسكوباته وأبرز اكتشافاته.'
                  : 'Click on any marker to inspect altitude, telescopes, and discoveries.'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* API Key Configuration Modal for User Testing */}
      {isKeyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-md rounded-3xl bg-[#0a1024] border border-cyan-800/60 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-white font-bold text-base">
                <Key className="w-5 h-5 text-amber-400" />
                <span>{language === 'ar' ? 'إعدادات مفتاح Google Maps API' : 'Google Maps API Settings'}</span>
              </div>
              <button
                onClick={() => setIsKeyModalOpen(false)}
                className="text-slate-400 hover:text-white text-xs font-bold px-2 py-1"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {language === 'ar'
                ? 'تم إعداد الخريطة بواسطة حزمة @vis.gl/react-google-maps الرسمية. إذا كنت تملك مفتاح Google Cloud مخصص، يمكنك إدخاله هنا لاختباره مباشرة.'
                : 'The map uses the official @vis.gl/react-google-maps SDK. If you have a custom Google Cloud Maps API key, you can provide it below.'}
            </p>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 block">
                {language === 'ar' ? 'مفتاح API الخاص بك (Google Maps API Key):' : 'Your Google Maps API Key:'}
              </label>
              <input
                type="text"
                value={customKeyInput}
                onChange={(e) => setCustomKeyInput(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-900/40 text-[11px] text-amber-200">
              {language === 'ar'
                ? 'ملاحظة: تأكد من تقييد مفتاحك في منصة Google Cloud بنطاق موقعك والـ HTTP Referrers لمنع الاستخدام غير المصرح به.'
                : 'Tip: Remember to restrict your key in Google Cloud Console to HTTP referrers to prevent unauthorized usage.'}
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setIsKeyModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-700 cursor-pointer"
              >
                {language === 'ar' ? 'إلغاء' : 'Cancel'}
              </button>
              <button
                onClick={() => {
                  if (customKeyInput.trim()) {
                    setApiKey(customKeyInput.trim());
                  }
                  setIsKeyModalOpen(false);
                }}
                className="px-4 py-2 rounded-xl bg-cyan-500 text-black text-xs font-bold hover:bg-cyan-400 cursor-pointer"
              >
                {language === 'ar' ? 'حفظ وتطبيق' : 'Apply Key'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
