// home.js — Alex Natola | Home

document.addEventListener('DOMContentLoaded', () => {

  // ── 1. Overlay + menu JS ──────────────────────────────────────────────────
  const menuLeftInput = document.getElementById('menu-left');
  const menuNoneInput = document.getElementById('menu-none');
  const sideLeft      = document.querySelector('.side-left');
  const overlay       = document.getElementById('panel-overlay');

  function openLeft() {
    sideLeft.classList.add('is-open');
    overlay.classList.add('is-visible');
    document.body.classList.add('no-scroll');
  }
  function closeAll() {
    sideLeft.classList.remove('is-open');
    overlay.classList.remove('is-visible');
    document.body.classList.remove('no-scroll');
    if (menuNoneInput) menuNoneInput.checked = true;
  }

  if (menuLeftInput) menuLeftInput.addEventListener('change', () => { if (menuLeftInput.checked) openLeft(); });
  if (menuNoneInput) menuNoneInput.addEventListener('change', () => { if (menuNoneInput.checked) closeAll(); });
  if (overlay) overlay.addEventListener('click', closeAll);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeAll(); });


  // ── 2. Sound-bar equalizer animato nell'header ────────────────────────────
  // Crea le barre dell'equalizzatore a destra del logo
  const header = document.querySelector('.site-header');
  const eq = document.createElement('div');
  eq.className = 'eq-bars';
  eq.setAttribute('aria-hidden', 'true');
  for (let i = 0; i < 5; i++) {
    const bar = document.createElement('span');
    bar.className = 'eq-bar';
    eq.appendChild(bar);
  }
  header.appendChild(eq);


  // ── 3. Scroll reveal per le sezioni hero ──────────────────────────────────
  const revealEls = document.querySelectorAll('.hero');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  revealEls.forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.06}s`;
    revealObserver.observe(el);
  });


  // ── 4. Header shrink on scroll ────────────────────────────────────────────
  const spy = document.createElement('div');
  spy.style.cssText = 'position:absolute;top:0;height:1px;width:1px;pointer-events:none;';
  document.body.prepend(spy);
  new IntersectionObserver(([e]) => {
    header.classList.toggle('scrolled', !e.isIntersecting);
  }, { threshold: 0 }).observe(spy);


  // ── 5. Parallax leggero sulle immagini ───────────────────────────────────
  function onScroll() {
    document.querySelectorAll('.object').forEach(img => {
      const rect = img.getBoundingClientRect();
      const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * 0.045;
      img.style.transform = `translateY(${offset}px)`;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });


  // ── 6. Ripple effect sui pulsanti social ──────────────────────────────────
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - rect.left - size / 2}px;top:${e.clientY - rect.top - size / 2}px;`;
      this.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  });


  // ── 7. Waveform SVG animata sotto ogni hero ───────────────────────────────
  document.querySelectorAll('.hero').forEach(hero => {
    const wave = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    wave.setAttribute('class', 'hero-wave');
    wave.setAttribute('viewBox', '0 0 1200 60');
    wave.setAttribute('preserveAspectRatio', 'none');
    wave.setAttribute('aria-hidden', 'true');

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M0,30 C150,55 300,5 450,30 C600,55 750,5 900,30 C1050,55 1150,10 1200,30 L1200,60 L0,60 Z');
    path.setAttribute('class', 'wave-path');
    wave.appendChild(path);
    hero.appendChild(wave);
  });


  // ── 8. Pulsazione sul titolo principale ───────────────────────────────────
  const mainH1 = document.querySelector('.main-area > h1');
  if (mainH1) mainH1.classList.add('pulse-title');


  // ── 9. Stagger animazione link menu ──────────────────────────────────────
  document.querySelectorAll('.side-panel .links').forEach((li, i) => {
    li.style.transitionDelay = `${0.05 + i * 0.06}s`;
    li.classList.add('menu-link-anim');
  });

  if (menuLeftInput) {
    menuLeftInput.addEventListener('change', () => {
      if (menuLeftInput.checked) {
        document.querySelectorAll('.side-panel .links').forEach(li => li.classList.add('link-visible'));
      }
    });
  }
  if (menuNoneInput) {
    menuNoneInput.addEventListener('change', () => {
      document.querySelectorAll('.side-panel .links').forEach(li => li.classList.remove('link-visible'));
    });
  }

});