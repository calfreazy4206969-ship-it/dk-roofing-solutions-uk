/* DK Roofing Solutions UK — static page generator.
   Builds the full local-SEO matrix: service pages, area pages, hub pages,
   and service×location combo pages. Each page weaves UNIQUE per-service and
   per-area copy (never a town-name swap). Run:  node generate.js
   Reuse for future clients by editing BRAND/PHONE + SERVICES + AREAS. */
const fs = require('fs');
const path = require('path');
const ROOT = __dirname;

const BRAND = 'DK Roofing Solutions UK';
const PHONE = '07887 479143';
const TEL = '+447887479143';
const ADDR = '37 Highters Road, Birmingham B14 4NA';
const BASE = 'https://www.dkroofingsolutionsuk.co.uk';
const RATING = { value: '5.0', count: '37' };

// ---------- shared chrome (root-absolute paths → deploy from domain root) ----------
const head = ({ title, desc, canonical, schema }) => `<!DOCTYPE html>
<html lang="en-GB">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${desc}">
<link rel="canonical" href="${canonical}">
<link rel="stylesheet" href="/css/styles.css">
<script type="application/ld+json">${JSON.stringify(schema)}</script>
</head>
<body>`;

const topbar = (label) => `
<div class="topbar"><div class="wrap">
  <span>⚡ ${label} — <a href="tel:${TEL}">${PHONE}</a></span>
  <span class="badges"><span>★ 5.0 Google</span><span>Family-run since 2016</span><span>Fully Insured</span></span>
</div></div>`;

const header = `
<header class="site"><div class="wrap">
  <a href="/" class="logo">DK<b>Roofing</b></a>
  <nav class="main" id="nav">
    <a href="/services/">Services</a>
    <a href="/services/roof-repairs.html">Roof Repairs</a>
    <a href="/services/flat-roofing.html">Flat Roofing</a>
    <a href="/areas/">Areas</a>
    <a href="/projects.html">Projects</a>
    <a href="/reviews.html">Reviews</a>
    <a href="/contact.html">Contact</a>
  </nav>
  <div class="header-cta">
    <a class="header-phone" href="tel:${TEL}">${PHONE}</a>
    <a class="btn btn-primary" href="#quote">Free Quote</a>
    <button class="nav-toggle" id="navToggle" aria-label="Menu">☰</button>
  </div>
</div></header>`;

const quoteForm = (placeholderPostcode = 'B14') => `
<section class="section cta-band" id="quote"><div class="wrap" style="max-width:560px">
  <p class="eyebrow" style="color:#ffd0bb">Free · No Obligation</p>
  <h2>Get Your Free Roofing Quote</h2>
  <form class="quote-form" onsubmit="return window.__submitQuote(event)">
    <input name="name" placeholder="Your name" required>
    <input name="phone" type="tel" placeholder="Phone number" required>
    <input name="postcode" placeholder="Postcode (e.g. ${placeholderPostcode})" required>
    <select name="job" required><option value="">What do you need?</option>
      <option>Roof repair</option><option>Flat roofing</option><option>New roof / re-roof</option>
      <option>Emergency / storm damage</option><option>Guttering / fascias</option><option>Commercial</option></select>
    <textarea name="message" placeholder="Tell us about the job (optional)"></textarea>
    <button class="btn btn-primary" type="submit">Send My Free Quote Request</button>
  </form>
</div></section>`;

