import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {APIgetUsers, APIcreateUser} from '../services/APIuserService.js'
import {positionRoles} from '../utils/roles.js'
import './AddNewEmployee.scss';

import InputWithLabel from '../components/Inputs/InputWithLabel/InputWithLabel.js';
import InputUploadFile from '../components/Inputs/InputUploadFile/InputUploadFile.js';
import DropdownSelect from '../components/Dropdown/DropdownSelect.js';
import CommonButton from '../components/Buttons/CommonButton/CommonButton.js';


const AddNewEmployee = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    position: '',
    role: '',
  });
  const initialUser = {
    firstName: '',
    lastName: '',
    email: '',
    position: '',
    role: '',
  };
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

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

  const handleAddUser = async () => {
    try {
      const payload = {
        username: `${newUser.firstName} ${newUser.lastName}`,
        email: newUser.email,
        position: newUser.position,
        role: newUser.role,
      };
  
      const response = await APIcreateUser(payload);
  
      if (!response.ok) {
        throw new Error('Failed to add user');
      }
  
      const data = await response.json();
      setUsers((prevUsers) => [...prevUsers, data]);
      resetUserInfo();
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  const resetUserInfo = () => {
    setNewUser(initialUser);
  };

  const handleToggleForm = () => {
    setIsFormOpen((prevState) => !prevState);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleSelect = (option) => {
    setNewUser((prevUser) => ({
      ...prevUser,
      role: option.value,
    }));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='employee-details'>
      <div className='section-title'>Add new employee</div>
      <hr />
      <div className="form-container d-flex">
        <div className='col-1-2 mr-4 employee-details-column'>
          <div className='section-header mt-5 mb-3'>Employee details</div>
            <div className='employee-details-form gap-pb-6'>
              <div className='employee-details-form__row'></div>
              <InputWithLabel
                inputType="text"
                id="firstName"
                labelText="First Name ＊"
                placeholder="John"
                value={newUser.firstName}
                onChange={handleInputChange}
              ></InputWithLabel>
              <InputWithLabel
                inputType="text"
                id="lastName"
                labelText="Last Name ＊"
                placeholder="Doe"
                value={newUser.lastName}
                onChange={handleInputChange}
              ></InputWithLabel>
              <InputWithLabel
                inputType="email"
                id="email"
                labelText="e-mail ＊"
                placeholder="email@address.com"
                value={newUser.email}
                onChange={handleInputChange}
              ></InputWithLabel>
              <InputWithLabel
                inputType="text"
                id="position"
                labelText="Position ＊"
                value={newUser.position}
                onChange={handleInputChange}
              ></InputWithLabel>
              <DropdownSelect 
                id="role"
                labelText="Role"
                options={positionRoles} 
                onSelect={handleSelect}>
              </DropdownSelect>
            </div>
          <div className='d-flex justify-space-between mt-4'>
            <div className='employee-details-actions'>
              <CommonButton onClick={handleAddUser} classes="btn-prim mr-3">Add User</CommonButton>
              <CommonButton classes="btn-ghost">Cancel</CommonButton>
            </div>
            <div className='employee-details-import'></div>
          </div>
        </div>
        <div className='col-1-2'>
          <div className='section-header mt-5 mb-3'>Profile image</div>
          <div className='employee-details-image'>
              <img src="https://palmbayprep.org/wp-content/uploads/2015/09/user-icon-placeholder.png"></img>
          </div>
          <InputUploadFile onFileUpload={handleImageUpload}></InputUploadFile>
        </div>
      </div>
    </div>
  );
};
export default AddNewEmployee;
