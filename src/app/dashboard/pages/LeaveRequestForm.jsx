import React, { useState, useEffect } from 'react';
import LeaveRequestFormService from '../services/LeaveRequestFormService';
import Header from '@/app/layout/Header';
import { FaRegCommentAlt } from 'react-icons/fa';
import { SlCalender } from 'react-icons/sl';
import { CiViewList } from 'react-icons/ci';
import { BiMoney } from 'react-icons/bi';
import { GiTrophyCup } from 'react-icons/gi';
import { IoHomeOutline } from 'react-icons/io5';
import {
  BsFillGearFill,
  BsPaypal,
  BsChatDots,
  BsPersonCircle,
} from 'react-icons/bs';

const LeaveRequestForm = () => {
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [formData, setFormData] = useState({
    LeaveType: '',
    StartDate: '',
    EndDate: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  useEffect(() => {
    const fetchLeaveTypes = async () => {
      try {
        const types = await LeaveRequestFormService.getLeaveTypes();
        setLeaveTypes(types);
      } catch (error) {
        console.error(error);
        setError('Failed to fetch leave types. Please try again.');
      }
    };
    fetchLeaveTypes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await LeaveRequestFormService.submitLeaveRequest(formData);
      console.log('Leave request submitted:', response);
      setSuccessMessage('Leave request submitted successfully.');
    } catch (error) {
      console.error('Error submitting leave request:', error);
      setError('Failed to submit leave request. Please ensure you are logged in.');
    } finally {
      setLoading(false);
    }
  };

  const toggleSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  // Sidebar Items
  const sidebarItems = [
    {
      icon: <IoHomeOutline className="text-lg mr-2" />,
      text: 'Home',
      link: '/Employee',
    },
    {
      icon: <BsFillGearFill className="text-lg mr-2" />,
      text: 'Settings',
      submenu: [
        {
          icon: <BsPersonCircle className="text-base mr-2" />,
          text: 'Edit Profile',
          link: '/EditProfilePage',
        },
        {
          icon: <BsChatDots className="text-base mr-2" />,
          text: 'Communication and Notification',
          link: '/CommunicationNotification',
        },
        {
          icon: <BsPaypal className="text-base mr-2" />,
          text: 'Security',
          link: '/Security',
        },
      ],
    },
    {
      icon: <SlCalender className="text-lg mr-2" />,
      text: 'Attendance',
      link: '/AttendanceForm',
    },
    {
      icon: <FaRegCommentAlt className="text-lg mr-2" />,
      text: 'Leave',
      link: '/LeaveRequestForm',
    },
    {
      icon: <CiViewList className="text-lg mr-2" />,
      text: 'Report',
      link: '/WeaklyReportForm',
    },
    {
      icon: <BiMoney className="text-lg mr-2" />,
      text: 'Finance',
      link: '',
    },
    {
      icon: <GiTrophyCup className="text-lg mr-2" />,
      text: 'Performance',
      link: '',
    },
    {
      icon: <CiViewList className="text-lg mr-2" />,
      text: 'Training',
      link: '/TrainingList',
  },
];
  

  return (
    <div className="flex flex-col h-screen bg-gray-100">
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
              {sidebarItems.map((item, index) => (
                <li key={index} className='sidebar-list-item'>
                  <a href={item.link} className='flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors' onClick={item.submenu ? toggleSidebar : null}>
                    {item.icon}
                    <span>{item.text}</span>
                  </a>
                  {item.submenu && openSidebarToggle &&
                    <ul className="ml-4">
                      {item.submenu.map((subItem, subIndex) => (
                        <li key={subIndex} className='sidebar-list-item'>
                          <a href={subItem.link} className='flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors'>
                            {subItem.icon}
                            <span>{subItem.text}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  }
                </li>
              ))}
            </ul>
          </aside>
        </div>

        <div className="max-w-xl mx-auto mt-10 p-8 bg-white shadow-lg rounded-lg" style={{ width: "600px" }}>
          <h1 className="text-2xl font-bold mb-6 text-center">Leave Request Form</h1>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Leave Type:</label>
              <select
                value={formData.LeaveType}
                onChange={(e) => setFormData({ ...formData, LeaveType: e.target.value })}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Select Leave Type</option>
                {leaveTypes.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
                            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Start Date:</label>
            <input
              type="date"
              value={formData.StartDate}
              onChange={(e) => setFormData({ ...formData, StartDate: e.target.value })}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">End Date:</label>
            <input
              type="date"
              value={formData.EndDate}
              onChange={(e) => setFormData({ ...formData, EndDate: e.target.value })}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Submit Leave Request'}
          </button>
        </form>
      </div>
    </div>
  </div>
);
};

export default LeaveRequestForm;

             
