import React, { useState, useEffect } from 'react';
import Header from './Header';
import Home from '../dashboard/pages/Dashboard';
import { FcDepartment } from "react-icons/fc";
import {
  BsGrid1X2Fill, BsFillGrid3X3GapFill, BsPeopleFill,
  BsListCheck, BsMenuButtonWideFill, BsFillGearFill, BsBriefcaseFill, BsPaypal} from 'react-icons/bs';

// eslint-disable-next-line react/prop-types
function Sidebar({ openSidebarToggle, OpenSidebar }) {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        // Fetch menu items from the backend API
        const response = await fetch('/api/menu'); // Replace '/api/menu' with your actual API endpoint
        if (response.ok) {
          const data = await response.json();
          setMenuItems(data);
        } else {
          throw new Error('Failed to fetch menu data');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchMenuData();
  }, []);

  // Define user roles (replace this with actual user roles)
  const userRoles = ['admin']; // Example: User has 'admin' role

  // Filter menu items based on user roles
  const filteredMenuItems = menuItems.filter(item => userRoles.includes(item.role));

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
                <a href="" className='flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors'>
                  <BsFillGearFill className='text-lg mr-2' /> Setting
                </a>
              </li>
              <li className='sidebar-list-item'>
                <a href="" className='flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors'>
                  <BsGrid1X2Fill className='text-lg mr-2' /> Dashboard
                </a>
              </li>
              <li className='sidebar-list-item'>
                <a href="Performance" className='flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors'>
                  <BsFillGrid3X3GapFill className='text-lg mr-2' /> Performance
                </a>
              </li>
              <li className='sidebar-list-item'>
                <a href="Employee" className='flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors'>
                  <BsPeopleFill className='text-lg mr-2' /> Employees
                </a>
              </li>
              <li className='sidebar-list-item'>
                <a href="" className='flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors'>
                  <BsListCheck className='text-lg mr-2' /> Attendance
                </a>
              </li>
              <li className='sidebar-list-item'>
                <a href="" className='flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors'>
                  <FcDepartment className='text-lg mr-2' /> Department
                </a>
              </li>
              <li className='sidebar-list-item'>
                <a href="/Report" className='flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors'>
                  <BsMenuButtonWideFill className='text-lg mr-2' /> Reports
                </a>
              </li>
              <li className='sidebar-list-item'>
                <a href="/Leave" className='flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors'>
                  <BsBriefcaseFill className='text-lg mr-2' /> Leave
                </a>
              </li>
              <li className='sidebar-list-item'>
                <a href="/Salary" className='flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors'>
                  <BsPaypal className='text-lg mr-2' /> Salary
                </a>
              </li>
              
            </ul>
          </aside>
        </div>
        <div className="flex-1 overflow-y-auto">
          <Home />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
