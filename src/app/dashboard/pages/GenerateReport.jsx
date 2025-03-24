import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsPaypal, BsPeopleFill, BsFillGrid3X3GapFill, BsBriefcaseFill, BsGrid1X2Fill, BsMenuButtonWideFill } from 'react-icons/bs';
import { FcDepartment } from 'react-icons/fc';
import Header from '@/app/layout/Header';

const GenerateReport = () => {
  const [reportType, setReportType] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [reportFile, setReportFile] = useState(null);
  const [submitted, setSubmitted] = useState(false);

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
    if (reportType && employeeId && employeeName && reportFile) {
      // You can extend this function to handle report submission logic
      console.log("Base64 file content:", reportFile); // Logging the Base64 content for now
      setSubmitted(true);
    } else {
      alert('Please fill out all fields and upload a report before submitting.');
    }
  };

  return (
    <div>
      <Header />

      <div className="flex flex-grow">
        <div className="bg-white text-gray-800 overflow-y-auto p-4 md:w-64 lg:w-64">
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
              <Link to="/AdminLeave" className="flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors">
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
        <div className="container mx-auto py-8">
          <h1 className="text-2xl font-bold mb-4">Generate Report</h1>
          {submitted ? (
            <div className="max-w-md mx-auto p-6 bg-gray-200 rounded shadow-md">
              <h2 className="text-green-600 mb-4">Submitted Successfully</h2>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div className="mb-4">
                <label htmlFor="employeeId" className="block text-gray-700 text-sm font-bold mb-2">Employee ID:</label>
                <input
                  type="text"
                  id="employeeId"
                  className="form-input block w-full border border-gray-300 rounded-md py-2 px-4"
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="employeeName" className="block text-gray-700 text-sm font-bold mb-2">Employee Name:</label>
                <input
                  type="text"
                  id="employeeName"
                  className="form-input block w-full border border-gray-300 rounded-md py-2 px-4"
                  value={employeeName}
                  onChange={(e) => setEmployeeName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="reportType" className="block text-gray-700 text-sm font-bold mb-2">Select Report Type:</label>
                <select
                  id="reportType"
                  className="form-select block w-full border border-gray-300 rounded-md py-2 px-4"
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  required
                >
                  <option value="" disabled hidden>
                    Select report type...
                  </option>
                  <option value="termination">Employee Termination</option>
                  <option value="feedback">Employee Feedback</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="reportFile" className="block text-gray-700 text-sm font-bold mb-2">Upload Report (PDF/DOCX):</label>
                <input
                  type="file"
                  id="reportFile"
                  accept=".pdf,.docx"
                  className="form-input block w-full border border-gray-300 rounded-md py-2 px-4"
                  onChange={handleFileChange}
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Submit Report
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default GenerateReport;
