import React, { useState } from "react";
import { X, Calculator, ShoppingBag } from "lucide-react";
import { PRODUCTS, BULK_TIERS } from "../mock";
import { useShop } from "../context/ShopContext";

export default function BulkCalculatorModal() {
  const { bulkCalculatorOpen, setBulkCalculatorOpen, addToCart, setCartOpen } = useShop();
  const [selections, setSelections] = useState({});

  if (!bulkCalculatorOpen) return null;

  const totalUnits = Object.values(selections).reduce((a, b) => a + b, 0);
  const subtotal = Object.entries(selections).reduce((sum, [id, qty]) => {
    const p = PRODUCTS.find(prod => prod.id === id);
    return sum + (p ? p.price * qty : 0);
  }, 0);
  const tier = BULK_TIERS.slice().reverse().find(t => totalUnits >= t.minUnits) || BULK_TIERS[0];
  const discount = Math.round((subtotal * tier.discountPercent) / 100);
  const grand = subtotal - discount;

  const handleAddToCart = () => {
    Object.entries(selections).forEach(([id, qty]) => {
      if (qty > 0) {
        const p = PRODUCTS.find(prod => prod.id === id);
        if (p) addToCart(p, qty);
      }
    });
    setSelections({});
    setBulkCalculatorOpen(false);
    setCartOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto" data-testid="bulk-calc-modal">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setBulkCalculatorOpen(false)} />
      <div className="relative glass-panel bg-white dark:bg-[#1e2a1a] text-[#2C3E1F] dark:text-[#F5F1E4] rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-[#556B2F]/30 z-10 my-8 animate-fadeIn">
        <div className="flex justify-between items-center mb-6 border-b border-[#556B2F]/20 pb-4">
          <div className="flex items-center gap-3">
            <Calculator className="w-6 h-6 text-[#556B2F] dark:text-[#D4AF37]" />
            <div>
              <h3 className="text-xl sm:text-2xl font-bold font-serif">Bulk Quote & Tiered Discount Calculator</h3>
              <p className="text-xs text-gray-500 dark:text-[#c9d1c1]">Calculate wholesale pricing across Hyderabad</p>
            </div>
          </div>
          <button onClick={() => setBulkCalculatorOpen(false)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#2a3822]">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
          <p className="text-sm text-gray-600 dark:text-[#c9d1c1]">
            Adjust quantities for any product to instantly calculate bulk pricing and tiered discounts.
          </p>

          <div className="space-y-3">
            {PRODUCTS.map(product => {
              const qty = selections[product.id] || 0;
              return (
                <div key={product.id} className="glass-panel p-4 rounded-xl border border-[#556B2F]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-sm">{product.name} ({product.weight})</h4>
                    <p className="text-xs text-gray-500 dark:text-[#c9d1c1]">Unit Price: ₹{product.price}</p>
                  </div>
                  <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                    <div className="flex items-center gap-2">
                      <button onClick={() => setSelections({ ...selections, [product.id]: Math.max(0, qty - 5) })}
                        className="px-2.5 py-1 rounded-lg bg-gray-200 dark:bg-[#2a3822] text-xs font-bold">-5</button>
                      <input type="number" min="0" value={qty}
                        onChange={(e) => setSelections({ ...selections, [product.id]: parseInt(e.target.value) || 0 })}
                        className="w-16 text-center py-1 rounded-lg bg-gray-50 dark:bg-[#243020] border border-gray-300 dark:border-[#3a4a30] text-sm font-bold text-[#2C3E1F] dark:text-[#F5F1E4]" />
                      <button onClick={() => setSelections({ ...selections, [product.id]: qty + 5 })}
                        className="px-2.5 py-1 rounded-lg bg-gray-200 dark:bg-[#2a3822] text-xs font-bold">+5</button>
                    </div>
                    <span className="font-extrabold text-[#556B2F] dark:text-[#D4AF37] w-20 text-right">₹{qty * product.price}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-[#556B2F]/20 space-y-4">
          <div className="flex flex-wrap justify-between items-center bg-[#F4EEDD] dark:bg-[#243020] p-4 rounded-2xl text-sm gap-3">
            <div>
              <p className="text-gray-500 dark:text-[#c9d1c1] text-xs">Total Selected Units</p>
              <p className="font-extrabold text-base">{totalUnits} Units</p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-[#c9d1c1] text-xs">Applied Discount Tier</p>
              <p className="font-extrabold text-[#556B2F] dark:text-[#D4AF37] text-sm">{tier.label}</p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-[#c9d1c1] text-xs">Estimated Bulk Total</p>
              <p className="font-extrabold text-lg text-[#556B2F] dark:text-[#D4AF37]">₹{grand}</p>
            </div>
          </div>
          <button onClick={handleAddToCart} disabled={totalUnits === 0}
            className="w-full py-3.5 rounded-xl bg-[#556B2F] hover:bg-[#2C3E1F] disabled:opacity-50 text-white font-bold text-sm shadow-lg transition-all flex items-center justify-center gap-2"
            data-testid="add-bulk-to-cart-btn">
            <ShoppingBag className="w-5 h-5" /> Add Bulk Selection to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
