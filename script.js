/* Apply the visitor's preferred color scheme before first paint to avoid a flash. */
(function () {
  try {
    var dark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  } catch (e) {}
})();

/* Wire up interactions once the DOM is ready. */
document.addEventListener('DOMContentLoaded', function () {
  // Manual light/dark toggle.
  var themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var html = document.documentElement;
      html.setAttribute('data-theme', html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    });
  }

  // Add a border to the nav once the page is scrolled.
  var nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      nav.classList.toggle('scrolled', window.scrollY > 12);
    });
  }

  // Reveal elements as they enter the viewport.
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });

  // Lightbox for project screenshots.
  var lb = document.getElementById('lightbox');
  var lbImg = document.getElementById('lbImg');
  if (lb && lbImg) {
    document.querySelectorAll('.shot img').forEach(function (img) {
      img.addEventListener('click', function () {
        lbImg.src = img.src;
        lbImg.alt = img.alt;
        lb.classList.add('open');
      });
    });

    var closeLb = function () { lb.classList.remove('open'); };
    var lbClose = document.getElementById('lbClose');
    if (lbClose) lbClose.addEventListener('click', closeLb);
    lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeLb(); });
  }
});
