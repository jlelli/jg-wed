const ACCESS_KEY = 'jgwed_access_granted';
const LANGUAGE_KEY = 'jgwed_lang';
const safeStorage = {
  get(key){
    try{
      return localStorage.getItem(key);
    }catch{
      return null;
    }
  },
  set(key, value){
    try{
      localStorage.setItem(key, value);
    }catch{
      // ignore storage errors (e.g. private mode)
    }
  },
};
const gate = document.querySelector('#gate');
const gateForm = document.querySelector('#gate-form');
const gateInput = document.querySelector('#gate-input');
const gateError = document.querySelector('#gate-error');
const accessPassword = document.body?.dataset?.password ?? '';
const langToggle = document.querySelector('[data-lang-toggle]');

const translations = {
  it: {
    'meta.title': 'Juri & Grazia — 19 luglio 2026',
    'meta.description': 'Informazioni, orari, come arrivare e RSVP per il matrimonio di Juri & Grazia a Masseria Montalbano.',
    'gate.title': 'Accesso riservato',
    'gate.subtitle': 'Inserisci la password per entrare nel sito.',
    'gate.placeholder': 'Password',
    'gate.button': 'Entra',
    'gate.error': 'Password errata. Riprova.',
    'brand.title': 'Juri & Grazia - Festa della nostra Unità',
    'nav.aria': 'Navigazione principale',
    'nav.day': 'Il giorno',
    'nav.where': 'Dove',
    'nav.stay': 'Dormire',
    'nav.rsvp': 'RSVP',
    'nav.faq': 'FAQ',
    'menu.label': 'Apri menu',
    'lang.switch': 'English',
    'lang.aria': 'Passa a inglese',
    'hero.kicker': '19 luglio 2026 • Puglia',
    'hero.title': 'Ci sposiamo! 💍',
    'hero.subtitle': 'Una giornata semplice, bella, e (probabilmente) calda.<br />Portate voi stessi. Per il resto ci stiamo organizzando (giuriamo).',
    'hero.cta.primary': 'Conferma presenza',
    'hero.cta.secondary': 'Come arrivare',
    'day.title': 'Il giorno',
    'day.when.title': 'Quando',
    'day.when.text': 'Domenica <strong>19 luglio 2026</strong>',
    'day.dress.title': 'Come vestirsi',
    'day.dress.lead': '<strong>Eleganti ma comodi.</strong>',
    'day.dress.note1': 'Tacchi sottili: coraggiosi! Onestamente non servono..',
    'day.dress.note2': 'Lino: apprezzatissimo.',
    'day.schedule.title': 'Programma',
    'day.schedule.time1': 'Arrivo ospiti',
    'day.schedule.time2': 'Rito civile',
    'day.schedule.time3': 'Aperitivo di benvenuto',
    'day.schedule.time4': 'Cena',
    'day.schedule.time5': 'Taglio torta',
    'day.schedule.time6': 'After party in piscina',
    'day.schedule.note': 'Orari indicativi: il bello è non guardare l’orologio.',
    'where.title': 'Dove',
    'where.venue': '<strong>Masseria Montalbano</strong><br />SS16, km 871,800, 72017 Ostuni (BR)',
    'where.site': 'Sito della masseria',
    'where.parking': '<strong>Parcheggio:</strong> disponibile in struttura.',
    'where.maps': 'Apri su Google Maps',
    'where.map.aria': 'Mappa',
    'stay.title': 'Dormire',
    'stay.lead': 'Se venite da lontano: grazie ❤️<br />Abbiamo raccolto alcune opzioni comode nei dintorni.',
    'stay.nearby.title': 'Nei dintorni',
    'stay.nearby.note': 'Strutture vicine <br />(convenzione fino al <b>28 febbraio</b>!)',
    'stay.nearby.link': 'Apri la lista',
    'stay.after.title': 'Il giorno dopo',
    'stay.after.note': 'Domenica mattina saremo ancora in zona per salutarci con calma: caffè, chiacchiere e lento rientro alla realtà. Magari un salto al mare?',
    'arrive.title': 'Come arrivare',
    'arrive.brindisi.title': 'Da Brindisi (BDS)',
    'arrive.brindisi.text': 'Circa 40 minuti in auto.<br />Auto a noleggio consigliata, con percorso diretto lungo la SS16 in direzione Ostuni.<br /><br />È l’aeroporto più vicino alla masseria.',
    'arrive.bari.title': 'Da Bari (BRI)',
    'arrive.bari.text': 'Circa 1 ora e 20 minuti in auto.<br />Auto a noleggio consigliata, percorrendo la SS16 verso sud in direzione Ostuni.<br /><br />Buona alternativa se trovate voli più comodi su Bari.',
    'arrive.train.title': 'Treno + auto',
    'arrive.train.text': 'La stazione ferroviaria più vicina è <strong>Ostuni</strong>.<br />Dalla stazione è possibile proseguire in taxi oppure con un’auto a noleggio.<br /><br />Per gli ultimi chilometri l’auto è fortemente consigliata.',
    'arrive.shuttle.title': 'Navetta (in valutazione)',
    'arrive.shuttle.text': 'Stiamo valutando la possibilità di organizzare una <strong>navetta tra Ostuni (strutture ricettive convenzionate) e la masseria</strong>.<br /><br />Al momento non è ancora confermata: eventuali dettagli (orari, fermate) verranno comunicati più avanti, se disponibili.',
    'arrive.note': 'Per qualsiasi dubbio sugli spostamenti, scriveteci senza problemi.',
    'gift.title': 'Regalo',
    'gift.lead': 'La vostra presenza è già tantissimo.<br />Davvero, sappiamo quanto costa partecipare e siamo super felici che ci regaliate la possibilità di festeggiare con voi!<br /><br />Se comunque non vi abbiamo convinto e vi fa piacere accompagnarci nel nostro prossimo viaggio ...',
    'gift.details': '<strong>IBAN:</strong> IT08M0301503200000004779404<br /><strong>Intestato a:</strong> Grazia Rutigliano<br /><strong>Banca:</strong> FINECO<br /><strong>Indirizzo:</strong> Piazza Durante 11 - 20131 Milano<br /><strong>Causale:</strong> Regalo matrimonio Juri e Grazia',
    'gift.charity': 'Una parte del regalo sarà devoluto in beneficenza a <a href="https://www.greenpeace.org/italy/chi-siamo/" target="_blank" rel="noopener">Greenpeace</a> e <a href="https://sosmediterranee.it/" target="_blank" rel="noopener">SOS MEDITERRANEE</a>.',
    'rsvp.title': 'RSVP',
    'rsvp.lead': 'Confermate la presenza entro <strong>15 maggio 2026</strong>.<br />È il modo più semplice per far funzionare tutto senza stress.',
    'rsvp.form.aria': 'Modulo RSVP',
    'rsvp.loading': 'Caricamento…',
    'rsvp.note': 'Per qualunque dubbio: scriveteci su WhatsApp. Rispondiamo in tempi umani.',
    'faq.title': 'Qualche dritta',
    'faq.hot.title': 'Farà caldo?',
    'faq.hot.text': 'Sì, probabilmente sì. Ma saremo all’aperto, al tramonto, con ombra e aria che gira. Sopravviveremo tutti. ☠️',
    'faq.dress.title': 'Come vestirsi',
    'faq.dress.text': 'Tessuti leggeri (lino, cotone) aiutano molto. Colori chiari consigliati. Tacchi sottili: bellissimi, ma il terreno non sempre collabora.',
    'faq.change.title': 'Cambio extra',
    'faq.change.text': 'Una camicia o t-shirt di ricambio può salvare la serata. Nessuno giudica, anzi.',
    'faq.pool.title': 'After party in piscina',
    'faq.pool.text': 'Sì, ci sarà. Costume e telo consigliati per chi vuole continuare la festa in versione molto estiva.',
    'faq.bring.title': 'Cosa portare',
    'faq.bring.text': 'Scarpe comode per ballare, borsa leggera, occhiali da sole e voglia di divertirsi.',
    'faq.kids.title': 'Per i più piccoli',
    'faq.kids.text': 'Durante la giornata sarà presente un servizio di <strong>intrattenimento dedicato ai bambini (4–10 anni)</strong>, con attività pensate per farli divertire in sicurezza e permettere ai grandi di rilassarsi un po’.<br /><br />Per esigenze particolari, scriveteci senza problemi.',
    'faq.pets.title': 'Animali in struttura',
    'faq.pets.text': 'La Masseria Montalbano, per scelta della direzione, non accetta cani (anche di piccola taglia). È una regola pensata per evitare disturbi in caso di più cani presenti durante il matrimonio.',
    'faq.water.title': 'Acqua & ristoro',
    'faq.water.text': 'L’acqua non mancherà. Come del resto il vino!<br /><br />Bere spesso è sempre una buona idea (alternando, ovviamente 😅).',
    'faq.note': 'Per qualsiasi dubbio: chiedeteci!',
    'footer.text': 'Juri & Grazia • 19 luglio 2026',
  },
  en: {
    'meta.title': 'Juri & Grazia — July 19, 2026',
    'meta.description': 'Details, schedule, travel info, and RSVP for Juri & Grazia\'s wedding at Masseria Montalbano.',
    'gate.title': 'Private access',
    'gate.subtitle': 'Enter the password to access the site.',
    'gate.placeholder': 'Password',
    'gate.button': 'Enter',
    'gate.error': 'Wrong password. Try again.',
    'brand.title': 'Juri & Grazia - Our Union Celebration',
    'nav.aria': 'Main navigation',
    'nav.day': 'The day',
    'nav.where': 'Where',
    'nav.stay': 'Stay',
    'nav.rsvp': 'RSVP',
    'nav.faq': 'FAQ',
    'menu.label': 'Open menu',
    'lang.switch': 'Italiano',
    'lang.aria': 'Switch to Italian',
    'hero.kicker': 'July 19, 2026 • Puglia',
    'hero.title': 'We\'re getting married! 💍',
    'hero.subtitle': 'A simple, beautiful, and (probably) hot day.<br />Bring yourselves. We\'re taking care of the rest (we swear).',
    'hero.cta.primary': 'Confirm attendance',
    'hero.cta.secondary': 'How to get there',
    'day.title': 'The day',
    'day.when.title': 'When',
    'day.when.text': 'Sunday <strong>July 19, 2026</strong>',
    'day.dress.title': 'Dress code',
    'day.dress.lead': '<strong>Elegant but comfortable.</strong>',
    'day.dress.note1': 'Thin heels: brave! Honestly, not needed.',
    'day.dress.note2': 'Linen: highly appreciated.',
    'day.schedule.title': 'Schedule',
    'day.schedule.time1': 'Guests arrive',
    'day.schedule.time2': 'Civil ceremony',
    'day.schedule.time3': 'Welcome aperitivo',
    'day.schedule.time4': 'Dinner',
    'day.schedule.time5': 'Cake cutting',
    'day.schedule.time6': 'Pool after party',
    'day.schedule.note': 'Times are approximate: the best part is not watching the clock.',
    'where.title': 'Where',
    'where.venue': '<strong>Masseria Montalbano</strong><br />SS16, km 871,800, 72017 Ostuni (BR)',
    'where.site': 'Venue website',
    'where.parking': '<strong>Parking:</strong> available on site.',
    'where.maps': 'Open in Google Maps',
    'where.map.aria': 'Map',
    'stay.title': 'Stay',
    'stay.lead': 'Coming from far away? Thank you ❤️<br />We gathered a few comfortable options nearby.',
    'stay.nearby.title': 'Nearby',
    'stay.nearby.note': 'Nearby accommodations<br />(discount until <b>February 28</b>!)',
    'stay.nearby.link': 'Open the list',
    'stay.after.title': 'The day after',
    'stay.after.note': 'On Sunday morning we\'ll still be around to say goodbye slowly: coffee, chats, and a gentle return to reality. Maybe a dip in the sea?',
    'arrive.title': 'How to get there',
    'arrive.brindisi.title': 'From Brindisi (BDS)',
    'arrive.brindisi.text': 'About 40 minutes by car.<br />Rental car recommended, with a direct route along the SS16 toward Ostuni.<br /><br />It\'s the closest airport to the venue.',
    'arrive.bari.title': 'From Bari (BRI)',
    'arrive.bari.text': 'About 1 hour and 20 minutes by car.<br />Rental car recommended, taking the SS16 south toward Ostuni.<br /><br />A good alternative if you find more convenient flights to Bari.',
    'arrive.train.title': 'Train + car',
    'arrive.train.text': 'The closest train station is <strong>Ostuni</strong>.<br />From the station you can continue by taxi or with a rental car.<br /><br />For the last few kilometers a car is strongly recommended.',
    'arrive.shuttle.title': 'Shuttle (under consideration)',
    'arrive.shuttle.text': 'We are considering organizing a <strong>shuttle between Ostuni (partnered accommodations) and the masseria</strong>.<br /><br />It is not confirmed yet: any details (times, stops) will be shared later, if available.',
    'arrive.note': 'If you have any questions about getting around, just write to us.',
    'gift.title': 'Gift',
    'gift.lead': 'Your presence is already so much.<br />Truly, we know how much it costs to attend and we\'re so happy you are giving us the chance to celebrate with you!<br /><br />If that still doesn\'t convince you and you\'d like to join us on our next trip...',
    'gift.details': '<strong>IBAN:</strong> IT08M0301503200000004779404<br /><strong>Account holder:</strong> Grazia Rutigliano<br /><strong>Bank:</strong> FINECO<br /><strong>Address:</strong> Piazza Durante 11 - 20131 Milano<br /><strong>Reference:</strong> Wedding gift for Juri and Grazia',
    'gift.charity': 'Part of the gift will be donated to <a href="https://www.greenpeace.org/italy/chi-siamo/" target="_blank" rel="noopener">Greenpeace</a> and <a href="https://sosmediterranee.it/" target="_blank" rel="noopener">SOS MEDITERRANEE</a>.',
    'rsvp.title': 'RSVP',
    'rsvp.lead': 'Please confirm your attendance by <strong>May 15, 2026</strong>.<br />It\'s the simplest way to keep everything stress-free.',
    'rsvp.form.aria': 'RSVP form',
    'rsvp.loading': 'Loading…',
    'rsvp.note': 'For any questions: message us on WhatsApp. We reply like humans.',
    'faq.title': 'A few tips',
    'faq.hot.title': 'Will it be hot?',
    'faq.hot.text': 'Yes, probably. But we\'ll be outdoors at sunset, with shade and a breeze. We\'ll all survive. ☠️',
    'faq.dress.title': 'What to wear',
    'faq.dress.text': 'Light fabrics (linen, cotton) help a lot. Light colors are recommended. Thin heels: beautiful, but the ground doesn\'t always cooperate.',
    'faq.change.title': 'Extra change',
    'faq.change.text': 'A spare shirt or t-shirt can save the evening. No one judges, quite the opposite.',
    'faq.pool.title': 'Pool after party',
    'faq.pool.text': 'Yes, it\'s happening. Swimsuit and towel recommended for those who want to keep the party going in full summer mode.',
    'faq.bring.title': 'What to bring',
    'faq.bring.text': 'Comfortable shoes for dancing, a light bag, sunglasses, and a desire to have fun.',
    'faq.kids.title': 'For little ones',
    'faq.kids.text': 'During the day there will be a <strong>kids\' entertainment service (ages 4–10)</strong>, with activities designed to keep them safe and entertained while the adults relax a bit.<br /><br />For special needs, just write to us.',
    'faq.pets.title': 'Pets at the venue',
    'faq.pets.text': 'Masseria Montalbano, by management choice, does not allow dogs (even small ones). It\'s a rule meant to avoid disturbances if multiple dogs are present during the wedding.',
    'faq.water.title': 'Water & refreshments',
    'faq.water.text': 'Water will be plentiful. And so will wine!<br /><br />Drinking often is always a good idea (alternating, of course 😅).',
    'faq.note': 'Any questions: just ask!',
    'footer.text': 'Juri & Grazia • July 19, 2026',
  },
};

