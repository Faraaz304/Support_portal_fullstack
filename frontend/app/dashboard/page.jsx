"use client";

import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  UsersIcon,
  MagnifyingGlassIcon,
  ArrowPathIcon,
  PencilSquareIcon,
  UserCircleIcon,
  PlusIcon,
  TrashIcon
} from '@heroicons/react/24/outline';

import UserDetailsModal from '../components/UserDetailsModal';
import NewUserModal from '../components/NewUserModal';
import EditUserModal from '../components/EditUserModal'; // Import the new EditUserModal

const UserDashboardUI = () => {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loggedInUserName, setLoggedInUserName] = useState("Guest");
  const [loggedInUserRole, setLoggedInUserRole] = useState(null);
  const [loggedInUserId, setLoggedInUserId] = useState(null);

  // States for modals
  const [showUserDetailsModal, setShowUserDetailsModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null); // Used for viewing details
  const [showNewUserModal, setShowNewUserModal] = useState(false);
  const [newUserError, setNewUserError] = useState(null);

  const [showEditUserModal, setShowEditUserModal] = useState(false); // New state for edit modal visibility
  const [userToEdit, setUserToEdit] = useState(null); // New state to hold user data for editing
  const [editUserError, setEditUserError] = useState(null); // To display errors in edit user modal


  // Function to open the User Details modal
  const handleViewDetails = (user) => {
    setSelectedUser(user);
    setShowUserDetailsModal(true);
  };

  // Function to close the User Details modal
  const handleCloseUserDetailsModal = () => {
    setShowUserDetailsModal(false);
    setSelectedUser(null);
  };

  // Functions to manage New User Modal
  const handleOpenNewUserModal = () => {
    setShowNewUserModal(true);
    setNewUserError(null);
  };

  const handleCloseNewUserModal = () => {
    setShowNewUserModal(false);
    setNewUserError(null);
  };

  // Functions to manage Edit User Modal
  const handleOpenEditUserModal = (user, event) => {
    event.stopPropagation(); // Prevent the row's handleViewDetails from triggering
    setUserToEdit(user);
    setShowEditUserModal(true);
    setEditUserError(null);
  };

  const handleCloseEditUserModal = () => {
    setShowEditUserModal(false);
    setUserToEdit(null);
    setEditUserError(null);
  };


  // Memoize the fetchUsers function
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);

    const token = localStorage.getItem('jwt_token');

    if (!token) {
      setError('No authentication token found. Please log in.');
      setLoading(false);
      setTimeout(() => {
        router.push('/login');
      }, 1500);
      return;
    }

    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const decodedToken = JSON.parse(window.atob(base64));

      setLoggedInUserName(decodedToken.sub || "User");
      setLoggedInUserRole(decodedToken.role || localStorage.getItem('user_role') || null);
      setLoggedInUserId(decodedToken.userId || null); // Assuming 'userId' is a field in your token payload

      const response = await fetch('http://localhost:8080/api/users/all', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 401) {
        localStorage.removeItem('jwt_token');
        setError('Session expired or unauthorized. Please log in again.');
        setLoading(false);
        setTimeout(() => {
          router.push('/login');
        }, 1500);
        return;
      }

      if (!response.ok) {
        let errorMessage = `HTTP error! status: ${response.status}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorData.error || errorMessage;
        } catch (jsonError) {
          errorMessage = await response.text();
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      const usersWithDefaults = data.map(user => ({
          ...user,
          photoUrl: user.photoUrl || `/avatars/avatar${(Math.abs(user.id) % 5) + 1}.png`,
          status: user.status || 'Active',
          joinedDate: user.joinedDate || `2020-05-${Math.floor(Math.random() * 28) + 1}T10:00:00Z`,
          lastLogin: user.lastLogin || `2020-06-${Math.floor(Math.random() * 28) + 1}T${String(Math.floor(Math.random() * 24)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}Z`,
          accountStatus: user.accountStatus || (Math.random() > 0.9 ? 'Locked' : 'Unlocked')
      }));
      setUsers(usersWithDefaults);
      console.log('Fetched users:', usersWithDefaults);

    } catch (err) {
      console.error('Error fetching users:', err);
      setError(err.message || 'Failed to fetch users.');
    } finally {
      setLoading(false);
    }
  }, [router]);

  // Handle user deletion
  const handleDeleteUser = useCallback(async (userId, event) => {
    event.stopPropagation(); // Prevent row click from opening details modal

    if (!window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
      return;
    }

    const token = localStorage.getItem('jwt_token');
    if (!token) {
      setError('No authentication token found. Please log in.');
      setTimeout(() => router.push('/login'), 1500);
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/users/delete/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 401) {
        localStorage.removeItem('jwt_token');
        setError('Session expired or unauthorized. Please log in again.');
        setTimeout(() => router.push('/login'), 1500);
        return;
      }

      if (!response.ok) {
        let errorMessage = `HTTP error! status: ${response.status}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorData.error || errorMessage;
        } catch (jsonError) {
          errorMessage = await response.text();
        }
        throw new Error(errorMessage);
      }

      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
      alert('User deleted successfully!');
    } catch (err) {
      console.error('Error deleting user:', err);
      setError(err.message || 'Failed to delete user.');
    }
  }, [router]);

  // Handle new user creation
  const handleCreateUser = useCallback(async (userData) => {
    setNewUserError(null);
    const token = localStorage.getItem('jwt_token');

    if (!token) {
      setNewUserError('No authentication token found. Please log in.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/users/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(userData)
      });

      if (response.status === 401) {
        localStorage.removeItem('jwt_token');
        setNewUserError('Session expired or unauthorized. Please log in again.');
        setTimeout(() => router.push('/login'), 1500);
        return;
      }

      if (!response.ok) {
        let errorMessage = `HTTP error! status: ${response.status}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorData.error || errorMessage;
        } catch (jsonError) {
          errorMessage = await response.text();
        }
        throw new Error(errorMessage);
      }

      const newUser = await response.json();
      const newUserWithDefaults = {
        ...newUser,
        photoUrl: newUser.photoUrl || `/avatars/avatar${(Math.abs(newUser.id) % 5) + 1}.png`,
        status: newUser.status || 'ACTIVE',
        joinedDate: newUser.joinedDate || new Date().toISOString(),
        lastLogin: newUser.lastLogin || new Date().toISOString(),
        accountStatus: newUser.accountStatus || 'Unlocked'
      };

      setUsers(prevUsers => [...prevUsers, newUserWithDefaults]);
      handleCloseNewUserModal();
      alert('User created successfully!');
    } catch (err) {
      console.error('Error creating user:', err);
      setNewUserError(err.message || 'Failed to create user.');
    }
  }, [router]);

  // Handle user update
  const handleUpdateUser = useCallback(async (userId, updatedData) => {
    setEditUserError(null);
    const token = localStorage.getItem('jwt_token');

    if (!token) {
      setEditUserError('No authentication token found. Please log in.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/users/update/${userId}`, {
        method: 'PUT', // Use PUT for updates
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedData)
      });

      if (response.status === 401) {
        localStorage.removeItem('jwt_token');
        setEditUserError('Session expired or unauthorized. Please log in again.');
        setTimeout(() => router.push('/login'), 1500);
        return;
      }

      if (!response.ok) {
        let errorMessage = `HTTP error! status: ${response.status}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorData.error || errorMessage;
        } catch (jsonError) {
          errorMessage = await response.text();
        }
        throw new Error(errorMessage);
      }

      const updatedUser = await response.json();
      setUsers(prevUsers =>
        prevUsers.map(user =>
          user.id === userId ? {
            ...user,
            ...updatedUser,
            // Ensure photoUrl and other dummy fields are maintained if not returned by backend
            photoUrl: updatedUser.photoUrl || user.photoUrl,
            status: updatedUser.status || user.status,
          } : user
        )
      );
      handleCloseEditUserModal();
      alert('User updated successfully!');
    } catch (err) {
      console.error('Error updating user:', err);
      setEditUserError(err.message || 'Failed to update user.');
    }
  }, [router]);


  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Filter users based on search term
  const filteredUsers = users.filter(user =>
    Object.values(user).some(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Available roles for the new user creation modal and edit modal
  const availableRoles = ['USER', 'ADMIN', 'SUPER_ADMIN', 'HR']; // Added MANAGER role as example

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Top Bar/Header (Navbar) */}
      <header className="bg-white shadow-md p-4 flex justify-between items-center mb-6 rounded-lg">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-gray-800">User Management Portal</h1>
          <span className="text-gray-500 text-base">Users</span>
        </div>
        <div className="flex items-center space-x-3 text-gray-700">
          <span className="text-lg font-medium">Welcome, {loggedInUserName}</span>
          <button className="p-1 rounded-full text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            <UserCircleIcon className="w-8 h-8" />
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto">
        {/* Actions Bar */}
        <div className="bg-white p-4 shadow-sm rounded-lg mb-6 flex justify-between items-center">
          {/* Left side: Users Button and Add User Button */}
          <div className="flex items-center space-x-3">
            <button className="flex items-center px-5 py-2.5 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out">
              <UsersIcon className="w-5 h-5 mr-2" />
              Users
            </button>
            {/* New User Button (visible for ADMIN and SUPER_ADMIN) */}
            {(loggedInUserRole === 'ADMIN' || loggedInUserRole === 'SUPER_ADMIN') && (
              <button
                onClick={handleOpenNewUserModal}
                className="flex items-center px-4 py-2.5 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-150 ease-in-out"
              >
                <PlusIcon className="w-5 h-5 mr-2" />
                Add User
              </button>
            )}
          </div>

          {/* Right side: Search and Refresh */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search users..."
                className="pl-10 pr-4 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
              </div>
            </div>
            <button
                onClick={fetchUsers}
                className="p-2.5 border border-gray-300 rounded-md bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out"
            >
              <ArrowPathIcon className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Loading, Error, or Table */}
        {loading ? (
          <div className="text-center py-12 text-lg text-gray-600">
            <svg className="animate-spin inline-block w-8 h-8 mr-2 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Loading users...
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center py-6">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline ml-2">{error}</span>
            <p className="text-sm mt-2">Please ensure your backend is running and accessible and you are logged in.</p>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="text-center py-12 text-lg text-gray-600">
              No users found.
          </div>
        ) : (
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
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user, index) => (
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
        )}
      </div>

      {/* User Details Modal */}
      {showUserDetailsModal && (
        <UserDetailsModal user={selectedUser} onClose={handleCloseUserDetailsModal} />
      )}

      {/* New User Modal */}
      {showNewUserModal && (
        <NewUserModal
          onClose={handleCloseNewUserModal}
          onCreateUser={handleCreateUser}
          roles={availableRoles}
          error={newUserError}
        />
      )}

      {/* Edit User Modal */}
      {showEditUserModal && (
        <EditUserModal
          onClose={handleCloseEditUserModal}
          onUpdateUser={handleUpdateUser}
          user={userToEdit}
          roles={availableRoles}
          error={editUserError}
        />
      )}
    </div>
  );
};

export default UserDashboardUI;