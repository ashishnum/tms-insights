# Figma → TMS Insights: design system rules

When implementing UI from Figma (via Figma MCP), follow these rules so output matches this project.

## 1. Token definitions

- **Location:** `css/tokens.css`
- **Format:** CSS custom properties on `:root` only. No JS token objects.
- **Use only these tokens in new UI:**

```css
/* Text */
--t1, --t2, --t3

/* Backgrounds */
--bg, --surface

/* Borders */
--border, --border-md

/* Brand */
--blue, --red, --amber, --purple, --green, --teal, --orange

/* Layout */
--font ('DM Sans'), --mono ('DM Mono'), --sidebar (228px)
```

- Map Figma colors to the nearest token (e.g. primary blue → `var(--blue)`). Do not introduce new hex values in component CSS unless adding a new token in `tokens.css`.

## 2. Component library

- **Location:** `css/components.css`
- **Architecture:** Class-based; no components in JS. HTML is built in `pages/*.js` as template strings.
- **Existing patterns:** `.card`, `.card-title`, `.card-sub`, `.kpi`, `.kpi-row`, `.layer-tabs`, `.layer-tab`, `.badge`, `.badge-red` / `.badge-amber` / etc., `.gap-warning`, `.ai-bar`, `.corridor-table`, `.infra-card`, `.cm-card`, `.export-btn`, `.page-hd`, `.page-title`, `.page-meta`, `.section-label`, `.gap-pill`, `.chain`, `.chain-step`, `.enf-card`, `.map-placeholder`.
- Prefer reusing these classes. If the design needs a new pattern, add a small, clearly named block in `components.css` and use tokens.

## 3. Frameworks and styling

- **UI:** Vanilla HTML/CSS/JS only. No React, Vue, or Tailwind.
- **Styling:** Plain CSS; load order is `tokens.css` → `shell.css` → `components.css`.
- **Build:** No bundler. Scripts and styles are linked from `index.html`.

When translating Figma MCP output (often React/Tailwind), convert to:
- HTML strings (e.g. in a function like `overviewHTML()`),
- Class names from `tokens.css` / `shell.css` / `components.css`,
- No inline styles except for one-off overrides (e.g. a single KPI color).

## 4. Assets

- **Location:** `assets/`
- **Reference:** Relative paths, e.g. `assets/icon.svg`. No import/build step.
- If Figma MCP returns asset URLs (e.g. from localhost), use them for development; for committed code, save files under `assets/` and reference them.

## 5. Icons

- No icon library. Use inline SVG, or a small SVG in `assets/` referenced by `<img>`.
- No Font Awesome or similar unless you add the dependency and document it.

## 6. Styling approach

- **Methodology:** BEM-like naming in `components.css` (e.g. `.card`, `.card-title`). No CSS Modules or scoped frameworks.
- **Global:** `tokens.css` and `shell.css` are global; `components.css` is global for component classes.
- **Responsive:** Use existing patterns (flex, grid, `max-width`). No breakpoint system yet; add in `components.css` with comments if needed.

## 7. Project structure and adding a new “page”

- **Pages:** Each page is a function in `pages/<name>.js` that returns an HTML string (e.g. `function overviewHTML() { return \`...\`; }`).
- **Router:** In `js/nav.js`, add an entry in `navData` and a branch in `renderPage()` that sets `main.innerHTML = <pageName>HTML();`.
- **Charts:** After `renderPage()`, `setTimeout(initCharts, 50)` runs; chart containers and IDs must match what `js/charts.js` expects.

When implementing a new screen from Figma:
1. Create or reuse a `pages/<name>.js` that returns the HTML.
2. Use only tokens and existing component classes; add minimal new classes in `components.css` if needed.
3. Register the page in `navData` and `renderPage()` in `js/nav.js`.
4. Add the script tag in `index.html` for the new page file.

## 8. Figma MCP workflow (reminder)

- Prefer `get_design_context` with `clientLanguages: "html,css,javascript"`, `clientFrameworks: "vanilla"`.
- Use `get_screenshot` for visual parity checks.
- Translate layout and typography into the token + component system above; do not paste React/Tailwind markup.
