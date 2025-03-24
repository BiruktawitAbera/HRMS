import React, { useState, useEffect } from 'react';
import AttendanceFormService from '../services/AttendanceFormService';
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

const AttendanceForm = () => {
  const [attendanceStatus, setAttendanceStatus] = useState({
    checkedIn: false,
    checkInTime: null,
    checkOutTime: null,
    totalTimeAttended: 0,
  });

  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [showSubmenu, setShowSubmenu] = useState(false);

  const handleSidebarToggle = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const handleSettingsClick = () => {
    setShowSubmenu(!showSubmenu);
  };

  useEffect(() => {
    if (attendanceStatus.checkInTime && attendanceStatus.checkOutTime) {
      const duration = attendanceStatus.checkOutTime - attendanceStatus.checkInTime;
      setAttendanceStatus((prevState) => ({
        ...prevState,
        totalTimeAttended: duration,
      }));
    }
  }, [attendanceStatus.checkInTime, attendanceStatus.checkOutTime]);

  const handleCheckIn = async () => {
    try {
      if (!attendanceStatus.checkedIn) {
        const date = new Date();
        const response = await AttendanceFormService.checkIn(date);
        console.log('Check-in response:', response);

        if (response.success) {
          setAttendanceStatus((prevState) => ({
            ...prevState,
            checkedIn: true,
            checkInTime: date.getTime(),
          }));
        } else {
          alert(`${response.message} Failed to check in.`);
        }
      } else {
        alert('You have already checked in. You can only check in once.');
      }
    } catch (error) {
      console.error('Error checking in:', error);
      alert('An error occurred while checking in.');
    }
  };

  const handleCheckOut = async () => {
    try {
      if (attendanceStatus.checkedIn) {
        const date = new Date();
        const response = await AttendanceFormService.checkOut(date);
        console.log('Check-out response:', response);

        if (response.success) {
          setAttendanceStatus((prevState) => ({
            ...prevState,
            checkedIn: false,
            checkOutTime: date.getTime(),
          }));
        } else {
          alert(`${response.message} Failed to check out.`);
        }
      } else {
        alert('You have not checked in yet. You can only check out after checking in.');
      }
    } catch (error) {
      console.error('Error checking out:', error);
      alert('An error occurred while checking out.');
    }
  };

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
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
      link: '',
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
                <button className="md:hidden" onClick={handleSidebarToggle}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
              <span className='cursor-pointer' onClick={handleSidebarToggle}></span>
            </div>
            <ul className={`space-y-2 ${openSidebarToggle ? 'block' : 'hidden md:block'}`}>
              {sidebarItems.map((item, index) => (
                <li key={index} className='sidebar-list-item'>
                  <a href={item.link} className='flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors' onClick={item.submenu ? handleSettingsClick : null}>
                    {item.icon}
                    <span>{item.text}</span>
                  </a>
                  {item.submenu && showSubmenu &&
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
        <div className="flex flex-1 justify-center items-start mt-10">
          <div className="w-full max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
            <h1 className="text-3xl font-bold mb-4">Attendance Tracker</h1>
            {attendanceStatus.checkedIn ? (
              <div>
                <p className="mb-4">Checked in at: {new Date(attendanceStatus.checkInTime).toLocaleString()}</p>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                  onClick={handleCheckOut}
                >
                  Check Out
                </button>
              </div>
            ) : (
              <button
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                onClick={handleCheckIn}
              >
                Check In
              </button>
            )}
            {attendanceStatus.checkOutTime && (
              <div className="mt-4">
                <p className="mb-2">Checked out at: {new Date(attendanceStatus.checkOutTime).toLocaleString()}</p>
                <p className="mb-2">Total time attended: {formatTime(attendanceStatus.totalTimeAttended)}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceForm;