let currentLang = safeStorage.get(LANGUAGE_KEY) || document.documentElement.lang || 'it';

function translateElementText(dict, selector, accessor, mutator){
  document.querySelectorAll(selector).forEach(el => {
    const key = accessor(el);
    if(!key) return;
    const value = dict[key];
    if(value !== undefined){
      mutator(el, value);
    }
  });
}

function applyTranslations(lang){
  const dict = translations[lang] || translations.it;
  document.documentElement.lang = lang;
  translateElementText(dict, '[data-i18n]', el => el.dataset.i18n, (el, value) => { el.textContent = value; });
  translateElementText(dict, '[data-i18n-html]', el => el.dataset.i18nHtml, (el, value) => { el.innerHTML = value; });
  translateElementText(dict, '[data-i18n-placeholder]', el => el.dataset.i18nPlaceholder, (el, value) => { el.setAttribute('placeholder', value); });
  translateElementText(dict, '[data-i18n-aria]', el => el.dataset.i18nAria, (el, value) => { el.setAttribute('aria-label', value); });
  translateElementText(dict, '[data-i18n-content]', el => el.dataset.i18nContent, (el, value) => { el.setAttribute('content', value); });

  if(langToggle){
    langToggle.textContent = dict['lang.switch'] ?? langToggle.textContent;
    langToggle.setAttribute('aria-label', (dict['lang.aria'] ?? langToggle.getAttribute('aria-label')) || '');
  }
  if(gateError && gateError.textContent){
    gateError.textContent = dict['gate.error'] ?? gateError.textContent;
  }
  if(document.title !== dict['meta.title'] && dict['meta.title']){
    document.title = dict['meta.title'];
  }
}

function setLanguage(lang){
  currentLang = translations[lang] ? lang : 'it';
  safeStorage.set(LANGUAGE_KEY, currentLang);
  applyTranslations(currentLang);
}

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

if(accessPassword && safeStorage.get(ACCESS_KEY) === 'true'){
  unlockGate();
}else if(accessPassword){
  lockGate();
}

setLanguage(currentLang);

langToggle?.addEventListener('click', (e) => {
  e.preventDefault();
  const next = currentLang === 'it' ? 'en' : 'it';
  setLanguage(next);
});

gateForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  if(!accessPassword) return;
  const value = gateInput?.value ?? '';
  if(value === accessPassword){
    safeStorage.set(ACCESS_KEY, 'true');
    gateError.textContent = '';
    if(gateInput) gateInput.value = '';
    unlockGate();
    return;
  }
  gateError.textContent = translations[currentLang]?.['gate.error'] ?? 'Password errata. Riprova.';
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
