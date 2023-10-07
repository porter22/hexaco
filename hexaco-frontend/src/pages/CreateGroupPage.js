import React, { useEffect, useState } from 'react';
import { APIgetUsers } from '../services/APIuserService.js'
import { APIcreateGroup } from '../services/APIgroupService.js'
import { useNavigate } from 'react-router-dom';
import './CreateGroupPage.scss';

import InputWithLabel from '../components/Inputs/InputWithLabel/InputWithLabel.js';
import InputUploadFile from '../components/Inputs/InputUploadFile/InputUploadFile.js';
import DropdownSelect from '../components/Dropdown/DropdownSelect.js';
import CommonButton from '../components/Buttons/CommonButton/CommonButton.js';

const CreateGroupPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [groupName, setGroupName] = useState('');
  const [groupUsers, setGroupUsers] = useState([]);
  const [addedUsers, setAddedUsers] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingCreateGroup, setIsLoadingCreateGroup] = useState(false);


  useEffect(() => {
    const token = localStorage.getItem('token');
  
    if (!token) {
      navigate('/login');
    } else {
      getUsersList();
    }
  }, [navigate]);


  const getUsersList = async () => {
    try{
      const data = await APIgetUsers();
      setUsers(data);
    } catch(error) {
      console.log(error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  const handleGroupNameChange = (event) => {
    setGroupName(event.target.value);
  };
  
  const handleGroupUserChange = (obj) => {
    const { id } = obj;
  
    const isUserAlreadyAdded = addedUsers.some((user) => user.id === id);
    if (!isUserAlreadyAdded) {
      setGroupUsers(id);
      setAddedUsers((prevUsers) => {
        const updatedUsers = [...prevUsers, obj];
        return updatedUsers;
      });
    }
  };
  const handleRemoveUser = (userToRemove) => {
    setAddedUsers((prevUsers) =>
      prevUsers.filter((user) => user.id !== userToRemove.id)
    );
  };

  const handleCreateGroup = async() => {
    try{
      setIsLoadingCreateGroup(true);
      const payload = {
        name: groupName,
        user_ids: addedUsers.map((user) => user.id),
      };
      const response = await APIcreateGroup(payload);
      if (!response.ok) {
        throw new Error('Failed to create group');
      }
      console.log('Success', response)
    } catch(error) {
      console.error(error);
    } finally {
      setIsLoadingCreateGroup(false); // После завершения загрузки устанавливаем состояние загрузки обратно в false.
    }
  };
  const formattedUsers = users.map(user => ({
    id: user.id,
    value: user.id,
    text: `${user.firstname || ''} ${user.lastname || ''}`
  }));

  return (
    <div className='group-details'>
      <div className='section-title'>Add new group</div>
      <hr />
      <div className="form-container d-flex">
        <div className='col-1-2 mr-4 group-details-column'>
          <div className='section-header mt-5 mb-3'>Group Details</div>
          <div className="form-row d-flex group-details-row ">
          <InputWithLabel
              inputType="text"
              id="groupName"
              labelText="Group Name *:"
              className="mr-5"
              placeholder="Group Name"
              value={groupName}
              onChange={handleGroupNameChange}
              required
            ></InputWithLabel>
            <DropdownSelect 
              id="groupUsers"
              labelText="Add employee to the group:"
              options={formattedUsers}
              onSelect={handleGroupUserChange}
            >
            </DropdownSelect>
          </div>
          <div className="group-added-users group-details-row">
            <div className='section-header mt-5 mb-3'>Added Users:</div>
            <ul className='group-details-list'>
              {addedUsers.length > 0 && (
                <li className="group-details-list-element">
                  <span>Group Members:</span>
                </li>
              )}
              {addedUsers.map((user) => (
                <li className="group-details-list-element" key={user.id}>
                  <span>{user.text}</span>
                  <span className="icon-close" onClick={() => handleRemoveUser(user)}>&#10006;</span>
                </li>
              ))}
            </ul>
          </div>

          <div className='d-flex justify-space-between mt-4'>
            <div className='group-details-actions'>
            {isLoadingCreateGroup ? (
                <div className="loader">Loading...</div>
              ) : (
                <CommonButton onClick={handleCreateGroup} classes="btn-prim mr-3">Add Group</CommonButton>
              )}
            </div>
            <div className='employee-details-import'></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateGroupPage;
