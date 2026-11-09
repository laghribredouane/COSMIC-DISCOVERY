import {
  ScientificArticle,
  QuranVerseStudy,
  CelestialBody,
  SpaceGalleryItem,
  QuizQuestion,
  SiteStatistics,
  Constellation,
  SpaceMissionFeed,
  CelestialEvent
} from '../types/cosmic';

export const initialArticles: ScientificArticle[] = [
  {
    id: 'galaxies-milky-way',
    title: {
      ar: 'مجرة درب التبانة: موطننا الكوني بين تريليونات النجوم',
      en: 'The Milky Way: Our Cosmic Home Among Billions of Stars',
      fr: 'La Voie Lactée : Notre Foyer Cosmique Parmi des Milliards d’Étoiles'
    },
    category: 'galaxies',
    summary: {
      ar: 'مجرة حلزونية ضلعية عملاقة يبلغ قطرها نحو 100,000 سنة ضوئية، تضم ما بين 100 إلى 400 مليار نجم، بما فيها شمسنا.',
      en: 'A barred spiral galaxy spanning ~100,000 light-years in diameter, harboring 100 to 400 billion stars, including our Sun.',
      fr: 'Une galaxie spirale barrée d’environ 100 000 années-lumière de diamètre, abritant 100 à 400 milliards d’étoiles, dont notre Soleil.'
    },
    introduction: {
      ar: 'تعد مجرة درب التبانة واحدة من مليارات المجرات في الكون المنظور. تدور منظومتنا الشمسية حول مركزها الفائق بسرعة تقارب 828,000 كم/ساعة، مستغرقة نحو 230 مليون سنة لإكمال دورة واحدة (السنة الكونية).',
      en: 'The Milky Way is one of billions of galaxies in the observable universe. Our solar system orbits its supermassive core at roughly 828,000 km/h, requiring about 230 million Earth years to complete one cosmic revolution.',
      fr: 'La Voie Lactée est l’une des milliards de galaxies de l’univers observable. Notre système solaire gravite autour de son centre supermassif à environ 828 000 km/h, effectuant un tour complet en 230 millions d’années.'
    },
    contentSimple: {
      ar: 'تخيل جزيرة كونية عملاقة من النجوم والغبار الكوني تدور برفق في الفضاء! شمسنا هي مجرد نجمة واحدة من بين مئات المليارات من النجوم التي تشكل هذه الدوامة البديعة. في قلبها ثقب أسود هائل يسمى الرامي أ* (Sagittarius A*)، يمسك بكتلته الجاذبية أطراف المجرة.',
      en: 'Imagine a gigantic cosmic island of swirling stars and dust. Our Sun is just one single grain among hundreds of billions of suns within this majestic spiral disk. In its center rests Sagittarius A*, a supermassive black hole holding the gravitational choreography together.',
      fr: 'Imaginez une île cosmique colossale d’étoiles et de poussières tournoyant dans l’espace. Notre Soleil n’est qu’une étoile parmi des centaines de milliards au sein de ce disque spirale, au centre duquel trône Sagittarius A*.'
    },
    contentAdvanced: {
      ar: 'من الناحية المورفولوجية، تصنف درب التبانة كمجرة حلزونية ضلعية من النوع SBbc حسب تسلسل هابل. يتكون هيكلها من قرص رقيق، وقرص سميك، وانتفاخ مركزي، وهالة كروية من المادة المظلمة تمتد لمسافات شاسعة تفوق القرص البصري. أثبتت قياسات تلسكوب غايا (Gaia) الفضائي التابع لـ ESA أن كتلة المجرة الكلية تعادل نحو 1.5 تريليون كتلة شمسية، معظمهما مادة مظلمة غير بارونية.',
      en: 'Morphologically classified as an SBbc barred spiral galaxy under Hubble classification. Its architecture comprises a thin disk, thick disk, central bulge, and an extended dark matter halo. Astrometric measurements from ESA’s Gaia observatory indicate a total gravitational mass of approximately 1.5 trillion solar masses, predominantly non-baryonic dark matter.',
      fr: 'Morphologiquement classée comme galaxie spirale barrée SBbc. Sa structure se compose d’un disque mince, d’un disque épais, d’un bulbe central et d’un halo étendu de matière noire. Les données du télescope spatial Gaia de l’ESA estiment sa masse totale à environ 1,5 billion de masses solaires.'
    },
    keyFacts: {
      ar: [
        'القطر: نحو 100,000 إلى 120,000 سنة ضوئية',
        'عدد النجوم: من 100 إلى 400 مليار نجم',
        'السرعة المدارية للشمس: 230 كم/ثانية',
        'الثقب الأسود المركزي: الرامي أ* بكتلة 4.15 مليون شمس'
      ],
      en: [
        'Diameter: ~100,000 to 120,000 light-years',
        'Star Population: 100 to 400 billion stars',
        'Sun Orbital Speed: ~230 km/s',
        'Central Black Hole: Sagittarius A* (~4.15 million solar masses)'
      ],
      fr: [
        'Diamètre : ~100 000 à 120 000 années-lumière',
        'Population stellaire : 100 à 400 milliards d’étoiles',
        'Vitesse orbitale du Soleil : ~230 km/s',
        'Trou noir central : Sagittarius A* (~4,15 millions de masses solaires)'
      ]
    },
    specs: {
      diameter: '105,700 ly',
      mass: '1.5 × 10¹² M☉',
      speed: '828,000 km/h (orbit)',
      age: '13.61 billion years',
      composition: 'Hydrogen, Helium, Stellar dust, Dark Matter',
      discoveryYear: 'Ancient antiquity / Telescopic resolution by Galileo 1610'
    },
    image: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=1600&auto=format&fit=crop',
    imageCaption: {
      ar: 'ذراع قنطورس في مجرة درب التبانة كما يبدو في سماء ليلية نقية',
      en: 'Centaurus arm of the Milky Way captured in crystal clear night skies',
      fr: 'Bras du Centaure de la Voie Lactée dans un ciel nocturne préservé'
    },
    imageCredit: 'NASA / ESA / ESO Astronomy Archive',
    sources: [
      { title: 'NASA Astrophysics Data System (ADS)', url: 'https://adsabs.harvard.edu' },
      { title: 'ESA Gaia Mission Database', url: 'https://www.cosmos.esa.int/web/gaia' },
      { title: 'Encyclopaedia Britannica - Milky Way Galaxy' }
    ],
    relatedQuranVerseId: 'verse-orbits-33',
    lastUpdated: '2026-03-12',
    isApproved: true,
    readingTimeMin: 6,
    views: 3420,
    likes: 289
  },
  {
    id: 'black-holes-ton618',
    title: {
      ar: 'الثقوب السوداء وأعظم عمالقة الكون: TON 618',
      en: 'Black Holes & The Greatest Titan of the Cosmos: TON 618',
      fr: 'Trous Noirs et le Plus Grand Titan du Cosmos : TON 618'
    },
    category: 'black-holes',
    summary: {
      ar: 'أكبر ثقب أسود فائق الكتلة تم رصده في الكون، بكتلة مذهلة تعادل 66 مليار ضعف كتلة شمسنا، وقطر يفوق المجموعة الشمسية بأكملها مرات عديدة.',
      en: 'The largest supermassive black hole discovered, boasting a staggering mass of 66 billion times that of our Sun, dwarfing our entire solar system.',
      fr: 'Le plus massif des trous noirs supermassifs jamais observés, avec une masse vertigineuse de 66 milliards de masses solaires.'
    },
    introduction: {
      ar: 'تمثل الثقوب السوداء الحدود القصوى للفيزياء الفلكية، حيث تنهار المادة تحت وطأة جاذبيتها الذاتية إلى نقطة تفرّد ذات كثافة لامتناهية يُحجب داخلها الزمكان بأفق الحدث الذي لا يمكن حتى للضوء الهروب منه.',
      en: 'Black holes represent the ultimate frontier of astrophysics, where matter collapses beneath its own gravitational pull into a spacetime singularity shrouded by an event horizon from which not even light can escape.',
      fr: 'Les trous noirs représentent la frontière ultime de l’astrophysique, où la matière s’effondre sous sa propre gravité en une singularité ceinte d’un horizon des événements d’où même la lumière ne peut s’échapper.'
    },
    contentSimple: {
      ar: 'تخيل بالوعة فضاء جاذبيتها قوية لدرجة أن سرعة الهروب منها تفوق سرعة الضوء! ثقب TON 618 يبتلع كميات هائلة من الغاز، وينتج قرص التدفق المحيط به طاقة تعادل ضوء 140 تريليون شمس مجتمعة!',
      en: 'Picture a cosmic drain where gravity is so supreme that escape velocity exceeds light itself. TON 618 feeds upon enormous gas reservoirs, its accretion disk blazing with the radiance of 140 trillion suns combined!',
      fr: 'Imaginez un abîme gravitationnel si puissant que la vitesse de libération dépasse celle de la lumière ! Le disque d’accrétion de TON 618 brille avec l’éclat de 140 billions de soleils réunis.'
    },
    contentAdvanced: {
      ar: 'يقع نجم زائف (Quasar) TON 618 على بعد 18.2 مليار سنة ضوئية (مسافة مسايرة). تم قياس كتلته عبر تحليل خط انبعاث الهيدروجين H-beta في طيف القرص الحركي. يبلغ نصف قطر شوارزشيلد (نصف قطر أفق الحدث) له نحو 1,300 وحدة فلكية (AU)، أي حوالي 390 مليار كيلومتر، مما يعني أن الضوء يستغرق عدة أسابيع فقط لعبور أفق حدثه!',
      en: 'The quasar TON 618 lies at a comoving distance of roughly 18.2 billion light-years. Its mass was derived via broad-line region reverberation mapping using the H-beta Doppler width. Its Schwarzschild radius measures ~1,300 AU (~390 billion km), requiring light weeks just to transit its horizon.',
      fr: 'Le quasar TON 618 se situe à 18,2 milliards d’années-lumière. Son rayon de Schwarzschild mesure environ 1 300 UA (~390 milliards de km). La lumière met plusieurs semaines rien que pour traverser son horizon des événements.'
    },
    keyFacts: {
      ar: [
        'الكتلة: 66 مليار كتلة شمسية (6.6 × 10¹⁰ M☉)',
        'قطر أفق الحدث: نحو 390 مليار كم (1300 AU)',
        'اللمعان: يعادل 140 تريليون ضعف لمعان الشمس',
        'المسافة: 10.8 مليار سنة ضوئية (زمن وصول الضوء)'
      ],
      en: [
        'Mass: 66 Billion Solar Masses (6.6 × 10¹⁰ M☉)',
        'Event Horizon Diameter: ~390 billion km (1,300 AU)',
        'Luminosity: 140 Trillion times our Sun',
        'Lookback Time: 10.8 billion light-years'
      ],
      fr: [
        'Masse : 66 milliards de masses solaires',
        'Diamètre de l’horizon : ~390 milliards de km (1 300 UA)',
        'Luminosité : 140 billions de fois celle du Soleil',
        'Temps de trajet de la lumière : 10,8 milliards d’années-lumière'
      ]
    },
    specs: {
      diameter: '390 billion km (Schwarzschild)',
      mass: '6.6 × 10¹⁰ M☉',
      temperature: '10⁷ K (Accretion disk)',
      distance: '10.8 Gly (Light travel time)',
      discoveryYear: '1957 (Tonantzintla survey)'
    },
    image: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1600&auto=format&fit=crop',
    imageCaption: {
      ar: 'محاكاة لقرص الانجذاب حول ثقب أسود فائق يحني الزمكان والضوء',
      en: 'Simulation of supermassive accretion disk warping spacetime and light paths',
      fr: 'Simulation du disque d’accrétion d’un trou noir déformant l’espace-temps'
    },
    imageCredit: 'NASA Goddard Space Flight Center / EHT Collaboration',
    sources: [
      { title: 'Event Horizon Telescope (EHT) Publications', url: 'https://eventhorizontelescope.org' },
      { title: 'Astrophysical Journal: Reverberation Mapping of High-z Quasars' },
      { title: 'NASA Chandra X-Ray Observatory' }
    ],
    relatedQuranVerseId: 'verse-tariq-1',
    lastUpdated: '2026-02-18',
    isApproved: true,
    readingTimeMin: 7,
    views: 4120,
    likes: 388
  },
  {
    id: 'cosmology-big-bang-expansion',
    title: {
      ar: 'نشأة الكون: الانفجار العظيم وتمدد الزمكان المستمر',
      en: 'Origin of the Universe: The Big Bang & Ongoing Cosmic Expansion',
      fr: 'Origine de l’Univers : Le Big Bang et l’Expansion Cosmique Continue'
    },
    category: 'cosmology-origin',
    summary: {
      ar: 'بدأ الكون منذ 13.787 مليار سنة من حالة فائقة الكثافة والحرارة، وما زال يتمدد حتى لحظتنا هذه بسرعة متسارعة تدفعها الطاقة المظلمة.',
      en: 'The universe began 13.787 billion years ago from an ultra-dense, ultra-hot initial state, and continues to expand at an accelerating pace driven by dark energy.',
      fr: 'L’univers a débuté il y a 13,787 milliards d’années à partir d’un état initial de densité et de température extrêmes, en expansion accélérée permanente.'
    },
    introduction: {
      ar: 'يعد النموذج القياسي لعلم الكونيات (Lambda-CDM) أعظم إنجاز فكري في فهم التاريخ الكوني. بفضل رصد إشعاع الخلفية الكونية الميكروي (CMB) بواسطة مسباري WMAP وPlanck، استطاع العلماء تحديد عمر الكون بدقة 1%.',
      en: 'The Lambda-CDM concordance model is astrophysics’ triumphant framework for cosmic history. Through measurements of the Cosmic Microwave Background (CMB) by WMAP and Planck, astronomers have pinned the universe’s age to within 1% precision.',
      fr: 'Le modèle cosmologique standard (Lambda-CDM) décrit l’histoire cosmique avec une précision remarquable grâce aux mesures du fond diffus cosmologique (CMB) par Planck.'
    },
    contentSimple: {
      ar: 'لم يكن الانفجار العظيم انفجاراً للمادة داخل مساحة فارغة، بل كان تمدداً وتوسعاً لنفس نسيج الفضاء والزمان! مثل بالون يُنفخ فتتباعد النقاط المرسومة على سطحه، كذلك تتباعد المجرات عن بعضها البعض دون وجود مركز محدد لهذا التوسع.',
      en: 'The Big Bang was not an explosion of matter into pre-existing empty space; rather, it was the rapid expansion of space and time itself! Like marks on a balloon moving apart as it inflates, distant galaxies recede from each other with no singular geographic center.',
      fr: 'Le Big Bang n’était pas une explosion de matière dans un espace vide préexistant, mais l’expansion du tissu même de l’espace et du temps. Tels des points sur un ballon qui gonfle, les galaxies s’éloignent les unes des autres.'
    },
    contentAdvanced: {
      ar: 'تقود معادلات فريدمان المشتقة من النسبية العامة لأينشتاين ديناميكا التمدد الكوني. يتكون المحتوى الطاقي الكلي للكون حالياً من: 68.3% طاقة مظلمة، و26.8% مادة مظلمة باردة، و4.9% فقط مادة باريونية عادية (التي تشكل كل النجوم والكواكب والذرات). ثابت هابل المقاس حالياً يبلغ نحو 67.4 إلى 73 كم/ثانية لكل ميغافرسخ.',
      en: 'The Friedmann equations derived from Einstein’s General Relativity govern this cosmic trajectory. Today’s universal energy budget comprises: 68.3% Dark Energy, 26.8% Cold Dark Matter, and only 4.9% Baryonic Matter (all atoms, stars, and planets). The Hubble parameter remains calibrated between 67.4 and 73 km/s/Mpc.',
      fr: 'Les équations de Friedmann dictent la dynamique d’expansion. La composition énergétique de l’univers actuel compte 68,3 % d’énergie sombre, 26,8 % de matière noire froide et 4,9 % de matière baryonique ordinaire.'
    },
    keyFacts: {
      ar: [
        'عمر الكون: 13.787 ± 0.020 مليار سنة',
        'حرارة إشعاع الخلفية الكونية: 2.7255 كلفن (-270.42 مئوية)',
        'نسبة المادة العادية في الكون: 4.9% فقط',
        'معدل التمدد: يتسارع بفعل الطاقة المظلمة'
      ],
      en: [
        'Age of the Universe: 13.787 ± 0.020 Billion Years',
        'CMB Temperature: 2.7255 Kelvin (-270.42 °C)',
        'Baryonic (Ordinary) Matter: Only 4.9%',
        'Expansion Status: Accelerating via Dark Energy'
      ],
      fr: [
        'Âge de l’univers : 13,787 ± 0,020 milliards d’années',
        'Température du CMB : 2,7255 Kelvin (-270,42 °C)',
        'Matière baryonique (visible) : 4,9 % seulement',
        'Statut : Expansion accélérée'
      ]
    },
    specs: {
      age: '13.787 billion years',
      temperature: '2.725 K (Cosmic Microwave Background)',
      composition: '68.3% Dark Energy, 26.8% Dark Matter, 4.9% Baryonic',
      discoveryYear: '1964 (Penzias & Wilson CMB discovery)'
    },
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600&auto=format&fit=crop',
    imageCaption: {
      ar: 'الخريطة الكونية ثلاثية الأبعاد للشبكة المجرية وتوزيع المادة في الفضاء',
      en: '3D cosmological map of the cosmic web and large-scale structural distribution',
      fr: 'Cartographie cosmique de la toile cosmique et des grands filaments de matière'
    },
    imageCredit: 'ESA Planck Collaboration / NASA WMAP Science Team',
    sources: [
      { title: 'Planck 2018 Results: Cosmological Parameters (A&A)', url: 'https://www.cosmos.esa.int/web/planck' },
      { title: 'NASA Wilkinson Microwave Anisotropy Probe (WMAP)' },
      { title: 'Stephen Hawking: A Brief History of Time' }
    ],
    relatedQuranVerseId: 'verse-expanding-47',
    lastUpdated: '2026-03-01',
    isApproved: true,
    readingTimeMin: 8,
    views: 5210,
    likes: 476
  },
  {
    id: 'solar-system-overview',
    title: {
      ar: 'المجموعة الشمسية: إتقان المدارات وحصون الحياة',
      en: 'The Solar System: Orbital Precision & Sanctuaries of Life',
      fr: 'Le Système Solaire : Précision Orbitale et Berceau de la Vie'
    },
    category: 'solar-system',
    summary: {
      ar: 'نظام كوكبي محكم تدور فيه 8 كواكب رئيسية وأكثر من 200 قمر وملايين الكويكبات والمذنبات حول نجم قزم أصفر متوسط الحجم يسمى الشمس.',
      en: 'A finely tuned planetary system of 8 major planets, over 200 moons, and millions of asteroids orbiting our G-type yellow dwarf star: the Sun.',
      fr: 'Un système planétaire équilibré composé de 8 planètes majeures, plus de 200 lunes et des millions d’astéroïdes autour du Soleil.'
    },
    introduction: {
      ar: 'تشكلت المجموعة الشمسية قبل نحو 4.6 مليار سنة من انهيار سحابة جزيئية عملاقة من الغاز والغبار. تتوزع الكواكب إلى مجموعتين: الكواكب الصخرية الداخلية (عطارد، الزهرة، الأرض، المريخ)، والكواكب الغازية والجليدية العملاقة الخارجية (المشتري، زحل، أورانوس، نبتون).',
      en: 'Formed 4.6 billion years ago from the gravitational collapse of a giant interstellar molecular cloud. Its worlds partition into inner terrestrial planets (Mercury, Venus, Earth, Mars) and outer gas/ice giants (Jupiter, Saturn, Uranus, Neptune).',
      fr: 'Formé il y a 4,6 milliards d’années par l’effondrement d’un nuage moléculaire géant, divisé entre planètes telluriques intérieures et géantes gazeuses et glacées extérieures.'
    },
    contentSimple: {
      ar: 'تمتلك الأرض موقعاً استثنائياً في "نطاق الصلاحية للحياة" (Goldilocks Zone)، حيث درجات الحرارة تسمح بوجود الماء السائل. بينما يعمل كوكب المشتري العملاق كـ"مكنسة كهربائية فضائية" تجذب مذنبات وكويكبات خطيرة وتبعدها عن مسار الأرض بفضل جاذبيته الهائلة.',
      en: 'Earth occupies an extraordinary position in the habitable "Goldilocks Zone", preserving liquid oceans. Meanwhile, mighty Jupiter acts as a gravitational shield, deflecting hazardous comets and rogue asteroids away from inner worlds.',
      fr: 'La Terre bénéficie d’un positionnement idéal dans la zone habitable. Jupiter joue quant à elle le rôle de bouclier gravitationnel protecteur contre les comètes et astéroïdes errants.'
    },
    contentAdvanced: {
      ar: 'تحتوي الشمس على 99.86% من إجمالي كتلة المنظومة بأكملها. تدور الكواكب في مسارات إهليلجية تخضع لقوانين كبلر الثلاثة وميكانيكا نيوتن والنسبية العامة. يلعب الحزام الكويكبي بين المريخ والمشتري، وحزام كايبر، وسحابة أورت دور المخزن الأثري للمواد الأولية التي نشأت منها المنظومة.',
      en: 'The Sun monopolizes 99.86% of the system’s total aggregate mass. Orbits adhere to Kepler’s laws with fine relativistic corrections. The main asteroid belt, Kuiper Belt, and Oort Cloud serve as primordial vaults preserving proto-planetary material unchanged since the solar nebula.',
      fr: 'Le Soleil concentre 99,86 % de la masse globale. Les ceintures d’astéroïdes et de Kuiper préservent la matière primordiale de la nébuleuse protosolaire originelle.'
    },
    keyFacts: {
      ar: [
        'عمر المجموعة الشمسية: 4.6 مليار سنة',
        'عدد الكواكب: 8 كواكب رئيسية',
        'كتلة الشمس: 99.86% من كتلة المجموعة',
        'أبعد مركبة بشرية: فوياجر 1 (أكثر من 24 مليار كم عن الأرض)'
      ],
      en: [
        'Age: 4.6 Billion Years',
        'Major Planets: 8 verified planets',
        'Solar Mass Dominance: 99.86% of total system mass',
        'Furthest Manmade Probe: Voyager 1 (>24 billion km from Earth)'
      ],
      fr: [
        'Âge : 4,6 milliards d’années',
        'Planètes majeures : 8',
        'Masse solaire : 99,86 % du système total',
        'Sonde la plus éloignée : Voyager 1 (>24 milliards de km)'
      ]
    },
    specs: {
      age: '4.6 billion years',
      mass: '1.989 × 10³⁰ kg (Sun)',
      diameter: 'Heliosphere diameter ~240 AU',
      composition: 'Hydrogen 74%, Helium 24%, Heavy elements 2%'
    },
    image: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?q=80&w=1600&auto=format&fit=crop',
    imageCaption: {
      ar: 'عرض متناسق لكواكب المجموعة الشمسية مع مداراتها حول الشمس',
      en: 'Harmonious depiction of the Solar System worlds in their orbital dance',
      fr: 'Représentation harmonieuse des mondes du système solaire dans leur ballet orbital'
    },
    imageCredit: 'NASA Solar System Exploration Division',
    sources: [
      { title: 'NASA Planetary Fact Sheet', url: 'https://nssdc.gsfc.nasa.gov/planetary/factsheet/' },
      { title: 'IAU (International Astronomical Union) Planetary Nomenclature' },
      { title: 'ESA Solar System Missions' }
    ],
    relatedQuranVerseId: 'verse-sun-moon-33',
    lastUpdated: '2026-03-05',
    isApproved: true,
    readingTimeMin: 7,
    views: 3890,
    likes: 312
  },
  {
    id: 'nebulae-pillars-creation',
    title: {
      ar: 'أعمدة الخلق في سديم النسر: حاضنات النجوم الشاهقة',
      en: 'Pillars of Creation in Eagle Nebula: Towering Cosmic Nurseries',
      fr: 'Les Piliers de la Création dans la Nébuleuse de l’Aigle'
    },
    category: 'nebulae',
    summary: {
      ar: 'أعمدة مهيبة من الغاز البارد والغبار الكوني تمتد لسنوات ضوئية عديدة في سديم النسر (M16)، تتخلق بداخلها نجوم جديدة تحت تأثير الجاذبية.',
      en: 'Towering pillars of cold interstellar gas and dust spanning light-years inside the Eagle Nebula (M16), serving as stellar cradles.',
      fr: 'De gigantesques colonnes de gaz interstellaire et de poussière s’étirant sur des années-lumière dans la nébuleuse de l’Aigle (M16).'
    },
    introduction: {
      ar: 'التقط تلسكوب هابل صوراً تاريخية لهذه الأعمدة عام 1995، ثم أعاد تلسكوب جيمس ويب (JWST) تصويرها عام 2022 بالأشعة تحت الحمراء القريبة، كاشفاً عن تفاصيل مذهلة لكرات الغاز المتبخرة (EGGs) والنجوم الوليدة المتلألئة باللون القرمزي.',
      en: 'First immortalized by Hubble in 1995, James Webb (JWST) re-imaged these structures in near-infrared in 2022, piercing the dust veil to unveil evaporating gaseous globules (EGGs) and baby protostars blazing crimson.',
      fr: 'Immilitarisés par Hubble en 1995, ces piliers ont été révélés avec une clarté sans précédent par le James Webb en 2022 en infrarouge proche.'
    },
    contentSimple: {
      ar: 'هذه الأعمدة ليست صلبة، بل سحب ضخمة من الهيدروجين الجزيئي والغبار! العمود الأيسر وحده يبلغ طوله حوالي 4 إلى 5 سنوات ضوئية (أي نحو 40 تريليون كيلومتر). بداخلها تضغط الجاذبية الغاز حتى تشتعل نيران الاندماج النووي وتولد نجوم جديدة!',
      en: 'These pillars are not solid rock, but colossal filaments of hydrogen gas and cosmic dust! The leftmost pillar alone is 4 to 5 light-years tall (40 trillion km). Gravity compresses the internal knots until nuclear fusion ignites, birthing young suns!',
      fr: 'Ces piliers sont de vastes nuages d’hydrogène. La colonne de gauche s’étend sur 4 à 5 années-lumière. Sous la gravité, le gaz s’effondre pour allumer la fusion nucléaire et donner naissance à des étoiles.'
    },
    contentAdvanced: {
      ar: 'تتعرض الأعمدة لعملية تآكل ضوئي (photoevaporation) مستمرة ناتجة عن الإشعاع فوق البنفسجي العنيف الصادر من النجوم الفتية الساخنة من النوع O وB في العنقود النجمي المجاور NGC 6611. تكشف أرصاد JWST NIRCam أن النجوم الأولية تدفع مقذوفات نفثية تفوق سرعة الصوت تخترق حواف الأعمدة مشكلة صدمات قوسية (Bow Shocks).',
      en: 'The pillars experience intense photoevaporation driven by ultraviolet flux from massive, hot O- and B-type stars in the adjacent NGC 6611 cluster. JWST’s NIRCam uncovers energetic supersonic protostellar jets colliding with interstellar clouds, carving bow shocks.',
      fr: 'Les piliers subissent une photoévaporation constante provoquée par les rayonnements ultraviolets des étoiles chaudes de type O et B du cluster NGC 6611 voisin.'
    },
    keyFacts: {
      ar: [
        'المسافة من الأرض: نحو 6,500 سنة ضوئية',
        'طول العمود الأكبر: نحو 4 إلى 5 سنوات ضوئية',
        'الموقع الفلكي: كوكبة الحية (Serpens)',
        'التلسكوبات الراصدة: هابل (1995/2014) وجيمس ويب (2022)'
      ],
      en: [
        'Distance: ~6,500 Light-Years from Earth',
        'Height of Tallest Pillar: ~4 to 5 Light-Years',
        'Constellation: Serpens',
        'Primary Imaging: Hubble (1995/2014), JWST NIRCam (2022)'
      ],
      fr: [
        'Distance : ~6 500 années-lumière',
        'Hauteur du plus grand pilier : ~4 à 5 années-lumière',
        'Constellation : Serpent',
        'Imagerie : Hubble et James Webb (NIRCam)'
      ]
    },
    specs: {
      distance: '6,500 ly',
      diameter: '4-5 ly tall (tallest finger)',
      temperature: '10 to 20 Kelvin (interior cold gas)',
      composition: 'Molecular Hydrogen (H₂), Silicate dust grains'
    },
    image: 'https://images.unsplash.com/photo-1543722530-d2c3201371e7?q=80&w=1600&auto=format&fit=crop',
    imageCaption: {
      ar: 'أعمدة الخلق التقطها تلسكوب جيمس ويب بدقة الأشعة تحت الحمراء القريبة',
      en: 'Pillars of Creation imaged by NASA/ESA James Webb Space Telescope in near-infrared',
      fr: 'Les Piliers de la Création imagés par le télescope spatial James Webb'
    },
    imageCredit: 'NASA, ESA, CSA, STScI, J. DePasquale, A. Pagan',
    sources: [
      { title: 'Space Telescope Science Institute (STScI) JWST Release', url: 'https://webbtelescope.org' },
      { title: 'Hubble Heritage Project (M16 Archives)' },
      { title: 'Monthly Notices of the Royal Astronomical Society (MNRAS)' }
    ],
    relatedQuranVerseId: 'verse-smoke-11',
    lastUpdated: '2026-02-28',
    isApproved: true,
    readingTimeMin: 6,
    views: 4530,
    likes: 421
  },
  {
    id: 'discoveries-jwst-deep-field',
    title: {
      ar: 'أحدث الاكتشافات: تلسكوب جيمس ويب يكسر الأرقام القياسية لأقدم المجرات',
      en: 'Latest Discoveries: JWST Shatters Records for the Earliest Galaxies',
      fr: 'Dernières Découvertes : Le James Webb Bat Tous les Records Galactiques'
    },
    category: 'discoveries',
    summary: {
      ar: 'رصد تلسكوب جيمس ويب مجرات تشكلت بعد 290 مليون سنة فقط من الانفجار العظيم مثل مجرة JADES-GS-z14-0، مما يغير نماذجنا عن سرعة تطور الكون المبكر.',
      en: 'JWST has observed galaxies that formed merely 290 million years after the Big Bang, such as JADES-GS-z14-0, prompting revised models of early cosmic evolution.',
      fr: 'Le JWST a détecté des galaxies formées seulement 290 millions d’années après le Big Bang, redéfinissant nos modèles cosmologiques.'
    },
    introduction: {
      ar: 'بمرآته الذهبية العملاقة البالغة 6.5 متراً وموقعه في نقطة لاغرانج الثانية (L2) على بعد 1.5 مليون كم من الأرض، استطاع جيمس ويب استشعار فوتونات ضوئية انطلقت قبل أكثر من 13.5 مليار سنة وتمت إزاحتها نحو الأشعة تحت الحمراء بفعل تمدد الكون.',
      en: 'With its 6.5-meter gold-coated beryllium mirror positioned at the Second Lagrange Point (L2) 1.5 million km from Earth, JWST detects redshifted photons that began their journey over 13.5 billion years ago.',
      fr: 'Grâce à son miroir de 6,5 mètres situé au point de Lagrange L2, le James Webb capture des photons émis il y a plus de 13,5 milliards d’années.'
    },
    contentSimple: {
      ar: 'النظر بعيداً في الفضاء هو بمثابة السفر عبر الزمن إلى الماضي! لأن الضوء يستغرق وقتاً ليصلنا، فإننا نرى هذه المجرات كما كانت في طفولة الكون حين كانت النجوم الأولى تضيء الظلام الكوني.',
      en: 'Looking deep into space is literal time travel into antiquity! Because light takes time to traverse cosmic gulfs, we see these primal galaxies as they were when the very first stars ended the cosmic dark ages.',
      fr: 'Regarder au loin dans l’espace équivaut à voyager dans le temps. La lumière mettant des milliards d’années à nous parvenir, nous observons ces galaxies telles qu’elles étaient à l’aube des temps.'
    },
    contentAdvanced: {
      ar: 'المجرة JADES-GS-z14-0 تمتلك انزياحاً أحمر قياسياً قدره z = 14.32 تم تأكيده بواسطة المطياف NIRSpec. المفاجأة العلمية تكمن في لمعانها العالي وحجمها الزاوي الكبير نسبياً (أكثر من 1,600 سنة ضوئية عبر)، مما يشير إلى وجود أجيال متعددة من النجوم الضخمة وكتلة غبارية غير متوقعة في ذلك العصر المبكر جداً من حقبة إعادة التأين (Reionization Era).',
      en: 'Galaxy JADES-GS-z14-0 displays a confirmed spectroscopic redshift of z = 14.32 via the NIRSpec instrument. The profound astronomical surprise lies in its unexpected luminosity and spatial extent (>1,600 light-years across), indicating vigorous stellar feedback and rapid metallicity enrichment.',
      fr: 'La galaxie JADES-GS-z14-0 affiche un décalage vers le rouge spectroscopique certifié de z = 14,32 (NIRSpec), témoignant d’une surprenante luminosité et d’une rapide formation d’éléments lourds.'
    },
    keyFacts: {
      ar: [
        'الانزياح نحو الأحمر للمجرة القياسية: z = 14.32',
        'العمر الكوني حينها: 290 مليون سنة فقط بعد الانفجار العظيم',
        'قطر مرآة جيمس ويب: 6.5 أمتار مذهبة',
        'الموقع المداري: نقطة L2 (1.5 مليون كم عن الأرض)'
      ],
      en: [
        'Record Redshift: z = 14.32',
        'Cosmic Epoch: Only 290 million years post Big Bang',
        'Primary Mirror: 6.5-meter gold-plated beryllium',
        'Orbital Station: Sun-Earth Lagrange Point 2 (1.5 million km)'
      ],
      fr: [
        'Redshift record : z = 14,32',
        'Époque cosmique : 290 millions d’années après le Big Bang',
        'Miroir primaire : 6,5 mètres en béryllium doré',
        'Position orbitale : Point de Lagrange L2'
      ]
    },
    specs: {
      discoveryYear: '2024 / 2025 JADES survey',
      distance: '13.5+ billion years lookback time',
      composition: 'Population III & II early stars, hydrogen, ionized oxygen'
    },
    image: 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?q=80&w=1600&auto=format&fit=crop',
    imageCaption: {
      ar: 'حقل جيمس ويب فائق العمق يفيض بمئات المجرات في فجر الكون',
      en: 'James Webb deep field teeming with thousands of galaxies at the cosmic dawn',
      fr: 'Champ ultra-profond du James Webb révélant des milliers de galaxies primordiales'
    },
    imageCredit: 'NASA, ESA, CSA, STScI (JADES Collaboration)',
    sources: [
      { title: 'Nature Astronomy: A luminous galaxy at a redshift of z = 14', url: 'https://www.nature.com' },
      { title: 'NASA Webb Science Releases', url: 'https://science.nasa.gov/mission/webb/' }
    ],
    relatedQuranVerseId: 'verse-origin-30',
    lastUpdated: '2026-03-10',
    isApproved: true,
    readingTimeMin: 7,
    views: 6180,
    likes: 540
  },
  {
    id: 'stars-life-cycle',
    title: {
      ar: 'دورة حياة النجوم: من السدم الغازية إلى المستعرات العظمى والأقزام البيضاء',
      en: 'The Stellar Life Cycle: From Nebular Nurseries to Supernovae and White Dwarfs',
      fr: 'Le Cycle de Vie des Étoiles : Des Nébuleuses aux Supernovas et Naines Blanches'
    },
    category: 'stars',
    summary: {
      ar: 'رحلة تحول النجوم عبر مليارات السنين منذ ولادتها في أرحام السدم، مروراً باندماج الهيدروجين إلى الهيليوم، وحتى نهاياتها الملحمية.',
      en: 'The cosmic journey of stars spanning billions of years: born in cold molecular clouds, sustained by thermonuclear fusion, and ending in cataclysmic supernovae or serene white dwarfs.',
      fr: 'Le voyage cosmique des étoiles sur des milliards d’années : de leur naissance dans les nuages moléculaires jusqu’à leur fin cataclysmique ou paisible.'
    },
    introduction: {
      ar: 'النجوم هي المفاعلات النووية الحرارية التي صنعت كل العناصر الكيميائية الأثقل من الهيليوم في الكون، بما فيها ذرات الكربون والحديد التي تتكون منها أجسادنا وكوكبنا.',
      en: 'Stars are cosmic alchemical engines that synthesized every element heavier than helium, including the carbon and iron within our bodies and planetary mantle.',
      fr: 'Les étoiles sont les creusets thermonucléaires ayant forgé tous les éléments plus lourds que l’hélium dans le cosmos.'
    },
    contentSimple: {
      ar: 'تولد النجوم داخل سحب كثيفة وباردة من غاز الهيدروجين تسمى السدم. تحت تأثير الجاذبية، تتجمع المادة وترتفع حرارة المركز حتى تبدأ الشرارة النووية: يتحول الهيدروجين إلى هيليوم ويولد ضوءاً هائلاً يدوم مليارات السنين. وعند نفاد الوقود، تنتفخ النجوم الصغيرة مثل شمسنا لتصبح عمالقة حمراء ثم تموت بهدوء كأقزام بيضاء، بينما تنفجر النجوم العملاقة كمستعرات عظمى (سوبرنوفا) وتخلف وراءها ثقوباً سوداء أو نجوماً نيوترونية.',
      en: 'Stars condense within dense, cold molecular clouds. Under relentless gravity, core density surges until hydrogen ignites into helium via thermonuclear fusion. Lower-mass stars like our Sun eventually swell into red giants and shed their atmospheres into planetary nebulae, leaving hot white dwarfs. Massive stars undergo violent core collapse, exploding as supernovae and leaving behind neutron stars or black holes.',
      fr: 'Les étoiles naissent au cœur de nuages denses de gaz. Sous l’effet de la gravité, le cœur s’échauffe et la fusion nucléaire s’enclenche. Les étoiles massives explosent en supernovas tandis que les étoiles moyennes deviennent des naines blanches.'
    },
    contentAdvanced: {
      ar: 'تخضع النجوم لمبدأ التوازن الهيدروستاتيكي، حيث تتعادل قوة الجاذبية الساحقة نحو الداخل مع ضغط الإشعاع والغاز المتولد من الاندماج النووي الحراري نحو الخارج. تتبع النجوم مسارات تطورية محددة على مخطط هرتزبرونغ-راسل (H-R Diagram). النجوم ذات الكتل المتواضعة تعتمد على سلسلة بروتون-بروتون (p-p chain)، بينما تهيمن دورة CNO في النجوم الأثقل من 1.3 كتلة شمسية، مما يسرع استهلاك وقودها النووي ويقلل من عمرها المداري.',
      en: 'Stellar equilibrium hinges on the hydrostatic balance between gravitational contraction and outward radiative/thermal pressure. Massive stars (>8 M☉) synthesize iron (Fe-56) in successive onion-like shells, culminating in electron degeneracy pressure failure and core-collapse supernovae (Type II).',
      fr: 'L’équilibre stellaire repose sur la balance hydrostatique entre la gravité et la pression radiative. Les étoiles massives forment des couches successives jusqu’au fer avant d’imploser violemment.'
    },
    keyFacts: {
      ar: [
        'عمر النجوم: يتراوح بين ملايين السنين للنجوم العملاقة وتريليونات السنين للأقزام الحمر',
        'حرارة لب الشمس: نحو 15 مليون درجة مئوية',
        'العنصر النهائي في الاندماج النجمي العادي: الحديد (Fe-56)',
        'مصدر العناصر الثقيلة كالذهب: تصادم النجوم النيوترونية (Kilonova)'
      ],
      en: [
        'Lifespan: Ranges from a few million years (massive blue giants) to trillions (red dwarfs)',
        'Solar Core Temperature: ~15 million degrees Celsius',
        'Final Endothermic Fusion Element: Iron-56',
        'Source of Heavy Elements like Gold: Neutron star collisions (kilonovae)'
      ],
      fr: [
        'Durée de vie : de quelques millions d’années à plusieurs billions',
        'Température au cœur du Soleil : ~15 millions de °C',
        'Élément final de fusion : Le Fer (Fe-56)',
        'Origine des métaux lourds comme l’or : Kilonovas (collisions d’étoiles à neutrons)'
      ]
    },
    specs: {
      temperature: '3,000 K (Red Dwarfs) to 40,000+ K (O-type Stars)',
      mass: '0.08 M☉ to >200 M☉',
      composition: '74% Hydrogen, 24% Helium, 2% Metals',
      discoveryYear: 'Astrophysical spectroscopy pioneered in 19th Century'
    },
    image: 'https://images.unsplash.com/photo-1538370965046-79c0d6907d47?q=80&w=1600&auto=format&fit=crop',
    imageCaption: {
      ar: 'أعمدة من النجوم الشابة والمخاليط الغازية تتوهج في سديم نجمي سحيق',
      en: 'Pillars of newborn stars and radiant gas clusters across deep interstellar nurseries',
      fr: 'Piliers de jeunes étoiles et gaz étincelants au cœur d’une pouponnière stellaire'
    },
    imageCredit: 'NASA / ESA / Hubble Heritage Team',
    sources: [
      { title: 'NASA Astrophysics Data System: Stellar Evolution', url: 'https://adsabs.harvard.edu' },
      { title: 'Astrophysical Journal: Stellar Nucleosynthesis Overview' }
    ],
    relatedQuranVerseId: 'verse-tariq-1',
    lastUpdated: '2026-03-20',
    isApproved: true,
    readingTimeMin: 6,
    views: 4890,
    likes: 395
  },
  {
    id: 'stars-neutron-pulsars',
    title: {
      ar: 'النجوم النيوترونية والنجوم النابضة: كثافة تفوق الخيال والطارق الكوني',
      en: 'Neutron Stars & Pulsars: Subatomic Density and the Cosmic Hammer',
      fr: 'Étoiles à Neutrons et Pulsars : Une Densité Inouïe et le Marteau Cosmique'
    },
    category: 'stars',
    summary: {
      ar: 'بقايا نجوم عملاقة تنهار حتى تنضغط بروتوناتها وإلكتروناتها إلى نيوترونات خالصة، فتدور مئات المرات في الثانية وترسل ومضات كالمطارق الكونية.',
      en: 'The ultra-dense remnants of collapsed giant stars where protons and electrons fuse into pure neutrons, rotating hundreds of times per second and emitting periodic radio beacons.',
      fr: 'Vestiges ultra-denses d’étoiles massives effondrées, tournant sur elles-mêmes des centaines de fois par seconde et émettant de puissants faisceaux périodiques.'
    },
    introduction: {
      ar: 'تعد النجوم النيوترونية أقصى درجات كثافة المادة في الكون قبل أن تتحول إلى ثقب أسود. ملعقة صغيرة من مادتها على الأرض تزن مليارات الأطنان!',
      en: 'Neutron stars embody the highest density state of matter prior to black hole singularity formation. A single teaspoon of their core would outweigh billions of metric tons on Earth.',
      fr: 'Les étoiles à neutrons représentent la matière la plus dense de l’univers avant le trou noir. Une seule cuillère à café pèserait des milliards de tonnes sur Terre.'
    },
    contentSimple: {
      ar: 'عندما ينفجر نجم عملاق كـ "سوبرنوفا"، ينهار قلبه إلى كرة صلبة لا يتجاوز قطرها 20 كيلومتراً، ولكنها تزن أكثر من شمسنا كلها! تسمى هذه الأجرام بالنجوم النابضة (Pulsars) لأنها تدور بسرعة جنونية وترسل حزم إشعاعية دقيقة تشبه دقات المطرقة المنتظمة المنتقلة عبر أرجاء الكون.',
      en: 'When a supergiant star exhausts its fuel and explodes, its core collapses into a sphere merely 20 kilometers wide yet holding greater mass than our entire Sun. As they spin at staggering velocities, they sweep beams of intense radiation across space like regular, rhythmic cosmic drumbeats.',
      fr: 'Lors de l’explosion d’une étoile géante, son cœur s’effondre en une sphère de seulement 20 km de diamètre, plus lourde que notre Soleil. En tournant, elle balaie l’espace de faisceaux réguliers rappelant des battements métronomiques.'
    },
    contentAdvanced: {
      ar: 'تمنع قوى الانفطار النيوتروني (Neutron Degeneracy Pressure) النجم النيوتروني من الانهيار التام إلى ثقب أسود طالما لم تتجاوز كتلته حد تولمان-أوبنهايمر-فولكوف (حد TOV البالغ نحو 2.16 كتلة شمسية). يمتلك النجم النيوتروني مجالاً مغناطيسياً هائلاً يصل إلى 10¹² إلى 10¹⁵ غاوس في النجوم المغناطيسية (Magnetars)، مما يولد تباطؤاً مدارياً ومرتجفات نجمية (Starquakes) مصحوبة بانفجارات أشعة غاما فائقة الشدة.',
      en: 'Neutron degeneracy pressure supports the star against gravitational collapse up to the Tolman-Oppenheimer-Volkoff (TOV) limit (~2.16 M☉). Pulsars exhibit relativistic beam emissions governed by intense magnetic dipoles, serving as the most precise natural clocks in the cosmos for testing gravitational wave physics.',
      fr: 'La pression de dégénérescence des neutrons soutient l’astre contre l’effondrement gravitationnel jusqu’à la limite TOV (~2,16 M☉). Leurs faisceaux magnétosphériques agissent comme des horloges atomiques célestes ultra-précises.'
    },
    keyFacts: {
      ar: [
        'القطر: نحو 20 كيلومتراً فقط',
        'الكتلة: 1.4 إلى 2.1 كتلة شمسية',
        'سرعة الدوران: تصل إلى 716 دورة في الثانية في النجم PSR J1748-2446ad',
        'الكثافة: 10¹⁴ ضعف كثافة الماء'
      ],
      en: [
        'Diameter: Only ~20 kilometers (~12 miles)',
        'Mass: 1.4 to 2.1 Solar masses',
        'Rotational Speed: Up to 716 rotations per second (PSR J1748-2446ad)',
        'Density: ~10¹⁴ times denser than water'
      ],
      fr: [
        'Diamètre : Seulement ~20 km',
        'Masse : 1,4 à 2,1 masses solaires',
        'Vitesse de rotation : jusqu’à 716 tours par seconde',
        'Densité : ~10¹⁴ fois celle de l’eau'
      ]
    },
    specs: {
      diameter: '20 km',
      mass: '1.4 - 2.1 M☉',
      speed: 'Up to 716 rotations/sec',
      temperature: '10⁶ K (surface cooling)',
      discoveryYear: '1967 (Jocelyn Bell Burnell & Antony Hewish)'
    },
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600&auto=format&fit=crop',
    imageCaption: {
      ar: 'تصور فني لحزم الإشعاع المنبعثة من قطبي نجم نيوتروني نابض',
      en: 'Artist conception of high-energy relativistic radiation beams beamed from pulsar magnetic poles',
      fr: 'Vue d’artiste des faisceaux de radiation relativistes émis par un pulsar'
    },
    imageCredit: 'NASA / Goddard Space Flight Center / NICER Science Team',
    sources: [
      { title: 'NASA NICER Mission: Measuring Neutron Star Interior', url: 'https://www.nasa.gov/nicer' },
      { title: 'Astrophysical Journal Letters: Pulsar Timing Arrays' }
    ],
    relatedQuranVerseId: 'verse-tariq-1',
    lastUpdated: '2026-03-22',
    isApproved: true,
    readingTimeMin: 5,
    views: 3920,
    likes: 310
  },
  {
    id: 'cosmic-scales-light-travel',
    title: {
      ar: 'أبعاد ومقاييس الكون: كيف يقيس علماء الفلك مليارات السنين الضوئية؟',
      en: 'Cosmic Scales & Distances: How Astronomers Map Billions of Light-Years',
      fr: 'Les Échelles du Cosmos : Comment Mesure-t-on les Milliards d’Années-Lumière ?'
    },
    category: 'cosmic-distances',
    summary: {
      ar: 'سلم المسافات الكونية العجيب: من قياس اختلاف المنظر للنجوم القريبة، إلى الشموع القياسية وسرعة تمدد نسيج الزمكان.',
      en: 'The cosmic distance ladder: from trigonometric parallax for nearby stars to Cepheid variables, Type Ia supernovae, and cosmological redshift.',
      fr: 'L’échelle des distances cosmiques : du parallaxe trigonométrique aux céphéides, supernovas de type Ia et décalage vers le rouge.'
    },
    introduction: {
      ar: 'الكون أكبر بكثير من أي مقياس بشري مألوف. السنة الضوئية الواحدة تعادل نحو 9.46 تريليون كيلومتر، ومع ذلك فهي مجرد خطوة ميكروسكوبية في محيط الفضاء الشاسع.',
      en: 'The universe dwarfs all intuitive human units. A single light-year spans roughly 9.46 trillion kilometers, yet represents merely a microscopic step in the cosmological expanse.',
      fr: 'Une seule année-lumière équivaut à 9 460 milliards de kilomètres, et n’est pourtant qu’un pas infime dans l’océan cosmique.'
    },
    contentSimple: {
      ar: 'كيف نقيس مسافة شيء لا نستطيع الوصول إليه أبداً؟ يبدأ الفلكيون بطريقة تشبه رؤية عينيك: ينظرون إلى النجم عندما تكون الأرض في جهة من مدارها حول الشمس، ثم ينظرون مجدداً بعد 6 أشهر من الجهة الأخرى. هذا التغير الطفيف في الزاوية يسمى "التزيح". وللمسافات الأبعد في المجرات، نستخدم نجوماً متغيرة تسمى "الشموع القياسية" نعرف شدة لمعانها الحقيقي، ومن خلال خفوت ضوئها نحسب بعدها بدقة.',
      en: 'How do astronomers gauge distances across gulfs we can never physically traverse? For nearby stars, we employ trigonometric parallax by observing shifts as Earth orbits the Sun every six months. For distant galaxies, we look for standard candles—such as Type Ia supernovae and Cepheid variables—whose intrinsic brightness is precisely known, allowing distance calculation via inverse-square illumination falloff.',
      fr: 'Les astronomes utilisent le parallaxe pour les étoiles proches, puis des « chandelles standard » comme les supernovas de type Ia et les céphéides pour calculer la distance des galaxies lointaines.'
    },
    contentAdvanced: {
      ar: 'يرتكز قياس الكون على "سلم المسافات الكونية" (Cosmic Distance Ladder). في المستوى الأول: اختلاف المنظر النجمي (Parallax) عبر تلسكوب Gaia بدقة ميكرو-ثانية قوسية. المستوى الثاني: علاقة الدور باللمعان لمتغيرات قيفاوس (Leavitt Period-Luminosity Law). المستوى الثالث: المستعرات العظمى من النوع Ia (Supernovae Ia) المعايرة عبر منحنى فيليبس. المستوى الرابع: قانون هابل-لومتر والانزياح الطيفي نحو الأحمر الناتج عن تمدد الفضاء ذاته.',
      en: 'The Cosmic Distance Ladder operates via calibrated rungs: Gaia geometric parallax, Cepheid Leavitt Law, Type Ia Phillips relation, and cosmological redshift z. Precise measurement of the Hubble Constant (H₀) remains one of the central puzzles in contemporary cosmology (the Hubble Tension between CMB and local measurements).',
      fr: 'L’échelle des distances cosmiques s’appuie sur le parallaxe géométrique (Gaia), la loi de Leavitt pour les céphéides, les supernovas Ia et la loi de Hubble-Lemaître via le décalage spectral vers le rouge.'
    },
    keyFacts: {
      ar: [
        'السنة الضوئية: 9.46 تريليون كيلومتر (المسافة التي يقطعها الضوء في سنة)',
        'قطر الكون المنظور: نحو 93 مليار سنة ضوئية (بسبب تمدد الزمكان المستمر)',
        'أقرب نظام نجمي للأرض: قنطورس الأقرب (Proxima Centauri) على بعد 4.24 سنة ضوئية',
        'أبعد نقطة رصدها جيمس ويب: مجرات على بعد يزيد عن 13.5 مليار سنة ضوئية'
      ],
      en: [
        'Light-Year: ~9.46 trillion km (~5.88 trillion miles)',
        'Observable Universe Diameter: ~93 billion light-years (due to ongoing spatial expansion)',
        'Closest Star System: Proxima Centauri at 4.24 light-years',
        'Farthest Objects Imaged by JWST: Primordial galaxies at lookback times exceeding 13.5 billion years'
      ],
      fr: [
        'Année-lumière : ~9,46 billions de kilomètres',
        'Diamètre de l’univers observable : ~93 milliards d’années-lumière',
        'Système le plus proche : Proxima du Centaure à 4,24 années-lumière',
        'Objets les plus distants : Galaxies à plus de 13,5 milliards d’années de trajet lumineux'
      ]
    },
    specs: {
      speed: '299,792,458 m/s (Speed of Light)',
      diameter: '93 Billion Light-Years (Observable Universe)',
      age: '13.787 ± 0.020 Billion Years'
    },
    image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1600&auto=format&fit=crop',
    imageCaption: {
      ar: 'أفق الأرض الأزرق الرقيق يطل على فراغ الفضاء السحيق والنجوم المتلألئة',
      en: 'Earth slender atmospheric boundary confronting the boundless void of deep space',
      fr: 'Le mince voile atmosphérique terrestre face à l’immensité du vide spatial'
    },
    imageCredit: 'NASA / ISS Expedition Crew',
    sources: [
      { title: 'ESA Gaia Data Release 3: Parallax Measurements', url: 'https://www.cosmos.esa.int/web/gaia' },
      { title: 'Hubble Space Telescope Key Project on the Extragalactic Distance Scale' }
    ],
    relatedQuranVerseId: 'verse-expanding-47',
    lastUpdated: '2026-03-15',
    isApproved: true,
    readingTimeMin: 7,
    views: 5210,
    likes: 412
  },
  {
    id: 'observable-universe-horizons',
    title: {
      ar: 'سرعة الضوء وحدود الكون المنظور: رحلة إلى أطراف الزمكان',
      en: 'The Speed of Light & The Cosmic Horizon: Journey to the Edge of Spacetime',
      fr: 'La Vitesse de la Lumière et l’Horizon Cosmique : Voyage aux Confins de l’Espace-Temps'
    },
    category: 'cosmic-distances',
    summary: {
      ar: 'لماذا تعد سرعة الضوء الحد الأقصى لنقل المعلومات في الفيزياء؟ وما معنى أفق الحدث الكوني الذي يحجب عنا ما وراءه؟',
      en: 'Why the speed of light represents nature’s ultimate cosmic speed limit and how the cosmic particle horizon defines what we can observe in spacetime.',
      fr: 'Pourquoi la vitesse de la lumière est la vitesse limite de la physique et comment l’horizon cosmologique délimite notre univers observable.'
    },
    introduction: {
      ar: 'يسير الضوء بسرعة 300,000 كم في الثانية، ومع ذلك فإن الضوء الصادر عن مجرة أندروميدا المجاورة استغرق 2.5 مليون سنة ليصل إلى أعيننا الليلة!',
      en: 'Light travels at roughly 300,000 km per second, yet light from our neighboring Andromeda galaxy embarked on its voyage 2.5 million years before reaching your retina tonight.',
      fr: 'La lumière voyage à 300 000 km/s, mais les photons d’Andromède ont mis 2,5 millions d’années pour parvenir à nos yeux.'
    },
    contentSimple: {
      ar: 'سرعة الضوء ليست مجرد سرعة إشعاع، بل هي السرعة القصوى للسببية في نسيج الكون ذاته. عندما تنظر إلى الشمس، فإنك تراها كما كانت قبل 8 دقائق و20 ثانية. وعندما تنظر إلى النجوم البعيدة، فإنك تشاهد فيلماً وثائقياً حياً للماضي السحيق. وبسبب تمدد الكون المستمر، توجد مناطق شاسعة في الفضاء تبتعد عنا أسرع من سرعة الضوء، ولن نتمكن أبداً من رؤية ما يحدث فيها.',
      en: 'The speed of light is the fundamental speed of causality in relativity. When you observe the Sun, you see it as it existed 8 minutes and 20 seconds ago. Due to accelerating cosmic expansion driven by dark energy, space beyond our cosmological event horizon is receding from us faster than light can traverse, forever sealing those realms from our view.',
      fr: 'La vitesse de la lumière est la vitesse de la causalité. Lorsque nous observons les étoiles, nous regardons le passé. En raison de l’expansion de l’univers, les régions situées au-delà de l’horizon cosmique nous resteront à jamais invisibles.'
    },
    contentAdvanced: {
      ar: 'في النسبية الخاصة، يشكل ثابت سرعة الضوء c الثابت الهندسي لتحويل الزمان إلى مكان في فضاء مينكوفسكي. في علم الكونيات، يحدد أفق الجسيمات (Particle Horizon) أبعد مسافة قطعتها الفوتونات منذ الانفجار العظيم إلى الراصد الحالي. وبفعل عامل القياس الكوني a(t) ونموذج لامبدا-سي دي إم (ΛCDM)، تبلغ المسافة المسايرة الحالية لأفق الرصد نحو 46.5 مليار سنة ضوئية في كل اتجاه.',
      en: 'In Minkowski spacetime, c defines the invariant spacetime interval ds² = -c²dt² + dx² + dy² + dz². In FLRW cosmology, the comoving particle horizon equals the integral of c dt / a(t) from t=0 to the present epoch, yielding ~46.5 billion light-years radius (~93 billion light-years full diameter).',
      fr: 'Dans l’espace de Minkowski, c est l’invariant fondamental unissant l’espace et le temps. Selon le modèle standard ΛCDM, le rayon comobile de l’horizon des particules atteint ~46,5 milliards d’années-lumière.'
    },
    keyFacts: {
      ar: [
        'سرعة الضوء الدقيقة في الفراغ: 299,792,458 متر/ثانية',
        'زمن وصول ضوء القمر للأرض: 1.3 ثانية',
        'زمن وصول ضوء الشمس للأرض: 8 دقائق و20 ثانية',
        'قطر أفق الكون المنظور: 93 مليار سنة ضوئية'
      ],
      en: [
        'Exact Speed of Light: 299,792,458 m/s',
        'Moonlight Transit Time: ~1.3 seconds',
        'Sunlight Transit Time: 8 minutes and 20 seconds',
        'Observable Horizon Diameter: ~93 billion light-years'
      ],
      fr: [
        'Vitesse exacte de la lumière : 299 792 458 m/s',
        'Trajet Terre-Lune de la lumière : ~1,3 seconde',
        'Trajet Soleil-Terre de la lumière : 8 minutes et 20 secondes',
        'Diamètre de l’horizon observable : 93 milliards d’années-lumière'
      ]
    },
    specs: {
      speed: '299,792.458 km/s',
      diameter: '93 Billion Light-Years',
      age: '13.787 Billion Years'
    },
    image: 'https://images.unsplash.com/photo-1464802686167-b939a6910659?q=80&w=1600&auto=format&fit=crop',
    imageCaption: {
      ar: 'مجرات بعيدة ونقاط ضوئية تسافر عبر مليارات السنين الضوئية نحو الراصد',
      en: 'Distant galaxies streaming across billions of light-years of cosmological expansion',
      fr: 'Galaxies lointaines dont les photons voyagent depuis des milliards d’années'
    },
    imageCredit: 'NASA / ESA / STScI Deep Space Survey',
    sources: [
      { title: 'Physical Review D: Cosmological Particle Horizon and Dark Energy', url: 'https://journals.aps.org/prd' },
      { title: 'Principles of Physical Cosmology (P.J.E. Peebles)' }
    ],
    relatedQuranVerseId: 'verse-origin-30',
    lastUpdated: '2026-03-18',
    isApproved: true,
    readingTimeMin: 6,
    views: 3750,
    likes: 298
  },
  {
    id: 'quran-cosmic-web-habak',
    title: {
      ar: 'النسيج الكوني وحبك السماء: تطابق علمي مذهل مع الآيات القرآنية',
      en: 'The Cosmic Web & Celestial Filaments: The Quranic Sign of Al-Hubuk',
      fr: 'La Toile Cosmique et les Filaments Célestes : Le Signe Coranique d’Al-Hubuk'
    },
    category: 'quran-cosmos',
    summary: {
      ar: 'أظهرت المحاكاة الحاسوبية العملاقة أن المجرات تصطف على شكل خيوط نسيج عنكبوتي محكم يربط أطراف الكون، في توافق بديع مع قوله تعالى: «وَالسَّمَاءِ ذَاتِ الْحُبُكِ».',
      en: 'State-of-the-art supercomputer simulations reveal that billions of galaxies string along an intricately woven cosmic web, resonating with the Quranic oath: "By the heaven full of woven paths (Al-Hubuk)".',
      fr: 'Les supercalculateurs modernes ont révélé que les galaxies s’ordonnent en filaments d’une toile cosmique grandiose, en accord remarquable avec le verset coranique sur « le ciel aux voies tissées ».'
    },
    introduction: {
      ar: 'أقسم الله تعالى في سورة الذاريات بقوله: ﴿وَالسَّمَاءِ ذَاتِ الْحُبُكِ﴾. فما هو الحبك في لسان العرب وماذا كشفت مراصد القرن الحادي والعشرين عن نسيج الكون؟',
      en: 'In Surah Adh-Dhariyat, Allah takes an oath: "By the heaven of paths/weavings (Al-Hubuk)". Classical Arabic lexicography defines Hubuk as exquisite, tightly braided weaves and ripples.',
      fr: 'Dans la sourate Adh-Dhariyat, le Coran jure par « le ciel aux voies tissées » (Al-Hubuk). Que révèle l’astrophysique moderne sur cette trame cosmique ?'
    },
    contentSimple: {
      ar: 'عندما صوّر العلماء الكون على نطاق واسع باستخدام أقوى الحواسيب الفائقة (مثل محاكاة Millennium وIllustrisTNG)، اكتشفوا مفاجأة مذهلة: المجرات ليست مبعثرة عشوائياً، بل تصطف كخيوط حريرية متصلة تشبه تماماً نسيج الغزل المحبوك بدقة فائقة! بين هذه الخيوط توجد فراغات كونية هائلة، بينما تلتقي الخيوط في عُقد ضخمة تضم آلاف المجرات.',
      en: 'When astrophysicists map the cosmos on cosmological megaparsec scales, they observe that galaxies do not drift randomly; they string along colossal filaments of dark matter and gas that form a celestial tapestry. Colossal cosmic voids sit between intricate cosmic threads that intersect at massive galaxy cluster hubs.',
      fr: 'À grande échelle, les galaxies ne sont pas dispersées au hasard : elles s’alignent le long de filaments de matière noire et de gaz formant une gigantesque toile tissée avec une précision mathématique.'
    },
    contentAdvanced: {
      ar: 'تُعرف هذه البنية في الفيزياء الكونية باسم "النسيج الكوني" (The Cosmic Web). تشكلت هذه الخيوط بفعل تذبذبات الكثافة الكمية الأولية المتضخمة في الكون المبكر، حيث انهارت المادة المظلمة الباردة (Cold Dark Matter) بفعل الجاذبية مشكلة صفائح وخيوطاً هيدروديناميكية تركز فيها الغاز الباروني لتتولد المجرات. وقد فسر أئمة التفسير كالطبري وابن كثير والقرطبي "الحُبُك" بأنها "الطرائق المنسوجة بحسن وإحكام كحبك الثوب وتكسر الماء والرمل".',
      en: 'The Cosmic Web structure emerged from primordial quantum density perturbations amplified during cosmic inflation. Cold Dark Matter gravitationally aggregated into sheets and 1D filaments governed by the Zeldovich approximation. Classical exegetes (Ibn Kathir, Al-Tabari) described Al-Hubuk as tightly woven threads and hydrodynamic ripples.',
      fr: 'La structure de la toile cosmique découle des fluctuations quantiques primordiales amplifiées par l’inflation. La matière noire s’est effondrée en filaments et feuillets le long desquels les galaxies ont pris naissance.'
    },
    keyFacts: {
      ar: [
        'طول الخيوط الكونية: يصل إلى مئات الملايين من السنين الضوئية',
        'مكونات النسيج: 85% من مادته هي مادة مظلمة غير مرئية',
        'تفسير الحُبُك لغوياً: النسيج المتقن، وطرائق الماء والرمال المتداخلة',
        'أشهر مشاريع المحاكاة: مشروع IllustrisTNG ومشروع Millennium'
      ],
      en: [
        'Filament Length: Hundreds of millions of light-years',
        'Composition: ~85% non-baryonic dark matter scaffold',
        'Linguistic Meaning of Hubuk: Intricate weaves, interlaced tracks and ripples',
        'Flagship Simulation Models: IllustrisTNG and Millennium Simulation'
      ],
      fr: [
        'Longueur des filaments : plusieurs centaines de millions d’années-lumière',
        'Composition : ~85% de matière noire non baryonique',
        'Sens linguistique de Hubuk : Tissage parfait, voies harmonieuses',
        'Simulations emblématiques : IllustrisTNG et Millennium'
      ]
    },
    specs: {
      diameter: 'Scale: 100+ Megaparsecs',
      composition: 'Dark matter filaments, Warm-Hot Intergalactic Medium (WHIM)',
      discoveryYear: '1980s (CfA Redshift Survey) / 2010s (Illustris)'
    },
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1600&auto=format&fit=crop',
    imageCaption: {
      ar: 'خيوط من الضوء والغاز تشكل نسيجاً كونياً متشابكاً يربط المجرات البعيدة',
      en: 'Filamentary tendrils of radiant intergalactic gas mapping the cosmic web structure',
      fr: 'Filaments de gaz et de matière reliant les amas de galaxies dans la toile cosmique'
    },
    imageCredit: 'IllustrisTNG Collaboration / Max Planck Institute for Astrophysics',
    sources: [
      { title: 'The IllustrisTNG Project: Next-generation cosmological simulations', url: 'https://www.tng-project.org' },
      { title: 'تفسير القرآن العظيم - ابن كثير (سورة الذاريات)' }
    ],
    relatedQuranVerseId: 'verse-expanding-47',
    lastUpdated: '2026-03-24',
    isApproved: true,
    readingTimeMin: 7,
    views: 6410,
    likes: 580
  },
  {
    id: 'quran-expanding-universe-samaa',
    title: {
      ar: 'اتساع الكون وبداية الخلق: الرتق والفتق في ميزان الفيزياء الفلكية الحديثة',
      en: 'The Expanding Universe & Cosmic Genesis: Modern Astrophysics in Quranic Reflection',
      fr: 'L’Univers en Expansion et la Genèse Cosmique : Physique Moderne et Versets Coraniques'
    },
    category: 'quran-cosmos',
    summary: {
      ar: 'دراسة علمية محكمة تقارن بين نظرية الانفجار العظيم وتمدد الزمكان، وبين الآيتين الكريمتين: «وَالسَّمَاءَ بَنَيْنَاهَا بِأَيْدٍ وَإِنَّا لَمُوسِعُونَ» و«أَنَّ السَّمَاوَاتِ وَالأَرْضَ كَانَتَا رَتْقاً فَفَتَقْنَاهُمَا».',
      en: 'A rigorous reflection examining cosmological expansion and initial singularity alongside Quranic declarations of cosmic expansion (Surah 51:47) and primal cohesion (Surah 21:30).',
      fr: 'Une étude scientifique rigoureuse reliant l’expansion de l’espace et la singularité primordiale aux versets coraniques sur l’expansion et la séparation initiale.'
    },
    introduction: {
      ar: 'حتى مطلع القرن العشرين، كان الاعتقاد السائد بين علماء الفلك هو أن الكون أزلي وثابت لا يتغير. وجاءت معادلات النسبية العامة وملاحظات إدوين هابل لتفجر أعظم ثورة علمية: الكون يتمدد وله بداية!',
      en: 'Until the early 20th century, mainstream physics assumed a static, eternal universe. Einstein field equations and Edwin Hubble observations overturned this dogma: space is dynamically expanding from a singular origin.',
      fr: 'Jusqu’au début du XXe siècle, la science croyait en un univers statique. Les découvertes d’Einstein et d’Hubble ont révélé une vérité spectaculaire : l’univers est en constante expansion.'
    },
    contentSimple: {
      ar: 'في عام 1929، اكتشف العالم إدوين هابل أن المجرات البعيدة تهرب مبتعدة عنا في كل الاتجاهات، وكلما كانت أبعد كانت سرعتها أكبر! هذا يعني أن الكون بأكمله يتمدد باستمرار. وإذا أرجعنا شريط الزمن إلى الوراء، سنجد أن كل مادة الكون كانت مجتمعة في نقطة واحدة فائقة الكثافة والحرارة قبل أن تنفجر وتتفرع. هذا يتطابق بشكل يثير التأمل مع قوله تعالى: ﴿وَالسَّمَاءَ بَنَيْنَاهَا بِأَيْدٍ وَإِنَّا لَمُوسِعُونَ﴾.',
      en: 'In 1929, Edwin Hubble observed that distant galaxies are racing away from us: the farther they lie, the faster their apparent recession. Space itself is stretching. Winding the clock backwards leads inescapably to a primal cosmic singularity where all matter-energy was concentrated before the Big Bang expansion unfolded.',
      fr: 'En 1929, Hubble découvrit que les galaxies s’éloignent les unes des autres : l’espace lui-même grandit. En remontant le temps, toute la matière était réunie en un point originel d’une densité extrême.'
    },
    contentAdvanced: {
      ar: 'تصف معادلات فريدمان-لومتر-روبرتسون-ووكر (FLRW) المشتقة من النسبية العامة ديناميكية تمدد الزمكان عبر معامل المقياس a(t). أثبت رصد المستعرات العظمى عام 1998 عبر مشروعي High-z Supernova Search وSupernova Cosmology Project أن التمدد الكوني لا يتباطأ بفعل الجاذبية، بل يتسارع مدفوعاً بـ "الطاقة المظلمة" (Dark Energy) التي تشكل نحو 68% من محتوى الكون. الصيغة القرآنية ﴿وَإِنَّا لَمُوسِعُونَ﴾ بصيغة اسم الفاعل تدل على الاستمرارية والتجدد.',
      en: 'The Friedmann equations predict expanding or contracting spatial geometry. In 1998, observations of distant Type Ia supernovae proved that cosmic expansion is accelerating due to dark energy / cosmological constant Λ. The linguistic construct in Arabic (الموسعون) denotes continuous, open-ended ongoing expansion.',
      fr: 'Les équations de Friedmann décrivent l’évolution métrique de l’espace. En 1998, la découverte de l’accélération de l’expansion causée par l’énergie sombre a confirmé le dynamisme perpétuel du cosmos.'
    },
    keyFacts: {
      ar: [
        'اكتشاف التمدد الكوني: جورج لومتر (1927) وإدوين هابل (1929)',
        'ثابت هابل: نحو 70 (كم/ثانية) لكل ميغافارسخ',
        'مكونات طاقة الكون: 68% طاقة مظلمة، 27% مادة مظلمة، 5% مادة عادية',
        'إشعاع الخلفية الكونية الميكروي (CMB): تم رصده عام 1965 كشاهد على بداية الكون'
      ],
      en: [
        'Discovery of Cosmic Expansion: Georges Lemaître (1927) & Edwin Hubble (1929)',
        'Hubble Constant: ~70 km/s/Mpc',
        'Cosmic Energy Budget: 68% Dark Energy, 27% Dark Matter, 5% Ordinary Matter',
        'Cosmic Microwave Background (CMB): Discovered in 1965 confirming hot dense origin'
      ],
      fr: [
        'Découverte de l’expansion : Georges Lemaître (1927) et Edwin Hubble (1929)',
        'Constante de Hubble : ~70 km/s/Mpc',
        'Bilan énergétique cosmique : 68% énergie sombre, 27% matière noire, 5% matière baryonique',
        'Fond diffus cosmologique (CMB) : Découvert en 1965 confirmant les origines denses'
      ]
    },
    specs: {
      age: '13.787 Billion Years',
      composition: '68% Dark Energy, 27% Dark Matter, 5% Normal Matter',
      speed: 'Expansion rate ~70 km/s/Mpc'
    },
    image: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=1600&auto=format&fit=crop',
    imageCaption: {
      ar: 'اتساع الفضاء ومجرات متلألئة تتوارى في أعماق الكون المنظور',
      en: 'Accelerating expansion of space carrying billions of galaxies across the cosmological timeline',
      fr: 'Expansion accélérée de l’espace emportant des milliards de galaxies'
    },
    imageCredit: 'NASA / WMAP Science Team / ESA Planck Collaboration',
    sources: [
      { title: 'The Astrophysical Journal: Observational Evidence from Supernovae for an Accelerating Universe' },
      { title: 'ESA Planck 2018 Results: Cosmological Parameters' }
    ],
    relatedQuranVerseId: 'verse-expanding-47',
    lastUpdated: '2026-03-25',
    isApproved: true,
    readingTimeMin: 8,
    views: 7850,
    likes: 670
  },
  {
    id: 'reflections-lunar-mansions',
    title: {
      ar: 'تأملات في منازل القمر والتقويم الفلكي: حركة الأجرام ودقة المدارات',
      en: 'Reflections on Lunar Mansions: Celestial Mechanics and Quranic Calendars',
      fr: 'Méditations sur les Demeures Lunaires : Mécanique Céleste et Calendrier Coranique'
    },
    category: 'reflections',
    summary: {
      ar: '﴿وَالْقَمَرَ قَدَّرْنَاهُ مَنَازِلَ حَتَّىٰ عَادَ كَالْعُرْجُونِ الْقَدِيمِ﴾ — كيف ترتبط أطوار القمر الـ 28 بحساب الشهور والسنين بدقة هندسية متناهية؟',
      en: 'A reflective exploration of the Moon’s 28 celestial stations, synodic vs sidereal orbital periods, and the mathematical precision underpinning the Hijri lunar calendar.',
      fr: 'Une méditation sur les 28 stations lunaires, les périodes synodiques et la précision mathématique du calendrier lunaire.'
    },
    introduction: {
      ar: 'يمثل القمر الساعة الفلكية الطبيعية لسكان كوكب الأرض. بحركته اليومية المنتظمة بين النجوم، يمكن لأي إنسان في أي مكان تحديد الأيام والشهور بالعين المجردة.',
      en: 'The Moon acts as humanity’s celestial clockwork. Its reliable progression against the background stars enables observers on Earth to mark dates and months through direct observation.',
      fr: 'La Lune constitue l’horloge céleste naturelle de l’humanité, permettant de suivre les mois et les saisons avec exactitude.'
    },
    contentSimple: {
      ar: 'في كل ليلة، يغير القمر موقعه في السماء بمقدار 13 درجة تقريباً باتجاه الشرق، وينتقل من منزلة فلكية إلى منزلة أخرى. يبدأ كهلال نحيل، ثم ينمو ليصبح بدراً كاملاً يضيء ظلمة الليل، ثم يتناقص تدريجياً حتى يصبح كـ "العرجون القديم" (وهو عذق النخل العتيق المنحني المصفر). هذه الدورة الدقيقة هي أساس حساب السنين والأشهر الهجرية ومواقيت العبادات.',
      en: 'Each night, the Moon advances approximately 13 degrees eastward across the sky, passing through distinct astronomical constellations. It waxes from a delicate crescent to a brilliant full moon before waning back into a curved, withered date-palm stalk (Urjun Al-Qadeem), providing an accessible cosmic calendar for civilizations.',
      fr: 'Chaque nuit, la Lune se décale d’environ 13 degrés vers l’est, traversant ses demeures célestes, du mince croissant jusqu’à la pleine lune puis au croissant fin ressemblant à une branche de palmier courbée.'
    },
    contentAdvanced: {
      ar: 'يتميز مدار القمر بفارق زمني بين الشهر الاقتراني (Synodic Month: 29.530589 يوماً) وهو دورة الأطوار بالنسبة للشمس، والشهر النجمي (Sidereal Month: 27.321661 يوماً) وهو دورة القمر بالنسبة للنجوم الثابتة. تبلغ زاوية ميلان مدار القمر 5.14 درجة بالنسبة لمستوى مدار الأرض حول الشمس، مما يفسر عدم حدوث خسوف وكسوف في كل شهر قمري، بل فقط عند تقاطع القمر مع العقدتين المداريتين الصاعدة والهابطة.',
      en: 'Lunar orbital mechanics distinguish between the sidereal month (27.32 days against fixed stars) and the synodic month (29.53 days from new moon to new moon). The 5.14° inclination of the lunar orbit relative to the ecliptic plane explains why syzygy does not produce solar and lunar eclipses each month, occurring only when the Moon aligns with orbital nodes.',
      fr: 'La mécanique orbitale lunaire distingue le mois synodique (29,53 jours) et le mois sidéral (27,32 jours). L’inclinaison de 5,14° de son orbite explique la rareté relative des éclipses.'
    },
    keyFacts: {
      ar: [
        'متوسط بعد القمر عن الأرض: 384,400 كيلومتر',
        'طول الشهر القمري الاقتراني: 29 يوماً و12 ساعة و44 دقيقة',
        'السرعة المدارية للقمر: نحو 1.022 كم/ثانية',
        'الانغلاق المداري: يواجه القمر الأرض بوجه واحد دائماً بسبب التزامن المداري'
      ],
      en: [
        'Average Earth-Moon Distance: 384,400 km (~238,855 miles)',
        'Synodic Month Duration: 29 days, 12 hours, 44 minutes',
        'Orbital Speed: ~1.022 km/s',
        'Tidal Locking: The Moon is tidally locked, presenting the same hemisphere toward Earth'
      ],
      fr: [
        'Distance moyenne Terre-Lune : 384 400 km',
        'Durée du mois synodique : 29 jours, 12 heures et 44 minutes',
        'Vitesse orbitale : ~1,022 km/s',
        'Verrouillage gravitationnel : La Lune présente toujours la même face à la Terre'
      ]
    },
    specs: {
      diameter: '3,474.8 km',
      mass: '7.342 × 10²² kg (0.0123 Earths)',
      orbitalPeriod: '27.32 days (Sidereal) / 29.53 days (Synodic)',
      distance: '384,400 km from Earth'
    },
    image: 'https://images.unsplash.com/photo-1522030299830-16b8d3d049fe?q=80&w=1600&auto=format&fit=crop',
    imageCaption: {
      ar: 'هلال مضيء يعكس ضوء الشمس في سماء ليلية ساحرة مع تضاريس القمر الدقيقة',
      en: 'Luminous waxing crescent reflecting sunlight, displaying cratered lunar maria in deep twilight',
      fr: 'Croissant de lune étincelant révélant les reliefs et mers lunaires'
    },
    imageCredit: 'NASA Scientific Visualization Studio / LRO Mission',
    sources: [
      { title: 'NASA Lunar Reconnaissance Orbiter (LRO) Atlas', url: 'https://lunar.gsfc.nasa.gov' },
      { title: 'Astronomical Almanac for the Year 2026' }
    ],
    relatedQuranVerseId: 'verse-orbits-33',
    lastUpdated: '2026-03-23',
    isApproved: true,
    readingTimeMin: 5,
    views: 4320,
    likes: 388
  },
  {
    id: 'reflections-protected-canopy-magnetosphere',
    title: {
      ar: 'الرياح الشمسية والمجال المغناطيسي للأرض: السقف المحفوظ والحماية الكونية',
      en: 'Solar Winds & Earth Magnetosphere: The Science of the Protected Canopy',
      fr: 'Vents Solaires et Magnétosphère Terrestre : Le Ciel comme Toit Protecteur'
    },
    category: 'reflections',
    summary: {
      ar: '﴿وَجَعَلْنَا السَّمَاءَ سَقْفاً مَّحْفُوظاً﴾ — كيف يحمي الغلاف الجوي والأحزمة المغناطيسية كوكب الأرض من العواصف الشمسية القاتلة والأشعة الكونية؟',
      en: 'A contemplation of Earth’s double armor: the Van Allen radiation belts and the atmospheric ozone barrier deflecting lethal solar coronal ejections and cosmic rays.',
      fr: 'Une réflexion sur le double bouclier terrestre : la magnétosphère et l’atmosphère protégeant la vie des particules cosmiques mortelles.'
    },
    introduction: {
      ar: 'الفضاء ليس فراغاً وادعاً، بل هو بيئة قاسية تعج بالأشعة الكونية القاتلة والجسيمات المشحونة المتدفقة من الشمس بسرعات تفوق ملايين الكيلومترات في الساعة.',
      en: 'Space is not a benign void; it is a violent arena inundated by relativistic cosmic rays and relentless solar wind streams moving at millions of kilometers per hour.',
      fr: 'L’espace est baigné de radiations mortelles et de vents solaires violents filant à des millions de km/h.'
    },
    contentSimple: {
      ar: 'لو نزعنا الغلاف الجوي والمجال المغناطيسي عن كوكب الأرض لدقيقة واحدة، لتبخرت الحياة بأكملها فوراً! في قلب كوكبنا حديد منصهر يدور باستمرار مولداً درعاً مغناطيسياً عملاقاً (المغنيتوسفير) يمتد لعشرات آلاف الكيلومترات في الفضاء. هذا الدرع يعترض الرياح الشمسية القاتلة ويحرفها نحو القطبين لتتحول إلى أضواء الشفق القطبي الساحرة (الأورورا). وفوق ذلك، تمتص طبقة الأوزون الأشعة فوق البنفسجية الحارقة، ويحرق الغلاف الجوي ملايين النيازك يومياً قبل أن تصل إلينا.',
      en: 'Without Earth’s geomagnetic shield and atmosphere, biological life would be incinerated by ionizing radiation. The geodynamo in Earth’s molten iron outer core generates an immense magnetic bubble (the magnetosphere). This cosmic shield deflects lethal coronal mass ejections, funneling charged particles safely toward the poles to form the auroras. Meanwhile, the mesosphere vaporizes meteors and the ozone layer filters ultraviolet rays.',
      fr: 'Sans le champ magnétique et l’atmosphère terrestre, la vie serait anéantie par les radiations ionisantes. Le noyau de fer en fusion produit un bouclier gigantesque qui dévie les tempêtes solaires vers les pôles sous forme d’aurores boréales.'
    },
    contentAdvanced: {
      ar: 'يعمل تأثير الدينامو الجيولوجي (Geodynamo Effect) في اللب الخارجي المنصهر للأرض على توليد ثنائي قطب مغناطيسي مستمر. يشكل هذا المجال أحزمة فان ألين الإشعاعية (Van Allen Radiation Belts) وقوس الصدمة المغناطيسي (Bow Shock) الذي يبعد الرياح الشمسية البلازمية ذات السرعات الفائقة (400 إلى 800 كم/ثانية). بالإضافة إلى ذلك، يحجب الغلاف الجوي الأشعة السينية وغاما، مما يطابق بدقة تعبير ﴿سَقْفاً مَّحْفُوظاً﴾: محفوظ هو نفسه من التبدد، وحافظ لما تحته من أشكال الحياة.',
      en: 'Earth’s magnetosphere interacts with interplanetary magnetic fields (IMF) via magnetic reconnection during solar storms. The Bow Shock compresses solar plasma, shielding the atmosphere from ion stripping (a fate that stripped ancient Mars of its surface water). The term "Saqfan Mahfooza" captures both the self-sustaining integrity of the atmospheric envelope and its shielding function.',
      fr: 'La magnétosphère protège la Terre de l’érosion atmosphérique par le vent solaire, préservant l’eau et l’air indispensables à la biosphère.'
    },
    keyFacts: {
      ar: [
        'سمك الغلاف الجوي الفعال: نحو 100 كم (خط كارمان) ويمتد لآلاف الكيلومترات',
        'امتداد الذيل المغناطيسي للأرض: أكثر من 6 ملايين كيلومتر في الفضاء',
        'كتلة النيازك المحروقة يومياً: ما بين 50 إلى 100 طن من الغبار والصخور تحترق كشهب',
        'سرعة الرياح الشمسية: تتراوح بين 300 و800 كم/ثانية'
      ],
      en: [
        'Atmospheric Boundary: ~100 km (Kármán line), extending into exosphere',
        'Magnetotail Expanse: Extends over 6 million km into deep space',
        'Daily Meteor Interception: 50 to 100 metric tons of space debris burned as meteors',
        'Solar Wind Velocity: 300 to 800 km/second'
      ],
      fr: [
        'Limite de l’atmosphère : ~100 km (ligne de Kármán)',
        'Extension de la queue magnétique : plus de 6 millions de km',
        'Météores interceptés : 50 à 100 tonnes de débris brûlés chaque jour',
        'Vitesse du vent solaire : 300 à 800 km/s'
      ]
    },
    specs: {
      diameter: 'Magnetosphere: 65,000 km day-side / 6,000,000 km tail',
      composition: 'Atmosphere: 78% N₂, 21% O₂, 0.9% Ar, 0.04% CO₂',
      temperature: 'From -90°C (Mesopause) to 15°C (Surface average)'
    },
    image: 'https://images.unsplash.com/photo-1517976487507-5b3648889aa0?q=80&w=1600&auto=format&fit=crop',
    imageCaption: {
      ar: 'أضواء الشفق القطبي الخضراء المتوهجة ترقص في السماء نتيجة تفاعل المجال المغناطيسي مع الجسيمات الشمسية',
      en: 'Aurora borealis ribbons glowing green as Earth geomagnetic field guides solar particles into upper atmosphere',
      fr: 'Aurore boréale étincelante née de la rencontre entre le vent solaire et le champ magnétique terrestre'
    },
    imageCredit: 'NASA / NOAA Space Weather Prediction Center',
    sources: [
      { title: 'NASA Heliophysics: Understanding Earth Space Environment', url: 'https://science.nasa.gov/heliophysics' },
      { title: 'NOAA Space Weather Prediction Center' },
      { title: 'الجامع لأحكام القرآن - القرطبي (سورة الأنبياء : 32)' }
    ],
    relatedQuranVerseId: 'verse-orbits-33',
    lastUpdated: '2026-03-25',
    isApproved: true,
    readingTimeMin: 6,
    views: 5120,
    likes: 476
  }
];

