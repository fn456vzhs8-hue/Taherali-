import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";
import { toast } from "sonner";
import { PRODUCTS, BULK_TIERS, BUSINESS_INFO } from "../mock";

const ShopContext = createContext(null);

const RECENT_KEY = "tae_recent_viewed";
const DARK_KEY = "tae_dark_mode";
const CART_KEY = "tae_cart";

export function ShopProvider({ children }) {
  const [darkMode, setDarkMode] = useState(() => {
    try { return localStorage.getItem(DARK_KEY) === "true"; } catch { return false; }
  });
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem(CART_KEY) || "[]"); } catch { return []; }
  });
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [bulkCalculatorOpen, setBulkCalculatorOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [recentlyViewed, setRecentlyViewed] = useState(() => {
    try { return JSON.parse(localStorage.getItem(RECENT_KEY) || "[]"); } catch { return []; }
  });

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    try { localStorage.setItem(DARK_KEY, String(darkMode)); } catch {}
  }, [darkMode]);

  useEffect(() => {
    try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch {}
  }, [cart]);

  useEffect(() => {
    try { localStorage.setItem(RECENT_KEY, JSON.stringify(recentlyViewed)); } catch {}
  }, [recentlyViewed]);

  const addToCart = useCallback((product, qty = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + qty } : item
        );
      }
      return [...prev, { ...product, quantity: qty }];
    });
    toast.success(`Added ${qty}x ${product.name} to wholesale cart`);
  }, []);

  const updateQuantity = useCallback((id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  }, []);

  const removeItem = useCallback((id) => {
    setCart(prev => prev.filter(item => item.id !== id));
    toast.info("Item removed from cart");
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
    toast.info("Cart cleared");
  }, []);

  const trackRecentlyViewed = useCallback((productId) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(id => id !== productId);
      return [productId, ...filtered].slice(0, 6);
    });
  }, []);

  const totals = useMemo(() => {
    const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const applicableTier = BULK_TIERS.slice().reverse().find(t => totalItemsCount >= t.minUnits) || BULK_TIERS[0];
    const discountAmount = Math.round((subtotalPrice * applicableTier.discountPercent) / 100);
    const grandTotal = subtotalPrice - discountAmount;
    return { totalItemsCount, subtotalPrice, applicableTier, discountAmount, grandTotal };
  }, [cart]);

  const recentlyViewedProducts = useMemo(() =>
    recentlyViewed.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean),
  [recentlyViewed]);

  const value = {
    darkMode, setDarkMode,
    cart, setCart,
    cartOpen, setCartOpen,
    checkoutOpen, setCheckoutOpen,
    bulkCalculatorOpen, setBulkCalculatorOpen,
    mobileMenuOpen, setMobileMenuOpen,
    addToCart, updateQuantity, removeItem, clearCart,
    trackRecentlyViewed, recentlyViewedProducts,
    ...totals,
    BUSINESS_INFO,
    BULK_TIERS,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used inside ShopProvider");
  return ctx;
}
