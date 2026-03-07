import {
  X,
  Download,
  ExternalLink,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Github,
  Globe,
  Calendar,
  Tag,
  Star,
  Play,
  Pause,
  Clock,
  FileText,
  FolderOpen,
  ChevronRight,
} from "lucide-react";
import { useState, useEffect } from "react";
import type { Database } from "../lib/supabase";

type Project = Database["public"]["Tables"]["projects"]["Row"];

interface ViewerProps {
  project: Project;
  onClose: () => void;
}

export function Viewer({ project, onClose }: ViewerProps) {
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackTime, setPlaybackTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Reset state when project changes
  useEffect(() => {
    setScale(1);
    setRotation(0);
    setPosition({ x: 0, y: 0 });
  }, [project]);

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Block background scrolling when viewer is open
  useEffect(() => {
    // Save original body styles
    const originalStyle = window.getComputedStyle(document.body);
    const originalOverflow = originalStyle.overflow;
    const originalPosition = originalStyle.position;

    // Block scrolling
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${window.scrollY}px`;
    document.body.style.width = "100%";

    // Restore scrolling when component unmounts
    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.position = originalPosition;
      const scrollY = document.body.style.top;
      document.body.style.top = "";
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    };
  }, []);

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.2, 3));
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.2, 0.5));
  };

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const handleReset = () => {
    setScale(1);
    setRotation(0);
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && scale > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = project.image;
    link.download = `${project.title.replace(/\s+/g, "-").toLowerCase()}.jpg`;
    link.target = "_blank";
    link.click();
  };

  const handleExternalLink = () => {
    window.open(project.image, "_blank");
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Mock project files data (in real app, this would come from the project)
  const projectFiles = [
    { name: "index.html", type: "file", size: "12.4 KB" },
    { name: "styles.css", type: "file", size: "8.2 KB" },
    { name: "script.js", type: "file", size: "24.7 KB" },
    { name: "assets/", type: "folder", items: 15 },
    { name: "components/", type: "folder", items: 8 },
    { name: "README.md", type: "file", size: "3.1 KB" },
  ];

  return (
    <div
      className="fixed inset-0 bg-black/95 backdrop-blur-lg z-50 overflow-hidden"
      onClick={onClose}
    >
      {/* Floating Header */}
      <div
        className="absolute top-0 left-0 right-0 z-10 p-6 bg-gradient-to-b from-black/80 to-transparent"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className="p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-200 text-white"
            >
              <X size={24} />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-white">{project.title}</h1>
              <p className="text-white/60 text-sm">{project.category}</p>
            </div>
            {project.featured && (
              <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 px-3 py-1.5 rounded-full border border-yellow-500/30">
                <Star size={16} className="text-yellow-400 fill-yellow-400" />
                <span className="text-yellow-400 text-sm font-medium">
                  Featured
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleDownload}
              className="p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-200 text-white"
              title="Download"
            >
              <Download size={20} />
            </button>
            <button
              onClick={handleExternalLink}
              className="p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-200 text-white"
              title="Open in new tab"
            >
              <ExternalLink size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Scrollable Content Area */}
      <div
        className="absolute inset-0 pt-24 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 max-w-7xl mx-auto w-full pb-12">
          {/* Main Preview Area - 2 columns */}
          <div className="lg:col-span-2 space-y-4">
            {/* Image Preview Card */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
              <div className="aspect-video relative group">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  draggable={false}
                />

                {/* Image Controls Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <button
                    onClick={handleZoomOut}
                    className="p-3 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-colors"
                  >
                    <ZoomOut size={20} />
                  </button>
                  <div className="bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full">
                    <span className="text-white font-medium">
                      {Math.round(scale * 100)}%
                    </span>
                  </div>
                  <button
                    onClick={handleZoomIn}
                    className="p-3 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-colors"
                  >
                    <ZoomIn size={20} />
                  </button>
                  <button
                    onClick={handleRotate}
                    className="p-3 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-colors"
                  >
                    <RotateCw size={20} />
                  </button>
                  <button
                    onClick={handleReset}
                    className="p-3 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-colors"
                  >
                    <span className="text-sm">Reset</span>
                  </button>
                </div>
              </div>

              {/* Media Controls */}
              <div className="p-4 bg-black/30">
                <div className="flex items-center gap-4">
                  <button
                    onClick={handlePlayPause}
                    className="p-2.5 rounded-full bg-brand-accent hover:bg-brand-accent/80 transition-colors text-black"
                  >
                    {isPlaying ?
                      <Pause size={18} />
                    : <Play size={18} />}
                  </button>

                  <div className="flex-1 flex items-center gap-3">
                    <span className="text-white/80 text-sm font-mono">
                      {formatTime(playbackTime)}
                    </span>
                    <div className="flex-1 h-1.5 bg-white/20 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-brand-accent to-brand-accent/80 transition-all duration-300"
                        style={{
                          width: `${duration > 0 ? (playbackTime / duration) * 100 : 0}%`,
                        }}
                      />
                    </div>
                    <span className="text-white/80 text-sm font-mono">
                      {formatTime(duration)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-white/60 text-sm">
                    <Clock size={14} />
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Files Explorer */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <FolderOpen size={20} className="text-brand-accent" />
                  Project Files
                </h3>
                <span className="text-white/50 text-sm">
                  {projectFiles.length} items
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {projectFiles.map((file, index) => (
                  <div
                    key={index}
                    className="bg-white/5 hover:bg-white/10 rounded-lg p-3 cursor-pointer transition-all duration-200 group"
                  >
                    <div className="flex items-center gap-3">
                      {file.type === "folder" ?
                        <div className="p-2 rounded-lg bg-brand-accent/20">
                          <FolderOpen size={16} className="text-brand-accent" />
                        </div>
                      : <div className="p-2 rounded-lg bg-white/10">
                          <FileText size={16} className="text-white/60" />
                        </div>
                      }
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm truncate">
                          {file.name}
                        </p>
                        <p className="text-white/50 text-xs">
                          {file.type === "folder" ?
                            `${file.items} items`
                          : file.size}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - 1 column */}
          <div className="space-y-4">
            {/* Description Card */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <FileText size={20} className="text-brand-accent" />
                Overview
              </h3>
              <p className="text-white/80 leading-relaxed text-sm">
                {project.description}
              </p>
            </div>

            {/* Technologies Card */}
            {project.technologies && project.technologies.length > 0 && (
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Tag size={20} className="text-brand-accent" />
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-gradient-to-r from-brand-accent/20 to-brand-accent/10 text-brand-accent rounded-xl text-xs font-medium border border-brand-accent/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 space-y-3">
              <h3 className="text-lg font-semibold text-white mb-4">
                Quick Actions
              </h3>

              {project.live_url && (
                <a
                  href={project.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors text-white group"
                >
                  <div className="p-2 rounded-lg bg-brand-accent/20">
                    <Globe size={18} className="text-brand-accent" />
                  </div>
                  <span className="flex-1 font-medium">Live Demo</span>
                  <ExternalLink
                    size={16}
                    className="text-white/60 group-hover:text-white transition-colors"
                  />
                </a>
              )}

              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors text-white group"
                >
                  <div className="p-2 rounded-lg bg-white/10">
                    <Github size={18} className="text-white/60" />
                  </div>
                  <span className="flex-1 font-medium">Source Code</span>
                  <ExternalLink
                    size={16}
                    className="text-white/60 group-hover:text-white transition-colors"
                  />
                </a>
              )}
            </div>

            {/* Project Info */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Project Info
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-white/60 text-sm">Created</span>
                  <span className="text-white text-sm font-medium">
                    {new Date(project.created_at).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/60 text-sm">Project ID</span>
                  <span className="text-white text-sm font-medium">
                    #{project.id}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/60 text-sm">Display Order</span>
                  <span className="text-white text-sm font-medium">
                    #{project.display_order}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
