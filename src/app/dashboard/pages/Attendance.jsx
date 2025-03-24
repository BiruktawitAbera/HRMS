import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AttendanceService from '../services/AttendanceService';
import Header from '@/app/layout/Header';
import {
  BsFillGearFill,
  BsPeopleFill,
  BsGrid1X2Fill,
  BsFillGrid3X3GapFill,
  BsBriefcaseFill,
  BsMenuButtonWideFill,
  BsPaypal
} from 'react-icons/bs';
import { FcDepartment } from 'react-icons/fc';

const Attendance = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [showSubmenu, setShowSubmenu] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAttendanceRecords = async () => {
      try {
        const data = await AttendanceService.getAttendanceRecords();
        console.log(data);

        const formattedData = data.map(record => {
          const [clockinHours, clockinMinutes, clockinSeconds] = record.clockinTime.split(':').map(Number);
          const clockinTime = new Date();
          clockinTime.setHours(clockinHours, clockinMinutes, clockinSeconds, 0);

          let totalTime = null;
          if (record.clockoutTime) {
            const [clockoutHours, clockoutMinutes, clockoutSeconds] = record.clockoutTime.split(':').map(Number);
            const clockoutTime = new Date();
            clockoutTime.setHours(clockoutHours, clockoutMinutes, clockoutSeconds, 0);

            totalTime = clockoutTime - clockinTime;
          }

          return { ...record, totalTime };
        });

        setAttendanceRecords(formattedData);
      } catch (error) {
        console.error('Error fetching attendance records:', error);
      }
    };

    fetchAttendanceRecords();
  }, []);

  const formatTime = (milliseconds) => {
    if (typeof milliseconds !== 'number' || isNaN(milliseconds) || milliseconds < 0) {
      return '00:00:00';
    }

    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
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
        <div className={`${openSidebarToggle ? 'sidebar-responsive' : ''} bg-white text-gray-800 overflow-y-auto p-4 transition-all duration-300 md:w-64 lg:w-64`}>
          <aside id="sidebar">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <button className="md:hidden" onClick={toggleSidebar}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
              <span className="cursor-pointer" onClick={toggleSidebar}></span>
            </div>
            <ul className={`space-y-2 ${openSidebarToggle ? 'block' : 'hidden md:block'}`}>
              <li className="sidebar-list-item">
                <a href="#" className="flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors" onClick={handleSettingsClick}>
                  <BsFillGearFill className="text-lg mr-2" /> Settings
                </a>
                {showSubmenu && (
                  <ul className="ml-4">
                    <li className="sidebar-list-item">
                      <a href="/PayrollSetting" className="flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors">
                        <BsPaypal className="text-lg mr-2" /> Payroll Settings
                      </a>
                    </li>
                    <li className="sidebar-list-item">
                      <a href="/GeneralSettings" className="flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors">
                        <BsFillGearFill className="text-lg mr-2" /> General Settings
                      </a>
                    </li>
                    <li className="sidebar-list-item">
                      <a href="/EmployeeData" className="flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors">
                        <BsPeopleFill className="text-lg mr-2" /> Employee Data
                      </a>
                    </li>
                    <li className="sidebar-list-item">
                      <a href="/PerformanceManagement" className="flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors">
                        <BsFillGrid3X3GapFill className="text-lg mr-2" /> Performance Management
                      </a>
                    </li>
                    <li className="sidebar-list-item">
                      <a href="/AttendanceManagement" className="flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors">
                        <BsBriefcaseFill className="text-lg mr-2" /> Attendance and Leave Management
                      </a>
                    </li>
                    <li className="sidebar-list-item">
                      <a href="/TrainingDevelopment" className="flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors">
                        <BsPaypal className="text-lg mr-2" /> Training and Development
                      </a>
                    </li>
                    <li className="sidebar-list-item">
                      <a href="/Security" className="flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors">
                        <BsPaypal className="text-lg mr-2" /> Security
                      </a>
                    </li>
                  </ul>
                )}
              </li>
              <li className="sidebar-list-item">
                <a href="Admin" className="flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors">
                  <BsGrid1X2Fill className="text-lg mr-2" /> Dashboard
                </a>
              </li>
              <li className="sidebar-list-item">
                <a href="Performance" className="flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors">
                  <BsFillGrid3X3GapFill className="text-lg mr-2" /> Performance
                </a>
              </li>
              <li className="sidebar-list-item">
                <a href="UserList" className="flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors">
                  <BsPeopleFill className="text-lg mr-2" /> Employees
                </a>
              </li>
              <li className="sidebar-list-item">
                <a href="/DepartmentList" className="flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors">
                  <FcDepartment className="text-lg mr-2" /> Department
                </a>
              </li>
              <li className="sidebar-list-item">
                <a href="/GenerateReport" className="flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors">
                  <BsMenuButtonWideFill className="text-lg mr-2" /> Reports
                </a>
              </li>
              <li className="sidebar-list-item">
                <a href="/AdminLeave" className="flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors">
                  <BsBriefcaseFill className="text-lg mr-2" /> Leave
                </a>
              </li>
              <li className="sidebar-list-item">
                <a href="/TrainingForm" className="flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors">
                  <BsMenuButtonWideFill className="text-lg mr-2" /> Training
                </a>
              </li>
              <li className="sidebar-list-item">
                <a href="/payroll" className="flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors">
                  <BsPaypal className="text-lg mr-2" /> Salary
                </a>
              </li>
            </ul>
          </aside>
        </div>
        <div className="flex justify-center flex-1">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Attendance Records</h2>
            <div className="overflow-x-auto bg-gray-300">
              <table className="table-auto min-w-full divide-y divide-gray-200 shadow-lg overflow-hidden border-b border-gray-500 sm:rounded-lg">
                <thead className="bg-gray-50">
                  <tr className="bg-gray-300">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check-in Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check-out Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Time Attended</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {attendanceRecords.map((record, index) => (
                    <tr key={record.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-6 py-4 whitespace-nowrap">{record.employeeName}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{record.clockinTime}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{record.clockoutTime || 'Still Clocked In'}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{record.totalTime !== null ? formatTime(record.totalTime) : 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
