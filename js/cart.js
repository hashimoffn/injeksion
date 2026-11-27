/* ==========================================================================
   Global Slide-Over Cart (Səbət + SERGI20 Promo) + Modal & Toast Helpers
   ========================================================================== */

window.INJ_UI = {
  lastFocusEl: null,

  toast(message) {
    const container = document.getElementById('toast-container');
    const el = document.createElement('div');
    el.className = 'toast';
    el.innerHTML = `<span class="emerald-text">${icon('check')}</span><span>${message}</span>`;
    container.appendChild(el);
    setTimeout(() => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(8px)';
      el.style.transition = 'all 0.25s ease';
      setTimeout(() => el.remove(), 260);
    }, 2800);
  },

  openModal(html) {
    this.lastFocusEl = document.activeElement;
    const backdrop = document.getElementById('modal-backdrop');
    const content = document.getElementById('modal-content');
    content.innerHTML = html;
    backdrop.classList.add('open');
    backdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    const closeBtn = content.querySelector('.icon-close-btn');
    if (closeBtn) closeBtn.focus();
  },

  closeModal() {
    const backdrop = document.getElementById('modal-backdrop');
    if (!backdrop.classList.contains('open')) return;
    backdrop.classList.remove('open');
    backdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (this.lastFocusEl && typeof this.lastFocusEl.focus === 'function') {
      try {
        this.lastFocusEl.focus();
      } catch (_) {}
    }
  },

  formatAZN(value) {
    const num = Math.round(Number(value) || 0);
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' AZN';
  }
};

