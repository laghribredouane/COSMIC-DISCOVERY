import React, { useState, useMemo, useEffect } from 'react';
import {
  Sparkles,
  BookOpen,
  ShieldCheck,
  Calendar,
  ChevronRight,
  ChevronLeft,
  Copy,
  Check,
  Bookmark,
  RotateCcw,
  Star,
  Sun,
  Moon,
  Search
} from 'lucide-react';
import { Language } from '../types/cosmic';

interface CosmicHadithOfTheDayProps {
  language: Language;
}

export interface AuthenticCosmicHadith {
  id: string;
  theme: 'sky-contemplation' | 'eclipses-sun-moon' | 'lunar-timekeeping' | 'heavens-vastness' | 'stars-guidance';
  themeLabel: { ar: string; en: string; fr: string };
  title: { ar: string; en: string; fr: string };
  narrator: { ar: string; en: string; fr: string };
  arabicText: string;
  translation: {
    en: string;
    fr: string;
  };
  source: {
    ar: string;
    en: string;
    fr: string;
  };
  authenticityGrade: {
    ar: string;
    en: string;
    fr: string;
  };
  classicalCommentary: {
    scholar: { ar: string; en: string; fr: string };
    explanation: { ar: string; en: string; fr: string };
  };
  cosmicReflection: {
    ar: string;
    en: string;
    fr: string;
  };
  relatedQuranVerse: {
    arabic: string;
    reference: { ar: string; en: string; fr: string };
  };
}

