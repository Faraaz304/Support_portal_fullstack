// components/DashboardContent.jsx
import React from 'react';
import UserTable from './UserTable'; // Import the UserTable component
import { ExclamationTriangleIcon, InformationCircleIcon } from '@heroicons/react/24/outline'; // New icons for error/info

const DashboardContent = ({
  loading,
  error,
  filteredUsers,
  loggedInUserRole,
  loggedInUserName,
  handleViewDetails,
  handleOpenEditUserModal,
  handleDeleteUser
}) => {
  if (loading) {
    return (
      <div className="text-center py-12 text-lg text-emerald-400"> {/* Loading text color updated */}
        <svg className="animate-spin inline-block w-8 h-8 mr-2 text-emerald-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"> {/* Spinner color updated */}
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Loading users...
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-800/20 border border-red-700 text-red-300 px-4 py-6 rounded-lg relative text-center mb-6 animate-pulse-once"> {/* Dark red error theme */}
        <ExclamationTriangleIcon className="inline-block w-6 h-6 mr-2 -mt-1 text-red-400" />
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline ml-2">{error}</span>
        <p className="text-sm mt-2 text-red-200">Please ensure your backend is running and accessible and you are logged in.</p>
      </div>
    );
  }

  if (filteredUsers.length === 0) {
    return (
      <div className="text-center py-12 text-lg text-gray-400 bg-gray-800 rounded-lg shadow-lg border border-emerald-800/50"> {/* Dark theme for no users found */}
        <InformationCircleIcon className="inline-block w-8 h-8 mb-4 text-emerald-500" />
        <p>No users found matching your criteria.</p>
        <p className="text-sm text-gray-500 mt-2">Try adjusting your search or refreshing the list.</p>
      </div>
    );
  }

  return (
    <UserTable
      users={filteredUsers}
      loggedInUserRole={loggedInUserRole}
      loggedInUserName={loggedInUserName}
      handleViewDetails={handleViewDetails}
      handleOpenEditUserModal={handleOpenEditUserModal}
      handleDeleteUser={handleDeleteUser}
    />
  );
};

export default DashboardContent;