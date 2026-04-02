/* ── Enforcement Gap Page ─────────────────────────────────────────────────────
   Gap 1: Citation data cross-referenced against collision PCF codes.
   Reveals corridors where enforcement is absent relative to crash risk.
─────────────────────────────────────────────────────────────────────────────── */

function enforcementGapHTML() {
  return `
    <div class="page-hd">
      <h1 class="page-title">Enforcement Gap Analysis <span class="page-badge">NEW · Gap 1</span></h1>
      <p class="page-meta">Citations vs. Collision Patterns · Speed · DUI · Traffic Signal violations · 2014–2025</p>
    </div>

    <div class="ai-bar">
      <span style="font-size:15px;margin-top:1px">✦</span>
      <div class="ai-body">
        <div class="ai-label">AI Insight — Enforcement Gap</div>
        <p class="ai-text">
          A corridor with <strong>high speed-related PCF collisions but low citation activity</strong> is the clearest intervention argument. Clayton Rd has a speed-PCF KSI rate of 34.1% but generates only 58 speed citations per fatal — vs. 168 on Concord Blvd. Oak Grove Rd shows near-zero enforcement presence. These are not safety corridors — they are <strong>unpatrolled corridors with known violation patterns generating fatal outcomes.</strong>
        </p>
      </div>
      <button class="export-btn" onclick="showToast()">↗ Export for Grant</button>
    </div>

    <!-- Causal chain -->
    <div style="margin-bottom:18px">
      <div class="section-label">The Causal Link That Was Missing</div>
      <div class="chain">
        <div class="chain-step" style="border-color:#fde68a;background:#fffbeb">
          <div class="chain-layer" style="color:var(--amber)">● Violation Layer</div>
          <div class="chain-name">Speeding Citation</div>
          <div class="chain-fact">PCF 03 — Unsafe Speed<br>Citation Category: VC 22350</div>
          <div class="chain-num" style="color:var(--amber)">412</div>
          <div style="font-size:10px;color:var(--t3)">speed citations on Clayton Rd</div>
        </div>
        <div class="chain-arrow">→</div>
        <div class="chain-step" style="border-color:#fecaca;background:#fef2f2">
          <div class="chain-layer" style="color:var(--red)">● Collision Layer</div>
          <div class="chain-name">Speed-Related Crash</div>
          <div class="chain-fact">PCF 03 — Unsafe Speed<br>Citations ≠ Crashes: gap visible</div>
          <div class="chain-num" style="color:var(--red)">63</div>
          <div style="font-size:10px;color:var(--t3)">speed-PCF crashes on Clayton Rd</div>
        </div>
        <div class="chain-arrow">→</div>
        <div class="chain-step" style="border-color:#e9d5ff;background:#faf5ff">
          <div class="chain-layer" style="color:var(--purple)">● Infrastructure Layer</div>
          <div class="chain-name">Infrastructure Absent</div>
          <div class="chain-fact">No sidewalk · No RRFB<br>2 dark-lighting KSI nodes</div>
          <div class="chain-num" style="color:var(--purple)">3</div>
          <div style="font-size:10px;color:var(--t3)">infra gaps at fatal locations</div>
        </div>
        <div class="chain-arrow">→</div>
        <div class="chain-step" style="border-color:#bbf7d0;background:#f0fdf4">
          <div class="chain-layer" style="color:var(--green)">✦ Countermeasure</div>
          <div class="chain-name">Targeted Intervention</div>
          <div class="chain-fact">Speed camera · RRFB install<br>Lighting retrofit · Grant-eligible</div>
          <div class="chain-num" style="color:var(--green)">$2.1M</div>
          <div style="font-size:10px;color:var(--t3)">estimated grant eligibility</div>
        </div>
      </div>
    </div>

    <!-- Enforcement bar charts -->
    <div class="section-label">Citation Density vs. KSI Rate by Corridor</div>
    <div class="enforcement-row">
      <div class="enf-card">
        <div class="enf-label">Speed Citations per Fatal Collision <span class="badge badge-amber">Lower = Gap</span></div>
        <div class="enf-bar-group">
          ${[
            { name: "Concord Blvd", val: 168, max: 200, color: "#16a34a", label: "Enforced" },
            { name: "Treat Blvd",   val: 142, max: 200, color: "#2563eb", label: "Active" },
            { name: "Willow Pass Rd", val: 91, max: 200, color: "#d97706", label: "Partial" },
            { name: "Clayton Rd",   val: 58,  max: 200, color: "#dc2626", label: "GAP" },
            { name: "Monument Blvd",val: 14,  max: 200, color: "#dc2626", label: "GAP" },
            { name: "Oak Grove Rd", val: 11,  max: 200, color: "#dc2626", label: "GAP" },
          ].map(r => `
            <div class="enf-bar-row">
              <div class="enf-bar-hd">
                <span class="enf-bar-name">${r.name}</span>
                <span class="enf-bar-val" style="color:${r.color}">${r.val} <span style="font-size:10px;background:${r.color}20;color:${r.color};padding:1px 5px;border-radius:3px">${r.label}</span></span>
              </div>
              <div class="bar-track"><div class="bar-fill" style="width:${(r.val/r.max*100)}%;background:${r.color}"></div></div>
            </div>
          `).join("")}
        </div>
      </div>

      <div class="enf-card">
        <div class="enf-label">DUI Citations per Alcohol-Involved Fatal <span class="badge badge-amber">Lower = Gap</span></div>
        <div class="enf-bar-group">
          ${[
            { name: "Treat Blvd",   val: 62, max: 80, color: "#16a34a" },
            { name: "Concord Blvd", val: 51, max: 80, color: "#16a34a" },
            { name: "Willow Pass Rd",val: 38, max: 80, color: "#d97706" },
            { name: "Clayton Rd",   val: 22, max: 80, color: "#dc2626" },
            { name: "Oak Grove Rd", val: 8,  max: 80, color: "#dc2626" },
            { name: "Monument Blvd",val: 5,  max: 80, color: "#dc2626" },
          ].map(r => `
            <div class="enf-bar-row">
              <div class="enf-bar-hd">
                <span class="enf-bar-name">${r.name}</span>
                <span class="enf-bar-val" style="color:${r.color}">${r.val}</span>
              </div>
              <div class="bar-track"><div class="bar-fill" style="width:${(r.val/r.max*100)}%;background:${r.color}"></div></div>
            </div>
          `).join("")}
        </div>
      </div>

      <div class="enf-card">
        <div class="enf-label">Signal Citations per Signal-PCF Crash <span class="badge badge-green">Higher = Working</span></div>
        <div class="enf-bar-group">
          ${[
            { name: "Concord Blvd", val: 214, max: 250, color: "#16a34a" },
            { name: "Treat Blvd",   val: 156, max: 250, color: "#2563eb" },
            { name: "Willow Pass Rd",val: 77, max: 250, color: "#d97706" },
            { name: "Clayton Rd",   val: 49,  max: 250, color: "#dc2626" },
            { name: "Monument Blvd",val: 9,   max: 250, color: "#dc2626" },
            { name: "Oak Grove Rd", val: 6,   max: 250, color: "#dc2626" },
          ].map(r => `
            <div class="enf-bar-row">
              <div class="enf-bar-hd">
                <span class="enf-bar-name">${r.name}</span>
                <span class="enf-bar-val" style="color:${r.color}">${r.val}</span>
              </div>
              <div class="bar-track"><div class="bar-fill" style="width:${(r.val/r.max*100)}%;background:${r.color}"></div></div>
            </div>
          `).join("")}
        </div>
      </div>
    </div>

    <!-- PCF × Citation cross-reference table -->
    <div class="card">
      <div class="card-title" style="margin-bottom:4px">PCF Code × Citation Cross-Reference</div>
      <div class="card-sub" style="margin-bottom:16px">Each collision PCF category linked to its violation citation counterpart</div>
      ${pcfCitationTable()}
    </div>
  `;
}

