import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: '',
    role: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

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
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
        setIsLoading(false);
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [id]: value,
    }));
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const requestBody = {
      username: newUser.username,
      email: newUser.email,
      password: newUser.password,
      role: newUser.role,
    };

    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to add user');
        }
        return response.json();
      })
      .then((data) => {
        setUsers((prevUsers) => [...prevUsers, data]);
        setNewUser({
          username: '',
          email: '',
          password: '',
          role: '',
        });
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
      });
  };

  const handleToggleForm = () => {
    setIsFormOpen((prevState) => !prevState);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>HR Admin Page</h2>
      <button onClick={handleLogout}>Logout</button>

      <div>
        <button onClick={handleToggleForm}>
          {isFormOpen ? 'Hide Add User Form' : 'Show Add User Form'}
        </button>
        {isFormOpen && (
          <form onSubmit={handleAddUser}>
            <div>
              <label htmlFor="username">Username:</label>
              <input type="text" id="username" value={newUser.username} onChange={handleInputChange} />
            </div>
            <div>
             
            <label htmlFor="email">Email:</label>
              <input type="email" id="email" value={newUser.email} onChange={handleInputChange} />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" value={newUser.password} onChange={handleInputChange} />
            </div>
            <div>
              <label htmlFor="role">Role:</label>
              <input type="text" id="role" value={newUser.role} onChange={handleInputChange} />
            </div>
            <button type="submit">Add User</button>
          </form>
        )}
      </div>

      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Username</th>
            <th>Role</th>
            <th>Assessment Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.role}</td>
              <td>{user.assessmentStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
