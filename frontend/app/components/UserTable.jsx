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
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
              photoUrl
            </th>
            <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
              User ID
            </th>
            <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
              First Name
            </th>
            <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
              Last Name
            </th>
            <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
              Username
            </th>
            <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
              Email
            </th>
            <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-neutral-900 divide-y divide-gray-200">
          {users.map((user, index) => (
            <tr
              key={user.id}
              className={`cursor-pointer ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100 transition duration-150 ease-in-out`}
              onClick={() => handleViewDetails(user)} // Clickable row to open modal
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <img
                      className="h-10 w-10 rounded-full object-cover ring-1 ring-gray-200"
                      src={user.photoUrl}
                      alt={`${user.firstName}'s photoUrl`}
                      onError={(e) => { e.target.onerror = null; e.target.src = '/avatars/default.png' }}
                    />
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {user.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {user.firstName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {user.lastName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {user.username}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {user.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`
                    px-2.5 py-0.5 inline-flex text-sm font-medium rounded-md
                    ${user.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}
                `}>
                  {user.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex items-center space-x-2">
                {/* Conditional Edit Button for Admin and Super Admin */}
                {(loggedInUserRole === 'ADMIN' || loggedInUserRole === 'SUPER_ADMIN') && (
                  <button
                    onClick={(event) => handleOpenEditUserModal(user, event)}
                    className="inline-flex items-center justify-center p-2 border border-transparent rounded-md bg-gray-50 text-gray-600 hover:bg-gray-100 hover:border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out"
                  >
                    <PencilSquareIcon className="w-5 h-5" />
                  </button>
                )}

                {/* Conditional Delete Button for Super Admin, excluding the logged-in user by username */}
                {loggedInUserRole === 'SUPER_ADMIN' && user.username !== loggedInUserName && (
                  <button
                    onClick={(event) => handleDeleteUser(user.id, event)}
                    className="inline-flex items-center justify-center p-2 border border-transparent rounded-md bg-red-50 text-red-600 hover:bg-red-100 hover:border-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-150 ease-in-out"
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