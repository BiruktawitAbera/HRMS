import Header from '@/app/layout/Header';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import fetchDepartments from '../services/DepartmentListService';
import { BsFillGearFill, BsPaypal, BsPeopleFill, BsFillGrid3X3GapFill, BsBriefcaseFill, BsGrid1X2Fill, BsMenuButtonWideFill } from 'react-icons/bs';
import { FcDepartment } from 'react-icons/fc';

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [showSubmenu, setShowSubmenu] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const departmentsData = await fetchDepartments();
        setDepartments(departmentsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching departments:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSidebarToggle = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const handleSettingsClick = () => {
    setShowSubmenu(!showSubmenu);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1">
        <div className={`${openSidebarToggle ? "sidebar-responsive" : ""} bg-white text-gray-800 overflow-y-auto p-4 transition-all duration-300 md:w-64 lg:w-64`}>
          <aside id="sidebar">
            <div className='flex justify-between items-center mb-4'>
              <div className='flex items-center'>
                <button className="md:hidden" onClick={handleSidebarToggle}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
              <span className='cursor-pointer' onClick={handleSidebarToggle}></span>
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
                        <BsFillGrid3X3GapFill className='text-lg mr-2' /> Performance Management
                      </a>
                    </li>
                    <li className='sidebar-list-item'>
                      <a href="/LeaveManagement" className='flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors'>
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
                <a href="/Admin" className='flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors'>
                  <BsGrid1X2Fill className='text-lg mr-2' /> Dashboard
                </a>
              </li>
              <li className='sidebar-list-item'>
                <a href="/Performance" className='flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors'>
                  <BsFillGrid3X3GapFill className='text-lg mr-2' /> Performance
                </a>
              </li>
              <li className='sidebar-list-item'>
                <a href="/userlist" className='flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors'>
                  <BsPeopleFill className='text-lg mr-2' /> Employees
                </a>
              </li>
              <li className='sidebar-list-item'>
                <a href="/Departmentlist" className='flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors'>
                  <FcDepartment className='text-lg mr-2' /> Department
                </a>
              </li>
              <li className='sidebar-list-item'>
                <Link to="/GenerateReport" className='flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors'>
                  <BsMenuButtonWideFill className='text-lg mr-2' /> Reports
                </Link>
              </li>
              <li className='sidebar-list-item'>
                <a href="/AdminLeave" className='flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors'>
                  <BsBriefcaseFill className='text-lg mr-2' /> Leave
                </a>
              </li>
              <li className='sidebar-list-item'>
                <a href="/Payroll" className='flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors'>
                  <BsPaypal className='text-lg mr-2' /> Salary
                </a>
              </li>
              <li className='sidebar-list-item'>
                <a href="/TrainingForm" className='flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors'>
                  <BsMenuButtonWideFill className='text-lg mr-2' /> Training
                </a>
              </li>
            </ul>
          </aside>
        </div>
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-3xl font-bold mb-4">Department List</h2>
          <div className="shadow-xl bg-white p-6 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Departments</h3>
              <Link to="/AddDepartment">
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded">
                  Add Department
                </button>
              </Link>
            </div>
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Department Name</th>
                  <th className="px-6 py-3 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Department Description</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {departments.map((department) => (
                  <tr key={department.departmentId}>
                    <td className="px-6 py-4 whitespace-no-wrap text-sm text-gray-900">{department.departmentName}</td>
                    <td className="px-6 py-4 whitespace-no-wrap text-sm text-gray-900">{department.departmentDescription}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentList;
