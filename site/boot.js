// Applies saved theme / motion / UI language before the app renders (no flash). Mirrors src/app/prefs.ts.
(function () {
  var p = { theme: 'system', motion: 'system', uiLang: 'ar' };
  try {
    var raw = localStorage.getItem('esl.prefs');
    if (raw) {
      var s = JSON.parse(raw);
      for (var k in p) if (s && typeof s[k] === 'string') p[k] = s[k];
    }
  } catch (e) {
    /* storage blocked: defaults */
  }
  var el = document.documentElement;
  var dark = window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches;
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  el.setAttribute('data-theme', p.theme === 'system' ? (dark ? 'night' : 'light') : p.theme);
  el.setAttribute('data-motion', p.motion === 'system' ? (reduce ? 'reduced' : 'full') : p.motion);
  el.setAttribute('lang', p.uiLang === 'en' ? 'en' : 'ar');
  el.setAttribute('dir', p.uiLang === 'en' ? 'ltr' : 'rtl');
})();
