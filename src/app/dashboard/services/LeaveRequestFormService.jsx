import axios from 'axios';

const API_URL = 'https://localhost:5001/';

const getLeaveTypes = async () => {
  const token = localStorage.getItem('authToken');
  if (!token) throw new Error('No auth token found');

  try {
    const response = await axios.get(`${API_URL}api/Leave/getAllLeavesTypes`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error fetching leave types: ' + error.message);
  }
};

const submitLeaveRequest = async (formData) => {
  const token = localStorage.getItem('authToken');
  if (!token) throw new Error('No auth token found');

  const data = new FormData();
  data.append('LeaveType', formData.LeaveType);
  data.append('StartDate', formData.StartDate);
  data.append('EndDate', formData.EndDate);

  try {
    const response = await axios.post(`${API_URL}api/Leave`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error submitting leave request: ' + error.message);
  }
};

const LeaveRequestFormService = {
  getLeaveTypes,
  submitLeaveRequest,
};

export default LeaveRequestFormService;
