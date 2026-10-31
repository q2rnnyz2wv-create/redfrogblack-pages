// RedFrogBlack - site scripts

(function () {
  // Footer year
  var y = document.getElementById('year');
  if (y) y.textContent = String(new Date().getFullYear());

  // Theme toggle: auto by default (from prefers-color-scheme), overridable manually
  var STORAGE_KEY = 'rfb-theme';
  var toggle = document.querySelector('[data-theme-toggle]');
  if (!toggle) return;

  function currentEffective() {
    var stored = null;
    try { stored = localStorage.getItem(STORAGE_KEY); } catch (e) {}
    if (stored === 'light' || stored === 'dark') return stored;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme, persist) {
    if (theme === 'light' || theme === 'dark') {
      document.documentElement.setAttribute('data-theme', theme);
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    if (persist) {
      try { localStorage.setItem(STORAGE_KEY, theme); } catch (e) {}
    }
  }

  toggle.addEventListener('click', function () {
    var next = currentEffective() === 'dark' ? 'light' : 'dark';
    applyTheme(next, true);
  });

  // React to OS-level theme changes only when the user hasn't picked one
  if (window.matchMedia) {
    var mq = window.matchMedia('(prefers-color-scheme: dark)');
    var listener = function () {
      var stored = null;
      try { stored = localStorage.getItem(STORAGE_KEY); } catch (e) {}
      if (stored !== 'light' && stored !== 'dark') {
        // auto - attribute stays removed, CSS handles it
        document.documentElement.removeAttribute('data-theme');
      }
    };
    if (mq.addEventListener) mq.addEventListener('change', listener);
    else if (mq.addListener) mq.addListener(listener);
  }

  // Header shadow on scroll
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      if (window.scrollY > 8) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
})();
