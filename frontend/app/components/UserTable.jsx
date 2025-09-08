// components/UserTable.jsx
import React from 'react';
import {
  PencilSquareIcon,
  TrashIcon
} from '@heroicons/react/24/outline';

const UserTable = ({
  users,
  loggedInUserRole,
  loggedInUserName,
  handleViewDetails,
  handleOpenEditUserModal,
  handleDeleteUser
}) => {
  return (
    <div className="bg-gray-800 shadow-lg rounded-lg overflow-hidden border border-emerald-800/50">
      <table className="min-w-full divide-y divide-emerald-800/60">
        <thead className="bg-gray-900">
          <tr>
            <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-emerald-300 uppercase tracking-wider">
              Photo
            </th>
            <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-emerald-300 uppercase tracking-wider">
              User ID
            </th>
            <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-emerald-300 uppercase tracking-wider">
              First Name
            </th>
            <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-emerald-300 uppercase tracking-wider">
              Last Name
            </th>
            <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-emerald-300 uppercase tracking-wider">
              Username
            </th>
            <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-emerald-300 uppercase tracking-wider">
              Email
            </th>
            <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-emerald-300 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-emerald-300 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-800 divide-y divide-gray-700">
          {users.map((user, index) => (
            <tr
              key={user.id}
              className={`cursor-pointer ${index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-800/80'} hover:bg-gray-700 transition duration-150 ease-in-out`}
              onClick={() => handleViewDetails(user)}
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <img
                      className="h-10 w-10 rounded-full object-cover ring-1 ring-emerald-600"
                      src={user.photoUrl}
                      alt={`${user.firstName}'s photoUrl`}
                      onError={(e) => { e.target.onerror = null; e.target.src = '/avatars/default.png' }}
                    />
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">
                {user.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">
                {user.firstName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">
                {user.lastName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">
                {user.username}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-emerald-200">
                {user.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`
                    px-2.5 py-0.5 inline-flex text-sm font-medium rounded-md
                    ${user.status === 'ACTIVE' ? 'bg-green-700 text-green-100' : 'bg-red-700 text-red-100'}
                `}>
                  {user.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex items-center space-x-2">
                {/* Conditional Edit Button for Admin and Super Admin */}
                {(loggedInUserRole === 'ADMIN' || loggedInUserRole === 'SUPER_ADMIN') && (
                  <button
                    onClick={(event) => handleOpenEditUserModal(user, event)}
                    className="inline-flex items-center justify-center p-2 border border-transparent rounded-md bg-gray-700 text-emerald-300 hover:bg-gray-600 hover:text-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition duration-150 ease-in-out"
                  >
                    <PencilSquareIcon className="w-5 h-5" />
                  </button>
                )}

                {/* Conditional Delete Button for Super Admin, excluding the logged-in user by username */}
                {loggedInUserRole === 'SUPER_ADMIN' && user.username !== loggedInUserName && (
                  <button
                    onClick={(event) => handleDeleteUser(user.id, event)}
                    className="inline-flex items-center justify-center p-2 border border-transparent rounded-md bg-red-800/30 text-red-300 hover:bg-red-800/50 hover:border-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition duration-150 ease-in-out"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;