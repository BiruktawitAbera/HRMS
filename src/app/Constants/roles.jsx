import React from 'react';

const Roles = () => {
  const roles = {
    admin: ['manageEmployees', 'manageLeave', 'viewReports'],
    employee: ['viewOwnProfile', 'applyLeave'],
    hrManager: ['manageEmployees', 'manageLeave', 'generateReports'],
  };

  return (
    <div>
      <h1>User Roles</h1>
      <ul>
        {Object.entries(roles).map(([role, permissions]) => (
          <li key={role}>
            {role}
            <ul>
              {permissions.map(permission => (
                <li key={permission}>{permission}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Roles;