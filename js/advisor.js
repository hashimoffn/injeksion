/* ==========================================================================
   Eko-Məsləhətçi Sİ (100% Client-Side Smart Eco-Tech Assistant)
   Komanda yoldaşının reposundakı Sİ Məsləhətçi ideyasının genişləndirilmiş versiyası
   ========================================================================== */

window.INJ_ADVISOR = {
  messages: [
    {
      role: 'ai',
      text: 'Salam! Mən İNJEKSİON Eko-Məsləhətçi Sİ-yəm. Mənziliniz (MİKRO), biznes məkanınız (MEZO), şəhər/rayon peyk analitikası (MAKRO) və ya yerli tərəfdaş ekosistemi barədə sualınızı seçin və ya yazın.',
      actionTab: null,
      actionLabel: null
    }
  ],

  quickPrompts: [
    'Qaranlıq otaq üçün hansı 3D paket uyğundur?',
    '150 m² restoran və ya otel üçün büdcə nə qədərdir?',
    'Peyk xəritəsində ev dəqiqliyi və yeraltı data necə işləyir?',
    'Şəhər və rayon yerli tərəfdaş modeli necə qurulub?'
  ],

  open() {
    this.renderModal();
  },

  askPreset(idx) {
    const q = this.quickPrompts[idx];
    if (q) this.processQuestion(q);
  },

  submitForm(event) {
    event.preventDefault();
    const input = document.getElementById('advisor-chat-input');
    if (!input) return;
    const val = input.value.trim();
    if (!val) return;
    input.value = '';
    this.processQuestion(val);
  },

  generateReply(q) {
    const s = q.toLowerCase();
    const numMatch = s.match(/(\d{2,4})\s*m/);

    if (s.includes('restoran') || s.includes('otel') || s.includes('ofis') || s.includes('spa') || s.includes('b2b') || numMatch) {
      const area = numMatch ? Math.min(600, Math.max(30, Number(numMatch[1]))) : 140;
      const est = Math.round(area * 96);
      return {
        text: `${area} m² kommersiya məkanı üçün MEZO standartında təxmini ${Math.round(area * 0.16)} m² akustik zümrüd mamır divarı, linear fitolampalar və hidroponik bio-sütunlar tövsiyə olunur. Təxmini açar təslim büdcə ~${INJ_UI.formatAZN(est)}, geri dönüş (ROI) isə 6–8 aydır.`,
        actionTab: 'mezo',
        actionLabel: 'MEZO Kalkulyatoruna Keç'
      };
    }

    if (s.includes('peyk') || s.includes('yeralt') || s.includes('rayon') || s.includes('şəhər') || s.includes('makro') || s.includes('b2g') || s.includes('dövlət')) {
      return {
        text: 'MAKRO (B2G) bölməsində Azərbaycanın bütün 87 şəhər və rayonu üzrə Zoom 20.5 Retina peyk görüntüsü və dəqiq ünvan axtarışı işləyir. Həmçinin gələcək mərhələ üçün Dövlət Yeraltı Kommunikasiya (su, qaz, kabel), Torpaq/Qrunt suyu və Kadastr konsept qatlarını xəritə üzərində canlı açıb-bağlaya bilərsiniz.',
        actionTab: 'makro',
        actionLabel: 'MAKRO Peyk Xəritəsini Aç'
      };
    }

    if (s.includes('tərəfdaş') || s.includes('yerli') || s.includes('mağaza') || s.includes('anbar') || s.includes('bazar')) {
      return {
        text: 'İNJEKSİON anbarsız (0 AZN anbar xərci) regional ekosistem üzərində işləyir: hər şəhər və rayondakı yerli beton/sənətkarlıq emalatxanaları, tingliklər, eko-optika təchizatçıları və yerli montaj qrupları vahid standartla sifarişləri birbaşa təhvil verir.',
        actionTab: 'magaza',
        actionLabel: 'Açıq Eko-Bazara Bax'
      };
    }

    if (s.includes('qaranlıq') || s.includes('işıq') || s.includes('mamır') || s.includes('otaq') || s.includes('eyvan') || s.includes('mikro')) {
      return {
        text: 'Gün işığı zəif olan (<180 Lüks) otaq və eyvanlar üçün suvarma tələb etməyən Stabilləşdirilmiş Zümrüd Mamır Paneli + Tam Spektrli Fitolampa + Sansevieria/Monstera kombinasiyası idealdır. MİKRO bölməsində otaq şəklinizi yükləyib 1 kliklə 3D yerləşməni görə bilərsiniz.',
        actionTab: 'mikro',
        actionLabel: 'MİKRO 3D Skanına Keç'
      };
    }

    return {
      text: 'İNJEKSİON 3 səviyyədə işləyir: fərdi otaq/eyvan üçün MİKRO (3D Sİ Yapboz), biznes məkanları üçün MEZO (Əvvəl/Sonra + Smeta) və 87 rayon üzrə dövlət şəhərsalma analitikası üçün MAKRO (Ultra-HD Peyk + Gələcək Yeraltı GIS). Hansı bölməni sınamaq istəyirsiniz?',
      actionTab: 'tanitim',
      actionLabel: 'Tanıtım Xülasəsinə Bax'
    };
  },

  processQuestion(q) {
    this.messages.push({ role: 'user', text: q });
    const reply = this.generateReply(q);
    this.messages.push({ role: 'ai', ...reply });
    this.renderModal();
    const box = document.getElementById('advisor-messages-box');
    if (box) box.scrollTop = box.scrollHeight;
  },

  jumpTo(tab) {
    INJ_UI.closeModal();
    if (window.INJ_SWITCH_TAB) window.INJ_SWITCH_TAB(tab);
  },

  renderModal() {
    INJ_UI.openModal(`
      <div style="display:flex; justify-content:space-between; align-items:center; gap:12px; margin-bottom:14px;">
        <div style="display:flex; align-items:center; gap:10px;">
          <div class="brand-logo" style="width:38px; height:38px;">${icon('bot')}</div>
          <div>
            <div class="eyebrow" style="margin:0; padding:3px 9px; font-size:0.66rem;">100% Lokal Sİ Mühərriki</div>
            <h3 style="font-family:var(--font-display); font-size:1.2rem; margin-top:2px;">İNJEKSİON Eko-Məsləhətçi Sİ</h3>
          </div>
        </div>
        <button class="icon-close-btn" type="button" aria-label="Bağla" onclick="INJ_UI.closeModal()">${icon('x')}</button>
      </div>

      <div id="advisor-messages-box" style="max-height:320px; overflow-y:auto; display:flex; flex-direction:column; gap:10px; padding:12px; border-radius:14px; background:rgba(8,12,11,0.75); border:1px solid var(--glass-border); margin-bottom:12px;">
        ${this.messages
          .map(
            (m) => `
          <div style="align-self:${m.role === 'user' ? 'flex-end' : 'flex-start'}; max-width:86%; padding:10px 14px; border-radius:13px; font-size:0.84rem; line-height:1.48; background:${
              m.role === 'user' ? 'rgba(16,185,129,0.22)' : 'rgba(28,36,33,0.9)'
            }; border:1px solid ${m.role === 'user' ? 'rgba(52,211,153,0.5)' : 'var(--glass-border)'};">
            <div>${m.text}</div>
            ${
              m.actionTab
                ? `<button type="button" class="btn-primary btn-sm" style="margin-top:8px;" onclick="INJ_ADVISOR.jumpTo('${m.actionTab}')">${m.actionLabel} →</button>`
                : ''
            }
          </div>
        `
          )
          .join('')}
      </div>

      <div style="display:flex; flex-wrap:wrap; gap:6px; margin-bottom:12px;">
        ${this.quickPrompts
          .map(
            (qp, i) => `
          <button type="button" class="chip" style="font-size:0.74rem; padding:6px 10px;" onclick="INJ_ADVISOR.askPreset(${i})">
            ${qp}
          </button>
        `
          )
          .join('')}
      </div>

      <form onsubmit="INJ_ADVISOR.submitForm(event)" style="display:flex; gap:8px;">
        <input id="advisor-chat-input" type="text" class="search-input" style="padding-left:14px;" placeholder="Məs: 200 m² otel lobisi və ya Mingəçevir peyk analizi..." />
        <button type="submit" class="btn-primary" style="padding:0 18px;">
          ${icon('send')}
          <span>Soruş</span>
        </button>
      </form>
    `);
  }
};
