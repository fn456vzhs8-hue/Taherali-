import React, { useState, useEffect } from "react";
import { 
  ShoppingBag, 
  Phone, 
  MapPin, 
  Clock, 
  Search, 
  Plus, 
  Minus, 
  Trash2, 
  CheckCircle2, 
  ChevronRight, 
  Menu, 
  X, 
  Calculator, 
  MessageCircle, 
  Sun, 
  Moon, 
  ShieldCheck, 
  Award, 
  Truck, 
  TrendingUp,
  ArrowRight,
  ExternalLink,
  Info,
  Package,
  Sparkles,
  ZoomIn,
  ArrowLeft
} from "lucide-react";
import { PRODUCTS, BUSINESS_INFO, BULK_TIERS } from "./mock";
import { toast } from "sonner";

export default function TaherAliApp() {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [bulkCalculatorOpen, setBulkCalculatorOpen] = useState(false);
  
  // Selected Product for Amazon-Style Full Page Modal
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  // Checkout Form State
  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    address: "",
    landmark: "",
    city: "Hyderabad",
    pincode: "",
    specialInstructions: ""
  });

  // Bulk Calculator State
  const [bulkCalcSelections, setBulkCalcSelections] = useState({});

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Cart helper functions
  const addToCart = (product, qty = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + qty } : item
        );
      }
      return [...prev, { ...product, quantity: qty }];
    });
    toast.success(`Added ${qty}x ${product.name} to wholesale cart`);
  };

  const updateQuantity = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const removeItem = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
    toast.info("Item removed from cart");
  };

  const clearCart = () => {
    setCart([]);
    toast.info("Cart cleared");
  };

  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // Apply wholesale discount if total units >= 10
  const applicableTier = BULK_TIERS.slice().reverse().find(tier => totalItemsCount >= tier.minUnits) || BULK_TIERS[0];
  const discountAmount = Math.round((subtotalPrice * applicableTier.discountPercent) / 100);
  const grandTotal = subtotalPrice - discountAmount;

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    if (!formData.customerName || !formData.phone || !formData.address) {
      toast.error("Please fill in Name, Phone, and Address");
      return;
    }

    // Generate WhatsApp Message
    let msg = `*NEW WHOLESALE ORDER - TAHER ALI ENTERPRISES*\n\n`;
    msg += `👤 *Customer Name:* ${formData.customerName}\n`;
    msg += `📞 *Phone:* ${formData.phone}\n`;
    msg += `📍 *Address:* ${formData.address}, ${formData.landmark ? 'Near ' + formData.landmark + ', ' : ''}${formData.city} - ${formData.pincode}\n`;
    if (formData.specialInstructions) {
      msg += `📝 *Instructions:* ${formData.specialInstructions}\n`;
    }
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
    msg += `\n_Generated via Taher Ali Enterprises B2B Portal_`;

    const encodedMsg = encodeURIComponent(msg);
    const whatsappUrl = `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodedMsg}`;

    window.open(whatsappUrl, "_blank");
    toast.success("WhatsApp order generated successfully!");
    setCheckoutOpen(false);
    setCartOpen(false);
  };

  const filteredProducts = PRODUCTS.filter(p => {
    const matchesTab = activeTab === "all" || p.category.toLowerCase().includes(activeTab.toLowerCase());
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-[#1a2316] text-[#FDFBF7]' : 'bg-[#FDFBF7] text-[#2C3E1F]'}`} data-testid="taher-ali-app">
      
      {/* TOP NOTIFICATION BAR */}
      <div className="bg-[#556B2F] text-white text-xs sm:text-sm py-2 px-4 text-center font-medium flex items-center justify-center gap-3" data-testid="top-notice-bar">
        <Sparkles className="w-4 h-4 text-[#D4AF37] animate-pulse" />
        <span>Direct Wholesale Supplier in Hyderabad | Bulk Orders & Custom Inquiries Welcome</span>
        <a href="#contact" className="underline font-bold hover:text-[#D4AF37] transition-colors ml-2">Contact Us</a>
      </div>

      {/* NAVIGATION BAR */}
      <nav className="sticky top-0 z-45 glass-panel shadow-sm border-b border-[#556B2F]/20 transition-colors" data-testid="main-navbar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group" data-testid="logo-link">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#556B2F] to-[#2C3E1F] flex items-center justify-center text-white font-bold text-xl shadow-md group-hover:scale-105 transition-transform">
              TA
            </div>
            <div>
              <h1 className="font-bold text-lg sm:text-xl tracking-tight text-[#2C3E1F] dark:text-[#FDFBF7] font-serif">
                Taher Ali Enterprises
              </h1>
              <p className="text-xs text-[#556B2F] dark:text-[#D4AF37] font-medium tracking-wide">
                Premium Wholesale Food Products
              </p>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8 font-medium text-sm">
            <a href="#home" className="hover:text-[#556B2F] transition-colors" data-testid="nav-home">Home</a>
            <a href="#products" className="hover:text-[#556B2F] transition-colors" data-testid="nav-products">Products</a>
            <a href="#about" className="hover:text-[#556B2F] transition-colors" data-testid="nav-about">About</a>
            <button 
              onClick={() => setBulkCalculatorOpen(true)}
              className="flex items-center gap-1.5 text-[#8B5A2B] dark:text-[#D4AF37] font-semibold hover:opacity-80 transition-opacity"
              data-testid="nav-bulk-calculator"
            >
              <Calculator className="w-4 h-4" /> Bulk Calculator
            </button>
            <a href="#contact" className="hover:text-[#556B2F] transition-colors" data-testid="nav-contact">Contact</a>
          </div>

          {/* Actions: Theme Toggle & Cart */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2.5 rounded-full bg-[#F4EEDD] dark:bg-[#2C3E1F] text-[#2C3E1F] dark:text-[#D4AF37] hover:scale-110 transition-transform shadow-sm"
              title="Toggle Theme"
              data-testid="theme-toggle-btn"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setCartOpen(true)}
              className="relative px-4 py-2.5 rounded-xl bg-[#556B2F] hover:bg-[#2C3E1F] text-white font-medium flex items-center gap-2 shadow-md transition-all transform active:scale-95"
              data-testid="open-cart-btn"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="hidden sm:inline">Cart</span>
              {totalItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#D4AF37] text-[#2C3E1F] font-bold text-xs w-6 h-6 rounded-full flex items-center justify-center shadow-md animate-bounce" data-testid="cart-item-count">
                  {totalItemsCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl bg-[#F4EEDD] dark:bg-[#2C3E1F] text-[#2C3E1F] dark:text-[#FDFBF7]"
              data-testid="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden glass-panel border-t border-[#556B2F]/20 px-6 py-4 flex flex-col gap-4 animate-fadeIn" data-testid="mobile-menu">
            <a href="#home" onClick={() => setMobileMenuOpen(false)} className="font-medium py-2 border-b border-gray-200 dark:border-gray-800">Home</a>
            <a href="#products" onClick={() => setMobileMenuOpen(false)} className="font-medium py-2 border-b border-gray-200 dark:border-gray-800">Products</a>
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="font-medium py-2 border-b border-gray-200 dark:border-gray-800">About</a>
            <button onClick={() => { setBulkCalculatorOpen(true); setMobileMenuOpen(false); }} className="text-left font-medium py-2 border-b border-gray-200 dark:border-gray-800 text-[#8B5A2B] dark:text-[#D4AF37] flex items-center gap-2">
              <Calculator className="w-4 h-4" /> Bulk Quote Calculator
            </button>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="font-medium py-2">Contact</a>
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section id="home" className="relative overflow-hidden pt-12 pb-24 sm:py-24 bg-gradient-to-b from-[#F4EEDD] to-[#FDFBF7] dark:from-[#1a2316] dark:to-[#22301c]" data-testid="hero-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#556B2F]/10 dark:bg-[#D4AF37]/10 text-[#556B2F] dark:text-[#D4AF37] font-semibold text-xs sm:text-sm tracking-wide">
              <ShieldCheck className="w-4 h-4" /> Trusted Hyderabad Wholesale Partner since 1998
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight font-serif text-[#2C3E1F] dark:text-[#FDFBF7] leading-tight">
              Taher Ali Enterprises
            </h1>

            <p className="text-xl sm:text-2xl font-semibold text-[#8B5A2B] dark:text-[#D4AF37]">
              Premium Wholesale Food Products
            </p>

            <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 max-w-xl leading-relaxed">
              Supplying quality products across Hyderabad, Telangana. Direct from our hygienic facility to your retail store, restaurant, or bulk celebration.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="#products"
                className="px-8 py-4 rounded-xl bg-[#556B2F] hover:bg-[#2C3E1F] text-white font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
                data-testid="hero-explore-btn"
              >
                Explore Products <ArrowRight className="w-5 h-5" />
              </a>
              <button
                onClick={() => setBulkCalculatorOpen(true)}
                className="px-8 py-4 rounded-xl bg-white dark:bg-[#2C3E1F] border-2 border-[#556B2F] text-[#556B2F] dark:text-[#D4AF37] hover:bg-[#556B2F]/10 font-semibold flex items-center gap-2 shadow-md transition-all"
                data-testid="hero-bulk-calc-btn"
              >
                <Calculator className="w-5 h-5" /> Bulk Calculator
              </button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-[#556B2F]/20 text-center sm:text-left">
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-[#2C3E1F] dark:text-[#D4AF37]">100%</p>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Pure & Hygienic</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-[#2C3E1F] dark:text-[#D4AF37]">₹89+</p>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Wholesale Pricing</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-[#2C3E1F] dark:text-[#D4AF37]">All</p>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Hyderabad Delivery</p>
              </div>
            </div>
          </div>

          {/* Floating Hero Visual Cards */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md h-[420px] bg-gradient-to-br from-[#556B2F]/20 to-[#8B5A2B]/10 rounded-3xl p-6 flex flex-col justify-between shadow-xl border border-[#556B2F]/30 backdrop-blur-sm">
              <div className="flex justify-between items-center">
                <span className="px-3 py-1 bg-[#D4AF37] text-[#2C3E1F] text-xs font-bold rounded-full">Wholesale Spotlight</span>
                <span className="text-xs font-semibold text-[#556B2F] dark:text-[#D4AF37]">Hyderabad, TS</span>
              </div>

              {/* Floating product card 1 */}
              <div 
                onClick={() => setSelectedProduct(PRODUCTS[0])}
                className="animate-float glass-panel p-4 rounded-2xl shadow-lg border border-[#556B2F]/20 flex items-center gap-4 cursor-pointer hover:border-[#D4AF37]"
              >
                <div className="w-16 h-16 rounded-xl bg-[#F4EEDD] dark:bg-[#1a2316] flex items-center justify-center text-2xl">
                  🥭
                </div>
                <div>
                  <h4 className="font-bold text-base">Traditional Mango Achar</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">250g | Wholesale Pack</p>
                  <p className="text-sm font-bold text-[#556B2F] dark:text-[#D4AF37]">₹89 <span className="text-xs font-normal text-gray-500">/ unit</span></p>
                </div>
              </div>

              {/* Floating product card 2 */}
              <div 
                onClick={() => setSelectedProduct(PRODUCTS[6])}
                className="animate-float-delayed glass-panel p-4 rounded-2xl shadow-lg border border-[#556B2F]/20 flex items-center gap-4 cursor-pointer hover:border-[#D4AF37]"
              >
                <div className="w-16 h-16 rounded-xl bg-[#F4EEDD] dark:bg-[#1a2316] flex items-center justify-center text-2xl">
                  🍪
                </div>
                <div>
                  <h4 className="font-bold text-base">Osmania & Cashew Biscuits</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">400g Family Pack</p>
                  <p className="text-sm font-bold text-[#556B2F] dark:text-[#D4AF37]">₹240 <span className="text-xs font-normal text-gray-500">/ unit</span></p>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 bg-[#2C3E1F] text-[#D4AF37] px-5 py-3 rounded-2xl shadow-2xl border border-[#D4AF37]/30 flex items-center gap-3">
                <Award className="w-6 h-6 text-[#D4AF37]" />
                <div>
                  <p className="text-xs text-gray-300">Certified Quality</p>
                  <p className="text-sm font-bold">Mohammed Abdullah Bilal</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <section id="products" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-testid="products-section">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-[#2C3E1F] dark:text-[#FDFBF7]">
            Our Wholesale Product Catalog
          </h2>
          <p className="text-base text-gray-600 dark:text-gray-300">
            Hand-crafted pickles, traditional Hyderabad bakery biscuits, and pure ghee available in bulk and retail quantities at unbeatable wholesale prices. Click any product for details.
          </p>

          {/* Search & Category Filter */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pt-6">
            <div className="flex flex-wrap gap-2 justify-center">
              {["all", "pickles", "biscuits", "ghee"].map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`px-5 py-2 rounded-xl text-sm font-semibold capitalize transition-all ${activeTab === cat ? 'bg-[#556B2F] text-white shadow-md' : 'bg-[#F4EEDD] dark:bg-[#2C3E1F] text-[#2C3E1F] dark:text-[#FDFBF7] hover:bg-[#556B2F]/20'}`}
                  data-testid={`category-tab-${cat}`}
                >
                  {cat === "all" ? "All Products" : cat}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search pickles, biscuits, ghee..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-white dark:bg-[#1a2316] border border-[#556B2F]/30 text-sm focus:outline-none focus:ring-2 focus:ring-[#556B2F]"
                data-testid="product-search-input"
              />
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8" data-testid="product-grid">
          {filteredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={addToCart} 
              onSelect={() => setSelectedProduct(product)} 
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <Package className="w-12 h-12 text-gray-400 mx-auto mb-4 animate-bounce" />
            <h3 className="text-lg font-bold">No products found</h3>
            <p className="text-sm text-gray-500">Try searching with a different keyword or category.</p>
          </div>
        )}
      </section>

      {/* BULK DISCOUNT BANNER & CALCULATOR PROMO */}
      <section className="py-16 bg-[#556B2F] text-white my-12 relative overflow-hidden" data-testid="bulk-promo-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
          <div className="space-y-4">
            <span className="px-3 py-1 bg-[#D4AF37] text-[#2C3E1F] text-xs font-bold rounded-full">B2B Wholesale Advantage</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-serif">Bulk Orders & Tiered Discounts</h2>
            <p className="text-gray-200 text-sm sm:text-base leading-relaxed">
              Ordering for retail shops, supermarkets, catering, or family events in Hyderabad? Enjoy automatic wholesale price reductions based on your total order volume.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => setBulkCalculatorOpen(true)}
                className="px-6 py-3 rounded-xl bg-[#D4AF37] hover:bg-[#c59d2e] text-[#2C3E1F] font-bold flex items-center gap-2 shadow-lg transition-all"
                data-testid="open-bulk-calc-modal-btn"
              >
                <Calculator className="w-5 h-5" /> Open Bulk Calculator
              </button>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 space-y-4">
            <h3 className="font-bold text-lg text-white">Wholesale Discount Tiers</h3>
            <div className="space-y-3">
              {BULK_TIERS.map((tier, idx) => (
                <div key={idx} className="flex justify-between items-center bg-black/20 px-4 py-3 rounded-xl text-sm">
                  <span className="font-medium text-gray-200">{tier.label}</span>
                  <span className="font-extrabold text-[#D4AF37]">{tier.discountPercent}% OFF</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-testid="about-section">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#556B2F]/10 dark:bg-[#D4AF37]/10 text-[#556B2F] dark:text-[#D4AF37] font-semibold text-sm">
              <Info className="w-4 h-4" /> About Taher Ali Enterprises
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-[#2C3E1F] dark:text-[#FDFBF7]">
              Committed to Purity, Tradition & Trust
            </h2>

            <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
              Taher Ali Enterprises is a trusted wholesale supplier serving customers across Hyderabad, Telangana. We provide quality food products including pickles, biscuits and pure ghee at competitive wholesale prices.
            </p>

            <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
              Our goal is to provide fresh products, honest pricing and reliable customer service. Every batch is rigorously quality-tested before dispatching to retailers and bulk buyers across Hyderabad.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="glass-panel p-4 rounded-xl border border-[#556B2F]/20 flex items-center gap-4">
                <div className="p-3 bg-[#556B2F]/10 rounded-lg text-[#556B2F] dark:text-[#D4AF37]">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Proprietor</p>
                  <p className="font-bold text-sm sm:text-base">{BUSINESS_INFO.owner}</p>
                </div>
              </div>

              <div className="glass-panel p-4 rounded-xl border border-[#556B2F]/20 flex items-center gap-4">
                <div className="p-3 bg-[#556B2F]/10 rounded-lg text-[#556B2F] dark:text-[#D4AF37]">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Service Area</p>
                  <p className="font-bold text-sm sm:text-base">{BUSINESS_INFO.serviceArea}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-[#556B2F]/20 bg-[#F4EEDD] dark:bg-[#1a2316] p-8 text-center space-y-6">
              <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-[#556B2F] to-[#2C3E1F] flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                TA
              </div>
              <div>
                <h3 className="text-2xl font-bold font-serif text-[#2C3E1F] dark:text-[#FDFBF7]">Taher Ali Enterprises</h3>
                <p className="text-sm text-[#8B5A2B] dark:text-[#D4AF37] font-medium">Established in Hyderabad</p>
              </div>
              <div className="border-t border-[#556B2F]/20 pt-6 space-y-3 text-left text-sm">
                <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-800">
                  <span className="text-gray-500">Main Office</span>
                  <span className="font-semibold">{BUSINESS_INFO.location}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-800">
                  <span className="text-gray-500">Direct Contact</span>
                  <span className="font-semibold font-mono text-[#556B2F] dark:text-[#D4AF37]">{BUSINESS_INFO.phone}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-500">Business Hours</span>
                  <span className="font-semibold text-right">Mon - Sat: 8AM - 8PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-20 bg-gradient-to-b from-transparent via-[#F4EEDD]/50 to-transparent dark:via-[#1f2b1a]/50" data-testid="contact-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-[#2C3E1F] dark:text-[#FDFBF7]">
              Get in Touch & Order Dispatch
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-300">
              Have questions about bulk quantities, custom packaging, or door delivery across Hyderabad? Contact us directly.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 glass-panel p-8 rounded-3xl shadow-xl space-y-6">
              <h3 className="text-xl font-bold font-serif text-[#2C3E1F] dark:text-[#FDFBF7]">Business Details</h3>
              
              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#556B2F]/10 text-[#556B2F] dark:text-[#D4AF37] rounded-xl">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Business Name & Owner</p>
                    <p className="font-bold">{BUSINESS_INFO.name}</p>
                    <p className="text-gray-600 dark:text-gray-400">Proprietor: {BUSINESS_INFO.owner}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#556B2F]/10 text-[#556B2F] dark:text-[#D4AF37] rounded-xl">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Phone & WhatsApp</p>
                    <a href={`tel:${BUSINESS_INFO.phone}`} className="font-bold hover:text-[#556B2F] font-mono text-base">{BUSINESS_INFO.phone}</a>
                    <p className="text-xs text-green-600 font-medium">Available on WhatsApp for instant orders</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#556B2F]/10 text-[#556B2F] dark:text-[#D4AF37] rounded-xl">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Location & Service Area</p>
                    <p className="font-bold">{BUSINESS_INFO.location}</p>
                    <p className="text-gray-600 dark:text-gray-400">{BUSINESS_INFO.serviceArea}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#556B2F]/10 text-[#556B2F] dark:text-[#D4AF37] rounded-xl">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Business Hours</p>
                    <p className="font-bold">{BUSINESS_INFO.businessHours}</p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <a
                  href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=Hello%20Taher%20Ali%20Enterprises,%20I%20would%20like%20to%20inquire%20about%20wholesale%20food%20products.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold flex items-center justify-center gap-2 shadow-lg transition-all"
                  data-testid="contact-whatsapp-btn"
                >
                  <MessageCircle className="w-5 h-5" /> Chat on WhatsApp (6305486808)
                </a>
              </div>
            </div>

            {/* Google Maps Placeholder */}
            <div className="lg:col-span-7 glass-panel p-4 rounded-3xl shadow-xl flex flex-col">
              <div className="flex justify-between items-center mb-4 px-4 pt-2">
                <h4 className="font-bold text-base flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#556B2F]" /> Hyderabad Headquarters & Warehouse
                </h4>
                <span className="text-xs bg-[#556B2F]/10 text-[#556B2F] dark:text-[#D4AF37] px-3 py-1 rounded-full font-medium">
                  Telangana, India
                </span>
              </div>
              <div className="flex-1 w-full min-h-[360px] bg-[#F4EEDD] dark:bg-[#1a2316] rounded-2xl border border-[#556B2F]/20 relative overflow-hidden flex flex-col items-center justify-center text-center p-6">
                <div className="w-16 h-16 rounded-full bg-[#556B2F] text-white flex items-center justify-center shadow-lg mb-4 animate-bounce">
                  <MapPin className="w-8 h-8" />
                </div>
                <h5 className="text-xl font-bold font-serif mb-2">Taher Ali Enterprises</h5>
                <p className="text-sm text-gray-600 dark:text-gray-300 max-w-md mb-6">
                  Serving wholesale food product distribution across Hyderabad and surrounding districts with prompt dispatch.
                </p>
                <div className="flex gap-4">
                  <a
                    href="https://maps.google.com/?q=Hyderabad+Telangana"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-[#2C3E1F] text-white text-sm font-semibold flex items-center gap-2 shadow-md hover:bg-[#556B2F] transition-colors"
                  >
                    Open in Google Maps <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#2C3E1F] text-[#FDFBF7] py-16" data-testid="footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-white/10 pb-12">
          
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#556B2F] flex items-center justify-center text-white font-bold text-lg">
                TA
              </div>
              <h3 className="text-xl font-bold font-serif text-[#D4AF37]">Taher Ali Enterprises</h3>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed max-w-sm">
              Premium wholesale food products supplying traditional pickles, bakery biscuits, and pure ghee across Hyderabad, Telangana.
            </p>
            <p className="text-xs text-gray-400">
              Proprietor: Mohammed Abdullah Bilal | Phone: {BUSINESS_INFO.phone}
            </p>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h4 className="font-bold text-base text-[#D4AF37]">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#home" className="hover:text-[#D4AF37] transition-colors">Home</a></li>
              <li><a href="#products" className="hover:text-[#D4AF37] transition-colors">Products Catalog</a></li>
              <li><button onClick={() => setBulkCalculatorOpen(true)} className="hover:text-[#D4AF37] transition-colors text-left">Bulk Quote Calculator</button></li>
              <li><a href="#about" className="hover:text-[#D4AF37] transition-colors">About Us</a></li>
              <li><a href="#contact" className="hover:text-[#D4AF37] transition-colors">Contact & Location</a></li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-3">
            <h4 className="font-bold text-base text-[#D4AF37]">Wholesale Inquiries</h4>
            <p className="text-sm text-gray-300">
              For bulk orders, institutional supply, or retail partnerships, contact us directly on WhatsApp.
            </p>
            <div className="pt-2">
              <a
                href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#556B2F] text-white text-sm font-bold shadow-md hover:bg-green-600 transition-colors"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp: 6305486808
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-400">
          <p>© Taher Ali Enterprises. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">Designed for Wholesale Excellence in Hyderabad, Telangana</p>
        </div>
      </footer>

      {/* AMAZON-STYLE FULL SCREEN PRODUCT PAGE MODAL */}
      {selectedProduct && (
        <ProductDetailPage 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
          onAddToCart={addToCart}
          onBuyNow={(prod, qty) => {
            addToCart(prod, qty);
            setSelectedProduct(null);
            setCheckoutOpen(true);
          }}
          onSelectRelated={(p) => setSelectedProduct(p)}
        />
      )}

      {/* SHOPPING CART SLIDER / MODAL */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden" data-testid="cart-modal">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={() => setCartOpen(false)} />
          
          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-white dark:bg-[#1a2316] text-[#2C3E1F] dark:text-[#FDFBF7] shadow-2xl flex flex-col">
              
              {/* Cart Header */}
              <div className="p-6 border-b border-[#556B2F]/20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ShoppingBag className="w-6 h-6 text-[#556B2F] dark:text-[#D4AF37]" />
                  <h3 className="font-bold text-lg font-serif">Wholesale Cart ({totalItemsCount} items)</h3>
                </div>
                <button onClick={() => setCartOpen(false)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Cart Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center py-20 space-y-4">
                    <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto" />
                    <p className="text-lg font-bold">Your cart is empty</p>
                    <p className="text-sm text-gray-500">Add products from our wholesale catalog to begin your order.</p>
                    <button
                      onClick={() => setCartOpen(false)}
                      className="px-6 py-3 rounded-xl bg-[#556B2F] text-white font-semibold text-sm shadow-md"
                    >
                      Browse Products
                    </button>
                  </div>
                ) : (
                  cart.map(item => (
                    <div key={item.id} className="glass-panel p-4 rounded-xl border border-[#556B2F]/20 flex items-center justify-between gap-4" data-testid={`cart-item-${item.id}`}>
                      <div className="flex-1">
                        <h4 className="font-bold text-sm">{item.name}</h4>
                        <p className="text-xs text-gray-500">{item.weight} | ₹{item.price} each</p>
                        <p className="text-sm font-extrabold text-[#556B2F] dark:text-[#D4AF37] mt-1">₹{item.price * item.quantity}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1.5 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-gray-300"
                          data-testid={`cart-decrease-${item.id}`}
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="font-bold text-sm w-6 text-center" data-testid={`cart-qty-${item.id}`}>{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1.5 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-gray-300"
                          data-testid={`cart-increase-${item.id}`}
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg"
                        data-testid={`cart-remove-${item.id}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Cart Footer & Totals */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-[#556B2F]/25 bg-[#F4EEDD]/50 dark:bg-[#1f2b1a]/50 space-y-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Total Items:</span>
                      <span className="font-bold" data-testid="cart-total-items">{totalItemsCount} Units</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Subtotal:</span>
                      <span className="font-bold" data-testid="cart-subtotal">₹{subtotalPrice}</span>
                    </div>
                    {applicableTier.discountPercent > 0 && (
                      <div className="flex justify-between text-[#556B2F] dark:text-[#D4AF37] font-semibold">
                        <span>Bulk Tier Discount ({applicableTier.discountPercent}%):</span>
                        <span data-testid="cart-discount">-₹{discountAmount}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-base font-extrabold pt-2 border-t border-gray-300 dark:border-gray-700">
                      <span>Grand Total:</span>
                      <span className="text-lg text-[#556B2F] dark:text-[#D4AF37]" data-testid="cart-grand-total">₹{grandTotal}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={clearCart}
                      className="py-3 rounded-xl border border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 font-semibold text-sm transition-all"
                      data-testid="clear-cart-btn"
                    >
                      Clear Cart
                    </button>
                    <button
                      onClick={() => { setCartOpen(false); setCheckoutOpen(true); }}
                      className="py-3 rounded-xl bg-[#556B2F] hover:bg-[#2C3E1F] text-white font-bold text-sm shadow-lg transition-all"
                      data-testid="proceed-checkout-btn"
                    >
                      Place Order
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* CHECKOUT & ORDER MODAL */}
      {checkoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto" data-testid="checkout-modal">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setCheckoutOpen(false)} />

          <div className="relative glass-panel bg-white dark:bg-[#1a2316] text-[#2C3E1F] dark:text-[#FDFBF7] rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#556B2F]/30 z-10 my-8">
            <div className="flex justify-between items-center mb-6 border-b border-[#556B2F]/20 pb-4">
              <div>
                <h3 className="text-2xl font-bold font-serif">Complete Wholesale Order</h3>
                <p className="text-xs text-gray-500">Order will be dispatched via WhatsApp to Taher Ali Enterprises (6305486808)</p>
              </div>
              <button onClick={() => setCheckoutOpen(false)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleCheckoutSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1">Customer Name / Store Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Hyderabad Retail Mart"
                    value={formData.customerName}
                    onChange={e => setFormData({ ...formData, customerName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-[#22301c] border border-gray-300 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#556B2F]"
                    data-testid="checkout-name-input"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Phone Number (WhatsApp) *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9876543210"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-[#22301c] border border-gray-300 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#556B2F]"
                    data-testid="checkout-phone-input"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Delivery Address *</label>
                <textarea
                  required
                  rows={2}
                  placeholder="Street address, shop number, area..."
                  value={formData.address}
                  onChange={e => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-[#22301c] border border-gray-300 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#556B2F]"
                  data-testid="checkout-address-input"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1">Landmark</label>
                  <input
                    type="text"
                    placeholder="e.g. Near Charminar"
                    value={formData.landmark}
                    onChange={e => setFormData({ ...formData, landmark: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-[#22301c] border border-gray-300 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#556B2F]"
                    data-testid="checkout-landmark-input"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">City</label>
                  <input
                    type="text"
                    value={formData.city}
                    disabled
                    className="w-full px-4 py-3 rounded-xl bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-sm cursor-not-allowed"
                    data-testid="checkout-city-input"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Pincode</label>
                  <input
                    type="text"
                    placeholder="500001"
                    value={formData.pincode}
                    onChange={e => setFormData({ ...formData, pincode: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-[#22301c] border border-gray-300 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#556B2F]"
                    data-testid="checkout-pincode-input"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Special Instructions / Packaging Notes</label>
                <input
                  type="text"
                  placeholder="e.g. Deliver before 12 PM"
                  value={formData.specialInstructions}
                  onChange={e => setFormData({ ...formData, specialInstructions: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-[#22301c] border border-gray-300 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#556B2F]"
                  data-testid="checkout-instructions-input"
                />
              </div>

              {/* Order Summary Box */}
              <div className="bg-[#F4EEDD] dark:bg-[#22301c] p-4 rounded-2xl space-y-2 text-sm border border-[#556B2F]/20">
                <div className="flex justify-between font-bold">
                  <span>Total Items:</span>
                  <span>{totalItemsCount} Units</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Grand Total:</span>
                  <span className="text-[#556B2F] dark:text-[#D4AF37] text-base">₹{grandTotal}</span>
                </div>
                <p className="text-xs text-gray-500 pt-1">
                  * Clicking Place Order will automatically open WhatsApp with the complete order formatted for Taher Ali Enterprises (6305486808).
                </p>
              </div>

              <div className="pt-4 flex gap-4">
                <button
                  type="button"
                  onClick={() => setCheckoutOpen(false)}
                  className="w-1/2 py-3 rounded-xl border border-gray-300 dark:border-gray-700 font-semibold text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold text-sm shadow-lg flex items-center justify-center gap-2 transition-all"
                  data-testid="whatsapp-place-order-btn"
                >
                  <MessageCircle className="w-5 h-5" /> Place Order via WhatsApp
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* BULK CALCULATOR MODAL */}
      {bulkCalculatorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto" data-testid="bulk-calc-modal">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setBulkCalculatorOpen(false)} />

          <div className="relative glass-panel bg-white dark:bg-[#1a2316] text-[#2C3E1F] dark:text-[#FDFBF7] rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-[#556B2F]/30 z-10 my-8">
            <div className="flex justify-between items-center mb-6 border-b border-[#556B2F]/20 pb-4">
              <div className="flex items-center gap-3">
                <Calculator className="w-6 h-6 text-[#556B2F] dark:text-[#D4AF37]" />
                <div>
                  <h3 className="text-2xl font-bold font-serif">Bulk Quote & Tiered Discount Calculator</h3>
                  <p className="text-xs text-gray-500">Calculate wholesale pricing for large quantities across Hyderabad</p>
                </div>
              </div>
              <button onClick={() => setBulkCalculatorOpen(false)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Adjust quantities for any product below to instantly calculate bulk pricing and tiered discounts.
              </p>

              <div className="space-y-3">
                {PRODUCTS.map(product => {
                  const qty = bulkCalcSelections[product.id] || 0;
                  return (
                    <div key={product.id} className="glass-panel p-4 rounded-xl border border-[#556B2F]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div>
                        <h4 className="font-bold text-sm">{product.name} ({product.weight})</h4>
                        <p className="text-xs text-gray-500">Unit Price: ₹{product.price}</p>
                      </div>

                      <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setBulkCalcSelections({
                              ...bulkCalcSelections,
                              [product.id]: Math.max(0, qty - 5)
                            })}
                            className="px-2.5 py-1 rounded-lg bg-gray-200 dark:bg-gray-800 text-xs font-bold"
                          >
                            -5
                          </button>
                          <input
                            type="number"
                            min="0"
                            value={qty}
                            onChange={(e) => setBulkCalcSelections({
                              ...bulkCalcSelections,
                              [product.id]: parseInt(e.target.value) || 0
                            })}
                            className="w-16 text-center py-1 rounded-lg bg-gray-50 dark:bg-[#22301c] border border-gray-300 dark:border-gray-700 text-sm font-bold"
                          />
                          <button
                            onClick={() => setBulkCalcSelections({
                              ...bulkCalcSelections,
                              [product.id]: qty + 5
                            })}
                            className="px-2.5 py-1 rounded-lg bg-gray-200 dark:bg-gray-800 text-xs font-bold"
                          >
                            +5
                          </button>
                        </div>
                        <span className="font-extrabold text-[#556B2F] dark:text-[#D4AF37] w-20 text-right">
                          ₹{qty * product.price}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Calculator Footer Summary */}
            {(() => {
              const totalCalcUnits = Object.values(bulkCalcSelections).reduce((a, b) => a + b, 0);
              const totalCalcSubtotal = Object.entries(bulkCalcSelections).reduce((sum, [id, qty]) => {
                const p = PRODUCTS.find(prod => prod.id === id);
                return sum + (p ? p.price * qty : 0);
              }, 0);
              const calcTier = BULK_TIERS.slice().reverse().find(t => totalCalcUnits >= t.minUnits) || BULK_TIERS[0];
              const calcDiscount = Math.round((totalCalcSubtotal * calcTier.discountPercent) / 100);
              const calcGrandTotal = totalCalcSubtotal - calcDiscount;

              return (
                <div className="mt-6 pt-6 border-t border-[#556B2F]/20 space-y-4">
                  <div className="flex flex-wrap justify-between items-center bg-[#F4EEDD] dark:bg-[#22301c] p-4 rounded-2xl text-sm">
                    <div>
                      <p className="text-gray-500 text-xs">Total Selected Units</p>
                      <p className="font-extrabold text-base">{totalCalcUnits} Units</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs">Applied Discount Tier</p>
                      <p className="font-extrabold text-[#556B2F] dark:text-[#D4AF37] text-base">{calcTier.label}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs">Estimated Bulk Total</p>
                      <p className="font-extrabold text-lg text-[#556B2F] dark:text-[#D4AF37]">₹{calcGrandTotal}</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => {
                        // Add all calculated items to cart
                        Object.entries(bulkCalcSelections).forEach(([id, qty]) => {
                          if (qty > 0) {
                            const p = PRODUCTS.find(prod => prod.id === id);
                            if (p) addToCart(p, qty);
                          }
                        });
                        setBulkCalculatorOpen(false);
                        setCartOpen(true);
                      }}
                      disabled={totalCalcUnits === 0}
                      className="w-full py-3.5 rounded-xl bg-[#556B2F] hover:bg-[#2C3E1F] disabled:opacity-50 text-white font-bold text-sm shadow-lg transition-all flex items-center justify-center gap-2"
                      data-testid="add-bulk-to-cart-btn"
                    >
                      <ShoppingBag className="w-5 h-5" /> Add Bulk Selection to Cart
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

    </div>
  );
}

// Product Card Sub-component
function ProductCard({ product, onAddToCart, onSelect }) {
  const [qty, setQty] = useState(1);

  return (
    <div 
      className="glass-panel p-5 rounded-2xl shadow-md hover:shadow-2xl transition-all border border-[#556B2F]/20 flex flex-col justify-between group cursor-pointer hover:-translate-y-1" 
      onClick={onSelect}
      data-testid={`product-card-${product.id}`}
    >
      <div>
        {/* Image Placeholder with Zoom on Hover */}
        <div className="relative w-full h-48 rounded-xl bg-gradient-to-br from-[#F4EEDD] to-[#e8dfc8] dark:from-[#22301c] dark:to-[#172213] flex flex-col items-center justify-center mb-4 overflow-hidden border border-[#556B2F]/20">
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#556B2F] text-white text-xs font-bold shadow z-10">
            {product.category}
          </span>
          <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#D4AF37] text-[#2C3E1F] text-xs font-bold shadow z-10">
            {product.badge}
          </span>
          
          <div className="text-4xl mb-2 group-hover:scale-125 transition-transform duration-300">
            {product.imageType === 'pickle' ? '🥭' : product.imageType === 'biscuit' ? '🍪' : '🧈'}
          </div>
          <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest">[ Image Placeholder ]</span>
          
          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="px-3.5 py-1.5 rounded-lg bg-[#556B2F] text-white text-xs font-bold shadow flex items-center gap-1.5">
              <ZoomIn className="w-3.5 h-3.5" /> View Details
            </span>
          </div>
        </div>

        <h3 className="font-bold text-lg font-serif text-[#2C3E1F] dark:text-[#FDFBF7] mb-1 group-hover:text-[#556B2F] transition-colors">
          {product.name}
        </h3>
        <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2 mb-3">
          {product.description}
        </p>
      </div>

      <div className="space-y-3 pt-3 border-t border-[#556B2F]/15" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center">
          <span className="text-xs font-semibold text-gray-500">Weight: <strong className="text-[#2C3E1F] dark:text-[#FDFBF7]">{product.weight}</strong></span>
          <span className="text-lg font-extrabold text-[#556B2F] dark:text-[#D4AF37]" data-testid={`product-price-${product.id}`}>₹{product.price}</span>
        </div>

        {/* Quantity Selector */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1 bg-gray-100 dark:bg-[#22301c] rounded-xl p-1">
            <button
              onClick={() => setQty(Math.max(1, qty - 1))}
              className="p-1.5 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-colors"
              data-testid={`qty-minus-${product.id}`}
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-8 text-center font-bold text-sm" data-testid={`qty-val-${product.id}`}>{qty}</span>
            <button
              onClick={() => setQty(qty + 1)}
              className="p-1.5 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-colors"
              data-testid={`qty-plus-${product.id}`}
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={() => {
              onAddToCart(product, qty);
              setQty(1);
            }}
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

// Amazon-Style Product Page Modal Component with Sticky Purchase Section
function ProductDetailPage({ product, onClose, onAddToCart, onBuyNow, onSelectRelated }) {
  const [qty, setQty] = useState(1);
  const [activeImageZoom, setActiveImageZoom] = useState(false);
  const relatedProducts = PRODUCTS.filter(p => p.id !== product.id && p.category === product.category).slice(0, 4);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-md flex justify-center animate-fadeIn" data-testid="product-detail-modal">
      <div className="relative w-full max-w-5xl bg-[#FDFBF7] dark:bg-[#1a2316] text-[#2C3E1F] dark:text-[#FDFBF7] my-8 rounded-3xl shadow-2xl border border-[#556B2F]/30 overflow-hidden flex flex-col">
        
        {/* Top Header Bar */}
        <div className="p-4 sm:px-8 border-b border-[#556B2F]/20 flex items-center justify-between bg-white/80 dark:bg-[#22301c]/80 sticky top-0 z-20 backdrop-blur-md">
          <button 
            onClick={onClose} 
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#F4EEDD] dark:bg-[#172213] font-semibold text-sm hover:bg-[#556B2F] hover:text-white transition-colors"
            data-testid="back-to-catalog-btn"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Catalog
          </button>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#556B2F]/10 text-[#556B2F] dark:text-[#D4AF37]">
              {product.category}
            </span>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Main Content Layout (Amazon Style: Left Image, Center Info, Right Buy Box) */}
        <div className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 pb-32">
          
          {/* Left: Product Image with Zoom */}
          <div className="lg:col-span-5 space-y-4">
            <div 
              className={`relative w-full h-[320px] sm:h-[400px] rounded-2xl bg-gradient-to-br from-[#F4EEDD] to-[#e8dfc8] dark:from-[#22301c] dark:to-[#172213] flex flex-col items-center justify-center border border-[#556B2F]/30 shadow-lg overflow-hidden cursor-zoom-in group`}
              onClick={() => setActiveImageZoom(!activeImageZoom)}
            >
              <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#D4AF37] text-[#2C3E1F] text-xs font-bold shadow">
                {product.badge}
              </span>
              <div className={`text-7xl sm:text-8xl mb-3 transition-transform duration-500 ${activeImageZoom ? 'scale-150' : 'group-hover:scale-110'}`}>
                {product.imageType === 'pickle' ? '🥭' : product.imageType === 'biscuit' ? '🍪' : '🧈'}
              </div>
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest">[ Image Placeholder ]</span>
              <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-lg bg-black/40 text-white text-xs font-medium flex items-center gap-1.5">
                <ZoomIn className="w-3.5 h-3.5" /> {activeImageZoom ? 'Click to zoom out' : 'Click to zoom image'}
              </div>
            </div>
          </div>

          {/* Center & Right: Product Details & Buy Box */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <h2 className="text-2xl sm:text-4xl font-extrabold font-serif text-[#2C3E1F] dark:text-[#FDFBF7] mb-2">
                {product.name}
              </h2>
              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                <span>Weight: <strong className="text-[#2C3E1F] dark:text-[#FDFBF7]">{product.weight}</strong></span>
                <span>•</span>
                <span className="text-green-600 dark:text-green-400 font-semibold">{product.availability}</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#556B2F]/10 dark:bg-[#D4AF37]/10 border border-[#556B2F]/20 flex items-baseline gap-3">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#556B2F] dark:text-[#D4AF37]">₹{product.price}</span>
              <span className="text-xs text-gray-500 font-medium">Inclusive of all wholesale taxes (Hyderabad Dispatch)</span>
            </div>

            <div>
              <h4 className="font-bold text-sm text-[#2C3E1F] dark:text-[#D4AF37] mb-1">Product Description</h4>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Highlights */}
            {product.highlights && (
              <div className="space-y-2">
                <h4 className="font-bold text-sm text-[#2C3E1F] dark:text-[#D4AF37]">Product Highlights</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {product.highlights.map((h, i) => (
                    <li key={i} className="flex items-center gap-2 bg-[#F4EEDD] dark:bg-[#22301c] px-3 py-2 rounded-xl">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#556B2F] dark:text-[#D4AF37]" /> {h}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Ingredients & Storage (Editable/Customizable format) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2 border-t border-[#556B2F]/20">
              <div className="glass-panel p-3.5 rounded-xl border border-[#556B2F]/20 space-y-1">
                <p className="font-bold text-[#556B2F] dark:text-[#D4AF37]">Ingredients</p>
                <p className="text-gray-600 dark:text-gray-300">{product.ingredients}</p>
              </div>
              <div className="glass-panel p-3.5 rounded-xl border border-[#556B2F]/20 space-y-1">
                <p className="font-bold text-[#556B2F] dark:text-[#D4AF37]">Storage Instructions</p>
                <p className="text-gray-600 dark:text-gray-300">{product.storage}</p>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="flex items-center gap-3 text-xs text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-[#22301c] p-3 rounded-xl">
              <Truck className="w-5 h-5 text-[#556B2F] dark:text-[#D4AF37] shrink-0" />
              <span>Fast wholesale delivery across all Hyderabad and Telangana districts. Same-day dispatch for orders confirmed before 1 PM.</span>
            </div>

          </div>

        </div>

        {/* Related Products Carousel */}
        {relatedProducts.length > 0 && (
          <div className="p-6 sm:p-10 bg-[#F4EEDD]/50 dark:bg-[#172213]/50 border-t border-[#556B2F]/20 mb-20">
            <h3 className="font-serif font-bold text-xl mb-4 text-[#2C3E1F] dark:text-[#FDFBF7]">Related Wholesale Products</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {relatedProducts.map(rel => (
                <div 
                  key={rel.id} 
                  onClick={() => onSelectRelated(rel)}
                  className="glass-panel p-3 rounded-xl cursor-pointer hover:border-[#D4AF37] transition-all flex flex-col justify-between"
                >
                  <div className="text-3xl text-center py-4">
                    {rel.imageType === 'pickle' ? '🥭' : rel.imageType === 'biscuit' ? '🍪' : '🧈'}
                  </div>
                  <div>
                    <h4 className="font-bold text-xs truncate">{rel.name}</h4>
                    <p className="text-xs text-gray-500">{rel.weight}</p>
                    <p className="text-xs font-extrabold text-[#556B2F] dark:text-[#D4AF37]">₹{rel.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STICKY PURCHASE SECTION AT THE BOTTOM */}
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#1a2316]/95 backdrop-blur-md border-t border-[#556B2F]/30 p-4 sm:px-12 shadow-2xl flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="hidden sm:block">
              <h4 className="font-bold text-sm">{product.name}</h4>
              <p className="text-xs text-gray-500">{product.weight} • ₹{product.price} each</p>
            </div>
            
            {/* Quantity Selector */}
            <div className="flex items-center gap-1.5 bg-gray-100 dark:bg-[#22301c] rounded-xl p-1.5 border border-[#556B2F]/30">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="p-1 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-colors"
                data-testid="sticky-qty-minus"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center font-bold text-sm" data-testid="sticky-qty-val">{qty}</span>
              <button
                onClick={() => setQty(qty + 1)}
                className="p-1 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-colors"
                data-testid="sticky-qty-plus"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <span className="text-xs text-gray-500 block">Total Price</span>
              <span className="text-xl sm:text-2xl font-extrabold text-[#556B2F] dark:text-[#D4AF37]" data-testid="sticky-total-price">
                ₹{product.price * qty}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onAddToCart(product, qty)}
                className="px-5 py-3 rounded-xl bg-[#556B2F] hover:bg-[#2C3E1F] text-white font-bold text-sm shadow-lg flex items-center gap-2 transition-all transform active:scale-95"
                data-testid="sticky-add-to-cart-btn"
              >
                <ShoppingBag className="w-4 h-4" /> Add to Cart
              </button>
              <button
                onClick={() => onBuyNow(product, qty)}
                className="px-5 py-3 rounded-xl bg-[#D4AF37] hover:bg-[#c59d2e] text-[#2C3E1F] font-bold text-sm shadow-lg flex items-center gap-2 transition-all transform active:scale-95"
                data-testid="sticky-buy-now-btn"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
