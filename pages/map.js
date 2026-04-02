/* ── Map Intelligence Page ────────────────────────────────────────────────────
   The 4-panel map experience.
   Layout: Left Nav (15%) · Map (35%) · Primary Info (25%) · Secondary/AI (25%)

   STATUS: Scaffold only. Full implementation coming next.
   Panels and states are defined — wiring and Mapbox integration TBD.
─────────────────────────────────────────────────────────────────────────────── */

function mapHTML() {
  return `
    <div style="margin:-28px -36px -48px; height:calc(100vh - 0px); display:flex; flex-direction:column;">

      <!-- Map top bar -->
      <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 20px;background:white;border-bottom:1px solid var(--border);flex-shrink:0;">
        <div style="display:flex;align-items:center;gap:10px">
          <span style="font-size:12px;font-weight:600;color:var(--t1)">Map Intelligence</span>
          <!-- Breadcrumb level indicator -->
          <div style="display:flex;align-items:center;gap:4px;background:#f1f5f9;border-radius:20px;padding:3px 10px;">
            <span id="map-level-city"   style="font-size:11px;font-weight:500;color:var(--blue);cursor:pointer" onclick="setMapLevel('city')">City</span>
            <span style="font-size:11px;color:var(--t3)">›</span>
            <span id="map-level-district" style="font-size:11px;color:var(--t3);cursor:pointer" onclick="setMapLevel('district')">District</span>
            <span style="font-size:11px;color:var(--t3)">›</span>
            <span id="map-level-corridor" style="font-size:11px;color:var(--t3);cursor:pointer" onclick="setMapLevel('corridor')">Corridor</span>
            <span style="font-size:11px;color:var(--t3)">›</span>
            <span id="map-level-intersection" style="font-size:11px;color:var(--t3);cursor:pointer" onclick="setMapLevel('intersection')">Intersection</span>
          </div>
        </div>
        <!-- Layer toggles -->
        <div style="display:flex;gap:8px">
          <button class="layer-tab active" style="padding:4px 10px;font-size:11px" onclick="toggleMapLayer(this,'collision')"><span class="dot" style="background:#dc2626"></span>Collision</button>
          <button class="layer-tab" style="padding:4px 10px;font-size:11px" onclick="toggleMapLayer(this,'violations')"><span class="dot" style="background:#d97706"></span>Violations</button>
          <button class="layer-tab" style="padding:4px 10px;font-size:11px" onclick="toggleMapLayer(this,'infrastructure')"><span class="dot" style="background:#7c3aed"></span>Infrastructure</button>
          <button class="layer-tab" style="padding:4px 10px;font-size:11px" onclick="toggleMapLayer(this,'heatmap')"><span class="dot" style="background:#ef4444"></span>Heatmap</button>
        </div>
      </div>

      <!-- 3-panel body -->
      <div style="display:flex;flex:1;overflow:hidden;">

        <!-- Panel 2: Map (35%) -->
        <div style="flex:0 0 35%;background:#e8edf2;position:relative;overflow:hidden;" id="map-panel">

          <!-- Map placeholder — replace with Mapbox canvas -->
          <div style="width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;background:linear-gradient(160deg,#dbeafe 0%,#e0e7ff 40%,#f0fdf4 100%);">

            <!-- Concord boundary sketch -->
            <svg width="320" height="280" viewBox="0 0 320 280" style="opacity:0.7">
              <!-- City boundary -->
              <path d="M60,40 L240,30 L280,90 L290,180 L220,250 L100,260 L40,200 L30,110 Z" fill="none" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
              <!-- Corridors (simplified) -->
              <line x1="60" y1="130" x2="270" y2="120" stroke="#dc2626" stroke-width="3" stroke-linecap="round" opacity="0.8"/>
              <line x1="80" y1="160" x2="260" y2="155" stroke="#dc2626" stroke-width="2" stroke-linecap="round" opacity="0.6"/>
              <line x1="100" y1="80"  x2="140" y2="220" stroke="#d97706" stroke-width="2" stroke-linecap="round" opacity="0.6"/>
              <line x1="190" y1="70"  x2="200" y2="230" stroke="#2563eb" stroke-width="2" stroke-linecap="round" opacity="0.5"/>
              <!-- Collision clusters -->
              <circle cx="110" cy="128" r="10" fill="#dc2626" opacity="0.25"/>
              <circle cx="110" cy="128" r="5"  fill="#dc2626" opacity="0.6"/>
              <circle cx="190" cy="122" r="8"  fill="#dc2626" opacity="0.2"/>
              <circle cx="190" cy="122" r="4"  fill="#dc2626" opacity="0.5"/>
              <circle cx="145" cy="155" r="12" fill="#f59e0b" opacity="0.2"/>
              <circle cx="145" cy="155" r="5"  fill="#f59e0b" opacity="0.5"/>
              <circle cx="230" cy="130" r="7"  fill="#dc2626" opacity="0.2"/>
              <circle cx="230" cy="130" r="3"  fill="#dc2626" opacity="0.5"/>
              <!-- RRFB markers -->
              <rect x="160" y="124" width="8" height="5" rx="1" fill="#f59e0b" opacity="0.9"/>
              <rect x="100" y="154" width="8" height="5" rx="1" fill="#f59e0b" opacity="0.9"/>
              <!-- District labels -->
              <text x="80"  y="90"  font-size="9" fill="#64748b" font-family="DM Sans">District 1</text>
              <text x="200" y="80"  font-size="9" fill="#64748b" font-family="DM Sans">District 2</text>
              <text x="70"  y="200" font-size="9" fill="#64748b" font-family="DM Sans">District 3</text>
              <text x="200" y="210" font-size="9" fill="#64748b" font-family="DM Sans">District 4</text>
              <!-- Corridor labels -->
              <text x="68" y="124" font-size="8" fill="#dc2626" font-weight="600" font-family="DM Sans">Clayton Rd</text>
              <text x="68" y="152" font-size="8" fill="#dc2626" font-weight="600" font-family="DM Sans">Willow Pass</text>
            </svg>

            <div style="display:flex;flex-direction:column;align-items:center;gap:4px">
              <span style="font-size:12px;font-weight:600;color:#475569">Concord, CA · City Overview</span>
              <span style="font-size:11px;color:#94a3b8">Click a corridor or district to drill in</span>
            </div>

            <!-- Clickable corridor zones (prototype) -->
            <div style="position:absolute;top:0;left:0;width:100%;height:100%;">
              ${corridors.map((c,i) => `
                <div onclick="selectCorridor('${c.name}')"
                  style="position:absolute;top:${35+i*10}%;left:${15+i*5}%;width:60%;height:8%;cursor:pointer;border-radius:4px;transition:background 0.15s;"
                  onmouseover="this.style.background='rgba(37,99,235,0.08)'" onmouseout="this.style.background='transparent'">
                </div>
              `).join("")}
            </div>
          </div>

          <!-- Map toolbar (right edge) -->
          <div style="position:absolute;right:10px;top:50%;transform:translateY(-50%);display:flex;flex-direction:column;gap:6px;">
            ${["＋","－","⊙","⎙"].map(icon => `
              <button onclick="showToast('Map tool: ${icon}')" style="width:28px;height:28px;background:white;border:1px solid var(--border-md);border-radius:6px;cursor:pointer;font-size:13px;display:flex;align-items:center;justify-content:center;box-shadow:0 1px 3px rgba(0,0,0,0.08)">${icon}</button>
            `).join("")}
          </div>
        </div>

        <!-- Panel 3: Primary Info Widget (25%) -->
        <div style="flex:0 0 25%;background:var(--bg);border-left:1px solid var(--border);border-right:1px solid var(--border);overflow-y:auto;display:flex;flex-direction:column;" id="primary-info-panel">
          <div id="primary-info-content">
            ${primaryInfoCity()}
          </div>
        </div>

        <!-- Panel 4: Secondary Info / AI (25%) -->
        <div style="flex:0 0 25%;background:white;display:flex;flex-direction:column;overflow:hidden;" id="secondary-panel">

          <!-- Panel 4 header -->
          <div style="padding:12px 16px;border-bottom:1px solid var(--border);flex-shrink:0;">
            <div style="display:flex;gap:4px;margin-bottom:0">
              ${["Context","Factors","Violations","Countermeasures","What-If","Grant"].map((t,i) => `
                <span class="inner-tab ${i===0?'active':''}" onclick="setSecondaryTab(this,'${t}')" style="font-size:10px;padding:4px 8px">${t}</span>
              `).join("")}
            </div>
          </div>

          <!-- Panel 4 content area -->
          <div style="flex:1;overflow-y:auto;padding:14px 16px;" id="secondary-content">
            ${secondaryContextDefault()}
          </div>

          <!-- AI chat input -->
          <div style="padding:10px 14px;border-top:1px solid var(--border);flex-shrink:0;background:white;">
            <div style="display:flex;gap:8px;align-items:center;background:#f8f9fa;border:1px solid var(--border-md);border-radius:8px;padding:7px 12px;">
              <span style="font-size:13px;color:var(--blue)">✦</span>
              <input type="text" placeholder="Ask about this location…" id="ai-input"
                style="flex:1;border:none;background:none;outline:none;font-size:12px;font-family:var(--font);color:var(--t1);"
                onkeydown="if(event.key==='Enter')handleAIQuery(this.value)"/>
              <button onclick="handleAIQuery(document.getElementById('ai-input').value)"
                style="font-size:11px;font-weight:500;color:var(--blue);background:none;border:none;cursor:pointer;padding:0">Ask</button>
            </div>
            <!-- Quick chips -->
            <div style="display:flex;gap:5px;margin-top:7px;flex-wrap:wrap">
              ${["Summarize corridor","What's causing crashes?","Best countermeasure","Draft grant language"].map(q => `
                <span onclick="handleAIQuery('${q}')"
                  style="font-size:10px;font-weight:500;background:#eff6ff;color:var(--blue);padding:3px 8px;border-radius:4px;cursor:pointer">${q}</span>
              `).join("")}
            </div>
          </div>
        </div>

      </div>
    </div>
  `;
}

