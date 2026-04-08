# TMS Dashboard — JSON-Driven Card System Strategy

> Derived from Figma file: **TMS Insights - Redone** (`node 2:120`, Components - Cards page)
> ~60 named `Card-*` components observed. All share the same anatomical skeleton.

---

## Core Idea

The designs have **~60 named card components** (`Card-*`). They all share the **same anatomical skeleton** — only the content zone and footer variant change. That means you build **one card renderer**, not 60 components.

- The **CMS** holds one JSON document per card.
- Each document describes: what chart to render, what the header/footer say, how wide the card sits in the grid.
- A single **Card Engine** reads the JSON and renders the correct template.
- A new card = adding a JSON document. A new page = a JSON array referencing card IDs. No code changes.

---

## Card Anatomy (from Figma)

Every card has exactly these zones:

```
┌─────────────────────────────────────────┐
│  HEADER                                 │
│  • label (ALL CAPS category eyebrow)    │
│  • heading (main title, 16px)           │
│  • subheading (optional, 13px)          │
│  • badge[] (status pills — optional)    │
│  • action (link text top-right)         │
│  ─────────────────────────────────────  │  ← divider always present
├─────────────────────────────────────────┤
│  BODY                                   │
│  • chartType                            │
│  • chartData                            │
│  • chartConfig                          │
├─────────────────────────────────────────┤
│  FOOTER  (one of 6 types)               │
└─────────────────────────────────────────┘
```

---

## The 6 Footer Types (from Figma)

| `footer.type` | Figma layer name | What it contains |
|---|---|---|
| `none` | — | No footer |
| `note` | `Note` | Left-bordered insight text, 1–2 lines |
| `legend` | `Legend` | Color swatch + label items (Broadside, Rear End, etc.) |
| `ai_insight` | `Card-AIInsight` / `Card-AISummary` | Glowing dot + "AI INSIGHT" label + paragraph |
| `cta` | `What-If CTA`, `→ Risk Clock` | Call-to-action button / link |
| `mini_stats` | `FatMinis`, `Insights` pills | 2–3 inline mini KPIs |

---

## The 10 Chart Types (from Figma)

| `chart.type` | Figma card examples |
|---|---|
| `kpi_grid` | Card-KPIs (2×2 stat tiles) |
| `bar_horizontal` | Severity breakdown, Fatal profile, Odds Ratio |
| `bar_stacked` | Collision Type Mix — Signatures (StkBar rows) |
| `bar_vertical` | Daily Collisions by Hour (24h bars) |
| `ranked_list` | Predicted Risk, Corridor KSI rates |
| `anomaly_list` | Key Anomalies (icon + title + desc + badge) |
| `heatmap` | Card-RiskClock (7×24 day×hour grid) |
| `amplification_grid` | Card-Amplification (2×2 factor multiplier tiles) |
| `radar` | Card-RadarChart |
| `period_comparison` | Card-PeriodComp (A vs B side-by-side) |

---

## Layout / Column System

From observed Figma dimensions:

| Figma width | `colSpan` | Use case |
|---|---|---|
| 198px | `3` | Single KPI cell (half of a 2-up pair) |
| 418–444px | `5` | Inset sub-card within a panel |
| 454px | `6` | Standard sidebar / panel card |
| 520px | `8` | Wide card (infrastructure, complaints) |
| Full canvas | `12` | Full-width KPI row or table |

> Grid rule: cards in the same row must have spans that sum to 12, or use `auto-wrap`.

---

## The JSON Schema

```json
{
  "id": "card-severity-breakdown",
  "label": "SEVERITY · 2014–2025",
  "heading": "Severity breakdown",
  "subheading": null,
  "badges": [],
  "action": null,

  "layout": {
    "colSpan": 6,
    "minHeight": 174,
    "padding": 16
  },

  "chart": {
    "type": "bar_horizontal",
    "config": {
      "showValues": true,
      "valueFormat": "percent"
    },
    "data": [
      { "label": "Visible injury", "value": 75, "color": "amber" },
      { "label": "Severe injury",  "value": 21, "color": "orange" },
      { "label": "Fatal",          "value": 4,  "color": "red" }
    ]
  },

  "footer": {
    "type": "note",
    "text": "KSI peaked at 32.4% in 2025 — up from 20.7% in 2014"
  }
}
```

---

## Example: KPI Grid Card

