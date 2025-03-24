import axios from 'axios';
import { API_BASE_URL, API_GET_ALL_DEPARTMENTS_ENDPOINT } from '@/app/config/env';

const fetchDepartments = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}${API_GET_ALL_DEPARTMENTS_ENDPOINT}`, {
      headers: {
        Accept: 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching departments:', error.response || error.message || error);
    throw new Error('Error fetching departments');
  }
};

export default fetchDepartments;
