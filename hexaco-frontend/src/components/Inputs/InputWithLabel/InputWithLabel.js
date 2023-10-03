import React, { useState } from 'react';
import './InputWithLabel.scss';

function InputWithLabel({ inputType, labelText, placeholder,isDisabled,min, max, ...rest }) {
  return (
    <div className="input-wrapper">
      {labelText && (
        <label className="input-label">
          {labelText}
        </label>
      )}
      <div className='input-icon-wrapper'>
        <input
          type={inputType}
          placeholder={placeholder}
          className='input-field'
          disabled={isDisabled}
          min={min}
          max={max}
          value={rest.value}
          onChange={rest.onChange}
        />
      </div>
    </div>
  );
}

export default InputWithLabel;
