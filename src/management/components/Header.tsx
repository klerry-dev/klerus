import React from "react";
import { Menu } from "lucide-react";
import "./Header.css";

interface HeaderProps {
  onMenuToggle: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  return (
    <header className="management-header">
      <div className="header-left">
        <button onClick={onMenuToggle} className="menu-toggle">
          <Menu size={24} />
        </button>
        <div className="header-title">
          <span className="header-subtitle">Studio</span>
        </div>
      </div>

      <div className="header-right">
        <div className="user-profile">
          <img
            src="https://picsum.photos/seed/admin/40/40"
            alt="Admin"
            className="user-avatar"
          />
        </div>
      </div>
    </header>
  );
};
