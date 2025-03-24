import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch } from 'react-icons/bs';

function Header({ employeeFirstName, employeeLastName }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    console.log('Logged out');
    navigate('/');
  };

  const handleViewProfile = () => {
    navigate('/profile');
  };

  // Constructing the full name
  const fullName = `${employeeFirstName} ${employeeLastName}`;

  return (
    <header className='header bg-white shadow-md py-4 px-6 flex justify-between items-center'>
      <div className='flex items-center'>
        <div className='text-gray-800 font-bold text-xl'>Xceltech Solutions PLC</div>
      </div>
      <div className='header-left flex items-center bg-gray-200 rounded-md px-4 py-2 flex-1 md:flex-initial'>
        <BsSearch className='icon text-gray-600 mr-2' />
        <input type="text" placeholder="Search" className="bg-transparent focus:outline-none text-gray-700 w-full md:w-auto" />
      </div>
      <div className='header-right flex items-center space-x-6'>
        <BsFillBellFill className='icon text-gray-600 hover:text-blue-500 transition duration-200' />
        <BsFillEnvelopeFill className='icon text-gray-600 hover:text-blue-500 transition duration-200' />
        <div className='relative'>
          <BsPersonCircle className={`icon text-gray-600 cursor-pointer hover:text-blue-500 transition duration-200 ${isDropdownOpen ? 'text-blue-500' : ''}`} onClick={toggleDropdown} />
          {isDropdownOpen && (
            <div className='absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg'>
              <div className='p-4'>
                <div className='text-gray-800 font-semibold mb-2'>{fullName}</div>
                <button className='w-full text-left text-gray-600 hover:text-blue-500 py-2' onClick={handleViewProfile}>
                  Profile
                </button>
                <button className='w-full text-left text-gray-600 hover:text-red-500 py-2' onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