const footer = `
<footer class="site"><div class="wrap">
  <div><div class="logo" style="color:#fff">DK<b>Roofing</b></div>
  <p>Family-run roofers covering Birmingham &amp; the West Midlands since 2016.</p>
  <p><b style="color:#fff">Call:</b> <a href="tel:${TEL}" style="display:inline">${PHONE}</a><br>
  <b style="color:#fff">Find us:</b> ${ADDR}</p></div>
  <div><h4>Services</h4>
    <a href="/services/roof-repairs.html">Roof Repairs</a><a href="/services/flat-roofing.html">Flat Roofing</a>
    <a href="/services/new-roofs.html">New Roofs &amp; Re-Roofing</a><a href="/services/emergency-roofing.html">Emergency Roofing</a>
    <a href="/services/guttering-fascias-soffits.html">Guttering &amp; Fascias</a><a href="/services/commercial-roofing.html">Commercial</a></div>
  <div><h4>Areas We Cover</h4>
    <a href="/areas/kings-heath.html">Kings Heath</a><a href="/areas/moseley.html">Moseley</a>
    <a href="/areas/hall-green.html">Hall Green</a><a href="/areas/solihull.html">Solihull</a>
    <a href="/areas/">All areas →</a></div>
  <div><h4>Why DK Roofing</h4>
    <p>★ 5.0 customer rating<br>✓ Family-run since 2016<br>✓ 30+ yrs combined experience<br>✓ Fully insured &amp; guaranteed</p></div>
</div>
<div class="wrap" style="border-top:1px solid #2b3640;margin-top:24px;padding-top:18px;font-size:.85rem">
  © 2026 ${BRAND} · ${ADDR} · Keep NAP identical to your Google Business Profile.
</div></footer>`;

const chrome = (sub) => `
<div class="mobile-bar"><a class="call" href="tel:${TEL}">📞 Call Now</a><a class="quote" href="#quote">Free Quote</a></div>
<button id="chat-launcher">💬 Ask / Book a Quote</button>
<div id="chat-panel"><header><div><b>DK Roofing Assistant</b><div class="sub">24/7 · ${sub}</div></div>
  <button id="chat-close" style="background:none;border:0;color:#fff;font-size:1.3rem;cursor:pointer">×</button></header>
  <div id="chat-log"></div>
  <form id="chat-form"><input id="chat-input" placeholder="Type your question…" autocomplete="off"><button type="submit">➤</button></form>
</div>
<script src="/js/main.js"></script>
<script src="/js/chat-agent.js"></script>
</body></html>`;

const reviewsBlock = (reviews) => `
<section class="section alt"><div class="wrap center"><h2>What local homeowners say</h2></div>
<div class="wrap grid reviews" style="margin-top:24px">
  ${reviews.map(r => `<div class="review"><div class="stars">★★★★★</div><p>"${r.t}"</p><cite>— ${r.c}</cite></div>`).join('\n  ')}
</div>
<p class="center" style="margin-top:16px"><em style="color:var(--muted)">Replace with your real Google reviews before launch.</em></p>
</section>`;

const localBiz = (name, area) => ({
  '@context':'https://schema.org','@type':'RoofingContractor', name,
  telephone:`+44 ${PHONE.replace(/^0/,'').replace(/ /g,' ')}`, ...(area?{areaServed:area}:{}),
  address:{'@type':'PostalAddress',streetAddress:'37 Highters Road',addressLocality:'Birmingham',addressRegion:'West Midlands',postalCode:'B14 4NA',addressCountry:'GB'},
  aggregateRating:{'@type':'AggregateRating',ratingValue:RATING.value,reviewCount:RATING.count}
});

