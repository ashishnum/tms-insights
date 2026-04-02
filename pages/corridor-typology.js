/* ── Corridor Typology Page ───────────────────────────────────────────────────
   3-layer compound risk profile per corridor.
   Uses corridors[] from js/data.js.
─────────────────────────────────────────────────────────────────────────────── */

function corridorTypologyHTML() {
  return `
    <div class="page-hd">
      <h1 class="page-title">Corridor Typology <span class="page-badge">3-Layer View</span></h1>
      <p class="page-meta">Collision · Violations · Infrastructure combined per corridor · Compound Factor Score methodology</p>
    </div>

    <div class="ai-bar">
      <span style="font-size:15px;margin-top:1px">✦</span>
      <div class="ai-body">
        <div class="ai-label">AI Insight</div>
        <p class="ai-text">Clayton Rd and Monument Blvd are the only corridors where all three layers are simultaneously critical — high KSI, enforcement gap, and multiple infra deficits. These represent the strongest compound grant applications. Oak Grove Rd has the starkest lighting-to-fatality correlation in the entire dataset.</p>
      </div>
    </div>

    <div class="card">
      <div class="card-title" style="margin-bottom:16px">Per-Corridor Compound Risk Profile</div>
      <div style="display:flex;flex-direction:column;gap:20px">
        ${corridors.map(c => `
          <div style="border:1px solid var(--border);border-radius:10px;padding:16px 20px">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px">
              <div>
                <span style="font-size:15px;font-weight:600">${c.name}</span>
                <span class="badge badge-gray" style="margin-left:8px">${c.type}</span>
                ${c.grantFit ? `<span class="badge badge-green" style="margin-left:4px">Grant-eligible</span>` : ''}
              </div>
              <span style="font-size:22px;font-weight:700;color:${c.cfScore >= 85 ? 'var(--red)' : c.cfScore >= 75 ? 'var(--amber)' : 'var(--t2)'}">CF ${c.cfScore}</span>
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px">
              <div style="background:#fef2f2;border-radius:8px;padding:12px">
                <div style="font-size:10px;font-weight:700;color:var(--red);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:6px">● Collision</div>
                <div style="font-size:18px;font-weight:700;color:var(--red)">${c.ksiPct}</div>
                <div style="font-size:11px;color:var(--t3)">${c.ksi} fatals · ${c.crashes} total crashes</div>
              </div>
              <div style="background:#fffbeb;border-radius:8px;padding:12px">
                <div style="font-size:10px;font-weight:700;color:var(--amber);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:6px">● Violations</div>
                <div style="font-size:18px;font-weight:700;color:var(--amber)">${c.violations.total}</div>
                <div style="font-size:11px;color:var(--t3)">citations · Enf: <span class="badge ${c.enfStatus==='gap'?'badge-red':c.enfStatus==='partial'?'badge-amber':'badge-green'}" style="font-size:10px">${c.enfStatus}</span></div>
              </div>
              <div style="background:#faf5ff;border-radius:8px;padding:12px">
                <div style="font-size:10px;font-weight:700;color:var(--purple);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:6px">● Infrastructure</div>
                <div style="font-size:18px;font-weight:700;color:var(--purple)">${c.infraGaps.length}</div>
                <div style="font-size:11px;color:var(--t3)">${c.infraGaps[0]}</div>
              </div>
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  `;
}
