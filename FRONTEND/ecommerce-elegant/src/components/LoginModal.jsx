import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { X, Mail, Lock, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showToast } from '../store/uiSlice';
import '../styles/LoginModal.css';

const schema = yup.object({
  email: yup.string()
    .required('Email is required')
    .email('Invalid email address'),
  password: yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
  rememberMe: yup.boolean()
}).required();

const LoginModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur'
  });

  if (!isOpen) return null;

  const onSubmit = (data) => {
    console.log('Login Data:', data);
    dispatch(showToast({ message: 'Signed in successfully!', type: 'success' }));
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="login-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}><X size={24} /></button>
        <div className="login-header">
          <h2>Welcome Back</h2>
          <p>Please enter your details to sign in.</p>
        </div>
        
        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="input-group-container">
            <div className={`input-group ${errors.email ? 'error' : ''}`}>
              <Mail size={18} className="input-icon" />
              <input 
                type="email" 
                placeholder="Email Address" 
                {...register('email')}
              />
            </div>
            {errors.email && <span className="error-msg"><AlertCircle size={14} /> {errors.email.message}</span>}
          </div>

          <div className="input-group-container">
            <div className={`input-group ${errors.password ? 'error' : ''}`}>
              <Lock size={18} className="input-icon" />
              <input 
                type="password" 
                placeholder="Password" 
                {...register('password')}
              />
            </div>
            {errors.password && <span className="error-msg"><AlertCircle size={14} /> {errors.password.message}</span>}
          </div>

          <div className="form-options">
            <label><input type="checkbox" {...register('rememberMe')} /> Remember me</label>
            <a href="#">Forgot password?</a>
          </div>
          
          <button type="submit" className="login-submit">Sign In</button>
        </form>

        <div className="login-footer">
          <p>Don't have an account? <Link to="/signup" onClick={onClose}>Create one</Link></p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
