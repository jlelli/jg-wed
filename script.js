const ACCESS_KEY = 'jgwed_access_granted';
const gate = document.querySelector('#gate');
const gateForm = document.querySelector('#gate-form');
const gateInput = document.querySelector('#gate-input');
const gateError = document.querySelector('#gate-error');
const accessPassword = document.body?.dataset?.password ?? '';

function unlockGate(){
  document.body.classList.remove('locked');
  if(gate){
    gate.classList.add('hidden');
    gate.hidden = true;
    gate.setAttribute('aria-hidden', 'true');
  }
}

function lockGate(){
  if(!accessPassword) return;
  document.body.classList.add('locked');
  if(gate){
    gate.classList.remove('hidden');
    gate.hidden = false;
    gate.setAttribute('aria-hidden', 'false');
  }
  setTimeout(() => gateInput?.focus(), 80);
}

if(accessPassword && localStorage.getItem(ACCESS_KEY) === 'true'){
  unlockGate();
}else if(accessPassword){
  lockGate();
}

gateForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  if(!accessPassword) return;
  const value = gateInput?.value ?? '';
  if(value === accessPassword){
    localStorage.setItem(ACCESS_KEY, 'true');
    gateError.textContent = '';
    if(gateInput) gateInput.value = '';
    unlockGate();
    return;
  }
  gateError.textContent = 'Password errata. Riprova.';
  if(gateInput){
    gateInput.value = '';
    gateInput.focus();
  }
});

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
