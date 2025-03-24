import React, { useState } from 'react';
import { createTraining } from '../services/TrainingFormService'; // Assuming this is defined elsewhere
import Header from '@/app/layout/Header';
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

const TrainingForm = () => {
  const [formData, setFormData] = useState({
    type: 'video',
    title: '',
    description: '',
    url: null,
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [showSubmenu, setShowSubmenu] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'url') {
      setFormData({
        ...formData,
        url: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const base64File = await fileToBase64(formData.url);

      const formDataToSend = {
        type: formData.type,
        title: formData.title,
        description: formData.description,
        url: base64File,
      };

      const responseData = await createTraining(formDataToSend);
      setSuccess('Training created successfully!');
      console.log('Response:', responseData);
    } catch (error) {
      setError('Failed to create training');
    }
  };

  const handleSettingsClick = () => {
    setShowSubmenu(!showSubmenu);
  };

  const toggleSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Header />
      <div className="flex flex-1">
        <div
          className={`${
            openSidebarToggle ? 'sidebar-responsive' : ''
          } bg-white text-gray-800 overflow-y-auto p-4 transition-all duration-300 md:w-64 lg:w-64`}
        >
          {/* Sidebar content */}
          <div className="flex flex-col space-y-2">
            {sidebarItems.map((item, index) => (
              <React.Fragment key={index}>
                <a
                  href={item.link}
                  className="flex items-center p-2 rounded-md text-gray-600 hover:bg-gray-200"
                >
                  {item.icon}
                  <span className="ml-1">{item.text}</span>
                </a>
                {item.submenu && showSubmenu && (
                  <div className="pl-4">
                    {item.submenu.map((subItem, subIndex) => (
                      <a
                        key={subIndex}
                        href={subItem.link}
                        className="flex items-center p-2 rounded-md text-gray-600 hover:bg-gray-200"
                      >
                        {subItem.icon}
                        <span className="ml-1">{subItem.text}</span>
                      </a>
                    ))}
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center min-h-screen mx-auto">
          <form
            onSubmit={handleSubmit}
            className="space-y-4 p-6 bg-white shadow-md rounded"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="video">Video</option>
                <option value="document">Document</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Upload{' '}
                {formData.type === 'video' ? 'Video' : 'Document'}
              </label>
              <input
                type="file"
                name="url"
                accept={
                  formData.type === 'video' ? 'video/*' : '.pdf,.doc,.docx'
                }
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            {error && <div className="text-red-500">{error}</div>}
            {success && <div className="text-green-500">{success}</div>}
            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TrainingForm;