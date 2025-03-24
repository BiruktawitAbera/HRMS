import axios from 'axios';

const API_URL = 'https://localhost:5001/';

export const getTrainings = async () => {
  const token = localStorage.getItem('authToken');
  if (!token) throw new Error('No auth token found');

  try {
    const response = await axios.get(`${API_URL}api/Trainings`, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error fetching trainings: ' + error.message);
  }
};

const TrainingListService = {
  getTrainings,
};

export default TrainingListService;
