import axios from 'axios';

const UpdatedProfileService = {
  updateUser: async (employeeId, updatedUser, token) => {
    const response = await axios.patch(
      'https://localhost:5001/api/EmployeeControllers/updateProfile',
      updatedUser,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  },
};

export default UpdatedProfileService;
