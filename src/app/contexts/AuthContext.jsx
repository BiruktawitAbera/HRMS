import * as React from 'react';

const AuthContext = React.createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [userRole, setUserRole] = React.useState(null); // Initialize with null or default role

  const login = (role) => {
    // Perform login logic, e.g., make an API request
    setIsAuthenticated(true);
    setUserRole(role);
  };

  const logout = () => {
    // Perform logout logic, e.g., clear session data
    setIsAuthenticated(false);
    setUserRole(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);