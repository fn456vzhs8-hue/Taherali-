import React from "react";
import { ShoppingBag, X, Plus, Minus, Trash2, Package, Truck } from "lucide-react";
import { useShop } from "../context/ShopContext";

export default function CartDrawer() {
  const {
    cart, groupedCart, cartOpen, setCartOpen, setCheckoutOpen,
    updateQuantity, removeItem, clearCart,
    totalItemsCount, grandTotal,
  } = useShop();

  if (!cartOpen) return null;

  const retailItems = groupedCart.retail;
  const wholesaleItems = groupedCart.wholesale;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" data-testid="cart-modal">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setCartOpen(false)} />
      <div className="absolute inset-y-0 right-0 max-w-full flex sm:pl-10 animate-slideInRight">
        <div className="w-screen max-w-md bg-white dark:bg-[#1e2a1a] text-[#2C3E1F] dark:text-[#F5F1E4] shadow-2xl flex flex-col">
          <div className="p-5 sm:p-6 border-b border-[#556B2F]/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-6 h-6 text-[#556B2F] dark:text-[#D4AF37]" />
              <div>
                <h3 className="font-bold text-lg font-serif leading-tight">Your Cart</h3>
                <p className="text-[11px] text-gray-500 dark:text-[#c9d1c1]">{totalItemsCount} {totalItemsCount === 1 ? "item" : "items"}</p>
              </div>
            </div>
            <button onClick={() => setCartOpen(false)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#2a3822]" aria-label="Close cart">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
            {cart.length === 0 ? (
              <div className="text-center py-20 space-y-4">
                <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto" />
                <p className="text-lg font-bold">Your cart is empty</p>
                <p className="text-sm text-gray-500 dark:text-[#c9d1c1]">Add products from Retail or Wholesale to begin your order.</p>
                <button
                  onClick={() => setCartOpen(false)}
                  className="px-6 py-3 rounded-xl bg-[#556B2F] hover:bg-[#2C3E1F] text-white font-semibold text-sm shadow-md"
                >
                  Continue Browsing
                </button>
              </div>
            ) : (
              <>
                {retailItems.length > 0 && (
                  <CartSection
                    icon={<Package className="w-4 h-4" />}
                    title="Retail Products"
                    count={retailItems.length}
                    items={retailItems}
                    updateQuantity={updateQuantity}
                    removeItem={removeItem}
                  />
                )}
                {wholesaleItems.length > 0 && (
                  <CartSection
                    icon={<Truck className="w-4 h-4" />}
                    title="Wholesale Products"
                    count={wholesaleItems.length}
                    items={wholesaleItems}
                    updateQuantity={updateQuantity}
                    removeItem={removeItem}
                  />
                )}
              </>
            )}
          </div>

          {cart.length > 0 && (
            <div className="p-5 sm:p-6 border-t border-[#556B2F]/25 bg-[#F4EEDD]/60 dark:bg-[#243020]/70 space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-[#c9d1c1]">Total Items</span>
                  <span className="font-bold" data-testid="cart-total-items">{totalItemsCount}</span>
                </div>
                <div className="flex justify-between text-base font-extrabold pt-2 border-t border-gray-300 dark:border-[#3a4a30]">
                  <span>Estimated Total</span>
                  <span className="text-lg text-[#556B2F] dark:text-[#D4AF37]" data-testid="cart-grand-total">₹{grandTotal.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={clearCart}
                  className="py-3 rounded-xl border border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 font-semibold text-sm transition-colors"
                  data-testid="clear-cart-btn"
                >
                  Clear Cart
                </button>
                <button
                  onClick={() => { setCartOpen(false); setCheckoutOpen(true); }}
                  className="py-3 rounded-xl bg-[#556B2F] hover:bg-[#2C3E1F] text-white font-bold text-sm shadow-lg transition-colors"
                  data-testid="proceed-checkout-btn"
                >
                  Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CartSection({ icon, title, count, items, updateQuantity, removeItem }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#556B2F] dark:text-[#D4AF37]">
        {icon} {title} <span className="text-gray-400">({count})</span>
      </div>
      {items.map(item => (
        <div key={item.id} className="glass-panel p-3.5 rounded-xl border border-[#556B2F]/20 flex items-center gap-3" data-testid={`cart-item-${item.id}`}>
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-sm truncate">{item.name}</h4>
            <p className="text-[11px] text-gray-500 dark:text-[#c9d1c1]">{item.weight} · ₹{item.price} each</p>
            <p className="text-sm font-extrabold text-[#556B2F] dark:text-[#D4AF37] mt-0.5">₹{(item.price * item.quantity).toLocaleString("en-IN")}</p>
          </div>

          <div className="flex items-center gap-1.5">
            <button onClick={() => updateQuantity(item.id, -1)} className="w-8 h-8 rounded-lg bg-gray-200 dark:bg-[#2a3822] hover:bg-gray-300 dark:hover:bg-[#374a2c] flex items-center justify-center" data-testid={`cart-decrease-${item.id}`} aria-label="Decrease">
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="font-bold text-sm w-6 text-center" data-testid={`cart-qty-${item.id}`}>{item.quantity}</span>
            <button onClick={() => updateQuantity(item.id, 1)} className="w-8 h-8 rounded-lg bg-gray-200 dark:bg-[#2a3822] hover:bg-gray-300 dark:hover:bg-[#374a2c] flex items-center justify-center" data-testid={`cart-increase-${item.id}`} aria-label="Increase">
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          <button onClick={() => removeItem(item.id)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg" data-testid={`cart-remove-${item.id}`} aria-label="Remove">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