```json
{
  "id": "card-kpis",
  "label": "CITY-WIDE KPIS · 2014–2025",
  "heading": "City-wide KPIs",
  "subheading": null,
  "badges": [],
  "action": null,

  "layout": { "colSpan": 6 },

  "chart": {
    "type": "kpi_grid",
    "config": { "columns": 2 },
    "data": [
      { "label": "Total Collisions", "value": "1,532", "subtext": "2014–2025" },
      { "label": "Fatalities",       "value": "58",    "subtext": "3.8% rate" },
      { "label": "KSI Rate",         "value": "25.1%", "subtext": "↑ 32.4% in 2025" },
      { "label": "Total Injured",    "value": "2,099", "subtext": "1,147 visible" }
    ]
  },

  "footer": { "type": "none" }
}
```

---

## Example: AI Insight Footer

```json
{
  "id": "card-corridor-clayton",
  "label": "CORRIDOR · CLAYTON RD",
  "heading": "Clayton Rd analysis",
  "subheading": null,
  "badges": [{ "label": "High Risk", "variant": "danger" }],
  "action": { "label": "Deep dive →", "href": "/corridor/clayton" },

  "layout": { "colSpan": 6 },

  "chart": {
    "type": "bar_horizontal",
    "config": { "showValues": true, "valueFormat": "percent" },
    "data": []
  },

  "footer": {
    "type": "ai_insight",
    "text": "Enhanced signal timing + visibility measures is the single most impactful intervention for Clayton Rd. Broadside collisions (37.7%) dominate, driven by signal-conflict pattern at Oak Grove Rd junction. 8 fatalities make this the city's #1 priority corridor for countermeasure investment."
  }
}
```

---

## Example: Legend Footer

```json
{
  "footer": {
    "type": "legend",
    "items": [
      { "label": "Broadside", "color": "blue" },
      { "label": "Rear End",  "color": "teal" },
      { "label": "Veh/Ped",  "color": "amber" },
      { "label": "Hit Obj",   "color": "red" }
    ]
  }
}
```

---

## Example: CTA Footer

```json
{
  "footer": {
    "type": "cta",
    "label": "⚡ What-If Simulator",
    "href": "/what-if"
  }
}
```

---

## Example: Mini Stats Footer

```json
{
  "footer": {
    "type": "mini_stats",
    "items": [
      { "value": "25", "label": "Ped fatal" },
      { "value": "7",  "label": "Moto fatal" },
      { "value": "6",  "label": "Bike fatal" }
    ]
  }
}
```

---

## Page Layout Document (CMS)

A full dashboard tab is a JSON object with an array of card IDs:

```json
{
  "pageId": "overview",
  "city": "Concord, CA",
  "dateRange": "2014–2025",
  "cards": [
    "card-kpis",
    "card-severity-breakdown",
    "card-fatal-profile",
    "card-vru",
    "card-amplification",
    "card-key-anomalies"
  ]
}
```

---

## Renderer Architecture

```
CMS JSON
   │
   ▼
CardRenderer
   ├── <CardHeader>        ← label, heading, subheading, badges, action
   ├── <ChartDispatcher>   ← switch(chart.type) → correct chart component
   │     ├── KPIGrid
   │     ├── HorizontalBarChart
   │     ├── StackedBarChart
   │     ├── VerticalBarChart
   │     ├── RankedList
   │     ├── AnomalyList
   │     ├── HeatmapGrid
   │     ├── AmplificationGrid
   │     ├── RadarChart
   │     └── PeriodComparison
   └── <FooterDispatcher>  ← switch(footer.type)
         ├── NoteFooter
         ├── LegendFooter
         ├── AIInsightFooter
         ├── CTAFooter
         └── MiniStatsFooter
```

---

## Key Developer Rules

1. **The card frame never changes** — border, padding, background, border-radius are always the same. Only the interior varies.
2. **`colSpan` drives the grid** — container is a 12-col CSS grid; each card declares its own span.
3. **`footer.type` is a discriminated union** — TypeScript-friendly; each type has its own required fields, no ambiguity.
4. **Chart data is always a `data[]` array** — the chart component handles rendering; the CMS just pushes rows.
5. **AI Insight footer is always the last zone** — in the Figma it always sits at the bottom of the card below the chart, never inline.
6. **Badges are separate from the heading** — they appear in the header as status pills (Critical, High Risk, MODERATE) and must be a `badges[]` array, never embedded in the title string.
7. **`action` is the top-right nav link** — e.g. "All 275 →", "Deep dive →", "Signatures →". Always optional.
8. **`label` is the category eyebrow** — rendered ALL CAPS in a muted color above the heading (e.g. `SEVERITY · 2014–2025`).

---

## Full Card Inventory (from Figma)

