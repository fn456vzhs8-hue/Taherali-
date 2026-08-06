import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { useShop } from "../context/ShopContext";

/**
 * Floating cart button visible on Home & Retail Catalog pages when:
 *  - The cart has at least one item
 *  - The user has scrolled past the hero (main nav cart is out of easy reach)
 *  - The page is not the Product Detail page (which has its own sticky purchase bar)
 *    and not the Wholesale page (which doesn't use the retail cart)
 */
export default function FloatingCartButton() {
  const { totalItemsCount, grandTotal, setCartOpen } = useShop();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 320);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const path = location.pathname;
  const isDetail = /^\/products\/[^/]+$/.test(path);
  const allowedPath = !isDetail;

  const visible = allowedPath && totalItemsCount > 0 && scrolled;

  return (
    <button
      type="button"
      onClick={() => setCartOpen(true)}
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-6 right-4 sm:right-6 z-40 flex items-center gap-3 pl-4 pr-5 py-3 rounded-full bg-[#556B2F] hover:bg-[#2C3E1F] text-white shadow-2xl border border-[#D4AF37]/40 transition-all duration-300 transform ${visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-24 scale-90 pointer-events-none'}`}
      data-testid="floating-cart-btn"
    >
      <div className="relative">
        <ShoppingBag className="w-6 h-6" />
        {totalItemsCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-[#D4AF37] text-[#2C3E1F] font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow" data-testid="floating-cart-count">
            {totalItemsCount}
          </span>
        )}
      </div>
      <div className="text-left leading-tight">
        <span className="block text-[10px] uppercase tracking-wider opacity-80">View Cart</span>
        <span className="block text-sm font-extrabold" data-testid="floating-cart-total">
          ₹{grandTotal.toLocaleString("en-IN")} · {totalItemsCount} {totalItemsCount === 1 ? "item" : "items"}
        </span>
      </div>
    </button>
  );
}
