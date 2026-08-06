import React, { useState, useEffect } from "react";
import { X, ShoppingCart, MessageCircle, Plus, Minus, AlertTriangle, Package } from "lucide-react";

const PRESETS = [20, 50, 100];
const MIN_QTY = 15;

export default function WholesaleOrderDialog({ product, onClose, whatsappNumber }) {
  const [mode, setMode] = useState(20);           // 20 | 50 | 100 | "custom"
  const [customQty, setCustomQty] = useState(50); // used only in custom mode

  // Prevent body scroll when open
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

  const handleProceed = () => {
    if (isBelowMin) return;
    const msg = encodeURIComponent(
      `Hello Taher Ali Enterprises,\n\n` +
      `I would like to place a wholesale order.\n\n` +
      `📦 *Product:* ${product.name}\n` +
      `⚖️ *Weight:* ${product.weight}\n` +
      `🔢 *Quantity:* ${quantity} units\n` +
      `💰 *Estimated Total:* ₹${estimatedTotal.toLocaleString("en-IN")}\n\n` +
      `Please share the wholesale quotation and delivery details.\n\n` +
      `Thank you.`
    );
    window.open(`https://wa.me/${whatsappNumber}?text=${msg}`, "_blank");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center" data-testid="wholesale-order-dialog">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fadeIn" onClick={onClose} />

      {/* Dialog: bottom sheet on mobile, centered card on desktop */}
      <div
        className="relative w-full sm:w-[520px] sm:max-w-lg bg-white dark:bg-[#1e2a1a] text-[#2C3E1F] dark:text-[#F5F1E4] rounded-t-3xl sm:rounded-3xl shadow-2xl border border-[#556B2F]/25 dark:border-[#3a4a30] animate-slideUp sm:animate-fadeInUp max-h-[92vh] flex flex-col"
      >
        {/* Handle bar on mobile */}
        <div className="sm:hidden pt-2.5 pb-1 flex justify-center">
          <div className="w-12 h-1.5 rounded-full bg-gray-300 dark:bg-[#3a4a30]" />
        </div>

        {/* Header */}
        <div className="flex items-start justify-between gap-3 px-5 sm:px-7 pt-4 sm:pt-6 pb-4 border-b border-[#556B2F]/15">
          <div className="flex items-start gap-3 min-w-0 flex-1">
            <div className="w-11 h-11 shrink-0 rounded-xl bg-[#556B2F]/15 text-[#556B2F] dark:text-[#D4AF37] flex items-center justify-center border border-[#556B2F]/25">
              <Package className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-bold text-[#8B5A2B] dark:text-[#D4AF37] uppercase tracking-wider">Wholesale Order</p>
              <h3 className="font-serif font-bold text-lg sm:text-xl leading-tight truncate">{product.name}</h3>
              <p className="text-xs text-gray-500 dark:text-[#c9d1c1] mt-0.5">
                {product.weight} • MRP ₹{product.mrp} per unit
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#2a3822] shrink-0"
            data-testid="wholesale-dialog-close"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="px-5 sm:px-7 py-5 sm:py-6 space-y-6 overflow-y-auto">
          {/* Quantity presets */}
          <div>
            <p className="text-xs font-bold text-gray-500 dark:text-[#c9d1c1] uppercase tracking-wider mb-3">Select Quantity</p>
            <div className="grid grid-cols-4 gap-2 sm:gap-3">
              {PRESETS.map(p => {
                const active = mode === p;
                return (
                  <button
                    key={p}
                    onClick={() => setMode(p)}
                    className={`py-3 rounded-xl font-bold text-sm transition-all border-2 ${active ? 'bg-[#556B2F] text-white border-[#556B2F] shadow-md' : 'bg-[#F4EEDD] dark:bg-[#243020] border-transparent text-[#2C3E1F] dark:text-[#F5F1E4] hover:border-[#556B2F]/40'}`}
                    data-testid={`wholesale-qty-preset-${p}`}
                  >
                    {p}<span className="block text-[10px] font-medium opacity-80">Pieces</span>
                  </button>
                );
              })}
              <button
                onClick={() => setMode("custom")}
                className={`py-3 rounded-xl font-bold text-sm transition-all border-2 ${mode === "custom" ? 'bg-[#556B2F] text-white border-[#556B2F] shadow-md' : 'bg-[#F4EEDD] dark:bg-[#243020] border-transparent text-[#2C3E1F] dark:text-[#F5F1E4] hover:border-[#556B2F]/40'}`}
                data-testid="wholesale-qty-preset-custom"
              >
                Custom<span className="block text-[10px] font-medium opacity-80">Qty</span>
              </button>
            </div>
          </div>

          {/* Custom quantity input */}
          {mode === "custom" && (
            <div className="animate-fadeIn space-y-2" data-testid="wholesale-custom-qty-block">
              <label className="text-xs font-bold text-gray-500 dark:text-[#c9d1c1] uppercase tracking-wider">Custom Quantity</label>
              <div className="flex items-center gap-3">
                <div className="flex items-center bg-[#F4EEDD] dark:bg-[#243020] rounded-xl p-1.5 border border-[#556B2F]/25 shadow-sm">
                  <button
                    onClick={() => bumpCustom(-1)}
                    className="w-11 h-11 rounded-lg bg-white dark:bg-[#2a3822] hover:bg-[#556B2F] hover:text-white flex items-center justify-center transition-colors"
                    data-testid="wholesale-custom-qty-minus"
                    aria-label="Decrease"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={customQty}
                    onChange={(e) => setCustomQty(Math.max(1, parseInt(e.target.value) || 0))}
                    className="w-20 text-center bg-transparent font-extrabold text-xl text-[#2C3E1F] dark:text-[#F5F1E4] focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    data-testid="wholesale-custom-qty-input"
                  />
                  <button
                    onClick={() => bumpCustom(1)}
                    className="w-11 h-11 rounded-lg bg-white dark:bg-[#2a3822] hover:bg-[#556B2F] hover:text-white flex items-center justify-center transition-colors"
                    data-testid="wholesale-custom-qty-plus"
                    aria-label="Increase"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex gap-2">
                  {[15, 25, 75, 200].map(v => (
                    <button
                      key={v}
                      onClick={() => setCustomQty(v)}
                      className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-[#556B2F]/30 text-[#556B2F] dark:text-[#D4AF37] hover:bg-[#556B2F]/10 transition-colors"
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Min qty warning */}
          {isBelowMin && (
            <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 dark:bg-red-950/25 border border-red-200 dark:border-red-900/50 text-red-800 dark:text-red-300" data-testid="wholesale-min-qty-warning">
              <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-bold">Minimum wholesale order quantity is 15 units.</p>
                <p className="text-xs opacity-80 mt-0.5">Please increase quantity to proceed with a wholesale order.</p>
              </div>
            </div>
          )}

          {/* Estimated Total */}
          <div className={`p-5 rounded-2xl border-2 transition-colors ${isBelowMin ? 'bg-gray-50 dark:bg-[#243020]/50 border-gray-200 dark:border-[#3a4a30]' : 'bg-[#556B2F]/10 dark:bg-[#D4AF37]/10 border-[#556B2F]/30'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-gray-500 dark:text-[#c9d1c1] uppercase tracking-wider">Estimated Total</p>
                <p className="text-[10px] text-gray-500 dark:text-[#c9d1c1] mt-0.5">
                  {quantity} units × ₹{product.mrp} <span className="italic">(final wholesale price shared on WhatsApp)</span>
                </p>
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold text-[#556B2F] dark:text-[#D4AF37]" data-testid="wholesale-estimated-total">
                ₹{estimatedTotal.toLocaleString("en-IN")}
              </p>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="px-5 sm:px-7 py-4 border-t border-[#556B2F]/15 bg-[#F4EEDD]/50 dark:bg-[#243020]/40 rounded-b-3xl flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 sm:flex-initial px-5 py-3 rounded-xl border border-gray-300 dark:border-[#3a4a30] font-semibold text-sm hover:bg-gray-100 dark:hover:bg-[#2a3822] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleProceed}
            disabled={isBelowMin}
            className={`flex-1 py-3 rounded-xl font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all ${isBelowMin ? 'bg-gray-300 dark:bg-[#3a4a30] text-gray-500 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 text-white transform active:scale-95'}`}
            data-testid="wholesale-proceed-whatsapp-btn"
          >
            <MessageCircle className="w-4 h-4" /> Proceed to WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}
