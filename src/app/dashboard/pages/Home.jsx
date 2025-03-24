import React from 'react';
import { FcLeave } from 'react-icons/fc';
import { BsPeopleFill } from 'react-icons/bs';
import { GiTakeMyMoney } from 'react-icons/gi';

const EmployeeHome = () => {
  return (
    <main className="main-container bg-gray-100 p-4 sm:p-6">
      <div className="main-title mb-4 sm:mb-6">
        <h3 className="text-xl sm:text-3xl font-bold text-gray-800">Dashboard</h3>
      </div>

      <div className="main-cards grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* Cards */}
        <div className="card bg-white rounded-lg shadow-md p-6 flex items-center justify-between transition-transform transform hover:-translate-y-1">
          <div className="card-icon bg-blue-500 text-white rounded-full p-4 transition-all duration-300 ease-in-out hover:bg-blue-600 hover:scale-110">
            <GiTakeMyMoney size={24} />
          </div>
          <div className="card-content ml-4">
            <h4 className="text-xl font-bold text-gray-800">Salary</h4>
            <p className="text-gray-500">Manage your salary details</p>
          </div>
        </div>
        <div className="card bg-white rounded-lg shadow-md p-6 flex items-center justify-between transition-transform transform hover:-translate-y-1">
          <div className="card-icon bg-green-500 text-white rounded-full p-4 transition-all duration-300 ease-in-out hover:bg-green-600 hover:scale-110">
            <FcLeave size={24} />
          </div>
          <div className="card-content ml-4">
            <h4 className="text-xl font-bold text-gray-800">Leave</h4>
            <p className="text-gray-500">Request and manage your leaves</p>
          </div>
        </div>
        <div className="card bg-white rounded-lg shadow-md p-6 flex items-center justify-between transition-transform transform hover:-translate-y-1">
          <div className="card-icon bg-yellow-500 text-white rounded-full p-4 transition-all duration-300 ease-in-out hover:bg-yellow-600 hover:scale-110">
            <BsPeopleFill size={24} />
          </div>
          <div className="card-content ml-4">
            <h4 className="text-xl font-bold text-gray-800">Employee</h4>
            <p className="text-gray-500">View employee information</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default EmployeeHome;
