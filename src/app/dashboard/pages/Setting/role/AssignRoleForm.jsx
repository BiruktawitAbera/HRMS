import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RoleAssignmentForm = ({ assignRole }) => {
  const [users, setUsers] = useState([]);
  const [roleOptions, setRoleOptions] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [selectedRole, setSelectedRole] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://localhost:7067/api/EmployeeControllers/getAllEmployeesInfo');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    const fetchRoles = async () => {
      try {
        const response = await axios.get('https://localhost:7067/api/Role/getAllRoles');
        setRoleOptions(response.data);
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };

    fetchUsers();
    fetchRoles();
  }, []);

  const handleAssignRole = async () => {
    if (!selectedUserId || !selectedRole) {
      alert('Please select a user and a role.');
      return;
    }

    try {
      const response = await axios.post('https://localhost:7067/api/Role/assignRole', {
        userId: selectedUserId,
        roleName: selectedRole, // Send roleName instead of roleId
      });
      if (response.status === 200) {
        assignRole(selectedUserId, selectedRole);
      } else {
        throw new Error('Failed to assign role');
      }
    } catch (error) {
      console.error('Error assigning role:', error);
      alert('Failed to assign role.');
    }
  };

  return (
    <div className="flex flex-col space-y-4 mb-4">
      <div>
        <label htmlFor="user" className="block font-medium mb-1">User:</label>
        <select
          id="user"
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select User</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>{`${user.employeeFirstName} ${user.employeeLastName}`}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="role" className="block font-medium mb-1">Role:</label>
        <select
          id="role"
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select Role</option>
          {roleOptions.map((role, index) => (
            <option key={index} value={role}>
              {role}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={handleAssignRole}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Assign Role
      </button>
    </div>
  );
};

export default RoleAssignmentForm;
