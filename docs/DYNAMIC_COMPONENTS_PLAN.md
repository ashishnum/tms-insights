# Dynamic components plan — H2D_TMS-Insights (Figma)

Based on the Figma file [H2D_TMS-Insights](https://www.figma.com/design/zFce2OxB3czT8Pvr7grMVB/H2D_TMS-Insights?node-id=42-488): **Page 2** “1920w light” and related frames. This doc maps Figma structure to **data-driven components** and implementation steps.

---

## 1. High-level layout (from Figma)

- **Sidebar (left, 224px):** Brand, nav sections (Dashboard, AI Intelligence, Deep Analysis, Action), footer version.
- **Main:** Three-column content:
  - **Left:** Page title + filter chips + **map** (with controls, legend, layer toggles).
  - **Center:** **Location detail card** — selected location, severity, “Key Signals” (collision attributes), **AI Insights** list + input.
  - **Right:** **Insights panel** — Header/Subheader, Overview | Violations tabs, **KPI grid**, **Severity Trend** chart, **Key Anomalies** cards, **Fatal Profile** stats.

Below we treat each **dynamic** piece as a component: what’s dynamic, where data lives, and how it fits the current app.

---

## 2. Dynamic components (planned)

### 2.1 Filter button group (top-left, above map)

| Aspect | Plan |
|--------|------|
| **Figma** | “Frame 102” — multiple Button instances (e.g. filter chips). |
| **Dynamic** | Labels, active state, count badges. Options may come from data (e.g. regions, corridors, project types). |
| **Data** | Extend `js/data.js`: e.g. `filterChips = [{ id, label, count?, active }]` or derive from `corridors` / API. |
| **Component** | Single reusable block: render list of chips, `onclick` toggles active and triggers `onFilterChange` (e.g. re-fetch or filter map/panels). |
| **State** | Current selection in memory (or URL); pass into map and right-hand panels. |

---

### 2.2 Map (left column)

| Aspect | Plan |
|--------|------|
| **Figma** | Map image + MapLibre-style controls (zoom in/out, compass), attribution, layer toggles (Switch x2), legend (Fatal / Severe Injury / Visible Injury). |
| **Dynamic** | Markers/clusters from collision data; selected location; which layers are on/off; basemap/style. |
| **Data** | Reuse/expand `corridors` and collision points (lat/lng, severity, type). Optional: GeoJSON or API for clusters. |
| **Component** | One **Map** component: container + init MapLibre (or current map lib), subscribe to `filterState` and `selectedLocation`. Legend and layer toggles are small sub-components bound to same state. |
| **State** | `mapLayers: { collision: true, violations?: boolean, infrastructure?: boolean }`, `selectedLocation: { id, name, lat, lng, severity, ... }`. |
| **Integration** | Fits “Map Intelligence” page; can also be embedded in a “Concord City” overview (Figma title). |

---

### 2.3 Location detail card (center)

| Aspect | Plan |
|--------|------|
| **Figma** | “Safety Analyst” badge, “Selected Location :” + value, “Severity :” + value, “Key Signals” (label + value rows), “AI Insights” (list of insight text + input + send). |
| **Dynamic** | All content: selected location name, severity, key signals (Collision Type, Cause, Bicycle Involved, Lighting, Weather, Injured, Fatalities), AI insight bullets. |
| **Data** | `selectedLocation` object; key signals = fields from collision/event record; AI insights = array of strings (from API or mock). |
| **Component** | **LocationDetailCard**: props `{ location, signals, aiInsights, onAskSubmit }`. Renders header, key-value rows, list of insights, input + button. |
| **State** | `selectedLocation` (from map click or list); `aiInsights[]` (append on send); optional loading state for “ask”. |

---

### 2.4 Right panel — tab strip (Overview / Violations)

| Aspect | Plan |
|--------|------|
| **Figma** | “Overview” | “Violations” buttons. |
| **Dynamic** | Active tab; content below switches (KPI set + chart + anomalies vs violations-specific content). |
| **Component** | **TabStrip**: tabs config `[{ id: 'overview', label: 'Overview' }, { id: 'violations', label: 'Violations' }]`, `activeTab`, `onChange`. Panel content switches by `activeTab`. |
| **State** | `rightPanelTab: 'overview' | 'violations'`. |

---

### 2.5 Right panel — KPI grid (4 metrics)

| Aspect | Plan |
|--------|------|
| **Figma** | Four small cards: Total Collisions (1,499), Fatalities (56), Total Injured (2,057), Top Corridor (Clayton Rd). |
| **Dynamic** | All four values; may be global or filtered by map/filters. |
| **Data** | From `js/data.js` aggregates or API: e.g. `totals: { collisions, fatalities, injured }, topCorridor: { name }`. |
| **Component** | **KPIGrid**: array of `{ label, value }`. Reuse existing `.kpi` styling; ensure responsive grid (2x2). |
| **State** | Derived from current filters + `corridors` (or API response). |

---

### 2.6 Severity Trend chart (2014–2025)

| Aspect | Plan |
|--------|------|
| **Figma** | “Severity Trend (2014-2025)” — stacked/area chart, years on X, values on Y; AI note below (e.g. “KSI rate peak: 31.19% in 2021…”). |
| **Dynamic** | Series data (Fatal, Severe Injury, Visible Injury by year); optional AI summary text. |
| **Data** | Time-series in `data.js` or API; already have similar in `charts.js` (trendChart). |
| **Component** | Keep using Chart.js; ensure one chart instance per container (e.g. `#severityTrendChart`). **ChartSeverityTrend**: accepts `{ series, years, aiSummary? }`. |
| **State** | Data derived from filters; AI summary can be static or from backend. |

---

### 2.7 Key Anomalies — critical findings (card list)

| Aspect | Plan |
|--------|------|
| **Figma** | “Key Anomalies — Critical Findings” — list of cards: icon + title + 2 lines of body (e.g. “Wrong-Way Driving = Alcohol”, “Pedestrian Violation: Deadliest PCF”, “KSI Rate Nearly Doubled”, “Hit-and-Run VRU Bias”). |
| **Dynamic** | List length and content (title, body lines). |
| **Data** | Array of `{ title, bodyLines[], icon? }` from analysis or API (e.g. anomaly rankings). |
| **Component** | **AnomalyCardList**: map over `anomalies[]`; each item is a small card (reuse `.card` or similar). |
| **State** | `anomalies` array; optionally filtered by tab (overview vs violations). |

---

### 2.8 Fatal Profile (stats list)

| Aspect | Plan |
|--------|------|
| **Figma** | “Fatal Profile (56 Deaths)” — rows of label + value (e.g. “Dark conditions” 64.8%, “Alcohol involved” 44.4%). |
| **Dynamic** | All rows (label + percentage or value). |
| **Data** | Structured object or array, e.g. `fatalProfile: [{ label, value }]` from `data.js` or API. |
| **Component** | **FatalProfile**: takes `profile: [{ label, value }]`; renders two-column rows. Style with existing typography/tokens. |
| **State** | Derived from dataset (global or filtered). |

---

### 2.9 AI Insights (center card) — list + input

| Aspect | Plan |
|--------|------|
| **Figma** | “Insight Engine” section: list of clickable insight lines + text input + purple send button. |
| **Dynamic** | List items; input value; optional loading/disabled state. |
| **Data** | `aiInsights[]` (strings); new items appended when user sends. |
| **Component** | **InsightList** + **InsightInput**: list renders `aiInsights`; input has `onSubmit(text)`. |
| **State** | `aiInsights` (array); `inputValue`; optional `sending`. |

---

### 2.10 Sidebar nav (existing, align with Figma)

| Aspect | Plan |
|--------|------|
| **Figma** | Sections: Dashboard, AI Intelligence, Deep Analysis, Action; same items as current `navData`. Figma shows “Enforcement Gap” etc. under Deep Analysis; “Map Intelligence”, “Countermeasures” under Action. |
| **Dynamic** | Nav items and “NEW” badges; active route. |
| **Component** | Already in `js/nav.js`; ensure labels match Figma and add any missing items (e.g. “Temporal” under Deep Analysis if desired). |

---

## 3. Data layer (summary)

- **Existing:** `js/data.js` — `corridors` (and any other globals). `js/charts.js` — Chart.js, trend + dot matrix.
- **To add / extend:**
  - **Filter state:** e.g. `filterState = { chips: [], selectedLocationId?: string }`.
  - **Map state:** `mapLayers`, `selectedLocation` (full object for location detail + key signals).
  - **Right panel:** `rightPanelTab`; aggregates for KPIs; `anomalies[]`; `fatalProfile[]`.
  - **AI:** `aiInsights[]`; optional `onAskSubmit` → API then append to `aiInsights`.
- **Optional:** Single `appState` object updated by filter/map/panel actions and passed into components (or read from globals for simplicity).

---

## 4. Implementation order (suggested)

1. **Data & state** — Extend `data.js` with structures for filters, selected location, anomalies, fatal profile; add minimal state vars (or one `appState`).
2. **Right panel first (no map):** Tab strip → KPI grid → Severity Trend chart → Anomaly cards → Fatal Profile. Reuse existing `.kpi`, `.card`, Chart.js.
3. **Center card** — Location detail (selected location + key signals) + AI Insights list + input. Hook “selected location” to state (mock then map).
4. **Filter chips** — Render from data, toggle active, wire to state so KPIs/chart/panels can react.
5. **Map** — MapLibre (or existing map) in a dedicated container; legend and layer toggles; on marker/click set `selectedLocation` and update location detail card.
6. **Polish** — Match Figma spacing/tokens (see `.cursor/rules/figma-design-system.md`), responsive behaviour, loading states.

---

## 5. Figma node IDs (quick reference)

- **Page 2:** `42:488`
- **1920w light (main frame):** `42:490`
- **Sidebar:** `42:492`
- **Main content area:** `42:645`
- **Left column (title + filters + map):** `42:647`
- **Map container:** `42:664`
- **Center card (location + insights):** `42:709`
- **Right panel (tabs + KPIs + chart + anomalies + fatal profile):** `42:795`

Use these with `get_design_context` or `get_screenshot` for detailed implementation of a specific block (e.g. center card or right panel).

---

## 6. Code Connect (Figma)

Some Figma components in this file are not yet connected to code. If you want to map Figma components to your codebase for better codegen, say so and we can run Code Connect suggestions for this file (`fileKey: zFce2OxB3czT8Pvr7grMVB`, `nodeId: 42:488`).
