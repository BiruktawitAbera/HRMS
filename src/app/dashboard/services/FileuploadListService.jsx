import axios from 'axios';

const BASE_URL = 'https://localhost:5001/'; 

export const fetchUploadedFiles = async (userId, token) => {
    try {
        
        if (!token) {
            token = localStorage.getItem('authToken');
        }

        if (!token) {
            throw new Error('Authentication token not found');
        }

        const response = await axios.get(`${BASE_URL}api/EmployeeFile`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            params: {
                userId
            }
        });

        console.log('API response:', response);

        if (typeof response.data !== 'object' || response.data === null) {
            throw new Error('Unexpected response data format');
        }
        const files = [];
        for (const key in response.data) {
            if (response.data[key]) {
                files.push({
                    type: key,
                    url: response.data[key]
                });
            }
        }

        return files;
    } catch (error) {
        console.error('Error fetching files:', error);
        throw error;
    }
};
