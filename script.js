// Smooth scroll con offset (header sticky)
const header = document.querySelector('.topbar');
const links = document.querySelectorAll('[data-scroll]');
const menuBtn = document.querySelector('.menu');

function scrollToTarget(id){
  const el = document.querySelector(id);
  if(!el) return;

  const headerH = header?.offsetHeight ?? 0;
  const y = el.getBoundingClientRect().top + window.pageYOffset - headerH - 10;

  window.scrollTo({ top: y, behavior: 'smooth' });
}

links.forEach(a => {
  a.addEventListener('click', (e) => {
    const href = a.getAttribute('href');
    if(!href || !href.startsWith('#')) return;
    e.preventDefault();
    scrollToTarget(href);

    // chiudi menu mobile se aperto
    header.classList.remove('open');
    menuBtn?.setAttribute('aria-expanded', 'false');
  });
});

// Menu mobile
menuBtn?.addEventListener('click', () => {
  const isOpen = header.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', String(isOpen));
});
