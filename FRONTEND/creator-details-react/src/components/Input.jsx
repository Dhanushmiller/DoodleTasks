import React from 'react';

const Input = ({ label, type = 'text', name, value, onChange, placeholder, required, isPhone }) => {
  return (
    <div className="form-group">
      {label && (
        <label>
          {label} {required && <span className="required">*</span>}
        </label>
      )}
      {isPhone ? (
        <div className="phone-input">
          <div className="country-code">
            <img src="https://flagcdn.com/w20/in.png" alt="India" />
            <span>+91</span>
          </div>
          <input 
            type="tel" 
            name={name}
            value={value}
            onChange={(e) => onChange(name, e.target.value)}
            placeholder={placeholder} 
          />
        </div>
      ) : (
        <input 
          type={type} 
          name={name}
          value={value}
          onChange={(e) => onChange(name, type === 'checkbox' ? e.target.checked : e.target.value)}
          placeholder={placeholder}
        />
      )}
    </div>
  );
};

export default Input;
