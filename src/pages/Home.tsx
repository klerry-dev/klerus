import {
  ArrowRight,
  Code,
  Palette,
  Smartphone,
  Globe,
  Zap,
  Layers,
  Star,
  MessageSquare,
  Mail,
  ExternalLink,
  Quote,
  Users,
  Search,
  Loader2,
  Heart,
  Share2,
  MoreVertical,
  Plus,
  X,
  Image as ImageIcon,
  Upload,
} from "lucide-react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

export function Home() {
  const navigate = useNavigate();
  const [isDiscoverSticky, setIsDiscoverSticky] = useState(false);
  const discoverRef = useRef<HTMLDivElement>(null);
  const [discoverHeight, setDiscoverHeight] = useState(0);
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [posts, setPosts] = useState([]);
  const [services, setServices] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastTap, setLastTap] = useState<{ [key: number]: number }>({});
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());
  const [showHeart, setShowHeart] = useState<{ [key: number]: boolean }>({});
  const [newPost, setNewPost] = useState({
    author: "",
    description: "",
    image: "",
    platform: "",
    imageFile: null,
  });

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsResponse, servicesResponse, testimonialsResponse] =
          await Promise.all([
            fetch("/api/posts"),
            fetch("/api/services"),
            fetch("/api/testimonials"),
          ]);

        const [postsData, servicesData, testimonialsData] = await Promise.all([
          postsResponse.json(),
          servicesResponse.json(),
          testimonialsResponse.json(),
        ]);

        setPosts(postsData);
        setServices(servicesData);
        setTestimonials(testimonialsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const discoverSection = document.getElementById("discover-section");
      if (discoverSection) {
        const rect = discoverSection.getBoundingClientRect();
        const sticky = rect.top <= 64; // 64px = header height + some padding
        setIsDiscoverSticky(sticky);

        // Hide/show header based on sticky state
        const header = document.querySelector("header");
        if (header) {
          header.style.transition = "opacity 0.5s ease-in-out";
          if (sticky) {
            header.style.opacity = "0";
            header.style.pointerEvents = "none";
          } else {
            header.style.opacity = "1";
            header.style.pointerEvents = "auto";
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial state
    return () => {
      window.removeEventListener("scroll", handleScroll);
      // Reset header visibility when leaving Home page
      const header = document.querySelector("header");
      if (header) {
        header.style.opacity = "1";
        header.style.pointerEvents = "auto";
      }
    };
  }, []);

  const handleExploreClick = () => {
    navigate("/projects");
  };

  const handleNewPost = () => {
    setShowNewPostModal(true);
  };

  const handleSubmitPost = () => {
    if (newPost.author && newPost.description) {
      const post = {
        id: posts.length + 1,
        author: newPost.author,
        avatar: `https://picsum.photos/seed/avatar${posts.length + 7}/40/40`,
        posted: "Just now",
        image:
          newPost.image ||
          (newPost.imageFile ?
            URL.createObjectURL(newPost.imageFile)
          : `https://picsum.photos/seed/newpost${posts.length + 1}/400/300`),
        description: newPost.description,
        since: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
        platform: newPost.platform || "Personal",
        likes: 0,
        shares: 0,
      };
      setPosts([post, ...posts]);
      setNewPost({
        author: "",
        description: "",
        image: "",
        platform: "",
        imageFile: null,
      });
      setShowNewPostModal(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewPost({ ...newPost, imageFile: file, image: "" });
    }
  };

  const handleCloseModal = () => {
    setNewPost({
      author: "",
      description: "",
      image: "",
      platform: "",
      imageFile: null,
    });
    setShowNewPostModal(false);
  };

  const handleDoubleTap = (postId: number) => {
    const now = Date.now();
    const tapInterval = 300; // 300ms between taps to consider it a double tap

    if (lastTap[postId] && now - lastTap[postId] < tapInterval) {
      // Double tap detected - check if already liked
      if (!likedPosts.has(postId)) {
        // Like the post
        setPosts(
          posts.map((post) =>
            post.id === postId ? { ...post, likes: post.likes + 1 } : post,
          ),
        );
        setLikedPosts(new Set([...likedPosts, postId]));

        // Show heart animation
        setShowHeart({ ...showHeart, [postId]: true });
        setTimeout(() => {
          setShowHeart((prev) => ({ ...prev, [postId]: false }));
        }, 1000);
      }
      setLastTap({ ...lastTap, [postId]: 0 }); // Reset tap
    } else {
      setLastTap({ ...lastTap, [postId]: now });
    }
  };

  return (
    <div className="space-y-10 pt-8">
      {/* Hero Section */}
      <section className="relative h-64 rounded-[32px] overflow-hidden group">
        <img
          src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1000"
          alt="Studio"
          className="w-full h-full object-cover transition-transform duration-700"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6 space-y-4">
          <div>
            <h1 className="text-3xl font-bold leading-tight">Welcome at</h1>
            <p className="text-sm text-white/70 font-medium">
              Klerry creative Studio
            </p>
          </div>
          <button
            onClick={handleExploreClick}
            className="bg-white text-black px-6 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 hover:bg-brand-accent transition-colors"
          >
            Explore <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* Quote */}
      <section className="text-center px-4">
        <p className="text-lg font-medium italic text-white/90">
          "Make it appear first, make it good later"
        </p>
        <p className="text-xs text-brand-accent mt-2 font-medium tracking-widest uppercase">
          ~ Reinhard Baraka
        </p>
      </section>

      {/* What I do */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold">What I do</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: Code,
              title: "Web Development",
              description:
                "Building responsive and performant web applications with modern technologies",
              color: "text-blue-400",
            },
            {
              icon: Palette,
              title: "UI/UX Design",
              description:
                "Creating intuitive and beautiful user interfaces that delight users",
              color: "text-purple-400",
            },
            {
              icon: Smartphone,
              title: "Mobile Apps",
              description:
                "Developing cross-platform mobile applications for iOS and Android",
              color: "text-green-400",
            },
          ].map((service, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -8 }}
              whileTap={{}}
              className="glass rounded-[24px] p-6 space-y-4 border border-white/5 hover:border-white/10 transition-all duration-300 group"
            >
              <div
                className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center ${service.color} group-hover:bg-white/10 transition-colors`}
              >
                <service.icon size={24} />
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-lg">{service.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  {service.description}
                </p>
              </div>
              <div className="flex items-center text-xs text-brand-accent font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Learn more <ArrowRight size={12} className="ml-1" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold">Client Testimonials</h2>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {[
            {
              name: "Sarah Johnson",
              role: "CEO, TechStart",
              content:
                "Exceptional work! Delivered our project on time and exceeded expectations. Highly recommend.",
              rating: 5,
            },
          ].map((testimonial, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="glass rounded-[24px] p-6 space-y-4 border border-white/5 hover:border-white/10 transition-all"
            >
              <Quote className="text-brand-accent/30" size={24} />
              <p className="text-sm text-white/80 leading-relaxed italic">
                "{testimonial.content}"
              </p>
              <div className="pt-4 border-t border-white/5">
                <p className="font-bold text-sm">{testimonial.name}</p>
                <p className="text-xs text-white/60">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="space-y-8">
        <div className="glass rounded-[32px] p-8 md:p-12 text-center space-y-6 border border-white/10">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Let's Work Together</h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Have a project in mind? I'd love to hear about it. Let's create
              something amazing together.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/about"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-green-500 text-green-500 bg-transparent rounded-full font-bold hover:bg-green-500 hover:text-white transition-colors"
            >
              Get in Touch
            </a>
          </div>
        </div>

        <div id="discover-section" className="text-left mt-0">
          <div style={{ height: isDiscoverSticky ? discoverHeight : 0 }} />
          <div
            ref={discoverRef}
            className={`py-12 px-6 transition-opacity duration-500 ease-in-out bg-linear-to-b from-black to-transparent rounded-lg ${isDiscoverSticky ? "fixed top-0 left-0 right-0 z-40 opacity-100" : "opacity-90"}`}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold">Discover</h2>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleNewPost}
                  className="w-8 h-8 flex items-center justify-center text-white hover:text-brand-accent transition-colors"
                >
                  <Plus size={24} />
                </button>
                <a
                  href="/search"
                  className="w-8 h-8 flex items-center justify-center text-white hover:text-brand-accent transition-colors"
                >
                  <Search size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Content Cards */}
        <div className="space-y-6">
          {posts.map((post) => (
            <motion.div
              key={post.id}
              whileHover={{ y: -3 }}
              className="glass rounded-[24px] overflow-hidden border border-white/5"
            >
              {/* Header */}
              <div className="px-4 py-3 flex items-center justify-between border-b border-white/10">
                <div className="flex items-center gap-3 flex-1">
                  <img
                    src={post.avatar}
                    alt={post.author}
                    className="w-8 h-8 rounded-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-white truncate">
                      {post.author}
                    </p>
                    <p className="text-xs text-white/50">{post.posted}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="text-xs px-3 py-1 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors font-medium">
                    Follow
                  </button>
                  <button className="w-6 h-6 flex items-center justify-center text-white/60 hover:text-white transition-colors">
                    <MoreVertical size={16} />
                  </button>
                </div>
              </div>

              {/* Cover Image */}
              <div
                className="aspect-video relative overflow-hidden"
                onTouchEnd={() => handleDoubleTap(post.id)}
              >
                <img
                  src={post.image}
                  alt={post.author}
                  className="w-full h-full object-cover transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                {/* Heart Animation */}
                {showHeart[post.id] && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <Heart
                      size={80}
                      className="text-red-500 animate-ping"
                      fill="currentColor"
                    />
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-4 py-4 space-y-3">
                <p className="text-xs text-white/70 leading-relaxed">
                  {post.description}
                </p>

                <div className="flex items-center gap-2 text-xs text-white/50">
                  <span>{post.since}</span>
                  <span>•</span>
                  <span>{post.platform}</span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/10">
                  <button className="flex items-center gap-2 text-xs text-white/60 hover:text-brand-accent transition-colors">
                    <Share2 size={14} /> {post.shares}
                  </button>
                  <button
                    className={`flex items-center gap-2 text-xs transition-colors ${
                      likedPosts.has(post.id) ? "text-white" : (
                        "text-white/60 hover:text-red-400"
                      )
                    }`}
                    onClick={() => {
                      if (!likedPosts.has(post.id)) {
                        setPosts(
                          posts.map((p) =>
                            p.id === post.id ? { ...p, likes: p.likes + 1 } : p,
                          ),
                        );
                        setLikedPosts(new Set([...likedPosts, post.id]));
                      }
                    }}
                  >
                    <Heart
                      size={14}
                      className={likedPosts.has(post.id) ? "text-red-500" : ""}
                      fill={likedPosts.has(post.id) ? "currentColor" : "none"}
                    />
                    <span className="text-white">{post.likes}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Discover Loader */}
        <div className="flex items-center justify-center py-12">
          <Loader2 size={28} className="animate-spin text-brand-accent" />
        </div>
      </section>

      {/* New Post Modal */}
      {showNewPostModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="glass rounded-[32px] p-8 max-w-lg w-full mx-4 border border-white/10 shadow-2xl overflow-y-auto max-h-[80vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">Create New Post</h3>
              <button
                onClick={handleCloseModal}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors text-white"
              >
                <X size={20} />
              </button>
            </div>

            {/* Form */}
            <div className="space-y-6">
              {/* Author Name */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  value={newPost.author}
                  onChange={(e) =>
                    setNewPost({ ...newPost, author: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-brand-accent focus:border-transparent outline-none backdrop-blur-sm"
                  placeholder="Enter your name"
                />
              </div>

              {/* Platform */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Platform
                </label>
                <input
                  type="text"
                  value={newPost.platform}
                  onChange={(e) =>
                    setNewPost({ ...newPost, platform: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-brand-accent focus:border-transparent outline-none backdrop-blur-sm"
                  placeholder="e.g., Personal, Company, Blog"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Description
                </label>
                <textarea
                  value={newPost.description}
                  onChange={(e) =>
                    setNewPost({ ...newPost, description: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-brand-accent focus:border-transparent outline-none resize-none backdrop-blur-sm"
                  rows={4}
                  placeholder="What's on your mind?"
                />
              </div>

              {/* Cover Image */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Cover
                </label>
                <div className="space-y-3">
                  {/* File Upload */}
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="flex items-center gap-3 px-4 py-3 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition-colors cursor-pointer backdrop-blur-sm"
                    >
                      <Upload size={20} className="text-white/80" />
                      <span className="text-white/80">
                        {newPost.imageFile ?
                          newPost.imageFile.name
                        : "Choose image file"}
                      </span>
                    </label>
                  </div>

                  {/* OR URL Input */}
                  <div className="flex items-center gap-2 text-white/60 text-sm">
                    <span>or</span>
                  </div>
                  <input
                    type="url"
                    value={newPost.image}
                    onChange={(e) =>
                      setNewPost({
                        ...newPost,
                        image: e.target.value,
                        imageFile: null,
                      })
                    }
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-brand-accent focus:border-transparent outline-none backdrop-blur-sm"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>

              {/* Image Preview */}
              {(newPost.imageFile || newPost.image) && (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-white/80">
                    Image Preview:
                  </p>
                  <div className="aspect-video relative overflow-hidden rounded-xl border border-white/20">
                    <img
                      src={
                        newPost.imageFile ?
                          URL.createObjectURL(newPost.imageFile)
                        : newPost.image
                      }
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}

              {/* Post Preview */}
              {newPost.description && (
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <p className="text-sm font-medium text-white/80 mb-3">
                    Post Preview:
                  </p>
                  <div className="bg-white/10 rounded-lg p-3 border border-white/20 backdrop-blur-sm">
                    <p className="text-sm font-medium text-white mb-1">
                      {newPost.author || "Anonymous"}
                    </p>
                    <p className="text-sm text-white/80">
                      {newPost.description}
                    </p>
                    {newPost.platform && (
                      <p className="text-xs text-white/60 mt-2">
                        {newPost.platform}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleCloseModal}
                  className="flex-1 px-6 py-3 bg-white/10 border border-white/20 rounded-xl text-white hover:bg-white/20 transition-colors font-medium backdrop-blur-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitPost}
                  disabled={!newPost.author || !newPost.description}
                  className="flex-1 px-6 py-3 bg-brand-accent text-black rounded-xl hover:bg-white transition-colors font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Post
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
