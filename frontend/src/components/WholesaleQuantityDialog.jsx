import React, { useState, useEffect } from "react";
import { X, ShoppingCart, Plus, Minus, AlertTriangle, Package } from "lucide-react";
import { flyToCart } from "../utils/flyToCart";

const PRESETS = [20, 50, 100];
const QUICK = [10, 25, 75, 200];
const MIN_QTY = 10;

/**
 * Wholesale bulk-quantity picker.
 * Opened when a customer clicks "Add to Cart" on the wholesale catalog.
 * User selects a preset (20 / 50 / 100) or a Custom quantity (>= 10).
 * On confirm, the parent adds the chosen quantity to the shared unified cart.
 */
export default function WholesaleQuantityDialog({ product, onClose, onConfirm }) {
  const [mode, setMode] = useState(20);
  const [customQty, setCustomQty] = useState(20);

  useEffect(() => {
    if (product) {
      setMode(20);
      setCustomQty(20);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product?.id]);

  useEffect(() => {
    if (product) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = original; };
    }
  }, [product]);

  if (!product) return null;

  const quantity = mode === "custom" ? customQty : mode;
  const isBelowMin = quantity < MIN_QTY;
  const estimatedTotal = quantity * product.mrp;

  const bumpCustom = (delta) => setCustomQty(prev => Math.max(1, prev + delta));

  const handleConfirm = (e) => {
    if (isBelowMin) return;
    flyToCart(e.currentTarget);
    onConfirm(product, quantity);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center" data-testid="wholesale-qty-dialog">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fadeIn" onClick={onClose} />

      <div className="relative w-full sm:w-[520px] sm:max-w-lg bg-white dark:bg-[#1e2a1a] text-[#2C3E1F] dark:text-[#F5F1E4] rounded-t-3xl sm:rounded-3xl shadow-2xl border border-[#556B2F]/25 dark:border-[#3a4a30] animate-slideUp sm:animate-fadeInUp max-h-[92vh] flex flex-col">
        <div className="sm:hidden pt-2.5 pb-1 flex justify-center">
          <div className="w-12 h-1.5 rounded-full bg-gray-300 dark:bg-[#3a4a30]" />
        </div>

        <div className="flex items-start justify-between gap-3 px-5 sm:px-7 pt-4 sm:pt-6 pb-4 border-b border-[#556B2F]/15">
          <div className="flex items-start gap-3 min-w-0 flex-1">
            <div className="w-11 h-11 shrink-0 rounded-xl bg-[#556B2F]/15 text-[#556B2F] dark:text-[#D4AF37] flex items-center justify-center border border-[#556B2F]/25">
              <Package className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-bold text-[#8B5A2B] dark:text-[#D4AF37] uppercase tracking-wider">Wholesale Bulk Order</p>
              <h3 className="font-serif font-bold text-lg sm:text-xl leading-tight truncate">{product.name}</h3>
              <p className="text-xs text-gray-800 dark:text-[#dcd6bf] mt-0.5">
                {product.weight} · ₹{product.mrp} per unit
              </p>
            </div>
          </div>
          <button onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#2a3822] shrink-0"
            data-testid="wholesale-qty-close" aria-label="Close">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-5 sm:px-7 py-5 sm:py-6 space-y-6 overflow-y-auto">
          <div>
            <p className="text-xs font-bold text-gray-800 dark:text-[#dcd6bf] uppercase tracking-wider mb-3">
              Select Quantity <span className="normal-case text-[10px] text-gray-700 dark:text-[#a8b39c] font-medium">(minimum {MIN_QTY} units)</span>
            </p>
            <div className="grid grid-cols-4 gap-2 sm:gap-3">
              {PRESETS.map(p => {
                const active = mode === p;
                return (
                  <button key={p} onClick={() => setMode(p)}
                    className={`py-3 rounded-xl font-bold text-sm transition-all border-2 ${active ? 'bg-[#556B2F] text-white border-[#556B2F] shadow-md' : 'bg-[#F4EEDD] dark:bg-[#243020] border-transparent text-[#2C3E1F] dark:text-[#F5F1E4] hover:border-[#556B2F]/40'}`}
                    data-testid={`wholesale-qty-preset-${p}`}>
                    {p}<span className="block text-[10px] font-medium opacity-80">Pieces</span>
                  </button>
                );
              })}
              <button onClick={() => setMode("custom")}
                className={`py-3 rounded-xl font-bold text-sm transition-all border-2 ${mode === "custom" ? 'bg-[#556B2F] text-white border-[#556B2F] shadow-md' : 'bg-[#F4EEDD] dark:bg-[#243020] border-transparent text-[#2C3E1F] dark:text-[#F5F1E4] hover:border-[#556B2F]/40'}`}
                data-testid="wholesale-qty-preset-custom">
                Custom<span className="block text-[10px] font-medium opacity-80">Qty</span>
              </button>
            </div>
          </div>

          {mode === "custom" && (
            <div className="animate-fadeIn space-y-2" data-testid="wholesale-custom-qty-block">
              <label className="text-xs font-bold text-gray-800 dark:text-[#dcd6bf] uppercase tracking-wider">Custom Quantity</label>
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center bg-[#F4EEDD] dark:bg-[#243020] rounded-xl p-1.5 border border-[#556B2F]/25 shadow-sm">
                  <button onClick={() => bumpCustom(-1)}
                    className="w-11 h-11 rounded-lg bg-white dark:bg-[#2a3822] hover:bg-[#556B2F] hover:text-white flex items-center justify-center transition-colors"
                    data-testid="wholesale-custom-qty-minus" aria-label="Decrease">
                    <Minus className="w-5 h-5" />
                  </button>
                  <input type="number" min="1" value={customQty}
                    onChange={(e) => setCustomQty(Math.max(1, parseInt(e.target.value) || 0))}
                    className="w-20 text-center bg-transparent font-extrabold text-xl text-[#2C3E1F] dark:text-[#F5F1E4] focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    data-testid="wholesale-custom-qty-input" />
                  <button onClick={() => bumpCustom(1)}
                    className="w-11 h-11 rounded-lg bg-white dark:bg-[#2a3822] hover:bg-[#556B2F] hover:text-white flex items-center justify-center transition-colors"
                    data-testid="wholesale-custom-qty-plus" aria-label="Increase">
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex gap-2">
                  {QUICK.map(v => (
                    <button key={v} onClick={() => setCustomQty(v)}
                      className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-[#556B2F]/30 text-[#556B2F] dark:text-[#D4AF37] hover:bg-[#556B2F]/10 transition-colors">
                      {v}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {isBelowMin && (
            <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 dark:bg-red-950/25 border border-red-200 dark:border-red-900/50 text-red-800 dark:text-red-300" data-testid="wholesale-min-qty-warning">
              <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-bold">Please choose {MIN_QTY} or more units for wholesale orders.</p>
                <p className="text-xs opacity-80 mt-0.5">This item cannot be added below the minimum wholesale quantity.</p>
              </div>
            </div>
          )}

          <div className={`p-5 rounded-2xl border-2 transition-colors ${isBelowMin ? 'bg-gray-50 dark:bg-[#243020]/50 border-gray-200 dark:border-[#3a4a30]' : 'bg-[#556B2F]/10 dark:bg-[#D4AF37]/10 border-[#556B2F]/30'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-gray-800 dark:text-[#dcd6bf] uppercase tracking-wider">Estimated Total</p>
                <p className="text-[10px] text-gray-800 dark:text-[#dcd6bf] mt-0.5">
                  {quantity} units × ₹{product.mrp}
                </p>
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold text-[#556B2F] dark:text-[#D4AF37]" data-testid="wholesale-qty-total">
                ₹{estimatedTotal.toLocaleString("en-IN")}
              </p>
            </div>
          </div>
        </div>

        <div className="px-5 sm:px-7 py-4 border-t border-[#556B2F]/15 bg-[#F4EEDD]/50 dark:bg-[#243020]/40 rounded-b-3xl flex gap-3">
          <button onClick={onClose}
            className="flex-1 sm:flex-initial px-5 py-3 rounded-xl border border-gray-300 dark:border-[#3a4a30] font-semibold text-sm hover:bg-gray-100 dark:hover:bg-[#2a3822] transition-colors">
            Cancel
          </button>
          <button onClick={handleConfirm} disabled={isBelowMin}
            className={`flex-1 py-3 rounded-xl font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all ${isBelowMin ? 'bg-gray-200 dark:bg-[#3a4a30] text-gray-500 dark:text-gray-500 opacity-60 cursor-not-allowed' : 'bg-[#556B2F] hover:bg-[#2C3E1F] text-white transform active:scale-95'}`}
            data-testid="wholesale-qty-confirm-btn">
            <ShoppingCart className="w-4 h-4" /> Add {quantity} to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