// ---------- DATA: services (unique copy each) ----------
const SERVICES = [
  { slug:'roof-repairs', name:'Roof Repairs', short:'fast, guaranteed roof repairs',
    intro:'A small roof problem becomes an expensive one fast. We find the real cause of leaks and fix it properly — from a single slipped tile to failed flashing and worn pointing.',
    process:['Free inspection to find the true source of the leak (not just the symptom)','Clear, fixed written quote before any work starts','Tidy repair using matched materials','Final check and clean-up, backed by our workmanship guarantee'],
    types:['Slipped &amp; broken tiles and slates','Ridge &amp; hip re-bedding and re-pointing','Lead flashing repairs around chimneys &amp; valleys','Leak detection &amp; damp tracing','Chimney &amp; pointing repairs'],
    faqs:[['How quickly can you come out?','Usually same or next day for repairs, and within 60 minutes for emergencies — just call '+PHONE+'.'],['Do you charge for a quote?','No. Inspections and written quotes are free and no-obligation.']] },
  { slug:'flat-roofing', name:'Flat Roofing', short:'long-lasting EPDM &amp; GRP flat roofs',
    intro:'Old felt flat roofs crack, blister and leak. We install modern EPDM rubber and GRP fibreglass systems that look better and last decades — ideal for extensions, dormers, garages and bays.',
    process:['Strip back and inspect the existing deck, replacing any rotten timber','Recommend EPDM or GRP based on the roof and budget','Install with fully-bonded, seamless membranes','Finish with trims and outlets, guaranteed for years to come'],
    types:['EPDM rubber flat roofs (single seamless sheet)','GRP fibreglass flat roofs (hard-wearing, walkable)','Warm &amp; cold flat roof build-ups','Dormer, garage, porch &amp; extension roofs'],
    faqs:[['How long does a flat roof last?','A quality EPDM or GRP roof can last 20–30+ years — far longer than old felt.'],['Can you walk on it?','GRP is walkable and ideal for balconies; we will advise the best option for your use.']] },
  { slug:'new-roofs', name:'New Roofs &amp; Re-Roofing', short:'full re-roofs in tile &amp; slate',
    intro:'When repairs no longer make sense, a full re-roof gives you decades of peace of mind. We strip, re-felt, re-batten and re-cover your roof to current standards in tile or slate.',
    process:['Full survey and honest advice on repair vs re-roof','Scaffold, strip and inspect the structure','New breathable membrane, battens, tiles/slates, ridge &amp; flashings','Site cleared, waste removed, and a long guarantee on the work'],
    types:['Full pitched re-roofs in concrete or clay tile','Natural &amp; reconstituted slate roofs','New breathable felt &amp; batten upgrades','Ridge, hip &amp; verge renewal','Insulation &amp; ventilation improvements'],
    faqs:[['How long does a re-roof take?','Most domestic re-roofs take 3–7 days depending on size and weather.'],['Will I need planning permission?','Like-for-like re-roofing normally falls under permitted development — we will advise.']] },
  { slug:'emergency-roofing', name:'Emergency &amp; Storm Damage', short:'24/7 emergency roofing, 60-minute response',
    intro:'Roof blown off in a storm or water pouring in? We respond fast, make your roof safe and watertight, and help with the insurance paperwork.',
    process:['Call '+PHONE+' any time — we aim to respond within 60 minutes','Make safe: temporary covering to stop water ingress','Assess the damage and provide a clear repair quote','Permanent repair and documentation for your insurer'],
    types:['Storm &amp; wind damage','Emergency leak &amp; water ingress','Fallen tiles &amp; slates','Temporary tarping &amp; make-safe','Insurance-work repairs'],
    faqs:[['Do you really come out 24/7?','Yes — for genuine emergencies we aim to be with you within the hour, day or night.'],['Can you deal with my insurer?','We provide reports and photos to support your claim and can liaise with your insurer.']] },
  { slug:'guttering-fascias-soffits', name:'Guttering, Fascias &amp; Soffits', short:'roofline repairs &amp; replacement',
    intro:'Your roofline protects your walls and foundations. We repair and replace guttering, fascias and soffits in low-maintenance uPVC to keep water where it belongs — away from your home.',
    process:['Inspect the full roofline for leaks, sagging and rot','Quote for repair or full replacement','Fit new uPVC fascias, soffits and seamless guttering','Clear up and check fall &amp; drainage across the run'],
    types:['uPVC fascias &amp; soffits','Seamless &amp; sectional guttering','Downpipes &amp; drainage','Gutter cleaning &amp; realignment','Bargeboards &amp; cladding'],
    faqs:[['Why do my gutters keep overflowing?','Usually blockages, poor falls or splits — we will diagnose and put it right.'],['Is uPVC really maintenance-free?','It needs no painting and just an occasional wipe — far less hassle than timber.']] },
  { slug:'commercial-roofing', name:'Commercial Roofing', short:'commercial &amp; industrial roofing',
    intro:'We keep Birmingham businesses, landlords and managing agents covered with reliable flat and industrial roofing — planned works or rapid repairs, with minimal disruption to your operation.',
    process:['Site survey and condition report','Costed options for repair, overlay or replacement','Works scheduled around your business hours','Maintenance plans to extend roof life and avoid surprises'],
    types:['Commercial flat roofs (EPDM, GRP, single-ply)','Industrial &amp; warehouse roofing','Landlord &amp; rental property roofing','Planned maintenance &amp; inspections','Gutter &amp; roofline maintenance'],
    faqs:[['Can you work out of hours?','Yes — we schedule around your business to minimise disruption.'],['Do you offer maintenance contracts?','We do — regular inspections catch problems early and protect your investment.']] }
];

