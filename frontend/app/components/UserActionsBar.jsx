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
    <div className="bg-gray-800 p-4 shadow-lg rounded-lg mb-6 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 border border-emerald-800/50">
      {/* Left side: "Users" display and Add User Button */}
      <div className="flex items-center space-x-4 w-full sm:w-auto justify-between sm:justify-start">
        <div className="flex items-center px-5 py-2.5 bg-gray-700 text-emerald-300 font-medium rounded-md border border-gray-600 shadow-sm">
          <UsersIcon className="w-5 h-5 mr-2" />
          Users
        </div>
        {/* New User Button (visible for ADMIN and SUPER_ADMIN) */}
        {(loggedInUserRole === 'ADMIN' || loggedInUserRole === 'SUPER_ADMIN') && (
          <button
            onClick={handleOpenNewUserModal}
            className="flex items-center px-4 py-2.5 bg-emerald-600 text-white font-medium rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition duration-150 ease-in-out shadow-md transform hover:scale-105"
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            Add User
          </button>
        )}
      </div>

      {/* Right side: Search and Refresh */}
      <div className="flex items-center space-x-3 w-full sm:w-auto">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search users..."
            className="pl-10 pr-4 py-2.5 w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm transition-all duration-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
          </div>
        </div>
        <button
            onClick={fetchUsers}
            className="p-2.5 border border-gray-600 rounded-md bg-gray-700 text-gray-200 hover:bg-gray-600 hover:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition duration-150 ease-in-out shadow-sm"
        >
          <ArrowPathIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default UserActionsBar;