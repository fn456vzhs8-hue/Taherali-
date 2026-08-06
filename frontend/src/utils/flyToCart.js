/**
 * Animates a "+" bubble from a source element toward the visible cart icon.
 * Called on Add-to-Cart to provide instant visual confirmation.
 */
export function flyToCart(sourceEl) {
  if (!sourceEl || typeof window === "undefined") return;

  const findVisibleTarget = () => {
    const selectors = [
      '[data-testid="floating-cart-btn"]',
      '[data-testid="cart-item-count"]',
      '[data-testid="open-cart-btn"]',
    ];
    for (const sel of selectors) {
      const el = document.querySelector(sel);
      if (!el) continue;
      const r = el.getBoundingClientRect();
      // Consider visible if within viewport and has size
      if (r.width > 0 && r.height > 0 && r.bottom > 0 && r.top < window.innerHeight) {
        return el;
      }
    }
    return null;
  };

  const target = findVisibleTarget();
  if (!target) return;

  const s = sourceEl.getBoundingClientRect();
  const t = target.getBoundingClientRect();

  const bubble = document.createElement("div");
  bubble.setAttribute("aria-hidden", "true");
  bubble.textContent = "✓";
  bubble.style.cssText = `
    position: fixed;
    left: ${s.left + s.width / 2 - 16}px;
    top: ${s.top + s.height / 2 - 16}px;
    width: 32px;
    height: 32px;
    background: #556B2F;
    color: #FDFBF7;
    font-weight: 800;
    font-size: 18px;
    line-height: 32px;
    text-align: center;
    border-radius: 999px;
    z-index: 9999;
    pointer-events: none;
    box-shadow: 0 8px 24px rgba(0,0,0,0.25);
    transition: transform 0.75s cubic-bezier(0.55, 0.05, 0.2, 1), opacity 0.75s ease-out;
    will-change: transform, opacity;
  `;
  document.body.appendChild(bubble);

  // Slight arc: overshoot upward before homing in
  const dx = (t.left + t.width / 2) - (s.left + s.width / 2);
  const dy = (t.top + t.height / 2) - (s.top + s.height / 2);

  requestAnimationFrame(() => {
    bubble.style.transform = `translate(${dx}px, ${dy}px) scale(0.35)`;
    bubble.style.opacity = "0.15";
  });

  // Pulse the target on arrival
  setTimeout(() => {
    target.classList.add("cart-pop");
    setTimeout(() => target.classList.remove("cart-pop"), 600);
  }, 650);

  setTimeout(() => bubble.remove(), 900);
}
