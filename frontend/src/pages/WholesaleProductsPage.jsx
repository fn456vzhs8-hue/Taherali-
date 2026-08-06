import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search, ArrowLeft, Home as HomeIcon, Package, ShoppingCart, MessageCircle,
  ChevronRight, ArrowUpDown, X, ChevronDown, Filter
} from "lucide-react";
import { WHOLESALE_PRODUCTS, WHOLESALE_CATEGORIES } from "../data/wholesaleProducts";
import { useShop } from "../context/ShopContext";
import WholesaleOrderDialog from "../components/WholesaleOrderDialog";

const SORT_OPTIONS = [
  { key: "name", label: "Name (A-Z)" },
  { key: "name-desc", label: "Name (Z-A)" },
  { key: "price-asc", label: "Price (Low → High)" },
  { key: "price-desc", label: "Price (High → Low)" },
  { key: "weight-asc", label: "Weight (Light → Heavy)" },
  { key: "weight-desc", label: "Weight (Heavy → Light)" },
];

export default function WholesaleProductsPage() {
  const { BUSINESS_INFO } = useShop();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortKey, setSortKey] = useState("name");
  const [showFilters, setShowFilters] = useState(false);
  const [orderProduct, setOrderProduct] = useState(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = WHOLESALE_PRODUCTS.filter(p => {
      const matchesQuery = !q
        || p.name.toLowerCase().includes(q)
        || p.weight.toLowerCase().includes(q);
      const matchesCat = activeCategory === "All" || p.categories.includes(activeCategory);
      return matchesQuery && matchesCat;
    });

    const cmp = {
      "name": (a, b) => a.name.localeCompare(b.name),
      "name-desc": (a, b) => b.name.localeCompare(a.name),
      "price-asc": (a, b) => a.mrp - b.mrp,
      "price-desc": (a, b) => b.mrp - a.mrp,
      "weight-asc": (a, b) => a.weightGrams - b.weightGrams,
      "weight-desc": (a, b) => b.weightGrams - a.weightGrams,
    }[sortKey];
    return list.slice().sort(cmp);
  }, [query, activeCategory, sortKey]);

  const categoryCounts = useMemo(() => {
    const counts = { All: WHOLESALE_PRODUCTS.length };
    WHOLESALE_CATEGORIES.forEach(c => {
      counts[c] = WHOLESALE_PRODUCTS.filter(p => p.categories.includes(c)).length;
    });
    return counts;
  }, []);

  const buildRetailEnquiryMessage = (p) => {
    return encodeURIComponent(
      `Hello,\n\n` +
      `I am interested in purchasing this product for retail use.\n\n` +
      `📦 *Product:* ${p.name}\n` +
      `⚖️ *Weight:* ${p.weight}\n\n` +
      `Please let me know the nearest retailer or how I can purchase this item.\n\n` +
      `Thank you.`
    );
  };

  const clearFilters = () => {
    setQuery("");
    setActiveCategory("All");
    setSortKey("name");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn" data-testid="wholesale-products-page">

      {/* BREADCRUMB */}
      <nav className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 dark:text-[#c9d1c1] mb-6 flex-wrap" data-testid="wholesale-breadcrumb">
        <Link to="/" className="hover:text-[#556B2F] dark:hover:text-[#D4AF37] transition-colors">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <Link to="/products" className="hover:text-[#556B2F] dark:hover:text-[#D4AF37] transition-colors">Retail Products</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-[#2C3E1F] dark:text-[#F5F1E4] font-semibold">Wholesale Products</span>
      </nav>

      {/* HEADER + BACK/HOME */}
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#F4EEDD] dark:bg-[#243020] font-semibold text-sm hover:bg-[#556B2F] hover:text-white dark:hover:bg-[#556B2F] transition-colors"
              data-testid="wholesale-back-btn"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#F4EEDD] dark:bg-[#243020] font-semibold text-sm hover:bg-[#556B2F] hover:text-white dark:hover:bg-[#556B2F] transition-colors"
              data-testid="wholesale-home-btn"
            >
              <HomeIcon className="w-4 h-4" /> Home
            </Link>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#F4EEDD] dark:bg-[#243020] font-semibold text-sm hover:bg-[#556B2F] hover:text-white dark:hover:bg-[#556B2F] transition-colors"
              data-testid="wholesale-to-retail-btn"
            >
              <Package className="w-4 h-4" /> Retail Catalog
            </Link>
          </div>

          <div className="space-y-2">
            <span className="inline-flex px-3 py-1 bg-[#556B2F]/10 dark:bg-[#D4AF37]/15 text-[#556B2F] dark:text-[#D4AF37] font-semibold text-xs rounded-full uppercase tracking-wider">
              B2B Wholesale Catalog
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold font-serif text-[#2C3E1F] dark:text-[#F5F1E4]">
              Wholesale Products
            </h1>
            <p className="text-sm sm:text-base text-gray-600 dark:text-[#d9d3c1] max-w-2xl">
              Complete wholesale catalog with <strong>{WHOLESALE_PRODUCTS.length}+ products</strong> — biscuits, cookies, sweets, rusks, sugar-free, vegan, gluten-free, and gift boxes. Text-only listing designed for bulk buyers, retailers, and distributors.
            </p>
          </div>
        </div>
      </div>

      {/* SEARCH + SORT + FILTER CONTROLS */}
      <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-[#556B2F]/20 mb-6 space-y-4" data-testid="wholesale-controls">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by product name or weight (e.g. 400g, cashew, sugar free)…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-9 pr-9 py-3 rounded-xl bg-white dark:bg-[#1e2a1a] border border-[#556B2F]/30 text-sm focus:outline-none focus:ring-2 focus:ring-[#556B2F] text-[#2C3E1F] dark:text-[#F5F1E4] placeholder-gray-400 dark:placeholder-[#8fa085]"
              data-testid="wholesale-search-input"
            />
            {query && (
              <button onClick={() => setQuery("")} className="absolute right-3 top-3.5 text-gray-400 hover:text-[#556B2F]">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort */}
          <div className="relative">
            <ArrowUpDown className="absolute left-3 top-3.5 w-4 h-4 text-gray-400 pointer-events-none" />
            <select
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value)}
              className="pl-9 pr-9 py-3 rounded-xl bg-white dark:bg-[#1e2a1a] border border-[#556B2F]/30 text-sm focus:outline-none focus:ring-2 focus:ring-[#556B2F] text-[#2C3E1F] dark:text-[#F5F1E4] appearance-none w-full md:w-auto"
              data-testid="wholesale-sort-select"
            >
              {SORT_OPTIONS.map(opt => (
                <option key={opt.key} value={opt.key}>Sort: {opt.label}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-3.5 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          {/* Filter toggle (mobile) */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#556B2F] text-white font-semibold text-sm"
            data-testid="wholesale-filter-toggle"
          >
            <Filter className="w-4 h-4" /> {showFilters ? "Hide" : "Show"} Filters ({activeCategory === "All" ? "All" : activeCategory})
          </button>
        </div>

        {/* Category Filter Chips */}
        <div className={`${showFilters ? "block" : "hidden"} md:block`}>
          <div className="flex flex-wrap gap-2 pt-2 border-t border-[#556B2F]/15">
            {["All", ...WHOLESALE_CATEGORIES].map(cat => {
              const active = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${active ? 'bg-[#556B2F] text-white shadow-md' : 'bg-[#F4EEDD] dark:bg-[#243020] text-[#2C3E1F] dark:text-[#F5F1E4] hover:bg-[#556B2F]/20'}`}
                  data-testid={`wholesale-filter-${cat.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {cat}
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${active ? 'bg-white/25' : 'bg-[#556B2F]/15 text-[#556B2F] dark:text-[#D4AF37]'}`}>
                    {categoryCounts[cat] || 0}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Result count row */}
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-[#c9d1c1] pt-2 border-t border-[#556B2F]/15">
          <span data-testid="wholesale-result-count">
            Showing <strong className="text-[#556B2F] dark:text-[#D4AF37]">{filtered.length}</strong> of {WHOLESALE_PRODUCTS.length} products
          </span>
          {(query || activeCategory !== "All" || sortKey !== "name") && (
            <button onClick={clearFilters} className="text-[#556B2F] dark:text-[#D4AF37] font-semibold hover:underline">
              Clear all filters
            </button>
          )}
        </div>
      </div>

      {/* DESKTOP TABLE HEADER */}
      <div className="hidden lg:grid grid-cols-[minmax(0,2.6fr)_100px_100px_minmax(0,3.4fr)_320px] gap-4 px-5 py-3 rounded-xl bg-[#2C3E1F] text-[#F5F1E4] text-xs font-bold uppercase tracking-wider sticky top-20 z-20 shadow-md">
        <div>Product Name</div>
        <div className="text-center">Weight</div>
        <div className="text-center">MRP</div>
        <div>Description</div>
        <div className="text-center">Order Options</div>
      </div>

      {/* PRODUCT LIST */}
      {filtered.length === 0 ? (
        <div className="text-center py-24 glass-panel rounded-2xl border border-[#556B2F]/20 mt-4" data-testid="wholesale-empty-state">
          <Package className="w-14 h-14 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-bold">No products match your filters</h3>
          <p className="text-sm text-gray-500 dark:text-[#c9d1c1] mt-1">Try a different keyword, category, or clear the filters.</p>
          <button onClick={clearFilters} className="mt-4 px-5 py-2.5 rounded-xl bg-[#556B2F] text-white font-semibold text-sm">Clear Filters</button>
        </div>
      ) : (
        <div className="mt-3 space-y-2" data-testid="wholesale-product-list">
          {filtered.map((p, idx) => (
            <WholesaleRow
              key={p.id}
              product={p}
              index={idx}
              onOrderWholesale={() => setOrderProduct(p)}
              buildRetailEnquiryMessage={buildRetailEnquiryMessage}
              whatsappNumber={BUSINESS_INFO.whatsappNumber}
            />
          ))}
        </div>
      )}

      {/* FOOTER HELP */}
      <div className="mt-12 glass-panel p-6 rounded-2xl border border-[#556B2F]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left">
          <h3 className="font-bold font-serif text-lg text-[#2C3E1F] dark:text-[#F5F1E4]">Need a custom bulk quote?</h3>
          <p className="text-sm text-gray-600 dark:text-[#d9d3c1]">Contact us directly for MOQ, wholesale pricing, and delivery timelines across Hyderabad.</p>
        </div>
        <a
          href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent("Hello Taher Ali Enterprises, I would like to discuss a wholesale bulk order. Please share your best pricing.")}`}
          target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold text-sm shadow-md transition-colors"
          data-testid="wholesale-contact-cta"
        >
          <MessageCircle className="w-4 h-4" /> WhatsApp: {BUSINESS_INFO.phone}
        </a>
      </div>

      {/* WHOLESALE ORDER DIALOG */}
      <WholesaleOrderDialog
        product={orderProduct}
        onClose={() => setOrderProduct(null)}
        whatsappNumber={BUSINESS_INFO.whatsappNumber}
      />
    </div>
  );
}

function WholesaleRow({ product, index, onOrderWholesale, buildRetailEnquiryMessage, whatsappNumber }) {
  const retailUrl = `https://wa.me/${whatsappNumber}?text=${buildRetailEnquiryMessage(product)}`;

  return (
    <div
      className={`grid grid-cols-1 lg:grid-cols-[minmax(0,2.6fr)_100px_100px_minmax(0,3.4fr)_320px] gap-4 px-4 lg:px-5 py-4 rounded-xl border border-[#556B2F]/15 items-start lg:items-center transition-all hover:border-[#D4AF37] hover:shadow-md ${index % 2 === 0 ? 'bg-white dark:bg-[#1e2a1a]' : 'bg-[#F4EEDD]/50 dark:bg-[#243020]/60'}`}
      data-testid={`wholesale-row-${product.id}`}
    >
      {/* Product Name + Icon + Categories */}
      <div className="flex items-start gap-3 min-w-0">
        <div className="w-11 h-11 shrink-0 rounded-lg bg-[#556B2F]/10 dark:bg-[#D4AF37]/15 text-[#556B2F] dark:text-[#D4AF37] flex items-center justify-center border border-[#556B2F]/20">
          <Package className="w-5 h-5" />
        </div>
        <div className="min-w-0">
          <h3 className="font-bold text-sm sm:text-base text-[#2C3E1F] dark:text-[#F5F1E4] leading-tight">{product.name}</h3>
          <div className="flex flex-wrap gap-1 mt-1.5">
            {product.categories.map(c => (
              <span key={c} className="text-[10px] px-1.5 py-0.5 rounded-md bg-[#556B2F]/10 dark:bg-[#D4AF37]/15 text-[#556B2F] dark:text-[#D4AF37] font-semibold uppercase tracking-wide">
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Weight */}
      <div className="lg:text-center">
        <span className="lg:hidden text-[10px] uppercase text-gray-500 dark:text-[#c9d1c1] font-semibold tracking-wider block">Weight</span>
        <span className="font-mono font-bold text-sm text-[#2C3E1F] dark:text-[#F5F1E4]">{product.weight}</span>
      </div>

      {/* MRP */}
      <div className="lg:text-center">
        <span className="lg:hidden text-[10px] uppercase text-gray-500 dark:text-[#c9d1c1] font-semibold tracking-wider block">MRP</span>
        <span className="font-extrabold text-lg text-[#556B2F] dark:text-[#D4AF37]">₹{product.mrp}</span>
      </div>

      {/* Description */}
      <div>
        <span className="lg:hidden text-[10px] uppercase text-gray-500 dark:text-[#c9d1c1] font-semibold tracking-wider block mb-1">Description</span>
        <p className="text-xs sm:text-sm text-gray-700 dark:text-[#d9d3c1] leading-relaxed">
          {product.description}
        </p>
      </div>

      {/* Actions: Order Wholesale + Retail Enquiry (larger, stacked) */}
      <div className="flex flex-col gap-2 w-full">
        <button
          onClick={onOrderWholesale}
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#556B2F] hover:bg-[#2C3E1F] text-white font-bold text-sm shadow-md transition-all transform active:scale-95"
          data-testid={`wholesale-order-btn-${product.id}`}
        >
          <ShoppingCart className="w-4 h-4" /> Order Wholesale
        </button>
        <a
          href={retailUrl}
          target="_blank" rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-[#243020] border-2 border-green-600 text-green-700 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-950/20 font-semibold text-xs sm:text-sm transition-colors"
          data-testid={`wholesale-retail-btn-${product.id}`}
        >
          <MessageCircle className="w-4 h-4" /> Looking for Retail?
        </a>
      </div>
    </div>
  );
}
