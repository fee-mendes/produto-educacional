/* =============================================================
   PRODUTO EDUCACIONAL — Go e Gomoku Narabe
   Scripts de acessibilidade e navegação
   - Tema claro/escuro
   - Alto contraste
   - Tamanho de fonte (3 níveis)
   - Fonte de leitura facilitada (estilo dislexia)
   - Persistência em localStorage
   - Menu mobile (com ARIA)
   - Marca link ativo na navegação
   ============================================================= */

(function () {
  'use strict';

  const STORAGE_KEY = 'goedu-prefs-v1';
  const root = document.documentElement;

  // -------- Persistência -------------------------------------
  function loadPrefs() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  }

  function savePrefs(prefs) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    } catch (e) { /* armazenamento indisponível */ }
  }

  // -------- Aplicação de preferências ------------------------
  function applyTheme(theme) {
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
    } else {
      root.removeAttribute('data-theme');
    }
    updateToggle('btn-theme', theme === 'dark');
  }

  function applyContrast(high) {
    if (high) {
      root.setAttribute('data-contrast', 'high');
    } else {
      root.removeAttribute('data-contrast');
    }
    updateToggle('btn-contrast', !!high);
  }

  function applyFontScale(scale) {
    // Limita entre 1 e 1.4
    const safe = Math.max(0.9, Math.min(1.4, Number(scale) || 1));
    root.style.setProperty('--font-scale', safe);
    // Atualiza estado visual
    document.querySelectorAll('[data-fontset]').forEach(btn => {
      btn.setAttribute('aria-pressed', btn.dataset.fontset === String(safe));
    });
  }

  function applyReadableFont(on) {
    if (on) {
      root.setAttribute('data-font', 'readable');
    } else {
      root.removeAttribute('data-font');
    }
    updateToggle('btn-readable', !!on);
  }

  function updateToggle(id, isOn) {
    const el = document.getElementById(id);
    if (el) el.setAttribute('aria-pressed', isOn ? 'true' : 'false');
  }

  // -------- Inicialização ------------------------------------
  function init() {
    const prefs = loadPrefs();

    // Detecta preferência do sistema se não houver salva
    if (!prefs.theme) {
      const prefersDark = window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches;
      prefs.theme = prefersDark ? 'dark' : 'light';
    }

    applyTheme(prefs.theme);
    applyContrast(prefs.contrast === true);
    applyFontScale(prefs.fontScale || 1);
    applyReadableFont(prefs.readable === true);

    bindControls(prefs);
    bindMobileNav();
    markCurrentNav();
  }

  // -------- Controles da barra de acessibilidade -------------
  function bindControls(prefs) {
    const themeBtn = document.getElementById('btn-theme');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        prefs.theme = (prefs.theme === 'dark') ? 'light' : 'dark';
        applyTheme(prefs.theme);
        savePrefs(prefs);
      });
    }

    const contrastBtn = document.getElementById('btn-contrast');
    if (contrastBtn) {
      contrastBtn.addEventListener('click', () => {
        prefs.contrast = !prefs.contrast;
        applyContrast(prefs.contrast);
        savePrefs(prefs);
      });
    }

    const readableBtn = document.getElementById('btn-readable');
    if (readableBtn) {
      readableBtn.addEventListener('click', () => {
        prefs.readable = !prefs.readable;
        applyReadableFont(prefs.readable);
        savePrefs(prefs);
      });
    }

    document.querySelectorAll('[data-fontset]').forEach(btn => {
      btn.addEventListener('click', () => {
        const v = parseFloat(btn.dataset.fontset);
        prefs.fontScale = v;
        applyFontScale(v);
        savePrefs(prefs);
      });
    });

    const resetBtn = document.getElementById('btn-reset-a11y');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        const fresh = {};
        savePrefs(fresh);
        const sysDark = window.matchMedia &&
          window.matchMedia('(prefers-color-scheme: dark)').matches;
        applyTheme(sysDark ? 'dark' : 'light');
        applyContrast(false);
        applyFontScale(1);
        applyReadableFont(false);
      });
    }
  }

  // -------- Menu mobile --------------------------------------
  function bindMobileNav() {
    const toggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.main-nav');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', () => {
      const open = nav.getAttribute('data-open') === 'true';
      nav.setAttribute('data-open', open ? 'false' : 'true');
      toggle.setAttribute('aria-expanded', open ? 'false' : 'true');
    });

    // Fecha menu ao clicar em um link (em mobile)
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 820) {
          nav.setAttribute('data-open', 'false');
          toggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  // -------- Marca link ativo na navegação --------------------
  function markCurrentNav() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.main-nav__list a').forEach(link => {
      const href = link.getAttribute('href');
      if (!href) return;
      const target = href.split('/').pop();
      if (target === path || (path === '' && target === 'index.html')) {
        link.setAttribute('aria-current', 'page');
      }
    });
  }

  // -------- Boot ---------------------------------------------
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
