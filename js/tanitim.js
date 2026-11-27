/* ==========================================================================
   TAB 0: TANITIM (Slayd Əvəzi İnteraktiv Layihə Təqdimatı — Açılış Ekranı)
   Məlumat bloku modulyardır: komanda yoldaşından əlavə mətn gəldikdə dərhal yenilənir
   ========================================================================== */

window.INJ_TANITIM_DATA = {
  eyebrow: 'İNJEKSİON • LUXURY ECO-TECH & ŞƏHƏRSALMA EKOSİSTEMİ',
  heroTitle: 'Beton Məkanlara və Şəhərlərə <span>Təbiətin Zəka ilə İnjeksiyası</span>',
  heroLead:
    'Fərdi otaqdan (B2C) kommersiya obyektlərinə (B2B) və Azərbaycanın bütün 87 şəhər/rayonunu əhatə edən peyk əsaslı dövlət şəhərsalma analitikasına (B2G) qədər vahid, anbarsız bio-memarlıq platforması.',
  kpis: [
    { val: '3 Səviyyə', lbl: 'Mikro • Mezo • Makro' },
    { val: '87 Ərazi', lbl: 'Tam Peyk & B2G Əhatəsi' },
    { val: '0 AZN', lbl: 'Mərkəzi Anbar Xərci' },
    { val: '30 dəq', lbl: 'Modulyar Quraşdırma' }
  ],
  modules: [
    {
      tab: 'mikro',
      num: '01',
      tag: 'B2C • FƏRDİ MƏKANLAR',
      title: 'MİKRO — 3D Sİ Yapboz Vizualizatoru',
      desc: 'Otaq və ya eyvan şəklini yükləyin, Sİ işıq/toz/akustika problemini ölçərək real stokdakı modulyar mamır, eko-beton və fitolampaları 3D nöqtələrlə yerləşdirsin.',
      image: 'assets/loft-room-after.jpg',
      cta: 'MİKRO Demosunu Aç'
    },
    {
      tab: 'mezo',
      num: '02',
      tag: 'B2B • OTEL, RESTORAN, OFİS, SPA',
      title: 'MEZO — Bio-Memarlıq & Smeta Mühərriki',
      desc: '4 fərqli kommersiya məkanı üçün Əvvəl/Sonra müqayisə slayderi, canlı m² smeta hesablayıcısı, illik enerji qənaəti və müştəri adına özəlləşən rəsmi PDF təklif.',
      image: 'assets/mezo-restaurant-after.jpg',
      cta: 'MEZO Kalkulyatorunu Aç'
    },
    {
      tab: 'makro',
      num: '03',
      tag: 'B2G • ŞƏHƏR & DÖVLƏT ANALİTİKASI',
      title: 'MAKRO — Ultra-HD Peyk & Yeraltı GIS Konsepti',
      desc: '87 şəhər və rayon üzrə ev dəqiqliyində (Zoom 20.5) peyk görüntüsü, ünvan axtarışı, istilik adası reseptləri və gələcək dövlət yeraltı kommunikasiya/kadastr qatları.',
      image: 'assets/sat-mingecevir.jpg',
      cta: 'MAKRO Peyk Xəritəsini Aç'
    },
    {
      tab: 'magaza',
      num: '04',
      tag: 'MARKETPLACE • EKO-BAZAR',
      title: 'MAĞAZA — Zəmanətli Paketlər & Açıq Bazar',
      desc: 'İNJEKSİON xüsusi kombin paketləri və hər şəhər/rayon üzrə yerli istehsalçıları birləşdirən anbarsız (dropshipping) yaşıl vitrin.',
      image: 'assets/prod-ecoconcrete.jpg',
      cta: 'Eko-Bazara Keç'
    }
  ],
  partnerPillars: [
    {
      icon: 'cube',
      level: 'Şəhər & Rayon Səviyyəsi',
      title: 'Yerli Beton & Sənətkarlıq Emalatxanaları',
      desc: 'Məsaməli eko-beton bloklar və həndəsi dibçəklər hər regionun öz yerli istehsalçıları tərəfindən İNJEKSİON qəlib standartı ilə hazırlanır — ağır yük daşıma xərci sıfırlanır.'
    },
    {
      icon: 'leaf',
      level: 'İqlim Zonası Səviyyəsi',
      title: 'Regional Tinglik & Bio-Flora Tərəfdaşları',
      desc: 'Abşeron, Aran, Qarabağ, Cənub, Dağlıq və Naxçıvan iqliminə uyğunlaşmış yerli bitki və stabilləşdirilmiş mamır ehtiyatı birbaşa regional tingliklərdən təchiz edilir.'
    },
    {
      icon: 'sun',
      level: 'Texnoloji Standart',
      title: 'Yerli Eko-Optika & IoT Suvarma Şəbəkəsi',
      desc: 'Tam spektrli memarlıq fitolampaları, rütubət sensorları və avtonom damcı suvarma modulları vahid keyfiyyət zəmanəti ilə komplektləşdirilir.'
    },
    {
      icon: 'shield',
      level: '24–48 Saat İcra',
      title: 'Yerli Montaj & Aqronom Servis Qrupları',
      desc: 'Hər şəhər və rayonda sertifikatlı yerli ustalar və aqronomlar sifarişi tozsuz modulyar üsulla quraşdırır və B2B/B2G dövri baxımını həyata keçirir.'
    }
  ],
  roadmap: [
    {
      phase: 'MƏRHƏLƏ 01 • İNDİ (MVP & PİLOT)',
      title: 'Rəqəmsal Vizualizator, Mingəçevir & Gəncə Pilot Analitikası',
      desc: 'B2C 3D Yapboz, B2B 4-məkanlı smeta mühərriki, 87 ərazi üzrə peyk istilik analitikası və ilkin yerli istehsalçı şəbəkəsi.',
      active: true
    },
    {
      phase: 'MƏRHƏLƏ 02 • 6–12 AY',
      title: 'Regional Açıq Eko-Bazar & Korporativ ESG Abunəliyi',
      desc: 'Bütün iri şəhər və rayonlarda yerli istehsalçı kabinetlərinin açılması, otel/biznes mərkəzləri üçün aylıq bio-servis abunəliyi.',
      active: false
    },
    {
      phase: 'MƏRHƏLƏ 03 • GƏLƏCƏK B2G İNTEQRASİYASI',
      title: 'Dövlət Yeraltı Kommunikasiya, Kadastr və Peyk API Mərkəzi',
      desc: 'Su, qaz, elektrik yeraltı xətləri, qrunt suları, dövlət torpaq kadastrı və milli peyk/sensor axınları ilə birbaşa B2G inteqrasiya — ağac və yaşıl infrastrukturun sıfır xəta ilə planlanması.',
      active: false
    }
  ]
};

