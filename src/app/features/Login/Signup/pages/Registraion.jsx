import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/app/components/Button/button';
import { Label } from '@radix-ui/react-label';
import { Input } from '@/app/components/Input/input';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const Reg = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [employeeId, setEmployeeId] = useState(null);
  const [gender, setGender] = useState('');
  const [employeeDOB, setEmployeeDOB] = useState('');
  const [employeeAddress, setEmployeeAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [department, setDepartment] = useState('');
  const [educationCredentialFiles, setEducationCredentialFiles] = useState([]);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [formError, setFormError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // Fetch department options from the backend endpoint
    fetchDepartmentOptions();
  }, []);

  const fetchDepartmentOptions = async () => {
    try {
      const response = await fetch('/api/departments'); // Replace with your actual backend endpoint
      const data = await response.json();
      setDepartmentOptions(data);
    } catch (error) {
      console.log('Error fetching department options:', error);
    }
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleEmployeeIdChange = (event) => {
    const file = event.target.files[0];
    setEmployeeId(file);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleEmployeeDOBChange = (event) => {
    setEmployeeDOB(event.target.value);
  };

  const handleEmployeeAddressChange = (event) => {
    setEmployeeAddress(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    // Add a slight delay before checking if passwords match
    setTimeout(() => {
      if (password !== event.target.value) {
        setFormError('Passwords do not match.');
      } else {
        setFormError('');
      }
    }, 9000);
  };

  const handleDepartmentChange = (event) => {
    setDepartment(event.target.value);
  };

  const handleEducationCredentialFilesChange = (event) => {
    const files = Array.from(event.target.files);
    setEducationCredentialFiles(files);
  };

  const handleProfilePhotoChange = (event) => {
    const file = event.target.files[0];
    setProfilePhoto(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !firstName ||
      !lastName ||
      !employeeId ||
      !gender ||
      !employeeDOB ||
      !employeeAddress ||
      !phoneNumber ||
      !email ||
      !password ||
      !confirmPassword ||
      !department ||
      educationCredentialFiles.length === 0 ||
      !profilePhoto
    ) {
      setFormError('Please fill in all the required fields.');
      return;
    }

    if (password !== confirmPassword) {
      setFormError('Passwords do not match.');
      return;
    }

    setFormError('');

    // Reset form fields
    setFirstName('');
    setLastName('');
    setEmployeeId(null);
    setGender('');
    setEmployeeDOB('');
    setEmployeeAddress('');
    setPhoneNumber('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setDepartment('');
    setEducationCredentialFiles([]);
    setProfilePhoto(null);

    // Redirect to the SubmittedProfile page
    navigate('/SubmittedProfile');
  };

  return (
    <main className="bg-[#26313c] h-screen flex items-center justify-center p-10">
      <div className="bg-white max-w-md mx-auto p-4 shadow-md rounded-md">
        <h2 className="text-3xl font-semibold mb-6 text-center">Profile</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">First Name:</Label>
            <Input
              id="firstName"
              value={firstName}
              onChange={handleFirstNameChange}
            />
          </div>
          <div>
            <Label htmlFor="lastName">Last Name:</Label>
            <Input
              id="lastName"
              value={lastName}
              onChange={handleLastNameChange}
            />
          </div>
          <div>
            <Label htmlFor="employeeAddress">Employee Address:</Label>
            <Input
              id="employeeAddress"
              value={employeeAddress}
              onChange={handleEmployeeAddressChange}
            />
          </div>
          <div>
            <Label htmlFor="employeeDOB">Employee Date of Birth:</Label>
            <Input
              id="employeeDOB"
              type="date"
              value={employeeDOB}
              onChange={handleEmployeeDOBChange}
            />
          </div>
          <div>
            <Label htmlFor="employeeId">Employee ID:</Label>
            <Input
              id="employeeId"
              type="file"
              accept=".jpg,.png,.pdf"
              onChange={handleEmployeeIdChange}
            />
          </div>
          <div>
            <Label htmlFor="gender">Gender:</Label>
            <select
              id="gender"
              value={gender}
              onChange={handleGenderChange}
              className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <Label htmlFor="phoneNumber">Phone Number:</Label>
            <Input
              id="phoneNumber"
              type="tel"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
            />
          </div>
          <div>
            <Label htmlFor="email">Email:</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div>
            <Label htmlFor="password">Password:</Label>
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={handlePasswordChange}
              endAdornment={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              }
            />
          </div>
          <div>
            <Label htmlFor="confirmPassword">Confirm Password:</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            {formError && (
              <p className="text-red-500 mt-2 text-sm">{formError}</p>
            )}
          </div>
          <div>
            <Label htmlFor="department">Department:</Label>
            <select
              id="department"
              value={department}
              onChange={handleDepartmentChange}
              className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Department</option>
              {departmentOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label htmlFor="educationCredentialFiles">Education Credential Files:</Label>
            <Input
              id="educationCredentialFiles"
              type="file"
              accept=".jpg,.png,.pdf"
              multiple
              onChange={handleEducationCredentialFilesChange}
            />
          </div>
          <div>
            <Label htmlFor="profilePhoto">Profile Photo:</Label>
            <Input
              id="profilePhoto"
              type="file"
              accept=".jpg,.png"
              onChange={handleProfilePhotoChange}
            />
          </div>
          <div className="col-span-2">
            <Button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Reg;