// ---------- DATA: areas (unique local copy each) ----------
const A = (slug,name,postcode,neighbourhoods,propertyTypes,localNote,reviews) =>
  ({slug,name,postcode,neighbourhoods,propertyTypes,localNote,reviews});
const AREAS = [
  A('kings-heath','Kings Heath','B14',['the High Street','York Road','Highbury Park','Highbury'],
    'Victorian and Edwardian terraces and 1930s semis',
    'Based on Highters Road in B14, Kings Heath is genuinely our local patch — we are minutes away for fast call-outs and we know the area inside out.',
    [{t:'Dan came out the same day for a leak, clean and tidy and honest about the work. Brilliant local roofer.',c:'Customer, Kings Heath'},{t:'Great response time and great value. Sorted our flat roof with no fuss at all.',c:'Customer, B14'}]),
  A('highters-heath','Highters Heath','B14',['Highters Heath Lane','Maypole','Druids Heath'],
    '1930s semis and post-war housing',
    'Highters Heath is right on our doorstep in B14, so we are often only streets away when a roof needs attention.',
    [{t:'Quick, local and fairly priced — replaced our ridge tiles after a storm. Spot on.',c:'Customer, Highters Heath'},{t:'Honest advice and a tidy job. Couldn\'t ask for more from a local roofer.',c:'Customer, B14'}]),
  A('maypole','Maypole','B14',['Alcester Road South','Druids Heath','Yardley Wood'],
    'semis and terraces with a mix of pitched and flat extension roofs',
    'Maypole sits at the southern edge of B14 near our base, so we cover it constantly — from quick repairs to full re-roofs.',
    [{t:'New flat roof on the kitchen extension — neat work and a long guarantee. Very happy.',c:'Customer, Maypole'},{t:'Reliable and local, turned up exactly when they said they would.',c:'Customer, B14'}]),
  A('druids-heath','Druids Heath','B14',['Pound Road','Maypole','Walkers Heath'],
    'post-war housing and a number of flat-roofed properties',
    'Druids Heath has plenty of flat and low-pitch roofs where old felt fails — exactly the kind of work our EPDM and GRP systems are built for.',
    [{t:'Replaced a leaking felt roof with rubber — no more drips and it looks great.',c:'Customer, Druids Heath'},{t:'Fair price, no mess, friendly team. Recommended to my neighbour already.',c:'Customer, B14'}]),
  A('billesley','Billesley','B13',['Billesley Common','Brook Lane','Yardley Wood Road'],
    '1930s semis and inter-war terraces',
    'Billesley\'s inter-war semis often need ridge re-bedding and flashing repairs — bread-and-butter work we do all over B13.',
    [{t:'Re-pointed the ridge and fixed the chimney flashing. Leak gone, great job.',c:'Customer, Billesley'},{t:'Punctual, professional and good value. Would use again without hesitation.',c:'Customer, B13'}]),
  A('yardley-wood','Yardley Wood','B14',['Yardley Wood Road','School Road','Trittiford Park'],
    'semis and terraces, many with rear extensions',
    'Yardley Wood is minutes from our B14 base, and its many rear extensions keep us busy with flat roofing and guttering work.',
    [{t:'Sorted our guttering and soffits — looks brand new and no more overflow.',c:'Customer, Yardley Wood'},{t:'Quick to respond and left everything spotless. Top local roofer.',c:'Customer, B14'}]),
  A('moseley','Moseley','B13',['Moseley Village','St Mary\'s Row','Alcester Road','Moseley Park'],
    'large Victorian villas and period terraces, some in the conservation area',
    'Moseley\'s grand Victorian roofs and conservation areas need a careful, sympathetic approach — we match slates and details to keep the character intact.',
    [{t:'Beautiful slate repair on our Victorian roof — matched perfectly. True craftsmen.',c:'Customer, Moseley'},{t:'Respectful of the property and the conservation rules. Excellent work.',c:'Customer, B13'}]),
  A('hall-green','Hall Green','B28',['Stratford Road','Robin Hood','Sarehole Mill','Cole Bank Road'],
    '1930s semis and detached homes',
    'Hall Green\'s 1930s housing is classic re-roof and repair territory, and we cover all of B28 from nearby B14.',
    [{t:'Full re-roof on our semi — fixed price, finished early, immaculate finish.',c:'Customer, Hall Green'},{t:'Great communication from quote to completion. Highly recommend.',c:'Customer, B28'}]),
  A('kings-norton','Kings Norton','B30',['The Green','Pershore Road South','Cotteridge','Wharf Road'],
    'a mix of period cottages near The Green and inter-war semis',
    'Kings Norton ranges from historic properties around The Green to inter-war semis — we tailor every job to the roof in front of us.',
    [{t:'Honest about what did and didn\'t need doing — saved us money. Trustworthy.',c:'Customer, Kings Norton'},{t:'Tidy, reliable and fairly priced. Exactly what you want from a roofer.',c:'Customer, B30'}]),
  A('shirley','Shirley','B90',['Stratford Road','Solihull Lodge','Haslucks Green Road'],
    'semis, detached homes and bungalows',
    'Shirley borders our patch to the south-east, and its detached homes and bungalows often need re-roofs and roofline work — all of which we cover.',
    [{t:'New roof and fascias — the house looks ten years younger. Brilliant team.',c:'Customer, Shirley'},{t:'Prompt, polite and great value. No complaints at all.',c:'Customer, B90'}]),
  A('solihull','Solihull','B91',['Solihull town centre','Olton','Shirley','Touchwood'],
    'detached homes, larger properties and quality semis',
    'Solihull homeowners expect a high standard, and our re-roofs, flat roofs and repairs are finished to match — fully insured and guaranteed.',
    [{t:'Meticulous re-roof on our detached house. Clean, professional, guaranteed.',c:'Customer, Solihull'},{t:'From quote to clean-up, faultless. Worth every penny.',c:'Customer, B91'}])
];

