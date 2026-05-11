import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { hideToast } from '../store/uiSlice';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';
import '../styles/Toast.css';

const Toast = () => {
  const { message, type, visible } = useSelector(state => state.ui.toast || { message: '', type: 'success', visible: false });
  const dispatch = useDispatch();

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        dispatch(hideToast());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [visible, dispatch]);

  if (!visible) return null;

  const icons = {
    success: <CheckCircle size={20} color="#10b981" />,
    error: <XCircle size={20} color="#ef4444" />,
    info: <Info size={20} color="#3b82f6" />,
  };

  return (
    <div className={`toast-container ${type}`}>
      <div className="toast-icon">{icons[type]}</div>
      <div className="toast-message">{message}</div>
      <button className="toast-close" onClick={() => dispatch(hideToast())}>
        <X size={16} />
      </button>
    </div>
  );
};

export default Toast;
