/**
 * Pamnox Studio — Language Switcher
 * Supports: Vietnamese (vi) | English (en)
 * Uses data-vi / data-en attributes on any element.
 */
(function () {
  const LANG_KEY = 'pamnox_lang';
  let currentLang = localStorage.getItem(LANG_KEY) || 'vi';

  /* ── Apply language to all tagged elements ── */
  function applyLang(lang) {
    document.querySelectorAll('[data-vi]').forEach(el => {
      const text = lang === 'vi' ? el.dataset.vi : el.dataset.en;
      if (text !== undefined) el.innerHTML = text;
    });

    // placeholder attributes
    document.querySelectorAll('[data-ph-vi]').forEach(el => {
      el.placeholder = lang === 'vi' ? el.dataset.phVi : el.dataset.phEn;
    });

    document.documentElement.lang = lang === 'vi' ? 'vi' : 'en';
    localStorage.setItem(LANG_KEY, lang);
    currentLang = lang;
    updateAllBtns(lang);
  }

  /* ── Sync all switcher buttons on the page ── */
  function updateAllBtns(lang) {
    document.querySelectorAll('.lang-btn').forEach(btn => {
      const flagEl  = btn.querySelector('.lang-flag');
      const labelEl = btn.querySelector('.lang-label');
      if (flagEl)  flagEl.textContent  = lang === 'vi' ? '🇻🇳' : '🇺🇸';
      if (labelEl) labelEl.textContent = lang === 'vi' ? 'VI'   : 'EN';
    });
  }

  /* ── Toggle between vi / en ── */
  function toggleLang() {
    applyLang(currentLang === 'vi' ? 'en' : 'vi');
  }

  /* ── Build & inject the switcher button HTML ── */
  function buildBtn() {
    const btn = document.createElement('button');
    btn.className   = 'lang-btn';
    btn.title       = 'Đổi ngôn ngữ / Switch language';
    btn.setAttribute('aria-label', 'Switch language');
    btn.innerHTML   = `
      <span class="lang-translate-icon">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M5 8l6 6"/><path d="M4 14l6-6 2-3"/><path d="M2 5h12"/>
          <path d="M7 2h1"/><path d="M22 22l-5-10-5 10"/>
          <path d="M14 18h6"/>
        </svg>
      </span>
      <span class="lang-flag">🇻🇳</span>
      <span class="lang-label">VI</span>
    `;
    btn.addEventListener('click', toggleLang);
    return btn;
  }

  /* ── Insert button into every nav-inner ── */
  function injectButtons() {
    document.querySelectorAll('.nav-inner').forEach(navInner => {
      if (navInner.querySelector('.lang-btn')) return; // already added
      const cta = navInner.querySelector('.nav-cta');
      const ham = navInner.querySelector('.nav-hamburger');
      const btn = buildBtn();
      // insert before CTA (desktop) or before hamburger
      if (cta) navInner.insertBefore(btn, cta);
      else if (ham) navInner.insertBefore(btn, ham);
      else navInner.appendChild(btn);
    });
  }

  /* ── Also add a mobile switcher after mobile-menu ── */
  function injectMobileBtn() {
    const mob = document.getElementById('mobile-menu');
    if (!mob || mob.querySelector('.lang-btn-mobile')) return;
    const wrap = document.createElement('div');
    wrap.className = 'lang-btn-mobile-wrap';
    const btn = buildBtn();
    btn.classList.add('lang-btn-mobile');
    wrap.appendChild(btn);
    mob.appendChild(wrap);
  }

  /* ── Init ── */
  function init() {
    injectButtons();
    injectMobileBtn();
    applyLang(currentLang); // apply saved/default lang
  }

  // Run after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
