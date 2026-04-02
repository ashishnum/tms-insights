/* ── Shared Data ──────────────────────────────────────────────────────────────
   All mock corridor data lives here.
   When connecting to the real API, replace this file's exports.
─────────────────────────────────────────────────────────────────────────────── */

const corridors = [
  {
    name: "Clayton Rd", type: "Arterial",
    crashes: 187, ksi: 7, ksiPct: "32.6%",
    violations: { speed: 412, dui: 28, signal: 87, total: 527 },
    infraGaps: ["No sidewalk (0.8 mi)", "Missing RRFB at 4 ped crossings", "2 dark-lighting KSI nodes"],
    enfGap: "HIGH", cfScore: 88,
    enfStatus: "gap",
    grantFit: true
  },
  {
    name: "Willow Pass Rd", type: "Arterial",
    crashes: 143, ksi: 5, ksiPct: "29.4%",
    violations: { speed: 188, dui: 12, signal: 31, total: 231 },
    infraGaps: ["No protected left-turn phase (3 intersections)", "No bike lane (1.2 mi)"],
    enfGap: "MEDIUM", cfScore: 76,
    enfStatus: "partial",
    grantFit: true
  },
  {
    name: "Concord Blvd", type: "Arterial",
    crashes: 162, ksi: 3, ksiPct: "18.5%",
    violations: { speed: 589, dui: 8, signal: 214, total: 811 },
    infraGaps: ["No crosswalk mid-block (3 locations)", "Timing gap at Oak/Concord"],
    enfGap: "LOW", cfScore: 71,
    enfStatus: "enforced",
    grantFit: false
  },
  {
    name: "Oak Grove Rd", type: "Collector",
    crashes: 94, ksi: 3, ksiPct: "27.7%",
    violations: { speed: 67, dui: 4, signal: 9, total: 80 },
    infraGaps: ["No sidewalk (1.4 mi)", "No street lighting (0.6 mi dark segment)", "Missing ADA ramps x5"],
    enfGap: "HIGH", cfScore: 82,
    enfStatus: "gap",
    grantFit: true
  },
  {
    name: "Treat Blvd", type: "Arterial",
    crashes: 118, ksi: 2, ksiPct: "16.9%",
    violations: { speed: 340, dui: 15, signal: 78, total: 433 },
    infraGaps: ["Bike lane ends at Bushy Rd (0.5 mi gap)"],
    enfGap: "LOW", cfScore: 62,
    enfStatus: "enforced",
    grantFit: false
  },
  {
    name: "Monument Blvd", type: "Local",
    crashes: 71, ksi: 2, ksiPct: "22.5%",
    violations: { speed: 28, dui: 3, signal: 6, total: 37 },
    infraGaps: ["No pedestrian signal (2 crossings)", "No lighting (whole corridor)", "No sidewalk (0.9 mi)"],
    enfGap: "CRITICAL", cfScore: 86,
    enfStatus: "gap",
    grantFit: true
  },
];
