import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserAccessRolePage = () => {
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch roles from the backend API
        const fetchRoles = async () => {
            try {
                const response = await axios.get('/api/Role/getAllRoles');
                setRoles(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching roles:', error);
                setLoading(false);
            }
        };

        fetchRoles();
    }, []);

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-4">User Access Role Page</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Name</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Role</th>
                            <th scope="col" className="relative px-6 py-3"><span className="sr-only">Edit</span></th>
                            <th scope="col" className="relative px-6 py-3"><span className="sr-only">Delete</span></th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {roles.map(role => (
                            <tr key={role}>

                                {/* Replace with your user role data */}
                                <td className="px-6 py-4 whitespace-nowrap">User Name</td>
                                <td className="px-6 py-4 whitespace-nowrap">{role}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <a href="#" className="text-indigo-600 hover:text-indigo-900">Edit</a>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <a href="#" className="text-red-600 hover:text-red-900">Delete</a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default UserAccessRolePage;
