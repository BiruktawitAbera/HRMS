import axios from 'axios';

export const uploadFiles = async (data, userId) => {
    try {
        const token = localStorage.getItem('authToken');
        const url = `https://localhost:5001/api/EmployeeFile?userId=${userId}`;

        const response = await axios.post(url, data, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error uploading files:', error);
        throw error;
    }
};