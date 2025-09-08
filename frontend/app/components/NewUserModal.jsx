// components/NewUserModal.js
import React, { useState } from 'react';
import {
  XMarkIcon,
  UserIcon,
  EnvelopeIcon,
  KeyIcon, // For password
  BriefcaseIcon, // For role
  AdjustmentsHorizontalIcon, // For status
  PhotoIcon // For photo URL
} from '@heroicons/react/24/outline';

const NewUserModal = ({ onClose, onCreateUser, roles, error }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    role: roles.length > 0 ? roles[0] : 'USER',
    status: 'ACTIVE',
    photoUrl: '' // Added photoUrl to new user form
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateUser(formData);
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-70 flex justify-center items-center z-50 p-4">
      <div className="bg-gray-800 p-6 rounded-lg shadow-2xl max-w-md w-full relative border border-emerald-700/50 text-gray-100">
        <h2 className="text-2xl font-bold mb-6 text-white text-center">Create New User</h2>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-emerald-400 transition-colors duration-200 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          aria-label="Close"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        {error && (
          <div className="bg-red-800/20 border border-red-700 text-red-300 px-4 py-3 rounded-lg relative mb-4 animate-pulse-once" role="alert">
            <strong className="font-semibold">Error!</strong>
            <span className="block sm:inline ml-2">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-emerald-300 mb-2">
                <UserIcon className="inline-block h-5 w-5 mr-2 -mt-1 text-emerald-400" /> First Name
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="appearance-none block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition-all duration-200"
                required
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-emerald-300 mb-2">
                <UserIcon className="inline-block h-5 w-5 mr-2 -mt-1 text-emerald-400" /> Last Name
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="appearance-none block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition-all duration-200"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-emerald-300 mb-2">
              <UserIcon className="inline-block h-5 w-5 mr-2 -mt-1 text-emerald-400" /> Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              value={formData.username}
              onChange={handleChange}
              className="appearance-none block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition-all duration-200"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-emerald-300 mb-2">
              <EnvelopeIcon className="inline-block h-5 w-5 mr-2 -mt-1 text-emerald-400" /> Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="appearance-none block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition-all duration-200"
              required
            />
          </div>
           <div>
            <label htmlFor="photoUrl" className="block text-sm font-medium text-emerald-300 mb-2">
              <PhotoIcon className="inline-block h-5 w-5 mr-2 -mt-1 text-emerald-400" /> Photo URL (Optional)
            </label>
            <input
              type="text"
              name="photoUrl"
              id="photoUrl"
              value={formData.photoUrl}
              onChange={handleChange}
              className="appearance-none block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition-all duration-200"
              placeholder="http://example.com/profile.jpg"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-emerald-300 mb-2">
              <KeyIcon className="inline-block h-5 w-5 mr-2 -mt-1 text-emerald-400" /> Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="appearance-none block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition-all duration-200"
              required
            />
          </div>
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-emerald-300 mb-2">
              <BriefcaseIcon className="inline-block h-5 w-5 mr-2 -mt-1 text-emerald-400" /> Role
            </label>
            <select
              name="role"
              id="role"
              value={formData.role}
              onChange={handleChange}
              className="block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm appearance-none transition-all duration-200"
              required
            >
              {roles.map(role => (
                <option key={role} value={role} className="bg-gray-700 text-gray-100">
                  {role.replace('_', ' ')}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-emerald-300 mb-2">
              <AdjustmentsHorizontalIcon className="inline-block h-5 w-5 mr-2 -mt-1 text-emerald-400" /> Status
            </label>
            <select
              name="status"
              id="status"
              value={formData.status}
              onChange={handleChange}
              className="block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm appearance-none transition-all duration-200"
              required
            >
              <option value="ACTIVE" className="bg-gray-700 text-gray-100">ACTIVE</option>
              <option value="INACTIVE" className="bg-gray-700 text-gray-100">INACTIVE</option>
            </select>
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center justify-center px-5 py-2 text-md font-medium text-gray-200 bg-gray-700 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 focus:ring-offset-gray-800 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center justify-center px-5 py-2 text-md font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 focus:ring-offset-gray-800 transition-colors duration-200"
            >
              Create User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewUserModal;