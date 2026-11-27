/* ==========================================================================
   İNJEKSİON App Shell Bootstrapper (Opens directly to TANITIM)
   ========================================================================== */

(function () {
  const VALID_TABS = ['tanitim', 'mikro', 'mezo', 'makro', 'magaza'];

  function hydrateStaticIcons() {
    const logoEl = document.getElementById('brand-logo-svg');
    if (logoEl) logoEl.innerHTML = icon('logo');

    document.querySelectorAll('[data-icon]').forEach((el) => {
      el.innerHTML = icon(el.getAttribute('data-icon'));
    });
  }

  function switchTab(tabName, updateHash = true) {
    const safeTab = VALID_TABS.includes(tabName) ? tabName : 'tanitim';

    document.querySelectorAll('.tab-view').forEach((v) => {
      const isTarget = v.id === 'view-' + safeTab;
      v.classList.toggle('active', isTarget);
      v.hidden = !isTarget;
    });

    document.querySelectorAll('.nav-tab, .dock-btn').forEach((btn) => {
      const active = btn.getAttribute('data-tab') === safeTab;
      btn.classList.toggle('active', active);
      if (btn.hasAttribute('aria-selected')) {
        btn.setAttribute('aria-selected', active ? 'true' : 'false');
      }
    });

    if (updateHash && window.location.hash !== '#' + safeTab) {
      try {
        history.replaceState(null, '', '#' + safeTab);
      } catch (_) {}
    }

    if (safeTab === 'makro' && window.INJ_MAKRO) {
      requestAnimationFrame(() => INJ_MAKRO.updateMapViewport());
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  window.INJ_SWITCH_TAB = switchTab;

  function bindNavigation() {
    const tabBtns = Array.from(document.querySelectorAll('.nav-tab'));
    tabBtns.forEach((btn, idx) => {
      btn.addEventListener('click', () => switchTab(btn.getAttribute('data-tab')));
      btn.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
          e.preventDefault();
          const nextIdx = e.key === 'ArrowRight' ? (idx + 1) % tabBtns.length : (idx - 1 + tabBtns.length) % tabBtns.length;
          tabBtns[nextIdx].focus();
          switchTab(tabBtns[nextIdx].getAttribute('data-tab'));
        }
      });
    });

    document.querySelectorAll('.dock-btn').forEach((btn) => {
      btn.addEventListener('click', () => switchTab(btn.getAttribute('data-tab')));
    });

    const brandHome = document.getElementById('brand-home');
    if (brandHome) {
      brandHome.addEventListener('click', () => switchTab('tanitim'));
    }

    const advisorBtn = document.getElementById('open-advisor-btn');
    if (advisorBtn) {
      advisorBtn.addEventListener('click', () => {
        if (window.INJ_ADVISOR) INJ_ADVISOR.open();
      });
    }

    const modalBackdrop = document.getElementById('modal-backdrop');
    if (modalBackdrop) {
      modalBackdrop.addEventListener('click', (e) => {
        if (e.target === modalBackdrop) INJ_UI.closeModal();
      });
    }

    window.addEventListener('resize', () => {
      if (window.INJ_MAKRO) INJ_MAKRO.updateMapViewport();
    });

    window.addEventListener('hashchange', () => {
      const h = window.location.hash.replace('#', '');
      if (VALID_TABS.includes(h)) switchTab(h, false);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        INJ_UI.closeModal();
        INJ_CART.close();
        if (window.INJ_MAKRO && INJ_MAKRO.state.isFullscreen) {
          INJ_MAKRO.state.isFullscreen = false;
          INJ_MAKRO.render();
        }
      }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    hydrateStaticIcons();
    bindNavigation();
    INJ_CART.init();
    INJ_TANITIM.init();
    INJ_MIKRO.init();
    INJ_MEZO.init();
    INJ_MAKRO.init();
    INJ_MAGAZA.init();

    const initialHash = window.location.hash.replace('#', '');
    if (VALID_TABS.includes(initialHash)) {
      switchTab(initialHash, false);
    } else {
      switchTab('tanitim', false);
    }
  });
})();
