import React from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingBag, Plus, Minus, ZoomIn, Check } from "lucide-react";
import { useShop } from "../context/ShopContext";
import { flyToCart } from "../utils/flyToCart";

export default function ProductCard({ product }) {
  const { addToCart, updateQuantity, cart } = useShop();
  const navigate = useNavigate();

  const inCartItem = cart.find(item => item.id === product.id);
  const inCart = !!inCartItem;
  const cartQty = inCartItem ? inCartItem.quantity : 0;

  const emoji = product.imageType === 'pickle' ? '🥭' : product.imageType === 'biscuit' ? '🍪' : '🧈';

  const onSelect = () => navigate(`/products/${product.id}`);

  const handleAdd = (e) => {
    e.stopPropagation();
    flyToCart(e.currentTarget);
    addToCart(product, 1);
  };

  const handleInc = (e) => {
    e.stopPropagation();
    flyToCart(e.currentTarget);
    updateQuantity(product.id, 1);
  };

  const handleDec = (e) => {
    e.stopPropagation();
    updateQuantity(product.id, -1); // auto-removes at 0
  };

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

          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              data-testid={`product-image-${product.id}`}
            />
          ) : (
            <>
              <div className="text-5xl mb-2 group-hover:scale-125 transition-transform duration-300">
                {emoji}
              </div>
              <span className="text-[10px] font-semibold text-gray-800 dark:text-[#dcd6bf] uppercase tracking-widest">[ Image Placeholder ]</span>
            </>
          )}

          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="px-3.5 py-1.5 rounded-lg bg-[#556B2F] text-white text-xs font-bold shadow flex items-center gap-1.5">
              <ZoomIn className="w-3.5 h-3.5" /> View Details
            </span>
          </div>

          {inCart && (
            <span className="absolute bottom-2 left-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-600 text-white text-[10px] font-bold shadow" data-testid={`in-cart-badge-${product.id}`}>
              <Check className="w-3 h-3" /> {cartQty} in cart
            </span>
          )}
        </div>

        <h3 className="font-bold text-lg font-serif text-[#2C3E1F] dark:text-[#F5F1E4] mb-1 group-hover:text-[#556B2F] dark:group-hover:text-[#D4AF37] transition-colors">
          {product.name}
        </h3>
        <p className="text-xs text-gray-800 dark:text-[#dcd6bf] line-clamp-2 mb-3">
          {product.description}
        </p>
      </div>

      <div className="space-y-3 pt-3 border-t border-[#556B2F]/15" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center">
          <span className="text-xs font-semibold text-gray-800 dark:text-[#dcd6bf]">
            Weight: <strong className="text-[#2C3E1F] dark:text-[#F5F1E4]">{product.weight}</strong>
          </span>
          <span className="text-lg font-extrabold text-[#556B2F] dark:text-[#D4AF37]" data-testid={`product-price-${product.id}`}>₹{product.price}</span>
        </div>

        {inCart ? (
          <div className="flex items-center justify-between gap-2 bg-[#556B2F]/10 dark:bg-[#D4AF37]/10 rounded-xl p-1.5 border border-[#556B2F]/30 animate-fadeIn" data-testid={`card-qty-controls-${product.id}`}>
            <button
              onClick={handleDec}
              className="w-10 h-10 rounded-lg bg-white dark:bg-[#243020] hover:bg-[#556B2F] hover:text-white flex items-center justify-center transition-colors shadow-sm"
              data-testid={`card-qty-minus-${product.id}`}
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="font-extrabold text-lg text-[#2C3E1F] dark:text-[#F5F1E4] flex-1 text-center" data-testid={`card-qty-value-${product.id}`}>
              {cartQty}
            </span>
            <button
              onClick={handleInc}
              className="w-10 h-10 rounded-lg bg-white dark:bg-[#243020] hover:bg-[#556B2F] hover:text-white flex items-center justify-center transition-colors shadow-sm"
              data-testid={`card-qty-plus-${product.id}`}
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={handleAdd}
            className="w-full py-3 px-3 rounded-xl bg-[#556B2F] hover:bg-[#2C3E1F] text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all transform active:scale-95"
            data-testid={`add-to-cart-${product.id}`}
          >
            <ShoppingBag className="w-4 h-4" /> Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}
