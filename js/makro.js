/* ==========================================================================
   TAB 3: MAKRO (B2G — 87 Ərazi • Ev Dəqiqliyində Zoom 20.5 Retina Peyk +
   Ünvan Axtarışı + Rayon Ümumi İnvestisiya + Gələcək Dövlət/Yeraltı GIS Konsepti)
   ========================================================================== */

window.INJ_MAKRO = {
  state: {
    cityId: 'mingecevir',
    selectedZoneId: 'mg-1',
    mapLayer: 'hybrid', // 'hybrid' (Google Retina+Küçələr) | 'satellite' (Google Retina Saf) | 'esri' (Esri Clarity) | 'thermal'
    lat: 40.7702,
    lng: 47.0435,
    zoom: 13.6,
    isFullscreen: false,
    searchQuery: '',
    dropdownOpen: false,
    customPin: null, // { lat, lng, label }
    govLayers: {
      underground: false,
      soil: false,
      cadastre: false
    }
  },

  tileCache: new Map(),
  cityDataCache: new Map(),
  animFrame: null,

  init() {
    const city = this.getCurrentCity();
    this.state.lat = city.center.lat;
    this.state.lng = city.center.lng;
    this.state.zoom = city.center.zoom;
    this.render();
  },

  getCityData(cityId) {
    if (this.cityDataCache.has(cityId)) return this.cityDataCache.get(cityId);
    const reg = INJ_REGIONS.find((r) => r.id === cityId) || INJ_REGIONS[0];
    const built = INJ_BUILD_CITY_DATA(reg);
    this.cityDataCache.set(cityId, built);
    return built;
  },

  getCurrentCity() {
    return this.getCityData(this.state.cityId);
  },

  getCurrentZone() {
    const city = this.getCurrentCity();
    return city.zones.find((z) => z.id === this.state.selectedZoneId) || city.zones[0];
  },

  /* Compute total city/rayon investment & CO2 across all zones (merged from teammate's repo) */
  getCityTotals(city) {
    let totalBudget = 0;
    let totalCo2 = 0;
    city.zones.forEach((z) => {
      const bNum = parseInt(String(z.budget).replace(/[^\d]/g, ''), 10) || 0;
      const cNum = parseInt(String(z.co2Year).replace(/[^\d]/g, ''), 10) || 0;
      totalBudget += bNum;
      totalCo2 += cNum;
    });
    return {
      totalBudgetFormatted: INJ_UI.formatAZN(totalBudget),
      totalCo2: totalCo2 + ' ton/il'
    };
  },

  scrollRegionStrip(dir) {
    const strip = document.getElementById('makro-region-strip');
    if (strip) strip.scrollBy({ left: dir * 280, behavior: 'smooth' });
  },

  openAllRegionsModal() {
    const groups = new Map();
    INJ_REGIONS.forEach((r) => {
      if (!groups.has(r.region)) groups.set(r.region, []);
      groups.get(r.region).push(r);
    });

    let body = '';
    for (const [grp, list] of groups.entries()) {
      body += `
        <div class="region-group-lbl" style="padding-left:0; margin-top:6px;">${grp} (${list.length})</div>
        <div class="all-regions-grid">
          ${list
            .map(
              (r) => `
            <button type="button" class="all-region-item ${r.id === this.state.cityId ? 'active' : ''}" onclick="INJ_UI.closeModal(); INJ_MAKRO.selectCity('${r.id}', true);">
              <span>${r.name}</span>
              <span class="dot-red" style="width:6px; height:6px; flex-shrink:0;"></span>
            </button>
          `
            )
            .join('')}
        </div>
      `;
    }

    INJ_UI.openModal(`
      <div style="display:flex; justify-content:space-between; align-items:center; gap:12px; margin-bottom:14px;">
        <div>
          <div class="eyebrow" style="margin-bottom:4px;">${icon('map')} Tam Siyahı • ${INJ_REGIONS.length} Şəhər və Rayon</div>
          <h3 style="font-family:var(--font-display); font-size:1.3rem;">Azərbaycanın Bütün Rayonları</h3>
        </div>
        <button class="icon-close-btn" type="button" aria-label="Bağla" onclick="INJ_UI.closeModal()">${icon('x')}</button>
      </div>
      <div style="max-height:68vh; overflow-y:auto; padding-right:4px;">
        ${body}
      </div>
    `);
  },

  /* ---------------- Web Mercator Projection ---------------- */
  project(lat, lng, zoom) {
    const scale = 256 * Math.pow(2, zoom);
    const x = ((lng + 180) / 360) * scale;
    const clampedLat = Math.max(-85.0511, Math.min(85.0511, lat));
    const sinLat = Math.sin((clampedLat * Math.PI) / 180);
    const y = (0.5 - Math.log((1 + sinLat) / (1 - sinLat)) / (4 * Math.PI)) * scale;
    return { x, y };
  },

  unproject(wx, wy, zoom) {
    const scale = 256 * Math.pow(2, zoom);
    const lng = (wx / scale) * 360 - 180;
    const n = Math.PI - (2 * Math.PI * wy) / scale;
    const lat = (180 / Math.PI) * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n)));
    return { lat, lng };
  },

  getMaxNativeTileZoom(layer) {
    return layer === 'esri' ? 18 : 20;
  },

  /* Retina scale=2 Google tiles (512x512 crisp detail) + Esri Clarity option */
  getTileUrl(layer, z, x, y) {
    if (layer === 'esri') {
      return `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/${z}/${y}/${x}`;
    }
    const sub = Math.abs(x + y) % 4;
    if (layer === 'satellite') {
      return `https://mt${sub}.google.com/vt/lyrs=s&scale=2&x=${x}&y=${y}&z=${z}`;
    }
    // 'hybrid' & 'thermal': Retina 512px Google Satellite + Azerbaijani house/street labels
    return `https://mt${sub}.google.com/vt/lyrs=y&hl=az&scale=2&x=${x}&y=${y}&z=${z}`;
  },

  getPreviewTileForLatLng(lat, lng, z = 14) {
    const p = this.project(lat, lng, z);
    const tx = Math.floor(p.x / 256);
    const ty = Math.floor(p.y / 256);
    return `https://mt1.google.com/vt/lyrs=y&hl=az&scale=2&x=${tx}&y=${ty}&z=${z}`;
  },

  getScaleLabel(zoom, lat) {
    const metersPerPx = (156543.03392 * Math.cos((lat * Math.PI) / 180)) / Math.pow(2, zoom);
    const dist = metersPerPx * 48;
    if (dist >= 1000) return (dist / 1000).toFixed(dist >= 10000 ? 0 : 1) + ' km';
    if (dist < 15) return Math.max(2, Math.round(dist)) + ' m (Ev səviyyəsi)';
    return Math.max(5, Math.round(dist / 5) * 5) + ' m';
  },

  flyTo(targetLat, targetLng, targetZoom, duration = 520) {
    if (this.animFrame) cancelAnimationFrame(this.animFrame);
    const startLat = this.state.lat;
    const startLng = this.state.lng;
    const startZoom = this.state.zoom;
    const endZoom = Math.max(6.5, Math.min(20.5, targetZoom));
    const t0 = performance.now();

    const step = (now) => {
      const p = Math.min(1, (now - t0) / duration);
      const ease = 1 - Math.pow(1 - p, 3);
      this.state.lat = startLat + (targetLat - startLat) * ease;
      this.state.lng = startLng + (targetLng - startLng) * ease;
      this.state.zoom = startZoom + (endZoom - startZoom) * ease;
      this.updateMapViewport();
      if (p < 1) {
        this.animFrame = requestAnimationFrame(step);
      } else {
        this.animFrame = null;
      }
    };
    this.animFrame = requestAnimationFrame(step);
  },

  /* ---------------- Exact House / Street Address & GPS Finder ---------------- */
  async submitAddressSearch(event) {
    if (event) event.preventDefault();
    const input = document.getElementById('makro-address-input');
    if (!input) return;
    const raw = input.value.trim();
    if (!raw) return;

    // 1. Check direct GPS coordinates (e.g. "40.7695, 47.0585")
    const coordMatch = raw.match(/^\s*(-?\d{1,2}(?:\.\d+)?)\s*[,;\s]\s*(-?\d{1,3}(?:\.\d+)?)\s*$/);
    if (coordMatch) {
      const lat = parseFloat(coordMatch[1]);
      const lng = parseFloat(coordMatch[2]);
      this.state.customPin = { lat, lng, label: `GPS: ${lat.toFixed(5)}, ${lng.toFixed(5)}` };
      this.flyTo(lat, lng, 19.3, 620);
      INJ_UI.toast('Dəqiq GPS nöqtəsinə (Zoom 19.3) fokuslandı');
      return;
    }

    // 2. Check quick match in 87 local regions if short single name
    const localReg = INJ_REGIONS.find((r) => r.name.toLowerCase() === raw.toLowerCase());
    if (localReg) {
      this.selectCity(localReg.id, true);
      this.flyTo(localReg.lat, localReg.lng, 17.5, 580);
      return;
    }

    // 3. Query OpenStreetMap Nominatim for exact street / building / house in Azerbaijan
    const cityClean = this.getCurrentCity().name.replace(' Pilot Zonası', '');
    const queryWithContext = raw.toLowerCase().includes('azərbaycan') || raw.includes(',') ? raw : `${raw}, ${cityClean}, Azərbaycan`;

    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&countrycodes=az&accept-language=az&limit=1&q=${encodeURIComponent(queryWithContext)}`;
      const res = await fetch(url, { headers: { Accept: 'application/json' } });
      const data = await res.json();

      if (Array.isArray(data) && data.length > 0) {
        const hit = data[0];
        const lat = parseFloat(hit.lat);
        const lng = parseFloat(hit.lon);
        const shortName = String(hit.display_name || raw).split(',').slice(0, 2).join(', ');
        this.state.customPin = { lat, lng, label: shortName };
        this.flyTo(lat, lng, 19.4, 650);
        INJ_UI.toast(`Ünvan tapıldı: "${shortName}" (Ev səviyyəsi Zoom 19.4)`);
        return;
      }

      // Retry without current city prefix across whole Azerbaijan
      const urlBroad = `https://nominatim.openstreetmap.org/search?format=json&countrycodes=az&accept-language=az&limit=1&q=${encodeURIComponent(raw)}`;
      const res2 = await fetch(urlBroad, { headers: { Accept: 'application/json' } });
      const data2 = await res2.json();
      if (Array.isArray(data2) && data2.length > 0) {
        const hit = data2[0];
        const lat = parseFloat(hit.lat);
        const lng = parseFloat(hit.lon);
        const shortName = String(hit.display_name || raw).split(',').slice(0, 2).join(', ');
        this.state.customPin = { lat, lng, label: shortName };
        this.flyTo(lat, lng, 19.4, 650);
        INJ_UI.toast(`Ünvan tapıldı: "${shortName}"`);
        return;
      }
      INJ_UI.toast('Dəqiq ünvan tapılmadı — küçə və şəhər adını birlikdə yazın');
    } catch (_) {
      // Offline fallback: search local 87 regions
      const fallbackReg = INJ_REGIONS.find((r) => r.name.toLowerCase().includes(raw.toLowerCase()));
      if (fallbackReg) {
        this.selectCity(fallbackReg.id, true);
      } else {
        INJ_UI.toast('Oflayn rejim: 87 rayon siyahısından seçin və ya GPS koordinat yazın');
      }
    }
  },

  /* ---------------- Toggle Future Government / Underground Concept Layers ---------------- */
  toggleGovLayer(key) {
    this.state.govLayers[key] = !this.state.govLayers[key];
    document.querySelectorAll('.gov-layer-btn').forEach((b) => {
      const k = b.getAttribute('data-gov');
      if (k) b.classList.toggle('active', Boolean(this.state.govLayers[k]));
    });
    const anyOn = this.state.govLayers.underground || this.state.govLayers.soil || this.state.govLayers.cadastre;
    const banner = document.getElementById('gov-concept-banner');
    if (banner) banner.hidden = !anyOn;

    // Auto-zoom to street/building level if user turns on underground lines while zoomed far out
    if (anyOn && this.state.zoom < 15.2) {
      const z = this.getCurrentZone();
      this.flyTo(z.lat, z.lng, 16.8, 520);
    } else {
      this.updateMapViewport();
    }
  },

  /* ---------------- Region & Country Switching ---------------- */
  viewWholeAzerbaijan() {
    this.closeDropdown();
    this.flyTo(40.15, 47.65, 7.2, 560);
    document.querySelectorAll('#makro-region-strip .region-chip').forEach((c) => {
      c.classList.toggle('active', c.dataset.rid === '__all__');
    });
  },

  selectCity(cityId, shouldFly = true) {
    if (cityId === '__all__') {
      this.viewWholeAzerbaijan();
      return;
    }
    this.state.cityId = cityId;
    const city = this.getCurrentCity();
    this.state.selectedZoneId = city.zones[0].id;
    this.state.searchQuery = '';
    this.state.customPin = null;
    this.closeDropdown();

    const input = document.getElementById('makro-region-search');
    if (input) {
      input.value = '';
      input.placeholder = `${city.name.replace(' Pilot Zonası', '')} • ${INJ_REGIONS.length} rayondan axtar...`;
    }

    const fb = document.getElementById('gmap-fallback-img');
    if (fb) {
      if (city.satImage) {
        fb.src = city.satImage;
        fb.style.display = 'block';
      } else {
        fb.style.display = 'none';
      }
    }

    const thumb = document.getElementById('gmap-layer-thumb-img');
    if (thumb) {
      thumb.src = city.satImage || this.getPreviewTileForLatLng(city.center.lat, city.center.lng, 12);
    }

    const markersLayer = document.getElementById('gmap-markers-layer');
    if (markersLayer) markersLayer.innerHTML = '';

    this.renderRecipeOnly();
    this.renderQuickbarZones();
    this.updateRegionChipsActive();

    if (shouldFly) {
      this.flyTo(city.center.lat, city.center.lng, city.center.zoom, 540);
    } else {
      this.state.lat = city.center.lat;
      this.state.lng = city.center.lng;
      this.state.zoom = city.center.zoom;
      this.updateMapViewport();
    }
  },

  selectZone(zoneId, flyToZone = false) {
    this.state.selectedZoneId = zoneId;
    this.renderRecipeOnly();
    this.updateQuickbarActive();
    const zone = this.getCurrentZone();
    if (flyToZone) {
      this.flyTo(zone.lat, zone.lng, Math.max(17.2, this.state.zoom), 480);
    } else {
      this.updateMapViewport();
    }
  },

  openDropdown() {
    this.state.dropdownOpen = true;
    const dd = document.getElementById('makro-region-dropdown');
    if (dd) {
      dd.classList.add('open');
      this.renderDropdownList();
    }
  },

  closeDropdown() {
    this.state.dropdownOpen = false;
    const dd = document.getElementById('makro-region-dropdown');
    if (dd) dd.classList.remove('open');
  },

  onSearchInput(val) {
    this.state.searchQuery = val.trim().toLowerCase();
    this.openDropdown();
  },

  renderDropdownList() {
    const dd = document.getElementById('makro-region-dropdown');
    if (!dd) return;
    const q = this.state.searchQuery;
    const filtered = INJ_REGIONS.filter(
      (r) => !q || r.name.toLowerCase().includes(q) || r.region.toLowerCase().includes(q)
    );

    if (filtered.length === 0) {
      dd.innerHTML = `<div style="padding:14px; text-align:center; font-size:0.8rem; color:var(--concrete-muted);">Rayon tapılmadı</div>`;
      return;
    }

    const groups = new Map();
    filtered.forEach((r) => {
      if (!groups.has(r.region)) groups.set(r.region, []);
      groups.get(r.region).push(r);
    });

    let html = `
      <button type="button" class="region-opt-btn" onclick="INJ_MAKRO.viewWholeAzerbaijan()">
        <span>Bütün Azərbaycan (${INJ_REGIONS.length} Ərazi)</span>
        <span class="region-opt-meta">Zoom 7</span>
      </button>
    `;

    for (const [grpName, list] of groups.entries()) {
      html += `<div class="region-group-lbl">${grpName} (${list.length})</div>`;
      html += list
        .map(
          (r) => `
        <button type="button" class="region-opt-btn ${r.id === this.state.cityId ? 'active' : ''}" onclick="INJ_MAKRO.selectCity('${r.id}', true)">
          <span>${r.name}</span>
          <span class="region-opt-meta">${r.pilot ? 'Pilot' : r.lat.toFixed(2) + '°N'}</span>
        </button>
      `
        )
        .join('');
    }
    dd.innerHTML = html;
  },

  setMapLayer(layer) {
    this.state.mapLayer = layer;
    const canvas = document.getElementById('gmap-canvas');
    if (canvas) {
      canvas.className = `gmap-canvas gmap-mode-${layer}`;
    }
    this.tileCache.clear();
    const tilePlane = document.getElementById('gmap-tiles-container');
    if (tilePlane) tilePlane.innerHTML = '';
    document.querySelectorAll('.layer-pill-btn').forEach((b) => {
      b.classList.toggle('active', b.dataset.layer === layer);
    });
    const thumbLabel = document.getElementById('gmap-layer-thumb-lbl');
    if (thumbLabel) {
      thumbLabel.textContent = layer === 'hybrid' ? 'Saf HD' : layer === 'satellite' ? 'Esri HD' : layer === 'esri' ? 'Termal' : 'Hibrid';
    }
    this.updateMapViewport();
  },

  cycleLayer() {
    const order = ['hybrid', 'satellite', 'esri', 'thermal'];
    const idx = order.indexOf(this.state.mapLayer);
    this.setMapLayer(order[(idx + 1) % order.length]);
  },

  zoomBy(delta) {
    const next = Math.max(6.5, Math.min(20.5, this.state.zoom + delta));
    this.flyTo(this.state.lat, this.state.lng, next, 240);
  },

  focusActiveZone() {
    const z = this.getCurrentZone();
    this.flyTo(z.lat, z.lng, 18.6, 520);
  },

  toggleFullscreen() {
    this.state.isFullscreen = !this.state.isFullscreen;
    const card = document.getElementById('makro-map-card');
    const fsBtn = document.getElementById('makro-fs-btn');
    if (card) card.classList.toggle('is-fullscreen', this.state.isFullscreen);
    if (fsBtn) fsBtn.textContent = this.state.isFullscreen ? '✕' : '⛶';
    setTimeout(() => this.updateMapViewport(), 60);
  },

  /* Render geo-anchored Future Government / Underground Concept GIS Schematic SVG */
  renderGovConceptSVG(anchorLat, anchorLng, zFloat, topLeftX, topLeftY) {
    const g = this.state.govLayers;
    if ((!g.underground && !g.soil && !g.cadastre) || zFloat < 11.5) return '';

    const pt = (dLat, dLng) => {
      const p = this.project(anchorLat + dLat, anchorLng + dLng, zFloat);
      return `${(p.x - topLeftX).toFixed(1)},${(p.y - topLeftY).toFixed(1)}`;
    };
    const ptObj = (dLat, dLng) => {
      const p = this.project(anchorLat + dLat, anchorLng + dLng, zFloat);
      return { x: p.x - topLeftX, y: p.y - topLeftY };
    };

    let svg = '';

    // 1. Soil & Hydro-geology layer (groundwater + salinity contour)
    if (g.soil) {
      const c = ptObj(0.0004, -0.0006);
      const rPx = Math.max(55, Math.min(260, Math.pow(2, zFloat - 15) * 78));
      svg += `
        <circle cx="${c.x.toFixed(1)}" cy="${c.y.toFixed(1)}" r="${rPx.toFixed(1)}" fill="rgba(14, 165, 233, 0.14)" stroke="#38bdf8" stroke-width="1.8" stroke-dasharray="6 4" />
        <g transform="translate(${(c.x - 74).toFixed(1)}, ${(c.y - rPx - 24).toFixed(1)})">
          <rect x="0" y="0" width="176" height="22" rx="6" fill="rgba(7, 24, 36, 0.9)" stroke="#38bdf8" stroke-width="1" />
          <text x="8" y="14" fill="#bae6fd" font-size="10" font-weight="700">QRUNT SUYU: 2.4m • pH 7.3 (Nümayiş)</text>
        </g>
      `;
    }

    // 2. State Cadastre Parcels (municipal green-zone allotment blocks)
    if (g.cadastre) {
      const poly1 = `${pt(0.0018, -0.0022)} ${pt(0.0021, 0.0005)} ${pt(0.0004, 0.0009)} ${pt(0.0001, -0.0018)}`;
      const poly2 = `${pt(-0.0003, 0.0006)} ${pt(0.0001, 0.0031)} ${pt(-0.0016, 0.0034)} ${pt(-0.0019, 0.0009)}`;
      const lbl = ptObj(0.0015, -0.0016);
      svg += `
        <polygon points="${poly1}" fill="rgba(168, 85, 247, 0.12)" stroke="#c084fc" stroke-width="1.8" stroke-dasharray="4 3" />
        <polygon points="${poly2}" fill="rgba(16, 185, 129, 0.14)" stroke="#34d399" stroke-width="1.8" stroke-dasharray="4 3" />
        <g transform="translate(${lbl.x.toFixed(1)}, ${lbl.y.toFixed(1)})">
          <rect x="0" y="0" width="166" height="21" rx="5" fill="rgba(26, 12, 42, 0.9)" stroke="#c084fc" stroke-width="1" />
          <text x="8" y="14" fill="#e9d5ff" font-size="9.5" font-weight="700">KADASTR PARSELİ #AZ-409 (Konsept)</text>
        </g>
      `;
    }

    // 3. Underground Utilities (Water Ø400mm blue, Gas medium-pressure yellow, 10kV Power orange)
    if (g.underground) {
      const waterLine = `M ${pt(-0.0028, -0.0038)} L ${pt(-0.0004, -0.0008)} L ${pt(0.0016, 0.0028)} L ${pt(0.0032, 0.0046)}`;
      const gasLine = `M ${pt(0.0029, -0.0032)} L ${pt(0.0005, -0.0002)} L ${pt(-0.0014, 0.0029)}`;
      const powerLine = `M ${pt(-0.0022, 0.0014)} L ${pt(0.0002, 0.0004)} L ${pt(0.0027, -0.0009)}`;
      const wTag = ptObj(-0.0004, -0.0008);
      const gTag = ptObj(0.0005, -0.0002);

      svg += `
        <!-- Protective root buffer corridor -->
        <path d="${gasLine}" fill="none" stroke="rgba(250, 204, 21, 0.2)" stroke-width="14" stroke-linecap="round" />
        <path d="${waterLine}" fill="none" stroke="#38bdf8" stroke-width="3" stroke-dasharray="10 5" />
        <path d="${gasLine}" fill="none" stroke="#facc15" stroke-width="3" stroke-dasharray="7 4" />
        <path d="${powerLine}" fill="none" stroke="#fb923c" stroke-width="2.6" stroke-dasharray="4 4" />

        <g transform="translate(${(wTag.x + 10).toFixed(1)}, ${(wTag.y + 12).toFixed(1)})">
          <rect x="0" y="0" width="154" height="20" rx="5" fill="rgba(5, 22, 34, 0.92)" stroke="#38bdf8" stroke-width="1" />
          <text x="7" y="13.5" fill="#7dd3fc" font-size="9.5" font-weight="700">SU XƏTTİ Ø400mm (-1.8m)</text>
        </g>
        <g transform="translate(${(gTag.x - 165).toFixed(1)}, ${(gTag.y - 26).toFixed(1)})">
          <rect x="0" y="0" width="174" height="20" rx="5" fill="rgba(34, 26, 5, 0.92)" stroke="#facc15" stroke-width="1" />
          <text x="7" y="13.5" fill="#fde047" font-size="9.5" font-weight="700">QAZ &amp; 10kV KABEL (Əkin Qadağası)</text>
        </g>
      `;
    }

    return svg;
  },

  /* ---------------- 60 FPS Retina Google Maps Tile & Marker Renderer ---------------- */
  updateMapViewport() {
    const wrap = document.getElementById('makro-map-wrap');
    const tileContainer = document.getElementById('gmap-tiles-container');
    const fallbackImg = document.getElementById('gmap-fallback-img');
    const markersLayer = document.getElementById('gmap-markers-layer');
    const corridorSvg = document.getElementById('gmap-corridor-svg');
    if (!wrap || !tileContainer) return;

    const width = wrap.clientWidth;
    const height = wrap.clientHeight;
    if (width === 0 || height === 0) return;

    const city = this.getCurrentCity();
    const activeZone = this.getCurrentZone();
    const zFloat = this.state.zoom;
    const maxNativeZ = this.getMaxNativeTileZoom(this.state.mapLayer);
    // Clamp tile fetch level to maxNativeZ and smoothly scale above it so tiles NEVER turn grey at Zoom 20.5!
    const tileZoom = Math.max(6, Math.min(maxNativeZ, Math.floor(zFloat + 0.35)));
    const tileScale = Math.pow(2, zFloat - tileZoom);
    const tileSizePx = 256 * tileScale;

    const centerWorld = this.project(this.state.lat, this.state.lng, zFloat);
    const topLeftX = centerWorld.x - width / 2;
    const topLeftY = centerWorld.y - height / 2;

    /* 1. Local Offline HD Fallback Mosaic */
    if (fallbackImg) {
      if (city.z14Start && city.satImage && zFloat >= 10) {
        const fbScale = Math.pow(2, zFloat - 14);
        const fbX = city.z14Start.x * 256 * fbScale - topLeftX;
        const fbY = city.z14Start.y * 256 * fbScale - topLeftY;
        const fbW = 8 * 256 * fbScale;
        const fbH = 6 * 256 * fbScale;
        fallbackImg.style.display = 'block';
        fallbackImg.style.width = fbW.toFixed(1) + 'px';
        fallbackImg.style.height = fbH.toFixed(1) + 'px';
        fallbackImg.style.transform = `translate3d(${fbX.toFixed(1)}px, ${fbY.toFixed(1)}px, 0)`;
      } else {
        fallbackImg.style.display = 'none';
      }
    }

    /* 2. Render Visible Retina 512px Google / Esri Satellite Tiles */
    const maxTileIdx = Math.pow(2, tileZoom) - 1;
    const colStart = Math.max(0, Math.floor(topLeftX / tileSizePx) - 1);
    const colEnd = Math.min(maxTileIdx, Math.floor((topLeftX + width) / tileSizePx) + 1);
    const rowStart = Math.max(0, Math.floor(topLeftY / tileSizePx) - 1);
    const rowEnd = Math.min(maxTileIdx, Math.floor((topLeftY + height) / tileSizePx) + 1);

    const visibleKeys = new Set();

    for (let tx = colStart; tx <= colEnd; tx++) {
      for (let ty = rowStart; ty <= rowEnd; ty++) {
        const key = `${this.state.mapLayer}/${tileZoom}/${tx}/${ty}`;
        visibleKeys.add(key);
        let img = this.tileCache.get(key);
        if (!img) {
          img = document.createElement('img');
          img.className = 'gmap-tile';
          img.alt = '';
          img.decoding = 'async';
          img.onload = () => img.classList.add('loaded');
          img.onerror = () => img.remove();
          img.src = this.getTileUrl(this.state.mapLayer, tileZoom, tx, ty);
          tileContainer.appendChild(img);
          this.tileCache.set(key, img);
        }
        const px = tx * tileSizePx - topLeftX;
        const py = ty * tileSizePx - topLeftY;
        const drawSize = tileSizePx + 0.75;
        img.style.width = drawSize.toFixed(2) + 'px';
        img.style.height = drawSize.toFixed(2) + 'px';
        img.style.transform = `translate3d(${px.toFixed(1)}px, ${py.toFixed(1)}px, 0)`;
      }
    }

    if (this.tileCache.size > 120) {
      for (const [k, el] of this.tileCache.entries()) {
        if (!visibleKeys.has(k)) {
          el.remove();
          this.tileCache.delete(k);
        }
      }
    } else {
      for (const [k, el] of this.tileCache.entries()) {
        el.style.display = visibleKeys.has(k) ? 'block' : 'none';
      }
    }

    /* 3. Country-Wide Rayon Pins vs City Risk Zones + Custom House Pin + Gov Concept GIS */
    const isCountryView = zFloat < 10.5;

    if (isCountryView) {
      if (corridorSvg) corridorSvg.innerHTML = '';
      if (markersLayer) {
        if (markersLayer.dataset.mode !== 'country') {
          markersLayer.innerHTML = '';
          markersLayer.dataset.mode = 'country';
        }
        const list = zFloat >= 9.5 ? INJ_REGIONS : INJ_REGIONS.filter((r) => !r.sub);
        const activeIds = new Set(list.map((r) => 'c-' + r.id));

        Array.from(markersLayer.children).forEach((ch) => {
          if (!activeIds.has(ch.id)) ch.style.display = 'none';
        });

        list.forEach((reg) => {
          const p = this.project(reg.lat, reg.lng, zFloat);
          const sx = p.x - topLeftX;
          const sy = p.y - topLeftY;
          let el = document.getElementById('c-' + reg.id);
          if (!el) {
            el = document.createElement('button');
            el.type = 'button';
            el.id = 'c-' + reg.id;
            el.className = 'gmap-country-pin';
            el.innerHTML = `<span class="gmap-country-dot"></span><span>${reg.name}</span>`;
            el.addEventListener('click', (e) => {
              e.stopPropagation();
              this.selectCity(reg.id, true);
            });
            markersLayer.appendChild(el);
          }
          const inBounds = sx > -60 && sx < width + 60 && sy > -40 && sy < height + 40;
          el.style.display = inBounds ? 'inline-flex' : 'none';
          el.classList.toggle('active', reg.id === this.state.cityId);
          el.style.transform = `translate3d(${sx.toFixed(1)}px, ${sy.toFixed(1)}px, 0) translate(-50%, -50%)`;
        });
      }
    } else {
      if (markersLayer && markersLayer.dataset.mode !== 'city-' + city.id) {
        markersLayer.innerHTML = '';
        markersLayer.dataset.mode = 'city-' + city.id;
      }

      const projectedZones = city.zones.map((z) => {
        const p = this.project(z.lat, z.lng, zFloat);
        return { zone: z, sx: p.x - topLeftX, sy: p.y - topLeftY };
      });

      const anchorLat = this.state.customPin ? this.state.customPin.lat : activeZone.lat;
      const anchorLng = this.state.customPin ? this.state.customPin.lng : activeZone.lng;
      const govSvg = this.renderGovConceptSVG(anchorLat, anchorLng, zFloat, topLeftX, topLeftY);

      if (corridorSvg) {
        const act = projectedZones.find((pz) => pz.zone.id === activeZone.id) || projectedZones[0];
        const lines = projectedZones
          .filter((pz) => pz.zone.id !== act.zone.id)
          .map(
            (pz) =>
              `<line x1="${pz.sx.toFixed(1)}" y1="${pz.sy.toFixed(1)}" x2="${act.sx.toFixed(1)}" y2="${act.sy.toFixed(1)}" stroke="#34d399" stroke-opacity="0.68" stroke-width="2.2" stroke-dasharray="7 6" />`
          )
          .join('');
        corridorSvg.innerHTML = lines + govSvg;
      }

      if (markersLayer) {
        projectedZones.forEach(({ zone, sx, sy }) => {
          let pin = document.getElementById('gmap-pin-' + zone.id);
          if (!pin) {
            pin = document.createElement('div');
            pin.id = 'gmap-pin-' + zone.id;
            pin.className = 'gmap-pin';
            pin.innerHTML = `
              <div class="gmap-pin-halo"></div>
              <div class="gmap-pin-pulse"></div>
              <div class="gmap-pin-dot"></div>
              <div class="gmap-pin-card">
                <div class="gmap-pin-code">${zone.code} • ${zone.tempDrop}</div>
                <div class="gmap-pin-sub"></div>
              </div>
            `;
            pin.addEventListener('click', (e) => {
              e.stopPropagation();
              this.selectZone(zone.id, true);
            });
            markersLayer.appendChild(pin);
          }
          const isActive = zone.id === activeZone.id;
          pin.classList.toggle('active', isActive);
          const subEl = pin.querySelector('.gmap-pin-sub');
          if (subEl) subEl.textContent = isActive ? 'Aktiv Risk Zonası' : 'Ev səviyyəsinə yaxınlaş';

          const cardEl = pin.querySelector('.gmap-pin-card');
          if (cardEl) {
            if (sx > width - 175) {
              cardEl.style.left = 'auto';
              cardEl.style.right = '18px';
            } else {
              cardEl.style.left = '18px';
              cardEl.style.right = 'auto';
            }
          }
          pin.style.transform = `translate3d(${sx.toFixed(1)}px, ${sy.toFixed(1)}px, 0)`;
        });

        // Render Exact Searched House / Address Pin if present
        let housePin = document.getElementById('gmap-custom-house-pin');
        if (this.state.customPin) {
          const hp = this.project(this.state.customPin.lat, this.state.customPin.lng, zFloat);
          const hsx = hp.x - topLeftX;
          const hsy = hp.y - topLeftY;
          if (!housePin) {
            housePin = document.createElement('div');
            housePin.id = 'gmap-custom-house-pin';
            housePin.className = 'gmap-pin active';
            markersLayer.appendChild(housePin);
          }
          housePin.innerHTML = `
            <div class="gmap-pin-dot" style="background:#06b6d4; box-shadow:0 0 0 5px rgba(6,182,212,0.45);"></div>
            <div class="gmap-pin-card" style="background:rgba(6,38,48,0.95); border-color:#22d3ee;">
              <div class="gmap-pin-code">${this.state.customPin.label}</div>
              <div class="gmap-pin-sub" style="color:#a5f3fc;">Dəqiq Ünvan / Bina Nöqtəsi</div>
            </div>
          `;
          housePin.style.transform = `translate3d(${hsx.toFixed(1)}px, ${hsy.toFixed(1)}px, 0)`;
        } else if (housePin) {
          housePin.remove();
        }
      }
    }

    /* 4. Update Scale & Live Telemetry HUD */
    const scaleText = document.getElementById('gmap-scale-text');
    if (scaleText) {
      scaleText.textContent = `${this.getScaleLabel(zFloat, this.state.lat)} • Z${zFloat.toFixed(1)} • ${this.state.lat.toFixed(5)}°N, ${this.state.lng.toFixed(5)}°E`;
    }
  },

  /* ---------------- Google Maps Pointer / Wheel / Pinch Interactions ---------------- */
  bindMapInteractions() {
    const wrap = document.getElementById('makro-map-wrap');
    if (!wrap) return;

    const pointers = new Map();
    let dragging = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let dragStartWorld = null;
    let pinchStartDist = 0;
    let pinchStartZoom = 0;

    wrap.addEventListener('pointerdown', (e) => {
      this.closeDropdown();
      if (e.target.closest('button') || e.target.closest('.gmap-pin')) return;
      if (this.animFrame) cancelAnimationFrame(this.animFrame);
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      wrap.setPointerCapture(e.pointerId);

      if (pointers.size === 1) {
        dragging = true;
        dragStartX = e.clientX;
        dragStartY = e.clientY;
        dragStartWorld = this.project(this.state.lat, this.state.lng, this.state.zoom);
        wrap.classList.add('is-dragging');
      } else if (pointers.size === 2) {
        dragging = false;
        const pts = Array.from(pointers.values());
        pinchStartDist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
        pinchStartZoom = this.state.zoom;
      }
    });

    wrap.addEventListener('pointermove', (e) => {
      if (!pointers.has(e.pointerId)) return;
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

      if (pointers.size === 2 && pinchStartDist > 0) {
        const pts = Array.from(pointers.values());
        const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
        const zDelta = Math.log2(dist / pinchStartDist);
        this.state.zoom = Math.max(6.5, Math.min(20.5, pinchStartZoom + zDelta));
        this.updateMapViewport();
        return;
      }

      if (!dragging || !dragStartWorld) return;
      const dx = e.clientX - dragStartX;
      const dy = e.clientY - dragStartY;
      const nextGeo = this.unproject(dragStartWorld.x - dx, dragStartWorld.y - dy, this.state.zoom);
      this.state.lat = Math.max(38.0, Math.min(42.3, nextGeo.lat));
      this.state.lng = Math.max(44.2, Math.min(51.2, nextGeo.lng));
      this.updateMapViewport();
    });

    const release = (e) => {
      pointers.delete(e.pointerId);
      if (pointers.size === 0) {
        dragging = false;
        pinchStartDist = 0;
        wrap.classList.remove('is-dragging');
      }
    };

    wrap.addEventListener('pointerup', release);
    wrap.addEventListener('pointercancel', release);

    wrap.addEventListener('dblclick', (e) => {
      if (e.target.closest('button') || e.target.closest('.gmap-pin')) return;
      const rect = wrap.getBoundingClientRect();
      const centerW = this.project(this.state.lat, this.state.lng, this.state.zoom);
      const clickGeo = this.unproject(
        centerW.x + (e.clientX - rect.left - rect.width / 2),
        centerW.y + (e.clientY - rect.top - rect.height / 2),
        this.state.zoom
      );
      this.flyTo(clickGeo.lat, clickGeo.lng, Math.min(20.5, this.state.zoom + 1.35), 320);
    });

    wrap.addEventListener(
      'wheel',
      (e) => {
        e.preventDefault();
        if (this.animFrame) cancelAnimationFrame(this.animFrame);
        const rect = wrap.getBoundingClientRect();
        const relX = e.clientX - rect.left - rect.width / 2;
        const relY = e.clientY - rect.top - rect.height / 2;

        const oldZ = this.state.zoom;
        const delta = e.deltaY < 0 ? 0.65 : -0.65;
        const newZ = Math.max(6.5, Math.min(20.5, oldZ + delta));
        if (newZ === oldZ) return;

        const oldCenter = this.project(this.state.lat, this.state.lng, oldZ);
        const cursorGeo = this.unproject(oldCenter.x + relX, oldCenter.y + relY, oldZ);
        const cursorNewW = this.project(cursorGeo.lat, cursorGeo.lng, newZ);
        const newCenterGeo = this.unproject(cursorNewW.x - relX, cursorNewW.y - relY, newZ);

        this.state.zoom = newZ;
        this.state.lat = newCenterGeo.lat;
        this.state.lng = newCenterGeo.lng;
        this.updateMapViewport();
      },
      { passive: false }
    );

    if (!this._docBound) {
      this._docBound = true;
      document.addEventListener('click', (e) => {
        if (!e.target.closest('.region-picker-wrap')) this.closeDropdown();
      });
    }
  },

  openPDFPreview() {
    const city = this.getCurrentCity();
    const zone = this.getCurrentZone();
    const totals = this.getCityTotals(city);
    const today = '27.11.2026';
    const satPreview = city.satImage || this.getPreviewTileForLatLng(zone.lat, zone.lng, 15);

    INJ_UI.openModal(`
      <div style="display:flex; justify-content:space-between; align-items:center; gap:12px;" class="no-print">
        <div class="eyebrow" style="margin:0;">${icon('fileText')} B2G Rəsmi PDF Önizləməsi</div>
        <button class="icon-close-btn" type="button" aria-label="Bağla" onclick="INJ_UI.closeModal()">${icon('x')}</button>
      </div>

      <div class="pdf-paper" id="b2g-pdf-document">
        <div class="pdf-paper-header">
          <div>
            <div class="pdf-brand">İNJEKSİON MAKRO • B2G</div>
            <div style="font-size:0.84rem; font-weight:600; color:#1f2937; margin-top:4px;">
              Şəhər Yaşıl İnfrastruktur Resepti və Peyk Analiz Pasportu
            </div>
            <div style="font-size:0.75rem; color:#6b7280; margin-top:2px;">
              ${city.name} (${city.regionName || 'Azərbaycan'}) • GPS: ${zone.gps}
            </div>
          </div>
          <div class="pdf-meta">
            <div><strong>Sənəd №:</strong> ${zone.code}-2026</div>
            <div><strong>Tarix:</strong> ${today}</div>
            <div><strong>Mənbə:</strong> Retina Peyk HD (Zoom 20.5)</div>
          </div>
        </div>

        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap:14px; align-items:center; margin-bottom:14px;">
          <div style="position:relative; border-radius:8px; overflow:hidden; border:1px solid #d1d5db; height:132px; background:#0c1311;">
            <img src="${satPreview}" alt="${city.name} peyk görüntüsü" style="width:100%; height:100%; object-fit:cover;" />
            <div style="position:absolute; left:50%; top:50%; width:12px; height:12px; transform:translate(-50%,-50%); border-radius:50%; background:#ef4444; border:2px solid #ffffff; box-shadow:0 0 0 6px rgba(239,68,68,0.38);"></div>
          </div>
          <div>
            <h3 style="font-size:1.08rem; color:#064e3b; margin-bottom:5px;">${zone.name}</h3>
            <p style="font-size:0.82rem; color:#374151; line-height:1.45;">
              <strong>Risk Diaqnozu (${zone.severity}):</strong> ${zone.problem}
            </p>
          </div>
        </div>

        <div class="pdf-grid">
          <div class="pdf-stat">
            <div class="pdf-stat-val">${zone.tempDrop}</div>
            <div class="pdf-stat-lbl">Yay Temperatur Düşüşü</div>
          </div>
          <div class="pdf-stat">
            <div class="pdf-stat-val">${zone.co2Year}</div>
            <div class="pdf-stat-lbl">Zona İllik CO₂ Udulması</div>
          </div>
          <div class="pdf-stat">
            <div class="pdf-stat-val">${zone.budget}</div>
            <div class="pdf-stat-lbl">Zona Büdcəsi (${zone.timeline})</div>
          </div>
        </div>

        <div style="font-weight:700; font-size:0.86rem; color:#111827; margin-bottom:6px;">Tətbiq Olunacaq Yaşıl İnfrastruktur Resepti:</div>
        <ul style="padding-left:18px; font-size:0.82rem; color:#374151; margin-bottom:16px; display:flex; flex-direction:column; gap:5px;">
          ${zone.recipes.map((r) => `<li>${r}</li>`).join('')}
        </ul>

        <div style="font-weight:700; font-size:0.86rem; color:#111827; margin-bottom:6px;">İlkin Smeta Cədvəli:</div>
        <table class="pdf-table">
          <thead>
            <tr><th>Komponent / İş Paketi</th><th>Həcm</th><th style="text-align:right;">Təxmini Büdcə</th></tr>
          </thead>
          <tbody>
            ${zone.bom
              .map(
                (b) => `<tr><td>${b.item}</td><td>${b.qty}</td><td style="text-align:right; font-weight:700;">${b.cost}</td></tr>`
              )
              .join('')}
          </tbody>
        </table>

        <div style="margin-top:14px; padding:10px 12px; border-radius:8px; background:#ecfdf5; border:1px solid #a7f3d0; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
          <span style="font-size:0.8rem; font-weight:700; color:#065f46;">Rayon Üzrə Ümumi İnvestisiya Paketi (${city.zones.length} zona • ${totals.totalCo2} CO₂):</span>
          <strong style="font-size:1rem; color:#064e3b;">${totals.totalBudgetFormatted}</strong>
        </div>

        <div style="margin-top:16px; padding-top:10px; border-top:1px dashed #cbd5e1; display:flex; justify-content:space-between; font-size:0.74rem; color:#64748b;">
          <span>İNJEKSİON Eco-Tech Urban Satellite Analytics</span>
          <span>Açıq GIS &amp; Gələcək Dövlət Kadastr/Yeraltı API Uyğunluğu</span>
        </div>
      </div>

      <div style="display:flex; justify-content:flex-end; gap:10px; flex-wrap:wrap;" class="no-print">
        <button type="button" class="btn-secondary" onclick="INJ_UI.closeModal()">Bağla</button>
        <button type="button" class="btn-primary" onclick="window.print()">
          ${icon('printer')} Çap Et / PDF Kimi Yadda Saxla
        </button>
      </div>
    `);
  },

  renderRecipeHTML() {
    const zone = this.getCurrentZone();
    const city = this.getCurrentCity();
    const totals = this.getCityTotals(city);

    return `
      <div style="display:flex; flex-direction:column; gap:14px;">
        <div>
          <div style="display:flex; justify-content:space-between; align-items:center; gap:8px; flex-wrap:wrap;">
            <span class="risk-severity-badge">${icon('alert')} ${zone.severity}</span>
            <span class="muted-text tabular" style="font-size:0.76rem; font-weight:700;">${zone.code}</span>
          </div>
          <div class="severity-meter"><div class="severity-meter-fill" style="width:86%;"></div></div>
        </div>

        <div>
          <div class="emerald-text" style="font-size:0.73rem; font-family:monospace; margin-bottom:4px;">${city.regionName || 'Azərbaycan'} • GPS: ${zone.gps}</div>
          <h2 style="font-family:var(--font-display); font-size:1.22rem; line-height:1.25;">${zone.name}</h2>
          <p class="muted-text" style="font-size:0.83rem; margin-top:6px;">${zone.problem}</p>
        </div>

        <div class="recipe-metrics-row">
          <div class="recipe-metric-box">
            <div class="val tabular">${zone.tempDrop}</div>
            <div class="lbl">İstilik Düşüşü</div>
          </div>
          <div class="recipe-metric-box">
            <div class="val tabular">${zone.co2Year}</div>
            <div class="lbl">CO₂ Udulması</div>
          </div>
          <div class="recipe-metric-box">
            <div class="val tabular">${zone.timeline}</div>
            <div class="lbl">İcra Müddəti</div>
          </div>
        </div>

        <div>
          <div class="panel-block-title" style="margin-bottom:8px;">
            <span class="emerald-text">${icon('leaf')}</span> Yaşıl İnfrastruktur Resepti
          </div>
          <ul class="recipe-list">
            ${zone.recipes
              .map(
                (rec) => `
              <li>
                <span class="emerald-text" style="flex-shrink:0; margin-top:2px;">${icon('check')}</span>
                <span>${rec}</span>
              </li>
            `
              )
              .join('')}
          </ul>
        </div>
      </div>

      <div style="padding-top:12px; border-top:1px solid var(--glass-border); display:flex; flex-direction:column; gap:10px;">
        <div style="display:flex; justify-content:space-between; align-items:baseline;">
          <span class="muted-text" style="font-size:0.8rem;">Seçilmiş Zona Büdcəsi</span>
          <strong class="emerald-text tabular" style="font-family:var(--font-display); font-size:1.22rem;">${zone.budget}</strong>
        </div>

        <div style="padding:9px 12px; border-radius:11px; background:rgba(16,185,129,0.1); border:1px solid rgba(52,211,153,0.28); display:flex; justify-content:space-between; align-items:center; gap:8px;">
          <div>
            <div style="font-size:0.7rem; color:var(--emerald-300); font-weight:700;">Rayon Üzrə Ümumi İnvestisiya (${city.zones.length} zona)</div>
            <div class="muted-text" style="font-size:0.68rem;">Cəmi udulma: ${totals.totalCo2}</div>
          </div>
          <strong class="tabular" style="font-family:var(--font-display); font-size:1rem; color:#ffffff;">${totals.totalBudgetFormatted}</strong>
        </div>

        <button type="button" class="btn-primary btn-full" onclick="INJ_MAKRO.openPDFPreview()">
          ${icon('fileText')}
          <span>PDF Önizləmə Pəncərəsini Aç</span>
        </button>
      </div>
    `;
  },

  renderRecipeOnly() {
    const panel = document.getElementById('makro-recipe-panel');
    if (panel) panel.innerHTML = this.renderRecipeHTML();
  },

  renderQuickbarZones() {
    const bar = document.getElementById('makro-zone-btns');
    if (!bar) return;
    const city = this.getCurrentCity();
    const zone = this.getCurrentZone();
    bar.innerHTML = city.zones
      .map(
        (z) => `
      <button type="button" class="zone-quick-btn ${z.id === zone.id ? 'active' : ''}" data-zone-id="${z.id}" onclick="INJ_MAKRO.selectZone('${z.id}', true)">
        <span class="dot-red" style="width:7px; height:7px;"></span>
        <span>${z.code}</span>
      </button>
    `
      )
      .join('');
  },

  updateQuickbarActive() {
    document.querySelectorAll('#makro-zone-btns .zone-quick-btn').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.zoneId === this.state.selectedZoneId);
    });
  },

  updateRegionChipsActive() {
    document.querySelectorAll('#makro-region-strip .region-chip').forEach((c) => {
      const isAct = c.dataset.rid === this.state.cityId;
      c.classList.toggle('active', isAct);
      if (isAct) c.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    });
  },

  render() {
    const container = document.getElementById('view-makro');
    const city = this.getCurrentCity();
    const anyGov = this.state.govLayers.underground || this.state.govLayers.soil || this.state.govLayers.cadastre;
    this.tileCache.clear();

    container.innerHTML = `
      <div class="section-hero">
        <div>
          <div class="eyebrow">${icon('map')} BÖLMƏ 03 • MAKRO (B2G — 87 ƏRAZİ RETİNA PEYK &amp; GƏLƏCƏK YERALTI GIS)</div>
          <h1 class="section-title">Ev Dəqiqliyində <span>Ultra-HD Peyk</span> və Dövlət Analitikası</h1>
          <p class="section-desc">
            İstənilən rayonu və ya küçə/ev ünvanını axtarın, Retina 512px peyk görüntüsü ilə həyət və dam səviyyəsinə (Zoom 20.5) enin və gələcək dövlət yeraltı kommunikasiya konsept qatlarını yoxlayın.
          </p>
        </div>
        <div class="kpi-strip">
          <div class="kpi-pill">
            <span class="kpi-val">Zoom 20.5</span>
            <span class="kpi-lbl">Retina Ev Dəqiqliyi</span>
          </div>
          <div class="kpi-pill">
            <span class="kpi-val">${INJ_REGIONS.length} Ərazi</span>
            <span class="kpi-lbl">Tam Azərbaycan</span>
          </div>
          <div class="kpi-pill">
            <span class="kpi-val">Yeraltı GIS</span>
            <span class="kpi-lbl">Gələcək B2G Konsepti</span>
          </div>
        </div>
      </div>

      <div class="makro-grid">
        <!-- Map Card -->
        <div class="map-container-card ${this.state.isFullscreen ? 'is-fullscreen' : ''}" id="makro-map-card">
          <!-- Top Bar: Rayon Search + Exact House/Street Finder + Retina Layer Switcher -->
          <div class="makro-map-header">
            <div class="region-picker-wrap">
              <span class="region-search-icon">${icon('search')}</span>
              <input
                id="makro-region-search"
                type="text"
                class="region-search-input"
                placeholder="${city.name.replace(' Pilot Zonası', '')} • ${INJ_REGIONS.length} rayondan axtar..."
                autocomplete="off"
                onfocus="INJ_MAKRO.openDropdown()"
                oninput="INJ_MAKRO.onSearchInput(this.value)"
              />
              <button type="button" class="btn-secondary btn-sm" style="white-space:nowrap;" onclick="INJ_MAKRO.openAllRegionsModal()">
                Hamısı (${INJ_REGIONS.length})
              </button>
              <div class="region-dropdown" id="makro-region-dropdown"></div>
            </div>

            <form class="address-finder-form" onsubmit="INJ_MAKRO.submitAddressSearch(event)">
              <input
                id="makro-address-input"
                type="text"
                class="region-search-input"
                style="padding-left:11px; max-width:240px;"
                placeholder="Küçə / ev ünvanı və ya GPS..."
                aria-label="Dəqiq ünvan və ya GPS axtar"
              />
              <button type="submit" class="btn-primary btn-sm" style="padding:7px 11px; white-space:nowrap;">
                ${icon('pin')} Evə Uç
              </button>
            </form>

            <div class="map-city-switch">
              <button type="button" class="city-pill layer-pill-btn ${this.state.mapLayer === 'hybrid' ? 'active' : ''}" data-layer="hybrid" onclick="INJ_MAKRO.setMapLayer('hybrid')">
                Google HD
              </button>
              <button type="button" class="city-pill layer-pill-btn ${this.state.mapLayer === 'satellite' ? 'active' : ''}" data-layer="satellite" onclick="INJ_MAKRO.setMapLayer('satellite')">
                Saf Peyk
              </button>
              <button type="button" class="city-pill layer-pill-btn ${this.state.mapLayer === 'esri' ? 'active' : ''}" data-layer="esri" onclick="INJ_MAKRO.setMapLayer('esri')">
                Esri HD
              </button>
              <button type="button" class="city-pill layer-pill-btn ${this.state.mapLayer === 'thermal' ? 'active' : ''}" data-layer="thermal" onclick="INJ_MAKRO.setMapLayer('thermal')">
                Termal
              </button>
            </div>
          </div>

          <!-- Horizontal Scrollable Strip Containing ALL 87 Rayons -->
          <div class="region-quick-bar-shell">
            <button type="button" class="region-scroll-arrow" onclick="INJ_MAKRO.scrollRegionStrip(-1)" aria-label="Sola">‹</button>
            <div class="region-quick-strip" id="makro-region-strip">
              <button type="button" class="region-chip" data-rid="__all__" onclick="INJ_MAKRO.selectCity('__all__', true)">
                Bütün Azərbaycan
              </button>
              ${INJ_REGIONS.map(
                (r) => `
                <button type="button" class="region-chip ${r.id === this.state.cityId ? 'active' : ''}" data-rid="${r.id}" onclick="INJ_MAKRO.selectCity('${r.id}', true)">
                  ${r.name}
                </button>
              `
              ).join('')}
            </div>
            <button type="button" class="region-scroll-arrow" onclick="INJ_MAKRO.scrollRegionStrip(1)" aria-label="Sağa">›</button>
          </div>

          <!-- Satellite Viewport -->
          <div class="tactical-map-svg-wrap" id="makro-map-wrap">
            <div class="gmap-canvas gmap-mode-${this.state.mapLayer}" id="gmap-canvas">
              <div class="gmap-tile-plane">
                <img id="gmap-fallback-img" class="gmap-fallback-img" src="${city.satImage || ''}" alt="" />
                <div id="gmap-tiles-container"></div>
              </div>
              <svg id="gmap-corridor-svg" class="gmap-corridor-svg"></svg>
              <div id="gmap-markers-layer" class="gmap-markers-layer"></div>
            </div>

            <!-- Future Government Concept Watermark Banner (visible when any concept layer is toggled ON) -->
            <div id="gov-concept-banner" class="gov-concept-banner" ${anyGov ? '' : 'hidden'}>
              <span class="gold-text">${icon('layers')}</span>
              <span><strong>GƏLƏCƏK MƏRHƏLƏ (KONSEPT NÜMAYİŞİ):</strong> Real dövlət yeraltı boru, qrunt və kadastr datası B2G API müqaviləsi ilə qoşulacaq.</span>
            </div>

            <!-- Bottom-Left Layer Square + Scale Bar -->
            <div class="gmap-bottom-left">
              <button type="button" class="gmap-layer-thumb" onclick="INJ_MAKRO.cycleLayer()" title="Peyk mənbəyini dəyiş">
                <img id="gmap-layer-thumb-img" src="${city.satImage || this.getPreviewTileForLatLng(city.center.lat, city.center.lng, 12)}" alt="Qatlar" />
                <span id="gmap-layer-thumb-lbl">${this.state.mapLayer === 'hybrid' ? 'Saf HD' : this.state.mapLayer === 'satellite' ? 'Esri HD' : this.state.mapLayer === 'esri' ? 'Termal' : 'Hibrid'}</span>
              </button>
              <div class="gmap-scale-pill">
                <span class="gmap-scale-bar"></span>
                <span id="gmap-scale-text">500 m • Z13.6</span>
              </div>
            </div>

            <!-- Bottom-Right Controls -->
            <div class="map-zoom-controls">
              <button type="button" class="zoom-btn" onclick="INJ_MAKRO.zoomBy(1)" title="Yaxınlaşdır (+)">+</button>
              <button type="button" class="zoom-btn" onclick="INJ_MAKRO.zoomBy(-1)" title="Uzaqlaşdır (−)">−</button>
              <button type="button" class="zoom-btn" style="font-size:0.85rem;" onclick="INJ_MAKRO.focusActiveZone()" title="Ev səviyyəsinə en (Zoom 18.6)">◎</button>
              <button type="button" class="zoom-btn" style="font-size:0.68rem;" onclick="INJ_MAKRO.viewWholeAzerbaijan()" title="Bütün Azərbaycan">AZ</button>
              <button type="button" class="zoom-btn" id="makro-fs-btn" style="font-size:0.75rem;" onclick="INJ_MAKRO.toggleFullscreen()" title="Tam Ekran">${this.state.isFullscreen ? '✕' : '⛶'}</button>
            </div>
          </div>

          <!-- Future Government & Underground Data Concept Toggle Bar -->
          <div class="gov-layers-bar">
            <div style="display:flex; align-items:center; gap:7px;">
              <span class="gov-future-pill">GƏLƏCƏK B2G KONSEPTİ</span>
              <span class="muted-text" style="font-size:0.74rem; font-weight:600;">Dövlət &amp; Yeraltı Data Qatları:</span>
            </div>
            <div style="display:flex; gap:6px; flex-wrap:wrap;">
              <button type="button" class="gov-layer-btn ${this.state.govLayers.underground ? 'active' : ''}" data-gov="underground" onclick="INJ_MAKRO.toggleGovLayer('underground')">
                Yeraltı Xətlər (Su/Qaz/Kabel)
              </button>
              <button type="button" class="gov-layer-btn ${this.state.govLayers.soil ? 'active' : ''}" data-gov="soil" onclick="INJ_MAKRO.toggleGovLayer('soil')">
                Qrunt Suları &amp; Torpaq
              </button>
              <button type="button" class="gov-layer-btn ${this.state.govLayers.cadastre ? 'active' : ''}" data-gov="cadastre" onclick="INJ_MAKRO.toggleGovLayer('cadastre')">
                Dövlət Kadastrı &amp; Sensor
              </button>
            </div>
          </div>

          <!-- Quick Zone Focus Bar -->
          <div class="map-zone-quickbar">
            <span class="muted-text" style="font-size:0.75rem; font-weight:600;">Risk Zonalarına Fokuslan (Zoom 17+):</span>
            <div id="makro-zone-btns" style="display:flex; gap:8px; flex-wrap:wrap;"></div>
          </div>
        </div>

        <!-- Right Green Infrastructure Prescription Panel -->
        <div class="glass-card glass-card-emerald recipe-panel" id="makro-recipe-panel">
          ${this.renderRecipeHTML()}
        </div>
      </div>
    `;

    this.renderQuickbarZones();
    this.bindMapInteractions();
    requestAnimationFrame(() => this.updateMapViewport());
  }
};
