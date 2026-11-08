import React, { useState, useEffect } from 'react';
import {
  Eye,
  ArrowRight,
  ArrowLeft,
  Maximize2,
  Compass,
  Play,
  Pause,
  ZoomIn,
  ZoomOut,
  X,
  Sparkles,
  BookOpen,
  Info,
  Scale,
  Clock,
  Layers,
  RotateCcw
} from 'lucide-react';
import { Language } from '../types/cosmic';
import { translations } from '../i18n/translations';

interface CosmicScaleExplorerProps {
  language: Language;
}

interface ScaleStep {
  id: string;
  name: { ar: string; en: string; fr: string };
  sizeMeters: string;
  orderOfMagnitude: string; // e.g. "10⁰ m"
  physicalSize: { ar: string; en: string; fr: string };
  lightTravelTime: { ar: string; en: string; fr: string };
  relativeToHuman: string;
  relativeStep: { ar: string; en: string; fr: string };
  imageUrl: string;
  imageCaption: { ar: string; en: string; fr: string };
  description: { ar: string; en: string; fr: string };
  scientificDetails: { ar: string; en: string; fr: string };
  quranicContemplation?: {
    verse: string;
    surah: { ar: string; en: string; fr: string };
    ayahNumber: number;
    reflection: { ar: string; en: string; fr: string };
  };
}

