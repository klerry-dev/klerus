import React, { useState } from 'react';

export const Settings: React.FC = () => {
  const [settings, setSettings] = useState({
    siteName: 'My App Management',
    allowRegistration: true,
    emailNotifications: true,
    maintenanceMode: false,
  });

  const handleChange = (key: string, value: boolean | string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    console.log('Saving settings:', settings);
    // Add save logic here
  };

  return (
    <div className="settings-page">
      <h1>Settings</h1>
      <div className="settings-form">
        <div className="form-group">
          <label htmlFor="siteName">Site Name</label>
          <input
            type="text"
            id="siteName"
            value={settings.siteName}
            onChange={(e) => handleChange('siteName', e.target.value)}
          />
        </div>
        
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              checked={settings.allowRegistration}
              onChange={(e) => handleChange('allowRegistration', e.target.checked)}
            />
            Allow User Registration
          </label>
        </div>
        
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              checked={settings.emailNotifications}
              onChange={(e) => handleChange('emailNotifications', e.target.checked)}
            />
            Email Notifications
          </label>
        </div>
        
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              checked={settings.maintenanceMode}
              onChange={(e) => handleChange('maintenanceMode', e.target.checked)}
            />
            Maintenance Mode
          </label>
        </div>
        
        <div className="form-actions">
          <button className="btn btn-primary" onClick={handleSave}>
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};
