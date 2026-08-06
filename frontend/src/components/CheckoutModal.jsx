import React, { useState } from "react";
import { X, MessageCircle, MapPin, CheckCircle2, Truck } from "lucide-react";
import { toast } from "sonner";
import { useShop } from "../context/ShopContext";

export default function CheckoutModal() {
  const {
    cart, checkoutOpen, setCheckoutOpen, setCartOpen,
    totalItemsCount, subtotalPrice, applicableTier, discountAmount, grandTotal,
    BUSINESS_INFO,
  } = useShop();

  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    address: "",
    landmark: "",
    city: "Hyderabad",
    pincode: "",
    specialInstructions: "",
  });

  if (!checkoutOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.customerName || !formData.phone || !formData.address) {
      toast.error("Please fill in Name, Phone, and Address");
      return;
    }

    let msg = `*NEW WHOLESALE ORDER - TAHER ALI ENTERPRISES*\n\n`;
    msg += `👤 *Customer Name:* ${formData.customerName}\n`;
    msg += `📞 *Phone:* ${formData.phone}\n`;
    msg += `📍 *Address:* ${formData.address}, ${formData.landmark ? 'Near ' + formData.landmark + ', ' : ''}${formData.city} - ${formData.pincode}\n`;
    if (formData.specialInstructions) msg += `📝 *Instructions:* ${formData.specialInstructions}\n`;
    msg += `\n*--- ORDER ITEMS ---*\n`;
    cart.forEach((item, idx) => {
      msg += `${idx + 1}. *${item.name}* (${item.weight}) x ${item.quantity} = ₹${item.price * item.quantity}\n`;
    });
    msg += `\n------------------\n`;
    msg += `📦 *Total Quantity:* ${totalItemsCount} Units\n`;
    msg += `💰 *Subtotal:* ₹${subtotalPrice}\n`;
    if (applicableTier.discountPercent > 0) {
      msg += `🏷️ *Bulk Discount (${applicableTier.discountPercent}%):* -₹${discountAmount}\n`;
    }
    msg += `🌟 *Grand Total:* ₹${grandTotal}\n`;
    msg += `\n📍 *Delivery Note:* Free delivery within 3 km of Alija Kotla, Charminar, Hyderabad. ₹50 charge for locations beyond 3 km.\n`;
    msg += `\n_Generated via Taher Ali Enterprises B2B Portal_`;

    const encodedMsg = encodeURIComponent(msg);
    window.open(`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodedMsg}`, "_blank");
    toast.success("WhatsApp order generated successfully!");
    setCheckoutOpen(false);
    setCartOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto" data-testid="checkout-modal">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setCheckoutOpen(false)} />

      <div className="relative glass-panel bg-white dark:bg-[#1e2a1a] text-[#2C3E1F] dark:text-[#F5F1E4] rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#556B2F]/30 z-10 my-8 animate-fadeIn">
        <div className="flex justify-between items-center mb-6 border-b border-[#556B2F]/20 pb-4">
          <div>
            <h3 className="text-2xl font-bold font-serif">Complete Wholesale Order</h3>
            <p className="text-xs text-gray-500 dark:text-[#c9d1c1]">Order dispatched via WhatsApp to {BUSINESS_INFO.phone}</p>
          </div>
          <button onClick={() => setCheckoutOpen(false)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#2a3822]">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1">Customer Name / Store Name *</label>
              <input type="text" required placeholder="e.g. Hyderabad Retail Mart" value={formData.customerName}
                onChange={e => setFormData({ ...formData, customerName: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-[#243020] border border-gray-300 dark:border-[#3a4a30] text-sm focus:outline-none focus:ring-2 focus:ring-[#556B2F] text-[#2C3E1F] dark:text-[#F5F1E4]"
                data-testid="checkout-name-input" />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">Phone Number (WhatsApp) *</label>
              <input type="tel" required placeholder="e.g. 9876543210" value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-[#243020] border border-gray-300 dark:border-[#3a4a30] text-sm focus:outline-none focus:ring-2 focus:ring-[#556B2F] text-[#2C3E1F] dark:text-[#F5F1E4]"
                data-testid="checkout-phone-input" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1">Delivery Address *</label>
            <textarea required rows={2} placeholder="Street address, shop number, area..." value={formData.address}
              onChange={e => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-[#243020] border border-gray-300 dark:border-[#3a4a30] text-sm focus:outline-none focus:ring-2 focus:ring-[#556B2F] text-[#2C3E1F] dark:text-[#F5F1E4]"
              data-testid="checkout-address-input" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1">Landmark</label>
              <input type="text" placeholder="e.g. Near Charminar" value={formData.landmark}
                onChange={e => setFormData({ ...formData, landmark: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-[#243020] border border-gray-300 dark:border-[#3a4a30] text-sm focus:outline-none focus:ring-2 focus:ring-[#556B2F] text-[#2C3E1F] dark:text-[#F5F1E4]"
                data-testid="checkout-landmark-input" />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">City</label>
              <input type="text" value={formData.city} disabled
                className="w-full px-4 py-3 rounded-xl bg-gray-200 dark:bg-[#374a2c] border border-gray-300 dark:border-[#3a4a30] text-sm cursor-not-allowed text-[#2C3E1F] dark:text-[#F5F1E4]"
                data-testid="checkout-city-input" />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">Pincode</label>
              <input type="text" placeholder="500001" value={formData.pincode}
                onChange={e => setFormData({ ...formData, pincode: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-[#243020] border border-gray-300 dark:border-[#3a4a30] text-sm focus:outline-none focus:ring-2 focus:ring-[#556B2F] text-[#2C3E1F] dark:text-[#F5F1E4]"
                data-testid="checkout-pincode-input" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1">Special Instructions / Packaging Notes</label>
            <input type="text" placeholder="e.g. Deliver before 12 PM" value={formData.specialInstructions}
              onChange={e => setFormData({ ...formData, specialInstructions: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-[#243020] border border-gray-300 dark:border-[#3a4a30] text-sm focus:outline-none focus:ring-2 focus:ring-[#556B2F] text-[#2C3E1F] dark:text-[#F5F1E4]"
              data-testid="checkout-instructions-input" />
          </div>

          <div className="bg-[#F4EEDD] dark:bg-[#243020] p-4 rounded-2xl space-y-2 text-sm border border-[#556B2F]/20">
            <div className="flex justify-between font-bold"><span>Total Items:</span><span>{totalItemsCount} Units</span></div>
            <div className="flex justify-between font-bold"><span>Grand Total:</span><span className="text-[#556B2F] dark:text-[#D4AF37] text-base">₹{grandTotal}</span></div>
            <p className="text-xs text-gray-500 dark:text-[#c9d1c1] pt-1">
              * Clicking Place Order will automatically open WhatsApp with the complete order formatted for Taher Ali Enterprises ({BUSINESS_INFO.phone}).
            </p>
          </div>

          {/* DELIVERY INFORMATION NOTICE */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#1e2a1a] border border-[#556B2F]/30" data-testid="delivery-info-box">
            <div className="flex items-start gap-3">
              <div className="shrink-0 w-10 h-10 rounded-full bg-[#556B2F]/15 dark:bg-[#D4AF37]/20 text-[#556B2F] dark:text-[#D4AF37] flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="min-w-0 space-y-2 flex-1">
                <h4 className="font-bold text-sm text-[#2C3E1F] dark:text-[#F5F1E4] font-serif">Delivery Information</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="rounded-xl bg-green-50 dark:bg-green-950/25 border border-green-200 dark:border-green-900/50 px-3 py-2.5">
                    <p className="text-xs font-bold text-green-700 dark:text-green-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" /> Free Delivery
                    </p>
                    <p className="text-[11px] text-gray-700 dark:text-[#d9d3c1] leading-snug mt-0.5">
                      Free within <strong>3 km</strong> of Alija Kotla, Charminar, Hyderabad.
                    </p>
                  </div>
                  <div className="rounded-xl bg-[#F4EEDD] dark:bg-[#243020] border border-[#556B2F]/25 px-3 py-2.5">
                    <p className="text-xs font-bold text-[#8B5A2B] dark:text-[#D4AF37] flex items-center gap-1.5">
                      <Truck className="w-4 h-4" /> Outside 3 km
                    </p>
                    <p className="text-[11px] text-gray-700 dark:text-[#d9d3c1] leading-snug mt-0.5">
                      Orders beyond 3 km will have a <strong>₹50 delivery charge</strong>.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 flex gap-4">
            <button type="button" onClick={() => setCheckoutOpen(false)}
              className="w-1/2 py-3 rounded-xl border border-gray-300 dark:border-[#3a4a30] font-semibold text-sm hover:bg-gray-100 dark:hover:bg-[#2a3822] transition-colors">
              Cancel
            </button>
            <button type="submit"
              className="w-1/2 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold text-sm shadow-lg flex items-center justify-center gap-2 transition-all"
              data-testid="whatsapp-place-order-btn">
              <MessageCircle className="w-5 h-5" /> Place Order via WhatsApp
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
