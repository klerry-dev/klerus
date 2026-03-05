import { Header } from "./Header";
import { Footer } from "./Footer";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

interface LayoutProps {
  children: React.ReactNode;
  cartCount: number;
  hideFooter?: boolean;
  onCartClick?: () => void;
  onSearchClick?: () => void;
}

export function Layout({
  children,
  cartCount,
  hideFooter = false,
  onCartClick,
  onSearchClick,
}: LayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen pt-32 pb-32 max-w-md mx-auto relative bg-brand-black overflow-x-hidden">
      <Header
        onSearchClick={onSearchClick || (() => navigate("/search"))}
        onCartClick={onCartClick || (() => navigate("/shop"))}
        cartCount={cartCount}
      />

      <main className="px-6">{children}</main>

      {!hideFooter && <Footer />}
    </div>
  );
}
