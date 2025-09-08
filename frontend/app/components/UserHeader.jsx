// components/UserHeader.jsx
import React from 'react';
import { UserCircleIcon, Squares2X2Icon } from '@heroicons/react/24/outline'; // Squares2X2Icon for dashboard feel

const UserHeader = ({ loggedInUserName, loggedInUserPhotoUrl }) => {
  return (
    // Removed rounded-lg from header itself for sharp corners
    <header className="bg-gray-900 text-gray-100 shadow-xl p-5 md:p-6 flex flex-col md:flex-row justify-between items-center mb-6 border-b border-emerald-800/50">
      {/* Left Section: Portal Branding/Title and Current Context */}
      <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-6">
        {/* Portal Branding / Main Title */}
        <div className="flex items-center space-x-3 transition-transform duration-300 hover:scale-105">
          <Squares2X2Icon className="h-8 w-8 text-emerald-400" /> {/* Dashboard Icon */}
          <h1 className="text-3xl font-extrabold tracking-tight text-white">Admin Dashboard</h1>
        </div>

        {/* Current Page Context (e.g., "Users Overview") */}
        <span className="text-emerald-600 text-lg font-medium hidden md:inline-block">|</span> {/* Visual Separator */}
        <span className="text-emerald-400 text-xl font-semibold mt-2 md:mt-0 hidden sm:inline-block">Users Overview</span> {/* More descriptive context */}
      </div>

      {/* Right Section: Logged-in User Info (Moved back to the right) */}
      <div className="flex items-center space-x-3 mt-4 md:mt-0 p-2 pl-4 rounded-full bg-gray-800 hover:bg-gray-700 transition duration-200 ease-in-out cursor-pointer group border border-emerald-800/60">
        <span className="text-lg font-medium text-gray-200 group-hover:text-white transition-colors duration-200 hidden sm:inline-block">
          Welcome, {loggedInUserName}
        </span>
        {loggedInUserPhotoUrl ? (
          <img
            className="h-10 w-10 rounded-full object-cover ring-2 ring-emerald-500 group-hover:ring-emerald-300 transition-all duration-200"
            src={loggedInUserPhotoUrl}
            alt={`${loggedInUserName}'s profile`}
            onError={(e) => { e.target.onerror = null; e.target.src = '/avatars/default.png'; }} // Fallback image
          />
        ) : (
          <UserCircleIcon className="w-10 h-10 text-emerald-500 group-hover:text-emerald-300 transition-colors duration-200" />
        )}
        {/* For small screens, show "Welcome" next to icon only if name doesn't fit */}
        <span className="text-md font-medium text-gray-200 group-hover:text-white transition-colors duration-200 sm:hidden">
          Welcome!
        </span>
      </div>
    </header>
  );
};

export default UserHeader;