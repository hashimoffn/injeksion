/* ==========================================================================
   Azərbaycan Respublikasının Bütün 74 Şəhər və Rayonu (Real GPS & İqlim Zonaları)
   ========================================================================== */

window.INJ_REGIONS = [
  /* --- Mərkəzi Aran (Pilot: Mingəçevir) --- */
  { id: 'mingecevir', name: 'Mingəçevir', region: 'Mərkəzi Aran', climate: 'aran', lat: 40.7702, lng: 47.0435, pilot: true },
  { id: 'yevlax', name: 'Yevlax', region: 'Mərkəzi Aran', climate: 'aran', lat: 40.6183, lng: 47.1501 },
  { id: 'agdas', name: 'Ağdaş', region: 'Mərkəzi Aran', climate: 'aran', lat: 40.6470, lng: 47.4738 },
  { id: 'goycay', name: 'Göyçay', region: 'Mərkəzi Aran', climate: 'aran', lat: 40.6531, lng: 47.7406 },
  { id: 'kurdemir', name: 'Kürdəmir', region: 'Mərkəzi Aran', climate: 'aran', lat: 40.3453, lng: 48.1509 },
  { id: 'ucar', name: 'Ucar', region: 'Mərkəzi Aran', climate: 'aran', lat: 40.5190, lng: 47.6542 },
  { id: 'zerdab', name: 'Zərdab', region: 'Mərkəzi Aran', climate: 'aran', lat: 40.2184, lng: 47.7121 },

  /* --- Gəncə-Daşkəsən (Pilot: Gəncə) --- */
  { id: 'gence', name: 'Gəncə', region: 'Gəncə-Daşkəsən', climate: 'qerb', lat: 40.6828, lng: 46.3606, pilot: true },
  { id: 'naftalan', name: 'Naftalan', region: 'Gəncə-Daşkəsən', climate: 'aran', lat: 40.5067, lng: 46.8250 },
  { id: 'goygol', name: 'Göygöl', region: 'Gəncə-Daşkəsən', climate: 'dag', lat: 40.5858, lng: 46.3189 },
  { id: 'daskesen', name: 'Daşkəsən', region: 'Gəncə-Daşkəsən', climate: 'dag', lat: 40.5202, lng: 46.0779 },
  { id: 'goranboy', name: 'Goranboy', region: 'Gəncə-Daşkəsən', climate: 'aran', lat: 40.6103, lng: 46.7897 },
  { id: 'samux', name: 'Samux', region: 'Gəncə-Daşkəsən', climate: 'qerb', lat: 40.7649, lng: 46.4087 },

  /* --- Bakı Şəhəri və 12 Rayonu --- */
  { id: 'baki', name: 'Bakı (Ümumi)', region: 'Bakı', climate: 'abseron', lat: 40.4093, lng: 49.8671, pilot: true },
  { id: 'sebail', name: 'Səbail (Bakı)', region: 'Bakı', climate: 'abseron', lat: 40.3656, lng: 49.8352, sub: true },
  { id: 'yasamal', name: 'Yasamal (Bakı)', region: 'Bakı', climate: 'abseron', lat: 40.3886, lng: 49.8091, sub: true },
  { id: 'nesimi', name: 'Nəsimi (Bakı)', region: 'Bakı', climate: 'abseron', lat: 40.3958, lng: 49.8396, sub: true },
  { id: 'nerimanov', name: 'Nərimanov (Bakı)', region: 'Bakı', climate: 'abseron', lat: 40.4084, lng: 49.8744, sub: true },
  { id: 'nizami-baki', name: 'Nizami (Bakı)', region: 'Bakı', climate: 'abseron', lat: 40.4098, lng: 49.9412, sub: true },
  { id: 'xetai', name: 'Xətai (Bakı)', region: 'Bakı', climate: 'abseron', lat: 40.3821, lng: 49.9145, sub: true },
  { id: 'bineqedi', name: 'Binəqədi (Bakı)', region: 'Bakı', climate: 'abseron', lat: 40.4535, lng: 49.8261, sub: true },
  { id: 'sabuncu', name: 'Sabunçu (Bakı)', region: 'Bakı', climate: 'abseron', lat: 40.4436, lng: 49.9482, sub: true },
  { id: 'suraxani', name: 'Suraxanı (Bakı)', region: 'Bakı', climate: 'abseron', lat: 40.4225, lng: 50.0042, sub: true },
  { id: 'xezer', name: 'Xəzər (Bakı)', region: 'Bakı', climate: 'abseron', lat: 40.4892, lng: 50.1456, sub: true },
  { id: 'qaradag', name: 'Qaradağ (Bakı)', region: 'Bakı', climate: 'abseron', lat: 40.3125, lng: 49.7014, sub: true },
  { id: 'pirallahi', name: 'Pirallahı (Bakı)', region: 'Bakı', climate: 'abseron', lat: 40.4564, lng: 50.3248, sub: true },
  { id: 'sumqayit', name: 'Sumqayıt', region: 'Abşeron-Xızı', climate: 'abseron', lat: 40.5897, lng: 49.6686, pilot: true },
  { id: 'abseron', name: 'Abşeron (Xırdalan)', region: 'Abşeron-Xızı', climate: 'abseron', lat: 40.4481, lng: 49.7550 },
  { id: 'xizi', name: 'Xızı', region: 'Abşeron-Xızı', climate: 'dag', lat: 40.9085, lng: 49.0748 },

  /* --- Qarabağ --- */
  { id: 'susa', name: 'Şuşa', region: 'Qarabağ', climate: 'qarabag', lat: 39.7590, lng: 46.7486, pilot: true },
  { id: 'xankendi', name: 'Xankəndi', region: 'Qarabağ', climate: 'qarabag', lat: 39.8177, lng: 46.7528 },
  { id: 'agdam', name: 'Ağdam', region: 'Qarabağ', climate: 'qarabag', lat: 39.9910, lng: 46.9274 },
  { id: 'fuzuli', name: 'Füzuli', region: 'Qarabağ', climate: 'qarabag', lat: 39.6009, lng: 47.1431 },
  { id: 'berde', name: 'Bərdə', region: 'Qarabağ', climate: 'aran', lat: 40.3744, lng: 47.1267 },
  { id: 'agcabedi', name: 'Ağcabədi', region: 'Qarabağ', climate: 'aran', lat: 40.0502, lng: 47.4594 },
  { id: 'terter', name: 'Tərtər', region: 'Qarabağ', climate: 'aran', lat: 40.3420, lng: 46.9316 },
  { id: 'xocali', name: 'Xocalı', region: 'Qarabağ', climate: 'qarabag', lat: 39.9133, lng: 46.7903 },
  { id: 'xocavend', name: 'Xocavənd', region: 'Qarabağ', climate: 'qarabag', lat: 39.7953, lng: 47.1101 },
  { id: 'agdere', name: 'Ağdərə', region: 'Qarabağ', climate: 'qarabag', lat: 40.2153, lng: 46.8128 },

  /* --- Şərqi Zəngəzur --- */
  { id: 'zengilan', name: 'Zəngilan', region: 'Şərqi Zəngəzur', climate: 'qarabag', lat: 39.0837, lng: 46.6525 },
  { id: 'cebrayil', name: 'Cəbrayıl', region: 'Şərqi Zəngəzur', climate: 'qarabag', lat: 39.3992, lng: 47.0284 },
  { id: 'qubadli', name: 'Qubadlı', region: 'Şərqi Zəngəzur', climate: 'qarabag', lat: 39.3444, lng: 46.5818 },
  { id: 'lacin', name: 'Laçın', region: 'Şərqi Zəngəzur', climate: 'dag', lat: 39.6409, lng: 46.5461 },
  { id: 'kelbecer', name: 'Kəlbəcər', region: 'Şərqi Zəngəzur', climate: 'dag', lat: 40.1098, lng: 46.0445 },

  /* --- Qazax-Tovuz --- */
  { id: 'qazax', name: 'Qazax', region: 'Qazax-Tovuz', climate: 'qerb', lat: 41.0925, lng: 45.3656 },
  { id: 'tovuz', name: 'Tovuz', region: 'Qazax-Tovuz', climate: 'qerb', lat: 40.9925, lng: 45.6284 },
  { id: 'semkir', name: 'Şəmkir', region: 'Qazax-Tovuz', climate: 'qerb', lat: 40.8297, lng: 46.0178 },
  { id: 'agstafa', name: 'Ağstafa', region: 'Qazax-Tovuz', climate: 'qerb', lat: 41.1189, lng: 45.4539 },
  { id: 'gedebey', name: 'Gədəbəy', region: 'Qazax-Tovuz', climate: 'dag', lat: 40.5699, lng: 45.8123 },

  /* --- Şəki-Zaqatala --- */
  { id: 'seki', name: 'Şəki', region: 'Şəki-Zaqatala', climate: 'dag', lat: 41.1919, lng: 47.1706, pilot: true },
  { id: 'qebele', name: 'Qəbələ', region: 'Şəki-Zaqatala', climate: 'dag', lat: 40.9814, lng: 47.8458 },
  { id: 'zaqatala', name: 'Zaqatala', region: 'Şəki-Zaqatala', climate: 'dag', lat: 41.6316, lng: 46.6448 },
  { id: 'balaken', name: 'Balakən', region: 'Şəki-Zaqatala', climate: 'dag', lat: 41.7263, lng: 46.4048 },
  { id: 'qax', name: 'Qax', region: 'Şəki-Zaqatala', climate: 'dag', lat: 41.4183, lng: 46.9204 },
  { id: 'oguz', name: 'Oğuz', region: 'Şəki-Zaqatala', climate: 'dag', lat: 41.0713, lng: 47.4651 },

  /* --- Quba-Xaçmaz --- */
  { id: 'quba', name: 'Quba', region: 'Quba-Xaçmaz', climate: 'dag', lat: 41.3611, lng: 48.5134, pilot: true },
  { id: 'xacmaz', name: 'Xaçmaz', region: 'Quba-Xaçmaz', climate: 'simal', lat: 41.4643, lng: 48.8057 },
  { id: 'qusar', name: 'Qusar', region: 'Quba-Xaçmaz', climate: 'dag', lat: 41.4267, lng: 48.4302 },
  { id: 'sabran', name: 'Şabran', region: 'Quba-Xaçmaz', climate: 'simal', lat: 41.2012, lng: 48.9871 },
  { id: 'siyezen', name: 'Siyəzən', region: 'Quba-Xaçmaz', climate: 'simal', lat: 41.0761, lng: 49.1139 },

  /* --- Dağlıq Şirvan --- */
  { id: 'samaxi', name: 'Şamaxı', region: 'Dağlıq Şirvan', climate: 'dag', lat: 40.6314, lng: 48.6414 },
  { id: 'ismayilli', name: 'İsmayıllı', region: 'Dağlıq Şirvan', climate: 'dag', lat: 40.7849, lng: 48.1514 },
  { id: 'agsu', name: 'Ağsu', region: 'Dağlıq Şirvan', climate: 'aran', lat: 40.5703, lng: 48.4009 },
  { id: 'qobustan', name: 'Qobustan', region: 'Dağlıq Şirvan', climate: 'abseron', lat: 40.5336, lng: 48.9282 },

  /* --- Şirvan-Salyan --- */
  { id: 'sirvan', name: 'Şirvan', region: 'Şirvan-Salyan', climate: 'aran', lat: 39.9378, lng: 48.9290 },
  { id: 'salyan', name: 'Salyan', region: 'Şirvan-Salyan', climate: 'aran', lat: 39.5962, lng: 48.9848 },
  { id: 'neftcala', name: 'Neftçala', region: 'Şirvan-Salyan', climate: 'aran', lat: 39.3768, lng: 49.2470 },
  { id: 'bilesuvar', name: 'Biləsuvar', region: 'Şirvan-Salyan', climate: 'aran', lat: 39.4583, lng: 48.5450 },
  { id: 'haciqabul', name: 'Hacıqabul', region: 'Şirvan-Salyan', climate: 'aran', lat: 40.0394, lng: 48.9356 },

  /* --- Mil-Muğan --- */
  { id: 'sabirabad', name: 'Sabirabad', region: 'Mil-Muğan', climate: 'aran', lat: 40.0087, lng: 48.4770 },
  { id: 'saatli', name: 'Saatlı', region: 'Mil-Muğan', climate: 'aran', lat: 39.9321, lng: 48.3689 },
  { id: 'imisli', name: 'İmişli', region: 'Mil-Muğan', climate: 'aran', lat: 39.8709, lng: 48.0600 },
  { id: 'beyleqan', name: 'Beyləqan', region: 'Mil-Muğan', climate: 'aran', lat: 39.7756, lng: 47.6186 },

  /* --- Lənkəran-Astara --- */
  { id: 'lenkeran', name: 'Lənkəran', region: 'Lənkəran-Astara', climate: 'cenub', lat: 38.7543, lng: 48.8506, pilot: true },
  { id: 'astara', name: 'Astara', region: 'Lənkəran-Astara', climate: 'cenub', lat: 38.4560, lng: 48.8750 },
  { id: 'masalli', name: 'Masallı', region: 'Lənkəran-Astara', climate: 'cenub', lat: 39.0353, lng: 48.6654 },
  { id: 'celilabad', name: 'Cəlilabad', region: 'Lənkəran-Astara', climate: 'cenub', lat: 39.2096, lng: 48.4919 },
  { id: 'lerik', name: 'Lerik', region: 'Lənkəran-Astara', climate: 'cenub', lat: 38.7739, lng: 48.4150 },
  { id: 'yardimli', name: 'Yardımlı', region: 'Lənkəran-Astara', climate: 'cenub', lat: 38.9077, lng: 48.2405 },

  /* --- Naxçıvan MR --- */
  { id: 'naxcivan', name: 'Naxçıvan', region: 'Naxçıvan MR', climate: 'naxcivan', lat: 39.2089, lng: 45.4122, pilot: true },
  { id: 'serur', name: 'Şərur', region: 'Naxçıvan MR', climate: 'naxcivan', lat: 39.5529, lng: 44.9799 },
  { id: 'babek', name: 'Babək', region: 'Naxçıvan MR', climate: 'naxcivan', lat: 39.1508, lng: 45.4485 },
  { id: 'ordubad', name: 'Ordubad', region: 'Naxçıvan MR', climate: 'naxcivan', lat: 38.9096, lng: 46.0227 },
  { id: 'culfa', name: 'Culfa', region: 'Naxçıvan MR', climate: 'naxcivan', lat: 38.9539, lng: 45.6296 },
  { id: 'sahbuz', name: 'Şahbuz', region: 'Naxçıvan MR', climate: 'naxcivan', lat: 39.4072, lng: 45.5739 },
  { id: 'kengerli', name: 'Kəngərli', region: 'Naxçıvan MR', climate: 'naxcivan', lat: 39.3872, lng: 45.1640 },
  { id: 'sederek', name: 'Sədərək', region: 'Naxçıvan MR', climate: 'naxcivan', lat: 39.7142, lng: 44.8842 }
];

