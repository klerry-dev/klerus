import {
  ArrowLeft,
  ArrowRight,
  RotateCw,
  Plus,
  X,
  Home,
  Lock,
  MoreVertical,
  ZoomIn,
  ZoomOut,
  Download,
  Share2,
  Copy,
  Check,
  Bookmark,
  Search,
  Globe,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface Tab {
  id: string;
  url: string;
  title: string;
}

interface ViewerProps {
  initialUrl?: string;
  onClose?: () => void;
}

export function Viewer({
  initialUrl = "https://example.com",
  onClose,
}: ViewerProps) {
  const [tabs, setTabs] = useState<Tab[]>([
    { id: "1", url: initialUrl, title: "Project" },
  ]);
  const [activeTabId, setActiveTabId] = useState("1");
  const [addressBarValue, setAddressBarValue] = useState(initialUrl);
  const [zoom, setZoom] = useState(100);
  const [showTabs, setShowTabs] = useState(false);
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<string[]>([initialUrl]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [homepageUrl, setHomepageUrl] = useState(initialUrl);
  const [bookmarks, setBookmarks] = useState<Tab[]>([]);
  const [showMenu, setShowMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0];

  const normalizeUrl = (input: string): string => {
    if (input === "welcome") return "welcome";
    if (input.startsWith("http://") || input.startsWith("https://")) {
      return input;
    }
    if (input.includes(".") && !input.includes(" ")) {
      return `https://${input}`;
    }
    return `https://www.google.com/search?q=${encodeURIComponent(input)}`;
  };

  const navigateToUrl = (url: string) => {
    const normalized = normalizeUrl(url);
    setTabs((prev) =>
      prev.map((t) => (t.id === activeTabId ? { ...t, url: normalized } : t)),
    );
    setAddressBarValue(normalized);

    if (normalized === "welcome") {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }

    // Add to history
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(normalized);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigateToUrl(addressBarValue);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigateToUrl(searchQuery);
    }
  };

  const addShortcut = () => {
    if (searchQuery.trim()) {
      const url = normalizeUrl(searchQuery);
      const newBookmark: Tab = {
        id: Date.now().toString(),
        url,
        title: searchQuery,
      };
      setBookmarks([...bookmarks, newBookmark]);
    }
  };

  const goBack = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      const url = history[newIndex];
      setHistoryIndex(newIndex);
      setTabs((prev) =>
        prev.map((t) => (t.id === activeTabId ? { ...t, url } : t)),
      );
      setAddressBarValue(url);
    }
  };

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      const url = history[newIndex];
      setHistoryIndex(newIndex);
      setTabs((prev) =>
        prev.map((t) => (t.id === activeTabId ? { ...t, url } : t)),
      );
      setAddressBarValue(url);
    }
  };

  const refresh = () => {
    if (iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src;
    }
  };

  const goHome = () => {
    navigateToUrl("welcome");
  };

  const addTab = () => {
    const newTab: Tab = {
      id: Date.now().toString(),
      url: "welcome",
      title: "Welcome",
    };
    setTabs([...tabs, newTab]);
    setActiveTabId(newTab.id);
    setAddressBarValue("welcome");
  };

  const closeTab = (tabId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (tabs.length === 1) return;
    const newTabs = tabs.filter((t) => t.id !== tabId);
    setTabs(newTabs);
    if (activeTabId === tabId) {
      setActiveTabId(newTabs[0].id);
      setAddressBarValue(newTabs[0].url);
    }
  };

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 25, 300));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 25, 25));
  const resetZoom = () => setZoom(100);

  const copyUrl = () => {
    navigator.clipboard.writeText(activeTab.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sharePage = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: activeTab.title,
          url: activeTab.url,
        });
      } catch {
        // User cancelled
      }
    } else {
      copyUrl();
    }
  };

  const downloadPage = () => {
    const link = document.createElement("a");
    link.href = activeTab.url;
    link.download = "page.html";
    link.click();
  };

  // Update address bar when tab changes
  useEffect(() => {
    setAddressBarValue(activeTab?.url || "");
  }, [activeTabId, activeTab?.url]);

  const WelcomeInterface = () => (
    <div className="flex flex-col items-center justify-center h-full bg-gray-100 p-8">
      <h1 className="text-6xl font-bold text-gray-800 mb-8">Bitto</h1>
      <form
        onSubmit={handleSearchSubmit}
        className="w-full max-w-lg mb-8 flex gap-2"
      >
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 px-4 py-3 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg text-gray-900"
          placeholder="Search the web..."
        />
        <button
          type="submit"
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
        >
          <Search size={16} />
          Search
        </button>
      </form>
      <div className="space-y-4">
        <button
          onClick={addShortcut}
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
        >
          <Plus size={16} />
          Add Shortcut
        </button>
        <button
          onClick={() => navigateToUrl("https://google.com")}
          className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2"
        >
          <Globe size={16} />
          Browse Google
        </button>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Top Navigation Bar */}
      <div className="flex items-center gap-2 px-3 py-2 bg-brand-gray border-b border-white/10">
        {/* Navigation Controls - without back/forward */}
        <div className="flex items-center gap-1">
          <button
            onClick={goHome}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <Home size={18} />
          </button>
          <button
            onClick={refresh}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <RotateCw size={18} />
          </button>
        </div>

        {/* Address Bar */}
        <form onSubmit={handleAddressSubmit} className="flex-1">
          <div className="flex items-center bg-black/50 rounded-lg px-3 py-2 gap-2">
            <Lock size={14} className="text-white/40" />
            <input
              type="text"
              value={addressBarValue}
              onChange={(e) => setAddressBarValue(e.target.value)}
              className="flex-1 bg-transparent text-sm outline-none text-white/90 w-full"
              placeholder="Search or enter address..."
            />
          </div>
        </form>

        {/* Tab & Menu Controls */}
        <div className="flex items-center gap-1">
          <button
            onClick={addTab}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <Plus size={18} />
          </button>
          <button
            onClick={() => setShowTabs(!showTabs)}
            className={`p-2 hover:bg-white/10 rounded-lg transition-colors ${showTabs ? "bg-white/10" : ""}`}
          >
            <div className="flex items-center gap-1">
              <span className="text-xs font-medium">{tabs.length}</span>
            </div>
          </button>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {isLoading && <div className="h-1 bg-green-500 animate-pulse" />}

      {/* Tabs Bar (shown when tabs > 1 or when tab view is open) */}
      {(tabs.length > 1 || showTabs) && (
        <div className="flex items-center gap-1 px-2 py-2 bg-black/50 border-b border-white/10 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTabId(tab.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm min-w-30 max-w-50 transition-colors ${
                tab.id === activeTabId ?
                  "bg-white/20"
                : "bg-white/5 hover:bg-white/10"
              }`}
            >
              <span className="truncate flex-1 text-left">{tab.title}</span>
              {tabs.length > 1 && (
                <X
                  size={14}
                  onClick={(e) => closeTab(tab.id, e)}
                  className="hover:text-red-400 shrink-0"
                />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 bg-gray-100 overflow-hidden relative">
        {activeTab.url === "welcome" ?
          <WelcomeInterface />
        : <iframe
            ref={iframeRef}
            src={activeTab.url}
            className="w-full h-full border-0"
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            title={activeTab.title}
            onLoad={() => setIsLoading(false)}
            style={{
              transform: `scale(${zoom / 100})`,
              transformOrigin: "top left",
            }}
          />
        }
      </div>

      {/* Bottom Controls Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-brand-gray border-t border-white/10">
        {/* Left: Navigation (Back/Forward) */}
        <div className="flex items-center gap-2">
          <button
            onClick={goBack}
            disabled={historyIndex === 0}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-30"
          >
            <ArrowLeft size={18} />
          </button>
          <button
            onClick={goForward}
            disabled={historyIndex >= history.length - 1}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-30"
          >
            <ArrowRight size={18} />
          </button>
        </div>

        {/* Center: Zoom Controls */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleZoomOut}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <ZoomOut size={16} />
          </button>
          <button
            onClick={resetZoom}
            className="text-sm text-white/60 font-medium min-w-12 text-center hover:text-white"
          >
            {zoom}%
          </button>
          <button
            onClick={handleZoomIn}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <ZoomIn size={16} />
          </button>
        </div>

        {/* Right: Action Buttons */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => {
              if (!bookmarks.find((b) => b.url === activeTab.url)) {
                setBookmarks([
                  ...bookmarks,
                  { ...activeTab, id: Date.now().toString() },
                ]);
              }
            }}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            title="Bookmark"
          >
            <Bookmark
              size={16}
              className={
                bookmarks.find((b) => b.url === activeTab.url) ? "fill-current"
                : ""
              }
            />
          </button>
          <button
            onClick={copyUrl}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            title="Copy URL"
          >
            {copied ?
              <Check size={16} className="text-brand-accent" />
            : <Copy size={16} />}
          </button>
          <button
            onClick={sharePage}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            title="Share"
          >
            <Share2 size={16} />
          </button>
          <button
            onClick={downloadPage}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            title="Download"
          >
            <Download size={16} />
          </button>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <MoreVertical size={16} />
          </button>
        </div>
      </div>
      {showMenu && (
        <div className="absolute bottom-full right-4 bg-brand-gray border border-white/10 rounded-lg p-4 min-w-75 shadow-lg z-10">
          <h3 className="text-white font-medium mb-4">Pro Features</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-white/80 mb-2">
                Homepage
              </label>
              <input
                type="text"
                value={homepageUrl}
                onChange={(e) => setHomepageUrl(e.target.value)}
                className="w-full px-3 py-2 bg-black/50 rounded text-sm text-white/90"
                placeholder="Enter homepage URL"
              />
            </div>
            <div>
              <label className="block text-sm text-white/80 mb-2">
                Bookmarks
              </label>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {bookmarks.length === 0 ?
                  <p className="text-white/40 text-sm">No bookmarks</p>
                : bookmarks.map((b) => (
                    <div key={b.id} className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          navigateToUrl(b.url);
                          setShowMenu(false);
                        }}
                        className="flex-1 text-left text-sm text-white/60 hover:text-white truncate"
                      >
                        {b.title}
                      </button>
                      <X
                        size={14}
                        onClick={() =>
                          setBookmarks(bookmarks.filter((bb) => bb.id !== b.id))
                        }
                        className="hover:text-red-400 shrink-0"
                      />
                    </div>
                  ))
                }
              </div>
            </div>
            <button
              onClick={() => setShowMenu(false)}
              className="w-full px-3 py-2 bg-brand-accent text-white rounded text-sm"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
