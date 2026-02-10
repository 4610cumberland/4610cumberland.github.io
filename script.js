/* ============================================
   4610 Cumberland — Site Script
   Gallery, Lightbox, Navigation, Scroll Reveals
   ============================================ */

(function () {
  'use strict';

  // ---- State ----
  let images = [];
  let currentIndex = 0;

  // ---- DOM ----
  const galleryGrid = document.getElementById('galleryGrid');
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxCounter = document.getElementById('lightboxCounter');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  // ---- Load Gallery ----
  async function loadGallery() {
    try {
      const response = await fetch('image_descriptions.json');
      images = await response.json();
      renderGallery();
    } catch (err) {
      console.error('Failed to load image descriptions:', err);
    }
  }

  function renderGallery() {
    const fragment = document.createDocumentFragment();

    images.forEach(function (img, index) {
      const item = document.createElement('div');
      item.className = 'gallery-item';
      item.setAttribute('data-index', index);

      item.innerHTML =
        '<img src="images/' + img.image_id + '.jpg" alt="' + escapeHtml(img.description) + '" loading="lazy">' +
        '<div class="gallery-item-overlay">' +
        '<span class="gallery-item-caption">' + escapeHtml(img.description) + '</span>' +
        '</div>';

      item.addEventListener('click', function () {
        openLightbox(index);
      });

      fragment.appendChild(item);
    });

    galleryGrid.appendChild(fragment);
    observeGalleryItems();
  }

  function escapeHtml(text) {
    var div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // ---- Scroll Reveal (Gallery + Property Cards) ----
  function observeGalleryItems() {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            // Stagger the reveal based on position in viewport
            var delay = Math.random() * 200;
            setTimeout(function () {
              entry.target.classList.add('revealed');
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('.gallery-item').forEach(function (item) {
      observer.observe(item);
    });

    document.querySelectorAll('[data-reveal]').forEach(function (item) {
      observer.observe(item);
    });
  }

  // ---- Lightbox ----
  function openLightbox(index) {
    currentIndex = index;
    updateLightboxImage();
    lightbox.classList.add('open');
    document.body.classList.add('lightbox-open');
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.classList.remove('lightbox-open');
    lightboxImage.classList.remove('loaded');
  }

  function updateLightboxImage() {
    var img = images[currentIndex];
    lightboxImage.classList.remove('loaded');

    lightboxImage.onload = function () {
      lightboxImage.classList.add('loaded');
    };

    lightboxImage.src = 'images/' + img.image_id + '.jpg';
    lightboxImage.alt = img.description;
    lightboxCaption.textContent = img.description;
    lightboxCounter.textContent = (currentIndex + 1) + ' / ' + images.length;
  }

  function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    updateLightboxImage();
  }

  function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateLightboxImage();
  }

  // Lightbox events
  lightboxClose.addEventListener('click', closeLightbox);
  lightboxNext.addEventListener('click', nextImage);
  lightboxPrev.addEventListener('click', prevImage);

  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox || e.target.classList.contains('lightbox-image-wrap')) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('open')) return;

    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
  });

  // Touch swipe support for lightbox
  var touchStartX = 0;
  var touchEndX = 0;

  lightbox.addEventListener('touchstart', function (e) {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  lightbox.addEventListener('touchend', function (e) {
    touchEndX = e.changedTouches[0].screenX;
    var diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextImage();
      } else {
        prevImage();
      }
    }
  }, { passive: true });

  // ---- Navigation ----
  var lastScroll = 0;

  window.addEventListener('scroll', function () {
    var scrollY = window.scrollY;
    if (scrollY > 80) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    lastScroll = scrollY;
  }, { passive: true });

  // Mobile menu toggle
  navToggle.addEventListener('click', function () {
    mobileMenu.classList.toggle('open');
    // Animate hamburger
    var spans = navToggle.querySelectorAll('span');
    if (mobileMenu.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translate(3px, 3px)';
      spans[1].style.transform = 'rotate(-45deg) translate(0, 0)';
      document.body.classList.add('lightbox-open');
    } else {
      spans[0].style.transform = '';
      spans[1].style.transform = '';
      document.body.classList.remove('lightbox-open');
    }
  });

  // Close mobile menu on link click
  mobileMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      mobileMenu.classList.remove('open');
      var spans = navToggle.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.transform = '';
      document.body.classList.remove('lightbox-open');
    });
  });

  // ---- Smooth scroll for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        var offset = nav.offsetHeight + 20;
        var top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  // ---- Init ----
  loadGallery();

  // Observe property cards for reveal
  document.addEventListener('DOMContentLoaded', function () {
    observeGalleryItems();
  });
})();
