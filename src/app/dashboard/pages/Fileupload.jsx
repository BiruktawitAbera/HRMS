import { useFormik } from 'formik';
import * as Yup from 'yup';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Label } from '@radix-ui/react-label';
import { Input } from '@/app/components/Input/input';
import axios from 'axios';
import Header from '@/app/layout/Header';
import { 
    BsFillGearFill, 
    BsPaypal, 
    BsPeopleFill, 
    BsFillGrid3X3GapFill, 
    BsBriefcaseFill, 
    BsGrid1X2Fill, 
    BsMenuButtonWideFill 
} from 'react-icons/bs';
import { FcDepartment } from 'react-icons/fc';

const FileUploadPage = () => {
    const [submissionStatus, setSubmissionStatus] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [uploadedData, setUploadedData] = useState(null);
    const [error, setError] = useState('');
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
    const [showSubmenu, setShowSubmenu] = useState(false);
    const navigate = useNavigate();
    const { employeeId } = useParams();

    useEffect(() => {
        if (!employeeId) {
            console.error('Employee ID is not provided.');
            navigate('/'); // Redirect to a relevant page if employeeId is missing
        }
    }, [employeeId, navigate]);

    const toBase64 = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    const uploadFiles = async (data, userId) => {
        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                throw new Error('No auth token found');
            }

            const url = `https://localhost:5001/api/EmployeeFile?userId=${userId}`;

            const response = await axios.post(url, data, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            });

            return response.data;
        } catch (error) {
            console.error('Error uploading files:', error);
            throw error;
        }
    };

    const formik = useFormik({
        initialValues: {
            resume: null,
            certeficate: null,
            educationalCredential: null,
            employeeImage: null,
        },
        validationSchema: Yup.object({
            resume: Yup.mixed()
                .required('Resume is required')
                .test('fileFormat', 'PDF only', (value) => value && value.type === 'application/pdf'),
            certeficate: Yup.mixed().test('fileFormat', 'Document or PDF only', (value) =>
                !value || (value.type === 'application/pdf' || value.type.includes('document'))
            ),
            educationalCredential: Yup.mixed()
                .required('Educational credential is required')
                .test('fileFormat', 'PDF only', (value) => value && value.type === 'application/pdf'),
            employeeImage: Yup.mixed()
                .required('Employee image is required')
                .test('fileFormat', 'Image only', (value) => value && value.type.startsWith('image/')),
        }),
        onSubmit: async (values) => {
            setIsLoading(true);
            setError('');
            try {
                const data = {
                    resume: values.resume ? await toBase64(values.resume) : null,
                    certeficate: values.certeficate ? await toBase64(values.certeficate) : null,
                    educationalCredential: values.educationalCredential ? await toBase64(values.educationalCredential) : null,
                    employeeImage: values.employeeImage ? await toBase64(values.employeeImage) : null,
                };

                const response = await uploadFiles(data, employeeId);
                setUploadedData(response); // Save the uploaded data to state for display
                setSubmissionStatus('Submitted successfully');
                setIsLoading(false);
                navigate('/EmployeeDetail');
            } catch (error) {
                setSubmissionStatus('Submission failed');
                setError('Failed to upload files. Please try again.');
                setIsLoading(false);
                console.error('Error uploading files:', error);
            }
        },
    });

    const handleFileChange = (e) => {
        const { name } = e.target;
        formik.setFieldValue(name, e.target.files[0]);
    };

    const handleSidebarToggle = () => {
        setOpenSidebarToggle(!openSidebarToggle);
    };

    const handleSettingsClick = () => {
        setShowSubmenu(!showSubmenu);
    };

    return (
        <div className="flex flex-col h-screen bg-gray-100">
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
                                            <a href="/LeaveManagement" className='flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors'>
                                                <BsBriefcaseFill className='text-lg mr-2' /> Attendance and Leave Management
                                            </a>
                                        </li>
                                        <li className='sidebar-list-item'>
                                            <a href="/TrainingDevelopment" className='flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors'>
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
                                <a href="/Admin" className='flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors'>
                                    <BsGrid1X2Fill className='text-lg mr-2' /> Dashboard
                                </a>
                            </li>
                            <li className='sidebar-list-item'>
                                <a href="/Performance" className='flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors'>
                                    <BsFillGrid3X3GapFill className='text-lg mr-2' /> Performance
                                </a>
                            </li>
                            <li className='sidebar-list-item'>
                                <a href="/userlist" className='flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors'>
                                    <BsPeopleFill className='text-lg mr-2' /> Employees
                                </a>
                            </li>
                            <li className='sidebar-list-item'>
                                <a href="/Departmentlist" className='flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors'>
                                    <FcDepartment className='text-lg mr-2' /> Department
                                </a>
                            </li>
                            <li className='sidebar-list-item'>
                                <Link to="/GenerateReport" className='flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors'>
                                    <BsMenuButtonWideFill className='text-lg mr-2' /> Reports
                                </Link>
                            </li>
                            <li className='sidebar-list-item'>
                                <a href="/AdminLeave" className='flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors'>
                                    <BsBriefcaseFill className='text-lg mr-2' /> Leave
                                </a>
                            </li>
                            <li className='sidebar-list-item'>
                                <a href="/Payroll" className='flex items-center hover:bg-blue-500 hover:text-white px-2 py-1 rounded-lg transition-colors'>
                                    <BsPaypal className='text-lg mr-2' /> Salary
                                </a>
                            </li>
                        </ul>
                    </aside>
                </div>
                
                <main className="bg-white justify-center max-w-xl mx-auto mt-10  p-10">
                    <div className="bg-white max-w-md mx-auto p-4 shadow-md rounded-md">
                        <h2 className="text-3xl font-semibold mb-6 text-center">File Upload</h2>
                        <form className="grid grid-cols-1 gap-4" onSubmit={formik.handleSubmit}>
                            <div className="hover:bg-gray-100 p-2 rounded-md">
                                <Label htmlFor="resume">Upload Resume:</Label>
                                <Input
                                    id="resume"
                                    name="resume"
                                    type="file"
                                    onChange={handleFileChange}
                                    className={formik.errors.resume && formik.touched.resume ? 'border-red-500' : ''}
                                />
                                {formik.errors.resume && formik.touched.resume && (
                                    <div className="text-red-500 text-sm">{formik.errors.resume}</div>
                                )}
                            </div>
                            <div className="hover:bg-gray-100 p-2 rounded-md">
                                <Label htmlFor="certeficate">Upload Certificate:</Label>
                                <Input
                                    id="certeficate"
                                    name="certeficate"
                                    type="file"
                                    onChange={handleFileChange}
                                    className={formik.errors.certeficate && formik.touched.certeficate ? 'border-red-500' : ''}
                                />
                                {formik.errors.certeficate && formik.touched.certeficate && (
                                    <div className="text-red-500 text-sm">{formik.errors.certeficate}</div>
                                )}
                            </div>
                            <div className="hover:bg-gray-100 p-2 rounded-md">
                                <Label htmlFor="educationalCredential">Upload Educational Credential:</Label>
                                <Input
                                    id="educationalCredential"
                                    name="educationalCredential"
                                    type="file"
                                    onChange={handleFileChange}
                                    className={formik.errors.educationalCredential && formik.touched.educationalCredential ? 'border-red-500' : ''}
                                />
                                {formik.errors.educationalCredential && formik.touched.educationalCredential && (
                                    <div className="text-red-500 text-sm">{formik.errors.educationalCredential}</div>
                                )}
                            </div>
                            <div className="hover:bg-gray-100 p-2 rounded-md">
                                <Label htmlFor="employeeImage">Upload Employee Image:</Label>
                                <Input
                                    id="employeeImage"
                                    name="employeeImage"
                                    accept="image/*"
                                    type="file"
                                    onChange={handleFileChange}
                                    className={formik.errors.employeeImage && formik.touched.employeeImage ? 'border-red-500' : ''}
                                />
                                {formik.errors.employeeImage && formik.touched.employeeImage && (
                                    <div className="text-red-500 text-sm">{formik.errors.employeeImage}</div>
                                )}
                            </div>
                            <button
                                type="submit"
                                className="mt-4 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 flex items-center justify-center"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <svg
                                        className="animate-spin h-5 w-5 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zM12 24c-3.313 0-6.254-1.344-8.485-3.515L0 20c2.784 2.784 6.523 4 10.34 4 1.812 0 3.56-.353 5.19-1.003l-2.356-2.357C12.556 
                                        21.785 12.356 22"
                                        ></path>
                                    </svg>
                                ) : (
                                    'Submit'
                                )}
                            </button>
                            {submissionStatus && (
                                <div className={`mt-4 text-center ${submissionStatus === 'Submitted successfully' ? 'text-green-500' : 'text-red-500'}`}>
                                    {submissionStatus}
                                </div>
                            )}
                            {error && (
                                <div className="mt-4 text-center text-red-500">
                                    {error}
                                </div>
                            )}
                        </form>
                        {uploadedData && (
                            <div className="mt-6">
                                <h3 className="text-xl font-semibold mb-2">Uploaded Data:</h3>
                                <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                                    {JSON.stringify(uploadedData, null, 2)}
                                </pre>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default FileUploadPage;
