import React from 'react';
import PropTypes from 'prop-types';
import './CommonButton.scss';

function CommonButton(props) {
  const { disabled, classes, buttonsType, isSmall, full, onClick, children, type } = props;

  // Функция для определения классов кнопки
  const getButtonClasses = () => {
    let buttonClasses = `button ${classes} `;
    
    switch (buttonsType.toLowerCase()) {
      case 'primary':
        buttonClasses += 'btn-prim';
        break;
      case 'secondary':
        buttonClasses += 'btn-secondary';
        break;
      case 'ghost':
        buttonClasses += 'btn-ghost';
        break;
      case 'danger':
        buttonClasses += 'btn-danger';
        break;
      default:
        
    }

    if (isSmall) {
      buttonClasses += ' small';
    }

    if (full) {
      buttonClasses += ' full';
    }

    if (disabled) {
      buttonClasses += ' disabled';
    }

    return buttonClasses;
  };

  return (
    <button
        className={getButtonClasses()}
        disabled={disabled}
        onClick={onClick}
    >
        <span>{children}</span>
    </button>
  );
}

CommonButton.propTypes = {
  disabled: PropTypes.bool,
  classes: PropTypes.string,
  buttonsType: PropTypes.string,
  isSmall: PropTypes.bool,
  full: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node,
};

CommonButton.defaultProps = {
  disabled: false,
  classes: '',
  buttonsType: '',
  isSmall: false,
  full: false,
  onClick: () => {},
  children: null,
};

export default CommonButton;
