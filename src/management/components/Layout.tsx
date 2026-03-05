import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import "./Layout.css";

export const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleNavClick = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="management-layout">
      <Header onMenuToggle={toggleSidebar} />
      <div className="management-body">
        {sidebarOpen && (
          <div className="sidebar-backdrop" onClick={toggleSidebar}></div>
        )}
        <nav
          className={`management-sidebar ${sidebarOpen ? "sidebar-open" : "sidebar-closed"}`}
        >
          <ul className="management-nav">
            <li>
              <Link to="/management/dashboard" onClick={handleNavClick}>
                <svg
                  className="nav-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
                <span className="nav-text">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/management/users" onClick={handleNavClick}>
                <svg
                  className="nav-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2"></path>
                  <circle cx="9" cy="7" r="1"></circle>
                  <circle cx="15" cy="7" r="1"></circle>
                </svg>
                <span className="nav-text">Users</span>
              </Link>
            </li>
            <li>
              <Link to="/management/projects" onClick={handleNavClick}>
                <svg
                  className="nav-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.08"></polyline>
                </svg>
                <span className="nav-text">Projects</span>
              </Link>
            </li>
            <li>
              <Link to="/management/settings" onClick={handleNavClick}>
                <svg
                  className="nav-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="3"></circle>
                  <path d="M12 1v6m0 6v6m4.22-13.22l4.24 4.24M1.54 1.54l4.24 4.24M21 12h-6m-6 0H3m13.22 4.22l4.24 4.24M1.54 20.46l4.24-4.24"></path>
                </svg>
                <span className="nav-text">Settings</span>
              </Link>
            </li>
            <li>
              <Link to="/management/terms" onClick={handleNavClick}>
                <svg
                  className="nav-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
                <span className="nav-text">Terms</span>
              </Link>
            </li>
            <li>
              <Link to="/management/shop" onClick={handleNavClick}>
                <svg
                  className="nav-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                <span className="nav-text">Shop</span>
              </Link>
            </li>
            <li>
              <Link to="/management/discover" onClick={handleNavClick}>
                <svg
                  className="nav-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
                <span className="nav-text">Discover</span>
              </Link>
            </li>
          </ul>
        </nav>

        {/* Main Content Area */}
        <main className="management-content">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};
