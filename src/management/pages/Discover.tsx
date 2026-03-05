import React, { useState, useEffect } from "react";
import {
  TrendingUp,
  Users,
  MessageSquare,
  Heart,
  Share2,
  Eye,
  Filter,
  Search,
  Calendar,
  BarChart3,
} from "lucide-react";

interface Post {
  id: number;
  author: string;
  avatar: string;
  posted: string;
  image: string;
  description: string;
  since: string;
  platform: string;
  likes: number;
  shares: number;
  followers: number;
}

interface DiscoverStats {
  totalPosts: number;
  totalLikes: number;
  totalShares: number;
  totalFollowers: number;
  avgEngagement: number;
}

export function Discover() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [stats, setStats] = useState<DiscoverStats>({
    totalPosts: 0,
    totalLikes: 0,
    totalShares: 0,
    totalFollowers: 0,
    avgEngagement: 0,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("all");
  const [selectedTimeRange, setSelectedTimeRange] = useState("all");

  // Simulate fetching posts data (same as Home page)
  useEffect(() => {
    // Mock posts data similar to Home page
    const mockPosts: Post[] = [
      {
        id: 1,
        author: "Sarah Chen",
        avatar: "https://picsum.photos/seed/avatar1/40/40",
        posted: "2 hours ago",
        image: "https://picsum.photos/seed/news/400/300",
        description:
          "Just launched our new design system. Excited to share it with the community!",
        since: "Mar 4, 2026",
        platform: "Creative Studio",
        likes: 234,
        shares: 45,
        followers: 1250,
      },
      {
        id: 2,
        author: "Alex Rivera",
        avatar: "https://picsum.photos/seed/avatar2/40/40",
        posted: "5 hours ago",
        image: "https://picsum.photos/seed/project2/400/300",
        description:
          "Working on something amazing. Can't wait to show you all the details!",
        since: "Mar 4, 2026",
        platform: "Personal",
        likes: 189,
        shares: 23,
        followers: 890,
      },
      {
        id: 3,
        author: "Jordan Kim",
        avatar: "https://picsum.photos/seed/avatar3/40/40",
        posted: "1 day ago",
        image: "https://picsum.photos/seed/design3/400/300",
        description:
          "New UI concept for a mobile app. What do you think about the color palette?",
        since: "Mar 3, 2026",
        platform: "Design",
        likes: 456,
        shares: 78,
        followers: 2340,
      },
      {
        id: 4,
        author: "Maya Patel",
        avatar: "https://picsum.photos/seed/avatar4/40/40",
        posted: "2 days ago",
        image: "https://picsum.photos/seed/tech4/400/300",
        description:
          "Finally finished the backend API. Documentation is next on the list!",
        since: "Mar 2, 2026",
        platform: "Development",
        likes: 312,
        shares: 56,
        followers: 1560,
      },
      {
        id: 5,
        author: "Chris Johnson",
        avatar: "https://picsum.photos/seed/avatar5/40/40",
        posted: "3 days ago",
        image: "https://picsum.photos/seed/art5/400/300",
        description:
          "Experimenting with new illustration techniques. This one was inspired by nature.",
        since: "Mar 1, 2026",
        platform: "Art",
        likes: 567,
        shares: 89,
        followers: 3210,
      },
    ];

    setPosts(mockPosts);

    // Calculate stats
    const totalLikes = mockPosts.reduce((sum, post) => sum + post.likes, 0);
    const totalShares = mockPosts.reduce((sum, post) => sum + post.shares, 0);
    const totalFollowers = mockPosts.reduce(
      (sum, post) => sum + post.followers,
      0,
    );
    const avgEngagement =
      mockPosts.length > 0 ?
        Math.round((totalLikes + totalShares) / mockPosts.length / 10)
      : 0;

    setStats({
      totalPosts: mockPosts.length,
      totalLikes,
      totalShares,
      totalFollowers,
      avgEngagement,
    });
  }, []);

  const platforms = [
    "all",
    "Creative Studio",
    "Personal",
    "Design",
    "Development",
    "Art",
  ];
  const timeRanges = ["all", "today", "week", "month"];

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlatform =
      selectedPlatform === "all" || post.platform === selectedPlatform;
    return matchesSearch && matchesPlatform;
  });

  const handleDeletePost = (id: number) => {
    if (confirm("Are you sure you want to delete this post?")) {
      const updatedPosts = posts.filter((post) => post.id !== id);
      setPosts(updatedPosts);

      // Recalculate stats
      const totalLikes = updatedPosts.reduce(
        (sum, post) => sum + post.likes,
        0,
      );
      const totalShares = updatedPosts.reduce(
        (sum, post) => sum + post.shares,
        0,
      );
      const totalFollowers = updatedPosts.reduce(
        (sum, post) => sum + post.followers,
        0,
      );
      const avgEngagement =
        updatedPosts.length > 0 ?
          Math.round((totalLikes + totalShares) / updatedPosts.length / 10)
        : 0;

      setStats({
        totalPosts: updatedPosts.length,
        totalLikes,
        totalShares,
        totalFollowers,
        avgEngagement,
      });
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Discover Management
          </h1>
          <p className="text-gray-600">
            Manage content from the main discover section
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <MessageSquare size={20} className="text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {stats.totalPosts}
            </span>
          </div>
          <p className="text-gray-600 text-sm">Total Posts</p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-green-100 rounded-lg">
              <Heart size={20} className="text-green-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {stats.totalLikes.toLocaleString()}
            </span>
          </div>
          <p className="text-gray-600 text-sm">Total Likes</p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Share2 size={20} className="text-purple-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {stats.totalShares.toLocaleString()}
            </span>
          </div>
          <p className="text-gray-600 text-sm">Total Shares</p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-orange-100 rounded-lg">
              <TrendingUp size={20} className="text-orange-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {stats.avgEngagement}%
            </span>
          </div>
          <p className="text-gray-600 text-sm">Avg Engagement</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search
            size={20}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <select
          value={selectedPlatform}
          onChange={(e) => setSelectedPlatform(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {platforms.map((platform) => (
            <option key={platform} value={platform}>
              {platform.charAt(0).toUpperCase() + platform.slice(1)}
            </option>
          ))}
        </select>

        <select
          value={selectedTimeRange}
          onChange={(e) => setSelectedTimeRange(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {timeRanges.map((range) => (
            <option key={range} value={range}>
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow"
          >
            {/* Header */}
            <div className="px-4 py-3 flex items-center justify-between border-b border-gray-200">
              <div className="flex items-center gap-3 flex-1">
                <img
                  src={post.avatar}
                  alt={post.author}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {post.author}
                  </p>
                  <p className="text-xs text-gray-500">{post.posted}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                  {post.platform}
                </span>
                <button
                  onClick={() => handleDeletePost(post.id)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <Eye size={16} />
                </button>
              </div>
            </div>

            {/* Image */}
            <div className="h-48 bg-gray-200">
              <img
                src={post.image}
                alt={post.description}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-4">
              <p className="text-gray-700 text-sm mb-4 line-clamp-2">
                {post.description}
              </p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{post.since}</span>
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-1 text-gray-500 hover:text-red-500 transition-colors">
                    <Heart size={16} />
                    <span>{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-1 text-gray-500 hover:text-blue-500 transition-colors">
                    <Share2 size={16} />
                    <span>{post.shares}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageSquare size={32} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No posts found
          </h3>
          <p className="text-gray-600">
            {searchTerm || selectedPlatform !== "all" ?
              "Try adjusting your search or filters"
            : "No posts available at this time"}
          </p>
        </div>
      )}
    </div>
  );
}
