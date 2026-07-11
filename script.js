(function () {
  'use strict';

  // Footer year
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Mobile navigation
  var toggle = document.querySelector('.nav-toggle');
  var mobileNav = document.getElementById('mobile-nav');

  if (toggle && mobileNav) {
    toggle.addEventListener('click', function () {
      var isOpen = mobileNav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      mobileNav.hidden = !isOpen;
    });

    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileNav.classList.remove('is-open');
        mobileNav.hidden = true;
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Image fallbacks for assets copied from NeuroMod folder
  document.querySelectorAll('img[data-fallback]').forEach(function (img) {
    img.addEventListener('error', function onError() {
      var fallback = img.getAttribute('data-fallback');
      if (fallback && img.src.indexOf(fallback) === -1) {
        img.src = fallback;
      }
      img.removeEventListener('error', onError);
    }, { once: true });
  });

  document.querySelectorAll('.treatment-media img').forEach(function (img) {
    img.addEventListener('error', function onError() {
      var media = img.closest('.treatment-media');
      if (media) {
        media.classList.add('is-placeholder');
      }
      img.removeEventListener('error', onError);
    }, { once: true });
  });

  document.querySelectorAll('.profile-photo').forEach(function (img) {
    img.addEventListener('error', function onError() {
      var wrap = img.closest('.profile-photo-wrap');
      if (wrap) {
        wrap.classList.add('is-placeholder');
      }
      img.removeEventListener('error', onError);
    }, { once: true });
  });
  var header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', function () {
      header.classList.toggle('is-scrolled', window.scrollY > 10);
    }, { passive: true });
  }
})();
