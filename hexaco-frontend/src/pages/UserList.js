import React, { useEffect, useState } from 'react';
import Table from '../components/TableList/TableList.js';
import {APIgetUsers} from '../services/APIuserService.js';


const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const data = await APIgetUsers();
      setUsers(data);
    } catch(error) {
      console.log(error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }
  const columns = [{firstname: "First name"}, {lastname: "Last name"}, {email: "e-mail"}, {role: "Role"}];

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='users-list'>
      <div className='section-title'>User List</div>
      <hr />
      <Table columns={columns} data={users} className="mt-5"/>
    </div>
  );
};

export default UserList;
