import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { ShopProvider } from "./context/ShopContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import CheckoutModal from "./components/CheckoutModal";
import FloatingCartButton from "./components/FloatingCartButton";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import WholesaleProductsPage from "./pages/WholesaleProductsPage";

export default function App() {
  return (
    <BrowserRouter>
      <ShopProvider>
        <div
          className="min-h-screen flex flex-col transition-colors duration-300 bg-[#FDFBF7] dark:bg-[#1e2a1a] text-[#2C3E1F] dark:text-[#F5F1E4]"
          data-testid="taher-ali-app"
        >
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:id" element={<ProductDetailPage />} />
              <Route path="/wholesale" element={<WholesaleProductsPage />} />
              <Route path="*" element={<HomePage />} />
            </Routes>
          </main>
          <Footer />

          <CartDrawer />
          <CheckoutModal />
          <FloatingCartButton />
          <Toaster richColors position="top-right" closeButton />
        </div>
      </ShopProvider>
    </BrowserRouter>
  );
}
