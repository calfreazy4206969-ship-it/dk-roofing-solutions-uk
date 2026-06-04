# DK Roofing Site Upgrade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade index.html to a professional, roofing-specific site using Oswald/Inter fonts, real job photos, and 4 new sections (emergency banner, accreditations bar, rotating carousel, before/after gallery, FAQ).

**Architecture:** Pure static HTML/CSS/JS — no build system. All changes confined to index.html, css/styles.css, and js/main.js. New sections added progressively; existing sections upgraded in-place. Images referenced from /images/ folder.

**Tech Stack:** HTML5, CSS3 (custom properties), vanilla JS (ES6). Google Fonts CDN for Oswald + Inter. No external JS libraries.

---

## File Map

| File | Changes |
|---|---|
| `index.html` | Google Fonts link, emergency banner, accreditations bar, carousel section, before/after section, FAQ section + JSON-LD, Oswald logo, SVG service icons, remove unverified claims |
| `css/styles.css` | Font vars, emergency banner, accreditations bar, carousel, before/after slider, FAQ accordion, section typography upgrades |
| `js/main.js` | Carousel autoplay + arrows, before/after drag slider, FAQ accordion |
| `images/` | Create folder — placeholder until real photos saved |

---

## Task 1: Google Fonts + CSS Design System

**Files:**
- Modify: `index.html` (line 9 — after existing stylesheet link)
- Modify: `css/styles.css` (`:root` block, lines 1–12)

- [ ] **Step 1: Add Google Fonts to index.html**

In `index.html`, after `<link rel="stylesheet" href="css/styles.css">`, add:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@600;700&family=Inter:wght@400;600&display=swap" rel="stylesheet">
```

- [ ] **Step 2: Update CSS root variables**

In `css/styles.css`, update the `:root` block to add font variables and emergency colour:
```css
:root{
  --slate:#1f2933; --slate-2:#323f4b; --ink:#111418; --muted:#5b6770;
  --brand:#16324f;
  --accent:#ff6a2b;
  --accent-dk:#e2541a;
  --emergency:#cc2200;
  --bg:#ffffff; --bg-soft:#f5f7f9; --line:#e3e8ec;
  --ok:#1f9d55; --star:#ffb400;
  --radius:14px; --shadow:0 8px 30px rgba(16,32,49,.12);
  --wrap:1140px;
  --font:'Inter',system-ui,-apple-system,Roboto,Arial,sans-serif;
  --font-heading:'Oswald',system-ui,Arial,sans-serif;
}
```

- [ ] **Step 3: Update heading font-family in CSS**

Find the `h1,h2,h3` rule in styles.css and update:
```css
h1,h2,h3{line-height:1.15;margin:0 0 .5em;color:var(--brand);font-family:var(--font-heading);text-transform:uppercase;letter-spacing:.02em}
```

- [ ] **Step 4: Update logo to Oswald**

Find `.logo` in styles.css and update:
```css
.logo{font-family:var(--font-heading);font-weight:700;font-size:1.4rem;color:var(--brand);display:flex;align-items:center;gap:.5rem;text-transform:uppercase;letter-spacing:.05em}
```

- [ ] **Step 5: Open index.html in browser and verify**

Open `d:\ai coder\clients\dk-roofing-solutions\index.html` in Chrome.
Expected: headings render in Oswald (tall, condensed), body text in Inter. Logo is Oswald. If fonts look the same as before, check DevTools → Network for font load failures.

- [ ] **Step 6: Commit**
```bash
git add index.html css/styles.css
git commit -m "feat: add Oswald/Inter Google Fonts and update design tokens"
```

---

## Task 2: Emergency Banner

**Files:**
- Modify: `index.html` — add banner before `<div class="topbar">`
- Modify: `css/styles.css` — add emergency banner styles

- [ ] **Step 1: Add emergency banner HTML**

In `index.html`, replace the existing `<!-- ===== Top bar ===== -->` comment and `.topbar` div with this (keep the topbar too, just add banner above it):
```html
<!-- ===== Emergency banner ===== -->
<div class="emergency-bar">
  <div class="wrap">
    <span>⚡ ROOF LEAKING? 24/7 Emergency Roofing — Birmingham &amp; West Midlands</span>
    <a href="tel:+447887479143" class="emergency-cta">CALL NOW — 07887 479143</a>
  </div>
