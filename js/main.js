// Bloomy site behavior: nav menu, FAQ accordion, demo form, scroll reveal.
// Each feature guards its own selectors so a missing element on one page
// (e.g. the demo form only exists on schools.html) never breaks the rest.

// Gate reveal-hiding on JS actually running (no-JS users see all content)
document.documentElement.classList.add('js');

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

/* ---------- Mobile menu ---------- */
const burger = document.querySelector('.nav-burger');
const menu = document.querySelector('.mobile-menu');
if (burger && menu) {
  const closeMenu = () => {
    menu.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  };

  burger.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    burger.setAttribute('aria-expanded', String(open));
  });

  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeMenu));

  // Escape closes the menu and returns focus to the toggle
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('open')) {
      closeMenu();
      burger.focus();
    }
  });

  // Widening past the mobile breakpoint hides the burger: close the menu
  // so it can't be stranded open with no way to dismiss it
  window.matchMedia('(min-width: 641px)').addEventListener('change', (e) => {
    if (e.matches) closeMenu();
  });
}

/* ---------- FAQ accordion ---------- */
document.querySelectorAll('.faq-item').forEach((item, i) => {
  const btn = item.querySelector('button');
  const answer = item.querySelector('.faq-a');
  if (!btn || !answer) return;

  answer.id = 'faq-a-' + i;
  btn.setAttribute('aria-controls', answer.id);

  btn.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');

    document.querySelectorAll('.faq-item.open').forEach((other) => {
      const a = other.querySelector('.faq-a');
      if (!a) return;
      if (a.style.maxHeight === 'none') {
        a.style.maxHeight = a.scrollHeight + 'px';
        void a.offsetHeight; // flush so the collapse animates from the real height
      }
      other.classList.remove('open');
      const b = other.querySelector('button');
      if (b) b.setAttribute('aria-expanded', 'false');
      a.style.maxHeight = '';
    });

    if (!isOpen) {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
      answer.style.maxHeight = answer.scrollHeight + 'px';

      if (reducedMotion.matches) {
        // No transition fires under reduced motion: unlock the height now
        // so later reflows (rotation, zoom) can't clip the answer
        answer.style.maxHeight = 'none';
      } else {
        answer.addEventListener('transitionend', function done(e) {
          if (e.target !== answer || e.propertyName !== 'max-height') return;
          if (item.classList.contains('open')) answer.style.maxHeight = 'none';
          answer.removeEventListener('transitionend', done);
        });
      }
    }
  });
});

/* ---------- Schools demo form ---------- */
// TODO: wire to a real endpoint (form backend or API) before launch:
// submissions currently show a confirmation without sending data anywhere.
const demoForm = document.querySelector('.demo-form form');
if (demoForm) {
  demoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(demoForm); // ready for fetch() once an endpoint exists
    void data;

    const card = demoForm.closest('.demo-form');
    const title = card.querySelector('.df-title');
    const sub = card.querySelector('.df-sub');
    if (title) title.textContent = 'Request received.';
    if (sub) sub.textContent = 'We’ll email you to schedule your 30-minute demo.';
    demoForm.remove();

    // #demo-status is a pre-existing live region (kept alive above), so this is announced
    const status = document.getElementById('demo-status');
    if (status) status.textContent = 'Request received. We will email you to schedule your demo.';

    card.setAttribute('tabindex', '-1');
    card.focus();
  });
}

/* ---------- Scroll reveal ---------- */
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
} else {
  document.querySelectorAll('.reveal').forEach((el) => el.classList.add('in'));
}
