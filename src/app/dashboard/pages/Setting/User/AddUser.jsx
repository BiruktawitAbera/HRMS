import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/app/components/Button/button';
import { Label } from '@radix-ui/react-label';
import { Input } from '@/app/components/Input/input';
import RegistrationFormService from '@/app/dashboard/services/AddUserService';
import Header from '@/app/layout/Header';
import { FcDepartment } from "react-icons/fc";
import {
  BsGrid1X2Fill, BsFillGrid3X3GapFill, BsPeopleFill,
  BsListCheck, BsMenuButtonWideFill, BsFillGearFill, BsBriefcaseFill, BsPaypal
} from 'react-icons/bs';

function AddUser({ openSidebarToggle, OpenSidebar }){
  const [menuItems, setMenuItems] = useState([]);
  const [showSubmenu, setShowSubmenu] = useState(false);
  
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [employeeDOB, setEmployeeDOB] = useState('');
  const [employeeAddress, setEmployeeAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [department, setDepartment] = useState('');
  const [roleOptions, setRoleOptions] = useState([]);
  const [role, setRole] = useState('');
  const [bankAccount, setBankAccount] = useState('');
  const [formError, setFormError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchDepartmentOptions();
    fetchRoleOptions();
  }, []);

  const fetchDepartmentOptions = async () => {
    try {
      const response = await fetch('https://localhost:5001/api/Department/GetAllDepartmentNames');
      if (!response.ok) {
        throw new Error('Failed to fetch department options');
      }
      const data = await response.json();
      const options = data.map((name) => ({ id: name, name }));
      setDepartmentOptions(options);
      if (options.length > 0) {
        setDepartment(options[0].id);
      }
    } catch (error) {
      console.log('Error fetching department options:', error);
    }
  };

  const fetchRoleOptions = async () => {
    try {
      const response = await fetch('https://localhost:5001/api/Role/getAllRoles');
      if (!response.ok) {
        throw new Error('Failed to fetch role options');
      }
      const data = await response.json();
      const options = data.map((name) => ({ id: name, name }));
      setRoleOptions(options);
      if (options.length > 0) {
        setRole(options[0].name);
      }
    } catch (error) {
      console.log('Error fetching role options:', error);
    }
  };

  const handleInputChange = (event, setState, isDepartment) => {
    if (isDepartment) {
      const selectedDepartmentId = event.target.value;
      setDepartment(selectedDepartmentId);
    } else {
      setState(event.target.value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const userData = {
        EmployeeFirstName: firstName,
        EmployeeLastName: lastName,
        EmployeePhone: phoneNumber,
        Gender: gender,
        EmployeeAddress: employeeAddress,
        EmployeeEmail: email,
        AdminAssignedRole: role,
        DepartmentName: department,
        BankAccount: bankAccount,
        EmployeeDOB: employeeDOB,
      };

      await RegistrationFormService.registerUser(userData);

      resetFormFields();
      navigate('/UserList');
    } catch (error) {
      setIsLoading(false);
      setFormError(error.message || 'Registration failed.');
    }
  };

  const resetFormFields = () => {
    setFirstName('');
    setLastName('');
    setGender('');
    setEmployeeDOB('');
    setEmployeeAddress('');
    setPhoneNumber('');
    setEmail('');
    setDepartment('');
    setRole('');
    setBankAccount('');
    setFormError('');
  };
  const handleSettingsClick = () => {
    setShowSubmenu(!showSubmenu);
  };
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1">
        <div className={`${openSidebarToggle? "sidebar-responsive open" : "sidebar-responsive"} bg-white text-gray-800 overflow-y-auto p-4 transition-all duration-300 md:w-64 lg:w-64`}>
          <aside id="sidebar">
            <div className='flex items-center justify-between mb-4'>
              <div className='flex items-center'>
                <button className="md:hidden" onClick={OpenSidebar}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
              <span className='cursor-pointer' onClick={OpenSidebar}></span>
            </div>
            <ul className={`space-y-2 ${openSidebarToggle ? 'block' : 'hidden md:block'}`}>
              <li className='sidebar-list-item'>
                <a href="#" className='flex items-center px-2 py-1 transition-colors rounded-lg hover:bg-blue-500 hover:text-white' onClick={handleSettingsClick}>
                  <BsFillGearFill className='mr-2 text-lg' /> Settings
                </a>
                {showSubmenu && (
                  <ul className="ml-4">
                    <li className='sidebar-list-item'>
                      <a href="/PayrollSetting" className='flex items-center px-2 py-1 transition-colors rounded-lg hover:bg-blue-500 hover:text-white'>
                        <BsPaypal className='mr-2 text-lg' /> Payroll Settings
                      </a>
                    </li>
                    <li className='sidebar-list-item'>
                      <a href="/GeneralSettings" className='flex items-center px-2 py-1 transition-colors rounded-lg hover:bg-blue-500 hover:text-white'>
                        <BsFillGearFill className='mr-2 text-lg' /> General Settings
                      </a>
                    </li>
                    <li className='sidebar-list-item'>
                      <a href="/PayrollSetting" className='flex items-center px-2 py-1 transition-colors rounded-lg hover:bg-blue-500 hover:text-white'>
                        <BsPeopleFill className='mr-2 text-lg' /> Employee Data
                      </a>
                    </li>
                    <li className='sidebar-list-item'>
                      <a href="/PayrollSetting" className='flex items-center px-2 py-1 transition-colors rounded-lg hover:bg-blue-500 hover:text-white'>
                        <BsFillGrid3X3GapFill className='mr-2 text-lg' /> Performance Management
                      </a>
                    </li>
                    <li className='sidebar-list-item'>
                      <a href="/PayrollSetting" className='flex items-center px-2 py-1 transition-colors rounded-lg hover:bg-blue-500 hover:text-white'>
                        <BsBriefcaseFill className='mr-2 text-lg' /> Attendance and Leave Management
                      </a>
                    </li>
                    <li className='sidebar-list-item'>
                      <a href="/PayrollSetting" className='flex items-center px-2 py-1 transition-colors rounded-lg hover:bg-blue-500 hover:text-white'>
                        <BsPaypal className='mr-2 text-lg' /> Training and Development
                      </a>
                    </li>
                    <li className='sidebar-list-item'>
                      <a href="/PayrollSetting" className='flex items-center px-2 py-1 transition-colors rounded-lg hover:bg-blue-500 hover:text-white'>
                       <BsPaypal className='mr-2 text-lg' /> Security
                      </a>
                    </li>
                  </ul>
                )}
              </li>
              <li className='sidebar-list-item'>
                <a href="" className='flex items-center px-2 py-1 transition-colors rounded-lg hover:bg-blue-500 hover:text-white'>
                  <BsGrid1X2Fill className='mr-2 text-lg' /> Dashboard
                </a>
              </li>
              <li className='sidebar-list-item'>
                <a href="Performance" className='flex items-center px-2 py-1 transition-colors rounded-lg hover:bg-blue-500 hover:text-white'>
                  <BsFillGrid3X3GapFill className='mr-2 text-lg' /> Performance
                </a>
              </li>
              <li className='sidebar-list-item'>
                <a href="SubmittedProfile" className='flex items-center px-2 py-1 transition-colors rounded-lg hover:bg-blue-500 hover:text-white'>
                  <BsPeopleFill className='mr-2 text-lg' /> Employees
                </a>
              </li>
              <li className='sidebar-list-item'>
                <a href="" className='flex items-center px-2 py-1 transition-colors rounded-lg hover:bg-blue-500 hover:text-white'>
                  <BsListCheck className='mr-2 text-lg' /> Attendance
                </a>
              </li>
              <li className='sidebar-list-item'>
                <a href="" className='flex items-center px-2 py-1 transition-colors rounded-lg hover:bg-blue-500 hover:text-white'>
                  <FcDepartment className='mr-2 text-lg' /> Department
                </a>
              </li>
              <li className='sidebar-list-item'>
                <a href="/Report" className='flex items-center px-2 py-1 transition-colors rounded-lg hover:bg-blue-500 hover:text-white'>
                  <BsMenuButtonWideFill className='mr-2 text-lg' /> Reports
                </a>
              </li>
              <li className='sidebar-list-item'>
                <a href="/Leave" className='flex items-center px-2 py-1 transition-colors rounded-lg hover:bg-blue-500 hover:text-white'>
                  <BsBriefcaseFill className='mr-2 text-lg' /> Leave
                </a>
              </li>
              <li className='sidebar-list-item'>
                <a href="/Salary" className='flex items-center px-2 py-1 transition-colors rounded-lg hover:bg-blue-500 hover:text-white'>
                  <BsPaypal className='mr-2 text-lg' /> Salary
                </a>
              </li>
            </ul>
          </aside>
        </div>
        <div className="flex-1 overflow-y-auto">
          <main className="h-full p-4 bg-gray-100 main-container sm:p-6">
            <h1 className="mb-4 text-3xl font-bold">Add User</h1>
            <form onSubmit={handleSubmit} className="flex flex-wrap justify-center">
  {/* Form fields */}
  <div className="w-full p-2 rounded-md md:w-1/2 lg:w-1/2 xl:w-1/2">
    <Label htmlFor="firstName">First Name:</Label>
    <Input
      id="firstName"
      value={firstName}
      onChange={(event) => handleInputChange(event, setFirstName)}
      required
    />
  </div>
  <div className="w-full p-2 rounded-md md:w-1/2 lg:w-1/2 xl:w-1/2">
    <Label htmlFor="lastName">Last Name:</Label>
    <Input
      id="lastName"
      value={lastName}
      onChange={(event) => handleInputChange(event, setLastName)}
      required
    />
  </div>
  <div className="w-full p-2 rounded-md md:w-1/2 lg:w-1/2 xl:w-1/2">
    <Label htmlFor="employeeAddress">Employee Address:</Label>
    <Input
      id="employeeAddress"
      value={employeeAddress}
      onChange={(event) => handleInputChange(event, setEmployeeAddress)}
      required
    />
  </div>
  <div className="w-full p-2 rounded-md md:w-1/2 lg:w-1/2 xl:w-1/2">
    <Label htmlFor="role">Role:</Label>
    <select
      id="role"
      value={role}
      onChange={(event) => handleInputChange(event, setRole)}
      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500"
    >
      <option value="">Select Role</option>
      {roleOptions.map((option) => (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      ))}
    </select>
  </div>
  {/* Other form fields */}
  <div className="w-full p-2 rounded-md md:w-1/2 lg:w-1/2 xl:w-1/2">
    <Label htmlFor="employeeDOB">Employee Date of Birth:</Label>
    <Input
      id="employeeDOB"
      type="date"
      value={employeeDOB}
      onChange={(event) => handleInputChange(event, setEmployeeDOB)}
      required
    />
  </div>
  <div className="w-full p-2 rounded-md md:w-1/2 lg:w-1/2 xl:w-1/2">
    <Label htmlFor="gender">Gender:</Label>
    <select
      id="gender"
      value={gender}
      onChange={(event) => handleInputChange(event, setGender)}
      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      required
    >
      <option value="">Select Gender</option>
      <option value="male">Male</option>
      <option value="female">Female</option>
    </select>
  </div>
  <div className="w-full p-2 rounded-md md:w-1/2 lg:w-1/2 xl:w-1/2">
    <Label htmlFor="phoneNumber">Phone Number:</Label>
    <Input
      id="phoneNumber"
      type="tel"
      value={phoneNumber}
      onChange={(event) => handleInputChange(event, setPhoneNumber)}
      required
    />
  </div>
  <div className="w-full p-2 rounded-md md:w-1/2 lg:w-1/2 xl:w-1/2">
    <Label htmlFor="email">Email:</Label>
    <Input
      id="email"
      type="email"
      value={email}
      onChange={(event) => handleInputChange(event, setEmail)}
      required
    />
  </div>
  <div className="w-full p-2 rounded-md md:w-1/2 lg:w-1/2 xl:w-1/2">
    <Label htmlFor="department">Department:</Label>
    <select
      id="department"
      value={department}
      onChange={(event) => handleInputChange(event, setDepartment, true)}
      className="w-full px-3 py-2 border border-black rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500"
    >
      <option value="">Select Department</option>
      {departmentOptions.map((option) => (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      ))}
   </select>
  </div>
  <div className="w-full p-2 rounded-md md:w-1/2 lg:w-1/2 xl:w-1/2">
    <Label htmlFor="bankAccount">Bank Account:</Label>
    <Input
      id="bankAccount"
      value={bankAccount}
      onChange={(event) => handleInputChange(event, setBankAccount)}
      required
    />
  </div>
  <div className="flex justify-center">
    <Button
      type="submit"
      className="px-4 py-2 font-semibold text-white transition duration-300 ease-in-out bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      disabled={isLoading}
    >
      {isLoading ? 'Loading...' : 'Register'}
    </Button>
  </div>
    {formError && (
      <p className="mt-2 text-sm text-red-500">{formError}</p>
    )}
</form>
            </main>
            </div>
            </div>
    </div>
  );
}

export default AddUser;
