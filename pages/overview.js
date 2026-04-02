/* ── Overview Page ────────────────────────────────────────────────────────────
   Default landing screen. Shows the 3-layer summary: Collisions, Violations,
   Infrastructure. Driven by the `corridors` array in js/data.js.
─────────────────────────────────────────────────────────────────────────────── */

function overviewHTML() {
  return `
    <div class="page-hd">
      <div style="display:flex;align-items:center;flex-wrap:wrap;gap:8px">
        <h1 class="page-title">Overview Dashboard</h1>
        <span class="page-badge">v2.0 · Violations + Infrastructure Layers Added</span>
      </div>
      <p class="page-meta">2014–2025 · 1,499 collisions · 3 data layers · 260 anomalies · Violations: 4,218 citations · Infrastructure: 14 asset layers</p>
    </div>

    <!-- Layer tabs -->
    <div class="layer-tabs">
      <div class="layer-tab active" onclick="switchLayer(this,'collision')"><span class="dot" style="background:#dc2626"></span>Collision Data <span class="tab-count">1,499</span></div>
      <div class="layer-tab" onclick="switchLayer(this,'violations')"><span class="dot" style="background:#d97706"></span>Violations Layer <span class="tab-count">4,218</span></div>
      <div class="layer-tab" onclick="switchLayer(this,'infrastructure')"><span class="dot" style="background:#7c3aed"></span>Infrastructure Gaps <span class="tab-count">47 gaps</span></div>
    </div>

    <!-- KPI row -->
    <div class="kpi-row">
      <div class="kpi"><div class="kpi-lbl">Total Collisions</div><div class="kpi-val" style="color:var(--t1)">1,499</div><div class="kpi-note">2014–2025</div></div>
      <div class="kpi"><div class="kpi-lbl">Fatalities</div><div class="kpi-val" style="color:var(--red)">56</div><div class="kpi-delta delta-up">↑ KSI trending</div></div>
      <div class="kpi"><div class="kpi-lbl">KSI Rate</div><div class="kpi-val" style="color:var(--amber)">25.0%</div><div class="kpi-delta delta-up">↑ from 16.4%</div></div>
      <div class="kpi" style="border-left:3px solid var(--amber)"><div class="kpi-lbl" style="color:var(--amber)">Citations Issued</div><div class="kpi-val" style="color:var(--amber)">4,218</div><div class="kpi-note">Speed · DUI · Signal</div></div>
      <div class="kpi" style="border-left:3px solid var(--purple)"><div class="kpi-lbl" style="color:var(--purple)">Infrastructure Gaps</div><div class="kpi-val" style="color:var(--purple)">47</div><div class="kpi-note">Across 6 corridors</div></div>
      <div class="kpi"><div class="kpi-lbl">Enforcement Gap Corridors</div><div class="kpi-val" style="color:var(--red)">4</div><div class="kpi-note">High crashes, low citations</div></div>
    </div>

    <!-- AI bar -->
    <div class="ai-bar">
      <span style="font-size:15px;margin-top:1px">✦</span>
      <div class="ai-body">
        <div class="ai-label">AI Summary · 3-Layer Analysis</div>
        <p class="ai-text">
          <strong>Violations layer reveals enforcement gaps on 4 corridors</strong> — Clayton Rd and Oak Grove Rd show high-speed KSI rates but citation density 3.1× below corridors with similar volume.
          <strong>Infrastructure layer links 71% of fatal pedestrian locations to missing sidewalk, absent lighting, or no RRFB.</strong>
          The causal chain — missing infrastructure → unchecked violations → severe collision — is now visible. These three corridors together represent the strongest grant funding argument in the dataset.
        </p>
      </div>
      <button class="export-btn" onclick="showToast()">↗ Export for Grant</button>
    </div>

    <!-- Enforcement gap callout -->
    <div class="gap-warning">
      <span>⚠</span>
      <div><strong>Gap 1 — Violations as causal signal:</strong> Clayton Rd has 412 speed citations but 7 KSI fatalities — citation rate is 58 per fatal, vs. 168 per fatal on Concord Blvd where enforcement is visibly working. On Oak Grove Rd: 67 speed citations for 94 crashes = citations nearly absent. <a href="#" onclick="setNav('Enforcement Gap');return false;" style="color:var(--blue);text-decoration:none;font-weight:500">View Enforcement Gap analysis →</a></div>
    </div>

    <!-- Infrastructure gap callout -->
    <div class="gap-warning infra">
      <span>⬡</span>
      <div><strong>Gap 2 — Infrastructure never entered the analysis chain:</strong> 23 of 29 VRU fatalities occurred within 50ft of a missing sidewalk, absent RRFB, or unlit segment. This is the engineering + grant justification workflow. <a href="#" onclick="setNav('Infrastructure Gap');return false;" style="color:var(--purple);text-decoration:none;font-weight:500">View Infrastructure Gap analysis →</a></div>
    </div>

    <!-- Corridor 3-layer table -->
    <div class="card section-spacer">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
        <div><div class="card-title">Corridor 3-Layer Risk Table</div><div class="card-sub">Collision · Violations · Infrastructure — cross-referenced per corridor</div></div>
        <button class="export-btn" onclick="showToast('Corridor table exported')">↗ Export</button>
      </div>
      <table class="corridor-table">
        <thead><tr>
          <th>Corridor</th>
          <th style="color:#dc2626">● Collision KSI</th>
          <th style="color:#d97706">● Violations</th>
          <th style="color:#7c3aed">● Infra Gaps</th>
          <th>Enforcement</th>
          <th>Grant Fit</th>
          <th>CF Score</th>
        </tr></thead>
        <tbody>
          ${corridors.map(c => `
            <tr>
              <td><div class="corridor-name">${c.name}</div><div class="corridor-sub">${c.type}</div></td>
              <td><span class="badge ${c.ksiPct > '25%' ? 'badge-red' : 'badge-amber'}">${c.ksiPct} KSI</span><div style="font-size:10px;color:var(--t3);margin-top:2px">${c.ksi} fatal · ${c.crashes} total</div></td>
              <td>
                <div style="font-size:12px;font-family:var(--mono);color:var(--amber)">${c.violations.total.toLocaleString()} citations</div>
                <div style="font-size:10px;color:var(--t3)">${c.violations.speed} speed · ${c.violations.dui} DUI · ${c.violations.signal} signal</div>
              </td>
              <td>${c.infraGaps.slice(0,2).map(g => `<span class="gap-pill infra" style="margin:1px 0;display:inline-block">${g}</span>`).join("<br>")}</td>
              <td>${c.enfStatus === 'gap' ? `<span class="gap-pill">Enforcement gap</span>` : c.enfStatus === 'partial' ? `<span class="badge badge-amber">Partial</span>` : `<span class="badge badge-green">Active</span>`}</td>
              <td>${c.grantFit ? `<span class="badge badge-green">✓ Yes</span>` : `<span class="badge badge-gray">—</span>`}</td>
              <td><span style="font-size:15px;font-weight:700;color:${c.cfScore >= 85 ? 'var(--red)' : c.cfScore >= 75 ? 'var(--amber)' : 'var(--t2)'}">${c.cfScore}</span></td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>

    <!-- Severity trend chart -->
    <div class="card section-spacer">
      <div class="card-title" style="margin-bottom:4px">Severity Trend 2014–2025</div>
      <div class="card-sub" style="margin-bottom:20px">KSI rate 18.7%–32.9% · Peak 31.2% in 2021</div>
      <div style="height:210px;position:relative"><canvas id="trendChart"></canvas></div>
      <div style="display:flex;gap:20px;justify-content:center;margin-top:10px">
        ${[["#dc2626","Fatal"],["#f59e0b","Severe"],["#3b82f6","Visible"]].map(([c,l])=>`<div style="display:flex;align-items:center;gap:6px;font-size:11px;color:var(--t3)"><div style="width:10px;height:10px;border-radius:2px;background:${c}"></div>${l}</div>`).join("")}
      </div>
    </div>
  `;
}
