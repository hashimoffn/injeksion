/* ==========================================================================
   TAB 4: MAĞAZA (Marketplace — Karusel + Açıq Eko-Bazar + Sıralama + Səbət Sinxronu)
   ========================================================================== */

window.INJ_MAGAZA = {
  state: {
    searchQuery: '',
    category: 'Hamısı',
    sortBy: 'popular' // 'popular' | 'price-asc' | 'price-desc'
  },

  categories: ['Hamısı', 'Mamır Panelləri', 'Eko-Beton & Çərçivə', 'Fitolampalar', 'Ağıllı Bitkilər', 'Suvarma & Sensor'],

  init() {
    this.render();
  },

  setCategory(cat) {
    this.state.category = cat;
    this.renderProductsGrid();
    document.querySelectorAll('#market-cat-chips .chip').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.cat === cat);
    });
  },

  setSearch(val) {
    this.state.searchQuery = val.trim().toLowerCase();
    this.renderProductsGrid();
  },

  setSort(val) {
    this.state.sortBy = val;
    this.renderProductsGrid();
  },

  scrollCarousel(dir) {
    const track = document.getElementById('exclusive-carousel-track');
    if (!track) return;
    track.scrollBy({ left: dir * 385, behavior: 'smooth' });
  },

  addPackage(id) {
    const pkg = INJ_DATA.exclusivePackages.find((p) => p.id === id);
    if (!pkg) return;
    INJ_CART.addItem(
      {
        id: pkg.id,
        title: pkg.name,
        badge: 'İNJEKSİON Xüsusi Paketi',
        price: pkg.price,
        image: pkg.image
      },
      true
    );
  },

  addProduct(id, event) {
    if (event) event.stopPropagation();
    const prod = INJ_DATA.marketProducts.find((p) => p.id === id);
    if (!prod) return;
    INJ_CART.addItem(
      {
        id: prod.id,
        title: prod.name,
        badge: `Eko-Bazar • ${prod.category}`,
        price: prod.price,
        image: prod.image
      },
      false
    );
  },

  openProductModal(id) {
    const prod = INJ_DATA.marketProducts.find((p) => p.id === id);
    if (!prod) return;
    INJ_UI.openModal(`
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
        <div class="eyebrow" style="margin:0;">${prod.category} • ${prod.vendor}</div>
        <button class="icon-close-btn" type="button" aria-label="Bağla" onclick="INJ_UI.closeModal()">${icon('x')}</button>
      </div>
      <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap:20px; align-items:center;">
        <img src="${prod.image}" alt="${prod.name}" style="width:100%; height:240px; object-fit:cover; border-radius:16px; border:1px solid var(--glass-border);" />
        <div style="display:flex; flex-direction:column; gap:12px;">
          <h3 style="font-family:var(--font-display); font-size:1.35rem; line-height:1.2;">${prod.name}</h3>
          <p class="muted-text" style="font-size:0.88rem;">${prod.desc}</p>
          <div style="display:flex; flex-wrap:wrap; gap:8px;">
            <span class="mini-pill">Stokda var (Bakı)</span>
            <span class="mini-pill">24 Ay Zəmanət</span>
            <span class="mini-pill">Modulyar Montaj</span>
          </div>
          <div style="padding-top:10px; border-top:1px solid var(--glass-border); display:flex; align-items:center; justify-content:space-between; gap:12px;">
            <span class="price-main tabular" style="font-size:1.5rem;">${INJ_UI.formatAZN(prod.price)}</span>
            <button type="button" class="btn-primary" onclick="INJ_MAGAZA.addProduct('${prod.id}'); INJ_UI.closeModal(); INJ_CART.open();">
              ${icon('cart')} Səbətə əlavə et
            </button>
          </div>
        </div>
      </div>
    `);
  },

  getFilteredProducts() {
    const list = INJ_DATA.marketProducts.filter((p) => {
      const catMatch = this.state.category === 'Hamısı' || p.category === this.state.category;
      const q = this.state.searchQuery;
      const textMatch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.desc.toLowerCase().includes(q) ||
        p.vendor.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);
      return catMatch && textMatch;
    });

    if (this.state.sortBy === 'price-asc') {
      return [...list].sort((a, b) => a.price - b.price);
    }
    if (this.state.sortBy === 'price-desc') {
      return [...list].sort((a, b) => b.price - a.price);
    }
    return list;
  },

  renderProductsGrid() {
    const grid = document.getElementById('open-market-grid');
    if (!grid) return;
    const list = this.getFilteredProducts();
    const countEl = document.getElementById('market-result-count');
    if (countEl) countEl.textContent = `${list.length} məhsul`;

    if (list.length === 0) {
      grid.innerHTML = `
        <div class="glass-card" style="grid-column:1/-1; padding:36px; text-align:center;">
          <p style="font-weight:700; margin-bottom:6px;">Axtarışınıza uyğun məhsul tapılmadı</p>
          <p class="muted-text" style="font-size:0.85rem;">Başqa açar söz yoxlayın və ya "Hamısı" filtrinə qayıdın.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = list
      .map((p) => {
        const inCart = window.INJ_CART ? INJ_CART.getItemQty(p.id) : 0;
        return `
      <article class="glass-card product-card" onclick="INJ_MAGAZA.openProductModal('${p.id}')">
        <div class="product-media">
          <img src="${p.image}" alt="${p.name}" />
          <span class="product-cat-pill">${p.category}</span>
        </div>
        <div class="product-body">
          <div class="product-vendor">${p.vendor}</div>
          <h3 class="product-name">${p.name}</h3>
          <p class="product-desc">${p.desc}</p>
          <div class="product-footer">
            <span class="price-tag">${INJ_UI.formatAZN(p.price)}</span>
            <button type="button" class="${inCart > 0 ? 'btn-primary' : 'btn-secondary'} btn-sm" onclick="INJ_MAGAZA.addProduct('${p.id}', event)">
              ${inCart > 0 ? icon('check') + ` Səbətdə (${inCart})` : icon('cart') + ' Səbətə at'}
            </button>
          </div>
        </div>
      </article>
    `;
      })
      .join('');
  },

  render() {
    const container = document.getElementById('view-magaza');
    container.innerHTML = `
      <div class="section-hero">
        <div>
          <div class="eyebrow">${icon('store')} MAĞAZA • Luxury Eco-Tech Marketplace</div>
          <h1 class="section-title">Xüsusi Paketlər və <span>Açıq Eko-Bazar</span></h1>
          <p class="section-desc">
            Sərgi üçün hazırlanmış hazır İNJEKSİON paketlərini seçin və ya yerli/beynəlxalq ekoloji istehsalçıların modullarını birbaşa səbətə əlavə edin.
          </p>
        </div>
        <button type="button" class="btn-secondary" onclick="INJ_CART.open()">
          ${icon('cart')} Səbəti Aç
        </button>
      </div>

      <!-- Top Section: İNJEKSİON Xüsusi Paketləri Carousel -->
      <div class="carousel-section">
        <div class="sub-header-row">
          <h2 class="sub-title">
            <span class="gold-text">${icon('sparkles')}</span>
            İNJEKSİON Xüsusi Paketləri
          </h2>
          <div class="carousel-controls">
            <button type="button" class="carousel-arrow" onclick="INJ_MAGAZA.scrollCarousel(-1)" aria-label="Sola sürüşdür">${icon('chevLeft')}</button>
            <button type="button" class="carousel-arrow" onclick="INJ_MAGAZA.scrollCarousel(1)" aria-label="Sağa sürüşdür">${icon('chevRight')}</button>
          </div>
        </div>

        <div class="packages-carousel" id="exclusive-carousel-track">
          ${INJ_DATA.exclusivePackages
            .map(
              (pkg) => `
            <article class="exclusive-pkg-card">
              <div class="pkg-card-media">
                <img src="${pkg.image}" alt="${pkg.name}" />
                <span class="pkg-tag">${pkg.tag}</span>
              </div>
              <div class="pkg-card-body">
                <h3 class="pkg-card-title">${pkg.name}</h3>
                <p class="pkg-card-desc">${pkg.desc}</p>
                <div class="pkg-card-includes">
                  ${pkg.includes.map((inc) => `<span class="mini-pill">${inc}</span>`).join('')}
                </div>
                <div class="pkg-card-foot">
                  <div>
                    <div class="price-old tabular">${INJ_UI.formatAZN(pkg.oldPrice)}</div>
                    <div class="price-tag">${INJ_UI.formatAZN(pkg.price)}</div>
                  </div>
                  <button type="button" class="btn-primary btn-sm" onclick="INJ_MAGAZA.addPackage('${pkg.id}')">
                    ${icon('cart')} Sifariş et
                  </button>
                </div>
              </div>
            </article>
          `
            )
            .join('')}
        </div>
      </div>

      <!-- Bottom Section: Açıq Eko-Bazar -->
      <div>
        <div class="sub-header-row">
          <h2 class="sub-title">
            <span class="emerald-text">${icon('leaf')}</span>
            Açıq Eko-Bazar
            <span id="market-result-count" class="mini-pill" style="font-size:0.74rem;"></span>
          </h2>
          <select class="market-sort-select" aria-label="Sıralama" onchange="INJ_MAGAZA.setSort(this.value)">
            <option value="popular">Sıralama: Populyar</option>
            <option value="price-asc">Qiymət: Ucuzdan Bahaya</option>
            <option value="price-desc">Qiymət: Bahadan Ucuza</option>
          </select>
        </div>

        <div class="market-toolbar">
          <div class="search-box">
            <span class="search-icon">${icon('search')}</span>
            <input
              type="text"
              class="search-input"
              placeholder="Mamır, fitolampa, hidroponika axtar..."
              value="${this.state.searchQuery}"
              oninput="INJ_MAGAZA.setSearch(this.value)"
            />
          </div>

          <div class="chip-group" id="market-cat-chips">
            ${this.categories
              .map(
                (cat) => `
              <button type="button" class="chip ${this.state.category === cat ? 'active' : ''}" data-cat="${cat}" onclick="INJ_MAGAZA.setCategory('${cat}')">
                ${cat}
              </button>
            `
              )
              .join('')}
          </div>
        </div>

        <div class="products-grid" id="open-market-grid"></div>
      </div>
    `;

    this.renderProductsGrid();
  }
};
