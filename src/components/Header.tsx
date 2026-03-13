import { Search, ShoppingCart, Settings } from "lucide-react";
import { cn } from "../utils";
import { useLocation, useNavigate } from "react-router-dom";
import { useProfile } from "../contexts/ProfileContext";

interface HeaderProps {
  onSearchClick: () => void;
  onCartClick: () => void;
  cartCount: number;
}

export function Header({ onSearchClick, onCartClick, cartCount }: HeaderProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { profileData } = useProfile();
  const isSearchActive = location.pathname === "/search";
  const isProfileActive = location.pathname === "/profile";

  const handleProfileClick = () => {
    navigate("/profile");
  };

  return (
    <header className="fixed top-8 left-0 right-0 max-w-md mx-auto px-6 z-50 flex items-center justify-between h-16 transition-all duration-500 ease-in-out">
      {/* Sub-component 1: Profile Menu Pill */}
      <button
        onClick={handleProfileClick}
        className={cn(
          "pill-surface rounded-full h-16 flex items-center gap-3 pl-2 pr-6 shadow-2xl transition-colors",
          isProfileActive ? "bg-brand-accent" : "hover:bg-white/10",
        )}
      >
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <img
            src={profileData.profileImage}
            alt="Profile"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="block text-white">
          <p className="text-[10px] text-white/50 uppercase tracking-widest font-medium">
            Welcome,
          </p>
          <p className="text-sm font-semibold italic text-white">
            {profileData.username}
          </p>
        </div>
      </button>

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
