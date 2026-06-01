# DK Roofing Solutions UK — lead-gen website

Built with the `build-lead-site` skill. Family-run Birmingham roofer (est. 2016).
Models the strongest local roofing competitor and beats it with our USPs.

## Client details (verified from research — confirm before launch)
- **Business:** DK Roofing Solutions UK
- **Phone:** 07887 479143
- **Address:** 37 Highters Road, Birmingham B14 4NA
- **Est:** 2016 · family-run · 30+ yrs combined experience · 5.0★ (~37 reviews)
- **Area:** Birmingham / B13–B14 — Kings Heath, Highters Heath, Maypole, Druids
  Heath, Billesley, Yardley Wood, Moseley, Hall Green, Kings Norton, Shirley, Solihull

## What's here
```
index.html                  Homepage (all sections, DK-tailored)
areas/kings-heath.html      Sample LOCATION money-page (genuinely localised, B14)
css/styles.css              Styles + responsive + chat/estimator UI
js/main.js                  Nav, instant quote estimator, quote-form capture
js/chat-agent.js            ★ AI chat widget (offline lead-capture fallback)
api/chat.example.js         ★ AI backend (Claude API, DK knowledge) — rename to api/chat.js
vercel.json                 Deploy config
```

## USPs over local competitors (none of them have these)
1. **AI chat agent** — answers questions + books quotes 24/7 (flagship)
2. **Instant quote estimator** — ballpark price in seconds
3. **60-minute emergency response** guarantee
4. Before/after-ready portfolio + live-review hook + FAQ/schema

## Still to generate (the SEO matrix)
- **Services:** roof-repairs, flat-roofing, new-roofs, emergency-roofing,
  guttering-fascias-soffits, commercial-roofing
- **Areas:** kings-heath ✅, highters-heath, maypole, druids-heath, billesley,
  yardley-wood, moseley, hall-green, kings-norton, shirley, solihull
- **Service × location combos** for priority terms (e.g. `flat-roofing-kings-heath`)
- contact.html, projects.html, reviews.html, /services/ + /areas/ hub pages
> Each must have genuinely local copy — never duplicate-spin a town name.

## Before go-live
1. Confirm NAP + add real logo, real project photos, real Google reviews.
2. Set the real domain (placeholder used: dkroofingsolutionsuk.co.uk).
3. **AI agent:** `npm i @anthropic-ai/sdk`, rename `api/chat.example.js` →
   `api/chat.js`, set `ANTHROPIC_API_KEY` in Vercel env. Wire `saveLead()` to email/CRM.
4. Wire the quote form (`__submitQuote` in main.js) to your lead endpoint.
5. Deploy: GitHub repo → Vercel. Connect/verify Google Business Profile.
