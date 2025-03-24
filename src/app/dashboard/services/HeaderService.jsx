// HeaderService.jsx

import axios from 'axios';

const fetchEmployeeInfo = async () => {
  try {
    // Make an HTTP GET request to fetch employee information from the backend API
    const response = await axios.get('https://localhost:5001/api/EmployeeControllers/getAllEmployeesInfo');

    // Extract employeeFirstName and employeeLastName from the response data
    const { employeeFirstName, employeeLastName } = response.data;

    // Return the extracted employee information
    return { employeeFirstName, employeeLastName };
  } catch (error) {
    // Handle errors if any
    console.error('Error fetching employee information:', error);
    throw new Error('Failed to fetch employee information');
  }
};

export default fetchEmployeeInfo;