// ---------- page builders ----------
function servicePage(s){
  const title = `${s.name.replace(/&amp;/g,'&')} in Birmingham | ${BRAND}`;
  const html = head({title,
    desc:`${s.name.replace(/&amp;/g,'&')} across Birmingham by ${BRAND} — family-run since 2016, fully insured, free quotes. Call ${PHONE}.`,
    canonical:`${BASE}/services/${s.slug}.html`, schema:localBiz(`${BRAND} — ${s.name.replace(/&amp;/g,'&')}`,'Birmingham')})
  + topbar(`24/7 Emergency Roofing`) + header
  + `<section class="hero"><div class="wrap">
      <p class="eyebrow" style="color:#ffd0bb">Birmingham Roofing Specialists</p>
      <h1>${s.name}</h1><p>${s.intro}</p>
      <div class="hero-cta"><a class="btn btn-primary" href="#quote">Get My Free Quote</a>
      <a class="btn btn-call" href="tel:${TEL}">📞 ${PHONE}</a></div>
      <div class="hero-trust"><span class="stars">★★★★★</span><span>5.0 rated · family-run since 2016</span>
      <span class="badge-pill">⚡ 60-min emergency response</span></div></div></section>`
  + `<div class="trustbar"><div class="wrap"><span><b>Fixed</b> written quotes</span><span><b>Fully insured</b></span><span><b>Workmanship</b> guarantee</span><span><b>Free</b> inspections</span></div></div>`
  + `<section class="section"><div class="wrap" style="max-width:820px">
      <h2>Our ${s.name.toLowerCase()} process</h2>
      <div class="grid steps" style="margin:30px 0">${s.process.map(p=>`<div class="step"><p>${p}</p></div>`).join('')}</div>
      <h3>What we cover</h3><ul style="line-height:2">${s.types.map(t=>`<li>${t}</li>`).join('')}</ul>
      <h3 style="margin-top:30px">FAQs</h3>${s.faqs.map(f=>`<p><strong>${f[0]}</strong><br>${f[1]}</p>`).join('')}
      </div></section>`
  + `<section class="section alt"><div class="wrap center"><h2>${s.name} across Birmingham</h2>
      <p class="lead">We cover every local area — pick yours:</p>
      <div class="areas" style="justify-content:center;margin-top:18px">${AREAS.map(a=>`<a href="/services/${s.slug}-${a.slug}.html">${a.name}</a>`).join('')}</div></div></section>`
  + quoteForm() + footer + chrome('Birmingham');
  write(`services/${s.slug}.html`, html);
}

