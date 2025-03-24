import axios from 'axios';
import { API_BASE_URL, API_SUBMITTED_PROFILE_ENDPOINT } from '@/app/config/env';

const API_URL = API_BASE_URL;

const RegistrationFormService = {
  registerUser: async (userData) => {
    try {
      console.log('Sending user data to backend:', userData); // Debugging log
      const response = await axios.post(`${API_URL}${API_SUBMITTED_PROFILE_ENDPOINT}`, userData, {
        headers: {
          'Authorization': 'Bearer 1234', // Adjust the token as necessary
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Response from backend:', response.data); // Debugging log
      return response.data;
    } catch (error) {
      console.error('Error registering user:', error.response ? error.response.data : error.message); // Debugging log
      throw new Error(error.response?.data?.message || 'Registration failed.');
    }
  },
};

export default RegistrationFormService;
