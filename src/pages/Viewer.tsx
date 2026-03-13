import { Viewer } from "../components/Viewer";
import type { Database } from "../lib/supabase";

type Project = Database["public"]["Tables"]["projects"]["Row"];

export function ViewerPage() {
  // Mock project data for demonstration
  const mockProject: Project = {
    id: 1,
    title: "Sample Project",
    description: "This is a sample project for demonstration purposes.",
    image: "https://picsum.photos/seed/project/800/600",
    category: "Web Development",
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    github_url: "https://github.com/example",
    live_url: "https://example.com",
    featured: true,
    display_order: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  return <Viewer project={mockProject} onClose={() => {}} />;
}
