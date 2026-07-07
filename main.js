// Bloomy landing — nav, FAQ, pricing toggle, demo form, scroll reveal

// Gate reveal-hiding on JS actually running (no-JS users see all content)
document.documentElement.classList.add('js');

// Mobile menu
const burger = document.querySelector('.nav-burger');
const menu = document.querySelector('.mobile-menu');
if (burger && menu) {
  burger.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    burger.setAttribute('aria-expanded', String(open));
  });
  menu.querySelectorAll('a').forEach((a) =>
    a.addEventListener('click', () => {
      menu.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    })
  );
}

// FAQ accordion
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach((item, i) => {
  const btn = item.querySelector('button');
  const answer = item.querySelector('.faq-a');
  answer.id = 'faq-a-' + i;
  btn.setAttribute('aria-controls', answer.id);

  btn.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');

    faqItems.forEach((other) => {
      if (!other.classList.contains('open')) return;
      const a = other.querySelector('.faq-a');
      if (a.style.maxHeight === 'none') {
        a.style.maxHeight = a.scrollHeight + 'px';
        void a.offsetHeight; // flush so the collapse animates from the real height
      }
      other.classList.remove('open');
      other.querySelector('button').setAttribute('aria-expanded', 'false');
      a.style.maxHeight = '';
    });

    if (!isOpen) {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
      answer.style.maxHeight = answer.scrollHeight + 'px';
      answer.addEventListener('transitionend', function done() {
        if (item.classList.contains('open')) answer.style.maxHeight = 'none';
        answer.removeEventListener('transitionend', done);
      });
    }
  });
});

// Pricing billing toggle
const billButtons = document.querySelectorAll('.bill-btn');
billButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const period = btn.dataset.bill;
    billButtons.forEach((b) => {
      const active = b === btn;
      b.classList.toggle('active', active);
      b.setAttribute('aria-pressed', String(active));
    });
    document.querySelectorAll('[data-monthly]').forEach((el) => {
      if (el.classList.contains('bill-btn')) return;
      el.textContent = el.dataset[period];
    });
  });
});

// Schools demo form — confirmation state that matches the promised flow
const demoForm = document.querySelector('.demo-form form');
if (demoForm) {
  demoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const card = demoForm.closest('.demo-form');
    card.innerHTML =
      '<h2 class="df-title">Request received.</h2>' +
      '<p class="df-sub" role="status">We’ll email you within one school day to schedule your 30-minute demo.</p>';
    card.setAttribute('tabindex', '-1');
    card.focus();
  });
}

// Scroll reveal
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
