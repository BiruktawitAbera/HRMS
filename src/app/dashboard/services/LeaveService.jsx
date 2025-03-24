import axios from 'axios';

const API_BASE_URL = 'https://localhost:5001/';

const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

const approveLeave = async (leaveId) => {
  try {
    const authToken = getAuthToken();
    const response = await axios.patch(
      `${API_BASE_URL}api/Leave/${leaveId}/approve`,
      {},
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error approving leave:', error);
    throw error;
  }
};

const disapproveLeave = async (leaveId) => {
  try {
    const authToken = getAuthToken();
    const response = await axios.patch(
      `${API_BASE_URL}api/Leave/${leaveId}/disapprove`,
      {},
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error disapproving leave:', error);
    throw error;
  }
};

const fetchLeaveHistory = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}api/Leave/getAllLeaves`);
    return response.data;
  } catch (error) {
    console.error('Error fetching leave history:', error);
    throw error;
  }
};

export { fetchLeaveHistory, approveLeave, disapproveLeave };
