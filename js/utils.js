/* ── Utilities ────────────────────────────────────────────────────────────────
   Shared helper functions used across pages.
─────────────────────────────────────────────────────────────────────────────── */

/* Toast notification */
function showToast(msg = "Exported for grant application") {
  const t = document.getElementById("toast");
  t.textContent = "✓ " + msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 2600);
}

/* Layer tab switcher (visual feedback only in prototype) */
function switchLayer(el, layer) {
  document.querySelectorAll(".layer-tab").forEach(t => t.classList.remove("active"));
  el.classList.add("active");
  showToast(`Filtered to ${layer} layer`);
}
