import Header from '@/app/layout/Header';
import React, { useState } from 'react';
import { FaRegCommentAlt } from 'react-icons/fa';
import { SlCalender } from 'react-icons/sl';
import { CiViewList } from 'react-icons/ci';
import { BiMoney } from 'react-icons/bi';
import { GiTrophyCup } from 'react-icons/gi';
import { IoHomeOutline } from 'react-icons/io5';
import EmployeeHome from './Home';
import {
  BsFillGearFill,
  BsChatDots,
  BsPersonCircle,
} from 'react-icons/bs';

function Employee({ openSidebarToggle, OpenSidebar }) {
  const [showSubmenu, setShowSubmenu] = useState(false);

  const menuItems = [
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
          text: 'EditProfilePage',
          link: '/EditProfilePage',
        },
        {
          icon: <BsChatDots className="text-base mr-2" />,
          text: 'Communication and Notification',
          link: '/CommunicationNotification',
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
    <div className="flex flex-col h-screen">
      {/* Header */}
      <Header />

      {/* Main content area */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div
          className={`${
            openSidebarToggle ? 'w-0' : 'w-64'
          } bg-white text-gray-800 overflow-y-auto p-4 transition-all duration-300 md:w-64 lg:w-64`}
        >
          <aside id="sidebar">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <button className="md:hidden" onClick={OpenSidebar}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
              <span className="cursor-pointer" onClick={OpenSidebar}></span>
            </div>
            <ul className={`space-y-2 ${openSidebarToggle ? 'block' : 'hidden md:block'}`}>
              {menuItems.map((menuItem, index) => (
                <li key={index} className="sidebar-list-item">
                  {menuItem.submenu ? (
                    <div onClick={() => setShowSubmenu(!showSubmenu)}>
                      <a
                        href={menuItem.link}
                        className="flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors"
                      >
                        {menuItem.icon}
                        <span className="ml-2">{menuItem.text}</span>
                      </a>
                      {showSubmenu && (
                        <ul className="ml-4">
                          {menuItem.submenu.map((subItem, subIndex) => (
                            <li key={subIndex} className="sidebar-list-item">
                              <a
                                href={subItem.link}
                                className="flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors"
                              >
                                {subItem.icon}
                                <span className="ml-2">{subItem.text}</span>
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <a
                      href={menuItem.link}
                      className="flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors"
                    >
                      {menuItem.icon}
                      <span className="ml-2">{menuItem.text}</span>
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </aside>
        </div>

        {/* Main Content */}
        <div className="flex flex-1 overflow-y-auto bg-gray-100 p-6">
          <div className="max-w-4xl mx-auto">
            <EmployeeHome />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Employee;