/* ── Primary Info Panel States ── */

function primaryInfoCity() {
  return `
    <div style="padding:16px">
      <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:var(--t3);margin-bottom:12px">City Summary</div>
      <div style="font-size:16px;font-weight:600;margin-bottom:2px">Concord, CA</div>
      <div style="font-size:11px;color:var(--t3);margin-bottom:16px">2014–2025 · 1,499 collisions</div>
      <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:16px">
        ${[
          { lbl:"Total KSI",  val:"374",   color:"var(--red)",    note:"Fatal + Severe + Visible Injury" },
          { lbl:"KSI Rate",   val:"25.0%", color:"var(--amber)",  note:"↑ from 16.4% in 2014" },
          { lbl:"Top Corridor",val:"Clayton Rd", color:"var(--t1)", note:"CF Score 88 · Grant-eligible" },
          { lbl:"Grant Potential", val:"$5.8M", color:"var(--green)", note:"HSIP · ATP · RAISE" },
        ].map(r => `
          <div style="background:white;border-radius:8px;padding:10px 12px;border:1px solid var(--border)">
            <div style="font-size:10px;color:var(--t3);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px">${r.lbl}</div>
            <div style="font-size:17px;font-weight:700;color:${r.color}">${r.val}</div>
            <div style="font-size:10px;color:var(--t3);margin-top:2px">${r.note}</div>
          </div>
        `).join("")}
      </div>
      <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:var(--t3);margin-bottom:8px">Top Risk Corridors</div>
      ${corridors.slice(0,4).map(c => `
        <div onclick="selectCorridor('${c.name}')" style="display:flex;justify-content:space-between;align-items:center;padding:8px 10px;border-radius:6px;cursor:pointer;margin-bottom:4px;transition:background 0.13s" onmouseover="this.style.background='#f1f5f9'" onmouseout="this.style.background='transparent'">
          <div>
            <div style="font-size:12px;font-weight:500">${c.name}</div>
            <div style="font-size:10px;color:var(--t3)">${c.ksi} fatals · ${c.infraGaps.length} gaps</div>
          </div>
          <span style="font-size:14px;font-weight:700;color:${c.cfScore>=85?'var(--red)':c.cfScore>=75?'var(--amber)':'var(--t2)'}">${c.cfScore}</span>
        </div>
      `).join("")}
    </div>
  `;
}

