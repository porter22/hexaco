import React, { useEffect, useState } from 'react';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch user data from backend API
    fetch('http://localhost:5000/users')
      .then((response) => {
        if (!response.ok) {
          
          throw new Error('Failed to fetch user data');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data); // Log the received data
        setUsers(data);
      })
      .catch((error) => {
        console.error(error); // Log any error that occurs
        setError(error.message);
      });
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
