import { useState, useEffect, useRef } from "react";
import {
  Wand2,
  ImagePlus,
  Zap,
  Sparkles,
  Palette,
  Code,
  Folder,
  Lightbulb,
  Bookmark,
  MessageCircle,
  SquarePen,
  Briefcase,
  X,
  Image,
  Music,
  Film,
  FileText,
} from "lucide-react";
import { Viewer } from "../components/Viewer";
import { useChat } from "../contexts/ChatContext";

const quickLinks = [
  {
    id: "try-bitto",
    icon: Wand2,
    label: "Try Bitto",
    searchQuery: "try bitto ai assistant",
  },
  {
    id: "gen-posters",
    icon: ImagePlus,
    label: "Gen Posters",
    searchQuery: "generate posters ai design",
  },
  {
    id: "vibe-code",
    icon: Zap,
    label: "Vibe code",
    searchQuery: "vibe code programming",
  },
  {
    id: "inspiration",
    icon: Lightbulb,
    label: "Inspiration",
    searchQuery: "design inspiration gallery",
  },
  {
    id: "web-design",
    icon: Palette,
    label: "Web Design",
    searchQuery: "web design inspiration",
  },
  {
    id: "ai-tools",
    icon: Sparkles,
    label: "AI Tools",
    searchQuery: "artificial intelligence tools",
  },
  {
    id: "development",
    icon: Code,
    label: "Development",
    searchQuery: "web development resources",
  },
  {
    id: "saved",
    icon: Bookmark,
    label: "Saved",
    searchQuery: "saved bookmarks collection",
  },
];