function primaryInfoCorridor(name) {
  const c = corridors.find(x => x.name === name) || corridors[0];
  return `
    <div style="padding:16px">
      <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:var(--t3);margin-bottom:8px">Corridor · ${c.type}</div>
      <div style="font-size:16px;font-weight:600;margin-bottom:2px">${c.name}</div>
      <div style="display:flex;gap:6px;margin-bottom:14px;flex-wrap:wrap">
        <span class="badge ${c.grantFit?'badge-green':'badge-gray'}">${c.grantFit?'Grant-eligible':'Not grant-fit'}</span>
        <span class="badge ${c.enfStatus==='gap'?'badge-red':c.enfStatus==='partial'?'badge-amber':'badge-green'}">${c.enfStatus}</span>
      </div>

      <!-- 3-layer summary -->
      <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
        <div style="background:#fef2f2;border-radius:8px;padding:10px 12px">
          <div style="font-size:10px;font-weight:700;color:var(--red);text-transform:uppercase;margin-bottom:4px">● Collision</div>
          <div style="font-size:18px;font-weight:700;color:var(--red)">${c.ksiPct} KSI</div>
          <div style="font-size:10px;color:var(--t3)">${c.ksi} fatals · ${c.crashes} total</div>
        </div>
        <div style="background:#fffbeb;border-radius:8px;padding:10px 12px">
          <div style="font-size:10px;font-weight:700;color:var(--amber);text-transform:uppercase;margin-bottom:4px">● Violations</div>
          <div style="font-size:18px;font-weight:700;color:var(--amber)">${c.violations.total.toLocaleString()}</div>
          <div style="font-size:10px;color:var(--t3)">${c.violations.speed} speed · ${c.violations.dui} DUI · ${c.violations.signal} signal</div>
        </div>
        <div style="background:#faf5ff;border-radius:8px;padding:10px 12px">
          <div style="font-size:10px;font-weight:700;color:var(--purple);text-transform:uppercase;margin-bottom:4px">● Infrastructure Gaps</div>
          <div style="font-size:18px;font-weight:700;color:var(--purple)">${c.infraGaps.length}</div>
          <div style="display:flex;flex-direction:column;gap:3px;margin-top:4px">
            ${c.infraGaps.map(g => `<span class="gap-pill infra" style="font-size:10px">${g}</span>`).join("")}
          </div>
        </div>
      </div>

      <button onclick="setSecondaryTab(null,'What-If')" style="width:100%;padding:8px;background:var(--blue);color:white;border:none;border-radius:6px;font-size:12px;font-weight:500;cursor:pointer;font-family:var(--font)">Run What-If Simulator →</button>
    </div>
  `;
}

