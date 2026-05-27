/* ============================================================
   Katakura Kanetaro Shokai — Language Toggle (JA / EN)
   Persists choice via localStorage across all pages.
   ============================================================ */
(function () {
  var STORAGE_KEY = 'katakura_lang';

  function getLang() {
    return localStorage.getItem(STORAGE_KEY) || 'ja';
  }

  function applyLang(lang) {
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-en]').forEach(function (el) {
      var ja = el.getAttribute('data-ja');
      var en = el.getAttribute('data-en');
      el.innerHTML = (lang === 'en') ? en : ja;
    });

    /* Toggle button active states */
    document.querySelectorAll('.lt-ja').forEach(function (el) {
      el.classList.toggle('active', lang === 'ja');
    });
    document.querySelectorAll('.lt-en').forEach(function (el) {
      el.classList.toggle('active', lang === 'en');
    });
  }

  function init() {
    /* Auto-capture current Japanese innerHTML as data-ja */
    document.querySelectorAll('[data-en]').forEach(function (el) {
      if (!el.getAttribute('data-ja')) {
        el.setAttribute('data-ja', el.innerHTML);
      }
    });

    applyLang(getLang());

    document.querySelectorAll('.lang-toggle').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var next = (getLang() === 'ja') ? 'en' : 'ja';
        localStorage.setItem(STORAGE_KEY, next);
        applyLang(next);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
