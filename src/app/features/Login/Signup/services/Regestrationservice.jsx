import axios from 'axios';
import { API_BASE_URL, API_REGISTER_ENDPOINT } from '@/app/config/env';

const registrationService = {
  register: async (employeeName, employeeEmail, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}${API_REGISTER_ENDPOINT}`, {
        employeeName,
        employeeEmail,
        password
      });
      return response.data;
    } catch (error) {
      throw new Error('Registration failed');
    }
  }
};

export default registrationService;