export const initialQuranStudies: QuranVerseStudy[] = [
  {
    id: 'verse-expanding-47',
    surah: {
      ar: 'سورة الذاريات',
      en: 'Surah Adh-Dhariyat',
      fr: 'Sourate Adh-Dhariyat'
    },
    surahNumber: 51,
    ayahNumber: 47,
    arabicText: 'وَالسَّمَاءَ بَنَيْنَاهَا بِأَيْدٍ وَإِنَّا لَمُوسِعُونَ',
    translation: {
      en: 'And the heaven We constructed with strength, and indeed, We are [its] expander.',
      fr: 'Le ciel, Nous l’avons construit par Notre puissance et Nous l’élargissons constamment.'
    },
    classicalTafsir: {
      source: 'تفسير ابن كثير (المتوفى 774هـ) وتفسير السعدي',
      text: 'قال ابن كثير: "أي: جعلناها سقفاً محفوظاً رفيعاً، (بِأَيْدٍ) أي: بقوة وقدرة، (وَإِنَّا لَمُوسِعُونَ) أي: قد وسعنا أرجاءها ورفعناها بغير عمد حتى استقلت كما هي". وقال العلامة السعدي: "أي: بنينَا السماءَ بقوةٍ وعظمةٍ فائقة، وإنا لموسعون لأرجائها ونواحيها بقدرتنا وسلطاننا".'
    },
    modernScientificContext: {
      ar: 'في عام 1929، اكتشف عالم الفلك الأمريكي إدوين هابل أن المجرات تتباعد عنا في جميع الاتجاهات، وأن سرعة التباعد تتناسب طردياً مع المسافة (قانون هابل). أثبت علم الكونيات الحديث أن نسيج الزمكان ذاته يتمدد ويتسع باستمرار، بل ويتسارع هذا التوسع بفعل الطاقة المظلمة.',
      en: 'In 1929, Edwin Hubble observed that distant galaxies recede in all directions with velocity proportional to distance. Modern relativistic cosmology confirms that the metric of spacetime itself is continuously expanding, an expansion currently accelerating due to dark energy.',
      fr: 'En 1929, Edwin Hubble a établi que les galaxies s’éloignent les unes des autres proportionnellement à leur distance. La cosmologie moderne confirme que le tissu spatio-temporel est en expansion constante et accélérée.'
    },
    contemplationNote: {
      ar: 'يلاحظ المتأمل اللطافة البلاغية في صيغة اسم الفاعل (لَمُوسِعُونَ) التي تفيد الثبوت والاتساع المستمر في اللغة العربية. ومع دلالة السعة والقوة في تفسير السلف، فإن التوافق الدلالي بين لفظ التوسيع واكتشاف تمدد الفضاء يثير في نفس المؤمن عظمة الخالق ودقة بيانه.',
      en: 'The active participle structure (lamūsi‘ūn) signifies ongoing capacity and continuous expansion in classical Arabic linguistics. Without forcing modern physics onto the Quranic text, the harmonious resonance invites profound reflection upon the Creator’s majesty.',
      fr: 'L’emploi de la forme active souligne la continuité et l’immensité en langue arabe. Cette résonance linguistique avec la réalité physique de l’expansion invite à une méditation sereine sur la puissance créatrice divine.'
    },
    methodologicalGuideline: {
      ar: 'تنبيه منهجي أصيل: الآية الكريمة تتحدث في أصلها عن عظمة قدرة الله وبنائه وسعته، ويجب الحذر من الادعاء بأن القرآن الكريم كتاب فيزياء فلكية، بل هو كتاب هداية وتوحيد. التفسير الشرعي هو الأصل، والتأمل العلمي استئناس وتفكر مشروع لا يلغي دلالات اللغة العربية الرصينة.',
      en: 'Methodological rule: The verse primarily proclaims divine omnipotence and cosmic majesty. The Quran is a book of spiritual guidance and signposts, not a technical astrophysics textbook. Scientific contemplation is an enriching reflection, not a dogmatic substitute for linguistic exegesis.',
      fr: 'Règle méthodologique : Ce verset proclame d’abord la puissance créatrice. Le Coran est un livre de guidance spirituelle, non un manuel d’astrophysique. La réflexion scientifique est une méditation noble sans extrapolation excessive.'
    },
    sources: [
      'تفسير القرآن العظيم - الحافظ ابن كثير',
      'تيسير الكريم الرحمن في تفسير كلام المنان - الشيخ عبد الرحمن السعدي',
      'NASA Hubble Space Telescope Cosmology Archives',
      'Planck Satellite 2018 Cosmological Parameters'
    ]
  },
  {
    id: 'verse-origin-30',
    surah: {
      ar: 'سورة الأنبياء',
      en: 'Surah Al-Anbiya',
      fr: 'Sourate Al-Anbiya'
    },
    surahNumber: 21,
    ayahNumber: 30,
    arabicText: 'أَوَلَمْ يَرَ الَّذِينَ كَفَرُوا أَنَّ السَّمَاوَاتِ وَالْأَرْضَ كَانَتَا رَتْقًا فَفَتَقْنَاهُمَا وَجَعَلْنَا مِنَ الْمَاءِ كُلَّ شَيْءٍ حَيٍّ أَفَلَا يُؤْمِنُونَ',
    translation: {
      en: 'Have those who disbelieved not considered that the heavens and the earth were a joined entity, and We separated them and made from water every living thing? Then will they not believe?',
      fr: 'Ceux qui ont mécru n’ont-ils pas vu que les cieux et la terre formaient une masse compacte, puis Nous les avons séparés, et que Nous avons fait de l’eau toute chose vivante ? Ne croiront-ils donc pas ?'
    },
    classicalTafsir: {
      source: 'تفسير الطبري (جامع البيان) وتفسير ابن كثير',
      text: 'روى ابن جرير الطبري عن ابن عباس رضي الله عنهما والحسن وقتادة: "كانت السماوات والأرض ملتئمتين شيئاً واحداً ملتصقتين، ففتق الله بينهما ففصل السماء عن الأرض". والرتق في لسان العرب: هو الشيء الملتئم المتماسك ضد الفتق الذي هو الشق والفصل.'
    },
    modernScientificContext: {
      ar: 'يقضي علم الكونيات الحديث والفيزياء الفلكية بأن الكون بأسره كان في بدايته الأولى قبل نحو 13.8 مليار سنة متجمعاً في حالة أولية واحدة متناهية الصغر والكثافة والحرارة (التفرد الأولي - Gravitational Singularity)، ثم حدث التوسع الأولي الفائق لتنفصل قوى الطبيعة وتتشكل المادة والفضاء.',
      en: 'Cosmology dictates that all matter, energy, and spacetime were compacted into an extraordinarily hot, dense singularity at the primordial epoch ~13.8 billion years ago. The ensuing metric expansion partitioned fundamental forces and differentiated matter into cosmic structures.',
      fr: 'La physique contemporaine démontre que l’univers primordial était concentré en une singularité initiale d’énergie et de densité extrêmes avant que l’expansion ne différencie l’espace et les structures cosmiques.'
    },
    contemplationNote: {
      ar: 'التطابق المفهومي بين لفظ (الرَّتْق) الذي يعني الالتئام والوحدة الجامعة، ولفظ (الفَتْق) الذي يفيد الانفصال والتمدد، يعكس دقة التصوير القرآني لوحدة الأصل الكوني وانبثاق المادة والماء كعصب لظهور الحياة.',
      en: 'The conceptual dichotomy between ratq (compact, welded cohesion) and fatq (cleaving asunder, differentiation) beautifully conveys the fundamental unity of cosmic origins followed by diversification and the aqueous basis of life.',
      fr: 'Le contraste entre le terme "ratq" (cohésion unifiée) et "fatq" (séparation créatrice) résonne avec la genèse de l’univers et l’origine aquatique universelle de toute biologie.'
    },
    methodologicalGuideline: {
      ar: 'وجوب التفريق الصارم بين الحقائق التجريبية القطعية والنظريات الفيزيائية القابلة للمراجعة. لا نقول إن الآية تثبت تفاصيل نظرية الانفجار العظيم بنماذجها الرياضية، بل نرى في المعنى اللغوي القرآني إشارة معجزة إلى وحدة البداية الكونية.',
      en: 'Strict scientific demarcation: Mathematical cosmological models are subject to continuous refinement. We do not claim the Quran proves modern theoretical mechanics, but we contemplate the profound linguistic alignment regarding cosmic origin unity.',
      fr: 'Démarcation méthodologique : Les modèles physiques évoluent. Nous évitons d’affirmer dogmatiquement que le verset valide une équation précise, mais nous admirons l’harmonie conceptuelle.'
    },
    sources: [
      'جامع البيان عن تأويل آي القرآن - الإمام الطبري',
      'تفسير القرآن العظيم - ابن كثير',
      'The First Three Minutes - Steven Weinberg',
      'Astrobiology: Water and Life in the Universe (NASA)'
    ]
  },
  {
    id: 'verse-orbits-33',
    surah: {
      ar: 'سورة الأنبياء',
      en: 'Surah Al-Anbiya',
      fr: 'Sourate Al-Anbiya'
    },
    surahNumber: 21,
    ayahNumber: 33,
    arabicText: 'وَهُوَ الَّذِي خَلَقَ اللَّيْلَ وَالنَّهَارَ وَالشَّمْسَ وَالْقَمَرَ كُلٌّ فِي فَلَكٍ يَسْبَحُونَ',
    translation: {
      en: 'And it is He who created the night and the day and the sun and the moon; all [heavenly bodies] in an orbit are swimming.',
      fr: 'Et c’est Lui qui a créé la nuit et le jour, le soleil et la lune ; chacun voguant dans une orbite.'
    },
    classicalTafsir: {
      source: 'تفسير ابن عطية والقرطبي وابن كثير',
      text: 'قال ابن عباس وغيره من السلف: "في فلك يدورون مثل فلكة المغزل". والسباحة في اللغة: الجري السريع والانسحاب بسلاسة في المائع. أي: يدور كل واحد من الشمس والقمر وسائر الكواكب في مساره الخاص بحركة منتظمة لا تصادم فيها.'
    },
    modernScientificContext: {
      ar: 'حتى قرون قريبة، كان الاعتقاد السائد أن الشمس ثابتة في مركز الكون (نموذج كوبرنيكوس). لكن علم الفلك الحديث أثبت أن الشمس تجري وتسبح في مدار مهيب حول مركز مجرة درب التبانة بسرعة تقارب 828,000 كم/ساعة، كما يسبح القمر حول الأرض والأرض حول الشمس في مدارات إهليلجية محكمة.',
      en: 'For centuries, heliocentrism posited that the Sun was static at the center of the cosmos. Modern astrophysics proved that the Sun itself orbits the galactic center of the Milky Way at ~828,000 km/h, while planets and moons trace elliptical orbits in space.',
      fr: 'Contrairement au modèle héliocentrique ancien qui supposait un Soleil immobile, l’astrophysique moderne a démontré que le Soleil orbite autour du centre galactique à ~828 000 km/h dans une trajectoire ondulatoire.'
    },
    contemplationNote: {
      ar: 'استعمال القرآن للفظ (يَسْبَحُونَ) بصيغة الجمع للعاقل والتشبيه بالحركة السلسة في السائل يعبر بدقة مذهلة عن حركة الأجرام السماوية في نسيج الزمكان الفضائي المنساب دون مقاومة احتكاكية هوائية.',
      en: 'The Quranic verb yasbahūn evokes fluid, frictionless gliding through an ocean of spacetime, capturing the orbital equilibrium of celestial mechanics with breathtaking poetic elegance.',
      fr: 'Le verbe yasbahūn évoque une navigation fluide et sans friction au sein de la courbure spatio-temporelle, illustrant avec poésie l’équilibre des mécaniques célestes.'
    },
    methodologicalGuideline: {
      ar: 'اللفظ القرآني يظل أشمل وأوسع من أي نموذج فلكي محدد، والتأمل في انتظام المدارات يقود القلب إلى الإيمان بحكمة الخالق وضبطه لنظام الوجود.',
      en: 'The sacred text remains transcendent and timeless. Contemplation of orbital precision directs the heart toward awe at the divine governance of the cosmos.',
      fr: 'Le texte sacré transcende les époques. La contemplation des orbites célestes nourrit l’émerveillement face à l’ordre cosmique.'
    },
    sources: [
      'تفسير الجامع لأحكام القرآن - الإمام القرطبي',
      'تفسير المحرر الوجيز - ابن عطية الأندلسي',
      'NASA Solar System Dynamics Group',
      'Keplerian Orbit Mechanics (Celestial Mechanics)'
    ]
  },
  {
    id: 'verse-tariq-1',
    surah: {
      ar: 'سورة الطارق',
      en: 'Surah At-Tariq',
      fr: 'Sourate At-Tariq'
    },
    surahNumber: 86,
    ayahNumber: 1,
    arabicText: 'وَالسَّمَاءِ وَالطَّارِقِ * وَمَا أَدْرَاكَ مَا الطَّارِقُ * النَّجْمُ الثَّاقِبُ',
    translation: {
      en: 'By the sky and the night comer. And what can make you know what is the night comer? It is the piercing star.',
      fr: 'Par le ciel et par l’astre nocturne. Et qui te dira ce qu’est l’astre nocturne ? C’est l’étoile qui perce.'
    },
    classicalTafsir: {
      source: 'تفسير ابن كثير وتفسير الشوكاني (فتح القدير)',
      text: 'قال ابن كثير: "يقسم تعالى بالسماء وما جعل فيها من الكواكب النيرة، (وَالطَّارِقِ) كل ما أتاك ليلاً فهو طارق، (النَّجْمُ الثَّاقِبُ) قال ابن عباس: المضيء الذي يثقب نوره الظلام فيحرقه ويخرقه".'
    },
    modernScientificContext: {
      ar: 'في عام 1967، اكتشفت عالمة الفلك جوسلين بيل نجوماً نيوترونية فائقة الكثافة تدور حول نفسها بسرعة هائلة تطلق نبضات كهرومغناطيسية منتظمة تشبه دقات المطرقة السريعة تسمى "النجوم النابضة" (Pulsars). هذه النجوم تثقب الفضاء بإشعاعات غاما والأشعة السينية ذات الطاقة الخارقة.',
      en: 'In 1967, Jocelyn Bell Burnell discovered pulsars—ultra-dense rotating neutron stars that emit rhythmic radio pulses resembling precise cosmic tapping or hammer knocks, whose relativistic beams pierce interstellar space with immense energy.',
      fr: 'En 1967, la découverte des pulsars a révélé des étoiles à neutrons ultra-denses émettant des impulsions régulières comparables à des battements rythmés et perçant l’espace de jets électromagnétiques intenses.'
    },
    contemplationNote: {
      ar: 'بينما فسّر السلف الثقب بنفاذ الضوء الشديد في حلكة الليل، فإن اكتشاف النجوم النابضة التي تطرق الفضاء بإشاراتها النبضية وتثقب الأشعة بطاقتها العالية يفتح أفقاً بديعاً للتأمل العلمي الموثق دون أن نجزم بأن الآية حكر على هذا الاكتشاف وحده.',
      en: 'While classical scholars interpreted "piercing" as intense luminous penetration of darkness, modern discoveries of pulsating neutron stars offer a stimulating analogy for contemplation without dogmatically restricting the verse to modern terminology.',
      fr: 'Les exégètes classiques ont perçu la clarté perçant la nuit. La découverte moderne des pulsars pulsant à des cadences millimétriques enrichit notre contemplation sans restreindre le texte sacré.'
    },
    methodologicalGuideline: {
      ar: 'عدم الجزم بأن "الطارق" هو النجم النيوتروني النابض حصراً؛ فالألفاظ القرآنية عامة تحتمل كل نجم مضيء ثاقب للظلمة، وذكر النجوم النابضة يأتي على سبيل التقريب والتأمل لا التفسير الملزم.',
      en: 'Methodological caution: We must never assert that "At-Tariq" is exclusively a neutron pulsar. Quranic phraseology encompasses all luminous stars piercing the nocturnal veil; mentioning pulsars serves as reflective analogy, not binding dogma.',
      fr: 'Prudence herméneutique : Nous ne réduisons pas le verset aux pulsars. L’expression s’applique à toute étoile perçant les ténèbres, la science moderne offrant un parallèle contemplatif.'
    },
    sources: [
      'فتح القدير - الإمام الشوكاني',
      'تفسير القرآن العظيم - ابن كثير',
      'Cambridge Astrophysics: Pulsar Astronomy (Lyne & Graham-Smith)'
    ]
  },
  {
    id: 'verse-iron-25',
    surah: {
      ar: 'سورة الحديد',
      en: 'Surah Al-Hadid',
      fr: 'Sourate Al-Hadid'
    },
    surahNumber: 57,
    ayahNumber: 25,
    arabicText: 'وَأَنزَلْنَا الْحَدِيدَ فِيهِ بَأْسٌ شَدِيدٌ وَمَنَافِعُ لِلنَّاسِ',
    translation: {
      en: 'And We sent down iron, wherein is great military might and benefits for the people.',
      fr: 'Et Nous avons fait descendre le fer, dans lequel il y a une force redoutable, ainsi que des utilités pour les gens.'
    },
    classicalTafsir: {
      source: 'تفسير ابن كثير وتفسير القرطبي',
      text: 'قال السلف: أَنزلنا الحديد أي خلقناه وهيأناه للعباد، وذكر بعضهم الإنزال من السماء أو من الجبال بالمعنى الحقيقي أو المجازي، وفي لسان العرب الإنزال يأتي بمعنى الخلق والتقدير كقوله (وأنزل لكم من الأنعام ثمانية أزواج).'
    },
    modernScientificContext: {
      ar: 'أثبتت الفيزياء الفلكية والاندماج النووي النجمي (Stellar Nucleosynthesis) أن حرارة وضغط شمسنا وبقية النجوم العادية لا تكفي إطلاقاً لصناعة عنصر الحديد (العدد الذري 26). يتكون الحديد حصرياً في قلوب النجوم العملاقة فائقة الكتلة خلال احتضارها، ثم يُقذف إلى الفضاء عبر انفجارات المستعرات العظمى (Supernovae)، ليصل إلى الأرض عبر النيازك والمذنبات.',
      en: 'Stellar nucleosynthesis proves that normal stars and our Sun lack the energy to forge iron (atomic number 26). Iron nucleosynthesis occurs exclusively within the cores of massive collapsing supergiants and detonating Type Ia/II supernovae, scattering iron across space to seed proto-planetary disks.',
      fr: 'La nucléosynthèse stellaire démontre que le fer (Z=26) ne peut être forgé que lors de la fin de vie d’étoiles massives et lors de cataclysmes de supernovae, avant de pleuvoir sur les planètes naissantes.'
    },
    contemplationNote: {
      ar: 'اللفظ القرآني (وَأَنزَلْنَا) يحمل في طياته دلالة نزول المادة من الفضاء الخارجي إلى الأرض، وهو ما أكدته الفيزياء النووية الفلكية بأن كل ذرة حديد في دمنا وأرضنا قد وُلدت في أعماق نجوم انفجرت ونزلت إلى كوكبنا.',
      en: 'The phrasing "sent down" resonates strikingly with the astrophysical truth that every atom of iron on Earth and within our hemoglobin was forged in distant stellar furnaces and showered down onto planetary crusts.',
      fr: 'L’expression "fait descendre" concorde avec la réalité astrophysique : chaque atome de fer sur Terre provient d’explosions stellaires primordiales qui ont ensemencé notre système solaire.'
    },
    methodologicalGuideline: {
      ar: 'يظل المعنى اللغوي (الخلق والتقدير) معتبراً شرعاً، وتوافق المعنى الحرفي مع الإنزال الكوني الفلكي يمثل إشراقة علمية تدعو للتعجب والاستبصار الإيماني.',
      en: 'Both linguistic exegesis (creation and provisioning) and physical contemplation (extraterrestrial nucleosynthetic origin) enrich our appreciation of divine wisdom.',
      fr: 'Le sens allégorique (création et pourvoyance) et le sens physique (origine cosmique) s’enrichissent mutuellement sans rupture exégétique.'
    },
    sources: [
      'تفسير ابن كثير',
      'Burbidge, Burbidge, Fowler & Hoyle (B²FH paper on stellar nucleosynthesis)',
      'NASA Cosmic Origins Program'
    ]
  }
];

