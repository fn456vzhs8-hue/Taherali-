import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ArrowRight, ShieldCheck, Award, Truck, Info, MapPin, Phone, Clock,
  ExternalLink, MessageCircle, Package, Sparkles, Star, HeartHandshake,
  Leaf, Store, ChevronDown, CheckCircle2
} from "lucide-react";
import { useShop } from "../context/ShopContext";
import { PRODUCTS } from "../mock";

const TESTIMONIALS = [
  { name: "Ravi K.", role: "Retail Store Owner, Charminar", rating: 5, text: "Consistent quality, timely dispatch, and honest wholesale pricing. Been sourcing pickles and biscuits for 3 years — never disappointed." },
  { name: "Anjali S.", role: "Catering Business, Banjara Hills", rating: 5, text: "The bulk ghee is authentic and fresh. Their wholesale pricing helps us keep catering margins healthy during wedding season." },
  { name: "Mohammed I.", role: "Kirana Store, Old City", rating: 5, text: "Osmania biscuits and mango achar sell out fast. Delivery is always on time across Hyderabad." },
];

const FAQS = [
  { q: "Do you deliver across all of Hyderabad?", a: "Yes, we service all of Hyderabad including Old City, Secunderabad, Cyberabad, and outskirts. Free delivery within 3 km of Alijah Kotla, Charminar; ₹50 charge beyond 3 km." },
  { q: "Can I mix retail and wholesale items in one order?", a: "Absolutely. Your cart supports both retail and wholesale products together. At checkout, we group them clearly and send one combined WhatsApp order to us." },
  { q: "Are products preservative-free?", a: "All our pickles are prepared using traditional recipes with no artificial preservatives. Biscuits are baked fresh daily. Ghee is 100% pure cow milk fat." },
  { q: "Can I request custom packaging for my store?", a: "Yes, for bulk orders we can discuss custom labeling and packaging. Add items to your cart and mention your requirement in the Order Notes field at checkout." },
  { q: "What is your return / replacement policy?", a: "In the rare case of damaged or defective product on arrival, we offer prompt replacement. Notify us on WhatsApp within 24 hours of delivery." },
];

