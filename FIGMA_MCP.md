# Figma MCP — Connection & usage for TMS Insights

## Project snapshot

**TMS Insights** is a **vanilla HTML/CSS/JS** dashboard (no React/Vue). It’s a single-page app for **Concord Collision Analytics** with:

- **Shell:** `index.html` + `css/shell.css` (sidebar, nav, main).
- **Design tokens:** `css/tokens.css` (colors, fonts, layout; single source of truth).
- **Components:** `css/components.css` (cards, KPIs, tabs, tables, buttons, etc.).
- **Pages:** `pages/*.js` each export one function that returns HTML (e.g. `overviewHTML()`).
- **Router:** `js/nav.js` — `navData` drives sidebar; `renderPage(label)` injects into `#main-content`.
- **Data:** `js/data.js` (e.g. `corridors`); charts in `js/charts.js`.
- **Assets:** `assets/` for images/icons (no bundler; reference as `assets/...`).

So: **no framework, no Tailwind.** Any Figma-generated code must be translated into this stack and token system.

---

## Figma MCP status

You have **two** Figma-related MCP servers available:

| Server | Role |
|--------|------|
| **user-Figma Desktop** | Main design-to-code: `get_design_context`, `get_screenshot`, `get_metadata`, `get_variable_defs`, `create_design_system_rules`. Uses the **currently open file and selection** in the Figma desktop app. |
| **plugin-figma-figma** | May require auth; if STATUS.md says so, call `mcp_auth` with `{}` once so its tools work. |

**To use Figma MCP with this project:**

1. **Figma Desktop:** Have the Figma desktop app open with the file (and optionally the frame/component) you want to implement.
2. **In Cursor:** Refer to a node by **Figma URL** (e.g. `https://figma.com/design/:fileKey/:fileName?node-id=1-2`) or by **node ID** (e.g. `1:2` or `1-2`). If you don’t pass a node ID, the MCP uses the **current selection** in Figma.
3. **Workflow:** Prefer `get_design_context` for layout, typography, colors, and structure; use `get_screenshot` for visual reference. For large frames, use `get_metadata` first, then `get_design_context` on specific child node IDs.

No extra “connection” step is required in the repo — the project is “connected” by using these MCP tools from Cursor while having the right file open in Figma.

---

## How to implement a Figma design in this project

1. **Get context:** Call `get_design_context` with:
   - `nodeId`: from URL (`node-id=1-2` → `1:2`) or current selection.
   - `clientLanguages`: `"html,css,javascript"`.
   - `clientFrameworks`: `"vanilla"`.
2. **Visual check:** Call `get_screenshot` with the same `nodeId` to compare.
3. **Translate, don’t paste:** Figma often returns React/Tailwind. For TMS Insights you must:
   - Output **plain HTML** (one or more fragments).
   - Use **CSS classes** from `css/tokens.css`, `css/shell.css`, and `css/components.css`.
   - Map Figma colors/fonts/spacing to **existing tokens** (e.g. `--t1`, `--blue`, `--font`, `--sidebar`).
   - Put new page content in a new or existing `pages/*.js` function that returns an HTML string, and register it in `js/nav.js` in `navData` and `renderPage()`.
4. **Assets:** If Figma MCP returns asset URLs (e.g. localhost), use them as provided; for long-term use, save under `assets/` and reference from there.

Design system rules that match this stack are in **`.cursor/rules/figma-design-system.md`** — use them so every Figma implementation stays consistent with the existing app.

---

## Quick reference: Figma MCP tools

- **get_design_context** — Layout, typography, colors, structure (primary tool).
- **get_screenshot** — Raster preview for visual parity.
- **get_metadata** — Node tree (IDs, types, names); use for big frames before calling `get_design_context` on children.
- **get_variable_defs** — Figma variables (e.g. colors) for the node.
- **create_design_system_rules** — Generates a prompt to build design-system rules for the repo (already done in `.cursor/rules/figma-design-system.md`).

Use **node IDs** in format `1:2` or `1-2`; from a URL like `?node-id=42-15` use `42:15` (or `42-15` where the tool accepts it).