export const initialCelestialBodies: CelestialBody[] = [
  {
    id: 'sun',
    name: { ar: 'الشمس', en: 'The Sun', fr: 'Le Soleil' },
    type: 'star',
    diameterKm: 1392700,
    massKg: '1.989 × 10³⁰ kg',
    distanceFromSunKm: 0,
    distanceLightYears: 0,
    surfaceTempCelsius: 5500,
    rotationPeriodHours: 648,
    color: '#F59E0B',
    description: {
      ar: 'نجم قزم أصفر يشكل 99.86% من كتلة المجموعة الشمسية، ويمد كوكبنا بالطاقة والضوء اللازمين للحياة.',
      en: 'A yellow dwarf G-type main sequence star comprising 99.86% of the solar system’s mass, providing life-sustaining energy.',
      fr: 'Étoile naine jaune concentrant 99,86 % de la masse du système solaire, source indispensable d’énergie et de vie.'
    },
    image: 'https://images.unsplash.com/photo-1579202673506-ca3ce28943ef?q=80&w=800&auto=format&fit=crop',
    quranicReflection: {
      verseText: 'وَالشَّمْسُ تَجْرِي لِمُسْتَقَرٍّ لَّهَا ذَٰلِكَ تَقْدِيرُ الْعَزِيزِ الْعَلِيمِ',
      surah: { ar: 'سورة يس', en: 'Surah Ya-Sin', fr: 'Sourate Ya-Sin' },
      surahNumber: 36,
      ayahNumber: 38,
      tafsirSummary: {
        ar: 'قال ابن كثير: أي تسير في فلكها المقدر لها بقدرة الله، لا تتعداه ولا تنقص عنه، وتسبح مع سائر توابعها في مجرة درب التبانة.',
        en: 'Ibn Kathir commented: It journeys in its decreed orbit by divine omnipotence, neither straying nor falling behind, swimming with its planetary retinue.',
        fr: 'Ibn Kathir commente : Elle chemine sur son orbite assignée par la puissance divine, naviguant avec son cortège planétaire.'
      },
      reflection: {
        ar: 'تأمل في حركة الشمس بسرعة مذهلة تبلغ ~828,000 كم/ساعة في مدار حلزوني مهيب حول مركز المجرة، دون أي اضطراب في جاذبيتها المحكمة.',
        en: 'Reflect upon the Sun’s orbital speed of ~828,000 km/h tracing a grand spiral around the galactic center while anchoring our worlds.',
        fr: 'Méditez sur la course du Soleil à ~828 000 km/h autour du centre galactique, maintenant l’équilibre gravitationnel absolu.'
      }
    }
  },
  {
    id: 'mercury',
    name: { ar: 'عطارد', en: 'Mercury', fr: 'Mercure' },
    type: 'planet',
    diameterKm: 4879,
    massKg: '3.30 × 10²³ kg',
    distanceFromSunKm: 57900000,
    surfaceTempCelsius: 167,
    rotationPeriodHours: 1407.6,
    orbitalPeriodDays: 88,
    moonsCount: 0,
    color: '#9CA3AF',
    description: {
      ar: 'أصغر كواكب المجموعة الشمسية وأقربها إلى الشمس، سطحه مليء بالفوهات المشابهة لسطح القمر.',
      en: 'The smallest planet and closest to the Sun, marked by heavily cratered terrain resembling Earth’s Moon.',
      fr: 'La plus petite planète et la plus proche du Soleil, couverte de cratères d’impact.'
    },
    image: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?q=80&w=800&auto=format&fit=crop',
    quranicReflection: {
      verseText: 'فَلَا أُقْسِمُ بِالْخُنَّسِ * الْجَوَارِ الْكُنَّسِ',
      surah: { ar: 'سورة التكوير', en: 'Surah At-Takwir', fr: 'Sourate At-Takwir' },
      surahNumber: 81,
      ayahNumber: 15,
      tafsirSummary: {
        ar: 'قال علي بن أبي طالب وابن عباس: هي الكواكب السيارة التي تخنس وتجري في أفلاكها وتكنس في مغيبها. وعطارد أسرعها جرياناً ودوراناً حول الشمس.',
        en: 'Ali ibn Abi Talib and Ibn Abbas explained: These are the orbiting planets that withdraw, glide, and disappear. Mercury is the swiftest in its revolution.',
        fr: 'Les compagnons expliquent qu’il s’agit des planètes célestes qui glissent et s’éclipsent. Mercure est la plus rapide de toutes.'
      },
      reflection: {
        ar: 'سرعة عطارد الفائقة (47 كم/ثانية) ودورته المكتملة في 88 يوماً فقط تظهر تناسق القوانين الميكانيكية الدقيقة التي أقامها الخالق.',
        en: 'Mercury’s orbital velocity (47 km/s) completing a full year in merely 88 days displays the clockwork precision of divine astrophysics.',
        fr: 'La vitesse orbitale fulgurante de Mercure (47 km/s) bouclant son année en 88 jours illustre la perfection des lois universelles.'
      }
    }
  },
  {
    id: 'venus',
    name: { ar: 'الزهرة', en: 'Venus', fr: 'Vénus' },
    type: 'planet',
    diameterKm: 12104,
    massKg: '4.87 × 10²⁴ kg',
    distanceFromSunKm: 108200000,
    surfaceTempCelsius: 464,
    rotationPeriodHours: -5832.5,
    orbitalPeriodDays: 224.7,
    moonsCount: 0,
    color: '#FBBF24',
    description: {
      ar: 'أشد كواكب المجموعة حرارة بسبب غلافه الجوي الكثيف الغني بثاني أكسيد الكربون وظاهرة الاحتباس الحراري الجامحة.',
      en: 'The hottest planet in our solar system, trapped in a runaway greenhouse effect beneath thick toxic clouds.',
      fr: 'La planète la plus brûlante du système solaire en raison d’un effet de serre extrême.'
    },
    image: 'https://images.unsplash.com/photo-1614728423169-3f65fd722b7e?q=80&w=800&auto=format&fit=crop',
    quranicReflection: {
      verseText: 'إِنَّا زَيَّنَّا السَّمَاءَ الدُّنْيَا بِزِينَةٍ الْكَوَاكِبِ',
      surah: { ar: 'سورة الصافات', en: 'Surah As-Saffat', fr: 'Sourate As-Saffat' },
      surahNumber: 37,
      ayahNumber: 6,
      tafsirSummary: {
        ar: 'قال ابن كثير: جعل الله الكواكب زينة لسمائنا الدنيا نراها متلألئة نيرة، وكوكب الزهرة هو ألمع أجرام السماء قاطبة بعد الشمس والقمر.',
        en: 'Ibn Kathir wrote: Allah adorned the lowest heaven with radiant planets; Venus is the most brilliant beacon in the night sky after the Sun and Moon.',
        fr: 'Ibn Kathir note : Dieu a embelli le ciel terrestre d’astres étincelants ; Vénus est le joyau le plus lumineux après le Soleil et la Lune.'
      },
      reflection: {
        ar: 'بهاء لمعان الزهرة في الأفق الغربي والشرقي كدرة وضاءة يعكس عظمة زينة السماء، في حين يخفي باطنها درساً في قسوة الاحتباس الحراري الحارق.',
        en: 'The dazzling brilliance of Venus appearing as the evening star showcases celestial adornment, while its runaway heat holds deep scientific lessons.',
        fr: 'La splendeur de l’étoile du berger sublime la voûte nocturne, tandis que son atmosphère extrême illustre l’effet de serre poussé à son paroxysme.'
      }
    }
  },
  {
    id: 'earth',
    name: { ar: 'الأرض', en: 'Earth', fr: 'La Terre' },
    type: 'planet',
    diameterKm: 12742,
    massKg: '5.97 × 10²⁴ kg',
    distanceFromSunKm: 149600000,
    surfaceTempCelsius: 15,
    rotationPeriodHours: 24,
    orbitalPeriodDays: 365.25,
    moonsCount: 1,
    color: '#3B82F6',
    description: {
      ar: 'واحتنا الكونية الفريدة، الكوكب الوحيد المعروف حتى الآن الذي يحتضن الحياة وبحار الماء السائل وغلافاً يحمي من الإشعاع.',
      en: 'Our cosmic sanctuary, the only confirmed harbor of life in the universe, blessed with liquid oceans and atmosphere.',
      fr: 'Notre oasis cosmique, unique monde connu abritant des océans d’eau liquide et la vie.'
    },
    image: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=800&auto=format&fit=crop',
    quranicReflection: {
      verseText: 'وَالْأَرْضَ وَضَعَهَا لِلْأَنَامِ * فِيهَا فَاكِهَةٌ وَالنَّخْلُ ذَاتُ الْأَكْمَامِ',
      surah: { ar: 'سورة الرحمن', en: 'Surah Ar-Rahman', fr: 'Sourate Ar-Rahman' },
      surahNumber: 55,
      ayahNumber: 10,
      tafsirSummary: {
        ar: 'قال السعدي وابن كثير: أي أرسى الأرض وهيأها واستقرها لتكون مهداً وموطناً ملائماً لمعاش الأنام وحياتهم بما أودع فيها من الأسباب والمنافع.',
        en: 'Al-Saadi and Ibn Kathir noted: He established the Earth and fine-tuned its conditions to be a hospitable cradle for living creatures.',
        fr: 'Les commentateurs soulignent que la Terre a été minutieusement disposée et tempérée pour accueillir la vie et pourvoir aux besoins de l’humanité.'
      },
      reflection: {
        ar: 'موقع الأرض المثالي في النطاق الصالح للحياة (Goldilocks Zone)، محاطة بغلاف جوي حامٍ ودرع مغناطيسي يقف سداً منيعاً أمام رياح الفضاء القاتلة.',
        en: 'Earth’s exquisite tuning in the circumstellar habitable zone, shielded by magnetosphere and atmosphere, stands as a supreme sign of providence.',
        fr: 'L’ajustement parfait de la Terre dans la zone habitable, protégée par son bouclier magnétique et atmosphérique, témoigne d’une bienveillance sublime.'
      }
    }
  },
  {
    id: 'mars',
    name: { ar: 'المريخ', en: 'Mars', fr: 'Mars' },
    type: 'planet',
    diameterKm: 6779,
    massKg: '6.42 × 10²³ kg',
    distanceFromSunKm: 227900000,
    surfaceTempCelsius: -65,
    rotationPeriodHours: 24.6,
    orbitalPeriodDays: 687,
    moonsCount: 2,
    color: '#EF4444',
    description: {
      ar: 'الكوكب الأحمر الغني بأكسيد الحديد، موطن أعلى بركان في المجموعة الشمسية (جبل أوليمبوس بارتفاع 21 كم).',
      en: 'The Red Planet rich in iron oxide, hosting Olympus Mons, the tallest volcano in the solar system (21 km high).',
      fr: 'La planète rouge riche en oxydes de fer, abritant Olympus Mons, le plus haut volcan du système solaire (21 km).'
    },
    image: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?q=80&w=800&auto=format&fit=crop',
    quranicReflection: {
      verseText: 'صُنْعَ اللَّهِ الَّذِي أَتْقَنَ كُلَّ شَيْءٍ إِنَّهُ خَبِيرٌ بِمَا تَفْعَلُونَ',
      surah: { ar: 'سورة النمل', en: 'Surah An-Naml', fr: 'Sourate An-Naml' },
      surahNumber: 27,
      ayahNumber: 88,
      tafsirSummary: {
        ar: 'قال ابن كثير: أي صنع الله العظيم الذي أتقن كل مخلوقاته وأحكم بناءها ودبر حركتها بحكمة بالغة لا يعتريها خلل.',
        en: 'Ibn Kathir explained: The magnificent craftsmanship of Allah who perfected every creation and ordained all celestial motion with flawless wisdom.',
        fr: 'La confection divine parfaite qui régit chaque détail du cosmos avec une rigueur absolue exempte de toute faille.'
      },
      reflection: {
        ar: 'تباين تضاريس المريخ، من أودية وادي مارينير السحيقة إلى جبل أوليمبوس الشامخ، يبرز تنوع الهندسة الجيولوجية لعوالم مجموعتنا الشمسية.',
        en: 'The dramatic terrain of Mars, from the Valles Marineris canyon system to Olympus Mons, showcases the astounding geologic diversity of creation.',
        fr: 'Les reliefs vertigineux de Mars, du canyon de Valles Marineris au volcan Olympus Mons, dévoilent la diversité géologique prodigieuse du système solaire.'
      }
    }
  },
  {
    id: 'jupiter',
    name: { ar: 'المشتري', en: 'Jupiter', fr: 'Jupiter' },
    type: 'planet',
    diameterKm: 139820,
    massKg: '1.898 × 10²⁷ kg',
    distanceFromSunKm: 778500000,
    surfaceTempCelsius: -110,
    rotationPeriodHours: 9.9,
    orbitalPeriodDays: 4333,
    moonsCount: 95,
    color: '#D97706',
    description: {
      ar: 'سيد الكواكب وأضخمها، تزيد كتلته عن ضعفي ونصف مجموع كتل الكواكب الأخرى مجتمعة، ويحمل عاصفة "البقعة الحمراء العظيمة".',
      en: 'The king of planets, exceeding 2.5 times the mass of all other planets combined, famous for its Great Red Spot storm.',
      fr: 'Le géant du système solaire, 2,5 fois plus massif que toutes les autres planètes réunies, avec sa Grande Tache Rouge.'
    },
    image: 'https://images.unsplash.com/photo-1630839437035-dac17da5809f?q=80&w=800&auto=format&fit=crop',
    quranicReflection: {
      verseText: 'وَجَعَلْنَا السَّمَاءَ سَقْفًا مَّحْفُوظًا وَهُمْ عَنْ آيَاتِهَا مُعْرِضُونَ',
      surah: { ar: 'سورة الأنبياء', en: 'Surah Al-Anbiya', fr: 'Sourate Al-Anbiya' },
      surahNumber: 21,
      ayahNumber: 32,
      tafsirSummary: {
        ar: 'قال ابن كثير: أي سقفاً محفوظاً من الاضطراب والسقوط، مسخراً بحفظ الله وتدبيره للأرض وأهلها.',
        en: 'Ibn Kathir noted: A preserved canopy safeguarded against chaos, sustaining habitable conditions for terrestrial life.',
        fr: 'Un dôme céleste préservé de l’effondrement et assurant la pérennité de la vie sur Terre.'
      },
      reflection: {
        ar: 'يلعب المشتري دور "المكنسة الجاذبية"؛ حيث تبتلع كتلته الهائلة المذنبات وتشتت مسارات الكويكبات الخطيرة، حامياً كوكب الأرض من الاصطدامات الكارثية.',
        en: 'Jupiter acts as a gravitational shield; its massive mass deflects comets and stabilizes asteroid paths, safeguarding Earth from cosmic impacts.',
        fr: 'Jupiter agit comme un bouclier gravitationnel protecteur, attirant les comètes et préservant la Terre d’impacts cosmiques dévastateurs.'
      }
    }
  },
  {
    id: 'saturn',
    name: { ar: 'زحل', en: 'Saturn', fr: 'Saturne' },
    type: 'planet',
    diameterKm: 116460,
    massKg: '5.68 × 10²⁶ kg',
    distanceFromSunKm: 1433500000,
    surfaceTempCelsius: -140,
    rotationPeriodHours: 10.7,
    orbitalPeriodDays: 10759,
    moonsCount: 146,
    color: '#EAB308',
    description: {
      ar: 'جوهرة السماء المتوجة بأروع نظام حلقات جليدية في المجموعة الشمسية، ويمتلك 146 قمراً معروفاً بما فيها تيتان.',
      en: 'The jewel of the heavens crowned with magnificent ice rings, orbited by 146 confirmed moons including Titan.',
      fr: 'Le joyau couronné par un spectaculaire système d’anneaux de glace et 146 lunes connues.'
    },
    image: 'https://images.unsplash.com/photo-1614732484003-ef9881555dc3?q=80&w=800&auto=format&fit=crop',
    quranicReflection: {
      verseText: 'الَّذِي خَلَقَ سَبْعَ سَمَاوَاتٍ طِبَاقًا مَّا تَرَىٰ فِي خَلْقِ الرَّحْمَٰنِ مِن تَفَاوُتٍ فَارْجِعِ الْبَصَرَ هَلْ تَرَىٰ مِن فُطُورٍ',
      surah: { ar: 'سورة الملك', en: 'Surah Al-Mulk', fr: 'Sourate Al-Mulk' },
      surahNumber: 67,
      ayahNumber: 3,
      tafsirSummary: {
        ar: 'قال قتادة وابن كثير: أي ما ترى في خلق الله من خلل ولا تباين ولا تنافر، بل كله في غاية الانتظام والجمال والإتقان البديع.',
        en: 'Ibn Kathir commented: You observe no flaw or discrepancy in the creation of the Most Merciful; everything is in sublime harmonic balance.',
        fr: 'Les savants soulignent la perfection harmonieuse de la création exempte de la moindre dissonance ou imperfection.'
      },
      reflection: {
        ar: 'حلقات زحل الجليدية الممتدة لمئات آلاف الكيلومترات بسماكة رقيقة لا تتعدى عشرات الأمتار، تحافظ على مداراتها دون تصادم، شاهدة على بهاء التناسق.',
        en: 'Saturn’s expansive ice rings spanning hundreds of thousands of kilometers yet mere meters thick maintain equilibrium without chaotic collapse.',
        fr: 'Les anneaux majestueux de Saturne s’étendant sur des centaines de milliers de kilomètres dans un équilibre gracieux témoignent d’une harmonie cosmique pure.'
      }
    }
  },
  {
    id: 'uranus',
    name: { ar: 'أورانوس', en: 'Uranus', fr: 'Uranus' },
    type: 'planet',
    diameterKm: 50724,
    massKg: '8.68 × 10²⁵ kg',
    distanceFromSunKm: 2872500000,
    surfaceTempCelsius: -195,
    rotationPeriodHours: -17.2,
    orbitalPeriodDays: 30687,
    moonsCount: 28,
    color: '#06B6D4',
    description: {
      ar: 'عملاق جليدي أزرق مخضر يدور على جنبه بزاوية ميلان شاذة قدرها 98 درجة، ويمتلك أبرد غلاف جوي كوكبي.',
      en: 'A cyan ice giant rotating on its side with an axial tilt of 98 degrees, holding the record for coldest planetary atmosphere.',
      fr: 'Géante de glace bleu-vert tournoyant avec une inclinaison axiale atypique de 98 degrés.'
    },
    image: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?q=80&w=800&auto=format&fit=crop',
    quranicReflection: {
      verseText: 'رَّبُّ السَّمَاوَاتِ وَالْأَرْضِ وَمَا بَيْنَهُمَا الرَّحْمَٰنُ لَا يَمْلِكُونَ مِنْهُ خِطَابًا',
      surah: { ar: 'سورة النبأ', en: 'Surah An-Naba', fr: 'Sourate An-Naba' },
      surahNumber: 78,
      ayahNumber: 37,
      tafsirSummary: {
        ar: 'قال السعدي: هو الرب العظيم الخالق المالك المدبر لكل ما في السماوات والأرض وما بينهما برحمته الواسعة وسلطانه التام وعظمته.',
        en: 'Al-Saadi explained: He is the Supreme Lord, Creator, Sovereign, and Sustainer of the heavens, Earth, and all between them in mercy and majesty.',
        fr: 'Le Seigneur souverain qui gouverne les cieux, la terre et les espaces intermédiaires avec une autorité absolue.'
      },
      reflection: {
        ar: 'ميلان محور أورانوس الاستثنائي (98 درجة) كأنه يتدحرج في مداره، يذكرنا بعظمة التنوع في سنن الكون الفيزيائية التي أقامها مدبر الوجود.',
        en: 'Uranus rolling on its side with a 98° axial tilt reminds the intellect of the vast, varied mechanics orchestrating the celestial spheres.',
        fr: 'L’inclinaison axiale singulière d’Uranus à 98 degrés illustre la diversité stupéfiante des dynamiques célestes à travers le cosmos.'
      }
    }
  },
  {
    id: 'neptune',
    name: { ar: 'نبتون', en: 'Neptune', fr: 'Neptune' },
    type: 'planet',
    diameterKm: 49244,
    massKg: '1.02 × 10²⁶ kg',
    distanceFromSunKm: 4495100000,
    surfaceTempCelsius: -200,
    rotationPeriodHours: 16.1,
    orbitalPeriodDays: 60190,
    moonsCount: 16,
    color: '#2563EB',
    description: {
      ar: 'أبعد كواكب منظومتنا، عملاق أزرق داكن تجتاحه أسرع رياح في المجموعة الشمسية بسرعة تفوق 2,100 كم/ساعة.',
      en: 'The outermost planet, an azure ice titan whipped by supersonic winds surpassing 2,100 km/h.',
      fr: 'Planète la plus lointaine, balayée par des vents supersoniques dépassant 2 100 km/h.'
    },
    image: 'https://images.unsplash.com/photo-1614732484003-ef9881555dc3?q=80&w=800&auto=format&fit=crop',
    quranicReflection: {
      verseText: 'لَّخَلْقُ السَّمَاوَاتِ وَالْأَرْضِ أَكْبَرُ مِنْ خَلْقِ النَّاسِ وَلَٰكِنَّ أَكْثَرَ النَّاسِ لَا يَعْلَمُونَ',
      surah: { ar: 'سورة غافر', en: 'Surah Ghafir', fr: 'Sourate Ghafir' },
      surahNumber: 40,
      ayahNumber: 57,
      tafsirSummary: {
        ar: 'قال ابن كثير: أي إن خلق هذه العوالم الفضائية الهائلة وما فيها من أجرام وسرعات وأبعاد أبلغ وأعظم في القدرة من خلق البشر الضعفاء.',
        en: 'Ibn Kathir commented: The creation of these vast cosmic worlds with their unimaginable expanses is far greater than the creation of mankind.',
        fr: 'Ibn Kathir souligne que la création de ces étendues cosmiques infinies surpasse de loin celle des êtres humains.'
      },
      reflection: {
        ar: 'المسافة الشاسعة لنبتون (4.5 مليار كم) ورياحه الهوجاء الفائقة لسرعة الصوت في صقيع الفضاء السحيق تشهد على اتساع ملكوت السماوات.',
        en: 'Neptune’s extreme distance (4.5 billion km) and supersonic storms in freezing outer space bear witness to the vastness of the cosmic kingdom.',
        fr: 'L’éloignement vertigineux de Neptune (4,5 milliards de km) et ses tempêtes supersoniques témoignent de l’immensité de la création céleste.'
      }
    }
  },
  {
    id: 'betelgeuse',
    name: { ar: 'منكب الجوزاء (Betelgeuse)', en: 'Betelgeuse', fr: 'Bételgeuse' },
    type: 'star',
    diameterKm: 1234000000, // ~887 solar radii
    massKg: '3.38 × 10³¹ kg (~17 M☉)',
    distanceLightYears: 642,
    surfaceTempCelsius: 3200,
    color: '#DC2626',
    description: {
      ar: 'نجم أحمر عملاق فائق في كوكبة الجبار؛ لو وُضع في مركز مجموعتنا الشمسية لابتلع مدارات عطارد والزهرة والأرض والمريخ حتى اقترب من المشتري!',
      en: 'A red supergiant star in Orion. Placed at our solar system’s center, its surface would swallow Mercury, Venus, Earth, and Mars!',
      fr: 'Une supergéante rouge dans Orion. Placée au centre de notre système, elle engloberait les orbites de Mercure, Vénus, la Terre et Mars.'
    },
    image: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=800&auto=format&fit=crop',
    quranicReflection: {
      verseText: 'فَلَا أُقْسِمُ بِمَوَاقِعِ النُّجُومِ * وَإِنَّهُ لَقَسَمٌ لَّوْ تَعْلَمُونَ عَظِيمٌ',
      surah: { ar: 'سورة الواقعة', en: 'Surah Al-Waqi’ah', fr: 'Sourate Al-Waqi’ah' },
      surahNumber: 56,
      ayahNumber: 75,
      tafsirSummary: {
        ar: 'قال ابن كثير: أقسم الله العظيم بمواقع النجوم ومنازلها ومساقطها وأبعادها في السماء، ثم عظم هذا القسم ببيان هيبته وجلاله.',
        en: 'Ibn Kathir noted: Allah swore by the vast positions and celestial stations of the stars, emphasizing the solemn grandeur of this cosmic oath.',
        fr: 'Ibn Kathir note : Dieu a juré par les positions et trajectoires grandioses des étoiles, affirmant la majesté sublime de ce serment cosmique.'
      },
      reflection: {
        ar: 'نجم منكب الجوزاء يبعد عنا 642 سنة ضوئية بحجم يفوق الشمس بمئات الملايين من المرات، ومواقع النجوم وأبعادها الهائلة تجعل قسم القرآن بها ذا وقع مهيب في العقول.',
        en: 'Betelgeuse lies 642 light-years away, dwarfing our Sun by hundreds of millions of times in volume; contemplating its sheer scale illuminates the awe of the Quranic oath.',
        fr: 'Bételgeuse, située à 642 années-lumière et des centaines de millions de fois plus volumineuse que le Soleil, donne une résonance vertigineuse au serment coranique.'
      }
    }
  }
];

