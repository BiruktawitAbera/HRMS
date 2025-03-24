import Header from '@/app/layout/Header';
import React, { useState, useEffect } from 'react';
import { fetchLeaveHistory } from '../services/LeaveService'; // No longer importing approveLeave and disapproveLeave
import { BsFillGearFill, BsPaypal, BsPeopleFill, BsFillGrid3X3GapFill, BsBriefcaseFill, BsGrid1X2Fill, BsMenuButtonWideFill } from 'react-icons/bs';
import { FcDepartment } from 'react-icons/fc';

const AdminLeave = () => {
  const [leaveHistory, setLeaveHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [showSubmenu, setShowSubmenu] = useState(false);

  useEffect(() => {
    const fetchLeaveData = async () => {
      try {
        const data = await fetchLeaveHistory();
        setLeaveHistory(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching leave history:', error);
        setIsLoading(false);
      }
    };

    fetchLeaveData();
  }, []);

  const handleSidebarToggle = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const handleSettingsClick = () => {
    setShowSubmenu(!showSubmenu);
  };

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
                <a href="/admin" className='flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors'>
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
                <a href="/GenerateReport" className='flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors'>
                  <BsMenuButtonWideFill className='text-lg mr-2' /> Reports
                </a>
              </li>
              <li className='sidebar-list-item'>
                <a href="/Leave" className='flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors'>
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

        <div className="flex-grow flex flex-col justify-start items-center bg-gray-200 p-4">
          <div className="w-full max-w-7xl p-8 bg-white rounded shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-center">Leave History</h2>
            {isLoading ? (
              <p className="text-center">Loading...</p>
            ) : (
              <>
                {leaveHistory.length === 0 ? (
                  <p className="text-center">No leave history available.</p>
                ) : (
                  <table className="min-w-full bg-white">
                    <thead>
                      <tr>
                        <th className="border px-4 py-2">Leave ID</th>
                        <th className="border px-4 py-2">Leave Type</th>
                        <th className="border px-4 py-2">Start Date</th>
                        <th className="border px-4 py-2">End Date</th>
                        <th className="border px-4 py-2">Employee ID</th>
                        <th className="border px-4 py-2">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leaveHistory.map((leave) => (
                        <tr key={leave.leaveId}>
                          <td className="border px-4 py-2">{leave.leaveId}</td>
                          <td className="border px-4 py-2">{leave.leaveType}</td>
                          <td className="border px-4 py-2">{leave.startDate}</td>
                          <td className="border px-4 py-2">{leave.endDate}</td>
                          <td className="border px-4 py-2">{leave.employeeId}</td>
                          <td className="border px-4 py-2">{leave.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLeave;
