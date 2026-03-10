// sogno-astratto.js — Alex Natola | testi canzoni

document.addEventListener('DOMContentLoaded', () => {

  // 1. Overlay + menu JS
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
  if (overlay)       overlay.addEventListener('click', closeAll);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeAll(); });


  // 2. Scroll reveal hero
  const hero = document.querySelector('.hero');
  if (hero) {
    new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('revealed');
      });
    }, { threshold: 0.06 }).observe(hero);
  }


  // 3. Header shrink on scroll
  const header = document.querySelector('.site-header');
  const spy = document.createElement('div');
  spy.style.cssText = 'position:absolute;top:0;height:1px;width:1px;pointer-events:none;';
  document.body.prepend(spy);
  new IntersectionObserver(([e]) => {
    header.classList.toggle('scrolled', !e.isIntersecting);
  }, { threshold: 0 }).observe(spy);


  // 4. Equalizzatore animato nell'header
  const eq = document.createElement('div');
  eq.className = 'eq-bars';
  eq.setAttribute('aria-hidden', 'true');
  for (let i = 0; i < 5; i++) {
    const bar = document.createElement('span');
    bar.className = 'eq-bar';
    eq.appendChild(bar);
  }
  header.appendChild(eq);


  // 5. Waveform SVG in fondo alla hero card
  if (hero) {
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
  }


  // 6. Ripple effect sui pulsanti streaming
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - rect.left - size / 2}px;top:${e.clientY - rect.top - size / 2}px;`;
      this.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  });


  // 7. Stagger animazione link menu (links + second-links)
  const allMenuLinks = document.querySelectorAll('.side-panel .links, .side-panel .second-links');
  allMenuLinks.forEach((li, i) => {
    li.style.transitionDelay = `${0.04 + i * 0.05}s`;
    li.classList.add('menu-link-anim');
  });

  if (menuLeftInput) {
    menuLeftInput.addEventListener('change', () => {
      if (menuLeftInput.checked)
        allMenuLinks.forEach(li => li.classList.add('link-visible'));
    });
  }
  if (menuNoneInput) {
    menuNoneInput.addEventListener('change', () => {
      allMenuLinks.forEach(li => li.classList.remove('link-visible'));
    });
  }

});