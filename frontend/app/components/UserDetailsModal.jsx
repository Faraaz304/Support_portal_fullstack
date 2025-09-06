// components/UserDetailsModal.jsx
import React from 'react';
import {
  XMarkIcon,
  IdentificationIcon,
  EnvelopeIcon,
  ShieldCheckIcon,
  ArrowRightOnRectangleIcon,
  LockOpenIcon,
  LockClosedIcon // For potentially locked accounts
} from '@heroicons/react/24/outline';

const UserDetailsModal = ({ user, onClose }) => {
  if (!user) return null; // Don't render if no user is provided

  // Dummy data for fields not necessarily in your current user object
  // Replace these with actual data from 'user' prop when your backend provides them
  const joinedDate = user.joinedDate ? new Date(user.joinedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : `May ${Math.floor(Math.random() * 28) + 1}, 2020`;
  const lastLogin = user.lastLogin ? new Date(user.lastLogin).toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' }) : `Jun ${Math.floor(Math.random() * 28) + 1}, 2020, ${Math.floor(Math.random() * 12) + 1}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')} AM`;
  const accountStatus = user.accountStatus || 'Unlocked'; // e.g., 'Locked', 'Unlocked'
  const userRole = user.role || 'USER'; // Use the role from your user object, default to USER

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-900 bg-opacity-50 flex items-center justify-center p-4">
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800">
            {user.firstName} {user.lastName}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4">
          {/* User Summary Section */}
          <div className="flex items-start space-x-4 pb-4 border-b border-gray-100">
            <div className="flex-shrink-0">
              <img
                className="h-20 w-20 rounded-lg object-cover ring-1 ring-gray-200"
                src={user.photoUrl}
                alt={`${user.firstName}'s photoUrl`}
                onError={(e) => { e.target.onerror = null; e.target.src = '/avatars/default.png' }}
              />
            </div>
            <div className="flex-grow">
              <div className="flex items-baseline justify-between">
                <h4 className="text-lg font-semibold text-gray-900">
                  {user.firstName} {user.lastName}
                </h4>
                <p className="text-sm text-gray-500">Joined {joinedDate}</p>
              </div>
              <p className="text-sm text-gray-600">{user.username}</p>
              <div className="flex items-center space-x-2 mt-1">
                <span className={`
                    px-2.5 py-0.5 inline-flex text-xs font-medium rounded-md
                    ${user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}
                `}>
                  Status: {user.status}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Last Login: {lastLogin}</p>
            </div>
          </div>

          {/* User Details List */}
          <div className="space-y-3">
            <div className="flex items-center text-sm text-gray-800">
              <IdentificationIcon className="h-5 w-5 mr-3 text-gray-500" />
              <span>{user.id}</span>
            </div>
            <div className="flex items-center text-sm text-gray-800">
              <EnvelopeIcon className="h-5 w-5 mr-3 text-gray-500" />
              <span>{user.email}</span>
            </div>
            <div className="flex items-center text-sm text-gray-800">
              <ShieldCheckIcon className="h-5 w-5 mr-3 text-gray-500" />
              <span>{userRole.replace('_', ' ')}</span> {/* Display role nicely */}
            </div>
            <div className="flex items-center text-sm text-gray-800">
              <ArrowRightOnRectangleIcon className="h-5 w-5 mr-3 text-gray-500" />
              <span>{lastLogin}</span> {/* Redundant with summary but present in image */}
            </div>
            <div className="flex items-center text-sm text-gray-800">
              {accountStatus === 'Unlocked' ? (
                <LockOpenIcon className="h-5 w-5 mr-3 text-green-500" />
              ) : (
                <LockClosedIcon className="h-5 w-5 mr-3 text-red-500" />
              )}
              <span>Account {accountStatus}</span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            type="button"
            className="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsModal;