import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  Search as SearchIcon,
  X,
  ArrowRight,
  ShoppingCart,
  Package,
  User,
  Home,
  ShoppingBag,
  MessageSquare,
  Code,
  Plus,
} from "lucide-react";
import { PRODUCTS, PROJECTS } from "../constants";
import { Product } from "../types";

interface CartItem extends Product {
  quantity: number;
}

interface SearchProps {
  cartItems: CartItem[];
  onAddToCart: (product: Product) => void;
  onCartClick?: () => void;
}

interface SearchResult {
  id: string;
  type: "page" | "product" | "cart" | "project";
  title: string;
  description: string;
  url: string;
  icon: React.ReactNode;
  category?: string;
  price?: number;
  inCart?: boolean;
  quantity?: number;
  product?: Product;
}

export function Search({ cartItems, onAddToCart, onCartClick }: SearchProps) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  // Real search data from products, projects, and pages
  const searchData: SearchResult[] = useMemo(() => {
    const pages: SearchResult[] = [
      {
        id: "home",
        type: "page",
        title: "Home",
        description: "Welcome page with latest posts and updates",
        url: "/",
        icon: <Home size={16} />,
        category: "Navigation",
      },
      {
        id: "shop",
        type: "page",
        title: "Shop",
        description: "Browse and purchase products",
        url: "/shop",
        icon: <ShoppingBag size={16} />,
        category: "Navigation",
      },
      {
        id: "about",
        type: "page",
        title: "About",
        description: "Learn more about us and our mission",
        url: "/about",
        icon: <User size={16} />,
        category: "Navigation",
      },
      {
        id: "projects",
        type: "page",
        title: "Projects",
        description: "View our portfolio and completed work",
        url: "/projects",
        icon: <Code size={16} />,
        category: "Navigation",
      },
      {
        id: "chat",
        type: "page",
        title: "Chat",
        description: "Start a conversation with AI assistant",
        url: "/chat",
        icon: <MessageSquare size={16} />,
        category: "Navigation",
      },
    ];

    const products: SearchResult[] = PRODUCTS.map((product) => {
      const cartItem = cartItems.find((item) => item.id === product.id);
      return {
        id: product.id,
        type: "product",
        title: product.name,
        description: `Premium ${product.category} product`,
        url: "/shop",
        icon: <Package size={16} />,
        category: "Products",
        price: product.price,
        inCart: !!cartItem,
        quantity: cartItem?.quantity,
        product,
      };
    });

    const projects: SearchResult[] = PROJECTS.map((project) => ({
      id: project.id,
      type: "project",
      title: project.title,
      description: project.description,
      url: "/projects",
      icon: <Code size={16} />,
      category: "Portfolio",
    }));

    const cart: SearchResult[] =
      cartItems.length > 0 ?
        [
          {
            id: "cart",
            type: "cart",
            title: "Shopping Cart",
            description: `${cartItems.length} items in cart - $${cartItems
              .reduce((sum, item) => sum + item.price * item.quantity, 0)
              .toFixed(2)}`,
            url: "/shop",
            icon: <ShoppingCart size={16} />,
            category: "Actions",
          },
        ]
      : [];

    return [...pages, ...products, ...projects, ...cart];
  }, [cartItems]);

  const filteredResults = useMemo(() => {
    if (!query.trim()) return [];

    const lowercaseQuery = query.toLowerCase();
    return searchData.filter(
      (item) =>
        item.title.toLowerCase().includes(lowercaseQuery) ||
        item.description.toLowerCase().includes(lowercaseQuery) ||
        item.category?.toLowerCase().includes(lowercaseQuery),
    );
  }, [query, searchData]);

  const suggestions = useMemo(() => {
    if (!query.trim()) return [];

    // Create suggestions from real data
    const allSuggestions = [
      ...PRODUCTS.map((p) => p.name.toLowerCase()),
      ...PRODUCTS.map((p) => p.category.toLowerCase()),
      ...PROJECTS.map((p) => p.title.toLowerCase()),
      ...["home", "about", "shop", "projects", "chat", "cart"],
    ];

    return allSuggestions
      .filter((suggestion) => suggestion.includes(query.toLowerCase()))
      .slice(0, 5);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isFocused || filteredResults.length === 0) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredResults.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev <= 0 ? filteredResults.length - 1 : prev - 1,
        );
      } else if (e.key === "Enter" && selectedIndex >= 0) {
        e.preventDefault();
        handleResultClick(filteredResults[selectedIndex]);
      } else if (e.key === "Escape") {
        setIsFocused(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isFocused, selectedIndex, filteredResults]);

  const handleResultClick = (result: SearchResult) => {
    if (result.type === "product") {
      if (result.product) {
        onAddToCart(result.product);
      }
      navigate(result.url);
    } else if (result.type === "page" || result.type === "project") {
      navigate(result.url);
    } else if (result.type === "cart") {
      if (onCartClick) {
        onCartClick();
      } else {
        navigate("/shop");
      }
    }
    setQuery("");
    setIsFocused(false);
    setSelectedIndex(-1);
  };

  const handleAddToCartClick = (e: React.MouseEvent, result: SearchResult) => {
    e.stopPropagation();
    if (result.product) {
      onAddToCart(result.product);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setIsFocused(true);
  };

  const clearSearch = () => {
    setQuery("");
    setIsFocused(false);
    setSelectedIndex(-1);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "page":
        return "text-blue-400";
      case "product":
        return "text-green-400";
      case "cart":
        return "text-yellow-400";
      case "project":
        return "text-orange-400";
      default:
        return "text-gray-400";
    }
  };

  const getTypeBg = (type: string) => {
    switch (type) {
      case "page":
        return "bg-blue-400/10";
      case "product":
        return "bg-green-400/10";
      case "cart":
        return "bg-yellow-400/10";
      case "project":
        return "bg-orange-400/10";
      default:
        return "bg-gray-400/10";
    }
  };

  return (
    <div className="min-h-screen pt-20 px-6 pb-12 bg-brand-black">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Search Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white">Search</h1>
          </div>

          {/* Search Input */}
          <div className="relative mb-8">
            <div className="relative">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                placeholder="Search for anything..."
                className="w-full pl-12 pr-12 h-14 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-white/20 focus:bg-white/10 transition-all"
                autoComplete="off"
              />
              {query && (
                <button
                  onClick={clearSearch}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors"
                >
                  <X size={20} />
                </button>
              )}
            </div>

            {/* Suggestions */}
            {isFocused && suggestions.length > 0 && !filteredResults.length && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-full left-0 right-0 mt-2 bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl overflow-hidden z-10"
              >
                <div className="p-3">
                  <p className="text-xs text-white/50 mb-2">Suggestions</p>
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="w-full text-left px-3 py-2 text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors text-sm"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Search Results */}
          <AnimatePresence>
            {filteredResults.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-2"
              >
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm text-white/60">
                    {filteredResults.length}{" "}
                    {filteredResults.length === 1 ? "result" : "results"}
                  </p>
                  <button
                    onClick={clearSearch}
                    className="text-sm text-white/40 hover:text-white/60 transition-colors"
                  >
                    Clear
                  </button>
                </div>

                {filteredResults.map((result, index) => (
                  <motion.button
                    key={result.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleResultClick(result)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`w-full p-4 bg-white/5 border border-white/10 rounded-xl text-left hover:bg-white/10 transition-all ${
                      selectedIndex === index ?
                        "bg-white/10 border-white/20"
                      : ""
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`p-2 rounded-lg ${getTypeBg(
                          result.type,
                        )} ${getTypeColor(result.type)}`}
                      >
                        {result.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-white truncate">
                            {result.title}
                          </h3>
                          {result.inCart && (
                            <span className="px-2 py-0.5 bg-green-400/20 text-green-400 text-xs rounded-full">
                              In Cart ({result.quantity})
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-white/60 line-clamp-1">
                          {result.description}
                        </p>
                        <div className="flex items-center gap-4 mt-2">
                          <span
                            className={`text-xs ${getTypeColor(result.type)}`}
                          >
                            {result.type}
                          </span>
                          {result.category && (
                            <span className="text-xs text-white/40">
                              {result.category}
                            </span>
                          )}
                          {result.price && (
                            <span className="text-xs text-white/40">
                              ${result.price}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0 mt-1">
                        {result.type === "product" &&
                          result.product &&
                          !result.inCart && (
                            <button
                              onClick={(e) => handleAddToCartClick(e, result)}
                              className="p-2 bg-green-400/20 text-green-400 rounded-lg hover:bg-green-400/30 transition-colors"
                            >
                              <Plus size={16} />
                            </button>
                          )}
                        <ArrowRight size={16} className="text-white/20" />
                      </div>
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* No Results */}
          {query &&
            isFocused &&
            filteredResults.length === 0 &&
            suggestions.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                  <SearchIcon className="text-white/40 w-6 h-6" />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">
                  No results found
                </h3>
                <p className="text-white/60 text-sm">
                  Try searching for something else, or browse our popular pages
                </p>
              </motion.div>
            )}

          {/* Quick Access */}
          {!query && !isFocused && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-12"
            >
              <div className="grid grid-cols-2 gap-3">
                {searchData
                  .slice(0, 6)
                  .map((item): SearchResult => {
                    if (item.title === "Minimalist Desk Lamp") {
                      return {
                        ...item,
                        title: "Cart",
                        icon: <ShoppingCart size={16} />,
                        description: "Shopping Cart",
                        type: "cart" as const,
                        url: "/shop",
                        category: "Actions",
                      };
                    }
                    return item;
                  })
                  .map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleResultClick(item)}
                      className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all text-left"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <div
                          className={`p-1.5 rounded ${getTypeBg(
                            item.type,
                          )} ${getTypeColor(item.type)}`}
                        >
                          {item.icon}
                        </div>
                        <span className="text-sm font-medium text-white">
                          {item.title}
                        </span>
                      </div>
                    </button>
                  ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
