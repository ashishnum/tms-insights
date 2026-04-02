/* ── Placeholder Page ─────────────────────────────────────────────────────────
   Shown for any nav item that doesn't yet have a dedicated page file.
   To build a new screen: create pages/your-page.js and add it to nav.js router.
─────────────────────────────────────────────────────────────────────────────── */

function placeholderHTML(page) {
  return `
    <div class="page-hd"><h1 class="page-title">${page}</h1></div>
    <div class="card" style="min-height:300px;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:10px">
      <div style="font-size:28px">📊</div>
      <div style="font-size:14px;font-weight:500;color:var(--t1)">${page}</div>
      <div style="font-size:13px;color:var(--t3)">Create <code style="background:#f1f5f9;padding:2px 6px;border-radius:4px">pages/${page.toLowerCase().replace(/ /g,'-')}.js</code> and add it to the router in <code style="background:#f1f5f9;padding:2px 6px;border-radius:4px">js/nav.js</code></div>
    </div>
  `;
}
