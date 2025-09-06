// components/RegisterPageUIWithRoles.jsx
"use client";
import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter for redirection

const RegisterPageUIWithRoles = () => {
    const router = useRouter(); // Initialize router
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

    const roles = ["SUPER_ADMIN", "ADMIN", "HR", "USER"]; // The available roles

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value, // Use name attribute for generic handling
        });
        setErrorMessage(''); // Clear error message on input change
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
                // Redirect to login page after a short delay for the user to see the message
                setTimeout(() => {
                    router.push('/login');
                }, 2000); // 2-second delay
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
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 sm:p-6 lg:p-8">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Register New User</h2>

                <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); registerUser(); }}>
                    {errorMessage && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                            <strong className="font-bold">Error!</strong>
                            <span className="block sm:inline"> {errorMessage}</span>
                        </div>
                    )}
                    {successMessage && (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                            <strong className="font-bold">Success!</strong>
                            <span className="block sm:inline"> {successMessage}</span>
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                                First Name
                            </label>
                            <input
                                onChange={handleChange}
                                value={formData.firstName}
                                type="text"
                                id="firstName"
                                name="firstName" // Added name attribute
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="Super"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                                Last Name
                            </label>
                            <input
                                onChange={handleChange}
                                value={formData.lastName}
                                type="text"
                                id="lastName"
                                name="lastName" // Added name attribute
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="Admin"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                            Username
                        </label>
                        <input
                            onChange={handleChange}
                            value={formData.username}
                            type="text"
                            id="username"
                            name="username" // Added name attribute
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="superadmin"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email address
                        </label>
                        <input
                            onChange={handleChange}
                            value={formData.email}
                            type="email"
                            id="email"
                            name="email" // Added name attribute
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="superadmin@example.com"
                            required
                        />
                    </div>

                     <div>
                        <label htmlFor="photoUrl" className="block text-sm font-medium text-gray-700 mb-1">
                            photo URL
                        </label>
                        <input
                            onChange={handleChange}
                            value={formData.photoUrl}
                            type="text"
                            id="photoUrl"
                            name="photoUrl" // Added name attribute
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="http://example.com/photo.jpg"
                            required
                        />
                    </div>


                    

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            onChange={handleChange}
                            value={formData.password}
                            type="password"
                            id="password"
                            name="password" // Added name attribute
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="password123"
                            required
                            minLength={8}
                        />
                    </div>

                    <div>
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                            Role
                        </label>
                        <select
                            onChange={handleChange}
                            value={formData.role}
                            id="role"
                            name="role" // Added name attribute
                            className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            required
                        >
                            <option value="" disabled hidden>Select a role</option>
                            {roles.map((roleOption) => (
                                <option key={roleOption} value={roleOption}>
                                    {roleOption.replace('_', ' ')} {/* Nicer display for SUPER_ADMIN */}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading} // Disable button when loading
                            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                                loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                            }`}
                        >
                            {loading ? 'Registering...' : 'Register'}
                        </button>
                    </div>
                </form>

                <p className="mt-6 text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <a href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                        Login here
                    </a>
                </p>
            </div>
        </div>
    );
};

export default RegisterPageUIWithRoles;