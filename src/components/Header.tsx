import { Search, ShoppingCart } from "lucide-react";
import { cn } from "../utils";
import { useLocation } from "react-router-dom";

interface HeaderProps {
  onSearchClick: () => void;
  onCartClick: () => void;
  cartCount: number;
}

export function Header({ onSearchClick, onCartClick, cartCount }: HeaderProps) {
  const location = useLocation();
  const isSearchActive = location.pathname === "/search";

  return (
    <header className="fixed top-8 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-50 flex items-center justify-between h-16 transition-all duration-500 ease-in-out">
      {/* Sub-component 1: Profile Menu Pill */}
      <div className="pill-surface rounded-full h-16 flex items-center gap-3 pl-2 pr-6 shadow-2xl">
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <img
            src="https://picsum.photos/seed/wolf/100/100"
            alt="Profile"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="block">
          <p className="text-[10px] text-white/50 uppercase tracking-widest font-medium">
            Welcome,
          </p>
          <p className="text-sm font-semibold italic">John Doe</p>
        </div>
      </div>

      {/* Sub-component 2: Search Menu Pill */}
      <button
        onClick={onSearchClick}
        className={cn(
          "pill-surface w-16 h-16 flex items-center justify-center rounded-full shadow-2xl transition-colors",
          isSearchActive ?
            "bg-brand-accent text-brand-black"
          : "hover:bg-white/10",
        )}
      >
        <Search
          size={24}
          className={cn("transition-colors", "text-white/80")}
        />
      </button>

      {/* Sub-component 3: Cart Menu Pill */}
      <button
        onClick={onCartClick}
        className="pill-surface w-16 h-16 flex items-center justify-center rounded-full shadow-2xl hover:bg-white/10 transition-colors relative"
      >
        <ShoppingCart size={24} className="text-white/80" />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 w-6 h-6 bg-brand-accent text-brand-black text-[10px] font-bold flex items-center justify-center rounded-full">
            {cartCount}
          </span>
        )}
      </button>
    </header>
  );
}