window.INJ_TANITIM = {
  init() {
    this.render();
  },

  go(tab) {
    if (window.INJ_SWITCH_TAB) window.INJ_SWITCH_TAB(tab);
  },

  render() {
    const container = document.getElementById('view-tanitim');
    if (!container) return;
    const d = window.INJ_TANITIM_DATA;

    container.innerHTML = `
      <!-- Hero Presentation Banner -->
      <div class="glass-card glass-card-emerald pitch-hero">
        <div class="pitch-hero-grid">
          <div>
            <div class="eyebrow">${icon('sparkles')} ${d.eyebrow}</div>
            <h1 class="pitch-hero-title">${d.heroTitle}</h1>
            <p class="pitch-hero-lead">${d.heroLead}</p>

            <div style="display:flex; flex-wrap:wrap; gap:12px; margin-top:22px;">
              <button type="button" class="btn-primary" onclick="INJ_TANITIM.go('mikro')">
                ${icon('cube')}
                <span>Canlı Demoya Başla (MİKRO)</span>
              </button>
              <button type="button" class="btn-secondary" onclick="INJ_TANITIM.go('makro')">
                ${icon('map')}
                <span>87 Rayon Peyk &amp; B2G Xəritəsi</span>
              </button>
              <button type="button" class="btn-secondary" onclick="INJ_ADVISOR.open()">
                ${icon('bot')}
                <span>Eko-Məsləhətçi Sİ</span>
              </button>
            </div>
          </div>

          <div class="pitch-kpi-grid">
            ${d.kpis
              .map(
                (k) => `
              <div class="pitch-kpi-card">
                <div class="pitch-kpi-val tabular">${k.val}</div>
                <div class="pitch-kpi-lbl">${k.lbl}</div>
              </div>
            `
              )
              .join('')}
          </div>
        </div>
      </div>

      <!-- 4 Interactive Platform Modules -->
      <div style="margin-top:30px;">
        <div class="sub-header-row">
          <h2 class="sub-title">
            <span class="emerald-text">${icon('layers')}</span>
            Platformanın 4 İşlək Həlqəsi (Birbaşa Keçid)
          </h2>
        </div>

        <div class="pitch-modules-grid">
          ${d.modules
            .map(
              (m) => `
            <article class="glass-card pitch-module-card" onclick="INJ_TANITIM.go('${m.tab}')">
              <div class="pitch-module-media">
                <img src="${m.image}" alt="${m.title}" />
                <span class="pitch-module-num">${m.num}</span>
                <span class="pitch-module-tag">${m.tag}</span>
              </div>
              <div class="pitch-module-body">
                <h3 class="pitch-module-title">${m.title}</h3>
                <p class="pitch-module-desc">${m.desc}</p>
                <div style="margin-top:auto; padding-top:10px;">
                  <span class="emerald-text" style="font-size:0.82rem; font-weight:700;">${m.cta} →</span>
                </div>
              </div>
            </article>
          `
            )
            .join('')}
        </div>
      </div>

      <!-- City & Rayon Level Generic Partner Ecosystem -->
      <div style="margin-top:34px;">
        <div class="sub-header-row">
          <div>
            <h2 class="sub-title">
              <span class="emerald-text">${icon('network')}</span>
              Şəhər və Rayon Səviyyəsində Yerli Tərəfdaş Ekosistemi
            </h2>
            <p class="muted-text" style="font-size:0.86rem; margin-top:4px;">
              Konkret tək təchizatçıdan asılı olmadan, hər şəhər və rayondakı yerli istehsalçıları vahid İNJEKSİON standartında birləşdirən anbarsız model.
            </p>
          </div>
        </div>

        <div class="pitch-pillars-grid">
          ${d.partnerPillars
            .map(
              (p) => `
            <div class="glass-card" style="padding:18px; display:flex; flex-direction:column; gap:8px;">
              <div style="display:flex; align-items:center; justify-content:space-between; gap:8px;">
                <div class="problem-icon">${icon(p.icon)}</div>
                <span class="mini-pill" style="color:var(--emerald-300);">${p.level}</span>
              </div>
              <h3 style="font-family:var(--font-display); font-size:0.98rem; font-weight:700; margin-top:4px;">${p.title}</h3>
              <p class="muted-text" style="font-size:0.81rem; line-height:1.5;">${p.desc}</p>
            </div>
          `
            )
            .join('')}
        </div>
      </div>

      <!-- Strategic Roadmap (Highlighting Future State/Underground Data Integration) -->
      <div style="margin-top:34px;">
        <div class="sub-header-row">
          <h2 class="sub-title">
            <span class="gold-text">${icon('sparkles')}</span>
            İnkişaf Yol Xəritəsi və Gələcək Dövlət GIS İnteqrasiyası
          </h2>
        </div>

        <div class="pitch-roadmap-grid">
          ${d.roadmap
            .map(
              (r) => `
            <div class="glass-card ${r.active ? 'glass-card-emerald' : ''}" style="padding:20px; display:flex; flex-direction:column; gap:8px;">
              <div style="font-size:0.7rem; font-weight:800; letter-spacing:0.08em; color:${r.active ? 'var(--emerald-300)' : 'var(--amber-400)'};">
                ${r.phase}
              </div>
              <h3 style="font-family:var(--font-display); font-size:1.04rem; font-weight:700;">${r.title}</h3>
              <p class="muted-text" style="font-size:0.82rem; line-height:1.5;">${r.desc}</p>
            </div>
          `
            )
            .join('')}
        </div>
      </div>
    `;
  }
};
