// components/RegisterPageUIWithRoles.jsx
"use client";
import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'; // Import Link for navigation
import {
    UserIcon,
    EnvelopeIcon,
    KeyIcon,
    PhotoIcon,
    BuildingOfficeIcon, // For role/organization field, as an example
    UserPlusIcon, // For the register button and "Already have an account?" link
    ArrowRightOnRectangleIcon // For the login link
} from '@heroicons/react/24/outline';


const RegisterPageUIWithRoles = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        role: 'USER', // Default role
        photoUrl: '' // Optional photo URL
    });

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const roles = ["SUPER_ADMIN", "ADMIN", "HR", "USER"];

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setErrorMessage('');
    };

    const registerUser = async () => {
        setLoading(true);
        setErrorMessage('');
        setSuccessMessage('');

        try {
            const response = await fetch('http://localhost:8080/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Registration successful:', data);
                setSuccessMessage('Registration successful! Redirecting to login...');
                setTimeout(() => {
                    router.push('/login');
                }, 2000);
            } else {
                const errorData = await response.json();
                console.error('Registration failed:', errorData);
                setErrorMessage(errorData.message || 'Registration failed. Please try again.');
            }
        } catch (error) {
            console.error('Network or unexpected error:', error);
            setErrorMessage('An unexpected error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-950 p-4 sm:p-6 lg:p-8">
            <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-lg border border-emerald-700/50">
                <h2 className="text-4xl font-extrabold text-center text-white mb-8 tracking-wide">Create New Account</h2>

                <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); registerUser(); }}>
                    {errorMessage && (
                        <div className="bg-red-800/20 border border-red-700 text-red-300 px-4 py-3 rounded-lg relative mb-6 animate-pulse-once" role="alert">
                            <strong className="font-semibold">Error!</strong>
                            <span className="block sm:inline"> {errorMessage}</span>
                        </div>
                    )}
                    {successMessage && (
                        <div className="bg-green-800/20 border border-green-700 text-green-300 px-4 py-3 rounded-lg relative mb-6 animate-pulse-once" role="alert">
                            <strong className="font-semibold">Success!</strong>
                            <span className="block sm:inline"> {successMessage}</span>
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="firstName" className="block text-sm font-medium text-emerald-300 mb-2">
                                <UserIcon className="inline-block h-5 w-5 mr-2 -mt-1 text-emerald-400" /> First Name
                            </label>
                            <input
                                onChange={handleChange}
                                value={formData.firstName}
                                type="text"
                                id="firstName"
                                name="firstName"
                                className="appearance-none block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition-all duration-200"
                                placeholder="John"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="lastName" className="block text-sm font-medium text-emerald-300 mb-2">
                                <UserIcon className="inline-block h-5 w-5 mr-2 -mt-1 text-emerald-400" /> Last Name
                            </label>
                            <input
                                onChange={handleChange}
                                value={formData.lastName}
                                type="text"
                                id="lastName"
                                name="lastName"
                                className="appearance-none block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition-all duration-200"
                                placeholder="Doe"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-emerald-300 mb-2">
                            <UserIcon className="inline-block h-5 w-5 mr-2 -mt-1 text-emerald-400" /> Username
                        </label>
                        <input
                            onChange={handleChange}
                            value={formData.username}
                            type="text"
                            id="username"
                            name="username"
                            className="appearance-none block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition-all duration-200"
                            placeholder="johndoe"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-emerald-300 mb-2">
                            <EnvelopeIcon className="inline-block h-5 w-5 mr-2 -mt-1 text-emerald-400" /> Email address
                        </label>
                        <input
                            onChange={handleChange}
                            value={formData.email}
                            type="email"
                            id="email"
                            name="email"
                            className="appearance-none block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition-all duration-200"
                            placeholder="john.doe@example.com"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="photoUrl" className="block text-sm font-medium text-emerald-300 mb-2">
                            <PhotoIcon className="inline-block h-5 w-5 mr-2 -mt-1 text-emerald-400" /> Profile Photo URL (Optional)
                        </label>
                        <input
                            onChange={handleChange}
                            value={formData.photoUrl}
                            type="text"
                            id="photoUrl"
                            name="photoUrl"
                            className="appearance-none block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition-all duration-200"
                            placeholder="http://example.com/your-photo.jpg"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-emerald-300 mb-2">
                            <KeyIcon className="inline-block h-5 w-5 mr-2 -mt-1 text-emerald-400" /> Password
                        </label>
                        <input
                            onChange={handleChange}
                            value={formData.password}
                            type="password"
                            id="password"
                            name="password"
                            className="appearance-none block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition-all duration-200"
                            placeholder="Min. 8 characters"
                            required
                            minLength={8}
                        />
                    </div>

                    <div>
                        <label htmlFor="role" className="block text-sm font-medium text-emerald-300 mb-2">
                            <BuildingOfficeIcon className="inline-block h-5 w-5 mr-2 -mt-1 text-emerald-400" /> Role
                        </label>
                        <select
                            onChange={handleChange}
                            value={formData.role}
                            id="role"
                            name="role"
                            className="block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm appearance-none transition-all duration-200"
                            required
                        >
                            <option value="" disabled hidden className="text-gray-400">Select a role</option>
                            {roles.map((roleOption) => (
                                <option key={roleOption} value={roleOption} className="bg-gray-700 text-gray-100">
                                    {roleOption.replace('_', ' ')}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-lg font-bold text-white ${
                                loading ? 'bg-emerald-700/60 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 focus:ring-offset-gray-800'
                            } transition-all duration-200 transform hover:scale-105`}
                        >
                            {loading ? (
                                <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : (
                                <>
                                    <UserPlusIcon className="h-6 w-6 mr-3" /> Register
                                </>
                            )}
                        </button>
                    </div>
                </form>

                <p className="mt-8 text-center text-sm text-gray-400">
                    Already have an account?{' '}
                    <Link href="/login" legacyBehavior>
                        <a className="font-medium text-emerald-500 hover:text-emerald-400 transition-colors duration-200 inline-flex items-center">
                            <ArrowRightOnRectangleIcon className="h-4 w-4 mr-1 -mt-0.5" /> Login here
                        </a>
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPageUIWithRoles;