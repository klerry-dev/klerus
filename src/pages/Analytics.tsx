import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  ArrowLeft,
  TrendingUp,
  Users,
  ShoppingCart,
  Eye,
  DollarSign,
  Calendar,
  BarChart3,
  PieChart,
  Activity,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface AnalyticsData {
  totalViews: number;
  totalUsers: number;
  totalSales: number;
  totalRevenue: number;
  conversionRate: number;
  avgOrderValue: number;
  dailyViews: number[];
  monthlyRevenue: number[];
  topProducts: Array<{
    name: string;
    sales: number;
    revenue: number;
  }>;
  userGrowth: Array<{
    date: string;
    users: number;
  }>;
}

export function Analytics() {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d">("30d");
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalViews: 15420,
    totalUsers: 3284,
    totalSales: 892,
    totalRevenue: 45680,
    conversionRate: 5.8,
    avgOrderValue: 51.2,
    dailyViews: [
      420, 380, 510, 490, 520, 480, 550, 590, 610, 580, 620, 590, 640, 680, 650,
      690, 720, 750, 780, 810, 840, 870, 900, 930, 960, 990, 1020, 1050, 1080,
      1110, 1140,
    ],
    monthlyRevenue: [
      12000, 15000, 18000, 22000, 25000, 28000, 32000, 35000, 38000, 42000,
      45000, 45680,
    ],
    topProducts: [
      { name: "Minimalist Desk Lamp", sales: 156, revenue: 14044 },
      { name: "Ergonomic Chair", sales: 89, revenue: 26611 },
      { name: "Mechanical Keyboard", sales: 234, revenue: 35100 },
      { name: "Studio Headphones", sales: 178, revenue: 35582 },
    ],
    userGrowth: [
      { date: "Jan", users: 1200 },
      { date: "Feb", users: 1580 },
      { date: "Mar", users: 2100 },
      { date: "Apr", users: 2680 },
      { date: "May", users: 3284 },
    ],
  });

  const statCards = [
    {
      title: "Total Views",
      value: analytics.totalViews.toLocaleString(),
      change: "+12.5%",
      icon: Eye,
      color: "text-blue-400",
      bgColor: "bg-blue-400/10",
    },
    {
      title: "Total Users",
      value: analytics.totalUsers.toLocaleString(),
      change: "+8.2%",
      icon: Users,
      color: "text-green-400",
      bgColor: "bg-green-400/10",
    },
    {
      title: "Total Sales",
      value: analytics.totalSales.toLocaleString(),
      change: "+15.3%",
      icon: ShoppingCart,
      color: "text-purple-400",
      bgColor: "bg-purple-400/10",
    },
    {
      title: "Total Revenue",
      value: `$${analytics.totalRevenue.toLocaleString()}`,
      change: "+18.7%",
      icon: DollarSign,
      color: "text-yellow-400",
      bgColor: "bg-yellow-400/10",
    },
  ];

  return (
    <div className="min-h-screen pt-32 pb-32 px-6 bg-brand-black">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors"
              >
                <ArrowLeft size={20} className="text-white/80" />
              </button>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/5 border border-white/10 rounded-lg">
                  <BarChart3 size={20} className="text-white/80" />
                </div>
                <h1 className="text-3xl font-bold text-white">
                  Analytics Dashboard
                </h1>
              </div>
            </div>

            {/* Time Range Selector */}
            <div className="flex gap-2">
              {["7d", "30d", "90d"].map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range as "7d" | "30d" | "90d")}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    timeRange === range ?
                      "bg-brand-accent text-brand-black"
                    : "bg-white/5 text-white/70 hover:bg-white/10"
                  }`}
                >
                  {range === "7d" ?
                    "7 Days"
                  : range === "30d" ?
                    "30 Days"
                  : "90 Days"}
                </button>
              ))}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statCards.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white/5 border border-white/10 rounded-xl p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                      <Icon size={20} className={stat.color} />
                    </div>
                    <span className="text-green-400 text-sm font-medium">
                      {stat.change}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1">
                    {stat.value}
                  </h3>
                  <p className="text-white/60 text-sm">{stat.title}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Daily Views Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white/5 border border-white/10 rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">
                  Daily Views
                </h2>
                <Activity size={20} className="text-white/60" />
              </div>
              <div className="h-64 flex items-end justify-between gap-2">
                {analytics.dailyViews.slice(-30).map((value, index) => (
                  <div
                    key={index}
                    className="flex-1 bg-blue-400/20 rounded-t"
                    style={{
                      height: `${(value / Math.max(...analytics.dailyViews)) * 100}%`,
                    }}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-2 text-xs text-white/40">
                <span>Day 1</span>
                <span>Day 30</span>
              </div>
            </motion.div>

            {/* Revenue Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-white/5 border border-white/10 rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">
                  Monthly Revenue
                </h2>
                <TrendingUp size={20} className="text-white/60" />
              </div>
              <div className="h-64 flex items-end justify-between gap-2">
                {analytics.monthlyRevenue.map((value, index) => (
                  <div
                    key={index}
                    className="flex-1 bg-green-400/20 rounded-t"
                    style={{
                      height: `${(value / Math.max(...analytics.monthlyRevenue)) * 100}%`,
                    }}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-2 text-xs text-white/40">
                <span>Jan</span>
                <span>Dec</span>
              </div>
            </motion.div>
          </div>

          {/* Additional Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Conversion Rate */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-white/5 border border-white/10 rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-400/10 rounded-lg">
                  <PieChart size={20} className="text-purple-400" />
                </div>
                <h2 className="text-xl font-semibold text-white">
                  Conversion Rate
                </h2>
              </div>
              <div className="text-3xl font-bold text-white mb-2">
                {analytics.conversionRate}%
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div
                  className="bg-purple-400 h-2 rounded-full"
                  style={{ width: `${analytics.conversionRate * 10}%` }}
                />
              </div>
            </motion.div>

            {/* Average Order Value */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="bg-white/5 border border-white/10 rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-yellow-400/10 rounded-lg">
                  <DollarSign size={20} className="text-yellow-400" />
                </div>
                <h2 className="text-xl font-semibold text-white">
                  Avg Order Value
                </h2>
              </div>
              <div className="text-3xl font-bold text-white mb-2">
                ${analytics.avgOrderValue}
              </div>
              <p className="text-white/60 text-sm">Per transaction</p>
            </motion.div>

            {/* User Growth */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="bg-white/5 border border-white/10 rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-400/10 rounded-lg">
                  <Users size={20} className="text-green-400" />
                </div>
                <h2 className="text-xl font-semibold text-white">
                  User Growth
                </h2>
              </div>
              <div className="space-y-2">
                {analytics.userGrowth.map((month, index) => (
                  <div
                    key={month.date}
                    className="flex justify-between text-sm"
                  >
                    <span className="text-white/60">{month.date}</span>
                    <span className="text-white font-medium">
                      {month.users.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Top Products */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="bg-white/5 border border-white/10 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Top Products</h2>
              <ShoppingCart size={20} className="text-white/60" />
            </div>
            <div className="space-y-4">
              {analytics.topProducts.map((product, index) => (
                <div
                  key={product.name}
                  className="flex items-center justify-between p-4 bg-white/5 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-brand-accent/20 rounded-full flex items-center justify-center text-brand-accent text-sm font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-white font-medium">{product.name}</h3>
                      <p className="text-white/60 text-sm">
                        {product.sales} sales
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-medium">
                      ${product.revenue.toLocaleString()}
                    </p>
                    <p className="text-white/60 text-sm">revenue</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
