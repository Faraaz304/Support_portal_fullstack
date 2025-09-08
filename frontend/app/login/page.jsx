// components/LoginPage.jsx
"use client"; // For Next.js App Router

import React, { useState } from 'react'; // Removed useEffect, useCallback for lockout
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { UserIcon, KeyIcon, ArrowRightOnRectangleIcon, UserPlusIcon } from '@heroicons/react/24/outline'; // Icons

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Lockout states (REMOVED - these are no longer needed)
  // const [isLockedOut, setIsLockedOut] = useState(false);
  // const [lockoutRemainingTime, setLockoutRemainingTime] = useState(0);
  // const [lockoutIntervalId, setLockoutIntervalId] = useState(null);

  const router = useRouter();

  // --- Lockout Utility Functions (REMOVED) ---
  // const getLockoutData = useCallback((user) => { ... }, []);
  // const saveLockoutData = useCallback((user, data) => { ... }, []);
  // const clearLockoutTimer = useCallback(() => { ... }, []);

  // --- Effect to Monitor Lockout Status (REMOVED) ---
  // useEffect(() => { ... }, [...]);


  // --- Handle Login Function (Simplified - No Lockout Logic) ---
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // No lockout check here anymore, proceed directly to API call
    try {
      const response = await fetch('http://localhost:8080/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        let errorMessage = `Login failed! HTTP error: ${response.status}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorData.error || errorMessage;
        } catch (jsonError) {
          errorMessage = await response.text();
        }
        throw new Error(errorMessage);
      }

      // --- Handle Successful Login ---
      const data = await response.json();
      const token = data.token;
      if (token) {
        localStorage.setItem('jwt_token', token);
        localStorage.setItem('user_role', data.role);
        
        // No lockout data to clear on success
        router.push('/dashboard');
      } else {
        throw new Error('Invalid username or password. No token received.'); // Fallback error
      }

    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'An unexpected error occurred during login.');
    } finally {
      setLoading(false);
    }
  };

  // --- Utility for formatting remaining time (REMOVED) ---
  // const formatTime = (seconds) => { ... };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 p-4 sm:p-6 lg:p-8">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-emerald-700/50">
        <h2 className="text-4xl font-extrabold text-center text-white mb-8 tracking-wide">Welcome Back!</h2>

        {error && (
          <div className="bg-red-800/20 border border-red-700 text-red-300 px-4 py-3 rounded-lg relative mb-6 animate-pulse-once" role="alert">
            <p className="font-semibold">{error}</p>
            {/* Lockout remaining time display (REMOVED) */}
            {/* {isLockedOut && lockoutRemainingTime > 0 && (
              <p className="mt-2 text-sm text-red-200">Time remaining: <span className="font-bold">{formatTime(lockoutRemainingTime)}</span></p>
            )} */}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-emerald-300 mb-2">
              <UserIcon className="inline-block h-5 w-5 mr-2 -mt-1 text-emerald-400" /> Username
            </label>
            <div className="relative">
              <input
                type="text"
                id="username"
                className="appearance-none block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition-all duration-200"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setError(null); // Clear error on input change
                }}
                required
                // disabled={isLockedOut || loading} // Removed isLockedOut from disabled
                disabled={loading}
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-emerald-300 mb-2">
              <KeyIcon className="inline-block h-5 w-5 mr-2 -mt-1 text-emerald-400" /> Password
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                className="appearance-none block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition-all duration-200"
                placeholder="Your secret password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                // disabled={isLockedOut || loading} // Removed isLockedOut from disabled
                disabled={loading}
              />
            </div>
          </div>

          {/* Remember me and Forgot password section (Re-added) */}
          <div className="flex items-center justify-between text-gray-300">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-500 rounded bg-gray-700"
                // disabled={isLockedOut || loading} // Removed isLockedOut from disabled
                disabled={loading}
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link href="/forgot-password" legacyBehavior>
                <a className="font-medium text-emerald-500 hover:text-emerald-400 transition-colors duration-200">
                  Forgot password?
                </a>
              </Link>
            </div>
          </div>
          {/* End Remember me and Forgot password section */}
          
          <div>
            <button
              type="submit"
              className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-lg font-bold text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
              // disabled={loading || isLockedOut} // Removed isLockedOut from disabled
              disabled={loading}
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <>
                  <ArrowRightOnRectangleIcon className="h-6 w-6 mr-3" /> Log In
                </>
              )}
            </button>
          </div>
        </form>

        <p className="mt-8 text-center text-sm text-gray-400">
          Don't have an account?{' '}
          <Link href="/register" legacyBehavior>
            <a className="font-medium text-emerald-500 hover:text-emerald-400 transition-colors duration-200 inline-flex items-center">
              <UserPlusIcon className="h-4 w-4 mr-1 -mt-0.5" /> Register here
            </a>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;