export const initialGalleryItems: SpaceGalleryItem[] = [
  {
    id: 'gallery-pillars',
    title: {
      ar: 'أعمدة الخلق بأعين تلسكوب جيمس ويب (NIRCam)',
      en: 'Pillars of Creation via JWST NIRCam',
      fr: 'Les Piliers de la Création par le JWST'
    },
    category: 'nebula',
    imageUrl: 'https://images.unsplash.com/photo-1543722530-d2c3201371e7?q=80&w=1600&auto=format&fit=crop',
    telescope: 'JWST',
    credit: 'NASA, ESA, CSA, STScI',
    description: {
      ar: 'تكشف تفاصيل الأشعة تحت الحمراء القريبة عن النجوم الوليدة الساطعة بلون قرمزي داخل سحب الغاز الباردة في سديم النسر.',
      en: 'Near-infrared detailing reveals young stars blazing within cold dust spires inside the Eagle Nebula.',
      fr: 'Détails en infrarouge proche révélant les étoiles nouveau-nées au cœur des colonnes de gaz froid.'
    },
    releaseDate: '2022-10-19',
    specs: {
      instrument: 'NIRCam (Near-Infrared Camera)',
      distance: '6,500 Light-Years',
      constellation: 'Serpens'
    }
  },
  {
    id: 'gallery-cartwheel',
    title: {
      ar: 'مجرة عجلة العربة (Cartwheel Galaxy)',
      en: 'The Cartwheel Galaxy in Infrared',
      fr: 'La Galaxie de la Roue de Chariot'
    },
    category: 'galaxy',
    imageUrl: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1600&auto=format&fit=crop',
    telescope: 'JWST',
    credit: 'NASA / ESA / STScI',
    description: {
      ar: 'هيكل حلقي ناتج عن اصطدام عنيف عالي السرعة بين مجرة حلزونية كبرى ومجرة أصغر قبل مئات ملايين السنين.',
      en: 'A ring-like structure forged by a high-speed collision between a large spiral galaxy and a smaller companion.',
      fr: 'Structure annulaire forgée par une collision spectaculaire entre deux galaxies.'
    },
    releaseDate: '2022-08-02',
    specs: {
      instrument: 'NIRCam & MIRI Composite',
      distance: '500 Million Light-Years',
      constellation: 'Sculptor'
    }
  },
  {
    id: 'gallery-andromeda',
    title: {
      ar: 'مجرة المرأة المسلسلة (أندروميدا M31)',
      en: 'Andromeda Galaxy (M31) Panoramic View',
      fr: 'Galaxie d’Andromède (M31)'
    },
    category: 'galaxy',
    imageUrl: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=1600&auto=format&fit=crop',
    telescope: 'Hubble',
    credit: 'NASA / ESA Hubble Heritage Team',
    description: {
      ar: 'أكبر مجرة في المجموعة المحلية، تقترب من درب التبانة بسرعة 110 كم/ثانية، ومن المتوقع اندماجهما بعد 4.5 مليار سنة.',
      en: 'Largest galaxy in the Local Group, heading toward our Milky Way at 110 km/s toward a future merger in 4.5 billion years.',
      fr: 'La plus grande galaxie du Groupe Local, filant vers la Voie Lactée à 110 km/s.'
    },
    releaseDate: '2015-01-05',
    specs: {
      instrument: 'Advanced Camera for Surveys (ACS)',
      distance: '2.537 Million Light-Years',
      constellation: 'Andromeda'
    }
  },
  {
    id: 'gallery-carina',
    title: {
      ar: 'المنحدرات الكونية في سديم الجؤجؤ (Carina Nebula)',
      en: 'Cosmic Cliffs in the Carina Nebula',
      fr: 'Les Falaises Cosmiques de la Nébuleuse de la Carène'
    },
    category: 'nebula',
    imageUrl: 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?q=80&w=1600&auto=format&fit=crop',
    telescope: 'JWST',
    credit: 'NASA / ESA / CSA / STScI',
    description: {
      ar: 'جدار مهيب من الغبار النجمي المتوهج ونجوم وليدة تتشكل تحت تأثير الرياح الإشعاعية لنجوم عملاقة شابة.',
      en: 'A scenic landscape of mountains and valleys peppered with glittering stellar nurseries.',
      fr: 'Un panorama saisissant de montagnes de gaz illuminées par de jeunes étoiles massives.'
    },
    releaseDate: '2022-07-12',
    specs: {
      instrument: 'NIRCam',
      distance: '7,600 Light-Years',
      constellation: 'Carina'
    }
  }
];

