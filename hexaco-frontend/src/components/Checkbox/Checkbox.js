import React from 'react';
import './Checkbox.scss';

function Checkbox({ id, name, value, label, checked, onChange, className }) {
  return (
    <div className="checkbox">
      <input
        type="checkbox"
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

export default Checkbox;
