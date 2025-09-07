// page.jsx (or UserDashboardUI.jsx)
"use client";

import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

// Import new components
import UserHeader from '../components/UserHeader';
import UserActionsBar from '../components/UserActionsBar';
import DashboardContent from '../components/DashboardContent';

// Import modals (already separate, which is great)
import UserDetailsModal from '../components/UserDetailsModal';
import NewUserModal from '../components/NewUserModal';
import EditUserModal from '../components/EditUserModal';

const UserDashboardUI = () => {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loggedInUserName, setLoggedInUserName] = useState("Guest");
  const [loggedInUserRole, setLoggedInUserRole] = useState(null);
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  const [loggedInUserPhotoUrl, setLoggedInUserPhotoUrl] = useState(null); // New state for photo URL

  // States for modals
  const [showUserDetailsModal, setShowUserDetailsModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showNewUserModal, setShowNewUserModal] = useState(false);
  const [newUserError, setNewUserError] = useState(null);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const [editUserError, setEditUserError] = useState(null);


  // Function to open the User Details modal (from row click)
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

  // Functions to manage Edit User Modal (from edit button click)
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

      const currentLoggedInUserName = decodedToken.sub || "User";
      const currentLoggedInUserRole = decodedToken.role || localStorage.getItem('user_role') || null;
      const currentLoggedInUserId = decodedToken.userId || null;

      setLoggedInUserName(currentLoggedInUserName);
      setLoggedInUserRole(currentLoggedInUserRole);
      setLoggedInUserId(currentLoggedInUserId);

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
          photoUrl: user.photoUrl || `/avatars/avatar${(Math.abs(user.id) % 5) + 1}.png`, // Ensure photoUrl is set
          status: user.status || 'ACTIVE',
          accountStatus: user.accountStatus || (Math.random() > 0.9 ? 'Locked' : 'Unlocked') // Keep if still relevant
      }));
      setUsers(usersWithDefaults);
      console.log('Fetched users:', usersWithDefaults);

      // After fetching all users, find the logged-in user's photo
      const loggedInUser = usersWithDefaults.find(user => user.username === currentLoggedInUserName);
      if (loggedInUser && loggedInUser.photoUrl) {
        setLoggedInUserPhotoUrl(loggedInUser.photoUrl);
      } else {
        // Fallback for logged-in user's photo if not found or no specific photoUrl
        setLoggedInUserPhotoUrl(`/avatars/avatar${(Math.abs(currentLoggedInUserId || 0) % 5) + 1}.png`);
      }

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
        accountStatus: newUser.accountStatus || 'Unlocked' // Keep if still relevant
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
            // Ensure photoUrl and other relevant fields are maintained if not returned by backend
            photoUrl: updatedUser.photoUrl || user.photoUrl,
            status: updatedUser.status || user.status,
          } : user
        )
      );

      // If the logged-in user's own profile was updated, update their photo URL
      if (userId === loggedInUserId) {
        setLoggedInUserPhotoUrl(updatedUser.photoUrl || `/avatars/avatar${(Math.abs(loggedInUserId || 0) % 5) + 1}.png`);
      }

      handleCloseEditUserModal();
      alert('User updated successfully!');
    } catch (err) {
      console.error('Error updating user:', err);
      setEditUserError(err.message || 'Failed to update user.');
    }
  }, [router, loggedInUserId]);


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
  const availableRoles = ['USER', 'ADMIN', 'SUPER_ADMIN', 'HR', 'MANAGER'];

  return (
    <div className="min-h-screen bg-gray-100 ">
      <UserHeader loggedInUserName={loggedInUserName} loggedInUserPhotoUrl={loggedInUserPhotoUrl} />

      <div className="mx-5 ">
        <UserActionsBar
          loggedInUserRole={loggedInUserRole}
          handleOpenNewUserModal={handleOpenNewUserModal}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          fetchUsers={fetchUsers}
        />

        <DashboardContent
          loading={loading}
          error={error}
          filteredUsers={filteredUsers}
          loggedInUserRole={loggedInUserRole}
          loggedInUserName={loggedInUserName}
          handleViewDetails={handleViewDetails}
          handleOpenEditUserModal={handleOpenEditUserModal}
          handleDeleteUser={handleDeleteUser}
        />
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