window.INJ_CART = {
  storageKey: 'injeksion_mvp_cart_v1',
  promoApplied: false,
  promoCode: 'SERGI20',
  items: [
    {
      id: 'p-moss-pro',
      title: 'Skandinaviya Zümrüd Mamır Paneli (120×60)',
      badge: 'Mağaza • Mamır Paneli',
      price: 420,
      qty: 1,
      image: 'assets/prod-moss.jpg'
    }
  ],

  save() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.items));
    } catch (_) {}
  },

  load() {
    try {
      const raw = localStorage.getItem(this.storageKey);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) this.items = parsed;
      }
    } catch (_) {}
  },

  init() {
    this.load();
    document.getElementById('open-cart-btn').addEventListener('click', () => this.open());
    document.getElementById('close-cart-btn').addEventListener('click', () => this.close());
    document.getElementById('cart-backdrop').addEventListener('click', () => this.close());
    document.getElementById('checkout-btn').addEventListener('click', () => this.checkout());
    this.injectPromoUI();
    this.render();
  },

  injectPromoUI() {
    const footer = document.getElementById('cart-drawer-footer');
    if (!footer || document.getElementById('cart-promo-box')) return;
    const box = document.createElement('div');
    box.id = 'cart-promo-box';
    box.className = 'promo-box';
    box.innerHTML = `
      <input id="cart-promo-input" class="promo-input" type="text" placeholder="Promo kod (məs: SERGI20)" aria-label="Promo kod" />
      <button class="btn-secondary btn-sm" type="button" onclick="INJ_CART.applyPromo()">Tətbiq et</button>
    `;
    footer.insertBefore(box, footer.firstChild);
  },

  applyPromo() {
    const input = document.getElementById('cart-promo-input');
    const code = (input ? input.value : '').trim().toUpperCase();
    if (code === 'SERGI20' || code === 'INJEKSION') {
      this.promoApplied = true;
      this.render();
      INJ_UI.toast('20% Sərgi VIP endirimi tətbiq edildi!');
    } else if (!code) {
      if (input) input.value = 'SERGI20';
      this.promoApplied = true;
      this.render();
      INJ_UI.toast('SERGI20 (20% endirim) aktivləşdirildi!');
    } else {
      INJ_UI.toast('Keçərli sərgi kodu: SERGI20');
    }
  },

  open() {
    document.getElementById('cart-drawer').classList.add('open');
    document.getElementById('cart-backdrop').classList.add('open');
    document.getElementById('cart-drawer').setAttribute('aria-hidden', 'false');
  },

  close() {
    document.getElementById('cart-drawer').classList.remove('open');
    document.getElementById('cart-backdrop').classList.remove('open');
    document.getElementById('cart-drawer').setAttribute('aria-hidden', 'true');
  },

  addItem(item, openDrawer = false) {
    const existing = this.items.find((i) => i.id === item.id);
    if (existing) {
      existing.qty += 1;
    } else {
      this.items.push({ ...item, qty: 1 });
    }
    this.render();
    INJ_UI.toast(`"${item.title}" səbətə əlavə edildi`);
    if (openDrawer) this.open();
  },

  updateQty(id, delta) {
    const item = this.items.find((i) => i.id === id);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
      this.items = this.items.filter((i) => i.id !== id);
    }
    this.render();
  },

  removeItem(id) {
    this.items = this.items.filter((i) => i.id !== id);
    this.render();
  },

  getItemQty(id) {
    const found = this.items.find((i) => i.id === id);
    return found ? found.qty : 0;
  },

  getSubtotal() {
    return this.items.reduce((sum, i) => sum + i.price * i.qty, 0);
  },

  getDiscount() {
    return this.promoApplied ? Math.round(this.getSubtotal() * 0.2) : 0;
  },

  getTotal() {
    return Math.max(0, this.getSubtotal() - this.getDiscount());
  },

  getCount() {
    return this.items.reduce((sum, i) => sum + i.qty, 0);
  },

  render() {
    this.save();
    const count = this.getCount();
    const discount = this.getDiscount();
    const total = this.getTotal();

    document.getElementById('cart-count-badge').textContent = count;
    document.getElementById('cart-drawer-subtitle').textContent = `${count} məhsul seçilib`;
    document.getElementById('cart-total-amount').textContent = INJ_UI.formatAZN(total);

    const summaryRows = document.querySelector('.cart-summary-rows');
    if (summaryRows) {
      const existingDisc = document.getElementById('cart-discount-row');
      if (discount > 0) {
        if (!existingDisc) {
          const row = document.createElement('div');
          row.id = 'cart-discount-row';
          row.className = 'summary-row';
          row.innerHTML = `<span>Sərgi Endirimi (SERGI20 -20%)</span><span class="emerald-text tabular">−${INJ_UI.formatAZN(discount)}</span>`;
          summaryRows.insertBefore(row, summaryRows.lastElementChild);
        } else {
          existingDisc.lastElementChild.textContent = '−' + INJ_UI.formatAZN(discount);
        }
      } else if (existingDisc) {
        existingDisc.remove();
      }
    }

    const container = document.getElementById('cart-items-container');
    const checkoutBtn = document.getElementById('checkout-btn');

    if (this.items.length === 0) {
      checkoutBtn.disabled = true;
      container.innerHTML = `
        <div class="cart-empty">
          <div style="margin-bottom:12px; color: var(--emerald-400);">${icon('cart')}</div>
          <p style="font-weight:600; color: var(--text-primary); margin-bottom:6px;">Səbətiniz hazırda boşdur</p>
          <p style="font-size:0.82rem;">Mikro 3D paketlərini, Mezo B2B həllərini və ya Eko-Bazar məhsullarını əlavə edin.</p>
        </div>
      `;
    } else {
      checkoutBtn.disabled = false;
      container.innerHTML = this.items
        .map(
          (item) => `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.title}" />
          <div class="cart-item-info">
            <div class="cart-item-badge">${item.badge}</div>
            <div class="cart-item-title">${item.title}</div>
            <div class="cart-item-controls">
              <div class="qty-stepper">
                <button class="qty-btn" type="button" aria-label="Azalt" onclick="INJ_CART.updateQty('${item.id}', -1)">−</button>
                <span class="tabular" style="font-size:0.84rem; font-weight:700; min-width:18px; text-align:center;">${item.qty}</span>
                <button class="qty-btn" type="button" aria-label="Artır" onclick="INJ_CART.updateQty('${item.id}', 1)">+</button>
              </div>
              <div style="display:flex; align-items:center; gap:10px;">
                <span class="emerald-text tabular" style="font-weight:700; font-size:0.9rem;">${INJ_UI.formatAZN(item.price * item.qty)}</span>
                <button class="btn-ghost" style="padding:4px;" type="button" onclick="INJ_CART.removeItem('${item.id}')" aria-label="Sil">
                  ${icon('trash')}
                </button>
              </div>
            </div>
          </div>
        </div>
      `
        )
        .join('');
    }

    // Keep Mağaza quick-add button counters synced
    if (window.INJ_MAGAZA && document.getElementById('open-market-grid')) {
      INJ_MAGAZA.renderProductsGrid();
    }
  },

  checkout() {
    if (this.items.length === 0) return;
    const total = this.getTotal();
    const discount = this.getDiscount();
    const orderCode = 'INJ-' + Math.floor(100000 + Math.random() * 900000);
    const itemsSnapshot = [...this.items];
    this.close();

    INJ_UI.openModal(`
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
        <div class="eyebrow" style="margin:0;">${icon('check')} Sərgi Sifarişi Qəbul Edildi</div>
        <button class="icon-close-btn" type="button" aria-label="Bağla" onclick="INJ_UI.closeModal()">${icon('x')}</button>
      </div>
      <h3 style="font-family:var(--font-display); font-size:1.5rem; margin-bottom:6px;">Təşəkkür edirik! Sifarişiniz qeydə alındı.</h3>
      <p class="muted-text" style="font-size:0.9rem; margin-bottom:18px;">
        Sifariş kodu: <strong class="emerald-text tabular">${orderCode}</strong> • Bu sərgi demosu tam brauzer daxilində işləyir.
      </p>
      <div class="glass-card" style="padding:16px; margin-bottom:18px;">
        ${itemsSnapshot
          .map(
            (i) => `
          <div style="display:flex; justify-content:space-between; padding:7px 0; border-bottom:1px solid var(--glass-border); font-size:0.86rem;">
            <span>${i.title} × ${i.qty}</span>
            <strong class="tabular">${INJ_UI.formatAZN(i.price * i.qty)}</strong>
          </div>
        `
          )
          .join('')}
        ${
          discount > 0
            ? `<div style="display:flex; justify-content:space-between; padding:7px 0; border-bottom:1px solid var(--glass-border); font-size:0.86rem; color:var(--emerald-400);">
                <span>Sərgi VIP Endirimi (SERGI20)</span>
                <strong class="tabular">−${INJ_UI.formatAZN(discount)}</strong>
              </div>`
            : ''
        }
        <div style="display:flex; justify-content:space-between; padding-top:12px; font-size:1rem; font-weight:700;">
          <span>Ödəniləcək Yekun Məbləğ</span>
          <span class="emerald-text tabular">${INJ_UI.formatAZN(total)}</span>
        </div>
      </div>
      <div style="display:flex; justify-content:flex-end; gap:10px; flex-wrap:wrap;">
        <button class="btn-secondary" type="button" onclick="INJ_UI.closeModal()">Bağla</button>
        <button class="btn-primary" type="button" onclick="INJ_CART.clearAfterOrder()">Yeni Sifarişə Başla</button>
      </div>
    `);
  },

  clearAfterOrder() {
    this.items = [];
    this.promoApplied = false;
    const input = document.getElementById('cart-promo-input');
    if (input) input.value = '';
    this.render();
    INJ_UI.closeModal();
    INJ_UI.toast('Səbət yeniləndi — növbəti nümayişə hazırdır');
  }
};
