/* AI Chat Agent backend (Vercel serverless function) — DK Roofing Solutions UK.
   Rename to api/chat.js and set ANTHROPIC_API_KEY in Vercel env vars to go live.
   npm i @anthropic-ai/sdk

   Powers the flagship USP: a 24/7 assistant that answers roofing questions,
   qualifies the visitor, and captures/books a quote. */

import Anthropic from '@anthropic-ai/sdk';
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// --- Per-client knowledge ---
const BUSINESS = `
Company: DK Roofing Solutions UK — family-run roofing contractor, established 2016,
  30+ years combined experience, 5.0-star rated, based at 37 Highters Road, Birmingham B14 4NA.
Phone: 07887 479143 (24/7 emergency). Covers Birmingham & the West Midlands.
Services: roof repairs (leaks, slipped/broken tiles & slates, ridge & flashing);
  flat roofing (EPDM rubber & GRP fibreglass); new roofs / re-roofing (tile & slate);
  24/7 emergency & storm damage (60-min response); guttering, fascias & soffits;
  commercial roofing.
Areas: Kings Heath, Highters Heath, Maypole, Druids Heath, Billesley, Yardley Wood,
  Moseley, Hall Green, Kings Norton, Shirley, Solihull and surrounding Birmingham.
Trust: family-run since 2016, fully insured, workmanship guarantee, honest fixed
  quotes, free no-obligation quotes, known for fast response and tidy work.
Guide prices (NEVER quote as firm — always say "rough guide, book a free survey for exact"):
  roof repair £150–£2,500; flat roof £1,200–£9,000; re-roof £3,500–£18,000.
`;

const SYSTEM = `You are the friendly assistant for DK Roofing Solutions UK, a family-run
Birmingham roofer. Goals, in order: (1) answer the visitor's roofing question helpfully
and briefly; (2) qualify the job (what, where, urgency); (3) capture their name + phone
and book a free quote/callback. Keep replies short (1-3 sentences), warm, British English.
Only discuss this business. Never invent firm prices — give the guide range and route to a
free survey. If it's an emergency/leak, tell them to call 07887 479143 for the 60-minute
response. When you have name + phone + job, call the capture_lead tool.

BUSINESS INFO:\n${BUSINESS}`;

const tools = [{
  name: 'capture_lead',
  description: 'Save a qualified roofing enquiry once you have name, phone and the job.',
  input_schema: { type:'object', required:['name','phone','job'], properties:{
    name:{type:'string'}, phone:{type:'string'}, area:{type:'string'},
    job:{type:'string'}, urgency:{type:'string', enum:['emergency','soon','planning']} } }
}];

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error:'POST only' });
  const { messages } = req.body || {};
  try {
    const r = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',   // fast + cheap for chat; bump to sonnet if needed
      max_tokens: 400,
      system: [{ type:'text', text: SYSTEM, cache_control:{ type:'ephemeral' } }], // prompt caching
      tools,
      messages: messages.map(m => ({ role: m.role, content: m.content }))
    });

    for (const block of r.content) {
      if (block.type === 'tool_use' && block.name === 'capture_lead') {
        await saveLead(block.input);   // email / Google Sheet / CRM
        return res.status(200).json({ reply:
          `Thanks ${block.input.name}! ✅ You're booked for a free callback on ${block.input.phone}. ` +
          `Urgent? Call 07887 479143 now — we respond within 60 minutes.` });
      }
    }
    const text = r.content.find(b => b.type === 'text')?.text || "Sorry, could you say that again?";
    return res.status(200).json({ reply: text });
  } catch (e) {
    console.error(e);
    return res.status(200).json({ reply:
      "I'm having a moment — please call us on 07887 479143 and we'll sort your roof right away." });
  }
}

async function saveLead(lead) {
  // TODO: wire to email (Resend), Google Sheets, or your CRM.
  console.log('LEAD →', lead);
}