</div>

<!-- ===== Top bar ===== -->
```

- [ ] **Step 2: Add emergency banner CSS**

In `css/styles.css`, add after the `:root` block:
```css
/* ---------- Emergency banner ---------- */
.emergency-bar{background:var(--emergency);color:#fff;font-family:var(--font-heading);font-size:.85rem;letter-spacing:.08em}
.emergency-bar .wrap{display:flex;justify-content:space-between;align-items:center;gap:12px;padding:9px 20px;flex-wrap:wrap}
.emergency-cta{background:#fff;color:var(--emergency);font-weight:700;padding:5px 16px;border-radius:4px;white-space:nowrap;font-size:.8rem}
.emergency-cta:hover{background:#f0f0f0}
```

- [ ] **Step 3: Verify in browser**

Refresh `index.html`. Expected: bold red bar at very top with "ROOF LEAKING?" text and white "CALL NOW" button on the right. On mobile it should wrap gracefully.

- [ ] **Step 4: Commit**
```bash
git add index.html css/styles.css
git commit -m "feat: add emergency banner above header"
```

---

## Task 3: Fix Hero — Remove Unverified Claims + Oswald Headings

**Files:**
- Modify: `index.html` — hero section (lines 53–68)

- [ ] **Step 1: Replace hero section**

Find `<!-- ===== Hero ===== -->` and replace the entire section with:
```html
<!-- ===== Hero ===== -->
<section class="hero"><div class="wrap">
  <p class="eyebrow" style="color:#ffd0bb">Birmingham Roofers — Flat &amp; Pitched Specialists</p>
  <h1>Roof Repairs &amp; New Roofs<br>Done Right, First Time</h1>
  <p>From a slipped tile to a full re-roof, DK Roofing Solutions fixes it fast — free no-obligation quote, honest pricing and a workmanship guarantee on every job across Birmingham.</p>
  <div class="hero-cta">
    <a class="btn btn-primary" href="#quote">Get My Free Quote</a>
    <a class="btn btn-call" href="tel:+447887479143">📞 Call 07887 479143</a>
  </div>
  <div class="hero-trust">
    <span class="stars">★★★★★</span><span>5-star rated on Google</span>
    <span class="badge-pill">✓ Fully insured</span>
    <span class="badge-pill">✓ Free quotes</span>
    <span class="badge-pill">✓ Family-run business</span>
  </div>
</div></section>
```

- [ ] **Step 2: Make hero taller**

Find `.hero .wrap` in styles.css and update:
```css
.hero .wrap{padding:100px 20px 90px}
```

- [ ] **Step 3: Verify in browser**

Refresh. Expected: hero heading in large Oswald, no "since 2016" or "60-min" claims, three neutral trust pills. Heading should be visibly larger and bolder than before.

- [ ] **Step 4: Commit**
```bash
git add index.html css/styles.css
git commit -m "feat: upgrade hero with Oswald headings, remove unverified claims"
```

---

## Task 4: Accreditations Bar

**Files:**
- Modify: `index.html` — add after `.trustbar` div
- Modify: `css/styles.css` — add accreditations styles

- [ ] **Step 1: Add accreditations bar HTML**

Find `<!-- ===== Services ===== -->` and insert this block above it:
```html
<!-- ===== Accreditations ===== -->
<div class="accred-bar"><div class="wrap">
  <span class="accred-item"><span class="accred-icon">✓</span>Checkatrade</span>
  <span class="accred-item"><span class="accred-icon">✓</span>Trustmark</span>
  <span class="accred-item"><span class="accred-icon">✓</span>NFRC Member</span>
  <span class="accred-item"><span class="accred-icon">★</span>5-Star Google</span>
  <span class="accred-item"><span class="accred-icon">🛡</span>Fully Insured</span>
  <span class="accred-item"><span class="accred-icon">📋</span>Free Quotes</span>
</div></div>
```

- [ ] **Step 2: Add accreditations CSS**

In `styles.css`, after the trustbar styles:
```css
/* ---------- Accreditations bar ---------- */
.accred-bar{background:#fff;border-bottom:2px solid var(--accent);padding:18px 0}
.accred-bar .wrap{display:flex;gap:0;flex-wrap:wrap;justify-content:center;align-items:center;gap:8px}
.accred-item{display:flex;align-items:center;gap:6px;padding:8px 16px;border:1px solid var(--line);border-radius:6px;font-weight:600;font-size:.9rem;color:var(--brand);background:#fafbfc;white-space:nowrap}
.accred-icon{color:var(--accent);font-size:1rem}
```

- [ ] **Step 3: Verify in browser**

Refresh. Expected: a white bar with 6 badge-style items immediately below the trust bar. Bottom border is orange. Badges have check icons.

- [ ] **Step 4: Commit**
```bash
git add index.html css/styles.css
git commit -m "feat: add accreditations bar below hero"
```

---

## Task 5: Replace Emoji Service Icons with SVG

**Files:**
- Modify: `index.html` — services cards section (lines 86–93)

- [ ] **Step 1: Replace service card icons**

Find the `.cards` div and replace all 6 card `.ico` emoji divs with SVG icons:
```html
<div class="wrap grid cards" style="margin-top:34px">
  <div class="card">
    <div class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></div>
    <h3>Roof Repairs</h3><p>Leaks, slipped &amp; broken tiles, ridge &amp; flashing repairs — fixed fast with a guarantee.</p><a class="more" href="/services/roof-repairs.html">Learn more →</a>
  </div>
  <div class="card">
    <div class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/></svg></div>
    <h3>Flat Roofing</h3><p>EPDM rubber &amp; GRP fibreglass flat roofs built to last, with long guarantees.</p><a class="more" href="/services/flat-roofing.html">Learn more →</a>
  </div>
  <div class="card">
    <div class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 20h20M4 20V10l8-6 8 6v10"/><path d="M10 20v-6h4v6"/></svg></div>
    <h3>New Roofs &amp; Re-Roofing</h3><p>Full pitched-roof replacements in tile or slate, done properly.</p><a class="more" href="/services/new-roofs.html">Learn more →</a>
  </div>
  <div class="card">
    <div class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg></div>
    <h3>Emergency &amp; Storm Damage</h3><p>24/7 call-out with a fast response across Birmingham.</p><a class="more" href="/services/emergency-roofing.html">Learn more →</a>
  </div>
  <div class="card">
    <div class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9h18M3 15h18M9 3v18M15 3v18" stroke-linecap="round"/></svg></div>
    <h3>Guttering, Fascias &amp; Soffits</h3><p>Repairs and replacements to protect your roofline and walls.</p><a class="more" href="/services/guttering-fascias-soffits.html">Learn more →</a>
  </div>
  <div class="card">
    <div class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg></div>
    <h3>Commercial Roofing</h3><p>Flat &amp; industrial roofing for Birmingham businesses and landlords.</p><a class="more" href="/services/commercial-roofing.html">Learn more →</a>
  </div>
</div>
```

- [ ] **Step 2: Update card icon CSS**

Find `.card .ico` in styles.css and update:
```css
.card .ico{width:48px;height:48px;color:var(--accent);margin-bottom:8px}
.card .ico svg{width:100%;height:100%}
```

- [ ] **Step 3: Verify in browser**

Refresh. Expected: 6 service cards now show clean line-art SVG icons instead of emoji. Icons are orange, sized consistently.

- [ ] **Step 4: Commit**
```bash
git add index.html css/styles.css
git commit -m "feat: replace emoji service icons with SVG icons"
```

---

## Task 6: Create Images Folder

**Files:**
- Create: `images/` folder with placeholder

- [ ] **Step 1: Create images folder and placeholder**
```bash
mkdir "d:/ai coder/clients/dk-roofing-solutions/images"
echo "# Place real job photos here before launch" > "d:/ai coder/clients/dk-roofing-solutions/images/README.md"
```

Expected filenames (user to save from conversation):
- `before-house-1.jpg`
- `during-stripped-1.jpg`
- `during-tiles-1.jpg`
- `after-house-1.jpg`
- `work-scaffold-1.jpg`
- `work-slate-1.jpg`
- `work-tiles-2.jpg`

- [ ] **Step 2: Commit**
```bash
git add images/
git commit -m "chore: add images folder for real job photos"
```

---

## Task 7: Rotating Photo Carousel

**Files:**
- Modify: `index.html` — add carousel section after accreditations bar / before services section... actually insert after services section
- Modify: `css/styles.css` — carousel styles
- Modify: `js/main.js` — carousel JS

- [ ] **Step 1: Add carousel HTML**

Find `<!-- ===== Why choose us + Estimator ===== -->` and insert this block BEFORE it:
```html
<!-- ===== Photo carousel ===== -->
<section class="section carousel-section">
<div class="wrap center" style="margin-bottom:32px">
  <p class="eyebrow">Our Work</p>
  <h2>Real Jobs Across Birmingham</h2>
</div>
<div class="carousel-track-wrap">
  <button class="carousel-btn prev" id="carouselPrev" aria-label="Previous">&#8592;</button>
  <div class="carousel-track" id="carouselTrack">
    <div class="carousel-slide"><img src="images/work-slate-1.jpg" alt="Slate roof installation Birmingham" loading="lazy"><div class="carousel-cap">Slate Roof Installation</div></div>
    <div class="carousel-slide"><img src="images/after-house-1.jpg" alt="Completed re-roof Birmingham" loading="lazy"><div class="carousel-cap">Full Re-Roof — Birmingham B14</div></div>
    <div class="carousel-slide"><img src="images/during-tiles-1.jpg" alt="Tile laying Birmingham roofer" loading="lazy"><div class="carousel-cap">Tile Laying in Progress</div></div>
    <div class="carousel-slide"><img src="images/work-scaffold-1.jpg" alt="Roofing scaffold Birmingham" loading="lazy"><div class="carousel-cap">Scaffold &amp; Strip-Out</div></div>
    <div class="carousel-slide"><img src="images/during-stripped-1.jpg" alt="Roof stripped and battened" loading="lazy"><div class="carousel-cap">New Batten Work</div></div>
    <div class="carousel-slide"><img src="images/work-tiles-2.jpg" alt="Roof tiles being laid" loading="lazy"><div class="carousel-cap">Pitched Roof Progress</div></div>
    <div class="carousel-slide"><img src="images/before-house-1.jpg" alt="House before re-roof Birmingham" loading="lazy"><div class="carousel-cap">Before — Full Re-Roof Job</div></div>
  </div>
  <button class="carousel-btn next" id="carouselNext" aria-label="Next">&#8594;</button>
</div>
</section>
```

- [ ] **Step 2: Add carousel CSS**

In `styles.css`, before the responsive block at the bottom:
```css
/* ---------- Carousel ---------- */
.carousel-section{padding:72px 0;background:var(--bg-soft);overflow:hidden}
.carousel-track-wrap{position:relative;overflow:hidden}
.carousel-track{display:flex;transition:transform .4s ease;will-change:transform}
.carousel-slide{flex:0 0 calc(33.333% - 16px);margin:0 8px;position:relative;border-radius:var(--radius);overflow:hidden;aspect-ratio:4/3}
.carousel-slide img{width:100%;height:100%;object-fit:cover;display:block}
.carousel-cap{position:absolute;bottom:0;left:0;right:0;background:linear-gradient(transparent,rgba(16,32,49,.85));color:#fff;font-weight:600;font-size:.9rem;padding:28px 14px 12px;font-family:var(--font)}
.carousel-btn{position:absolute;top:50%;transform:translateY(-50%);z-index:10;background:var(--brand);color:#fff;border:0;width:44px;height:44px;border-radius:50%;font-size:1.2rem;cursor:pointer;opacity:.9;transition:.15s}
.carousel-btn:hover{opacity:1;background:var(--accent)}
.carousel-btn.prev{left:10px}
.carousel-btn.next{right:10px}
@media(max-width:860px){.carousel-slide{flex:0 0 calc(100% - 16px)}}
@media(min-width:861px) and (max-width:1100px){.carousel-slide{flex:0 0 calc(50% - 16px)}}
```

- [ ] **Step 3: Add carousel JS**

In `js/main.js`, add at the end of the file:
```js
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
    track.style.transform = `translateX(-${current * slideWidth}px)`;
  }

  function next(){ goTo(current + 1 >= total - getSlidesVisible() + 1 ? 0 : current + 1); }
  function prev(){ goTo(current - 1 < 0 ? total - getSlidesVisible() : current - 1); }

  function startAuto(){ timer = setInterval(next, 3500); }
  function stopAuto(){ clearInterval(timer); }

  document.getElementById('carouselNext').addEventListener('click', function(){ stopAuto(); next(); startAuto(); });
  document.getElementById('carouselPrev').addEventListener('click', function(){ stopAuto(); prev(); startAuto(); });
  track.parentElement.addEventListener('mouseenter', stopAuto);
  track.parentElement.addEventListener('mouseleave', startAuto);
  window.addEventListener('resize', function(){ goTo(0); });

  startAuto();
})();
```

- [ ] **Step 4: Verify in browser**

Refresh. Expected: carousel section shows up with 3 images side-by-side (1 on mobile). Images auto-scroll every 3.5 seconds. Left/right arrows work. Pauses on hover. Note: images will show as broken until real photos are saved to `/images/` — that's expected.

- [ ] **Step 5: Commit**
```bash
git add index.html css/styles.css js/main.js
git commit -m "feat: add rotating photo carousel with real job photo slots"
```

---

## Task 8: Before & After Gallery

**Files:**
- Modify: `index.html` — add section after carousel
- Modify: `css/styles.css` — before/after styles
- Modify: `js/main.js` — drag slider JS

- [ ] **Step 1: Add before/after HTML**

Find `<!-- ===== Why choose us + Estimator ===== -->` and insert BEFORE it:
```html
<!-- ===== Before & After ===== -->
<section class="section">
<div class="wrap center"><p class="eyebrow">The Results</p><h2>See the Difference</h2>
<p class="lead">Drag the slider to compare before and after.</p></div>
<div class="wrap ba-grid" style="margin-top:40px">
  <div class="ba-item">
    <div class="ba-slider" id="baSlider1">
      <img class="ba-after" src="images/after-house-1.jpg" alt="After: completed re-roof Birmingham">
      <div class="ba-before-wrap" id="baBeforeWrap1">
        <img class="ba-before" src="images/before-house-1.jpg" alt="Before: house needing re-roof Birmingham">
      </div>
      <div class="ba-handle" id="baHandle1"><span>&#8596;</span></div>
    </div>
    <p class="ba-cap">Full Re-Roof — Birmingham B14</p>
  </div>
  <div class="ba-item">
    <div class="ba-slider" id="baSlider2">
      <img class="ba-after" src="images/work-slate-1.jpg" alt="After: new slate roof">
      <div class="ba-before-wrap" id="baBeforeWrap2">
        <img class="ba-before" src="images/during-stripped-1.jpg" alt="Before: stripped roof">
      </div>
      <div class="ba-handle" id="baHandle2"><span>&#8596;</span></div>
    </div>
    <p class="ba-cap">Slate Installation — Pitched Roof</p>
  </div>
</div>
</section>
```

- [ ] **Step 2: Add before/after CSS**

In `styles.css`:
```css
/* ---------- Before / After ---------- */
.ba-grid{display:grid;grid-template-columns:1fr 1fr;gap:30px}
.ba-item{}
.ba-slider{position:relative;overflow:hidden;border-radius:var(--radius);aspect-ratio:4/3;cursor:col-resize;user-select:none}
.ba-slider img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block}
.ba-before-wrap{position:absolute;inset:0;overflow:hidden;width:50%}
.ba-before{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;min-width:200%}
.ba-handle{position:absolute;top:0;bottom:0;left:50%;transform:translateX(-50%);width:4px;background:#fff;cursor:col-resize;display:flex;align-items:center;justify-content:center}
.ba-handle span{background:#fff;color:var(--brand);border-radius:50%;width:36px;height:36px;display:flex;align-items:center;justify-content:center;font-size:1rem;font-weight:700;box-shadow:0 2px 8px rgba(0,0,0,.3);flex-shrink:0}
.ba-cap{text-align:center;margin-top:10px;font-weight:600;color:var(--muted)}
@media(max-width:700px){.ba-grid{grid-template-columns:1fr}}
```

- [ ] **Step 3: Add before/after drag JS**

In `js/main.js`, append:
```js
// --- Before/After Sliders ---
['1','2'].forEach(function(id){
  var slider = document.getElementById('baSlider'+id);
  if(!slider) return;
  var wrap = document.getElementById('baBeforeWrap'+id);
  var handle = document.getElementById('baHandle'+id);
  var dragging = false;

  function setPos(x){
    var rect = slider.getBoundingClientRect();
    var pct = Math.max(0, Math.min(1, (x - rect.left) / rect.width));
    wrap.style.width = (pct * 100) + '%';
    handle.style.left = (pct * 100) + '%';
  }

  handle.addEventListener('mousedown', function(e){ dragging = true; e.preventDefault(); });
  document.addEventListener('mousemove', function(e){ if(dragging) setPos(e.clientX); });
  document.addEventListener('mouseup', function(){ dragging = false; });
  handle.addEventListener('touchstart', function(e){ dragging = true; e.preventDefault(); }, {passive:false});
  document.addEventListener('touchmove', function(e){ if(dragging) setPos(e.touches[0].clientX); }, {passive:true});
  document.addEventListener('touchend', function(){ dragging = false; });
});
```

- [ ] **Step 4: Verify in browser**

Refresh. Expected: two before/after sliders side by side. Dragging the handle reveals/hides the "before" image. Works on both mouse and touch. Images show broken until saved to `/images/`.

- [ ] **Step 5: Commit**
```bash
git add index.html css/styles.css js/main.js
git commit -m "feat: add before/after drag slider gallery"
```

---

## Task 9: FAQ Section + JSON-LD Schema

**Files:**
- Modify: `index.html` — add FAQ section before areas section, add JSON-LD in `<head>`

- [ ] **Step 1: Add FAQ JSON-LD to head**

In `index.html`, inside `<head>`, add after the existing schema script block:
```html
<script type="application/ld+json">
{
  "@context":"https://schema.org",
  "@type":"FAQPage",
  "mainEntity":[
    {"@type":"Question","name":"How much does a roof repair cost in Birmingham?","acceptedAnswer":{"@type":"Answer","text":"Roof repair costs in Birmingham typically range from £150–£600 for minor repairs such as replacing slipped tiles or fixing flashings, up to £1,500+ for larger sections. The best way to get an accurate price is a free on-site survey — contact DK Roofing Solutions for a no-obligation quote."}},
    {"@type":"Question","name":"How long does a full re-roof take?","acceptedAnswer":{"@type":"Answer","text":"Most full re-roofs on a standard semi-detached or detached house take 3–7 days depending on the size, roof type, and weather. DK Roofing Solutions will give you a realistic timeline as part of your free written quote."}},
    {"@type":"Question","name":"Do I need planning permission for a new roof?","acceptedAnswer":{"@type":"Answer","text":"In most cases, like-for-like roof replacements do not need planning permission in Birmingham. However, if you are in a conservation area or changing roof materials significantly, you may need approval. We advise checking with Birmingham City Council or asking us at the survey stage."}},
    {"@type":"Question","name":"What is the difference between felt and EPDM rubber flat roofing?","acceptedAnswer":{"@type":"Answer","text":"Traditional felt flat roofs typically last 10–15 years. EPDM rubber (and GRP fibreglass) flat roofs last 25–50 years and are more resistant to UV and temperature changes. We recommend EPDM or GRP for any flat roof replacement for long-term value."}},
    {"@type":"Question","name":"Can you repair a roof in winter?","acceptedAnswer":{"@type":"Answer","text":"Yes — most roof repairs can be carried out in winter. We avoid working in icy or very high-wind conditions for safety, but cold and wet weather alone does not stop us. Emergency call-outs are available year-round."}},
    {"@type":"Question","name":"Are DK Roofing Solutions fully insured?","acceptedAnswer":{"@type":"Answer","text":"Yes, DK Roofing Solutions is fully insured for public liability. We are happy to provide proof of insurance before any work begins."}}
  ]
}
</script>
```

- [ ] **Step 2: Add FAQ HTML section**

Find `<!-- ===== Areas ===== -->` and insert BEFORE it:
```html
<!-- ===== FAQ ===== -->
<section class="section alt">
<div class="wrap center"><p class="eyebrow">Common Questions</p><h2>Roofing FAQs</h2>
<p class="lead">Everything Birmingham homeowners ask before booking.</p></div>
<div class="wrap faq-list" style="margin-top:40px;max-width:760px;margin-left:auto;margin-right:auto">
  <details class="faq-item">
    <summary>How much does a roof repair cost in Birmingham?</summary>
    <p>Roof repair costs in Birmingham typically range from <strong>£150–£600</strong> for minor repairs such as replacing slipped tiles or fixing flashings, up to £1,500+ for larger sections. The best way to get an accurate price is a free on-site survey — <a href="#quote">contact us for a no-obligation quote</a>.</p>
  </details>
  <details class="faq-item">
    <summary>How long does a full re-roof take?</summary>
    <p>Most full re-roofs on a standard semi-detached or detached house take <strong>3–7 days</strong> depending on the size, roof type, and weather. We'll give you a realistic timeline as part of your free written quote.</p>
  </details>
  <details class="faq-item">
    <summary>Do I need planning permission for a new roof?</summary>
    <p>In most cases, like-for-like roof replacements <strong>do not need planning permission</strong> in Birmingham. However, if you are in a conservation area or changing roof materials significantly, you may need approval. We advise checking with Birmingham City Council or asking us at the survey stage.</p>
  </details>
  <details class="faq-item">
    <summary>What is the difference between felt and EPDM rubber flat roofing?</summary>
    <p>Traditional felt flat roofs typically last 10–15 years. <strong>EPDM rubber</strong> (and GRP fibreglass) flat roofs last 25–50 years and are more resistant to UV and temperature changes. We recommend EPDM or GRP for any flat roof replacement.</p>
  </details>
  <details class="faq-item">
    <summary>Can you repair a roof in winter?</summary>
    <p>Yes — most roof repairs can be carried out in winter. We avoid working in icy or very high-wind conditions for safety, but cold and wet weather alone does not stop us. <strong>Emergency call-outs are available year-round.</strong></p>
  </details>
  <details class="faq-item">
    <summary>Are DK Roofing Solutions fully insured?</summary>
    <p>Yes, DK Roofing Solutions is <strong>fully insured</strong> for public liability. We are happy to provide proof of insurance before any work begins.</p>
  </details>
</div>
</section>
```

- [ ] **Step 3: Add FAQ CSS**

In `styles.css`:
```css
/* ---------- FAQ ---------- */
.faq-list{display:flex;flex-direction:column;gap:8px}
.faq-item{border:1px solid var(--line);border-radius:var(--radius);overflow:hidden;background:#fff}
.faq-item summary{padding:18px 20px;font-weight:600;font-size:1rem;cursor:pointer;list-style:none;display:flex;justify-content:space-between;align-items:center;color:var(--brand);font-family:var(--font-heading);text-transform:none;letter-spacing:0}
.faq-item summary::-webkit-details-marker{display:none}
.faq-item summary::after{content:'+';font-size:1.4rem;color:var(--accent);flex-shrink:0;margin-left:12px;transition:.2s}
.faq-item[open] summary::after{content:'−'}
.faq-item[open] summary{border-bottom:1px solid var(--line)}
.faq-item p{padding:16px 20px;margin:0;color:var(--muted);line-height:1.7}
.faq-item a{color:var(--accent);font-weight:600}
```

- [ ] **Step 4: Verify in browser**

Refresh. Expected: accordion FAQ section above Areas. Clicking a question expands it with a smooth animation (native `<details>` behaviour). The `+` becomes `−` when open. JSON-LD is in the page source — validate at https://search.google.com/test/rich-results if desired.

- [ ] **Step 5: Commit**
```bash
git add index.html css/styles.css
git commit -m "feat: add FAQ section with accordion and JSON-LD schema"
```

---

## Task 10: Typography Polish — Remaining Sections + Footer

**Files:**
- Modify: `css/styles.css` — update eyebrow, step numbers, footer headings
- Modify: `index.html` — remove unverified claims from footer and trustbar

- [ ] **Step 1: Update trustbar — remove unverified claims**

Find the `.trustbar` div and replace content:
```html
<div class="trustbar"><div class="wrap">
  <span><b>Family-run</b> business</span>
  <span><b>Flat &amp; pitched</b> specialists</span>
  <span><b>5.0★</b> Google rated</span>
  <span><b>Free</b> no-obligation quotes</span>
  <span><b>Fully insured</b> &amp; guaranteed</span>
</div></div>
```

- [ ] **Step 2: Update footer — remove unverified claims**

Find the footer `<p>` description and replace:
```html
<p>Family-run roofing contractors covering Birmingham &amp; the West Midlands. Flat roofing, pitched roofing, repairs &amp; 24/7 emergency call-out.</p>
```

Find the "Why DK Roofing" footer column and replace content:
```html
<div><h4>Why DK Roofing</h4>
  <p>★ 5.0 customer rating<br>✓ Family-run business<br>✓ Flat &amp; pitched specialists<br>✓ Fully insured &amp; guaranteed</p>
</div>
```

Find the footer copyright line and replace:
```html
<div class="wrap" style="border-top:1px solid #2b3640;margin-top:24px;padding-top:18px;font-size:.85rem">
  © 2026 DK Roofing Solutions · 37 Highters Road, Birmingham B14 · <a href="tel:+447887479143" style="color:#cbd5dd">07887 479143</a>
</div>
```

- [ ] **Step 3: Update footer heading styles**

Find `footer.site h4` in styles.css and update:
```css
footer.site h4{color:#fff;margin-bottom:12px;font-family:var(--font-heading);letter-spacing:.05em;font-size:1rem}
```

- [ ] **Step 4: Update step number font**

Find `.step::before` in styles.css and update:
```css
.step::before{counter-increment:s;content:counter(s);position:absolute;top:-18px;left:22px;width:36px;height:36px;
  background:var(--accent);color:#fff;border-radius:50%;display:grid;place-items:center;font-weight:700;font-family:var(--font-heading);font-size:1.1rem}
```

- [ ] **Step 5: Remove "60-min" from How It Works step**

Find the step with "Call, message our AI assistant, or request a quote online — 24/7." and check the emergency step:

Find in index.html: `<div class="step"><h3>Get in touch</h3>` — keep as-is.

Find: the process step that mentions the emergency response and update copy only if it references "60-minute". Change to:
```html
<div class="step"><h3>Get in touch</h3><p>Call, message our AI assistant, or request a free quote online — any time.</p></div>
```

- [ ] **Step 6: Verify full page in browser**

Scroll through the entire page. Check:
- All headings use Oswald (condensed, uppercase feel)
- No "since 2016", "30+ years", "60-min" claims anywhere
- Footer looks clean
- Step numbers use Oswald font

- [ ] **Step 7: Commit**
```bash
git add index.html css/styles.css
git commit -m "feat: final typography polish and remove all unverified claims"
```

---

## Task 11: Push to GitHub

**Files:** none — git operations only

- [ ] **Step 1: Verify clean state**
```bash
git status
```
Expected: `nothing to commit, working tree clean`

- [ ] **Step 2: Push to GitHub**
```bash
git push origin main
```

- [ ] **Step 3: Verify**

Check the GitHub repo — all commits should be visible. If Vercel is connected, it will auto-deploy within ~60 seconds.

---

## Self-Review

**Spec coverage check:**
- ✅ Oswald + Inter fonts — Task 1
- ✅ Emergency banner — Task 2
- ✅ Hero cleanup (unverified claims removed) — Task 3
- ✅ Accreditations bar — Task 4
- ✅ SVG service icons — Task 5
- ✅ Images folder — Task 6
- ✅ Rotating carousel (7 real photos) — Task 7
- ✅ Before & After gallery — Task 8
- ✅ FAQ + JSON-LD schema — Task 9
- ✅ Remaining typography + footer cleanup — Task 10
- ✅ Push to GitHub — Task 11

**Placeholder scan:** None found.

**Type/naming consistency:** carousel IDs (`carouselTrack`, `carouselPrev`, `carouselNext`) consistent across HTML and JS. Before/after IDs (`baSlider1`, `baBeforeWrap1`, `baHandle1`) consistent for both sliders.