export const AUTHENTIC_COSMIC_HADITHS: AuthenticCosmicHadith[] = [
  {
    id: 'hadith-eclipses-signs',
    theme: 'eclipses-sun-moon',
    themeLabel: {
      ar: 'الشمس والقمر وآيات الكسوف والخسوف',
      en: 'The Sun, Moon & Eclipses as Cosmic Signs',
      fr: 'Le Soleil, la Lune et les Éclipses',
    },
    title: {
      ar: 'الشمس والقمر آيتان من آيات الله وتأصيل المنهج العلمي في رصد الكسوف',
      en: 'The Sun and Moon as Signs of Allah & Freeing Astronomy from Superstition',
      fr: 'Le Soleil et la Lune comme Signes Divins au-delà des Superstitions',
    },
    narrator: {
      ar: 'المغيرة بن شعبة رضي الله عنه',
      en: 'Al-Mughirah ibn Shu’bah (may Allah be pleased with him)',
      fr: 'Al-Moughira ibn Chou`ba (qu’Allah l’agrée)',
    },
    arabicText:
      'كَسَفَتِ الشَّمْسُ عَلَى عَهْدِ رَسُولِ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ يَوْمَ مَاتَ إِبْرَاهِيمُ، فَقَالَ النَّاسُ: كَسَفَتِ الشَّمْسُ لِمَوْتِ إِبْرَاهِيمَ. فَقَالَ رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ: «إِنَّ الشَّمْسَ وَالْقَمَرَ آيَتَانِ مِنْ آيَاتِ اللَّهِ، لَا يَنْكَسِفَانِ لِمَوْتِ أَحَدٍ وَلَا لِحَيَاتِهِ، فَإِذَا رَأَيْتُمُوهُمَا فَادْعُوا اللَّهَ وَصَلُّوا حَتَّى يَنْجَلِيَ»',
    translation: {
      en: 'The sun eclipsed during the lifetime of the Messenger of Allah ﷺ on the day when his son Ibrahim died. The people said that the sun had eclipsed because of the death of Ibrahim. The Messenger of Allah ﷺ said: "Indeed, the sun and the moon are two signs among the signs of Allah; they do not eclipse on account of the death or life of anyone. So when you see them, supplicate to Allah and pray until it clears."',
      fr: 'Le soleil s’éclipsa à l’époque du Messager d’Allah ﷺ le jour de la mort de son fils Ibrahim. Les gens dirent : Le soleil s’est éclipsé pour la mort d’Ibrahim. Le Messager d’Allah ﷺ dit alors : « Certes, le soleil et la lune sont deux signes parmi les signes d’Allah ; ils ne s’éclipsent ni pour la mort ni pour la vie de quiconque. Lorsque vous les voyez, invoquez Allah et priez jusqu’à ce que cela se dissipe. »',
    },
    source: {
      ar: 'متفق عليه: صحيح البخاري (1043) وصحيح مسلم (915)',
      en: 'Agreed Upon: Sahih al-Bukhari (1043) & Sahih Muslim (915)',
      fr: 'Unanimement reconnu : Sahih al-Boukhari (1043) & Sahih Mouslim (915)',
    },
    authenticityGrade: {
      ar: 'حديث صحيح (متفق عليه)',
      en: 'Sahih (Authentic - Agreed Upon)',
      fr: 'Sahih (Authentique)',
    },
    classicalCommentary: {
      scholar: {
        ar: 'الحافظ ابن حجر العسقلاني (فتح الباري) والإمام النووي (شرح مسلم)',
        en: 'Ibn Hajar al-Asqalani (Fath al-Bari) & Imam al-Nawawi',
        fr: 'Ibn Hajar al-Asqalani (Fath al-Bari) & Imam an-Nawawi',
      },
      explanation: {
        ar: 'أبطل النبي ﷺ ما كان يعتقده أهل الجاهلية من تأثير موت العظماء أو ولادتهم في الكسوف والخسوف، وبيّن أن الشمس والقمر مخلوقان مسخران يجريان وفق سنن الله الكونية الحكيمة، وأرشد المؤمنين إلى تحويل رصد الظواهر الفلكية إلى عبادة وخشوع ودعاء.',
        en: 'The Prophet ﷺ abolished pre-Islamic superstitions linking celestial phenomena to human fortunes, establishing that the Sun and Moon follow divine cosmic laws while directing believers toward awe, prayer, and remembrance.',
        fr: 'Le Prophète ﷺ a aboli les croyances superstitieuses liant les phénomènes célestes au destin humain, affirmant que le Soleil et la Lune suivent des lois cosmiques précises établies par le Créateur.',
      },
    },
    cosmicReflection: {
      ar: 'يُعد هذا الحديث الشريف حجر الزاوية في تحرير العقل العلمي من الخرافة التنجيمية؛ إذ فصل فصلاً تاماً بين المدارات الفلكية المقدرّة وبين المصادفات البشرية، وهو ما مهد لعلماء الفلك المسلمين حساب مواقيت الاقتران والكسوف والخسوف بدقة رياضية مع استشعار جلال الخالق سبحانه.',
      en: 'This landmark prophetic statement liberated human thought from astrological superstition, distinguishing objective orbital mechanics (conjunctions and lunar nodes) from human events while inspiring spiritual humility.',
      fr: 'Cette parole prophétique fondatrice a libéré la pensée scientifique de l’astrologie superstitieuse, distinguant la mécanique céleste objective des événements humains tout en éveillant la méditation spirituelle.',
    },
    relatedQuranVerse: {
      arabic: '﴿ وَمِنْ آيَاتِهِ اللَّيْلُ وَالنَّهَارُ وَالشَّمْسُ وَالْقَمَرُ ۚ لَا تَسْجُدُوا لِلشَّمْسِ وَلَا لِلْقَمَرِ وَاسْجُدُوا لِلَّهِ الَّذِي خَلَقَهُنَّ ﴾',
      reference: {
        ar: 'سورة فصلت - الآية 37',
        en: 'Surah Fussilat - Ayah 37',
        fr: 'Sourate Foussilat - Verset 37',
      },
    },
  },
  {
    id: 'hadith-night-sky-contemplation',
    theme: 'sky-contemplation',
    themeLabel: {
      ar: 'التفكر النبوي في آفاق السماء ليلاً',
      en: 'Prophetic Night Sky Contemplation',
      fr: 'Méditation Nocturne du Ciel Étoilé',
    },
    title: {
      ar: 'هدي النبي ﷺ في النظر إلى السماء ليلاً وتلاوة آيات التفكر في خلق السماوات والأرض',
      en: 'The Prophet’s ﷺ Practice of Gazing at the Night Sky in Deep Contemplation',
      fr: 'La Tradition Prophétique de Contempler la Voûte Céleste la Nuit',
    },
    narrator: {
      ar: 'عبد الله بن عباس رضي الله عنهما',
      en: 'Abdullah ibn Abbas (may Allah be pleased with them)',
      fr: 'Abdullah ibn Abbas (qu’Allah les agrée)',
    },
    arabicText:
      'بِتُّ فِي بَيْتِ خَالَتِي مَيْمُونَةَ، فَقَامَ رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ مِنَ اللَّيْلِ، فَخَرَجَ فَنَظَرَ إِلَى السَّمَاءِ ثُمَّ تَلَا هَذِهِ الْآيَةَ فِي آلِ عِمْرَانَ: ﴿ إِنَّ فِي خَلْقِ السَّمَاوَاتِ وَالْأَرْضِ وَاخْتِلَافِ اللَّيْلِ وَالنَّهَارِ لَآيَاتٍ لِأُولِي الْأَلْبَابِ * الَّذِينَ يَذْكُرُونَ اللَّهَ قِيَامًا وَقُعُودًا وَعَلَىٰ جُنُوبِهِمْ وَيَتَفَكَّرُونَ فِي خَلْقِ السَّمَاوَاتِ وَالْأَرْضِ رَبَّنَا مَا خَلَقْتَ هَٰذَا بَاطِلًا سُبْحَانَكَ فَقِنَا عَذَابَ النَّارِ ﴾',
    translation: {
      en: 'I spent the night in the house of my maternal aunt Maymunah. The Messenger of Allah ﷺ rose during the night, went out, looked up at the sky, and recited these verses from Surah Ali \'Imran: "Indeed, in the creation of the heavens and the earth and the alternation of the night and the day are signs for those of understanding—who remember Allah while standing, sitting, and on their sides and reflect upon the creation of the heavens and the earth, saying: Our Lord, You did not create this aimlessly; exalted are You!"',
      fr: 'J’ai passé la nuit chez ma tante maternelle Maymouna. Le Messager d’Allah ﷺ se leva dans la nuit, sortit, leva les yeux vers le ciel et récita ces versets de la sourate Al-Imran : « En vérité, dans la création des cieux et de la terre, et dans l’alternance de la nuit et du jour, il y a des signes pour les doués d’intelligence... »',
    },
    source: {
      ar: 'متفق عليه: صحيح البخاري (183 / 4570) وصحيح مسلم (256 / 763)',
      en: 'Agreed Upon: Sahih al-Bukhari (183 / 4570) & Sahih Muslim (763)',
      fr: 'Unanimement reconnu : Sahih al-Boukhari (4570) & Sahih Mouslim (763)',
    },
    authenticityGrade: {
      ar: 'حديث صحيح (متفق عليه)',
      en: 'Sahih (Authentic - Agreed Upon)',
      fr: 'Sahih (Authentique)',
    },
    classicalCommentary: {
      scholar: {
        ar: 'الإمام النووي والحافظ ابن حجر العسقلاني',
        en: 'Imam al-Nawawi & Ibn Hajar al-Asqalani',
        fr: 'Imam an-Nawawi & Ibn Hajar al-Asqalani',
      },
      explanation: {
        ar: 'فيه استحباب النظر إلى السماء عند القيام من الليل للتفكر في بديع صنع الله في الكواكب والنجوم وعظيم اتساع الآفاق، والجمع بين المشاهدة البصرية للسماء وبين تدبر الآيات القرآنية.',
        en: 'Establishes the noble Sunnah of looking up at the night sky upon waking in the last third of the night, uniting direct visual observation of the stars with Quranic reflection.',
        fr: 'Établit la noble tradition consistant à observer le ciel étoilé au cours de la nuit pour unir l’observation directe du cosmos à la méditation des versets coraniques.',
      },
    },
    cosmicReflection: {
      ar: 'عندما ينظر الراصد في هدوء الليل إلى حزام مجرة درب التبانة وآلاف النجوم المتلألئة، يستشعر معنى قوله تعالى ﴿ رَبَّنَا مَا خَلَقْتَ هَٰذَا بَاطِلًا ﴾؛ فكل نجم ومجرة وسديم يخضع لثوابت فيزيائية متقنة تشهد بالحكمة والغاية في البناء الكوني.',
      en: 'Gazing into the deep night sky reveals a universe of two trillion galaxies governed by finely tuned physical constants—transforming astronomical observation into an act of profound contemplation.',
      fr: 'Observer la voûte céleste nocturne révèle l’harmonie vertigineuse des étoiles et des galaxies, transformant l’astronomie en une expérience de sagesse et de contemplation.',
    },
    relatedQuranVerse: {
      arabic: '﴿ إِنَّ فِي خَلْقِ السَّمَاوَاتِ وَالْأَرْضِ وَاخْتِلَافِ اللَّيْلِ وَالنَّهَارِ لَآيَاتٍ لِأُولِي الْأَلْبَابِ ﴾',
      reference: {
        ar: 'سورة آل عمران - الآية 190',
        en: "Surah Ali 'Imran - Ayah 190",
        fr: 'Sourate Al-Imran - Verset 190',
      },
    },
  },
  {
    id: 'hadith-sun-course-prostration',
    theme: 'eclipses-sun-moon',
    themeLabel: {
      ar: 'جريان الشمس وخضوع الكون لخالقه',
      en: 'The Cosmic Course of the Sun & Universal Submission',
      fr: 'La Course du Soleil et l’Ordre Cosmique',
    },
    title: {
      ar: 'حديث أبي ذر في جريان الشمس إلى مستقرها وخضوعها لأمر الله تعالى',
      en: 'The Hadith of Abu Dharr on the Course of the Sun and Its Resting Place',
      fr: 'Le Hadith d’Abou Dharr sur la Course du Soleil vers son Lieu Fixé',
    },
    narrator: {
      ar: 'أبو ذر الغفاري رضي الله عنه',
      en: 'Abu Dharr al-Ghifari (may Allah be pleased with him)',
      fr: 'Abou Dharr al-Ghifari (qu’Allah l’agrée)',
    },
    arabicText:
      'قَالَ النَّبِيُّ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ لِأَبِي ذَرٍّ حِينَ غَرَبَتِ الشَّمْسُ: «أَتَدْرِي أَيْنَ تَذْهَبُ؟» قُلْتُ: اللَّهُ وَرَسُولُهُ أَعْلَمُ. قَالَ: «فَإِنَّهَا تَذْهَبُ حَتَّى تَسْجُدَ تَحْتَ الْعَرْشِ، فَتَسْتَأْذِنَ فَيُؤْذَنُ لَهَا، وَيُوشِكُ أَنْ تَسْجُدَ فَلَا يُقْبَلَ مِنْهَا، وَتَسْتَأْذِنَ فَلَا يُؤْذَنَ لَهَا، يُقَالُ لَهَا: ارْجِعِي مِنْ حَيْثُ جِئْتِ، فَتَطْلُعُ مِنْ مَغْرِبِهَا، فَذَلِكَ قَوْلُهُ تَعَالَى: وَالشَّمْسُ تَجْرِي لِمُسْتَقَرٍّ لَهَا ذَلِكَ تَقْدِيرُ الْعَزِيزِ الْعَلِيمِ»',
    translation: {
      en: 'The Prophet ﷺ asked Abu Dharr at sunset: "Do you know where the sun goes?" I replied: "Allah and His Messenger know best." He said: "Indeed, it goes until it prostrates beneath the Throne, and asks permission to rise again, and permission is granted to it. Soon a time will come when it will prostrate and it will not be accepted, and it will ask permission and permission will not be granted, and it will be said to it: Return from where you came, so it will rise from its west. That is the statement of Allah the Exalted: And the Sun runs towards a resting place for it; that is the decree of the Almighty, the All-Knowing."',
      fr: 'Le Prophète ﷺ demanda à Abou Dharr au coucher du soleil : « Sais-tu où va le soleil ? » Je répondis : « Allah et Son Messager savent mieux. » Il dit : « Il poursuit sa course et se prosterne sous le Trône et demande la permission... Tel est le sens de la parole d’Allah : Et le soleil court vers un gîte qui lui est assigné ; telle est la détermination du Tout-Puissant, de l’Omniscient. »',
    },
    source: {
      ar: 'متفق عليه: صحيح البخاري (3199) وصحيح مسلم (159)',
      en: 'Agreed Upon: Sahih al-Bukhari (3199) & Sahih Muslim (159)',
      fr: 'Unanimement reconnu : Sahih al-Boukhari (3199) & Sahih Mouslim (159)',
    },
    authenticityGrade: {
      ar: 'حديث صحيح (متفق عليه)',
      en: 'Sahih (Authentic - Agreed Upon)',
      fr: 'Sahih (Authentique)',
    },
    classicalCommentary: {
      scholar: {
        ar: 'الخطابي وابن حجر العسقلاني (فتح الباري) والنووي',
        en: 'Al-Khattabi, Ibn Hajar al-Asqalani & Imam al-Nawawi',
        fr: 'Al-Khattabi, Ibn Hajar al-Asqalani & Imam an-Nawawi',
      },
      explanation: {
        ar: 'بيّن العلماء أن سجود الشمس واستئذانها حقٌّ على الوجه الذي يليق بها وبعظمة خالقها وهي في جريانها الدائم تحت العرش المحيط بالمخلوقات كلها، وأن مستقرها يشمل مستقرها الزماني بانتهاء أجل الكون ومستقرها المكاني في مدارها المقدر.',
        en: 'Classical scholars explain that the Sun’s prostration is its continuous submission beneath the all-encompassing Throne during its unceasing motion until the appointed end of cosmic time.',
        fr: 'Les érudits expliquent que la prosternation du Soleil exprime sa soumission constante sous le Trône divin qui englobe tout l’univers créé, tout au long de son mouvement perpétuel.',
      },
    },
    cosmicReflection: {
      ar: 'من الحقائق الفلكية المدهشة أن الشمس ليست ساكنة في الفضاء، بل تجري مع كامل مجموعتها الشمسية بسرعة تقارب 220 كم/ثانية حول مركز مجرة درب التبانة باتجاه نجم النسر الواقع (منطقة المستقر الشمسي Solar Apex)، مع التمييز المنهجي بين الغيب الإيماني في سجود المخلوقات وبين الرصد الفيزيائي لحركتها.',
      en: 'Modern astrophysics confirms that the Sun is in perpetual motion, orbiting the Galactic Center at ~220 km/s toward the Solar Apex—while faith reveals the unseen reality of every celestial body’s obedience to its Creator.',
      fr: 'L’astrophysique moderne confirme que le Soleil est en mouvement perpétuel à environ 220 km/s autour du centre galactique vers l’Apex solaire.',
    },
    relatedQuranVerse: {
      arabic: '﴿ وَالشَّمْسُ تَجْرِي لِمُسْتَقَرٍّ لَهَا ۚ ذَٰلِكَ تَقْدِيرُ الْعَزِيزِ الْعَلِيمِ ﴾',
      reference: {
        ar: 'سورة يس - الآية 38',
        en: 'Surah Ya-Sin - Ayah 38',
        fr: 'Sourate Ya-Sin - Verset 38',
      },
    },
  },
  {
    id: 'hadith-stars-security-sky',
    theme: 'stars-guidance',
    themeLabel: {
      ar: 'النجوم وأمان السماء والكون',
      en: 'The Stars & the Equilibrium of the Heavens',
      fr: 'Les Étoiles et l’Équilibre du Cosmos',
    },
    title: {
      ar: 'رفع البصر إلى السماء: النجوم أمانٌ للسماء وآية على انتظام الكون',
      en: 'Raising One’s Gaze to the Sky: The Stars as the Security of the Heavens',
      fr: 'Lever le Regard vers le Ciel : Les Étoiles comme Sauvegarde du Ciel',
    },
    narrator: {
      ar: 'أبو موسى الأشعري رضي الله عنه',
      en: 'Abu Musa al-Ash’ari (may Allah be pleased with him)',
      fr: 'Abou Moussa al-Ach`ari (qu’Allah l’agrée)',
    },
    arabicText:
      'صَلَّيْنَا الْمَغْرِبَ مَعَ رَسُولِ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ قُلْنَا: لَوْ جَلَسْنَا حَتَّى نُصَلِّيَ مَعَهُ الْعِشَاءَ، قَالَ: فَجَلَسْنَا، فَخَرَجَ إِلَيْنَا، فَرَفَعَ رَأْسَهُ إِلَى السَّمَاءِ وَكَانَ كَثِيرًا مِمَّا يَرْفَعُ رَأْسَهُ إِلَى السَّمَاءِ، فَقَالَ: «النُّجُومُ أَمَنَةٌ لِلسَّمَاءِ، فَإِذَا ذَهَبَتِ النُّجُومُ أَتَى السَّمَاءَ مَا تُوعَدُ»',
    translation: {
      en: 'We prayed Maghrib with the Messenger of Allah ﷺ, then we said: Let us sit until we pray Isha with him. He came out to us, raised his head toward the sky—and he used to frequently raise his head toward the sky—and said: "The stars are a source of security (amanah) for the sky; when the stars fade away, there will come to the sky what it has been promised."',
      fr: 'Nous avons prié le Maghrib avec le Messager d’Allah ﷺ, puis nous nous sommes assis en attendant la prière d’Al-Isha. Il sortit vers nous, leva la tête vers le ciel — et il levait souvent la tête vers le ciel — et dit : « Les étoiles sont une sauvegarde pour le ciel ; lorsque les étoiles disparaîtront, il adviendra au ciel ce qui lui a été promis. »',
    },
    source: {
      ar: 'صحيح مسلم - كتاب الفضائل (حديث رقم 2531)',
      en: 'Sahih Muslim - Book of Virtues (Hadith 2531)',
      fr: 'Sahih Mouslim - Livre des Vertus (Hadith 2531)',
    },
    authenticityGrade: {
      ar: 'حديث صحيح (رواه مسلم)',
      en: 'Sahih (Authentic - Sahih Muslim)',
      fr: 'Sahih (Authentique - Mouslim)',
    },
    classicalCommentary: {
      scholar: {
        ar: 'الإمام النووي في شرح صحيح مسلم',
        en: 'Imam al-Nawawi (Commentary on Sahih Muslim)',
        fr: 'Imam an-Nawawi (Commentaire de Sahih Mouslim)',
      },
      explanation: {
        ar: 'معنى «النجوم أمنة للسماء» أي ما دامت النجوم باقية مضيئة في مداراتها فالسماء باقية على نظامها، فإذا انكدرت النجوم وطُمست في آخر الزمان عند قيام الساعة انفطرت السماء وانتهى أجل العالم الدنيوي.',
        en: 'Imam al-Nawawi explains that as long as the stars remain luminous and intact in their courses, the cosmic order of the sky endures; when the stars are extinguished (inkidar), the current cosmic era concludes.',
        fr: 'L’Imam an-Nawawi explique que tant que les étoiles demeurent lumineuses dans leurs orbites, l’ordre du ciel perdure ; leur extinction marquera la fin de l’ère cosmique actuelle.',
      },
    },
    cosmicReflection: {
      ar: 'تُشير الفيزياء الفلكية الحديثة إلى أن النجوم هي محركات التوازن الحراري والجاذبي ومصانع العناصر الكيميائية في المجرات؛ وانطفاء النجوم ونفاد وقودها الهيدروجيني يرتبط بنهاية العمر النشط للكون المرئي، كما يلفت نظرنا وصف الصحابي: «وكان كثيراً مما يرفع رأسه إلى السماء» إلى دوام اليقظة الكونية في حياة النبي ﷺ.',
      en: 'Stars are the gravitational and nucleosynthetic engines of galaxies. The Companion’s observation that the Prophet ﷺ "used to frequently raise his head toward the sky" inspires us to cultivate daily mindfulness of the cosmos.',
      fr: 'Les étoiles constituent les piliers gravitationnels et énergétiques des galaxies. La remarque du Compagnon selon laquelle le Prophète ﷺ « levait souvent la tête vers le ciel » nous invite à une contemplation quotidienne du firmament.',
    },
    relatedQuranVerse: {
      arabic: '﴿ وَإِذَا النُّجُومُ انْكَدَرَتْ ﴾',
      reference: {
        ar: 'سورة التكوير - الآية 2',
        en: 'Surah At-Takwir - Ayah 2',
        fr: 'Sourate At-Takwir - Verset 2',
      },
    },
  },
  {
    id: 'hadith-lunar-months-cycle',
    theme: 'lunar-timekeeping',
    themeLabel: {
      ar: 'الدورة القمرية والمواقيت الهجرية',
      en: 'Synodic Lunar Cycle & Islamic Timekeeping',
      fr: 'Cycle Lunaire Synodique & Calendrier Hégirien',
    },
    title: {
      ar: 'إحكام التوقيت القمري الطبيعي: الشهر تسع وعشرون أو ثلاثون ليلة',
      en: 'Natural Lunar Timekeeping: A Lunar Month is 29 or 30 Nights',
      fr: 'La Précision du Cycle Lunaire : Le Mois compte 29 ou 30 Nuits',
    },
    narrator: {
      ar: 'عبد الله بن عمر رضي الله عنهما',
      en: 'Abdullah ibn Umar (may Allah be pleased with them)',
      fr: 'Abdullah ibn Omar (qu’Allah les agrée)',
    },
    arabicText:
      'قَالَ رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ: «إِنَّا أُمَّةٌ أُمِّيَّةٌ، لَا نَكْتُبُ وَلَا نَحْسُبُ، الشَّهْرُ هَكَذَا وَهَكَذَا» يَعْنِي مَرَّةً تِسْعَةً وَعِشْرِينَ، وَمَرَّةً ثَلَاثِينَ',
    translation: {
      en: 'The Messenger of Allah ﷺ said: "We are an unlettered nation; we do not rely on complex clerical tables for our worship. The lunar month is like this and like this"—meaning sometimes twenty-nine days and sometimes thirty days.',
      fr: 'Le Messager d’Allah ﷺ a dit : « Le mois lunaire est ainsi et ainsi » — signifiant qu’il compte tantôt vingt-neuf jours, tantôt trente jours.',
    },
    source: {
      ar: 'متفق عليه: صحيح البخاري (1913) وصحيح مسلم (1080)',
      en: 'Agreed Upon: Sahih al-Bukhari (1913) & Sahih Muslim (1080)',
      fr: 'Unanimement reconnu : Sahih al-Boukhari (1913) & Sahih Mouslim (1080)',
    },
    authenticityGrade: {
      ar: 'حديث صحيح (متفق عليه)',
      en: 'Sahih (Authentic - Agreed Upon)',
      fr: 'Sahih (Authentique)',
    },
    classicalCommentary: {
      scholar: {
        ar: 'الحافظ ابن حجر العسقلاني (فتح الباري) وابن تيمية',
        en: 'Ibn Hajar al-Asqalani (Fath al-Bari)',
        fr: 'Ibn Hajar al-Asqalani (Fath al-Bari)',
      },
      explanation: {
        ar: 'المراد ربط الأحكام الشرعية والمواسم التعبدية بعلامة كونية بصرية ميسرة لجميع الناس في كل مكان (رؤية الهلال أو إكمال العدة ثلاثين)، لأن الشهر القمري لا يزيد أبداً على ثلاثين يوماً ولا ينقص عن تسعة وعشرين يوماً.',
        en: 'Links universal religious timekeeping to a natural cosmic phenomenon observable by all people across the globe, noting the astronomical law that a lunar month is strictly either 29 or 30 days.',
        fr: 'Relie la mesure du temps à un phénomène cosmique naturel observable par tous, soulignant la loi astronomique selon laquelle un mois lunaire dure toujours 29 ou 30 jours.',
      },
    },
    cosmicReflection: {
      ar: 'الدورة الاقترانية للقمر (Synodic Month) حول الأرض بالنسبة للشمس تبلغ فلكياً 29.53059 يوماً (29 يوماً و12 ساعة و44 دقيقة و2.8 ثانية)؛ ولذلك فإن أي شهر قمري في الطبيعة يتناوب حتماً بين 29 يوماً و30 يوماً بدقة رياضية مذهلة.',
      en: 'The astronomical synodic month measures exactly 29.530589 days (29d 12h 44m). Because it is ~29.53 days, calendar months naturally alternate between 29 and 30 days—never 28 or 31.',
      fr: 'Le mois synodique astronomique mesure exactement 29,530589 jours (29j 12h 44m), ce qui explique pourquoi le mois lunaire alterne invariablement entre 29 et 30 jours.',
    },
    relatedQuranVerse: {
      arabic: '﴿ وَالْقَمَرَ قَدَّرْنَاهُ مَنَازِلَ حَتَّىٰ عَادَ كَالْعُرْجُونِ الْقَدِيمِ ﴾',
      reference: {
        ar: 'سورة يس - الآية 39',
        en: 'Surah Ya-Sin - Ayah 39',
        fr: 'Sourate Ya-Sin - Verset 39',
      },
    },
  },
  {
    id: 'hadith-beginning-creation-throne',
    theme: 'heavens-vastness',
    themeLabel: {
      ar: 'بدء الخلق وعظمة السماوات والعرش',
      en: 'The Beginning of Creation & Cosmic Grandeur',
      fr: 'Le Début de la Création et l’Immensité Céleste',
    },
    title: {
      ar: 'سؤال أهل اليمن للنبي ﷺ عن أول هذا الأمر وبدء خلق السماوات والأرض',
      en: 'The Inquiry of the People of Yemen About the Beginning of the Universe',
      fr: 'La Question des Gens du Yémen sur l’Origine de l’Univers',
    },
    narrator: {
      ar: 'عمران بن حصين رضي الله عنه',
      en: 'Imran ibn Husayn (may Allah be pleased with him)',
      fr: 'Imran ibn Housayn (qu’Allah l’agrée)',
    },
    arabicText:
      'دَخَلْتُ عَلَى النَّبِيِّ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ فَأَتَاهُ نَاسٌ مِنْ أَهْلِ الْيَمَنِ، فَقَالُوا: جِئْنَاكَ لِنَتَفَقَّهَ فِي الدِّينِ، وَلِنَسْأَلَكَ عَنْ أَوَّلِ هَذَا الْأَمْرِ مَا كَانَ؟ قَالَ: «كَانَ اللَّهُ وَلَمْ يَكُنْ شَيْءٌ غَيْرُهُ، وَكَانَ عَرْشُهُ عَلَى الْمَاءِ، وَكَتَبَ فِي الذِّكْرِ كُلَّ شَيْءٍ، وَخَلَقَ السَّمَاوَاتِ وَالْأَرْضَ»',
    translation: {
      en: 'People from Yemen came to the Prophet ﷺ and said: "We have come to you to understand religion, and to ask you about the very beginning of this affair (the universe)—what was it?" He said: "Allah existed and nothing else existed alongside Him. And His Throne was over the water, and He wrote everything in the Record (Al-Lawh Al-Mahfuz), and He created the heavens and the earth."',
      fr: 'Des gens du Yémen vinrent trouver le Prophète ﷺ et dirent : « Nous sommes venus à toi pour nous instruire dans la religion et t’interroger sur le commencement de cet univers. » Il répondit : « Allah était et rien n’était autre que Lui ; Son Trône était sur l’eau, Il écrivit toute chose dans le Livre, et Il créa les cieux et la terre. »',
    },
    source: {
      ar: 'صحيح البخاري - كتاب بدء الخلق (حديث رقم 3191)',
      en: 'Sahih al-Bukhari - Book of the Beginning of Creation (Hadith 3191)',
      fr: 'Sahih al-Boukhari - Livre du Début de la Création (Hadith 3191)',
    },
    authenticityGrade: {
      ar: 'حديث صحيح (رواه البخاري)',
      en: 'Sahih (Authentic - Sahih al-Bukhari)',
      fr: 'Sahih (Authentique - al-Boukhari)',
    },
    classicalCommentary: {
      scholar: {
        ar: 'الحافظ ابن حجر العسقلاني في فتح الباري',
        en: 'Ibn Hajar al-Asqalani (Fath al-Bari)',
        fr: 'Ibn Hajar al-Asqalani (Fath al-Bari)',
      },
      explanation: {
        ar: 'يقرر الحديث أزلية الخالق سبحانه وتفرده بالوجود قبل خلق الزمان والمكان والمادة، وأن السماوات والأرض محدثتان مخلوقتان بعد أن لم تكونا، وفق علم الله السابق وتقديره المحكم.',
        en: 'Affirms the absolute eternity of the Creator prior to space, time, and matter, and establishes that the heavens and the earth had a temporal beginning ordained by divine wisdom.',
        fr: 'Affirme l’éternité absolue du Créateur avant l’existence de l’espace, du temps et de la matière, et confirme que les cieux et la terre ont eu un commencement temporel.',
      },
    },
    cosmicReflection: {
      ar: 'يُظهر هذا الحوار شغف الصحابة وطلبة العلم منذ الصدر الأول بالسؤال عن نشأة الكون («ولنسألك عن أول هذا الأمر»)، وتلتقي حقيقة حدوث الكون وبدايته الزمانية مع ما أثبته علم الكونيات الحديث من أن للكون المرئي بداية زمنية محددة وليس أزلياً.',
      en: 'Highlights how early Muslims eagerly inquired into cosmology ("to ask you about the beginning of this universe"), aligning with the fundamental cosmological discovery that the universe had a finite beginning in time.',
      fr: 'Illustre la quête de connaissance cosmologique des premiers croyants et s’accorde avec le constat fondamental de la cosmologie moderne selon lequel l’univers a eu un commencement dans le temps.',
    },
    relatedQuranVerse: {
      arabic: '﴿ بَدِيعُ السَّمَاوَاتِ وَالْأَرْضِ ۖ وَإِذَا قَضَىٰ أَمْرًا فَإِنَّمَا يَقُولُ لَهُ كُنْ فَيَكُونُ ﴾',
      reference: {
        ar: 'سورة البقرة - الآية 117',
        en: 'Surah Al-Baqarah - Ayah 117',
        fr: 'Sourate Al-Baqara - Verset 117',
      },
    },
  },
  {
    id: 'hadith-prayer-times-sun-positions',
    theme: 'lunar-timekeeping',
    themeLabel: {
      ar: 'مواقيت الصلاة وحركة الشمس الظاهرية',
      en: 'Prayer Times & Solar Altitude Astronomy',
      fr: 'Horaires de Prière et Positions Solaires',
    },
    title: {
      ar: 'الارتباط الفلكي الدقيق بين مواقيت الصلوات الخمس ومنازل الشمس والظل والشفق',
      en: 'The Astronomical Definition of the Five Daily Prayers by Solar Positions',
      fr: 'La Définition Astronomique des Cinq Prières selon la Course du Soleil',
    },
    narrator: {
      ar: 'عبد الله بن عمرو بن العاص رضي الله عنهما',
      en: 'Abdullah ibn Amr ibn al-As (may Allah be pleased with them)',
      fr: 'Abdullah ibn Amr (qu’Allah les agrée)',
    },
    arabicText:
      'أَنَّ رَسُولَ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ قَالَ: «وَقْتُ الظُّهْرِ إِذَا زَالَتِ الشَّمْسُ وَكَانَ ظِلُّ الرَّجُلِ كَطُولِهِ مَا لَمْ يَحْضُرِ الْعَصْرُ، وَوَقْتُ الْعَصْرِ مَا لَمْ تَصْفَرَّ الشَّمْسُ، وَوَقْتُ صَلَاةِ الْمَغْرِبِ مَا لَمْ يَغِبِ الشَّفَقُ، وَوَقْتُ صَلَاةِ الْعِشَاءِ إِلَى نِصْفِ اللَّيْلِ الْأَوْسَطِ، وَوَقْتُ صَلَاةِ الصُّبْحِ مِنْ طُلُوعِ الْفَجْرِ مَا لَمْ تَطْلُعِ الشَّمْسُ»',
    translation: {
      en: 'The Messenger of Allah ﷺ said: "The time of Dhuhr is when the sun passes the meridian and a man’s shadow is equal to his height, so long as Asr has not arrived; the time of Asr is so long as the sun has not turned yellow; the time of Maghrib is so long as the twilight glow has not disappeared; the time of Isha is up to the middle of the night; and the time of Subh (Fajr) is from the break of true dawn so long as the sun has not risen."',
      fr: 'Le Messager d’Allah ﷺ a dit : « Le temps du Dhuhr commence lorsque le soleil dépasse le zénith et que l’ombre d’un homme égale sa taille... le temps du Maghrib dure tant que le crépuscule n’a pas disparu ; le temps de l’Isha va jusqu’au milieu de la nuit ; et le temps du Fajr va de l’apparition de l’aube jusqu’au lever du soleil. »',
    },
    source: {
      ar: 'صحيح مسلم - كتاب المساجد ومواضع الصلاة (حديث رقم 612)',
      en: 'Sahih Muslim - Book of Mosques & Prayer Times (Hadith 612)',
      fr: 'Sahih Mouslim - Livre des Mosquées et des Prières (Hadith 612)',
    },
    authenticityGrade: {
      ar: 'حديث صحيح (رواه مسلم)',
      en: 'Sahih (Authentic - Sahih Muslim)',
      fr: 'Sahih (Authentique - Mouslim)',
    },
    classicalCommentary: {
      scholar: {
        ar: 'الإمام النووي في شرح صحيح مسلم',
        en: 'Imam al-Nawawi (Sharh Sahih Muslim)',
        fr: 'Imam an-Nawawi (Sharh Sahih Mouslim)',
      },
      explanation: {
        ar: 'حدد النبي ﷺ مواقيت الصلوات الخمس بعلامات فلكية رصدية منضبطة: زوال الشمس عن كبد السماء (خط الزوال)، وتناسب طول الظل، وغروب القرص، وغيبوبة الشفق، وطلوع الفجر الصادق.',
        en: 'Defines the daily prayer windows through observable solar geometry: meridian transit (Zawal), gnomon shadow ratios, sunset, astronomical twilight dissipation, and true horizontal dawn.',
        fr: 'Définit les horaires de prière par des repères géométriques solaires précis : passage au méridien, rapport d’ombre, coucher du soleil, crépuscule et aube véritable.',
      },
    },
    cosmicReflection: {
      ar: 'كان هذا الحديث النبوي الدافع الأساسي لتأسيس «علم الميقات الفلكي» وحساب المثلثات الكروية في الحضارة الإسلامية؛ حيث ابتكر علماء الفلك المسلمون الأسطرلاب والربع المجيب لحساب ارتفاع الشمس وزوايا الشفق في كل خط عرض.',
      en: 'This Hadith directly catalyzed the birth of spherical trigonometry and mathematical timekeeping (`Ilm al-Miqat`), inspiring astronomers to chart solar declination and twilight depression angles across all latitudes.',
      fr: 'Ce Hadith a directement stimulé le développement de la trigonométrie sphérique et de la science astronomique du temps (`Ilm al-Miqat`).',
    },
    relatedQuranVerse: {
      arabic: '﴿ أَقِمِ الصَّلَاةَ لِدُلُوكِ الشَّمْسِ إِلَىٰ غَسَقِ اللَّيْلِ وَقُرْآنَ الْفَجْرِ ﴾',
      reference: {
        ar: 'سورة الإسراء - الآية 78',
        en: "Surah Al-Isra' - Ayah 78",
        fr: 'Sourate Al-Isra - Verset 78',
      },
    },
  },
];

