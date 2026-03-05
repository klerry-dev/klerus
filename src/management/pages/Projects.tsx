import React, { useState } from "react";
import { PROJECTS } from "../../constants";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  status: "active" | "inactive";
}

export const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(
    PROJECTS.map((p) => ({ ...p, status: "active" as const })),
  );
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    status: "active" as "active" | "inactive",
  });

  const handleAddProject = () => {
    setIsAddingProject(true);
    setFormData({ title: "", description: "", image: "", status: "active" });
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      image: project.image,
      status: project.status,
    });
  };

  const handleDeleteProject = (projectId: string) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      setProjects(projects.filter((p) => p.id !== projectId));
    }
  };

  const handleSaveProject = () => {
    if (!formData.title.trim()) return;

    if (editingProject) {
      // Update existing project
      setProjects(
        projects.map((p) =>
          p.id === editingProject.id ? { ...p, ...formData } : p,
        ),
      );
      setEditingProject(null);
    } else {
      // Add new project
      const newProject: Project = {
        id: `project-${Date.now()}`,
        ...formData,
      };
      setProjects([...projects, newProject]);
      setIsAddingProject(false);
    }

    setFormData({ title: "", description: "", image: "", status: "active" });
  };

  const handleCancel = () => {
    setIsAddingProject(false);
    setEditingProject(null);
    setFormData({ title: "", description: "", image: "", status: "active" });
  };

  const handleExportProjects = () => {
    const dataStr = JSON.stringify(projects, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
    const exportFileDefaultName = "projects.json";
    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  const handleVisitProject = (projectId: string) => {
    window.open(`/projects`, "_blank");
  };

  return (
    <div className="projects-page">
      <h1>Project Management</h1>
      <div className="projects-actions">
        <button className="btn btn-primary" onClick={handleAddProject}>
          Add New Project
        </button>
        <button className="btn btn-secondary" onClick={handleExportProjects}>
          Export Projects
        </button>
      </div>

      {/* Add/Edit Project Form */}
      {(isAddingProject || editingProject) && (
        <div className="project-form">
          <h3>{editingProject ? "Edit Project" : "Add New Project"}</h3>
          <div className="form-group">
            <label>Project Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Enter project title"
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Enter project description"
              rows={3}
            />
          </div>
          <div className="form-group">
            <label>Image URL</label>
            <input
              type="text"
              value={formData.image}
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.value })
              }
              placeholder="Enter image URL"
            />
          </div>
          <div className="form-group">
            <label>
              <input
                type="checkbox"
                checked={formData.status === "active"}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    status: e.target.checked ? "active" : "inactive",
                  })
                }
              />
              Active
            </label>
          </div>
          <div className="form-actions">
            <button className="btn btn-primary" onClick={handleSaveProject}>
              {editingProject ? "Update" : "Save"}
            </button>
            <button className="btn btn-secondary" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="projects-grid">
        {projects.map((project) => (
          <div key={project.id} className="project-card">
            <div className="project-image">
              <img
                src={project.image}
                alt={project.title}
                className="project-thumbnail"
              />
            </div>
            <div className="project-info">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <div className="project-meta">
                <span className="project-id">ID: {project.id}</span>
                <span className={`project-status ${project.status}`}>
                  {project.status}
                </span>
              </div>
              <div className="project-actions">
                <button
                  className="btn btn-sm"
                  onClick={() => handleEditProject(project)}
                >
                  Edit
                </button>
                <button className="btn btn-sm">View</button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDeleteProject(project.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