export function Chat({
  viewerOpen,
  onViewerOpenChange,
}: {
  viewerOpen: boolean;
  onViewerOpenChange: (open: boolean) => void;
}) {
  const [selectedLink, setSelectedLink] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const {
    setIsChatActive,
    incrementChatTapCount,
    markChatAsVisited,
    isFooterHidden,
    setIsFooterHidden,
    messages,
    attachedFile,
    setAttachedFile,
    isLoading,
  } = useChat();

  // Set chat as active when component mounts
  useEffect(() => {
    setIsChatActive(true);
    markChatAsVisited(); // Mark as visited on first mount
    return () => {
      setIsChatActive(false);
    };
  }, [setIsChatActive, markChatAsVisited]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleLinkClick = (link: (typeof quickLinks)[0]) => {
    setSelectedLink(link.searchQuery);
    onViewerOpenChange(true);
  };

  const handleChatNavClick = () => {
    incrementChatTapCount();
  };

  const handleCloseViewer = () => {
    onViewerOpenChange(false);
    setSelectedLink(null);
  };

  return (
    <div className="pt-4 pb-32">
      {messages.length === 0 && (
        <h1 className="text-3xl font-bold text-center mb-8">Ask Bitto</h1>
      )}

      {messages.length === 0 ?
        <div className="space-y-6">
          <div className="max-w-4xl mx-auto">
            {/* First row: 2 items */}
            <div className="flex justify-center gap-3 mb-3">
              {quickLinks.slice(0, 2).map((link) => {
                const Icon = link.icon;

                return (
                  <button
                    key={link.id}
                    onClick={() => handleLinkClick(link)}
                    className="glass rounded-full px-6 py-3 flex items-center justify-center gap-2 hover:bg-white/10 transition-all group whitespace-nowrap min-w-[120px]"
                  >
                    <Icon
                      size={18}
                      className="text-brand-accent group-hover:scale-110 transition-transform shrink-0"
                    />
                    <span className="text-sm font-medium text-white">
                      {link.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Second row: 3 items */}
            <div className="flex justify-center gap-3 mb-3">
              {quickLinks.slice(2, 5).map((link) => {
                const Icon = link.icon;

                return (
                  <button
                    key={link.id}
                    onClick={() => handleLinkClick(link)}
                    className="glass rounded-full px-6 py-3 flex items-center justify-center gap-2 hover:bg-white/10 transition-all group whitespace-nowrap min-w-[120px]"
                  >
                    <Icon
                      size={18}
                      className="text-brand-accent group-hover:scale-110 transition-transform shrink-0"
                    />
                    <span className="text-sm font-medium text-white">
                      {link.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Third row: 3 items */}
            <div className="flex justify-center gap-3">
              {quickLinks.slice(5, 8).map((link) => {
                const Icon = link.icon;

                return (
                  <button
                    key={link.id}
                    onClick={() => handleLinkClick(link)}
                    className="glass rounded-full px-6 py-3 flex items-center justify-center gap-2 hover:bg-white/10 transition-all group whitespace-nowrap min-w-[120px]"
                  >
                    <Icon
                      size={18}
                      className="text-brand-accent group-hover:scale-110 transition-transform shrink-0"
                    />
                    <span className="text-sm font-medium text-white">
                      {link.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Edit button below all other buttons */}
            <div className="flex justify-center mt-20">
              <button
                onClick={() => setIsFooterHidden(!isFooterHidden)}
                className="bg-brand-accent rounded-full p-4 flex items-center justify-center hover:bg-brand-accent/80 transition-all group"
              >
                <SquarePen
                  size={24}
                  className="text-black group-hover:scale-110 transition-transform"
                />
              </button>
            </div>
          </div>
        </div>
      : <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`px-4 ${message.isUser ? "flex justify-end" : "flex justify-start"}`}
            >
              <div
                className={`rounded-2xl px-4 py-3 max-w-xs ${
                  message.isUser ?
                    "bg-brand-accent/20 ml-auto"
                  : "bg-white/10 mr-auto"
                }`}
              >
                {/* Media Preview */}
                {message.attachedFile && (
                  <div className="mb-3">
                    {message.attachedFile.type === "photo" && (
                      <img
                        src={URL.createObjectURL(message.attachedFile.file)}
                        alt={message.attachedFile.name}
                        className="w-full aspect-square object-cover rounded-lg"
                      />
                    )}
                    {message.attachedFile.type === "video" && (
                      <video
                        src={URL.createObjectURL(message.attachedFile.file)}
                        controls
                        className="w-full max-h-64 rounded-lg bg-black"
                      />
                    )}
                    {message.attachedFile.type === "audio" && (
                      <audio
                        src={URL.createObjectURL(message.attachedFile.file)}
                        controls
                        className="w-full rounded-lg"
                      />
                    )}
                    {message.attachedFile.type === "file" && (
                      <div className="flex flex-col items-center gap-2 p-3 bg-brand-accent/10 rounded-lg">
                        {/* File Icon Frame */}
                        <div className="w-12 h-12 bg-brand-accent/20 rounded-lg flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-brand-accent"
                          >
                            <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
                            <path d="M14 2v5a1 1 0 0 0 1 1h5" />
                          </svg>
                        </div>

                        {/* File Name */}
                        <div className="text-center">
                          <p className="text-white font-medium text-xs truncate max-w-48">
                            {message.attachedFile.name}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Message Text */}
                {message.text && (
                  <p
                    className={`text-sm whitespace-pre-wrap ${
                      message.isUser ? "text-white" : "text-white/90"
                    }`}
                  >
                    {message.text}
                  </p>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />

          {/* Loading indicator */}
          {isLoading && (
            <div className="px-4 flex justify-start">
              <div className="bg-white/10 rounded-2xl px-4 py-3 max-w-xs mr-auto">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-brand-accent rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-brand-accent rounded-full animate-pulse delay-75"></div>
                  <div className="w-2 h-2 bg-brand-accent rounded-full animate-pulse delay-150"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      }

      {/* File Attachment Display */}
      {attachedFile && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 w-80 max-w-sm z-40">
          <div className="bg-brand-gray rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
            {attachedFile.type === "photo" ?
              /* Image Preview - smaller 1:1 aspect ratio */
              <div className="relative w-48 h-48 mx-auto bg-black/50">
                <img
                  src={URL.createObjectURL(attachedFile.file)}
                  alt={attachedFile.name}
                  className="w-full h-full object-cover"
                />
                {/* Remove Button Overlay */}
                <button
                  onClick={() => setAttachedFile(null)}
                  className="absolute top-2 right-2 w-6 h-6 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center transition-colors"
                >
                  <X size={12} className="text-white" />
                </button>
              </div>
            : /* Files - generic icon with name */
              <div className="p-4">
                <div className="flex flex-col items-center gap-3">
                  {/* File Icon Frame */}
                  <div className="w-16 h-16 bg-brand-accent/20 rounded-lg flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-brand-accent"
                    >
                      <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
                      <path d="M14 2v5a1 1 0 0 0 1 1h5" />
                    </svg>
                  </div>

                  {/* File Name */}
                  <div className="text-center">
                    <p className="text-white font-medium text-sm truncate max-w-64">
                      {attachedFile.name}
                    </p>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => setAttachedFile(null)}
                    className="w-6 h-6 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                  >
                    <X size={12} className="text-white/60" />
                  </button>
                </div>
              </div>
            }
          </div>
        </div>
      )}

      {viewerOpen && selectedLink && (
        <Viewer
          initialUrl={`https://www.google.com/search?q=${encodeURIComponent(selectedLink)}`}
          onClose={handleCloseViewer}
        />
      )}
    </div>
  );
}
