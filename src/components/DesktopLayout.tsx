import { Header } from "./Header";
import { Footer } from "./Footer";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

interface DesktopLayoutProps {
  children: React.ReactNode;
  cartCount: number;
  hideFooter?: boolean;
  onCartClick?: () => void;
  onSearchClick?: () => void;
}

export function DesktopLayout({
  children,
  cartCount,
  hideFooter = false,
  onCartClick,
  onSearchClick,
}: DesktopLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-brand-black overflow-x-hidden">
      <Header
        onSearchClick={onSearchClick || (() => navigate("/search"))}
        onCartClick={onCartClick || (() => navigate("/shop"))}
        cartCount={cartCount}
      />

      <main className="ml-48 px-12 py-12 max-w-4xl">{children}</main>

      {!hideFooter && <Footer />}
    </div>
  );
}
