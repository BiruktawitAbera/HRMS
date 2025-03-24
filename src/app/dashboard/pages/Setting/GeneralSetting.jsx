import React, { useEffect, useState } from 'react';
import GeneralSettingsService from '../../services/GeneralSettingsService';
import { Input } from '@/components/ui/input';
import { Button } from '@/app/components/Button/button';


function GeneralSettings() {
  const [settingsData, setSettingsData] = useState({
    companyName: '',
    address: '',
    contact: '',
    timezone: '',
    language: '',
    emailConfig: '',
    securitySettings: '',
    notifications: '',
    support: ''
  });

  useEffect(() => {
    GeneralSettingsService.getSettings()
      .then(data => {
        setSettingsData(data);
      })
      .catch(error => {
        console.error('Error fetching settings data:', error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSettingsData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    GeneralSettingsService.updateSettings(settingsData)
      .then(() => {
        console.log('Settings data updated successfully.');
        // Perform any additional actions after successful update
      })
      .catch(error => {
        console.error('Error updating settings data:', error);
        // Handle error cases if necessary
      });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4">General Settings</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="companyName" className="block mb-2">Company Name:</label>
            <Input
              type="text"
              id="companyName"
              name="companyName"
              value={settingsData.companyName}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="block mb-2">Address:</label>
            <Input
              type="text"
              id="address"
              name="address"
              value={settingsData.address}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="contact" className="block mb-2">Contact Details:</label>
            <Input
              type="text"
              id="contact"
              name="contact"
              value={settingsData.contact}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="timezone" className="block mb-2">Time Zone:</label>
            <select
              id="timezone"
              name="timezone"
              value={settingsData.timezone}
              onChange={handleInputChange}
              className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="gmt">GMT</option>
              <option value="est">EST</option>
              <option value="pst">PST</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="language" className="block mb-2">System Language:</label>
            <Input
              type="text"
              id="language"
              name="language"
              value={settingsData.language}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="emailConfig" className="block mb-2">Email Configuration:</label>
            <Input
              type="text"
              id="emailConfig"
              name="emailConfig"
              value={settingsData.emailConfig}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="securitySettings" className="block mb-2">Security Settings:</label>
            <Input
              type="text"
              id="securitySettings"
              name="securitySettings"
              value={settingsData.securitySettings}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="notifications" className="block mb-2">System Notifications:</label>
            <Input
              type="text"
              id="notifications"
              name="notifications"
              value={settingsData.notifications}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="support" className="block mb-2">Help and Support:</label>
            <Input
              type="text"
              id="support"
              name="support"
              value={settingsData.support}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex justify-center">
            <Button type="submit">Save</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default GeneralSettings;