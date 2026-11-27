/* ==========================================================================
   TAB 2: MEZO (B2B — Otel / Restoran, Before/After Slider & Auto BOM Report)
   ========================================================================== */

window.INJ_MEZO = {
  state: {
    venueId: 'hotel',
    area: 120,
    goalId: 'prestige',
    sliderPos: 52
  },

  init() {
    this.render();
  },

  selectVenue(id) {
    this.state.venueId = id;
    this.render();
  },

  selectGoal(id) {
    this.state.goalId = id;
    this.render();
  },

  setArea(val) {
    this.state.area = Number(val);
    const pct = ((this.state.area - 30) / (600 - 30)) * 100;
    const rangeEl = document.getElementById('mezo-area-range');
    if (rangeEl) rangeEl.style.setProperty('--range-pct', pct + '%');
    this.updateReportOnly();
  },

  setSliderPreset(pct) {
    this.state.sliderPos = pct;
    this.applySliderVisual(pct);
  },

  calculateReport() {
    const venue = INJ_DATA.mezoVenues.find((v) => v.id === this.state.venueId) || INJ_DATA.mezoVenues[0];
    const goal = INJ_DATA.mezoGoals.find((g) => g.id === this.state.goalId) || INJ_DATA.mezoGoals[0];
    const area = this.state.area;

    const mossArea = Math.max(6, Math.round(area * 0.16 * venue.multiplier));
    const lampCount = Math.max(3, Math.ceil(mossArea / 3.2));
    const hydroCount = Math.max(2, Math.round((area / 45) * goal.factor));
    const iotUnits = Math.max(1, Math.ceil(area / 140));

    const mossUnit = Math.round(290 * goal.factor);
    const lampUnit = Math.round(215 * goal.factor);
    const hydroUnit = Math.round(320 * goal.factor);
    const iotUnit = Math.round(480 * goal.factor);
    const installUnit = Math.round(12 * goal.factor);

    const mossCost = mossArea * mossUnit;
    const lampCost = lampCount * lampUnit;
    const hydroCost = hydroCount * hydroUnit;
    const iotCost = iotUnits * iotUnit;
    const installCost = area * installUnit;

    const total = mossCost + lampCost + hydroCost + iotCost + installCost;
    const days = Math.max(2, Math.ceil(area / 55));
    const annualSavings = Math.round(area * goal.energySave * 2.4);

    return {
      venue,
      goal,
      mossArea,
      lampCount,
      hydroCount,
      iotUnits,
      total,
      days,
      annualSavings,
      roiMonths: goal.roiMonths,
      energySave: goal.energySave,
      rows: [
        { name: 'Stabilləşdirilmiş Zümrüd Mamır Divarı (Akustik)', qty: `${mossArea} m²`, unit: `${INJ_UI.formatAZN(mossUnit)}`, sum: mossCost },
        { name: 'Memarlıq Linear Fitolampa Sistemi (Pro)', qty: `${lampCount} ədəd`, unit: `${INJ_UI.formatAZN(lampUnit)}`, sum: lampCost },
        { name: 'Beton-Şüşə Hidroponik Sütun Modulu', qty: `${hydroCount} ədəd`, unit: `${INJ_UI.formatAZN(hydroUnit)}`, sum: hydroCost },
        { name: 'Avtomatik Suvarma & IoT İqlim Mərkəzi', qty: `${iotUnits} dəst`, unit: `${INJ_UI.formatAZN(iotUnit)}`, sum: iotCost },
        { name: 'Açar Təslim Montaj + 24 Ay Servis Zəmanəti', qty: `${area} m²`, unit: `${installUnit} AZN/m²`, sum: installCost }
      ]
    };
  },

  addB2BToCart() {
    const rep = this.calculateReport();
    INJ_CART.addItem(
      {
        id: `mezo-${rep.venue.id}-${this.state.area}-${rep.goal.id}`,
        title: `B2B Paket: ${rep.venue.name} (${this.state.area} m²)`,
        badge: `MEZO • ${rep.goal.name}`,
        price: rep.total,
        image: rep.venue.afterImage || 'assets/mezo-after.jpg'
      },
      true
    );
  },

  updateProposalClient(name) {
    const el = document.getElementById('mezo-pdf-client-name');
    if (el) el.textContent = name.trim() || 'Sərgi Qonağı / Korporativ Müştəri';
  },

  openProposalModal() {
    const rep = this.calculateReport();
    INJ_UI.openModal(`
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;" class="no-print">
        <div class="eyebrow" style="margin:0;">${icon('fileText')} B2B Kommersiya Təklifi</div>
        <button class="icon-close-btn" type="button" aria-label="Bağla" onclick="INJ_UI.closeModal()">${icon('x')}</button>
      </div>
      <div class="no-print" style="margin-bottom:10px;">
        <input class="client-name-input" type="text" placeholder="Otel / Restoran adını yazın (PDF-də dərhal yenilənir)..." oninput="INJ_MEZO.updateProposalClient(this.value)" />
      </div>
      <div class="pdf-paper">
        <div class="pdf-paper-header">
          <div>
            <div class="pdf-brand">İNJEKSİON MEZO (B2B)</div>
            <div style="font-size:0.84rem; color:#374151; margin-top:4px;">Kommersiya Məkanı Yaşıl Transformasiya Hesabatı</div>
            <div style="font-size:0.78rem; color:#065f46; font-weight:700; margin-top:4px;">Müştəri: <span id="mezo-pdf-client-name">Sərgi Qonağı / Korporativ Müştəri</span></div>
          </div>
          <div class="pdf-meta">
            <div><strong>Məkan:</strong> ${rep.venue.name}</div>
            <div><strong>Sahə:</strong> ${this.state.area} m²</div>
            <div><strong>Hədəf:</strong> ${rep.goal.name}</div>
          </div>
        </div>
        <div class="pdf-grid">
          <div class="pdf-stat"><div class="pdf-stat-val">${INJ_UI.formatAZN(rep.total)}</div><div class="pdf-stat-lbl">Açar Təslim Büdcə</div></div>
          <div class="pdf-stat"><div class="pdf-stat-val">${rep.days} iş günü</div><div class="pdf-stat-lbl">Quraşdırma Müddəti</div></div>
          <div class="pdf-stat"><div class="pdf-stat-val">~${INJ_UI.formatAZN(rep.annualSavings)}/il</div><div class="pdf-stat-lbl">İllik Enerji/İqlim Qənaəti</div></div>
        </div>
        <table class="pdf-table">
          <thead>
            <tr><th>Material / Modul</th><th>Həcm</th><th>Vahid</th><th style="text-align:right;">Məbləğ</th></tr>
          </thead>
          <tbody>
            ${rep.rows
              .map(
                (r) => `<tr><td>${r.name}</td><td>${r.qty}</td><td>${r.unit}</td><td style="text-align:right; font-weight:600;">${INJ_UI.formatAZN(r.sum)}</td></tr>`
              )
              .join('')}
            <tr style="background:#ecfdf5; font-weight:800;">
              <td colspan="3">Yekun Açar Təslim Məbləğ</td>
              <td style="text-align:right; color:#065f46;">${INJ_UI.formatAZN(rep.total)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div style="display:flex; justify-content:flex-end; gap:10px; flex-wrap:wrap;" class="no-print">
        <button class="btn-secondary" type="button" onclick="window.print()">${icon('printer')} Çap et / PDF</button>
        <button class="btn-primary" type="button" onclick="INJ_UI.closeModal(); INJ_MEZO.addB2BToCart();">${icon('cart')} Səbətə əlavə et</button>
      </div>
    `);
  },

  applySliderVisual(pct) {
    const clamped = Math.max(2, Math.min(98, pct));
    this.state.sliderPos = clamped;
    const afterWrap = document.getElementById('mezo-after-wrap');
    const divider = document.getElementById('mezo-divider');
    if (afterWrap) afterWrap.style.clipPath = `inset(0 0 0 ${clamped}%)`;
    if (divider) divider.style.left = `${clamped}%`;
  },

  bindSliderEvents() {
    const stage = document.getElementById('mezo-compare-stage');
    if (!stage) return;
    let dragging = false;

    const updateFromClientX = (clientX) => {
      const rect = stage.getBoundingClientRect();
      const pct = ((clientX - rect.left) / rect.width) * 100;
      this.applySliderVisual(pct);
    };

    stage.addEventListener('pointerdown', (e) => {
      dragging = true;
      stage.setPointerCapture(e.pointerId);
      updateFromClientX(e.clientX);
    });
    stage.addEventListener('pointermove', (e) => {
      if (!dragging) return;
      updateFromClientX(e.clientX);
    });
    stage.addEventListener('pointerup', () => {
      dragging = false;
    });
    stage.addEventListener('pointercancel', () => {
      dragging = false;
    });
    stage.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        this.applySliderVisual(this.state.sliderPos - 5);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        this.applySliderVisual(this.state.sliderPos + 5);
      }
    });
  },

  renderReportHTML() {
    const rep = this.calculateReport();
    return `
      <div class="package-header" style="padding-bottom:14px;">
        <div>
          <div class="package-badge">${icon('building')} Avtomatik Material & Paket Hesabatı</div>
          <h2 class="package-name">${rep.venue.name} • ${this.state.area} m² (${rep.goal.name})</h2>
        </div>
        <div class="package-price-box">
          <div class="muted-text" style="font-size:0.74rem;">Açar təslim təxmini qiymət</div>
          <div class="price-main tabular">${INJ_UI.formatAZN(rep.total)}</div>
        </div>
      </div>

      <div class="bom-grid">
        <div class="bom-metric">
          <div class="bom-metric-val emerald-text">${rep.mossArea} m²</div>
          <div class="bom-metric-lbl">Mamır Divar Örtüyü</div>
        </div>
        <div class="bom-metric">
          <div class="bom-metric-val">${rep.days} gün</div>
          <div class="bom-metric-lbl">Quraşdırma Müddəti</div>
        </div>
        <div class="bom-metric">
          <div class="bom-metric-val emerald-text">-${rep.energySave}%</div>
          <div class="bom-metric-lbl">Soyutma / Akustik Yük</div>
        </div>
        <div class="bom-metric">
          <div class="bom-metric-val">${rep.roiMonths} ay</div>
          <div class="bom-metric-lbl">Müştəri Çəkimi ROI</div>
        </div>
      </div>

      <div style="overflow-x:auto;">
        <table class="bom-table">
          <thead>
            <tr>
              <th>Avtomatik Seçilmiş Material / Modul</th>
              <th class="num">Miqdar</th>
              <th class="num">Vahid</th>
              <th class="num">Məbləğ</th>
            </tr>
          </thead>
          <tbody>
            ${rep.rows
              .map(
                (r) => `
              <tr>
                <td>${r.name}</td>
                <td class="num">${r.qty}</td>
                <td class="num muted-text">${r.unit}</td>
                <td class="num emerald-text" style="font-weight:700;">${INJ_UI.formatAZN(r.sum)}</td>
              </tr>
            `
              )
              .join('')}
            <tr style="border-top: 1px solid rgba(52, 211, 153, 0.35);">
              <td colspan="3" style="font-weight:700; color:#ffffff;">Yekun Açar Təslim Məbləğ</td>
              <td class="num emerald-text" style="font-weight:800; font-size:0.98rem;">${INJ_UI.formatAZN(rep.total)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="package-footer">
        <span class="muted-text" style="font-size:0.8rem;">* Bütün hesablamalar sahə (m²) dəyişdikcə canlı yenilənir.</span>
        <div style="display:flex; gap:10px; flex-wrap:wrap;">
          <button type="button" class="btn-secondary" onclick="INJ_MEZO.openProposalModal()">
            ${icon('fileText')} Kommersiya Təklifi (PDF)
          </button>
          <button type="button" class="btn-primary" onclick="INJ_MEZO.addB2BToCart()">
            ${icon('cart')} B2B Paketini Səbətə At
          </button>
        </div>
      </div>
    `;
  },

  updateReportOnly() {
    const valEl = document.getElementById('mezo-area-val');
    if (valEl) valEl.textContent = this.state.area + ' m²';
    const reportBox = document.getElementById('mezo-report-box');
    if (reportBox) reportBox.innerHTML = this.renderReportHTML();
  },

  render() {
    const container = document.getElementById('view-mezo');
    const activeVenue = INJ_DATA.mezoVenues.find((v) => v.id === this.state.venueId) || INJ_DATA.mezoVenues[0];
    container.innerHTML = `
      <div class="section-hero">
        <div>
          <div class="eyebrow">${icon('building')} B2B • Otel, Restoran və Kommersiya Məkanları</div>
          <h1 class="section-title">Beton Məkanı <span>Luxury Bio-Mərkəzə</span> Çevir</h1>
          <p class="section-desc">
            Məkan növünü, sahəni və biznes hədəfini seç. Sürüşdürülən Əvvəl/Sonra vizualı ilə fərqi canlı izlə və avtomatik material hesabatı əldə et.
          </p>
        </div>
        <div class="kpi-strip">
          <div class="kpi-pill">
            <span class="kpi-val">+28%</span>
            <span class="kpi-lbl">Qonaq Qalma Müddəti</span>
          </div>
          <div class="kpi-pill">
            <span class="kpi-val">24 Ay</span>
            <span class="kpi-lbl">Tam Texniki Servis</span>
          </div>
        </div>
      </div>

      <div class="mezo-grid">
        <!-- Left B2B Configurator -->
        <div class="glass-card control-panel">
          <div>
            <div class="panel-block-title"><span class="step-num">1</span> Məkan Növü</div>
            <div class="problem-list">
              ${INJ_DATA.mezoVenues
                .map(
                  (v) => `
                <button type="button" class="problem-card ${this.state.venueId === v.id ? 'active' : ''}" onclick="INJ_MEZO.selectVenue('${v.id}')">
                  <div class="problem-icon">${icon('building')}</div>
                  <div>
                    <div class="problem-title">${v.name}</div>
                    <div class="problem-sub">${v.desc}</div>
                  </div>
                </button>
              `
                )
                .join('')}
            </div>
          </div>

          <div class="range-wrap">
            <div class="panel-block-title" style="margin-bottom:0;"><span class="step-num">2</span> Məkan Sahəsi (m²)</div>
            <div class="range-header">
              <span class="muted-text" style="font-size:0.8rem;">30 m² — 600 m²</span>
              <span class="range-value" id="mezo-area-val">${this.state.area} m²</span>
            </div>
            <input id="mezo-area-range" type="range" class="styled-range" min="30" max="600" step="10" value="${this.state.area}" style="--range-pct: ${((this.state.area - 30) / (600 - 30)) * 100}%;" oninput="INJ_MEZO.setArea(this.value)" />
          </div>

          <div>
            <div class="panel-block-title"><span class="step-num">3</span> Əsas Biznes Hədəfi</div>
            <div class="chip-group">
              ${INJ_DATA.mezoGoals
                .map(
                  (g) => `
                <button type="button" class="chip ${this.state.goalId === g.id ? 'active' : ''}" onclick="INJ_MEZO.selectGoal('${g.id}')">
                  ${g.name}
                </button>
              `
                )
                .join('')}
            </div>
          </div>
        </div>

        <!-- Right Before/After Slider + Automated Report -->
        <div class="visualizer-column">
          <div>
            <div class="compare-stage" id="mezo-compare-stage" role="slider" tabindex="0" aria-label="Əvvəl və Sonra müqayisə slayderi" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${Math.round(this.state.sliderPos)}">
              <!-- BEFORE Image (Base) -->
              <div class="compare-layer">
                <img src="${activeVenue.beforeImage}" alt="Əvvəl: ${activeVenue.name}" />
              </div>
              <!-- AFTER Image (Clipped right side) -->
              <div class="compare-layer compare-after-wrap" id="mezo-after-wrap" style="clip-path: inset(0 0 0 ${this.state.sliderPos}%);">
                <img src="${activeVenue.afterImage}" alt="Sonra: ${activeVenue.name} — İNJEKSİON" />
              </div>

              <span class="compare-badge badge-before">ƏVVƏL • ${activeVenue.name}</span>
              <span class="compare-badge badge-after">SONRA • İNJEKSİON</span>

              <div class="compare-divider" id="mezo-divider" style="left: ${this.state.sliderPos}%;">
                <div class="compare-handle">${icon('arrowsH')}</div>
              </div>

              <div class="compare-hint">Müqayisə üçün sola / sağa sürüşdürün</div>
            </div>

            <div style="display:flex; justify-content:center; gap:8px; margin-top:12px;">
              <button type="button" class="btn-secondary btn-sm" onclick="INJ_MEZO.setSliderPreset(90)">Əvvəl (Beton)</button>
              <button type="button" class="btn-secondary btn-sm" onclick="INJ_MEZO.setSliderPreset(50)">50 / 50 Müqayisə</button>
              <button type="button" class="btn-secondary btn-sm" onclick="INJ_MEZO.setSliderPreset(10)">Sonra (İNJEKSİON)</button>
            </div>
          </div>

          <div class="glass-card glass-card-emerald report-card" id="mezo-report-box">
            ${this.renderReportHTML()}
          </div>
        </div>
      </div>
    `;

    this.bindSliderEvents();
  }
};
