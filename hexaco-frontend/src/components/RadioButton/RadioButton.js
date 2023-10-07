import React from 'react';
import './RadioButton.scss';

function RadioButton({ id, name, value, label, checked, onChange, className }) {
  return (
    <div className="radio-button">
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className={`${className || ''}`}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}

export default RadioButton;
