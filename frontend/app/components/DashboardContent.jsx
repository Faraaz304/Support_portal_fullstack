// components/DashboardContent.jsx
import React from 'react';
import UserTable from './UserTable'; // Import the UserTable component

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
      <div className="text-center py-12 text-lg text-gray-600">
        <svg className="animate-spin inline-block w-8 h-8 mr-2 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Loading users...
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 rounded relative text-center py-6">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline ml-2">{error}</span>
        <p className="text-sm mt-2">Please ensure your backend is running and accessible and you are logged in.</p>
      </div>
    );
  }

  if (filteredUsers.length === 0) {
    return (
      <div className="text-center py-12 text-lg text-gray-600">
        No users found.
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