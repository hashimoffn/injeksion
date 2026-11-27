/* ==========================================================================
   TAB 1: MİKRO (B2C — 3D Yapboz Vizualizatoru)
   Çoxlu Problem Seçimi + Sensor Metrikaları + Loft/Eyvan 3D Transformasiya
   ========================================================================== */

window.INJ_MIKRO = {
  state: {
    selectedRoomId: 'loft',
    customImageUrl: null,
    customImageName: '',
    selectedProblemIds: ['light'],
    isScanning: false,
    hasResult: false,
    showAfter: true,
    activeHotspotId: null,
    excludedIds: []
  },

  scanTimers: [],

  init() {
    this.render();
  },

  clearScanTimers() {
    this.scanTimers.forEach((t) => clearTimeout(t));
    this.scanTimers = [];
  },

  getCurrentRoom() {
    return INJ_DATA.mikroRooms.find((r) => r.id === this.state.selectedRoomId) || INJ_DATA.mikroRooms[0];
  },

  getCurrentImage() {
    if (this.state.customImageUrl) return this.state.customImageUrl;
    return this.getCurrentRoom().image;
  },

  getAfterImage() {
    if (this.state.customImageUrl) return null;
    return this.getCurrentRoom().afterImage || null;
  },

  getCurrentRoomLabel() {
    if (this.state.customImageUrl) return this.state.customImageName || 'Yüklənmiş Məkan';
    const room = this.getCurrentRoom();
    return `${room.name} • ${room.defaultArea}`;
  },

  /* Build single or combined multi-problem AI package */
  getActivePackageSpec() {
    const selectedProbs = INJ_DATA.mikroProblems.filter((p) => this.state.selectedProblemIds.includes(p.id));
    const list = selectedProbs.length > 0 ? selectedProbs : [INJ_DATA.mikroProblems[0]];

    if (list.length === 1) {
      return list[0];
    }

    // Multi-problem intelligent combination (up to 4 distinct 3D modules)
    const mergedHotspots = [];
    const seenNames = new Set();
    const layoutSlots = [
      { x: 46, y: 42 },
      { x: 50, y: 22 },
      { x: 68, y: 56 },
      { x: 26, y: 58 }
    ];

    list.forEach((p) => {
      p.hotspots.forEach((hs) => {
        if (mergedHotspots.length < 4 && !seenNames.has(hs.shortLabel)) {
          seenNames.add(hs.shortLabel);
          const slot = layoutSlots[mergedHotspots.length] || { x: hs.x, y: hs.y };
          mergedHotspots.push({ ...hs, x: slot.x, y: slot.y });
        }
      });
    });

    const rawSum = mergedHotspots.reduce((s, h) => s + h.price, 0);
    const discounted = Math.round(rawSum * 0.84);

    return {
      id: 'combo-' + list.map((p) => p.id).join('-'),
      packageName: `İNJEKSİON Kombin 3D Paketi (${list.length} Problem Həlli)`,
      oldPrice: rawSum,
      price: discounted,
      impact: {
        o2: '+52% Kompleks Hava & O₂',
        noise: '-20 dB Akustik Komfort',
        install: '45 dəq modulyar montaj'
      },
      hotspots: mergedHotspots
    };
  },

  getIncludedHotspots() {
    const spec = this.getActivePackageSpec();
    return spec.hotspots.filter((h) => !this.state.excludedIds.includes(h.id));
  },

  getDynamicPackagePrice() {
    const spec = this.getActivePackageSpec();
    const included = this.getIncludedHotspots();
    if (included.length === spec.hotspots.length) {
      return { price: spec.price, oldPrice: spec.oldPrice, count: included.length };
    }
    const sum = included.reduce((acc, h) => acc + h.price, 0);
    return { price: sum, oldPrice: Math.round(sum * 1.18), count: included.length };
  },

  selectRoom(roomId) {
    this.clearScanTimers();
    this.state.selectedRoomId = roomId;
    this.state.customImageUrl = null;
    this.state.isScanning = false;
    this.state.hasResult = false;
    this.state.activeHotspotId = null;
    this.state.excludedIds = [];
    this.render();
  },

  toggleProblem(problemId) {
    this.clearScanTimers();
    this.state.isScanning = false;
    this.state.excludedIds = [];
    const exists = this.state.selectedProblemIds.includes(problemId);
    if (exists) {
      if (this.state.selectedProblemIds.length <= 1) {
        INJ_UI.toast('Ən azı 1 problem seçili qalmalıdır');
        return;
      }
      this.state.selectedProblemIds = this.state.selectedProblemIds.filter((id) => id !== problemId);
    } else {
      this.state.selectedProblemIds.push(problemId);
    }

    if (this.state.hasResult) {
      const spec = this.getActivePackageSpec();
      this.state.activeHotspotId = spec.hotspots[0].id;
    }
    this.render();
  },

  setShowAfter(flag) {
    this.state.showAfter = flag;
    this.render();
  },

  loadImageFile(file) {
    if (!file || !file.type.startsWith('image/')) {
      INJ_UI.toast('Zəhmət olmasa JPG və ya PNG şəkil seçin');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      this.clearScanTimers();
      this.state.customImageUrl = e.target.result;
      this.state.customImageName = file.name.replace(/\.[^.]+$/, '');
      this.state.isScanning = false;
      this.state.hasResult = false;
      this.state.activeHotspotId = null;
      this.state.excludedIds = [];
      this.render();
      INJ_UI.toast('Otaq şəkli yükləndi — indi Sİ analizini başladın');
    };
    reader.readAsDataURL(file);
  },

  handleUpload(event) {
    const file = event.target.files && event.target.files[0];
    if (file) this.loadImageFile(file);
  },

  runAIScan() {
    if (this.state.isScanning) return;
    this.clearScanTimers();
    this.state.isScanning = true;
    this.state.hasResult = false;
    this.state.showAfter = true;
    this.state.excludedIds = [];
    this.render();

    const fill = document.getElementById('mikro-scan-fill');
    const sub = document.getElementById('mikro-scan-sub');
    const steps = [
      { pct: 28, text: 'Beton səthlər və işıq bucağı ölçülür...' },
      { pct: 66, text: '3D modulyar yapboz nöqtələri yerləşdirilir...' },
      { pct: 98, text: 'Hazır AZN satış paketi hesablanır...' }
    ];

    steps.forEach((s, idx) => {
      const tid = setTimeout(() => {
        if (fill) fill.style.width = s.pct + '%';
        if (sub) sub.textContent = s.text;
      }, 220 + idx * 450);
      this.scanTimers.push(tid);
    });

    const doneId = setTimeout(() => {
      const spec = this.getActivePackageSpec();
      this.state.isScanning = false;
      this.state.hasResult = true;
      this.state.showAfter = true;
      this.state.activeHotspotId = spec.hotspots[0].id;
      this.render();
      INJ_UI.toast(`Sİ analizi tamamlandı: ${spec.hotspots.length} modulyar nöqtə yerləşdirildi`);
    }, 1680);
    this.scanTimers.push(doneId);
  },

  selectHotspot(id) {
    this.state.activeHotspotId = id;
    this.render();
  },

  toggleModuleInPackage(id, event) {
    if (event) event.stopPropagation();
    const isExcluded = this.state.excludedIds.includes(id);
    if (isExcluded) {
      this.state.excludedIds = this.state.excludedIds.filter((x) => x !== id);
      this.state.activeHotspotId = id;
    } else {
      const included = this.getIncludedHotspots();
      if (included.length <= 1) {
        INJ_UI.toast('Paketdə ən azı 1 modul aktiv qalmalıdır');
        return;
      }
      this.state.excludedIds.push(id);
      const remaining = this.getIncludedHotspots();
      if (this.state.activeHotspotId === id && remaining.length > 0) {
        this.state.activeHotspotId = remaining[0].id;
      }
    }
    this.render();
  },

  addSingleHotspot(id, event) {
    if (event) event.stopPropagation();
    const spec = this.getActivePackageSpec();
    const hs = spec.hotspots.find((h) => h.id === id);
    if (!hs) return;
    this.state.activeHotspotId = id;
    INJ_CART.addItem(
      {
        id: 'mikro-single-' + hs.id,
        title: hs.name,
        badge: `MİKRO • ${hs.category}`,
        price: hs.price,
        image: hs.image
      },
      false
    );
    this.render();
  },

  orderPackage() {
    const spec = this.getActivePackageSpec();
    const pricing = this.getDynamicPackagePrice();
    const suffix = pricing.count < spec.hotspots.length ? ` (${pricing.count} modul)` : '';
    INJ_CART.addItem(
      {
        id: `mikro-pkg-${spec.id}-${pricing.count}`,
        title: spec.packageName + suffix,
        badge: 'MİKRO • 3D Hazır Paket',
        price: pricing.price,
        image: this.getAfterImage() || this.getCurrentImage()
      },
      true
    );
  },

  bindDragDrop() {
    const dropZone = document.getElementById('mikro-upload-zone');
    if (!dropZone) return;
    ['dragenter', 'dragover'].forEach((evt) => {
      dropZone.addEventListener(evt, (e) => {
        e.preventDefault();
        dropZone.classList.add('is-dragover');
      });
    });
    ['dragleave', 'drop'].forEach((evt) => {
      dropZone.addEventListener(evt, (e) => {
        e.preventDefault();
        dropZone.classList.remove('is-dragover');
      });
    });
    dropZone.addEventListener('drop', (e) => {
      const file = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
      if (file) this.loadImageFile(file);
    });
  },

  render() {
    const container = document.getElementById('view-mikro');
    const spec = this.getActivePackageSpec();
    const visibleHotspots = this.getIncludedHotspots();
    const activeHs = visibleHotspots.find((h) => h.id === this.state.activeHotspotId) || visibleHotspots[0] || spec.hotspots[0];
    const afterImg = this.getAfterImage();
    const showing3D = this.state.hasResult && this.state.showAfter;
    const pricing = this.getDynamicPackagePrice();

    container.innerHTML = `
      <div class="section-hero">
        <div>
          <div class="eyebrow">${icon('sparkles')} BÖLMƏ 01 • MİKRO (B2C — 3D YAPBOZ VİZUALİZATORU)</div>
          <h1 class="section-title">Beton Məkanlara Sİ ilə <span>"Ağıllı Yapboz"</span> İnjeksiyası</h1>
          <p class="section-desc">
            Otaq şəklini sürükləyib atın və ya hazır demo interyerdən seçin. Bir və ya bir neçə problemi işarələyin — Sİ real stokdakı mamır, eko-beton və fitolampa modullarını 3D yerləşdirsin.
          </p>
        </div>
        <div class="kpi-strip">
          <div class="kpi-pill">
            <span class="kpi-val">30 dəq</span>
            <span class="kpi-lbl">Modulyar Quraşdırma</span>
          </div>
          <div class="kpi-pill">
            <span class="kpi-val">0 AZN</span>
            <span class="kpi-lbl">Anbar Xərci</span>
          </div>
          <div class="kpi-pill">
            <span class="kpi-val">100%</span>
            <span class="kpi-lbl">Lokal Tərəfdaş Stoku</span>
          </div>
        </div>
      </div>

      <div class="mikro-grid">
        <!-- Left Controls -->
        <div class="glass-card control-panel">
          <div>
            <div class="panel-block-title"><span class="step-num">1</span> Demo Otaq Seç və ya Şəkil Yüklə</div>
            <div class="demo-room-grid">
              ${INJ_DATA.mikroRooms
                .map(
                  (r) => `
                <button type="button" class="room-thumb-btn ${!this.state.customImageUrl && this.state.selectedRoomId === r.id ? 'active' : ''}" onclick="INJ_MIKRO.selectRoom('${r.id}')">
                  <img src="${r.image}" alt="${r.name}" />
                  <div class="room-thumb-label">
                    <span>${r.name}</span>
                    <span class="emerald-text" style="font-size:0.7rem;">${r.defaultArea}</span>
                  </div>
                </button>
              `
                )
                .join('')}
            </div>

            <label class="upload-zone" id="mikro-upload-zone" for="mikro-file-input">
              ${icon('upload')}
              <span>${this.state.customImageUrl ? 'Başqa şəkil yüklə (' + this.state.customImageName + ')' : 'Şəkil yüklə və ya bura sürüklə (JPG/PNG)'}</span>
              <input id="mikro-file-input" type="file" accept="image/*" style="display:none;" onchange="INJ_MIKRO.handleUpload(event)" />
            </label>
          </div>

          <div>
            <div class="panel-block-title" style="justify-content:space-between;">
              <span style="display:inline-flex; align-items:center; gap:8px;"><span class="step-num">2</span> Problemi Seç (Çoxlu seçim)</span>
              <span class="emerald-text tabular" style="font-size:0.72rem;">${this.state.selectedProblemIds.length} seçilib</span>
            </div>
            <div class="problem-list">
              ${INJ_DATA.mikroProblems
                .map((p) => {
                  const isSel = this.state.selectedProblemIds.includes(p.id);
                  return `
                <button type="button" class="problem-card ${isSel ? 'active' : ''}" onclick="INJ_MIKRO.toggleProblem('${p.id}')">
                  <span class="pkg-toggle-check" style="${isSel ? 'background:var(--emerald-400); border-color:var(--emerald-400);' : ''}">
                    ${isSel ? icon('check') : ''}
                  </span>
                  <div style="flex:1; min-width:0;">
                    <div style="display:flex; align-items:center; justify-content:space-between; gap:6px; flex-wrap:wrap;">
                      <span class="problem-title">${p.title}</span>
                      <span class="mini-pill" style="font-size:0.65rem; color:var(--amber-400);">${p.metric}</span>
                    </div>
                    <div class="problem-sub">${p.sub}</div>
                  </div>
                </button>
              `;
                })
                .join('')}
            </div>
          </div>

          <div>
            <button type="button" class="btn-primary btn-full" onclick="INJ_MIKRO.runAIScan()" ${this.state.isScanning ? 'disabled' : ''}>
              ${icon('sparkles')}
              <span>${this.state.isScanning ? 'Sİ Skan Edir...' : this.state.hasResult ? 'Yenidən Sİ Skanı Et' : 'Sİ ilə 3D Paket Yığ'}</span>
            </button>
            <p class="muted-text" style="font-size:0.75rem; text-align:center; margin-top:8px;">
              Əlimizdəki real stok modulları ilə ani 3D yerləşdirmə
            </p>
          </div>
        </div>

        <!-- Right Interactive 3D Stage & Package Output -->
        <div class="visualizer-column">
          <div class="stage-shell">
            <div class="stage-card ${this.state.isScanning ? 'is-scanning' : ''} ${this.state.hasResult ? 'has-result' : ''} ${showing3D && afterImg ? 'show-after' : ''}">
              <img class="stage-image" src="${this.getCurrentImage()}" alt="Məkan görüntüsü" />
              ${afterImg ? `<img class="stage-image stage-image-after" src="${afterImg}" alt="3D transformasiya olunmuş məkan" />` : ''}
              <div class="stage-emerald-tint"></div>

              <div class="stage-hud-top">
                <div class="hud-pill">
                  <span class="pulse-dot" aria-hidden="true"></span>
                  <span>${this.getCurrentRoomLabel()}</span>
                </div>

                ${
                  this.state.hasResult
                    ? `
                  <div class="view-mode-toggle">
                    <button type="button" class="view-mode-btn ${!this.state.showAfter ? 'active' : ''}" onclick="INJ_MIKRO.setShowAfter(false)">Əvvəl</button>
                    <button type="button" class="view-mode-btn ${this.state.showAfter ? 'active' : ''}" onclick="INJ_MIKRO.setShowAfter(true)">3D Nəticə</button>
                  </div>
                `
                    : `<div class="hud-pill"><span class="muted-text">Sİ skanı gözlənilir</span></div>`
                }
              </div>

              ${
                !this.state.hasResult && !this.state.isScanning
                  ? `
                <div class="stage-cta-overlay">
                  <span style="font-size:0.8rem; color:var(--concrete-light);">3D modulları yerləşdirməyə hazırdır</span>
                  <button type="button" class="btn-primary btn-sm" onclick="INJ_MIKRO.runAIScan()">
                    ${icon('sparkles')} İndi Skan Et
                  </button>
                </div>
              `
                  : ''
              }

              <!-- AI Scan Overlay -->
              <div class="scan-overlay">
                <div class="scan-beam"></div>
                <div class="scan-status-box">
                  <div class="scan-status-title">İNJEKSİON Sİ Analizi Aktivdir</div>
                  <div class="scan-status-sub" id="mikro-scan-sub">Otaq həndəsəsi skan edilir...</div>
                  <div class="scan-progress-bar">
                    <div class="scan-progress-fill" id="mikro-scan-fill"></div>
                  </div>
                </div>
              </div>

              <!-- Interactive Hotspots (with direct + Əlavə et button) -->
              ${
                showing3D
                  ? `
                <div class="hotspot-layer">
                  ${
                    !afterImg
                      ? spec.hotspots
                          .map((hs, idx) => {
                            if (this.state.excludedIds.includes(hs.id)) return '';
                            const dims =
                              idx === 0
                                ? 'width:24%; height:26%;'
                                : idx === 1
                                ? 'width:28%; height:11%;'
                                : 'width:15%; height:30%;';
                            return `<div class="ar-zone-frame ${activeHs.id === hs.id ? 'active' : ''}" style="left:${hs.x}%; top:${hs.y}%; ${dims} animation-delay:${idx * 0.1}s;"></div>`;
                          })
                          .join('')
                      : ''
                  }
                  ${spec.hotspots
                    .map((hs, idx) => {
                      if (this.state.excludedIds.includes(hs.id)) return '';
                      let hx = hs.x;
                      let hy = hs.y;
                      if (!this.state.customImageUrl && this.state.selectedRoomId === 'eyvan') {
                        const eyvanCoords = [
                          { x: 49, y: 39 },
                          { x: 49, y: 15 },
                          { x: 64, y: 50 },
                          { x: 24, y: 66 }
                        ];
                        if (eyvanCoords[idx]) {
                          hx = eyvanCoords[idx].x;
                          hy = eyvanCoords[idx].y;
                        }
                      } else if (!this.state.customImageUrl && this.state.selectedRoomId === 'loft') {
                        const loftCoords = [
                          { x: 49, y: 45 },
                          { x: 50, y: 29 },
                          { x: 65, y: 55 },
                          { x: 26, y: 58 }
                        ];
                        if (loftCoords[idx]) {
                          hx = loftCoords[idx].x;
                          hy = loftCoords[idx].y;
                        }
                      }
                      const qtyInCart = window.INJ_CART ? INJ_CART.getItemQty('mikro-single-' + hs.id) : 0;
                      return `
                    <div class="hotspot-pin ${activeHs.id === hs.id ? 'selected' : ''}" style="left:${hx}%; top:${hy}%; animation-delay:${idx * 0.12}s;">
                      <div class="hotspot-pill-group">
                        <button type="button" class="hotspot-dot-btn" onclick="INJ_MIKRO.selectHotspot('${hs.id}')">
                          <span class="hotspot-core">
                            <span class="hotspot-ripple"></span>
                            ${idx + 1}
                          </span>
                          <span>${hs.shortLabel}</span>
                        </button>
                        <button type="button" class="hotspot-add-btn ${qtyInCart > 0 ? 'added' : ''}" title="Səbətə əlavə et" onclick="INJ_MIKRO.addSingleHotspot('${hs.id}', event)">
                          ${qtyInCart > 0 ? `✓ ${qtyInCart}` : '+ Əlavə et'}
                        </button>
                      </div>
                    </div>
                  `;
                    })
                    .join('')}
                </div>
              `
                  : ''
              }
            </div>

            <!-- Integrated Non-Overlapping Inspector Bar -->
            ${
              this.state.hasResult && activeHs
                ? `
              <div class="hotspot-inspector-bar">
                <div class="inspector-left">
                  <img class="inspector-img" src="${activeHs.image}" alt="${activeHs.name}" />
                  <div class="inspector-body">
                    <div class="inspector-cat">Seçilmiş 3D Modul • ${activeHs.category}</div>
                    <div class="inspector-title">${activeHs.name}</div>
                    <div class="inspector-spec">${activeHs.spec}</div>
                  </div>
                </div>
                <div class="inspector-actions">
                  <div class="inspector-price tabular">${INJ_UI.formatAZN(activeHs.price)}</div>
                  <button type="button" class="btn-secondary btn-sm" onclick="INJ_MIKRO.addSingleHotspot('${activeHs.id}', event)">
                    ${icon('cart')} Tək əlavə et
                  </button>
                </div>
              </div>
            `
                : ''
            }
          </div>

          <!-- Ready Package Card with Live Module Checkboxes -->
          ${
            this.state.hasResult
              ? `
            <div class="glass-card glass-card-emerald package-result-card">
              <div class="package-header">
                <div>
                  <div class="package-badge">${icon('sparkles')} Sİ Tövsiyəli Hazır Satış Paketi (${pricing.count}/${spec.hotspots.length} modul)</div>
                  <h2 class="package-name">${spec.packageName}</h2>
                </div>
                <div class="package-price-box">
                  <div class="price-old tabular">${INJ_UI.formatAZN(pricing.oldPrice)}</div>
                  <div class="price-main tabular">${INJ_UI.formatAZN(pricing.price)}</div>
                </div>
              </div>

              <div class="package-items-grid">
                ${spec.hotspots
                  .map((hs, idx) => {
                    const included = !this.state.excludedIds.includes(hs.id);
                    return `
                  <div class="pkg-module-item ${included ? 'included' : 'excluded'} ${activeHs.id === hs.id ? 'active' : ''}" onclick="INJ_MIKRO.selectHotspot('${hs.id}')">
                    <button type="button" class="pkg-toggle-check" aria-label="${hs.shortLabel} modulunu əlavə et/çıxar" onclick="INJ_MIKRO.toggleModuleInPackage('${hs.id}', event)">
                      ${included ? icon('check') : ''}
                    </button>
                    <img src="${hs.image}" alt="${hs.shortLabel}" />
                    <div class="pkg-module-meta">
                      <div class="pkg-module-name">${idx + 1}. ${hs.shortLabel}</div>
                      <div class="pkg-module-sub">${hs.category}</div>
                      <div class="pkg-module-price tabular">${INJ_UI.formatAZN(hs.price)}</div>
                    </div>
                  </div>
                `;
                  })
                  .join('')}
              </div>

              <div class="package-footer">
                <div class="eco-impact-row">
                  <span class="impact-tag"><span class="emerald-text">${icon('leaf')}</span> ${spec.impact.o2}</span>
                  <span class="impact-tag"><span class="emerald-text">${icon('volume')}</span> ${spec.impact.noise}</span>
                  <span class="impact-tag"><span class="emerald-text">${icon('check')}</span> ${spec.impact.install}</span>
                </div>
                <button type="button" class="btn-primary" onclick="INJ_MIKRO.orderPackage()">
                  ${icon('cart')}
                  <span>Tam Paketi Sifariş et • ${INJ_UI.formatAZN(pricing.price)}</span>
                </button>
              </div>
            </div>
          `
              : ''
          }
        </div>
      </div>
    `;

    this.bindDragDrop();
  }
};
