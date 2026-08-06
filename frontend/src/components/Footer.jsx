import React from "react";
import { Link } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import { useShop } from "../context/ShopContext";

export default function Footer() {
  const { BUSINESS_INFO } = useShop();
  return (
    <footer className="bg-[#2C3E1F] text-[#F5F1E4] py-14 mt-12" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-10 border-b border-white/10 pb-10">
        <div className="md:col-span-5 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#556B2F] flex items-center justify-center text-white font-bold text-lg">TA</div>
            <h3 className="text-xl font-bold font-serif text-[#D4AF37]">Taher Ali Enterprises</h3>
          </div>
          <p className="text-sm text-gray-200 leading-relaxed max-w-sm">
            Premium wholesale food products supplying traditional pickles, bakery biscuits, and pure ghee across Hyderabad, Telangana since 2015.
          </p>
          <p className="text-xs text-gray-300">
            {BUSINESS_INFO.location}<br />
            Proprietor: {BUSINESS_INFO.owner} · {BUSINESS_INFO.phone}
          </p>
        </div>

        <div className="md:col-span-3 space-y-3">
          <h4 className="font-bold text-base text-[#D4AF37]">Quick Links</h4>
          <ul className="space-y-2 text-sm text-gray-200">
            <li><Link to="/" className="hover:text-[#D4AF37] transition-colors">Home</Link></li>
            <li><Link to="/products" className="hover:text-[#D4AF37] transition-colors">Retail Products</Link></li>
            <li><Link to="/wholesale" className="hover:text-[#D4AF37] transition-colors">Wholesale Catalog</Link></li>
            <li><Link to="/#about" className="hover:text-[#D4AF37] transition-colors">About Us</Link></li>
            <li><Link to="/#contact" className="hover:text-[#D4AF37] transition-colors">Contact & Location</Link></li>
          </ul>
        </div>

        <div className="md:col-span-4 space-y-3">
          <h4 className="font-bold text-base text-[#D4AF37]">Wholesale Inquiries</h4>
          <p className="text-sm text-gray-200">
            For bulk orders, institutional supply, or retail partnerships, contact us directly on WhatsApp.
          </p>
          <div className="pt-2">
            <a
              href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}`}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#556B2F] text-white text-sm font-bold shadow-md hover:bg-green-600 transition-colors"
            >
              <MessageCircle className="w-4 h-4" /> WhatsApp: {BUSINESS_INFO.phone}
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-300 gap-2">
        <p>© Taher Ali Enterprises · All rights reserved.</p>
        <p>Serving Hyderabad, Telangana · Since 2015</p>
      </div>
    </footer>
  );
}