export const initialQuizQuestions: QuizQuestion[] = [
  {
    id: 'quiz-speed-light',
    category: 'cosmic-distances',
    difficulty: 'easy',
    question: {
      ar: 'كم تبلغ السرعة التقريبية للضوء في الفراغ؟',
      en: 'What is the approximate speed of light in a vacuum?',
      fr: 'Quelle est la vitesse approximative de la lumière dans le vide ?'
    },
    options: {
      ar: ['150,000 كم في الثانية', '300,000 كم في الثانية', '500,000 كم في الثانية', '1,000,000 كم في الثانية'],
      en: ['150,000 km/s', '300,000 km/s', '500,000 km/s', '1,000,000 km/s'],
      fr: ['150 000 km/s', '300 000 km/s', '500 000 km/s', '1 000 000 km/s']
    },
    correctIndex: 1,
    explanation: {
      ar: 'تبلغ سرعة الضوء الدقيقة 299,792.458 كم/ثانية، ويستغرق ضوء الشمس حوالي 8 دقائق و20 ثانية ليصل إلى سطح الأرض.',
      en: 'The exact speed of light is 299,792.458 km/s. Sunlight takes approximately 8 minutes and 20 seconds to reach Earth.',
      fr: 'La vitesse exacte de la lumière est de 299 792,458 km/s. Elle met environ 8 minutes et 20 secondes pour venir du Soleil.'
    },
    scientificReference: 'NIST (National Institute of Standards and Technology)'
  },
  {
    id: 'quiz-universe-age',
    category: 'cosmology-origin',
    difficulty: 'medium',
    question: {
      ar: 'كم يبلغ العمر المقدر للكون وفقاً لأدق قياسات تلسكوب بلانك وإشعاع الخلفية الكونية؟',
      en: 'What is the estimated age of the universe according to Planck satellite measurements?',
      fr: 'Quel est l’âge estimé de l’univers selon les mesures du satellite Planck ?'
    },
    options: {
      ar: ['4.6 مليار سنة', '9.2 مليار سنة', '13.8 مليار سنة', '20.5 مليار سنة'],
      en: ['4.6 billion years', '9.2 billion years', '13.8 billion years', '20.5 billion years'],
      fr: ['4,6 milliards d’années', '9,2 milliards d’années', '13,8 milliards d’années', '20,5 milliards d’années']
    },
    correctIndex: 2,
    explanation: {
      ar: 'أظهرت بيانات مسبار بلانك (Planck) التابع لـ ESA أن عمر الكون يبلغ 13.787 ± 0.020 مليار سنة، بينما 4.6 مليار سنة هو عمر كوكب الأرض والمجموعة الشمسية.',
      en: 'Planck mission data confirms the age of the universe is 13.787 ± 0.020 billion years; 4.6 billion years is Earth and Solar System’s age.',
      fr: 'La mission Planck confirme un âge de 13,787 ± 0,020 milliards d’années (4,6 milliards étant l’âge de la Terre).'
    },
    scientificReference: 'ESA Planck Collaboration 2018'
  },
  {
    id: 'quiz-black-hole-escape',
    category: 'black-holes',
    difficulty: 'medium',
    question: {
      ar: 'ماذا يسمى الحد الفاصل المحيط بالثقب الأسود الذي لا يمكن لأي جسيم أو فوتون ضوئي الهروب منه بعد تجاوزه؟',
      en: 'What is the boundary surrounding a black hole beyond which nothing, not even light, can escape?',
      fr: 'Comment nomme-t-on la frontière entourant un trou noir au-delà de laquelle rien ne peut s’échapper ?'
    },
    options: {
      ar: ['قرص الانجذاب', 'أفق الحدث', 'كرة الفوتونات', 'نقطة الأوج'],
      en: ['Accretion Disk', 'Event Horizon', 'Photon Sphere', 'Aphelion'],
      fr: ['Disque d’accrétion', 'Horizon des événements', 'Sphère de photons', 'Aphélie']
    },
    correctIndex: 1,
    explanation: {
      ar: 'أفق الحدث (Event Horizon) هو الغشاء الرياضي الذي تصبح عنده سرعة الهروب المطلوبة مساوية لسرعة الضوء، ويوصف نصف قطره بنصف قطر شوارزشيلد.',
      en: 'The Event Horizon is the boundary where escape velocity equals the speed of light, mathematically defined by the Schwarzschild radius.',
      fr: 'L’horizon des événements est la limite théorique où la vitesse de libération égale celle de la lumière.'
    },
    scientificReference: 'General Relativity & Event Horizon Telescope Project'
  },
  {
    id: 'quiz-quran-iron',
    category: 'quran-cosmos',
    difficulty: 'hard',
    question: {
      ar: 'ما هي الظاهرة الفيزيائية الفلكية التي تفسر نشأة عنصر الحديد في الكون وتوافقه مع لفظ الإنزال؟',
      en: 'Which astrophysical phenomenon explains the stellar genesis of iron dispersed across the cosmos?',
      fr: 'Quel phénomène astrophysique explique la synthèse du fer stellaire dispersé dans le cosmos ?'
    },
    options: {
      ar: ['الرياح الشمسية السطحية', 'الاندماج النووي في المستعرات العظمى (Supernovae)', 'الانشطار النووي في كواكب الصخور', 'حقول الجاذبية القمرية'],
      en: ['Solar surface winds', 'Stellar nucleosynthesis in massive supernovae', 'Planetary nuclear fission', 'Lunar gravitational tides'],
      fr: ['Vents solaires de surface', 'Nucléosynthèse dans les supernovae massives', 'Fission nucléaire tellurique', 'Marées lunaires']
    },
    correctIndex: 1,
    explanation: {
      ar: 'يتكون عنصر الحديد في أنوية النجوم العملاقة قبيل موتها، ثم يُقذف إلى الفضاء عند انفجارها كمستعرات عظمى لينزل لاحقاً إلى السحب التي تشكل الكواكب.',
      en: 'Iron is forged at the culmination of nucleosynthesis inside dying massive stars, then cast out into space via violent supernova detonations to seed planets.',
      fr: 'Le fer est forgé au cœur d’étoiles massives avant d’être projeté dans l’espace par des explosions de supernovae.'
    },
    scientificReference: 'Nuclear Astrophysics & Stellar Nucleosynthesis (B²FH)'
  }
];

