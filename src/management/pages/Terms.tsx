import React from "react";
import { FileText, Shield, Users, CreditCard, AlertTriangle, Mail, Phone, MapPin } from "lucide-react";

export function Terms() {
  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-500/10 rounded-lg">
            <FileText size={20} className="text-blue-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Terms of Service</h1>
        </div>
        <p className="text-gray-600">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>

      <div className="space-y-8">
        {/* Introduction */}
        <section className="bg-white rounded-lg p-6 shadow-sm border">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">1. Introduction</h2>
          <p className="text-gray-700 leading-relaxed">
            Welcome to our management platform. These Terms of Service govern your use of our administrative tools and services. 
            By accessing or using this platform, you agree to be bound by these terms.
          </p>
        </section>

        {/* User Responsibilities */}
        <section className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center gap-3 mb-4">
            <Users size={20} className="text-blue-500" />
            <h2 className="text-lg font-semibold text-gray-900">2. Administrator Responsibilities</h2>
          </div>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 shrink-0"></span>
              <span>Maintain the security of your administrative account</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 shrink-0"></span>
              <span>Use the platform only for legitimate business purposes</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 shrink-0"></span>
              <span>Comply with all applicable laws and regulations</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 shrink-0"></span>
              <span>Protect user data and privacy in accordance with our policies</span>
            </li>
          </ul>
        </section>

        {/* Platform Usage */}
        <section className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center gap-3 mb-4">
            <Shield size={20} className="text-green-500" />
            <h2 className="text-lg font-semibold text-gray-900">3. Platform Usage Guidelines</h2>
          </div>
          <p className="text-gray-700 leading-relaxed mb-4">
            Administrators must use the platform responsibly and in accordance with these guidelines:
          </p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full mt-2 shrink-0"></span>
              <span>Do not share your login credentials with unauthorized individuals</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full mt-2 shrink-0"></span>
              <span>Report any security vulnerabilities immediately</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full mt-2 shrink-0"></span>
              <span>Use data export features in compliance with privacy laws</span>
            </li>
          </ul>
        </section>

        {/* Data Management */}
        <section className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center gap-3 mb-4">
            <CreditCard size={20} className="text-yellow-500" />
            <h2 className="text-lg font-semibold text-gray-900">4. Data Management</h2>
          </div>
          <p className="text-gray-700 leading-relaxed mb-4">
            As an administrator, you have access to sensitive user data and must handle it appropriately:
          </p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 shrink-0"></span>
              <span>Access user data only when necessary for administrative tasks</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 shrink-0"></span>
              <span>Follow data retention policies and delete data when required</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 shrink-0"></span>
              <span>Implement appropriate security measures for data protection</span>
            </li>
          </ul>
        </section>

        {/* Limitation of Liability */}
        <section className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle size={20} className="text-red-500" />
            <h2 className="text-lg font-semibold text-gray-900">5. Limitation of Liability</h2>
          </div>
          <p className="text-gray-700 leading-relaxed">
            The platform is provided "as is" without warranties of any kind. We shall not be liable for any damages arising from your use of the administrative tools.
          </p>
        </section>

        {/* Contact Information */}
        <section className="bg-white rounded-lg p-6 shadow-sm border">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">6. Contact Information</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            For questions about these Terms of Service or administrative policies, please contact us:
          </p>
          <div className="space-y-2 text-gray-700">
            <div className="flex items-center gap-2">
              <Mail size={16} className="text-gray-500" />
              <span>admin-support@example.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={16} className="text-gray-500" />
              <span>+1 (555) 987-6543</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-gray-500" />
              <span>123 Admin Ave, Suite 100, Management City, MC 12345</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