export default function HomePage() {
  const { BUSINESS_INFO } = useShop();
  const location = useLocation();
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    if (location.state?.scrollTo) {
      const el = document.getElementById(location.state.scrollTo);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100);
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [location]);

  return (
    <div className="animate-fadeIn">
      {/* HERO */}
      <section id="home" className="relative overflow-hidden pt-12 pb-24 sm:py-24 bg-gradient-to-b from-[#F4EEDD] to-[#FDFBF7] dark:from-[#1e2a1a] dark:to-[#243020]" data-testid="hero-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#556B2F]/10 dark:bg-[#D4AF37]/15 text-[#556B2F] dark:text-[#D4AF37] font-semibold text-xs sm:text-sm tracking-wide">
              <ShieldCheck className="w-4 h-4" /> Trusted Hyderabad Wholesale Partner since 2015
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight font-serif text-[#2C3E1F] dark:text-[#F5F1E4] leading-tight">
              Taher Ali Enterprises
            </h1>

            <p className="text-xl sm:text-2xl font-semibold text-[#8B5A2B] dark:text-[#D4AF37]">
              Premium Wholesale Food Products
            </p>

            <p className="text-base sm:text-lg text-gray-800 dark:text-[#efe9d4] max-w-xl leading-relaxed">
              Supplying quality pickles, bakery biscuits, sweets, and pure ghee across Hyderabad, Telangana. Direct from our hygienic facility at Alijah Kotla, Charminar to your retail store, restaurant, or bulk celebration.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link to="/products" className="px-8 py-4 rounded-xl bg-[#556B2F] hover:bg-[#2C3E1F] text-white font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5" data-testid="hero-explore-btn">
                Shop Retail <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/wholesale" className="px-8 py-4 rounded-xl bg-white dark:bg-[#243020] border-2 border-[#556B2F] text-[#556B2F] dark:text-[#D4AF37] hover:bg-[#556B2F]/10 font-semibold flex items-center gap-2 shadow-md transition-all" data-testid="hero-wholesale-btn">
                <Package className="w-5 h-5" /> Wholesale Catalog
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-[#556B2F]/20 text-center sm:text-left">
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-[#2C3E1F] dark:text-[#D4AF37]">100%</p>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-[#dcd6bf]">Pure & Hygienic</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-[#2C3E1F] dark:text-[#D4AF37]">100+</p>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-[#dcd6bf]">Wholesale Products</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-[#2C3E1F] dark:text-[#D4AF37]">Free</p>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-[#dcd6bf]">Delivery under 3km</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md h-[420px] bg-gradient-to-br from-[#556B2F]/25 to-[#8B5A2B]/15 rounded-3xl p-6 flex flex-col justify-between shadow-xl border border-[#556B2F]/30 backdrop-blur-sm">
              <div className="flex justify-between items-center">
                <span className="px-3 py-1 bg-[#D4AF37] text-[#2C3E1F] text-xs font-bold rounded-full">Retail Spotlight</span>
                <span className="text-xs font-semibold text-[#556B2F] dark:text-[#D4AF37]">Hyderabad, TS</span>
              </div>

              <Link to={`/products/${PRODUCTS[0].id}`} className="animate-float glass-panel p-4 rounded-2xl shadow-lg border border-[#556B2F]/20 flex items-center gap-4 cursor-pointer hover:border-[#D4AF37]">
                <div className="w-16 h-16 rounded-xl bg-[#F4EEDD] dark:bg-[#1e2a1a] flex items-center justify-center text-2xl">🥭</div>
                <div>
                  <h4 className="font-bold text-base">Traditional Mango Achar</h4>
                  <p className="text-xs text-gray-600 dark:text-[#dcd6bf]">250g · Retail Pack</p>
                  <p className="text-sm font-bold text-[#556B2F] dark:text-[#D4AF37]">₹89 <span className="text-xs font-normal text-gray-600 dark:text-[#dcd6bf]">/ unit</span></p>
                </div>
              </Link>

              <Link to={`/products/p7`} className="animate-float-delayed glass-panel p-4 rounded-2xl shadow-lg border border-[#556B2F]/20 flex items-center gap-4 cursor-pointer hover:border-[#D4AF37]">
                <div className="w-16 h-16 rounded-xl bg-[#F4EEDD] dark:bg-[#1e2a1a] flex items-center justify-center text-2xl">🍪</div>
                <div>
                  <h4 className="font-bold text-base">Osmania Biscuit</h4>
                  <p className="text-xs text-gray-600 dark:text-[#dcd6bf]">400g Bakery Pack</p>
                  <p className="text-sm font-bold text-[#556B2F] dark:text-[#D4AF37]">₹240 <span className="text-xs font-normal text-gray-600 dark:text-[#dcd6bf]">/ unit</span></p>
                </div>
              </Link>

              <div className="absolute -bottom-4 -right-4 bg-[#2C3E1F] text-[#D4AF37] px-5 py-3 rounded-2xl shadow-2xl border border-[#D4AF37]/30 flex items-center gap-3">
                <Award className="w-6 h-6 text-[#D4AF37]" />
                <div>
                  <p className="text-xs text-gray-200">Certified Quality</p>
                  <p className="text-sm font-bold">{BUSINESS_INFO.owner}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-testid="about-section">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#556B2F]/10 dark:bg-[#D4AF37]/15 text-[#556B2F] dark:text-[#D4AF37] font-semibold text-sm">
              <Info className="w-4 h-4" /> About Taher Ali Enterprises
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-[#2C3E1F] dark:text-[#F5F1E4]">
              Committed to Purity, Tradition & Trust
            </h2>
            <p className="text-base text-gray-800 dark:text-[#efe9d4] leading-relaxed">
              Taher Ali Enterprises is a trusted wholesale supplier serving customers across Hyderabad, Telangana. Since 2015, we've been providing quality food products including pickles, biscuits, sweets and pure ghee at competitive wholesale prices.
            </p>
            <p className="text-base text-gray-800 dark:text-[#efe9d4] leading-relaxed">
              Our goal is simple: fresh products, honest pricing, and reliable customer service. Every batch is rigorously quality-tested before dispatch from our facility at Alijah Kotla, Charminar.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="glass-panel p-4 rounded-xl border border-[#556B2F]/20 flex items-center gap-4">
                <div className="p-3 bg-[#556B2F]/15 rounded-lg text-[#556B2F] dark:text-[#D4AF37]"><Award className="w-6 h-6" /></div>
                <div>
                  <p className="text-xs text-gray-600 dark:text-[#dcd6bf]">Proprietor</p>
                  <p className="font-bold text-sm sm:text-base">{BUSINESS_INFO.owner}</p>
                </div>
              </div>
              <div className="glass-panel p-4 rounded-xl border border-[#556B2F]/20 flex items-center gap-4">
                <div className="p-3 bg-[#556B2F]/15 rounded-lg text-[#556B2F] dark:text-[#D4AF37]"><MapPin className="w-6 h-6" /></div>
                <div>
                  <p className="text-xs text-gray-600 dark:text-[#dcd6bf]">Service Area</p>
                  <p className="font-bold text-sm sm:text-base">{BUSINESS_INFO.serviceArea}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-[#556B2F]/20 bg-[#F4EEDD] dark:bg-[#243020] p-8 text-center space-y-6">
              <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-[#556B2F] to-[#2C3E1F] flex items-center justify-center text-white text-3xl font-bold shadow-lg">TA</div>
              <div>
                <h3 className="text-2xl font-bold font-serif text-[#2C3E1F] dark:text-[#F5F1E4]">Taher Ali Enterprises</h3>
                <p className="text-sm text-[#8B5A2B] dark:text-[#D4AF37] font-medium">Established at Alijah Kotla, Charminar (2015)</p>
              </div>
              <div className="border-t border-[#556B2F]/20 pt-6 space-y-3 text-left text-sm">
                <Row label="Main Office" value={BUSINESS_INFO.location} />
                <Row label="Direct Contact" value={BUSINESS_INFO.phone} valueClass="font-mono text-[#556B2F] dark:text-[#D4AF37]" />
                <Row label="Business Hours" value="Mon - Sat · 8AM - 8PM" small />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-20 bg-gradient-to-b from-transparent via-[#F4EEDD]/60 to-transparent dark:via-[#243020]/40" data-testid="why-choose-us-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
            <span className="inline-flex px-3 py-1 bg-[#556B2F]/10 dark:bg-[#D4AF37]/15 text-[#556B2F] dark:text-[#D4AF37] font-semibold text-xs sm:text-sm rounded-full">Why Choose Us</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-[#2C3E1F] dark:text-[#F5F1E4]">
              Wholesale Trust You Can Taste
            </h2>
            <p className="text-base text-gray-700 dark:text-[#e8e2ce]">
              More than a supplier — a long-term partner for retailers, restaurants, and event planners across Hyderabad.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Leaf className="w-7 h-7" />, title: "Quality Assurance", desc: "Every batch is quality-tested using traditional methods and hygienic packaging standards." },
              { icon: <Truck className="w-7 h-7" />, title: "Hyderabad Delivery", desc: "Fast dispatch across Hyderabad — Old City, Secunderabad, Cyberabad and outskirts." },
              { icon: <Store className="w-7 h-7" />, title: "Retail + Wholesale", desc: "Small retail packs and large wholesale volumes — order both in one seamless cart." },
              { icon: <HeartHandshake className="w-7 h-7" />, title: "Honest Pricing", desc: "Transparent wholesale rates displayed upfront. No hidden fees, no complicated discount slabs." },
            ].map((f, i) => (
              <div key={i} className="glass-panel p-6 rounded-2xl border border-[#556B2F]/20 space-y-3 hover:shadow-xl transition-all hover:-translate-y-1 animate-fadeInUp" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="w-14 h-14 rounded-xl bg-[#556B2F]/15 dark:bg-[#D4AF37]/15 text-[#556B2F] dark:text-[#D4AF37] flex items-center justify-center">{f.icon}</div>
                <h3 className="font-bold text-lg font-serif">{f.title}</h3>
                <p className="text-sm text-gray-700 dark:text-[#e8e2ce] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUALITY PROMISE STRIP */}
      <section className="py-14 bg-[#556B2F] text-white relative overflow-hidden" data-testid="quality-promise-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">
          <div className="lg:col-span-2 space-y-3">
            <span className="px-3 py-1 bg-[#D4AF37] text-[#2C3E1F] text-xs font-bold rounded-full">Our Promise</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-serif">Fresh Products · Honest Pricing · Reliable Service</h2>
            <p className="text-gray-100 text-sm sm:text-base leading-relaxed max-w-2xl">
              We source, prepare, and pack every product with the same care we would give our own family. No artificial preservatives in our pickles, real butter in our biscuits, and pure cow milk fat in our ghee.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="glass-panel p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center">
              <ShieldCheck className="w-8 h-8 mx-auto mb-2 text-[#D4AF37]" />
              <p className="font-bold text-sm">Hygienic Facility</p>
            </div>
            <div className="glass-panel p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center">
              <HeartHandshake className="w-8 h-8 mx-auto mb-2 text-[#D4AF37]" />
              <p className="font-bold text-sm">Honest Pricing</p>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 bg-gradient-to-b from-transparent via-[#F4EEDD]/50 to-transparent dark:via-[#243020]/40" data-testid="testimonials-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
            <span className="inline-flex px-3 py-1 bg-[#556B2F]/10 dark:bg-[#D4AF37]/15 text-[#556B2F] dark:text-[#D4AF37] font-semibold text-xs rounded-full">Customer Testimonials</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-[#2C3E1F] dark:text-[#F5F1E4]">
              What Our Wholesale Buyers Say
            </h2>
            <p className="text-sm text-gray-600 dark:text-[#dcd6bf] italic">(Sample testimonials — replace with real customer reviews)</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="glass-panel p-6 rounded-2xl border border-[#556B2F]/20 space-y-4 hover:shadow-xl transition-all animate-fadeInUp" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="flex gap-0.5 text-[#D4AF37]">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-[#D4AF37]" />
                  ))}
                </div>
                <p className="text-sm text-gray-800 dark:text-[#efe9d4] leading-relaxed italic">"{t.text}"</p>
                <div className="pt-3 border-t border-[#556B2F]/20">
                  <p className="font-bold text-sm">{t.name}</p>
                  <p className="text-xs text-gray-600 dark:text-[#dcd6bf]">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" data-testid="faq-section">
        <div className="text-center mb-14 space-y-3">
          <span className="inline-flex px-3 py-1 bg-[#556B2F]/10 dark:bg-[#D4AF37]/15 text-[#556B2F] dark:text-[#D4AF37] font-semibold text-xs rounded-full">FAQ</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-[#2C3E1F] dark:text-[#F5F1E4]">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((f, i) => (
            <div key={i} className="glass-panel rounded-2xl border border-[#556B2F]/20 overflow-hidden">
              <button onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-[#556B2F]/5 transition-colors"
                data-testid={`faq-toggle-${i}`}>
                <span className="font-semibold text-sm sm:text-base text-[#2C3E1F] dark:text-[#F5F1E4]">{f.q}</span>
                <ChevronDown className={`w-5 h-5 text-[#556B2F] dark:text-[#D4AF37] transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === i && (
                <div className="px-6 pb-5 text-sm text-gray-800 dark:text-[#efe9d4] leading-relaxed animate-fadeIn">{f.a}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-20 bg-gradient-to-b from-transparent via-[#F4EEDD]/50 to-transparent dark:via-[#243020]/40" data-testid="contact-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-[#2C3E1F] dark:text-[#F5F1E4]">Get in Touch</h2>
            <p className="text-base text-gray-700 dark:text-[#e8e2ce]">
              Have questions about bulk quantities, custom packaging, or door delivery across Hyderabad? Contact us directly.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 glass-panel p-8 rounded-3xl shadow-xl space-y-6">
              <h3 className="text-xl font-bold font-serif text-[#2C3E1F] dark:text-[#F5F1E4]">Business Details</h3>

              <div className="space-y-4 text-sm">
                <ContactRow icon={<Award className="w-5 h-5" />} title="Business Name & Owner">
                  <p className="font-bold">{BUSINESS_INFO.name}</p>
                  <p className="text-gray-700 dark:text-[#e8e2ce]">Proprietor: {BUSINESS_INFO.owner}</p>
                </ContactRow>

                <ContactRow icon={<Phone className="w-5 h-5" />} title="Phone & WhatsApp">
                  <a href={`tel:${BUSINESS_INFO.phone}`} className="font-bold hover:text-[#556B2F] font-mono text-base">{BUSINESS_INFO.phone}</a>
                  <p className="text-xs text-green-600 dark:text-green-400 font-medium">Available on WhatsApp for instant orders</p>
                </ContactRow>

                <ContactRow icon={<MapPin className="w-5 h-5" />} title="Location & Service Area">
                  <p className="font-bold">{BUSINESS_INFO.location}</p>
                  <p className="text-gray-700 dark:text-[#e8e2ce]">{BUSINESS_INFO.serviceArea}</p>
                </ContactRow>

                <ContactRow icon={<Clock className="w-5 h-5" />} title="Business Hours">
                  <p className="font-bold">{BUSINESS_INFO.businessHours}</p>
                </ContactRow>
              </div>

              <div className="pt-4">
                <a href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent("Hello Taher Ali Enterprises, I would like to inquire about wholesale food products.")}`}
                  target="_blank" rel="noopener noreferrer"
                  className="w-full py-4 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold flex items-center justify-center gap-2 shadow-lg transition-colors"
                  data-testid="contact-whatsapp-btn">
                  <MessageCircle className="w-5 h-5" /> Chat on WhatsApp ({BUSINESS_INFO.phone})
                </a>
              </div>
            </div>

            <div className="lg:col-span-7 glass-panel p-4 rounded-3xl shadow-xl flex flex-col">
              <div className="flex justify-between items-center mb-4 px-4 pt-2">
                <h4 className="font-bold text-base flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#556B2F] dark:text-[#D4AF37]" /> {BUSINESS_INFO.location}
                </h4>
                <span className="text-xs bg-[#556B2F]/15 text-[#556B2F] dark:text-[#D4AF37] px-3 py-1 rounded-full font-medium">Telangana, India</span>
              </div>
              <div className="flex-1 w-full min-h-[360px] bg-[#F4EEDD] dark:bg-[#243020] rounded-2xl border border-[#556B2F]/20 relative overflow-hidden flex flex-col items-center justify-center text-center p-6">
                <div className="w-16 h-16 rounded-full bg-[#556B2F] text-white flex items-center justify-center shadow-lg mb-4">
                  <MapPin className="w-8 h-8" />
                </div>
                <h5 className="text-xl font-bold font-serif mb-2">Taher Ali Enterprises</h5>
                <p className="text-sm text-gray-700 dark:text-[#e8e2ce] max-w-md mb-6">
                  Located at <strong>{BUSINESS_INFO.location}</strong>. Serving wholesale food product distribution across Hyderabad and surrounding districts with prompt dispatch.
                </p>
                <a href={BUSINESS_INFO.googleMapsUrl} target="_blank" rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-[#2C3E1F] text-white text-sm font-semibold flex items-center gap-2 shadow-md hover:bg-[#556B2F] transition-colors">
                  Open in Google Maps <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" data-testid="explore-cta-section">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#2C3E1F] via-[#556B2F] to-[#2C3E1F] p-10 sm:p-16 text-center shadow-2xl border border-[#D4AF37]/30">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute -top-10 -right-10 w-56 h-56 rounded-full bg-[#D4AF37] blur-3xl" />
              <div className="absolute -bottom-10 -left-10 w-56 h-56 rounded-full bg-[#8B5A2B] blur-3xl" />
            </div>
            <div className="relative space-y-6">
              <Package className="w-14 h-14 text-[#D4AF37] mx-auto animate-float" />
              <h2 className="text-3xl sm:text-5xl font-extrabold font-serif text-white leading-tight">
                Ready to Stock Your Store?
              </h2>
              <p className="text-lg sm:text-xl text-gray-100 max-w-2xl mx-auto">
                Browse our retail packs (with images) or the 100+ product wholesale catalog. Mix and match in one cart — one WhatsApp order.
              </p>
              <div className="pt-4 flex flex-wrap gap-4 justify-center">
                <Link to="/products" className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-[#D4AF37] hover:bg-[#c59d2e] text-[#2C3E1F] font-extrabold text-base sm:text-lg shadow-2xl transition-all transform hover:-translate-y-1 hover:scale-105" data-testid="cta-explore-products-btn">
                  Retail Products (with images) <ArrowRight className="w-5 h-5" />
                </Link>
                <Link to="/wholesale" className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-sm border-2 border-[#D4AF37]/60 text-[#D4AF37] hover:text-white font-extrabold text-base sm:text-lg shadow-2xl transition-all transform hover:-translate-y-1" data-testid="cta-wholesale-btn">
                  Wholesale Catalog (100+ items) <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
              <p className="text-xs text-gray-200 pt-2">
                <CheckCircle2 className="w-4 h-4 inline mr-1 text-[#D4AF37]" />
                Instant WhatsApp checkout · Free delivery within 3 km · Same-day dispatch
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Row({ label, value, valueClass = "", small = false }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-[#3a4a30] last:border-0">
      <span className="text-gray-600 dark:text-[#dcd6bf]">{label}</span>
      <span className={`font-semibold text-right ${small ? "text-xs" : ""} ${valueClass}`}>{value}</span>
    </div>
  );
}

function ContactRow({ icon, title, children }) {
  return (
    <div className="flex items-start gap-4">
      <div className="p-3 bg-[#556B2F]/15 text-[#556B2F] dark:text-[#D4AF37] rounded-xl shrink-0">{icon}</div>
      <div>
        <p className="text-xs text-gray-600 dark:text-[#dcd6bf]">{title}</p>
        {children}
      </div>
    </div>
  );
}
