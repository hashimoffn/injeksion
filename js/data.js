/* ==========================================================================
   İNJEKSİON — Birləşdirilmiş 100% Client-Side Domain Data (UTF-8)
   Ümumi Yerli Tərəfdaş Ekosistemi + 4 Məkanlı MEZO + Sensorlu MİKRO
   ========================================================================== */

window.INJ_DATA = {
  /* ---------------- 1. MİKRO (B2C — 3D Yapboz) ---------------- */
  mikroRooms: [
    {
      id: 'loft',
      name: 'Loft Otaq',
      meta: '32 m² • Beton İnteryer',
      image: 'assets/loft-room.jpg',
      afterImage: 'assets/loft-room-after.jpg',
      defaultArea: '32 m²'
    },
    {
      id: 'eyvan',
      name: 'Eyvan',
      meta: '14 m² • Şəhər Mənzərəsi',
      image: 'assets/balcony-room.jpg',
      afterImage: 'assets/balcony-room-after.jpg',
      defaultArea: '14 m²'
    }
  ],

  mikroProblems: [
    {
      id: 'light',
      title: 'Zəif İşıq və Beton Soyuqluğu',
      metric: 'İşıq < 180 Lüks',
      sub: 'Qaranlıq künc, canlılıq və spektr çatışmazlığı',
      icon: 'sun',
      packageName: 'İNJEKSİON "Loft Zümrüd" 3D Paketi',
      oldPrice: 1120,
      price: 890,
      impact: { o2: '+38% O₂ Balansı', noise: '-14 dB Akustika', install: '30 dəq quraşdırma' },
      hotspots: [
        {
          id: 'hs-moss',
          x: 34,
          y: 38,
          shortLabel: 'Mamır Paneli Pro',
          category: '3D Modulyar Divar',
          name: 'Stabilləşdirilmiş Zümrüd Mamır Paneli (120×60 sm)',
          spec: 'Suvarma tələb etmir • Akustik udma 0.85 NRC',
          price: 420,
          image: 'assets/prod-moss.jpg'
        },
        {
          id: 'hs-lamp',
          x: 52,
          y: 19,
          shortLabel: 'Ağıllı Fitolampa',
          category: 'Tam Spektr İşıqlandırma',
          name: 'İNJEKSİON Linear Fitolampa L-900',
          spec: 'PPFD 240 µmol • Avtomatik günəş tsikli (App/Timer)',
          price: 230,
          image: 'assets/prod-phytolamp.jpg'
        },
        {
          id: 'hs-plant',
          x: 74,
          y: 62,
          shortLabel: 'Hidroponik Bitki',
          category: 'Ağıllı Bio-Modul',
          name: 'Beton-Şüşə Hidroponik Monstera Sütunu',
          spec: '30 gün avtonom su rezervi • Havanı formaldehiddən təmizləyir',
          price: 240,
          image: 'assets/prod-hydroponic.jpg'
        }
      ]
    },
    {
      id: 'air',
      title: 'Quru Hava, Toz və Tüstü',
      metric: 'CO₂ > 1150 ppm',
      sub: 'PM2.5 hissəcikləri, zəif havalandırma və aşağı rütubət',
      icon: 'wind',
      packageName: 'İNJEKSİON "Təmiz Nəfəs" Bio-Filtr Paketi',
      oldPrice: 1290,
      price: 1040,
      impact: { o2: '-64% PM2.5 Toz', noise: '+18% Təbii Rütubət', install: '45 dəq quraşdırma' },
      hotspots: [
        {
          id: 'hs-hydro-1',
          x: 26,
          y: 58,
          shortLabel: 'Bio-Filtr Sütunu',
          category: 'Aktiv Hava Təmizləyici',
          name: 'İkili Hidroponik Bio-Filtr Qülləsi',
          spec: 'Saatda 45 m³ bioloji hava dövriyyəsi • Səssiz nasos',
          price: 490,
          image: 'assets/prod-hydroponic.jpg'
        },
        {
          id: 'hs-moss-2',
          x: 54,
          y: 36,
          shortLabel: 'Rütubət Stabilizatoru',
          category: '3D Mamır Matrisi',
          name: 'Nəmlik Tənzimləyən Heksaqonal Mamır (3 modul)',
          spec: '45–55% optimal rütubət • Antistatik toz tutucu',
          price: 360,
          image: 'assets/prod-hex-moss.jpg'
        },
        {
          id: 'hs-lamp-2',
          x: 70,
          y: 22,
          shortLabel: 'Bio-Spektr Lampa',
          category: 'Fotosintez Sürətləndirici',
          name: 'Spektral Fitolampa S-600 (Mat Qara)',
          spec: 'Gündəlik 10 saat enerjiyə qənaət rejimi • 18W',
          price: 190,
          image: 'assets/prod-phytolamp.jpg'
        }
      ]
    },
    {
      id: 'acoustic',
      title: 'Akustik Əks-Səda və Səs-küy',
      metric: 'Əks-səda 64 dB',
      sub: 'Çılpaq beton və şüşə səthlərdən qayıdan səs diskomfortu',
      icon: 'volume',
      packageName: 'İNJEKSİON "Səssiz Vahə" Akustik Paketi',
      oldPrice: 1450,
      price: 1180,
      impact: { o2: '-22 dB Səs Azalması', noise: '0.92 NRC Udma', install: '45 dəq quraşdırma' },
      hotspots: [
        {
          id: 'hs-moss-ac1',
          x: 38,
          y: 40,
          shortLabel: 'Akustik Mamır Divarı',
          category: 'Səs-İzolyasiya Modulu',
          name: '3D Relyefli Akustik Mamır Paneli (XL Dəst)',
          spec: 'Sıx təbii yosun qatı + gizli maqnit bərkidilmə',
          price: 680,
          image: 'assets/prod-moss.jpg'
        },
        {
          id: 'hs-plant-ac',
          x: 78,
          y: 66,
          shortLabel: 'Künc Bio-Baryer',
          category: 'Canlı Bitki Modulu',
          name: 'Həndəsi Eko-Beton Dibçək & Sansevieria',
          spec: 'Səs dalğalarını sındıran sıx yarpaq və məsaməli beton',
          price: 290,
          image: 'assets/prod-plant-pot.jpg'
        },
        {
          id: 'hs-lamp-ac',
          x: 56,
          y: 18,
          shortLabel: 'Vurğu Fitolampası',
          category: 'Memarlıq İşıqı',
          name: 'Spot Fitolampa Pro (Alüminium Korpus)',
          spec: 'CRI 96+ təbii rəng ötürməsi • İsti zümrüd effekti',
          price: 210,
          image: 'assets/prod-phytolamp.jpg'
        }
      ]
    },
    {
      id: 'stress',
      title: 'Cansız Beton və Stress Mühiti',
      metric: 'Biofil İndeks 12%',
      sub: 'Boz divarlar yorğunluq yaradır, təbiətlə təmas yoxdur',
      icon: 'leaf',
      packageName: 'İNJEKSİON "Biofil Balans" Eko-Beton Paketi',
      oldPrice: 980,
      price: 790,
      impact: { o2: '+68% Biofil İndeks', noise: '-31% Vizual Stress', install: '30 dəq quraşdırma' },
      hotspots: [
        {
          id: 'hs-ecoblock',
          x: 34,
          y: 52,
          shortLabel: 'Məsaməli Eko-Beton',
          category: 'Bio-Reseptiv Modul',
          name: 'Yosunlu Məsaməli Eko-Beton Modul Dəsti',
          spec: 'Nəfəs alan mineral struktur • Təbii mikro-iqlim tənzimləyici',
          price: 310,
          image: 'assets/prod-ecoconcrete.jpg'
        },
        {
          id: 'hs-geopot',
          x: 72,
          y: 60,
          shortLabel: 'Həndəsi Beton Bitki',
          category: 'Lokal Sənətkarlıq Modulu',
          name: 'Həndəsi Eko-Beton Dibçək + Sansevieria & Monstera',
          spec: 'Gecə oksigen ifrazı • Az qulluq tələb edən kombinasiya',
          price: 290,
          image: 'assets/prod-plant-pot.jpg'
        },
        {
          id: 'hs-lamp-zen',
          x: 50,
          y: 20,
          shortLabel: 'İsti Spektr Lampa',
          category: 'Sirkadiyalı İşıq',
          name: 'Maqnit Relsli Bio-İşıq Barı (3000K–4500K)',
          spec: 'Axşam göz yormayan təbii meşə tonu',
          price: 190,
          image: 'assets/prod-phytolamp.jpg'
        }
      ]
    }
  ],

  /* ---------------- 2. MEZO (B2B — Otel / Restoran / Biznes / SPA) ---------------- */
  mezoVenues: [
    {
      id: 'hotel',
      name: 'Otel Lobisi',
      multiplier: 1.15,
      desc: 'VIP giriş, akustik komfort və brend prestiji',
      beforeImage: 'assets/mezo-before.jpg',
      afterImage: 'assets/mezo-after.jpg'
    },
    {
      id: 'restaurant',
      name: 'Restoran & Lounge',
      multiplier: 1.0,
      desc: 'Qonaq qalma müddətini artıran biofilik atmosfer',
      beforeImage: 'assets/mezo-restaurant-before.jpg',
      afterImage: 'assets/mezo-restaurant-after.jpg'
    },
    {
      id: 'office',
      name: 'Biznes Mərkəzi',
      multiplier: 0.92,
      desc: 'İşçi məhsuldarlığı və stress azaldılması',
      beforeImage: 'assets/mezo-office-before.jpg',
      afterImage: 'assets/mezo-office-after.jpg'
    },
    {
      id: 'spa',
      name: 'SPA & Wellness',
      multiplier: 1.22,
      desc: 'Yüksək rütubətə davamlı ekzotik yaşıl divarlar',
      beforeImage: 'assets/mezo-spa-before.jpg',
      afterImage: 'assets/mezo-spa-after.jpg'
    }
  ],

  mezoGoals: [
    { id: 'prestige', name: 'Luxury Estetika & Brend', factor: 1.12, roiMonths: 7, energySave: 14 },
    { id: 'acoustic', name: 'Akustik İzolyasiya', factor: 1.05, roiMonths: 9, energySave: 11 },
    { id: 'air', name: 'Hava & Mikroiqlim', factor: 1.08, roiMonths: 8, energySave: 19 },
    { id: 'modular', name: 'Sürətli Modulyar Montaj', factor: 0.94, roiMonths: 6, energySave: 12 }
  ],

  /* ---------------- 3. MAKRO (B2G — Mingəçevir / Gəncə Flagship + 87 Rayon) ---------------- */
  makroCities: {
    mingecevir: {
      id: 'mingecevir',
      name: 'Mingəçevir Pilot Zonası',
      subtitle: 'Kür sahili istilik adaları və sənaye keçid dəhlizləri',
      coords: '40.7703° N, 47.0496° E',
      center: { lat: 40.7702, lng: 47.0435, zoom: 13.5 },
      satImage: 'assets/sat-mingecevir.jpg',
      z14Start: { x: 10328, y: 6154 },
      zones: [
        {
          id: 'mg-1',
          code: 'MG-R01',
          lat: 40.7695,
          lng: 47.0585,
          gps: '40.7695° N, 47.0585° E',
          name: 'Mərkəzi Beton Meydanı və Nəqliyyat Qovşağı',
          severity: 'Kritik İstilik Adası (+4.8°C)',
          x: 685,
          y: 382,
          tempDrop: '-3.6°C',
          co2Year: '42 ton/il',
          budget: '148 000 AZN',
          timeline: '4 ay',
          problem: 'Yay aylarında asfalt və açıq beton səthlər 54°C-yə qədər qızır, piyada axını üçün yüksək termal stress yaradır.',
          recipes: [
            '18 ədəd modulyar şaquli kölgəlik qülləsi (suvarma sensorlu)',
            '420 m² suya qənaətcil bio-drenajlı yerli çinar və zeytun dəhlizi',
            'Günəş panelli mikro-dumanlama və PM2.5 monitorinq dirəkləri'
          ],
          bom: [
            { item: 'Modulyar Şaquli Yaşıl Qüllə (B2G-V4)', qty: '18 ədəd', cost: '64 800 AZN' },
            { item: 'Bio-Drenaj & İstiliyə Davamlı Ağac Paketi', qty: '420 m²', cost: '51 200 AZN' },
            { item: 'IoT Mikroiqlim & Suvarma İdarəetməsi', qty: '6 qovşaq', cost: '32 000 AZN' }
          ]
        },
        {
          id: 'mg-2',
          code: 'MG-R02',
          lat: 40.7818,
          lng: 46.9938,
          gps: '40.7818° N, 46.9938° E',
          name: 'Energetika & Sənaye Zonası (Toz Dəhlizi)',
          severity: 'Yüksək PM2.5 & Külək Eroziyası',
          x: 330,
          y: 268,
          tempDrop: '-2.9°C',
          co2Year: '68 ton/il',
          budget: '192 500 AZN',
          timeline: '5 ay',
          problem: 'Sənaye logistikası və şimal-qərb küləkləri yaşayış massivlərinə yüksək konsentrasiyalı toz və istilik daşıyır.',
          recipes: [
            '1.2 km uzunluğunda 3 pilləli canlı bio-sədd (akustik + toz baryeri)',
            'Avtomatik damcı suvarma ilə 650 ədəd yerli iqlimə adaptiv ağac',
            'Real vaxtlı hava keyfiyyəti (AQI) telemetriya stansiyası'
          ],
          bom: [
            { item: '3 Pilləli Canlı Toz-Səs Baryeri', qty: '1 200 m', cost: '108 000 AZN' },
            { item: 'Quraqlığa Davamlı Bio-Şitil Dəsti', qty: '650 ədəd', cost: '58 500 AZN' },
            { item: 'AQI Sensor və Bulud Paneli', qty: '4 stansiya', cost: '26 000 AZN' }
          ]
        },
        {
          id: 'mg-3',
          code: 'MG-R03',
          lat: 40.7618,
          lng: 47.0458,
          gps: '40.7618° N, 47.0458° E',
          name: 'Kür Sahili Bulvar Genişlənmə Zonası',
          severity: 'Sahil Eroziyası və Kölgə Çatışmazlığı',
          x: 598,
          y: 452,
          tempDrop: '-3.1°C',
          co2Year: '35 ton/il',
          budget: '116 000 AZN',
          timeline: '3 ay',
          problem: 'Açıq beton sahil zolağında günorta saatlarında kölgə örtüyü 12%-dən aşağıdır və yağış suları birbaşa axır.',
          recipes: [
            'Biofilik perqola arxitekturası və sarmaşıq günəş qalxanları',
            'Yağış suyunu toplayan süngər-şəhər (sponge city) yaşıl bağçaları',
            'Gecə enerji qənaətli ekoloji LED landşaft işıqlandırması'
          ],
          bom: [
            { item: 'Biofilik Beton-Polad Perqola Sistemi', qty: '12 blok', cost: '54 000 AZN' },
            { item: 'Süngər-Şəhər Bio-Retensiya Bağçası', qty: '310 m²', cost: '39 000 AZN' },
            { item: 'Solar Eko-İşıqlandırma & Sensorlar', qty: '24 ədəd', cost: '23 000 AZN' }
          ]
        }
      ]
    },
    gence: {
      id: 'gence',
      name: 'Gəncə Pilot Zonası',
      subtitle: 'Tarixi mərkəz, Gəncəçay vadisi və yeni yaşayış massivləri',
      coords: '40.6828° N, 46.3606° E',
      center: { lat: 40.6828, lng: 46.3606, zoom: 13.5 },
      satImage: 'assets/sat-gence.jpg',
      z14Start: { x: 10298, y: 6158 },
      zones: [
        {
          id: 'gn-1',
          code: 'GN-R01',
          lat: 40.6824,
          lng: 46.3608,
          gps: '40.6824° N, 46.3608° E',
          name: 'Nizami Prospekti Nəqliyyat Arteriyası',
          severity: 'Yüksək CO₂ və İstilik Yığılması',
          x: 515,
          y: 405,
          tempDrop: '-3.4°C',
          co2Year: '54 ton/il',
          budget: '164 000 AZN',
          timeline: '4.5 ay',
          problem: 'Pik saatlarda yüksək avtomobil sıxlığı prospekt boyunca azot oksidləri və istilik cibcikləri əmələ gətirir.',
          recipes: [
            'Avtobus dayanacaqlarında "İNJEKSİON Yaşıl Dam" modulları (20 ədəd)',
            'Yol kənarı karbon udan yosun-mamır bio-panelləri',
            'Ağıllı yağış suyu tutucu küçə ağac qəfəsləri'
          ],
          bom: [
            { item: 'Yaşıl Damlı Ağıllı Dayanacaq Modulu', qty: '20 ədəd', cost: '86 000 AZN' },
            { item: 'Şəhər Bio-Filter Mamır Divarı', qty: '140 m²', cost: '49 000 AZN' },
            { item: 'Səki Yağış Suyu Drenaj Hücrəsi', qty: '45 ədəd', cost: '29 000 AZN' }
          ]
        },
        {
          id: 'gn-2',
          code: 'GN-R02',
          lat: 40.6922,
          lng: 46.3290,
          gps: '40.6922° N, 46.3290° E',
          name: 'Yeni Gəncə Sıx Məskunlaşma Massivi',
          severity: 'Aşağı Yaşıllıq Əmsalı (6.4 m²/nəfər)',
          x: 342,
          y: 312,
          tempDrop: '-4.1°C',
          co2Year: '47 ton/il',
          budget: '139 000 AZN',
          timeline: '3.5 ay',
          problem: 'Hündürmərtəbəli beton binalar arasında mikroiqlim dövriyyəsi zəifdir, həyətlərdə kölgə və oyun zonasında sərinlik yoxdur.',
          recipes: [
            'Bina fasadlarına inteqrasiya olunan yüngül alüminium yaşıl kasetlər',
            'Məhəllədaxili "Mikro-Meşə" (Miyawaki metodu) pilot sahələri',
            'Sakinlər üçün interaktiv eko-monitorinq tablosu'
          ],
          bom: [
            { item: 'Fasad Modulyar Yaşıl Kaset Sistemi', qty: '280 m²', cost: '72 000 AZN' },
            { item: 'Miyawaki Mikro-Meşə Paketi', qty: '500 m²', cost: '46 000 AZN' },
            { item: 'Avtomatik Suvarma & Rütubət Mərkəzi', qty: '3 sistem', cost: '21 000 AZN' }
          ]
        },
        {
          id: 'gn-3',
          code: 'GN-R03',
          lat: 40.6742,
          lng: 46.3775,
          gps: '40.6742° N, 46.3775° E',
          name: 'Gəncəçay Sahili İstirahət Keçidi',
          severity: 'Mövsümi Sel Riski və Quru Yamac',
          x: 605,
          y: 465,
          tempDrop: '-2.7°C',
          co2Year: '39 ton/il',
          budget: '124 000 AZN',
          timeline: '3 ay',
          problem: 'Güclü yağıntılarda səth axını torpağı yuyur, yayda isə yamacların yaşıllığı quruyur.',
          recipes: [
            'Geohücrəli canlı yamac möhkəmləndirmə sistemi',
            'Yerli dağətəyi floradan ibarət az su tələb edən bio-örtük',
            'Piyada körpülərində inteqrasiya olunmuş bitki modulları'
          ],
          bom: [
            { item: 'Canlı Geohücrə Yamac Sistemi', qty: '640 m²', cost: '68 000 AZN' },
            { item: 'Yerli Quraqlığa Davamlı Flora Paketi', qty: '640 m²', cost: '34 000 AZN' },
            { item: 'Körpü Kənarı Hidroponik Modullar', qty: '30 ədəd', cost: '22 000 AZN' }
          ]
        }
      ]
    }
  },

  /* ---------------- 4. MAĞAZA (Ümumi Yerli Tərəfdaş Ekosistemi ilə) ---------------- */
  exclusivePackages: [
    {
      id: 'pkg-loft-vip',
      tag: 'Ən Çox Seçilən',
      name: 'İNJEKSİON Loft Signature Paketi',
      desc: 'Müasir mənzil və studiyalar üçün 3D mamır divarı, linear fitolampa və hidroponik sütun bir arada.',
      includes: ['2× Mamır Paneli', 'Linear Fitolampa', 'Hidroponik Sütun', 'Anbarsız Çatdırılma'],
      price: 890,
      oldPrice: 1120,
      image: 'assets/loft-room-after.jpg'
    },
    {
      id: 'pkg-balcony-zen',
      tag: 'Eyvan Həlli',
      name: 'Şəhər Eyvanı "Zümrüd Terras"',
      desc: 'Açıq və qapalı eyvanlar üçün küləyə davamlı modulyar eko-beton planterlər və avtomatik suvarma.',
      includes: ['3× Eko-Beton Planter', 'Damcı Suvarma', 'Künc Mamır Modulu', 'LED Vurğu'],
      price: 740,
      oldPrice: 920,
      image: 'assets/balcony-room-after.jpg'
    },
    {
      id: 'pkg-hotel-mini',
      tag: 'B2B Başlanğıc',
      name: 'Kommersiya & Ofis Resepşn Paketi',
      desc: 'Otel, restoran və ofislər üçün akustik zümrüd brend divarı və spektral memarlıq işıqlandırması.',
      includes: ['6 m² Mamır Divar', '3× Fitolampa Pro', 'Loqo İnteqrasiyası', '24 Ay Servis'],
      price: 2650,
      oldPrice: 3200,
      image: 'assets/mezo-after.jpg'
    },
    {
      id: 'pkg-smart-bio',
      tag: 'Biofil Balans',
      name: 'Anti-Tüstü & Gecə Oksigeni Paketi',
      desc: 'Kölgəyədavamlı Sansevieria, yerli həndəsi eko-beton dibçək və maqnit spektral fitolampa dəsti.',
      includes: ['2× Eko-Beton Dibçək', 'Sansevieria & Monstera', 'Maqnit Fitolampa'],
      price: 490,
      oldPrice: 610,
      image: 'assets/prod-plant-pot.jpg'
    }
  ],

  /* Ümumi yerli tərəfdaş kateqoriyaları — konkret uydurma firma adı olmadan */
  marketProducts: [
    {
      id: 'p-moss-pro',
      name: 'Stabilləşdirilmiş Zümrüd Mamır Paneli (120×60)',
      category: 'Mamır Panelləri',
      vendor: 'İNJEKSİON Sertifikatlı • Regional Bio-Modul Tərəfdaşları',
      desc: 'Təbii stabilləşdirilmiş mamır, antrasit alüminium çərçivə, 0.85 NRC səs udma, 0 suvarma.',
      price: 420,
      image: 'assets/prod-moss.jpg'
    },
    {
      id: 'p-ecoconcrete-block',
      name: 'Yosunlu Məsaməli Eko-Beton Modul Bloku',
      category: 'Eko-Beton & Çərçivə',
      vendor: 'Yerli Beton & Sənətkarlıq İstehsalçıları (Şəhər/Rayon Şəbəkəsi)',
      desc: 'Mikro-məsaməli bio-reseptiv beton texnologiyası — nəmliyi saxlayır və səsi udur.',
      price: 210,
      image: 'assets/prod-ecoconcrete.jpg'
    },
    {
      id: 'p-lamp-900',
      name: 'Linear Memarlıq Fitolampası L-900',
      category: 'Fitolampalar',
      vendor: 'Yerli Eko-Optika & İşıqlandırma Təchizatçıları',
      desc: 'Tam fotosintez spektri, mat qara anodlaşdırılmış gövdə, avtomatik günəş taymeri.',
      price: 230,
      image: 'assets/prod-phytolamp.jpg'
    },
    {
      id: 'p-geo-pot',
      name: 'Həndəsi Eko-Beton Dibçək & Sansevieria Kompozisiyası',
      category: 'Ağıllı Bitkilər',
      vendor: 'Regional Tinglik & Beton Sənətkarlığı Tərəfdaşları',
      desc: 'Gecə oksigen ifraz edən kölgəyədavamlı bitki + əl işi həndəsi eko-beton qab.',
      price: 185,
      image: 'assets/prod-plant-pot.jpg'
    },
    {
      id: 'p-hydro-tower',
      name: 'Beton-Şüşə Hidroponik Monstera Sütunu',
      category: 'Ağıllı Bitkilər',
      vendor: 'Regional Tinglik & Bio-Texnologiya Şəbəkəsi',
      desc: '30 gün avtonom su rezervi, su səviyyəsi göstəricisi və aktiv kömür hava filtri.',
      price: 340,
      image: 'assets/prod-hydroponic.jpg'
    },
    {
      id: 'p-moss-hex',
      name: 'Altıbucaqlı Akustik Mamır Dəsti (3 ədəd)',
      category: 'Mamır Panelləri',
      vendor: 'Yerli Dekorativ Bio-Panel Emalatxanaları',
      desc: 'Maqnitlə divara yapışan modulyar 3D dizayn elementləri. Suvarma tələb etmir.',
      price: 285,
      image: 'assets/prod-hex-moss.jpg'
    },
    {
      id: 'p-hydro-duo',
      name: 'Şaquli Eyvan & Mətbəx Hidroponik Modulu',
      category: 'Ağıllı Bitkilər',
      vendor: 'Şəhər & Rayon Aqronom Tərəfdaş Şəbəkəsi',
      desc: '6 yuvalı təzə ətirli göyərti və dekorativ bitki yetişdirmə sistemi.',
      price: 290,
      image: 'assets/balcony-room-after.jpg'
    },
    {
      id: 'p-lamp-spot',
      name: 'Ağıllı Spot Fitolampa S-600',
      category: 'Fitolampalar',
      vendor: 'Yerli Eko-Optika & İşıqlandırma Təchizatçıları',
      desc: 'CRI 96+ göz yormayan təbii işıq, divar və tavan montajı üçün uyğun.',
      price: 165,
      image: 'assets/prod-phytolamp.jpg'
    },
    {
      id: 'p-concrete-frame',
      name: 'Memarlıq Lifli Beton Modulyar Çərçivə',
      category: 'Eko-Beton & Çərçivə',
      vendor: 'Yerli Beton & Sənətkarlıq İstehsalçıları (Şəhər/Rayon Şəbəkəsi)',
      desc: 'Yüngül lifli beton texnologiyası, gizli kabel kanalı və sürətli divar bərkidicisi.',
      price: 195,
      image: 'assets/prod-ecoconcrete.jpg'
    },
    {
      id: 'p-irr-auto',
      name: 'IoT Damcı Suvarma & Rütubət Sensor Dəsti',
      category: 'Suvarma & Sensor',
      vendor: 'Yerli Eko-Texnologiya & IoT Tərəfdaşları',
      desc: 'Torpaq və hava rütubətinə görə avtomatik suvarma, batareya ilə 6 ay avtonom iş.',
      price: 145,
      image: 'assets/prod-hydroponic.jpg'
    }
  ]
};
