import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ShoppingBag, Sun, Moon, Menu, X, Calculator, Sparkles } from "lucide-react";
import { useShop } from "../context/ShopContext";

export default function Navbar() {
  const {
    darkMode, setDarkMode,
    totalItemsCount, setCartOpen,
    setBulkCalculatorOpen,
    mobileMenuOpen, setMobileMenuOpen,
  } = useShop();
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/products", label: "Products" },
    { to: "/wholesale", label: "Wholesale" },
    { to: "/#about", label: "About" },
    { to: "/#contact", label: "Contact" },
  ];

  const isActive = (to) => {
    if (to === "/") return location.pathname === "/";
    if (to === "/products") return location.pathname === "/products" || location.pathname.startsWith("/products/");
    if (to === "/wholesale") return location.pathname.startsWith("/wholesale");
    return false;
  };

  const handleNav = (e, to) => {
    if (to.startsWith("/#")) {
      e.preventDefault();
      const hash = to.slice(2);
      if (location.pathname !== "/") {
        navigate("/", { state: { scrollTo: hash } });
      } else {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* TOP NOTIFICATION BAR */}
      <div className="bg-[#556B2F] text-white text-xs sm:text-sm py-2 px-4 text-center font-medium flex items-center justify-center gap-3" data-testid="top-notice-bar">
        <Sparkles className="w-4 h-4 text-[#D4AF37] animate-pulse" />
        <span className="hidden sm:inline">Direct Wholesale Supplier in Hyderabad | Bulk Orders & Custom Inquiries Welcome</span>
        <span className="sm:hidden">Direct Wholesale • Hyderabad</span>
      </div>

      {/* STICKY NAVBAR */}
      <nav className="sticky top-0 z-40 glass-panel shadow-sm border-b border-[#556B2F]/20 transition-colors" data-testid="main-navbar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group" data-testid="logo-link">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#556B2F] to-[#2C3E1F] flex items-center justify-center text-white font-bold text-xl shadow-md group-hover:scale-105 transition-transform">
              TA
            </div>
            <div className="hidden xs:block sm:block">
              <h1 className="font-bold text-base sm:text-xl tracking-tight text-[#2C3E1F] dark:text-[#F5F1E4] font-serif">
                Taher Ali Enterprises
              </h1>
              <p className="text-[10px] sm:text-xs text-[#556B2F] dark:text-[#D4AF37] font-medium tracking-wide">
                Premium Wholesale Food Products
              </p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-7 font-medium text-sm">
            {navLinks.map(link => (
              link.to.startsWith("/#") ? (
                <a
                  key={link.to}
                  href={link.to.replace("/", "")}
                  onClick={(e) => handleNav(e, link.to)}
                  className="hover:text-[#556B2F] dark:hover:text-[#D4AF37] transition-colors text-[#2C3E1F] dark:text-[#E8E2D0]"
                  data-testid={`nav-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`transition-colors ${isActive(link.to) ? 'text-[#556B2F] dark:text-[#D4AF37] font-semibold' : 'text-[#2C3E1F] dark:text-[#E8E2D0] hover:text-[#556B2F] dark:hover:text-[#D4AF37]'}`}
                  data-testid={`nav-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </Link>
              )
            ))}
            <button
              onClick={() => setBulkCalculatorOpen(true)}
              className="flex items-center gap-1.5 text-[#8B5A2B] dark:text-[#D4AF37] font-semibold hover:opacity-80 transition-opacity"
              data-testid="nav-bulk-calculator"
            >
              <Calculator className="w-4 h-4" /> Bulk Calculator
            </button>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2.5 rounded-full bg-[#F4EEDD] dark:bg-[#2a3822] text-[#2C3E1F] dark:text-[#D4AF37] hover:scale-110 transition-transform shadow-sm"
              title="Toggle Theme"
              data-testid="theme-toggle-btn"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setCartOpen(true)}
              className="relative px-3 sm:px-4 py-2.5 rounded-xl bg-[#556B2F] hover:bg-[#2C3E1F] text-white font-medium flex items-center gap-2 shadow-md transition-all transform active:scale-95"
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

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl bg-[#F4EEDD] dark:bg-[#2a3822] text-[#2C3E1F] dark:text-[#F5F1E4]"
              data-testid="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden glass-panel border-t border-[#556B2F]/20 px-6 py-4 flex flex-col gap-4 animate-fadeIn" data-testid="mobile-menu">
            {navLinks.map(link => (
              link.to.startsWith("/#") ? (
                <a
                  key={link.to}
                  href="#"
                  onClick={(e) => handleNav(e, link.to)}
                  className="font-medium py-2 border-b border-gray-200 dark:border-[#3a4a30] text-[#2C3E1F] dark:text-[#F5F1E4]"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`font-medium py-2 border-b border-gray-200 dark:border-[#3a4a30] ${isActive(link.to) ? 'text-[#556B2F] dark:text-[#D4AF37]' : 'text-[#2C3E1F] dark:text-[#F5F1E4]'}`}
                >
                  {link.label}
                </Link>
              )
            ))}
            <button
              onClick={() => { setBulkCalculatorOpen(true); setMobileMenuOpen(false); }}
              className="text-left font-medium py-2 text-[#8B5A2B] dark:text-[#D4AF37] flex items-center gap-2"
            >
              <Calculator className="w-4 h-4" /> Bulk Quote Calculator
            </button>
          </div>
        )}
      </nav>
    </>
  );
}
