import React, { useState } from "react";
import { X, MessageCircle, MapPin, CheckCircle2, Truck, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { useShop } from "../context/ShopContext";

const INITIAL_FORM = {
  fullName: "",
  mobile: "",
  address: "",
  landmark: "",
  companyName: "",
  gstNumber: "",
  orderNotes: "",
};

export default function CheckoutModal() {
  const {
    cart, groupedCart, checkoutOpen, setCheckoutOpen, setCartOpen,
    totalItemsCount, grandTotal, BUSINESS_INFO,
  } = useShop();

  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  if (!checkoutOpen) return null;

  const setField = (key, val) => {
    setForm(prev => ({ ...prev, [key]: val }));
    if (errors[key]) setErrors(prev => ({ ...prev, [key]: null }));
  };

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = "Full name is required";
    if (!form.mobile.trim()) e.mobile = "Mobile number is required";
    else if (!/^\+?\d[\d\s-]{7,14}$/.test(form.mobile.trim())) e.mobile = "Enter a valid mobile number";
    if (!form.address.trim()) e.address = "Complete delivery address is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const buildWhatsAppMessage = () => {
    const lines = [];
    lines.push(`Hello Taher Ali Enterprises,`);
    lines.push(`I would like to place the following order.`);
    lines.push("");
    lines.push(`*Customer Details*`);
    lines.push(`Name: ${form.fullName.trim()}`);
    lines.push(`Mobile: ${form.mobile.trim()}`);
    lines.push(`Address: ${form.address.trim()}`);
    if (form.landmark.trim()) lines.push(`Landmark: ${form.landmark.trim()}`);
    if (form.companyName.trim()) lines.push(`Company: ${form.companyName.trim()}`);
    if (form.gstNumber.trim()) lines.push(`GST: ${form.gstNumber.trim()}`);
    lines.push("");
    lines.push(`*Order*`);
    if (groupedCart.retail.length > 0) {
      lines.push("");
      lines.push(`*Retail Products*`);
      groupedCart.retail.forEach(i => {
        lines.push(`• ${i.name} (${i.weight}) ×${i.quantity} — ₹${(i.price * i.quantity).toLocaleString("en-IN")}`);
      });
    }
    if (groupedCart.wholesale.length > 0) {
      lines.push("");
      lines.push(`*Wholesale Products*`);
      groupedCart.wholesale.forEach(i => {
        lines.push(`• ${i.name} (${i.weight}) ×${i.quantity} — ₹${(i.price * i.quantity).toLocaleString("en-IN")}`);
      });
    }
    lines.push("");
    lines.push(`Total Items: ${totalItemsCount}`);
    lines.push(`Estimated Total: ₹${grandTotal.toLocaleString("en-IN")}`);
    if (form.orderNotes.trim()) {
      lines.push("");
      lines.push(`*Order Notes*`);
      lines.push(form.orderNotes.trim());
    }
    lines.push("");
    lines.push(`📍 *Delivery:* Free within 3 km of Alijah Kotla, Charminar, Hyderabad. ₹50 charge beyond 3 km.`);
    lines.push("");
    lines.push(`Please confirm product availability, final quotation, delivery charges, and expected delivery date.`);
    lines.push("");
    lines.push(`Thank you.`);
    return lines.join("\n");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fill in all required fields");
      return;
    }
    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    setSubmitting(true);
    const msg = encodeURIComponent(buildWhatsAppMessage());
    window.open(`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${msg}`, "_blank");
    toast.success("Order sent to WhatsApp");
    setTimeout(() => {
      setCheckoutOpen(false);
      setCartOpen(false);
      setForm(INITIAL_FORM);
      setErrors({});
      setSubmitting(false);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto" data-testid="checkout-modal">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setCheckoutOpen(false)} />

      <div className="relative glass-panel bg-white dark:bg-[#1e2a1a] text-[#2C3E1F] dark:text-[#F5F1E4] rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#556B2F]/30 z-10 my-8 animate-fadeIn">
        <div className="flex justify-between items-center mb-6 border-b border-[#556B2F]/20 pb-4">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold font-serif">Complete Your Order</h3>
            <p className="text-xs text-gray-500 dark:text-[#c9d1c1]">Order dispatched via WhatsApp to {BUSINESS_INFO.phone}</p>
          </div>
          <button onClick={() => setCheckoutOpen(false)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#2a3822]" aria-label="Close">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          {/* Customer Info */}
          <div className="space-y-4">
            <p className="text-xs font-bold text-[#556B2F] dark:text-[#D4AF37] uppercase tracking-wider">Customer Information</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Full Name" required error={errors.fullName}>
                <input type="text" placeholder="e.g. John Doe" value={form.fullName}
                  onChange={e => setField("fullName", e.target.value)}
                  className={inputCls(errors.fullName)} data-testid="checkout-fullname-input" />
              </Field>
              <Field label="Mobile Number" required error={errors.mobile}>
                <input type="tel" placeholder="e.g. 9876543210" value={form.mobile}
                  onChange={e => setField("mobile", e.target.value)}
                  className={inputCls(errors.mobile)} data-testid="checkout-mobile-input" />
              </Field>
            </div>

            <Field label="Complete Delivery Address" required error={errors.address}>
              <textarea rows={2} placeholder="Street address, area, city, pincode…" value={form.address}
                onChange={e => setField("address", e.target.value)}
                className={inputCls(errors.address)} data-testid="checkout-address-input" />
            </Field>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Landmark" hint="Optional">
                <input type="text" placeholder="e.g. Near Charminar" value={form.landmark}
                  onChange={e => setField("landmark", e.target.value)}
                  className={inputCls()} data-testid="checkout-landmark-input" />
              </Field>
              <Field label="Company Name" hint="Optional">
                <input type="text" placeholder="For B2B invoicing" value={form.companyName}
                  onChange={e => setField("companyName", e.target.value)}
                  className={inputCls()} data-testid="checkout-company-input" />
              </Field>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="GST Number" hint="Optional · for wholesale">
                <input type="text" placeholder="e.g. 36ABCDE1234F1Z5" value={form.gstNumber}
                  onChange={e => setField("gstNumber", e.target.value.toUpperCase())}
                  className={inputCls()} data-testid="checkout-gst-input" />
              </Field>
              <Field label="Order Notes" hint="Optional">
                <input type="text" placeholder="e.g. Deliver before 12 PM" value={form.orderNotes}
                  onChange={e => setField("orderNotes", e.target.value)}
                  className={inputCls()} data-testid="checkout-notes-input" />
              </Field>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-[#F4EEDD] dark:bg-[#243020] p-4 sm:p-5 rounded-2xl border border-[#556B2F]/20 space-y-3" data-testid="checkout-order-summary">
            <p className="text-xs font-bold text-[#556B2F] dark:text-[#D4AF37] uppercase tracking-wider">Order Summary</p>

            {groupedCart.retail.length > 0 && (
              <SummarySection title="Retail Products" items={groupedCart.retail} testid="checkout-retail-list" />
            )}
            {groupedCart.wholesale.length > 0 && (
              <SummarySection title="Wholesale Products" items={groupedCart.wholesale} testid="checkout-wholesale-list" />
            )}

            <div className="flex justify-between font-bold pt-2 border-t border-[#556B2F]/25 text-sm">
              <span>Total Items</span><span>{totalItemsCount}</span>
            </div>
            <div className="flex justify-between font-extrabold text-base">
              <span>Estimated Total</span>
              <span className="text-[#556B2F] dark:text-[#D4AF37]" data-testid="checkout-grand-total">₹{grandTotal.toLocaleString("en-IN")}</span>
            </div>
          </div>

          {/* Delivery Info */}
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
                      Available within <strong>3 km</strong> of Alijah Kotla, Charminar, Hyderabad.
                    </p>
                  </div>
                  <div className="rounded-xl bg-[#F4EEDD] dark:bg-[#243020] border border-[#556B2F]/25 px-3 py-2.5">
                    <p className="text-xs font-bold text-[#8B5A2B] dark:text-[#D4AF37] flex items-center gap-1.5">
                      <Truck className="w-4 h-4" /> Outside 3 km
                    </p>
                    <p className="text-[11px] text-gray-700 dark:text-[#d9d3c1] leading-snug mt-0.5">
                      A delivery charge of <strong>₹50</strong> will be added.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button type="button" onClick={() => setCheckoutOpen(false)}
              className="sm:w-1/3 py-3 rounded-xl border border-gray-300 dark:border-[#3a4a30] font-semibold text-sm hover:bg-gray-100 dark:hover:bg-[#2a3822] transition-colors">
              Back to Cart
            </button>
            <button type="submit" disabled={submitting || cart.length === 0}
              className="flex-1 py-3 rounded-xl bg-green-600 hover:bg-green-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-sm shadow-lg flex items-center justify-center gap-2 transition-all"
              data-testid="whatsapp-place-order-btn">
              <MessageCircle className="w-5 h-5" /> Place Order via WhatsApp
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function inputCls(error) {
  return `w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-[#243020] border text-sm focus:outline-none focus:ring-2 text-[#2C3E1F] dark:text-[#F5F1E4] placeholder-gray-400 dark:placeholder-[#8fa085] transition-colors ${error ? 'border-red-400 focus:ring-red-500' : 'border-gray-300 dark:border-[#3a4a30] focus:ring-[#556B2F]'}`;
}

function Field({ label, required, hint, error, children }) {
  return (
    <label className="block space-y-1">
      <span className="text-xs font-semibold flex items-center gap-1">
        {label} {required && <span className="text-red-500">*</span>}
        {hint && <span className="text-gray-400 font-normal">· {hint}</span>}
      </span>
      {children}
      {error && (
        <span className="text-xs text-red-600 dark:text-red-400 flex items-center gap-1 mt-1" role="alert">
          <AlertCircle className="w-3 h-3" /> {error}
        </span>
      )}
    </label>
  );
}

function SummarySection({ title, items, testid }) {
  return (
    <div className="space-y-1" data-testid={testid}>
      <p className="text-[11px] font-bold text-[#8B5A2B] dark:text-[#D4AF37] uppercase tracking-wider">{title}</p>
      <ul className="space-y-1 text-xs sm:text-sm text-gray-700 dark:text-[#d9d3c1]">
        {items.map(i => (
          <li key={i.id} className="flex justify-between gap-3">
            <span className="truncate">• {i.name} ({i.weight}) ×{i.quantity}</span>
            <span className="font-semibold shrink-0">₹{(i.price * i.quantity).toLocaleString("en-IN")}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
