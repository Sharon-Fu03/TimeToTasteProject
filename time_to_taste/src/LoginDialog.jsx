import React, { useEffect } from 'react';
import './Login.css';
import api, { setAuthToken } from './utils/api';

const LoginDialog = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && onClose) onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

   const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      if (!email || !password) return;

      const response = await api.post('api/auth/login', { email, password });
      console.log('login response', response);
      if (response && response.data) {
        const { token,user } = response.data;
        localStorage.setItem('authToken', token);
        localStorage.setItem('authUser', JSON.stringify(user));
        console.log('login user', user);
        console.log('login token', token);
        setAuthToken(token);
        if (onClose) onClose();
      } else {
        alert('登入失敗：伺服器回傳格式異常');
      }
    } catch (err) {
      console.error('login error', err);
      alert('登入失敗，請檢查帳號密碼');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-dialog-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="關閉">
          ×
        </button>

        <div className="login-dialog-container">
          <div className="login-form-section">
            <div className="login-header">
              <span className="plane-icon">✈</span>
            </div>
            
            <h2>Welcome</h2>
            <p className="login-subtext">Login with Email</p>

            <form className="login-form" onSubmit={handleSubmit}>
              <div className="input-group">
                <label htmlFor="email">Email id</label>
                <input type="email" id="email" placeholder="thiouix@gmail.com" required />
              </div>

              <div className="input-group">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" placeholder="••••••••••••" required />
              </div>
              
              <a href="#" className="forgot-password">忘記密碼?</a>

              <button type="submit" className="login-button">LOGIN</button>
            </form>

            <div className="or-divider">
              <span>OR</span>
            </div>

            <div className="social-login-buttons">
              <button type="button" className="social-button google">G</button>
              <button type="button" className="social-button facebook">f</button>
              <button type="button" className="social-button apple">🍎</button>
            </div>

            <div className="register-link">
              Don't have account? <a href="#">Register Now</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginDialog;
