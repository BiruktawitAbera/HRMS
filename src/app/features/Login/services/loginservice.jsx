// src/services/loginservice.js
import axios from 'axios';

const loginservice = {
  login: async (employeeEmail, password) => {
    const response = await axios.post('https://localhost:5001/api/Account/login?rememberMe=false', {
      employeeEmail,
      password,
    });
    return response.data;
  },
};

export default loginservice;
