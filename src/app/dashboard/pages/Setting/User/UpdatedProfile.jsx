import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'; 

const UpdatedProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = location.state;
  const [firstName, setFirstName] = useState(user.employeeFirstName);
  const [lastName, setLastName] = useState(user.employeeLastName);
  const [department, setDepartment] = useState(user.departmentName);
  const [email, setEmail] = useState(user.employeeEmail);
  const [adminAssignedRole, setAdminAssignedRole] = useState(user.adminAssignedRole);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const updatedUser = {
      employeeId: user.employeeId,
      employeeFirstName: firstName,
      employeeLastName: lastName,
      departmentName: department,
      employeeEmail: email,
      adminAssignedRole: adminAssignedRole,
    };

    try {
      const authToken = localStorage.getItem('authToken');
    
      await axios.patch(
        'https://localhost:5001/api/EmployeeControllers/updateProfile',
        updatedUser,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      setIsSubmitting(false);
      navigate('/UserList', { replace: true }); 
    } catch (error) {
      console.error('Error updating user:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Update Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Department</label>
            <input
              type="text"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Admin Assigned Role</label>
            <input
              type="text"
              value={adminAssignedRole}
              onChange={(e) => setAdminAssignedRole(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              {isSubmitting ? 'Updating...' : 'Update'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatedProfile;
