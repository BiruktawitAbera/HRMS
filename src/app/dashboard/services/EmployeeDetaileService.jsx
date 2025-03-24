import axios from 'axios';

export const getAllEmployees = async () => {
    try {
        const response = await axios.get('https://localhost:5001/api/EmployeeControllers/getAllEmployeesInfo');
        return response.data;
    } catch (error) {
        console.error('Error fetching all employees:', error);
        throw error; 
    }
};
