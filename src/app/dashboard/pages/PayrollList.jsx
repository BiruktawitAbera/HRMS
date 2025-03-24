import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BsPaypal, BsFillGrid3X3GapFill, BsBriefcaseFill, BsMenuButtonWideFill, BsChevronDown } from 'react-icons/bs';
import Header from '@/app/layout/Header';

const PayrollList = () => {
    const [payrolls, setPayrolls] = useState([]);
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
    const [showReportsSubMenu, setShowReportsSubMenu] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('https://localhost:5001/api/PayRoll/getAllPayRolls');
            console.log('Fetched payrolls:', response.data); // Log fetched data
            if (Array.isArray(response.data)) {
                setPayrolls(response.data);
            } else {
                console.error('Fetched data is not an array:', response.data);
            }
        } catch (error) {
            console.error('Error fetching payrolls:', error);
        }
    };

    const handleSidebarToggle = () => {
        setOpenSidebarToggle(!openSidebarToggle);
    };

    const toggleReportsSubMenu = () => {
        setShowReportsSubMenu(!showReportsSubMenu);
    };

    return (
        <div className="flex flex-col h-screen">
            <Header />
            <div className="flex flex-1">
                <div className={`${openSidebarToggle ? "sidebar-responsive" : ""} bg-white text-gray-800 overflow-y-auto p-4 transition-all duration-300 md:w-64 lg:w-64`}>
                    <aside id="sidebar">
                        <div className='flex justify-between items-center mb-4'>
                            <div className='flex items-center'>
                                <button className="md:hidden" onClick={handleSidebarToggle}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                </button>
                            </div>
                            <span className='cursor-pointer' onClick={handleSidebarToggle}></span>
                        </div>
                        <ul className={`space-y-2 ${openSidebarToggle ? 'block' : 'hidden md:block'}`}>
                            <li className='sidebar-list-item'>
                                <a href="" className='flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors'>
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
                <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
                    <h1 className="text-3xl font-bold mb-4">Employee Payroll List</h1>
                    <table className="min-w-full bg-white shadow-md rounded mb-4">
                        <thead>
                            <tr>
                                <th className="border px-4 py-2">Employee Name</th>
                                <th className="border px-4 py-2">Employee ID</th>
                                <th className="border px-4 py-2">Salary Type</th>
                                <th className="border px-4 py-2">Amount</th>
                                <th className="border px-4 py-2">Payment Duration</th>
                                <th className="border px-4 py-2">Payment Date</th>
                                <th className="border px-4 py-2">Bonuses</th>
                                <th className="border px-4 py-2">Payroll Start Date</th>
                                <th className="border px-4 py-2">Payroll End Date</th>
                                <th className="border px-4 py-2">Payment Status</th>
                                <th className="border px-4 py-2">Payment Method</th>
                                <th className="border px-4 py-2">Net Pay</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payrolls.map(payroll => (
                                <tr key={payroll.employeeId}>
                                    <td className="border px-4 py-2">{payroll.employeeName}</td>
                                    <td className="border px-4 py-2">{payroll.employeeId}</td>
                                    <td className="border px-4 py-2">{payroll.salaryType}</td>
                                    <td className="border px-4 py-2">{payroll.amount}</td>
                                    <td className="border px-4 py-2">{payroll.paymentDuration}</td>
                                    <td className="border px-4 py-2">{payroll.paymentDate}</td>
                                    <td className="border px-4 py-2">{payroll.bonus}</td>
                                    <td className="border px-4 py-2">{payroll.payrollStartDate}</td>
                                    <td className="border px-4 py-2">{payroll.payrollEndDate}</td>
                                    <td className="border px-4 py-2">{payroll.paymentStatus}</td>
                                    <td className="border px-4 py-2">{payroll.paymentMethod}</td>
                                    <td className="border px-4 py-2">{payroll.netPay}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PayrollList;
