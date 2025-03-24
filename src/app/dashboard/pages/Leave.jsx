import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/app/layout/Header';
import { fetchLeaveHistory, approveLeave, disapproveLeave } from '../services/LeaveService';
import { BsPaypal, BsFillGrid3X3GapFill, BsBriefcaseFill, BsMenuButtonWideFill, BsChevronDown } from 'react-icons/bs';

const Leave = () => {
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

  const handleApprove = async (leaveId) => {
    try {
      await approveLeave(leaveId);
      // Refresh leave history after approval
      const updatedLeaveHistory = await fetchLeaveHistory();
      setLeaveHistory(updatedLeaveHistory);
    } catch (error) {
      console.error('Error approving leave:', error);
    }
  };

  const handleDisapprove = async (leaveId) => {
    try {
      await disapproveLeave(leaveId);
      // Refresh leave history after disapproval
      const updatedLeaveHistory = await fetchLeaveHistory();
      setLeaveHistory(updatedLeaveHistory);
    } catch (error) {
      console.error('Error disapproving leave:', error);
    }
  };

  const handleSidebarToggle = () => {
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
                <a href="#" className='flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors'>
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
                <Link to="/Leave" className='flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors'>
                  <BsBriefcaseFill className='text-lg mr-2' /> Leave
                </Link>
              </li>
              <li className='sidebar-list-item'>
                <Link to="/PayrollList" className='flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors'>
                  <BsPaypal className='text-lg mr-2' /> Salary
                </Link>
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
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleApprove(leave.leaveId)}
                                className="bg-green-500 text-white px-3 py-1 rounded"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => handleDisapprove(leave.leaveId)}
                                className="bg-red-500 text-white px-3 py-1 rounded"
                              >
                                Disapprove
                              </button>
                            </div>
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

export default Leave;
