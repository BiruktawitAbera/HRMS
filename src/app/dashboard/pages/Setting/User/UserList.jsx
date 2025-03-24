import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserListService from '@/app/dashboard/services/UserListService';
import Header from '@/app/layout/Header';
import { FcDepartment } from "react-icons/fc";

import {
  BsGrid1X2Fill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsMenuButtonWideFill,
  BsFillGearFill,
  BsBriefcaseFill,
  BsPaypal
} from 'react-icons/bs';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false); 
  const [showSubmenu, setShowSubmenu] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const usersData = await UserListService.fetchUsers();
      setUsers(usersData);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  };

  const handleDeleteUser = async (userEmail) => {
    try {
      await UserListService.deleteUser(userEmail);
      setUsers(users.filter((user) => user.employeeEmail !== userEmail));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEditUser = (user) => {
    navigate(`/UpdatedProfile/${user.employeeId}`, { state: { user } });
  };

  const handleAddUser = () => {
    navigate('/AddUser');
  };

  const handleFileUpload = (user) => {
    navigate(`/FileUploadPage/${user.employeeId}`, { state: { user } });
  };

  const handleMoreDetails = (user) => {
    navigate('/EmployeeDetail', { state: { user } });
  };

  const handleSettingsClick = () => {
    setShowSubmenu(!showSubmenu);
  };

  const toggleSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1">
        <div className={`${openSidebarToggle ? "sidebar-responsive" : ""} bg-white text-gray-800 overflow-y-auto p-4 transition-all duration-300 md:w-64 lg:w-64`}>
          <aside id="sidebar">
            <div className='flex justify-between items-center mb-4'>
              <div className='flex items-center'>
                <button className="md:hidden" onClick={toggleSidebar}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
              <span className='cursor-pointer' onClick={toggleSidebar}></span>
            </div>
            <ul className={`space-y-2 ${openSidebarToggle ? 'block' : 'hidden md:block'}`}>
              <li className='sidebar-list-item'>
                <a href="#" className='flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors' onClick={handleSettingsClick}>
                  <BsFillGearFill className='text-lg mr-2' /> Settings
                </a>
                {showSubmenu && (
                  <ul className="ml-4">
                    <li className='sidebar-list-item'>
                      <a href="/PayrollSetting" className='flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors'>
                        <BsPaypal className='text-lg mr-2' /> Payroll Settings
                      </a>
                    </li>
                    <li className='sidebar-list-item'>
                      <a href="/GeneralSettings" className='flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors'>
                        <BsFillGearFill className='text-lg mr-2' /> General Settings
                      </a>
                    </li>
                    <li className='sidebar-list-item'>
                      <a href="/EmployeeData" className='flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors'>
                        <BsPeopleFill className='text-lg mr-2' /> Employee Data
                      </a>
                    </li>
                    <li className='sidebar-list-item'>
                      <a href="/PerformanceManagement" className='flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors'>
                        <BsFillGrid3X3GapFill className='text-lg mr -2' /> Performance Management
                      </a>
                    </li>
                    <li className='sidebar-list-item'>
                      <a href="/AttendanceManagement" className='flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors'>
                        <BsBriefcaseFill className='text-lg mr-2' /> Attendance and Leave Management
                      </a>
                    </li>
                    <li className='sidebar-list-item'>
                      <a href="/TrainingDevelopment" className='flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors'>
                        <BsPaypal className='text-lg mr-2' /> Training and Development
                      </a>
                    </li>
                    <li className='sidebar-list-item'>
                      <a href="/Security" className='flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors'>
                        <BsPaypal className='text-lg mr-2' /> Security
                      </a>
                    </li>
                  </ul>
                )}
              </li>
              <li className='sidebar-list-item'>
                <a href="Admin" className='flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors'>
                  <BsGrid1X2Fill className='text-lg mr-2' /> Dashboard
                </a>
              </li>
              <li className='sidebar-list-item'>
                <a href="Performance" className='flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors'>
                  <BsFillGrid3X3GapFill className='text-lg mr-2' /> Performance
                </a>
              </li>
              <li className='sidebar-list-item'>
                <a href="UserList" className='flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded -lg transition-colors'>
                  <BsPeopleFill className='text-lg mr-2' /> Employees
                </a>
              </li>
            
              <li className='sidebar-list-item'>
                <a href="/DepartmentList" className='flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors'>
                  <FcDepartment className='text-lg mr-2' /> Department
                </a>
              </li>
              <li className='sidebar-list-item'>
                <a href="/GenerateReport" className='flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors'>
                  <BsMenuButtonWideFill className='text-lg mr-2' /> Reports
                </a>
              </li>
              <li className='sidebar-list-item'>
                <a href="/AdminLeave" className='flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors'>
                  <BsBriefcaseFill className='text-lg mr-2' /> Leave
                </a>
              </li>
              <li className='sidebar-list-item'>
                <a href="/TrainingForm" className='flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors'>
                  <BsMenuButtonWideFill className='text-lg mr-2' /> Training
                </a>
              </li>
              <li className='sidebar-list-item'>
                <a href="/payroll" className='flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors'>
                  <BsPaypal className='text-lg mr-2' /> Salary
                </a>
              </li>
            </ul>
          </aside>
        </div>
        <div className="flex justify-center  ">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">User List</h2>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
              onClick={handleAddUser}
            >
              Add User
            </button>
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <div className="overflow-x-auto bg-gray-300">
                <table className="table-auto min-w-full divide-y divide-gray-200 shadow-lg overflow-hidden border-b border-gray-500 sm:rounded-lg">
                  <thead className="bg-gray-50">
                    <tr className="bg-gray-300">
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">First Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attribute</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
  {users.map((user, index) => (
    <tr key={user.employeeId} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
      <td className="px-6 py-4 whitespace-nowrap">{user.employeeFirstName}</td>
      <td className="px-6 py-4 whitespace-nowrap">{user.employeeLastName}</td>
      <td className="px-6 py-4 whitespace-nowrap">{user.departmentName || 'N/A'}</td>
      <td className="px-6 py-4 whitespace-nowrap">{user.employeeEmail}</td>
      <td className="px-6 py-4 whitespace-nowrap">{user.role || 'N/A'}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <button className="text-indigo-600 hover:text-indigo-900 mr-2" onClick={() => handleEditUser(user)}>Edit</button>
        <button className="text-red-600 hover:text-red-900" onClick={() => handleDeleteUser(user.employeeEmail)}>Delete</button>
        <button className="text-green-600 hover:text-green-900 ml-2" onClick={() => handleFileUpload(user)}>FileUpload</button>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <button className="text-green-600 hover:text-green-900 ml-2" onClick={() => handleMoreDetails(user)}>More</button>
      </td>
    </tr>
  ))}
</tbody>

                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;

