import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';

const ProtectedRoutes = () => {
  const authToken = localStorage.getItem('authToken');
  const userRole = localStorage.getItem('role');
  const isAuthenticated = !!authToken && !!userRole; // Ensure both are present and not empty
  const location = useLocation();

  
  const allowedRoles = {
    '/admin': ['Admin'],
    '/UserList': ['Admin'],
    '/userlist': ['Admin'],
    '/AddUser': ['Admin'],
    '/Payroll': ['Admin'],
    '/AddDepartment': ['Admin'],
    '/AdminLeve': ['Admin'],
    '/Attendance': ['Admin'],
    '/DepartmentList': ['Admin'],
    '/EmployeeDetail': ['Admin'],
    '/FileUpload': ['Admin'],
    '/GenerateReport': ['Admin'],
    '/TrainigForm': ['Admin'],
    '/manager': ['Hr'],
    '/PayrollList': ['Hr'],
    '/AttendanceReport': ['Hr'],
    '/leave': ['Hr'],
    '/LeaveReport': ['Hr'],
    '/WeeklyReport': ['Hr'],
    '/employee': ['Employee'], 
    '/AttendanceForm': ['Employee'],
    '/LeaveRequestForm': ['Employee'],
    '/TrainingList': ['Employee'],
    '/WeeklyReportForm': ['Employee'],
  };
  
  const currentRoute = location.pathname;
  const allowedRolesForRoute = allowedRoles[currentRoute];

  // Check if the user is authenticated
  if (!isAuthenticated) {
    console.log("User is not authenticated. Redirecting to login page.");
    return <Navigate to="/" />;
  }

  // Check if the user's role is allowed to access the current route
  if (allowedRolesForRoute && !allowedRolesForRoute.includes(userRole)) {
    console.log(`User role "${userRole}" is not authorized to access "${currentRoute}". Redirecting to login page.`);
    return <Navigate to="/" />;
  }

  // Render the outlet if everything is fine
  return <Outlet />;
};

export default ProtectedRoutes;
