import React, { useState, useEffect, useRef } from 'react';
import './DropdownSelect.scss'

function DropdownSelect({ options, onSelect, labelText, id, className }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option);
  };

  const filteredOptions = options.filter((option) =>
    option.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`dropdown-wrapper ${className || ''}`}>
      {labelText && (
        <label className="input-label">
          {labelText}
        </label>
      )}
      <div className="dropdown-select" ref={dropdownRef}>
        <div
          className={`dropdown-select__toggle ${isOpen ? 'open' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedOption ? selectedOption.text : 'Select an option'}
          <i className={`fas fa-chevron-${isOpen ? 'up' : 'down'}`}></i>
        </div>
        {isOpen && (
          <div className="dropdown-select__options">
            <input
              type="text"
              id={id}
              placeholder="Search..."
              value={searchTerm}
              onChange={handleInputChange}
            />
            <ul>
              {filteredOptions.map((option) => (
                <li
                  key={option.value}
                  onClick={() => handleOptionClick(option)}
                  className={`${
                    selectedOption && selectedOption.value === option.value
                      ? 'selected'
                      : ''
                  }`}
                >
                  {option.text}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default DropdownSelect;
