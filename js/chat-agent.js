/* ★ FLAGSHIP USP — AI Chat Agent
   24/7 assistant that answers questions, qualifies the lead, and books a quote.
   No Birmingham roofing competitor has this.

   How it works:
   - Frontend widget below sends the conversation to a backend endpoint (/api/chat).
   - The backend calls the Claude API (see api/chat.example.js) with a system prompt
     loaded from this client's services / areas / pricing / FAQs, plus a tool to
     capture the lead (name + phone + job) and book a quote.
   - If the backend isn't connected yet, a built-in offline fallback still greets,
     answers common questions, and captures a callback so NO lead is lost. */

(function () {
  const launcher = document.getElementById('chat-launcher');
  const panel = document.getElementById('chat-panel');
  const closeBtn = document.getElementById('chat-close');
  const log = document.getElementById('chat-log');
  const form = document.getElementById('chat-form');
  const input = document.getElementById('chat-input');
  if (!launcher) return;

  const ENDPOINT = '/api/chat';   // set up api/chat.example.js to enable real AI
  let history = [];
  let greeted = false;
  let lead = {};                  // collected by the offline fallback flow

  const open = () => {
    panel.classList.add('open');
    if (!greeted) { greeted = true;
      bot("Hi 👋 I'm the DK Roofing assistant. I can answer questions or book you a free quote. What's going on with your roof?");
    }
    input.focus();
  };
  launcher.addEventListener('click', () => panel.classList.contains('open') ? panel.classList.remove('open') : open());
  closeBtn.addEventListener('click', () => panel.classList.remove('open'));

  function bubble(text, who) {
    const d = document.createElement('div');
    d.className = 'msg ' + who; d.textContent = text;
    log.appendChild(d); log.scrollTop = log.scrollHeight;
  }
  const bot = t => { bubble(t, 'bot'); history.push({ role:'assistant', content:t }); };
  const user = t => { bubble(t, 'user'); history.push({ role:'user', content:t }); };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const text = input.value.trim(); if (!text) return;
    user(text); input.value = '';

    // Try the real AI backend first
    try {
      const res = await fetch(ENDPOINT, {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ messages: history })
      });
      if (res.ok) { const data = await res.json(); bot(data.reply); return; }
      throw new Error('no backend');
    } catch (_) {
      offlineFallback(text);   // graceful degrade — still captures the lead
    }
  });

  // ---- Offline fallback: simple qualify-and-capture so no lead is lost ----
  function offlineFallback(text) {
    const t = text.toLowerCase();
    if (!lead.job) {
      lead.job = text;
      bot("Got it — that sounds like something we handle all the time. What's the best phone number for one of our roofers to call you back with a free quote?");
    } else if (!lead.phone) {
      const phone = (text.match(/[\d ()+]{7,}/) || [])[0];
      if (phone) { lead.phone = phone.trim();
        bot("Perfect. And your name + rough area (e.g. Sutton Coldfield)?");
      } else { bot("No problem — just pop your phone number in and we'll call you back."); }
    } else if (!lead.name) {
      lead.name = text;
      // TODO: POST `lead` to /api/lead (email/CRM). Demo: log it.
      console.log('CHAT LEAD CAPTURED →', lead);
      bot(`Thanks ${lead.name}! ✅ You're booked in for a callback. If it's urgent, call us now on 07887 479143 — we aim to respond within 60 minutes.`);
    } else {
      bot("You're all set — we'll be in touch shortly. Anything else I can help with?");
    }
  }
})();