export const initialStats: SiteStatistics = {
  articlesCount: 5,
  totalViews: 23250,
  quizzesTaken: 1840,
  geminiGenerationsCount: 620,
  activeLearners: 1250
};

export const initialConstellations: Constellation[] = [
  {
    id: 'orion',
    name: { ar: 'كوكبة الجبار (الصياد)', en: 'Orion the Hunter', fr: 'Orion le Chasseur' },
    arabicClassicalName: 'صورة الجبار (كتاب صور الكواكب الثابتة للصوفي)',
    abbreviation: 'Ori',
    hemisphere: 'north',
    season: 'winter',
    brightestStar: {
      name: { ar: 'رجل الجبار (Rigel)', en: 'Rigel (Beta Orionis)', fr: 'Rigel' },
      arabicName: 'رجل الجبار',
      magnitude: 0.13,
      distanceLy: 860,
      spectralType: 'B8Ia (Blue Supergiant)'
    },
    starsCount: 7,
    stars: [
      { id: 'betelgeuse', name: { ar: 'منكب الجوزاء', en: 'Betelgeuse', fr: 'Bételgeuse' }, x: 30, y: 25, mag: 0.5, spectralType: 'M1-2' },
      { id: 'bellatrix', name: { ar: 'المرزم (Bellatrix)', en: 'Bellatrix', fr: 'Bellatrix' }, x: 70, y: 28, mag: 1.6, spectralType: 'B2' },
      { id: 'alnitak', name: { ar: 'النطاق (Alnitak)', en: 'Alnitak', fr: 'Alnitak' }, x: 42, y: 52, mag: 1.7, spectralType: 'O9' },
      { id: 'alnilam', name: { ar: 'النظام (Alnilam)', en: 'Alnilam', fr: 'Alnilam' }, x: 50, y: 50, mag: 1.7, spectralType: 'B0' },
      { id: 'mintaka', name: { ar: 'المنطقة (Mintaka)', en: 'Mintaka', fr: 'Mintaka' }, x: 58, y: 48, mag: 2.2, spectralType: 'O9' },
      { id: 'saiph', name: { ar: 'سيف الجبار (Saiph)', en: 'Saiph', fr: 'Saïph' }, x: 35, y: 80, mag: 2.1, spectralType: 'B0' },
      { id: 'rigel', name: { ar: 'رجل الجبار (Rigel)', en: 'Rigel', fr: 'Rigel' }, x: 72, y: 78, mag: 0.13, spectralType: 'B8' }
    ],
    lines: [
      [0, 2], [2, 3], [3, 4], [4, 1], // Upper torso & belt
      [2, 5], [4, 6], // Legs
      [0, 1] // Shoulders
    ],
    history: {
      ar: 'أشهر كوكبة في سماء الشتاء عالمياً. خلدها الفلكي المسلم عبد الرحمن الصوفي في مؤلفه العمدة "صور الكواكب الثابتة" (عام 964م)، حيث وصف نجومها ورسمها بدقة من منظوري الأرض والسماء، ومعظم أسمائها المستخدمة فلكياً اليوم مشتقة من أسمائها العربية الأصلية (منكب الجوزاء، رجل، المرزم، سيف، النطاق).',
      en: 'The most recognizable winter constellation worldwide. Immortalized by the Muslim astronomer Abd al-Rahman al-Sufi in his seminal 964 CE masterpiece "Book of Fixed Stars", where he illustrated its coordinates from both celestial globe and terrestrial viewpoints. Modern names like Betelgeuse (Mankib al-Jawza) and Rigel (Rijl) derive directly from classical Arabic astronomical catalogues.',
      fr: 'La constellation la plus emblématique du ciel d’hiver. Immortalisée par l’astronome Abd al-Rahman al-Sufi en 964 dans son "Livre des étoiles fixes". Ses noms contemporains (Bételgeuse, Rigel) sont issus de la tradition astronomique arabe classique.'
    },
    alSufiNote: {
      ar: 'ذكر الصوفي في كتابه: "وهي سبعة وثلاثون كوكباً من الصورة، وأربعة كواكب خارجة عنها... وكوكب منكب الجوزاء هو النير الأحمر على المنكب الأيمن، وكوكب رجل الجبار هو النير الأبيض على القدم اليسرى".',
      en: 'Al-Sufi noted: "It comprises thirty-seven stars in the figure... Betelgeuse is the luminous red on the right shoulder, and Rigel is the radiant white upon the left foot."',
      fr: 'Al-Sufi note : "Elle compte trente-sept étoiles dans la figure... Bételgeuse est l’éclatante rouge sur l’épaule droite et Rigel l’astre blanc sur le pied gauche."'
    },
    astronomicalData: {
      areaSqDeg: 594,
      bestMonth: { ar: 'يناير وفبراير', en: 'January & February', fr: 'Janvier et Février' },
      deepSkyObjects: ['سديم الجبار العظيم M42', 'سديم رأس الحصان (Barnard 33)', 'سديم دمعة دي ميران M43']
    },
    quranicReflection: {
      verseText: 'فَلَا أُقْسِمُ بِمَوَاقِعِ النُّجُومِ * وَإِنَّهُ لَقَسَمٌ لَّوْ تَعْلَمُونَ عَظِيمٌ',
      surah: { ar: 'سورة الواقعة', en: 'Surah Al-Waqi’ah', fr: 'Sourate Al-Waqi’ah' },
      surahNumber: 56,
      ayahNumber: 75,
      tafsirSummary: {
        ar: 'قال ابن كثير: أقسم سبحانه بمنازل النجوم ومطالعها ومساقطها في السماء. وقال العلم الحديث: إننا لا نرى النجوم في مكانها الحقيقي الآن، بل نرى "مواقعها" القديمة التي غادرها ضوؤها قبل مئات وملايين السنين، وهو توافق لغوي وفلكي باهر في لفظ (بِمَوَاقِعِ).',
        en: 'Ibn Kathir commented: Allah swears by the cosmic stations and trajectories of stars. Modern astrophysics notes we never view stars in their instantaneous physical locations, but rather the spacetime locations (mawāqi‘) where photons were emitted epochs ago.',
        fr: 'Ibn Kathir commente : Allah jure par les demeures et les trajectoires des étoiles. L’astrophysique confirme que nous ne voyons que les emplacements passés d’où les photons ont été émis.'
      },
      reflection: {
        ar: 'تأمل في دقة القَسَم القرآني بمواقع النجوم لا بذواتها؛ فالنجم قد يكون انفجر أو تحرك، لكن فوتوناته تسافر إلينا لترسم هذا التناسق المهيب في كبد السماء.',
        en: 'Contemplate the profound precision of swearing by the spacetime locations of stars rather than static bodies, matching the relativistic reality of light-travel time across cosmic gulfs.',
        fr: 'Méditation sur la précision du serment divin par les sites stellaires, en parfaite harmonie avec la vitesse finie de la lumière.'
      }
    }
  },
  {
    id: 'canis-major',
    name: { ar: 'كوكبة الكلب الأكبر (موطن الشعرى)', en: 'Canis Major', fr: 'Grand Chien' },
    arabicClassicalName: 'صورة الكلب الأكبر وكوكب الشعرى العبور',
    abbreviation: 'CMa',
    hemisphere: 'south',
    season: 'winter',
    brightestStar: {
      name: { ar: 'الشعرى اليمانية (Sirius)', en: 'Sirius (Alpha Canis Majoris)', fr: 'Sirius' },
      arabicName: 'الشعرى العبور / الشعرى اليمانية',
      magnitude: -1.46,
      distanceLy: 8.6,
      spectralType: 'A1V (White Main-Sequence)'
    },
    starsCount: 6,
    stars: [
      { id: 'sirius', name: { ar: 'الشعرى اليمانية (Sirius)', en: 'Sirius', fr: 'Sirius' }, x: 50, y: 22, mag: -1.46, spectralType: 'A1V' },
      { id: 'murzim', name: { ar: 'المرزم (Murzim)', en: 'Murzim', fr: 'Murzim' }, x: 30, y: 28, mag: 1.98, spectralType: 'B1' },
      { id: 'muliphein', name: { ar: 'المحلفين (Muliphein)', en: 'Muliphein', fr: 'Muliphein' }, x: 65, y: 32, mag: 4.1, spectralType: 'B8' },
      { id: 'wezen', name: { ar: 'الوزن (Wezen)', en: 'Wezen', fr: 'Wezen' }, x: 55, y: 65, mag: 1.83, spectralType: 'F8' },
      { id: 'adhara', name: { ar: 'العذارى (Adhara)', en: 'Adhara', fr: 'Adhara' }, x: 38, y: 80, mag: 1.5, spectralType: 'B2' },
      { id: 'aludra', name: { ar: 'العذرة (Aludra)', en: 'Aludra', fr: 'Aludra' }, x: 72, y: 85, mag: 2.45, spectralType: 'B5' }
    ],
    lines: [
      [0, 1], [0, 2], [0, 3], [3, 4], [3, 5]
    ],
    history: {
      ar: 'تحتضن هذه الكوكبة نجم الشعرى اليمانية، وهو ألمع نجم في سماء الليل قاطبة بقدر ظاهري -1.46. كانت بعض قبائل العرب في الجاهلية تعبد الشعرى لعظم شأنها ولمعانها الأخاذ، حتى نزل القرآن الكريم مؤكداً أن الله تعالى هو رب هذا النجم وخالقه، وأنه مسخر كغيره من الأجرام.',
      en: 'Houses Sirius, the brightest star in Earth’s nocturnal sky (-1.46 apparent magnitude). Certain pre-Islamic Arabian tribes venerated Sirius due to its radiant splendor, until the Holy Quran revealed that Allah alone is the Lord and Creator of Sirius, dismantling idolatry.',
      fr: 'Abrite Sirius, l’étoile la plus brillante de la sphère céleste nocturne. Vénérée par certaines tribus arabes préislamiques, le Coran affirma sans équivoque qu’Allah est le Seigneur unique et Créateur de Sirius.'
    },
    alSufiNote: {
      ar: 'قال الصوفي: "وكوكبه الأول هو النير الأعظم المسمى بالشعرى اليمانية والشعرى العبور، وهو من أعظم كواكب السماء وأضوئها".',
      en: 'Al-Sufi stated: "Its primary star is the supreme luminary named Al-Shi’ra al-Yamaniyya, the most radiant star in the firmament."',
      fr: 'Al-Sufi écrit : "Sa première étoile est le suprême luminaire nommé Al-Shi’ra, la plus éclatante du firmament."'
    },
    astronomicalData: {
      areaSqDeg: 380,
      bestMonth: { ar: 'فبراير', en: 'February', fr: 'Février' },
      deepSkyObjects: ['عنقود الحلي M41', 'سديم خوذة ثور (NGC 2359)']
    },
    quranicReflection: {
      verseText: 'وَأَنَّهُ هُوَ رَبُّ الشِّعْرَى',
      surah: { ar: 'سورة النجم', en: 'Surah An-Najm', fr: 'Sourate An-Najm' },
      surahNumber: 53,
      ayahNumber: 49,
      tafsirSummary: {
        ar: 'قال ابن كثير: "هو الكوكب المضيء الذي يقال له المرزم وشعرى العبور، وكانت طائفة من العرب يعبدونه، فأخبر تعالى أنه ربه وخالقه". والشعرى هو النجم الوحيد المذكور باسمه الصريح في القرآن الكريم تكريماً للتوحيد وتبياناً لمخلوقيته.',
        en: 'Ibn Kathir said: "It is the luminous star known as Sirius which a faction of Arabs used to worship; Allah affirmed that He is its Lord and Maker." Sirius is the sole individual star explicitly named in the Quran, underscoring monotheism.',
        fr: 'Ibn Kathir explique : "C’est l’étoile éclatante nommée Sirius que vissaient certains Arabes ; Allah proclama qu’Il en est le Créateur." Sirius est l’unique étoile nommée explicitement dans le Coran.'
      },
      reflection: {
        ar: 'إفراد نجم الشعرى بالذكر دون سائر النجوم في القرآن الكريم يبين منهج الإسلام الحكيم في تحويل العقول من تعظيم المخلوقات الفضائية الباهرة إلى عبادة خالقها وموجدها الأحد.',
        en: 'Singling out Sirius illustrates the Quranic pedagogical ethos: redirecting human awe from splendid celestial creations toward unyielding devotion to their Creator.',
        fr: 'La mention singulière de Sirius illustre la démarche spirituelle coranique : détourner l’admiration envers les astres vers l’adoration du Créateur suprême.'
      }
    }
  },
  {
    id: 'ursa-major',
    name: { ar: 'كوكبة الدب الأكبر (بنات نعش الكبرى)', en: 'Ursa Major (Great Bear)', fr: 'Grande Ourse' },
    arabicClassicalName: 'صورة الدب الأكبر وبنات نعش الكبرى',
    abbreviation: 'UMa',
    hemisphere: 'north',
    season: 'spring',
    brightestStar: {
      name: { ar: 'الجون (Alioth)', en: 'Alioth (Epsilon Ursae Majoris)', fr: 'Alioth' },
      arabicName: 'الجون',
      magnitude: 1.76,
      distanceLy: 81,
      spectralType: 'A1III-IVp'
    },
    starsCount: 7,
    stars: [
      { id: 'dubhe', name: { ar: 'دبه (Dubhe)', en: 'Dubhe', fr: 'Dubhé' }, x: 75, y: 30, mag: 1.79, spectralType: 'K0III' },
      { id: 'merak', name: { ar: 'المراق (Merak)', en: 'Merak', fr: 'Merak' }, x: 70, y: 55, mag: 2.37, spectralType: 'A1V' },
      { id: 'phecda', name: { ar: 'فخذ الدب (Phecda)', en: 'Phecda', fr: 'Phecda' }, x: 50, y: 60, mag: 2.44, spectralType: 'A0V' },
      { id: 'megrez', name: { ar: 'المغرز (Megrez)', en: 'Megrez', fr: 'Megrez' }, x: 52, y: 35, mag: 3.31, spectralType: 'A3V' },
      { id: 'alioth', name: { ar: 'الجون (Alioth)', en: 'Alioth', fr: 'Alioth' }, x: 38, y: 38, mag: 1.76, spectralType: 'A1p' },
      { id: 'mizar', name: { ar: 'المئزر (Mizar)', en: 'Mizar', fr: 'Mizar' }, x: 25, y: 45, mag: 2.23, spectralType: 'A2V' },
      { id: 'alkaid', name: { ar: 'القائد (Alkaid)', en: 'Alkaid', fr: 'Alkaid' }, x: 12, y: 60, mag: 1.86, spectralType: 'B3V' }
    ],
    lines: [
      [0, 1], [1, 2], [2, 3], [3, 0], // The bowl (نعش)
      [3, 4], [4, 5], [5, 6] // The handle (بنات)
    ],
    history: {
      ar: 'كوكبة قطبية لا تغيب في نصف الكرة الشمالي. استخدمها العرب والبحارة منذ آلاف السنين لتحديد الشمال الجغرافي؛ فالنجمان "الدبه" و"المراق" يشيران بخط مستقيم مباشرة نحو نجم القطب الشمالي (Polaris). كما اشتهر فيها النجم المزدوج الشهير "المئزر والسهى" لاختبار حدة البصر.',
      en: 'A circumpolar constellation visible year-round in the northern hemisphere. Navigators throughout antiquity used its two pointer stars, Dubhe and Merak, to locate Polaris (the North Star). It also features the famous double star test of visual acuity: Mizar and Alcor.',
      fr: 'Constellation circumpolaire majeure. Utilisée depuis l’Antiquité pour localiser l’étoile polaire grâce aux étoiles Merak et Dubhé. Elle abrite le couple stellaire Mizar et Alcor.'
    },
    alSufiNote: {
      ar: 'فصّل الصوفي في تسميات نجومها: "الأربعة التي على المربع تسمى النعش، والثلاثة التي على الذنب تسمى البنات، وأقربها إلى النعش هو الجون، ثم المئزر ومعه كوكب صغير ملاصق له يسمى السهى".',
      en: 'Al-Sufi detailed: "The four forming the quadrangle are called Al-Na’sh, and the three on the tail are Al-Banāt... Mizar is joined by a tiny star called Al-Suhā."',
      fr: 'Al-Sufi précise les désignations traditionnelles et souligne l’étoile Alcor (Al-Suhā) accompagnant Mizar.'
    },
    astronomicalData: {
      areaSqDeg: 1280,
      bestMonth: { ar: 'أبريل ومايو', en: 'April & May', fr: 'Avril et Mai' },
      deepSkyObjects: ['مجرة بودي M81', 'مجرة السيجار M82', 'سديم البومة M97']
    },
    quranicReflection: {
      verseText: 'وَهُوَ الَّذِي جَعَلَ لَكُمُ النُّجُومَ لِتَهْتَدُوا بِهَا فِي ظُلُمَاتِ الْبَرِّ وَالْبَحْرِ قَدْ فَصَّلْنَا الْآيَاتِ لِقَوْمٍ يَعْلَمُونَ',
      surah: { ar: 'سورة الأنعام', en: 'Surah Al-An’am', fr: 'Sourate Al-An’am' },
      surahNumber: 6,
      ayahNumber: 97,
      tafsirSummary: {
        ar: 'قال الإمام الطبري: جعل الله النجوم علامات يهتدي بها المسافر والسالك في ظلمات الليل براً وبحراً لمعرفة القبلة والاتجاهات الجغرافية ومواسم الزراعة، وهي نعمة عظمى تستوجب شكر المنعم.',
        en: 'Imam Al-Tabari noted: Allah appointed the stars as celestial beacons for travelers traversing terrestrial deserts and ocean depths, guiding orientations and spiritual Qiblah.',
        fr: 'L’imam Al-Tabari note : Allah a fait des étoiles des repères capitaux pour guider les navigateurs dans l’obscurité des déserts et des mers.'
      },
      reflection: {
        ar: 'الاهتداء بمؤشرات الدب الأكبر للوصول إلى نجم القطب وتحديد الشمال بدقة متناهية يجسد عملياً الحكمة الإلهية في تسخير نجوم السماء هداية ودليلاً للإنسان.',
        en: 'Using pointer stars of Ursa Major to pinpoint true North represents a tangible celestial gift of orientation bestowed by divine mercy.',
        fr: 'L’orientation céleste via la Grande Ourse incarne concrètement la finalité d’orientation mentionnée dans la Révélation.'
      }
    }
  },
  {
    id: 'taurus',
    name: { ar: 'كوكبة الثور (ومجموعة الثريا)', en: 'Taurus the Bull', fr: 'Taureau' },
    arabicClassicalName: 'صورة الثور وكواكب الثريا والدبران',
    abbreviation: 'Tau',
    hemisphere: 'zodiac',
    season: 'winter',
    brightestStar: {
      name: { ar: 'الدبران (Aldebaran)', en: 'Aldebaran (Alpha Tauri)', fr: 'Aldébaran' },
      arabicName: 'الدبران (لأنه يدبر الثريا ويتبعها)',
      magnitude: 0.85,
      distanceLy: 65,
      spectralType: 'K5III (Orange Giant)'
    },
    starsCount: 6,
    stars: [
      { id: 'aldebaran', name: { ar: 'الدبران', en: 'Aldebaran', fr: 'Aldébaran' }, x: 68, y: 55, mag: 0.85, spectralType: 'K5III' },
      { id: 'elnath', name: { ar: 'النطح (Elnath)', en: 'Elnath', fr: 'Elnath' }, x: 80, y: 20, mag: 1.65, spectralType: 'B7III' },
      { id: 'tianguan', name: { ar: 'القرن الجنوبي (Zeta)', en: 'Tianguan', fr: 'Tianguan' }, x: 85, y: 45, mag: 3.0, spectralType: 'B2IV' },
      { id: 'hyades', name: { ar: 'القلائص (Hyades)', en: 'Hyades Cluster', fr: 'Hyades' }, x: 55, y: 50, mag: 3.4, spectralType: 'Cluster' },
      { id: 'pleiades', name: { ar: 'الثريا (Pleiades M45)', en: 'Pleiades (Seven Sisters)', fr: 'Pléiades (M45)' }, x: 30, y: 35, mag: 1.6, spectralType: 'Open Cluster' },
      { id: 'alcyone', name: { ar: 'نجم الثريا الأبرز (Alcyone)', en: 'Alcyone', fr: 'Alcyone' }, x: 32, y: 37, mag: 2.87, spectralType: 'B7IIIe' }
    ],
    lines: [
      [1, 0], [2, 0], [0, 3], [3, 4]
    ],
    history: {
      ar: 'إحدى أعرق كوكبات دائرة البروج. تحتضن عنقود "الثريا" الشهير (Pleiades M45) الذي ضربت به العرب الأمثال في العلو والبهاء ("كأنه الثريا"). سُمي نجمها البرتقالي العملاق "الدبران" بهذا الاسم العربي الخالص لأنه "يدبر" أي يتبع الثريا في مسيرها السماوي.',
      en: 'One of the oldest zodiacal constellations, harboring the dazzling Pleiades cluster (M45) celebrated in classical Arabic poetry. Its giant eye Aldebaran (Al-Dabarān) means "the follower" because it faithfully follows the Pleiades across the night sky.',
      fr: 'Constellation zodiacale majeure, célèbre pour l’amas des Pléiades (M45) et son œil flamboyant Aldébaran ("le suiveur"), qui poursuit les Pléiades.'
    },
    alSufiNote: {
      ar: 'ذكر الصوفي: "وكوكبه الرابع عشر هو النير الأحمر الذي في العين الجنوبية، ويسمى الدبران والمجدح، وتسمى الكواكب التي حوله القلائص، والثريا عنقود كواكب نيرة على ظهره".',
      en: 'Al-Sufi recorded: "Its fourteenth star is the radiant red in the southern eye called Aldebaran, and upon its back rests the luminous Pleiades cluster."',
      fr: 'Al-Sufi consigne : "Sa quatorzième étoile est la rougeoyante dans l’œil du Taureau appelée Aldébaran, précédée par les Pléiades sur son dos."'
    },
    astronomicalData: {
      areaSqDeg: 797,
      bestMonth: { ar: 'ديسمبر ويناير', en: 'December & January', fr: 'Décembre et Janvier' },
      deepSkyObjects: ['سديم السرطان M1 (بقايا مستعر أعظم 1054م)', 'عنقود الثريا M45', 'عنقود القلائص']
    },
    quranicReflection: {
      verseText: 'وَالسَّمَاءِ ذَاتِ الْبُرُوجِ',
      surah: { ar: 'سورة البروج', en: 'Surah Al-Buruj', fr: 'Sourate Al-Buruj' },
      surahNumber: 85,
      ayahNumber: 1,
      tafsirSummary: {
        ar: 'قال ابن عباس ومجاهد وقتادة: البروج هي منازل الشمس والقمر والكواكب الاثني عشر التي تسير فيها، وقيل: النجوم العظام وقصور السماء المشيدة بأمر الله.',
        en: 'Ibn Abbas, Mujahid, and Qatadah said: "Al-Burūj are the constellations and stations traversed by the Sun, Moon, and planets, as well as the colossal stellar towers of the heavens."',
        fr: 'Ibn Abbas et Mujahid commentent : "Al-Burūj désigne les constellations et les mansions traversées par le Soleil et la Lune, ainsi que les citadelles stellaires majestueuses."'
      },
      reflection: {
        ar: 'القَسَم الإلهي بالسماء ذات المنازل والبروج المنتظمة يلفت البصائر إلى عظمة البناء الكوني المتقن الذي لا يعتريه اضطراب ولا عشوائية على مر العصور.',
        en: 'The divine oath by the sky possessing stately constellations invites humans to contemplate the eternal structural order governing celestial bodies.',
        fr: 'Le serment divin par le ciel aux constellations majestueuses invite l’intellect à reconnaître l’ordre immuable et parfait de la création.'
      }
    }
  }
];