/* Climate-specific urban green infrastructure generator for any rayon */
window.INJ_BUILD_CITY_DATA = function (reg) {
  // Use handcrafted flagship data for Mingəçevir and Gəncə
  if (window.INJ_DATA && INJ_DATA.makroCities[reg.id]) {
    const base = INJ_DATA.makroCities[reg.id];
    return { ...base, regionName: reg.region, climate: reg.climate };
  }

  const codePrefix = reg.id.slice(0, 2).toUpperCase();
  const presets = {
    abseron: {
      sev1: 'Güclü Külək, Toz & İstilik Adası (+4.6°C)',
      sev2: 'Sıx Tikili & Aşağı Yaşıllıq Əmsalı',
      sev3: 'Şoran Torpaq & Sahil Eroziyası',
      t1: '-3.4°C', t2: '-3.8°C', t3: '-2.9°C',
      c1: '58 ton/il', c2: '49 ton/il', c3: '41 ton/il',
      b1: '175 000 AZN', b2: '152 000 AZN', b3: '134 000 AZN',
      r1: [
        'Küləyə davamlı 22 ədəd modulyar şaquli bio-kölgəlik qülləsi',
        'Şoranlığa davamlı yerli Eldar şamı və zeytun bio-dəhlizi (500 m²)',
        'PM2.5 toz və külək sensorlu ağıllı mikro-dumanlama dirəkləri'
      ],
      r2: [
        'Çoxmərtəbəli fasadlar üçün yüngül alüminium yaşıl kaset sistemi',
        'Avtobus dayanacaqlarında "İNJEKSİON Yaşıl Dam" modulları',
        'Avtomatik damcı suvarma və boz-su (greywater) təkrar dövriyyəsi'
      ],
      r3: [
        'Duzlu dəniz küləyini kəsən 3 pilləli canlı bio-sədd',
        'Yağış suyunu saxlayan süngər-şəhər (sponge city) drenaj bağçaları',
        'Solar LED landşaft işıqlandırması və IoT rütubət monitorinqi'
      ]
    },
    aran: {
      sev1: 'Kritik Yay İstilik Adası (+5.1°C)',
      sev2: 'Quraqlıq & Açıq Asfalt Radiasiyası',
      sev3: 'Külək Eroziyası & Toz Dəhlizi',
      t1: '-4.2°C', t2: '-3.5°C', t3: '-3.1°C',
      c1: '46 ton/il', c2: '39 ton/il', c3: '52 ton/il',
      b1: '138 000 AZN', b2: '119 000 AZN', b3: '146 000 AZN',
      r1: [
        '16 ədəd günəş enerjili şaquli yaşıl kölgəlik və dumanlama modulu',
        'Quraqlığa davamlı yerli çinar, tut və zeytun yaşıl piyada dəhlizi',
        'Yeraltı sensorlu 60% suya qənaətcil damcı suvarma şəbəkəsi'
      ],
      r2: [
        'Mərkəzi meydanda biofilik beton-polad perqola və sarmaşıq qalxanı',
        'İstilik udan asfaltın əvəzinə eko-keçirici yaşıl daş örtük (380 m²)',
        'Məktəb və park ətrafı Miyawaki sürətli mikro-meşə pilotu'
      ],
      r3: [
        'Şəhər girişində 900 m uzunluğunda 3 pilləli toz-səs bio-baryeri',
        'Suvarma kanalı boyunca sahil möhkəmləndirən canlı bio-örtük',
        'Real vaxtlı istilik və AQI telemetriya paneli'
      ]
    },
    qarabag: {
      sev1: 'Ağıllı Şəhər (Smart Eco-City) Yaşıl Zənciri',
      sev2: 'Yeni Məhəllə Mikroiqlim Balansı',
      sev3: 'Dağətəyi Yamac Eroziyası Riski',
      t1: '-3.2°C', t2: '-3.0°C', t3: '-2.6°C',
      c1: '55 ton/il', c2: '44 ton/il', c3: '48 ton/il',
      b1: '162 000 AZN', b2: '141 000 AZN', b3: '128 000 AZN',
      r1: [
        'Sıfır-karbon (Net-Zero) yaşıl bulvar və modulyar şaquli bağlar',
        'Binaların dam və fasadlarında inteqrasiya olunmuş bio-panellər',
        'Yağış suyu yığıcı süngər-şəhər (sponge city) park infrastrukturu'
      ],
      r2: [
        'Yeni yaşayış kompleksləri arasında kölgəli piyada yaşıl dəhlizləri',
        'Yerli Qarabağ florasına əsaslanan bioloji müxtəliflik adacıqları',
        'IoT iqlim, rütubət və enerji qənaəti idarəetmə mərkəzi'
      ],
      r3: [
        'Geohücrəli canlı yamac möhkəmləndirmə və ağaclandırma zolağı',
        'Sel sularını ləngidən təbii bio-retensiya terrasları',
        'Solar eko-işıqlandırma və peyk telemetriya nəzarəti'
      ]
    },
    cenub: {
      sev1: 'Güclü Yağıntı & Səth Sel Riski',
      sev2: 'Yüksək Rütubət & Şəhər Drenaj Yükü',
      sev3: 'Nəqliyyat Arteriyası CO₂ Yığılması',
      t1: '-2.8°C', t2: '-2.5°C', t3: '-3.1°C',
      c1: '61 ton/il', c2: '47 ton/il', c3: '43 ton/il',
      b1: '144 000 AZN', b2: '126 000 AZN', b3: '118 000 AZN',
      r1: [
        'Süngər-şəhər (sponge city) yağış bağçaları və keçirici bio-drenaj',
        'Subtropik iqlimə uyğun dəmirağac və bambuk su-uducu dəhlizlər',
        'Su səviyyəsi və drenaj axını üçün IoT erkən xəbərdarlıq sensorları'
      ],
      r2: [
        'Mərkəzi küçələrdə rütubəti balanslayan modulyar yaşıl fasadlar',
        'Çay kənarı bio-mühəndislik sahil bərkidilməsi (450 m)',
        'Yaşıl damlı ağıllı ictimai nəqliyyat dayanacaqları'
      ],
      r3: [
        'Yol kənarı sıx yarpaqlı akustik və karbon-uducu canlı baryer',
        'Piyada zonalarında günəş panelli eko-perqola arxitekturası',
        'Hava keyfiyyəti (AQI) canlı şəhər monitorinq tablosu'
      ]
    },
    naxcivan: {
      sev1: 'Kəskin Kontinental İstilik Stressi (+5.0°C)',
      sev2: 'Aşağı Rütubət & Quru Toz Axını',
      sev3: 'Açıq Meydanlarda Kölgə Çatışmazlığı',
      t1: '-4.3°C', t2: '-3.6°C', t3: '-3.2°C',
      c1: '44 ton/il', c2: '38 ton/il', c3: '36 ton/il',
      b1: '136 000 AZN', b2: '122 000 AZN', b3: '114 000 AZN',
      r1: [
        'Günəş panelli mikro-dumanlama və şaquli yaşıl kölgəlik qüllələri',
        'Quraqlığa və şaxtaya davamlı yerli badam, ərik və çinar dəhlizləri',
        'Yeraltı kapilyar suvarma ilə 65% su qənaəti sistemi'
      ],
      r2: [
        'Şəhər kənarında külək və tozu kəsən yaşıl qoruyucu qurşaq',
        'Mərkəzi binalarda istilik izolyasiyalı modulyar yaşıl divarlar',
        'Rütubət və torpaq temperaturu üzrə ağıllı IoT nəzarət'
      ],
      r3: [
        'Biofilik memarlıq perqolaları və enerji qənaətli kölgəlik meydanlar',
        'Yağış və qar sularını toplayan yeraltı bio-rezervuar bağçaları',
        'Sakinlər üçün canlı mikroiqlim məlumat paneli'
      ]
    },
    dag: {
      sev1: 'Yamac Eroziyası & Sel Axını Riski',
      sev2: 'Turizm Mərkəzi Nəqliyyat & CO₂ Yükü',
      sev3: 'Tarixi / Mərkəzi Məkan Bio-Qorunması',
      t1: '-2.6°C', t2: '-3.0°C', t3: '-2.4°C',
      c1: '52 ton/il', c2: '41 ton/il', c3: '37 ton/il',
      b1: '132 000 AZN', b2: '124 000 AZN', b3: '112 000 AZN',
      r1: [
        'Canlı geohücrə yamac bərkidilməsi və yerli dağ florası örtüyü',
        'Dağ çayları boyunca sel ləngidici bio-drenaj terrasları',
        'Avtomatik torpaq rütubəti və sürüşmə xəbərdarlıq sensorları'
      ],
      r2: [
        'Turizm küçələrində ekoloji yaşıl dayanacaqlar və şaquli bağlar',
        'Piyada zonalarında beton səthləri sərinlədən modulyar planterlər',
        'Elektrik və solar eko-işıqlandırma inteqrasiyası'
      ],
      r3: [
        'Tarixi memarlığa zərər verməyən müstəqil modulyar yaşıl çərçivələr',
        'Akustik səs-küyü azaldan təbii mamır və bitki baryerləri',
        'Mikroiqlim və hava keyfiyyəti (AQI) telemetriya məntəqəsi'
      ]
    }
  };

  const p = presets[reg.climate] || presets.aran;
  const fLat = (v) => v.toFixed(4) + '° N';
  const fLng = (v) => v.toFixed(4) + '° E';

  const z1Lat = reg.lat + 0.0012;
  const z1Lng = reg.lng + 0.0025;
  const z2Lat = reg.lat + 0.0085;
  const z2Lng = reg.lng - 0.0140;
  const z3Lat = reg.lat - 0.0068;
  const z3Lng = reg.lng + 0.0095;

  return {
    id: reg.id,
    name: `${reg.name} Pilot Zonası`,
    regionName: reg.region,
    climate: reg.climate,
    subtitle: `${reg.region} iqtisadi rayonu • Real peyk əsaslı yaşıl infrastruktur analizi`,
    coords: `${fLat(reg.lat)}, ${fLng(reg.lng)}`,
    center: { lat: reg.lat, lng: reg.lng, zoom: reg.id === 'baki' ? 12.2 : 13.6 },
    satImage: null,
    z14Start: null,
    zones: [
      {
        id: `${reg.id}-1`,
        code: `${codePrefix}-R01`,
        lat: z1Lat,
        lng: z1Lng,
        gps: `${fLat(z1Lat)}, ${fLng(z1Lng)}`,
        name: `${reg.name} — Mərkəzi Meydan və Nəqliyyat Qovşağı`,
        severity: p.sev1,
        tempDrop: p.t1,
        co2Year: p.c1,
        budget: p.b1,
        timeline: '4 ay',
        problem: `${reg.name} şəhər mərkəzində sıx asfalt-beton örtüyü və nəqliyyat axını yay aylarında yüksək istilik və hava çirklənməsi riski yaradır.`,
        recipes: p.r1,
        bom: [
          { item: 'Modulyar Şaquli Yaşıl Qüllə & Kölgəlik', qty: '16 ədəd', cost: '62 000 AZN' },
          { item: 'Yerli İqlimə Adaptiv Yaşıl Dəhliz Paketi', qty: '420 m²', cost: '48 000 AZN' },
          { item: 'IoT Mikroiqlim & Ağıllı Suvarma Mərkəzi', qty: '5 qovşaq', cost: '28 000 AZN' }
        ]
      },
      {
        id: `${reg.id}-2`,
        code: `${codePrefix}-R02`,
        lat: z2Lat,
        lng: z2Lng,
        gps: `${fLat(z2Lat)}, ${fLng(z2Lng)}`,
        name: `${reg.name} — Yaşayış Massivi və Şimal-Qərb Keçidi`,
        severity: p.sev2,
        tempDrop: p.t2,
        co2Year: p.c2,
        budget: p.b2,
        timeline: '3.5 ay',
        problem: `Yaşayış binaları və məhəlləarası beton həyətlərdə kölgə çatışmazlığı və zəif hava dövriyyəsi müşahidə olunur.`,
        recipes: p.r2,
        bom: [
          { item: 'Fasad & Dayanacaq Modulyar Yaşıl Kaseti', qty: '240 m²', cost: '58 000 AZN' },
          { item: 'Miyawaki Məhəllə Mikro-Meşə Paketi', qty: '450 m²', cost: '42 000 AZN' },
          { item: 'Avtomatik Damcı Suvarma Şəbəkəsi', qty: '3 sistem', cost: '22 000 AZN' }
        ]
      },
      {
        id: `${reg.id}-3`,
        code: `${codePrefix}-R03`,
        lat: z3Lat,
        lng: z3Lng,
        gps: `${fLat(z3Lat)}, ${fLng(z3Lng)}`,
        name: `${reg.name} — Ekoloji Bufer və Yaşıl Dəhliz Zonası`,
        severity: p.sev3,
        tempDrop: p.t3,
        co2Year: p.c3,
        budget: p.b3,
        timeline: '3 ay',
        problem: `Şəhər kənarı açıq sahələrdə toz, külək və ya səth sularının idarə olunması üçün qoruyucu yaşıl baryer tələb olunur.`,
        recipes: p.r3,
        bom: [
          { item: '3 Pilləli Canlı Ekoloji Baryer & Bio-Drenaj', qty: '850 m', cost: '64 000 AZN' },
          { item: 'Biofilik Perqola & Səth Müdafiə Örtüyü', qty: '320 m²', cost: '34 000 AZN' },
          { item: 'Solar Eko-İşıqlandırma & AQI Sensor', qty: '18 ədəd', cost: '20 000 AZN' }
        ]
      }
    ]
  };
};
