import React, { useState, useEffect } from 'react';
import { fetchLeaveHistory } from '../services/LeaveService';
import Header from '@/app/layout/Header';
import { BsDownload, BsChevronDown, BsBriefcaseFill, BsMenuButtonWideFill, BsPaypal, BsFillGrid3X3GapFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const LeaveReport = () => {
  const [leaveHistory, setLeaveHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [showReportsSubMenu, setShowReportsSubMenu] = useState(false);

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

  const handleDownload = (employeeId) => {
    console.log(`Download leave history for employee ID: ${employeeId}`);
  };

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const toggleReportsSubMenu = () => {
    setShowReportsSubMenu(!showReportsSubMenu);
  };

  return (
    <div className="flex flex-col h-screen">
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
        <div className="flex-1 p-8 bg-gray-200">
          <div className="max-w-4xl w-full p-8 bg-white rounded shadow-md mx-auto">
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
                        <th className="border px-4 py-2">Actions</th>
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
                          <td className="border px-4 py-2">
                            <button
                              onClick={() => handleDownload(leave.employeeId)}
                              className="text-blue-500 hover:text-blue-700"
                            >
                              <BsDownload className="text-lg" />
                            </button>
                          </td>
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

export default LeaveReport;
