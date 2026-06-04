/* Birmingham Roofing Solutions — interactions */

// Mobile nav
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');
if (navToggle) navToggle.addEventListener('click', () => nav.classList.toggle('open'));

// ★ Instant quote estimator — guide-only ranges, tune per client pricing
const PRICE = {
  repair: { s:[150,450],  m:[350,900],   l:[800,2500] },
  flat:   { s:[1200,2500],m:[2400,4500], l:[4500,9000] },
  reroof: { s:[3500,6000],m:[6000,9500], l:[9500,18000] },
  gutter: { s:[200,500],  m:[450,1100],  l:[1000,2600] }
};
const estGo = document.getElementById('est-go');
if (estGo) estGo.addEventListener('click', () => {
  const svc = document.getElementById('est-service').value;
  const size = document.getElementById('est-size').value;
  const urgent = document.getElementById('est-urgency').value === 'u';
  let [lo, hi] = PRICE[svc][size];
  if (urgent) { lo = Math.round(lo*1.15); hi = Math.round(hi*1.15); }
  const fmt = n => '£' + n.toLocaleString('en-GB');
  document.getElementById('est-price').textContent = `${fmt(lo)} – ${fmt(hi)}`;
  document.getElementById('est-result').classList.add('show');
});

// Quote form submit — wire to your endpoint / email service / CRM
window.__submitQuote = function (e) {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target).entries());
  // TODO: POST `data` to /api/lead (email, Google Sheet, or CRM). Demo: log + thank.
  console.log('LEAD CAPTURED →', data);
  e.target.innerHTML = '<h3 style="color:#fff">✅ Thanks ' + (data.name||'') +
    '!</h3><p style="color:#dce6ef">Your request is in. We\'ll call you on ' +
    (data.phone||'your number') + ' shortly. Emergency? Call 0121 000 0000 now.</p>';
  return false;
};

// Optional: populate live reviews from your feed
// fetch('/api/reviews').then(r=>r.json()).then(renderReviews)

// --- Carousel ---
(function(){
  const track = document.getElementById('carouselTrack');
  if(!track) return;
  const slides = track.querySelectorAll('.carousel-slide');
  const total = slides.length;
  let current = 0;
  let timer;

  function getSlidesVisible(){
    if(window.innerWidth <= 860) return 1;
    if(window.innerWidth <= 1100) return 2;
    return 3;
  }

  function goTo(idx){
    const vis = getSlidesVisible();
    const max = total - vis;
    current = Math.max(0, Math.min(idx, max));
    const slideWidth = slides[0].getBoundingClientRect().width + 16;
    if(slideWidth <= 16) return;
    track.style.transform = `translateX(-${current * slideWidth}px)`;
  }

  function next(){ goTo(current >= total - getSlidesVisible() ? 0 : current + 1); }
  function prev(){ goTo(current - 1 < 0 ? total - getSlidesVisible() : current - 1); }

  function startAuto(){ stopAuto(); timer = setInterval(next, 3500); }
  function stopAuto(){ clearInterval(timer); }

  document.getElementById('carouselNext').addEventListener('click', function(){ stopAuto(); next(); startAuto(); });
  document.getElementById('carouselPrev').addEventListener('click', function(){ stopAuto(); prev(); startAuto(); });
  track.parentElement.addEventListener('mouseenter', stopAuto);
  track.parentElement.addEventListener('mouseleave', startAuto);
  window.addEventListener('resize', function(){ goTo(0); });

  startAuto();
})();