export const initialSpaceFeeds: SpaceMissionFeed[] = [
  {
    id: 'jwst',
    name: { ar: 'تلسكوب جيمس ويب الفضائي (JWST)', en: 'James Webb Space Telescope (JWST)', fr: 'Télescope Spatial James Webb (JWST)' },
    agency: 'NASA',
    type: 'telescope',
    status: 'operational',
    launchDate: '2021-12-25',
    currentLocation: {
      ar: 'نقطة لاغرانج الثانية (L2) - 1.5 مليون كم عن الأرض',
      en: 'Sun-Earth Lagrange Point 2 (L2) - 1.5M km from Earth',
      fr: 'Point de Lagrange L2 (1,5 million de km de la Terre)'
    },
    telemetry: {
      distanceFromEarth: '1,500,000 km',
      instrumentsActive: 'NIRCam, NIRSpec, MIRI, FGS/NIRISS',
      target: 'JADES Early Universe Deep Survey'
    },
    recentUpdate: {
      ar: 'تحليل طيفي عالي الدقة للغلاف الجوي لكوكب خارجي كشف عن وفرة بخار الماء وثاني أكسيد الكربون، مع مواصلة استكشاف المجرات المتكونة بعد 300 مليون سنة من الانفجار العظيم.',
      en: 'High-resolution transmission spectroscopy of an exoplanet atmosphere confirming water vapor and carbon dioxide signatures, while continuing surveys of infant galaxies formed 300 million years post-Big Bang.',
      fr: 'Spectroscopie à haute résolution d’une atmosphère exoplanétaire confirmant la présence d’eau et de CO₂, en poursuivant l’étude des galaxies primordiales.'
    },
    image: 'https://images.unsplash.com/photo-1543722530-d2c3201371e7?q=80&w=1200&auto=format&fit=crop',
    officialLink: 'https://webbtelescope.org'
  },
  {
    id: 'iss',
    name: { ar: 'محطة الفضاء الدولية (ISS)', en: 'International Space Station (ISS)', fr: 'Station Spatiale Internationale (ISS)' },
    agency: 'International',
    type: 'station',
    status: 'active',
    launchDate: '1998-11-20',
    currentLocation: {
      ar: 'المدار الأرضي المنخفض (LEO) - ارتفاع 418 كم',
      en: 'Low Earth Orbit (LEO) - Altitude ~418 km',
      fr: 'Orbite Terrestre Basse (LEO) - Altitude ~418 km'
    },
    telemetry: {
      speed: '27,600 km/h (7.66 km/s)',
      distanceFromEarth: '418 km altitude',
      crewCount: 7,
      coordinates: '51.6° Inclination orbit'
    },
    recentUpdate: {
      ar: 'إجراء تجارب زراعة نباتات متقدمة في الجاذبية الصغرى وصيانة أنظمة التبريد في وحدة كولومبوس الأوروبية مع طاقم البعثة الدولية رقم 72.',
      en: 'Conducting advanced microgravity botanical experiments and servicing thermal control loops in ESA’s Columbus module with Expedition 72 international crew.',
      fr: 'Expériences botaniques en microgravité et maintenance des circuits thermiques du module européen Columbus avec l’équipage de l’Expédition 72.'
    },
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop',
    officialLink: 'https://www.nasa.gov/station'
  },
  {
    id: 'perseverance',
    name: { ar: 'مسبار بيرسيفيرنس وروبوت المريخ', en: 'Mars Perseverance Rover & Ingenuity', fr: 'Rover Perseverance sur Mars' },
    agency: 'NASA',
    type: 'rover',
    status: 'operational',
    launchDate: '2020-07-30',
    currentLocation: {
      ar: 'فوهة جيزيرو (Jezero Crater) - كوكب المريخ',
      en: 'Jezero Crater Delta, Mars',
      fr: 'Cratère Jezero, Planète Mars'
    },
    telemetry: {
      distanceFromEarth: '225,000,000 km (variable)',
      sol: 1324,
      instrumentsActive: 'SuperCam, PIXL, SHERLOC, MOXIE'
    },
    recentUpdate: {
      ar: 'جمع عينة الصخور رقم 25 المحتوية على معادن طينية كربونية رسوبية تشير إلى بيئة بحيرة مائية قديمة كانت صالحة للحياة المجهرية قبل مليارات السنين.',
      en: 'Sealed rock core sample #25 rich in silica-carbonate minerals, reinforcing evidence of an ancient delta lakebed suitable for microbial life billions of years ago.',
      fr: 'Prélèvement du 25e échantillon géologique riche en carbonates, confirmant un ancien lit lacustre habitable il y a plusieurs milliards d’années.'
    },
    image: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?q=80&w=1200&auto=format&fit=crop',
    officialLink: 'https://mars.nasa.gov/mars2020/'
  },
  {
    id: 'voyager1',
    name: { ar: 'مسبار فوياجر 1 في الفضاء النجمي', en: 'Voyager 1 Interstellar Mission', fr: 'Sonde Voyager 1 dans l’Espace Interstellaire' },
    agency: 'NASA',
    type: 'interstellar',
    status: 'nominal',
    launchDate: '1977-09-05',
    currentLocation: {
      ar: 'الفضاء بين النجمي خارج الغلاف الشمسي (163 AU)',
      en: 'Interstellar Space beyond the Heliopause (163 AU)',
      fr: 'Espace interstellaire au-delà de l’héliopause (163 UA)'
    },
    telemetry: {
      distanceFromEarth: '24,400,000,000 km',
      speed: '61,200 km/h (17 km/s)',
      instrumentsActive: 'Cosmic Ray Subsystem (CRS), Magnetometer'
    },
    recentUpdate: {
      ar: 'أبعد مسبار بشري على الإطلاق؛ يرسل بنجاح قراءات كثافة البلازما النجمية والأشعة الكونية المجرية بعد معالجة برمجية حاسوبية بارعة من فريق ناسا الأرضي.',
      en: 'The most distant human artifact, transmitting vital data on galactic cosmic rays and interstellar magnetic fields across 22.5 light-hours of void.',
      fr: 'L’objet artificiel le plus lointain, transmettant des mesures du plasma interstellaire à travers 22,5 heures-lumière de distance.'
    },
    image: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=1200&auto=format&fit=crop',
    officialLink: 'https://voyager.jpl.nasa.gov/'
  },
  {
    id: 'artemis',
    name: { ar: 'برنامج أرتميس للعودة للقمر (NASA / ESA)', en: 'Artemis Lunar Program', fr: 'Programme Lunaire Artemis' },
    agency: 'NASA',
    type: 'lunar',
    status: 'active',
    launchDate: 'Ongoing Mission Campaign',
    currentLocation: {
      ar: 'مركز كينيدي للفضاء والمدار القمري',
      en: 'Kennedy Space Center & Lunar Orbit Prep',
      fr: 'Centre Spatial Kennedy & Préparation Orbite Lunaire'
    },
    telemetry: {
      target: 'Artemis II Crewed Lunar Flyby / Artemis III Landing',
      instrumentsActive: 'Orion European Service Module (ESM)'
    },
    recentUpdate: {
      ar: 'اكتمال اختبارات دمج مركبة أوريون مع وحدة الخدمة الأوروبية (ESM) استعداداً للرحلة المأهولة التاريخية حول القمر مع أربعة رواد فضاء.',
      en: 'Successful integrated propulsion and life-support tests on the Orion spacecraft and ESA European Service Module for the upcoming crewed lunar flyby.',
      fr: 'Tests d’intégration réussis du vaisseau Orion avec le module de service européen (ESM) pour la future mission habitée lunaire.'
    },
    image: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=1200&auto=format&fit=crop',
    officialLink: 'https://www.nasa.gov/artemis'
  }
];

