import React from 'react';

const Button = ({ type = "button", onClick, disabled, children, style, className = "btn-save" }) => {
  return (
    <button 
      type={type} 
      className={className}
      onClick={() => onClick()}
      disabled={disabled}
      style={style}
    >   
      {children}
    </button>
  );
};

export default Button;
