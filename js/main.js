(function () {
  'use strict';

  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      nav.classList.toggle('is-open', !open);
    });

    // Close the menu after choosing a link
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        toggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('is-open');
      }
    });
  }

  // Current year in footer
  var years = document.querySelectorAll('[data-year]');
  var now = new Date().getFullYear();
  for (var i = 0; i < years.length; i++) {
    years[i].textContent = now;
  }

  // Smooth scroll for in-page links
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[href^="#"]');
    if (!link) return;

    var id = link.getAttribute('href').slice(1);
    if (!id) return;

    var target = document.getElementById(id);
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    history.pushState(null, '', '#' + id);
    // Move keyboard focus along with the scroll (e.g. the skip link)
    if (target.hasAttribute('tabindex')) target.focus({ preventScroll: true });
  });
})();
