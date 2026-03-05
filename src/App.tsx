import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Product } from "./types";
import { Layout } from "./components/Layout";
import { Cart } from "./components/Cart";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Projects } from "./pages/Projects";
import { Shop } from "./pages/Shop";
import { Chat } from "./pages/Chat";
import { Search } from "./pages/Search";
import { Terms } from "./pages/Terms";
import { Analytics } from "./pages/Analytics";
import { Reports } from "./pages/Reports";
import { ViewerPage } from "./pages/Viewer";
import { ManagementSite } from "./management";
import { ChatProvider } from "./contexts/ChatContext";

interface CartItem extends Product {
  quantity: number;
}

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [chatViewerOpen, setChatViewerOpen] = useState(false);

  const handleAddToCart = (product: any) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ?
            { ...item, quantity: item.quantity + 1 }
          : item,
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity } : item,
      ),
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleSearchClick = () => {
    if (location.pathname === "/search") {
      // If we're on the search page, navigate back to home
      navigate("/");
    } else {
      // Navigate to search page
      navigate("/search");
    }
  };

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <ChatProvider>
      <>
        <Layout
          cartCount={cartItemCount}
          hideFooter={viewerOpen || chatViewerOpen}
          onCartClick={() => setCartOpen(true)}
          onSearchClick={handleSearchClick}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/projects"
              element={<Projects onViewerOpenChange={setViewerOpen} />}
            />
            <Route
              path="/shop"
              element={<Shop onAddToCart={handleAddToCart} />}
            />
            <Route
              path="/chat"
              element={
                <Chat
                  viewerOpen={chatViewerOpen}
                  onViewerOpenChange={setChatViewerOpen}
                />
              }
            />
            <Route
              path="/search"
              element={
                <Search cartItems={cart} onAddToCart={handleAddToCart} />
              }
            />
            <Route path="/terms" element={<Terms />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </Layout>
        <Routes>
          <Route path="/viewer" element={<ViewerPage />} />
        </Routes>
        <Cart
          items={cart}
          isOpen={cartOpen}
          onClose={() => setCartOpen(false)}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onClearCart={handleClearCart}
        />
      </>
    </ChatProvider>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/management/*" element={<ManagementSite />} />
        <Route path="*" element={<AppContent />} />
      </Routes>
    </BrowserRouter>
  );
}
