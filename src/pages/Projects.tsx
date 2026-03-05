import { Viewer } from "../components/Viewer";
import {
  ExternalLink,
  MoreVertical,
  Eye,
  Share2,
  Download,
  Play,
  ChevronUp,
  Info,
  Loader2,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import type { Database } from "../lib/supabase";

type Project = Database["public"]["Tables"]["projects"]["Row"];

interface ProjectsProps {
  onViewerOpenChange?: (isOpen: boolean) => void;
}

export function Projects({ onViewerOpenChange }: ProjectsProps) {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [menuPosition, setMenuPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const [viewerProject, setViewerProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const loaderRef = useRef<HTMLDivElement>(null);

  // Fetch projects from API
  useEffect(() => {
    const loadProjects = async () => {
      try {
        const response = await fetch("/api/projects");
        const data = await response.json();
        setProjects(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setIsLoading(false);
      }
    };

    loadProjects();
  }, []);

  // Notify parent when viewer opens/closes
  useEffect(() => {
    onViewerOpenChange?.(!!viewerProject);
  }, [viewerProject, onViewerOpenChange]);

  // Intersection Observer for scroll loader - endless animation always on
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsLoading(true);
        }
      },
      { threshold: 0.1 },
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const toggleMenu = (projectId: string, event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const position = { top: rect.bottom + 8, left: rect.right - 160 };

    if (openMenuId === projectId) {
      setOpenMenuId(null);
      setMenuPosition(null);
    } else {
      setOpenMenuId(projectId);
      setMenuPosition(position);
    }
  };

  const closeMenu = () => {
    setOpenMenuId(null);
    setMenuPosition(null);
  };

  const openViewer = (project: Project) => {
    setViewerProject(project);
    closeMenu();
  };

  const closeViewer = () => {
    setViewerProject(null);
  };

  // Close menu when clicking outside
  const handleContainerClick = (e: React.MouseEvent) => {
    if (openMenuId) {
      closeMenu();
    }
  };

  return (
    <div className="space-y-8 pt-8" onClick={handleContainerClick}>
      <h1 className="text-3xl font-bold text-center">Projects</h1>

      <div className="space-y-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="group glass rounded-[32px] overflow-hidden"
          >
            <div className="aspect-video relative overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-6 space-y-4">
              <h3 className="text-xl font-bold">{project.title}</h3>
              <p className="text-sm text-white/60 leading-relaxed">
                {project.description}
              </p>

              <button
                onClick={() => openViewer(project)}
                className="w-full bg-transparent border border-brand-accent text-brand-accent font-semibold py-3 px-6 rounded-xl hover:bg-brand-accent hover:text-black transition-colors flex items-center justify-center gap-2"
              >
                View Project
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Scroll Loader */}
      <div ref={loaderRef} className="flex items-center justify-center py-12">
        {isLoading && (
          <Loader2 size={28} className="animate-spin text-brand-accent" />
        )}
      </div>

      {/* Global dropdown menu */}
      {openMenuId && menuPosition && (
        <div
          className="fixed bg-black rounded-lg shadow-xl border border-white/20 overflow-hidden z-9999 min-w-[160px]"
          style={{
            top: `${menuPosition.top}px`,
            left: `${menuPosition.left}px`,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => {
              const project = projects.find(
                (p) => p.id.toString() === openMenuId,
              );
              if (project) openViewer(project);
            }}
            className="w-full px-4 py-3 flex items-center gap-3 text-sm text-white hover:bg-white/10 transition-colors"
          >
            <Eye size={16} />
            View
          </button>
          <button className="w-full px-4 py-3 flex items-center gap-3 text-sm text-white hover:bg-white/10 transition-colors">
            <Share2 size={16} />
            Share
          </button>
          <button className="w-full px-4 py-3 flex items-center gap-3 text-sm text-white hover:bg-white/10 transition-colors">
            <Info size={16} />
            Details
          </button>
          <button className="w-full px-4 py-3 flex items-center gap-3 text-sm text-white hover:bg-white/10 transition-colors">
            <Download size={16} />
            Download
          </button>
          <button className="w-full px-4 py-3 flex items-center gap-3 text-sm text-white hover:bg-white/10 transition-colors">
            <Play size={16} />
            Try with Bitto
          </button>
        </div>
      )}

      {/* Viewer Modal */}
      {viewerProject && (
        <Viewer initialUrl={viewerProject.image} onClose={closeViewer} />
      )}
    </div>
  );
}
