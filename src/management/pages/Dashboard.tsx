import React from 'react';

export const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <h1>Management Dashboard</h1>
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>Total Users</h3>
          <div className="dashboard-number">1,234</div>
        </div>
        <div className="dashboard-card">
          <h3>Active Sessions</h3>
          <div className="dashboard-number">89</div>
        </div>
        <div className="dashboard-card">
          <h3>System Status</h3>
          <div className="dashboard-status online">Online</div>
        </div>
        <div className="dashboard-card">
          <h3>Recent Activity</h3>
          <div className="dashboard-activity">
            <p>• User registration spike detected</p>
            <p>• Database backup completed</p>
            <p>• Security scan passed</p>
          </div>
        </div>
      </div>
    </div>
  );
};