export const initialCelestialEvents: CelestialEvent[] = [
  {
    id: 'perseids-2026',
    title: {
      ar: 'ذروة زخة شهب البرشاويات (Perseids Peak)',
      en: 'Perseid Meteor Shower Peak',
      fr: 'Pic de la Pluie d’Étoiles Filantes des Perséides'
    },
    type: 'meteor-shower',
    date: '2026-08-12',
    timeUtc: '21:00 UTC',
    visibilityRegion: {
      ar: 'نصف الكرة الشمالي والوطن العربي وأوروبا',
      en: 'Northern Hemisphere, Middle East, Europe & Americas',
      fr: 'Hémisphère Nord, Moyen-Orient, Europe'
    },
    description: {
      ar: 'واحدة من أغزر وأجمل زخات الشهب السنوية، ناتجة عن مخلفات غبار مذنب سويفت-تتل (109P/Swift-Tuttle). تصطدم حبيبات الغبار بالغلاف الجوي بسرعة تفوق 59 كم/ثانية مشكلة خطوطاً ضوئية ساحرة وكرات نارية مذهلة.',
      en: 'One of the most spectacular annual meteor showers, produced by orbital debris from comet Swift-Tuttle. Dust particles vaporize in Earth’s upper atmosphere at ~59 km/s, producing luminous fireballs and persistent trains.',
      fr: 'L’une des plus spectaculaires pluies d’étoiles filantes de l’année, engendrée par la comète Swift-Tuttle, avec des bolides filant à 59 km/s.'
    },
    observationGuide: {
      ar: 'أفضل رصد يكون بعد منتصف الليل بعيداً عن أضواء المدن بالنظر نحو الشمال الشرقي باتجاه كوكبة برشاوس. لا حاجة لأي تلسكوب، تكفي العين المجردة!',
      en: 'Best observed post-midnight from dark skies looking northeast toward Perseus. No binoculars or telescope needed; wide naked-eye vision is optimal!',
      fr: 'Meilleure observation après minuit loin de la pollution lumineuse vers le nord-est. Aucune lunette requise, vision à l’œil nu idéale.'
    },
    specs: {
      ratePerHour: 100,
      constellation: 'Perseus (حامل رأس الغول)',
      opticalAidRequired: { ar: 'العين المجردة تماماً', en: 'Naked Eye Only', fr: 'À l’œil nu exclusivement' }
    },
    quranicReflection: {
      verseText: 'وَلَقَدْ زَيَّنَّا السَّمَاءَ الدُّنْيَا بِمَصَابِيحَ وَجَعَلْنَاهَا رُجُومًا لِّلشَّيَاطِينِ',
      surah: { ar: 'سورة الملك', en: 'Surah Al-Mulk', fr: 'Sourate Al-Mulk' },
      ayahNumber: 5,
      reflection: {
        ar: 'تأمل في بهاء السماء وزينتها بالشهب النورانية والنجوم، التي جعلها الله جمالاً للناظرين وعبرة للمتفكرين.',
        en: 'Reflect upon the celestial beauty of night skies adorned with glittering beacons and transient radiant meteors.',
        fr: 'Méditation sur la splendeur des météores ornant la voûte céleste.'
      }
    }
  },
  {
    id: 'solar-eclipse-2026',
    title: {
      ar: 'كسوف الشمس الكلي التاريخي (Total Solar Eclipse)',
      en: 'Total Solar Eclipse of 2026',
      fr: 'Éclipse Solaire Totale Historique de 2026'
    },
    type: 'eclipse',
    date: '2026-08-12',
    timeUtc: '17:45 UTC',
    visibilityRegion: {
      ar: 'شمال إسبانيا، أيسلندا، غرينلاند، وجزئي في شمال أفريقيا والشرق الأوسط',
      en: 'Spain, Iceland, Greenland (Total); Partial in North Africa & Europe',
      fr: 'Espagne, Islande, Groenland (Totale) ; Partielle en Afrique du Nord'
    },
    description: {
      ar: 'ظاهرة كونية نادرة حيث يتطابق الحجم الزاوي لقرص القمر تماماً مع قرص الشمس فيحجبه كلياً لعدة دقائق ويسود ظلام دامس وتبرز الهالة الشمسية (Corona) ناصعة البياض مع انخفاض ملحوظ في درجات الحرارة.',
      en: 'A rare celestial alignment where the Moon’s apparent disk precisely covers the solar photosphere, casting totality darkness across its path and revealing the Sun’s ethereal pearly corona.',
      fr: 'Alignement grandiose où le disque lunaire occulte parfaitement le Soleil, dévoilant la couronne solaire blanche.'
    },
    observationGuide: {
      ar: 'يجب ارتداء نظارات الكسوف المعتمدة (ISO 12312-2) طوال المراحل الجزئية لحماية شبكية العين، ولا يجوز النظر للشمس بدونها إطلاقاً.',
      en: 'Certified ISO 12312-2 solar eclipse glasses are strictly mandatory during all partial phases to safeguard retinal health.',
      fr: 'Lunettes spéciales éclipse certifiées ISO indispensables pendant toutes les phases partielles.'
    },
    specs: {
      opticalAidRequired: { ar: 'نظارات كسوف معتمدة ISO 12312-2', en: 'Certified ISO Eclipse Glasses', fr: 'Lunettes certifiées ISO' }
    },
    quranicReflection: {
      verseText: 'وَالشَّمْسُ وَالْقَمَرُ بِحُسْبَانٍ',
      surah: { ar: 'سورة الرحمن', en: 'Surah Ar-Rahman', fr: 'Sourate Ar-Rahman' },
      ayahNumber: 5,
      reflection: {
        ar: 'تطابق حجم القمر (الأصغر بـ 400 مرة من الشمس) مع بعده (الأقرب بـ 400 مرة من الشمس) لينتج الكسوف الكلي المتطابق هو من أعظم براهين الحسبان والدقة الكونية المذهلة.',
        en: 'The cosmic coincidence that the Sun is ~400 times larger than the Moon yet ~400 times farther, causing them to appear identical in angular diameter from Earth, is an awe-inspiring sign of divine celestial precision (Bihusban).',
        fr: 'Le fait que le Soleil soit 400 fois plus grand que la Lune mais 400 fois plus éloigné créant des éclipses totales parfaites témoigne d’un calcul cosmique sublime.'
      }
    }
  },
  {
    id: 'jupiter-opposition-2026',
    title: {
      ar: 'تقابل كوكب المشتري مع الأرض والشمس',
      en: 'Jupiter at Opposition',
      fr: 'Jupiter à l’Opposition'
    },
    type: 'planetary-alignment',
    date: '2026-10-08',
    timeUtc: '23:30 UTC',
    visibilityRegion: {
      ar: 'جميع أنحاء العالم (ألمع جرم في سماء الليل بعد القمر والزهرة)',
      en: 'Global Visibility (Visible all night long)',
      fr: 'Visibilité Mondiale (Visible toute la nuit)'
    },
    description: {
      ar: 'يقع المشتري في أقرب مسافة له من الأرض على خط مستقيم مع الشمس، ويبلغ أقصى لمعان له (قدر ظاهري -2.9). تظهر أحزمته السحابية وأقماره الغاليلية الأربعة (إيو، أوروبا، غانيميد، كاليستو) بوضوح عبر تلسكوب صغير أو منظار.',
      en: 'Jupiter reaches its closest proximity to Earth, aligned with the Sun, shining at peak radiance (magnitude -2.9). Its cloud belts and four Galilean moons are easily visible even through modest binoculars.',
      fr: 'Jupiter atteint sa plus courte distance de la Terre, brillant à magnitude -2,9 avec ses bandes nuageuses et 4 lunes galiléennes.'
    },
    observationGuide: {
      ar: 'يرصد طوال ساعات الليل من الغروب حتى الفجر كنجم ذهبي فائق السطوع في كوكبة الجوزاء/السرطان.',
      en: 'Look toward the east at dusk; it shines like a magnificent golden beacon rising higher throughout the night.',
      fr: 'Visible dès le crépuscule vers l’est comme un éclatant phare doré.'
    },
    specs: {
      constellation: 'Gemini / Cancer',
      opticalAidRequired: { ar: 'منظار بسيط أو تلسكوب للهواة', en: 'Binoculars or Small Telescope', fr: 'Jumelles ou télescope d’amateur' }
    }
  },
  {
    id: 'geminids-2026',
    title: {
      ar: 'ذروة زخة شهب التوأميات العملاقة (Geminids)',
      en: 'Geminid Meteor Shower Peak',
      fr: 'Pic de la Pluie d’Étoiles Filantes des Géminides'
    },
    type: 'meteor-shower',
    date: '2026-12-14',
    timeUtc: '02:00 UTC',
    visibilityRegion: {
      ar: 'رؤية عالمية ممتازة في جميع القارات',
      en: 'Global visibility across all continents',
      fr: 'Visibilité mondiale sur tous les continents'
    },
    description: {
      ar: 'تعد ملكة زخات الشهب السنوية بمعدل يصل إلى 120-150 شهاباً ملوناً في الساعة. تنشأ من كويكب صخري يسمى "فايثون 3200" (3200 Phaethon) وليس من مذنب كبقية الزخات.',
      en: 'The undisputed king of annual meteor showers, generating up to 120-150 multicolored meteors per hour originating from rocky asteroid 3200 Phaethon.',
      fr: 'La reine des pluies d’étoiles filantes avec jusqu’à 120 météores par heure issus de l’astéroïde 3200 Phaethon.'
    },
    observationGuide: {
      ar: 'أفضل توقيت بين الساعة 10 مساءً و4 فجراً في ليلة مظلمة دافئة اللباس.',
      en: 'Prime observation spans from 10 PM to 4 AM; dress warmly and allow 20 minutes for dark-eye adaptation.',
      fr: 'Idéal entre 22h et 4h du matin dans un ciel sombre.'
    },
    specs: {
      ratePerHour: 120,
      constellation: 'Gemini (التوأمان)',
      opticalAidRequired: { ar: 'العين المجردة تماماً', en: 'Naked Eye', fr: 'À l’œil nu' }
    }
  }
];

