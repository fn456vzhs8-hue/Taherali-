import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Search, Package, ChevronRight } from "lucide-react";
import { PRODUCTS } from "../mock";
import ProductCard from "../components/ProductCard";

export default function ProductsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    const t = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(t);
  }, []);

  const filteredProducts = PRODUCTS.filter(p => {
    const matchesTab = activeTab === "all" || p.category.toLowerCase().includes(activeTab.toLowerCase());
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const categoryCounts = {
    all: PRODUCTS.length,
    pickles: PRODUCTS.filter(p => p.category.toLowerCase().includes("pickle")).length,
    biscuits: PRODUCTS.filter(p => p.category.toLowerCase().includes("biscuit")).length,
    ghee: PRODUCTS.filter(p => p.category.toLowerCase().includes("ghee")).length,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn" data-testid="products-page">
      <nav className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 dark:text-[#dcd6bf] mb-6" data-testid="products-breadcrumb">
        <Link to="/" className="hover:text-[#556B2F] dark:hover:text-[#D4AF37] transition-colors">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-[#2C3E1F] dark:text-[#F5F1E4] font-semibold">Retail Catalog</span>
      </nav>

      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <div className="space-y-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#F4EEDD] dark:bg-[#243020] font-semibold text-sm hover:bg-[#556B2F] hover:text-white dark:hover:bg-[#556B2F] transition-colors w-fit"
            data-testid="back-to-home-btn"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-serif text-[#2C3E1F] dark:text-[#F5F1E4]">
            Retail Catalog
          </h1>
          <p className="text-base text-gray-700 dark:text-[#e8e2ce] max-w-2xl">
            Traditional Hyderabadi pickles, bakery biscuits, and pure ghee. Add products to your cart and continue shopping — checkout combines retail and wholesale in one order.
          </p>
        </div>
      </div>

      <div className="mb-8 glass-panel p-5 rounded-2xl border border-[#D4AF37]/40 bg-gradient-to-r from-[#F4EEDD] to-[#F4EEDD]/50 dark:from-[#243020] dark:to-[#243020]/50 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left">
          <p className="text-xs font-bold text-[#8B5A2B] dark:text-[#D4AF37] uppercase tracking-wider">Looking for wholesale volumes?</p>
          <p className="text-sm text-gray-800 dark:text-[#efe9d4]">Browse our 100+ product wholesale catalog — text-only listing designed for bulk buyers.</p>
        </div>
        <Link
          to="/wholesale"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2C3E1F] hover:bg-[#556B2F] text-white font-semibold text-sm shadow-md transition-colors whitespace-nowrap"
          data-testid="retail-to-wholesale-link"
        >
          Open Wholesale Catalog <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-[#556B2F]/20 flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between mb-10">
        <div className="flex flex-wrap gap-2">
          {[
            { key: "all", label: "All" },
            { key: "pickles", label: "Pickles" },
            { key: "biscuits", label: "Biscuits" },
            { key: "ghee", label: "Ghee" },
          ].map(cat => (
            <button
              key={cat.key}
              onClick={() => setActiveTab(cat.key)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${activeTab === cat.key ? 'bg-[#556B2F] text-white shadow-md' : 'bg-[#F4EEDD] dark:bg-[#243020] text-[#2C3E1F] dark:text-[#F5F1E4] hover:bg-[#556B2F]/20'}`}
              data-testid={`category-tab-${cat.key}`}
            >
              {cat.label}
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeTab === cat.key ? 'bg-white/25 text-white' : 'bg-[#556B2F]/15 text-[#556B2F] dark:text-[#D4AF37]'}`}>
                {categoryCounts[cat.key]}
              </span>
            </button>
          ))}
        </div>

        <div className="relative w-full lg:w-80">
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-500 dark:text-[#a8b39c]" />
          <input
            type="text"
            placeholder="Search pickles, biscuits, ghee…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white dark:bg-[#1e2a1a] border border-[#556B2F]/30 text-sm focus:outline-none focus:ring-2 focus:ring-[#556B2F] text-[#2C3E1F] dark:text-[#F5F1E4] placeholder-gray-500 dark:placeholder-[#a8b39c]"
            data-testid="product-search-input"
          />
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8" data-testid="product-skeleton-grid">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="glass-panel p-5 rounded-2xl border border-[#556B2F]/20">
              <div className="w-full h-48 rounded-xl bg-gray-200 dark:bg-[#2a3822] mb-4 skeleton-shimmer" />
              <div className="h-5 w-3/4 bg-gray-200 dark:bg-[#2a3822] rounded mb-2 skeleton-shimmer" />
              <div className="h-3 w-full bg-gray-200 dark:bg-[#2a3822] rounded mb-1 skeleton-shimmer" />
              <div className="h-3 w-2/3 bg-gray-200 dark:bg-[#2a3822] rounded skeleton-shimmer" />
            </div>
          ))}
        </div>
      ) : filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8" data-testid="product-grid">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24" data-testid="no-products-found">
          <Package className="w-12 h-12 text-gray-500 mx-auto mb-4" />
          <h3 className="text-lg font-bold">No products found</h3>
          <p className="text-sm text-gray-600 dark:text-[#dcd6bf]">Try searching with a different keyword or category.</p>
        </div>
      )}
    </div>
  );
}
