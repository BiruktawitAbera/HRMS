import axios from 'axios';

const API_URL = 'https://localhost:5001/';

export const createTraining = async (formData) => {
  const token = localStorage.getItem('authToken');
  if (!token) throw new Error('No auth token found');

  try {
    const { type, title, description, file } = formData;

    const formDataToSend = new FormData();
    formDataToSend.append('type', type);
    formDataToSend.append('title', title);
    formDataToSend.append('description', description);

    // Convert file to base64
    const base64File = await convertFileToBase64(file);
    formDataToSend.append('base64File', base64File);

    const response = await axios.post(`${API_URL}api/Trainings`, formDataToSend, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'


      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error creating training: ' + error.message);
  }
};

const convertFileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = (error) => reject(error);
  });
};

// Exporting the service as an object if you need to add more methods later
const TrainingFormService = {
  createTraining,
};

export default TrainingFormService;
