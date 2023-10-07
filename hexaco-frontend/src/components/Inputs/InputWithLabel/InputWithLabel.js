import React, { useState } from 'react';
import './InputWithLabel.scss';

function InputWithLabel({ inputType, className, id, labelText, placeholder,isDisabled,min, max,onChange, required, ...rest }) {
  const [error, setError] = useState('');

  const validateText = (value) => {
    const regex = /^[a-zA-Z]*$/;
    if (!regex.test(value)) {
      setError('Enter letters only');
    } else {
      setError('');
    }
  };

  const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(value)) {
      setError('Incorrect email');
    } else {
      setError('');
    }
  };
  const handleInputChange = (e) => {
    const { value } = e.target;
    if (inputType === 'text') {
      validateText(value);
    } else if (inputType === 'email') {
      validateEmail(value);
    }
    
    if (onChange) {
      onChange(e);
    }
  };
  return (
    <div className={`input-wrapper ${className || ''}`}>
      {labelText && (
        <label className="input-label">
          {labelText}
        </label>
      )}
      <div className='input-icon-wrapper'>
        <input
          type={inputType}
          id={id}
          placeholder={placeholder}
          className='input-field'
          disabled={isDisabled}
          min={min}
          max={max}
          value={rest.value}
          onChange={handleInputChange}
          required={required}
        />
      </div>
      {error && <div className="input-error-message">{error}</div>}
    </div>
  );
}

export default InputWithLabel;
