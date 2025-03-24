import axios from 'axios';


const API_URL = 'your-backend-api-url';

const GeneralSettingsService = {
  getSettings: () => {
    return axios.get(`${API_URL}/settings`)
      .then(response => response.data)
      .catch(error => {
        console.error('Error fetching settings data:', error);
        throw new Error('Failed to fetch settings data.');
      });
  },
  updateSettings: (data) => {
    return axios.put(`${API_URL}/settings`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (response.status === 200) {
          console.log('Settings data updated successfully.');
        } else {
          throw new Error('Failed to update settings data.');
        }
      })
      .catch(error => {
        console.error('Error updating settings data:', error);
        throw new Error('Failed to update settings data.');
      });
  }
};

export default GeneralSettingsService;