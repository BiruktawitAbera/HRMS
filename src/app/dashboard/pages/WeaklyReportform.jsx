import React, { useState } from 'react';
import {
  BsFillGearFill,
  BsPaypal,
  BsChatDots,
  BsPersonCircle,
} from 'react-icons/bs';
import { IoHomeOutline } from 'react-icons/io5';
import { SlCalender } from 'react-icons/sl';
import { FaRegCommentAlt } from 'react-icons/fa';
import { CiViewList } from 'react-icons/ci';
import { BiMoney } from 'react-icons/bi';
import { GiTrophyCup } from 'react-icons/gi';
import Header from '@/app/layout/Header';

const WeaklyReportForm = () => {
  const [reportFile, setReportFile] = useState(null);
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setReportFile(reader.result.split(',')[1]); // Remove the base64 prefix
      };
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you can send the reportFile (Base64 string) to your backend
    console.log("Base64 report file:", reportFile);
    // You can make a POST request to your backend to submit the report
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
        <div className="container mx-auto py-8 ">
          <h1 className="text-2xl font-bold mb-4 text-center">Insert Your Weekly Report</h1>
          <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-8 bg-gray-200 rounded shadow-md">
            <div className="mb-8">
              <label htmlFor="reportFile" className="block mb-4">Insert Weekly Report (PDF/DOCX):</label>
              <input
                type="file"
                id="reportFile"
                accept=".pdf,.docx"
                className="form-input block w-full border border-gray-300 rounded"
                onChange={handleFileChange}
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
            >
              Submit Report
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WeaklyReportForm;
