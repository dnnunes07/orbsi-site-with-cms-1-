/* ==========================================================================
   Orbsi — mobile navigation
   --------------------------------------------------------------------------
   Plain JavaScript. No framework, no build step, no dependencies.

   The panel is BUILT FROM the existing .nav-links markup rather than being
   duplicated by hand in nine HTML files. That means the mobile menu can
   never drift out of step with the desktop nav: add a link to the nav on a
   page and it appears in that page's mobile menu automatically.

   The per-page call to action is cloned, so Newsletter keeps "Subscribe"
   and Therapeutic Services keeps its separate therapy scheduler.

   Progressive enhancement: if this file fails to load, the button is never
   created, which leaves the site exactly as it was before. Nothing breaks.
   The links themselves are already in the HTML for crawlers regardless.
   ========================================================================== */
(function () {
  'use strict';

  var BREAKPOINT = 860;

  var nav = document.querySelector('.nav');
  if (!nav) return;
  var navIn = nav.querySelector('.nav-in');
  var links = nav.querySelector('.nav-links');
  if (!navIn || !links) return;

  /* ---- 1. the toggle button --------------------------------------------- */
  var btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'nav-burger';
  btn.id = 'nav-burger';
  btn.setAttribute('aria-label', 'Open menu');
  btn.setAttribute('aria-expanded', 'false');
  btn.setAttribute('aria-controls', 'mnav');
  btn.appendChild(document.createElement('span'));
  btn.appendChild(document.createElement('span'));
  btn.appendChild(document.createElement('span'));
  navIn.appendChild(btn);

  /* ---- 2. the panel, assembled from the nav that is already on the page -- */
  var panel = document.createElement('div');
  panel.className = 'mnav';
  panel.id = 'mnav';
  panel.setAttribute('data-open', 'false');

  function section(title, anchors) {
    if (!anchors.length) return;
    if (title) {
      var h = document.createElement('h2');
      h.textContent = title;
      panel.appendChild(h);
    }
    var ul = document.createElement('ul');
    anchors.forEach(function (a) {
      var li = document.createElement('li');
      /* cloneNode keeps the href and label exactly as authored, with no
         string building and therefore no escaping problems */
      var copy = a.cloneNode(true);
      copy.removeAttribute('class');
      li.appendChild(copy);
      ul.appendChild(li);
    });
    panel.appendChild(ul);
  }

  /* the "Work With Us" dropdown becomes a flat titled section, so nobody has
     to tap twice to reach a service page on a phone */
  var group = links.querySelector('.has-menu');
  if (group) {
    var label = group.querySelector('.nav-top');
    var sub = group.querySelector('.submenu');
    if (sub) {
      section(
        label ? label.textContent.trim() : 'Work With Us',
        Array.prototype.slice.call(sub.querySelectorAll('a'))
      );
    }
  }

  /* every other top level link, with Home added at the front.

     Home is deliberately mobile only. On desktop the logo is the
     conventional route home and the nav bar is already full; in a panel
     the extra row costs nothing and the logo is a weaker affordance on a
     phone. Built here rather than in the HTML so it stays in one place.

     The link is only added if the nav does not already offer one, so if a
     Home item is ever added to the markup it will not appear twice. */
  var rest = [];
  Array.prototype.slice.call(links.children).forEach(function (li) {
    if (li.classList && li.classList.contains('has-menu')) return;
    var a = li.querySelector ? li.querySelector('a') : null;
    if (a) rest.push(a);
  });

  var hasHome = rest.some(function (a) {
    var href = (a.getAttribute('href') || '').split(/[?#]/)[0];
    return href === 'index.html' || href === '/' || href === './';
  });
  if (!hasHome) {
    var home = document.createElement('a');
    home.setAttribute('href', 'index.html');
    home.textContent = 'Home';
    rest.unshift(home);
  }

  section('Orbsi', rest);

  /* this page's own call to action */
  var cta = navIn.querySelector('.btn-nav');
  if (cta) {
    var ctaCopy = cta.cloneNode(true);
    ctaCopy.classList.remove('btn-nav');
    ctaCopy.classList.add('mnav-cta');
    panel.appendChild(ctaCopy);
  }

  nav.parentNode.insertBefore(panel, nav.nextSibling);

  /* ---- 3. measure the nav so the panel sits flush beneath it ------------- */
  function setNavHeight() {
    document.documentElement.style.setProperty(
      '--navh', Math.round(nav.getBoundingClientRect().height) + 'px'
    );
  }
  setNavHeight();
  window.addEventListener('resize', setNavHeight);
  window.addEventListener('orientationchange', setNavHeight);

  /* ---- 4. open and close ------------------------------------------------- */
  var isOpen = false;

  function open() {
    if (isOpen) return;
    isOpen = true;
    setNavHeight();
    panel.setAttribute('data-open', 'true');
    btn.setAttribute('aria-expanded', 'true');
    btn.setAttribute('aria-label', 'Close menu');
    document.body.setAttribute('data-mnav-open', 'true');
  }

  function close(returnFocus) {
    if (!isOpen) return;
    isOpen = false;
    panel.setAttribute('data-open', 'false');
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-label', 'Open menu');
    document.body.removeAttribute('data-mnav-open');
    if (returnFocus) btn.focus();
  }

  btn.addEventListener('click', function () {
    isOpen ? close(false) : open();
  });

  /* tapping any link closes the panel. Needed for same page anchors, which
     would otherwise leave the panel covering the target. */
  panel.addEventListener('click', function (e) {
    if (e.target.closest('a')) close(false);
  });

  /* Escape closes and hands focus back to the button */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && isOpen) close(true);
  });

  /* keep focus inside the panel while it is open */
  document.addEventListener('focusin', function (e) {
    if (!isOpen) return;
    if (!panel.contains(e.target) && e.target !== btn) {
      var first = panel.querySelector('a');
      if (first) first.focus();
    }
  });

  /* if the window grows past the breakpoint while open, tidy up so the
     desktop nav is never left with a stuck body scroll lock */
  window.addEventListener('resize', function () {
    if (window.innerWidth > BREAKPOINT && isOpen) close(false);
  });
})();
