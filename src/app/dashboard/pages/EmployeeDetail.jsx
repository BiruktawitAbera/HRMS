import React, { useState, useEffect } from 'react';
import { getAllEmployees } from '../services/EmployeeDetaileService';
import FileUploadList from './FileuploadList';
import Header from '@/app/layout/Header';
import { BsGrid1X2Fill, BsFillGrid3X3GapFill, BsPeopleFill, BsMenuButtonWideFill, BsFillGearFill, BsBriefcaseFill, BsPaypal } from 'react-icons/bs';
import { FcDepartment } from 'react-icons/fc';

const EmployeeDetail = () => {
    const [employees, setEmployees] = useState([]);
    const [showMore, setShowMore] = useState({});
    const [error, setError] = useState(null);
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
    const [showSubmenu, setShowSubmenu] = useState(false);

    const OpenSidebar = () => {
        setOpenSidebarToggle(!openSidebarToggle);
    };

    const handleSettingsClick = () => {
        setShowSubmenu(!showSubmenu);
    };

    const toggleMore = (id) => {
        setShowMore((prevShowMore) => ({
            ...prevShowMore,
            [id]: !prevShowMore[id],
        }));
    };

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const data = await getAllEmployees();
                setEmployees(data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchEmployees();
    }, []);

    return (
        <div className="bg-white max-w-full mx-auto p-4 shadow-md rounded-md">
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
                                    <a href="#" className='flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors' onClick={handleSettingsClick}>
                                        <BsFillGearFill className='text-lg mr-2' /> Settings
                                    </a>
                                    {showSubmenu && (
                                        <ul className="ml-4">
                                            <li className='sidebar-list-item'>
                                                <a href="/PayrollSetting" className='flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors'>
                                                    <BsPaypal className='text-lg mr-2' /> Payroll Settings
                                                </a>
                                            </li>
                                            <li className='sidebar-list-item'>
                                                <a href="/GeneralSettings" className='flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors'>
                                                    <BsFillGearFill className='text-lg mr-2' /> General Settings
                                                </a>
                                            </li>
                                            <li className='sidebar-list-item'>
                                                <a href="/EmployeeData" className='flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors'>
                                                    <BsPeopleFill className='text-lg mr-2' /> Employee Data
                                                </a>
                                            </li>
                                            <li className='sidebar-list-item'>
                                                <a href="/PerformanceManagement" className='flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors'>
                                                    <BsFillGrid3X3GapFill className='text-lg mr-2' /> Performance Management
                                                </a>
                                            </li>
                                            <li className='sidebar-list-item'>
                                                <a href="/AttendanceAndLeave" className='flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors'>
                                                    <BsBriefcaseFill className='text-lg mr-2' /> Attendance and Leave Management
                                                </a>
                                            </li>
                                            <li className='sidebar-list-item'>
                                                <a href="/TrainingAndDevelopment" className='flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors'>
                                                    <BsPaypal className='text-lg mr-2' /> Training and Development
                                                </a>
                                            </li>
                                            <li className='sidebar-list-item'>
                                                <a href="/Security" className='flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors'>
                                                    <BsPaypal className='text-lg mr-2' /> Security
                                                </a>
                                            </li>
                                        </ul>
                                    )}
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
                                    <a href="UserList" className='flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors'>
                                        <BsPeopleFill className='text-lg mr-2' /> Employees
                                    </a>
                                </li>
                                <li className='sidebar-list-item'>
                                    <a href="DepartmentList" className='flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors'>
                                        <FcDepartment className='text-lg mr-2' /> Department
                                    </a>
                                </li>
                                <li className='sidebar-list-item'>
                                    <a href="/GenerateReport" className='flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors'>
                                        <BsMenuButtonWideFill className='text-lg mr-2' /> Reports
                                    </a>
                                </li>
                                                             
                                <li className='sidebar-list-item'>
                                    <a href="/AdminLeave" className='flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors'>
                                        <BsBriefcaseFill className='text-lg mr-2' /> Leave
                                    </a>
                                </li>
                                <li className='sidebar-list-item'>
                                    <a href="/payroll" className='flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors'>
                                        <BsPaypal className='text-lg mr-2' /> Salary
                                    </a>
                                </li>
                            </ul>
                        </aside>
                    </div>
                    <div className="flex flex-col flex-1">
                        <h2 className="text-3xl font-semibold mb-6 text-center">Employee Details</h2>
                        {error && <p className="text-red-500 text-center">{error}</p>}
                        <table className="min-w-full bg-white border-collapse">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border px-4 py-2">Employee ID</th>
                                    <th className="border px-4 py-2">First Name</th>
                                    <th className="border px-4 py-2">Last Name</th>
                                    <th className="border px-4 py-2">Gender</th>
                                    <th className="border px-4 py-2">Date of Birth</th>
                                    <th className="border px-4 py-2">Phone Number</th>
                                    <th className="border px-4 py-2">Address</th>
                                    <th className="border px-4 py-2">Email</th>
                                    <th className="border px-4 py-2">Department</th>
                                    <th className="border px-4 py-2">Role</th>
                                    <th className="border px-4 py-2">More</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employees.map((employee) => (
                                    <React.Fragment key={employee.employeeId}>
                                        <tr className="bg-gray-100">
                                            <td className="border px-4 py-2">{employee.employeeId}</td>
                                            <td className="border px-4 py-2">{employee.employeeFirstName}</td>
                                            <td className="border px-4 py-2">{employee.employeeLastName}</td>
                                            <td className="border px-4 py-2">{employee.gender}</td>
                                            <td className="border px-4 py-2">{employee.employyDOB}</td>
                                            <td className="border px-4 py-2">{employee.employeePhone}</td>
                                            <td className="border px-4 py-2">{employee.employeeAddress}</td>
                                            <td className="border px-4 py-2">{employee.employeeEmail}</td>
                                            <td className="border px-4 py-2">{employee.departmentName}</td>
                                            <td className="border px-4 py-2">{employee.role}</td>
                                            <td className="border px-4 py-2">
                                                <button
                                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                                    onClick={() => toggleMore(employee.employeeId)}
                                                >
                                                    {showMore[employee.employeeId] ? 'Less' : 'More'}
                                                </button>
                                            </td>
                                        </tr>
                                        {showMore[employee.employeeId] && (
                                            <tr className="bg-gray-200">
                                                <td colSpan="11" className="border px-4 py-2">
                                                    <FileUploadList employeeId={employee.employeeId} />
                                                </td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
                                
    );
};

export default EmployeeDetail;