function areaPage(a){
  const title = `Roofers in ${a.name} | Roof Repairs &amp; New Roofs | ${BRAND}`;
  const html = head({title,
    desc:`Local roofers in ${a.name}, Birmingham (${a.postcode}). ${BRAND} — repairs, flat roofs, re-roofing &amp; emergency storm damage. 5★, free quotes. Call ${PHONE}.`,
    canonical:`${BASE}/areas/${a.slug}.html`, schema:localBiz(`${BRAND} — ${a.name}`,`${a.name}, Birmingham`)})
  + topbar(`24/7 Emergency Roofing in ${a.name}`) + header
  + `<section class="hero"><div class="wrap">
      <p class="eyebrow" style="color:#ffd0bb">${a.name} Roofing Specialists</p>
      <h1>Trusted Roofers in ${a.name}</h1>
      <p>Repairs, flat roofs and full re-roofs across ${a.name} (${a.postcode}). ${a.localNote} Family-run since 2016, fully insured, 5★ rated.</p>
      <div class="hero-cta"><a class="btn btn-primary" href="#quote">Get My Free Quote</a>
      <a class="btn btn-call" href="tel:${TEL}">📞 ${PHONE}</a></div>
      <div class="hero-trust"><span class="stars">★★★★★</span><span>5.0 / 5 from local customers</span>
      <span class="badge-pill">⚡ 60-min emergency response</span></div></div></section>`
  + `<div class="trustbar"><div class="wrap"><span><b>Local</b> to ${a.name}</span><span><b>Since 2016</b> family-run</span><span><b>Workmanship</b> guarantee</span><span><b>Free</b> quotes</span></div></div>`
  + `<section class="section"><div class="wrap" style="max-width:820px">
      <h2>Roofing in ${a.name}, done properly</h2>
      <p class="lead">${a.localNote}</p>
      <p>${a.name} is known for ${a.propertyTypes}, and we know the issues they bring — from slipped tiles and worn pointing to tired flat roofs on rear extensions. We work right across ${a.neighbourhoods.slice(0,3).join(', ')} and the rest of ${a.postcode}, always with an honest fixed quote and a tidy, insured crew.</p>
      <h3>Our ${a.name} roofing services</h3><ul style="line-height:2">
        <li><strong>Roof repairs</strong> — leaks, slipped/broken tiles, ridge &amp; flashing</li>
        <li><strong>Flat roofing</strong> — EPDM rubber &amp; GRP fibreglass</li>
        <li><strong>New roofs &amp; re-roofing</strong> — tile &amp; slate</li>
        <li><strong>Emergency &amp; storm damage</strong> — 24/7, 60-minute response</li>
        <li><strong>Guttering, fascias &amp; soffits</strong></li></ul>
      <p style="margin-top:18px"><em style="color:var(--muted)">Add real ${a.name} project photos here.</em></p></div></section>`
  + reviewsBlock(a.reviews)
  + `<section class="section"><div class="wrap center"><h2>Covering ${a.name} &amp; nearby</h2>
      <p class="lead">${a.neighbourhoods.join(' · ')} · ${a.postcode}</p>
      <iframe title="${a.name} service area" width="100%" height="320" style="border:0;border-radius:14px;margin-top:18px" loading="lazy" src="https://www.google.com/maps?q=${encodeURIComponent(a.name+' Birmingham')}&output=embed"></iframe></div></section>`
  + quoteForm(a.postcode) + footer + chrome(a.name);
  write(`areas/${a.slug}.html`, html);
}

