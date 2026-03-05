import { motion } from "motion/react";
import {
  ArrowLeft,
  FileText,
  Inbox,
  Calendar,
  Filter,
  Download,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Reports() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pt-32 pb-32 px-6 bg-brand-black">
      <div className="max-w-4xl mx-auto">
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
                  <FileText size={20} className="text-white/80" />
                </div>
                <h1 className="text-3xl font-bold text-white">Reports</h1>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors text-white/70">
                <Calendar size={16} />
                Date Range
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors text-white/70">
                <Filter size={16} />
                Filter
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors text-white/70">
                <Download size={16} />
                Export
              </button>
            </div>
          </div>

          {/* No Reports Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <div className="w-24 h-24 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mb-6">
              <Inbox size={40} className="text-white/40" />
            </div>

            <h2 className="text-2xl font-semibold text-white mb-3">
              No new reports
            </h2>
            <p className="text-white/60 text-center max-w-md mb-8">
              There are no new reports available at this time. Reports will
              appear here when they are generated or when new data is available.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-6 py-3 bg-brand-accent text-brand-black rounded-lg hover:bg-brand-accent/90 transition-colors font-medium">
                Generate Report
              </button>
              <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors text-white font-medium">
                Schedule Report
              </button>
            </div>
          </motion.div>

          {/* Report Types Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12"
          >
            <h3 className="text-lg font-semibold text-white mb-6">
              Available Report Types
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  title: "Sales Report",
                  description: "Detailed sales analytics and revenue data",
                  icon: "📊",
                },
                {
                  title: "User Report",
                  description: "User activity and engagement metrics",
                  icon: "👥",
                },
                {
                  title: "Inventory Report",
                  description: "Stock levels and product performance",
                  icon: "📦",
                },
                {
                  title: "Financial Report",
                  description: "Revenue, expenses, and profit analysis",
                  icon: "💰",
                },
                {
                  title: "Performance Report",
                  description: "System performance and uptime metrics",
                  icon: "⚡",
                },
                {
                  title: "Custom Report",
                  description: "Tailored reports based on your needs",
                  icon: "🎯",
                },
              ].map((report, index) => (
                <motion.div
                  key={report.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{report.icon}</span>
                    <h4 className="text-white font-medium">{report.title}</h4>
                  </div>
                  <p className="text-white/60 text-sm">{report.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-12"
          >
            <h3 className="text-lg font-semibold text-white mb-6">
              Recent Activity
            </h3>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <div>
                      <p className="text-white font-medium">
                        Monthly report generated
                      </p>
                      <p className="text-white/60 text-sm">Last month</p>
                    </div>
                  </div>
                  <span className="text-white/40 text-sm">30 days ago</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <div>
                      <p className="text-white font-medium">
                        Quarterly analysis completed
                      </p>
                      <p className="text-white/60 text-sm">Q4 2025</p>
                    </div>
                  </div>
                  <span className="text-white/40 text-sm">90 days ago</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <div>
                      <p className="text-white font-medium">
                        Annual summary published
                      </p>
                      <p className="text-white/60 text-sm">2025 Year End</p>
                    </div>
                  </div>
                  <span className="text-white/40 text-sm">1 year ago</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
