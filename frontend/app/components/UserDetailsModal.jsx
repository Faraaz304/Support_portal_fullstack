// components/UserDetailsModal.jsx
import React from 'react';
import {
  XMarkIcon,
  IdentificationIcon,
  EnvelopeIcon,
  ShieldCheckIcon,
  LockOpenIcon,
  LockClosedIcon
} from '@heroicons/react/24/outline';

const UserDetailsModal = ({ user, onClose }) => {
  if (!user) return null; // Don't render if no user is provided

  // Directly use values from the 'user' prop.
  // Provide fallbacks if fields might be missing from your backend data.
  const userRole = user.role ? user.role.replace('_', ' ') : 'N/A'; // Use the role from user object, format it, default to N/A
  const accountStatus = user.accountStatus || 'Unlocked'; // e.g., 'Locked', 'Unlocked', default to 'Unlocked'

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-900 bg-opacity-50 flex items-center justify-center p-4">
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-auto transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900">
            User Profile
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md p-1 transition-colors duration-200"
            aria-label="Close"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* User Summary Section */}
          <div className="flex flex-col items-center sm:flex-row sm:items-start sm:space-x-6 pb-6 border-b border-gray-100">
            <div className="flex-shrink-0 mb-4 sm:mb-0">
              <img
                className="h-24 w-24 rounded-full object-cover ring-2 ring-blue-200 shadow-md"
                src={user.photoUrl}
                alt={`${user.firstName}'s photo`}
                onError={(e) => { e.target.onerror = null; e.target.src = '/avatars/default.png' }}
              />
            </div>
            <div className="text-center sm:text-left flex-grow">
              <h4 className="text-2xl font-bold text-gray-900 mb-1">
                {user.firstName} {user.lastName}
              </h4>
              <p className="text-lg text-gray-700 font-medium mb-2">{user.username}</p>
              <div className="flex justify-center sm:justify-start items-center space-x-2 mt-2">
                <span className={`
                    px-3 py-1 inline-flex text-sm font-semibold rounded-full
                    ${user.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                `}>
                  {user.status}
                </span>
              </div>
            </div>
          </div>

          {/* User Details List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center text-base text-gray-800">
              <IdentificationIcon className="h-5 w-5 mr-3 text-gray-500 flex-shrink-0" />
              <span className="font-medium">User ID:</span> <span className="ml-2">{user.id}</span>
            </div>
            <div className="flex items-center text-base text-gray-800">
              <EnvelopeIcon className="h-5 w-5 mr-3 text-gray-500 flex-shrink-0" />
              <span className="font-medium">Email:</span> <span className="ml-2 break-all">{user.email}</span>
            </div>
            <div className="flex items-center text-base text-gray-800">
              <ShieldCheckIcon className="h-5 w-5 mr-3 text-gray-500 flex-shrink-0" />
              <span className="font-medium">Role:</span> <span className="ml-2">{userRole}</span>
            </div>
            <div className="flex items-center text-base text-gray-800">
              {accountStatus === 'Unlocked' ? (
                <LockOpenIcon className="h-5 w-5 mr-3 text-green-600 flex-shrink-0" />
              ) : (
                <LockClosedIcon className="h-5 w-5 mr-3 text-red-600 flex-shrink-0" />
              )}
              <span className="font-medium">Account Status:</span> <span className="ml-2">{accountStatus}</span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-5 bg-gray-50 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            type="button"
            className="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-5 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm transition-colors duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsModal;