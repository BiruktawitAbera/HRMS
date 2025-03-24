import axios from 'axios';
import { API_BASE_URL } from '@/app/config/env';

const API_URL = API_BASE_URL;
const API_GET_EMPLOYEE_ENDPOINT = 'api/EmployeeControllers/getAllEmployeesInfo';

const UserListService = {
  fetchUsers: async () => {
    try {
      // Add timestamp to prevent caching
      const response = await axios.get(`${API_URL}${API_GET_EMPLOYEE_ENDPOINT}?t=${Date.now()}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw new Error('Failed to fetch users.');
    }
  },

  deleteUser: async (userEmail) => {
    try {
      // Update state after successful delete
      const response = await axios.delete(`${API_URL}api/EmployeeControllers/delateEmployeeUserByEmail`, {
        params: { Email: userEmail },
      });
      return response.data;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw new Error('Failed to delete user.');
    }
  },

  fetchDepartments: async () => {
    try {
      const response = await axios.get(`${API_URL}api/Department/GetAllDepartment`);
      return response.data;
    } catch (error) {
      console.error('Error fetching departments:', error);
      throw new Error('Failed to fetch departments.');
    }
  }
};

export default UserListService;
