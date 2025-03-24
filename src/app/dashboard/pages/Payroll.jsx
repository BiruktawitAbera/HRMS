import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { PayrollService } from '../services/PayrollService';
import {
	BsFillGearFill,
	BsPaypal,
	BsPeopleFill,
	BsFillGrid3X3GapFill,
	BsBriefcaseFill,
	BsGrid1X2Fill,
	BsMenuButtonWideFill,
} from 'react-icons/bs';
import { FcDepartment } from 'react-icons/fc';
import Header from '@/app/layout/Header';

const Payroll = () => {
	const [submissionStatus, setSubmissionStatus] = useState('');
	const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
	const [showSubmenu, setShowSubmenu] = useState(false);
	const [step, setStep] = useState(1);

	const today = new Date().toISOString().split('T')[0];

	const handleSidebarToggle = () => {
		setOpenSidebarToggle(!openSidebarToggle);
	};

	const handleSettingsClick = () => {
		setShowSubmenu(!showSubmenu);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	const handleNextClick = () => {
		setStep(step + 1);
	};

	const handlePreviousClick = () => {
		setStep(step - 1);
	};

	const formik = useFormik({
		initialValues: {
			EmployeeId: '',
			SalaryType: 'Select Salary Type',
			Amount: '',
			PaymentDuration: 'Select Payment Duration',
			PaymentDate: '',
			Bonuses: '',
			StartDate: '',
			EndDate: '',
			PaymentStatus: 'Select Payment Status',
			PaymentMethod: 'Select Payment Method',
			NetPay: 0,
		},
		validationSchema: Yup.object({
			EmployeeId: Yup.string().required('Employee ID is required'),
			SalaryType: Yup.string()
				.notOneOf(['Select Salary Type'], 'Please select a salary type')
				.required('Salary Type is required'),
			Amount: Yup.number()
				.required('Amount is required')
				.positive('Amount must be positive'),
			PaymentDuration: Yup.string()
				.notOneOf(
					['Select Payment Duration'],
					'Please select a payment duration'
				)
				.required('Payment Duration is required'),
			PaymentDate: Yup.date()
				.required('Payment Date is required')
				.min(today, 'Payment Date cannot be earlier than today'),
			StartDate: Yup.date()
				.required('Start Date is required')
				.min(today, 'Start Date cannot be earlier than today'),
			EndDate: Yup.date()
				.required('End Date is required')
				.min(
					Yup.ref('StartDate'),
					'End Date must be greater than the start date'
				),
			Bonuses: Yup.number().positive('Bonuses must be positive'),
			PaymentStatus: Yup.string()
				.notOneOf(['Select Payment Status'], 'Please select a payment status')
				.required('Payment Status is required'),
			PaymentMethod: Yup.string()
				.notOneOf(['Select Payment Method'], 'Please select a payment method')
				.required('Payment Method is required'),
			NetPay: Yup.number()
				.required('Net Pay is required')
				.positive('Net Pay must be positive'),
		}),
		onSubmit: async (values, { resetForm }) => {
			if (step === 1) {
				handleNextClick();
			} else {
				const formattedValues = {
					...values,
					PaymentDate: values.PaymentDate
						? new Date(values.PaymentDate).toISOString().split('T')[0]
						: '',
					StartDate: values.StartDate
						? new Date(values.StartDate).toISOString().split('T')[0]
						: '',
					EndDate: values.EndDate
						? new Date(values.EndDate).toISOString().split('T')[0]
						: '',
				};

				try {
					await PayrollService.addPayroll(formattedValues);
					resetForm();
					setSubmissionStatus('Payroll added successfully!');
				} catch (error) {
					console.error(
						'Error adding payroll:',
						error.response ? error.response.data : error.message
					);
					setSubmissionStatus('Failed to add payroll. Please try again.');
				}
			}
		},
	});

	return (
		<div className="flex flex-col h-screen">
			<Header />
			<div className="flex flex-1">
				<div
					className={`${openSidebarToggle ? 'idebar-responsive' : ''} bg-white text-gray-800 overflow-y-auto p-4 transition-all duration-300 md:w-64 lg:w-64`}
				>
					<aside id="sidebar">
						<div className="flex items-center justify-between mb-4">
							<div className="flex items-center">
								<button className="md:hidden" onClick={handleSidebarToggle}>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="w-6 h-6"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M4 6h16M4 12h16M4 18h16"
										/>
									</svg>
								</button>
							</div>
							<span
								className="cursor-pointer"
								onClick={handleSidebarToggle}
							></span>
						</div>
						<ul
							className={`space-y-2 ${openSidebarToggle ? 'block' : 'hidden md:block'}`}
						>
							<li className="sidebar-list-item">
								<a
									href="#"
									className="flex items-center px-2 py-1 transition-colors rounded-lg hover:bg-blue-500 hover:text-white"
									onClick={handleSettingsClick}
								>
									<BsFillGearFill className="mr-2 text-lg" /> Settings
								</a>
								{showSubmenu && (
									<ul className="ml-4">
										<li className="sidebar-list-item">
											<a
												href="/PayrollSetting"
												className="flex items-center px-2 py-1 transition-colors rounded-lg hover:bg-blue-500 hover:text-white"
											>
												<BsPaypal className="mr-2 text-lg" /> Payroll Settings
											</a>
										</li>
										<li className="sidebar-list-item">
											<a
												href="/GeneralSettings"
												className="flex items-center px-2 py-1 transition-colors rounded-lg hover:bg-blue-500 hover:text-white"
											>
												<BsFillGearFill className="mr-2 text-lg" /> General
												Settings
											</a>
										</li>
										<li className="sidebar-list-item">
											<a
												href="/EmployeeData"
												className="flex items-center px-2 py-1 transition-colors rounded-lg hover:bg-blue-500 hover:text-white"
											>
												<BsPeopleFill className="mr-2 text-lg" /> Employee Data
											</a>
										</li>
										<li className="sidebar-list-item">
											<a
												href="/PerformanceManagement"
												className="flex items-center px-2 py-1 transition-colors rounded-lg hover:bg-blue-500 hover:text-white"
											>
												<BsFillGrid3X3GapFill className="mr-2 text-lg" />{' '}
												Performance Management
											</a>
										</li>
										<li className="sidebar-list-item">
											<a
												href="/LeaveManagement"
												className="flex items-center px-2 py-1 transition-colors rounded-lg hover:bg-blue-500 hover:text-white"
											>
												<BsBriefcaseFill className="mr-2 text-lg" /> Attendance
												and Leave Management
											</a>
										</li>
										<li className="sidebar-list-item">
											<a
												href="/TrainingDevelopment"
												className="flex items-center px-2 py-1 hover:bg-blue-500 hover:text-white"
											>
												<BsPaypal className="mr-2 text-lg" /> Training and
												Development{' '}
											</a>
										</li>
										<li className="sidebar-list-item">
											<a
												href="/Security"
												className="flex items-center px-2 py-1 transition-colors rounded-lg hover:bg-blue-500 hover:text-white"
											>
												<BsPaypal className="mr-2 text-lg" /> Security
											</a>
										</li>
									</ul>
								)}
							</li>
							<li className="sidebar-list-item">
								<a
									href="/Admin"
									className="flex items-center px-2 py-1 transition-colors rounded-lg hover:bg-blue-500 hover:text-white"
								>
									<BsGrid1X2Fill className="mr-2 text-lg" /> Dashboard
								</a>
							</li>
							<li className="sidebar-list-item">
								<a
									href="/Performance"
									className="flex items-center px-2 py-1 transition-colors rounded-lg hover:bg-blue-500 hover:text-white"
								>
									<BsFillGrid3X3GapFill className="mr-2 text-lg" /> Performance
								</a>
							</li>
							<li className="sidebar-list-item">
								<a
									href="/userlist"
									className="flex items-center px-2 py-1 transition-colors rounded-lg hover:bg-blue-500 hover:text-white"
								>
									<BsPeopleFill className="mr-2 text-lg" /> Employees
								</a>
							</li>
							<li className="sidebar-list-item">
								<a
									href="/Departmentlist"
									className="flex items-center px-2 py-1 transition-colors rounded-lg hover:bg-blue-500 hover:text-white"
								>
									<FcDepartment className="mr-2 text-lg" /> Department
								</a>
							</li>
							<li className="sidebar-list-item">
								<a
									href="/GenerateReport"
									className="flex items-center px-2 py-1 transition-colors rounded-lg hover:bg-blue-500 hover:text-white"
								>
									<BsMenuButtonWideFill className="mr-2 text-lg" /> Reports
								</a>
							</li>
							<li className="sidebar-list-item">
								<a
									href="/adminLeave"
									className="flex items-center px-2 py-1 transition-colors rounded-lg hover:bg-blue-500 hover:text-white"
								>
									<BsBriefcaseFill className="mr-2 text-lg" /> Leave
								</a>
							</li>
							<li className="sidebar-list-item">
								<a
									href="/Payroll"
									className="flex items-center px-2 py-1 transition-colors rounded-lg hover:bg-blue-500 hover:text-white"
								>
									<BsPaypal className="mr-2 text-lg" /> Salary
								</a>
							</li>
							<li className="sidebar-list-item">
								<a
									href="/TrainingForm"
									className="flex items-center px-2 py-1 transition-colors rounded-lg hover:bg-blue-500 hover:text-white"
								>
									<BsMenuButtonWideFill className="mr-2 text-lg" /> Training
								</a>
							</li>
						</ul>{' '}
					</aside>
				</div>
				<div className="flex-1 overflow-y-auto">
					<main className="h-full p-4 bg-gray-100 main-container sm:p-6">
						<h1 className="mb-4 text-3xl font-bold">Payroll Settings</h1>
						{submissionStatus && (
							<div
								className={`mb-4 p-2 rounded ${submissionStatus.includes('success') ? 'bg-green-500' : 'bg-red-500'} text-white`}
							>
								{submissionStatus}
							</div>
						)}
						{step === 1 && (
							<form
								className="p-6 mb-4 bg-white rounded-lg shadow-lg"
								onSubmit={handleSubmit}
							>
								<div className="flex flex-wrap mb-6 -mx-3">
									<div className="w-full p-3 md:w-1/2 xl:w-1/2">
										<label className="block mb-2 text-sm font-bold text-gray-700">
											Employee ID:
										</label>

										<input
											type="text"
											name="EmployeeId"
											value={formik.values.EmployeeId}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											className="w-full p-2 mb-2 border border-gray-300 rounded input-field"
										/>

										{formik.touched.EmployeeId && formik.errors.EmployeeId ? (
											<div className="text-sm text-red-500">
												{formik.errors.EmployeeId}
											</div>
										) : null}
									</div>

									<div className="w-full p-3 md:w-1/2 xl:w-1/2">
										<label className="block mb-2 text-sm font-bold text-gray-700">
											Amount:
										</label>

										<input
											type="text"
											name="Amount"
											value={formik.values.Amount}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											className="w-full p-2 mb-2 border border-gray-300 rounded input-field"
										/>

										{formik.touched.Amount && formik.errors.Amount ? (
											<div className="text-sm text-red-500">
												{formik.errors.Amount}
											</div>
										) : null}
									</div>

									<div className="w-full p-3 md:w-1/2 xl:w-1/2">
										<label className="block mb-2 text-sm font-bold text-gray-700">
											Start Date:
										</label>

										<input
											type="date"
											name="StartDate"
											value={formik.values.StartDate}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											className="w-full p-2 mb-2 border border-gray-300 rounded input-field"
										/>

										{formik.touched.StartDate && formik.errors.StartDate ? (
											<div className="text-sm text-red-500">
												{formik.errors.StartDate}
											</div>
										) : null}
									</div>

									<div className="w-full p-3 md:w-1/2 xl:w-1/2">
										<label className="block mb-2 text-sm font-bold text-gray-700">
											End Date:
										</label>

										<input
											type="date"
											name="EndDate"
											value={formik.values.EndDate}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											className="w-full p-2 mb-2 border border-gray-300 rounded input-field"
										/>

										{formik.touched.EndDate && formik.errors.EndDate ? (
											<div className="text-sm text-red-500">
												{formik.errors.EndDate}
											</div>
										) : null}
									</div>

									<div className="w-full p-3 md:w-1/2 xl:w-1/2">
										<label className="block mb-2 text-sm font-bold text-gray-700">
											Payment Date:
										</label>

										<input
											type="date"
											name="PaymentDate"
											value={formik.values.PaymentDate}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											className="w-full p-2 mb-2 border border-gray-300 rounded input-field"
										/>

										{formik.touched.PaymentDate && formik.errors.PaymentDate ? (
											<div className="text-sm text-red-500">
												{formik.errors.PaymentDate}
											</div>
										) : null}
									</div>

									<div className="w-full p-3 md:w-1/2 xl:w-1/2">
										<label className="block mb-2 text-sm font-bold text-gray-700">
											Bonuses:
										</label>

										<input
											type="text"
											name="Bonuses"
											value={formik.values.Bonuses}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											className="w-full p-2 mb-2 border border-gray-300 rounded input-field"
										/>

										{formik.touched.Bonuses && formik.errors.Bonuses ? (
											<div className="text-sm text-red-500">
												{formik.errors.Bonuses}
											</div>
										) : null}
									</div>
								</div>
								<button
									type="submit"
									className="px-4 py-2 font-bold text-white transition-colors bg-blue-500 rounded focus:outline-none focus:shadow-outline hover:bg-blue-600"
									onClick={handleNextClick}
								>
									Next
								</button>
							</form>
						)}
						{step === 2 && (
							<form
								onSubmit={formik.handleSubmit}
								className="p-6 mb-4 bg-white rounded-lg shadow-lg"
							>
								<div className="flex flex-wrap mb-6 -mx-3">
									<div className="w-full p-3 md:w-1/2 xl:w-1/2">
										<label className="block mb-2 text-sm font-bold text-gray-700">
											Salary Type:
										</label>

										<select
											name="SalaryType"
											value={formik.values.SalaryType}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											className="w-full p-2 mb-2 border border-gray-300 rounded input-field"
										>
											<option disabled>Select Salary Type</option>
											<option value="salaried">Salaried</option>
											<option value="contractual">Contractual</option>
										</select>

										{formik.touched.SalaryType && formik.errors.SalaryType ? (
											<div className="text-sm text-red-500">
												{formik.errors.SalaryType}
											</div>
										) : null}
									</div>

									<div className="w-full p-3 md:w-1/2 xl:w-1/2">
										<label className="block mb-2 text-sm font-bold text-gray-700">
											Payment Duration:
										</label>

										<select
											name="PaymentDuration"
											value={formik.values.PaymentDuration}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											className="w-full p-2 mb-2 border border-gray-300 rounded input-field"
										>
											<option disabled>Select Payment Duration</option>
											<option value="monthly">Monthly</option>
											<option value="bi-weekly">Bi-Weekly</option>
											<option value="weekly">Weekly</option>
										</select>

										{formik.touched.PaymentDuration &&
										formik.errors.PaymentDuration ? (
											<div className="text-sm text-red-500">
												{formik.errors.PaymentDuration}
											</div>
										) : null}
									</div>

									<div className="w-full p-3 md:w-1/2 xl:w-1/2">
										<label className="block mb-2 text-sm font-bold text-gray-700">
											Payment Status:
										</label>

										<select
											name="PaymentStatus"
											value={formik.values.PaymentStatus}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											className="w-full p-2 mb-2 border border-gray-300 rounded input-field"
										>
											<option disabled>Select Payment Status</option>
											<option value="pending">Pending</option>
											<option value="paid">Paid</option>
											<option value="delayed">Delayed</option>
										</select>

										{formik.touched.PaymentStatus &&
										formik.errors.PaymentStatus ? (
											<div className="text-sm text-red-500">
												{formik.errors.PaymentStatus}
											</div>
										) : null}
									</div>

									<div className="w-full p-3 md:w-1/2 xl:w-1/2">
										<label className="block mb-2 text-sm font-bold text-gray-700">
											Net Pay:
										</label>

										<input
											type="text"
											name="NetPay"
											value={formik.values.NetPay}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											className="w-full p-2 mb-2 border border-gray-300 rounded input-field"
										/>

										{formik.touched.NetPay && formik.errors.NetPay ? (
											<div className="text-sm text-red-500">
												{formik.errors.NetPay}
											</div>
										) : null}
									</div>
								</div>

								<div className="flex justify-between mt-4">
									<button
										type="button"
										onClick={handlePreviousClick}
										className="px-4 py-2 font-bold text-white transition-colors bg-gray-500 rounded focus:outline-none focus:shadow-outline hover:bg-gray-600"
									>
										Previous
									</button>

									<button
										type="submit"
										className="px-4 py-2 font-bold text-white transition-colors bg-blue-500 rounded focus:outline-none focus:shadow-outline hover:bg-blue-600"
									>
										Add Payroll
									</button>
								</div>
							</form>
						)}
					</main>
				</div>
			</div>
		</div>
	);
};

export default Payroll;
