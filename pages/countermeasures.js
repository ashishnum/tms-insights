/* ── Countermeasures Page ─────────────────────────────────────────────────────
   Intervention recommendations derived from the 3-layer causal chain.
   Each card is traceable: collision pattern → enforcement gap → infra gap → fix.
─────────────────────────────────────────────────────────────────────────────── */

function countermeasuresHTML() {
  return `
    <div class="page-hd">
      <h1 class="page-title">Countermeasures <span class="page-badge">Infrastructure-Linked</span></h1>
      <p class="page-meta">Recommendations derived from Collision + Violations + Infrastructure chain · Grant program matched</p>
    </div>

    <div class="ai-bar">
      <span style="font-size:15px;margin-top:1px">✦</span>
      <div class="ai-body">
        <div class="ai-label">AI Insight — Countermeasures from 3-Layer Chain</div>
        <p class="ai-text">Every countermeasure below is traceable: collision data identified the pattern, violations data confirmed enforcement absence, and infrastructure data supplied the physical deficiency. The causal chain is complete and grant-document ready.</p>
      </div>
      <button class="export-btn" onclick="showToast('Countermeasure report exported')">↗ Export for Grant</button>
    </div>

    <div class="cm-grid">
      ${[
        { icon:"🚦", title:"Speed Camera Program — Clayton Rd + Oak Grove Rd",         body:"Speed citations/fatal ratio 3× below threshold. Automated enforcement at 4 identified nodes. Projected KSI reduction: 18–24%.",                                                      tags:["Speed PCF 03","Citation gap","HSIP eligible","Est. $280K"]   },
        { icon:"🚶", title:"RRFB Install — Oak Grove Rd × Mitchell Ct",                body:"Repeating fatal location (2018 + 2022). No crossing control. RRFB + pedestrian refuge island. Collision-infrastructure chain directly supports application.",                          tags:["Fatal × 2","No RRFB","HSIP Critical","Est. $180K"]           },
        { icon:"💡", title:"LED Lighting Retrofit — Oak Grove Rd (0.6 mi)",            body:"100% of dark KSI crashes on this segment in an unlit zone. Lighting is the single highest-correlation infrastructure fix in the dataset.",                                             tags:["3 dark-KSI","No lighting","RAISE eligible","Est. $240K"]     },
        { icon:"🛤️", title:"Sidewalk Fill — Clayton Rd (0.8 mi)",                      body:"4 of 7 Clayton Rd fatals in the no-sidewalk segment. Pedestrians forced into travel lane at 45 mph. ATP Cycle 7 best-fit project.",                                                   tags:["4 fatals","No sidewalk","ATP Cycle 7","Est. $840K"]          },
        { icon:"↩️", title:"Protected Left-Turn Phase — Willow Pass Rd (3 signals)",   body:"38% of Willow Pass KSI attributable to unprotected left turns. 3 signal upgrades eliminate the shared phase conflict.",                                                              tags:["38% of KSI","3 signals","HSIP signal","Est. $420K"]          },
        { icon:"🚲", title:"Bike Lane Completion — Treat Blvd × Bushy Rd (0.5 mi)",   body:"Wrong-way riding concentrated near this 0.5-mile gap. PCF 07 wrong-side-of-road pattern directly traceable to absent infrastructure.",                                               tags:["PCF 07","Lane gap","ATP eligible","Est. $190K"]              },
        { icon:"🌃", title:"Full Infrastructure Package — Monument Blvd",              body:"Highest compound risk score (86). Critical enforcement gap + no lighting + no sidewalk. Bundled ATP + RAISE application justified.",                                                  tags:["CF Score 86","3 gaps","ATP+RAISE","Est. $1.1M"]              },
        { icon:"🚔", title:"Targeted DUI Patrols — Clayton Rd + Monument Blvd",       body:"DUI citations/alcohol-fatal ratio: 22 (Clayton) and 5 (Monument) vs. 62 on enforced corridors. Concentrated enforcement on Sunday night (KSI paradox).",                             tags:["DUI gap","Sunday nights","Operational","No cost"]            },
        { icon:"📋", title:"Pedestrian Education + Outreach — VRU Corridors",         body:"PCF 11 citation ratio 0.4× — enforcement nearly absent. Outreach + wayfinding can supplement where enforcement is limited near the identified crossing gaps.",                        tags:["PCF 11","Low enforcement","Soft measure","Est. $60K"]        },
      ].map(cm => `
        <div class="cm-card">
          <div class="cm-icon">${cm.icon}</div>
          <div class="cm-title">${cm.title}</div>
          <p class="cm-body">${cm.body}</p>
          <div class="cm-meta">${cm.tags.map(t => `<span class="badge badge-gray" style="font-size:10px">${t}</span>`).join("")}</div>
        </div>
      `).join("")}
    </div>
  `;
}
