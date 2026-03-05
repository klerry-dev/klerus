import { Plus, ShoppingBag, Loader2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import type { Database } from "../lib/supabase";

type Product = Database["public"]["Tables"]["shop_products"]["Row"];

interface ShopProps {
  onAddToCart: (product: Product) => void;
}

export function Shop({ onAddToCart }: ShopProps) {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // Fetch products from API
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch("/api/shop-products");
        const data = await response.json();
        setProducts(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  const nextProduct = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const prevProduct = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientY);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientY;
    const diff = touchStart - touchEnd;

    if (Math.abs(diff) > 50) {
      // Minimum swipe distance
      if (diff > 0) {
        // Swiped down - next product
        nextProduct();
      } else {
        // Swiped up - previous product
        prevProduct();
      }
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY > 0) {
      // Scrolled down - next product
      nextProduct();
    } else {
      // Scrolled up - previous product
      prevProduct();
    }
  };

  const currentProduct = products[currentIndex];

  const handleUseProduct = () => {
    if (currentProduct.price === 0) {
      navigate("/viewer");
    } else {
      onAddToCart(currentProduct);
    }
  };

  return (
    <div className="fixed inset-0 pt-32 pb-32 overflow-hidden bg-brand-black">
      <div className="flex flex-col items-center gap-4 text-center mb-8">
        <h1 className="text-3xl font-bold">Shop</h1>
      </div>

      {isLoading ?
        <div className="flex items-center justify-center py-12">
          <Loader2 size={28} className="animate-spin text-brand-accent" />
        </div>
      : products.length > 0 ?
        <div
          ref={containerRef}
          className="relative max-w-xs mx-auto"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onWheel={handleWheel}
        >
          {/* Product Card */}
          <div
            className="glass rounded-[24px] relative overflow-hidden"
            style={{
              aspectRatio: "3/4",
              backgroundImage: `url(${currentProduct.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              maxHeight: "60vh",
            }}
          >
            {/* Overlay covering entire card */}
            <div className="absolute inset-0 bg-black/60" />

            {/* Content positioned above overlay with padding */}
            <div className="relative z-10 flex flex-col justify-between h-full p-6">
              <div className="space-y-2">
                <p className="text-[10px] text-white/60 uppercase tracking-widest font-bold">
                  {currentProduct.category}
                </p>
                <h3 className="text-base font-bold text-white">
                  {currentProduct.name}
                </h3>
              </div>
              <div className="flex items-center justify-between gap-4">
                <p className="text-brand-accent font-bold text-lg">
                  {currentProduct.price === 0 ?
                    "Free"
                  : `$${currentProduct.price.toFixed(2)}`}
                </p>
                <button
                  onClick={handleUseProduct}
                  className="px-6 py-3 bg-transparent border border-white text-white rounded-xl hover:bg-white/10 transition-all flex items-center justify-center gap-2 text-sm font-bold"
                >
                  <ShoppingBag size={16} />
                  {currentProduct.price === 0 ? "Use" : "Add to Cart"}
                </button>
              </div>
            </div>
          </div>
        </div>
      : <div className="flex items-center justify-center py-12">
          <p className="text-white/60">No products available</p>
        </div>
      }

      {/* Dots Indicator */}
      {!isLoading && products.length > 0 && (
        <div className="fixed right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-10">
          {products.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ?
                  "bg-brand-accent h-8"
                : "bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
