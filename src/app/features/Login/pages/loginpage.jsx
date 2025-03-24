import React, { useState, useEffect } from 'react';
import { Button } from '@/app/components/Button/button';
import { Label } from '@radix-ui/react-label';
import { Input } from '@/app/components/Input/input';
import { useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import loginservice from '../services/loginservice';
import Cookies from 'js-cookie';

function HomePage() {
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const storedEmail = Cookies.get('rememberedEmail');
    const storedRememberMe = Cookies.get('rememberMe') === 'true';
    if (storedEmail && storedRememberMe) {
      setRememberMe(true);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const enteredEmail = e.target.elements.employeeEmail.value;
    const enteredPassword = e.target.elements.password.value;
    setIsLoading(true);

    try {
      const response = await loginservice.login(enteredEmail, enteredPassword);
    
      if (response && response.value) {
        const { token, roleName } = response.value;
    
        // Store the token and user role
        localStorage.setItem('authToken', token);
        localStorage.setItem('role', roleName); // Set the user role
    
        if (rememberMe) {
          Cookies.set('rememberedEmail', enteredEmail, { expires: 7 });
          Cookies.set('rememberMe', 'true', { expires: 7 });
        } else {
          Cookies.remove('rememberedEmail');
          Cookies.remove('rememberMe');
        }
    
        switch (roleName) {
          case 'Admin':
            navigate('/admin');
            break;
          case 'Hr':
            navigate('/manager');
            break;
          case 'Employee':
            navigate('/employee');
            break;
          default:
            setError('Unknown role. Please contact support.');
            break;
        }
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login error:', error); // Log the error for debugging
      setError('Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  return (
    <main className="bg-[#26313c] h-screen flex items-center justify-center p-10">
      <div className="bg-white md:w-96 p-8 rounded-lg flex flex-col items-center">
        <h1 className="text-3xl font-semibold mb-6">Login</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleLogin} className="w-full" method="post">
          <Label htmlFor="employeeEmail">
            Email*
            <Input
              className="input-field mb-4 valid:border-indigo-500"
              type="email"
              id="employeeEmail"
              name="employeeEmail"
              placeholder="Email"
              required
            />
          </Label>
          <Label htmlFor="password">
            Password*
            <div className="relative">
              <Input
                className="input-field mb-4 valid:border-indigo-500"
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                placeholder="Password"
                required
              />
              <button
                type="button"
                className="absolute top-1/2 right-2 transform -translate-y-1/2 focus:outline-none"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FiEyeOff size={18} className="text-gray-400" />
                ) : (
                  <FiEye size={18} className="text-gray-400" />
                )}
              </button>
            </div>
          </Label>
          <div className="flex items-center justify-between mb-6">
            <label
              htmlFor="rememberMe"
              className="text-sm text-gray-400 cursor-pointer flex items-center"
            >
              <input
                type="checkbox"
                id="rememberMe"
                className="mr-2"
                checked={rememberMe}
                onChange={handleRememberMeChange}
              />
              Remember Me
            </label>
            <a href="/Forget" className="text-indigo-500 hover:underline">
              Forget Password?
            </a>
          </div>
          <Button
            type="submit"
            className="w-full bg-indigo-500 text-white rounded-full py-2 hover:bg-indigo-700 mb-4"
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Login'}
          </Button>
        </form>
        <p className="mt-6 text-xs text-gray-400">@2024 All rights reserved.</p>
      </div>
    </main>
  );
}

export default HomePage;