/* Shared table used by both Enforcement Gap and Factor Explorer pages */
function pcfCitationTable() {
  return `
    <table class="factor-table">
      <thead><tr>
        <th>PCF Code</th>
        <th>Crashes</th>
        <th>KSI Rate</th>
        <th>Citation Category (VC)</th>
        <th>Citations Issued</th>
        <th>Citation/Crash Ratio</th>
        <th>Enforcement Signal</th>
      </tr></thead>
      <tbody>
        ${[
          { pcf:"03 — Unsafe Speed",              crashes:312, ksi:"28.2%", vc:"VC 22350", citations:1247, ratio:4.0,  status:"active"  },
          { pcf:"22 — Automobile Right-of-Way",   crashes:198, ksi:"19.4%", vc:"VC 21800", citations:314,  ratio:1.6,  status:"partial" },
          { pcf:"11 — Pedestrian Violation",      crashes:111, ksi:"59.5%", vc:"VC 21955", citations:43,   ratio:0.4,  status:"gap"     },
          { pcf:"21 — Traffic Signals/Signs",     crashes:89,  ksi:"22.5%", vc:"VC 21453", citations:487,  ratio:5.5,  status:"active"  },
          { pcf:"01 — DUI",                       crashes:74,  ksi:"44.6%", vc:"VC 23152", citations:88,   ratio:1.2,  status:"partial" },
          { pcf:"07 — Wrong Side of Road",        crashes:46,  ksi:"21.7%", vc:"VC 21650", citations:14,   ratio:0.3,  status:"gap"     },
          { pcf:"20 — Improper Turn",             crashes:38,  ksi:"15.8%", vc:"VC 22100", citations:89,   ratio:2.3,  status:"partial" },
          { pcf:"09 — Improper Passing",          crashes:29,  ksi:"17.2%", vc:"VC 21750", citations:11,   ratio:0.4,  status:"gap"     },
        ].map(r => `
          <tr>
            <td style="font-family:var(--mono);font-size:11px">${r.pcf}</td>
            <td style="font-weight:500">${r.crashes}</td>
            <td><span class="badge ${parseFloat(r.ksi) >= 40 ? 'badge-red' : parseFloat(r.ksi) >= 25 ? 'badge-amber' : 'badge-gray'}">${r.ksi}</span></td>
            <td style="font-family:var(--mono);font-size:11px;color:var(--amber)">${r.vc}</td>
            <td style="font-family:var(--mono)">${r.citations}</td>
            <td><span class="badge ${r.ratio >= 3 ? 'badge-green' : r.ratio >= 1.2 ? 'badge-amber' : 'badge-red'}">${r.ratio.toFixed(1)}×</span></td>
            <td>
              <div class="enforcement-signal">
                <span class="signal-dot" style="background:${r.status==='active'?'#16a34a':r.status==='partial'?'#d97706':'#dc2626'}"></span>
                <span class="signal-label">${r.status === 'gap' ? '<span class="enforcement-gap">Enforcement gap — intervention argument</span>' : r.status === 'partial' ? 'Partial enforcement' : 'Active enforcement'}</span>
              </div>
            </td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
}
