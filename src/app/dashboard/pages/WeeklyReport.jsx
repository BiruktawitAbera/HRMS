import React, { useState } from 'react';
import { BsDownload } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Header from '@/app/layout/Header';
import {
  BsChevronDown,
  BsBriefcaseFill,
  BsMenuButtonWideFill,
  BsPaypal,
  BsFillGrid3X3GapFill,
} from 'react-icons/bs';

const WeeklyReport = () => {
  const [reports, setReports] = useState([]);
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [showReportsSubMenu, setShowReportsSubMenu] = useState(false);

  const handleFileChange = (e, reportId) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const updatedReports = reports.map(report =>
          report.id === reportId ? { ...report, reportFile: reader.result.split(',')[1] } : report
        );
        setReports(updatedReports);
      };
    }
  };

  const handleDownload = (base64String, fileName) => {
    const linkSource = `data:application/pdf;base64,${base64String}`;
    const downloadLink = document.createElement("a");
    const fileNameWithExtension = `${fileName}.pdf`;

    downloadLink.href = linkSource;
    downloadLink.download = fileNameWithExtension;
    downloadLink.click();
  };

  const OpenSidebar = () => setOpenSidebarToggle(!openSidebarToggle);
  const toggleReportsSubMenu = () => setShowReportsSubMenu(!showReportsSubMenu);

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
                <a href="/Performance" className='flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors'>
                  <BsFillGrid3X3GapFill className='text-lg mr-2' /> Performance
                </a>
              </li>
              <li className='sidebar-list-item'>
                <button onClick={toggleReportsSubMenu} className='flex items-center w-full hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors'>
                  <BsMenuButtonWideFill className='text-lg mr-2' /> Reports
                  <BsChevronDown className={`ml-auto ${showReportsSubMenu ? 'transform rotate-180' : ''}`} />
                </button>
                {showReportsSubMenu && (
                  <ul className="space-y-2 pl-4">
                    <li className='sidebar-list-item'>
                      <Link to="/LeaveReport" className='flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors'>
                        <BsMenuButtonWideFill className='text-lg mr-2' /> Leave Report
                      </Link>
                    </li>
                    <li className='sidebar-list-item'>
                      <Link to="/AttendanceReport" className='flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors'>
                        <BsMenuButtonWideFill className='text-lg mr-2' /> Attendance Report
                      </Link>
                    </li>
                    <li className='sidebar-list-item'>
                      <Link to="/WeeklyReport" className='flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors'>
                        <BsMenuButtonWideFill className='text-lg mr-2' /> Weekly Report
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
              <li className='sidebar-list-item'>
                <a href="/Leave" className='flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors'>
                  <BsBriefcaseFill className='text-lg mr-2' /> Leave
                </a>
              </li>
              <li className='sidebar-list-item'>
                <a href="/PayrollList" className='flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors'>
                  <BsPaypal className='text-lg mr-2' /> Salary
                </a>
              </li>
            </ul>
          </aside>
        </div>
        <div className="container mx-auto py-8">
          <h1 className="text-2xl font-bold mb-4">Weekly Reports</h1>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 text-left">Employee ID</th>
                <th className="py-2 px-4 text-left">Employee Name</th>
                <th className="py-2 px-4 text-left">Weekly Report</th>
                <th className="py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report.id} className="bg-white">
                  <td className="py-2 px-4">{report.employeeId}</td>
                  <td className="py-2 px-4">{report.employeeName}</td>
                  <td className="py-2 px-4">
                    <input
                      type="file"
                      accept=".pdf,.docx"
                      onChange={(e) => handleFileChange(e, report.id)}
                      className="form-input block w-full border border-gray-300 rounded"
                      required
                    />
                  </td>
                  <td className="py-2 px-4">
                    {report.reportFile && (
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handleDownload(report.reportFile, `${report.employeeId}_${report.id}`)}
                      >
                        <BsDownload className="inline-block mr-2" /> Download
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
      </div>
  );
};

export default WeeklyReport;