/* ── Secondary Panel States ── */

function secondaryContextDefault() {
  return `
    <div style="text-align:center;padding:24px 0;color:var(--t3)">
      <div style="font-size:24px;margin-bottom:8px">⊙</div>
      <div style="font-size:12px;font-weight:500;color:var(--t2)">Click anything on the map</div>
      <div style="font-size:11px;margin-top:4px">Corridors · Collision pins · Assets · Districts</div>
    </div>
    <div style="display:flex;flex-direction:column;gap:8px;margin-top:16px">
      <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:var(--t3);margin-bottom:4px">Quick Access</div>
      ${["View Factor Explorer","Check Enforcement Gaps","See Infrastructure Gaps","Open Countermeasures"].map(a => `
        <button onclick="handleAIQuery('${a}')" style="text-align:left;padding:9px 12px;background:#f8f9fa;border:1px solid var(--border);border-radius:6px;font-size:11px;color:var(--t2);cursor:pointer;font-family:var(--font);transition:border-color 0.13s" onmouseover="this.style.borderColor='var(--blue)'" onmouseout="this.style.borderColor='var(--border)'">${a}</button>
      `).join("")}
    </div>
  `;
}

function secondaryCorridorContext(name) {
  const c = corridors.find(x => x.name === name) || corridors[0];
  return `
    <div class="ai-bar" style="margin-bottom:12px">
      <span style="font-size:14px">✦</span>
      <div class="ai-body">
        <div class="ai-label">AI · ${c.name} Analysis</div>
        <p class="ai-text" style="font-size:11.5px">
          ${c.name} has a <strong>${c.ksiPct} KSI rate</strong> with ${c.infraGaps.length} infrastructure gap${c.infraGaps.length > 1 ? 's' : ''}.
          Enforcement is <strong>${c.enfStatus}</strong> — citations are ${c.enfStatus === 'gap' ? 'significantly below the crash rate' : 'partially covering the risk profile'}.
          ${c.grantFit ? 'This corridor qualifies for HSIP and ATP grant programs.' : ''}
        </p>
      </div>
    </div>
    <div style="display:flex;flex-direction:column;gap:6px">
      ${c.infraGaps.map(g => `
        <div style="padding:8px 10px;background:#fdf4ff;border:1px solid #e9d5ff;border-radius:6px;font-size:11px;color:var(--purple)">${g}</div>
      `).join("")}
    </div>
    ${c.grantFit ? `
      <div style="margin-top:12px;padding:10px 12px;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:6px">
        <div style="font-size:10px;font-weight:700;color:var(--green);text-transform:uppercase;margin-bottom:4px">Grant Opportunity</div>
        <div style="font-size:11px;color:#166534">This corridor's collision + infra data supports an HSIP or ATP application. Use the Grant tab to generate draft language.</div>
        <button onclick="setSecondaryTab(null,'Grant')" style="margin-top:8px;padding:5px 10px;background:var(--green);color:white;border:none;border-radius:4px;font-size:11px;font-weight:500;cursor:pointer;font-family:var(--font)">Open Grant Builder →</button>
      </div>
    ` : ''}
  `;
}

