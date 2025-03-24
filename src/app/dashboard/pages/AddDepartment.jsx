import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import addDepartment from '../services/AddDepartmentService';
import Header from '@/app/layout/Header';
import { BsPaypal, BsPeopleFill, BsFillGrid3X3GapFill, BsBriefcaseFill, BsGrid1X2Fill, BsMenuButtonWideFill } from 'react-icons/bs';
import { FcDepartment } from 'react-icons/fc';

const AddDepartment = () => {
  const navigate = useNavigate();

  const [departmentName, setDepartmentName] = useState('');
  const [departmentDescription, setDepartmentDescription] = useState('');
  const [error, setError] = useState(null);

  const handleDepartmentNameChange = (event) => {
    setDepartmentName(event.target.value);
  };

  const handleDepartmentDescriptionChange = (event) => {
    setDepartmentDescription(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await addDepartment(departmentName, departmentDescription);
      setDepartmentName('');
      setDepartmentDescription('');
      navigate('/DepartmentList');
    } catch (error) {
      setError('Failed to add department');
    }
  };

  return (
    <div className="flex h-screen flex-col">
      {/* Header */}
      <Header />

      <div className="flex flex-grow">
        {/* Sidebar */}
        <div className="bg-white text-gray-800 overflow-y-auto p-4 md:w-64 lg:w-64">
          {/* Sidebar content */}
          <ul className="space-y-2">
            <li className="sidebar-list-item">
              <Link to="/Dashboard" className="flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors">
                <BsGrid1X2Fill className="text-lg mr-2" /> Dashboard
              </Link>
            </li>
            <li className="sidebar-list-item">
              <Link to="/Performance" className="flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors">
                <BsFillGrid3X3GapFill className="text-lg mr-2" /> Performance
              </Link>
            </li>
            <li className="sidebar-list-item">
              <Link to="/userlist" className="flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors">
                <BsPeopleFill className="text-lg mr-2" /> Employees
              </Link>
            </li>
            <li className="sidebar-list-item">
              <Link to="/Department" className="flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors">
                <FcDepartment className="text-lg mr-2" /> Department
              </Link>
            </li>
            <li className="sidebar-list-item">
              <Link to="/GenerateReport" className="flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors">
                <BsMenuButtonWideFill className="text-lg mr-2" /> Reports
              </Link>
            </li>
            <li className="sidebar-list-item">
              <Link to="/Leave" className="flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors">
                <BsBriefcaseFill className="text-lg mr-2" /> Leave
              </Link>
            </li>
            <li className="sidebar-list-item">
              <Link to="/Payroll" className="flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors">
                <BsPaypal className="text-lg mr-2" /> Salary
              </Link>
            </li>
            <li className='sidebar-list-item'>
                <a href="/TrainingForm" className='flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors'>
                  <BsMenuButtonWideFill className='text-lg mr-2' /> Training
                </a>
              </li>
          </ul>
        </div>

        {/* Main content */}
        <main className="flex flex-col items-center justify-center flex-grow bg-gray-100">
          <div className="bg-white p-8 rounded shadow-md">
            <h2 className="text-3xl font-semibold mb-6 text-center">Add Department</h2>
            {error && <div className="text-red-600 mb-4">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="departmentName" className="block font-medium mb-1">
                  Department Name:
                </label>
                <input
                  type="text"
                  id="departmentName"
                  value={departmentName}
                  onChange={handleDepartmentNameChange}
                  className="border border-gray-300 rounded px-3 py-2 w-full sm:w-64 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="departmentDescription" className="block font-medium mb-1">
                  Department Description:
                </label>
                <textarea
                  id="departmentDescription"
                  value={departmentDescription}
                  onChange={handleDepartmentDescriptionChange}
                  className="border border-gray-300 rounded px-3 py-2 w-full h-32 resize-none focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                ></textarea>
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  Add Department
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddDepartment;
