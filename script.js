/* Apply the saved theme (or the visitor's preferred color scheme) before first paint to avoid a flash. */
var THEME_KEY = 'theme';
(function () {
  var theme = null;
  try { theme = localStorage.getItem(THEME_KEY); } catch (e) {}
  if (theme !== 'dark' && theme !== 'light') {
    try {
      theme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch (e) { theme = 'light'; }
  }
  document.documentElement.setAttribute('data-theme', theme);
})();

/* Wire up interactions once the DOM is ready. */
document.addEventListener('DOMContentLoaded', function () {
  // Manual light/dark toggle, remembered across visits.
  var themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var html = document.documentElement;
      var next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      try { localStorage.setItem(THEME_KEY, next); } catch (e) {}
    });
  }

  // Mobile menu: open/close, and close again after picking a link.
  var nav = document.getElementById('nav');
  var menuToggle = document.getElementById('menuToggle');
  var menu = document.getElementById('menu');
  if (nav && menuToggle && menu) {
    var setMenu = function (open) {
      nav.classList.toggle('menu-open', open);
      menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };
    menuToggle.addEventListener('click', function () {
      setMenu(!nav.classList.contains('menu-open'));
    });
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('menu-open')) {
        setMenu(false);
        menuToggle.focus();
      }
    });
  }

  // Add a border to the nav once the page is scrolled.
  if (nav) {
    window.addEventListener('scroll', function () {
      nav.classList.toggle('scrolled', window.scrollY > 12);
    }, { passive: true });
  }

  // Reveal elements as they enter the viewport.
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0, rootMargin: '0px 0px -10% 0px' }); // tall blocks (projects) start revealing as soon as they enter
  document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });

  // Infinite marquees: clone each track's items so the loop is seamless.
  // With "reduce motion" on, the marquee stays still (CSS), so no clones are needed.
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('[data-marquee]').forEach(function (marquee) {
    var track = marquee.querySelector('.marquee-track');
    if (!track || reduceMotion) return;
    if (marquee.dataset.duration) {
      track.style.setProperty('--marquee-duration', marquee.dataset.duration + 's');
    }
    Array.prototype.slice.call(track.children).forEach(function (node) {
      var clone = node.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      clone.classList.add('is-clone');
      track.appendChild(clone);
    });
  });
});
