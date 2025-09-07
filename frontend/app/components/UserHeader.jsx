// components/UserHeader.jsx
import React from 'react';
import { UserCircleIcon, Squares2X2Icon } from '@heroicons/react/24/outline'; // Squares2X2Icon for dashboard feel

const UserHeader = ({ loggedInUserName, loggedInUserPhotoUrl }) => {
  return (
    <header className="bg-white text-gray-800 shadow-md p-5 md:p-6 flex flex-col md:flex-row justify-between items-center mb-6  ">
      {/* Left Section: Main Title and Current Context */}
      <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-6 w-full md:w-auto">
        {/* Main Title / Branding */}
        <div className="flex items-center space-x-2 transition-transform duration-300 hover:scale-105">
          <Squares2X2Icon className="h-7 w-7 text-green-600" /> {/* Icon */}
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-gray-900">User Management</h1>
        </div>

        {/* Current Page Context / Separator */}
      </div>

      {/* Right Section: Logged-in User Info (moved back to the right) */}
      <div className="flex items-center space-x-3 mt-4 md:mt-0 p-2 pl-4 rounded-full bg-green-50 hover:bg-green-100 transition duration-200 ease-in-out cursor-pointer group border border-green-200">
        <span className="text-md font-medium text-gray-700 group-hover:text-green-800 transition-colors duration-200 hidden sm:inline-block">
          Welcome, {loggedInUserName}
        </span>
        <button className="p-0 rounded-full focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-offset-2 focus:ring-offset-white transition duration-150 ease-in-out">
          {loggedInUserPhotoUrl ? (
            <img
              className="h-9 w-9 rounded-full object-cover ring-2 ring-green-400 group-hover:ring-green-600 transition-all duration-200"
              src={loggedInUserPhotoUrl}
              alt={`${loggedInUserName}'s profile`}
              onError={(e) => { e.target.onerror = null; e.target.src = '/avatars/default.png'; }} // Fallback image
            />
          ) : (
            <UserCircleIcon className="w-9 h-9 text-green-500 group-hover:text-green-700 transition-colors duration-200" />
          )}
        </button>
        {/* On smaller screens, only show "Welcome" if not enough space for name and picture on the right */}
        <span className="text-md font-medium text-gray-700 group-hover:text-green-800 transition-colors duration-200 sm:hidden">
          Welcome!
        </span>
      </div>
    </header>
  );
};

export default UserHeader;