import axios from 'axios';

const API_URL = 'https://localhost:5001/api/PayRoll';

export const PayrollService = {
    addPayroll: async (payrollData) => {
        const formData = new FormData();
        formData.append('EmployeeId', payrollData.EmployeeId);
        formData.append('SalaryType', payrollData.SalaryType);
        formData.append('Amount', payrollData.Amount);
        formData.append('PaymentDuration', payrollData.PaymentDuration);
        formData.append('PaymentDate', payrollData.PaymentDate);
        formData.append('StartDate', payrollData.StartDate);
        formData.append('EndDate', payrollData.EndDate);
        formData.append('Bonuses', payrollData.Bonuses);
        formData.append('PaymentStatus', payrollData.PaymentStatus);
        formData.append('PaymentMethod', payrollData.PaymentMethod);
        formData.append('NetPay', payrollData.NetPay);

        const response = await axios.post(API_URL, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'accept': '*/*'
            }
        });
        return response.data;
    }
};