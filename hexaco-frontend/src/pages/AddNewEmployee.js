import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddNewEmployee.css';


const AddNewEmployee = () => {
  const [selectedImage, setSelectedImage] = useState(null);
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

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Add new employee</h2>
      <div className="form-container">
        <div className="form-column">
          <h3>Employee details</h3>
          <div className="form-row">
            <div className="name-input">
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                id="firstName"
                value={newUser.firstName}
                onChange={handleInputChange}
              />
            </div>
            <div className="name-input">
              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                id="lastName"
                value={newUser.lastName}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="form-row">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={newUser.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-row">
            <div className="name-input">
              <label htmlFor="position">Position:</label>
              <input
                type="text"
                id="position"
                value={newUser.position}
                onChange={handleInputChange}
              />
            </div>
            <div className="name-input">
              <label htmlFor="role">Role:</label>
              <select
                id="role"
                value={newUser.role}
                onChange={handleInputChange}
              >
                <option value="">Select a role</option>
                <option value="hradmin">HR Admin</option>
                <option value="pemployee">Employee</option>
                <option value="observer">Observer</option>
              </select>
            </div>
          </div>
          <button type="submit">Add User</button>
        </div>
        <div className="image-upload-column">
          <div>
            <label htmlFor="image">Profile Image:</label>
            <input type="file" id="image" onChange={handleImageUpload} />
          </div>
        </div>
      </div>
    </div>
  );
  
};


export default AddNewEmployee;
