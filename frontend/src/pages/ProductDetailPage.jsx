import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ShoppingBag, Plus, Minus, ZoomIn, CheckCircle2, ChevronRight, ArrowLeft,
  Share2, MessageCircle, Clock, Package, Info
} from "lucide-react";
import { PRODUCTS } from "../mock";
import { useShop } from "../context/ShopContext";
import { toast } from "sonner";
import { flyToCart } from "../utils/flyToCart";

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, setCheckoutOpen, trackRecentlyViewed, recentlyViewedProducts, BUSINESS_INFO } = useShop();
  const [qty, setQty] = useState(1);
  const [activeImageZoom, setActiveImageZoom] = useState(false);

  const product = PRODUCTS.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (product) trackRecentlyViewed(product.id);
  }, [id, product, trackRecentlyViewed]);

  if (!product) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-24 text-center animate-fadeIn">
        <Package className="w-16 h-16 mx-auto text-gray-700 dark:text-[#a8b39c] mb-4" />
        <h1 className="text-2xl font-bold font-serif mb-2">Product not found</h1>
        <p className="text-gray-800 dark:text-[#dcd6bf] mb-6">The product you're looking for is no longer available.</p>
        <Link to="/products" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#556B2F] text-white font-semibold">
          <ArrowLeft className="w-4 h-4" /> Back to Products
        </Link>
      </div>
    );
  }

  const emoji = product.imageType === 'pickle' ? '🥭' : product.imageType === 'biscuit' ? '🍪' : '🧈';
  const relatedProducts = PRODUCTS.filter(p => p.id !== product.id && p.category === product.category).slice(0, 4);
  const recentlyViewedOthers = recentlyViewedProducts.filter(p => p.id !== product.id).slice(0, 4);

  const handleBuyNow = () => {
    addToCart(product, qty);
    setCheckoutOpen(true);
  };

  const handleShare = async () => {
    const shareData = {
      title: `${product.name} — Taher Ali Enterprises`,
      text: `Check out ${product.name} (${product.weight}) at ₹${product.price} on Taher Ali Enterprises Wholesale Portal.`,
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Product link copied to clipboard");
      }
    } catch {
      // user cancelled
    }
  };

  const whatsappEnquiryUrl = `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(
    `Hello Taher Ali Enterprises, I would like to enquire about *${product.name}* (${product.weight}) priced at ₹${product.price}. Please share bulk pricing and availability.`
  )}`;

  return (
    <div className="pb-32 animate-fadeIn" data-testid="product-detail-page">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 py-8 space-y-10">

        {/* BREADCRUMB */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm text-gray-800 dark:text-[#dcd6bf] flex-wrap" data-testid="detail-breadcrumb">
          <Link to="/" className="hover:text-[#556B2F] dark:hover:text-[#D4AF37] transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/products" className="hover:text-[#556B2F] dark:hover:text-[#D4AF37] transition-colors">Products</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-[#2C3E1F] dark:text-[#F5F1E4] font-semibold truncate">{product.name}</span>
        </nav>

        {/* BACK LINK */}
        <button
          onClick={() => navigate("/products")}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#F4EEDD] dark:bg-[#243020] font-semibold text-sm hover:bg-[#556B2F] hover:text-white dark:hover:bg-[#556B2F] transition-colors"
          data-testid="back-to-products-btn"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Products
        </button>

        {/* MAIN GRID - IMAGE LEFT (LARGER), CONTENT RIGHT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

          {/* LEFT: IMAGE */}
          <div className="lg:col-span-7 space-y-4 lg:sticky lg:top-24">
            <div
              className="relative w-full aspect-square lg:h-[600px] rounded-3xl bg-gradient-to-br from-[#F4EEDD] to-[#e8dfc8] dark:from-[#243020] dark:to-[#1a2416] flex flex-col items-center justify-center border border-[#556B2F]/30 shadow-xl overflow-hidden cursor-zoom-in group"
              onClick={() => setActiveImageZoom(!activeImageZoom)}
              data-testid="product-image-frame"
            >
              <span className="absolute top-5 left-5 px-3.5 py-1.5 rounded-full bg-[#556B2F] text-white text-xs font-bold shadow">
                {product.category}
              </span>
              <span className="absolute top-5 right-5 px-3.5 py-1.5 rounded-full bg-[#D4AF37] text-[#2C3E1F] text-xs font-bold shadow">
                {product.badge}
              </span>

              <div className={`w-full h-full transition-transform duration-500 ${activeImageZoom ? 'scale-150' : 'group-hover:scale-105'}`}>
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    data-testid="product-main-image"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center">
                    <div className="text-[8rem] sm:text-[10rem]">
                      {emoji}
                    </div>
                    <span className="text-xs font-semibold text-gray-800 dark:text-[#dcd6bf] uppercase tracking-widest mt-4">[ Image Placeholder ]</span>
                  </div>
                )}
              </div>

              <div className="absolute bottom-5 left-5 px-4 py-2 rounded-xl bg-black/60 text-white text-xs font-medium flex items-center gap-2 backdrop-blur-sm">
                <ZoomIn className="w-4 h-4" /> {activeImageZoom ? 'Click to zoom out' : 'Click to zoom image'}
              </div>
            </div>

            {/* PRODUCT IMAGE NOTICE (below image, above description) */}
            <div
              className="flex items-start gap-3 p-4 sm:p-5 rounded-2xl bg-[#F4EEDD] dark:bg-[#243020] border border-[#556B2F]/30 dark:border-[#D4AF37]/25 shadow-sm"
              role="note"
              data-testid="product-image-notice"
            >
              <div className="shrink-0 w-9 h-9 rounded-full bg-[#556B2F]/15 dark:bg-[#D4AF37]/20 text-[#556B2F] dark:text-[#D4AF37] flex items-center justify-center">
                <Info className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-sm text-[#2C3E1F] dark:text-[#F5F1E4] font-serif">Product Image Notice</h4>
                <p className="text-xs sm:text-[13px] text-gray-800 dark:text-[#efe9d4] leading-relaxed">
                  Images are provided for illustration and marketing purposes only. The actual product may vary slightly in appearance, packaging, color, shape, or decoration depending on the manufacturing batch. Product quality, weight, and specifications remain as described.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT: PRODUCT INFO */}
          <div className="lg:col-span-5 space-y-7">
            <div className="space-y-3">
              <span className="text-xs font-bold text-[#556B2F] dark:text-[#D4AF37] uppercase tracking-wider">
                Taher Ali Enterprises • Hyderabad
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold font-serif text-[#2C3E1F] dark:text-[#F5F1E4] leading-tight">
                {product.name}
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-700 dark:text-[#e8e2ce]">
                <span>Weight: <strong className="text-[#2C3E1F] dark:text-[#F5F1E4]">{product.weight}</strong></span>
                <span>•</span>
                <span className="text-green-700 dark:text-green-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> {product.availability}
                </span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#556B2F]/10 dark:bg-[#D4AF37]/10 border border-[#556B2F]/20 flex flex-wrap items-baseline gap-3">
              <span className="text-4xl sm:text-5xl font-extrabold text-[#556B2F] dark:text-[#D4AF37]">₹{product.price}</span>
              <span className="text-xs text-gray-800 dark:text-[#dcd6bf] font-medium">Wholesale Price (Inclusive of all taxes)</span>
            </div>

            {/* SHARE & ENQUIRE ROW */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#556B2F]/30 dark:border-[#3a4a30] text-sm font-semibold text-[#2C3E1F] dark:text-[#F5F1E4] hover:bg-[#556B2F]/10 transition-colors"
                data-testid="share-product-btn"
              >
                <Share2 className="w-4 h-4" /> Share Product
              </button>
              <a
                href={whatsappEnquiryUrl}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white text-sm font-semibold shadow-md transition-colors"
                data-testid="whatsapp-enquiry-btn"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp Enquiry
              </a>
            </div>

            {/* PRODUCT DESCRIPTION */}
            <div className="glass-panel p-6 rounded-2xl border border-[#556B2F]/20 space-y-2">
              <h3 className="font-bold text-base text-[#556B2F] dark:text-[#D4AF37]">Product Description</h3>
              <p className="text-sm sm:text-base text-gray-800 dark:text-[#efe9d4] leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* KEY HIGHLIGHTS */}
            {product.highlights && (
              <div className="glass-panel p-6 rounded-2xl border border-[#556B2F]/20 space-y-4">
                <h3 className="font-bold text-base text-[#556B2F] dark:text-[#D4AF37]">About this Product / Key Features</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  {product.highlights.map((h, i) => (
                    <li key={i} className="flex items-center gap-2.5 bg-[#F4EEDD] dark:bg-[#243020] px-4 py-3 rounded-xl font-medium text-[#2C3E1F] dark:text-[#F5F1E4]">
                      <CheckCircle2 className="w-4 h-4 text-[#556B2F] dark:text-[#D4AF37] shrink-0" /> {h}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* INGREDIENTS */}
            <div className="glass-panel p-6 rounded-2xl border border-[#556B2F]/20 space-y-2">
              <h3 className="font-bold text-base text-[#556B2F] dark:text-[#D4AF37]">Ingredients</h3>
              <p className="text-sm text-gray-800 dark:text-[#efe9d4] leading-relaxed">{product.ingredients}</p>
            </div>

            {/* STORAGE & SHELF LIFE */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="glass-panel p-5 rounded-2xl border border-[#556B2F]/20 space-y-2">
                <h3 className="font-bold text-sm text-[#556B2F] dark:text-[#D4AF37]">Storage Instructions</h3>
                <p className="text-xs sm:text-sm text-gray-800 dark:text-[#efe9d4] leading-relaxed">{product.storage}</p>
              </div>
              <div className="glass-panel p-5 rounded-2xl border border-[#556B2F]/20 space-y-2">
                <h3 className="font-bold text-sm text-[#556B2F] dark:text-[#D4AF37]">Shelf Life</h3>
                <p className="text-xs sm:text-sm text-gray-800 dark:text-[#efe9d4] leading-relaxed">{product.shelfLife}</p>
              </div>
            </div>

            {/* BEST SERVED WITH */}
            <div className="glass-panel p-6 rounded-2xl border border-[#556B2F]/20 space-y-2">
              <h3 className="font-bold text-base text-[#556B2F] dark:text-[#D4AF37]">Best Served With</h3>
              <p className="text-sm text-gray-800 dark:text-[#efe9d4] leading-relaxed">{product.bestServedWith}</p>
            </div>

            {/* DELIVERY & WHOLESALE */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="glass-panel p-5 rounded-2xl border border-[#556B2F]/20 space-y-2">
                <h3 className="font-bold text-sm text-[#556B2F] dark:text-[#D4AF37]">Delivery Information</h3>
                <p className="text-xs sm:text-sm text-gray-800 dark:text-[#efe9d4] leading-relaxed">
                  Fast delivery available throughout Hyderabad. Same-day dispatch for orders confirmed before 1 PM.
                </p>
              </div>
              <div className="glass-panel p-5 rounded-2xl border border-[#556B2F]/20 space-y-2">
                <h3 className="font-bold text-sm text-[#556B2F] dark:text-[#D4AF37]">Wholesale Orders</h3>
                <p className="text-xs sm:text-sm text-gray-800 dark:text-[#efe9d4] leading-relaxed">
                  Bulk orders welcome. Contact us for wholesale pricing and customized quantities.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RECENTLY VIEWED */}
        {recentlyViewedOthers.length > 0 && (
          <div className="pt-8 border-t border-[#556B2F]/20 space-y-6">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-[#556B2F] dark:text-[#D4AF37]" />
              <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#2C3E1F] dark:text-[#F5F1E4]">Recently Viewed</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {recentlyViewedOthers.map(rel => (
                <MiniCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}

        {/* RELATED PRODUCTS */}
        {relatedProducts.length > 0 && (
          <div className="pt-8 border-t border-[#556B2F]/20 space-y-6">
            <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#2C3E1F] dark:text-[#F5F1E4]">Related Products</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map(rel => (
                <MiniCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* SLIM STICKY BOTTOM PURCHASE BAR */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 dark:bg-[#1e2a1a]/95 backdrop-blur-md border-t border-[#556B2F]/30 py-2.5 px-4 sm:px-8 shadow-2xl" data-testid="sticky-purchase-bar">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 flex-wrap sm:flex-nowrap">
          <div className="hidden sm:flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-lg bg-[#F4EEDD] dark:bg-[#243020] flex items-center justify-center text-xl shrink-0">
              {emoji}
            </div>
            <div className="min-w-0">
              <h4 className="font-bold text-sm truncate">{product.name}</h4>
              <p className="text-[11px] text-gray-800 dark:text-[#dcd6bf]">{product.weight} • ₹{product.price} each</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 flex-1 sm:flex-initial justify-between sm:justify-end">
            <div className="flex items-center gap-1 bg-gray-100 dark:bg-[#243020] rounded-lg p-1 border border-[#556B2F]/25">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-1 rounded hover:bg-white dark:hover:bg-[#2a3822] transition-colors" data-testid="sticky-qty-minus">
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-7 text-center font-bold text-sm" data-testid="sticky-qty-val">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="p-1 rounded hover:bg-white dark:hover:bg-[#2a3822] transition-colors" data-testid="sticky-qty-plus">
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="text-right shrink-0">
              <span className="text-[10px] text-gray-800 dark:text-[#dcd6bf] block leading-tight">Total</span>
              <span className="text-base sm:text-lg font-extrabold text-[#556B2F] dark:text-[#D4AF37] leading-tight" data-testid="sticky-total-price">
                ₹{product.price * qty}
              </span>
            </div>

            <button
              onClick={(e) => { flyToCart(e.currentTarget); addToCart(product, qty); }}
              className="px-3 sm:px-4 py-2 rounded-lg bg-[#556B2F] hover:bg-[#2C3E1F] text-white font-bold text-xs sm:text-sm shadow-md flex items-center gap-1.5 transition-all transform active:scale-95"
              data-testid="sticky-add-to-cart-btn"
            >
              <ShoppingBag className="w-4 h-4" /> <span className="hidden sm:inline">Add to Cart</span><span className="sm:hidden">Add</span>
            </button>
            <button
              onClick={handleBuyNow}
              className="px-3 sm:px-4 py-2 rounded-lg bg-[#D4AF37] hover:bg-[#c59d2e] text-[#2C3E1F] font-bold text-xs sm:text-sm shadow-md transition-all transform active:scale-95"
              data-testid="sticky-buy-now-btn"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function MiniCard({ product }) {
  const emoji = product.imageType === 'pickle' ? '🥭' : product.imageType === 'biscuit' ? '🍪' : '🧈';
  return (
    <Link
      to={`/products/${product.id}`}
      className="glass-panel p-4 rounded-2xl cursor-pointer hover:border-[#D4AF37] transition-all flex flex-col justify-between group shadow-md border border-[#556B2F]/20"
      data-testid={`related-product-${product.id}`}
    >
      <div className="relative w-full h-32 sm:h-40 rounded-xl bg-gradient-to-br from-[#F4EEDD] to-[#e8dfc8] dark:from-[#243020] dark:to-[#1a2416] flex items-center justify-center mb-3 overflow-hidden">
        {product.image ? (
          <img src={product.image} alt={product.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
        ) : (
          <span className="text-5xl group-hover:scale-125 transition-transform">{emoji}</span>
        )}
      </div>
      <div>
        <h4 className="font-bold text-sm mb-1 line-clamp-1 text-[#2C3E1F] dark:text-[#F5F1E4]">{product.name}</h4>
        <p className="text-xs text-gray-800 dark:text-[#dcd6bf] mb-2">{product.weight}</p>
        <p className="text-sm font-extrabold text-[#556B2F] dark:text-[#D4AF37]">₹{product.price}</p>
      </div>
    </Link>
  );
}
