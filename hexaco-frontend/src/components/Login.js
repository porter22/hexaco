
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {APIloginUser} from '../services/APIuserService.js'


import InputWithLabel from './Inputs/InputWithLabel/InputWithLabel.js';
import CommonButton from './Buttons/CommonButton/CommonButton.js';
import './Login.scss'


const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await APIloginUser({email, password})
      const token = data.token;

      localStorage.setItem('token', token);
      navigate('/admin');
    } catch (error) {
      console.error(error);
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div>
      <div className='section-title'>
          Login
      </div>
      <hr />
      {error && <div>{error}</div>}
      <div className='login--form'>
        <form onSubmit={handleSubmit}>
          <InputWithLabel 
            inputType="email"
            labelText="E-mail"
            value={email}
            onChange={handleEmailChange}
          ></InputWithLabel>
          <div>
            <InputWithLabel 
              inputType="password"
              labelText="Password"
              value={password}
              onChange={handlePasswordChange}
            ></InputWithLabel>
          </div>
          <div className='d-flex justify-space-between mt-4'>
            <CommonButton classes="btn-action" children="Login"></CommonButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;