import axios from 'axios';

const API_URL = 'https://localhost:5001/api/PayRoll/getAllPayRolls';

const fetchPayrollData = async () => {
    try {
        const response = await axios.get(API_URL);
        if (Array.isArray(response.data)) {
            return response.data;
        } else {
            console.error('Fetched data is not an array:', response.data);
            return [];
        }
    } catch (error) {
        console.error('Error fetching payroll data:', error);
        return [];
    }
};

export default {
    fetchPayrollData
};
