import React, { useState, useEffect } from 'react';
import AttendanceService from '../services/AttendanceService';
import { BsDownload, BsChevronDown, BsBriefcaseFill, BsMenuButtonWideFill, BsPaypal, BsFillGrid3X3GapFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Header from '@/app/layout/Header';
const AttendanceReport = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [showReportsSubMenu, setShowReportsSubMenu] = useState(false);

  useEffect(() => {
    const fetchAttendanceRecords = async () => {
      try {
        const data = await AttendanceService.getAttendanceRecords();
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

  const downloadAttendanceRecord = (recordId) => {
  };

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const toggleReportsSubMenu = () => {
    setShowReportsSubMenu(!showReportsSubMenu);
  };

  return (
    <div className="flex flex-col h-screen">
          {/* Header component goes here */}
          <Header />
      <div className="flex flex-1">
        <div className={`${openSidebarToggle ? "sidebar-responsive" : ""} bg-white text-gray-800 overflow-y-auto p-4 transition-all duration-300 md:w-64 lg:w-64`}>
          <aside id="sidebar">
            <div className='flex justify-between items-center mb-4'>
              <div className='flex items-center'>
                <button className="md:hidden" onClick={OpenSidebar}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
              <span className='cursor-pointer' onClick={OpenSidebar}></span>
            </div>
            <ul className={`space-y-2 ${openSidebarToggle ? 'block' : 'hidden md:block'}`}>
              <li className='sidebar-list-item'>
                <a href="/Performance" className='flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors'>
                  <BsFillGrid3X3GapFill className='text-lg mr-2' /> Performance
                </a>
              </li>
              <li className='sidebar-list-item'>
                <button onClick={toggleReportsSubMenu} className='flex items-center w-full hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors'>
                  <BsMenuButtonWideFill className='text-lg mr-2' /> Reports
                  <BsChevronDown className={`ml-auto ${showReportsSubMenu ? 'transform rotate-180' : ''}`} />
                </button>
                {showReportsSubMenu && (
                  <ul className="space-y-2 pl-4">
                    <li className='sidebar-list-item'>
                      <Link to="/LeaveReport" className='flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors'>
                        <BsMenuButtonWideFill className='text-lg mr-2' /> Leave Report
                      </Link>
                    </li>
                    <li className='sidebar-list-item'>
                      <Link to="/AttendanceReport" className='flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors'>
                        <BsMenuButtonWideFill className='text-lg mr-2' /> Attendance Report
                      </Link>
                    </li>
                    <li className='sidebar-list-item'>
                      <Link to="/WeeklyReport" className='flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors'>
                        <BsMenuButtonWideFill className='text-lg mr-2' /> Weekly Report
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
              <li className='sidebar-list-item'>
                <a href="/Leave" className='flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors'>
                  <BsBriefcaseFill className='text-lg mr-2' /> Leave
                </a>
              </li>
              <li className='sidebar-list-item'>
                <a href="/PayrollList" className='flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors'>
                  <BsPaypal className='text-lg mr-2' /> Salary
                </a>
              </li>
            </ul>
          </aside>
        </div>
        <div className="container mx-auto py-8">
          <h1 className="text-2xl font-bold mb-4">Attendance Records</h1>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 text-left">Employee Name</th>
                <th className="py-2 px-4 text-left">Check-in Time</th>
                <th className="py-2 px-4 text                  -left">Check-out Time</th>
                <th className="py-2 px-4 text-left">Total Time Attended</th>
                <th className="py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {attendanceRecords.map((record, index) => (
                <tr key={record.id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                  <td className="py-2 px-4">{record.employeeName}</td>
                  <td className="py-2 px-4 ">{record.clockinTime}</td>
                  <td className="py-2 px-4">{record.clockoutTime || 'Still Clocked In'}</td>
                  <td className="py-2 px-4">{record.totalTime !== null ? formatTime(record.totalTime) : 'N/A'}</td>
                  <td className="py-2 px-4">
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => downloadAttendanceRecord(record.id)}
                    >
                      <BsDownload className="text-lg" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AttendanceReport;

