import React, { useState } from 'react';
import { Button } from "@/app/components/Button/button";
import { Label } from "@radix-ui/react-label";
import { Input } from '@/app/components/Input/input';
import { Link } from 'react-router-dom';


function ForgotPasswordPage() {
  const [email, setEmail] = useState('');

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      // Implement your password reset logic here
      
      // Display a success message or redirect to a success page
    } catch (error) {
      // Handle any errors that occur during the password reset process
      console.error("Password reset error:", error);
    }
  };

  return (
    <main className="bg-[#26313c] h-screen flex items-center justify-center p-10">
      <div className="bg-white md:w-96 p-8 rounded-lg flex flex-col items-center">
        <h1 className="text-3xl font-semibold mb-6">Forgot Password</h1>
        <form onSubmit={handleResetPassword} className="w-full" method="post">
          <Label htmlFor="email">
            Email*
            <Input
              className="input-field mb-4 valid:border-indigo-500"
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Label>
          <Button
            type="submit"
            className="w-full bg-indigo-500 text-white rounded-full py-2 hover:bg-indigo-700 mb-4"
          >
            Reset Password
          </Button>
        </form>
        <div className="flex items-center mt-4">
          <Link to="/login" className="text-indigo-500 hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    </main>
  );
}

export default ForgotPasswordPage;