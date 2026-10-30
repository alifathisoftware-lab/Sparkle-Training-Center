const menu = document.querySelector('.menu');
menu.addEventListener('click', () => { const open = document.querySelector('nav').classList.toggle('open'); menu.setAttribute('aria-expanded', String(open)); });
document.querySelectorAll('nav a').forEach(link => link.addEventListener('click', () => { document.querySelector('nav').classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); }));
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-filter]').forEach(item => { item.classList.toggle('active', item === button); item.setAttribute('aria-pressed', String(item === button)); });
  document.querySelectorAll('.course').forEach(card => { card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter; });
}));
document.querySelectorAll('[data-program]').forEach(link => link.addEventListener('click', () => { document.querySelector('#program').value = link.dataset.program; document.querySelector('#result').hidden = true; }));
document.querySelector('#inquiry').addEventListener('input', () => { document.querySelector('#result').hidden = true; });
document.querySelector('#inquiry').addEventListener('submit', event => {
  event.preventDefault();
  const name = document.querySelector('#name').value.trim();
  if (!name) { document.querySelector('#name').setCustomValidity('يرجى كتابة الاسم'); document.querySelector('#name').reportValidity(); return; }
  const program = document.querySelector('#program').value;
  const message = document.querySelector('#message').value.trim();
  const text = `مرحبًا مركز Sparkle، اسمي ${name}. أرغب بالاستفسار عن برنامج ${program} ومعرفة المواعيد والرسوم والمجموعات المتاحة.${message ? '\n' + message : ''}`;
  document.querySelector('#draft').textContent = text;
  document.querySelector('#whatsapp').href = 'https://wa.me/218931675634?text=' + encodeURIComponent(text);
  document.querySelector('#result').hidden = false;
});
document.querySelector('#name').addEventListener('input', event => event.target.setCustomValidity(''));

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const animatedElements = document.querySelectorAll('.reveal, .course, .teacher-grid article, .steps article, details');
if (!reducedMotion) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
  }), { threshold: .14 });
  animatedElements.forEach((element, index) => {
    element.style.setProperty('--delay', `${Math.min(index % 4, 3) * 90}ms`);
    observer.observe(element);
  });
  document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('pointermove', event => {
      const box = card.getBoundingClientRect();
      card.style.setProperty('--rx', `${((event.clientY - box.top) / box.height - .5) * -7}deg`);
      card.style.setProperty('--ry', `${((event.clientX - box.left) / box.width - .5) * 7}deg`);
    });
    card.addEventListener('pointerleave', () => { card.style.setProperty('--rx', '0deg'); card.style.setProperty('--ry', '0deg'); });
  });
} else animatedElements.forEach(element => element.classList.add('is-visible'));

const progress = document.querySelector('.scroll-progress');
const glow = document.querySelector('.cursor-glow');
window.addEventListener('scroll', () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
}, { passive: true });
if (matchMedia('(pointer:fine)').matches && !reducedMotion) {
  window.addEventListener('pointermove', event => {
    glow.style.transform = `translate3d(${event.clientX}px,${event.clientY}px,0)`;
  }, { passive: true });
}

const canvas = document.querySelector('#sparkle-field');
const context = canvas.getContext('2d');
let particles = [];
function resizeField() {
  const ratio = Math.min(devicePixelRatio || 1, 2);
  canvas.width = innerWidth * ratio; canvas.height = innerHeight * ratio;
  canvas.style.width = `${innerWidth}px`; canvas.style.height = `${innerHeight}px`;
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
  particles = Array.from({length: Math.min(48, Math.floor(innerWidth / 24))}, () => ({x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:Math.random()*1.8+.4,v:Math.random()*.22+.08,a:Math.random()*.45+.12}));
}
function drawField() {
  context.clearRect(0,0,innerWidth,innerHeight);
  particles.forEach(p => { p.y -= p.v; if(p.y < -5){p.y=innerHeight+5;p.x=Math.random()*innerWidth} context.beginPath();context.arc(p.x,p.y,p.r,0,Math.PI*2);context.fillStyle=`rgba(118,56,172,${p.a})`;context.fill(); });
  if (!reducedMotion) requestAnimationFrame(drawField);
}
resizeField(); if (!reducedMotion) drawField();
addEventListener('resize', resizeField, {passive:true});

document.querySelectorAll('.planet').forEach(planet => planet.addEventListener('click', () => {
  document.querySelectorAll('.planet').forEach(item => item.classList.toggle('planet-active', item === planet));
}));
