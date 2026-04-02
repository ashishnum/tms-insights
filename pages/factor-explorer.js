/* ── Factor Explorer Page ─────────────────────────────────────────────────────
   PCF codes cross-referenced against citation categories.
   Reuses pcfCitationTable() from enforcement-gap.js.
─────────────────────────────────────────────────────────────────────────────── */

function factorExplorerHTML() {
  return `
    <div class="page-hd">
      <h1 class="page-title">Factor Explorer <span class="page-badge">Violations Layer Added</span></h1>
      <p class="page-meta">PCF codes now cross-referenced against citation categories · Enforcement signal visible per factor</p>
    </div>

    <div class="gap-warning">
      <span>⚠</span>
      <div><strong>What changed in v2:</strong> Each PCF code is now linked to its corresponding citation category. PCF 11 (Pedestrian Violation) has a citation/crash ratio of 0.4× — meaning for every 10 pedestrian-violation crashes, only 4 citations were issued. This is the missing causal link. <a href="#" onclick="setNav('Enforcement Gap');return false;" style="color:var(--blue);font-weight:500">View full Enforcement Gap analysis →</a></div>
    </div>

    <div class="card">
      <div class="card-title" style="margin-bottom:4px">PCF Code × Citation Cross-Reference</div>
      <div class="card-sub" style="margin-bottom:16px">Each collision PCF category linked to its violation citation counterpart</div>
      ${pcfCitationTable()}
    </div>
  `;
}
