import axios from 'axios';

const forgotPasswordService = {
  async resetPassword(email) {
    try {
      const response = await axios.post('/api/reset-password', { email });
      // Handle the response from the backend
      // You can display a success message or redirect to a success page
      return response.data;
    } catch (error) {
      // Handle any errors that occur during the password reset process
      throw error;
    }
  },
};

export default forgotPasswordService;