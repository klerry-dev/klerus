import { motion } from "motion/react";
import {
  ArrowLeft,
  FileText,
  Shield,
  Users,
  CreditCard,
  AlertTriangle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Terms() {
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
          <div className="flex items-center gap-4 mb-8">
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
              <h1 className="text-3xl font-bold text-white">
                Terms of Service
              </h1>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            {/* Introduction */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white/5 border border-white/10 rounded-xl p-6"
            >
              <h2 className="text-xl font-semibold text-white mb-4">
                1. Introduction
              </h2>
              <p className="text-white/70 leading-relaxed">
                Welcome to our platform. These Terms of Service govern your use
                of our services and outline the rules and responsibilities for
                all users of our application. By accessing or using our service,
                you agree to be bound by these terms.
              </p>
            </motion.section>

            {/* User Responsibilities */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white/5 border border-white/10 rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <Users size={20} className="text-blue-400" />
                <h2 className="text-xl font-semibold text-white">
                  2. User Responsibilities
                </h2>
              </div>
              <ul className="space-y-3 text-white/70">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 shrink-0"></span>
                  <span>
                    You must be at least 18 years old to use this service
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 shrink-0"></span>
                  <span>
                    You are responsible for maintaining the confidentiality of
                    your account credentials
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 shrink-0"></span>
                  <span>
                    You must not use the service for any illegal or unauthorized
                    purposes
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 shrink-0"></span>
                  <span>
                    You agree not to interfere with or disrupt the service or
                    servers
                  </span>
                </li>
              </ul>
            </motion.section>

            {/* Privacy & Data Protection */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white/5 border border-white/10 rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <Shield size={20} className="text-green-400" />
                <h2 className="text-xl font-semibold text-white">
                  3. Privacy & Data Protection
                </h2>
              </div>
              <p className="text-white/70 leading-relaxed mb-4">
                We are committed to protecting your privacy and personal
                information. Our data practices comply with applicable privacy
                laws and regulations.
              </p>
              <ul className="space-y-3 text-white/70">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-green-400 rounded-full mt-2 shrink-0"></span>
                  <span>
                    We collect only information necessary to provide our
                    services
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-green-400 rounded-full mt-2 shrink-0"></span>
                  <span>Your data is encrypted and stored securely</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-green-400 rounded-full mt-2 shrink-0"></span>
                  <span>
                    We never sell your personal information to third parties
                  </span>
                </li>
              </ul>
            </motion.section>

            {/* Payment Terms */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white/5 border border-white/10 rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <CreditCard size={20} className="text-yellow-400" />
                <h2 className="text-xl font-semibold text-white">
                  4. Payment Terms
                </h2>
              </div>
              <p className="text-white/70 leading-relaxed mb-4">
                All purchases made through our platform are subject to the
                following payment terms and conditions.
              </p>
              <ul className="space-y-3 text-white/70">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 shrink-0"></span>
                  <span>All prices are displayed in your local currency</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 shrink-0"></span>
                  <span>
                    Payment processing is handled through secure third-party
                    providers
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 shrink-0"></span>
                  <span>
                    Refunds are processed according to our refund policy
                  </span>
                </li>
              </ul>
            </motion.section>

            {/* Limitation of Liability */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-white/5 border border-white/10 rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle size={20} className="text-red-400" />
                <h2 className="text-xl font-semibold text-white">
                  5. Limitation of Liability
                </h2>
              </div>
              <p className="text-white/70 leading-relaxed">
                Our service is provided "as is" without warranties of any kind.
                We shall not be liable for any indirect, incidental, or
                consequential damages arising from your use of our service.
              </p>
            </motion.section>

            {/* Contact Information */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-white/5 border border-white/10 rounded-xl p-6"
            >
              <h2 className="text-xl font-semibold text-white mb-4">
                6. Contact Information
              </h2>
              <p className="text-white/70 leading-relaxed mb-4">
                If you have any questions about these Terms of Service, please
                contact us:
              </p>
              <div className="space-y-2 text-white/70">
                <p>Email: support@example.com</p>
                <p>Phone: +1 (555) 123-4567</p>
                <p>Address: 123 Business Ave, Suite 100, City, State 12345</p>
              </div>
            </motion.section>

            {/* Last Updated */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="text-center text-white/50 text-sm"
            >
              <p>Last updated: {new Date().toLocaleDateString()}</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
