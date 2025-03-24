import axios from 'axios';
import { API_BASE_URL,   API_CREATE_ROLES_ENDPOINT
} from '@/app/config/env'; // Importing environment variables

const createNewRole = async (roleName) => {
  try {
    const response = await axios.post(`${API_BASE_URL}${  API_CREATE_ROLES_ENDPOINT
    }`, { roleName }); // Using environment variables
    console.log('Role created successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating role:', error);
    throw new Error('Role creation failed.');
  }
};

export default createNewRole;