function comboPage(s,a){
  const sName = s.name.replace(/&amp;/g,'&');
  const title = `${sName} in ${a.name} | ${BRAND}`;
  const html = head({title,
    desc:`${sName} in ${a.name}, Birmingham (${a.postcode}). ${BRAND} — family-run, fully insured, free quotes. Call ${PHONE}.`,
    canonical:`${BASE}/services/${s.slug}-${a.slug}.html`, schema:localBiz(`${BRAND} — ${sName} ${a.name}`,`${a.name}, Birmingham`)})
  + topbar(`${sName} in ${a.name} · 24/7`) + header
  + `<section class="hero"><div class="wrap">
      <p class="eyebrow" style="color:#ffd0bb">${a.name} · ${a.postcode}</p>
      <h1>${s.name} in ${a.name}</h1>
      <p>Looking for ${s.short} in ${a.name}? ${a.localNote} We deliver ${sName.toLowerCase()} with honest fixed quotes and a workmanship guarantee.</p>
      <div class="hero-cta"><a class="btn btn-primary" href="#quote">Get My Free Quote</a>
      <a class="btn btn-call" href="tel:${TEL}">📞 ${PHONE}</a></div>
      <div class="hero-trust"><span class="stars">★★★★★</span><span>5.0 rated in ${a.name}</span>
      <span class="badge-pill">⚡ 60-min emergency response</span></div></div></section>`
  + `<div class="trustbar"><div class="wrap"><span><b>Local</b> to ${a.name}</span><span><b>Fixed</b> quotes</span><span><b>Fully insured</b></span><span><b>Guaranteed</b> work</span></div></div>`
  + `<section class="section"><div class="wrap" style="max-width:820px">
      <h2>${s.name} for ${a.name} homes</h2>
      <p class="lead">${s.intro}</p>
      <p>${a.name} is full of ${a.propertyTypes}, so our ${sName.toLowerCase()} is tailored to exactly those roofs. We work across ${a.neighbourhoods.slice(0,3).join(', ')} and the wider ${a.postcode} area.</p>
      <h3>How we work</h3><div class="grid steps" style="margin:24px 0">${s.process.map(p=>`<div class="step"><p>${p}</p></div>`).join('')}</div>
      <h3>What we cover</h3><ul style="line-height:2">${s.types.map(t=>`<li>${t}</li>`).join('')}</ul></div></section>`
  + reviewsBlock(a.reviews)
  + `<section class="section alt"><div class="wrap center"><h2>Other services in ${a.name}</h2>
      <div class="areas" style="justify-content:center;margin-top:16px">${SERVICES.filter(x=>x.slug!==s.slug).map(x=>`<a href="/services/${x.slug}-${a.slug}.html">${x.name} in ${a.name}</a>`).join('')}</div></div></section>`
  + quoteForm(a.postcode) + footer + chrome(`${a.name}`);
  write(`services/${s.slug}-${a.slug}.html`, html);
}

function servicesHub(){
  const html = head({title:`Roofing Services in Birmingham | ${BRAND}`,
    desc:`Full roofing services across Birmingham — repairs, flat roofs, re-roofing, emergency, guttering &amp; commercial. ${BRAND}, family-run since 2016. Call ${PHONE}.`,
    canonical:`${BASE}/services/`, schema:localBiz(BRAND,'Birmingham')})
  + topbar('24/7 Emergency Roofing') + header
  + `<section class="hero"><div class="wrap"><p class="eyebrow" style="color:#ffd0bb">What We Do</p>
      <h1>Roofing Services in Birmingham</h1><p>Every service below has its own page and covers every local area we serve.</p>
      <div class="hero-cta"><a class="btn btn-primary" href="#quote">Get My Free Quote</a><a class="btn btn-call" href="tel:${TEL}">📞 ${PHONE}</a></div></div></section>`
  + `<section class="section"><div class="wrap grid cards">${SERVICES.map(s=>`<div class="card"><h3>${s.name}</h3><p>${s.intro.split('.')[0]}.</p><a class="more" href="/services/${s.slug}.html">Learn more →</a></div>`).join('')}</div></section>`
  + quoteForm() + footer + chrome('Birmingham');
  write('services/index.html', html);
}

