// components/UserActionsBar.jsx
import React from 'react';
import {
  UsersIcon,
  MagnifyingGlassIcon,
  ArrowPathIcon,
  PlusIcon
} from '@heroicons/react/24/outline';

const UserActionsBar = ({
  loggedInUserRole,
  handleOpenNewUserModal,
  searchTerm,
  setSearchTerm,
  fetchUsers
}) => {
  return (
    <div className="bg-white p-4 shadow-sm rounded-lg mb-6 flex justify-between items-center">
      {/* Left side: Users Button and Add User Button */}
      <div className="flex items-center space-x-3">
        
        {/* New User Button (visible for ADMIN and SUPER_ADMIN) */}
        {(loggedInUserRole === 'ADMIN' || loggedInUserRole === 'SUPER_ADMIN') && (
          <button
            onClick={handleOpenNewUserModal}
            className="flex items-center px-4 py-2.5 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-150 ease-in-out"
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            Add User
          </button>
        )}
      </div>

      {/* Right side: Search and Refresh */}
      <div className="flex items-center space-x-3">
        <div className="relative">
          <input
            type="text"
            placeholder="Search users..."
            className="pl-10 pr-4 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
          </div>
        </div>
        <button
            onClick={fetchUsers}
            className="p-2.5 border border-gray-300 rounded-md bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out"
        >
          <ArrowPathIcon className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </div>
  );
};

export default UserActionsBar;