/* ── Map Interaction Handlers ── */

function selectCorridor(name) {
  document.getElementById("primary-info-content").innerHTML = primaryInfoCorridor(name);
  document.getElementById("secondary-content").innerHTML = secondaryCorridorContext(name);
  // reset secondary tab to Context
  document.querySelectorAll(".inner-tab").forEach((t,i) => t.classList.toggle("active", i === 0));
  showToast(`Selected: ${name}`);
}

function setMapLevel(level) {
  ["city","district","corridor","intersection"].forEach(l => {
    const el = document.getElementById(`map-level-${l}`);
    if (el) el.style.color = l === level ? "var(--blue)" : "var(--t3)";
  });
  showToast(`Map level: ${level}`);
}

function toggleMapLayer(el, layer) {
  el.classList.toggle("active");
  showToast(`Layer ${el.classList.contains("active") ? "on" : "off"}: ${layer}`);
}

function setSecondaryTab(el, tabName) {
  // Update tab active state
  document.querySelectorAll(".inner-tab").forEach(t => {
    t.classList.toggle("active", t.textContent === tabName);
  });

  const content = document.getElementById("secondary-content");
  if (!content) return;

  if      (tabName === "Context")          content.innerHTML = secondaryContextDefault();
  else if (tabName === "Factors")          content.innerHTML = `<div class="gap-warning"><span>⚠</span><div>Factor Explorer for selected entity.<br><a href="#" onclick="setNav('Factor Explorer');return false;" style="color:var(--blue)">Open full Factor Explorer →</a></div></div>`;
  else if (tabName === "Violations")       content.innerHTML = `<div class="ai-bar"><span>✦</span><div class="ai-body"><div class="ai-label">Violations · Selected Entity</div><p class="ai-text">Citation breakdown for the selected corridor or intersection. Cross-reference PCF codes with citation categories.</p></div></div>`;
  else if (tabName === "Countermeasures")  content.innerHTML = `<div style="padding:8px 0">${[corridors[0]].map(c => `<div class="cm-card"><div class="cm-icon">🚦</div><div class="cm-title">Speed Camera Program</div><p class="cm-body">Recommended for high-speed corridors with enforcement gap. Projected KSI reduction 18–24%.</p><div class="cm-meta"><span class="badge badge-gray" style="font-size:10px">HSIP eligible</span><span class="badge badge-gray" style="font-size:10px">Est. $280K</span></div></div>`).join("")}</div>`;
  else if (tabName === "What-If")          content.innerHTML = `<div class="ai-bar" style="flex-direction:column"><div class="ai-label" style="margin-bottom:8px">What-If Simulator</div><p class="ai-text" style="font-size:11px">Select a countermeasure and adjust compliance to see projected KSI reduction and 5-year savings.</p></div><div style="margin-top:12px;font-size:11px;color:var(--t3);text-align:center">Full simulator coming in next build</div>`;
  else if (tabName === "Grant")            content.innerHTML = `<div style="display:flex;flex-direction:column;gap:10px"><div style="padding:10px 12px;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:6px"><div style="font-size:10px;font-weight:700;color:var(--green);text-transform:uppercase;margin-bottom:4px">Problem Statement</div><div style="font-size:11px;color:var(--t2)">Clayton Road has experienced 7 fatalities and a 32.6% KSI rate over the study period, significantly above the citywide average of 25.0%...</div></div><div style="padding:10px 12px;background:#eff6ff;border:1px solid #bfdbfe;border-radius:6px"><div style="font-size:10px;font-weight:700;color:var(--blue);text-transform:uppercase;margin-bottom:4px">Proposed Solution</div><div style="font-size:11px;color:var(--t2)">Installation of RRFB devices at 4 uncontrolled pedestrian crossings, LED lighting retrofit on 0.8mi unlit segment, and sidewalk fill connecting Ygnacio Valley Rd to Oak Park Blvd...</div></div><button onclick="showToast('Grant language exported')" style="padding:8px;background:var(--green);color:white;border:none;border-radius:6px;font-size:12px;font-weight:500;cursor:pointer;font-family:var(--font)">↗ Export Grant Language</button></div>`;
}

function handleAIQuery(query) {
  if (!query || !query.trim()) return;
  const input = document.getElementById("ai-input");
  if (input) input.value = "";

  const content = document.getElementById("secondary-content");
  if (!content) return;

  // Prototype response — full AI integration TBD
  content.innerHTML = `
    <div class="ai-bar" style="margin-bottom:12px">
      <span style="font-size:14px">✦</span>
      <div class="ai-body">
        <div class="ai-label">AI Response</div>
        <p class="ai-text" style="font-size:11.5px">
          Analyzing: <em>"${query}"</em><br><br>
          Based on the current map context, the highest-priority corridors are Clayton Rd (CF 88) and Oak Grove Rd (CF 82). Both have critical enforcement gaps and multiple infrastructure deficiencies that directly correlate with fatal collision patterns.
        </p>
      </div>
    </div>
    <div style="display:flex;flex-direction:column;gap:6px;margin-top:8px">
      <div style="padding:8px 10px;background:#fef2f2;border-radius:6px;font-size:11px"><strong>Top factor:</strong> PCF 03 — Unsafe Speed · 312 crashes · 28.2% KSI rate</div>
      <div style="padding:8px 10px;background:#faf5ff;border-radius:6px;font-size:11px"><strong>Infrastructure gap:</strong> No RRFB at 4 pedestrian crossings on Clayton Rd</div>
      <div style="padding:8px 10px;background:#f0fdf4;border-radius:6px;font-size:11px"><strong>Recommended action:</strong> Speed camera + RRFB install · Est. $460K · HSIP eligible</div>
    </div>
  `;
  showToast("AI response generated");
}
