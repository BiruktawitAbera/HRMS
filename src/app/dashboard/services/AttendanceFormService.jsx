const API_BASE_URL = 'https://localhost:5001/api';

const getAuthToken = () => localStorage.getItem('authToken');

const checkIn = (_clockinTime) => {
  const token = getAuthToken();
  if (!token) throw new Error('No auth token found');

  return new Promise((resolve, reject) => {
    fetch(`${API_BASE_URL}/Attendance/Clockin`, { // Corrected template literal usage
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`, // Corrected template literal usage
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ClockinTime: _clockinTime.toISOString() }), // Sending the DateTime directly as an object
    })
    .then(response => {
      return response.json();
    })
    .then(data => {
      resolve({ success: true, data });
    })
    .catch(error => {
      reject({ success: false, message: error.message });
    });
  });
};

const checkOut = (_clockoutTime) => {
  const token = getAuthToken();
  if (!token) throw new Error('No auth token found');

  return new Promise((resolve, reject) => {
    fetch(`${API_BASE_URL}/Attendance/Clockout`, { // Corrected template literal usage
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`, // Corrected template literal usage
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ClockinTime: _clockoutTime.toISOString() // Assuming the correct field is ClockinTime for check-out
      }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to check out.');
      }
      return response.json();
    })
    .then(data => {
      resolve({ success: true, data });
    })
    .catch(error => {
      reject({ success: false, message: error.message });
    });
  });
};

const AttendanceFormService = {
  checkIn,
  checkOut,
};

export default AttendanceFormService;
