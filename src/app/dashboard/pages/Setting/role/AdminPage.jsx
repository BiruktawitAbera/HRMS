// AdminPage.jsx
import React, { useState, useEffect } from 'react';
import AssignRoleForm from './AssignRoleForm';

const AdminPage = () => {
    const [users, setUsers] = useState([]);

    // Fetch user data from the API
    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            // Fetch user data from your API endpoint
            const response = await fetch('/api/users');
            const userData = await response.json();
            setUsers(userData);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const assignRole = async (userId, role) => {
        try {
            // Send a request to your API endpoint to assign the role
            await fetch(`/api/users/${userId}/role`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ role })
            });
            // Optionally, you can update the local state with the new role assignment
            const updatedUsers = users.map(user => {
                if (user.id === userId) {
                    return { ...user, role };
                }
                return user;
            });
            setUsers(updatedUsers);
            alert('Role assigned successfully.');
        } catch (error) {
            console.error('Error assigning role:', error);
            alert('Error assigning role. Please try again.');
        }
    };

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-4">Admin Page</h1>
            <AssignRoleForm users={users} assignRole={assignRole} />
            {/* Display user data or any other admin-related content */}
        </div>
    );
};

export default AdminPage;
