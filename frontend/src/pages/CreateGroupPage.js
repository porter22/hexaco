import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateGroupPage.css';

const CreateGroupPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [groupName, setGroupName] = useState('');
  const [groupUsers, setGroupUsers] = useState([]);
  const [addedUsers, setAddedUsers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
      return;
    }

    fetch('http://localhost:5000/users', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [navigate]);

  const handleGroupNameChange = (event) => {
    setGroupName(event.target.value);
  };

  const handleGroupUserChange = (event) => {
    const userIds = Array.from(event.target.selectedOptions, (option) =>
      parseInt(option.value)
    );
    setGroupUsers(userIds);
  };

  const handleAddUser = () => {
    const selectedUser = users.find((user) => user.id === groupUsers[0]);
    if (selectedUser) {
      setAddedUsers((prevUsers) => [...prevUsers, selectedUser]);
      setGroupUsers([]);
    }
  };

  const handleCreateGroup = () => {
    const groupData = {
      name: groupName,
      user_ids: addedUsers.map((user) => user.id),
    };
  
    fetch('http://localhost:5000/groups', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(groupData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to create group');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Group created:', data);
        // Handle any success actions here
      })
      .catch((error) => {
        console.error(error);
        // Handle any error actions here
      });
  };
  

  return (
    <div>
      <h2>Create New Group</h2>
      <div className="form-container">
        <div className="form-column">
          <h3>Group Details</h3>
          <div className="form-row">
            <label htmlFor="groupName">Group Name *:</label>
            <input
              type="text"
              id="groupName"
              value={groupName}
              onChange={handleGroupNameChange}
              required
            />
          </div>
          <div className="form-row">
          <label htmlFor="groupUsers">Add employee to the group:</label>
<select
  id="groupUsers"
  value={groupUsers}
  onChange={handleGroupUserChange}
>
  <option value="">Select a user</option>
  {users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.username}
    </option>
  ))}
</select>
            <button type="button" onClick={handleAddUser}>
              Add User
            </button>
          </div>
          <div className="added-users">
            <h4>Added Users:</h4>
            <ul>
              {addedUsers.map((user) => (
                <li key={user.id}>{user.username}</li>
              ))}
            </ul>
          </div>
          <button type="submit" onClick={handleCreateGroup}>
            Add Group
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateGroupPage;