export const CosmicHadithOfTheDay: React.FC<CosmicHadithOfTheDayProps> = ({ language }) => {
  // Compute deterministic Daily Hadith Index based on UTC/local day of the year
  const dailyIndex = useMemo(() => {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - startOfYear.getTime();
    const dayOfYear = Math.floor(diff / 86400000);
    return dayOfYear % AUTHENTIC_COSMIC_HADITHS.length;
  }, []);

  const [currentIndex, setCurrentIndex] = useState<number>(dailyIndex);
  const [selectedTheme, setSelectedTheme] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('cosmic_favorite_hadiths');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Countdown until midnight (next daily Hadith rotation)
  const [hoursUntilNext, setHoursUntilNext] = useState<{ h: number; m: number }>({ h: 8, m: 0 });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setHours(24, 0, 0, 0);
      const diffMinutes = Math.max(1, Math.floor((tomorrow.getTime() - now.getTime()) / 60000));
      setHoursUntilNext({
        h: Math.floor(diffMinutes / 60),
        m: diffMinutes % 60,
      });
    };
    updateCountdown();
    const timer = setInterval(updateCountdown, 30000);
    return () => clearInterval(timer);
  }, []);

  const filteredHadiths = useMemo(() => {
    return AUTHENTIC_COSMIC_HADITHS.filter((h) => {
      if (selectedTheme !== 'all' && h.theme !== selectedTheme) return false;
      if (!searchQuery.trim()) return true;
      const q = searchQuery.trim().toLowerCase();
      return (
        h.arabicText.includes(q) ||
        h.title.ar.includes(q) ||
        h.title.en.toLowerCase().includes(q) ||
        h.narrator.ar.includes(q) ||
        h.cosmicReflection.ar.includes(q)
      );
    });
  }, [selectedTheme, searchQuery]);

  const activeHadith: AuthenticCosmicHadith =
    filteredHadiths[currentIndex % Math.max(1, filteredHadiths.length)] ||
    AUTHENTIC_COSMIC_HADITHS[dailyIndex];

  const isTodayHadith = activeHadith.id === AUTHENTIC_COSMIC_HADITHS[dailyIndex].id;
  const isFavorited = favoriteIds.includes(activeHadith.id);

  const handleToggleFavorite = (id: string) => {
    const updated = favoriteIds.includes(id)
      ? favoriteIds.filter((item) => item !== id)
      : [...favoriteIds, id];
    setFavoriteIds(updated);
    try {
      localStorage.setItem('cosmic_favorite_hadiths', JSON.stringify(updated));
    } catch {
      // Ignore storage error
    }
  };

  const handleCopyHadith = () => {
    const textToCopy = `${activeHadith.arabicText}\n— الراوي: ${activeHadith.narrator.ar} | المصدر: ${activeHadith.source.ar}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredHadiths.length) % filteredHadiths.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredHadiths.length);
  };

  const handleResetToToday = () => {
    setSelectedTheme('all');
    setSearchQuery('');
    setCurrentIndex(dailyIndex);
  };

  const todayFormatted = useMemo(() => {
    try {
      return new Intl.DateTimeFormat(
        language === 'ar' ? 'ar-MA' : language === 'fr' ? 'fr-FR' : 'en-US',
        { dateStyle: 'long' }
      ).format(new Date());
    } catch {
      return new Date().toISOString().split('T')[0];
    }
  }, [language]);

  return (
    <section
      id="cosmic-hadith-of-the-day"
      data-testid="cosmic-hadith-of-the-day"
      className="space-y-6"
      aria-label={
        language === 'ar'
          ? 'حديث اليوم الكوني: الأحاديث النبوية الصحيحة في السماء والكون'
          : 'Cosmic Hadith of the Day: Authentic Prophetic Traditions on the Universe'
      }
    >
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#0c192c] via-[#091224] to-[#1a1308] border border-amber-500/40 p-6 sm:p-8 shadow-2xl">
        {/* Top Header Row */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800/90 pb-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/50 text-amber-300 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>
                  {language === 'ar'
                    ? 'حديث اليوم الكوني • يتجدد يومياً'
                    : language === 'fr'
                    ? 'Hadith Cosmique du Jour • Renouvelé Quotidiennement'
                    : 'Cosmic Hadith of the Day • Daily Inspiration'}
                </span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 text-xs font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>{activeHadith.authenticityGrade[language]}</span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-slate-300 text-xs">
                <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                <span>{todayFormatted}</span>
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white">
              {language === 'ar'
                ? 'إشراقات السنة النبوية الصحيحة في التفكر في السماوات والكون'
                : language === 'fr'
                ? 'Traditions Prophétiques Authentiques sur les Cieux et l’Univers'
                : 'Cosmic Hadith of the Day: Prophetic Wisdom on the Heavens & Universe'}
            </h2>
          </div>

          {/* Daily Rotation Status & Navigation Controls */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <div className="px-3 py-2 rounded-xl bg-slate-950/90 border border-slate-800 text-xs text-slate-300">
              {language === 'ar'
                ? `يتجدد الحديث القادم بعد: ${hoursUntilNext.h} س و ${hoursUntilNext.m} د`
                : `Next daily rotation in: ${hoursUntilNext.h}h ${hoursUntilNext.m}m`}
            </div>

            {!isTodayHadith && (
              <button
                type="button"
                onClick={handleResetToToday}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition-all cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{language === 'ar' ? 'حديث اليوم' : "Today's Hadith"}</span>
              </button>
            )}

            <div className="inline-flex items-center rounded-xl bg-slate-950 border border-slate-800 p-1">
              <button
                type="button"
                onClick={handlePrevious}
                aria-label="Previous Hadith"
                className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <span className="px-2.5 text-xs font-mono font-bold text-amber-300">
                {(currentIndex % Math.max(1, filteredHadiths.length)) + 1} /{' '}
                {filteredHadiths.length}
              </span>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next Hadith"
                className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Theme Pills & Quick Search */}
        <div className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800/70">
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              {
                id: 'all',
                label: { ar: 'كل الأحاديث الكونية', en: 'All Cosmic Hadiths', fr: 'Tous les Hadiths' },
              },
              {
                id: 'sky-contemplation',
                label: { ar: 'التفكر في السماء ليلاً', en: 'Night Sky Reflection', fr: 'Ciel Nocturne' },
              },
              {
                id: 'eclipses-sun-moon',
                label: { ar: 'الشمس والقمر والكسوف', en: 'Sun, Moon & Eclipses', fr: 'Soleil & Éclipses' },
              },
              {
                id: 'stars-guidance',
                label: { ar: 'النجوم وأمان السماء', en: 'Stars & Sky Order', fr: 'Étoiles' },
              },
              {
                id: 'lunar-timekeeping',
                label: { ar: 'الأهلة والمواقيت الفلكية', en: 'Lunar & Solar Time', fr: 'Cycles & Temps' },
              },
              {
                id: 'heavens-vastness',
                label: { ar: 'بدء الخلق وعظمة السماوات', en: 'Creation of Heavens', fr: 'Création Cosmique' },
              },
            ].map((tab) => {
              const active = selectedTheme === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setSelectedTheme(tab.id);
                    setCurrentIndex(0);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    active
                      ? 'bg-amber-500 text-slate-950 shadow-sm'
                      : 'bg-slate-900/90 text-slate-300 hover:text-white border border-slate-800'
                  }`}
                >
                  {tab.label[language]}
                </button>
              );
            })}
          </div>

          <div className="relative w-full md:w-64">
            <Search className="w-3.5 h-3.5 absolute start-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentIndex(0);
              }}
              placeholder={
                language === 'ar' ? 'ابحث في الأحاديث الكونية...' : 'Search Prophetic Hadiths...'
              }
              className="w-full ps-8 pe-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        {/* Main Hadith Card & Dual Analysis */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left / Main Hadith Text Box (7 cols) */}
          <div className="lg:col-span-7 rounded-3xl bg-gradient-to-b from-[#070f20] to-[#040914] border-2 border-amber-500/40 p-6 sm:p-8 space-y-5 shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold">
                {activeHadith.themeLabel[language]}
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleToggleFavorite(activeHadith.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                    isFavorited
                      ? 'bg-amber-500 text-slate-950 border-amber-400'
                      : 'bg-slate-900 text-slate-300 border-slate-700 hover:text-white'
                  }`}
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>
                    {isFavorited
                      ? language === 'ar'
                        ? 'في المفضلة'
                        : 'Saved'
                      : language === 'ar'
                      ? 'حفظ الحديث'
                      : 'Bookmark'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyHadith}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-bold border border-slate-700 transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-300">
                        {language === 'ar' ? 'تم النسخ' : 'Copied'}
                      </span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{language === 'ar' ? 'نسخ الحديث' : 'Copy'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <h3 className="text-lg sm:text-xl font-black text-white">
              {activeHadith.title[language]}
            </h3>

            {/* Narrator & Arabic Matn */}
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-950/90 border border-amber-500/30 space-y-4">
              <div className="text-xs font-bold text-amber-400">
                {language === 'ar' ? 'عن الصحابي الجليل: ' : 'Narrated by: '}
                <span className="text-white">{activeHadith.narrator[language]}</span>
              </div>

              <p
                dir="rtl"
                data-testid="hadith-arabic-text"
                className="font-quran text-2xl sm:text-3xl leading-[2.15] text-amber-100 text-justify"
              >
                {activeHadith.arabicText}
              </p>

              {language !== 'ar' && (
                <p className="text-xs sm:text-sm italic text-slate-200 leading-relaxed border-t border-slate-800 pt-3">
                  "{activeHadith.translation[language === 'fr' ? 'fr' : 'en']}"
                </p>
              )}
            </div>

            {/* Verified Hadith Source & Citation */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
              <div className="flex items-center gap-2 text-emerald-300 font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  {language === 'ar' ? 'التخريج والمصدر المعتمد: ' : 'Verified Citation: '}
                  {activeHadith.source[language]}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): Classical Commentary + Cosmic Reflection + Quranic Harmony */}
          <div className="lg:col-span-5 space-y-4">
            {/* 1. Classical Hadith Commentary */}
            <div className="p-5 rounded-2xl bg-slate-950/85 border border-amber-500/30 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-black text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-amber-400" />
                  <span>
                    {language === 'ar'
                      ? 'الشرح الحديثي المعتمد (فتح الباري / شرح مسلم)'
                      : 'Classical Hadith Commentary'}
                  </span>
                </span>
              </div>
              <div className="text-[11px] font-bold text-slate-400">
                {activeHadith.classicalCommentary.scholar[language]}
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {activeHadith.classicalCommentary.explanation[language]}
              </p>
            </div>

            {/* 2. Cosmic & Astronomical Reflection */}
            <div className="p-5 rounded-2xl bg-slate-950/85 border border-cyan-500/30 space-y-2">
              <span className="text-xs font-black text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>
                  {language === 'ar'
                    ? 'الأفق الفلكي والتأمل الكوني المنضبط'
                    : 'Cosmic & Astronomical Reflection'}
                </span>
              </span>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {activeHadith.cosmicReflection[language]}
              </p>
            </div>

            {/* 3. Harmonious Quranic Verse */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/40 to-slate-950 border border-emerald-500/30 space-y-2">
              <span className="text-[11px] font-bold text-emerald-300 block">
                {language === 'ar'
                  ? 'الشاهد القرآني المتصل بمعنى الحديث:'
                  : 'Related Quranic Verse:'}
              </span>
              <p dir="rtl" className="font-quran text-xl text-amber-200 leading-relaxed">
                {activeHadith.relatedQuranVerse.arabic}
              </p>
              <span className="text-[11px] font-bold text-emerald-400 block">
                {activeHadith.relatedQuranVerse.reference[language]}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