function areasHub(){
  const html = head({title:`Areas We Cover | Roofers Across Birmingham | ${BRAND}`,
    desc:`${BRAND} covers Kings Heath, Moseley, Hall Green, Solihull and all of south Birmingham. Family-run, 5★, free quotes. Call ${PHONE}.`,
    canonical:`${BASE}/areas/`, schema:localBiz(BRAND,'Birmingham')})
  + topbar('24/7 Emergency Roofing') + header
  + `<section class="hero"><div class="wrap"><p class="eyebrow" style="color:#ffd0bb">Areas We Cover</p>
      <h1>Roofers Across Birmingham &amp; the West Midlands</h1><p>Based in B14 — we cover all of south Birmingham and beyond. Find your area:</p>
      <div class="hero-cta"><a class="btn btn-primary" href="#quote">Get My Free Quote</a><a class="btn btn-call" href="tel:${TEL}">📞 ${PHONE}</a></div></div></section>`
  + `<section class="section"><div class="wrap grid cards">${AREAS.map(a=>`<div class="card"><h3>${a.name}</h3><p>Local roofers covering ${a.name} (${a.postcode}) and ${a.neighbourhoods[0]}.</p><a class="more" href="/areas/${a.slug}.html">${a.name} roofers →</a></div>`).join('')}</div></section>`
  + quoteForm() + footer + chrome('Birmingham');
  write('areas/index.html', html);
}

function simplePage(slug,title,h1,body){
  const html = head({title:`${title} | ${BRAND}`, desc:`${title} — ${BRAND}, family-run Birmingham roofers. Call ${PHONE}.`,
    canonical:`${BASE}/${slug}.html`, schema:localBiz(BRAND,'Birmingham')})
  + topbar('24/7 Emergency Roofing') + header
  + `<section class="hero"><div class="wrap"><h1>${h1}</h1></div></section>`
  + `<section class="section"><div class="wrap" style="max-width:820px">${body}</div></section>`
  + quoteForm() + footer + chrome('Birmingham');
  write(`${slug}.html`, html);
}

// ---------- write everything ----------
function write(rel, html){
  const p = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(p), {recursive:true});
  fs.writeFileSync(p, html);
  count++;
}
let count = 0;

SERVICES.forEach(servicePage);
AREAS.forEach(areaPage);
servicesHub();
areasHub();
// priority service×location combos: top 3 services × every area
const COMBO_SERVICES = ['roof-repairs','flat-roofing','emergency-roofing'];
SERVICES.filter(s=>COMBO_SERVICES.includes(s.slug)).forEach(s=>AREAS.forEach(a=>comboPage(s,a)));
simplePage('contact','Contact Us','Contact DK Roofing Solutions UK',
  `<p class="lead">Call <a href="tel:${TEL}">${PHONE}</a> or use the form below for a free, no-obligation quote.</p>
   <p><strong>Address:</strong> ${ADDR}<br><strong>Hours:</strong> 24/7 for emergencies.</p>
   <iframe title="DK Roofing location" width="100%" height="320" style="border:0;border-radius:14px;margin-top:18px" loading="lazy" src="https://www.google.com/maps?q=${encodeURIComponent(ADDR)}&output=embed"></iframe>`);
simplePage('projects','Our Projects','Recent Roofing Projects',
  `<p class="lead">A selection of recent roofs across Birmingham. <em>Add real before/after project photos here.</em></p>
   <div class="grid cards"><div class="card"><h3>Re-roof — Hall Green</h3><p>Full tile re-roof, completed in 5 days.</p></div>
   <div class="card"><h3>EPDM flat roof — Kings Heath</h3><p>New rubber roof on a rear extension.</p></div>
   <div class="card"><h3>Storm repair — Moseley</h3><p>Emergency make-safe and slate replacement.</p></div></div>`);
simplePage('reviews','Customer Reviews','What Our Customers Say',
  `<p class="lead">★ 5.0 / 5 — trusted across Birmingham since 2016. <em>Embed your live Google reviews here.</em></p>`
  + reviewsBlock(AREAS.flatMap(a=>a.reviews).slice(0,6)));

console.log(`Generated ${count} pages.`);
