import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search, ArrowLeft, Home as HomeIcon, Package, ShoppingCart, Plus, Minus, Check,
  ChevronRight, ArrowUpDown, X, ChevronDown, Filter
} from "lucide-react";
import { WHOLESALE_PRODUCTS, WHOLESALE_CATEGORIES } from "../data/wholesaleProducts";
import { useShop } from "../context/ShopContext";
import { flyToCart } from "../utils/flyToCart";
import WholesaleQuantityDialog from "../components/WholesaleQuantityDialog";

const SORT_OPTIONS = [
  { key: "name", label: "Name (A-Z)" },
  { key: "name-desc", label: "Name (Z-A)" },
  { key: "price-asc", label: "Price (Low → High)" },
  { key: "price-desc", label: "Price (High → Low)" },
  { key: "weight-asc", label: "Weight (Light → Heavy)" },
  { key: "weight-desc", label: "Weight (Heavy → Light)" },
];

export default function WholesaleProductsPage() {
  const { addToCart, updateQuantity, cart } = useShop();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortKey, setSortKey] = useState("name");
  const [showFilters, setShowFilters] = useState(false);
  const [pendingProduct, setPendingProduct] = useState(null);

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

  const clearFilters = () => {
    setQuery("");
    setActiveCategory("All");
    setSortKey("name");
  };

  const openQuantityDialog = (product) => {
    setPendingProduct(product);
  };

  const confirmWholesaleAdd = (product, qty) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.mrp,
      weight: product.weight,
      category: product.categories[0] || "Wholesale",
      type: "wholesale",
    }, qty);
    setPendingProduct(null);
  };

  const getCartQty = (id) => {
    const found = cart.find(i => i.id === id);
    return found ? found.quantity : 0;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn" data-testid="wholesale-products-page">

      <nav className="flex items-center gap-2 text-xs sm:text-sm text-gray-800 dark:text-[#dcd6bf] mb-6 flex-wrap" data-testid="wholesale-breadcrumb">
        <Link to="/" className="hover:text-[#556B2F] dark:hover:text-[#D4AF37] transition-colors">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <Link to="/products" className="hover:text-[#556B2F] dark:hover:text-[#D4AF37] transition-colors">Retail Products</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-[#2C3E1F] dark:text-[#F5F1E4] font-semibold">Wholesale Products</span>
      </nav>

      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <button onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#F4EEDD] dark:bg-[#243020] font-semibold text-sm hover:bg-[#556B2F] hover:text-white dark:hover:bg-[#556B2F] transition-colors"
              data-testid="wholesale-back-btn">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <Link to="/"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#F4EEDD] dark:bg-[#243020] font-semibold text-sm hover:bg-[#556B2F] hover:text-white dark:hover:bg-[#556B2F] transition-colors"
              data-testid="wholesale-home-btn">
              <HomeIcon className="w-4 h-4" /> Home
            </Link>
            <Link to="/products"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#F4EEDD] dark:bg-[#243020] font-semibold text-sm hover:bg-[#556B2F] hover:text-white dark:hover:bg-[#556B2F] transition-colors"
              data-testid="wholesale-to-retail-btn">
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
            <p className="text-sm sm:text-base text-gray-700 dark:text-[#e8e2ce] max-w-2xl">
              Complete wholesale catalog with <strong>{WHOLESALE_PRODUCTS.length}+ products</strong> — text-only listing designed for bulk buyers, retailers, and distributors. Add multiple items to your cart and checkout together.
            </p>
          </div>
        </div>
      </div>

      <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-[#556B2F]/20 mb-6 space-y-4" data-testid="wholesale-controls">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3.5 w-4 h-4 text-gray-700 dark:text-[#a8b39c]" />
            <input type="text" placeholder="Search by product name or weight (e.g. 400g, cashew, sugar free)…"
              value={query} onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-9 pr-9 py-3 rounded-xl bg-white dark:bg-[#1e2a1a] border border-[#556B2F]/30 text-sm focus:outline-none focus:ring-2 focus:ring-[#556B2F] text-[#2C3E1F] dark:text-[#F5F1E4] placeholder-gray-500 dark:placeholder-[#a8b39c]"
              data-testid="wholesale-search-input" />
            {query && (
              <button onClick={() => setQuery("")} className="absolute right-3 top-3.5 text-gray-700 dark:text-[#a8b39c] hover:text-[#556B2F] dark:hover:text-[#D4AF37]" aria-label="Clear search">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="relative">
            <ArrowUpDown className="absolute left-3 top-3.5 w-4 h-4 text-gray-700 pointer-events-none" />
            <select value={sortKey} onChange={(e) => setSortKey(e.target.value)}
              className="pl-9 pr-9 py-3 rounded-xl bg-white dark:bg-[#1e2a1a] border border-[#556B2F]/30 text-sm focus:outline-none focus:ring-2 focus:ring-[#556B2F] text-[#2C3E1F] dark:text-[#F5F1E4] appearance-none w-full md:w-auto"
              data-testid="wholesale-sort-select">
              {SORT_OPTIONS.map(opt => (
                <option key={opt.key} value={opt.key}>Sort: {opt.label}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-3.5 w-4 h-4 text-gray-700 pointer-events-none" />
          </div>

          <button onClick={() => setShowFilters(!showFilters)}
            className="md:hidden inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#556B2F] text-white font-semibold text-sm"
            data-testid="wholesale-filter-toggle">
            <Filter className="w-4 h-4" /> {showFilters ? "Hide" : "Show"} Filters ({activeCategory === "All" ? "All" : activeCategory})
          </button>
        </div>

        <div className={`${showFilters ? "block" : "hidden"} md:block`}>
          <div className="flex flex-wrap gap-2 pt-2 border-t border-[#556B2F]/15">
            {["All", ...WHOLESALE_CATEGORIES].map(cat => {
              const active = activeCategory === cat;
              return (
                <button key={cat} onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${active ? 'bg-[#556B2F] text-white shadow-md' : 'bg-[#F4EEDD] dark:bg-[#243020] text-[#2C3E1F] dark:text-[#F5F1E4] hover:bg-[#556B2F]/20'}`}
                  data-testid={`wholesale-filter-${cat.toLowerCase().replace(/\s+/g, "-")}`}>
                  {cat}
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${active ? 'bg-white/25' : 'bg-[#556B2F]/15 text-[#556B2F] dark:text-[#D4AF37]'}`}>
                    {categoryCounts[cat] || 0}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-800 dark:text-[#dcd6bf] pt-2 border-t border-[#556B2F]/15">
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

      <div className="hidden lg:grid grid-cols-[minmax(0,2.6fr)_100px_100px_minmax(0,3.4fr)_260px] gap-4 px-5 py-3 rounded-xl bg-[#2C3E1F] text-[#F5F1E4] text-xs font-bold uppercase tracking-wider sticky top-20 z-20 shadow-md">
        <div>Product Name</div>
        <div className="text-center">Weight</div>
        <div className="text-center">MRP</div>
        <div>Description</div>
        <div className="text-center">Order</div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-24 glass-panel rounded-2xl border border-[#556B2F]/20 mt-4" data-testid="wholesale-empty-state">
          <Package className="w-14 h-14 text-gray-700 mx-auto mb-4" />
          <h3 className="text-lg font-bold">No products match your filters</h3>
          <p className="text-sm text-gray-800 dark:text-[#dcd6bf] mt-1">Try a different keyword, category, or clear the filters.</p>
          <button onClick={clearFilters} className="mt-4 px-5 py-2.5 rounded-xl bg-[#556B2F] text-white font-semibold text-sm">Clear Filters</button>
        </div>
      ) : (
        <div className="mt-3 space-y-2" data-testid="wholesale-product-list">
          {filtered.map((p, idx) => (
            <WholesaleRow
              key={p.id}
              product={p}
              index={idx}
              cartQty={getCartQty(p.id)}
              onAdd={() => openQuantityDialog(p)}
              onInc={(e) => { flyToCart(e.currentTarget); updateQuantity(p.id, 1); }}
              onDec={() => updateQuantity(p.id, -1)}
            />
          ))}
        </div>
      )}

      {/* Wholesale bulk quantity picker */}
      <WholesaleQuantityDialog
        product={pendingProduct}
        onClose={() => setPendingProduct(null)}
        onConfirm={confirmWholesaleAdd}
      />
    </div>
  );
}

function WholesaleRow({ product, index, cartQty, onAdd, onInc, onDec }) {
  const inCart = cartQty > 0;
  return (
    <div
      className={`grid grid-cols-1 lg:grid-cols-[minmax(0,2.6fr)_100px_100px_minmax(0,3.4fr)_260px] gap-4 px-4 lg:px-5 py-4 rounded-xl border transition-all hover:border-[#D4AF37] hover:shadow-md items-start lg:items-center ${inCart ? 'border-green-500/40 bg-green-50/40 dark:bg-green-950/10' : 'border-[#556B2F]/15 ' + (index % 2 === 0 ? 'bg-white dark:bg-[#1e2a1a]' : 'bg-[#F4EEDD]/50 dark:bg-[#243020]/60')}`}
      data-testid={`wholesale-row-${product.id}`}
    >
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
            {inCart && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-green-600 text-white font-semibold uppercase tracking-wide flex items-center gap-1" data-testid={`in-cart-badge-${product.id}`}>
                <Check className="w-3 h-3" /> In Cart
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="lg:text-center">
        <span className="lg:hidden text-[10px] uppercase text-gray-800 dark:text-[#dcd6bf] font-semibold tracking-wider block">Weight</span>
        <span className="font-mono font-bold text-sm text-[#2C3E1F] dark:text-[#F5F1E4]">{product.weight}</span>
      </div>

      <div className="lg:text-center">
        <span className="lg:hidden text-[10px] uppercase text-gray-800 dark:text-[#dcd6bf] font-semibold tracking-wider block">MRP</span>
        <span className="font-extrabold text-lg text-[#556B2F] dark:text-[#D4AF37]">₹{product.mrp}</span>
      </div>

      <div>
        <span className="lg:hidden text-[10px] uppercase text-gray-800 dark:text-[#dcd6bf] font-semibold tracking-wider block mb-1">Description</span>
        <p className="text-xs sm:text-sm text-gray-800 dark:text-[#efe9d4] leading-relaxed">{product.description}</p>
      </div>

      <div className="flex justify-end">
        {inCart ? (
          <div className="flex items-center gap-1.5 bg-[#556B2F]/10 dark:bg-[#D4AF37]/10 rounded-xl p-1.5 border border-[#556B2F]/30 w-full" data-testid={`row-qty-controls-${product.id}`}>
            <button onClick={(e) => { e.stopPropagation(); onDec(); }}
              className="w-10 h-10 rounded-lg bg-white dark:bg-[#243020] hover:bg-[#556B2F] hover:text-white flex items-center justify-center transition-colors shadow-sm"
              data-testid={`row-qty-minus-${product.id}`} aria-label="Decrease">
              <Minus className="w-4 h-4" />
            </button>
            <span className="font-extrabold text-lg text-[#2C3E1F] dark:text-[#F5F1E4] flex-1 text-center" data-testid={`row-qty-value-${product.id}`}>{cartQty}</span>
            <button onClick={(e) => { e.stopPropagation(); onInc(e); }}
              className="w-10 h-10 rounded-lg bg-white dark:bg-[#243020] hover:bg-[#556B2F] hover:text-white flex items-center justify-center transition-colors shadow-sm"
              data-testid={`row-qty-plus-${product.id}`} aria-label="Increase">
              <Plus className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button onClick={(e) => { e.stopPropagation(); onAdd(); }}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#556B2F] hover:bg-[#2C3E1F] text-white font-bold text-sm shadow-md transition-all transform active:scale-95"
            data-testid={`wholesale-add-to-cart-${product.id}`}>
            <ShoppingCart className="w-4 h-4" /> Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}