| Card name | `chart.type` | Width (px) | `footer.type` |
|---|---|---|---|
| Card-KPIs | `kpi_grid` | 454 | none |
| Card-Severity breakdown | `bar_horizontal` | 454 | note |
| Card-Fatal profile · 58 deaths | `bar_horizontal` | 454 | mini_stats |
| Card-VRU disproportionality | `period_comparison` | 454 | note |
| Card-Amplification | `amplification_grid` | 454 | note |
| Card-Key anomalies | `anomaly_list` | 454 | none |
| Card-Predicted risk (now) | `ranked_list` | 454 | none |
| Card-Collision Type Mix | `bar_stacked` | 454 | legend |
| Card-Collisions by hour of day | `bar_vertical` | 454 | mini_stats |
| Card-RiskClock | `heatmap` | 454 | note |
| Card-RiskClockHeatmap | `heatmap` | 454 | legend |
| Card-OddsRatios | `bar_horizontal` | 454 | none |
| Card-Corridor KSI rate ranking | `ranked_list` | 454 | none |
| Card-DarkAmplification | `bar_horizontal` | 454 | note |
| Card-Dark condition KSI delta | `bar_horizontal` | 454 | note |
| Card-PeriodComp | `period_comparison` | 454 | note |
| Card-KSI by collision type | `bar_horizontal` | 454 | note |
| Card-AIInsight | — (text only) | 418 | ai_insight |
| Card-AISummary | — (text only) | 444 | ai_insight |
| Card-WhatIf | `bar_horizontal` | 454 | cta |
| Card-RadarChart | `radar` | 454 | legend |
| Card-FactorHeatmap | `heatmap` | 454 | legend |
| Card-FactorFingerprint | `bar_horizontal` | 418 | none |
| Card-CollisionDNA | `anomaly_list` | 454 | ai_insight |
| Card-Collision DNA Archetypes | `anomaly_list` | 454 | ai_insight |
| Card-CrashTrend | `bar_vertical` | 444 | note |
| Card-YearTrend | `bar_vertical` | 418 | note |
| Card-HourlyPattern | `bar_vertical` | 444 | note |
| Card-HourlyVolume | `bar_vertical` | 454 | note |
| Card-DayOfWeek | `bar_vertical` | 454 | note |
| Card-SeverityBreakdown | `bar_horizontal` | 444 | none |
| Card-SeverityComparison | `bar_horizontal` | 454 | note |
| Card-Severity Distribution Model | `bar_horizontal` | 454 | note |
| Card-TypeBreakdown | `bar_stacked` | 454 | legend |
| Card-TypeDist | `bar_stacked` | 454 | legend |
| Card-PCFBreakdown | `bar_horizontal` | 454 | none |
| Card-ViolationTypes | `bar_horizontal` | 454 | none |
| Card-ViolationHour | `bar_vertical` | 454 | note |
| Card-ViolationTrend | `bar_vertical` | 454 | note |
| Card-CombinedEffect | `amplification_grid` | 454 | note |
| Card-PeriodShift | `period_comparison` | 454 | note |
| Card-BeforeAfter | `period_comparison` | 454 | note |
| Card-RiskGauge | `risk_gauge` | 444 | none |
| Card-TemporalMini | `heatmap` | 418 | mini_stats |
| Card-Grants | `ranked_list` | 454 | cta |
| Card-HAWKRec | `ranked_list` | 454 | cta |
| Card-ComplaintVolume | `bar_vertical` | 454 | note |
| Card-Silent hotspots | `anomaly_list` | 454 | ai_insight |
| Card-Highest scored | `anomaly_list` | 454 | ai_insight |
| Card-Anomalies actively deteriorating | `anomaly_list` | 454 | ai_insight |
| Card-4 corridor archetypes | `anomaly_list` | 454 | note |
| Card-Priority score by corridor | `ranked_list` | 520 | none |
| Card-Existing infrastructure | `anomaly_list` | 520 | none |
| Card-Missing infrastructure | `anomaly_list` | 520 | none |
| Card-Civilian complaints & solutions | `anomaly_list` | 520 | none |

---

## Summary

The entire TMS card system reduces to:

- **1 Card Shell component** (header + body + footer zones)
- **10 chart renderers** registered in a lookup table
- **6 footer types** (none, note, legend, ai_insight, cta, mini_stats)
- **4 badge variants** (highlight, warning, ai, info)
- **5 column spans** (3, 5, 6, 8, 12)
- **JSON documents** in the CMS — one per card, one per page/tab

> A new card = one JSON document.
> A new dashboard page = one page JSON referencing card IDs.
> A new chart type = one renderer + one registry entry.
> Nothing else changes.
