/* ── Charts ───────────────────────────────────────────────────────────────────
   Chart.js wrappers. Add new chart initialisers here.
   Called by renderPage() via setTimeout(initCharts, 50) after DOM injection.
─────────────────────────────────────────────────────────────────────────────── */

let chartInstances = {};

function initCharts() {
  /* Destroy any existing instances before re-rendering */
  Object.values(chartInstances).forEach(c => c.destroy && c.destroy());
  chartInstances = {};

  /* ── Severity trend line chart (Overview page) ── */
  const trendCtx = document.getElementById("trendChart");
  if (trendCtx) {
    const years = ["2014","2015","2016","2017","2018","2019","2020","2021","2022","2023","2024","2025"];
    chartInstances.trend = new Chart(trendCtx, {
      type: "line",
      data: {
        labels: years,
        datasets: [
          {
            label: "Visible Injury",
            data: [100,110,108,115,112,108,72,88,100,105,96,44],
            borderColor: "#3b82f6", backgroundColor: "rgba(59,130,246,0.1)",
            fill: true, tension: 0.4, borderWidth: 2, pointRadius: 3
          },
          {
            label: "Severe Injury",
            data: [26,22,28,30,25,22,18,32,28,24,20,10],
            borderColor: "#f59e0b", backgroundColor: "rgba(245,158,11,0.12)",
            fill: true, tension: 0.4, borderWidth: 2, pointRadius: 3
          },
          {
            label: "Fatal",
            data: [5,6,4,5,6,4,5,7,5,4,3,2],
            borderColor: "#dc2626", backgroundColor: "rgba(220,38,38,0.12)",
            fill: true, tension: 0.4, borderWidth: 2.5, pointRadius: 3
          },
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: "index", intersect: false },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "white",
            titleColor: "#0f172a", bodyColor: "#475569",
            borderColor: "#f1f5f9", borderWidth: 1, padding: 10,
            titleFont: { family: "DM Sans", weight: "600", size: 12 },
            bodyFont:  { family: "DM Sans", size: 12 }
          }
        },
        scales: {
          x: { grid: { color: "#f1f5f9" }, ticks: { color: "#94a3b8", font: { family: "DM Sans", size: 11 } }, border: { display: false } },
          y: { grid: { color: "#f1f5f9" }, ticks: { color: "#94a3b8", font: { family: "DM Sans", size: 11 } }, border: { display: false } }
        }
      }
    });
  }

  /* ── VRU dot matrix (Infrastructure Gap page) ── */
  const dm = document.getElementById("dotMatrix");
  if (dm) {
    const types = [
      ...Array(11).fill("#dc2626"),  // missing sidewalk
      ...Array(8).fill("#7c3aed"),   // no RRFB
      ...Array(4).fill("#d97706"),   // no lighting
      ...Array(2).fill("#2563eb"),   // no bike infra
      ...Array(4).fill("#94a3b8"),   // no gap nearby
    ];
    dm.innerHTML = types.map(c => `<div class="dot-cell" style="background:${c}"></div>`).join("");
  }
}
