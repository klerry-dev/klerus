import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Dashboard } from "./pages/Dashboard";
import { Users } from "./pages/Users";
import { Projects } from "./pages/Projects";
import { Settings } from "./pages/Settings";
import { Terms } from "./pages/Terms";
import { Shop } from "./pages/Shop";
import { Discover } from "./pages/Discover";

export const ManagementSite: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="projects" element={<Projects />} />
        <Route path="settings" element={<Settings />} />
        <Route path="terms" element={<Terms />} />
        <Route path="shop" element={<Shop />} />
        <Route path="discover" element={<Discover />} />
      </Route>
    </Routes>
  );
};

export default ManagementSite;
