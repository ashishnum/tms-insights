/* ── Navigation ───────────────────────────────────────────────────────────────
   Sidebar nav structure and router.
   Add a new nav item here and create its page file in /pages/.
─────────────────────────────────────────────────────────────────────────────── */

const navData = [
  { section: "Dashboard", items: [
    { label: "Overview",         isNew: false },
    { label: "Ask the Data",     isNew: false },
    { label: "Anomaly Rankings", isNew: false },
  ]},
  { section: "AI Intelligence", items: [
    { label: "Collision DNA",    isNew: false },
    { label: "Risk Clock",       isNew: false },
    { label: "What-If Simulator",isNew: false },
    { label: "Factor Explorer",  isNew: true  },
  ]},
  { section: "Deep Analysis", items: [
    { label: "Corridor Typology",  isNew: true  },
    { label: "Conflict Matrix",    isNew: false },
    { label: "Silent Hotspots",    isNew: false },
    { label: "Enforcement Gap",    isNew: true  },
    { label: "Infrastructure Gap", isNew: true  },
    { label: "Amplification",      isNew: false },
    { label: "Signatures",         isNew: false },
  ]},
  { section: "Action", items: [
    { label: "Fatal Profile",   isNew: false },
    { label: "Map Intelligence",isNew: true  },
    { label: "Corridors",       isNew: false },
    { label: "Countermeasures", isNew: true  },
  ]},
];

let activeNav = "Overview";

function buildNav() {
  const nav = document.getElementById("nav");
  nav.innerHTML = navData.map(({ section, items }) => `
    <div class="nav-label">${section}</div>
    ${items.map(({ label, isNew }) => `
      <div class="nav-item ${label === activeNav ? "active" : ""}" onclick="setNav('${label}')">
        <span class="nav-dot"></span>${label}
        ${isNew ? `<span class="new-badge">NEW</span>` : ""}
      </div>
    `).join("")}
  `).join("");
}

function setNav(label) {
  activeNav = label;
  buildNav();
  renderPage(label);
}

/* ── Router ── */
function renderPage(page) {
  const main = document.getElementById("main-content");

  if      (page === "Overview")           main.innerHTML = overviewHTML();
  else if (page === "Enforcement Gap")    main.innerHTML = enforcementGapHTML();
  else if (page === "Infrastructure Gap") main.innerHTML = infraGapHTML();
  else if (page === "Corridor Typology")  main.innerHTML = corridorTypologyHTML();
  else if (page === "Factor Explorer")    main.innerHTML = factorExplorerHTML();
  else if (page === "Countermeasures")    main.innerHTML = countermeasuresHTML();
  else if (page === "Map Intelligence")   main.innerHTML = mapHTML();
  else                                    main.innerHTML = placeholderHTML(page);

  setTimeout(initCharts, 50);
}
