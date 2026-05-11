import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Mail, Lock, User, ArrowRight, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showToast } from '../store/uiSlice';
import '../styles/SignUp.css';

const schema = yup.object({
  fullName: yup.string()
    .required('Full name is required')
    .min(3, 'Full name must be at least 3 characters'),
  email: yup.string()
    .required('Email is required')
    .email('Invalid email address'),
  password: yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
  confirmPassword: yup.string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], 'Passwords do not match'),
  terms: yup.boolean()
    .oneOf([true], 'You must agree to the terms')
}).required();

const SignUp = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur'
  });

  const onSubmit = (data) => {
    console.log('SignUp Data:', data);
    dispatch(showToast({ message: 'Account created successfully!', type: 'success' }));
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="signup-card">
          <div className="signup-header">
            <h1>Join VIBE<span>.</span></h1>
            <p>Create an account to start your journey with us.</p>
          </div>

          <form className="signup-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="input-group-container">
              <div className={`input-group ${errors.fullName ? 'error' : ''}`}>
                <User size={18} className="input-icon" />
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  {...register('fullName')}
                />
              </div>
              {errors.fullName && <span className="error-msg"><AlertCircle size={14} /> {errors.fullName.message}</span>}
            </div>

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

            <div className="input-group-container">
              <div className={`input-group ${errors.confirmPassword ? 'error' : ''}`}>
                <Lock size={18} className="input-icon" />
                <input 
                  type="password" 
                  placeholder="Confirm Password" 
                  {...register('confirmPassword')}
                />
              </div>
              {errors.confirmPassword && <span className="error-msg"><AlertCircle size={14} /> {errors.confirmPassword.message}</span>}
            </div>

            <div className="form-terms">
              <input 
                type="checkbox" 
                id="terms" 
                {...register('terms')} 
              />
              <label htmlFor="terms">
                I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
              </label>
              {errors.terms && <div className="error-msg"><AlertCircle size={14} /> {errors.terms.message}</div>}
            </div>

            <button type="submit" className="signup-btn">
              Create Account <ArrowRight size={18} />
            </button>
          </form>

          <div className="signup-footer">
            <p>Already have an account? <Link to="/">Sign In</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
