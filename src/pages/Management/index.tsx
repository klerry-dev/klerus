import { useState, useEffect } from "react";
import {
  FileText,
  FolderOpen,
  ShoppingBag,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  Eye,
  EyeOff,
  Save,
  X,
  Upload,
  Image as ImageIcon,
  Link,
  Tag,
  Calendar,
  User,
  MessageSquare,
  Heart,
  Share2,
  Loader2,
} from "lucide-react";
import { motion } from "motion/react";
import type { Database } from "../../lib/supabase";

type Post = Database["public"]["Tables"]["posts"]["Row"];
type Project = Database["public"]["Tables"]["projects"]["Row"];
type Product = Database["public"]["Tables"]["shop_products"]["Row"];

export function Management() {
  const [activeTab, setActiveTab] = useState<"posts" | "projects" | "products">(
    "posts",
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingItem, setEditingItem] = useState<
    Post | Project | Product | null
  >(null);
  const [items, setItems] = useState<Post[] | Project[] | Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch data based on active tab
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const endpoint =
          activeTab === "posts" ? "/api/posts"
          : activeTab === "projects" ? "/api/projects"
          : "/api/shop-products";

        const response = await fetch(endpoint);
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error(`Error fetching ${activeTab}:`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTab]);

  const tabs = [
    { id: "posts", label: "Posts", icon: FileText, count: 0 },
    { id: "projects", label: "Projects", icon: FolderOpen, count: 0 },
    { id: "products", label: "Products", icon: ShoppingBag, count: 0 },
  ];

  const handleCreate = () => {
    setEditingItem(null);
    setShowCreateModal(true);
  };

  const handleEdit = (item: Post | Project | Product) => {
    setEditingItem(item);
    setShowCreateModal(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        const endpoint =
          activeTab === "posts" ? `/api/posts?id=${id}`
          : activeTab === "projects" ? `/api/projects?id=${id}`
          : `/api/shop-products?id=${id}`;

        await fetch(endpoint, { method: "DELETE" });

        // Refresh data
        const fetchEndpoint =
          activeTab === "posts" ? "/api/posts"
          : activeTab === "projects" ? "/api/projects"
          : "/api/shop-products";
        const response = await fetch(fetchEndpoint);
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    }
  };

  const handleSave = async (item: Post | Project | Product) => {
    try {
      const endpoint =
        activeTab === "posts" ? "/api/posts"
        : activeTab === "projects" ? "/api/projects"
        : "/api/shop-products";

      const method = editingItem ? "PUT" : "POST";
      const payload = editingItem ? { ...item, id: editingItem.id } : item;

      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const savedItem = await response.json();

      // Refresh data
      const fetchEndpoint =
        activeTab === "posts" ? "/api/posts"
        : activeTab === "projects" ? "/api/projects"
        : "/api/shop-products";
      const fetchResponse = await fetch(fetchEndpoint);
      const data = await fetchResponse.json();
      setItems(data);

      setShowCreateModal(false);
      setEditingItem(null);
    } catch (error) {
      console.error("Error saving item:", error);
    }
  };

  return (
    <div className="min-h-screen bg-brand-black pt-8">
      <div className="max-w-7xl mx-auto px-4 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Management</h1>
            <p className="text-white/60">
              Manage your content, projects, and products
            </p>
          </div>
          <button
            onClick={handleCreate}
            className="flex items-center gap-2 px-6 py-3 bg-brand-accent text-black rounded-xl font-bold hover:bg-white transition-colors"
          >
            <Plus size={20} />
            Create New
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 p-1 bg-white/5 rounded-xl backdrop-blur-sm">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-3 px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === tab.id ?
                  "bg-brand-accent text-black"
                : "text-white/60 hover:text-white hover:bg-white/10"
              }`}
            >
              <tab.icon size={18} />
              <span>{tab.label}</span>
              {tab.count > 0 && (
                <span className="px-2 py-1 bg-black/20 rounded-full text-xs">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Search and Filter */}
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
              size={20}
            />
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-brand-accent focus:border-transparent outline-none backdrop-blur-sm"
            />
          </div>
          <button className="p-3 bg-white/10 border border-white/20 rounded-xl text-white hover:bg-white/20 transition-colors">
            <Filter size={20} />
          </button>
        </div>

        {/* Content Area */}
        <div className="bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
          {loading ?
            <div className="flex items-center justify-center py-12">
              <Loader2 size={32} className="animate-spin text-brand-accent" />
            </div>
          : <>
              {activeTab === "posts" && (
                <PostsManagement
                  items={items as Post[]}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  searchTerm={searchTerm}
                />
              )}
              {activeTab === "projects" && (
                <ProjectsManagement
                  items={items as Project[]}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  searchTerm={searchTerm}
                />
              )}
              {activeTab === "products" && (
                <ProductsManagement
                  items={items as Product[]}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  searchTerm={searchTerm}
                />
              )}
            </>
          }
        </div>

        {/* Create/Edit Modal */}
        {showCreateModal && (
          <CreateEditModal
            type={activeTab}
            item={editingItem}
            onClose={() => {
              setShowCreateModal(false);
              setEditingItem(null);
            }}
            onSave={handleSave}
          />
        )}
      </div>
    </div>
  );
}

// Posts Management Component
function PostsManagement({
  items,
  onEdit,
  onDelete,
  searchTerm,
}: {
  items: Post[];
  onEdit: (item: Post) => void;
  onDelete: (id: number) => void;
  searchTerm: string;
}) {
  const filteredItems = items.filter(
    (item) =>
      item.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.platform.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="p-6">
      <div className="space-y-4">
        {filteredItems.map((post) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-white/20 transition-colors"
          >
            <div className="flex items-start gap-4">
              <img
                src={post.avatar}
                alt={post.author}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-white mb-1">
                      {post.author}
                    </h3>
                    <p className="text-sm text-white/60 mb-2 line-clamp-2">
                      {post.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-white/40">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {post.since}
                      </span>
                      <span className="flex items-center gap-1">
                        <Tag size={12} />
                        {post.platform}
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart size={12} />
                        {post.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <Share2 size={12} />
                        {post.shares}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => onEdit(post)}
                      className="p-2 text-white/60 hover:text-brand-accent hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => onDelete(post.id)}
                      className="p-2 text-white/60 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <FileText className="mx-auto text-white/20 mb-4" size={48} />
            <p className="text-white/60">No posts found</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Projects Management Component
function ProjectsManagement({
  items,
  onEdit,
  onDelete,
  searchTerm,
}: {
  items: Project[];
  onEdit: (item: Project) => void;
  onDelete: (id: number) => void;
  searchTerm: string;
}) {
  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((project) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition-colors"
          >
            <div className="aspect-video relative">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              {project.featured && (
                <div className="absolute top-2 right-2 px-2 py-1 bg-brand-accent text-black text-xs font-bold rounded">
                  Featured
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-white mb-2">{project.title}</h3>
              <p className="text-sm text-white/60 mb-3 line-clamp-2">
                {project.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/40 bg-white/10 px-2 py-1 rounded">
                  {project.category}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onEdit(project)}
                    className="p-2 text-white/60 hover:text-brand-accent hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => onDelete(project.id)}
                    className="p-2 text-white/60 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
        {filteredItems.length === 0 && (
          <div className="col-span-full text-center py-12">
            <FolderOpen className="mx-auto text-white/20 mb-4" size={48} />
            <p className="text-white/60">No projects found</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Products Management Component
function ProductsManagement({
  items,
  onEdit,
  onDelete,
  searchTerm,
}: {
  items: Product[];
  onEdit: (item: Product) => void;
  onDelete: (id: number) => void;
  searchTerm: string;
}) {
  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredItems.map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition-colors"
          >
            <div className="aspect-3/4 relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {!product.in_stock && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <span className="text-white font-bold">Out of Stock</span>
                </div>
              )}
              {product.featured && (
                <div className="absolute top-2 right-2 px-2 py-1 bg-brand-accent text-black text-xs font-bold rounded">
                  Featured
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-white mb-2">{product.name}</h3>
              <p className="text-lg font-bold text-brand-accent mb-3">
                ${product.price.toFixed(2)}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/40 bg-white/10 px-2 py-1 rounded">
                  {product.category}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onEdit(product)}
                    className="p-2 text-white/60 hover:text-brand-accent hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => onDelete(product.id)}
                    className="p-2 text-white/60 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
        {filteredItems.length === 0 && (
          <div className="col-span-full text-center py-12">
            <ShoppingBag className="mx-auto text-white/20 mb-4" size={48} />
            <p className="text-white/60">No products found</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Create/Edit Modal Component
function CreateEditModal({
  type,
  item,
  onClose,
  onSave,
}: {
  type: "posts" | "projects" | "products";
  item: Post | Project | Product | null;
  onClose: () => void;
  onSave: (item: Post | Project | Product) => void;
}) {
  const [formData, setFormData] = useState<any>(() => {
    if (item) return { ...item };

    // Default values based on type
    if (type === "posts") {
      return {
        author: "",
        description: "",
        image: "",
        platform: "",
        likes: 0,
        shares: 0,
        followers: 0,
      };
    } else if (type === "projects") {
      return {
        title: "",
        description: "",
        image: "",
        category: "",
        technologies: [],
        github_url: "",
        live_url: "",
        featured: false,
        display_order: 0,
      };
    } else {
      return {
        name: "",
        description: "",
        price: 0,
        image: "",
        category: "",
        in_stock: true,
        featured: false,
        tags: [],
        display_order: 0,
      };
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const renderForm = () => {
    switch (type) {
      case "posts":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Author
              </label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) =>
                  setFormData({ ...formData, author: e.target.value })
                }
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-brand-accent focus:border-transparent outline-none"
                placeholder="Author name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-brand-accent focus:border-transparent outline-none resize-none"
                rows={4}
                placeholder="Post description"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Platform
              </label>
              <input
                type="text"
                value={formData.platform}
                onChange={(e) =>
                  setFormData({ ...formData, platform: e.target.value })
                }
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-brand-accent focus:border-transparent outline-none"
                placeholder="Platform (e.g., Personal, Company)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Image URL
              </label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-brand-accent focus:border-transparent outline-none"
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>
        );
      case "projects":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-brand-accent focus:border-transparent outline-none"
                placeholder="Project title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-brand-accent focus:border-transparent outline-none resize-none"
                rows={4}
                placeholder="Project description"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Category
              </label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-brand-accent focus:border-transparent outline-none"
                placeholder="Category"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Image URL
              </label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-brand-accent focus:border-transparent outline-none"
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-white/80">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) =>
                    setFormData({ ...formData, featured: e.target.checked })
                  }
                  className="rounded"
                />
                Featured
              </label>
            </div>
          </div>
        );
      case "products":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-brand-accent focus:border-transparent outline-none"
                placeholder="Product name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-brand-accent focus:border-transparent outline-none resize-none"
                rows={4}
                placeholder="Product description"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Price
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    price: parseFloat(e.target.value),
                  })
                }
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-brand-accent focus:border-transparent outline-none"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Category
              </label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-brand-accent focus:border-transparent outline-none"
                placeholder="Category"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Image URL
              </label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-brand-accent focus:border-transparent outline-none"
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-white/80">
                <input
                  type="checkbox"
                  checked={formData.in_stock}
                  onChange={(e) =>
                    setFormData({ ...formData, in_stock: e.target.checked })
                  }
                  className="rounded"
                />
                In Stock
              </label>
              <label className="flex items-center gap-2 text-white/80">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) =>
                    setFormData({ ...formData, featured: e.target.checked })
                  }
                  className="rounded"
                />
                Featured
              </label>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/10"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">
            {item ?
              `Edit ${type.slice(0, -1)}`
            : `Create New ${type.slice(0, -1)}`}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {renderForm()}

          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-white/10 border border-white/20 rounded-xl text-white hover:bg-white/20 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-brand-accent text-black rounded-xl hover:bg-white transition-colors font-bold"
            >
              {item ? "Save Changes" : "Create"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