export const CosmicScaleExplorer: React.FC<CosmicScaleExplorerProps> = ({ language }) => {
  const t = translations[language];

  // 13 Highly accurate, visually enriched cosmic scale steps
  const scaleSteps: ScaleStep[] = [
    {
      id: 'human',
      name: { ar: 'الإنسان ومقياسنا اليومي', en: 'Human Observer Scale', fr: 'L’Observateur Humain' },
      sizeMeters: '1.7 m',
      orderOfMagnitude: '10⁰ m',
      physicalSize: { ar: '1.7 متر', en: '1.7 meters', fr: '1,7 mètres' },
      lightTravelTime: { ar: '5.6 نانو ثانية', en: '5.6 nanoseconds', fr: '5,6 nanosecondes' },
      relativeToHuman: '1x (المقياس المرجعي)',
      relativeStep: { ar: 'نقطة الانطلاق للإدراك الحسي', en: 'Baseline reference point', fr: 'Point de référence' },
      imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1600&auto=format&fit=crop',
      imageCaption: {
        ar: 'الإنسان يتأمل صفحة السماء المرصعة بالنجوم فوق قمم الجبال',
        en: 'A human observer contemplating the star-studded night sky atop mountains',
        fr: 'Un observateur humain contemplant la voûte céleste depuis les sommets'
      },
      description: {
        ar: 'مقياس إدراكنا الحسي المباشر، حيث نقف ككائنات عاقلة متأملة ومستخلفة في هذا الوجود الفسيح.',
        en: 'The realm of direct sensory perception, where conscious observers ponder the awe of the cosmos.',
        fr: 'L’échelle de notre perception sensorielle directe, point de départ de notre quête cosmologique.'
      },
      scientificDetails: {
        ar: 'تتكون أجسامنا من نحو 30 تريليون خلية و 7 مليار مليار مليار ذرة (7 × 10²⁷ ذرة)، صُنعت عناصرها الثقيلة كالحديد والكالسيوم في أفران النجوم المنفجرة.',
        en: 'The human body comprises ~30 trillion cells and 7 octillion atoms; heavier atoms like iron and calcium were forged inside primordial supernovae.',
        fr: 'Le corps humain compte ~30 billions de cellules et 7 octillions d’atomes forgés au cœur des supernovae.'
      },
      quranicContemplation: {
        verse: 'وَفِي أَنفُسِكُمْ أَفَلَا تُبْصِرُونَ',
        surah: { ar: 'سورة الذاريات', en: 'Surah Adh-Dhariyat', fr: 'Sourate Adh-Dhariyat' },
        ayahNumber: 21,
        reflection: {
          ar: 'دعوة للتفكر في دقة خلق الإنسان وتناسق أعضائه كآية شاهدة على حكمة الخالق قبل الانطلاق لاستكشاف آفاق السماء.',
          en: 'An invitation to reflect upon the miraculous precision of human biology before venturing into outer celestial realms.',
          fr: 'Une invitation à méditer sur la perfection de la création humaine avant d’explorer les confins du cosmos.'
        }
      }
    },
    {
      id: 'moon',
      name: { ar: 'القمر والمدار القمري', en: 'The Moon & Cislunar Orbit', fr: 'La Lune et l’Orbite Cislunaire' },
      sizeMeters: '3.47 × 10⁶ m',
      orderOfMagnitude: '10⁶ m',
      physicalSize: { ar: '3,474 كم (قطر القمر)', en: '3,474 km diameter', fr: '3 474 km de diamètre' },
      lightTravelTime: { ar: '1.28 ثانية للوصول إلى الأرض', en: '1.28 light-seconds to Earth', fr: '1,28 seconde-lumière' },
      relativeToHuman: '2,043,000x مقياس الإنسان',
      relativeStep: { ar: 'أقرب جرم سماوي طبيعي للأرض (384,400 كم)', en: 'Closest celestial neighbor (384,400 km)', fr: 'Voisin céleste le plus proche (384 400 km)' },
      imageUrl: 'https://images.unsplash.com/photo-1522030299830-16b8d3d049fe?q=80&w=1600&auto=format&fit=crop',
      imageCaption: {
        ar: 'قرص القمر الكامل بدقة تصوير فائقة تبرز الفوهات والبحار البازلتية',
        en: 'Ultra-high resolution full moon disc highlighting cratered highlands and basaltic maria',
        fr: 'Disque lunaire en haute définition révélant ses cratères et ses mers basaltiques'
      },
      description: {
        ar: 'التابع الطبيعي الوحيد لكوكب الأرض، يلعب دوراً حاسماً في استقرار ميلان محور دوران الأرض وتكوين ظاهرة المد والجزر.',
        en: 'Earth’s only natural satellite, crucial for stabilizing our planetary axial tilt and driving rhythmic oceanic tides.',
        fr: 'Unique satellite naturel de la Terre, stabilisant l’inclinaison axiale terrestre et régissant les marées.'
      },
      scientificDetails: {
        ar: 'يبعد القمر عن الأرض نحو 384,400 كم، ويتحرك في مدار متزامن يجعله يُظهر وجهاً واحداً دائماً للأرض (Tidal Locking).',
        en: 'Orbiting at ~384,400 km in tidal lock, presenting perpetually the same lunar face toward Earth.',
        fr: 'En orbite à ~384 400 km en rotation synchrone, présentant toujours la même face à la Terre.'
      },
      quranicContemplation: {
        verse: 'وَالْقَمَرَ قَدَّرْنَاهُ مَنَازِلَ حَتَّىٰ عَادَ كَالْعُرْجُونِ الْقَدِيمِ',
        surah: { ar: 'سورة يس', en: 'Surah Ya-Sin', fr: 'Sourate Ya-Sin' },
        ayahNumber: 39,
        reflection: {
          ar: 'ضبط منازل القمر وأطواره الشهرية بدقة رياضية متناهية تتيح للبشرية حساب السنين والشهور وتوقيت العبادات والمعاملات.',
          en: 'The mathematical precision of lunar phases orchestrating monthly calendars and celestial timekeeping.',
          fr: 'La géométrie rigoureuse des phases lunaires rythmant les calendriers et la mesure du temps.'
        }
      }
    },
    {
      id: 'earth',
      name: { ar: 'كوكب الأرض (الكرة الزرقاء)', en: 'Planet Earth (The Blue Marble)', fr: 'La Planète Terre (La Bille Bleue)' },
      sizeMeters: '1.27 × 10⁷ m',
      orderOfMagnitude: '10⁷ m',
      physicalSize: { ar: '12,742 كم (قطر الأرض)', en: '12,742 km equatorial diameter', fr: '12 742 km de diamètre' },
      lightTravelTime: { ar: '0.042 ثانية لعبور القطر', en: '0.042 seconds across diameter', fr: '0,042 seconde à travers le globe' },
      relativeToHuman: '7,495,000x مقياس الإنسان',
      relativeStep: { ar: '3.6x حجم قطر القمر', en: '3.66x diameter of the Moon', fr: '3,66x le diamètre lunaire' },
      imageUrl: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=1600&auto=format&fit=crop',
      imageCaption: {
        ar: 'صورة الأرض من الفضاء الخارجي تبرز المحيطات والغلاف الجوي الحامي',
        en: 'Earth captured from space showcasing sapphire oceans and swirling clouds',
        fr: 'La Terre vue de l’espace révélant ses océans d’azur et son atmosphère vivante'
      },
      description: {
        ar: 'واحتنا الكونية الفريدة، الكوكب الوحيد المؤكد حتى الآن الذي يحتضن بحار الماء السائل والحياة وغلافاً يصد الإشعاعات القاتلة.',
        en: 'Our cosmic oasis, the only confirmed harbor of life and liquid oceans in the known universe, shielded by an atmosphere.',
        fr: 'Notre oasis cosmique, unique monde connu abritant des océans d’eau liquide et une biosphère florissante.'
      },
      scientificDetails: {
        ar: 'تبلغ كتلة الأرض 5.97 × 10²⁴ كغم، وتدور حول الشمس بسرعة 107,000 كم/ساعة في النطاق الصالح للحياة (Habitable Zone).',
        en: 'Mass of 5.97 × 10²⁴ kg, orbiting the Sun at 107,000 km/h nestled safely in the circumstellar habitable zone.',
        fr: 'Masse de 5,97 × 10²⁴ kg, gravitant autour du Soleil à 107 000 km/h au cœur de la zone habitable.'
      },
      quranicContemplation: {
        verse: 'وَالْأَرْضَ بَعْدَ ذَٰلِكَ دَحَاهَا * أَخْرَجَ مِنْهَا مَاءَهَا وَمَرْعَاهَا',
        surah: { ar: 'سورة النازعات', en: 'Surah An-Nazi’at', fr: 'Sourate An-Nazi’at' },
        ayahNumber: 30,
        reflection: {
          ar: 'بسط الأرض وتهيئة تضاريسها وإخراج مائها وغلافها لتكون مهاداً حياً متكاملاً يتسع للحياة بجميع صورها.',
          en: 'The exquisite outgassing of water and geological preparation of Earth to support complex life.',
          fr: 'L’émergence de l’eau et l’agencement minutieux de la planète pour accueillir la diversité du vivant.'
        }
      }
    },
    {
      id: 'jupiter',
      name: { ar: 'كوكب المشتري (عملاق الكواكب)', en: 'Planet Jupiter (Giant of the System)', fr: 'Jupiter (Le Géant Planétaire)' },
      sizeMeters: '1.40 × 10⁸ m',
      orderOfMagnitude: '10⁸ m',
      physicalSize: { ar: '139,820 كم (قطر المشتري)', en: '139,820 km diameter', fr: '139 820 km de diamètre' },
      lightTravelTime: { ar: '0.46 ثانية لعبور القطر', en: '0.46 light-seconds across', fr: '0,46 seconde-lumière' },
      relativeToHuman: '82,247,000x مقياس الإنسان',
      relativeStep: { ar: '11x قطر الأرض (يستوعب 1300 كوكب كالأرض)', en: '11x Earth diameter (fits 1,300 Earths)', fr: '11x le diamètre de la Terre (contient 1 300 Terres)' },
      imageUrl: 'https://images.unsplash.com/photo-1630839437035-dac17da5809f?q=80&w=1600&auto=format&fit=crop',
      imageCaption: {
        ar: 'عواصف المشتري وأحزمته الغازية المعقدة مع البقعة الحمراء العظيمة من كاميرا تلسكوب هابل',
        en: 'Jupiter’s turbulent cloud bands and Great Red Spot captured in stunning detail by Hubble',
        fr: 'Les tempêtes tourbillonnantes de Jupiter et sa Grande Tache Rouge observées par Hubble'
      },
      description: {
        ar: 'سيد كواكب المجموعة وأضخمها قاطبة، تبلغ كتلته ضعفي ونصف مجموع كتل الكواكب الأخرى مجتمعة، ويمتلك 95 قمراً مؤكداً.',
        en: 'The king of planets, exceeding 2.5 times the mass of all other planets combined, orbited by 95 confirmed moons.',
        fr: 'Le colosse planétaire, 2,5 fois plus massif que toutes les autres planètes réunies, avec 95 lunes confirmées.'
      },
      scientificDetails: {
        ar: 'يشكل المشتري درعاً جاذبياً وقائياً يحمي الأرض من قذائف المذنبات، وتبلغ سرعة دورانه حول نفسه 9.9 ساعة فقط كأسرع كوكب دوراناً.',
        en: 'Acts as Earth’s gravitational shield, vacuuming incoming comets, spinning on its axis in a blistering 9.9 hours.',
        fr: 'Bouclier gravitationnel déviant les comètes, effectuant sa rotation en seulement 9,9 heures.'
      },
      quranicContemplation: {
        verse: 'وَجَعَلْنَا السَّمَاءَ سَقْفًا مَّحْفُوظًا',
        surah: { ar: 'سورة الأنبياء', en: 'Surah Al-Anbiya', fr: 'Sourate Al-Anbiya' },
        ayahNumber: 32,
        reflection: {
          ar: 'تسخير هذا العملاق بكتلته المهيبة ليكون بمثابة حارس جاذبي يشتت الأخطار الفضائية عن كوكبنا الصغير الهادئ.',
          en: 'The cosmic orchestration of this giant whose gravitational pull sweeps cosmic debris away from Earth.',
          fr: 'L’équilibre cosmique où la force gravitationnelle de ce géant préserve la Terre des collisions destructrices.'
        }
      }
    },
    {
      id: 'sun',
      name: { ar: 'الشمس (نجمنا المركزي)', en: 'The Sun (Our Central Star)', fr: 'Le Soleil (Notre Étoile Centrale)' },
      sizeMeters: '1.39 × 10⁹ m',
      orderOfMagnitude: '10⁹ m',
      physicalSize: { ar: '1,392,700 كم (قطر الشمس)', en: '1,392,700 km diameter', fr: '1 392 700 km de diamètre' },
      lightTravelTime: { ar: '4.64 ثانية لعبور القطر (8.3 دقائق للأرض)', en: '4.64 light-seconds across (8.3 min to Earth)', fr: '4,64 secondes-lumière (8,3 min jusqu’à la Terre)' },
      relativeToHuman: '819,000,000x مقياس الإنسان',
      relativeStep: { ar: '109x قطر الأرض (تستوعب 1.3 مليون أرض)', en: '109x Earth diameter (holds 1.3M Earths)', fr: '109x le diamètre terrestre (contient 1,3 million de Terres)' },
      imageUrl: 'https://images.unsplash.com/photo-1579202673506-ca3ce28943ef?q=80&w=1600&auto=format&fit=crop',
      imageCaption: {
        ar: 'سطح الشمس المتوهج والانفجارات الإكليلية المغناطيسية من مرصد ديناميكا الشمس (NASA SDO)',
        en: 'The blazing solar surface and coronal loops captured by NASA’s Solar Dynamics Observatory',
        fr: 'La surface solaire incandescente et les éruptions coronales captées par la NASA (SDO)'
      },
      description: {
        ar: 'مفاعل اندماج نووي هيدروجيني عملاق يشكل 99.86% من كتلة المجموعة الشمسية، ويمد كوكبنا بالنور والطاقة والدفء.',
        en: 'A colossal thermonuclear furnace constituting 99.86% of the solar system’s mass, powering planetary life.',
        fr: 'Fournaise thermonucléaire représentant 99,86 % de la masse du système, source vitale d’énergie et de lumière.'
      },
      scientificDetails: {
        ar: 'تصل حرارة قلب الشمس إلى 15 مليون درجة مئوية، حيث يندمج 600 مليون طن من الهيدروجين في كل ثانية متحولاً إلى هيليوم وطاقة.',
        en: 'Core temperatures reach 15 million °C, fusing 600 million tons of hydrogen every second into helium and radiant energy.',
        fr: 'Son cœur fusionne 600 millions de tonnes d’hydrogène chaque seconde à 15 millions de degrés.'
      },
      quranicContemplation: {
        verse: 'وَجَعَلْنَا سِرَاجًا وَهَّاجًا',
        surah: { ar: 'سورة النبأ', en: 'Surah An-Naba', fr: 'Sourate An-Naba' },
        ayahNumber: 13,
        reflection: {
          ar: 'وصف الشمس بـ (السراج الوهاج) يجمع بين الإضاءة الذاتية (السراج) والحرارة اللافحة المتدفقة (الوهج) وهو جوهر الاندماج النووي.',
          en: 'The Quranic depiction of the Sun as a "blazing radiant lamp" accurately encompasses both self-luminosity and thermal fusion.',
          fr: 'La description coranique d’un « flambeau étincelant » capture la fusion thermique et la lumière auto-générée du Soleil.'
        }
      }
    },
    {
      id: 'solar-system',
      name: { ar: 'المجموعة الشمسية وحزام كايبر', en: 'Solar System & Kuiper Belt', fr: 'Système Solaire & Ceinture de Kuiper' },
      sizeMeters: '1.50 × 10¹³ m',
      orderOfMagnitude: '10¹³ m',
      physicalSize: { ar: '~100 وحدة فلكية (AU) = 15 مليار كم', en: '~100 AU (~15 Billion km)', fr: '~100 UA (~15 milliards de km)' },
      lightTravelTime: { ar: '13.8 ساعة لعبور النطاق الشمسي', en: '13.8 light-hours across domain', fr: '13,8 heures-lumière' },
      relativeToHuman: '8.8 × 10¹² x مقياس الإنسان',
      relativeStep: { ar: '10,700x قطر الشمس', en: '10,700x Sun diameter', fr: '10 700x le diamètre solaire' },
      imageUrl: 'https://images.unsplash.com/photo-1543722530-d2c3201371e7?q=80&w=1600&auto=format&fit=crop',
      imageCaption: {
        ar: 'المنظومة الشمسية بمدارات كواكبها وحزام كايبر المحيط عند أطراف الهيليوسفير',
        en: 'The solar system architecture encompassing planetary orbits and the outer Kuiper belt',
        fr: 'L’architecture du système solaire avec ses orbites planétaires et la ceinture de Kuiper'
      },
      description: {
        ar: 'المنطقة التي تهيمن عليها الرياح الشمسية وحقل الشمس المغناطيسي (الهيليوسفير)، وتحتضن الكواكب الثمانية وملايين الأجرام الثلجية.',
        en: 'The heliospheric realm dominated by solar wind, embracing 8 planets, dwarf worlds, and millions of icy bodies.',
        fr: 'Le domaine héliosphérique englobant les 8 planètes, les mondes nains et les corps glacés de Kuiper.'
      },
      scientificDetails: {
        ar: 'تبعد سفينة فوياجر 1 الآن أكثر من 163 وحدة فلكية (24.4 مليار كم) مخترقة حافة الغلاف الشمسي إلى الفضاء النجمي المفتوح.',
        en: 'Voyager 1 now cruises beyond 163 AU (24.4 billion km), traversing the interstellar threshold.',
        fr: 'Voyager 1 croise désormais à plus de 163 UA (24,4 milliards de km) dans l’espace interstellaire.'
      },
      quranicContemplation: {
        verse: 'كُلٌّ فِي فَلَكٍ يَسْبَحُونَ',
        surah: { ar: 'سورة الأنبياء', en: 'Surah Al-Anbiya', fr: 'Sourate Al-Anbiya' },
        ayahNumber: 33,
        reflection: {
          ar: 'حركة منتظمة مذهلة للكواكب والأقمار تسبح بانسيابية دون تصادم أو اضطراب في فضاء المجموعة الشاسع.',
          en: 'Orbital equilibrium: all celestial bodies gliding smoothly along designated trajectories without chaos.',
          fr: 'L’harmonie orbitale absolue où chaque corps céleste navigue sans heurt dans l’espace.'
        }
      }
    },
    {
      id: 'oort-cloud',
      name: { ar: 'سحابة أورت (أطراف الجاذبية الشمسية)', en: 'The Oort Cloud (Gravitational Edge)', fr: 'Le Nuage d’Oort (Frontière Gravitationnelle)' },
      sizeMeters: '1.50 × 10¹⁶ m',
      orderOfMagnitude: '10¹⁶ m',
      physicalSize: { ar: '~100,000 AU (~1.5 سنة ضوئية)', en: '~100,000 AU (~1.5 Light-Years)', fr: '~100 000 UA (~1,5 année-lumière)' },
      lightTravelTime: { ar: '1.5 سنة ضوئية (15 تريليون كم)', en: '1.5 light-years across envelope', fr: '1,5 année-lumière' },
      relativeToHuman: '8.8 × 10¹⁵ x مقياس الإنسان',
      relativeStep: { ar: '1,000x حجم حزام كايبر والمجموعة الشمسية', en: '1,000x solar system diameter', fr: '1 000x le système solaire intérieur' },
      imageUrl: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=1600&auto=format&fit=crop',
      imageCaption: {
        ar: 'الهالة الكروية الهائلة لسحابة أورت التي تضم تريليونات المذنبات الجليدية المحيطة بمنظومتنا',
        en: 'The immense spherical halo of the Oort cloud harboring trillions of primordial icy comets',
        fr: 'Le vaste halo sphérique du nuage d’Oort abritant des trillions de comètes primitives'
      },
      description: {
        ar: 'فقاعة كروية عملاقة من تريليونات الأجرام الجليدية والمذنبات التي تشكل الحدود القصوى لهيمنة جاذبية شمسنا قبل الفضاء البينجمي.',
        en: 'A colossal spherical shell of icy cometary reservoirs marking the outer gravitational bounds of our solar system.',
        fr: 'Une immense coquille sphérique de comètes marquant la frontière gravitationnelle ultime de notre Soleil.'
      },
      scientificDetails: {
        ar: 'تستغرق المذنبات طويلة الأمد القادمة من سحابة أورت مئات الآلاف من السنين لإكمال مدار واحد حول الشمس.',
        en: 'Long-period comets originating from the Oort Cloud require hundreds of thousands of years for a single solar orbit.',
        fr: 'Les comètes à longue période mettent des centaines de milliers d’années pour boucler une orbite.'
      },
      quranicContemplation: {
        verse: 'فَلَا أُقْسِمُ بِمَا تُبْصِرُونَ * وَمَا لَا تُبْصِرُونَ',
        surah: { ar: 'سورة الحاقة', en: 'Surah Al-Haqqah', fr: 'Sourate Al-Haqqah' },
        ayahNumber: 38,
        reflection: {
          ar: 'عوالم وأجرام شاسعة تمتد في ظلمات الفضاء لا تراها الأعين المجردة، تشهد على سعة ملكوت الله.',
          en: 'A divine oath by all that is seen and the immense unseen cosmic frontiers hidden in deep darkness.',
          fr: 'Le serment solennel par le visible et par les immensités cosmiques invisibles à l’œil nu.'
        }
      }
    },
    {
      id: 'proxima',
      name: { ar: 'الجوار النجمي (بروكسيما وألفا قنطورس)', en: 'Stellar Neighborhood (Alpha Centauri)', fr: 'Voisinage Stellaire (Alpha du Centaure)' },
      sizeMeters: '4.00 × 10¹⁶ m',
      orderOfMagnitude: '10¹⁶ m',
      physicalSize: { ar: '4.246 سنة ضوئية (~40 تريليون كم)', en: '4.246 Light-Years (~40 Trillion km)', fr: '4,246 années-lumière (~40 billions de km)' },
      lightTravelTime: { ar: '4.25 سنة كاملة بسرعة الضوء', en: '4.25 years at light speed', fr: '4,25 ans à la vitesse de la lumière' },
      relativeToHuman: '2.3 × 10¹⁶ x مقياس الإنسان',
      relativeStep: { ar: 'أقرب نظام نجمي للأرض', en: 'Closest star system to our Sun', fr: 'Le système stellaire le plus proche' },
      imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1600&auto=format&fit=crop',
      imageCaption: {
        ar: 'النظام النجمي الثلاثي لألفا قنطورس كما يبدو في سماء النصف الجنوبي للأرض',
        en: 'The brilliant Alpha Centauri triple star system gracing the southern skies',
        fr: 'Le système stellaire triple d’Alpha du Centaure scintillant dans le ciel austral'
      },
      description: {
        ar: 'أقرب نظام نجمي إلينا في مجرة درب التبانة؛ رحلة أسرع مركبة فضائية صنعها البشر حالياً إليه تستغرق أكثر من 70,000 عام!',
        en: 'Our nearest stellar neighbors; at current human spacecraft speeds, a journey there would exceed 70,000 years.',
        fr: 'Nos plus proches voisins stellaires ; nos sondes les plus rapides mettraient plus de 70 000 ans à les atteindre.'
      },
      scientificDetails: {
        ar: 'يضم النظام ثلاثة نجوم: ألفا قنطورس A و B وقزم أحمر يدعى بروكسيما قنطورس يمتلك كوكباً صخرياً (Proxima b) في النطاق الصالح للحياة.',
        en: 'A triple system with Alpha Centauri A & B and red dwarf Proxima Centauri, hosting an Earth-sized planet (Proxima b).',
        fr: 'Système triple abritant l’étoile naine rouge Proxima Centauri et son exoplanète tellurique Proxima b.'
      },
      quranicContemplation: {
        verse: 'فَلَا أُقْسِمُ بِمَوَاقِعِ النُّجُومِ * وَإِنَّهُ لَقَسَمٌ لَّوْ تَعْلَمُونَ عَظِيمٌ',
        surah: { ar: 'سورة الواقعة', en: 'Surah Al-Waqi’ah', fr: 'Sourate Al-Waqi’ah' },
        ayahNumber: 75,
        reflection: {
          ar: 'المسافة الفلكية الشاسعة لأقرب نجم إلينا تجعل قسم القرآن العظيم بمواقع النجوم وأبعادها ذا وقع جليل في العقول.',
          en: 'The immense abyss separating us even from the closest star illuminates the solemn grandeur of the Quranic oath.',
          fr: 'Le gouffre incommensurable nous séparant de la plus proche étoile donne tout son poids au serment divin.'
        }
      }
    },
    {
      id: 'orion-nebula',
      name: { ar: 'سديم الجبار (حاضنة النجوم M42)', en: 'Orion Nebula (M42 Stellar Nursery)', fr: 'La Nébuleuse d’Orion (Pouponnière M42)' },
      sizeMeters: '2.30 × 10¹⁷ m',
      orderOfMagnitude: '10¹⁷ m',
      physicalSize: { ar: '24 سنة ضوئية قطر السديم', en: '24 Light-Years across', fr: '24 années-lumière d’envergure' },
      lightTravelTime: { ar: '24 سنة ضوئية لعبور غيومه', en: '24 years for light to traverse', fr: '24 ans de traversée pour la lumière' },
      relativeToHuman: '1.3 × 10¹⁷ x مقياس الإنسان',
      relativeStep: { ar: 'يبعد عنا 1,344 سنة ضوئية', en: 'Located 1,344 light-years away', fr: 'Situé à 1 344 années-lumière' },
      imageUrl: 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?q=80&w=1600&auto=format&fit=crop',
      imageCaption: {
        ar: 'سديم الجبار بتفاصيله الملونة وأعمدة الغاز التي تولد فيها مئات النجوم الجديدة من مرصد جيمس ويب',
        en: 'The Orion Nebula captured in radiant infrared colors revealing embryonic protostars by JWST',
        fr: 'La nébuleuse d’Orion révélant la genèse stellaire sous l’œil infrarouge du télescope James Webb'
      },
      description: {
        ar: 'أشهر مصنع نجمي كوني مرئي في سماء الليل، حيث تنهار سحب الهيدروجين والغبار تحت وطأة الجاذبية لتلد نجوماً وأنظمة كوكبية جديدة.',
        en: 'The premier stellar nursery in our sky, where vast clouds of hydrogen collapse under gravity to birth new stars.',
        fr: 'La plus célèbre forge stellaire du ciel nocturne, où l’hydrogène s’effondre pour enfanter de nouveaux soleils.'
      },
      scientificDetails: {
        ar: 'يحتوي سديم الجبار على عنقود المعين (Trapezium Cluster) المكون من نجوم شابة هائلة الكتلة تنير سحب الغاز بإشعاعاتها فوق البنفسجية.',
        en: 'Hosts the dense Trapezium cluster of newborn O and B massive stars ionizing the cavity with ultraviolet radiance.',
        fr: 'Abrite l’amas du Trapèze dont le rayonnement ultraviolet intense fait resplendir les draperies de gaz.'
      },
      quranicContemplation: {
        verse: 'يَخْلُقُكُمْ فِي بُطُونِ أُمَّهَاتِكُمْ خَلْقًا مِّن بَعْدِ خَلْقٍ فِي ظُلُمَاتٍ ثَلَاثٍ',
        surah: { ar: 'سورة الزمر', en: 'Surah Az-Zumar', fr: 'Sourate Az-Zumar' },
        ayahNumber: 6,
        reflection: {
          ar: 'كما تتخلق الأجنة في ظلمات الأرحام، تتخلق النجوم والكواكب في أعماق سحب الغبار المظلمة في سنّة إلهية باهرة للخلق والتكوين.',
          en: 'Just as life gestates in protected wombs, stars take shape within dense, shielded cosmic nurseries.',
          fr: 'À l’image de la vie qui se forme dans l’obscurité protectrice, les étoiles s’allument au sein de cocons cosmiques.'
        }
      }
    },
    {
      id: 'milky-way',
      name: { ar: 'مجرة درب التبانة (موطننا المجري)', en: 'Milky Way Galaxy (Our Island Home)', fr: 'La Voie Lactée (Notre Cité Galactique)' },
      sizeMeters: '1.00 × 10²¹ m',
      orderOfMagnitude: '10²¹ m',
      physicalSize: { ar: '100,000 سنة ضوئية (قطر القرص)', en: '100,000 Light-Years diameter', fr: '100 000 années-lumière de diamètre' },
      lightTravelTime: { ar: '100,000 عام لعبور شعاع الضوء', en: '100,000 years across disk', fr: '100 000 ans de traversée pour la lumière' },
      relativeToHuman: '5.8 × 10²⁰ x مقياس الإنسان',
      relativeStep: { ar: 'تضم ما بين 100 إلى 400 مليار نجم', en: 'Harbors 100 to 400 billion stars', fr: 'Abrite 100 à 400 milliards d’étoiles' },
      imageUrl: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=1600&auto=format&fit=crop',
      imageCaption: {
        ar: 'القرص الحلزوني لمجرة درب التبانة مع حزام الغبار المركزي والمليارات من النجوم المتلألئة',
        en: 'The spiral disk of the Milky Way with glowing core and billions of shimmering suns',
        fr: 'Le disque spirale de la Voie Lactée avec son bulbe lumineux et ses myriades d’étoiles'
      },
      description: {
        ar: 'مجرة حلزونية ضلعية عملاقة تضم شمسنا ومئات المليارات من النجوم مع ثقب أسود فائق الكتلة (Sagittarius A*) في مركزها.',
        en: 'A barred spiral galaxy harboring our Sun and hundreds of billions of suns, centered on supermassive Sagittarius A*.',
        fr: 'Une galaxie spirale barrée géante abritant notre Soleil et un trou noir supermassif en son centre.'
      },
      scientificDetails: {
        ar: 'تدور شمسنا حول مركز المجرة بسرعة 828,000 كم/ساعة، مستغرقة نحو 230 مليون سنة لإكمال دورة واحدة تسمى السنة الكونية.',
        en: 'Our solar system orbits the galactic hub at 828,000 km/h, requiring ~230 million years for one cosmic revolution.',
        fr: 'Le Soleil orbite autour du centre galactique à 828 000 km/h, effectuant une année cosmique en 230 millions d’années.'
      },
      quranicContemplation: {
        verse: 'وَالسَّمَاءِ ذَاتِ الْحُبُكِ',
        surah: { ar: 'سورة الذاريات', en: 'Surah Adh-Dhariyat', fr: 'Sourate Adh-Dhariyat' },
        ayahNumber: 7,
        reflection: {
          ar: 'الحُبُك هي الطرائق والمسالك والنسيج المتقن، وهو ما نراه اليوم في أذرع المجرة الحلزونية وشبكات مسارات النجوم الدقيقة.',
          en: 'Al-Hubuk refers to celestial pathways, weaving, and gravitational architecture evident in galactic spiral arms.',
          fr: 'Le terme Al-Hubuk évoque le tissage et les trajectoires harmonieuses des bras spiraux galactiques.'
        }
      }
    },
    {
      id: 'local-group',
      name: { ar: 'المجموعة المجرية المحلية', en: 'The Local Group of Galaxies', fr: 'Le Groupe Local de Galaxies' },
      sizeMeters: '1.00 × 10²³ m',
      orderOfMagnitude: '10²³ m',
      physicalSize: { ar: '10 مليون سنة ضوئية', en: '10 Million Light-Years across', fr: '10 millions d’années-lumière' },
      lightTravelTime: { ar: '10 ملايين عام بسرعة الضوء', en: '10 million years light transit', fr: '10 millions d’années pour la lumière' },
      relativeToHuman: '5.8 × 10²² x مقياس الإنسان',
      relativeStep: { ar: 'تضم مجرتنا + أندروميدا + المثلث + 80 مجرة قزمة', en: 'Milky Way + Andromeda + 80+ dwarf galaxies', fr: 'Voie Lactée + Andromède + 80 galaxies naines' },
      imageUrl: 'https://images.unsplash.com/photo-1543722530-d2c3201371e7?q=80&w=1600&auto=format&fit=crop',
      imageCaption: {
        ar: 'محاكاة ثلاثية الأبعاد لعناقيد المجرات في المجموعة المحلية مترابطة بحبال الجاذبية',
        en: 'Gravitational choreography of galaxies within the Local Group linked by dark matter filaments',
        fr: 'Chorégraphie gravitationnelle des galaxies du Groupe Local reliées par la matière noire'
      },
      description: {
        ar: 'عنقود مجري متماسك جاذبياً يضم مجرتنا درب التبانة ومجرة أندروميدا (المرأة المسلسلة) ومجرة المثلث مع أكثر من 80 مجرة قزمة.',
        en: 'A gravitationally bound cluster comprising the Milky Way, Andromeda (M31), Triangulum, and companion dwarf systems.',
        fr: 'Amas gravitationnel regroupant la Voie Lactée, la galaxie d’Andromède (M31) et plus de 80 galaxies satellites.'
      },
      scientificDetails: {
        ar: 'تقترب مجرة أندروميدا من مجرتنا بسرعة 110 كم/ثانية، ومن المتوقع اندماجهما بعد نحو 4.5 مليار سنة لتكوين مجرة بيضاوية عملاقة (Milkomeda).',
        en: 'Andromeda approaches at 110 km/s, slated for a magnificent gravitational merger in ~4.5 billion years.',
        fr: 'Andromède se rapproche à 110 km/s en vue d’une fusion galactique spectaculaire dans 4,5 milliards d’années.'
      },
      quranicContemplation: {
        verse: 'اللَّهُ الَّذِي خَلَقَ سَبْعَ سَمَاوَاتٍ وَمِنَ الْأَرْضِ مِثْلَهُنَّ يَتَنَزَّلُ الْأَمْرُ بَيْنَهُنَّ',
        surah: { ar: 'سورة الطلاق', en: 'Surah At-Talaq', fr: 'Sourate At-Talaq' },
        ayahNumber: 12,
        reflection: {
          ar: 'تدبير إلهي نافذ ومستمر في كل آفاق السماوات والعوالم المجرية التي لا تنتهي أبعادها.',
          en: 'Divine command continually orchestrating the affairs across cosmic realms of unfathomable expanse.',
          fr: 'L’ordre divin s’exerçant avec constance à travers les myriades de galaxies qui peuplent le cosmos.'
        }
      }
    },
    {
      id: 'laniakea',
      name: { ar: 'حوض المجرات العظيم (لانياكيا)', en: 'Laniakea Supercluster', fr: 'Le Superamas Laniakea' },
      sizeMeters: '5.00 × 10²⁴ m',
      orderOfMagnitude: '10²⁴ m',
      physicalSize: { ar: '520 مليون سنة ضوئية', en: '520 Million Light-Years across', fr: '520 millions d’années-lumière' },
      lightTravelTime: { ar: '520 مليون عام ضوئي', en: '520 million light-years across', fr: '520 millions d’années-lumière' },
      relativeToHuman: '3.0 × 10²⁴ x مقياس الإنسان',
      relativeStep: { ar: 'يضم 100,000 مجرة تتدفق نحو الجاذب العظيم', en: 'Embraces 100,000 galaxies flowing to Great Attractor', fr: 'Englobe 100 000 galaxies vers le Grand Attracteur' },
      imageUrl: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1600&auto=format&fit=crop',
      imageCaption: {
        ar: 'خيوط وأنهار التيارات المجرية في حوض لانياكيا تتدفق كالأوردة الحيوية في شبكة الكون',
        en: 'Galactic flow lines in the Laniakea supercluster resembling cosmic neural or vascular pathways',
        fr: 'Les courants galactiques de Laniakea s’écoulant comme un réseau vital à grande échelle'
      },
      description: {
        ar: 'حوض جاذبي كوني فائق أُطلق عليه اسم "لانياكيا" (السماء اللامتناهية بلغة هاواي)، يضم أكثر من 100,000 مجرة تتدفق نحو مركز يسمى "الجاذب العظيم".',
        en: 'A titanic cosmic basin spanning 100,000 galaxies whose gravitational currents flow toward the Great Attractor.',
        fr: 'Un bassin gravitationnel colossal regroupant 100 000 galaxies convergeant vers le Grand Attracteur.'
      },
      scientificDetails: {
        ar: 'تم رسم خريطته عبر قياس السرعات الشاذة للمجرات (Peculiar Velocities) وإزالة أثر التمدد الكوني، لتظهر كشبكة نسيج كوني عضوي هائل.',
        en: 'Mapped via peculiar galaxy velocities minus cosmic expansion, revealing cosmic webs of dark matter scaffolding.',
        fr: 'Cartographié grâce aux vitesses particulières des galaxies, dévoilant les superstructures de l’univers.'
      },
      quranicContemplation: {
        verse: 'وَالسَّمَاءَ بَنَيْنَاهَا بِأَيْدٍ وَإِنَّا لَمُوسِعُونَ',
        surah: { ar: 'سورة الذاريات', en: 'Surah Adh-Dhariyat', fr: 'Sourate Adh-Dhariyat' },
        ayahNumber: 47,
        reflection: {
          ar: 'عظمة بناء السماء وقوتها الهائلة، مع استمرار تمدد الفضاء الكوني واتساعه الذي تؤكده أحدث قياسات الفيزياء الفلكية.',
          en: 'The divine affirmation of cosmic metric expansion, validated by contemporary cosmological observations.',
          fr: 'La majesté de l’édifice cosmique et l’expansion continue de l’espace confirmée par la cosmologie moderne.'
        }
      }
    },
    {
      id: 'observable-universe',
      name: { ar: 'الكون المنظور (The Observable Universe)', en: 'The Observable Universe', fr: 'L’Univers Observable' },
      sizeMeters: '8.80 × 10²⁶ m',
      orderOfMagnitude: '10²⁶ m',
      physicalSize: { ar: '93 مليار سنة ضوئية (قطر الأفق الكوني)', en: '93 Billion Light-Years diameter', fr: '93 milliards d’années-lumière de diamètre' },
      lightTravelTime: { ar: '93 مليار عام لعبور الأفق المنظور', en: '93 billion years across observable realm', fr: '93 milliards d’années de traversée' },
      relativeToHuman: '5.2 × 10²⁶ x مقياس الإنسان',
      relativeStep: { ar: 'يضم ما يزيد عن 2 تريليون مجرة', en: 'Encompasses 2+ Trillion galaxies', fr: 'Englobe plus de 2 billions de galaxies' },
      imageUrl: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=1600&auto=format&fit=crop',
      imageCaption: {
        ar: 'الشبكة الكونية الكبرى تضم تريليونات المجرات محاطة بإشعاع الخلفية الكونية الميكروية (CMB)',
        en: 'The grand cosmic web embracing trillions of galaxies bounded by the Cosmic Microwave Background',
        fr: 'La grande toile cosmique réunissant des billions de galaxies jusqu’au fond diffus cosmologique'
      },
      description: {
        ar: 'الحد الأقصى لما يمكننا رصده من الضوء الذي وصل إلينا منذ الانفجار العظيم، محاطاً بحجاب إشعاع الخلفية الكونية الميكروية من كل اتجاه.',
        en: 'The spherical boundary of light reachable since the Big Bang, containing at least 2 trillion galaxies and dark matter.',
        fr: 'La sphère ultime de la lumière nous étant parvenue depuis le Big Bang, embrassant 2 billions de galaxies.'
      },
      scientificDetails: {
        ar: 'رغم أن عمر الكون 13.8 مليار سنة، فإن تمدد الفضاء (Metric Expansion) جعل القطر الحقيقي للكون المنظور يبلغ نحو 93 مليار سنة ضوئية (مسافة مسايرة - Comoving Distance).',
        en: 'Though universe age is 13.8 billion years, spatial expansion extends the comoving diameter to ~93 billion light-years.',
        fr: 'Bien que l’univers soit âgé de 13,8 milliards d’années, l’expansion porte son diamètre comobile à 93 milliards d’années-lumière.'
      },
      quranicContemplation: {
        verse: 'لَّخَلْقُ السَّمَاوَاتِ وَالْأَرْضِ أَكْبَرُ مِنْ خَلْقِ النَّاسِ وَلَٰكِنَّ أَكْثَرَ النَّاسِ لَا يَعْلَمُونَ',
        surah: { ar: 'سورة غافر', en: 'Surah Ghafir', fr: 'Sourate Ghafir' },
        ayahNumber: 57,
        reflection: {
          ar: 'حين يقف العقل أمام هذا الاتساع المهيب (2 تريليون مجرة)، يدرك الإنسان تواضع حجمه وضآلته، وتتجلى عظمة الخالق المطلقة.',
          en: 'Standing before the staggering scale of 2 trillion galaxies, the human intellect comprehends its humble station before the Creator.',
          fr: 'Face à cette immensité vertigineuse de 2 billions de galaxies, l’être humain prend la mesure de son humilité devant le Créateur.'
        }
      }
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(2); // Start on Earth
  const [isPlayingTour, setIsPlayingTour] = useState(false);
  const [isEnlargedModalOpen, setIsEnlargedModalOpen] = useState(false);
  const [zoomFactor, setZoomFactor] = useState(1);

  const currentStep = scaleSteps[currentIndex];

  // Automatic Virtual Journey Tour Timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlayingTour) {
      timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % scaleSteps.length);
      }, 4500);
    }
    return () => clearInterval(timer);
  }, [isPlayingTour, scaleSteps.length]);

  // Keyboard Escape listener for enlarged image modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsEnlargedModalOpen(false);
      }
    };
    if (isEnlargedModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isEnlargedModalOpen]);

  const texts = {
    ar: {
      sectionBadge: 'الرحلات الافتراضية ومقاييس الكون الكبرى',
      title: 'مستكشف مقاييس الكون والرحلة الافتراضية',
      subtitle: 'رحلة تفاعلية بصرية فائقة الدقة تنتقل بك عبر 26 رتبة مقدار: من مقياس الإنسان إلى أطراف الكون المنظور (93 مليار سنة ضوئية).',
      orderLabel: 'رتبة المقدار:',
      physicalSizeLabel: 'القطر الحقيقي:',
      lightTransitLabel: 'زمن عبور الضوء:',
      relativeHumanLabel: 'المضاعف مقارنة بالإنسان:',
      stepComparisonLabel: 'المقارنة مع المرحلة السابقة:',
      startTourBtn: 'بدء الرحلة الافتراضية التلقائية',
      pauseTourBtn: 'إيقاف الرحلة مؤقتاً',
      enlargeImageBtn: 'تكبير الصورة بدقة فائقة (Full Size)',
      prevStep: 'المقياس الأصغر',
      nextStep: 'المقياس الأكبر',
      scientificDeepDive: 'الحقائق والبيانات الفيزيائية:',
      quranReflectionHeader: 'التأمل القرآني في عظمة المقياس:',
      modalTitle: 'عرض الصورة الكونية بالحجم المكبر الكامل',
      close: 'إغلاق',
      resetZoom: 'إعادة ضبط التكبير',
      zoomIn: 'تكبير',
      zoomOut: 'تصغير',
    },
    en: {
      sectionBadge: 'Virtual Cosmic Journeys & Orders of Magnitude',
      title: 'Cosmic Scale Explorer & Virtual Journey',
      subtitle: 'An ultra-high-definition visual voyage across 26 orders of magnitude: from the human observer to the cosmic horizon (93 billion light-years).',
      orderLabel: 'Order of Magnitude:',
      physicalSizeLabel: 'Actual Physical Size:',
      lightTransitLabel: 'Light Transit Time:',
      relativeHumanLabel: 'Scale Factor vs Human:',
      stepComparisonLabel: 'Comparative Step Scale:',
      startTourBtn: 'Launch Automated Virtual Flight',
      pauseTourBtn: 'Pause Virtual Flight',
      enlargeImageBtn: 'Enlarge High-Definition Image (Full Size)',
      prevStep: 'Smaller Scale',
      nextStep: 'Larger Scale',
      scientificDeepDive: 'Astrophysical Facts & Numbers:',
      quranReflectionHeader: 'Quranic Contemplation on Cosmic Scale:',
      modalTitle: 'Full-Resolution Enlarged Cosmic Viewer',
      close: 'Close',
      resetZoom: 'Reset Zoom',
      zoomIn: 'Zoom In',
      zoomOut: 'Zoom Out',
    },
    fr: {
      sectionBadge: 'Voyages Virtuels & Ordres de Grandeur Cosmiques',
      title: 'Explorateur d’Échelles Cosmiques & Vol Virtuel',
      subtitle: 'Un voyage visuel en haute définition à travers 26 ordres de grandeur : de l’observateur humain aux confins de l’univers observable (93 milliards d’années-lumière).',
      orderLabel: 'Ordre de grandeur :',
      physicalSizeLabel: 'Taille physique réelle :',
      lightTransitLabel: 'Temps de transit de la lumière :',
      relativeHumanLabel: 'Facteur d’échelle vs humain :',
      stepComparisonLabel: 'Échelle comparative :',
      startTourBtn: 'Lancer le Vol Virtuel Automatique',
      pauseTourBtn: 'Mettre en Pause le Vol',
      enlargeImageBtn: 'Agrandir l’image en haute définition (Plein format)',
      prevStep: 'Échelle inférieure',
      nextStep: 'Échelle supérieure',
      scientificDeepDive: 'Données astrophysiques & Réalité physique :',
      quranReflectionHeader: 'Méditation coranique sur l’immensité :',
      modalTitle: 'Visualiseur Cosmique Plein Format Agrandie',
      close: 'Fermer',
      resetZoom: 'Réinitialiser le zoom',
      zoomIn: 'Zoom avant',
      zoomOut: 'Zoom arrière',
    }
  };

  const ui = texts[language] || texts.en;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Container Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#060b1e] via-[#081232] to-[#040817] border border-cyan-800/40 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-cyan-950/80">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-xs font-bold text-cyan-300">
              <Compass className="w-3.5 h-3.5 text-cyan-400" />
              <span>{ui.sectionBadge}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              {ui.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {ui.subtitle}
            </p>
          </div>

          {/* Virtual Flight Tour Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPlayingTour(!isPlayingTour)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs transition-all shadow-lg ${
                isPlayingTour
                  ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/25 animate-pulse'
                  : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-cyan-500/25'
              }`}
            >
              {isPlayingTour ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isPlayingTour ? ui.pauseTourBtn : ui.startTourBtn}</span>
            </button>
          </div>
        </div>

        {/* Order-of-Magnitude Interactive Range Slider */}
        <div className="mt-6 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 px-1">
            <span className="text-cyan-400">10⁰ m (الإنسان)</span>
            <span className="text-amber-300 font-mono text-sm font-black">
              {currentStep.orderOfMagnitude} ({currentStep.name[language] || currentStep.name.ar})
            </span>
            <span className="text-purple-400">10²⁶ m (الكون المنظور)</span>
          </div>
          <input
            type="range"
            min={0}
            max={scaleSteps.length - 1}
            value={currentIndex}
            onChange={(e) => {
              setIsPlayingTour(false);
              setCurrentIndex(parseInt(e.target.value, 10));
            }}
            className="w-full accent-cyan-400 h-2.5 bg-slate-800 rounded-lg cursor-pointer"
            aria-label="Cosmic scale order of magnitude slider"
          />
        </div>

        {/* Stage Selector Pills Strip */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-3 max-w-full">
          {scaleSteps.map((step, idx) => (
            <button
              key={step.id}
              onClick={() => {
                setIsPlayingTour(false);
                setCurrentIndex(idx);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border shrink-0 ${
                currentIndex === idx
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-black shadow-md shadow-cyan-500/25 scale-105'
                  : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span className="font-mono text-[10px] me-1 opacity-80">{step.orderOfMagnitude}</span>
              <span>{step.name[language]?.split(' ')[0] || step.name.ar.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* ENLARGED VISUAL SHOWCASE & DETAILED METRICS DISPLAY */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Enlarged High-Resolution Visual Stage (7 cols) */}
        <div className="lg:col-span-7 flex flex-col space-y-4">
          <div className="group relative rounded-3xl overflow-hidden border border-cyan-800/40 bg-slate-950 shadow-2xl">
            {/* Main High-Resolution Image Container */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
              <img
                src={currentStep.imageUrl}
                alt={currentStep.name[language] || currentStep.name.ar}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/30 pointer-events-none" />

              {/* Order of magnitude watermark */}
              <div className="absolute top-4 start-4 px-3 py-1.5 rounded-2xl bg-black/75 backdrop-blur-md border border-cyan-500/40 text-cyan-300 font-mono font-black text-sm shadow-xl">
                {currentStep.orderOfMagnitude}
              </div>

              {/* Enlarge Image Button Overlay */}
              <button
                onClick={() => {
                  setZoomFactor(1);
                  setIsEnlargedModalOpen(true);
                }}
                className="absolute top-4 end-4 flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-slate-900/85 hover:bg-slate-800/95 text-white font-bold text-xs backdrop-blur-md border border-slate-700/80 shadow-xl transition-all hover:scale-105 active:scale-95"
              >
                <Maximize2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>{ui.enlargeImageBtn}</span>
              </button>

              {/* Bottom Image Caption Bar */}
              <div className="absolute bottom-4 inset-x-4 p-3 rounded-2xl bg-slate-950/80 backdrop-blur-md border border-slate-800/80 text-xs text-slate-200">
                <span className="text-cyan-400 font-semibold block mb-0.5">
                  📸 {currentStep.name[language] || currentStep.name.ar}:
                </span>
                <span>{currentStep.imageCaption[language] || currentStep.imageCaption.ar}</span>
              </div>
            </div>

            {/* Stepper Navigation Footbar */}
            <div className="p-4 bg-slate-950 flex items-center justify-between border-t border-slate-800/80">
              <button
                onClick={() => {
                  setIsPlayingTour(false);
                  setCurrentIndex((prev) => (prev > 0 ? prev - 1 : scaleSteps.length - 1));
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-bold text-slate-300 hover:text-white transition-colors border border-slate-800"
              >
                <ArrowRight className="w-3.5 h-3.5" />
                <span>{ui.prevStep}</span>
              </button>

              <div className="text-xs font-bold text-slate-400">
                {currentIndex + 1} / {scaleSteps.length}
              </div>

              <button
                onClick={() => {
                  setIsPlayingTour(false);
                  setCurrentIndex((prev) => (prev < scaleSteps.length - 1 ? prev + 1 : 0));
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-xs font-bold text-slate-950 transition-colors shadow-md shadow-cyan-500/20"
              >
                <span>{ui.nextStep}</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Accurate Scientific Telemetry & Quranic Contemplation (5 cols) */}
        <div className="lg:col-span-5 flex flex-col space-y-5">
          
          {/* 1. Header Title & Main Description */}
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-3">
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider">
              <Scale className="w-4 h-4 text-cyan-400" />
              <span>{ui.orderLabel} {currentStep.orderOfMagnitude}</span>
            </div>
            <h3 className="text-2xl font-black text-white">
              {currentStep.name[language] || currentStep.name.ar}
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              {currentStep.description[language] || currentStep.description.ar}
            </p>
          </div>

          {/* 2. Scientific Telemetry Metrics Grid */}
          <div className="p-5 rounded-3xl bg-slate-950/70 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider pb-2 border-b border-slate-800">
              <Info className="w-4 h-4 text-amber-400" />
              <span>{ui.scientificDeepDive}</span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800">
                <span className="text-slate-400 block mb-1">{ui.physicalSizeLabel}</span>
                <span className="font-bold text-white text-sm font-mono">
                  {currentStep.physicalSize[language] || currentStep.physicalSize.ar}
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800">
                <span className="text-slate-400 block mb-1">{ui.lightTransitLabel}</span>
                <span className="font-bold text-cyan-300 text-sm font-mono">
                  {currentStep.lightTravelTime[language] || currentStep.lightTravelTime.ar}
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 col-span-2">
                <span className="text-slate-400 block mb-1">{ui.relativeHumanLabel}</span>
                <span className="font-bold text-amber-300 text-sm font-mono">
                  {currentStep.relativeToHuman}
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 col-span-2">
                <span className="text-slate-400 block mb-1">{ui.stepComparisonLabel}</span>
                <span className="font-medium text-slate-200 text-xs">
                  {currentStep.relativeStep[language] || currentStep.relativeStep.ar}
                </span>
              </div>
            </div>

            {/* Scientific Explanation */}
            <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/50 p-3.5 rounded-2xl border border-slate-800">
              {currentStep.scientificDetails[language] || currentStep.scientificDetails.ar}
            </p>
          </div>

          {/* 3. Noble Quranic Reflection Card */}
          {currentStep.quranicContemplation && (
            <div className="p-5 rounded-3xl bg-gradient-to-br from-emerald-950/40 via-slate-900/80 to-slate-950/90 border border-emerald-600/30 shadow-xl space-y-3">
              <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs uppercase tracking-wider">
                <BookOpen className="w-4 h-4 text-emerald-400" />
                <span>{ui.quranReflectionHeader}</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/70 border border-emerald-800/40 text-center">
                <p className="font-serif text-lg text-emerald-200 leading-loose">
                  ﴿ {currentStep.quranicContemplation.verse} ﴾
                </p>
                <div className="mt-2 text-xs font-semibold text-emerald-400">
                  {currentStep.quranicContemplation.surah[language] || currentStep.quranicContemplation.surah.ar} - {language === 'ar' ? 'الآية' : 'Ayah'} {currentStep.quranicContemplation.ayahNumber}
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/50 p-3 rounded-2xl border border-slate-800">
                {currentStep.quranicContemplation.reflection[language] || currentStep.quranicContemplation.reflection.ar}
              </p>
            </div>
          )}

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. FULL-SCREEN ENLARGED IMAGE MODAL (تكبير حجم الصورة) */}
      {/* ========================================================================= */}
      {isEnlargedModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/95 backdrop-blur-xl animate-fadeIn"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsEnlargedModalOpen(false);
          }}
        >
          <div className="relative w-full max-w-6xl max-h-[95vh] flex flex-col bg-slate-900 border border-cyan-500/40 rounded-3xl shadow-2xl overflow-hidden text-white">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 sm:p-5 bg-slate-950 border-b border-cyan-900/40">
              <div className="flex items-center gap-3">
                <div className="px-3 py-1 rounded-xl bg-cyan-950 text-cyan-300 font-mono font-bold text-xs border border-cyan-500/40">
                  {currentStep.orderOfMagnitude}
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    {currentStep.name[language] || currentStep.name.ar}
                  </h3>
                  <p className="text-xs text-slate-400">{ui.modalTitle}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Zoom Controls */}
                <button
                  onClick={() => setZoomFactor((z) => Math.min(z + 0.25, 2.5))}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                  aria-label={ui.zoomIn}
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setZoomFactor((z) => Math.max(z - 0.25, 0.75))}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                  aria-label={ui.zoomOut}
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setZoomFactor(1)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                  aria-label={ui.resetZoom}
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsEnlargedModalOpen(false)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700 ms-2"
                  aria-label={ui.close}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Enlarged Image Canvas Viewport */}
            <div className="flex-1 overflow-auto p-4 sm:p-8 flex items-center justify-center bg-black/90 min-h-[420px]">
              <div
                className="transition-transform duration-200 max-w-full"
                style={{ transform: `scale(${zoomFactor})` }}
              >
                <img
                  src={currentStep.imageUrl}
                  alt={currentStep.name[language] || currentStep.name.ar}
                  className="max-h-[72vh] max-w-full rounded-2xl shadow-2xl object-contain mx-auto"
                />
              </div>
            </div>

            {/* Modal Bottom Caption */}
            <div className="p-4 bg-slate-950 border-t border-cyan-900/40 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
              <span className="text-white font-medium">
                {currentStep.imageCaption[language] || currentStep.imageCaption.ar}
              </span>
              <span className="text-cyan-400 font-mono font-bold">
                {currentStep.physicalSize[language] || currentStep.physicalSize.ar} ({currentStep.orderOfMagnitude})
              </span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
