/* ── Infrastructure Gap Page ──────────────────────────────────────────────────
   Gap 2: Infrastructure asset proximity cross-referenced against collision
   clusters. Identifies where physical deficiencies are causing fatalities.
─────────────────────────────────────────────────────────────────────────────── */

function infraGapHTML() {
  return `
    <div class="page-hd">
      <h1 class="page-title">Infrastructure Gap Analysis <span class="page-badge">NEW · Gap 2</span></h1>
      <p class="page-meta">14 Asset Types · 6 Facility Layers · Cross-referenced against collision clusters · 47 gaps identified</p>
    </div>

    <div class="ai-bar">
      <span style="font-size:15px;margin-top:1px">⬡</span>
      <div class="ai-body">
        <div class="ai-label">AI Insight — Infrastructure → Collision Chain</div>
        <p class="ai-text">
          <strong>23 of 29 VRU fatalities</strong> occurred within 50ft of at least one infrastructure gap — missing sidewalk, absent RRFB, or unlit segment.
          <strong>100% of dark-condition KSI locations on Oak Grove Rd have no street lighting</strong> on record. The infrastructure gap is not a footnote — it is the engineering basis for every countermeasure recommendation and grant application.
        </p>
      </div>
      <button class="export-btn" onclick="showToast('Infrastructure gap report exported')">↗ Export for Grant</button>
    </div>

    <!-- Summary KPIs -->
    <div class="kpi-row" style="margin-bottom:18px">
      <div class="kpi" style="border-left:3px solid var(--red)"><div class="kpi-lbl">VRU Fatals Near Infra Gap</div><div class="kpi-val" style="color:var(--red)">23/29</div><div class="kpi-note">79% within 50ft of gap</div></div>
      <div class="kpi" style="border-left:3px solid var(--red)"><div class="kpi-lbl">Dark KSI Locations Unlit</div><div class="kpi-val" style="color:var(--red)">100%</div><div class="kpi-note">Oak Grove Rd segment</div></div>
      <div class="kpi" style="border-left:3px solid var(--amber)"><div class="kpi-lbl">Ped Fatals — No RRFB</div><div class="kpi-val" style="color:var(--amber)">18/23</div><div class="kpi-note">Crossing had no RRFB</div></div>
      <div class="kpi" style="border-left:3px solid var(--amber)"><div class="kpi-lbl">Missing Sidewalk (mi)</div><div class="kpi-val" style="color:var(--amber)">4.3 mi</div><div class="kpi-note">On KSI corridors</div></div>
      <div class="kpi" style="border-left:3px solid var(--purple)"><div class="kpi-lbl">Total Infra Gaps</div><div class="kpi-val" style="color:var(--purple)">47</div><div class="kpi-note">Across 6 corridors</div></div>
      <div class="kpi" style="border-left:3px solid var(--green)"><div class="kpi-lbl">Est. Grant Eligibility</div><div class="kpi-val" style="color:var(--green)">$5.8M</div><div class="kpi-note">ATP + HSIP + RAISE</div></div>
    </div>

    <!-- Gap cards -->
    <div class="section-label">Critical Infrastructure Gaps — Collision Linkage</div>
    <div class="infra-grid">

      <div class="infra-card critical">
        <div class="infra-hd">
          <div class="infra-title">Missing Sidewalk — Clayton Rd (0.8 mi)</div>
          <span class="badge badge-red">Critical</span>
        </div>
        <p class="infra-body">0.8-mile gap between Ygnacio Valley Rd and Oak Park Blvd forces pedestrians into travel lane. 4 of 7 Clayton Rd fatalities occurred within this segment. No pedestrian facility on the high-speed arterial (45 mph posted).</p>
        <div class="infra-stats">
          <div class="infra-stat"><div class="infra-stat-val" style="color:var(--red)">4</div><div class="infra-stat-lbl">fatals in gap segment</div></div>
          <div class="infra-stat"><div class="infra-stat-val" style="color:var(--amber)">0.8 mi</div><div class="infra-stat-lbl">sidewalk missing</div></div>
          <div class="infra-stat"><div class="infra-stat-val" style="color:var(--blue)">$840K</div><div class="infra-stat-lbl">ATP eligible</div></div>
        </div>
        <div class="grant-tag">✓ ATP Cycle 7 eligible · HSIP eligible</div>
      </div>

      <div class="infra-card critical">
        <div class="infra-hd">
          <div class="infra-title">No RRFB — Oak Grove Rd × Mitchell Ct</div>
          <span class="badge badge-red">Critical</span>
        </div>
        <p class="infra-body">Uncontrolled mid-block pedestrian crossing with no RRFB, no overhead warning signage, and no refuge island. 2 pedestrian fatalities at this exact location (2018, 2022). 85th-percentile speed observed 52 mph on 40 mph segment.</p>
        <div class="infra-stats">
          <div class="infra-stat"><div class="infra-stat-val" style="color:var(--red)">2</div><div class="infra-stat-lbl">ped fatals, same crossing</div></div>
          <div class="infra-stat"><div class="infra-stat-val" style="color:var(--amber)">52 mph</div><div class="infra-stat-lbl">85th pct speed (observed)</div></div>
          <div class="infra-stat"><div class="infra-stat-val" style="color:var(--blue)">$180K</div><div class="infra-stat-lbl">RRFB install + refuge</div></div>
        </div>
        <div class="grant-tag">✓ HSIP Critical (2× repeating fatal location)</div>
      </div>

      <div class="infra-card critical">
        <div class="infra-hd">
          <div class="infra-title">No Street Lighting — Oak Grove Rd (0.6 mi)</div>
          <span class="badge badge-red">Critical</span>
        </div>
        <p class="infra-body">Complete absence of streetlighting on a 0.6-mile segment. 100% of dark-condition KSI events on Oak Grove Rd occurred within this unlit zone. This is the strongest single infrastructure-to-collision correlation in the dataset.</p>
        <div class="infra-stats">
          <div class="infra-stat"><div class="infra-stat-val" style="color:var(--red)">3</div><div class="infra-stat-lbl">dark-KSI crashes in zone</div></div>
          <div class="infra-stat"><div class="infra-stat-val" style="color:var(--amber)">100%</div><div class="infra-stat-lbl">dark KSI within unlit seg</div></div>
          <div class="infra-stat"><div class="infra-stat-val" style="color:var(--blue)">$240K</div><div class="infra-stat-lbl">LED retrofit estimate</div></div>
        </div>
        <div class="grant-tag">✓ HSIP + RAISE infrastructure eligible</div>
      </div>

      <div class="infra-card high">
        <div class="infra-hd">
          <div class="infra-title">No Protected Left-Turn — Willow Pass × Olivera</div>
          <span class="badge badge-amber">High</span>
        </div>
        <p class="infra-body">3 intersections along Willow Pass Rd lack protected left-turn phase. Left-turn PCF crashes at these 3 locations account for 38% of all Willow Pass KSI events. Broadside collisions 1.4× citywide average at each node.</p>
        <div class="infra-stats">
          <div class="infra-stat"><div class="infra-stat-val" style="color:var(--amber)">38%</div><div class="infra-stat-lbl">Willow Pass KSI from LT</div></div>
          <div class="infra-stat"><div class="infra-stat-val" style="color:var(--amber)">1.4×</div><div class="infra-stat-lbl">broadside rate vs citywide</div></div>
          <div class="infra-stat"><div class="infra-stat-val" style="color:var(--blue)">$420K</div><div class="infra-stat-lbl">3 signal upgrades</div></div>
        </div>
        <div class="grant-tag">✓ HSIP signal timing eligible</div>
      </div>

      <div class="infra-card high">
        <div class="infra-hd">
          <div class="infra-title">Monument Blvd — No Lighting + No Sidewalk</div>
          <span class="badge badge-amber">High</span>
        </div>
        <p class="infra-body">Full corridor lacks both sidewalk (0.9 mi) and any street lighting. Monument Blvd has the highest enforcement gap score in the dataset (CRITICAL) combined with the most infrastructure deficits. High compound risk with no visible intervention history.</p>
        <div class="infra-stats">
          <div class="infra-stat"><div class="infra-stat-val" style="color:var(--red)">CF 86</div><div class="infra-stat-lbl">highest compound risk</div></div>
          <div class="infra-stat"><div class="infra-stat-val" style="color:var(--amber)">3</div><div class="infra-stat-lbl">concurrent gaps</div></div>
          <div class="infra-stat"><div class="infra-stat-val" style="color:var(--blue)">$1.1M</div><div class="infra-stat-lbl">full remediation est.</div></div>
        </div>
        <div class="grant-tag">✓ ATP + RAISE bundled eligible</div>
      </div>

      <div class="infra-card medium">
        <div class="infra-hd">
          <div class="infra-title">Bike Lane Gap — Treat Blvd × Bushy Rd</div>
          <span class="badge badge-blue">Medium</span>
        </div>
        <p class="infra-body">0.5-mile bike lane gap forces cyclists into the general traffic lane at a location with observed wrong-way riding behavior. PCF 07 (wrong side of road) accounts for 15% of all bike collisions citywide — concentrated near this gap.</p>
        <div class="infra-stats">
          <div class="infra-stat"><div class="infra-stat-val" style="color:var(--blue)">0.5 mi</div><div class="infra-stat-lbl">lane gap</div></div>
          <div class="infra-stat"><div class="infra-stat-val" style="color:var(--amber)">15%</div><div class="infra-stat-lbl">bike PCF07 concentration</div></div>
          <div class="infra-stat"><div class="infra-stat-val" style="color:var(--blue)">$190K</div><div class="infra-stat-lbl">protected lane fill</div></div>
        </div>
        <div class="grant-tag">✓ ATP Cycle 7 active transportation</div>
      </div>

    </div>

    <!-- Dot matrix -->
    <div class="card" style="margin-bottom:20px">
      <div class="card-title" style="margin-bottom:4px">VRU Fatalities × Infrastructure Proximity</div>
      <div class="card-sub" style="margin-bottom:14px">Each dot = 1 VRU fatal. Color = nearest infrastructure gap type within 50ft</div>
      <div class="dot-matrix" id="dotMatrix"></div>
      <div style="display:flex;gap:16px;margin-top:12px;flex-wrap:wrap">
        ${[["#dc2626","Missing sidewalk (11)"],["#7c3aed","No RRFB (8)"],["#d97706","No lighting (4)"],["#2563eb","No bike infra (2)"],["#94a3b8","No gap within 50ft (4)"]].map(([c,l])=>`<div style="display:flex;align-items:center;gap:5px;font-size:11px;color:var(--t2)"><div style="width:10px;height:10px;border-radius:2px;background:${c}"></div>${l}</div>`).join("")}
      </div>
    </div>
  `;
}
