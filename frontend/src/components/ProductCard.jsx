import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingBag, Plus, Minus, ZoomIn } from "lucide-react";
import { useShop } from "../context/ShopContext";

export default function ProductCard({ product }) {
  const { addToCart } = useShop();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);

  const emoji = product.imageType === 'pickle' ? '🥭' : product.imageType === 'biscuit' ? '🍪' : '🧈';

  const onSelect = () => navigate(`/products/${product.id}`);

  return (
    <div
      className="glass-panel p-5 rounded-2xl shadow-md hover:shadow-2xl transition-all border border-[#556B2F]/20 flex flex-col justify-between group cursor-pointer hover:-translate-y-1 animate-fadeInUp"
      onClick={onSelect}
      data-testid={`product-card-${product.id}`}
    >
      <div>
        <div className="relative w-full h-48 rounded-xl bg-gradient-to-br from-[#F4EEDD] to-[#e8dfc8] dark:from-[#243020] dark:to-[#1a2416] flex flex-col items-center justify-center mb-4 overflow-hidden border border-[#556B2F]/20">
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#556B2F] text-white text-xs font-bold shadow z-10">
            {product.category}
          </span>
          <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#D4AF37] text-[#2C3E1F] text-xs font-bold shadow z-10">
            {product.badge}
          </span>

          <div className="text-5xl mb-2 group-hover:scale-125 transition-transform duration-300">
            {emoji}
          </div>
          <span className="text-[10px] font-semibold text-gray-500 dark:text-[#c9d1c1] uppercase tracking-widest">[ Image Placeholder ]</span>

          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="px-3.5 py-1.5 rounded-lg bg-[#556B2F] text-white text-xs font-bold shadow flex items-center gap-1.5">
              <ZoomIn className="w-3.5 h-3.5" /> View Details
            </span>
          </div>
        </div>

        <h3 className="font-bold text-lg font-serif text-[#2C3E1F] dark:text-[#F5F1E4] mb-1 group-hover:text-[#556B2F] dark:group-hover:text-[#D4AF37] transition-colors">
          {product.name}
        </h3>
        <p className="text-xs text-gray-600 dark:text-[#c9d1c1] line-clamp-2 mb-3">
          {product.description}
        </p>
      </div>

      <div className="space-y-3 pt-3 border-t border-[#556B2F]/15" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center">
          <span className="text-xs font-semibold text-gray-500 dark:text-[#c9d1c1]">
            Weight: <strong className="text-[#2C3E1F] dark:text-[#F5F1E4]">{product.weight}</strong>
          </span>
          <span className="text-lg font-extrabold text-[#556B2F] dark:text-[#D4AF37]" data-testid={`product-price-${product.id}`}>₹{product.price}</span>
        </div>

        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1 bg-gray-100 dark:bg-[#243020] rounded-xl p-1">
            <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-1.5 rounded-lg hover:bg-white dark:hover:bg-[#2a3822] transition-colors" data-testid={`qty-minus-${product.id}`}>
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-8 text-center font-bold text-sm" data-testid={`qty-val-${product.id}`}>{qty}</span>
            <button onClick={() => setQty(qty + 1)} className="p-1.5 rounded-lg hover:bg-white dark:hover:bg-[#2a3822] transition-colors" data-testid={`qty-plus-${product.id}`}>
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
          <button
            onClick={() => { addToCart(product, qty); setQty(1); }}
            className="flex-1 py-2.5 px-3 rounded-xl bg-[#556B2F] hover:bg-[#2C3E1F] text-white font-semibold text-xs shadow-md flex items-center justify-center gap-1.5 transition-all transform active:scale-95"
            data-testid={`add-to-cart-${product.id}`}
          >
            <ShoppingBag className="w-3.5 h-3.5" /> Quick Add
          </button>
        </div>
      </div>
    </div>
  );
}
