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
  if (!user) return null;

  const userRole = user.role ? user.role.replace('_', ' ') : 'N/A';
  const accountStatus = user.accountStatus || 'Unlocked';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-900 bg-opacity-70 flex items-center justify-center p-4">
      <div className="relative bg-gray-800 rounded-lg shadow-2xl w-full max-w-md mx-auto transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full border border-emerald-700/50 text-gray-100">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-emerald-800/60">
          <h3 className="text-xl font-bold text-white">
            User Profile
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-md p-1 transition-colors duration-200"
            aria-label="Close"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* User Summary Section */}
          <div className="flex flex-col items-center sm:flex-row sm:items-start sm:space-x-6 pb-6 border-b border-gray-700">
            <div className="flex-shrink-0 mb-4 sm:mb-0">
              <img
                className="h-24 w-24 rounded-full object-cover ring-2 ring-emerald-500 shadow-lg"
                src={user.photoUrl}
                alt={`${user.firstName}'s photo`}
                onError={(e) => { e.target.onerror = null; e.target.src = '/avatars/default.png' }}
              />
            </div>
            <div className="text-center sm:text-left flex-grow">
              <h4 className="text-2xl font-bold text-white mb-1">
                {user.firstName} {user.lastName}
              </h4>
              <p className="text-lg text-emerald-400 font-medium mb-2">{user.username}</p>
              <div className="flex justify-center sm:justify-start items-center space-x-2 mt-2">
                <span className={`
                    px-3 py-1 inline-flex text-sm font-semibold rounded-full
                    ${user.status === 'ACTIVE' ? 'bg-green-700 text-green-100' : 'bg-red-700 text-red-100'}
                `}>
                  {user.status}
                </span>
              </div>
            </div>
          </div>

          {/* User Details List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center text-base text-gray-200">
              <IdentificationIcon className="h-5 w-5 mr-3 text-emerald-500 flex-shrink-0" />
              <span className="font-medium">User ID:</span> <span className="ml-2">{user.id}</span>
            </div>
            <div className="flex items-center text-base text-gray-200">
              <EnvelopeIcon className="h-5 w-5 mr-3 text-emerald-500 flex-shrink-0" />
              <span className="font-medium">Email:</span>
              <span className="ml-2 truncate overflow-hidden" title={user.email}>
                {user.email}
              </span>
            </div>
            <div className="flex items-center text-base text-gray-200">
              <ShieldCheckIcon className="h-5 w-5 mr-3 text-emerald-500 flex-shrink-0" />
              <span className="font-medium">Role:</span> <span className="ml-2 text-emerald-200">{userRole}</span>
            </div>
            <div className="flex items-center text-base text-gray-200">
              {accountStatus === 'Unlocked' ? (
                <LockOpenIcon className="h-5 w-5 mr-3 text-emerald-500 flex-shrink-0" />
              ) : (
                <LockClosedIcon className="h-5 w-5 mr-3 text-red-600 flex-shrink-0" />
              )}
              <span className="font-medium">Account Status:</span> <span className="ml-2">{accountStatus}</span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-5 bg-gray-900 border-t border-emerald-800/60 flex justify-end">
          <button
            onClick={onClose}
            type="button"
            className="inline-flex justify-center rounded-md border border-gray-600 shadow-sm px-5 py-2 bg-gray-700 text-base font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 focus:ring-offset-gray-900 sm:text-sm transition-colors duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsModal;